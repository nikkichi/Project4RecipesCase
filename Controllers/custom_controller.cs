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
    [Route("customcontroller")]
  public class CustomController : Controller
  {
    private readonly MailOptions _mailOptions;
    private readonly SimpleModelsAndRelationsContext _context;

   public CustomController(SimpleModelsAndRelationsContext context, IOptions<MailOptions> mailOptionsAccessor)
    {
      _context = context;
      _mailOptions = mailOptionsAccessor.Value;
    }
    [RestrictToUserType(new string[] {"*"})]
  [HttpGet("FindRating/{id}/{idRating}/{idRecipe}")]
  public Rating[] FindRating(int id,int idRating, int idRecipe)
  {
    var  find_rating = (from _findrating in _context.Recipe_Rating
                     where(_findrating.Id == id) && (_findrating.RatingId == idRating) && (_findrating.RecipeId == idRecipe)
                     from ratings in _context.Rating
                     where (ratings.Id == idRating)
                     select ratings
                       );
    if(find_rating == null) throw new Exception("Rating not found");
    return find_rating.ToArray();
    
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
    // public void get_rating(int ratingid, int userid, int recipeid)
    //     { 
    //         var getrating = ();
    //                         //2 from _getrating in _context.Rating
    //                         // where (_getrating.Id ==  ratingid)
    //                         // select 
    //                         // )

    //                         // 1 from _getrating in _context.Rating 
    //                         // where (ratingid == _getrating.Id)
    //                         // from  _getreciperating in _context.Recipe_Rating
    //                         // where (_getrating.Id == _getreciperating.RatingId)
    //                         // from _getrecipe in _context.Recipe
    //                         // where (_getreciperating.RecipeId == _getrecipe.Id)
    //                         // select _getrecipe
    //                         // );

    //         _context.SaveChanges
    //         //linq
    //         return;
    //     }


   _context.SaveChanges();  
    
  }


  }
    

}