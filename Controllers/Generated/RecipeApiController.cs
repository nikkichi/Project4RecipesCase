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


  [Route("api/v1/Recipe")]
  public class RecipeApiController : Controller
  {
    private readonly MailOptions _mailOptions;
    public readonly SimpleModelsAndRelationsContext _context;
    private IHostingEnvironment env;

    public RecipeApiController(SimpleModelsAndRelationsContext context, IHostingEnvironment env, IOptions<MailOptions> mailOptionsAccessor)
    {
      _context = context;
      _mailOptions = mailOptionsAccessor.Value;
      this.env = env;
    }

    public bool ApiTokenValid => RestrictToUserTypeAttribute.ApiToken != null &&
        HttpContext.Request.Headers["ApiToken"] == RestrictToUserTypeAttribute.ApiToken;

    
    [RestrictToUserType(new string[] {"*"})]
    [HttpGet("{Recipe_id}/Meal_Recipes")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Page<Meal> GetMeal_Recipes(int Recipe_id, [FromQuery] int page_index, [FromQuery] int page_size = 25 )
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
        return Enumerable.Empty<SimpleModelsAndRelations.Models.Meal>() // B
              .AsQueryable()
              .Select(SimpleModelsAndRelations.Models.Meal.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, false))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Meal.WithoutImages, item => item , null);
      var allowed_targets = ApiTokenValid ? _context.Meal : _context.Meal;
      var editable_targets = ApiTokenValid ? _context.Meal : (_context.Meal);
      var can_edit_by_token = ApiTokenValid || true;
      var items = (from link in _context.Meal_Recipe
              where link.RecipeId == source.Id
              from target in allowed_targets
              where link.MealId == target.Id
              select target).OrderBy(i => i.CreatedDate).AsQueryable();
      
      return items
              .Select(SimpleModelsAndRelations.Models.Meal.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, can_edit_by_token && editable_targets.Any(et => et.Id == t.Id)))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Meal.WithoutImages, item => item , null);
    }

    [HttpGet("{Recipe_id}/Meal_Recipes/{Meal_id}")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult /*Meal*/ GetMeal_RecipeById(int Recipe_id, int Meal_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var can_view_by_token = ApiTokenValid || true;
      if (source == null || !can_view_by_token)
        return NotFound();
      var allowed_targets = ApiTokenValid ? _context.Meal : _context.Meal;
      var item = (from link in _context.Meal_Recipe
              where link.RecipeId == source.Id
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
    [HttpGet("{Recipe_id}/unlinked/Meal_Recipes")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Page<Meal> GetUnlinkedMeal_Recipes(int Recipe_id, [FromQuery] int page_index, [FromQuery] int page_size = 25)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
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
              where !_context.Meal_Recipe.Any(link => link.RecipeId == source.Id && link.MealId == target.Id) &&
              true
              select target).OrderBy(i => i.CreatedDate)
              .Select(SimpleModelsAndRelations.Models.Meal.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, can_edit_by_token && editable_targets.Any(et => et.Id == t.Id)))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Meal.WithoutImages, item => item);
    }
    [RestrictToUserType(new string[] {"*"})]
    [HttpGet("{Recipe_id}/unlinked/Meal_Recipes/Lunch")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Page<Lunch> GetUnlinkedMeal_Recipes_Lunch(int Recipe_id, [FromQuery] int page_index, [FromQuery] int page_size = 25)
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
        return Enumerable.Empty<SimpleModelsAndRelations.Models.Lunch>() // A
              .AsQueryable()
              .Select(SimpleModelsAndRelations.Models.Lunch.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, false))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Lunch.WithoutImages, item => item);
      var allowed_targets = ApiTokenValid ? _context.Lunch : _context.Lunch;
      var editable_targets = ApiTokenValid ? _context.Meal : (_context.Meal);
      var can_edit_by_token = ApiTokenValid || true;
      return (from target in allowed_targets
              where !_context.Meal_Recipe.Any(link => link.RecipeId == source.Id && link.MealId == target.Id) &&
              true
              select target).OrderBy(i => i.CreatedDate)
              .Select(SimpleModelsAndRelations.Models.Lunch.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, can_edit_by_token && editable_targets.Any(et => et.Id == t.Id)))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Lunch.WithoutImages, item => item);
    }


    [RestrictToUserType(new string[] {"*"})]
    [HttpGet("{Recipe_id}/unlinked/Meal_Recipes/Brunch")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Page<Brunch> GetUnlinkedMeal_Recipes_Brunch(int Recipe_id, [FromQuery] int page_index, [FromQuery] int page_size = 25)
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
        return Enumerable.Empty<SimpleModelsAndRelations.Models.Brunch>() // A
              .AsQueryable()
              .Select(SimpleModelsAndRelations.Models.Brunch.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, false))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Brunch.WithoutImages, item => item);
      var allowed_targets = ApiTokenValid ? _context.Brunch : _context.Brunch;
      var editable_targets = ApiTokenValid ? _context.Meal : (_context.Meal);
      var can_edit_by_token = ApiTokenValid || true;
      return (from target in allowed_targets
              where !_context.Meal_Recipe.Any(link => link.RecipeId == source.Id && link.MealId == target.Id) &&
              true
              select target).OrderBy(i => i.CreatedDate)
              .Select(SimpleModelsAndRelations.Models.Brunch.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, can_edit_by_token && editable_targets.Any(et => et.Id == t.Id)))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Brunch.WithoutImages, item => item);
    }


    [RestrictToUserType(new string[] {"*"})]
    [HttpGet("{Recipe_id}/unlinked/Meal_Recipes/Dinner")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Page<Dinner> GetUnlinkedMeal_Recipes_Dinner(int Recipe_id, [FromQuery] int page_index, [FromQuery] int page_size = 25)
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
        return Enumerable.Empty<SimpleModelsAndRelations.Models.Dinner>() // A
              .AsQueryable()
              .Select(SimpleModelsAndRelations.Models.Dinner.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, false))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Dinner.WithoutImages, item => item);
      var allowed_targets = ApiTokenValid ? _context.Dinner : _context.Dinner;
      var editable_targets = ApiTokenValid ? _context.Meal : (_context.Meal);
      var can_edit_by_token = ApiTokenValid || true;
      return (from target in allowed_targets
              where !_context.Meal_Recipe.Any(link => link.RecipeId == source.Id && link.MealId == target.Id) &&
              true
              select target).OrderBy(i => i.CreatedDate)
              .Select(SimpleModelsAndRelations.Models.Dinner.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, can_edit_by_token && editable_targets.Any(et => et.Id == t.Id)))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Dinner.WithoutImages, item => item);
    }


    [RestrictToUserType(new string[] {"*"})]
    [HttpGet("{Recipe_id}/unlinked/Meal_Recipes/Breakfast")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Page<Breakfast> GetUnlinkedMeal_Recipes_Breakfast(int Recipe_id, [FromQuery] int page_index, [FromQuery] int page_size = 25)
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
        return Enumerable.Empty<SimpleModelsAndRelations.Models.Breakfast>() // A
              .AsQueryable()
              .Select(SimpleModelsAndRelations.Models.Breakfast.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, false))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Breakfast.WithoutImages, item => item);
      var allowed_targets = ApiTokenValid ? _context.Breakfast : _context.Breakfast;
      var editable_targets = ApiTokenValid ? _context.Meal : (_context.Meal);
      var can_edit_by_token = ApiTokenValid || true;
      return (from target in allowed_targets
              where !_context.Meal_Recipe.Any(link => link.RecipeId == source.Id && link.MealId == target.Id) &&
              true
              select target).OrderBy(i => i.CreatedDate)
              .Select(SimpleModelsAndRelations.Models.Breakfast.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, can_edit_by_token && editable_targets.Any(et => et.Id == t.Id)))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Breakfast.WithoutImages, item => item);
    }


    bool CanAdd_Recipe_Meal_Recipes(Recipe source) {
      return (from link in _context.Meal_Recipe
           where link.RecipeId == source.Id
           from target in _context.Meal
           where link.MealId == target.Id
           select target).Count() < 1;
    }

    bool CanAdd_Meal_Meal_Recipes(Meal target) {
      return true;
    }

    [RestrictToUserType(new string[] {})]
    [HttpPost("{Recipe_id}/Meal_Recipes_Lunch")]
    public IActionResult /*IEnumerable<Lunch>*/ CreateNewMeal_Recipe_Lunch(int Recipe_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var can_create_by_token = ApiTokenValid || true;
      if (source == null || !can_create_by_token)
        return Unauthorized();
        // throw new Exception("Cannot create item in relation Meal_Recipes");
      var can_link_by_token = ApiTokenValid || true;
      if (!CanAdd_Recipe_Meal_Recipes(source) || !can_link_by_token)
        return Unauthorized();
        //throw new Exception("Cannot add item to relation Meal_Recipes");
      var new_target = new Lunch() { CreatedDate = DateTime.Now, Id = _context.Meal.Max(i => i.Id) + 1 };
      _context.Lunch.Add(new_target);
      _context.SaveChanges();
      var link = new Meal_Recipe() { Id = _context.Meal_Recipe.Max(l => l.Id) + 1, RecipeId = source.Id, MealId = new_target.Id };
      _context.Meal_Recipe.Add(link);
      _context.SaveChanges();
      return Ok(new Lunch[] { new_target });
    }
[RestrictToUserType(new string[] {})]
    [HttpPost("{Recipe_id}/Meal_Recipes_Brunch")]
    public IActionResult /*IEnumerable<Brunch>*/ CreateNewMeal_Recipe_Brunch(int Recipe_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var can_create_by_token = ApiTokenValid || true;
      if (source == null || !can_create_by_token)
        return Unauthorized();
        // throw new Exception("Cannot create item in relation Meal_Recipes");
      var can_link_by_token = ApiTokenValid || true;
      if (!CanAdd_Recipe_Meal_Recipes(source) || !can_link_by_token)
        return Unauthorized();
        //throw new Exception("Cannot add item to relation Meal_Recipes");
      var new_target = new Brunch() { CreatedDate = DateTime.Now, Id = _context.Meal.Max(i => i.Id) + 1 };
      _context.Brunch.Add(new_target);
      _context.SaveChanges();
      var link = new Meal_Recipe() { Id = _context.Meal_Recipe.Max(l => l.Id) + 1, RecipeId = source.Id, MealId = new_target.Id };
      _context.Meal_Recipe.Add(link);
      _context.SaveChanges();
      return Ok(new Brunch[] { new_target });
    }
[RestrictToUserType(new string[] {})]
    [HttpPost("{Recipe_id}/Meal_Recipes_Dinner")]
    public IActionResult /*IEnumerable<Dinner>*/ CreateNewMeal_Recipe_Dinner(int Recipe_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var can_create_by_token = ApiTokenValid || true;
      if (source == null || !can_create_by_token)
        return Unauthorized();
        // throw new Exception("Cannot create item in relation Meal_Recipes");
      var can_link_by_token = ApiTokenValid || true;
      if (!CanAdd_Recipe_Meal_Recipes(source) || !can_link_by_token)
        return Unauthorized();
        //throw new Exception("Cannot add item to relation Meal_Recipes");
      var new_target = new Dinner() { CreatedDate = DateTime.Now, Id = _context.Meal.Max(i => i.Id) + 1 };
      _context.Dinner.Add(new_target);
      _context.SaveChanges();
      var link = new Meal_Recipe() { Id = _context.Meal_Recipe.Max(l => l.Id) + 1, RecipeId = source.Id, MealId = new_target.Id };
      _context.Meal_Recipe.Add(link);
      _context.SaveChanges();
      return Ok(new Dinner[] { new_target });
    }
[RestrictToUserType(new string[] {})]
    [HttpPost("{Recipe_id}/Meal_Recipes_Breakfast")]
    public IActionResult /*IEnumerable<Breakfast>*/ CreateNewMeal_Recipe_Breakfast(int Recipe_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var can_create_by_token = ApiTokenValid || true;
      if (source == null || !can_create_by_token)
        return Unauthorized();
        // throw new Exception("Cannot create item in relation Meal_Recipes");
      var can_link_by_token = ApiTokenValid || true;
      if (!CanAdd_Recipe_Meal_Recipes(source) || !can_link_by_token)
        return Unauthorized();
        //throw new Exception("Cannot add item to relation Meal_Recipes");
      var new_target = new Breakfast() { CreatedDate = DateTime.Now, Id = _context.Meal.Max(i => i.Id) + 1 };
      _context.Breakfast.Add(new_target);
      _context.SaveChanges();
      var link = new Meal_Recipe() { Id = _context.Meal_Recipe.Max(l => l.Id) + 1, RecipeId = source.Id, MealId = new_target.Id };
      _context.Meal_Recipe.Add(link);
      _context.SaveChanges();
      return Ok(new Breakfast[] { new_target });
    }

    [RestrictToUserType(new string[] {"*"})]
    [HttpPost("{Recipe_id}/Meal_Recipes/{Meal_id}")]
    public IActionResult LinkWithMeal_Recipe(int Recipe_id, int Meal_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var allowed_targets = _context.Meal;
      var target = allowed_targets.FirstOrDefault(s => s.Id == Meal_id);
      var can_edit_source_by_token = ApiTokenValid || true;
      var can_edit_target_by_token = ApiTokenValid || true;
      var can_link_by_token = ApiTokenValid || true;
      if (!CanAdd_Recipe_Meal_Recipes(source) || !can_link_by_token || !can_edit_source_by_token || !can_edit_target_by_token)
        return BadRequest();
        // throw new Exception("Cannot add item to relation Meal_Recipes");
      if (!CanAdd_Meal_Meal_Recipes(target))
        return BadRequest();
        // throw new Exception("Cannot add item to relation Meal_Recipes");
      var link = new Meal_Recipe() { Id = _context.Meal_Recipe.Max(i => i.Id) + 1, RecipeId = source.Id, MealId = target.Id };
      _context.Meal_Recipe.Add(link);
      _context.SaveChanges();
      return Ok();
    }
    [RestrictToUserType(new string[] {"*"})]
    [HttpDelete("{Recipe_id}/Meal_Recipes/{Meal_id}")]
    public IActionResult UnlinkFromMeal_Recipe(int Recipe_id, int Meal_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var allowed_targets = _context.Meal;
      var target = allowed_targets.FirstOrDefault(s => s.Id == Meal_id);
      var link = _context.Meal_Recipe.FirstOrDefault(l => l.RecipeId == source.Id && l.MealId == target.Id);

      var can_edit_source_by_token = ApiTokenValid || true;
      var can_edit_target_by_token = ApiTokenValid || true;
      var can_unlink_by_token = ApiTokenValid || true;
      if (!can_unlink_by_token || !can_edit_source_by_token || !can_edit_target_by_token) return Unauthorized(); // throw new Exception("Cannot remove item from relation Meal_Recipes");
      _context.Meal_Recipe.Remove(link);
      _context.SaveChanges();
      return Ok();
    }
    [RestrictToUserType(new string[] {"*"})]
    [HttpGet("{Recipe_id}/PreparationTime_Recipes")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Page<PreparationTime> GetPreparationTime_Recipes(int Recipe_id, [FromQuery] int page_index, [FromQuery] int page_size = 25 )
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
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.PreparationTime.WithoutImages, item => item , null);
      var allowed_targets = ApiTokenValid ? _context.PreparationTime : _context.PreparationTime;
      var editable_targets = ApiTokenValid ? _context.PreparationTime : (_context.PreparationTime);
      var can_edit_by_token = ApiTokenValid || true;
      var items = (from link in _context.PreparationTime_Recipe
              where link.RecipeId == source.Id
              from target in allowed_targets
              where link.PreparationTimeId == target.Id
              select target).OrderBy(i => i.CreatedDate).AsQueryable();
      
      return items
              .Select(SimpleModelsAndRelations.Models.PreparationTime.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, can_edit_by_token && editable_targets.Any(et => et.Id == t.Id)))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.PreparationTime.WithoutImages, item => item , null);
    }

    [HttpGet("{Recipe_id}/PreparationTime_Recipes/{PreparationTime_id}")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult /*PreparationTime*/ GetPreparationTime_RecipeById(int Recipe_id, int PreparationTime_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var can_view_by_token = ApiTokenValid || true;
      if (source == null || !can_view_by_token)
        return NotFound();
      var allowed_targets = ApiTokenValid ? _context.PreparationTime : _context.PreparationTime;
      var item = (from link in _context.PreparationTime_Recipe
              where link.RecipeId == source.Id
              from target in allowed_targets
              where link.PreparationTimeId == target.Id
              select target).OrderBy(i => i.CreatedDate)
              .Select(SimpleModelsAndRelations.Models.PreparationTime.FilterViewableAttributes(current_User))
              .FirstOrDefault(t => t.Id == PreparationTime_id);
      if (item == null) return NotFound();
      item = SimpleModelsAndRelations.Models.PreparationTime.WithoutImages(item);
      return Ok(item);
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
      if (source == null || !can_view_by_token)
        return Enumerable.Empty<SimpleModelsAndRelations.Models.PreparationTime>()
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
              select target).OrderBy(i => i.CreatedDate)
              .Select(SimpleModelsAndRelations.Models.PreparationTime.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, can_edit_by_token && editable_targets.Any(et => et.Id == t.Id)))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.PreparationTime.WithoutImages, item => item);
    }
    [RestrictToUserType(new string[] {"*"})]
    [HttpGet("{Recipe_id}/unlinked/PreparationTime_Recipes/Thirty")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Page<Thirty> GetUnlinkedPreparationTime_Recipes_Thirty(int Recipe_id, [FromQuery] int page_index, [FromQuery] int page_size = 25)
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
        return Enumerable.Empty<SimpleModelsAndRelations.Models.Thirty>() // A
              .AsQueryable()
              .Select(SimpleModelsAndRelations.Models.Thirty.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, false))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Thirty.WithoutImages, item => item);
      var allowed_targets = ApiTokenValid ? _context.Thirty : _context.Thirty;
      var editable_targets = ApiTokenValid ? _context.PreparationTime : (_context.PreparationTime);
      var can_edit_by_token = ApiTokenValid || true;
      return (from target in allowed_targets
              where !_context.PreparationTime_Recipe.Any(link => link.RecipeId == source.Id && link.PreparationTimeId == target.Id) &&
              true
              select target).OrderBy(i => i.CreatedDate)
              .Select(SimpleModelsAndRelations.Models.Thirty.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, can_edit_by_token && editable_targets.Any(et => et.Id == t.Id)))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Thirty.WithoutImages, item => item);
    }


    [RestrictToUserType(new string[] {"*"})]
    [HttpGet("{Recipe_id}/unlinked/PreparationTime_Recipes/Sixty")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Page<Sixty> GetUnlinkedPreparationTime_Recipes_Sixty(int Recipe_id, [FromQuery] int page_index, [FromQuery] int page_size = 25)
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
        return Enumerable.Empty<SimpleModelsAndRelations.Models.Sixty>() // A
              .AsQueryable()
              .Select(SimpleModelsAndRelations.Models.Sixty.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, false))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Sixty.WithoutImages, item => item);
      var allowed_targets = ApiTokenValid ? _context.Sixty : _context.Sixty;
      var editable_targets = ApiTokenValid ? _context.PreparationTime : (_context.PreparationTime);
      var can_edit_by_token = ApiTokenValid || true;
      return (from target in allowed_targets
              where !_context.PreparationTime_Recipe.Any(link => link.RecipeId == source.Id && link.PreparationTimeId == target.Id) &&
              true
              select target).OrderBy(i => i.CreatedDate)
              .Select(SimpleModelsAndRelations.Models.Sixty.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, can_edit_by_token && editable_targets.Any(et => et.Id == t.Id)))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Sixty.WithoutImages, item => item);
    }


    [RestrictToUserType(new string[] {"*"})]
    [HttpGet("{Recipe_id}/unlinked/PreparationTime_Recipes/Ninety")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Page<Ninety> GetUnlinkedPreparationTime_Recipes_Ninety(int Recipe_id, [FromQuery] int page_index, [FromQuery] int page_size = 25)
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
        return Enumerable.Empty<SimpleModelsAndRelations.Models.Ninety>() // A
              .AsQueryable()
              .Select(SimpleModelsAndRelations.Models.Ninety.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, false))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Ninety.WithoutImages, item => item);
      var allowed_targets = ApiTokenValid ? _context.Ninety : _context.Ninety;
      var editable_targets = ApiTokenValid ? _context.PreparationTime : (_context.PreparationTime);
      var can_edit_by_token = ApiTokenValid || true;
      return (from target in allowed_targets
              where !_context.PreparationTime_Recipe.Any(link => link.RecipeId == source.Id && link.PreparationTimeId == target.Id) &&
              true
              select target).OrderBy(i => i.CreatedDate)
              .Select(SimpleModelsAndRelations.Models.Ninety.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, can_edit_by_token && editable_targets.Any(et => et.Id == t.Id)))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Ninety.WithoutImages, item => item);
    }


    [RestrictToUserType(new string[] {"*"})]
    [HttpGet("{Recipe_id}/unlinked/PreparationTime_Recipes/Fifteen")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Page<Fifteen> GetUnlinkedPreparationTime_Recipes_Fifteen(int Recipe_id, [FromQuery] int page_index, [FromQuery] int page_size = 25)
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
        return Enumerable.Empty<SimpleModelsAndRelations.Models.Fifteen>() // A
              .AsQueryable()
              .Select(SimpleModelsAndRelations.Models.Fifteen.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, false))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Fifteen.WithoutImages, item => item);
      var allowed_targets = ApiTokenValid ? _context.Fifteen : _context.Fifteen;
      var editable_targets = ApiTokenValid ? _context.PreparationTime : (_context.PreparationTime);
      var can_edit_by_token = ApiTokenValid || true;
      return (from target in allowed_targets
              where !_context.PreparationTime_Recipe.Any(link => link.RecipeId == source.Id && link.PreparationTimeId == target.Id) &&
              true
              select target).OrderBy(i => i.CreatedDate)
              .Select(SimpleModelsAndRelations.Models.Fifteen.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, can_edit_by_token && editable_targets.Any(et => et.Id == t.Id)))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Fifteen.WithoutImages, item => item);
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
    [HttpPost("{Recipe_id}/PreparationTime_Recipes_Thirty")]
    public IActionResult /*IEnumerable<Thirty>*/ CreateNewPreparationTime_Recipe_Thirty(int Recipe_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var can_create_by_token = ApiTokenValid || true;
      if (source == null || !can_create_by_token)
        return Unauthorized();
        // throw new Exception("Cannot create item in relation PreparationTime_Recipes");
      var can_link_by_token = ApiTokenValid || true;
      if (!CanAdd_Recipe_PreparationTime_Recipes(source) || !can_link_by_token)
        return Unauthorized();
        //throw new Exception("Cannot add item to relation PreparationTime_Recipes");
      var new_target = new Thirty() { CreatedDate = DateTime.Now, Id = _context.PreparationTime.Max(i => i.Id) + 1 };
      _context.Thirty.Add(new_target);
      _context.SaveChanges();
      var link = new PreparationTime_Recipe() { Id = _context.PreparationTime_Recipe.Max(l => l.Id) + 1, RecipeId = source.Id, PreparationTimeId = new_target.Id };
      _context.PreparationTime_Recipe.Add(link);
      _context.SaveChanges();
      return Ok(new Thirty[] { new_target });
    }
[RestrictToUserType(new string[] {})]
    [HttpPost("{Recipe_id}/PreparationTime_Recipes_Sixty")]
    public IActionResult /*IEnumerable<Sixty>*/ CreateNewPreparationTime_Recipe_Sixty(int Recipe_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var can_create_by_token = ApiTokenValid || true;
      if (source == null || !can_create_by_token)
        return Unauthorized();
        // throw new Exception("Cannot create item in relation PreparationTime_Recipes");
      var can_link_by_token = ApiTokenValid || true;
      if (!CanAdd_Recipe_PreparationTime_Recipes(source) || !can_link_by_token)
        return Unauthorized();
        //throw new Exception("Cannot add item to relation PreparationTime_Recipes");
      var new_target = new Sixty() { CreatedDate = DateTime.Now, Id = _context.PreparationTime.Max(i => i.Id) + 1 };
      _context.Sixty.Add(new_target);
      _context.SaveChanges();
      var link = new PreparationTime_Recipe() { Id = _context.PreparationTime_Recipe.Max(l => l.Id) + 1, RecipeId = source.Id, PreparationTimeId = new_target.Id };
      _context.PreparationTime_Recipe.Add(link);
      _context.SaveChanges();
      return Ok(new Sixty[] { new_target });
    }
[RestrictToUserType(new string[] {})]
    [HttpPost("{Recipe_id}/PreparationTime_Recipes_Ninety")]
    public IActionResult /*IEnumerable<Ninety>*/ CreateNewPreparationTime_Recipe_Ninety(int Recipe_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var can_create_by_token = ApiTokenValid || true;
      if (source == null || !can_create_by_token)
        return Unauthorized();
        // throw new Exception("Cannot create item in relation PreparationTime_Recipes");
      var can_link_by_token = ApiTokenValid || true;
      if (!CanAdd_Recipe_PreparationTime_Recipes(source) || !can_link_by_token)
        return Unauthorized();
        //throw new Exception("Cannot add item to relation PreparationTime_Recipes");
      var new_target = new Ninety() { CreatedDate = DateTime.Now, Id = _context.PreparationTime.Max(i => i.Id) + 1 };
      _context.Ninety.Add(new_target);
      _context.SaveChanges();
      var link = new PreparationTime_Recipe() { Id = _context.PreparationTime_Recipe.Max(l => l.Id) + 1, RecipeId = source.Id, PreparationTimeId = new_target.Id };
      _context.PreparationTime_Recipe.Add(link);
      _context.SaveChanges();
      return Ok(new Ninety[] { new_target });
    }
[RestrictToUserType(new string[] {})]
    [HttpPost("{Recipe_id}/PreparationTime_Recipes_Fifteen")]
    public IActionResult /*IEnumerable<Fifteen>*/ CreateNewPreparationTime_Recipe_Fifteen(int Recipe_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var can_create_by_token = ApiTokenValid || true;
      if (source == null || !can_create_by_token)
        return Unauthorized();
        // throw new Exception("Cannot create item in relation PreparationTime_Recipes");
      var can_link_by_token = ApiTokenValid || true;
      if (!CanAdd_Recipe_PreparationTime_Recipes(source) || !can_link_by_token)
        return Unauthorized();
        //throw new Exception("Cannot add item to relation PreparationTime_Recipes");
      var new_target = new Fifteen() { CreatedDate = DateTime.Now, Id = _context.PreparationTime.Max(i => i.Id) + 1 };
      _context.Fifteen.Add(new_target);
      _context.SaveChanges();
      var link = new PreparationTime_Recipe() { Id = _context.PreparationTime_Recipe.Max(l => l.Id) + 1, RecipeId = source.Id, PreparationTimeId = new_target.Id };
      _context.PreparationTime_Recipe.Add(link);
      _context.SaveChanges();
      return Ok(new Fifteen[] { new_target });
    }

    [RestrictToUserType(new string[] {"*"})]
    [HttpPost("{Recipe_id}/PreparationTime_Recipes/{PreparationTime_id}")]
    public IActionResult LinkWithPreparationTime_Recipe(int Recipe_id, int PreparationTime_id)
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
        return BadRequest();
        // throw new Exception("Cannot add item to relation PreparationTime_Recipes");
      if (!CanAdd_PreparationTime_PreparationTime_Recipes(target))
        return BadRequest();
        // throw new Exception("Cannot add item to relation PreparationTime_Recipes");
      var link = new PreparationTime_Recipe() { Id = _context.PreparationTime_Recipe.Max(i => i.Id) + 1, RecipeId = source.Id, PreparationTimeId = target.Id };
      _context.PreparationTime_Recipe.Add(link);
      _context.SaveChanges();
      return Ok();
    }
    [RestrictToUserType(new string[] {"*"})]
    [HttpDelete("{Recipe_id}/PreparationTime_Recipes/{PreparationTime_id}")]
    public IActionResult UnlinkFromPreparationTime_Recipe(int Recipe_id, int PreparationTime_id)
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
      if (!can_unlink_by_token || !can_edit_source_by_token || !can_edit_target_by_token) return Unauthorized(); // throw new Exception("Cannot remove item from relation PreparationTime_Recipes");
      _context.PreparationTime_Recipe.Remove(link);
      _context.SaveChanges();
      return Ok();
    }
    [RestrictToUserType(new string[] {"*"})]
    [HttpGet("{Recipe_id}/User_Recipes")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Page<UserViewData> GetUser_Recipes(int Recipe_id, [FromQuery] int page_index, [FromQuery] int page_size = 25 )
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
        return Enumerable.Empty<SimpleModelsAndRelations.Models.User>() // B
              .AsQueryable()
              .Select(SimpleModelsAndRelations.Models.User.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, false))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.User.WithoutImages, item => UserViewData.FromUser(item) , null);
      var allowed_targets = ApiTokenValid ? _context.User : _context.User;
      var editable_targets = ApiTokenValid ? _context.User : (_context.User);
      var can_edit_by_token = ApiTokenValid || true;
      var items = (from link in _context.User_Recipe
              where link.RecipeId == source.Id
              from target in allowed_targets
              where link.UserId == target.Id
              select target).OrderBy(i => i.CreatedDate).AsQueryable();
      
      return items
              .Select(SimpleModelsAndRelations.Models.User.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, can_edit_by_token && editable_targets.Any(et => et.Id == t.Id)))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.User.WithoutImages, item => UserViewData.FromUser(item) , null);
    }

    [HttpGet("{Recipe_id}/User_Recipes/{User_id}")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult /*UserViewData*/ GetUser_RecipeById(int Recipe_id, int User_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var can_view_by_token = ApiTokenValid || true;
      if (source == null || !can_view_by_token)
        return NotFound();
      var allowed_targets = ApiTokenValid ? _context.User : _context.User;
      var item = (from link in _context.User_Recipe
              where link.RecipeId == source.Id
              from target in allowed_targets
              where link.UserId == target.Id
              select target).OrderBy(i => i.CreatedDate)
              .Select(SimpleModelsAndRelations.Models.User.FilterViewableAttributes(current_User))
              .FirstOrDefault(t => t.Id == User_id);
      if (item == null) return NotFound();
      item = SimpleModelsAndRelations.Models.User.WithoutImages(item);
      return Ok(UserViewData.FromUser(item));
    }

    [RestrictToUserType(new string[] {"*"})]
    [HttpGet("{Recipe_id}/unlinked/User_Recipes")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Page<UserViewData> GetUnlinkedUser_Recipes(int Recipe_id, [FromQuery] int page_index, [FromQuery] int page_size = 25)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var can_create_by_token = ApiTokenValid || true;
      var can_delete_by_token = ApiTokenValid || true || true;
      var can_link_by_token = ApiTokenValid || true;
      var can_view_by_token = ApiTokenValid || true;
      if (source == null || !can_view_by_token)
        return Enumerable.Empty<SimpleModelsAndRelations.Models.User>()
              .AsQueryable()
              .Select(SimpleModelsAndRelations.Models.User.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, false))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.User.WithoutImages, item => UserViewData.FromUser(item));
      var allowed_targets = ApiTokenValid ? _context.User : _context.User;
      var editable_targets = ApiTokenValid ? _context.User : (_context.User);
      var can_edit_by_token = ApiTokenValid || true;
      return (from target in allowed_targets
              where !_context.User_Recipe.Any(link => link.RecipeId == source.Id && link.UserId == target.Id) &&
              true
              select target).OrderBy(i => i.CreatedDate)
              .Select(SimpleModelsAndRelations.Models.User.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, can_edit_by_token && editable_targets.Any(et => et.Id == t.Id)))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.User.WithoutImages, item => UserViewData.FromUser(item));
    }

    bool CanAdd_Recipe_User_Recipes(Recipe source) {
      return true;
    }

    bool CanAdd_User_User_Recipes(User target) {
      return true;
    }

    [RestrictToUserType(new string[] {"*"})]
    [HttpPost("{Recipe_id}/User_Recipes_User")]
    public IActionResult /*IEnumerable<UserViewData>*/ CreateNewUser_Recipe_User(int Recipe_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var can_create_by_token = ApiTokenValid || true;
      if (source == null || !can_create_by_token)
        return Unauthorized();
        // throw new Exception("Cannot create item in relation User_Recipes");
      var can_link_by_token = ApiTokenValid || true;
      if (!CanAdd_Recipe_User_Recipes(source) || !can_link_by_token)
        return Unauthorized();
        //throw new Exception("Cannot add item to relation User_Recipes");
      var new_target = new User() { CreatedDate = DateTime.Now, Id = _context.User.Max(i => i.Id) + 1 };
      _context.User.Add(new_target);
      _context.SaveChanges();
      var link = new User_Recipe() { Id = _context.User_Recipe.Max(l => l.Id) + 1, RecipeId = source.Id, UserId = new_target.Id };
      _context.User_Recipe.Add(link);
      _context.SaveChanges();
      return Ok(new UserViewData[] { UserViewData.FromUser(new_target) });
    }

    [RestrictToUserType(new string[] {"*"})]
    [HttpPost("{Recipe_id}/User_Recipes/{User_id}")]
    public IActionResult LinkWithUser_Recipe(int Recipe_id, int User_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var allowed_targets = _context.User;
      var target = allowed_targets.FirstOrDefault(s => s.Id == User_id);
      var can_edit_source_by_token = ApiTokenValid || true;
      var can_edit_target_by_token = ApiTokenValid || true;
      var can_link_by_token = ApiTokenValid || true;
      if (!CanAdd_Recipe_User_Recipes(source) || !can_link_by_token || !can_edit_source_by_token || !can_edit_target_by_token)
        return BadRequest();
        // throw new Exception("Cannot add item to relation User_Recipes");
      if (!CanAdd_User_User_Recipes(target))
        return BadRequest();
        // throw new Exception("Cannot add item to relation User_Recipes");
      var link = new User_Recipe() { Id = _context.User_Recipe.Max(i => i.Id) + 1, RecipeId = source.Id, UserId = target.Id };
      _context.User_Recipe.Add(link);
      _context.SaveChanges();
      return Ok();
    }
    [RestrictToUserType(new string[] {"*"})]
    [HttpDelete("{Recipe_id}/User_Recipes/{User_id}")]
    public IActionResult UnlinkFromUser_Recipe(int Recipe_id, int User_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var allowed_targets = _context.User;
      var target = allowed_targets.FirstOrDefault(s => s.Id == User_id);
      var link = _context.User_Recipe.FirstOrDefault(l => l.RecipeId == source.Id && l.UserId == target.Id);

      var can_edit_source_by_token = ApiTokenValid || true;
      var can_edit_target_by_token = ApiTokenValid || true;
      var can_unlink_by_token = ApiTokenValid || true;
      if (!can_unlink_by_token || !can_edit_source_by_token || !can_edit_target_by_token) return Unauthorized(); // throw new Exception("Cannot remove item from relation User_Recipes");
      _context.User_Recipe.Remove(link);
      _context.SaveChanges();
      return Ok();
    }
    [RestrictToUserType(new string[] {"*"})]
    [HttpGet("{Recipe_id}/Recipe_Ratings")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Page<Rating> GetRecipe_Ratings(int Recipe_id, [FromQuery] int page_index, [FromQuery] int page_size = 25 )
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
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Rating.WithoutImages, item => item , null);
      var allowed_targets = ApiTokenValid ? _context.Rating : _context.Rating;
      var editable_targets = ApiTokenValid ? _context.Rating : (_context.Rating);
      var can_edit_by_token = ApiTokenValid || true;
      var items = (from link in _context.Recipe_Rating
              where link.RecipeId == source.Id
              from target in allowed_targets
              where link.RatingId == target.Id
              select target).OrderBy(i => i.CreatedDate).AsQueryable();
      
      return items
              .Select(SimpleModelsAndRelations.Models.Rating.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, can_edit_by_token && editable_targets.Any(et => et.Id == t.Id)))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Rating.WithoutImages, item => item , null);
    }

    [HttpGet("{Recipe_id}/Recipe_Ratings/{Rating_id}")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult /*Rating*/ GetRecipe_RatingById(int Recipe_id, int Rating_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var can_view_by_token = ApiTokenValid || true;
      if (source == null || !can_view_by_token)
        return NotFound();
      var allowed_targets = ApiTokenValid ? _context.Rating : _context.Rating;
      var item = (from link in _context.Recipe_Rating
              where link.RecipeId == source.Id
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
    [HttpGet("{Recipe_id}/unlinked/Recipe_Ratings")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Page<Rating> GetUnlinkedRecipe_Ratings(int Recipe_id, [FromQuery] int page_index, [FromQuery] int page_size = 25)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
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
              where !_context.Recipe_Rating.Any(link => link.RecipeId == source.Id && link.RatingId == target.Id) &&
              (from link in _context.Recipe_Rating
                where link.RatingId == target.Id
                from s in _context.Recipe
                where link.RecipeId == s.Id
                select s).Count() < 1
              select target).OrderBy(i => i.CreatedDate)
              .Select(SimpleModelsAndRelations.Models.Rating.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, can_edit_by_token && editable_targets.Any(et => et.Id == t.Id)))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Rating.WithoutImages, item => item);
    }

    bool CanAdd_Recipe_Recipe_Ratings(Recipe source) {
      return true;
    }

    bool CanAdd_Rating_Recipe_Ratings(Rating target) {
      return (from link in _context.Recipe_Rating
           where link.RatingId == target.Id
           from source in _context.Recipe
           where link.RecipeId == source.Id
           select source).Count() < 1;
    }

    [RestrictToUserType(new string[] {})]
    [HttpPost("{Recipe_id}/Recipe_Ratings_Rating")]
    public IActionResult /*IEnumerable<Rating>*/ CreateNewRecipe_Rating_Rating(int Recipe_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var can_create_by_token = ApiTokenValid || true;
      if (source == null || !can_create_by_token)
        return Unauthorized();
        // throw new Exception("Cannot create item in relation Recipe_Ratings");
      var can_link_by_token = ApiTokenValid || true;
      if (!CanAdd_Recipe_Recipe_Ratings(source) || !can_link_by_token)
        return Unauthorized();
        //throw new Exception("Cannot add item to relation Recipe_Ratings");
      var new_target = new Rating() { CreatedDate = DateTime.Now, Id = _context.Rating.Max(i => i.Id) + 1 };
      _context.Rating.Add(new_target);
      _context.SaveChanges();
      var link = new Recipe_Rating() { Id = _context.Recipe_Rating.Max(l => l.Id) + 1, RecipeId = source.Id, RatingId = new_target.Id };
      _context.Recipe_Rating.Add(link);
      _context.SaveChanges();
      return Ok(new Rating[] { new_target });
    }

    [RestrictToUserType(new string[] {"*"})]
    [HttpPost("{Recipe_id}/Recipe_Ratings/{Rating_id}")]
    public IActionResult LinkWithRecipe_Rating(int Recipe_id, int Rating_id)
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
      if (!CanAdd_Recipe_Recipe_Ratings(source) || !can_link_by_token || !can_edit_source_by_token || !can_edit_target_by_token)
        return BadRequest();
        // throw new Exception("Cannot add item to relation Recipe_Ratings");
      if (!CanAdd_Rating_Recipe_Ratings(target))
        return BadRequest();
        // throw new Exception("Cannot add item to relation Recipe_Ratings");
      var link = new Recipe_Rating() { Id = _context.Recipe_Rating.Max(i => i.Id) + 1, RecipeId = source.Id, RatingId = target.Id };
      _context.Recipe_Rating.Add(link);
      _context.SaveChanges();
      return Ok();
    }
    [RestrictToUserType(new string[] {"*"})]
    [HttpDelete("{Recipe_id}/Recipe_Ratings/{Rating_id}")]
    public IActionResult UnlinkFromRecipe_Rating(int Recipe_id, int Rating_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var allowed_targets = _context.Rating;
      var target = allowed_targets.FirstOrDefault(s => s.Id == Rating_id);
      var link = _context.Recipe_Rating.FirstOrDefault(l => l.RecipeId == source.Id && l.RatingId == target.Id);

      var can_edit_source_by_token = ApiTokenValid || true;
      var can_edit_target_by_token = ApiTokenValid || true;
      var can_unlink_by_token = ApiTokenValid || true;
      if (!can_unlink_by_token || !can_edit_source_by_token || !can_edit_target_by_token) return Unauthorized(); // throw new Exception("Cannot remove item from relation Recipe_Ratings");
      _context.Recipe_Rating.Remove(link);
      _context.SaveChanges();
      return Ok();
    }
    [RestrictToUserType(new string[] {"*"})]
    [HttpGet("{Recipe_id}/RecommendationPage_Recipes")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Page<RecommendationPage> GetRecommendationPage_Recipes(int Recipe_id, [FromQuery] int page_index, [FromQuery] int page_size = 25 )
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
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.RecommendationPage.WithoutImages, item => item , null);
      var allowed_targets = ApiTokenValid ? _context.RecommendationPage : _context.RecommendationPage;
      var editable_targets = ApiTokenValid ? _context.RecommendationPage : (_context.RecommendationPage);
      var can_edit_by_token = ApiTokenValid || true;
      var items = (from link in _context.RecommendationPage_Recipe
              where link.RecipeId == source.Id
              from target in allowed_targets
              where link.RecommendationPageId == target.Id
              select target).OrderBy(i => i.CreatedDate).AsQueryable();
      
      return items
              .Select(SimpleModelsAndRelations.Models.RecommendationPage.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, can_edit_by_token && editable_targets.Any(et => et.Id == t.Id)))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.RecommendationPage.WithoutImages, item => item , null);
    }

    [HttpGet("{Recipe_id}/RecommendationPage_Recipes/{RecommendationPage_id}")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult /*RecommendationPage*/ GetRecommendationPage_RecipeById(int Recipe_id, int RecommendationPage_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var can_view_by_token = ApiTokenValid || true;
      if (source == null || !can_view_by_token)
        return NotFound();
      var allowed_targets = ApiTokenValid ? _context.RecommendationPage : _context.RecommendationPage;
      var item = (from link in _context.RecommendationPage_Recipe
              where link.RecipeId == source.Id
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
              where !_context.RecommendationPage_Recipe.Any(link => link.RecipeId == source.Id && link.RecommendationPageId == target.Id) &&
              true
              select target).OrderBy(i => i.CreatedDate)
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
    public IActionResult /*IEnumerable<RecommendationPage>*/ CreateNewRecommendationPage_Recipe_RecommendationPage(int Recipe_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Recipe_id);
      var can_create_by_token = ApiTokenValid || true;
      if (source == null || !can_create_by_token)
        return Unauthorized();
        // throw new Exception("Cannot create item in relation RecommendationPage_Recipes");
      var can_link_by_token = ApiTokenValid || true;
      if (!CanAdd_Recipe_RecommendationPage_Recipes(source) || !can_link_by_token)
        return Unauthorized();
        //throw new Exception("Cannot add item to relation RecommendationPage_Recipes");
      var new_target = new RecommendationPage() { CreatedDate = DateTime.Now, Id = _context.RecommendationPage.Max(i => i.Id) + 1 };
      _context.RecommendationPage.Add(new_target);
      _context.SaveChanges();
      var link = new RecommendationPage_Recipe() { Id = _context.RecommendationPage_Recipe.Max(l => l.Id) + 1, RecipeId = source.Id, RecommendationPageId = new_target.Id };
      _context.RecommendationPage_Recipe.Add(link);
      _context.SaveChanges();
      return Ok(new RecommendationPage[] { new_target });
    }

    [RestrictToUserType(new string[] {"*"})]
    [HttpPost("{Recipe_id}/RecommendationPage_Recipes/{RecommendationPage_id}")]
    public IActionResult LinkWithRecommendationPage_Recipe(int Recipe_id, int RecommendationPage_id)
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
        return BadRequest();
        // throw new Exception("Cannot add item to relation RecommendationPage_Recipes");
      if (!CanAdd_RecommendationPage_RecommendationPage_Recipes(target))
        return BadRequest();
        // throw new Exception("Cannot add item to relation RecommendationPage_Recipes");
      var link = new RecommendationPage_Recipe() { Id = _context.RecommendationPage_Recipe.Max(i => i.Id) + 1, RecipeId = source.Id, RecommendationPageId = target.Id };
      _context.RecommendationPage_Recipe.Add(link);
      _context.SaveChanges();
      return Ok();
    }
    [RestrictToUserType(new string[] {"*"})]
    [HttpDelete("{Recipe_id}/RecommendationPage_Recipes/{RecommendationPage_id}")]
    public IActionResult UnlinkFromRecommendationPage_Recipe(int Recipe_id, int RecommendationPage_id)
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
      if (!can_unlink_by_token || !can_edit_source_by_token || !can_edit_target_by_token) return Unauthorized(); // throw new Exception("Cannot remove item from relation RecommendationPage_Recipes");
      _context.RecommendationPage_Recipe.Remove(link);
      _context.SaveChanges();
      return Ok();
    }
    [RestrictToUserType(new string[] {"*"})]
    [HttpGet("{id}")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult /*ItemWithEditable<Recipe>*/ GetById(int id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_items = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var editable_items = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var item_full = allowed_items.FirstOrDefault(e => e.Id == id);
      if (item_full == null) return NotFound();
      var item = SimpleModelsAndRelations.Models.Recipe.FilterViewableAttributesLocal(current_User)(item_full);
      item = SimpleModelsAndRelations.Models.Recipe.WithoutImages(item);
      return Ok(new ItemWithEditable<Recipe>() {
        Item = item,
        Editable = editable_items.Any(e => e.Id == item.Id) });
    }
    

    [RestrictToUserType(new string[] {})]
    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult /*Recipe*/ Create()
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var can_create_by_token = ApiTokenValid || true;
      if (!can_create_by_token)
        return Unauthorized();
        // throw new Exception("Unauthorized create attempt");
      var item = new Recipe() { CreatedDate = DateTime.Now, Id = _context.Recipe.Max(i => i.Id) + 1 };
      _context.Recipe.Add(SimpleModelsAndRelations.Models.Recipe.FilterViewableAttributesLocal(current_User)(item));
      _context.SaveChanges();
      item = SimpleModelsAndRelations.Models.Recipe.WithoutImages(item);
      return Ok(item);
    }

    [RestrictToUserType(new string[] {"*"})]
    [HttpPut]
    [ValidateAntiForgeryToken]
    public IActionResult Update([FromBody] Recipe item)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_items = ApiTokenValid ? _context.Recipe : _context.Recipe;
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
      var allowed_items = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var item = _context.Recipe.FirstOrDefault(e => e.Id == id);
      var can_delete_by_token = ApiTokenValid || true;
      if (item == null || !can_delete_by_token)
        return Unauthorized();
        // throw new Exception("Unauthorized delete attempt");
      
      if (!allowed_items.Any(a => a.Id == item.Id)) return Unauthorized(); // throw new Exception("Unauthorized delete attempt");
      
      

      _context.Recipe.Remove(item);
      _context.SaveChanges();
      return Ok();
    }


    [RestrictToUserType(new string[] {"*"})]
    [HttpGet]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Page<Recipe> GetAll([FromQuery] int page_index, [FromQuery] int page_size = 25 )
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_items = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var editable_items = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var can_edit_by_token = ApiTokenValid || true;
      var can_create_by_token = ApiTokenValid || true;
      var can_delete_by_token = ApiTokenValid || true;
      var items = allowed_items.OrderBy(i => i.CreatedDate).AsQueryable();
      
      return items
        .Select(SimpleModelsAndRelations.Models.Recipe.FilterViewableAttributes(current_User))
        .Select(s => Tuple.Create(s, can_edit_by_token && editable_items.Any(es => es.Id == s.Id)))
        .Paginate(can_create_by_token, can_delete_by_token, false, page_index, page_size, SimpleModelsAndRelations.Models.Recipe.WithoutImages, item => item , null );
    }

    


    
  }

  