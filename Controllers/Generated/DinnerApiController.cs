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


  [Route("api/v1/Dinner")]
  public class DinnerApiController : Controller
  {
    private readonly MailOptions _mailOptions;
    public readonly SimpleModelsAndRelationsContext _context;

    public DinnerApiController(SimpleModelsAndRelationsContext context, IOptions<MailOptions> mailOptionsAccessor)
    {
      _context = context;
      _mailOptions = mailOptionsAccessor.Value;
    }

    public bool ApiTokenValid => RestrictToUserTypeAttribute.ApiToken != null &&
        HttpContext.Request.Headers["ApiToken"] == RestrictToUserTypeAttribute.ApiToken;

    
    [RestrictToUserType(new string[] {"*"})]
    [HttpGet("{Dinner_id}/Dinner_Recipes")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Page<Recipe> GetDinner_Recipes(int Dinner_id, [FromQuery] int page_index, [FromQuery] int page_size = 25)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Dinner : _context.Dinner;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Dinner_id);
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
      return (from link in _context.Dinner_Recipe
              where link.DinnerId == source.Id
              from target in allowed_targets
              where link.RecipeId == target.Id
              select target)
              .Select(SimpleModelsAndRelations.Models.Recipe.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, can_edit_by_token && editable_targets.Any(et => et.Id == t.Id)))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Recipe.WithoutImages, item => item);
    }

    [HttpGet("{Dinner_id}/Dinner_Recipes/{Recipe_id}")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Recipe GetDinner_RecipeById(int Dinner_id, int Recipe_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Dinner : _context.Dinner;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Dinner_id);
      var can_view_by_token = ApiTokenValid || true;
      if (source == null || !can_view_by_token)
        return null;
      var allowed_targets = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var item = (from link in _context.Dinner_Recipe
              where link.DinnerId == source.Id
              from target in allowed_targets
              where link.RecipeId == target.Id
              select target)
              .Select(SimpleModelsAndRelations.Models.Recipe.FilterViewableAttributes(current_User))
              .FirstOrDefault(t => t.Id == Recipe_id);

      item = SimpleModelsAndRelations.Models.Recipe.WithoutImages(item);
      return item;
    }

    [RestrictToUserType(new string[] {"*"})]
    [HttpGet("{Dinner_id}/unlinked/Dinner_Recipes")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Page<Recipe> GetUnlinkedDinner_Recipes(int Dinner_id, [FromQuery] int page_index, [FromQuery] int page_size = 25)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Dinner : _context.Dinner;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Dinner_id);
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
              where !_context.Dinner_Recipe.Any(link => link.DinnerId == source.Id && link.RecipeId == target.Id) &&
              (from link in _context.Dinner_Recipe
                where link.RecipeId == target.Id
                from s in _context.Dinner
                where link.DinnerId == s.Id
                select s).Count() < 1
              select target)
              .Select(SimpleModelsAndRelations.Models.Recipe.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, can_edit_by_token && editable_targets.Any(et => et.Id == t.Id)))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Recipe.WithoutImages, item => item);
    }

    bool CanAdd_Dinner_Dinner_Recipes(Dinner source) {
      return true;
    }

    bool CanAdd_Recipe_Dinner_Recipes(Recipe target) {
      return (from link in _context.Dinner_Recipe
           where link.RecipeId == target.Id
           from source in _context.Dinner
           where link.DinnerId == source.Id
           select source).Count() < 1;
    }

    [RestrictToUserType(new string[] {})]
    [HttpPost("{Dinner_id}/Dinner_Recipes_Recipe")]
    public IEnumerable<Recipe> CreateNewDinner_Recipe_Recipe(int Dinner_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Dinner : _context.Dinner;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Dinner_id);
      var can_create_by_token = ApiTokenValid || true;
      if (source == null || !can_create_by_token)
        throw new Exception("Cannot create item in relation Dinner_Recipes");
      var can_link_by_token = ApiTokenValid || true;
      if (!CanAdd_Dinner_Dinner_Recipes(source) || !can_link_by_token)
        throw new Exception("Cannot add item to relation Dinner_Recipes");
      var new_target = new Recipe() { CreatedDate = DateTime.Now, Id = _context.Recipe.Max(i => i.Id) + 1 };
      _context.Recipe.Add(new_target);
      _context.SaveChanges();
      var link = new Dinner_Recipe() { Id = _context.Dinner_Recipe.Max(l => l.Id) + 1, DinnerId = source.Id, RecipeId = new_target.Id };
      _context.Dinner_Recipe.Add(link);
      _context.SaveChanges();
      return new Recipe[] { new_target };
    }

    [RestrictToUserType(new string[] {"*"})]
    [HttpPost("{Dinner_id}/Dinner_Recipes/{Recipe_id}")]
    public void LinkWithDinner_Recipe(int Dinner_id, int Recipe_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = _context.Dinner;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Dinner_id);
      var allowed_targets = _context.Recipe;
      var target = allowed_targets.FirstOrDefault(s => s.Id == Recipe_id);
      var can_edit_source_by_token = ApiTokenValid || true;
      var can_edit_target_by_token = ApiTokenValid || true;
      var can_link_by_token = ApiTokenValid || true;
      if (!CanAdd_Dinner_Dinner_Recipes(source) || !can_link_by_token || !can_edit_source_by_token || !can_edit_target_by_token)
        throw new Exception("Cannot add item to relation Dinner_Recipes");
      if (!CanAdd_Recipe_Dinner_Recipes(target))
        throw new Exception("Cannot add item to relation Dinner_Recipes");
      var link = new Dinner_Recipe() { Id = _context.Dinner_Recipe.Max(i => i.Id) + 1, DinnerId = source.Id, RecipeId = target.Id };
      _context.Dinner_Recipe.Add(link);
      _context.SaveChanges();
    }
    [RestrictToUserType(new string[] {"*"})]
    [HttpDelete("{Dinner_id}/Dinner_Recipes/{Recipe_id}")]
    public void UnlinkFromDinner_Recipe(int Dinner_id, int Recipe_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = _context.Dinner;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Dinner_id);
      var allowed_targets = _context.Recipe;
      var target = allowed_targets.FirstOrDefault(s => s.Id == Recipe_id);
      var link = _context.Dinner_Recipe.FirstOrDefault(l => l.DinnerId == source.Id && l.RecipeId == target.Id);

      var can_edit_source_by_token = ApiTokenValid || true;
      var can_edit_target_by_token = ApiTokenValid || true;
      var can_unlink_by_token = ApiTokenValid || true;
      if (!can_unlink_by_token || !can_edit_source_by_token || !can_edit_target_by_token) throw new Exception("Cannot remove item from relation Dinner_Recipes");
      _context.Dinner_Recipe.Remove(link);
      _context.SaveChanges();
    }
    [RestrictToUserType(new string[] {"*"})]
    [HttpGet("{id}")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public ItemWithEditable<Dinner> GetById(int id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_items = ApiTokenValid ? _context.Dinner : _context.Dinner;
      var editable_items = ApiTokenValid ? _context.Dinner : _context.Dinner;
      var item = SimpleModelsAndRelations.Models.Dinner.FilterViewableAttributesLocal(current_User)(allowed_items.FirstOrDefault(e => e.Id == id));
      item = SimpleModelsAndRelations.Models.Dinner.WithoutImages(item);
      return new ItemWithEditable<Dinner>() {
        Item = item,
        Editable = editable_items.Any(e => e.Id == item.Id) };
    }
    

    [RestrictToUserType(new string[] {})]
    [HttpPost]
    [ValidateAntiForgeryToken]
    public Dinner Create()
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var can_create_by_token = ApiTokenValid || true;
      if (!can_create_by_token)
        throw new Exception("Unauthorized create attempt");
      var item = new Dinner() { CreatedDate = DateTime.Now, Id = _context.Meal.Max(i => i.Id) + 1 };
      _context.Dinner.Add(SimpleModelsAndRelations.Models.Dinner.FilterViewableAttributesLocal(current_User)(item));
      _context.SaveChanges();
      item = SimpleModelsAndRelations.Models.Dinner.WithoutImages(item);
      return item;
    }

    [RestrictToUserType(new string[] {"*"})]
    [HttpPut]
    [ValidateAntiForgeryToken]
    public void Update([FromBody] Dinner item)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_items = ApiTokenValid ? _context.Dinner : _context.Dinner;
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
      var allowed_items = ApiTokenValid ? _context.Dinner : _context.Dinner;
      var item = _context.Dinner.FirstOrDefault(e => e.Id == id);
      var can_delete_by_token = ApiTokenValid || true;
      if (item == null || !can_delete_by_token)
        throw new Exception("Unauthorized delete attempt");
      
      if (!allowed_items.Any(a => a.Id == item.Id)) throw new Exception("Unauthorized delete attempt");
      
      _context.Dinner.Remove(item);
      _context.SaveChanges();
    }

    [RestrictToUserType(new string[] {"*"})]
    [HttpGet]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Page<Dinner> GetAll([FromQuery] int page_index, [FromQuery] int page_size = 25)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_items = ApiTokenValid ? _context.Dinner : _context.Dinner;
      var editable_items = ApiTokenValid ? _context.Dinner : _context.Dinner;
      var can_edit_by_token = ApiTokenValid || true;
      var can_create_by_token = ApiTokenValid || true;
      var can_delete_by_token = ApiTokenValid || true;
      return allowed_items
        .Select(SimpleModelsAndRelations.Models.Dinner.FilterViewableAttributes(current_User))
        .Select(s => Tuple.Create(s, can_edit_by_token && editable_items.Any(es => es.Id == s.Id)))
        .Paginate(can_create_by_token, can_delete_by_token, false, page_index, page_size, SimpleModelsAndRelations.Models.Dinner.WithoutImages, item => item);
    }

    


    
  }

  