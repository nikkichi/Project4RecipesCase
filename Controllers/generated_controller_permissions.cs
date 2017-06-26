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
    static public bool can_view_Thirty(User current_User) { return true; }

    static public bool can_create_Thirty(User current_User) { return false; }

    static public bool can_edit_Thirty(User current_User) { return true; }

    static public bool can_delete_Thirty(User current_User) { return false; }
      
    static public bool can_view_Thirty_Description(User current_User) { return true; }

    static public bool can_edit_Thirty_Description(User current_User) { return true; }
    

    
static public bool can_view_Meal(User current_User) { return true; }

    static public bool can_create_Meal(User current_User) { return false; }

    static public bool can_edit_Meal(User current_User) { return true; }

    static public bool can_delete_Meal(User current_User) { return false; }
      
  

    
static public bool can_view_Asian(User current_User) { return true; }

    static public bool can_create_Asian(User current_User) { return true; }

    static public bool can_edit_Asian(User current_User) { return true; }

    static public bool can_delete_Asian(User current_User) { return true; }
      
    static public bool can_view_Asian_Description(User current_User) { return true; }

    static public bool can_edit_Asian_Description(User current_User) { return true; }
    

    
static public bool can_view_Cuisine(User current_User) { return true; }

    static public bool can_create_Cuisine(User current_User) { return true; }

    static public bool can_edit_Cuisine(User current_User) { return true; }

    static public bool can_delete_Cuisine(User current_User) { return true; }
      
  

    
static public bool can_view_PreparationTime(User current_User) { return true; }

    static public bool can_create_PreparationTime(User current_User) { return false; }

    static public bool can_edit_PreparationTime(User current_User) { return true; }

    static public bool can_delete_PreparationTime(User current_User) { return false; }
      
  

    
static public bool can_view_Sixty(User current_User) { return true; }

    static public bool can_create_Sixty(User current_User) { return false; }

    static public bool can_edit_Sixty(User current_User) { return true; }

    static public bool can_delete_Sixty(User current_User) { return false; }
      
    static public bool can_view_Sixty_Description(User current_User) { return true; }

    static public bool can_edit_Sixty_Description(User current_User) { return true; }
    

    
static public bool can_view_RecommendationPage(User current_User) { return true; }

    static public bool can_create_RecommendationPage(User current_User) { return false; }

    static public bool can_edit_RecommendationPage(User current_User) { return true; }

    static public bool can_delete_RecommendationPage(User current_User) { return false; }
      
  

    
static public bool can_view_Favourite(User current_User) { return true; }

    static public bool can_create_Favourite(User current_User) { return false; }

    static public bool can_edit_Favourite(User current_User) { return true; }

    static public bool can_delete_Favourite(User current_User) { return false; }
      
    static public bool can_view_Favourite_FavouriteView(User current_User) { return true; }

    static public bool can_edit_Favourite_FavouriteView(User current_User) { return true; }
    

    
static public bool can_view_Browse(User current_User) { return true; }

    static public bool can_create_Browse(User current_User) { return false; }

    static public bool can_edit_Browse(User current_User) { return true; }

    static public bool can_delete_Browse(User current_User) { return false; }
      
    static public bool can_view_Browse_BrowseView(User current_User) { return true; }

    static public bool can_edit_Browse_BrowseView(User current_User) { return true; }
    

    
static public bool can_view_Lunch(User current_User) { return true; }

    static public bool can_create_Lunch(User current_User) { return false; }

    static public bool can_edit_Lunch(User current_User) { return true; }

    static public bool can_delete_Lunch(User current_User) { return false; }
      
    static public bool can_view_Lunch_Description(User current_User) { return true; }

    static public bool can_edit_Lunch_Description(User current_User) { return true; }
    

    
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
      
    static public bool can_view_Homepage_AppTest(User current_User) { return true; }

    static public bool can_edit_Homepage_AppTest(User current_User) { return true; }
    
  static public bool can_view_Homepage_Test(User current_User) { return true; }

    static public bool can_edit_Homepage_Test(User current_User) { return true; }
    

    
static public bool can_view_Brunch(User current_User) { return true; }

    static public bool can_create_Brunch(User current_User) { return false; }

    static public bool can_edit_Brunch(User current_User) { return true; }

    static public bool can_delete_Brunch(User current_User) { return false; }
      
    static public bool can_view_Brunch_Description(User current_User) { return true; }

    static public bool can_edit_Brunch_Description(User current_User) { return true; }
    

    
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
    
  static public bool can_view_Recipe_Picture(User current_User) { return true; }

    static public bool can_edit_Recipe_Picture(User current_User) { return true; }
    

    
static public bool can_view_Dinner(User current_User) { return true; }

    static public bool can_create_Dinner(User current_User) { return false; }

    static public bool can_edit_Dinner(User current_User) { return true; }

    static public bool can_delete_Dinner(User current_User) { return false; }
      
    static public bool can_view_Dinner_Description(User current_User) { return true; }

    static public bool can_edit_Dinner_Description(User current_User) { return true; }
    

    
static public bool can_view_Mediterranean(User current_User) { return true; }

    static public bool can_create_Mediterranean(User current_User) { return true; }

    static public bool can_edit_Mediterranean(User current_User) { return true; }

    static public bool can_delete_Mediterranean(User current_User) { return true; }
      
    static public bool can_view_Mediterranean_Description(User current_User) { return true; }

    static public bool can_edit_Mediterranean_Description(User current_User) { return true; }
    

    
static public bool can_view_Ninety(User current_User) { return true; }

    static public bool can_create_Ninety(User current_User) { return false; }

    static public bool can_edit_Ninety(User current_User) { return true; }

    static public bool can_delete_Ninety(User current_User) { return false; }
      
    static public bool can_view_Ninety_Description(User current_User) { return true; }

    static public bool can_edit_Ninety_Description(User current_User) { return true; }
    

    
static public bool can_view_Breakfast(User current_User) { return true; }

    static public bool can_create_Breakfast(User current_User) { return false; }

    static public bool can_edit_Breakfast(User current_User) { return true; }

    static public bool can_delete_Breakfast(User current_User) { return false; }
      
    static public bool can_view_Breakfast_Description(User current_User) { return true; }

    static public bool can_edit_Breakfast_Description(User current_User) { return true; }
    

    
static public bool can_view_Fifteen(User current_User) { return true; }

    static public bool can_create_Fifteen(User current_User) { return false; }

    static public bool can_edit_Fifteen(User current_User) { return true; }

    static public bool can_delete_Fifteen(User current_User) { return false; }
      
    static public bool can_view_Fifteen_Description(User current_User) { return true; }

    static public bool can_edit_Fifteen_Description(User current_User) { return true; }
    

    
static public bool can_view_Rating(User current_User) { return true; }

    static public bool can_create_Rating(User current_User) { return false; }

    static public bool can_edit_Rating(User current_User) { return true; }

    static public bool can_delete_Rating(User current_User) { return false; }
      
    static public bool can_view_Rating_Number(User current_User) { return true; }

    static public bool can_edit_Rating_Number(User current_User) { return true; }
    

    
static public bool can_view_Grill(User current_User) { return true; }

    static public bool can_create_Grill(User current_User) { return true; }

    static public bool can_edit_Grill(User current_User) { return true; }

    static public bool can_delete_Grill(User current_User) { return true; }
      
    static public bool can_view_Grill_Description(User current_User) { return true; }

    static public bool can_edit_Grill_Description(User current_User) { return true; }
    

    

    static public bool can_view_Cuisine_Meal(User current_User) { return true; }

    static public bool can_create_Cuisine_Meal(User current_User) { return true; }

    static public bool can_edit_Cuisine_Meal(User current_User) { return true; }

    static public bool can_delete_Cuisine_Meal(User current_User) { return true; }
static public bool can_view_Meal_Recipe(User current_User) { return true; }

    static public bool can_create_Meal_Recipe(User current_User) { return true; }

    static public bool can_edit_Meal_Recipe(User current_User) { return true; }

    static public bool can_delete_Meal_Recipe(User current_User) { return true; }
static public bool can_view_PreparationTime_Recipe(User current_User) { return true; }

    static public bool can_create_PreparationTime_Recipe(User current_User) { return true; }

    static public bool can_edit_PreparationTime_Recipe(User current_User) { return true; }

    static public bool can_delete_PreparationTime_Recipe(User current_User) { return true; }
static public bool can_view_User_Recipe(User current_User) { return true; }

    static public bool can_create_User_Recipe(User current_User) { return true; }

    static public bool can_edit_User_Recipe(User current_User) { return true; }

    static public bool can_delete_User_Recipe(User current_User) { return true; }
static public bool can_view_Recipe_Rating(User current_User) { return true; }

    static public bool can_create_Recipe_Rating(User current_User) { return true; }

    static public bool can_edit_Recipe_Rating(User current_User) { return true; }

    static public bool can_delete_Recipe_Rating(User current_User) { return true; }
static public bool can_view_User_RecommendationPage(User current_User) { return true; }

    static public bool can_create_User_RecommendationPage(User current_User) { return true; }

    static public bool can_edit_User_RecommendationPage(User current_User) { return true; }

    static public bool can_delete_User_RecommendationPage(User current_User) { return true; }
static public bool can_view_RecommendationPage_Recipe(User current_User) { return true; }

    static public bool can_create_RecommendationPage_Recipe(User current_User) { return true; }

    static public bool can_edit_RecommendationPage_Recipe(User current_User) { return true; }

    static public bool can_delete_RecommendationPage_Recipe(User current_User) { return true; }
  }
}
