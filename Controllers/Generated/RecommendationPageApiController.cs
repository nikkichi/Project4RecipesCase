using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using SendGrid;
using SendGrid.Helpers.Mail;
using SimpleModelsAndRelations;
using SimpleModelsAndRelations.Models;
using SimpleModelsAndRelations.Filters;
using System.IO;


  [Route("api/v1/RecommendationPage")]
  public class RecommendationPageApiController : Controller
  {
    private readonly MailOptions _mailOptions;
    public readonly SimpleModelsAndRelationsContext _context;

    public RecommendationPageApiController(SimpleModelsAndRelationsContext context, IOptions<MailOptions> mailOptionsAccessor)
    {
      _context = context;
      _mailOptions = mailOptionsAccessor.Value;
    }

    public bool ApiTokenValid => RestrictToUserTypeAttribute.ApiToken != null &&
        HttpContext.Request.Headers["ApiToken"] == RestrictToUserTypeAttribute.ApiToken;

    
    [RestrictToUserType(new string[] {"*"})]
    [HttpGet("{RecommendationPage_id}/User_RecommendationPages")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Page<UserViewData> GetUser_RecommendationPages(int RecommendationPage_id, [FromQuery] int page_index, [FromQuery] int page_size = 25)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.RecommendationPage : _context.RecommendationPage;
      var source = allowed_sources.FirstOrDefault(s => s.Id == RecommendationPage_id);
      var can_create_by_token = ApiTokenValid || true;
      var can_delete_by_token = ApiTokenValid || true || true;
      var can_link_by_token = ApiTokenValid || true;
      var can_view_by_token = ApiTokenValid || true;
      if (source == null || !can_view_by_token) // test
        return Enumerable.Empty<SimpleModelsAndRelations.Models.User>() // B
              .AsQueryable()
              .Select(SimpleModelsAndRelations.Models.User.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, false))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.User.WithoutImages, item => UserViewData.FromUser(item));
      var allowed_targets = ApiTokenValid ? _context.User : _context.User;
      var editable_targets = ApiTokenValid ? _context.User : (_context.User);
      var can_edit_by_token = ApiTokenValid || true;
      return (from link in _context.User_RecommendationPage
              where link.RecommendationPageId == source.Id
              from target in allowed_targets
              where link.UserId == target.Id
              select target)
              .Select(SimpleModelsAndRelations.Models.User.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, can_edit_by_token && editable_targets.Any(et => et.Id == t.Id)))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.User.WithoutImages, item => UserViewData.FromUser(item));
    }

    [HttpGet("{RecommendationPage_id}/User_RecommendationPages/{User_id}")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public UserViewData GetUser_RecommendationPageById(int RecommendationPage_id, int User_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.RecommendationPage : _context.RecommendationPage;
      var source = allowed_sources.FirstOrDefault(s => s.Id == RecommendationPage_id);
      var can_view_by_token = ApiTokenValid || true;
      if (source == null || !can_view_by_token)
        return null;
      var allowed_targets = ApiTokenValid ? _context.User : _context.User;
      var item = (from link in _context.User_RecommendationPage
              where link.RecommendationPageId == source.Id
              from target in allowed_targets
              where link.UserId == target.Id
              select target)
              .Select(SimpleModelsAndRelations.Models.User.FilterViewableAttributes(current_User))
              .FirstOrDefault(t => t.Id == User_id);

      item = SimpleModelsAndRelations.Models.User.WithoutImages(item);
      return UserViewData.FromUser(item);
    }

    [RestrictToUserType(new string[] {"*"})]
    [HttpGet("{RecommendationPage_id}/unlinked/User_RecommendationPages")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Page<UserViewData> GetUnlinkedUser_RecommendationPages(int RecommendationPage_id, [FromQuery] int page_index, [FromQuery] int page_size = 25)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.RecommendationPage : _context.RecommendationPage;
      var source = allowed_sources.FirstOrDefault(s => s.Id == RecommendationPage_id);
      var can_create_by_token = ApiTokenValid || true;
      var can_delete_by_token = ApiTokenValid || true || true;
      var can_link_by_token = ApiTokenValid || true;
      var can_view_by_token = ApiTokenValid || true;
      if (source == null || !can_view_by_token) // test
        return Enumerable.Empty<SimpleModelsAndRelations.Models.User>() // C
              .AsQueryable()
              .Select(SimpleModelsAndRelations.Models.User.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, false))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.User.WithoutImages, item => UserViewData.FromUser(item));
      var allowed_targets = ApiTokenValid ? _context.User : _context.User;
      var editable_targets = ApiTokenValid ? _context.User : (_context.User);
      var can_edit_by_token = ApiTokenValid || true;
      return (from target in allowed_targets
              where !_context.User_RecommendationPage.Any(link => link.RecommendationPageId == source.Id && link.UserId == target.Id) &&
              (from link in _context.User_RecommendationPage
                where link.UserId == target.Id
                from s in _context.RecommendationPage
                where link.RecommendationPageId == s.Id
                select s).Count() < 1
              select target)
              .Select(SimpleModelsAndRelations.Models.User.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, can_edit_by_token && editable_targets.Any(et => et.Id == t.Id)))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.User.WithoutImages, item => UserViewData.FromUser(item));
    }

    bool CanAdd_RecommendationPage_User_RecommendationPages(RecommendationPage source) {
      return (from link in _context.User_RecommendationPage
           where link.RecommendationPageId == source.Id
           from target in _context.User
           where link.UserId == target.Id
           select target).Count() < 1;
    }

    bool CanAdd_User_User_RecommendationPages(User target) {
      return (from link in _context.User_RecommendationPage
           where link.UserId == target.Id
           from source in _context.RecommendationPage
           where link.RecommendationPageId == source.Id
           select source).Count() < 1;
    }

    [RestrictToUserType(new string[] {"*"})]
    [HttpPost("{RecommendationPage_id}/User_RecommendationPages_User")]
    public IEnumerable<UserViewData> CreateNewUser_RecommendationPage_User(int RecommendationPage_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.RecommendationPage : _context.RecommendationPage;
      var source = allowed_sources.FirstOrDefault(s => s.Id == RecommendationPage_id);
      var can_create_by_token = ApiTokenValid || true;
      if (source == null || !can_create_by_token)
        throw new Exception("Cannot create item in relation User_RecommendationPages");
      var can_link_by_token = ApiTokenValid || true;
      if (!CanAdd_RecommendationPage_User_RecommendationPages(source) || !can_link_by_token)
        throw new Exception("Cannot add item to relation User_RecommendationPages");
      var new_target = new User() { CreatedDate = DateTime.Now, Id = _context.User.Max(i => i.Id) + 1 };
      _context.User.Add(new_target);
      _context.SaveChanges();
      var link = new User_RecommendationPage() { Id = _context.User_RecommendationPage.Max(l => l.Id) + 1, RecommendationPageId = source.Id, UserId = new_target.Id };
      _context.User_RecommendationPage.Add(link);
      _context.SaveChanges();
      return new UserViewData[] { UserViewData.FromUser(new_target) };
    }

    [RestrictToUserType(new string[] {"*"})]
    [HttpPost("{RecommendationPage_id}/User_RecommendationPages/{User_id}")]
    public void LinkWithUser_RecommendationPage(int RecommendationPage_id, int User_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = _context.RecommendationPage;
      var source = allowed_sources.FirstOrDefault(s => s.Id == RecommendationPage_id);
      var allowed_targets = _context.User;
      var target = allowed_targets.FirstOrDefault(s => s.Id == User_id);
      var can_edit_source_by_token = ApiTokenValid || true;
      var can_edit_target_by_token = ApiTokenValid || true;
      var can_link_by_token = ApiTokenValid || true;
      if (!CanAdd_RecommendationPage_User_RecommendationPages(source) || !can_link_by_token || !can_edit_source_by_token || !can_edit_target_by_token)
        throw new Exception("Cannot add item to relation User_RecommendationPages");
      if (!CanAdd_User_User_RecommendationPages(target))
        throw new Exception("Cannot add item to relation User_RecommendationPages");
      var link = new User_RecommendationPage() { Id = _context.User_RecommendationPage.Max(i => i.Id) + 1, RecommendationPageId = source.Id, UserId = target.Id };
      _context.User_RecommendationPage.Add(link);
      _context.SaveChanges();
    }
    [RestrictToUserType(new string[] {"*"})]
    [HttpDelete("{RecommendationPage_id}/User_RecommendationPages/{User_id}")]
    public void UnlinkFromUser_RecommendationPage(int RecommendationPage_id, int User_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = _context.RecommendationPage;
      var source = allowed_sources.FirstOrDefault(s => s.Id == RecommendationPage_id);
      var allowed_targets = _context.User;
      var target = allowed_targets.FirstOrDefault(s => s.Id == User_id);
      var link = _context.User_RecommendationPage.FirstOrDefault(l => l.RecommendationPageId == source.Id && l.UserId == target.Id);

      var can_edit_source_by_token = ApiTokenValid || true;
      var can_edit_target_by_token = ApiTokenValid || true;
      var can_unlink_by_token = ApiTokenValid || true;
      if (!can_unlink_by_token || !can_edit_source_by_token || !can_edit_target_by_token) throw new Exception("Cannot remove item from relation User_RecommendationPages");
      _context.User_RecommendationPage.Remove(link);
      _context.SaveChanges();
    }
    [RestrictToUserType(new string[] {"*"})]
    [HttpGet("{RecommendationPage_id}/RecommendationPage_Recipes")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Page<Recipe> GetRecommendationPage_Recipes(int RecommendationPage_id, [FromQuery] int page_index, [FromQuery] int page_size = 25)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.RecommendationPage : _context.RecommendationPage;
      var source = allowed_sources.FirstOrDefault(s => s.Id == RecommendationPage_id);
      var can_create_by_token = ApiTokenValid || true;
      var can_delete_by_token = ApiTokenValid || true || true;
      var can_link_by_token = ApiTokenValid || true;
      var can_view_by_token = ApiTokenValid || true;
      if (source == null || !can_view_by_token) // test
        return Enumerable.Empty<SimpleModelsAndRelations.Models.Recipe>() // B
              .AsQueryable()
              .Select(SimpleModelsAndRelations.Models.Recipe.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, false))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Recipe.WithoutImages, item => item);
      var allowed_targets = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var editable_targets = ApiTokenValid ? _context.Recipe : (_context.Recipe);
      var can_edit_by_token = ApiTokenValid || true;
      return (from link in _context.RecommendationPage_Recipe
              where link.RecommendationPageId == source.Id
              from target in allowed_targets
              where link.RecipeId == target.Id
              select target)
              .Select(SimpleModelsAndRelations.Models.Recipe.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, can_edit_by_token && editable_targets.Any(et => et.Id == t.Id)))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Recipe.WithoutImages, item => item);
    }

    [HttpGet("{RecommendationPage_id}/RecommendationPage_Recipes/{Recipe_id}")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Recipe GetRecommendationPage_RecipeById(int RecommendationPage_id, int Recipe_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.RecommendationPage : _context.RecommendationPage;
      var source = allowed_sources.FirstOrDefault(s => s.Id == RecommendationPage_id);
      var can_view_by_token = ApiTokenValid || true;
      if (source == null || !can_view_by_token)
        return null;
      var allowed_targets = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var item = (from link in _context.RecommendationPage_Recipe
              where link.RecommendationPageId == source.Id
              from target in allowed_targets
              where link.RecipeId == target.Id
              select target)
              .Select(SimpleModelsAndRelations.Models.Recipe.FilterViewableAttributes(current_User))
              .FirstOrDefault(t => t.Id == Recipe_id);

      item = SimpleModelsAndRelations.Models.Recipe.WithoutImages(item);
      return item;
    }

    [RestrictToUserType(new string[] {"*"})]
    [HttpGet("{RecommendationPage_id}/unlinked/RecommendationPage_Recipes")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Page<Recipe> GetUnlinkedRecommendationPage_Recipes(int RecommendationPage_id, [FromQuery] int page_index, [FromQuery] int page_size = 25)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.RecommendationPage : _context.RecommendationPage;
      var source = allowed_sources.FirstOrDefault(s => s.Id == RecommendationPage_id);
      var can_create_by_token = ApiTokenValid || true;
      var can_delete_by_token = ApiTokenValid || true || true;
      var can_link_by_token = ApiTokenValid || true;
      var can_view_by_token = ApiTokenValid || true;
      if (source == null || !can_view_by_token) // test
        return Enumerable.Empty<SimpleModelsAndRelations.Models.Recipe>() // C
              .AsQueryable()
              .Select(SimpleModelsAndRelations.Models.Recipe.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, false))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Recipe.WithoutImages, item => item);
      var allowed_targets = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var editable_targets = ApiTokenValid ? _context.Recipe : (_context.Recipe);
      var can_edit_by_token = ApiTokenValid || true;
      return (from target in allowed_targets
              where !_context.RecommendationPage_Recipe.Any(link => link.RecommendationPageId == source.Id && link.RecipeId == target.Id) &&
              true
              select target)
              .Select(SimpleModelsAndRelations.Models.Recipe.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, can_edit_by_token && editable_targets.Any(et => et.Id == t.Id)))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Recipe.WithoutImages, item => item);
    }

    bool CanAdd_RecommendationPage_RecommendationPage_Recipes(RecommendationPage source) {
      return true;
    }

    bool CanAdd_Recipe_RecommendationPage_Recipes(Recipe target) {
      return true;
    }

    [RestrictToUserType(new string[] {})]
    [HttpPost("{RecommendationPage_id}/RecommendationPage_Recipes_Recipe")]
    public IEnumerable<Recipe> CreateNewRecommendationPage_Recipe_Recipe(int RecommendationPage_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.RecommendationPage : _context.RecommendationPage;
      var source = allowed_sources.FirstOrDefault(s => s.Id == RecommendationPage_id);
      var can_create_by_token = ApiTokenValid || true;
      if (source == null || !can_create_by_token)
        throw new Exception("Cannot create item in relation RecommendationPage_Recipes");
      var can_link_by_token = ApiTokenValid || true;
      if (!CanAdd_RecommendationPage_RecommendationPage_Recipes(source) || !can_link_by_token)
        throw new Exception("Cannot add item to relation RecommendationPage_Recipes");
      var new_target = new Recipe() { CreatedDate = DateTime.Now, Id = _context.Recipe.Max(i => i.Id) + 1 };
      _context.Recipe.Add(new_target);
      _context.SaveChanges();
      var link = new RecommendationPage_Recipe() { Id = _context.RecommendationPage_Recipe.Max(l => l.Id) + 1, RecommendationPageId = source.Id, RecipeId = new_target.Id };
      _context.RecommendationPage_Recipe.Add(link);
      _context.SaveChanges();
      return new Recipe[] { new_target };
    }

    [RestrictToUserType(new string[] {"*"})]
    [HttpPost("{RecommendationPage_id}/RecommendationPage_Recipes/{Recipe_id}")]
    public void LinkWithRecommendationPage_Recipe(int RecommendationPage_id, int Recipe_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = _context.RecommendationPage;
      var source = allowed_sources.FirstOrDefault(s => s.Id == RecommendationPage_id);
      var allowed_targets = _context.Recipe;
      var target = allowed_targets.FirstOrDefault(s => s.Id == Recipe_id);
      var can_edit_source_by_token = ApiTokenValid || true;
      var can_edit_target_by_token = ApiTokenValid || true;
      var can_link_by_token = ApiTokenValid || true;
      if (!CanAdd_RecommendationPage_RecommendationPage_Recipes(source) || !can_link_by_token || !can_edit_source_by_token || !can_edit_target_by_token)
        throw new Exception("Cannot add item to relation RecommendationPage_Recipes");
      if (!CanAdd_Recipe_RecommendationPage_Recipes(target))
        throw new Exception("Cannot add item to relation RecommendationPage_Recipes");
      var link = new RecommendationPage_Recipe() { Id = _context.RecommendationPage_Recipe.Max(i => i.Id) + 1, RecommendationPageId = source.Id, RecipeId = target.Id };
      _context.RecommendationPage_Recipe.Add(link);
      _context.SaveChanges();
    }
    [RestrictToUserType(new string[] {"*"})]
    [HttpDelete("{RecommendationPage_id}/RecommendationPage_Recipes/{Recipe_id}")]
    public void UnlinkFromRecommendationPage_Recipe(int RecommendationPage_id, int Recipe_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = _context.RecommendationPage;
      var source = allowed_sources.FirstOrDefault(s => s.Id == RecommendationPage_id);
      var allowed_targets = _context.Recipe;
      var target = allowed_targets.FirstOrDefault(s => s.Id == Recipe_id);
      var link = _context.RecommendationPage_Recipe.FirstOrDefault(l => l.RecommendationPageId == source.Id && l.RecipeId == target.Id);

      var can_edit_source_by_token = ApiTokenValid || true;
      var can_edit_target_by_token = ApiTokenValid || true;
      var can_unlink_by_token = ApiTokenValid || true;
      if (!can_unlink_by_token || !can_edit_source_by_token || !can_edit_target_by_token) throw new Exception("Cannot remove item from relation RecommendationPage_Recipes");
      _context.RecommendationPage_Recipe.Remove(link);
      _context.SaveChanges();
    }
    [RestrictToUserType(new string[] {"*"})]
    [HttpGet("{id}")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public ItemWithEditable<RecommendationPage> GetById(int id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_items = ApiTokenValid ? _context.RecommendationPage : _context.RecommendationPage;
      var editable_items = ApiTokenValid ? _context.RecommendationPage : _context.RecommendationPage;
      var item = SimpleModelsAndRelations.Models.RecommendationPage.FilterViewableAttributesLocal(current_User)(allowed_items.FirstOrDefault(e => e.Id == id));
      item = SimpleModelsAndRelations.Models.RecommendationPage.WithoutImages(item);
      return new ItemWithEditable<RecommendationPage>() {
        Item = item,
        Editable = editable_items.Any(e => e.Id == item.Id) };
    }
    

    [RestrictToUserType(new string[] {})]
    [HttpPost]
    [ValidateAntiForgeryToken]
    public RecommendationPage Create()
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var can_create_by_token = ApiTokenValid || true;
      if (!can_create_by_token)
        throw new Exception("Unauthorized create attempt");
      var item = new RecommendationPage() { CreatedDate = DateTime.Now, Id = _context.RecommendationPage.Max(i => i.Id) + 1 };
      _context.RecommendationPage.Add(SimpleModelsAndRelations.Models.RecommendationPage.FilterViewableAttributesLocal(current_User)(item));
      _context.SaveChanges();
      item = SimpleModelsAndRelations.Models.RecommendationPage.WithoutImages(item);
      return item;
    }

    [RestrictToUserType(new string[] {"*"})]
    [HttpPut]
    [ValidateAntiForgeryToken]
    public void Update([FromBody] RecommendationPage item)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_items = ApiTokenValid ? _context.RecommendationPage : _context.RecommendationPage;
      if (!allowed_items.Any(i => i.Id == item.Id)) return;
      var new_item = item;
      
      var can_edit_by_token = ApiTokenValid || true;
      if (item == null || !can_edit_by_token)
        throw new Exception("Unauthorized edit attempt");
      _context.Update(new_item);
      _context.Entry(new_item).Property(x => x.CreatedDate).IsModified = false;
      _context.SaveChanges();
    }

    [RestrictToUserType(new string[] {})]
    [HttpDelete("{id}")]
    [ValidateAntiForgeryToken]
    public void Delete(int id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_items = ApiTokenValid ? _context.RecommendationPage : _context.RecommendationPage;
      var item = _context.RecommendationPage.FirstOrDefault(e => e.Id == id);
      var can_delete_by_token = ApiTokenValid || true;
      if (item == null || !can_delete_by_token)
        throw new Exception("Unauthorized delete attempt");
      
      if (!allowed_items.Any(a => a.Id == item.Id)) throw new Exception("Unauthorized delete attempt");
      
      _context.RecommendationPage.Remove(item);
      _context.SaveChanges();
    }

    [RestrictToUserType(new string[] {"*"})]
    [HttpGet]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Page<RecommendationPage> GetAll([FromQuery] int page_index, [FromQuery] int page_size = 25)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_items = ApiTokenValid ? _context.RecommendationPage : _context.RecommendationPage;
      var editable_items = ApiTokenValid ? _context.RecommendationPage : _context.RecommendationPage;
      var can_edit_by_token = ApiTokenValid || true;
      var can_create_by_token = ApiTokenValid || true;
      var can_delete_by_token = ApiTokenValid || true;
      return allowed_items
        .Select(SimpleModelsAndRelations.Models.RecommendationPage.FilterViewableAttributes(current_User))
        .Select(s => Tuple.Create(s, can_edit_by_token && editable_items.Any(es => es.Id == s.Id)))
        .Paginate(can_create_by_token, can_delete_by_token, false, page_index, page_size, SimpleModelsAndRelations.Models.RecommendationPage.WithoutImages, item => item);
    }

    


    
  }

  