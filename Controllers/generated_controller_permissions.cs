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
    static public bool can_view_Meal() { return true; }

    static public bool can_create_Meal() { return false; }

    static public bool can_edit_Meal() { return true; }

    static public bool can_delete_Meal() { return false; }
      
  

    
static public bool can_view_Asian() { return true; }

    static public bool can_create_Asian() { return true; }

    static public bool can_edit_Asian() { return true; }

    static public bool can_delete_Asian() { return true; }
      
  

    
static public bool can_view_Cuisine() { return true; }

    static public bool can_create_Cuisine() { return true; }

    static public bool can_edit_Cuisine() { return true; }

    static public bool can_delete_Cuisine() { return true; }
      
  

    
static public bool can_view_PreparationTime() { return true; }

    static public bool can_create_PreparationTime() { return false; }

    static public bool can_edit_PreparationTime() { return true; }

    static public bool can_delete_PreparationTime() { return false; }
      
  

    
static public bool can_view_Lunch() { return true; }

    static public bool can_create_Lunch() { return false; }

    static public bool can_edit_Lunch() { return true; }

    static public bool can_delete_Lunch() { return false; }
      
  

    
static public bool can_view_Homepage() { return true; }

    static public bool can_create_Homepage() { return false; }

    static public bool can_edit_Homepage() { return true; }

    static public bool can_delete_Homepage() { return false; }
      
  

    
static public bool can_view_Brunch() { return true; }

    static public bool can_create_Brunch() { return false; }

    static public bool can_edit_Brunch() { return true; }

    static public bool can_delete_Brunch() { return false; }
      
  

    
static public bool can_view_Recipe() { return true; }

    static public bool can_create_Recipe() { return false; }

    static public bool can_edit_Recipe() { return true; }

    static public bool can_delete_Recipe() { return false; }
      
    static public bool can_view_Recipe_Name() { return true; }

    static public bool can_edit_Recipe_Name() { return true; }
    
  static public bool can_view_Recipe_Description() { return true; }

    static public bool can_edit_Recipe_Description() { return true; }
    
  static public bool can_view_Recipe_RatingType() { return true; }

    static public bool can_edit_Recipe_RatingType() { return true; }
    
  static public bool can_view_Recipe_Ingredients() { return true; }

    static public bool can_edit_Recipe_Ingredients() { return true; }
    
  static public bool can_view_Recipe_CuisineType() { return true; }

    static public bool can_edit_Recipe_CuisineType() { return true; }
    
  static public bool can_view_Recipe_MealType() { return true; }

    static public bool can_edit_Recipe_MealType() { return true; }
    
  static public bool can_view_Recipe_PreparationType() { return true; }

    static public bool can_edit_Recipe_PreparationType() { return true; }
    

    
static public bool can_view_Dinner() { return true; }

    static public bool can_create_Dinner() { return false; }

    static public bool can_edit_Dinner() { return true; }

    static public bool can_delete_Dinner() { return false; }
      
  

    
static public bool can_view_Mediterranean() { return true; }

    static public bool can_create_Mediterranean() { return true; }

    static public bool can_edit_Mediterranean() { return true; }

    static public bool can_delete_Mediterranean() { return true; }
      
  

    
static public bool can_view_Breakfast() { return true; }

    static public bool can_create_Breakfast() { return false; }

    static public bool can_edit_Breakfast() { return true; }

    static public bool can_delete_Breakfast() { return false; }
      
  

    
static public bool can_view_Grill() { return true; }

    static public bool can_create_Grill() { return true; }

    static public bool can_edit_Grill() { return true; }

    static public bool can_delete_Grill() { return true; }
      
  

    

    
  }
}
