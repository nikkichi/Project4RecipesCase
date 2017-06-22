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


  [Route("api/v1/Rating")]
  public class RatingApiController : Controller
  {
    private readonly MailOptions _mailOptions;
    public readonly SimpleModelsAndRelationsContext _context;

    public RatingApiController(SimpleModelsAndRelationsContext context, IOptions<MailOptions> mailOptionsAccessor)
    {
      _context = context;
      _mailOptions = mailOptionsAccessor.Value;
    }

    public bool ApiTokenValid => RestrictToUserTypeAttribute.ApiToken != null &&
        HttpContext.Request.Headers["ApiToken"] == RestrictToUserTypeAttribute.ApiToken;

    
    [RestrictToUserType(new string[] {"*"})]
    [HttpGet("{Rating_id}/User_Ratings")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Page<UserViewData> GetUser_Ratings(int Rating_id, [FromQuery] int page_index, [FromQuery] int page_size = 25)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Rating : _context.Rating;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Rating_id);
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
      return (from link in _context.User_Rating
              where link.RatingId == source.Id
              from target in allowed_targets
              where link.UserId == target.Id
              select target)
              .Select(SimpleModelsAndRelations.Models.User.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, can_edit_by_token && editable_targets.Any(et => et.Id == t.Id)))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.User.WithoutImages, item => UserViewData.FromUser(item));
    }

    [HttpGet("{Rating_id}/User_Ratings/{User_id}")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public UserViewData GetUser_RatingById(int Rating_id, int User_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Rating : _context.Rating;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Rating_id);
      var can_view_by_token = ApiTokenValid || true;
      if (source == null || !can_view_by_token)
        return null;
      var allowed_targets = ApiTokenValid ? _context.User : _context.User;
      var item = (from link in _context.User_Rating
              where link.RatingId == source.Id
              from target in allowed_targets
              where link.UserId == target.Id
              select target)
              .Select(SimpleModelsAndRelations.Models.User.FilterViewableAttributes(current_User))
              .FirstOrDefault(t => t.Id == User_id);

      item = SimpleModelsAndRelations.Models.User.WithoutImages(item);
      return UserViewData.FromUser(item);
    }

    [RestrictToUserType(new string[] {"*"})]
    [HttpGet("{Rating_id}/unlinked/User_Ratings")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Page<UserViewData> GetUnlinkedUser_Ratings(int Rating_id, [FromQuery] int page_index, [FromQuery] int page_size = 25)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Rating : _context.Rating;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Rating_id);
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
              where !_context.User_Rating.Any(link => link.RatingId == source.Id && link.UserId == target.Id) &&
              true
              select target)
              .Select(SimpleModelsAndRelations.Models.User.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, can_edit_by_token && editable_targets.Any(et => et.Id == t.Id)))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.User.WithoutImages, item => UserViewData.FromUser(item));
    }

    bool CanAdd_Rating_User_Ratings(Rating source) {
      return (from link in _context.User_Rating
           where link.RatingId == source.Id
           from target in _context.User
           where link.UserId == target.Id
           select target).Count() < 1;
    }

    bool CanAdd_User_User_Ratings(User target) {
      return true;
    }

    [RestrictToUserType(new string[] {"*"})]
    [HttpPost("{Rating_id}/User_Ratings_User")]
    public IEnumerable<UserViewData> CreateNewUser_Rating_User(int Rating_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Rating : _context.Rating;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Rating_id);
      var can_create_by_token = ApiTokenValid || true;
      if (source == null || !can_create_by_token)
        throw new Exception("Cannot create item in relation User_Ratings");
      var can_link_by_token = ApiTokenValid || true;
      if (!CanAdd_Rating_User_Ratings(source) || !can_link_by_token)
        throw new Exception("Cannot add item to relation User_Ratings");
      var new_target = new User() { CreatedDate = DateTime.Now, Id = _context.User.Max(i => i.Id) + 1 };
      _context.User.Add(new_target);
      _context.SaveChanges();
      var link = new User_Rating() { Id = _context.User_Rating.Max(l => l.Id) + 1, RatingId = source.Id, UserId = new_target.Id };
      _context.User_Rating.Add(link);
      _context.SaveChanges();
      return new UserViewData[] { UserViewData.FromUser(new_target) };
    }

    [RestrictToUserType(new string[] {"*"})]
    [HttpPost("{Rating_id}/User_Ratings/{User_id}")]
    public void LinkWithUser_Rating(int Rating_id, int User_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = _context.Rating;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Rating_id);
      var allowed_targets = _context.User;
      var target = allowed_targets.FirstOrDefault(s => s.Id == User_id);
      var can_edit_source_by_token = ApiTokenValid || true;
      var can_edit_target_by_token = ApiTokenValid || true;
      var can_link_by_token = ApiTokenValid || true;
      if (!CanAdd_Rating_User_Ratings(source) || !can_link_by_token || !can_edit_source_by_token || !can_edit_target_by_token)
        throw new Exception("Cannot add item to relation User_Ratings");
      if (!CanAdd_User_User_Ratings(target))
        throw new Exception("Cannot add item to relation User_Ratings");
      var link = new User_Rating() { Id = _context.User_Rating.Max(i => i.Id) + 1, RatingId = source.Id, UserId = target.Id };
      _context.User_Rating.Add(link);
      _context.SaveChanges();
    }
    [RestrictToUserType(new string[] {"*"})]
    [HttpDelete("{Rating_id}/User_Ratings/{User_id}")]
    public void UnlinkFromUser_Rating(int Rating_id, int User_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = _context.Rating;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Rating_id);
      var allowed_targets = _context.User;
      var target = allowed_targets.FirstOrDefault(s => s.Id == User_id);
      var link = _context.User_Rating.FirstOrDefault(l => l.RatingId == source.Id && l.UserId == target.Id);

      var can_edit_source_by_token = ApiTokenValid || true;
      var can_edit_target_by_token = ApiTokenValid || true;
      var can_unlink_by_token = ApiTokenValid || true;
      if (!can_unlink_by_token || !can_edit_source_by_token || !can_edit_target_by_token) throw new Exception("Cannot remove item from relation User_Ratings");
      _context.User_Rating.Remove(link);
      _context.SaveChanges();
    }
    [RestrictToUserType(new string[] {"*"})]
    [HttpGet("{Rating_id}/Rating_Recipes")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Page<Recipe> GetRating_Recipes(int Rating_id, [FromQuery] int page_index, [FromQuery] int page_size = 25)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Rating : _context.Rating;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Rating_id);
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
      return (from link in _context.Rating_Recipe
              where link.RatingId == source.Id
              from target in allowed_targets
              where link.RecipeId == target.Id
              select target)
              .Select(SimpleModelsAndRelations.Models.Recipe.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, can_edit_by_token && editable_targets.Any(et => et.Id == t.Id)))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Recipe.WithoutImages, item => item);
    }

    [HttpGet("{Rating_id}/Rating_Recipes/{Recipe_id}")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Recipe GetRating_RecipeById(int Rating_id, int Recipe_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Rating : _context.Rating;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Rating_id);
      var can_view_by_token = ApiTokenValid || true;
      if (source == null || !can_view_by_token)
        return null;
      var allowed_targets = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var item = (from link in _context.Rating_Recipe
              where link.RatingId == source.Id
              from target in allowed_targets
              where link.RecipeId == target.Id
              select target)
              .Select(SimpleModelsAndRelations.Models.Recipe.FilterViewableAttributes(current_User))
              .FirstOrDefault(t => t.Id == Recipe_id);

      item = SimpleModelsAndRelations.Models.Recipe.WithoutImages(item);
      return item;
    }

    [RestrictToUserType(new string[] {"*"})]
    [HttpGet("{Rating_id}/unlinked/Rating_Recipes")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Page<Recipe> GetUnlinkedRating_Recipes(int Rating_id, [FromQuery] int page_index, [FromQuery] int page_size = 25)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Rating : _context.Rating;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Rating_id);
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
              where !_context.Rating_Recipe.Any(link => link.RatingId == source.Id && link.RecipeId == target.Id) &&
              true
              select target)
              .Select(SimpleModelsAndRelations.Models.Recipe.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, can_edit_by_token && editable_targets.Any(et => et.Id == t.Id)))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Recipe.WithoutImages, item => item);
    }

    bool CanAdd_Rating_Rating_Recipes(Rating source) {
      return true;
    }

    bool CanAdd_Recipe_Rating_Recipes(Recipe target) {
      return true;
    }

    [RestrictToUserType(new string[] {})]
    [HttpPost("{Rating_id}/Rating_Recipes_Recipe")]
    public IEnumerable<Recipe> CreateNewRating_Recipe_Recipe(int Rating_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Rating : _context.Rating;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Rating_id);
      var can_create_by_token = ApiTokenValid || true;
      if (source == null || !can_create_by_token)
        throw new Exception("Cannot create item in relation Rating_Recipes");
      var can_link_by_token = ApiTokenValid || true;
      if (!CanAdd_Rating_Rating_Recipes(source) || !can_link_by_token)
        throw new Exception("Cannot add item to relation Rating_Recipes");
      var new_target = new Recipe() { CreatedDate = DateTime.Now, Id = _context.Recipe.Max(i => i.Id) + 1 };
      _context.Recipe.Add(new_target);
      _context.SaveChanges();
      var link = new Rating_Recipe() { Id = _context.Rating_Recipe.Max(l => l.Id) + 1, RatingId = source.Id, RecipeId = new_target.Id };
      _context.Rating_Recipe.Add(link);
      _context.SaveChanges();
      return new Recipe[] { new_target };
    }

    [RestrictToUserType(new string[] {"*"})]
    [HttpPost("{Rating_id}/Rating_Recipes/{Recipe_id}")]
    public void LinkWithRating_Recipe(int Rating_id, int Recipe_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = _context.Rating;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Rating_id);
      var allowed_targets = _context.Recipe;
      var target = allowed_targets.FirstOrDefault(s => s.Id == Recipe_id);
      var can_edit_source_by_token = ApiTokenValid || true;
      var can_edit_target_by_token = ApiTokenValid || true;
      var can_link_by_token = ApiTokenValid || true;
      if (!CanAdd_Rating_Rating_Recipes(source) || !can_link_by_token || !can_edit_source_by_token || !can_edit_target_by_token)
        throw new Exception("Cannot add item to relation Rating_Recipes");
      if (!CanAdd_Recipe_Rating_Recipes(target))
        throw new Exception("Cannot add item to relation Rating_Recipes");
      var link = new Rating_Recipe() { Id = _context.Rating_Recipe.Max(i => i.Id) + 1, RatingId = source.Id, RecipeId = target.Id };
      _context.Rating_Recipe.Add(link);
      _context.SaveChanges();
    }
    [RestrictToUserType(new string[] {"*"})]
    [HttpDelete("{Rating_id}/Rating_Recipes/{Recipe_id}")]
    public void UnlinkFromRating_Recipe(int Rating_id, int Recipe_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = _context.Rating;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Rating_id);
      var allowed_targets = _context.Recipe;
      var target = allowed_targets.FirstOrDefault(s => s.Id == Recipe_id);
      var link = _context.Rating_Recipe.FirstOrDefault(l => l.RatingId == source.Id && l.RecipeId == target.Id);

      var can_edit_source_by_token = ApiTokenValid || true;
      var can_edit_target_by_token = ApiTokenValid || true;
      var can_unlink_by_token = ApiTokenValid || true;
      if (!can_unlink_by_token || !can_edit_source_by_token || !can_edit_target_by_token) throw new Exception("Cannot remove item from relation Rating_Recipes");
      _context.Rating_Recipe.Remove(link);
      _context.SaveChanges();
    }
    [RestrictToUserType(new string[] {"*"})]
    [HttpGet("{id}")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public ItemWithEditable<Rating> GetById(int id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_items = ApiTokenValid ? _context.Rating : _context.Rating;
      var editable_items = ApiTokenValid ? _context.Rating : _context.Rating;
      var item = SimpleModelsAndRelations.Models.Rating.FilterViewableAttributesLocal(current_User)(allowed_items.FirstOrDefault(e => e.Id == id));
      item = SimpleModelsAndRelations.Models.Rating.WithoutImages(item);
      return new ItemWithEditable<Rating>() {
        Item = item,
        Editable = editable_items.Any(e => e.Id == item.Id) };
    }
    

    [RestrictToUserType(new string[] {})]
    [HttpPost]
    [ValidateAntiForgeryToken]
    public Rating Create()
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var can_create_by_token = ApiTokenValid || true;
      if (!can_create_by_token)
        throw new Exception("Unauthorized create attempt");
      var item = new Rating() { CreatedDate = DateTime.Now, Id = _context.Rating.Max(i => i.Id) + 1 };
      _context.Rating.Add(SimpleModelsAndRelations.Models.Rating.FilterViewableAttributesLocal(current_User)(item));
      _context.SaveChanges();
      item = SimpleModelsAndRelations.Models.Rating.WithoutImages(item);
      return item;
    }

    [RestrictToUserType(new string[] {"*"})]
    [HttpPut]
    [ValidateAntiForgeryToken]
    public void Update([FromBody] Rating item)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_items = ApiTokenValid ? _context.Rating : _context.Rating;
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
      var allowed_items = ApiTokenValid ? _context.Rating : _context.Rating;
      var item = _context.Rating.FirstOrDefault(e => e.Id == id);
      var can_delete_by_token = ApiTokenValid || true;
      if (item == null || !can_delete_by_token)
        throw new Exception("Unauthorized delete attempt");
      
      if (!allowed_items.Any(a => a.Id == item.Id)) throw new Exception("Unauthorized delete attempt");
      
      _context.Rating.Remove(item);
      _context.SaveChanges();
    }

    [RestrictToUserType(new string[] {"*"})]
    [HttpGet]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Page<Rating> GetAll([FromQuery] int page_index, [FromQuery] int page_size = 25)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_items = ApiTokenValid ? _context.Rating : _context.Rating;
      var editable_items = ApiTokenValid ? _context.Rating : _context.Rating;
      var can_edit_by_token = ApiTokenValid || true;
      var can_create_by_token = ApiTokenValid || true;
      var can_delete_by_token = ApiTokenValid || true;
      return allowed_items
        .Select(SimpleModelsAndRelations.Models.Rating.FilterViewableAttributes(current_User))
        .Select(s => Tuple.Create(s, can_edit_by_token && editable_items.Any(es => es.Id == s.Id)))
        .Paginate(can_create_by_token, can_delete_by_token, false, page_index, page_size, SimpleModelsAndRelations.Models.Rating.WithoutImages, item => item);
    }

    


    
  }

  