using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using SendGrid;
using SendGrid.Helpers.Mail;
using SimpleModelsAndRelations;
using SimpleModelsAndRelations.Models;
using SimpleModelsAndRelations.Filters;
using System.IO;


  [Route("api/v1/User")]
  public class UserApiController : Controller
  {
    private readonly MailOptions _mailOptions;
    public readonly SimpleModelsAndRelationsContext _context;
    private IHostingEnvironment env;

    public UserApiController(SimpleModelsAndRelationsContext context, IHostingEnvironment env, IOptions<MailOptions> mailOptionsAccessor)
    {
      _context = context;
      _mailOptions = mailOptionsAccessor.Value;
      this.env = env;
    }

    public bool ApiTokenValid => RestrictToUserTypeAttribute.ApiToken != null &&
        HttpContext.Request.Headers["ApiToken"] == RestrictToUserTypeAttribute.ApiToken;

    
    [RestrictToUserType(new string[] {"*"})]
    [HttpPost("DeleteSessions")]
    [ValidateAntiForgeryToken]
    public IActionResult DeleteSessions() {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      if (session.User != null) {
        var item = _context.User.FirstOrDefault(t => t.Id == session.User.Id);
        if (item != null) {
          var allowed_items = ApiTokenValid ? _context.User : _context.User;
          if (!allowed_items.Any(i => i.Id == item.Id)) return Unauthorized();
          HttpContext.Deleted<User>(_context, "User", item);
          return Ok();
        }
      }
      return Unauthorized();
    }

    [RestrictToUserType(new string[] {"*"})]
    [HttpPost("ActiveSessions")]
    [ValidateAntiForgeryToken]
    public IActionResult GetActiveSessions() {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      if (session.User != null) {
        var item = _context.User.FirstOrDefault(t => t.Id == session.User.Id);
        if (item != null) {
          var allowed_items = ApiTokenValid ? _context.User : _context.User;
          if (!allowed_items.Any(i => i.Id == item.Id)) return Unauthorized();
          return Ok(_context.Session.Where(s => s.LoggedEntityId == item.Id)
            .Select(s => Tuple.Create(s.AdditionalInfo, s.CreatedAt))
            .ToArray());
        }
      }
      return Unauthorized();
    }

    [HttpPost("Validate")]
    [ValidateAntiForgeryToken]
    public bool Validate([FromBody] RegistrationData registration_data)
    {
      string username = registration_data.Username,
             email = registration_data.Email,
             email_confirmation = registration_data.EmailConfirmation;
      if (username != null && username != "" && email != null && email != "" && email == email_confirmation) {
        return !_context.User.Any(t => t.Username == username || t.Email == email);
      }
      return false;
    }

    [HttpPost("Register")]
    [ValidateAntiForgeryToken]
    public UserViewData Register([FromBody] RegistrationData registration_data)
    {
      string username = registration_data.Username,
             email = registration_data.Email,
             email_confirmation = registration_data.EmailConfirmation;
      if (username != null && username != "" && email != null && email != "" && email == email_confirmation) {
        var item = _context.User.FirstOrDefault(t => t.Username == username || t.Email == email);
        if (item == null) {
          var new_password_text = PasswordHasher.RandomPassword;
          var new_password = PasswordHasher.Hash(new_password_text);
          item = new User() { Id = _context.User.Max(i => i.Id) + 1, Username = username, Email = email, PasswordHash = new_password.PasswordHash, PasswordSalt = new_password.PasswordSalt };
          var apiKey = StaticMailer._mailOptions.MailApiToken;
          var client = new SendGridClient(apiKey);
          var from = new EmailAddress(StaticMailer._mailOptions.MailFrom);
          var subject = "User account created with temporary password.";
          var to = new EmailAddress(item.Email);
          var plainTextContent = $"Your User temporary password has set. Your username and password combination is \n\nUsername: {item.Username}\nPassword: {new_password_text}\n";
          var htmlContent = $"Your User temporary password has set. Your username and password combination is <br />Username: {item.Username}<br />Password: {new_password_text}<br />";
          var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
          var response = client.SendEmailAsync(msg).Result;
          
          _context.User.Add(item);
          _context.SaveChanges();

          return UserViewData.FromUser(item);
        }
      }
      throw new Exception("Cannot register.");
    }

    [HttpPost("Login")]
    [ValidateAntiForgeryToken]
    public IActionResult /*UserViewData*/ Login([FromBody] LoginData login_data)
    {
      var item = _context.User.FirstOrDefault(t => t.Username == login_data.Username || t.Email == login_data.Email);
      if (item != null) {
        var last_login_attempt = item.LastLoginAttempt;
        item.LastLoginAttempt = DateTime.Now;
        _context.Update(item);
        _context.SaveChanges();
        if (login_data.Password != null && (last_login_attempt != null || (DateTime.Now - last_login_attempt).TotalSeconds > 3)) {
          if (PasswordHasher.CheckHash(login_data.Password, new PasswordAndSalt(){ PasswordHash = item.PasswordHash, PasswordSalt = item.PasswordSalt })) {
            HttpContext.Login<LoggableEntities, User>(env, _context, "User", item, new LoggableEntities() { User = item });

            return Ok(UserViewData.FromUser(item));
          }
        }
      }
      return Unauthorized();
    }

    [HttpPost("Logout")]
    [ValidateAntiForgeryToken]
    public IActionResult Logout()
    {
      HttpContext.Logout(_context);
      return Ok();
    }

    [RestrictToUserType(new string[] {"*"})]
    [HttpPost("ChangePassword")]
    [ValidateAntiForgeryToken]
    public IActionResult ChangePassword([FromBody] ChangePasswordData change_password_data)
    {
      var item = _context.User.FirstOrDefault(t => t.Username == change_password_data.Username);
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      if (item != null &&
          change_password_data.Username != null && change_password_data.Password != null &&
          change_password_data.NewPassword != null && change_password_data.NewPasswordConfirmation != null) {
        var allowed_items = ApiTokenValid ? _context.User : _context.User;
        if (!allowed_items.Any(i => i.Id == item.Id)) return Unauthorized();
        if (change_password_data.NewPassword == change_password_data.NewPasswordConfirmation && PasswordHasher.CheckHash(change_password_data.Password, new PasswordAndSalt(){ PasswordHash = item.PasswordHash, PasswordSalt = item.PasswordSalt })) {
          var new_password = PasswordHasher.Hash(change_password_data.NewPassword);
          item.PasswordHash = new_password.PasswordHash;
          item.PasswordSalt = new_password.PasswordSalt;
          _context.User.Update(item);
          _context.SaveChanges();

          HttpContext.ChangedPassword<User>(_context, "User", item);
          // HttpContext.Login<LoggableEntities, User>(_context, "User", item, new LoggableEntities() { User = item });

          return Ok();
        }
      }
      return Unauthorized();
    }

    [HttpPost("ResetPassword")]
    [ValidateAntiForgeryToken]
    public IActionResult ResetPassword([FromBody] ResetPasswordData reset_password_data)
    {
      var item = _context.User.FirstOrDefault(t => t.Username == reset_password_data.Username || t.Email == reset_password_data.Email);
      if (item != null && (reset_password_data.Username != null || reset_password_data.Email != null)) {
        var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
        var allowed_items = ApiTokenValid ? _context.User : _context.User;
        if (!allowed_items.Any(i => i.Id == item.Id)) return Unauthorized();

        var new_password_text = PasswordHasher.RandomPassword;
        var apiKey = StaticMailer._mailOptions.MailApiToken;
        var client = new SendGridClient(apiKey);
        var from = new EmailAddress(StaticMailer._mailOptions.MailFrom);
        var subject = "User password reset request.";
        var to = new EmailAddress(item.Email);
        var plainTextContent = $"Your User password has been reset. Your new username and password combination is \n\nUsername: {item.Username}\nPassword: {new_password_text}\n";
        var htmlContent = $"Your User password has been reset. Your new username and password combination is <br />Username: {item.Username}<br />Password: {new_password_text}<br />";
        var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
        var response = client.SendEmailAsync(msg).Result;

        var new_password = PasswordHasher.Hash(new_password_text);
        item.PasswordHash = new_password.PasswordHash;
        item.PasswordSalt = new_password.PasswordSalt;
        _context.User.Update(item);
        _context.SaveChanges();

        // HttpContext.Logout(_context);

        return Ok();
      }
      return Unauthorized();
    }
    [RestrictToUserType(new string[] {"*"})]
    [HttpGet("{User_id}/User_Recipes")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Page<Recipe> GetUser_Recipes(int User_id, [FromQuery] int page_index, [FromQuery] int page_size = 25 )
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.User : _context.User;
      var source = allowed_sources.FirstOrDefault(s => s.Id == User_id);
      var can_create_by_token = ApiTokenValid || true;
      var can_delete_by_token = ApiTokenValid || true || true;
      var can_link_by_token = ApiTokenValid || true;
      var can_view_by_token = ApiTokenValid || true;
      if (source == null || !can_view_by_token) // test
        return Enumerable.Empty<SimpleModelsAndRelations.Models.Recipe>() // B
              .AsQueryable()
              .Select(SimpleModelsAndRelations.Models.Recipe.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, false))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Recipe.WithoutImages, item => item , null);
      var allowed_targets = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var editable_targets = ApiTokenValid ? _context.Recipe : (_context.Recipe);
      var can_edit_by_token = ApiTokenValid || true;
      var items = (from link in _context.User_Recipe
              where link.UserId == source.Id
              from target in allowed_targets
              where link.RecipeId == target.Id
              select target).OrderBy(i => i.CreatedDate).AsQueryable();
      
      return items
              .Select(SimpleModelsAndRelations.Models.Recipe.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, can_edit_by_token && editable_targets.Any(et => et.Id == t.Id)))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Recipe.WithoutImages, item => item , null);
    }

    [HttpGet("{User_id}/User_Recipes/{Recipe_id}")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult /*Recipe*/ GetUser_RecipeById(int User_id, int Recipe_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.User : _context.User;
      var source = allowed_sources.FirstOrDefault(s => s.Id == User_id);
      var can_view_by_token = ApiTokenValid || true;
      if (source == null || !can_view_by_token)
        return NotFound();
      var allowed_targets = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var item = (from link in _context.User_Recipe
              where link.UserId == source.Id
              from target in allowed_targets
              where link.RecipeId == target.Id
              select target).OrderBy(i => i.CreatedDate)
              .Select(SimpleModelsAndRelations.Models.Recipe.FilterViewableAttributes(current_User))
              .FirstOrDefault(t => t.Id == Recipe_id);
      if (item == null) return NotFound();
      item = SimpleModelsAndRelations.Models.Recipe.WithoutImages(item);
      return Ok(item);
    }

    [RestrictToUserType(new string[] {"*"})]
    [HttpGet("{User_id}/unlinked/User_Recipes")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Page<Recipe> GetUnlinkedUser_Recipes(int User_id, [FromQuery] int page_index, [FromQuery] int page_size = 25)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.User : _context.User;
      var source = allowed_sources.FirstOrDefault(s => s.Id == User_id);
      var can_create_by_token = ApiTokenValid || true;
      var can_delete_by_token = ApiTokenValid || true || true;
      var can_link_by_token = ApiTokenValid || true;
      var can_view_by_token = ApiTokenValid || true;
      if (source == null || !can_view_by_token)
        return Enumerable.Empty<SimpleModelsAndRelations.Models.Recipe>()
              .AsQueryable()
              .Select(SimpleModelsAndRelations.Models.Recipe.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, false))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Recipe.WithoutImages, item => item);
      var allowed_targets = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var editable_targets = ApiTokenValid ? _context.Recipe : (_context.Recipe);
      var can_edit_by_token = ApiTokenValid || true;
      return (from target in allowed_targets
              where !_context.User_Recipe.Any(link => link.UserId == source.Id && link.RecipeId == target.Id) &&
              true
              select target).OrderBy(i => i.CreatedDate)
              .Select(SimpleModelsAndRelations.Models.Recipe.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, can_edit_by_token && editable_targets.Any(et => et.Id == t.Id)))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Recipe.WithoutImages, item => item);
    }

    bool CanAdd_User_User_Recipes(User source) {
      return true;
    }

    bool CanAdd_Recipe_User_Recipes(Recipe target) {
      return true;
    }

    [RestrictToUserType(new string[] {})]
    [HttpPost("{User_id}/User_Recipes_Recipe")]
    public IActionResult /*IEnumerable<Recipe>*/ CreateNewUser_Recipe_Recipe(int User_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.User : _context.User;
      var source = allowed_sources.FirstOrDefault(s => s.Id == User_id);
      var can_create_by_token = ApiTokenValid || true;
      if (source == null || !can_create_by_token)
        return Unauthorized();
        // throw new Exception("Cannot create item in relation User_Recipes");
      var can_link_by_token = ApiTokenValid || true;
      if (!CanAdd_User_User_Recipes(source) || !can_link_by_token)
        return Unauthorized();
        //throw new Exception("Cannot add item to relation User_Recipes");
      var new_target = new Recipe() { CreatedDate = DateTime.Now, Id = _context.Recipe.Max(i => i.Id) + 1 };
      _context.Recipe.Add(new_target);
      _context.SaveChanges();
      var link = new User_Recipe() { Id = _context.User_Recipe.Max(l => l.Id) + 1, UserId = source.Id, RecipeId = new_target.Id };
      _context.User_Recipe.Add(link);
      _context.SaveChanges();
      return Ok(new Recipe[] { new_target });
    }

    [RestrictToUserType(new string[] {"*"})]
    [HttpPost("{User_id}/User_Recipes/{Recipe_id}")]
    public IActionResult LinkWithUser_Recipe(int User_id, int Recipe_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = _context.User;
      var source = allowed_sources.FirstOrDefault(s => s.Id == User_id);
      var allowed_targets = _context.Recipe;
      var target = allowed_targets.FirstOrDefault(s => s.Id == Recipe_id);
      var can_edit_source_by_token = ApiTokenValid || true;
      var can_edit_target_by_token = ApiTokenValid || true;
      var can_link_by_token = ApiTokenValid || true;
      if (!CanAdd_User_User_Recipes(source) || !can_link_by_token || !can_edit_source_by_token || !can_edit_target_by_token)
        return BadRequest();
        // throw new Exception("Cannot add item to relation User_Recipes");
      if (!CanAdd_Recipe_User_Recipes(target))
        return BadRequest();
        // throw new Exception("Cannot add item to relation User_Recipes");
      var link = new User_Recipe() { Id = _context.User_Recipe.Max(i => i.Id) + 1, UserId = source.Id, RecipeId = target.Id };
      _context.User_Recipe.Add(link);
      _context.SaveChanges();
      return Ok();
    }
    [RestrictToUserType(new string[] {"*"})]
    [HttpDelete("{User_id}/User_Recipes/{Recipe_id}")]
    public IActionResult UnlinkFromUser_Recipe(int User_id, int Recipe_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = _context.User;
      var source = allowed_sources.FirstOrDefault(s => s.Id == User_id);
      var allowed_targets = _context.Recipe;
      var target = allowed_targets.FirstOrDefault(s => s.Id == Recipe_id);
      var link = _context.User_Recipe.FirstOrDefault(l => l.UserId == source.Id && l.RecipeId == target.Id);

      var can_edit_source_by_token = ApiTokenValid || true;
      var can_edit_target_by_token = ApiTokenValid || true;
      var can_unlink_by_token = ApiTokenValid || true;
      if (!can_unlink_by_token || !can_edit_source_by_token || !can_edit_target_by_token) return Unauthorized(); // throw new Exception("Cannot remove item from relation User_Recipes");
      _context.User_Recipe.Remove(link);
      _context.SaveChanges();
      return Ok();
    }
    [RestrictToUserType(new string[] {"*"})]
    [HttpGet("{User_id}/User_RecommendationPages")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Page<RecommendationPage> GetUser_RecommendationPages(int User_id, [FromQuery] int page_index, [FromQuery] int page_size = 25 )
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.User : _context.User;
      var source = allowed_sources.FirstOrDefault(s => s.Id == User_id);
      var can_create_by_token = ApiTokenValid || true;
      var can_delete_by_token = ApiTokenValid || true || true;
      var can_link_by_token = ApiTokenValid || true;
      var can_view_by_token = ApiTokenValid || true;
      if (source == null || !can_view_by_token) // test
        return Enumerable.Empty<SimpleModelsAndRelations.Models.RecommendationPage>() // B
              .AsQueryable()
              .Select(SimpleModelsAndRelations.Models.RecommendationPage.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, false))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.RecommendationPage.WithoutImages, item => item , null);
      var allowed_targets = ApiTokenValid ? _context.RecommendationPage : _context.RecommendationPage;
      var editable_targets = ApiTokenValid ? _context.RecommendationPage : (_context.RecommendationPage);
      var can_edit_by_token = ApiTokenValid || true;
      var items = (from link in _context.User_RecommendationPage
              where link.UserId == source.Id
              from target in allowed_targets
              where link.RecommendationPageId == target.Id
              select target).OrderBy(i => i.CreatedDate).AsQueryable();
      
      return items
              .Select(SimpleModelsAndRelations.Models.RecommendationPage.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, can_edit_by_token && editable_targets.Any(et => et.Id == t.Id)))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.RecommendationPage.WithoutImages, item => item , null);
    }

    [HttpGet("{User_id}/User_RecommendationPages/{RecommendationPage_id}")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult /*RecommendationPage*/ GetUser_RecommendationPageById(int User_id, int RecommendationPage_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.User : _context.User;
      var source = allowed_sources.FirstOrDefault(s => s.Id == User_id);
      var can_view_by_token = ApiTokenValid || true;
      if (source == null || !can_view_by_token)
        return NotFound();
      var allowed_targets = ApiTokenValid ? _context.RecommendationPage : _context.RecommendationPage;
      var item = (from link in _context.User_RecommendationPage
              where link.UserId == source.Id
              from target in allowed_targets
              where link.RecommendationPageId == target.Id
              select target).OrderBy(i => i.CreatedDate)
              .Select(SimpleModelsAndRelations.Models.RecommendationPage.FilterViewableAttributes(current_User))
              .FirstOrDefault(t => t.Id == RecommendationPage_id);
      if (item == null) return NotFound();
      item = SimpleModelsAndRelations.Models.RecommendationPage.WithoutImages(item);
      return Ok(item);
    }

    [RestrictToUserType(new string[] {"*"})]
    [HttpGet("{User_id}/unlinked/User_RecommendationPages")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Page<RecommendationPage> GetUnlinkedUser_RecommendationPages(int User_id, [FromQuery] int page_index, [FromQuery] int page_size = 25)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.User : _context.User;
      var source = allowed_sources.FirstOrDefault(s => s.Id == User_id);
      var can_create_by_token = ApiTokenValid || true;
      var can_delete_by_token = ApiTokenValid || true || true;
      var can_link_by_token = ApiTokenValid || true;
      var can_view_by_token = ApiTokenValid || true;
      if (source == null || !can_view_by_token)
        return Enumerable.Empty<SimpleModelsAndRelations.Models.RecommendationPage>()
              .AsQueryable()
              .Select(SimpleModelsAndRelations.Models.RecommendationPage.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, false))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.RecommendationPage.WithoutImages, item => item);
      var allowed_targets = ApiTokenValid ? _context.RecommendationPage : _context.RecommendationPage;
      var editable_targets = ApiTokenValid ? _context.RecommendationPage : (_context.RecommendationPage);
      var can_edit_by_token = ApiTokenValid || true;
      return (from target in allowed_targets
              where !_context.User_RecommendationPage.Any(link => link.UserId == source.Id && link.RecommendationPageId == target.Id) &&
              (from link in _context.User_RecommendationPage
                where link.RecommendationPageId == target.Id
                from s in _context.User
                where link.UserId == s.Id
                select s).Count() < 1
              select target).OrderBy(i => i.CreatedDate)
              .Select(SimpleModelsAndRelations.Models.RecommendationPage.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, can_edit_by_token && editable_targets.Any(et => et.Id == t.Id)))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.RecommendationPage.WithoutImages, item => item);
    }

    bool CanAdd_User_User_RecommendationPages(User source) {
      return (from link in _context.User_RecommendationPage
           where link.UserId == source.Id
           from target in _context.RecommendationPage
           where link.RecommendationPageId == target.Id
           select target).Count() < 1;
    }

    bool CanAdd_RecommendationPage_User_RecommendationPages(RecommendationPage target) {
      return (from link in _context.User_RecommendationPage
           where link.RecommendationPageId == target.Id
           from source in _context.User
           where link.UserId == source.Id
           select source).Count() < 1;
    }

    [RestrictToUserType(new string[] {})]
    [HttpPost("{User_id}/User_RecommendationPages_RecommendationPage")]
    public IActionResult /*IEnumerable<RecommendationPage>*/ CreateNewUser_RecommendationPage_RecommendationPage(int User_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.User : _context.User;
      var source = allowed_sources.FirstOrDefault(s => s.Id == User_id);
      var can_create_by_token = ApiTokenValid || true;
      if (source == null || !can_create_by_token)
        return Unauthorized();
        // throw new Exception("Cannot create item in relation User_RecommendationPages");
      var can_link_by_token = ApiTokenValid || true;
      if (!CanAdd_User_User_RecommendationPages(source) || !can_link_by_token)
        return Unauthorized();
        //throw new Exception("Cannot add item to relation User_RecommendationPages");
      var new_target = new RecommendationPage() { CreatedDate = DateTime.Now, Id = _context.RecommendationPage.Max(i => i.Id) + 1 };
      _context.RecommendationPage.Add(new_target);
      _context.SaveChanges();
      var link = new User_RecommendationPage() { Id = _context.User_RecommendationPage.Max(l => l.Id) + 1, UserId = source.Id, RecommendationPageId = new_target.Id };
      _context.User_RecommendationPage.Add(link);
      _context.SaveChanges();
      return Ok(new RecommendationPage[] { new_target });
    }

    [RestrictToUserType(new string[] {"*"})]
    [HttpPost("{User_id}/User_RecommendationPages/{RecommendationPage_id}")]
    public IActionResult LinkWithUser_RecommendationPage(int User_id, int RecommendationPage_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = _context.User;
      var source = allowed_sources.FirstOrDefault(s => s.Id == User_id);
      var allowed_targets = _context.RecommendationPage;
      var target = allowed_targets.FirstOrDefault(s => s.Id == RecommendationPage_id);
      var can_edit_source_by_token = ApiTokenValid || true;
      var can_edit_target_by_token = ApiTokenValid || true;
      var can_link_by_token = ApiTokenValid || true;
      if (!CanAdd_User_User_RecommendationPages(source) || !can_link_by_token || !can_edit_source_by_token || !can_edit_target_by_token)
        return BadRequest();
        // throw new Exception("Cannot add item to relation User_RecommendationPages");
      if (!CanAdd_RecommendationPage_User_RecommendationPages(target))
        return BadRequest();
        // throw new Exception("Cannot add item to relation User_RecommendationPages");
      var link = new User_RecommendationPage() { Id = _context.User_RecommendationPage.Max(i => i.Id) + 1, UserId = source.Id, RecommendationPageId = target.Id };
      _context.User_RecommendationPage.Add(link);
      _context.SaveChanges();
      return Ok();
    }
    [RestrictToUserType(new string[] {"*"})]
    [HttpDelete("{User_id}/User_RecommendationPages/{RecommendationPage_id}")]
    public IActionResult UnlinkFromUser_RecommendationPage(int User_id, int RecommendationPage_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = _context.User;
      var source = allowed_sources.FirstOrDefault(s => s.Id == User_id);
      var allowed_targets = _context.RecommendationPage;
      var target = allowed_targets.FirstOrDefault(s => s.Id == RecommendationPage_id);
      var link = _context.User_RecommendationPage.FirstOrDefault(l => l.UserId == source.Id && l.RecommendationPageId == target.Id);

      var can_edit_source_by_token = ApiTokenValid || true;
      var can_edit_target_by_token = ApiTokenValid || true;
      var can_unlink_by_token = ApiTokenValid || true;
      if (!can_unlink_by_token || !can_edit_source_by_token || !can_edit_target_by_token) return Unauthorized(); // throw new Exception("Cannot remove item from relation User_RecommendationPages");
      _context.User_RecommendationPage.Remove(link);
      _context.SaveChanges();
      return Ok();
    }
    [RestrictToUserType(new string[] {"*"})]
    [HttpGet("{User_id}/User_Ratings")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Page<Rating> GetUser_Ratings(int User_id, [FromQuery] int page_index, [FromQuery] int page_size = 25 )
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.User : _context.User;
      var source = allowed_sources.FirstOrDefault(s => s.Id == User_id);
      var can_create_by_token = ApiTokenValid || true;
      var can_delete_by_token = ApiTokenValid || true || true;
      var can_link_by_token = ApiTokenValid || true;
      var can_view_by_token = ApiTokenValid || true;
      if (source == null || !can_view_by_token) // test
        return Enumerable.Empty<SimpleModelsAndRelations.Models.Rating>() // B
              .AsQueryable()
              .Select(SimpleModelsAndRelations.Models.Rating.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, false))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Rating.WithoutImages, item => item , null);
      var allowed_targets = ApiTokenValid ? _context.Rating : _context.Rating;
      var editable_targets = ApiTokenValid ? _context.Rating : (_context.Rating);
      var can_edit_by_token = ApiTokenValid || true;
      var items = (from link in _context.User_Rating
              where link.UserId == source.Id
              from target in allowed_targets
              where link.RatingId == target.Id
              select target).OrderBy(i => i.CreatedDate).AsQueryable();
      
      return items
              .Select(SimpleModelsAndRelations.Models.Rating.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, can_edit_by_token && editable_targets.Any(et => et.Id == t.Id)))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Rating.WithoutImages, item => item , null);
    }

    [HttpGet("{User_id}/User_Ratings/{Rating_id}")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult /*Rating*/ GetUser_RatingById(int User_id, int Rating_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.User : _context.User;
      var source = allowed_sources.FirstOrDefault(s => s.Id == User_id);
      var can_view_by_token = ApiTokenValid || true;
      if (source == null || !can_view_by_token)
        return NotFound();
      var allowed_targets = ApiTokenValid ? _context.Rating : _context.Rating;
      var item = (from link in _context.User_Rating
              where link.UserId == source.Id
              from target in allowed_targets
              where link.RatingId == target.Id
              select target).OrderBy(i => i.CreatedDate)
              .Select(SimpleModelsAndRelations.Models.Rating.FilterViewableAttributes(current_User))
              .FirstOrDefault(t => t.Id == Rating_id);
      if (item == null) return NotFound();
      item = SimpleModelsAndRelations.Models.Rating.WithoutImages(item);
      return Ok(item);
    }

    [RestrictToUserType(new string[] {"*"})]
    [HttpGet("{User_id}/unlinked/User_Ratings")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Page<Rating> GetUnlinkedUser_Ratings(int User_id, [FromQuery] int page_index, [FromQuery] int page_size = 25)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.User : _context.User;
      var source = allowed_sources.FirstOrDefault(s => s.Id == User_id);
      var can_create_by_token = ApiTokenValid || true;
      var can_delete_by_token = ApiTokenValid || true || true;
      var can_link_by_token = ApiTokenValid || true;
      var can_view_by_token = ApiTokenValid || true;
      if (source == null || !can_view_by_token)
        return Enumerable.Empty<SimpleModelsAndRelations.Models.Rating>()
              .AsQueryable()
              .Select(SimpleModelsAndRelations.Models.Rating.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, false))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Rating.WithoutImages, item => item);
      var allowed_targets = ApiTokenValid ? _context.Rating : _context.Rating;
      var editable_targets = ApiTokenValid ? _context.Rating : (_context.Rating);
      var can_edit_by_token = ApiTokenValid || true;
      return (from target in allowed_targets
              where !_context.User_Rating.Any(link => link.UserId == source.Id && link.RatingId == target.Id) &&
              (from link in _context.User_Rating
                where link.RatingId == target.Id
                from s in _context.User
                where link.UserId == s.Id
                select s).Count() < 1
              select target).OrderBy(i => i.CreatedDate)
              .Select(SimpleModelsAndRelations.Models.Rating.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, can_edit_by_token && editable_targets.Any(et => et.Id == t.Id)))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Rating.WithoutImages, item => item);
    }

    bool CanAdd_User_User_Ratings(User source) {
      return true;
    }

    bool CanAdd_Rating_User_Ratings(Rating target) {
      return (from link in _context.User_Rating
           where link.RatingId == target.Id
           from source in _context.User
           where link.UserId == source.Id
           select source).Count() < 1;
    }

    [RestrictToUserType(new string[] {})]
    [HttpPost("{User_id}/User_Ratings_Rating")]
    public IActionResult /*IEnumerable<Rating>*/ CreateNewUser_Rating_Rating(int User_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.User : _context.User;
      var source = allowed_sources.FirstOrDefault(s => s.Id == User_id);
      var can_create_by_token = ApiTokenValid || true;
      if (source == null || !can_create_by_token)
        return Unauthorized();
        // throw new Exception("Cannot create item in relation User_Ratings");
      var can_link_by_token = ApiTokenValid || true;
      if (!CanAdd_User_User_Ratings(source) || !can_link_by_token)
        return Unauthorized();
        //throw new Exception("Cannot add item to relation User_Ratings");
      var new_target = new Rating() { CreatedDate = DateTime.Now, Id = _context.Rating.Max(i => i.Id) + 1 };
      _context.Rating.Add(new_target);
      _context.SaveChanges();
      var link = new User_Rating() { Id = _context.User_Rating.Max(l => l.Id) + 1, UserId = source.Id, RatingId = new_target.Id };
      _context.User_Rating.Add(link);
      _context.SaveChanges();
      return Ok(new Rating[] { new_target });
    }

    [RestrictToUserType(new string[] {"*"})]
    [HttpPost("{User_id}/User_Ratings/{Rating_id}")]
    public IActionResult LinkWithUser_Rating(int User_id, int Rating_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = _context.User;
      var source = allowed_sources.FirstOrDefault(s => s.Id == User_id);
      var allowed_targets = _context.Rating;
      var target = allowed_targets.FirstOrDefault(s => s.Id == Rating_id);
      var can_edit_source_by_token = ApiTokenValid || true;
      var can_edit_target_by_token = ApiTokenValid || true;
      var can_link_by_token = ApiTokenValid || true;
      if (!CanAdd_User_User_Ratings(source) || !can_link_by_token || !can_edit_source_by_token || !can_edit_target_by_token)
        return BadRequest();
        // throw new Exception("Cannot add item to relation User_Ratings");
      if (!CanAdd_Rating_User_Ratings(target))
        return BadRequest();
        // throw new Exception("Cannot add item to relation User_Ratings");
      var link = new User_Rating() { Id = _context.User_Rating.Max(i => i.Id) + 1, UserId = source.Id, RatingId = target.Id };
      _context.User_Rating.Add(link);
      _context.SaveChanges();
      return Ok();
    }
    [RestrictToUserType(new string[] {"*"})]
    [HttpDelete("{User_id}/User_Ratings/{Rating_id}")]
    public IActionResult UnlinkFromUser_Rating(int User_id, int Rating_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = _context.User;
      var source = allowed_sources.FirstOrDefault(s => s.Id == User_id);
      var allowed_targets = _context.Rating;
      var target = allowed_targets.FirstOrDefault(s => s.Id == Rating_id);
      var link = _context.User_Rating.FirstOrDefault(l => l.UserId == source.Id && l.RatingId == target.Id);

      var can_edit_source_by_token = ApiTokenValid || true;
      var can_edit_target_by_token = ApiTokenValid || true;
      var can_unlink_by_token = ApiTokenValid || true;
      if (!can_unlink_by_token || !can_edit_source_by_token || !can_edit_target_by_token) return Unauthorized(); // throw new Exception("Cannot remove item from relation User_Ratings");
      _context.User_Rating.Remove(link);
      _context.SaveChanges();
      return Ok();
    }
    [RestrictToUserType(new string[] {"*"})]
    [HttpGet("{id}")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult /*ItemWithEditable<UserViewData>*/ GetById(int id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_items = ApiTokenValid ? _context.User : _context.User;
      var editable_items = ApiTokenValid ? _context.User : _context.User;
      var item_full = allowed_items.FirstOrDefault(e => e.Id == id);
      if (item_full == null) return NotFound();
      var item = SimpleModelsAndRelations.Models.User.FilterViewableAttributesLocal(current_User)(item_full);
      item = SimpleModelsAndRelations.Models.User.WithoutImages(item);
      return Ok(new ItemWithEditable<UserViewData>() {
        Item = UserViewData.FromUser(item),
        Editable = editable_items.Any(e => e.Id == item.Id) });
    }
    

    [RestrictToUserType(new string[] {"*"})]
    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult /*UserViewData*/ Create()
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      if (_context.User.Any(u => u.Username == null || u.Email == null || u.Username == "" || u.Email == ""))
        return Unauthorized();
        // throw new Exception("Unauthorized create attempt");
      var can_create_by_token = ApiTokenValid || true;
      if (!can_create_by_token)
        return Unauthorized();
        // throw new Exception("Unauthorized create attempt");
      var item = new User() { CreatedDate = DateTime.Now, Id = _context.User.Max(i => i.Id) + 1 };
      _context.User.Add(SimpleModelsAndRelations.Models.User.FilterViewableAttributesLocal(current_User)(item));
      _context.SaveChanges();
      item = SimpleModelsAndRelations.Models.User.WithoutImages(item);
      return Ok(UserViewData.FromUser(item));
    }

    [RestrictToUserType(new string[] {"*"})]
    [HttpPut]
    [ValidateAntiForgeryToken]
    public IActionResult Update([FromBody] UserViewData item)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_items = ApiTokenValid ? _context.User : _context.User;
      if (!allowed_items.Any(i => i.Id == item.Id)) return Unauthorized();
      var new_item = UserViewData.FromUserViewData(item, _context);
      if (current_User != null && new_item.Id == current_User.Id)
           HttpContext.Set<LoggableEntities>(_context, new LoggableEntities() { User = new_item });
      var can_edit_by_token = ApiTokenValid || true;
      if (item == null || !can_edit_by_token)
        return Unauthorized();
        // throw new Exception("Unauthorized edit attempt");
      _context.Update(new_item);
      _context.Entry(new_item).Property(x => x.Username).IsModified = false;
      _context.Entry(new_item).Property(x => x.Email).IsModified = false;
      _context.Entry(new_item).Property(x => x.CreatedDate).IsModified = false;
      _context.SaveChanges();
      return Ok();
    }

    [RestrictToUserType(new string[] {"*"})]
    [HttpDelete("{id}")]
    [ValidateAntiForgeryToken]
    public IActionResult Delete(int id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_items = ApiTokenValid ? _context.User : _context.User;
      var item = _context.User.FirstOrDefault(e => e.Id == id);
      var can_delete_by_token = ApiTokenValid || true;
      if (item == null || !can_delete_by_token)
        return Unauthorized();
        // throw new Exception("Unauthorized delete attempt");
      
      if (!allowed_items.Any(a => a.Id == item.Id)) return Unauthorized(); // throw new Exception("Unauthorized delete attempt");
      HttpContext.Deleted<User>(_context, "User", item);
      

      _context.User.Remove(item);
      _context.SaveChanges();
      return Ok();
    }


    [RestrictToUserType(new string[] {"*"})]
    [HttpGet]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Page<UserViewData> GetAll([FromQuery] int page_index, [FromQuery] int page_size = 25 )
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_items = ApiTokenValid ? _context.User : _context.User;
      var editable_items = ApiTokenValid ? _context.User : _context.User;
      var can_edit_by_token = ApiTokenValid || true;
      var can_create_by_token = ApiTokenValid || true;
      var can_delete_by_token = ApiTokenValid || true;
      var items = allowed_items.OrderBy(i => i.CreatedDate).AsQueryable();
      
      return items
        .Select(SimpleModelsAndRelations.Models.User.FilterViewableAttributes(current_User))
        .Select(s => Tuple.Create(s, can_edit_by_token && editable_items.Any(es => es.Id == s.Id)))
        .Paginate(can_create_by_token, can_delete_by_token, false, page_index, page_size, SimpleModelsAndRelations.Models.User.WithoutImages, item => UserViewData.FromUser(item) , null );
    }

    


    
  }

  