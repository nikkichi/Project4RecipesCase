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


  [Route("api/v1/Homepage")]
  public class HomepageApiController : Controller
  {
    private readonly MailOptions _mailOptions;
    public readonly SimpleModelsAndRelationsContext _context;

    public HomepageApiController(SimpleModelsAndRelationsContext context, IOptions<MailOptions> mailOptionsAccessor)
    {
      _context = context;
      _mailOptions = mailOptionsAccessor.Value;
    }

    public bool ApiTokenValid => RestrictToUserTypeAttribute.ApiToken != null &&
        HttpContext.Request.Headers["ApiToken"] == RestrictToUserTypeAttribute.ApiToken;

    
    [RestrictToUserType(new string[] {"*"})]
    [HttpGet("{Homepage_id}/Homepage_Recipes")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Page<Recipe> GetHomepage_Recipes(int Homepage_id, [FromQuery] int page_index, [FromQuery] int page_size = 25)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Homepage : _context.Homepage;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Homepage_id);
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
      return (from target in allowed_targets
              select target)
              .Select(SimpleModelsAndRelations.Models.Recipe.FilterViewableAttributes(current_User))
              .Select(t => Tuple.Create(t, can_edit_by_token && editable_targets.Any(et => et.Id == t.Id)))
              .Paginate(can_create_by_token, can_delete_by_token, can_link_by_token, page_index, page_size, SimpleModelsAndRelations.Models.Recipe.WithoutImages, item => item);
    }

    [HttpGet("{Homepage_id}/Homepage_Recipes/{Recipe_id}")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Recipe GetHomepage_RecipeById(int Homepage_id, int Recipe_id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_sources = ApiTokenValid ? _context.Homepage : _context.Homepage;
      var source = allowed_sources.FirstOrDefault(s => s.Id == Homepage_id);
      var can_view_by_token = ApiTokenValid || true;
      if (source == null || !can_view_by_token)
        return null;
      var allowed_targets = ApiTokenValid ? _context.Recipe : _context.Recipe;
      var item = (from target in allowed_targets
              select target)
              .Select(SimpleModelsAndRelations.Models.Recipe.FilterViewableAttributes(current_User))
              .FirstOrDefault(t => t.Id == Recipe_id);

      item = SimpleModelsAndRelations.Models.Recipe.WithoutImages(item);
      return item;
    }

    
    [RestrictToUserType(new string[] {"*"})]
    [HttpGet("{id}")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public ItemWithEditable<Homepage> GetById(int id)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_items = ApiTokenValid ? _context.Homepage : _context.Homepage;
      var editable_items = ApiTokenValid ? _context.Homepage : _context.Homepage;
      var item = SimpleModelsAndRelations.Models.Homepage.FilterViewableAttributesLocal(current_User)(allowed_items.FirstOrDefault(e => e.Id == id));
      item = SimpleModelsAndRelations.Models.Homepage.WithoutImages(item);
      return new ItemWithEditable<Homepage>() {
        Item = item,
        Editable = editable_items.Any(e => e.Id == item.Id) };
    }
    

    [RestrictToUserType(new string[] {})]
    [HttpPost]
    [ValidateAntiForgeryToken]
    public Homepage Create()
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var can_create_by_token = ApiTokenValid || true;
      if (!can_create_by_token)
        throw new Exception("Unauthorized create attempt");
      var item = new Homepage() { CreatedDate = DateTime.Now, Id = _context.Homepage.Max(i => i.Id) + 1 };
      _context.Homepage.Add(SimpleModelsAndRelations.Models.Homepage.FilterViewableAttributesLocal(current_User)(item));
      _context.SaveChanges();
      item = SimpleModelsAndRelations.Models.Homepage.WithoutImages(item);
      return item;
    }

    [RestrictToUserType(new string[] {"*"})]
    [HttpPut]
    [ValidateAntiForgeryToken]
    public void Update([FromBody] Homepage item)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_items = ApiTokenValid ? _context.Homepage : _context.Homepage;
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
      var allowed_items = ApiTokenValid ? _context.Homepage : _context.Homepage;
      var item = _context.Homepage.FirstOrDefault(e => e.Id == id);
      var can_delete_by_token = ApiTokenValid || true;
      if (item == null || !can_delete_by_token)
        throw new Exception("Unauthorized delete attempt");
      
      if (!allowed_items.Any(a => a.Id == item.Id)) throw new Exception("Unauthorized delete attempt");
      
      _context.Homepage.Remove(item);
      _context.SaveChanges();
    }

    [RestrictToUserType(new string[] {"*"})]
    [HttpGet]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public Page<Homepage> GetAll([FromQuery] int page_index, [FromQuery] int page_size = 25)
    {
      var session = HttpContext.Get<LoggableEntities>(_context);
      var current_User = session == null ? null : session.User;
      var allowed_items = ApiTokenValid ? _context.Homepage : _context.Homepage;
      var editable_items = ApiTokenValid ? _context.Homepage : _context.Homepage;
      var can_edit_by_token = ApiTokenValid || true;
      var can_create_by_token = ApiTokenValid || true;
      var can_delete_by_token = ApiTokenValid || true;
      return allowed_items
        .Select(SimpleModelsAndRelations.Models.Homepage.FilterViewableAttributes(current_User))
        .Select(s => Tuple.Create(s, can_edit_by_token && editable_items.Any(es => es.Id == s.Id)))
        .Paginate(can_create_by_token, can_delete_by_token, false, page_index, page_size, SimpleModelsAndRelations.Models.Homepage.WithoutImages, item => item);
    }

    


    /*
    static public void CleanupNullRelations(SimpleModelsAndRelationsContext _context) {
    
      _context.Asian_Recipe.RemoveRange(_context.Asian_Recipe.Where(l =>
        l.AsianId == null ||
        l.RecipeId == null ||
        !_context.Asian.Any(s => s.Id == l.AsianId) ||
        !_context.Recipe.Any(s => s.Id == l.RecipeId)));
      _context.SaveChanges();
    

      _context.Asian_Recipe.RemoveRange(_context.Asian_Recipe.Where(l =>
        l.RecipeId == null ||
        l.AsianId == null ||
        !_context.Recipe.Any(s => s.Id == l.RecipeId) ||
        !_context.Asian.Any(s => s.Id == l.AsianId)));
      _context.SaveChanges();
    

      _context.Mediterranean_Recipe.RemoveRange(_context.Mediterranean_Recipe.Where(l =>
        l.MediterraneanId == null ||
        l.RecipeId == null ||
        !_context.Mediterranean.Any(s => s.Id == l.MediterraneanId) ||
        !_context.Recipe.Any(s => s.Id == l.RecipeId)));
      _context.SaveChanges();
    

      _context.Mediterranean_Recipe.RemoveRange(_context.Mediterranean_Recipe.Where(l =>
        l.RecipeId == null ||
        l.MediterraneanId == null ||
        !_context.Recipe.Any(s => s.Id == l.RecipeId) ||
        !_context.Mediterranean.Any(s => s.Id == l.MediterraneanId)));
      _context.SaveChanges();
    

      _context.Grill_Recipe.RemoveRange(_context.Grill_Recipe.Where(l =>
        l.GrillId == null ||
        l.RecipeId == null ||
        !_context.Grill.Any(s => s.Id == l.GrillId) ||
        !_context.Recipe.Any(s => s.Id == l.RecipeId)));
      _context.SaveChanges();
    

      _context.Grill_Recipe.RemoveRange(_context.Grill_Recipe.Where(l =>
        l.RecipeId == null ||
        l.GrillId == null ||
        !_context.Recipe.Any(s => s.Id == l.RecipeId) ||
        !_context.Grill.Any(s => s.Id == l.GrillId)));
      _context.SaveChanges();
    

      _context.Breakfast_Recipe.RemoveRange(_context.Breakfast_Recipe.Where(l =>
        l.BreakfastId == null ||
        l.RecipeId == null ||
        !_context.Breakfast.Any(s => s.Id == l.BreakfastId) ||
        !_context.Recipe.Any(s => s.Id == l.RecipeId)));
      _context.SaveChanges();
    

      _context.Breakfast_Recipe.RemoveRange(_context.Breakfast_Recipe.Where(l =>
        l.RecipeId == null ||
        l.BreakfastId == null ||
        !_context.Recipe.Any(s => s.Id == l.RecipeId) ||
        !_context.Breakfast.Any(s => s.Id == l.BreakfastId)));
      _context.SaveChanges();
    

      _context.Brunch_Recipe.RemoveRange(_context.Brunch_Recipe.Where(l =>
        l.BrunchId == null ||
        l.RecipeId == null ||
        !_context.Brunch.Any(s => s.Id == l.BrunchId) ||
        !_context.Recipe.Any(s => s.Id == l.RecipeId)));
      _context.SaveChanges();
    

      _context.Brunch_Recipe.RemoveRange(_context.Brunch_Recipe.Where(l =>
        l.RecipeId == null ||
        l.BrunchId == null ||
        !_context.Recipe.Any(s => s.Id == l.RecipeId) ||
        !_context.Brunch.Any(s => s.Id == l.BrunchId)));
      _context.SaveChanges();
    

      _context.Lunch_Recipe.RemoveRange(_context.Lunch_Recipe.Where(l =>
        l.LunchId == null ||
        l.RecipeId == null ||
        !_context.Lunch.Any(s => s.Id == l.LunchId) ||
        !_context.Recipe.Any(s => s.Id == l.RecipeId)));
      _context.SaveChanges();
    

      _context.Lunch_Recipe.RemoveRange(_context.Lunch_Recipe.Where(l =>
        l.RecipeId == null ||
        l.LunchId == null ||
        !_context.Recipe.Any(s => s.Id == l.RecipeId) ||
        !_context.Lunch.Any(s => s.Id == l.LunchId)));
      _context.SaveChanges();
    

      _context.Dinner_Recipe.RemoveRange(_context.Dinner_Recipe.Where(l =>
        l.DinnerId == null ||
        l.RecipeId == null ||
        !_context.Dinner.Any(s => s.Id == l.DinnerId) ||
        !_context.Recipe.Any(s => s.Id == l.RecipeId)));
      _context.SaveChanges();
    

      _context.Dinner_Recipe.RemoveRange(_context.Dinner_Recipe.Where(l =>
        l.RecipeId == null ||
        l.DinnerId == null ||
        !_context.Recipe.Any(s => s.Id == l.RecipeId) ||
        !_context.Dinner.Any(s => s.Id == l.DinnerId)));
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
    

      _context.User_Favorite.RemoveRange(_context.User_Favorite.Where(l =>
        l.UserId == null ||
        l.FavoriteId == null ||
        !_context.User.Any(s => s.Id == l.UserId) ||
        !_context.Favorite.Any(s => s.Id == l.FavoriteId)));
      _context.SaveChanges();
    

      _context.User_Favorite.RemoveRange(_context.User_Favorite.Where(l =>
        l.FavoriteId == null ||
        l.UserId == null ||
        !_context.Favorite.Any(s => s.Id == l.FavoriteId) ||
        !_context.User.Any(s => s.Id == l.UserId)));
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
    

      _context.Favorite_Recipe.RemoveRange(_context.Favorite_Recipe.Where(l =>
        l.FavoriteId == null ||
        l.RecipeId == null ||
        !_context.Favorite.Any(s => s.Id == l.FavoriteId) ||
        !_context.Recipe.Any(s => s.Id == l.RecipeId)));
      _context.SaveChanges();
    

      _context.Favorite_Recipe.RemoveRange(_context.Favorite_Recipe.Where(l =>
        l.RecipeId == null ||
        l.FavoriteId == null ||
        !_context.Recipe.Any(s => s.Id == l.RecipeId) ||
        !_context.Favorite.Any(s => s.Id == l.FavoriteId)));
      _context.SaveChanges();
    

      _context.Rating_Recipe.RemoveRange(_context.Rating_Recipe.Where(l =>
        l.RatingId == null ||
        l.RecipeId == null ||
        !_context.Rating.Any(s => s.Id == l.RatingId) ||
        !_context.Recipe.Any(s => s.Id == l.RecipeId)));
      _context.SaveChanges();
    

      _context.Rating_Recipe.RemoveRange(_context.Rating_Recipe.Where(l =>
        l.RecipeId == null ||
        l.RatingId == null ||
        !_context.Recipe.Any(s => s.Id == l.RecipeId) ||
        !_context.Rating.Any(s => s.Id == l.RatingId)));
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
    
    }
    */
    
  }

  