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


namespace SimpleModelsAndRelations.Controllers
{
  public class MyTuple <T,U>
{
   public T Item1;
   public U Item2;
  public MyTuple(T Item1, U Item2)
  {
    this.Item1 = Item1;
    this.Item2 = Item2;
  }
}
    [Route("api/v1/CustomController")]
  public class CustomController : Controller
  {
    private readonly MailOptions _mailOptions;
    public readonly SimpleModelsAndRelationsContext _context;

   public CustomController(SimpleModelsAndRelationsContext context, IOptions<MailOptions> mailOptionsAccessor)
    {
      _context = context;
      _mailOptions = mailOptionsAccessor.Value;
    }

    [RestrictToUserType(new string[] {"*"})]
  [HttpGet("FindRecipesFromMealAndCousine/{meal_id}/{cousine_id}")]
  public Recipe[] FindRecipesFromMealAndCousine(int meal_id, int cousine_id)
  {
  
   var found_recipes = (from Meal_Recipe in _context.Meal_Recipe
                          where(Meal_Recipe.MealId == meal_id)
                          from Cousine_Recipe in _context.Cuisine_Recipe
                          where (Cousine_Recipe.CuisineId == cousine_id) && (Cousine_Recipe.RecipeId == Meal_Recipe.RecipeId) 
                          from recipe in _context.Recipe
                          where (recipe.Id == Meal_Recipe.RecipeId) && recipe.Id == Cousine_Recipe.RecipeId
                          select recipe).ToArray();
    

    return found_recipes;
  }

    [RestrictToUserType(new string[] {"*"})]
  [HttpGet("FindRating/{recipe_id}/{user_id}")]
  public Rating FindRating(int recipe_id, int user_id)
  {
  
   var found_rating = (from recipe_rating in _context.Recipe_Rating
                          where(recipe_rating.RecipeId == recipe_id)
                          from  user_rating in _context.User_Rating
                          where (user_rating.UserId == user_id) && (recipe_rating.RatingId == user_rating.RatingId)
                          from Rating in _context.Rating
                          where (Rating.Id == user_rating.RatingId &&  Rating.Id == recipe_rating.RatingId)
                          select Rating).FirstOrDefault();
    

   Console.WriteLine("Rating is found",found_rating);
    return found_rating;
  }
    

 [RestrictToUserType(new string[] {"*"})]
  [HttpPost("UserRating/{rating}/{recipe_id}/{user_id}")]
  public void UserRating (int rating,int recipe_id, int user_id)
  {
    var stored_rating = (from recipe_rating in _context.Recipe_Rating
                          where(recipe_rating.RecipeId == recipe_id)
                          from  user_rating in _context.User_Rating
                          where (user_rating.UserId == user_id) && (recipe_rating.RatingId == user_rating.RatingId)
                          from Rating in _context.Rating
                          where (Rating.Id == user_rating.RatingId &&  Rating.Id == recipe_rating.RatingId)
                          select Rating).FirstOrDefault();

   if(stored_rating == null){
      System.Console.WriteLine("did not found one!");

      Rating newRating = new Rating(){ Number = rating, Id = _context.Rating.Max(elem => elem.Id) + 1 };
      _context.Rating.Add(newRating);

     User_Rating newUser_Rating = new User_Rating(){ UserId = user_id, RatingId = newRating.Id };
      _context.User_Rating.Add(newUser_Rating);

     Recipe_Rating newRecipe_Rating = new Recipe_Rating(){ RecipeId = recipe_id, RatingId = newRating.Id };
      _context.Recipe_Rating.Add(newRecipe_Rating);
    }
    else{
      System.Console.WriteLine("found one!");
      stored_rating.Number = rating;
    }
   _context.SaveChanges();  
    
  }
  }

  }
    

