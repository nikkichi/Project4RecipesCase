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


namespace SimpleModelsAndRelations.Models
{
  public static class Permissions {
    static public bool can_view_nintee(User current_User) { return true; }

    static public bool can_create_nintee(User current_User) { return false; }

    static public bool can_edit_nintee(User current_User) { return true; }

    static public bool can_delete_nintee(User current_User) { return false; }
      
    static public bool can_view_nintee_Description(User current_User) { return true; }

    static public bool can_edit_nintee_Description(User current_User) { return true; }
    

    
static public bool can_view_thirty(User current_User) { return true; }

    static public bool can_create_thirty(User current_User) { return false; }

    static public bool can_edit_thirty(User current_User) { return true; }

    static public bool can_delete_thirty(User current_User) { return false; }
      
    static public bool can_view_thirty_Description(User current_User) { return true; }

    static public bool can_edit_thirty_Description(User current_User) { return true; }
    

    
static public bool can_view_Meal(User current_User) { return true; }

    static public bool can_create_Meal(User current_User) { return false; }

    static public bool can_edit_Meal(User current_User) { return true; }

    static public bool can_delete_Meal(User current_User) { return false; }
      
  

    
static public bool can_view_Asian(User current_User) { return true; }

    static public bool can_create_Asian(User current_User) { return true; }

    static public bool can_edit_Asian(User current_User) { return true; }

    static public bool can_delete_Asian(User current_User) { return true; }
      
  

    
static public bool can_view_Cuisine(User current_User) { return true; }

    static public bool can_create_Cuisine(User current_User) { return true; }

    static public bool can_edit_Cuisine(User current_User) { return true; }

    static public bool can_delete_Cuisine(User current_User) { return true; }
      
  

    
static public bool can_view_PreparationTime(User current_User) { return true; }

    static public bool can_create_PreparationTime(User current_User) { return false; }

    static public bool can_edit_PreparationTime(User current_User) { return true; }

    static public bool can_delete_PreparationTime(User current_User) { return false; }
      
  

    
static public bool can_view_sixty(User current_User) { return true; }

    static public bool can_create_sixty(User current_User) { return false; }

    static public bool can_edit_sixty(User current_User) { return true; }

    static public bool can_delete_sixty(User current_User) { return false; }
      
    static public bool can_view_sixty_Description(User current_User) { return true; }

    static public bool can_edit_sixty_Description(User current_User) { return true; }
    

    
static public bool can_view_RecommendationPage(User current_User) { return true; }

    static public bool can_create_RecommendationPage(User current_User) { return false; }

    static public bool can_edit_RecommendationPage(User current_User) { return true; }

    static public bool can_delete_RecommendationPage(User current_User) { return false; }
      
  

    
static public bool can_view_Lunch(User current_User) { return true; }

    static public bool can_create_Lunch(User current_User) { return false; }

    static public bool can_edit_Lunch(User current_User) { return true; }

    static public bool can_delete_Lunch(User current_User) { return false; }
      
  

    
static public bool can_view_User(User current_User) { return true; }

    static public bool can_create_User(User current_User) { return true; }

    static public bool can_edit_User(User current_User) { return true; }

    static public bool can_delete_User(User current_User) { return true; }
      
    static public bool can_view_User_Username(User current_User) { return true; }

    static public bool can_edit_User_Username(User current_User) { return true; }
    
  static public bool can_view_User_Language(User current_User) { return true; }

    static public bool can_edit_User_Language(User current_User) { return true; }
    
  static public bool can_view_User_Email(User current_User) { return true; }

    static public bool can_edit_User_Email(User current_User) { return true; }
    

    
static public bool can_view_Homepage(User current_User) { return true; }

    static public bool can_create_Homepage(User current_User) { return false; }

    static public bool can_edit_Homepage(User current_User) { return true; }

    static public bool can_delete_Homepage(User current_User) { return false; }
      
  

    
static public bool can_view_Brunch(User current_User) { return true; }

    static public bool can_create_Brunch(User current_User) { return false; }

    static public bool can_edit_Brunch(User current_User) { return true; }

    static public bool can_delete_Brunch(User current_User) { return false; }
      
  

    
static public bool can_view_Recipe(User current_User) { return true; }

    static public bool can_create_Recipe(User current_User) { return false; }

    static public bool can_edit_Recipe(User current_User) { return true; }

    static public bool can_delete_Recipe(User current_User) { return false; }
      
    static public bool can_view_Recipe_Name(User current_User) { return true; }

    static public bool can_edit_Recipe_Name(User current_User) { return true; }
    
  static public bool can_view_Recipe_Ingredients(User current_User) { return true; }

    static public bool can_edit_Recipe_Ingredients(User current_User) { return true; }
    
  static public bool can_view_Recipe_Description(User current_User) { return true; }

    static public bool can_edit_Recipe_Description(User current_User) { return true; }
    
  static public bool can_view_Recipe_RatingType(User current_User) { return true; }

    static public bool can_edit_Recipe_RatingType(User current_User) { return true; }
    
  static public bool can_view_Recipe_Picture(User current_User) { return true; }

    static public bool can_edit_Recipe_Picture(User current_User) { return true; }
    

    
static public bool can_view_Dinner(User current_User) { return true; }

    static public bool can_create_Dinner(User current_User) { return false; }

    static public bool can_edit_Dinner(User current_User) { return true; }

    static public bool can_delete_Dinner(User current_User) { return false; }
      
  

    
static public bool can_view_Mediterranean(User current_User) { return true; }

    static public bool can_create_Mediterranean(User current_User) { return true; }

    static public bool can_edit_Mediterranean(User current_User) { return true; }

    static public bool can_delete_Mediterranean(User current_User) { return true; }
      
  

    
static public bool can_view_Breakfast(User current_User) { return true; }

    static public bool can_create_Breakfast(User current_User) { return false; }

    static public bool can_edit_Breakfast(User current_User) { return true; }

    static public bool can_delete_Breakfast(User current_User) { return false; }
      
  

    
static public bool can_view_Favorite(User current_User) { return true; }

    static public bool can_create_Favorite(User current_User) { return false; }

    static public bool can_edit_Favorite(User current_User) { return true; }

    static public bool can_delete_Favorite(User current_User) { return false; }
      
  

    
static public bool can_view_fifteen(User current_User) { return true; }

    static public bool can_create_fifteen(User current_User) { return false; }

    static public bool can_edit_fifteen(User current_User) { return true; }

    static public bool can_delete_fifteen(User current_User) { return false; }
      
    static public bool can_view_fifteen_Description(User current_User) { return true; }

    static public bool can_edit_fifteen_Description(User current_User) { return true; }
    

    
static public bool can_view_Rating(User current_User) { return true; }

    static public bool can_create_Rating(User current_User) { return false; }

    static public bool can_edit_Rating(User current_User) { return true; }

    static public bool can_delete_Rating(User current_User) { return false; }
      
  

    
static public bool can_view_Grill(User current_User) { return true; }

    static public bool can_create_Grill(User current_User) { return true; }

    static public bool can_edit_Grill(User current_User) { return true; }

    static public bool can_delete_Grill(User current_User) { return true; }
      
  

    

    static public bool can_view_Asian_Recipe(User current_User) { return true; }

    static public bool can_create_Asian_Recipe(User current_User) { return true; }

    static public bool can_edit_Asian_Recipe(User current_User) { return true; }

    static public bool can_delete_Asian_Recipe(User current_User) { return true; }
static public bool can_view_Mediterranean_Recipe(User current_User) { return true; }

    static public bool can_create_Mediterranean_Recipe(User current_User) { return true; }

    static public bool can_edit_Mediterranean_Recipe(User current_User) { return true; }

    static public bool can_delete_Mediterranean_Recipe(User current_User) { return true; }
static public bool can_view_Grill_Recipe(User current_User) { return true; }

    static public bool can_create_Grill_Recipe(User current_User) { return true; }

    static public bool can_edit_Grill_Recipe(User current_User) { return true; }

    static public bool can_delete_Grill_Recipe(User current_User) { return true; }
static public bool can_view_Breakfast_Recipe(User current_User) { return true; }

    static public bool can_create_Breakfast_Recipe(User current_User) { return true; }

    static public bool can_edit_Breakfast_Recipe(User current_User) { return true; }

    static public bool can_delete_Breakfast_Recipe(User current_User) { return true; }
static public bool can_view_Brunch_Recipe(User current_User) { return true; }

    static public bool can_create_Brunch_Recipe(User current_User) { return true; }

    static public bool can_edit_Brunch_Recipe(User current_User) { return true; }

    static public bool can_delete_Brunch_Recipe(User current_User) { return true; }
static public bool can_view_Lunch_Recipe(User current_User) { return true; }

    static public bool can_create_Lunch_Recipe(User current_User) { return true; }

    static public bool can_edit_Lunch_Recipe(User current_User) { return true; }

    static public bool can_delete_Lunch_Recipe(User current_User) { return true; }
static public bool can_view_Dinner_Recipe(User current_User) { return true; }

    static public bool can_create_Dinner_Recipe(User current_User) { return true; }

    static public bool can_edit_Dinner_Recipe(User current_User) { return true; }

    static public bool can_delete_Dinner_Recipe(User current_User) { return true; }
static public bool can_view_PreparationTime_Recipe(User current_User) { return true; }

    static public bool can_create_PreparationTime_Recipe(User current_User) { return true; }

    static public bool can_edit_PreparationTime_Recipe(User current_User) { return true; }

    static public bool can_delete_PreparationTime_Recipe(User current_User) { return true; }
static public bool can_view_User_Favorite(User current_User) { return true; }

    static public bool can_create_User_Favorite(User current_User) { return true; }

    static public bool can_edit_User_Favorite(User current_User) { return true; }

    static public bool can_delete_User_Favorite(User current_User) { return true; }
static public bool can_view_User_Rating(User current_User) { return true; }

    static public bool can_create_User_Rating(User current_User) { return true; }

    static public bool can_edit_User_Rating(User current_User) { return true; }

    static public bool can_delete_User_Rating(User current_User) { return true; }
static public bool can_view_User_RecommendationPage(User current_User) { return true; }

    static public bool can_create_User_RecommendationPage(User current_User) { return true; }

    static public bool can_edit_User_RecommendationPage(User current_User) { return true; }

    static public bool can_delete_User_RecommendationPage(User current_User) { return true; }
static public bool can_view_Favorite_Recipe(User current_User) { return true; }

    static public bool can_create_Favorite_Recipe(User current_User) { return true; }

    static public bool can_edit_Favorite_Recipe(User current_User) { return true; }

    static public bool can_delete_Favorite_Recipe(User current_User) { return true; }
static public bool can_view_Rating_Recipe(User current_User) { return true; }

    static public bool can_create_Rating_Recipe(User current_User) { return true; }

    static public bool can_edit_Rating_Recipe(User current_User) { return true; }

    static public bool can_delete_Rating_Recipe(User current_User) { return true; }
static public bool can_view_RecommendationPage_Recipe(User current_User) { return true; }

    static public bool can_create_RecommendationPage_Recipe(User current_User) { return true; }

    static public bool can_edit_RecommendationPage_Recipe(User current_User) { return true; }

    static public bool can_delete_RecommendationPage_Recipe(User current_User) { return true; }
static public bool can_view_Homepage_Recipe(User current_User) { return true; }

    static public bool can_create_Homepage_Recipe(User current_User) { return true; }

    static public bool can_edit_Homepage_Recipe(User current_User) { return true; }

    static public bool can_delete_Homepage_Recipe(User current_User) { return true; }
  }
}
