using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace SimpleModelsAndRelations.Models
{
    public partial class Meal: IEntity {
    public Meal() {
      
    }
    public int Id {get;set;}
    
    [Newtonsoft.Json.JsonProperty(ItemConverterType = typeof(Newtonsoft.Json.Converters.JavaScriptDateTimeConverter))] public DateTime CreatedDate{ get; set; }
    public string Kind {get { return this is Lunch ? "Lunch": this is Brunch ? "Brunch": this is Dinner ? "Dinner": this is Breakfast ? "Breakfast" : null; } }
    
    
    static public Expression<Func<Meal,Meal>> FilterViewableAttributes() {
      return self => self;
    }
    static public Func<Meal,Meal> FilterViewableAttributesLocal() {
      return self => self;
    }
    static public Meal WithoutImages(Meal self) {
      
      return self;
    }
  }

  
  
  public partial class Asian: Cuisine {
    public Asian() {
      
    }
    
    
        
    
    static new public Expression<Func<Asian,Asian>> FilterViewableAttributes() {
      return self => self;
    }
    static public new Func<Asian,Asian> FilterViewableAttributesLocal() {
      return self => self;
    }
    static public Asian WithoutImages(Asian self) {
      
      return self;
    }
  }

  
  
  public partial class Cuisine: IEntity {
    public Cuisine() {
      
    }
    public int Id {get;set;}
    
    [Newtonsoft.Json.JsonProperty(ItemConverterType = typeof(Newtonsoft.Json.Converters.JavaScriptDateTimeConverter))] public DateTime CreatedDate{ get; set; }
    public string Kind {get { return this is Asian ? "Asian": this is Mediterranean ? "Mediterranean": this is Grill ? "Grill" : null; } }
    
    
    static public Expression<Func<Cuisine,Cuisine>> FilterViewableAttributes() {
      return self => self;
    }
    static public Func<Cuisine,Cuisine> FilterViewableAttributesLocal() {
      return self => self;
    }
    static public Cuisine WithoutImages(Cuisine self) {
      
      return self;
    }
  }

  
  
  public partial class PreparationTime: IEntity {
    public PreparationTime() {
      
    }
    public int Id {get;set;}
    
    [Newtonsoft.Json.JsonProperty(ItemConverterType = typeof(Newtonsoft.Json.Converters.JavaScriptDateTimeConverter))] public DateTime CreatedDate{ get; set; }
        
    
    static public Expression<Func<PreparationTime,PreparationTime>> FilterViewableAttributes() {
      return self => self;
    }
    static public Func<PreparationTime,PreparationTime> FilterViewableAttributesLocal() {
      return self => self;
    }
    static public PreparationTime WithoutImages(PreparationTime self) {
      
      return self;
    }
  }

  
  
  public partial class Lunch: Meal {
    public Lunch() {
      
    }
    
    
        
    
    static new public Expression<Func<Lunch,Lunch>> FilterViewableAttributes() {
      return self => self;
    }
    static public new Func<Lunch,Lunch> FilterViewableAttributesLocal() {
      return self => self;
    }
    static public Lunch WithoutImages(Lunch self) {
      
      return self;
    }
  }

  
  
  public partial class Homepage: IEntity {
    public Homepage() {
      
    }
    public int Id {get;set;}
    
    [Newtonsoft.Json.JsonProperty(ItemConverterType = typeof(Newtonsoft.Json.Converters.JavaScriptDateTimeConverter))] public DateTime CreatedDate{ get; set; }
        
    
    static public Expression<Func<Homepage,Homepage>> FilterViewableAttributes() {
      return self => self;
    }
    static public Func<Homepage,Homepage> FilterViewableAttributesLocal() {
      return self => self;
    }
    static public Homepage WithoutImages(Homepage self) {
      
      return self;
    }
  }

  
  
  public partial class Brunch: Meal {
    public Brunch() {
      
    }
    
    
        
    
    static new public Expression<Func<Brunch,Brunch>> FilterViewableAttributes() {
      return self => self;
    }
    static public new Func<Brunch,Brunch> FilterViewableAttributesLocal() {
      return self => self;
    }
    static public Brunch WithoutImages(Brunch self) {
      
      return self;
    }
  }

  
  
  public partial class Recipe: IEntity {
    public Recipe() {
      
    }
    public int Id {get;set;}
    
    [Newtonsoft.Json.JsonProperty(ItemConverterType = typeof(Newtonsoft.Json.Converters.JavaScriptDateTimeConverter))] public DateTime CreatedDate{ get; set; }
        public string Name {get;set;}
    public string Description {get;set;}
    public int RatingType {get;set;}
    public string Ingredients {get;set;}
    public string CuisineType {get;set;}
    public string MealType {get;set;}
    public string PreparationType {get;set;}
    
    static public Expression<Func<Recipe,Recipe>> FilterViewableAttributes() {
      return self => self;
    }
    static public Func<Recipe,Recipe> FilterViewableAttributesLocal() {
      return self => self;
    }
    static public Recipe WithoutImages(Recipe self) {
      
      return self;
    }
  }

  
  
  public partial class Dinner: Meal {
    public Dinner() {
      
    }
    
    
        
    
    static new public Expression<Func<Dinner,Dinner>> FilterViewableAttributes() {
      return self => self;
    }
    static public new Func<Dinner,Dinner> FilterViewableAttributesLocal() {
      return self => self;
    }
    static public Dinner WithoutImages(Dinner self) {
      
      return self;
    }
  }

  
  
  public partial class Mediterranean: Cuisine {
    public Mediterranean() {
      
    }
    
    
        
    
    static new public Expression<Func<Mediterranean,Mediterranean>> FilterViewableAttributes() {
      return self => self;
    }
    static public new Func<Mediterranean,Mediterranean> FilterViewableAttributesLocal() {
      return self => self;
    }
    static public Mediterranean WithoutImages(Mediterranean self) {
      
      return self;
    }
  }

  
  
  public partial class Breakfast: Meal {
    public Breakfast() {
      
    }
    
    
        
    
    static new public Expression<Func<Breakfast,Breakfast>> FilterViewableAttributes() {
      return self => self;
    }
    static public new Func<Breakfast,Breakfast> FilterViewableAttributesLocal() {
      return self => self;
    }
    static public Breakfast WithoutImages(Breakfast self) {
      
      return self;
    }
  }

  
  
  public partial class Grill: Cuisine {
    public Grill() {
      
    }
    
    
        
    
    static new public Expression<Func<Grill,Grill>> FilterViewableAttributes() {
      return self => self;
    }
    static public new Func<Grill,Grill> FilterViewableAttributesLocal() {
      return self => self;
    }
    static public Grill WithoutImages(Grill self) {
      
      return self;
    }
  }

  
  
  
  public partial class LoggableEntities {
  
}

  public partial class Session {
    public int Id {get;set;}
    public string CookieName {get;set;}
    public string Content {get;set;}
    public DateTime CreatedAt {get;set;}
  }
}
