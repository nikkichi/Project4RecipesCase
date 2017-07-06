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


  [Route("api/v1/Homepage")]
  public class HomepageApiController : Controller
  {
    private readonly MailOptions _mailOptions;
    public readonly SimpleModelsAndRelationsContext _context;
    private IHostingEnvironment env;

    public HomepageApiController(SimpleModelsAndRelationsContext context, IHostingEnvironment env, IOptions<MailOptions> mailOptionsAccessor)
    {
      _context = context;
      _mailOptions = mailOptionsAccessor.Value;
      this.env = env;
    }

    public bool ApiTokenValid => RestrictToUserTypeAttribute.ApiToken != null &&
        HttpContext.Request.Headers["ApiToken"] == RestrictToUserTypeAttribute.ApiToken;

    
    [RestrictToUserType(new string[] {"*"})]
    [HttpGet("{id}")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult /*ItemWithEditable<Homepage>*/ GetById(int id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_items = ApiTokenValid ? _context.Homepage : _context.Homepage;
      var editable_items = ApiTokenValid ? _context.Homepage : _context.Homepage;
      var item_full = allowed_items.FirstOrDefault(e => e.Id == id);
      if (item_full == null) return NotFound();
      var item = SimpleModelsAndRelations.Models.Homepage.FilterViewableAttributesLocal(current_User)(item_full);
      item = SimpleModelsAndRelations.Models.Homepage.WithoutImages(item);
      return Ok(new ItemWithEditable<Homepage>() {
        Item = item,
        Editable = editable_items.Any(e => e.Id == item.Id) });
    }
    

    [RestrictToUserType(new string[] {})]
    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult /*Homepage*/ Create()
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var can_create_by_token = ApiTokenValid || true;
      if (!can_create_by_token)
        return Unauthorized();
        // throw new Exception("Unauthorized create attempt");
      var item = new Homepage() { CreatedDate = DateTime.Now, Id = _context.Homepage.Max(i => i.Id) + 1 };
      _context.Homepage.Add(SimpleModelsAndRelations.Models.Homepage.FilterViewableAttributesLocal(current_User)(item));
      _context.SaveChanges();
      item = SimpleModelsAndRelations.Models.Homepage.WithoutImages(item);
      return Ok(item);
    }

    [RestrictToUserType(new string[] {"*"})]
    [HttpPut]
    [ValidateAntiForgeryToken]
    public IActionResult Update([FromBody] Homepage item)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_items = ApiTokenValid ? _context.Homepage : _context.Homepage;
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
      var allowed_items = ApiTokenValid ? _context.Homepage : _context.Homepage;
      var item = _context.Homepage.FirstOrDefault(e => e.Id == id);
      var can_delete_by_token = ApiTokenValid || true;
      if (item == null || !can_delete_by_token)
        return Unauthorized();
        // throw new Exception("Unauthorized delete attempt");
      
      if (!allowed_items.Any(a => a.Id == item.Id)) return Unauthorized(); // throw new Exception("Unauthorized delete attempt");
      
      

      _context.Homepage.Remove(item);
      _context.SaveChanges();
      return Ok();
    }


    [RestrictToUserType(new string[] {"*"})]
    [HttpGet]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Page<Homepage> GetAll([FromQuery] int page_index, [FromQuery] int page_size = 25 )
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_items = ApiTokenValid ? _context.Homepage : _context.Homepage;
      var editable_items = ApiTokenValid ? _context.Homepage : _context.Homepage;
      var can_edit_by_token = ApiTokenValid || true;
      var can_create_by_token = ApiTokenValid || true;
      var can_delete_by_token = ApiTokenValid || true;
      var items = allowed_items.OrderBy(i => i.CreatedDate).AsQueryable();
      
      return items
        .Select(SimpleModelsAndRelations.Models.Homepage.FilterViewableAttributes(current_User))
        .Select(s => Tuple.Create(s, can_edit_by_token && editable_items.Any(es => es.Id == s.Id)))
        .Paginate(can_create_by_token, can_delete_by_token, false, page_index, page_size, SimpleModelsAndRelations.Models.Homepage.WithoutImages, item => item , null );
    }

    


    /*
    static public void CleanupNullRelations(SimpleModelsAndRelationsContext _context) {
    
      _context.Cuisine_Meal.RemoveRange(_context.Cuisine_Meal.Where(l =>
        l.CuisineId == null ||
        l.MealId == null ||
        !_context.Cuisine.Any(s => s.Id == l.CuisineId) ||
        !_context.Meal.Any(s => s.Id == l.MealId)));
      _context.SaveChanges();
    

      _context.Cuisine_Meal.RemoveRange(_context.Cuisine_Meal.Where(l =>
        l.MealId == null ||
        l.CuisineId == null ||
        !_context.Meal.Any(s => s.Id == l.MealId) ||
        !_context.Cuisine.Any(s => s.Id == l.CuisineId)));
      _context.SaveChanges();
    

      _context.Meal_Recipe.RemoveRange(_context.Meal_Recipe.Where(l =>
        l.MealId == null ||
        l.RecipeId == null ||
        !_context.Meal.Any(s => s.Id == l.MealId) ||
        !_context.Recipe.Any(s => s.Id == l.RecipeId)));
      _context.SaveChanges();
    

      _context.Meal_Recipe.RemoveRange(_context.Meal_Recipe.Where(l =>
        l.RecipeId == null ||
        l.MealId == null ||
        !_context.Recipe.Any(s => s.Id == l.RecipeId) ||
        !_context.Meal.Any(s => s.Id == l.MealId)));
      _context.SaveChanges();
    

      _context.PreparationTime_Recipe.RemoveRange(_context.PreparationTime_Recipe.Where(l =>
        l.PreparationTimeId == null ||
        l.RecipeId == null ||
        !_context.PreparationTime.Any(s => s.Id == l.PreparationTimeId) ||
        !_context.Recipe.Any(s => s.Id == l.RecipeId)));
      _context.SaveChanges();
    

      _context.PreparationTime_Recipe.RemoveRange(_context.PreparationTime_Recipe.Where(l =>
        l.RecipeId == null ||
        l.PreparationTimeId == null ||
        !_context.Recipe.Any(s => s.Id == l.RecipeId) ||
        !_context.PreparationTime.Any(s => s.Id == l.PreparationTimeId)));
      _context.SaveChanges();
    

      _context.User_Recipe.RemoveRange(_context.User_Recipe.Where(l =>
        l.UserId == null ||
        l.RecipeId == null ||
        !_context.User.Any(s => s.Id == l.UserId) ||
        !_context.Recipe.Any(s => s.Id == l.RecipeId)));
      _context.SaveChanges();
    

      _context.User_Recipe.RemoveRange(_context.User_Recipe.Where(l =>
        l.RecipeId == null ||
        l.UserId == null ||
        !_context.Recipe.Any(s => s.Id == l.RecipeId) ||
        !_context.User.Any(s => s.Id == l.UserId)));
      _context.SaveChanges();
    

      _context.Recipe_Rating.RemoveRange(_context.Recipe_Rating.Where(l =>
        l.RecipeId == null ||
        l.RatingId == null ||
        !_context.Recipe.Any(s => s.Id == l.RecipeId) ||
        !_context.Rating.Any(s => s.Id == l.RatingId)));
      _context.SaveChanges();
    

      _context.Recipe_Rating.RemoveRange(_context.Recipe_Rating.Where(l =>
        l.RatingId == null ||
        l.RecipeId == null ||
        !_context.Rating.Any(s => s.Id == l.RatingId) ||
        !_context.Recipe.Any(s => s.Id == l.RecipeId)));
      _context.SaveChanges();
    

      _context.User_RecommendationPage.RemoveRange(_context.User_RecommendationPage.Where(l =>
        l.UserId == null ||
        l.RecommendationPageId == null ||
        !_context.User.Any(s => s.Id == l.UserId) ||
        !_context.RecommendationPage.Any(s => s.Id == l.RecommendationPageId)));
      _context.SaveChanges();
    

      _context.User_RecommendationPage.RemoveRange(_context.User_RecommendationPage.Where(l =>
        l.RecommendationPageId == null ||
        l.UserId == null ||
        !_context.RecommendationPage.Any(s => s.Id == l.RecommendationPageId) ||
        !_context.User.Any(s => s.Id == l.UserId)));
      _context.SaveChanges();
    

      _context.RecommendationPage_Recipe.RemoveRange(_context.RecommendationPage_Recipe.Where(l =>
        l.RecommendationPageId == null ||
        l.RecipeId == null ||
        !_context.RecommendationPage.Any(s => s.Id == l.RecommendationPageId) ||
        !_context.Recipe.Any(s => s.Id == l.RecipeId)));
      _context.SaveChanges();
    

      _context.RecommendationPage_Recipe.RemoveRange(_context.RecommendationPage_Recipe.Where(l =>
        l.RecipeId == null ||
        l.RecommendationPageId == null ||
        !_context.Recipe.Any(s => s.Id == l.RecipeId) ||
        !_context.RecommendationPage.Any(s => s.Id == l.RecommendationPageId)));
      _context.SaveChanges();
    

      _context.User_Rating.RemoveRange(_context.User_Rating.Where(l =>
        l.UserId == null ||
        l.RatingId == null ||
        !_context.User.Any(s => s.Id == l.UserId) ||
        !_context.Rating.Any(s => s.Id == l.RatingId)));
      _context.SaveChanges();
    

      _context.User_Rating.RemoveRange(_context.User_Rating.Where(l =>
        l.RatingId == null ||
        l.UserId == null ||
        !_context.Rating.Any(s => s.Id == l.RatingId) ||
        !_context.User.Any(s => s.Id == l.UserId)));
      _context.SaveChanges();
    

      _context.Cuisine_Recipe.RemoveRange(_context.Cuisine_Recipe.Where(l =>
        l.CuisineId == null ||
        l.RecipeId == null ||
        !_context.Cuisine.Any(s => s.Id == l.CuisineId) ||
        !_context.Recipe.Any(s => s.Id == l.RecipeId)));
      _context.SaveChanges();
    

      _context.Cuisine_Recipe.RemoveRange(_context.Cuisine_Recipe.Where(l =>
        l.RecipeId == null ||
        l.CuisineId == null ||
        !_context.Recipe.Any(s => s.Id == l.RecipeId) ||
        !_context.Cuisine.Any(s => s.Id == l.CuisineId)));
      _context.SaveChanges();
    
    }
    */
    
  }

  