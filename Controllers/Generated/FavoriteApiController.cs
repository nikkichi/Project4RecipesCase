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


  [Route("api/v1/Favorite")]
  public class FavoriteApiController : Controller
  {
    private readonly MailOptions _mailOptions;
    public readonly SimpleModelsAndRelationsContext _context;

    public FavoriteApiController(SimpleModelsAndRelationsContext context, IOptions<MailOptions> mailOptionsAccessor)
    {
      _context = context;
      _mailOptions = mailOptionsAccessor.Value;
    }

    public bool ApiTokenValid => RestrictToUserTypeAttribute.ApiToken != null &&
        HttpContext.Request.Headers["ApiToken"] == RestrictToUserTypeAttribute.ApiToken;

    
    [RestrictToUserType(new string[] {"*"})]
    [HttpGet("{Favorite_id}/User_Favorites")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Page<UserViewData> GetUser_Favorites(int Favorite_id, [FromQuery] int page_index, [FromQuery] int page_size = 25)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Favorite : _context.Favorite;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Favorite_id);
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
      return (from link in _context.User_Favorite
              where link.FavoriteId == source.Id
              from target in allowed_targets
              where link.UserId == target.Id
              select target)
              .Select(SimpleModelsAndRelations.Models.User.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, can_edit_by_token && editable_targets.Any(et => et.Id == t.Id)))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.User.WithoutImages, item => UserViewData.FromUser(item));
    }

    [HttpGet("{Favorite_id}/User_Favorites/{User_id}")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public UserViewData GetUser_FavoriteById(int Favorite_id, int User_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Favorite : _context.Favorite;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Favorite_id);
      var can_view_by_token = ApiTokenValid || true;
      if (source == null || !can_view_by_token)
        return null;
      var allowed_targets = ApiTokenValid ? _context.User : _context.User;
      var item = (from link in _context.User_Favorite
              where link.FavoriteId == source.Id
              from target in allowed_targets
              where link.UserId == target.Id
              select target)
              .Select(SimpleModelsAndRelations.Models.User.FilterViewableAttributes(current_User))
              .FirstOrDefault(t => t.Id == User_id);

      item = SimpleModelsAndRelations.Models.User.WithoutImages(item);
      return UserViewData.FromUser(item);
    }

    [RestrictToUserType(new string[] {"*"})]
    [HttpGet("{Favorite_id}/unlinked/User_Favorites")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Page<UserViewData> GetUnlinkedUser_Favorites(int Favorite_id, [FromQuery] int page_index, [FromQuery] int page_size = 25)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Favorite : _context.Favorite;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Favorite_id);
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
              where !_context.User_Favorite.Any(link => link.FavoriteId == source.Id && link.UserId == target.Id) &&
              (from link in _context.User_Favorite
                where link.UserId == target.Id
                from s in _context.Favorite
                where link.FavoriteId == s.Id
                select s).Count() < 1
              select target)
              .Select(SimpleModelsAndRelations.Models.User.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, can_edit_by_token && editable_targets.Any(et => et.Id == t.Id)))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.User.WithoutImages, item => UserViewData.FromUser(item));
    }

    bool CanAdd_Favorite_User_Favorites(Favorite source) {
      return (from link in _context.User_Favorite
           where link.FavoriteId == source.Id
           from target in _context.User
           where link.UserId == target.Id
           select target).Count() < 1;
    }

    bool CanAdd_User_User_Favorites(User target) {
      return (from link in _context.User_Favorite
           where link.UserId == target.Id
           from source in _context.Favorite
           where link.FavoriteId == source.Id
           select source).Count() < 1;
    }

    [RestrictToUserType(new string[] {"*"})]
    [HttpPost("{Favorite_id}/User_Favorites_User")]
    public IEnumerable<UserViewData> CreateNewUser_Favorite_User(int Favorite_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Favorite : _context.Favorite;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Favorite_id);
      var can_create_by_token = ApiTokenValid || true;
      if (source == null || !can_create_by_token)
        throw new Exception("Cannot create item in relation User_Favorites");
      var can_link_by_token = ApiTokenValid || true;
      if (!CanAdd_Favorite_User_Favorites(source) || !can_link_by_token)
        throw new Exception("Cannot add item to relation User_Favorites");
      var new_target = new User() { CreatedDate = DateTime.Now, Id = _context.User.Max(i => i.Id) + 1 };
      _context.User.Add(new_target);
      _context.SaveChanges();
      var link = new User_Favorite() { Id = _context.User_Favorite.Max(l => l.Id) + 1, FavoriteId = source.Id, UserId = new_target.Id };
      _context.User_Favorite.Add(link);
      _context.SaveChanges();
      return new UserViewData[] { UserViewData.FromUser(new_target) };
    }

    [RestrictToUserType(new string[] {"*"})]
    [HttpPost("{Favorite_id}/User_Favorites/{User_id}")]
    public void LinkWithUser_Favorite(int Favorite_id, int User_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = _context.Favorite;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Favorite_id);
      var allowed_targets = _context.User;
      var target = allowed_targets.FirstOrDefault(s => s.Id == User_id);
      var can_edit_source_by_token = ApiTokenValid || true;
      var can_edit_target_by_token = ApiTokenValid || true;
      var can_link_by_token = ApiTokenValid || true;
      if (!CanAdd_Favorite_User_Favorites(source) || !can_link_by_token || !can_edit_source_by_token || !can_edit_target_by_token)
        throw new Exception("Cannot add item to relation User_Favorites");
      if (!CanAdd_User_User_Favorites(target))
        throw new Exception("Cannot add item to relation User_Favorites");
      var link = new User_Favorite() { Id = _context.User_Favorite.Max(i => i.Id) + 1, FavoriteId = source.Id, UserId = target.Id };
      _context.User_Favorite.Add(link);
      _context.SaveChanges();
    }
    [RestrictToUserType(new string[] {"*"})]
    [HttpDelete("{Favorite_id}/User_Favorites/{User_id}")]
    public void UnlinkFromUser_Favorite(int Favorite_id, int User_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = _context.Favorite;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Favorite_id);
      var allowed_targets = _context.User;
      var target = allowed_targets.FirstOrDefault(s => s.Id == User_id);
      var link = _context.User_Favorite.FirstOrDefault(l => l.FavoriteId == source.Id && l.UserId == target.Id);

      var can_edit_source_by_token = ApiTokenValid || true;
      var can_edit_target_by_token = ApiTokenValid || true;
      var can_unlink_by_token = ApiTokenValid || true;
      if (!can_unlink_by_token || !can_edit_source_by_token || !can_edit_target_by_token) throw new Exception("Cannot remove item from relation User_Favorites");
      _context.User_Favorite.Remove(link);
      _context.SaveChanges();
    }
    [RestrictToUserType(new string[] {"*"})]
    [HttpGet("{Favorite_id}/Favorite_Recipes")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Page<Recipe> GetFavorite_Recipes(int Favorite_id, [FromQuery] int page_index, [FromQuery] int page_size = 25)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Favorite : _context.Favorite;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Favorite_id);
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
      return (from link in _context.Favorite_Recipe
              where link.FavoriteId == source.Id
              from target in allowed_targets
              where link.RecipeId == target.Id
              select target)
              .Select(SimpleModelsAndRelations.Models.Recipe.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, can_edit_by_token && editable_targets.Any(et => et.Id == t.Id)))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Recipe.WithoutImages, item => item);
    }

    [HttpGet("{Favorite_id}/Favorite_Recipes/{Recipe_id}")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Recipe GetFavorite_RecipeById(int Favorite_id, int Recipe_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Favorite : _context.Favorite;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Favorite_id);
      var can_view_by_token = ApiTokenValid || true;
      if (source == null || !can_view_by_token)
        return null;
      var allowed_targets = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var item = (from link in _context.Favorite_Recipe
              where link.FavoriteId == source.Id
              from target in allowed_targets
              where link.RecipeId == target.Id
              select target)
              .Select(SimpleModelsAndRelations.Models.Recipe.FilterViewableAttributes(current_User))
              .FirstOrDefault(t => t.Id == Recipe_id);

      item = SimpleModelsAndRelations.Models.Recipe.WithoutImages(item);
      return item;
    }

    [RestrictToUserType(new string[] {"*"})]
    [HttpGet("{Favorite_id}/unlinked/Favorite_Recipes")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Page<Recipe> GetUnlinkedFavorite_Recipes(int Favorite_id, [FromQuery] int page_index, [FromQuery] int page_size = 25)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Favorite : _context.Favorite;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Favorite_id);
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
              where !_context.Favorite_Recipe.Any(link => link.FavoriteId == source.Id && link.RecipeId == target.Id) &&
              true
              select target)
              .Select(SimpleModelsAndRelations.Models.Recipe.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, can_edit_by_token && editable_targets.Any(et => et.Id == t.Id)))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Recipe.WithoutImages, item => item);
    }

    bool CanAdd_Favorite_Favorite_Recipes(Favorite source) {
      return true;
    }

    bool CanAdd_Recipe_Favorite_Recipes(Recipe target) {
      return true;
    }

    [RestrictToUserType(new string[] {})]
    [HttpPost("{Favorite_id}/Favorite_Recipes_Recipe")]
    public IEnumerable<Recipe> CreateNewFavorite_Recipe_Recipe(int Favorite_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Favorite : _context.Favorite;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Favorite_id);
      var can_create_by_token = ApiTokenValid || true;
      if (source == null || !can_create_by_token)
        throw new Exception("Cannot create item in relation Favorite_Recipes");
      var can_link_by_token = ApiTokenValid || true;
      if (!CanAdd_Favorite_Favorite_Recipes(source) || !can_link_by_token)
        throw new Exception("Cannot add item to relation Favorite_Recipes");
      var new_target = new Recipe() { CreatedDate = DateTime.Now, Id = _context.Recipe.Max(i => i.Id) + 1 };
      _context.Recipe.Add(new_target);
      _context.SaveChanges();
      var link = new Favorite_Recipe() { Id = _context.Favorite_Recipe.Max(l => l.Id) + 1, FavoriteId = source.Id, RecipeId = new_target.Id };
      _context.Favorite_Recipe.Add(link);
      _context.SaveChanges();
      return new Recipe[] { new_target };
    }

    [RestrictToUserType(new string[] {"*"})]
    [HttpPost("{Favorite_id}/Favorite_Recipes/{Recipe_id}")]
    public void LinkWithFavorite_Recipe(int Favorite_id, int Recipe_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = _context.Favorite;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Favorite_id);
      var allowed_targets = _context.Recipe;
      var target = allowed_targets.FirstOrDefault(s => s.Id == Recipe_id);
      var can_edit_source_by_token = ApiTokenValid || true;
      var can_edit_target_by_token = ApiTokenValid || true;
      var can_link_by_token = ApiTokenValid || true;
      if (!CanAdd_Favorite_Favorite_Recipes(source) || !can_link_by_token || !can_edit_source_by_token || !can_edit_target_by_token)
        throw new Exception("Cannot add item to relation Favorite_Recipes");
      if (!CanAdd_Recipe_Favorite_Recipes(target))
        throw new Exception("Cannot add item to relation Favorite_Recipes");
      var link = new Favorite_Recipe() { Id = _context.Favorite_Recipe.Max(i => i.Id) + 1, FavoriteId = source.Id, RecipeId = target.Id };
      _context.Favorite_Recipe.Add(link);
      _context.SaveChanges();
    }
    [RestrictToUserType(new string[] {"*"})]
    [HttpDelete("{Favorite_id}/Favorite_Recipes/{Recipe_id}")]
    public void UnlinkFromFavorite_Recipe(int Favorite_id, int Recipe_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = _context.Favorite;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Favorite_id);
      var allowed_targets = _context.Recipe;
      var target = allowed_targets.FirstOrDefault(s => s.Id == Recipe_id);
      var link = _context.Favorite_Recipe.FirstOrDefault(l => l.FavoriteId == source.Id && l.RecipeId == target.Id);

      var can_edit_source_by_token = ApiTokenValid || true;
      var can_edit_target_by_token = ApiTokenValid || true;
      var can_unlink_by_token = ApiTokenValid || true;
      if (!can_unlink_by_token || !can_edit_source_by_token || !can_edit_target_by_token) throw new Exception("Cannot remove item from relation Favorite_Recipes");
      _context.Favorite_Recipe.Remove(link);
      _context.SaveChanges();
    }
    [RestrictToUserType(new string[] {"*"})]
    [HttpGet("{id}")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public ItemWithEditable<Favorite> GetById(int id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_items = ApiTokenValid ? _context.Favorite : _context.Favorite;
      var editable_items = ApiTokenValid ? _context.Favorite : _context.Favorite;
      var item = SimpleModelsAndRelations.Models.Favorite.FilterViewableAttributesLocal(current_User)(allowed_items.FirstOrDefault(e => e.Id == id));
      item = SimpleModelsAndRelations.Models.Favorite.WithoutImages(item);
      return new ItemWithEditable<Favorite>() {
        Item = item,
        Editable = editable_items.Any(e => e.Id == item.Id) };
    }
    

    [RestrictToUserType(new string[] {})]
    [HttpPost]
    [ValidateAntiForgeryToken]
    public Favorite Create()
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var can_create_by_token = ApiTokenValid || true;
      if (!can_create_by_token)
        throw new Exception("Unauthorized create attempt");
      var item = new Favorite() { CreatedDate = DateTime.Now, Id = _context.Favorite.Max(i => i.Id) + 1 };
      _context.Favorite.Add(SimpleModelsAndRelations.Models.Favorite.FilterViewableAttributesLocal(current_User)(item));
      _context.SaveChanges();
      item = SimpleModelsAndRelations.Models.Favorite.WithoutImages(item);
      return item;
    }

    [RestrictToUserType(new string[] {"*"})]
    [HttpPut]
    [ValidateAntiForgeryToken]
    public void Update([FromBody] Favorite item)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_items = ApiTokenValid ? _context.Favorite : _context.Favorite;
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
      var allowed_items = ApiTokenValid ? _context.Favorite : _context.Favorite;
      var item = _context.Favorite.FirstOrDefault(e => e.Id == id);
      var can_delete_by_token = ApiTokenValid || true;
      if (item == null || !can_delete_by_token)
        throw new Exception("Unauthorized delete attempt");
      
      if (!allowed_items.Any(a => a.Id == item.Id)) throw new Exception("Unauthorized delete attempt");
      
      _context.Favorite.Remove(item);
      _context.SaveChanges();
    }

    [RestrictToUserType(new string[] {"*"})]
    [HttpGet]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Page<Favorite> GetAll([FromQuery] int page_index, [FromQuery] int page_size = 25)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_items = ApiTokenValid ? _context.Favorite : _context.Favorite;
      var editable_items = ApiTokenValid ? _context.Favorite : _context.Favorite;
      var can_edit_by_token = ApiTokenValid || true;
      var can_create_by_token = ApiTokenValid || true;
      var can_delete_by_token = ApiTokenValid || true;
      return allowed_items
        .Select(SimpleModelsAndRelations.Models.Favorite.FilterViewableAttributes(current_User))
        .Select(s => Tuple.Create(s, can_edit_by_token && editable_items.Any(es => es.Id == s.Id)))
        .Paginate(can_create_by_token, can_delete_by_token, false, page_index, page_size, SimpleModelsAndRelations.Models.Favorite.WithoutImages, item => item);
    }

    


    
  }

  