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


  [Route("api/v1/Meal")]
  public class MealApiController : Controller
  {
    private readonly MailOptions _mailOptions;
    public readonly SimpleModelsAndRelationsContext _context;
    private IHostingEnvironment env;

    public MealApiController(SimpleModelsAndRelationsContext context, IHostingEnvironment env, IOptions<MailOptions> mailOptionsAccessor)
    {
      _context = context;
      _mailOptions = mailOptionsAccessor.Value;
      this.env = env;
    }

    public bool ApiTokenValid => RestrictToUserTypeAttribute.ApiToken != null &&
        HttpContext.Request.Headers["ApiToken"] == RestrictToUserTypeAttribute.ApiToken;

    
    [RestrictToUserType(new string[] {"*"})]
    [HttpGet("{Meal_id}/Cuisine_Meals")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Page<Cuisine> GetCuisine_Meals(int Meal_id, [FromQuery] int page_index, [FromQuery] int page_size = 25 )
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Meal : _context.Meal;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Meal_id);
      var can_create_by_token = ApiTokenValid || true;
      var can_delete_by_token = ApiTokenValid || true || true;
      var can_link_by_token = ApiTokenValid || true;
      var can_view_by_token = ApiTokenValid || true;
      if (source == null || !can_view_by_token) // test
        return Enumerable.Empty<SimpleModelsAndRelations.Models.Cuisine>() // B
              .AsQueryable()
              .Select(SimpleModelsAndRelations.Models.Cuisine.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, false))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Cuisine.WithoutImages, item => item , null);
      var allowed_targets = ApiTokenValid ? _context.Cuisine : _context.Cuisine;
      var editable_targets = ApiTokenValid ? _context.Cuisine : (_context.Cuisine);
      var can_edit_by_token = ApiTokenValid || true;
      var items = (from link in _context.Cuisine_Meal
              where link.MealId == source.Id
              from target in allowed_targets
              where link.CuisineId == target.Id
              select target).OrderBy(i => i.CreatedDate).AsQueryable();
      
      return items
              .Select(SimpleModelsAndRelations.Models.Cuisine.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, can_edit_by_token && editable_targets.Any(et => et.Id == t.Id)))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Cuisine.WithoutImages, item => item , null);
    }

    [HttpGet("{Meal_id}/Cuisine_Meals/{Cuisine_id}")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult /*Cuisine*/ GetCuisine_MealById(int Meal_id, int Cuisine_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Meal : _context.Meal;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Meal_id);
      var can_view_by_token = ApiTokenValid || true;
      if (source == null || !can_view_by_token)
        return NotFound();
      var allowed_targets = ApiTokenValid ? _context.Cuisine : _context.Cuisine;
      var item = (from link in _context.Cuisine_Meal
              where link.MealId == source.Id
              from target in allowed_targets
              where link.CuisineId == target.Id
              select target).OrderBy(i => i.CreatedDate)
              .Select(SimpleModelsAndRelations.Models.Cuisine.FilterViewableAttributes(current_User))
              .FirstOrDefault(t => t.Id == Cuisine_id);
      if (item == null) return NotFound();
      item = SimpleModelsAndRelations.Models.Cuisine.WithoutImages(item);
      return Ok(item);
    }

    [RestrictToUserType(new string[] {"*"})]
    [HttpGet("{Meal_id}/unlinked/Cuisine_Meals")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Page<Cuisine> GetUnlinkedCuisine_Meals(int Meal_id, [FromQuery] int page_index, [FromQuery] int page_size = 25)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Meal : _context.Meal;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Meal_id);
      var can_create_by_token = ApiTokenValid || true;
      var can_delete_by_token = ApiTokenValid || true || true;
      var can_link_by_token = ApiTokenValid || true;
      var can_view_by_token = ApiTokenValid || true;
      if (source == null || !can_view_by_token)
        return Enumerable.Empty<SimpleModelsAndRelations.Models.Cuisine>()
              .AsQueryable()
              .Select(SimpleModelsAndRelations.Models.Cuisine.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, false))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Cuisine.WithoutImages, item => item);
      var allowed_targets = ApiTokenValid ? _context.Cuisine : _context.Cuisine;
      var editable_targets = ApiTokenValid ? _context.Cuisine : (_context.Cuisine);
      var can_edit_by_token = ApiTokenValid || true;
      return (from target in allowed_targets
              where !_context.Cuisine_Meal.Any(link => link.MealId == source.Id && link.CuisineId == target.Id) &&
              true
              select target).OrderBy(i => i.CreatedDate)
              .Select(SimpleModelsAndRelations.Models.Cuisine.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, can_edit_by_token && editable_targets.Any(et => et.Id == t.Id)))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Cuisine.WithoutImages, item => item);
    }
    [RestrictToUserType(new string[] {"*"})]
    [HttpGet("{Meal_id}/unlinked/Cuisine_Meals/Asian")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Page<Asian> GetUnlinkedCuisine_Meals_Asian(int Meal_id, [FromQuery] int page_index, [FromQuery] int page_size = 25)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Meal : _context.Meal;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Meal_id);
      var can_create_by_token = ApiTokenValid || true;
      var can_delete_by_token = ApiTokenValid || true || true;
      var can_link_by_token = ApiTokenValid || true;
      var can_view_by_token = ApiTokenValid || true;
      if (source == null || !can_view_by_token) // test
        return Enumerable.Empty<SimpleModelsAndRelations.Models.Asian>() // A
              .AsQueryable()
              .Select(SimpleModelsAndRelations.Models.Asian.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, false))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Asian.WithoutImages, item => item);
      var allowed_targets = ApiTokenValid ? _context.Asian : _context.Asian;
      var editable_targets = ApiTokenValid ? _context.Cuisine : (_context.Cuisine);
      var can_edit_by_token = ApiTokenValid || true;
      return (from target in allowed_targets
              where !_context.Cuisine_Meal.Any(link => link.MealId == source.Id && link.CuisineId == target.Id) &&
              true
              select target).OrderBy(i => i.CreatedDate)
              .Select(SimpleModelsAndRelations.Models.Asian.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, can_edit_by_token && editable_targets.Any(et => et.Id == t.Id)))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Asian.WithoutImages, item => item);
    }


    [RestrictToUserType(new string[] {"*"})]
    [HttpGet("{Meal_id}/unlinked/Cuisine_Meals/Mediterranean")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Page<Mediterranean> GetUnlinkedCuisine_Meals_Mediterranean(int Meal_id, [FromQuery] int page_index, [FromQuery] int page_size = 25)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Meal : _context.Meal;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Meal_id);
      var can_create_by_token = ApiTokenValid || true;
      var can_delete_by_token = ApiTokenValid || true || true;
      var can_link_by_token = ApiTokenValid || true;
      var can_view_by_token = ApiTokenValid || true;
      if (source == null || !can_view_by_token) // test
        return Enumerable.Empty<SimpleModelsAndRelations.Models.Mediterranean>() // A
              .AsQueryable()
              .Select(SimpleModelsAndRelations.Models.Mediterranean.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, false))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Mediterranean.WithoutImages, item => item);
      var allowed_targets = ApiTokenValid ? _context.Mediterranean : _context.Mediterranean;
      var editable_targets = ApiTokenValid ? _context.Cuisine : (_context.Cuisine);
      var can_edit_by_token = ApiTokenValid || true;
      return (from target in allowed_targets
              where !_context.Cuisine_Meal.Any(link => link.MealId == source.Id && link.CuisineId == target.Id) &&
              true
              select target).OrderBy(i => i.CreatedDate)
              .Select(SimpleModelsAndRelations.Models.Mediterranean.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, can_edit_by_token && editable_targets.Any(et => et.Id == t.Id)))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Mediterranean.WithoutImages, item => item);
    }


    [RestrictToUserType(new string[] {"*"})]
    [HttpGet("{Meal_id}/unlinked/Cuisine_Meals/Grill")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Page<Grill> GetUnlinkedCuisine_Meals_Grill(int Meal_id, [FromQuery] int page_index, [FromQuery] int page_size = 25)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Meal : _context.Meal;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Meal_id);
      var can_create_by_token = ApiTokenValid || true;
      var can_delete_by_token = ApiTokenValid || true || true;
      var can_link_by_token = ApiTokenValid || true;
      var can_view_by_token = ApiTokenValid || true;
      if (source == null || !can_view_by_token) // test
        return Enumerable.Empty<SimpleModelsAndRelations.Models.Grill>() // A
              .AsQueryable()
              .Select(SimpleModelsAndRelations.Models.Grill.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, false))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Grill.WithoutImages, item => item);
      var allowed_targets = ApiTokenValid ? _context.Grill : _context.Grill;
      var editable_targets = ApiTokenValid ? _context.Cuisine : (_context.Cuisine);
      var can_edit_by_token = ApiTokenValid || true;
      return (from target in allowed_targets
              where !_context.Cuisine_Meal.Any(link => link.MealId == source.Id && link.CuisineId == target.Id) &&
              true
              select target).OrderBy(i => i.CreatedDate)
              .Select(SimpleModelsAndRelations.Models.Grill.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, can_edit_by_token && editable_targets.Any(et => et.Id == t.Id)))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Grill.WithoutImages, item => item);
    }


    bool CanAdd_Meal_Cuisine_Meals(Meal source) {
      return (from link in _context.Cuisine_Meal
           where link.MealId == source.Id
           from target in _context.Cuisine
           where link.CuisineId == target.Id
           select target).Count() < 1;
    }

    bool CanAdd_Cuisine_Cuisine_Meals(Cuisine target) {
      return true;
    }

    [RestrictToUserType(new string[] {"*"})]
    [HttpPost("{Meal_id}/Cuisine_Meals_Asian")]
    public IActionResult /*IEnumerable<Asian>*/ CreateNewCuisine_Meal_Asian(int Meal_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Meal : _context.Meal;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Meal_id);
      var can_create_by_token = ApiTokenValid || true;
      if (source == null || !can_create_by_token)
        return Unauthorized();
        // throw new Exception("Cannot create item in relation Cuisine_Meals");
      var can_link_by_token = ApiTokenValid || true;
      if (!CanAdd_Meal_Cuisine_Meals(source) || !can_link_by_token)
        return Unauthorized();
        //throw new Exception("Cannot add item to relation Cuisine_Meals");
      var new_target = new Asian() { CreatedDate = DateTime.Now, Id = _context.Cuisine.Max(i => i.Id) + 1 };
      _context.Asian.Add(new_target);
      _context.SaveChanges();
      var link = new Cuisine_Meal() { Id = _context.Cuisine_Meal.Max(l => l.Id) + 1, MealId = source.Id, CuisineId = new_target.Id };
      _context.Cuisine_Meal.Add(link);
      _context.SaveChanges();
      return Ok(new Asian[] { new_target });
    }
[RestrictToUserType(new string[] {"*"})]
    [HttpPost("{Meal_id}/Cuisine_Meals_Mediterranean")]
    public IActionResult /*IEnumerable<Mediterranean>*/ CreateNewCuisine_Meal_Mediterranean(int Meal_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Meal : _context.Meal;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Meal_id);
      var can_create_by_token = ApiTokenValid || true;
      if (source == null || !can_create_by_token)
        return Unauthorized();
        // throw new Exception("Cannot create item in relation Cuisine_Meals");
      var can_link_by_token = ApiTokenValid || true;
      if (!CanAdd_Meal_Cuisine_Meals(source) || !can_link_by_token)
        return Unauthorized();
        //throw new Exception("Cannot add item to relation Cuisine_Meals");
      var new_target = new Mediterranean() { CreatedDate = DateTime.Now, Id = _context.Cuisine.Max(i => i.Id) + 1 };
      _context.Mediterranean.Add(new_target);
      _context.SaveChanges();
      var link = new Cuisine_Meal() { Id = _context.Cuisine_Meal.Max(l => l.Id) + 1, MealId = source.Id, CuisineId = new_target.Id };
      _context.Cuisine_Meal.Add(link);
      _context.SaveChanges();
      return Ok(new Mediterranean[] { new_target });
    }
[RestrictToUserType(new string[] {"*"})]
    [HttpPost("{Meal_id}/Cuisine_Meals_Grill")]
    public IActionResult /*IEnumerable<Grill>*/ CreateNewCuisine_Meal_Grill(int Meal_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Meal : _context.Meal;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Meal_id);
      var can_create_by_token = ApiTokenValid || true;
      if (source == null || !can_create_by_token)
        return Unauthorized();
        // throw new Exception("Cannot create item in relation Cuisine_Meals");
      var can_link_by_token = ApiTokenValid || true;
      if (!CanAdd_Meal_Cuisine_Meals(source) || !can_link_by_token)
        return Unauthorized();
        //throw new Exception("Cannot add item to relation Cuisine_Meals");
      var new_target = new Grill() { CreatedDate = DateTime.Now, Id = _context.Cuisine.Max(i => i.Id) + 1 };
      _context.Grill.Add(new_target);
      _context.SaveChanges();
      var link = new Cuisine_Meal() { Id = _context.Cuisine_Meal.Max(l => l.Id) + 1, MealId = source.Id, CuisineId = new_target.Id };
      _context.Cuisine_Meal.Add(link);
      _context.SaveChanges();
      return Ok(new Grill[] { new_target });
    }

    [RestrictToUserType(new string[] {"*"})]
    [HttpPost("{Meal_id}/Cuisine_Meals/{Cuisine_id}")]
    public IActionResult LinkWithCuisine_Meal(int Meal_id, int Cuisine_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = _context.Meal;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Meal_id);
      var allowed_targets = _context.Cuisine;
      var target = allowed_targets.FirstOrDefault(s => s.Id == Cuisine_id);
      var can_edit_source_by_token = ApiTokenValid || true;
      var can_edit_target_by_token = ApiTokenValid || true;
      var can_link_by_token = ApiTokenValid || true;
      if (!CanAdd_Meal_Cuisine_Meals(source) || !can_link_by_token || !can_edit_source_by_token || !can_edit_target_by_token)
        return BadRequest();
        // throw new Exception("Cannot add item to relation Cuisine_Meals");
      if (!CanAdd_Cuisine_Cuisine_Meals(target))
        return BadRequest();
        // throw new Exception("Cannot add item to relation Cuisine_Meals");
      var link = new Cuisine_Meal() { Id = _context.Cuisine_Meal.Max(i => i.Id) + 1, MealId = source.Id, CuisineId = target.Id };
      _context.Cuisine_Meal.Add(link);
      _context.SaveChanges();
      return Ok();
    }
    [RestrictToUserType(new string[] {"*"})]
    [HttpDelete("{Meal_id}/Cuisine_Meals/{Cuisine_id}")]
    public IActionResult UnlinkFromCuisine_Meal(int Meal_id, int Cuisine_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = _context.Meal;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Meal_id);
      var allowed_targets = _context.Cuisine;
      var target = allowed_targets.FirstOrDefault(s => s.Id == Cuisine_id);
      var link = _context.Cuisine_Meal.FirstOrDefault(l => l.MealId == source.Id && l.CuisineId == target.Id);

      var can_edit_source_by_token = ApiTokenValid || true;
      var can_edit_target_by_token = ApiTokenValid || true;
      var can_unlink_by_token = ApiTokenValid || true;
      if (!can_unlink_by_token || !can_edit_source_by_token || !can_edit_target_by_token) return Unauthorized(); // throw new Exception("Cannot remove item from relation Cuisine_Meals");
      _context.Cuisine_Meal.Remove(link);
      _context.SaveChanges();
      return Ok();
    }
    [RestrictToUserType(new string[] {"*"})]
    [HttpGet("{Meal_id}/Meal_Recipes")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Page<Recipe> GetMeal_Recipes(int Meal_id, [FromQuery] int page_index, [FromQuery] int page_size = 25 )
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Meal : _context.Meal;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Meal_id);
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
      var items = (from link in _context.Meal_Recipe
              where link.MealId == source.Id
              from target in allowed_targets
              where link.RecipeId == target.Id
              select target).OrderBy(i => i.CreatedDate).AsQueryable();
      
      return items
              .Select(SimpleModelsAndRelations.Models.Recipe.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, can_edit_by_token && editable_targets.Any(et => et.Id == t.Id)))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Recipe.WithoutImages, item => item , null);
    }

    [HttpGet("{Meal_id}/Meal_Recipes/{Recipe_id}")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult /*Recipe*/ GetMeal_RecipeById(int Meal_id, int Recipe_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Meal : _context.Meal;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Meal_id);
      var can_view_by_token = ApiTokenValid || true;
      if (source == null || !can_view_by_token)
        return NotFound();
      var allowed_targets = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var item = (from link in _context.Meal_Recipe
              where link.MealId == source.Id
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
    [HttpGet("{Meal_id}/unlinked/Meal_Recipes")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Page<Recipe> GetUnlinkedMeal_Recipes(int Meal_id, [FromQuery] int page_index, [FromQuery] int page_size = 25)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Meal : _context.Meal;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Meal_id);
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
              where !_context.Meal_Recipe.Any(link => link.MealId == source.Id && link.RecipeId == target.Id) &&
              (from link in _context.Meal_Recipe
                where link.RecipeId == target.Id
                from s in _context.Meal
                where link.MealId == s.Id
                select s).Count() < 1
              select target).OrderBy(i => i.CreatedDate)
              .Select(SimpleModelsAndRelations.Models.Recipe.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, can_edit_by_token && editable_targets.Any(et => et.Id == t.Id)))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Recipe.WithoutImages, item => item);
    }

    bool CanAdd_Meal_Meal_Recipes(Meal source) {
      return true;
    }

    bool CanAdd_Recipe_Meal_Recipes(Recipe target) {
      return (from link in _context.Meal_Recipe
           where link.RecipeId == target.Id
           from source in _context.Meal
           where link.MealId == source.Id
           select source).Count() < 1;
    }

    [RestrictToUserType(new string[] {})]
    [HttpPost("{Meal_id}/Meal_Recipes_Recipe")]
    public IActionResult /*IEnumerable<Recipe>*/ CreateNewMeal_Recipe_Recipe(int Meal_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Meal : _context.Meal;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Meal_id);
      var can_create_by_token = ApiTokenValid || true;
      if (source == null || !can_create_by_token)
        return Unauthorized();
        // throw new Exception("Cannot create item in relation Meal_Recipes");
      var can_link_by_token = ApiTokenValid || true;
      if (!CanAdd_Meal_Meal_Recipes(source) || !can_link_by_token)
        return Unauthorized();
        //throw new Exception("Cannot add item to relation Meal_Recipes");
      var new_target = new Recipe() { CreatedDate = DateTime.Now, Id = _context.Recipe.Max(i => i.Id) + 1 };
      _context.Recipe.Add(new_target);
      _context.SaveChanges();
      var link = new Meal_Recipe() { Id = _context.Meal_Recipe.Max(l => l.Id) + 1, MealId = source.Id, RecipeId = new_target.Id };
      _context.Meal_Recipe.Add(link);
      _context.SaveChanges();
      return Ok(new Recipe[] { new_target });
    }

    [RestrictToUserType(new string[] {"*"})]
    [HttpPost("{Meal_id}/Meal_Recipes/{Recipe_id}")]
    public IActionResult LinkWithMeal_Recipe(int Meal_id, int Recipe_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = _context.Meal;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Meal_id);
      var allowed_targets = _context.Recipe;
      var target = allowed_targets.FirstOrDefault(s => s.Id == Recipe_id);
      var can_edit_source_by_token = ApiTokenValid || true;
      var can_edit_target_by_token = ApiTokenValid || true;
      var can_link_by_token = ApiTokenValid || true;
      if (!CanAdd_Meal_Meal_Recipes(source) || !can_link_by_token || !can_edit_source_by_token || !can_edit_target_by_token)
        return BadRequest();
        // throw new Exception("Cannot add item to relation Meal_Recipes");
      if (!CanAdd_Recipe_Meal_Recipes(target))
        return BadRequest();
        // throw new Exception("Cannot add item to relation Meal_Recipes");
      var link = new Meal_Recipe() { Id = _context.Meal_Recipe.Max(i => i.Id) + 1, MealId = source.Id, RecipeId = target.Id };
      _context.Meal_Recipe.Add(link);
      _context.SaveChanges();
      return Ok();
    }
    [RestrictToUserType(new string[] {"*"})]
    [HttpDelete("{Meal_id}/Meal_Recipes/{Recipe_id}")]
    public IActionResult UnlinkFromMeal_Recipe(int Meal_id, int Recipe_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = _context.Meal;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Meal_id);
      var allowed_targets = _context.Recipe;
      var target = allowed_targets.FirstOrDefault(s => s.Id == Recipe_id);
      var link = _context.Meal_Recipe.FirstOrDefault(l => l.MealId == source.Id && l.RecipeId == target.Id);

      var can_edit_source_by_token = ApiTokenValid || true;
      var can_edit_target_by_token = ApiTokenValid || true;
      var can_unlink_by_token = ApiTokenValid || true;
      if (!can_unlink_by_token || !can_edit_source_by_token || !can_edit_target_by_token) return Unauthorized(); // throw new Exception("Cannot remove item from relation Meal_Recipes");
      _context.Meal_Recipe.Remove(link);
      _context.SaveChanges();
      return Ok();
    }
    [RestrictToUserType(new string[] {"*"})]
    [HttpGet("{id}")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult /*ItemWithEditable<Meal>*/ GetById(int id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_items = ApiTokenValid ? _context.Meal : _context.Meal;
      var editable_items = ApiTokenValid ? _context.Meal : _context.Meal;
      var item_full = allowed_items.FirstOrDefault(e => e.Id == id);
      if (item_full == null) return NotFound();
      var item = SimpleModelsAndRelations.Models.Meal.FilterViewableAttributesLocal(current_User)(item_full);
      item = SimpleModelsAndRelations.Models.Meal.WithoutImages(item);
      return Ok(new ItemWithEditable<Meal>() {
        Item = item,
        Editable = editable_items.Any(e => e.Id == item.Id) });
    }
    

    [RestrictToUserType(new string[] {})]
    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult /*Meal*/ Create()
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var can_create_by_token = ApiTokenValid || true;
      if (!can_create_by_token)
        return Unauthorized();
        // throw new Exception("Unauthorized create attempt");
      var item = new Meal() { CreatedDate = DateTime.Now, Id = _context.Meal.Max(i => i.Id) + 1 };
      _context.Meal.Add(SimpleModelsAndRelations.Models.Meal.FilterViewableAttributesLocal(current_User)(item));
      _context.SaveChanges();
      item = SimpleModelsAndRelations.Models.Meal.WithoutImages(item);
      return Ok(item);
    }

    [RestrictToUserType(new string[] {"*"})]
    [HttpPut]
    [ValidateAntiForgeryToken]
    public IActionResult Update([FromBody] Meal item)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_items = ApiTokenValid ? _context.Meal : _context.Meal;
      if (!allowed_items.Any(i => i.Id == item.Id)) return Unauthorized();
      var new_item = item;
      
      var can_edit_by_token = ApiTokenValid || true;
      if (item == null || !can_edit_by_token)
        return Unauthorized();
        // throw new Exception("Unauthorized edit attempt");
      _context.Update(new_item);
      _context.Entry(new_item).Property(x => x.CreatedDate).IsModified = false;
      _context.SaveChanges();
      return Ok();
    }

    [RestrictToUserType(new string[] {})]
    [HttpDelete("{id}")]
    [ValidateAntiForgeryToken]
    public IActionResult Delete(int id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_items = ApiTokenValid ? _context.Meal : _context.Meal;
      var item = _context.Meal.FirstOrDefault(e => e.Id == id);
      var can_delete_by_token = ApiTokenValid || true;
      if (item == null || !can_delete_by_token)
        return Unauthorized();
        // throw new Exception("Unauthorized delete attempt");
      
      if (!allowed_items.Any(a => a.Id == item.Id)) return Unauthorized(); // throw new Exception("Unauthorized delete attempt");
      
      

      _context.Meal.Remove(item);
      _context.SaveChanges();
      return Ok();
    }


    [RestrictToUserType(new string[] {"*"})]
    [HttpGet]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Page<Meal> GetAll([FromQuery] int page_index, [FromQuery] int page_size = 25 )
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_items = ApiTokenValid ? _context.Meal : _context.Meal;
      var editable_items = ApiTokenValid ? _context.Meal : _context.Meal;
      var can_edit_by_token = ApiTokenValid || true;
      var can_create_by_token = ApiTokenValid || true;
      var can_delete_by_token = ApiTokenValid || true;
      var items = allowed_items.OrderBy(i => i.CreatedDate).AsQueryable();
      
      return items
        .Select(SimpleModelsAndRelations.Models.Meal.FilterViewableAttributes(current_User))
        .Select(s => Tuple.Create(s, can_edit_by_token && editable_items.Any(es => es.Id == s.Id)))
        .Paginate(can_create_by_token, can_delete_by_token, false, page_index, page_size, SimpleModelsAndRelations.Models.Meal.WithoutImages, item => item , null );
    }

    


    
  }

  