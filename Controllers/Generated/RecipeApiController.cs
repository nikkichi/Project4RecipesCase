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


  [Route("api/v1/Recipe")]
  public class RecipeApiController : Controller
  {
    private readonly MailOptions _mailOptions;
    public readonly SimpleModelsAndRelationsContext _context;

    public RecipeApiController(SimpleModelsAndRelationsContext context, IOptions<MailOptions> mailOptionsAccessor)
    {
      _context = context;
      _mailOptions = mailOptionsAccessor.Value;
    }

    public bool ApiTokenValid => RestrictToUserTypeAttribute.ApiToken != null &&
        HttpContext.Request.Headers["ApiToken"] == RestrictToUserTypeAttribute.ApiToken;

    
    [RestrictToUserType(new string[] {"*"})]
    [HttpGet("{Recipe_id}/Asian_Recipes")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Page<Asian> GetAsian_Recipes(int Recipe_id, [FromQuery] int page_index, [FromQuery] int page_size = 25)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var can_create_by_token = ApiTokenValid || true;
      var can_delete_by_token = ApiTokenValid || true || true;
      var can_link_by_token = ApiTokenValid || true;
      var can_view_by_token = ApiTokenValid || true;
      if (source == null || !can_view_by_token) // test
        return Enumerable.Empty<SimpleModelsAndRelations.Models.Asian>() // B
              .AsQueryable()
              .Select(SimpleModelsAndRelations.Models.Asian.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, false))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Asian.WithoutImages, item => item);
      var allowed_targets = ApiTokenValid ? _context.Asian : _context.Asian;
      var editable_targets = ApiTokenValid ? _context.Asian : (_context.Asian);
      var can_edit_by_token = ApiTokenValid || true;
      return (from link in _context.Asian_Recipe
              where link.RecipeId == source.Id
              from target in allowed_targets
              where link.AsianId == target.Id
              select target)
              .Select(SimpleModelsAndRelations.Models.Asian.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, can_edit_by_token && editable_targets.Any(et => et.Id == t.Id)))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Asian.WithoutImages, item => item);
    }

    [HttpGet("{Recipe_id}/Asian_Recipes/{Asian_id}")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Asian GetAsian_RecipeById(int Recipe_id, int Asian_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var can_view_by_token = ApiTokenValid || true;
      if (source == null || !can_view_by_token)
        return null;
      var allowed_targets = ApiTokenValid ? _context.Asian : _context.Asian;
      var item = (from link in _context.Asian_Recipe
              where link.RecipeId == source.Id
              from target in allowed_targets
              where link.AsianId == target.Id
              select target)
              .Select(SimpleModelsAndRelations.Models.Asian.FilterViewableAttributes(current_User))
              .FirstOrDefault(t => t.Id == Asian_id);

      item = SimpleModelsAndRelations.Models.Asian.WithoutImages(item);
      return item;
    }

    [RestrictToUserType(new string[] {"*"})]
    [HttpGet("{Recipe_id}/unlinked/Asian_Recipes")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Page<Asian> GetUnlinkedAsian_Recipes(int Recipe_id, [FromQuery] int page_index, [FromQuery] int page_size = 25)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var can_create_by_token = ApiTokenValid || true;
      var can_delete_by_token = ApiTokenValid || true || true;
      var can_link_by_token = ApiTokenValid || true;
      var can_view_by_token = ApiTokenValid || true;
      if (source == null || !can_view_by_token) // test
        return Enumerable.Empty<SimpleModelsAndRelations.Models.Asian>() // C
              .AsQueryable()
              .Select(SimpleModelsAndRelations.Models.Asian.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, false))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Asian.WithoutImages, item => item);
      var allowed_targets = ApiTokenValid ? _context.Asian : _context.Asian;
      var editable_targets = ApiTokenValid ? _context.Asian : (_context.Asian);
      var can_edit_by_token = ApiTokenValid || true;
      return (from target in allowed_targets
              where !_context.Asian_Recipe.Any(link => link.RecipeId == source.Id && link.AsianId == target.Id) &&
              true
              select target)
              .Select(SimpleModelsAndRelations.Models.Asian.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, can_edit_by_token && editable_targets.Any(et => et.Id == t.Id)))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Asian.WithoutImages, item => item);
    }

    bool CanAdd_Recipe_Asian_Recipes(Recipe source) {
      return (from link in _context.Asian_Recipe
           where link.RecipeId == source.Id
           from target in _context.Asian
           where link.AsianId == target.Id
           select target).Count() < 1;
    }

    bool CanAdd_Asian_Asian_Recipes(Asian target) {
      return true;
    }

    [RestrictToUserType(new string[] {"*"})]
    [HttpPost("{Recipe_id}/Asian_Recipes_Asian")]
    public IEnumerable<Asian> CreateNewAsian_Recipe_Asian(int Recipe_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var can_create_by_token = ApiTokenValid || true;
      if (source == null || !can_create_by_token)
        throw new Exception("Cannot create item in relation Asian_Recipes");
      var can_link_by_token = ApiTokenValid || true;
      if (!CanAdd_Recipe_Asian_Recipes(source) || !can_link_by_token)
        throw new Exception("Cannot add item to relation Asian_Recipes");
      var new_target = new Asian() { CreatedDate = DateTime.Now, Id = _context.Cuisine.Max(i => i.Id) + 1 };
      _context.Asian.Add(new_target);
      _context.SaveChanges();
      var link = new Asian_Recipe() { Id = _context.Asian_Recipe.Max(l => l.Id) + 1, RecipeId = source.Id, AsianId = new_target.Id };
      _context.Asian_Recipe.Add(link);
      _context.SaveChanges();
      return new Asian[] { new_target };
    }

    [RestrictToUserType(new string[] {"*"})]
    [HttpPost("{Recipe_id}/Asian_Recipes/{Asian_id}")]
    public void LinkWithAsian_Recipe(int Recipe_id, int Asian_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var allowed_targets = _context.Asian;
      var target = allowed_targets.FirstOrDefault(s => s.Id == Asian_id);
      var can_edit_source_by_token = ApiTokenValid || true;
      var can_edit_target_by_token = ApiTokenValid || true;
      var can_link_by_token = ApiTokenValid || true;
      if (!CanAdd_Recipe_Asian_Recipes(source) || !can_link_by_token || !can_edit_source_by_token || !can_edit_target_by_token)
        throw new Exception("Cannot add item to relation Asian_Recipes");
      if (!CanAdd_Asian_Asian_Recipes(target))
        throw new Exception("Cannot add item to relation Asian_Recipes");
      var link = new Asian_Recipe() { Id = _context.Asian_Recipe.Max(i => i.Id) + 1, RecipeId = source.Id, AsianId = target.Id };
      _context.Asian_Recipe.Add(link);
      _context.SaveChanges();
    }
    [RestrictToUserType(new string[] {"*"})]
    [HttpDelete("{Recipe_id}/Asian_Recipes/{Asian_id}")]
    public void UnlinkFromAsian_Recipe(int Recipe_id, int Asian_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var allowed_targets = _context.Asian;
      var target = allowed_targets.FirstOrDefault(s => s.Id == Asian_id);
      var link = _context.Asian_Recipe.FirstOrDefault(l => l.RecipeId == source.Id && l.AsianId == target.Id);

      var can_edit_source_by_token = ApiTokenValid || true;
      var can_edit_target_by_token = ApiTokenValid || true;
      var can_unlink_by_token = ApiTokenValid || true;
      if (!can_unlink_by_token || !can_edit_source_by_token || !can_edit_target_by_token) throw new Exception("Cannot remove item from relation Asian_Recipes");
      _context.Asian_Recipe.Remove(link);
      _context.SaveChanges();
    }
    [RestrictToUserType(new string[] {"*"})]
    [HttpGet("{Recipe_id}/Mediterranean_Recipes")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Page<Mediterranean> GetMediterranean_Recipes(int Recipe_id, [FromQuery] int page_index, [FromQuery] int page_size = 25)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var can_create_by_token = ApiTokenValid || true;
      var can_delete_by_token = ApiTokenValid || true || true;
      var can_link_by_token = ApiTokenValid || true;
      var can_view_by_token = ApiTokenValid || true;
      if (source == null || !can_view_by_token) // test
        return Enumerable.Empty<SimpleModelsAndRelations.Models.Mediterranean>() // B
              .AsQueryable()
              .Select(SimpleModelsAndRelations.Models.Mediterranean.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, false))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Mediterranean.WithoutImages, item => item);
      var allowed_targets = ApiTokenValid ? _context.Mediterranean : _context.Mediterranean;
      var editable_targets = ApiTokenValid ? _context.Mediterranean : (_context.Mediterranean);
      var can_edit_by_token = ApiTokenValid || true;
      return (from link in _context.Mediterranean_Recipe
              where link.RecipeId == source.Id
              from target in allowed_targets
              where link.MediterraneanId == target.Id
              select target)
              .Select(SimpleModelsAndRelations.Models.Mediterranean.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, can_edit_by_token && editable_targets.Any(et => et.Id == t.Id)))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Mediterranean.WithoutImages, item => item);
    }

    [HttpGet("{Recipe_id}/Mediterranean_Recipes/{Mediterranean_id}")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Mediterranean GetMediterranean_RecipeById(int Recipe_id, int Mediterranean_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var can_view_by_token = ApiTokenValid || true;
      if (source == null || !can_view_by_token)
        return null;
      var allowed_targets = ApiTokenValid ? _context.Mediterranean : _context.Mediterranean;
      var item = (from link in _context.Mediterranean_Recipe
              where link.RecipeId == source.Id
              from target in allowed_targets
              where link.MediterraneanId == target.Id
              select target)
              .Select(SimpleModelsAndRelations.Models.Mediterranean.FilterViewableAttributes(current_User))
              .FirstOrDefault(t => t.Id == Mediterranean_id);

      item = SimpleModelsAndRelations.Models.Mediterranean.WithoutImages(item);
      return item;
    }

    [RestrictToUserType(new string[] {"*"})]
    [HttpGet("{Recipe_id}/unlinked/Mediterranean_Recipes")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Page<Mediterranean> GetUnlinkedMediterranean_Recipes(int Recipe_id, [FromQuery] int page_index, [FromQuery] int page_size = 25)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var can_create_by_token = ApiTokenValid || true;
      var can_delete_by_token = ApiTokenValid || true || true;
      var can_link_by_token = ApiTokenValid || true;
      var can_view_by_token = ApiTokenValid || true;
      if (source == null || !can_view_by_token) // test
        return Enumerable.Empty<SimpleModelsAndRelations.Models.Mediterranean>() // C
              .AsQueryable()
              .Select(SimpleModelsAndRelations.Models.Mediterranean.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, false))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Mediterranean.WithoutImages, item => item);
      var allowed_targets = ApiTokenValid ? _context.Mediterranean : _context.Mediterranean;
      var editable_targets = ApiTokenValid ? _context.Mediterranean : (_context.Mediterranean);
      var can_edit_by_token = ApiTokenValid || true;
      return (from target in allowed_targets
              where !_context.Mediterranean_Recipe.Any(link => link.RecipeId == source.Id && link.MediterraneanId == target.Id) &&
              true
              select target)
              .Select(SimpleModelsAndRelations.Models.Mediterranean.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, can_edit_by_token && editable_targets.Any(et => et.Id == t.Id)))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Mediterranean.WithoutImages, item => item);
    }

    bool CanAdd_Recipe_Mediterranean_Recipes(Recipe source) {
      return (from link in _context.Mediterranean_Recipe
           where link.RecipeId == source.Id
           from target in _context.Mediterranean
           where link.MediterraneanId == target.Id
           select target).Count() < 1;
    }

    bool CanAdd_Mediterranean_Mediterranean_Recipes(Mediterranean target) {
      return true;
    }

    [RestrictToUserType(new string[] {"*"})]
    [HttpPost("{Recipe_id}/Mediterranean_Recipes_Mediterranean")]
    public IEnumerable<Mediterranean> CreateNewMediterranean_Recipe_Mediterranean(int Recipe_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var can_create_by_token = ApiTokenValid || true;
      if (source == null || !can_create_by_token)
        throw new Exception("Cannot create item in relation Mediterranean_Recipes");
      var can_link_by_token = ApiTokenValid || true;
      if (!CanAdd_Recipe_Mediterranean_Recipes(source) || !can_link_by_token)
        throw new Exception("Cannot add item to relation Mediterranean_Recipes");
      var new_target = new Mediterranean() { CreatedDate = DateTime.Now, Id = _context.Cuisine.Max(i => i.Id) + 1 };
      _context.Mediterranean.Add(new_target);
      _context.SaveChanges();
      var link = new Mediterranean_Recipe() { Id = _context.Mediterranean_Recipe.Max(l => l.Id) + 1, RecipeId = source.Id, MediterraneanId = new_target.Id };
      _context.Mediterranean_Recipe.Add(link);
      _context.SaveChanges();
      return new Mediterranean[] { new_target };
    }

    [RestrictToUserType(new string[] {"*"})]
    [HttpPost("{Recipe_id}/Mediterranean_Recipes/{Mediterranean_id}")]
    public void LinkWithMediterranean_Recipe(int Recipe_id, int Mediterranean_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var allowed_targets = _context.Mediterranean;
      var target = allowed_targets.FirstOrDefault(s => s.Id == Mediterranean_id);
      var can_edit_source_by_token = ApiTokenValid || true;
      var can_edit_target_by_token = ApiTokenValid || true;
      var can_link_by_token = ApiTokenValid || true;
      if (!CanAdd_Recipe_Mediterranean_Recipes(source) || !can_link_by_token || !can_edit_source_by_token || !can_edit_target_by_token)
        throw new Exception("Cannot add item to relation Mediterranean_Recipes");
      if (!CanAdd_Mediterranean_Mediterranean_Recipes(target))
        throw new Exception("Cannot add item to relation Mediterranean_Recipes");
      var link = new Mediterranean_Recipe() { Id = _context.Mediterranean_Recipe.Max(i => i.Id) + 1, RecipeId = source.Id, MediterraneanId = target.Id };
      _context.Mediterranean_Recipe.Add(link);
      _context.SaveChanges();
    }
    [RestrictToUserType(new string[] {"*"})]
    [HttpDelete("{Recipe_id}/Mediterranean_Recipes/{Mediterranean_id}")]
    public void UnlinkFromMediterranean_Recipe(int Recipe_id, int Mediterranean_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var allowed_targets = _context.Mediterranean;
      var target = allowed_targets.FirstOrDefault(s => s.Id == Mediterranean_id);
      var link = _context.Mediterranean_Recipe.FirstOrDefault(l => l.RecipeId == source.Id && l.MediterraneanId == target.Id);

      var can_edit_source_by_token = ApiTokenValid || true;
      var can_edit_target_by_token = ApiTokenValid || true;
      var can_unlink_by_token = ApiTokenValid || true;
      if (!can_unlink_by_token || !can_edit_source_by_token || !can_edit_target_by_token) throw new Exception("Cannot remove item from relation Mediterranean_Recipes");
      _context.Mediterranean_Recipe.Remove(link);
      _context.SaveChanges();
    }
    [RestrictToUserType(new string[] {"*"})]
    [HttpGet("{Recipe_id}/Grill_Recipes")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Page<Grill> GetGrill_Recipes(int Recipe_id, [FromQuery] int page_index, [FromQuery] int page_size = 25)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var can_create_by_token = ApiTokenValid || true;
      var can_delete_by_token = ApiTokenValid || true || true;
      var can_link_by_token = ApiTokenValid || true;
      var can_view_by_token = ApiTokenValid || true;
      if (source == null || !can_view_by_token) // test
        return Enumerable.Empty<SimpleModelsAndRelations.Models.Grill>() // B
              .AsQueryable()
              .Select(SimpleModelsAndRelations.Models.Grill.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, false))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Grill.WithoutImages, item => item);
      var allowed_targets = ApiTokenValid ? _context.Grill : _context.Grill;
      var editable_targets = ApiTokenValid ? _context.Grill : (_context.Grill);
      var can_edit_by_token = ApiTokenValid || true;
      return (from link in _context.Grill_Recipe
              where link.RecipeId == source.Id
              from target in allowed_targets
              where link.GrillId == target.Id
              select target)
              .Select(SimpleModelsAndRelations.Models.Grill.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, can_edit_by_token && editable_targets.Any(et => et.Id == t.Id)))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Grill.WithoutImages, item => item);
    }

    [HttpGet("{Recipe_id}/Grill_Recipes/{Grill_id}")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Grill GetGrill_RecipeById(int Recipe_id, int Grill_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var can_view_by_token = ApiTokenValid || true;
      if (source == null || !can_view_by_token)
        return null;
      var allowed_targets = ApiTokenValid ? _context.Grill : _context.Grill;
      var item = (from link in _context.Grill_Recipe
              where link.RecipeId == source.Id
              from target in allowed_targets
              where link.GrillId == target.Id
              select target)
              .Select(SimpleModelsAndRelations.Models.Grill.FilterViewableAttributes(current_User))
              .FirstOrDefault(t => t.Id == Grill_id);

      item = SimpleModelsAndRelations.Models.Grill.WithoutImages(item);
      return item;
    }

    [RestrictToUserType(new string[] {"*"})]
    [HttpGet("{Recipe_id}/unlinked/Grill_Recipes")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Page<Grill> GetUnlinkedGrill_Recipes(int Recipe_id, [FromQuery] int page_index, [FromQuery] int page_size = 25)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var can_create_by_token = ApiTokenValid || true;
      var can_delete_by_token = ApiTokenValid || true || true;
      var can_link_by_token = ApiTokenValid || true;
      var can_view_by_token = ApiTokenValid || true;
      if (source == null || !can_view_by_token) // test
        return Enumerable.Empty<SimpleModelsAndRelations.Models.Grill>() // C
              .AsQueryable()
              .Select(SimpleModelsAndRelations.Models.Grill.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, false))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Grill.WithoutImages, item => item);
      var allowed_targets = ApiTokenValid ? _context.Grill : _context.Grill;
      var editable_targets = ApiTokenValid ? _context.Grill : (_context.Grill);
      var can_edit_by_token = ApiTokenValid || true;
      return (from target in allowed_targets
              where !_context.Grill_Recipe.Any(link => link.RecipeId == source.Id && link.GrillId == target.Id) &&
              true
              select target)
              .Select(SimpleModelsAndRelations.Models.Grill.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, can_edit_by_token && editable_targets.Any(et => et.Id == t.Id)))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Grill.WithoutImages, item => item);
    }

    bool CanAdd_Recipe_Grill_Recipes(Recipe source) {
      return (from link in _context.Grill_Recipe
           where link.RecipeId == source.Id
           from target in _context.Grill
           where link.GrillId == target.Id
           select target).Count() < 1;
    }

    bool CanAdd_Grill_Grill_Recipes(Grill target) {
      return true;
    }

    [RestrictToUserType(new string[] {"*"})]
    [HttpPost("{Recipe_id}/Grill_Recipes_Grill")]
    public IEnumerable<Grill> CreateNewGrill_Recipe_Grill(int Recipe_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var can_create_by_token = ApiTokenValid || true;
      if (source == null || !can_create_by_token)
        throw new Exception("Cannot create item in relation Grill_Recipes");
      var can_link_by_token = ApiTokenValid || true;
      if (!CanAdd_Recipe_Grill_Recipes(source) || !can_link_by_token)
        throw new Exception("Cannot add item to relation Grill_Recipes");
      var new_target = new Grill() { CreatedDate = DateTime.Now, Id = _context.Cuisine.Max(i => i.Id) + 1 };
      _context.Grill.Add(new_target);
      _context.SaveChanges();
      var link = new Grill_Recipe() { Id = _context.Grill_Recipe.Max(l => l.Id) + 1, RecipeId = source.Id, GrillId = new_target.Id };
      _context.Grill_Recipe.Add(link);
      _context.SaveChanges();
      return new Grill[] { new_target };
    }

    [RestrictToUserType(new string[] {"*"})]
    [HttpPost("{Recipe_id}/Grill_Recipes/{Grill_id}")]
    public void LinkWithGrill_Recipe(int Recipe_id, int Grill_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var allowed_targets = _context.Grill;
      var target = allowed_targets.FirstOrDefault(s => s.Id == Grill_id);
      var can_edit_source_by_token = ApiTokenValid || true;
      var can_edit_target_by_token = ApiTokenValid || true;
      var can_link_by_token = ApiTokenValid || true;
      if (!CanAdd_Recipe_Grill_Recipes(source) || !can_link_by_token || !can_edit_source_by_token || !can_edit_target_by_token)
        throw new Exception("Cannot add item to relation Grill_Recipes");
      if (!CanAdd_Grill_Grill_Recipes(target))
        throw new Exception("Cannot add item to relation Grill_Recipes");
      var link = new Grill_Recipe() { Id = _context.Grill_Recipe.Max(i => i.Id) + 1, RecipeId = source.Id, GrillId = target.Id };
      _context.Grill_Recipe.Add(link);
      _context.SaveChanges();
    }
    [RestrictToUserType(new string[] {"*"})]
    [HttpDelete("{Recipe_id}/Grill_Recipes/{Grill_id}")]
    public void UnlinkFromGrill_Recipe(int Recipe_id, int Grill_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var allowed_targets = _context.Grill;
      var target = allowed_targets.FirstOrDefault(s => s.Id == Grill_id);
      var link = _context.Grill_Recipe.FirstOrDefault(l => l.RecipeId == source.Id && l.GrillId == target.Id);

      var can_edit_source_by_token = ApiTokenValid || true;
      var can_edit_target_by_token = ApiTokenValid || true;
      var can_unlink_by_token = ApiTokenValid || true;
      if (!can_unlink_by_token || !can_edit_source_by_token || !can_edit_target_by_token) throw new Exception("Cannot remove item from relation Grill_Recipes");
      _context.Grill_Recipe.Remove(link);
      _context.SaveChanges();
    }
    [RestrictToUserType(new string[] {"*"})]
    [HttpGet("{Recipe_id}/Breakfast_Recipes")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Page<Breakfast> GetBreakfast_Recipes(int Recipe_id, [FromQuery] int page_index, [FromQuery] int page_size = 25)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var can_create_by_token = ApiTokenValid || true;
      var can_delete_by_token = ApiTokenValid || true || true;
      var can_link_by_token = ApiTokenValid || true;
      var can_view_by_token = ApiTokenValid || true;
      if (source == null || !can_view_by_token) // test
        return Enumerable.Empty<SimpleModelsAndRelations.Models.Breakfast>() // B
              .AsQueryable()
              .Select(SimpleModelsAndRelations.Models.Breakfast.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, false))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Breakfast.WithoutImages, item => item);
      var allowed_targets = ApiTokenValid ? _context.Breakfast : _context.Breakfast;
      var editable_targets = ApiTokenValid ? _context.Breakfast : (_context.Breakfast);
      var can_edit_by_token = ApiTokenValid || true;
      return (from link in _context.Breakfast_Recipe
              where link.RecipeId == source.Id
              from target in allowed_targets
              where link.BreakfastId == target.Id
              select target)
              .Select(SimpleModelsAndRelations.Models.Breakfast.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, can_edit_by_token && editable_targets.Any(et => et.Id == t.Id)))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Breakfast.WithoutImages, item => item);
    }

    [HttpGet("{Recipe_id}/Breakfast_Recipes/{Breakfast_id}")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Breakfast GetBreakfast_RecipeById(int Recipe_id, int Breakfast_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var can_view_by_token = ApiTokenValid || true;
      if (source == null || !can_view_by_token)
        return null;
      var allowed_targets = ApiTokenValid ? _context.Breakfast : _context.Breakfast;
      var item = (from link in _context.Breakfast_Recipe
              where link.RecipeId == source.Id
              from target in allowed_targets
              where link.BreakfastId == target.Id
              select target)
              .Select(SimpleModelsAndRelations.Models.Breakfast.FilterViewableAttributes(current_User))
              .FirstOrDefault(t => t.Id == Breakfast_id);

      item = SimpleModelsAndRelations.Models.Breakfast.WithoutImages(item);
      return item;
    }

    [RestrictToUserType(new string[] {"*"})]
    [HttpGet("{Recipe_id}/unlinked/Breakfast_Recipes")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Page<Breakfast> GetUnlinkedBreakfast_Recipes(int Recipe_id, [FromQuery] int page_index, [FromQuery] int page_size = 25)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var can_create_by_token = ApiTokenValid || true;
      var can_delete_by_token = ApiTokenValid || true || true;
      var can_link_by_token = ApiTokenValid || true;
      var can_view_by_token = ApiTokenValid || true;
      if (source == null || !can_view_by_token) // test
        return Enumerable.Empty<SimpleModelsAndRelations.Models.Breakfast>() // C
              .AsQueryable()
              .Select(SimpleModelsAndRelations.Models.Breakfast.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, false))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Breakfast.WithoutImages, item => item);
      var allowed_targets = ApiTokenValid ? _context.Breakfast : _context.Breakfast;
      var editable_targets = ApiTokenValid ? _context.Breakfast : (_context.Breakfast);
      var can_edit_by_token = ApiTokenValid || true;
      return (from target in allowed_targets
              where !_context.Breakfast_Recipe.Any(link => link.RecipeId == source.Id && link.BreakfastId == target.Id) &&
              true
              select target)
              .Select(SimpleModelsAndRelations.Models.Breakfast.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, can_edit_by_token && editable_targets.Any(et => et.Id == t.Id)))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Breakfast.WithoutImages, item => item);
    }

    bool CanAdd_Recipe_Breakfast_Recipes(Recipe source) {
      return (from link in _context.Breakfast_Recipe
           where link.RecipeId == source.Id
           from target in _context.Breakfast
           where link.BreakfastId == target.Id
           select target).Count() < 1;
    }

    bool CanAdd_Breakfast_Breakfast_Recipes(Breakfast target) {
      return true;
    }

    [RestrictToUserType(new string[] {})]
    [HttpPost("{Recipe_id}/Breakfast_Recipes_Breakfast")]
    public IEnumerable<Breakfast> CreateNewBreakfast_Recipe_Breakfast(int Recipe_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var can_create_by_token = ApiTokenValid || true;
      if (source == null || !can_create_by_token)
        throw new Exception("Cannot create item in relation Breakfast_Recipes");
      var can_link_by_token = ApiTokenValid || true;
      if (!CanAdd_Recipe_Breakfast_Recipes(source) || !can_link_by_token)
        throw new Exception("Cannot add item to relation Breakfast_Recipes");
      var new_target = new Breakfast() { CreatedDate = DateTime.Now, Id = _context.Meal.Max(i => i.Id) + 1 };
      _context.Breakfast.Add(new_target);
      _context.SaveChanges();
      var link = new Breakfast_Recipe() { Id = _context.Breakfast_Recipe.Max(l => l.Id) + 1, RecipeId = source.Id, BreakfastId = new_target.Id };
      _context.Breakfast_Recipe.Add(link);
      _context.SaveChanges();
      return new Breakfast[] { new_target };
    }

    [RestrictToUserType(new string[] {"*"})]
    [HttpPost("{Recipe_id}/Breakfast_Recipes/{Breakfast_id}")]
    public void LinkWithBreakfast_Recipe(int Recipe_id, int Breakfast_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var allowed_targets = _context.Breakfast;
      var target = allowed_targets.FirstOrDefault(s => s.Id == Breakfast_id);
      var can_edit_source_by_token = ApiTokenValid || true;
      var can_edit_target_by_token = ApiTokenValid || true;
      var can_link_by_token = ApiTokenValid || true;
      if (!CanAdd_Recipe_Breakfast_Recipes(source) || !can_link_by_token || !can_edit_source_by_token || !can_edit_target_by_token)
        throw new Exception("Cannot add item to relation Breakfast_Recipes");
      if (!CanAdd_Breakfast_Breakfast_Recipes(target))
        throw new Exception("Cannot add item to relation Breakfast_Recipes");
      var link = new Breakfast_Recipe() { Id = _context.Breakfast_Recipe.Max(i => i.Id) + 1, RecipeId = source.Id, BreakfastId = target.Id };
      _context.Breakfast_Recipe.Add(link);
      _context.SaveChanges();
    }
    [RestrictToUserType(new string[] {"*"})]
    [HttpDelete("{Recipe_id}/Breakfast_Recipes/{Breakfast_id}")]
    public void UnlinkFromBreakfast_Recipe(int Recipe_id, int Breakfast_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var allowed_targets = _context.Breakfast;
      var target = allowed_targets.FirstOrDefault(s => s.Id == Breakfast_id);
      var link = _context.Breakfast_Recipe.FirstOrDefault(l => l.RecipeId == source.Id && l.BreakfastId == target.Id);

      var can_edit_source_by_token = ApiTokenValid || true;
      var can_edit_target_by_token = ApiTokenValid || true;
      var can_unlink_by_token = ApiTokenValid || true;
      if (!can_unlink_by_token || !can_edit_source_by_token || !can_edit_target_by_token) throw new Exception("Cannot remove item from relation Breakfast_Recipes");
      _context.Breakfast_Recipe.Remove(link);
      _context.SaveChanges();
    }
    [RestrictToUserType(new string[] {"*"})]
    [HttpGet("{Recipe_id}/Brunch_Recipes")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Page<Brunch> GetBrunch_Recipes(int Recipe_id, [FromQuery] int page_index, [FromQuery] int page_size = 25)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var can_create_by_token = ApiTokenValid || true;
      var can_delete_by_token = ApiTokenValid || true || true;
      var can_link_by_token = ApiTokenValid || true;
      var can_view_by_token = ApiTokenValid || true;
      if (source == null || !can_view_by_token) // test
        return Enumerable.Empty<SimpleModelsAndRelations.Models.Brunch>() // B
              .AsQueryable()
              .Select(SimpleModelsAndRelations.Models.Brunch.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, false))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Brunch.WithoutImages, item => item);
      var allowed_targets = ApiTokenValid ? _context.Brunch : _context.Brunch;
      var editable_targets = ApiTokenValid ? _context.Brunch : (_context.Brunch);
      var can_edit_by_token = ApiTokenValid || true;
      return (from link in _context.Brunch_Recipe
              where link.RecipeId == source.Id
              from target in allowed_targets
              where link.BrunchId == target.Id
              select target)
              .Select(SimpleModelsAndRelations.Models.Brunch.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, can_edit_by_token && editable_targets.Any(et => et.Id == t.Id)))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Brunch.WithoutImages, item => item);
    }

    [HttpGet("{Recipe_id}/Brunch_Recipes/{Brunch_id}")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Brunch GetBrunch_RecipeById(int Recipe_id, int Brunch_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var can_view_by_token = ApiTokenValid || true;
      if (source == null || !can_view_by_token)
        return null;
      var allowed_targets = ApiTokenValid ? _context.Brunch : _context.Brunch;
      var item = (from link in _context.Brunch_Recipe
              where link.RecipeId == source.Id
              from target in allowed_targets
              where link.BrunchId == target.Id
              select target)
              .Select(SimpleModelsAndRelations.Models.Brunch.FilterViewableAttributes(current_User))
              .FirstOrDefault(t => t.Id == Brunch_id);

      item = SimpleModelsAndRelations.Models.Brunch.WithoutImages(item);
      return item;
    }

    [RestrictToUserType(new string[] {"*"})]
    [HttpGet("{Recipe_id}/unlinked/Brunch_Recipes")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Page<Brunch> GetUnlinkedBrunch_Recipes(int Recipe_id, [FromQuery] int page_index, [FromQuery] int page_size = 25)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var can_create_by_token = ApiTokenValid || true;
      var can_delete_by_token = ApiTokenValid || true || true;
      var can_link_by_token = ApiTokenValid || true;
      var can_view_by_token = ApiTokenValid || true;
      if (source == null || !can_view_by_token) // test
        return Enumerable.Empty<SimpleModelsAndRelations.Models.Brunch>() // C
              .AsQueryable()
              .Select(SimpleModelsAndRelations.Models.Brunch.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, false))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Brunch.WithoutImages, item => item);
      var allowed_targets = ApiTokenValid ? _context.Brunch : _context.Brunch;
      var editable_targets = ApiTokenValid ? _context.Brunch : (_context.Brunch);
      var can_edit_by_token = ApiTokenValid || true;
      return (from target in allowed_targets
              where !_context.Brunch_Recipe.Any(link => link.RecipeId == source.Id && link.BrunchId == target.Id) &&
              true
              select target)
              .Select(SimpleModelsAndRelations.Models.Brunch.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, can_edit_by_token && editable_targets.Any(et => et.Id == t.Id)))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Brunch.WithoutImages, item => item);
    }

    bool CanAdd_Recipe_Brunch_Recipes(Recipe source) {
      return (from link in _context.Brunch_Recipe
           where link.RecipeId == source.Id
           from target in _context.Brunch
           where link.BrunchId == target.Id
           select target).Count() < 1;
    }

    bool CanAdd_Brunch_Brunch_Recipes(Brunch target) {
      return true;
    }

    [RestrictToUserType(new string[] {})]
    [HttpPost("{Recipe_id}/Brunch_Recipes_Brunch")]
    public IEnumerable<Brunch> CreateNewBrunch_Recipe_Brunch(int Recipe_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var can_create_by_token = ApiTokenValid || true;
      if (source == null || !can_create_by_token)
        throw new Exception("Cannot create item in relation Brunch_Recipes");
      var can_link_by_token = ApiTokenValid || true;
      if (!CanAdd_Recipe_Brunch_Recipes(source) || !can_link_by_token)
        throw new Exception("Cannot add item to relation Brunch_Recipes");
      var new_target = new Brunch() { CreatedDate = DateTime.Now, Id = _context.Meal.Max(i => i.Id) + 1 };
      _context.Brunch.Add(new_target);
      _context.SaveChanges();
      var link = new Brunch_Recipe() { Id = _context.Brunch_Recipe.Max(l => l.Id) + 1, RecipeId = source.Id, BrunchId = new_target.Id };
      _context.Brunch_Recipe.Add(link);
      _context.SaveChanges();
      return new Brunch[] { new_target };
    }

    [RestrictToUserType(new string[] {"*"})]
    [HttpPost("{Recipe_id}/Brunch_Recipes/{Brunch_id}")]
    public void LinkWithBrunch_Recipe(int Recipe_id, int Brunch_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var allowed_targets = _context.Brunch;
      var target = allowed_targets.FirstOrDefault(s => s.Id == Brunch_id);
      var can_edit_source_by_token = ApiTokenValid || true;
      var can_edit_target_by_token = ApiTokenValid || true;
      var can_link_by_token = ApiTokenValid || true;
      if (!CanAdd_Recipe_Brunch_Recipes(source) || !can_link_by_token || !can_edit_source_by_token || !can_edit_target_by_token)
        throw new Exception("Cannot add item to relation Brunch_Recipes");
      if (!CanAdd_Brunch_Brunch_Recipes(target))
        throw new Exception("Cannot add item to relation Brunch_Recipes");
      var link = new Brunch_Recipe() { Id = _context.Brunch_Recipe.Max(i => i.Id) + 1, RecipeId = source.Id, BrunchId = target.Id };
      _context.Brunch_Recipe.Add(link);
      _context.SaveChanges();
    }
    [RestrictToUserType(new string[] {"*"})]
    [HttpDelete("{Recipe_id}/Brunch_Recipes/{Brunch_id}")]
    public void UnlinkFromBrunch_Recipe(int Recipe_id, int Brunch_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var allowed_targets = _context.Brunch;
      var target = allowed_targets.FirstOrDefault(s => s.Id == Brunch_id);
      var link = _context.Brunch_Recipe.FirstOrDefault(l => l.RecipeId == source.Id && l.BrunchId == target.Id);

      var can_edit_source_by_token = ApiTokenValid || true;
      var can_edit_target_by_token = ApiTokenValid || true;
      var can_unlink_by_token = ApiTokenValid || true;
      if (!can_unlink_by_token || !can_edit_source_by_token || !can_edit_target_by_token) throw new Exception("Cannot remove item from relation Brunch_Recipes");
      _context.Brunch_Recipe.Remove(link);
      _context.SaveChanges();
    }
    [RestrictToUserType(new string[] {"*"})]
    [HttpGet("{Recipe_id}/Lunch_Recipes")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Page<Lunch> GetLunch_Recipes(int Recipe_id, [FromQuery] int page_index, [FromQuery] int page_size = 25)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var can_create_by_token = ApiTokenValid || true;
      var can_delete_by_token = ApiTokenValid || true || true;
      var can_link_by_token = ApiTokenValid || true;
      var can_view_by_token = ApiTokenValid || true;
      if (source == null || !can_view_by_token) // test
        return Enumerable.Empty<SimpleModelsAndRelations.Models.Lunch>() // B
              .AsQueryable()
              .Select(SimpleModelsAndRelations.Models.Lunch.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, false))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Lunch.WithoutImages, item => item);
      var allowed_targets = ApiTokenValid ? _context.Lunch : _context.Lunch;
      var editable_targets = ApiTokenValid ? _context.Lunch : (_context.Lunch);
      var can_edit_by_token = ApiTokenValid || true;
      return (from link in _context.Lunch_Recipe
              where link.RecipeId == source.Id
              from target in allowed_targets
              where link.LunchId == target.Id
              select target)
              .Select(SimpleModelsAndRelations.Models.Lunch.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, can_edit_by_token && editable_targets.Any(et => et.Id == t.Id)))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Lunch.WithoutImages, item => item);
    }

    [HttpGet("{Recipe_id}/Lunch_Recipes/{Lunch_id}")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Lunch GetLunch_RecipeById(int Recipe_id, int Lunch_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var can_view_by_token = ApiTokenValid || true;
      if (source == null || !can_view_by_token)
        return null;
      var allowed_targets = ApiTokenValid ? _context.Lunch : _context.Lunch;
      var item = (from link in _context.Lunch_Recipe
              where link.RecipeId == source.Id
              from target in allowed_targets
              where link.LunchId == target.Id
              select target)
              .Select(SimpleModelsAndRelations.Models.Lunch.FilterViewableAttributes(current_User))
              .FirstOrDefault(t => t.Id == Lunch_id);

      item = SimpleModelsAndRelations.Models.Lunch.WithoutImages(item);
      return item;
    }

    [RestrictToUserType(new string[] {"*"})]
    [HttpGet("{Recipe_id}/unlinked/Lunch_Recipes")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Page<Lunch> GetUnlinkedLunch_Recipes(int Recipe_id, [FromQuery] int page_index, [FromQuery] int page_size = 25)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var can_create_by_token = ApiTokenValid || true;
      var can_delete_by_token = ApiTokenValid || true || true;
      var can_link_by_token = ApiTokenValid || true;
      var can_view_by_token = ApiTokenValid || true;
      if (source == null || !can_view_by_token) // test
        return Enumerable.Empty<SimpleModelsAndRelations.Models.Lunch>() // C
              .AsQueryable()
              .Select(SimpleModelsAndRelations.Models.Lunch.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, false))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Lunch.WithoutImages, item => item);
      var allowed_targets = ApiTokenValid ? _context.Lunch : _context.Lunch;
      var editable_targets = ApiTokenValid ? _context.Lunch : (_context.Lunch);
      var can_edit_by_token = ApiTokenValid || true;
      return (from target in allowed_targets
              where !_context.Lunch_Recipe.Any(link => link.RecipeId == source.Id && link.LunchId == target.Id) &&
              true
              select target)
              .Select(SimpleModelsAndRelations.Models.Lunch.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, can_edit_by_token && editable_targets.Any(et => et.Id == t.Id)))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Lunch.WithoutImages, item => item);
    }

    bool CanAdd_Recipe_Lunch_Recipes(Recipe source) {
      return (from link in _context.Lunch_Recipe
           where link.RecipeId == source.Id
           from target in _context.Lunch
           where link.LunchId == target.Id
           select target).Count() < 1;
    }

    bool CanAdd_Lunch_Lunch_Recipes(Lunch target) {
      return true;
    }

    [RestrictToUserType(new string[] {})]
    [HttpPost("{Recipe_id}/Lunch_Recipes_Lunch")]
    public IEnumerable<Lunch> CreateNewLunch_Recipe_Lunch(int Recipe_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var can_create_by_token = ApiTokenValid || true;
      if (source == null || !can_create_by_token)
        throw new Exception("Cannot create item in relation Lunch_Recipes");
      var can_link_by_token = ApiTokenValid || true;
      if (!CanAdd_Recipe_Lunch_Recipes(source) || !can_link_by_token)
        throw new Exception("Cannot add item to relation Lunch_Recipes");
      var new_target = new Lunch() { CreatedDate = DateTime.Now, Id = _context.Meal.Max(i => i.Id) + 1 };
      _context.Lunch.Add(new_target);
      _context.SaveChanges();
      var link = new Lunch_Recipe() { Id = _context.Lunch_Recipe.Max(l => l.Id) + 1, RecipeId = source.Id, LunchId = new_target.Id };
      _context.Lunch_Recipe.Add(link);
      _context.SaveChanges();
      return new Lunch[] { new_target };
    }

    [RestrictToUserType(new string[] {"*"})]
    [HttpPost("{Recipe_id}/Lunch_Recipes/{Lunch_id}")]
    public void LinkWithLunch_Recipe(int Recipe_id, int Lunch_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var allowed_targets = _context.Lunch;
      var target = allowed_targets.FirstOrDefault(s => s.Id == Lunch_id);
      var can_edit_source_by_token = ApiTokenValid || true;
      var can_edit_target_by_token = ApiTokenValid || true;
      var can_link_by_token = ApiTokenValid || true;
      if (!CanAdd_Recipe_Lunch_Recipes(source) || !can_link_by_token || !can_edit_source_by_token || !can_edit_target_by_token)
        throw new Exception("Cannot add item to relation Lunch_Recipes");
      if (!CanAdd_Lunch_Lunch_Recipes(target))
        throw new Exception("Cannot add item to relation Lunch_Recipes");
      var link = new Lunch_Recipe() { Id = _context.Lunch_Recipe.Max(i => i.Id) + 1, RecipeId = source.Id, LunchId = target.Id };
      _context.Lunch_Recipe.Add(link);
      _context.SaveChanges();
    }
    [RestrictToUserType(new string[] {"*"})]
    [HttpDelete("{Recipe_id}/Lunch_Recipes/{Lunch_id}")]
    public void UnlinkFromLunch_Recipe(int Recipe_id, int Lunch_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var allowed_targets = _context.Lunch;
      var target = allowed_targets.FirstOrDefault(s => s.Id == Lunch_id);
      var link = _context.Lunch_Recipe.FirstOrDefault(l => l.RecipeId == source.Id && l.LunchId == target.Id);

      var can_edit_source_by_token = ApiTokenValid || true;
      var can_edit_target_by_token = ApiTokenValid || true;
      var can_unlink_by_token = ApiTokenValid || true;
      if (!can_unlink_by_token || !can_edit_source_by_token || !can_edit_target_by_token) throw new Exception("Cannot remove item from relation Lunch_Recipes");
      _context.Lunch_Recipe.Remove(link);
      _context.SaveChanges();
    }
    [RestrictToUserType(new string[] {"*"})]
    [HttpGet("{Recipe_id}/Dinner_Recipes")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Page<Dinner> GetDinner_Recipes(int Recipe_id, [FromQuery] int page_index, [FromQuery] int page_size = 25)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var can_create_by_token = ApiTokenValid || true;
      var can_delete_by_token = ApiTokenValid || true || true;
      var can_link_by_token = ApiTokenValid || true;
      var can_view_by_token = ApiTokenValid || true;
      if (source == null || !can_view_by_token) // test
        return Enumerable.Empty<SimpleModelsAndRelations.Models.Dinner>() // B
              .AsQueryable()
              .Select(SimpleModelsAndRelations.Models.Dinner.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, false))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Dinner.WithoutImages, item => item);
      var allowed_targets = ApiTokenValid ? _context.Dinner : _context.Dinner;
      var editable_targets = ApiTokenValid ? _context.Dinner : (_context.Dinner);
      var can_edit_by_token = ApiTokenValid || true;
      return (from link in _context.Dinner_Recipe
              where link.RecipeId == source.Id
              from target in allowed_targets
              where link.DinnerId == target.Id
              select target)
              .Select(SimpleModelsAndRelations.Models.Dinner.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, can_edit_by_token && editable_targets.Any(et => et.Id == t.Id)))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Dinner.WithoutImages, item => item);
    }

    [HttpGet("{Recipe_id}/Dinner_Recipes/{Dinner_id}")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Dinner GetDinner_RecipeById(int Recipe_id, int Dinner_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var can_view_by_token = ApiTokenValid || true;
      if (source == null || !can_view_by_token)
        return null;
      var allowed_targets = ApiTokenValid ? _context.Dinner : _context.Dinner;
      var item = (from link in _context.Dinner_Recipe
              where link.RecipeId == source.Id
              from target in allowed_targets
              where link.DinnerId == target.Id
              select target)
              .Select(SimpleModelsAndRelations.Models.Dinner.FilterViewableAttributes(current_User))
              .FirstOrDefault(t => t.Id == Dinner_id);

      item = SimpleModelsAndRelations.Models.Dinner.WithoutImages(item);
      return item;
    }

    [RestrictToUserType(new string[] {"*"})]
    [HttpGet("{Recipe_id}/unlinked/Dinner_Recipes")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Page<Dinner> GetUnlinkedDinner_Recipes(int Recipe_id, [FromQuery] int page_index, [FromQuery] int page_size = 25)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var can_create_by_token = ApiTokenValid || true;
      var can_delete_by_token = ApiTokenValid || true || true;
      var can_link_by_token = ApiTokenValid || true;
      var can_view_by_token = ApiTokenValid || true;
      if (source == null || !can_view_by_token) // test
        return Enumerable.Empty<SimpleModelsAndRelations.Models.Dinner>() // C
              .AsQueryable()
              .Select(SimpleModelsAndRelations.Models.Dinner.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, false))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Dinner.WithoutImages, item => item);
      var allowed_targets = ApiTokenValid ? _context.Dinner : _context.Dinner;
      var editable_targets = ApiTokenValid ? _context.Dinner : (_context.Dinner);
      var can_edit_by_token = ApiTokenValid || true;
      return (from target in allowed_targets
              where !_context.Dinner_Recipe.Any(link => link.RecipeId == source.Id && link.DinnerId == target.Id) &&
              true
              select target)
              .Select(SimpleModelsAndRelations.Models.Dinner.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, can_edit_by_token && editable_targets.Any(et => et.Id == t.Id)))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Dinner.WithoutImages, item => item);
    }

    bool CanAdd_Recipe_Dinner_Recipes(Recipe source) {
      return (from link in _context.Dinner_Recipe
           where link.RecipeId == source.Id
           from target in _context.Dinner
           where link.DinnerId == target.Id
           select target).Count() < 1;
    }

    bool CanAdd_Dinner_Dinner_Recipes(Dinner target) {
      return true;
    }

    [RestrictToUserType(new string[] {})]
    [HttpPost("{Recipe_id}/Dinner_Recipes_Dinner")]
    public IEnumerable<Dinner> CreateNewDinner_Recipe_Dinner(int Recipe_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var can_create_by_token = ApiTokenValid || true;
      if (source == null || !can_create_by_token)
        throw new Exception("Cannot create item in relation Dinner_Recipes");
      var can_link_by_token = ApiTokenValid || true;
      if (!CanAdd_Recipe_Dinner_Recipes(source) || !can_link_by_token)
        throw new Exception("Cannot add item to relation Dinner_Recipes");
      var new_target = new Dinner() { CreatedDate = DateTime.Now, Id = _context.Meal.Max(i => i.Id) + 1 };
      _context.Dinner.Add(new_target);
      _context.SaveChanges();
      var link = new Dinner_Recipe() { Id = _context.Dinner_Recipe.Max(l => l.Id) + 1, RecipeId = source.Id, DinnerId = new_target.Id };
      _context.Dinner_Recipe.Add(link);
      _context.SaveChanges();
      return new Dinner[] { new_target };
    }

    [RestrictToUserType(new string[] {"*"})]
    [HttpPost("{Recipe_id}/Dinner_Recipes/{Dinner_id}")]
    public void LinkWithDinner_Recipe(int Recipe_id, int Dinner_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var allowed_targets = _context.Dinner;
      var target = allowed_targets.FirstOrDefault(s => s.Id == Dinner_id);
      var can_edit_source_by_token = ApiTokenValid || true;
      var can_edit_target_by_token = ApiTokenValid || true;
      var can_link_by_token = ApiTokenValid || true;
      if (!CanAdd_Recipe_Dinner_Recipes(source) || !can_link_by_token || !can_edit_source_by_token || !can_edit_target_by_token)
        throw new Exception("Cannot add item to relation Dinner_Recipes");
      if (!CanAdd_Dinner_Dinner_Recipes(target))
        throw new Exception("Cannot add item to relation Dinner_Recipes");
      var link = new Dinner_Recipe() { Id = _context.Dinner_Recipe.Max(i => i.Id) + 1, RecipeId = source.Id, DinnerId = target.Id };
      _context.Dinner_Recipe.Add(link);
      _context.SaveChanges();
    }
    [RestrictToUserType(new string[] {"*"})]
    [HttpDelete("{Recipe_id}/Dinner_Recipes/{Dinner_id}")]
    public void UnlinkFromDinner_Recipe(int Recipe_id, int Dinner_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var allowed_targets = _context.Dinner;
      var target = allowed_targets.FirstOrDefault(s => s.Id == Dinner_id);
      var link = _context.Dinner_Recipe.FirstOrDefault(l => l.RecipeId == source.Id && l.DinnerId == target.Id);

      var can_edit_source_by_token = ApiTokenValid || true;
      var can_edit_target_by_token = ApiTokenValid || true;
      var can_unlink_by_token = ApiTokenValid || true;
      if (!can_unlink_by_token || !can_edit_source_by_token || !can_edit_target_by_token) throw new Exception("Cannot remove item from relation Dinner_Recipes");
      _context.Dinner_Recipe.Remove(link);
      _context.SaveChanges();
    }
    [RestrictToUserType(new string[] {"*"})]
    [HttpGet("{Recipe_id}/PreparationTime_Recipes")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Page<PreparationTime> GetPreparationTime_Recipes(int Recipe_id, [FromQuery] int page_index, [FromQuery] int page_size = 25)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var can_create_by_token = ApiTokenValid || true;
      var can_delete_by_token = ApiTokenValid || true || true;
      var can_link_by_token = ApiTokenValid || true;
      var can_view_by_token = ApiTokenValid || true;
      if (source == null || !can_view_by_token) // test
        return Enumerable.Empty<SimpleModelsAndRelations.Models.PreparationTime>() // B
              .AsQueryable()
              .Select(SimpleModelsAndRelations.Models.PreparationTime.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, false))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.PreparationTime.WithoutImages, item => item);
      var allowed_targets = ApiTokenValid ? _context.PreparationTime : _context.PreparationTime;
      var editable_targets = ApiTokenValid ? _context.PreparationTime : (_context.PreparationTime);
      var can_edit_by_token = ApiTokenValid || true;
      return (from link in _context.PreparationTime_Recipe
              where link.RecipeId == source.Id
              from target in allowed_targets
              where link.PreparationTimeId == target.Id
              select target)
              .Select(SimpleModelsAndRelations.Models.PreparationTime.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, can_edit_by_token && editable_targets.Any(et => et.Id == t.Id)))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.PreparationTime.WithoutImages, item => item);
    }

    [HttpGet("{Recipe_id}/PreparationTime_Recipes/{PreparationTime_id}")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public PreparationTime GetPreparationTime_RecipeById(int Recipe_id, int PreparationTime_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var can_view_by_token = ApiTokenValid || true;
      if (source == null || !can_view_by_token)
        return null;
      var allowed_targets = ApiTokenValid ? _context.PreparationTime : _context.PreparationTime;
      var item = (from link in _context.PreparationTime_Recipe
              where link.RecipeId == source.Id
              from target in allowed_targets
              where link.PreparationTimeId == target.Id
              select target)
              .Select(SimpleModelsAndRelations.Models.PreparationTime.FilterViewableAttributes(current_User))
              .FirstOrDefault(t => t.Id == PreparationTime_id);

      item = SimpleModelsAndRelations.Models.PreparationTime.WithoutImages(item);
      return item;
    }

    [RestrictToUserType(new string[] {"*"})]
    [HttpGet("{Recipe_id}/unlinked/PreparationTime_Recipes")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Page<PreparationTime> GetUnlinkedPreparationTime_Recipes(int Recipe_id, [FromQuery] int page_index, [FromQuery] int page_size = 25)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var can_create_by_token = ApiTokenValid || true;
      var can_delete_by_token = ApiTokenValid || true || true;
      var can_link_by_token = ApiTokenValid || true;
      var can_view_by_token = ApiTokenValid || true;
      if (source == null || !can_view_by_token) // test
        return Enumerable.Empty<SimpleModelsAndRelations.Models.PreparationTime>() // C
              .AsQueryable()
              .Select(SimpleModelsAndRelations.Models.PreparationTime.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, false))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.PreparationTime.WithoutImages, item => item);
      var allowed_targets = ApiTokenValid ? _context.PreparationTime : _context.PreparationTime;
      var editable_targets = ApiTokenValid ? _context.PreparationTime : (_context.PreparationTime);
      var can_edit_by_token = ApiTokenValid || true;
      return (from target in allowed_targets
              where !_context.PreparationTime_Recipe.Any(link => link.RecipeId == source.Id && link.PreparationTimeId == target.Id) &&
              true
              select target)
              .Select(SimpleModelsAndRelations.Models.PreparationTime.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, can_edit_by_token && editable_targets.Any(et => et.Id == t.Id)))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.PreparationTime.WithoutImages, item => item);
    }
    [RestrictToUserType(new string[] {"*"})]
    [HttpGet("{Recipe_id}/unlinked/PreparationTime_Recipes/nintee")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Page<nintee> GetUnlinkedPreparationTime_Recipes_nintee(int Recipe_id, [FromQuery] int page_index, [FromQuery] int page_size = 25)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var can_create_by_token = ApiTokenValid || true;
      var can_delete_by_token = ApiTokenValid || true || true;
      var can_link_by_token = ApiTokenValid || true;
      var can_view_by_token = ApiTokenValid || true;
      if (source == null || !can_view_by_token) // test
        return Enumerable.Empty<SimpleModelsAndRelations.Models.nintee>() // A
              .AsQueryable()
              .Select(SimpleModelsAndRelations.Models.nintee.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, false))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.nintee.WithoutImages, item => item);
      var allowed_targets = ApiTokenValid ? _context.nintee : _context.nintee;
      var editable_targets = ApiTokenValid ? _context.PreparationTime : (_context.PreparationTime);
      var can_edit_by_token = ApiTokenValid || true;
      return (from target in allowed_targets
              where !_context.PreparationTime_Recipe.Any(link => link.RecipeId == source.Id && link.PreparationTimeId == target.Id) &&
              true
              select target)
              .Select(SimpleModelsAndRelations.Models.nintee.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, can_edit_by_token && editable_targets.Any(et => et.Id == t.Id)))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.nintee.WithoutImages, item => item);
    }


    [RestrictToUserType(new string[] {"*"})]
    [HttpGet("{Recipe_id}/unlinked/PreparationTime_Recipes/thirty")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Page<thirty> GetUnlinkedPreparationTime_Recipes_thirty(int Recipe_id, [FromQuery] int page_index, [FromQuery] int page_size = 25)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var can_create_by_token = ApiTokenValid || true;
      var can_delete_by_token = ApiTokenValid || true || true;
      var can_link_by_token = ApiTokenValid || true;
      var can_view_by_token = ApiTokenValid || true;
      if (source == null || !can_view_by_token) // test
        return Enumerable.Empty<SimpleModelsAndRelations.Models.thirty>() // A
              .AsQueryable()
              .Select(SimpleModelsAndRelations.Models.thirty.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, false))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.thirty.WithoutImages, item => item);
      var allowed_targets = ApiTokenValid ? _context.thirty : _context.thirty;
      var editable_targets = ApiTokenValid ? _context.PreparationTime : (_context.PreparationTime);
      var can_edit_by_token = ApiTokenValid || true;
      return (from target in allowed_targets
              where !_context.PreparationTime_Recipe.Any(link => link.RecipeId == source.Id && link.PreparationTimeId == target.Id) &&
              true
              select target)
              .Select(SimpleModelsAndRelations.Models.thirty.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, can_edit_by_token && editable_targets.Any(et => et.Id == t.Id)))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.thirty.WithoutImages, item => item);
    }


    [RestrictToUserType(new string[] {"*"})]
    [HttpGet("{Recipe_id}/unlinked/PreparationTime_Recipes/sixty")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Page<sixty> GetUnlinkedPreparationTime_Recipes_sixty(int Recipe_id, [FromQuery] int page_index, [FromQuery] int page_size = 25)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var can_create_by_token = ApiTokenValid || true;
      var can_delete_by_token = ApiTokenValid || true || true;
      var can_link_by_token = ApiTokenValid || true;
      var can_view_by_token = ApiTokenValid || true;
      if (source == null || !can_view_by_token) // test
        return Enumerable.Empty<SimpleModelsAndRelations.Models.sixty>() // A
              .AsQueryable()
              .Select(SimpleModelsAndRelations.Models.sixty.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, false))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.sixty.WithoutImages, item => item);
      var allowed_targets = ApiTokenValid ? _context.sixty : _context.sixty;
      var editable_targets = ApiTokenValid ? _context.PreparationTime : (_context.PreparationTime);
      var can_edit_by_token = ApiTokenValid || true;
      return (from target in allowed_targets
              where !_context.PreparationTime_Recipe.Any(link => link.RecipeId == source.Id && link.PreparationTimeId == target.Id) &&
              true
              select target)
              .Select(SimpleModelsAndRelations.Models.sixty.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, can_edit_by_token && editable_targets.Any(et => et.Id == t.Id)))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.sixty.WithoutImages, item => item);
    }


    [RestrictToUserType(new string[] {"*"})]
    [HttpGet("{Recipe_id}/unlinked/PreparationTime_Recipes/fifteen")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Page<fifteen> GetUnlinkedPreparationTime_Recipes_fifteen(int Recipe_id, [FromQuery] int page_index, [FromQuery] int page_size = 25)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var can_create_by_token = ApiTokenValid || true;
      var can_delete_by_token = ApiTokenValid || true || true;
      var can_link_by_token = ApiTokenValid || true;
      var can_view_by_token = ApiTokenValid || true;
      if (source == null || !can_view_by_token) // test
        return Enumerable.Empty<SimpleModelsAndRelations.Models.fifteen>() // A
              .AsQueryable()
              .Select(SimpleModelsAndRelations.Models.fifteen.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, false))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.fifteen.WithoutImages, item => item);
      var allowed_targets = ApiTokenValid ? _context.fifteen : _context.fifteen;
      var editable_targets = ApiTokenValid ? _context.PreparationTime : (_context.PreparationTime);
      var can_edit_by_token = ApiTokenValid || true;
      return (from target in allowed_targets
              where !_context.PreparationTime_Recipe.Any(link => link.RecipeId == source.Id && link.PreparationTimeId == target.Id) &&
              true
              select target)
              .Select(SimpleModelsAndRelations.Models.fifteen.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, can_edit_by_token && editable_targets.Any(et => et.Id == t.Id)))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.fifteen.WithoutImages, item => item);
    }


    bool CanAdd_Recipe_PreparationTime_Recipes(Recipe source) {
      return (from link in _context.PreparationTime_Recipe
           where link.RecipeId == source.Id
           from target in _context.PreparationTime
           where link.PreparationTimeId == target.Id
           select target).Count() < 1;
    }

    bool CanAdd_PreparationTime_PreparationTime_Recipes(PreparationTime target) {
      return true;
    }

    [RestrictToUserType(new string[] {})]
    [HttpPost("{Recipe_id}/PreparationTime_Recipes_nintee")]
    public IEnumerable<nintee> CreateNewPreparationTime_Recipe_nintee(int Recipe_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var can_create_by_token = ApiTokenValid || true;
      if (source == null || !can_create_by_token)
        throw new Exception("Cannot create item in relation PreparationTime_Recipes");
      var can_link_by_token = ApiTokenValid || true;
      if (!CanAdd_Recipe_PreparationTime_Recipes(source) || !can_link_by_token)
        throw new Exception("Cannot add item to relation PreparationTime_Recipes");
      var new_target = new nintee() { CreatedDate = DateTime.Now, Id = _context.PreparationTime.Max(i => i.Id) + 1 };
      _context.nintee.Add(new_target);
      _context.SaveChanges();
      var link = new PreparationTime_Recipe() { Id = _context.PreparationTime_Recipe.Max(l => l.Id) + 1, RecipeId = source.Id, PreparationTimeId = new_target.Id };
      _context.PreparationTime_Recipe.Add(link);
      _context.SaveChanges();
      return new nintee[] { new_target };
    }
[RestrictToUserType(new string[] {})]
    [HttpPost("{Recipe_id}/PreparationTime_Recipes_thirty")]
    public IEnumerable<thirty> CreateNewPreparationTime_Recipe_thirty(int Recipe_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var can_create_by_token = ApiTokenValid || true;
      if (source == null || !can_create_by_token)
        throw new Exception("Cannot create item in relation PreparationTime_Recipes");
      var can_link_by_token = ApiTokenValid || true;
      if (!CanAdd_Recipe_PreparationTime_Recipes(source) || !can_link_by_token)
        throw new Exception("Cannot add item to relation PreparationTime_Recipes");
      var new_target = new thirty() { CreatedDate = DateTime.Now, Id = _context.PreparationTime.Max(i => i.Id) + 1 };
      _context.thirty.Add(new_target);
      _context.SaveChanges();
      var link = new PreparationTime_Recipe() { Id = _context.PreparationTime_Recipe.Max(l => l.Id) + 1, RecipeId = source.Id, PreparationTimeId = new_target.Id };
      _context.PreparationTime_Recipe.Add(link);
      _context.SaveChanges();
      return new thirty[] { new_target };
    }
[RestrictToUserType(new string[] {})]
    [HttpPost("{Recipe_id}/PreparationTime_Recipes_sixty")]
    public IEnumerable<sixty> CreateNewPreparationTime_Recipe_sixty(int Recipe_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var can_create_by_token = ApiTokenValid || true;
      if (source == null || !can_create_by_token)
        throw new Exception("Cannot create item in relation PreparationTime_Recipes");
      var can_link_by_token = ApiTokenValid || true;
      if (!CanAdd_Recipe_PreparationTime_Recipes(source) || !can_link_by_token)
        throw new Exception("Cannot add item to relation PreparationTime_Recipes");
      var new_target = new sixty() { CreatedDate = DateTime.Now, Id = _context.PreparationTime.Max(i => i.Id) + 1 };
      _context.sixty.Add(new_target);
      _context.SaveChanges();
      var link = new PreparationTime_Recipe() { Id = _context.PreparationTime_Recipe.Max(l => l.Id) + 1, RecipeId = source.Id, PreparationTimeId = new_target.Id };
      _context.PreparationTime_Recipe.Add(link);
      _context.SaveChanges();
      return new sixty[] { new_target };
    }
[RestrictToUserType(new string[] {})]
    [HttpPost("{Recipe_id}/PreparationTime_Recipes_fifteen")]
    public IEnumerable<fifteen> CreateNewPreparationTime_Recipe_fifteen(int Recipe_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var can_create_by_token = ApiTokenValid || true;
      if (source == null || !can_create_by_token)
        throw new Exception("Cannot create item in relation PreparationTime_Recipes");
      var can_link_by_token = ApiTokenValid || true;
      if (!CanAdd_Recipe_PreparationTime_Recipes(source) || !can_link_by_token)
        throw new Exception("Cannot add item to relation PreparationTime_Recipes");
      var new_target = new fifteen() { CreatedDate = DateTime.Now, Id = _context.PreparationTime.Max(i => i.Id) + 1 };
      _context.fifteen.Add(new_target);
      _context.SaveChanges();
      var link = new PreparationTime_Recipe() { Id = _context.PreparationTime_Recipe.Max(l => l.Id) + 1, RecipeId = source.Id, PreparationTimeId = new_target.Id };
      _context.PreparationTime_Recipe.Add(link);
      _context.SaveChanges();
      return new fifteen[] { new_target };
    }

    [RestrictToUserType(new string[] {"*"})]
    [HttpPost("{Recipe_id}/PreparationTime_Recipes/{PreparationTime_id}")]
    public void LinkWithPreparationTime_Recipe(int Recipe_id, int PreparationTime_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var allowed_targets = _context.PreparationTime;
      var target = allowed_targets.FirstOrDefault(s => s.Id == PreparationTime_id);
      var can_edit_source_by_token = ApiTokenValid || true;
      var can_edit_target_by_token = ApiTokenValid || true;
      var can_link_by_token = ApiTokenValid || true;
      if (!CanAdd_Recipe_PreparationTime_Recipes(source) || !can_link_by_token || !can_edit_source_by_token || !can_edit_target_by_token)
        throw new Exception("Cannot add item to relation PreparationTime_Recipes");
      if (!CanAdd_PreparationTime_PreparationTime_Recipes(target))
        throw new Exception("Cannot add item to relation PreparationTime_Recipes");
      var link = new PreparationTime_Recipe() { Id = _context.PreparationTime_Recipe.Max(i => i.Id) + 1, RecipeId = source.Id, PreparationTimeId = target.Id };
      _context.PreparationTime_Recipe.Add(link);
      _context.SaveChanges();
    }
    [RestrictToUserType(new string[] {"*"})]
    [HttpDelete("{Recipe_id}/PreparationTime_Recipes/{PreparationTime_id}")]
    public void UnlinkFromPreparationTime_Recipe(int Recipe_id, int PreparationTime_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var allowed_targets = _context.PreparationTime;
      var target = allowed_targets.FirstOrDefault(s => s.Id == PreparationTime_id);
      var link = _context.PreparationTime_Recipe.FirstOrDefault(l => l.RecipeId == source.Id && l.PreparationTimeId == target.Id);

      var can_edit_source_by_token = ApiTokenValid || true;
      var can_edit_target_by_token = ApiTokenValid || true;
      var can_unlink_by_token = ApiTokenValid || true;
      if (!can_unlink_by_token || !can_edit_source_by_token || !can_edit_target_by_token) throw new Exception("Cannot remove item from relation PreparationTime_Recipes");
      _context.PreparationTime_Recipe.Remove(link);
      _context.SaveChanges();
    }
    [RestrictToUserType(new string[] {"*"})]
    [HttpGet("{Recipe_id}/Favorite_Recipes")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Page<Favorite> GetFavorite_Recipes(int Recipe_id, [FromQuery] int page_index, [FromQuery] int page_size = 25)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var can_create_by_token = ApiTokenValid || true;
      var can_delete_by_token = ApiTokenValid || true || true;
      var can_link_by_token = ApiTokenValid || true;
      var can_view_by_token = ApiTokenValid || true;
      if (source == null || !can_view_by_token) // test
        return Enumerable.Empty<SimpleModelsAndRelations.Models.Favorite>() // B
              .AsQueryable()
              .Select(SimpleModelsAndRelations.Models.Favorite.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, false))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Favorite.WithoutImages, item => item);
      var allowed_targets = ApiTokenValid ? _context.Favorite : _context.Favorite;
      var editable_targets = ApiTokenValid ? _context.Favorite : (_context.Favorite);
      var can_edit_by_token = ApiTokenValid || true;
      return (from link in _context.Favorite_Recipe
              where link.RecipeId == source.Id
              from target in allowed_targets
              where link.FavoriteId == target.Id
              select target)
              .Select(SimpleModelsAndRelations.Models.Favorite.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, can_edit_by_token && editable_targets.Any(et => et.Id == t.Id)))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Favorite.WithoutImages, item => item);
    }

    [HttpGet("{Recipe_id}/Favorite_Recipes/{Favorite_id}")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Favorite GetFavorite_RecipeById(int Recipe_id, int Favorite_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var can_view_by_token = ApiTokenValid || true;
      if (source == null || !can_view_by_token)
        return null;
      var allowed_targets = ApiTokenValid ? _context.Favorite : _context.Favorite;
      var item = (from link in _context.Favorite_Recipe
              where link.RecipeId == source.Id
              from target in allowed_targets
              where link.FavoriteId == target.Id
              select target)
              .Select(SimpleModelsAndRelations.Models.Favorite.FilterViewableAttributes(current_User))
              .FirstOrDefault(t => t.Id == Favorite_id);

      item = SimpleModelsAndRelations.Models.Favorite.WithoutImages(item);
      return item;
    }

    [RestrictToUserType(new string[] {"*"})]
    [HttpGet("{Recipe_id}/unlinked/Favorite_Recipes")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Page<Favorite> GetUnlinkedFavorite_Recipes(int Recipe_id, [FromQuery] int page_index, [FromQuery] int page_size = 25)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var can_create_by_token = ApiTokenValid || true;
      var can_delete_by_token = ApiTokenValid || true || true;
      var can_link_by_token = ApiTokenValid || true;
      var can_view_by_token = ApiTokenValid || true;
      if (source == null || !can_view_by_token) // test
        return Enumerable.Empty<SimpleModelsAndRelations.Models.Favorite>() // C
              .AsQueryable()
              .Select(SimpleModelsAndRelations.Models.Favorite.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, false))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Favorite.WithoutImages, item => item);
      var allowed_targets = ApiTokenValid ? _context.Favorite : _context.Favorite;
      var editable_targets = ApiTokenValid ? _context.Favorite : (_context.Favorite);
      var can_edit_by_token = ApiTokenValid || true;
      return (from target in allowed_targets
              where !_context.Favorite_Recipe.Any(link => link.RecipeId == source.Id && link.FavoriteId == target.Id) &&
              true
              select target)
              .Select(SimpleModelsAndRelations.Models.Favorite.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, can_edit_by_token && editable_targets.Any(et => et.Id == t.Id)))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Favorite.WithoutImages, item => item);
    }

    bool CanAdd_Recipe_Favorite_Recipes(Recipe source) {
      return true;
    }

    bool CanAdd_Favorite_Favorite_Recipes(Favorite target) {
      return true;
    }

    [RestrictToUserType(new string[] {})]
    [HttpPost("{Recipe_id}/Favorite_Recipes_Favorite")]
    public IEnumerable<Favorite> CreateNewFavorite_Recipe_Favorite(int Recipe_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var can_create_by_token = ApiTokenValid || true;
      if (source == null || !can_create_by_token)
        throw new Exception("Cannot create item in relation Favorite_Recipes");
      var can_link_by_token = ApiTokenValid || true;
      if (!CanAdd_Recipe_Favorite_Recipes(source) || !can_link_by_token)
        throw new Exception("Cannot add item to relation Favorite_Recipes");
      var new_target = new Favorite() { CreatedDate = DateTime.Now, Id = _context.Favorite.Max(i => i.Id) + 1 };
      _context.Favorite.Add(new_target);
      _context.SaveChanges();
      var link = new Favorite_Recipe() { Id = _context.Favorite_Recipe.Max(l => l.Id) + 1, RecipeId = source.Id, FavoriteId = new_target.Id };
      _context.Favorite_Recipe.Add(link);
      _context.SaveChanges();
      return new Favorite[] { new_target };
    }

    [RestrictToUserType(new string[] {"*"})]
    [HttpPost("{Recipe_id}/Favorite_Recipes/{Favorite_id}")]
    public void LinkWithFavorite_Recipe(int Recipe_id, int Favorite_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var allowed_targets = _context.Favorite;
      var target = allowed_targets.FirstOrDefault(s => s.Id == Favorite_id);
      var can_edit_source_by_token = ApiTokenValid || true;
      var can_edit_target_by_token = ApiTokenValid || true;
      var can_link_by_token = ApiTokenValid || true;
      if (!CanAdd_Recipe_Favorite_Recipes(source) || !can_link_by_token || !can_edit_source_by_token || !can_edit_target_by_token)
        throw new Exception("Cannot add item to relation Favorite_Recipes");
      if (!CanAdd_Favorite_Favorite_Recipes(target))
        throw new Exception("Cannot add item to relation Favorite_Recipes");
      var link = new Favorite_Recipe() { Id = _context.Favorite_Recipe.Max(i => i.Id) + 1, RecipeId = source.Id, FavoriteId = target.Id };
      _context.Favorite_Recipe.Add(link);
      _context.SaveChanges();
    }
    [RestrictToUserType(new string[] {"*"})]
    [HttpDelete("{Recipe_id}/Favorite_Recipes/{Favorite_id}")]
    public void UnlinkFromFavorite_Recipe(int Recipe_id, int Favorite_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var allowed_targets = _context.Favorite;
      var target = allowed_targets.FirstOrDefault(s => s.Id == Favorite_id);
      var link = _context.Favorite_Recipe.FirstOrDefault(l => l.RecipeId == source.Id && l.FavoriteId == target.Id);

      var can_edit_source_by_token = ApiTokenValid || true;
      var can_edit_target_by_token = ApiTokenValid || true;
      var can_unlink_by_token = ApiTokenValid || true;
      if (!can_unlink_by_token || !can_edit_source_by_token || !can_edit_target_by_token) throw new Exception("Cannot remove item from relation Favorite_Recipes");
      _context.Favorite_Recipe.Remove(link);
      _context.SaveChanges();
    }
    [RestrictToUserType(new string[] {"*"})]
    [HttpGet("{Recipe_id}/Rating_Recipes")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Page<Rating> GetRating_Recipes(int Recipe_id, [FromQuery] int page_index, [FromQuery] int page_size = 25)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var can_create_by_token = ApiTokenValid || true;
      var can_delete_by_token = ApiTokenValid || true || true;
      var can_link_by_token = ApiTokenValid || true;
      var can_view_by_token = ApiTokenValid || true;
      if (source == null || !can_view_by_token) // test
        return Enumerable.Empty<SimpleModelsAndRelations.Models.Rating>() // B
              .AsQueryable()
              .Select(SimpleModelsAndRelations.Models.Rating.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, false))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Rating.WithoutImages, item => item);
      var allowed_targets = ApiTokenValid ? _context.Rating : _context.Rating;
      var editable_targets = ApiTokenValid ? _context.Rating : (_context.Rating);
      var can_edit_by_token = ApiTokenValid || true;
      return (from link in _context.Rating_Recipe
              where link.RecipeId == source.Id
              from target in allowed_targets
              where link.RatingId == target.Id
              select target)
              .Select(SimpleModelsAndRelations.Models.Rating.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, can_edit_by_token && editable_targets.Any(et => et.Id == t.Id)))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Rating.WithoutImages, item => item);
    }

    [HttpGet("{Recipe_id}/Rating_Recipes/{Rating_id}")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Rating GetRating_RecipeById(int Recipe_id, int Rating_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var can_view_by_token = ApiTokenValid || true;
      if (source == null || !can_view_by_token)
        return null;
      var allowed_targets = ApiTokenValid ? _context.Rating : _context.Rating;
      var item = (from link in _context.Rating_Recipe
              where link.RecipeId == source.Id
              from target in allowed_targets
              where link.RatingId == target.Id
              select target)
              .Select(SimpleModelsAndRelations.Models.Rating.FilterViewableAttributes(current_User))
              .FirstOrDefault(t => t.Id == Rating_id);

      item = SimpleModelsAndRelations.Models.Rating.WithoutImages(item);
      return item;
    }

    [RestrictToUserType(new string[] {"*"})]
    [HttpGet("{Recipe_id}/unlinked/Rating_Recipes")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Page<Rating> GetUnlinkedRating_Recipes(int Recipe_id, [FromQuery] int page_index, [FromQuery] int page_size = 25)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var can_create_by_token = ApiTokenValid || true;
      var can_delete_by_token = ApiTokenValid || true || true;
      var can_link_by_token = ApiTokenValid || true;
      var can_view_by_token = ApiTokenValid || true;
      if (source == null || !can_view_by_token) // test
        return Enumerable.Empty<SimpleModelsAndRelations.Models.Rating>() // C
              .AsQueryable()
              .Select(SimpleModelsAndRelations.Models.Rating.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, false))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Rating.WithoutImages, item => item);
      var allowed_targets = ApiTokenValid ? _context.Rating : _context.Rating;
      var editable_targets = ApiTokenValid ? _context.Rating : (_context.Rating);
      var can_edit_by_token = ApiTokenValid || true;
      return (from target in allowed_targets
              where !_context.Rating_Recipe.Any(link => link.RecipeId == source.Id && link.RatingId == target.Id) &&
              true
              select target)
              .Select(SimpleModelsAndRelations.Models.Rating.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, can_edit_by_token && editable_targets.Any(et => et.Id == t.Id)))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Rating.WithoutImages, item => item);
    }

    bool CanAdd_Recipe_Rating_Recipes(Recipe source) {
      return true;
    }

    bool CanAdd_Rating_Rating_Recipes(Rating target) {
      return true;
    }

    [RestrictToUserType(new string[] {})]
    [HttpPost("{Recipe_id}/Rating_Recipes_Rating")]
    public IEnumerable<Rating> CreateNewRating_Recipe_Rating(int Recipe_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var can_create_by_token = ApiTokenValid || true;
      if (source == null || !can_create_by_token)
        throw new Exception("Cannot create item in relation Rating_Recipes");
      var can_link_by_token = ApiTokenValid || true;
      if (!CanAdd_Recipe_Rating_Recipes(source) || !can_link_by_token)
        throw new Exception("Cannot add item to relation Rating_Recipes");
      var new_target = new Rating() { CreatedDate = DateTime.Now, Id = _context.Rating.Max(i => i.Id) + 1 };
      _context.Rating.Add(new_target);
      _context.SaveChanges();
      var link = new Rating_Recipe() { Id = _context.Rating_Recipe.Max(l => l.Id) + 1, RecipeId = source.Id, RatingId = new_target.Id };
      _context.Rating_Recipe.Add(link);
      _context.SaveChanges();
      return new Rating[] { new_target };
    }

    [RestrictToUserType(new string[] {"*"})]
    [HttpPost("{Recipe_id}/Rating_Recipes/{Rating_id}")]
    public void LinkWithRating_Recipe(int Recipe_id, int Rating_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var allowed_targets = _context.Rating;
      var target = allowed_targets.FirstOrDefault(s => s.Id == Rating_id);
      var can_edit_source_by_token = ApiTokenValid || true;
      var can_edit_target_by_token = ApiTokenValid || true;
      var can_link_by_token = ApiTokenValid || true;
      if (!CanAdd_Recipe_Rating_Recipes(source) || !can_link_by_token || !can_edit_source_by_token || !can_edit_target_by_token)
        throw new Exception("Cannot add item to relation Rating_Recipes");
      if (!CanAdd_Rating_Rating_Recipes(target))
        throw new Exception("Cannot add item to relation Rating_Recipes");
      var link = new Rating_Recipe() { Id = _context.Rating_Recipe.Max(i => i.Id) + 1, RecipeId = source.Id, RatingId = target.Id };
      _context.Rating_Recipe.Add(link);
      _context.SaveChanges();
    }
    [RestrictToUserType(new string[] {"*"})]
    [HttpDelete("{Recipe_id}/Rating_Recipes/{Rating_id}")]
    public void UnlinkFromRating_Recipe(int Recipe_id, int Rating_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var allowed_targets = _context.Rating;
      var target = allowed_targets.FirstOrDefault(s => s.Id == Rating_id);
      var link = _context.Rating_Recipe.FirstOrDefault(l => l.RecipeId == source.Id && l.RatingId == target.Id);

      var can_edit_source_by_token = ApiTokenValid || true;
      var can_edit_target_by_token = ApiTokenValid || true;
      var can_unlink_by_token = ApiTokenValid || true;
      if (!can_unlink_by_token || !can_edit_source_by_token || !can_edit_target_by_token) throw new Exception("Cannot remove item from relation Rating_Recipes");
      _context.Rating_Recipe.Remove(link);
      _context.SaveChanges();
    }
    [RestrictToUserType(new string[] {"*"})]
    [HttpGet("{Recipe_id}/RecommendationPage_Recipes")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Page<RecommendationPage> GetRecommendationPage_Recipes(int Recipe_id, [FromQuery] int page_index, [FromQuery] int page_size = 25)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var can_create_by_token = ApiTokenValid || true;
      var can_delete_by_token = ApiTokenValid || true || true;
      var can_link_by_token = ApiTokenValid || true;
      var can_view_by_token = ApiTokenValid || true;
      if (source == null || !can_view_by_token) // test
        return Enumerable.Empty<SimpleModelsAndRelations.Models.RecommendationPage>() // B
              .AsQueryable()
              .Select(SimpleModelsAndRelations.Models.RecommendationPage.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, false))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.RecommendationPage.WithoutImages, item => item);
      var allowed_targets = ApiTokenValid ? _context.RecommendationPage : _context.RecommendationPage;
      var editable_targets = ApiTokenValid ? _context.RecommendationPage : (_context.RecommendationPage);
      var can_edit_by_token = ApiTokenValid || true;
      return (from link in _context.RecommendationPage_Recipe
              where link.RecipeId == source.Id
              from target in allowed_targets
              where link.RecommendationPageId == target.Id
              select target)
              .Select(SimpleModelsAndRelations.Models.RecommendationPage.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, can_edit_by_token && editable_targets.Any(et => et.Id == t.Id)))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.RecommendationPage.WithoutImages, item => item);
    }

    [HttpGet("{Recipe_id}/RecommendationPage_Recipes/{RecommendationPage_id}")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public RecommendationPage GetRecommendationPage_RecipeById(int Recipe_id, int RecommendationPage_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var can_view_by_token = ApiTokenValid || true;
      if (source == null || !can_view_by_token)
        return null;
      var allowed_targets = ApiTokenValid ? _context.RecommendationPage : _context.RecommendationPage;
      var item = (from link in _context.RecommendationPage_Recipe
              where link.RecipeId == source.Id
              from target in allowed_targets
              where link.RecommendationPageId == target.Id
              select target)
              .Select(SimpleModelsAndRelations.Models.RecommendationPage.FilterViewableAttributes(current_User))
              .FirstOrDefault(t => t.Id == RecommendationPage_id);

      item = SimpleModelsAndRelations.Models.RecommendationPage.WithoutImages(item);
      return item;
    }

    [RestrictToUserType(new string[] {"*"})]
    [HttpGet("{Recipe_id}/unlinked/RecommendationPage_Recipes")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Page<RecommendationPage> GetUnlinkedRecommendationPage_Recipes(int Recipe_id, [FromQuery] int page_index, [FromQuery] int page_size = 25)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var can_create_by_token = ApiTokenValid || true;
      var can_delete_by_token = ApiTokenValid || true || true;
      var can_link_by_token = ApiTokenValid || true;
      var can_view_by_token = ApiTokenValid || true;
      if (source == null || !can_view_by_token) // test
        return Enumerable.Empty<SimpleModelsAndRelations.Models.RecommendationPage>() // C
              .AsQueryable()
              .Select(SimpleModelsAndRelations.Models.RecommendationPage.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, false))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.RecommendationPage.WithoutImages, item => item);
      var allowed_targets = ApiTokenValid ? _context.RecommendationPage : _context.RecommendationPage;
      var editable_targets = ApiTokenValid ? _context.RecommendationPage : (_context.RecommendationPage);
      var can_edit_by_token = ApiTokenValid || true;
      return (from target in allowed_targets
              where !_context.RecommendationPage_Recipe.Any(link => link.RecipeId == source.Id && link.RecommendationPageId == target.Id) &&
              true
              select target)
              .Select(SimpleModelsAndRelations.Models.RecommendationPage.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, can_edit_by_token && editable_targets.Any(et => et.Id == t.Id)))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.RecommendationPage.WithoutImages, item => item);
    }

    bool CanAdd_Recipe_RecommendationPage_Recipes(Recipe source) {
      return true;
    }

    bool CanAdd_RecommendationPage_RecommendationPage_Recipes(RecommendationPage target) {
      return true;
    }

    [RestrictToUserType(new string[] {})]
    [HttpPost("{Recipe_id}/RecommendationPage_Recipes_RecommendationPage")]
    public IEnumerable<RecommendationPage> CreateNewRecommendationPage_Recipe_RecommendationPage(int Recipe_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var can_create_by_token = ApiTokenValid || true;
      if (source == null || !can_create_by_token)
        throw new Exception("Cannot create item in relation RecommendationPage_Recipes");
      var can_link_by_token = ApiTokenValid || true;
      if (!CanAdd_Recipe_RecommendationPage_Recipes(source) || !can_link_by_token)
        throw new Exception("Cannot add item to relation RecommendationPage_Recipes");
      var new_target = new RecommendationPage() { CreatedDate = DateTime.Now, Id = _context.RecommendationPage.Max(i => i.Id) + 1 };
      _context.RecommendationPage.Add(new_target);
      _context.SaveChanges();
      var link = new RecommendationPage_Recipe() { Id = _context.RecommendationPage_Recipe.Max(l => l.Id) + 1, RecipeId = source.Id, RecommendationPageId = new_target.Id };
      _context.RecommendationPage_Recipe.Add(link);
      _context.SaveChanges();
      return new RecommendationPage[] { new_target };
    }

    [RestrictToUserType(new string[] {"*"})]
    [HttpPost("{Recipe_id}/RecommendationPage_Recipes/{RecommendationPage_id}")]
    public void LinkWithRecommendationPage_Recipe(int Recipe_id, int RecommendationPage_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var allowed_targets = _context.RecommendationPage;
      var target = allowed_targets.FirstOrDefault(s => s.Id == RecommendationPage_id);
      var can_edit_source_by_token = ApiTokenValid || true;
      var can_edit_target_by_token = ApiTokenValid || true;
      var can_link_by_token = ApiTokenValid || true;
      if (!CanAdd_Recipe_RecommendationPage_Recipes(source) || !can_link_by_token || !can_edit_source_by_token || !can_edit_target_by_token)
        throw new Exception("Cannot add item to relation RecommendationPage_Recipes");
      if (!CanAdd_RecommendationPage_RecommendationPage_Recipes(target))
        throw new Exception("Cannot add item to relation RecommendationPage_Recipes");
      var link = new RecommendationPage_Recipe() { Id = _context.RecommendationPage_Recipe.Max(i => i.Id) + 1, RecipeId = source.Id, RecommendationPageId = target.Id };
      _context.RecommendationPage_Recipe.Add(link);
      _context.SaveChanges();
    }
    [RestrictToUserType(new string[] {"*"})]
    [HttpDelete("{Recipe_id}/RecommendationPage_Recipes/{RecommendationPage_id}")]
    public void UnlinkFromRecommendationPage_Recipe(int Recipe_id, int RecommendationPage_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var allowed_targets = _context.RecommendationPage;
      var target = allowed_targets.FirstOrDefault(s => s.Id == RecommendationPage_id);
      var link = _context.RecommendationPage_Recipe.FirstOrDefault(l => l.RecipeId == source.Id && l.RecommendationPageId == target.Id);

      var can_edit_source_by_token = ApiTokenValid || true;
      var can_edit_target_by_token = ApiTokenValid || true;
      var can_unlink_by_token = ApiTokenValid || true;
      if (!can_unlink_by_token || !can_edit_source_by_token || !can_edit_target_by_token) throw new Exception("Cannot remove item from relation RecommendationPage_Recipes");
      _context.RecommendationPage_Recipe.Remove(link);
      _context.SaveChanges();
    }
    [RestrictToUserType(new string[] {"*"})]
    [HttpGet("{Recipe_id}/Homepage_Recipes")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Page<Homepage> GetHomepage_Recipes(int Recipe_id, [FromQuery] int page_index, [FromQuery] int page_size = 25)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var can_create_by_token = ApiTokenValid || true;
      var can_delete_by_token = ApiTokenValid || true || true;
      var can_link_by_token = ApiTokenValid || true;
      var can_view_by_token = ApiTokenValid || true;
      if (source == null || !can_view_by_token) // test
        return Enumerable.Empty<SimpleModelsAndRelations.Models.Homepage>() // B
              .AsQueryable()
              .Select(SimpleModelsAndRelations.Models.Homepage.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, false))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Homepage.WithoutImages, item => item);
      var allowed_targets = ApiTokenValid ? _context.Homepage : _context.Homepage;
      var editable_targets = ApiTokenValid ? _context.Homepage : (_context.Homepage);
      var can_edit_by_token = ApiTokenValid || true;
      return (from target in allowed_targets
              select target)
              .Select(SimpleModelsAndRelations.Models.Homepage.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, can_edit_by_token && editable_targets.Any(et => et.Id == t.Id)))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Homepage.WithoutImages, item => item);
    }

    [HttpGet("{Recipe_id}/Homepage_Recipes/{Homepage_id}")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Homepage GetHomepage_RecipeById(int Recipe_id, int Homepage_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var can_view_by_token = ApiTokenValid || true;
      if (source == null || !can_view_by_token)
        return null;
      var allowed_targets = ApiTokenValid ? _context.Homepage : _context.Homepage;
      var item = (from target in allowed_targets
              select target)
              .Select(SimpleModelsAndRelations.Models.Homepage.FilterViewableAttributes(current_User))
              .FirstOrDefault(t => t.Id == Homepage_id);

      item = SimpleModelsAndRelations.Models.Homepage.WithoutImages(item);
      return item;
    }

    
    [RestrictToUserType(new string[] {"*"})]
    [HttpGet("{id}")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public ItemWithEditable<Recipe> GetById(int id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_items = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var editable_items = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var item = SimpleModelsAndRelations.Models.Recipe.FilterViewableAttributesLocal(current_User)(allowed_items.FirstOrDefault(e => e.Id == id));
      item = SimpleModelsAndRelations.Models.Recipe.WithoutImages(item);
      return new ItemWithEditable<Recipe>() {
        Item = item,
        Editable = editable_items.Any(e => e.Id == item.Id) };
    }
    
    [RestrictToUserType(new string[] {"*"})]
    [HttpGet("{id}/Picture")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Container<string> GetPictureById(int id)
    {
var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_items = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var item = SimpleModelsAndRelations.Models.Recipe.FilterViewableAttributesLocal(current_User)(allowed_items.FirstOrDefault(e => e.Id == id));
      return new Container<string> { Content = item.Picture };
    }

    [RestrictToUserType(new string[] {"*"})]
    [HttpPut("{id}/Picture")]
    [ValidateAntiForgeryToken]
    public void ChangePicture(int id, [FromBody] Container<string> Picture)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_items = ApiTokenValid ? _context.Recipe : _context.Recipe;
      if (!allowed_items.Any(i => i.Id == id)) return;
      var item = new Recipe() { Id = id, Picture = Picture.Content };
      _context.Recipe.Update(item);
      
      _context.Entry(item).Property(x => x.Name).IsModified = false;
      _context.Entry(item).Property(x => x.Ingredients).IsModified = false;
      _context.Entry(item).Property(x => x.Description).IsModified = false;
      _context.Entry(item).Property(x => x.RatingType).IsModified = false;
      _context.Entry(item).Property(x => x.CreatedDate).IsModified = false;
      _context.Entry(item).Property(x => x.Picture).IsModified = true;
      _context.SaveChanges();
    }

    [RestrictToUserType(new string[] {})]
    [HttpPost]
    [ValidateAntiForgeryToken]
    public Recipe Create()
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var can_create_by_token = ApiTokenValid || true;
      if (!can_create_by_token)
        throw new Exception("Unauthorized create attempt");
      var item = new Recipe() { CreatedDate = DateTime.Now, Id = _context.Recipe.Max(i => i.Id) + 1 };
      _context.Recipe.Add(SimpleModelsAndRelations.Models.Recipe.FilterViewableAttributesLocal(current_User)(item));
      _context.SaveChanges();
      item = SimpleModelsAndRelations.Models.Recipe.WithoutImages(item);
      return item;
    }

    [RestrictToUserType(new string[] {"*"})]
    [HttpPut]
    [ValidateAntiForgeryToken]
    public void Update([FromBody] Recipe item)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_items = ApiTokenValid ? _context.Recipe : _context.Recipe;
      if (!allowed_items.Any(i => i.Id == item.Id)) return;
      var new_item = item;
      
      var can_edit_by_token = ApiTokenValid || true;
      if (item == null || !can_edit_by_token)
        throw new Exception("Unauthorized edit attempt");
      _context.Update(new_item);
      _context.Entry(new_item).Property(x => x.Picture).IsModified = false;
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
      var allowed_items = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var item = _context.Recipe.FirstOrDefault(e => e.Id == id);
      var can_delete_by_token = ApiTokenValid || true;
      if (item == null || !can_delete_by_token)
        throw new Exception("Unauthorized delete attempt");
      
      if (!allowed_items.Any(a => a.Id == item.Id)) throw new Exception("Unauthorized delete attempt");
      
      _context.Recipe.Remove(item);
      _context.SaveChanges();
    }

    [RestrictToUserType(new string[] {"*"})]
    [HttpGet]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Page<Recipe> GetAll([FromQuery] int page_index, [FromQuery] int page_size = 25)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_items = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var editable_items = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var can_edit_by_token = ApiTokenValid || true;
      var can_create_by_token = ApiTokenValid || true;
      var can_delete_by_token = ApiTokenValid || true;
      return allowed_items
        .Select(SimpleModelsAndRelations.Models.Recipe.FilterViewableAttributes(current_User))
        .Select(s => Tuple.Create(s, can_edit_by_token && editable_items.Any(es => es.Id == s.Id)))
        .Paginate(can_create_by_token, can_delete_by_token, false, page_index, page_size, SimpleModelsAndRelations.Models.Recipe.WithoutImages, item => item);
    }

    


    
  }

  