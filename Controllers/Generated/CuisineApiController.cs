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


  [Route("api/v1/Cuisine")]
  public class CuisineApiController : Controller
  {
    private readonly MailOptions _mailOptions;
    public readonly SimpleModelsAndRelationsContext _context;
    private IHostingEnvironment env;

    public CuisineApiController(SimpleModelsAndRelationsContext context, IHostingEnvironment env, IOptions<MailOptions> mailOptionsAccessor)
    {
      _context = context;
      _mailOptions = mailOptionsAccessor.Value;
      this.env = env;
    }

    public bool ApiTokenValid => RestrictToUserTypeAttribute.ApiToken != null &&
        HttpContext.Request.Headers["ApiToken"] == RestrictToUserTypeAttribute.ApiToken;

    
    [RestrictToUserType(new string[] {"*"})]
    [HttpGet("{Cuisine_id}/Cuisine_Meals")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Page<Meal> GetCuisine_Meals(int Cuisine_id, [FromQuery] int page_index, [FromQuery] int page_size = 25 )
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Cuisine : _context.Cuisine;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Cuisine_id);
      var can_create_by_token = ApiTokenValid || true;
      var can_delete_by_token = ApiTokenValid || true || true;
      var can_link_by_token = ApiTokenValid || true;
      var can_view_by_token = ApiTokenValid || true;
      if (source == null || !can_view_by_token) // test
        return Enumerable.Empty<SimpleModelsAndRelations.Models.Meal>() // B
              .AsQueryable()
              .Select(SimpleModelsAndRelations.Models.Meal.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, false))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Meal.WithoutImages, item => item , null);
      var allowed_targets = ApiTokenValid ? _context.Meal : _context.Meal;
      var editable_targets = ApiTokenValid ? _context.Meal : (_context.Meal);
      var can_edit_by_token = ApiTokenValid || true;
      var items = (from link in _context.Cuisine_Meal
              where link.CuisineId == source.Id
              from target in allowed_targets
              where link.MealId == target.Id
              select target).OrderBy(i => i.CreatedDate).AsQueryable();
      
      return items
              .Select(SimpleModelsAndRelations.Models.Meal.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, can_edit_by_token && editable_targets.Any(et => et.Id == t.Id)))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Meal.WithoutImages, item => item , null);
    }

    [HttpGet("{Cuisine_id}/Cuisine_Meals/{Meal_id}")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult /*Meal*/ GetCuisine_MealById(int Cuisine_id, int Meal_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Cuisine : _context.Cuisine;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Cuisine_id);
      var can_view_by_token = ApiTokenValid || true;
      if (source == null || !can_view_by_token)
        return NotFound();
      var allowed_targets = ApiTokenValid ? _context.Meal : _context.Meal;
      var item = (from link in _context.Cuisine_Meal
              where link.CuisineId == source.Id
              from target in allowed_targets
              where link.MealId == target.Id
              select target).OrderBy(i => i.CreatedDate)
              .Select(SimpleModelsAndRelations.Models.Meal.FilterViewableAttributes(current_User))
              .FirstOrDefault(t => t.Id == Meal_id);
      if (item == null) return NotFound();
      item = SimpleModelsAndRelations.Models.Meal.WithoutImages(item);
      return Ok(item);
    }

    [RestrictToUserType(new string[] {"*"})]
    [HttpGet("{Cuisine_id}/unlinked/Cuisine_Meals")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Page<Meal> GetUnlinkedCuisine_Meals(int Cuisine_id, [FromQuery] int page_index, [FromQuery] int page_size = 25)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Cuisine : _context.Cuisine;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Cuisine_id);
      var can_create_by_token = ApiTokenValid || true;
      var can_delete_by_token = ApiTokenValid || true || true;
      var can_link_by_token = ApiTokenValid || true;
      var can_view_by_token = ApiTokenValid || true;
      if (source == null || !can_view_by_token)
        return Enumerable.Empty<SimpleModelsAndRelations.Models.Meal>()
              .AsQueryable()
              .Select(SimpleModelsAndRelations.Models.Meal.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, false))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Meal.WithoutImages, item => item);
      var allowed_targets = ApiTokenValid ? _context.Meal : _context.Meal;
      var editable_targets = ApiTokenValid ? _context.Meal : (_context.Meal);
      var can_edit_by_token = ApiTokenValid || true;
      return (from target in allowed_targets
              where !_context.Cuisine_Meal.Any(link => link.CuisineId == source.Id && link.MealId == target.Id) &&
              (from link in _context.Cuisine_Meal
                where link.MealId == target.Id
                from s in _context.Cuisine
                where link.CuisineId == s.Id
                select s).Count() < 1
              select target).OrderBy(i => i.CreatedDate)
              .Select(SimpleModelsAndRelations.Models.Meal.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, can_edit_by_token && editable_targets.Any(et => et.Id == t.Id)))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Meal.WithoutImages, item => item);
    }
    [RestrictToUserType(new string[] {"*"})]
    [HttpGet("{Cuisine_id}/unlinked/Cuisine_Meals/Lunch")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Page<Lunch> GetUnlinkedCuisine_Meals_Lunch(int Cuisine_id, [FromQuery] int page_index, [FromQuery] int page_size = 25)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Cuisine : _context.Cuisine;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Cuisine_id);
      var can_create_by_token = ApiTokenValid || true;
      var can_delete_by_token = ApiTokenValid || true || true;
      var can_link_by_token = ApiTokenValid || true;
      var can_view_by_token = ApiTokenValid || true;
      if (source == null || !can_view_by_token) // test
        return Enumerable.Empty<SimpleModelsAndRelations.Models.Lunch>() // A
              .AsQueryable()
              .Select(SimpleModelsAndRelations.Models.Lunch.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, false))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Lunch.WithoutImages, item => item);
      var allowed_targets = ApiTokenValid ? _context.Lunch : _context.Lunch;
      var editable_targets = ApiTokenValid ? _context.Meal : (_context.Meal);
      var can_edit_by_token = ApiTokenValid || true;
      return (from target in allowed_targets
              where !_context.Cuisine_Meal.Any(link => link.CuisineId == source.Id && link.MealId == target.Id) &&
              (from link in _context.Cuisine_Meal
                where link.MealId == target.Id
                from s in _context.Cuisine
                where link.CuisineId == s.Id
                select s).Count() < 1
              select target).OrderBy(i => i.CreatedDate)
              .Select(SimpleModelsAndRelations.Models.Lunch.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, can_edit_by_token && editable_targets.Any(et => et.Id == t.Id)))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Lunch.WithoutImages, item => item);
    }


    [RestrictToUserType(new string[] {"*"})]
    [HttpGet("{Cuisine_id}/unlinked/Cuisine_Meals/Brunch")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Page<Brunch> GetUnlinkedCuisine_Meals_Brunch(int Cuisine_id, [FromQuery] int page_index, [FromQuery] int page_size = 25)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Cuisine : _context.Cuisine;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Cuisine_id);
      var can_create_by_token = ApiTokenValid || true;
      var can_delete_by_token = ApiTokenValid || true || true;
      var can_link_by_token = ApiTokenValid || true;
      var can_view_by_token = ApiTokenValid || true;
      if (source == null || !can_view_by_token) // test
        return Enumerable.Empty<SimpleModelsAndRelations.Models.Brunch>() // A
              .AsQueryable()
              .Select(SimpleModelsAndRelations.Models.Brunch.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, false))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Brunch.WithoutImages, item => item);
      var allowed_targets = ApiTokenValid ? _context.Brunch : _context.Brunch;
      var editable_targets = ApiTokenValid ? _context.Meal : (_context.Meal);
      var can_edit_by_token = ApiTokenValid || true;
      return (from target in allowed_targets
              where !_context.Cuisine_Meal.Any(link => link.CuisineId == source.Id && link.MealId == target.Id) &&
              (from link in _context.Cuisine_Meal
                where link.MealId == target.Id
                from s in _context.Cuisine
                where link.CuisineId == s.Id
                select s).Count() < 1
              select target).OrderBy(i => i.CreatedDate)
              .Select(SimpleModelsAndRelations.Models.Brunch.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, can_edit_by_token && editable_targets.Any(et => et.Id == t.Id)))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Brunch.WithoutImages, item => item);
    }


    [RestrictToUserType(new string[] {"*"})]
    [HttpGet("{Cuisine_id}/unlinked/Cuisine_Meals/Dinner")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Page<Dinner> GetUnlinkedCuisine_Meals_Dinner(int Cuisine_id, [FromQuery] int page_index, [FromQuery] int page_size = 25)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Cuisine : _context.Cuisine;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Cuisine_id);
      var can_create_by_token = ApiTokenValid || true;
      var can_delete_by_token = ApiTokenValid || true || true;
      var can_link_by_token = ApiTokenValid || true;
      var can_view_by_token = ApiTokenValid || true;
      if (source == null || !can_view_by_token) // test
        return Enumerable.Empty<SimpleModelsAndRelations.Models.Dinner>() // A
              .AsQueryable()
              .Select(SimpleModelsAndRelations.Models.Dinner.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, false))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Dinner.WithoutImages, item => item);
      var allowed_targets = ApiTokenValid ? _context.Dinner : _context.Dinner;
      var editable_targets = ApiTokenValid ? _context.Meal : (_context.Meal);
      var can_edit_by_token = ApiTokenValid || true;
      return (from target in allowed_targets
              where !_context.Cuisine_Meal.Any(link => link.CuisineId == source.Id && link.MealId == target.Id) &&
              (from link in _context.Cuisine_Meal
                where link.MealId == target.Id
                from s in _context.Cuisine
                where link.CuisineId == s.Id
                select s).Count() < 1
              select target).OrderBy(i => i.CreatedDate)
              .Select(SimpleModelsAndRelations.Models.Dinner.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, can_edit_by_token && editable_targets.Any(et => et.Id == t.Id)))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Dinner.WithoutImages, item => item);
    }


    [RestrictToUserType(new string[] {"*"})]
    [HttpGet("{Cuisine_id}/unlinked/Cuisine_Meals/Breakfast")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Page<Breakfast> GetUnlinkedCuisine_Meals_Breakfast(int Cuisine_id, [FromQuery] int page_index, [FromQuery] int page_size = 25)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Cuisine : _context.Cuisine;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Cuisine_id);
      var can_create_by_token = ApiTokenValid || true;
      var can_delete_by_token = ApiTokenValid || true || true;
      var can_link_by_token = ApiTokenValid || true;
      var can_view_by_token = ApiTokenValid || true;
      if (source == null || !can_view_by_token) // test
        return Enumerable.Empty<SimpleModelsAndRelations.Models.Breakfast>() // A
              .AsQueryable()
              .Select(SimpleModelsAndRelations.Models.Breakfast.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, false))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Breakfast.WithoutImages, item => item);
      var allowed_targets = ApiTokenValid ? _context.Breakfast : _context.Breakfast;
      var editable_targets = ApiTokenValid ? _context.Meal : (_context.Meal);
      var can_edit_by_token = ApiTokenValid || true;
      return (from target in allowed_targets
              where !_context.Cuisine_Meal.Any(link => link.CuisineId == source.Id && link.MealId == target.Id) &&
              (from link in _context.Cuisine_Meal
                where link.MealId == target.Id
                from s in _context.Cuisine
                where link.CuisineId == s.Id
                select s).Count() < 1
              select target).OrderBy(i => i.CreatedDate)
              .Select(SimpleModelsAndRelations.Models.Breakfast.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, can_edit_by_token && editable_targets.Any(et => et.Id == t.Id)))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Breakfast.WithoutImages, item => item);
    }


    bool CanAdd_Cuisine_Cuisine_Meals(Cuisine source) {
      return true;
    }

    bool CanAdd_Meal_Cuisine_Meals(Meal target) {
      return (from link in _context.Cuisine_Meal
           where link.MealId == target.Id
           from source in _context.Cuisine
           where link.CuisineId == source.Id
           select source).Count() < 1;
    }

    [RestrictToUserType(new string[] {})]
    [HttpPost("{Cuisine_id}/Cuisine_Meals_Lunch")]
    public IActionResult /*IEnumerable<Lunch>*/ CreateNewCuisine_Meal_Lunch(int Cuisine_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Cuisine : _context.Cuisine;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Cuisine_id);
      var can_create_by_token = ApiTokenValid || true;
      if (source == null || !can_create_by_token)
        return Unauthorized();
        // throw new Exception("Cannot create item in relation Cuisine_Meals");
      var can_link_by_token = ApiTokenValid || true;
      if (!CanAdd_Cuisine_Cuisine_Meals(source) || !can_link_by_token)
        return Unauthorized();
        //throw new Exception("Cannot add item to relation Cuisine_Meals");
      var new_target = new Lunch() { CreatedDate = DateTime.Now, Id = _context.Meal.Max(i => i.Id) + 1 };
      _context.Lunch.Add(new_target);
      _context.SaveChanges();
      var link = new Cuisine_Meal() { Id = _context.Cuisine_Meal.Max(l => l.Id) + 1, CuisineId = source.Id, MealId = new_target.Id };
      _context.Cuisine_Meal.Add(link);
      _context.SaveChanges();
      return Ok(new Lunch[] { new_target });
    }
[RestrictToUserType(new string[] {})]
    [HttpPost("{Cuisine_id}/Cuisine_Meals_Brunch")]
    public IActionResult /*IEnumerable<Brunch>*/ CreateNewCuisine_Meal_Brunch(int Cuisine_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Cuisine : _context.Cuisine;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Cuisine_id);
      var can_create_by_token = ApiTokenValid || true;
      if (source == null || !can_create_by_token)
        return Unauthorized();
        // throw new Exception("Cannot create item in relation Cuisine_Meals");
      var can_link_by_token = ApiTokenValid || true;
      if (!CanAdd_Cuisine_Cuisine_Meals(source) || !can_link_by_token)
        return Unauthorized();
        //throw new Exception("Cannot add item to relation Cuisine_Meals");
      var new_target = new Brunch() { CreatedDate = DateTime.Now, Id = _context.Meal.Max(i => i.Id) + 1 };
      _context.Brunch.Add(new_target);
      _context.SaveChanges();
      var link = new Cuisine_Meal() { Id = _context.Cuisine_Meal.Max(l => l.Id) + 1, CuisineId = source.Id, MealId = new_target.Id };
      _context.Cuisine_Meal.Add(link);
      _context.SaveChanges();
      return Ok(new Brunch[] { new_target });
    }
[RestrictToUserType(new string[] {})]
    [HttpPost("{Cuisine_id}/Cuisine_Meals_Dinner")]
    public IActionResult /*IEnumerable<Dinner>*/ CreateNewCuisine_Meal_Dinner(int Cuisine_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Cuisine : _context.Cuisine;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Cuisine_id);
      var can_create_by_token = ApiTokenValid || true;
      if (source == null || !can_create_by_token)
        return Unauthorized();
        // throw new Exception("Cannot create item in relation Cuisine_Meals");
      var can_link_by_token = ApiTokenValid || true;
      if (!CanAdd_Cuisine_Cuisine_Meals(source) || !can_link_by_token)
        return Unauthorized();
        //throw new Exception("Cannot add item to relation Cuisine_Meals");
      var new_target = new Dinner() { CreatedDate = DateTime.Now, Id = _context.Meal.Max(i => i.Id) + 1 };
      _context.Dinner.Add(new_target);
      _context.SaveChanges();
      var link = new Cuisine_Meal() { Id = _context.Cuisine_Meal.Max(l => l.Id) + 1, CuisineId = source.Id, MealId = new_target.Id };
      _context.Cuisine_Meal.Add(link);
      _context.SaveChanges();
      return Ok(new Dinner[] { new_target });
    }
[RestrictToUserType(new string[] {})]
    [HttpPost("{Cuisine_id}/Cuisine_Meals_Breakfast")]
    public IActionResult /*IEnumerable<Breakfast>*/ CreateNewCuisine_Meal_Breakfast(int Cuisine_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Cuisine : _context.Cuisine;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Cuisine_id);
      var can_create_by_token = ApiTokenValid || true;
      if (source == null || !can_create_by_token)
        return Unauthorized();
        // throw new Exception("Cannot create item in relation Cuisine_Meals");
      var can_link_by_token = ApiTokenValid || true;
      if (!CanAdd_Cuisine_Cuisine_Meals(source) || !can_link_by_token)
        return Unauthorized();
        //throw new Exception("Cannot add item to relation Cuisine_Meals");
      var new_target = new Breakfast() { CreatedDate = DateTime.Now, Id = _context.Meal.Max(i => i.Id) + 1 };
      _context.Breakfast.Add(new_target);
      _context.SaveChanges();
      var link = new Cuisine_Meal() { Id = _context.Cuisine_Meal.Max(l => l.Id) + 1, CuisineId = source.Id, MealId = new_target.Id };
      _context.Cuisine_Meal.Add(link);
      _context.SaveChanges();
      return Ok(new Breakfast[] { new_target });
    }

    [RestrictToUserType(new string[] {"*"})]
    [HttpPost("{Cuisine_id}/Cuisine_Meals/{Meal_id}")]
    public IActionResult LinkWithCuisine_Meal(int Cuisine_id, int Meal_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = _context.Cuisine;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Cuisine_id);
      var allowed_targets = _context.Meal;
      var target = allowed_targets.FirstOrDefault(s => s.Id == Meal_id);
      var can_edit_source_by_token = ApiTokenValid || true;
      var can_edit_target_by_token = ApiTokenValid || true;
      var can_link_by_token = ApiTokenValid || true;
      if (!CanAdd_Cuisine_Cuisine_Meals(source) || !can_link_by_token || !can_edit_source_by_token || !can_edit_target_by_token)
        return BadRequest();
        // throw new Exception("Cannot add item to relation Cuisine_Meals");
      if (!CanAdd_Meal_Cuisine_Meals(target))
        return BadRequest();
        // throw new Exception("Cannot add item to relation Cuisine_Meals");
      var link = new Cuisine_Meal() { Id = _context.Cuisine_Meal.Max(i => i.Id) + 1, CuisineId = source.Id, MealId = target.Id };
      _context.Cuisine_Meal.Add(link);
      _context.SaveChanges();
      return Ok();
    }
    [RestrictToUserType(new string[] {"*"})]
    [HttpDelete("{Cuisine_id}/Cuisine_Meals/{Meal_id}")]
    public IActionResult UnlinkFromCuisine_Meal(int Cuisine_id, int Meal_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = _context.Cuisine;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Cuisine_id);
      var allowed_targets = _context.Meal;
      var target = allowed_targets.FirstOrDefault(s => s.Id == Meal_id);
      var link = _context.Cuisine_Meal.FirstOrDefault(l => l.CuisineId == source.Id && l.MealId == target.Id);

      var can_edit_source_by_token = ApiTokenValid || true;
      var can_edit_target_by_token = ApiTokenValid || true;
      var can_unlink_by_token = ApiTokenValid || true;
      if (!can_unlink_by_token || !can_edit_source_by_token || !can_edit_target_by_token) return Unauthorized(); // throw new Exception("Cannot remove item from relation Cuisine_Meals");
      _context.Cuisine_Meal.Remove(link);
      _context.SaveChanges();
      return Ok();
    }
    [RestrictToUserType(new string[] {"*"})]
    [HttpGet("{Cuisine_id}/Cuisine_Recipes")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Page<Recipe> GetCuisine_Recipes(int Cuisine_id, [FromQuery] int page_index, [FromQuery] int page_size = 25 )
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Cuisine : _context.Cuisine;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Cuisine_id);
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
      var items = (from link in _context.Cuisine_Recipe
              where link.CuisineId == source.Id
              from target in allowed_targets
              where link.RecipeId == target.Id
              select target).OrderBy(i => i.CreatedDate).AsQueryable();
      
      return items
              .Select(SimpleModelsAndRelations.Models.Recipe.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, can_edit_by_token && editable_targets.Any(et => et.Id == t.Id)))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Recipe.WithoutImages, item => item , null);
    }

    [HttpGet("{Cuisine_id}/Cuisine_Recipes/{Recipe_id}")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult /*Recipe*/ GetCuisine_RecipeById(int Cuisine_id, int Recipe_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Cuisine : _context.Cuisine;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Cuisine_id);
      var can_view_by_token = ApiTokenValid || true;
      if (source == null || !can_view_by_token)
        return NotFound();
      var allowed_targets = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var item = (from link in _context.Cuisine_Recipe
              where link.CuisineId == source.Id
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
    [HttpGet("{Cuisine_id}/unlinked/Cuisine_Recipes")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Page<Recipe> GetUnlinkedCuisine_Recipes(int Cuisine_id, [FromQuery] int page_index, [FromQuery] int page_size = 25)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Cuisine : _context.Cuisine;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Cuisine_id);
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
              where !_context.Cuisine_Recipe.Any(link => link.CuisineId == source.Id && link.RecipeId == target.Id) &&
              (from link in _context.Cuisine_Recipe
                where link.RecipeId == target.Id
                from s in _context.Cuisine
                where link.CuisineId == s.Id
                select s).Count() < 1
              select target).OrderBy(i => i.CreatedDate)
              .Select(SimpleModelsAndRelations.Models.Recipe.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, can_edit_by_token && editable_targets.Any(et => et.Id == t.Id)))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Recipe.WithoutImages, item => item);
    }

    bool CanAdd_Cuisine_Cuisine_Recipes(Cuisine source) {
      return true;
    }

    bool CanAdd_Recipe_Cuisine_Recipes(Recipe target) {
      return (from link in _context.Cuisine_Recipe
           where link.RecipeId == target.Id
           from source in _context.Cuisine
           where link.CuisineId == source.Id
           select source).Count() < 1;
    }

    [RestrictToUserType(new string[] {})]
    [HttpPost("{Cuisine_id}/Cuisine_Recipes_Recipe")]
    public IActionResult /*IEnumerable<Recipe>*/ CreateNewCuisine_Recipe_Recipe(int Cuisine_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Cuisine : _context.Cuisine;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Cuisine_id);
      var can_create_by_token = ApiTokenValid || true;
      if (source == null || !can_create_by_token)
        return Unauthorized();
        // throw new Exception("Cannot create item in relation Cuisine_Recipes");
      var can_link_by_token = ApiTokenValid || true;
      if (!CanAdd_Cuisine_Cuisine_Recipes(source) || !can_link_by_token)
        return Unauthorized();
        //throw new Exception("Cannot add item to relation Cuisine_Recipes");
      var new_target = new Recipe() { CreatedDate = DateTime.Now, Id = _context.Recipe.Max(i => i.Id) + 1 };
      _context.Recipe.Add(new_target);
      _context.SaveChanges();
      var link = new Cuisine_Recipe() { Id = _context.Cuisine_Recipe.Max(l => l.Id) + 1, CuisineId = source.Id, RecipeId = new_target.Id };
      _context.Cuisine_Recipe.Add(link);
      _context.SaveChanges();
      return Ok(new Recipe[] { new_target });
    }

    [RestrictToUserType(new string[] {"*"})]
    [HttpPost("{Cuisine_id}/Cuisine_Recipes/{Recipe_id}")]
    public IActionResult LinkWithCuisine_Recipe(int Cuisine_id, int Recipe_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = _context.Cuisine;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Cuisine_id);
      var allowed_targets = _context.Recipe;
      var target = allowed_targets.FirstOrDefault(s => s.Id == Recipe_id);
      var can_edit_source_by_token = ApiTokenValid || true;
      var can_edit_target_by_token = ApiTokenValid || true;
      var can_link_by_token = ApiTokenValid || true;
      if (!CanAdd_Cuisine_Cuisine_Recipes(source) || !can_link_by_token || !can_edit_source_by_token || !can_edit_target_by_token)
        return BadRequest();
        // throw new Exception("Cannot add item to relation Cuisine_Recipes");
      if (!CanAdd_Recipe_Cuisine_Recipes(target))
        return BadRequest();
        // throw new Exception("Cannot add item to relation Cuisine_Recipes");
      var link = new Cuisine_Recipe() { Id = _context.Cuisine_Recipe.Max(i => i.Id) + 1, CuisineId = source.Id, RecipeId = target.Id };
      _context.Cuisine_Recipe.Add(link);
      _context.SaveChanges();
      return Ok();
    }
    [RestrictToUserType(new string[] {"*"})]
    [HttpDelete("{Cuisine_id}/Cuisine_Recipes/{Recipe_id}")]
    public IActionResult UnlinkFromCuisine_Recipe(int Cuisine_id, int Recipe_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = _context.Cuisine;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Cuisine_id);
      var allowed_targets = _context.Recipe;
      var target = allowed_targets.FirstOrDefault(s => s.Id == Recipe_id);
      var link = _context.Cuisine_Recipe.FirstOrDefault(l => l.CuisineId == source.Id && l.RecipeId == target.Id);

      var can_edit_source_by_token = ApiTokenValid || true;
      var can_edit_target_by_token = ApiTokenValid || true;
      var can_unlink_by_token = ApiTokenValid || true;
      if (!can_unlink_by_token || !can_edit_source_by_token || !can_edit_target_by_token) return Unauthorized(); // throw new Exception("Cannot remove item from relation Cuisine_Recipes");
      _context.Cuisine_Recipe.Remove(link);
      _context.SaveChanges();
      return Ok();
    }
    [RestrictToUserType(new string[] {"*"})]
    [HttpGet("{id}")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult /*ItemWithEditable<Cuisine>*/ GetById(int id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_items = ApiTokenValid ? _context.Cuisine : _context.Cuisine;
      var editable_items = ApiTokenValid ? _context.Cuisine : _context.Cuisine;
      var item_full = allowed_items.FirstOrDefault(e => e.Id == id);
      if (item_full == null) return NotFound();
      var item = SimpleModelsAndRelations.Models.Cuisine.FilterViewableAttributesLocal(current_User)(item_full);
      item = SimpleModelsAndRelations.Models.Cuisine.WithoutImages(item);
      return Ok(new ItemWithEditable<Cuisine>() {
        Item = item,
        Editable = editable_items.Any(e => e.Id == item.Id) });
    }
    

    [RestrictToUserType(new string[] {"*"})]
    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult /*Cuisine*/ Create()
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var can_create_by_token = ApiTokenValid || true;
      if (!can_create_by_token)
        return Unauthorized();
        // throw new Exception("Unauthorized create attempt");
      var item = new Cuisine() { CreatedDate = DateTime.Now, Id = _context.Cuisine.Max(i => i.Id) + 1 };
      _context.Cuisine.Add(SimpleModelsAndRelations.Models.Cuisine.FilterViewableAttributesLocal(current_User)(item));
      _context.SaveChanges();
      item = SimpleModelsAndRelations.Models.Cuisine.WithoutImages(item);
      return Ok(item);
    }

    [RestrictToUserType(new string[] {"*"})]
    [HttpPut]
    [ValidateAntiForgeryToken]
    public IActionResult Update([FromBody] Cuisine item)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_items = ApiTokenValid ? _context.Cuisine : _context.Cuisine;
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

    [RestrictToUserType(new string[] {"*"})]
    [HttpDelete("{id}")]
    [ValidateAntiForgeryToken]
    public IActionResult Delete(int id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_items = ApiTokenValid ? _context.Cuisine : _context.Cuisine;
      var item = _context.Cuisine.FirstOrDefault(e => e.Id == id);
      var can_delete_by_token = ApiTokenValid || true;
      if (item == null || !can_delete_by_token)
        return Unauthorized();
        // throw new Exception("Unauthorized delete attempt");
      
      if (!allowed_items.Any(a => a.Id == item.Id)) return Unauthorized(); // throw new Exception("Unauthorized delete attempt");
      
      

      _context.Cuisine.Remove(item);
      _context.SaveChanges();
      return Ok();
    }


    [RestrictToUserType(new string[] {"*"})]
    [HttpGet]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Page<Cuisine> GetAll([FromQuery] int page_index, [FromQuery] int page_size = 25 )
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_items = ApiTokenValid ? _context.Cuisine : _context.Cuisine;
      var editable_items = ApiTokenValid ? _context.Cuisine : _context.Cuisine;
      var can_edit_by_token = ApiTokenValid || true;
      var can_create_by_token = ApiTokenValid || true;
      var can_delete_by_token = ApiTokenValid || true;
      var items = allowed_items.OrderBy(i => i.CreatedDate).AsQueryable();
      
      return items
        .Select(SimpleModelsAndRelations.Models.Cuisine.FilterViewableAttributes(current_User))
        .Select(s => Tuple.Create(s, can_edit_by_token && editable_items.Any(es => es.Id == s.Id)))
        .Paginate(can_create_by_token, can_delete_by_token, false, page_index, page_size, SimpleModelsAndRelations.Models.Cuisine.WithoutImages, item => item , null );
    }

    


    
  }

  