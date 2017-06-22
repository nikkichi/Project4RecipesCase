using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace SimpleModelsAndRelations.Models
{
    public partial class nintee: PreparationTime {
    public nintee() {
      
    }
    
    
        
    
    static new public Expression<Func<nintee,nintee>> FilterViewableAttributes(User current_User) {
      return self => self;
    }
    static public new Func<nintee,nintee> FilterViewableAttributesLocal(User current_User) {
      return self => self;
    }
    static public nintee WithoutImages(nintee self) {
      
      return self;
    }
  }

  
  
  public partial class thirty: PreparationTime {
    public thirty() {
      
    }
    
    
        
    
    static new public Expression<Func<thirty,thirty>> FilterViewableAttributes(User current_User) {
      return self => self;
    }
    static public new Func<thirty,thirty> FilterViewableAttributesLocal(User current_User) {
      return self => self;
    }
    static public thirty WithoutImages(thirty self) {
      
      return self;
    }
  }

  
  
  public partial class Meal: IEntity {
    public Meal() {
      
    }
    public int Id {get;set;}
    
    [Newtonsoft.Json.JsonProperty(ItemConverterType = typeof(Newtonsoft.Json.Converters.JavaScriptDateTimeConverter))] public DateTime CreatedDate{ get; set; }
    public string Kind {get { return this is Lunch ? "Lunch": this is Brunch ? "Brunch": this is Dinner ? "Dinner": this is Breakfast ? "Breakfast" : null; } }
    
    
    static public Expression<Func<Meal,Meal>> FilterViewableAttributes(User current_User) {
      return self => self;
    }
    static public Func<Meal,Meal> FilterViewableAttributesLocal(User current_User) {
      return self => self;
    }
    static public Meal WithoutImages(Meal self) {
      
      return self;
    }
  }

  
  
  public partial class Asian: Cuisine {
    public Asian() {
      Asian_Recipes = new HashSet<Asian_Recipe>();
    }
    [Newtonsoft.Json.JsonIgnore] public virtual ICollection<Asian_Recipe> Asian_Recipes {get;set;}
    
        
    
    static new public Expression<Func<Asian,Asian>> FilterViewableAttributes(User current_User) {
      return self => self;
    }
    static public new Func<Asian,Asian> FilterViewableAttributesLocal(User current_User) {
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
    
    
    static public Expression<Func<Cuisine,Cuisine>> FilterViewableAttributes(User current_User) {
      return self => self;
    }
    static public Func<Cuisine,Cuisine> FilterViewableAttributesLocal(User current_User) {
      return self => self;
    }
    static public Cuisine WithoutImages(Cuisine self) {
      
      return self;
    }
  }

  
  
  public partial class PreparationTime: IEntity {
    public PreparationTime() {
      PreparationTime_Recipes = new HashSet<PreparationTime_Recipe>();
    }
    public int Id {get;set;}
    [Newtonsoft.Json.JsonIgnore] public virtual ICollection<PreparationTime_Recipe> PreparationTime_Recipes {get;set;}
    [Newtonsoft.Json.JsonProperty(ItemConverterType = typeof(Newtonsoft.Json.Converters.JavaScriptDateTimeConverter))] public DateTime CreatedDate{ get; set; }
    public string Kind {get { return this is nintee ? "nintee": this is thirty ? "thirty": this is sixty ? "sixty": this is fifteen ? "fifteen" : null; } }
    
    
    static public Expression<Func<PreparationTime,PreparationTime>> FilterViewableAttributes(User current_User) {
      return self => self;
    }
    static public Func<PreparationTime,PreparationTime> FilterViewableAttributesLocal(User current_User) {
      return self => self;
    }
    static public PreparationTime WithoutImages(PreparationTime self) {
      
      return self;
    }
  }

  
  
  public partial class sixty: PreparationTime {
    public sixty() {
      
    }
    
    
        
    
    static new public Expression<Func<sixty,sixty>> FilterViewableAttributes(User current_User) {
      return self => self;
    }
    static public new Func<sixty,sixty> FilterViewableAttributesLocal(User current_User) {
      return self => self;
    }
    static public sixty WithoutImages(sixty self) {
      
      return self;
    }
  }

  
  
  public partial class RecommendationPage: IEntity {
    public RecommendationPage() {
      User_RecommendationPages = new HashSet<User_RecommendationPage>();
      RecommendationPage_Recipes = new HashSet<RecommendationPage_Recipe>();
    }
    public int Id {get;set;}
    [Newtonsoft.Json.JsonIgnore] public virtual ICollection<User_RecommendationPage> User_RecommendationPages {get;set;}
    [Newtonsoft.Json.JsonIgnore] public virtual ICollection<RecommendationPage_Recipe> RecommendationPage_Recipes {get;set;}
    [Newtonsoft.Json.JsonProperty(ItemConverterType = typeof(Newtonsoft.Json.Converters.JavaScriptDateTimeConverter))] public DateTime CreatedDate{ get; set; }
        
    
    static public Expression<Func<RecommendationPage,RecommendationPage>> FilterViewableAttributes(User current_User) {
      return self => self;
    }
    static public Func<RecommendationPage,RecommendationPage> FilterViewableAttributesLocal(User current_User) {
      return self => self;
    }
    static public RecommendationPage WithoutImages(RecommendationPage self) {
      
      return self;
    }
  }

  
  
  public partial class Lunch: Meal {
    public Lunch() {
      Lunch_Recipes = new HashSet<Lunch_Recipe>();
    }
    [Newtonsoft.Json.JsonIgnore] public virtual ICollection<Lunch_Recipe> Lunch_Recipes {get;set;}
    
        
    
    static new public Expression<Func<Lunch,Lunch>> FilterViewableAttributes(User current_User) {
      return self => self;
    }
    static public new Func<Lunch,Lunch> FilterViewableAttributesLocal(User current_User) {
      return self => self;
    }
    static public Lunch WithoutImages(Lunch self) {
      
      return self;
    }
  }

  
  
  public partial class User: IEntity {
    public User() {
      User_Favorites = new HashSet<User_Favorite>();
      User_Ratings = new HashSet<User_Rating>();
      User_RecommendationPages = new HashSet<User_RecommendationPage>();
    }
    public int Id {get;set;}
    [Newtonsoft.Json.JsonIgnore] public virtual ICollection<User_Favorite> User_Favorites {get;set;}
    [Newtonsoft.Json.JsonIgnore] public virtual ICollection<User_Rating> User_Ratings {get;set;}
    [Newtonsoft.Json.JsonIgnore] public virtual ICollection<User_RecommendationPage> User_RecommendationPages {get;set;}
    [Newtonsoft.Json.JsonProperty(ItemConverterType = typeof(Newtonsoft.Json.Converters.JavaScriptDateTimeConverter))] public DateTime CreatedDate{ get; set; }
        public string Username {get;set;}
    public string Language {get;set;}
    public string Email {get;set;}
    [Newtonsoft.Json.JsonIgnore] public string PasswordHash {get;set;}
    [Newtonsoft.Json.JsonIgnore] public string PasswordSalt {get;set;}
    static public Expression<Func<User,User>> FilterViewableAttributes(User current_User) {
      return self => self;
    }
    static public Func<User,User> FilterViewableAttributesLocal(User current_User) {
      return self => self;
    }
    static public User WithoutImages(User self) {
      
      return self;
    }
  }

  public partial class UserViewData {
    public int Id {get;set;}
    public string Username {get;set;}
    public string Language {get;set;}
    public string Email {get;set;}
    [Newtonsoft.Json.JsonProperty(ItemConverterType = typeof(Newtonsoft.Json.Converters.JavaScriptDateTimeConverter))]
    public DateTime CreatedDate {get;set;}
    public bool HasPassword {get;set;}
    static public UserViewData FromUser(User item) {
      return new UserViewData() { Id = item.Id, CreatedDate = item.CreatedDate, HasPassword = item.PasswordHash != null, Username = item.Username, Language = item.Language, Email = item.Email };
    }
    static public User FromUserViewData(UserViewData item, SimpleModelsAndRelationsContext context) {
      var original = context.User.FirstOrDefault(i => i.Id == item.Id);
      original.Username = item.Username;
      original.Language = item.Language;
      original.Email = item.Email;
      original.CreatedDate = item.CreatedDate;
      return original;
    }
  }

  
  
  public partial class Homepage: IEntity {
    public Homepage() {
      
    }
    public int Id {get;set;}
    
    [Newtonsoft.Json.JsonProperty(ItemConverterType = typeof(Newtonsoft.Json.Converters.JavaScriptDateTimeConverter))] public DateTime CreatedDate{ get; set; }
        
    
    static public Expression<Func<Homepage,Homepage>> FilterViewableAttributes(User current_User) {
      return self => self;
    }
    static public Func<Homepage,Homepage> FilterViewableAttributesLocal(User current_User) {
      return self => self;
    }
    static public Homepage WithoutImages(Homepage self) {
      
      return self;
    }
  }

  
  
  public partial class Brunch: Meal {
    public Brunch() {
      Brunch_Recipes = new HashSet<Brunch_Recipe>();
    }
    [Newtonsoft.Json.JsonIgnore] public virtual ICollection<Brunch_Recipe> Brunch_Recipes {get;set;}
    
        
    
    static new public Expression<Func<Brunch,Brunch>> FilterViewableAttributes(User current_User) {
      return self => self;
    }
    static public new Func<Brunch,Brunch> FilterViewableAttributesLocal(User current_User) {
      return self => self;
    }
    static public Brunch WithoutImages(Brunch self) {
      
      return self;
    }
  }

  
  
  public partial class Recipe: IEntity {
    public Recipe() {
      Asian_Recipes = new HashSet<Asian_Recipe>();
      Mediterranean_Recipes = new HashSet<Mediterranean_Recipe>();
      Grill_Recipes = new HashSet<Grill_Recipe>();
      Breakfast_Recipes = new HashSet<Breakfast_Recipe>();
      Brunch_Recipes = new HashSet<Brunch_Recipe>();
      Lunch_Recipes = new HashSet<Lunch_Recipe>();
      Dinner_Recipes = new HashSet<Dinner_Recipe>();
      PreparationTime_Recipes = new HashSet<PreparationTime_Recipe>();
      Favorite_Recipes = new HashSet<Favorite_Recipe>();
      Rating_Recipes = new HashSet<Rating_Recipe>();
      RecommendationPage_Recipes = new HashSet<RecommendationPage_Recipe>();
    }
    public int Id {get;set;}
    [Newtonsoft.Json.JsonIgnore] public virtual ICollection<Asian_Recipe> Asian_Recipes {get;set;}
    [Newtonsoft.Json.JsonIgnore] public virtual ICollection<Mediterranean_Recipe> Mediterranean_Recipes {get;set;}
    [Newtonsoft.Json.JsonIgnore] public virtual ICollection<Grill_Recipe> Grill_Recipes {get;set;}
    [Newtonsoft.Json.JsonIgnore] public virtual ICollection<Breakfast_Recipe> Breakfast_Recipes {get;set;}
    [Newtonsoft.Json.JsonIgnore] public virtual ICollection<Brunch_Recipe> Brunch_Recipes {get;set;}
    [Newtonsoft.Json.JsonIgnore] public virtual ICollection<Lunch_Recipe> Lunch_Recipes {get;set;}
    [Newtonsoft.Json.JsonIgnore] public virtual ICollection<Dinner_Recipe> Dinner_Recipes {get;set;}
    [Newtonsoft.Json.JsonIgnore] public virtual ICollection<PreparationTime_Recipe> PreparationTime_Recipes {get;set;}
    [Newtonsoft.Json.JsonIgnore] public virtual ICollection<Favorite_Recipe> Favorite_Recipes {get;set;}
    [Newtonsoft.Json.JsonIgnore] public virtual ICollection<Rating_Recipe> Rating_Recipes {get;set;}
    [Newtonsoft.Json.JsonIgnore] public virtual ICollection<RecommendationPage_Recipe> RecommendationPage_Recipes {get;set;}
    [Newtonsoft.Json.JsonProperty(ItemConverterType = typeof(Newtonsoft.Json.Converters.JavaScriptDateTimeConverter))] public DateTime CreatedDate{ get; set; }
        public string Name {get;set;}
    public string Ingredients {get;set;}
    public string Description {get;set;}
    public int RatingType {get;set;}
    public string Picture {get;set;}
    
    static public Expression<Func<Recipe,Recipe>> FilterViewableAttributes(User current_User) {
      return self => self;
    }
    static public Func<Recipe,Recipe> FilterViewableAttributesLocal(User current_User) {
      return self => self;
    }
    static public Recipe WithoutImages(Recipe self) {
      self.Picture = null;
      return self;
    }
  }

  
  
  public partial class Dinner: Meal {
    public Dinner() {
      Dinner_Recipes = new HashSet<Dinner_Recipe>();
    }
    [Newtonsoft.Json.JsonIgnore] public virtual ICollection<Dinner_Recipe> Dinner_Recipes {get;set;}
    
        
    
    static new public Expression<Func<Dinner,Dinner>> FilterViewableAttributes(User current_User) {
      return self => self;
    }
    static public new Func<Dinner,Dinner> FilterViewableAttributesLocal(User current_User) {
      return self => self;
    }
    static public Dinner WithoutImages(Dinner self) {
      
      return self;
    }
  }

  
  
  public partial class Mediterranean: Cuisine {
    public Mediterranean() {
      Mediterranean_Recipes = new HashSet<Mediterranean_Recipe>();
    }
    [Newtonsoft.Json.JsonIgnore] public virtual ICollection<Mediterranean_Recipe> Mediterranean_Recipes {get;set;}
    
        
    
    static new public Expression<Func<Mediterranean,Mediterranean>> FilterViewableAttributes(User current_User) {
      return self => self;
    }
    static public new Func<Mediterranean,Mediterranean> FilterViewableAttributesLocal(User current_User) {
      return self => self;
    }
    static public Mediterranean WithoutImages(Mediterranean self) {
      
      return self;
    }
  }

  
  
  public partial class Breakfast: Meal {
    public Breakfast() {
      Breakfast_Recipes = new HashSet<Breakfast_Recipe>();
    }
    [Newtonsoft.Json.JsonIgnore] public virtual ICollection<Breakfast_Recipe> Breakfast_Recipes {get;set;}
    
        
    
    static new public Expression<Func<Breakfast,Breakfast>> FilterViewableAttributes(User current_User) {
      return self => self;
    }
    static public new Func<Breakfast,Breakfast> FilterViewableAttributesLocal(User current_User) {
      return self => self;
    }
    static public Breakfast WithoutImages(Breakfast self) {
      
      return self;
    }
  }

  
  
  public partial class Favorite: IEntity {
    public Favorite() {
      User_Favorites = new HashSet<User_Favorite>();
      Favorite_Recipes = new HashSet<Favorite_Recipe>();
    }
    public int Id {get;set;}
    [Newtonsoft.Json.JsonIgnore] public virtual ICollection<User_Favorite> User_Favorites {get;set;}
    [Newtonsoft.Json.JsonIgnore] public virtual ICollection<Favorite_Recipe> Favorite_Recipes {get;set;}
    [Newtonsoft.Json.JsonProperty(ItemConverterType = typeof(Newtonsoft.Json.Converters.JavaScriptDateTimeConverter))] public DateTime CreatedDate{ get; set; }
        
    
    static public Expression<Func<Favorite,Favorite>> FilterViewableAttributes(User current_User) {
      return self => self;
    }
    static public Func<Favorite,Favorite> FilterViewableAttributesLocal(User current_User) {
      return self => self;
    }
    static public Favorite WithoutImages(Favorite self) {
      
      return self;
    }
  }

  
  
  public partial class fifteen: PreparationTime {
    public fifteen() {
      
    }
    
    
        
    
    static new public Expression<Func<fifteen,fifteen>> FilterViewableAttributes(User current_User) {
      return self => self;
    }
    static public new Func<fifteen,fifteen> FilterViewableAttributesLocal(User current_User) {
      return self => self;
    }
    static public fifteen WithoutImages(fifteen self) {
      
      return self;
    }
  }

  
  
  public partial class Rating: IEntity {
    public Rating() {
      User_Ratings = new HashSet<User_Rating>();
      Rating_Recipes = new HashSet<Rating_Recipe>();
    }
    public int Id {get;set;}
    [Newtonsoft.Json.JsonIgnore] public virtual ICollection<User_Rating> User_Ratings {get;set;}
    [Newtonsoft.Json.JsonIgnore] public virtual ICollection<Rating_Recipe> Rating_Recipes {get;set;}
    [Newtonsoft.Json.JsonProperty(ItemConverterType = typeof(Newtonsoft.Json.Converters.JavaScriptDateTimeConverter))] public DateTime CreatedDate{ get; set; }
        
    
    static public Expression<Func<Rating,Rating>> FilterViewableAttributes(User current_User) {
      return self => self;
    }
    static public Func<Rating,Rating> FilterViewableAttributesLocal(User current_User) {
      return self => self;
    }
    static public Rating WithoutImages(Rating self) {
      
      return self;
    }
  }

  
  
  public partial class Grill: Cuisine {
    public Grill() {
      Grill_Recipes = new HashSet<Grill_Recipe>();
    }
    [Newtonsoft.Json.JsonIgnore] public virtual ICollection<Grill_Recipe> Grill_Recipes {get;set;}
    
        
    
    static new public Expression<Func<Grill,Grill>> FilterViewableAttributes(User current_User) {
      return self => self;
    }
    static public new Func<Grill,Grill> FilterViewableAttributesLocal(User current_User) {
      return self => self;
    }
    static public Grill WithoutImages(Grill self) {
      
      return self;
    }
  }

  
  
    public partial class Asian_Recipe {
    public Asian_Recipe() {
      
    }
    public int Id {get;set;}
    
    
        [Newtonsoft.Json.JsonIgnore] public virtual Asian Asian {get;set;}
    public int AsianId {get;set;}
    [Newtonsoft.Json.JsonIgnore] public virtual Recipe Recipe {get;set;}
    public int RecipeId {get;set;}
    
    static public Expression<Func<Asian_Recipe,Asian_Recipe>> FilterViewableAttributes(User current_User) {
      return self => self;
    }
    static public Func<Asian_Recipe,Asian_Recipe> FilterViewableAttributesLocal(User current_User) {
      return self => self;
    }
    
  }

  
  

  public partial class Mediterranean_Recipe {
    public Mediterranean_Recipe() {
      
    }
    public int Id {get;set;}
    
    
        [Newtonsoft.Json.JsonIgnore] public virtual Mediterranean Mediterranean {get;set;}
    public int MediterraneanId {get;set;}
    [Newtonsoft.Json.JsonIgnore] public virtual Recipe Recipe {get;set;}
    public int RecipeId {get;set;}
    
    static public Expression<Func<Mediterranean_Recipe,Mediterranean_Recipe>> FilterViewableAttributes(User current_User) {
      return self => self;
    }
    static public Func<Mediterranean_Recipe,Mediterranean_Recipe> FilterViewableAttributesLocal(User current_User) {
      return self => self;
    }
    
  }

  
  

  public partial class Grill_Recipe {
    public Grill_Recipe() {
      
    }
    public int Id {get;set;}
    
    
        [Newtonsoft.Json.JsonIgnore] public virtual Grill Grill {get;set;}
    public int GrillId {get;set;}
    [Newtonsoft.Json.JsonIgnore] public virtual Recipe Recipe {get;set;}
    public int RecipeId {get;set;}
    
    static public Expression<Func<Grill_Recipe,Grill_Recipe>> FilterViewableAttributes(User current_User) {
      return self => self;
    }
    static public Func<Grill_Recipe,Grill_Recipe> FilterViewableAttributesLocal(User current_User) {
      return self => self;
    }
    
  }

  
  

  public partial class Breakfast_Recipe {
    public Breakfast_Recipe() {
      
    }
    public int Id {get;set;}
    
    
        [Newtonsoft.Json.JsonIgnore] public virtual Breakfast Breakfast {get;set;}
    public int BreakfastId {get;set;}
    [Newtonsoft.Json.JsonIgnore] public virtual Recipe Recipe {get;set;}
    public int RecipeId {get;set;}
    
    static public Expression<Func<Breakfast_Recipe,Breakfast_Recipe>> FilterViewableAttributes(User current_User) {
      return self => self;
    }
    static public Func<Breakfast_Recipe,Breakfast_Recipe> FilterViewableAttributesLocal(User current_User) {
      return self => self;
    }
    
  }

  
  

  public partial class Brunch_Recipe {
    public Brunch_Recipe() {
      
    }
    public int Id {get;set;}
    
    
        [Newtonsoft.Json.JsonIgnore] public virtual Brunch Brunch {get;set;}
    public int BrunchId {get;set;}
    [Newtonsoft.Json.JsonIgnore] public virtual Recipe Recipe {get;set;}
    public int RecipeId {get;set;}
    
    static public Expression<Func<Brunch_Recipe,Brunch_Recipe>> FilterViewableAttributes(User current_User) {
      return self => self;
    }
    static public Func<Brunch_Recipe,Brunch_Recipe> FilterViewableAttributesLocal(User current_User) {
      return self => self;
    }
    
  }

  
  

  public partial class Lunch_Recipe {
    public Lunch_Recipe() {
      
    }
    public int Id {get;set;}
    
    
        [Newtonsoft.Json.JsonIgnore] public virtual Lunch Lunch {get;set;}
    public int LunchId {get;set;}
    [Newtonsoft.Json.JsonIgnore] public virtual Recipe Recipe {get;set;}
    public int RecipeId {get;set;}
    
    static public Expression<Func<Lunch_Recipe,Lunch_Recipe>> FilterViewableAttributes(User current_User) {
      return self => self;
    }
    static public Func<Lunch_Recipe,Lunch_Recipe> FilterViewableAttributesLocal(User current_User) {
      return self => self;
    }
    
  }

  
  

  public partial class Dinner_Recipe {
    public Dinner_Recipe() {
      
    }
    public int Id {get;set;}
    
    
        [Newtonsoft.Json.JsonIgnore] public virtual Dinner Dinner {get;set;}
    public int DinnerId {get;set;}
    [Newtonsoft.Json.JsonIgnore] public virtual Recipe Recipe {get;set;}
    public int RecipeId {get;set;}
    
    static public Expression<Func<Dinner_Recipe,Dinner_Recipe>> FilterViewableAttributes(User current_User) {
      return self => self;
    }
    static public Func<Dinner_Recipe,Dinner_Recipe> FilterViewableAttributesLocal(User current_User) {
      return self => self;
    }
    
  }

  
  

  public partial class PreparationTime_Recipe {
    public PreparationTime_Recipe() {
      
    }
    public int Id {get;set;}
    
    
        [Newtonsoft.Json.JsonIgnore] public virtual PreparationTime PreparationTime {get;set;}
    public int PreparationTimeId {get;set;}
    [Newtonsoft.Json.JsonIgnore] public virtual Recipe Recipe {get;set;}
    public int RecipeId {get;set;}
    
    static public Expression<Func<PreparationTime_Recipe,PreparationTime_Recipe>> FilterViewableAttributes(User current_User) {
      return self => self;
    }
    static public Func<PreparationTime_Recipe,PreparationTime_Recipe> FilterViewableAttributesLocal(User current_User) {
      return self => self;
    }
    
  }

  
  

  public partial class User_Favorite {
    public User_Favorite() {
      
    }
    public int Id {get;set;}
    
    
        [Newtonsoft.Json.JsonIgnore] public virtual User User {get;set;}
    public int UserId {get;set;}
    [Newtonsoft.Json.JsonIgnore] public virtual Favorite Favorite {get;set;}
    public int FavoriteId {get;set;}
    
    static public Expression<Func<User_Favorite,User_Favorite>> FilterViewableAttributes(User current_User) {
      return self => self;
    }
    static public Func<User_Favorite,User_Favorite> FilterViewableAttributesLocal(User current_User) {
      return self => self;
    }
    
  }

  
  

  public partial class User_Rating {
    public User_Rating() {
      
    }
    public int Id {get;set;}
    
    
        [Newtonsoft.Json.JsonIgnore] public virtual User User {get;set;}
    public int UserId {get;set;}
    [Newtonsoft.Json.JsonIgnore] public virtual Rating Rating {get;set;}
    public int RatingId {get;set;}
    
    static public Expression<Func<User_Rating,User_Rating>> FilterViewableAttributes(User current_User) {
      return self => self;
    }
    static public Func<User_Rating,User_Rating> FilterViewableAttributesLocal(User current_User) {
      return self => self;
    }
    
  }

  
  

  public partial class User_RecommendationPage {
    public User_RecommendationPage() {
      
    }
    public int Id {get;set;}
    
    
        [Newtonsoft.Json.JsonIgnore] public virtual User User {get;set;}
    public int UserId {get;set;}
    [Newtonsoft.Json.JsonIgnore] public virtual RecommendationPage RecommendationPage {get;set;}
    public int RecommendationPageId {get;set;}
    
    static public Expression<Func<User_RecommendationPage,User_RecommendationPage>> FilterViewableAttributes(User current_User) {
      return self => self;
    }
    static public Func<User_RecommendationPage,User_RecommendationPage> FilterViewableAttributesLocal(User current_User) {
      return self => self;
    }
    
  }

  
  

  public partial class Favorite_Recipe {
    public Favorite_Recipe() {
      
    }
    public int Id {get;set;}
    
    
        [Newtonsoft.Json.JsonIgnore] public virtual Favorite Favorite {get;set;}
    public int FavoriteId {get;set;}
    [Newtonsoft.Json.JsonIgnore] public virtual Recipe Recipe {get;set;}
    public int RecipeId {get;set;}
    
    static public Expression<Func<Favorite_Recipe,Favorite_Recipe>> FilterViewableAttributes(User current_User) {
      return self => self;
    }
    static public Func<Favorite_Recipe,Favorite_Recipe> FilterViewableAttributesLocal(User current_User) {
      return self => self;
    }
    
  }

  
  

  public partial class Rating_Recipe {
    public Rating_Recipe() {
      
    }
    public int Id {get;set;}
    
    
        [Newtonsoft.Json.JsonIgnore] public virtual Rating Rating {get;set;}
    public int RatingId {get;set;}
    [Newtonsoft.Json.JsonIgnore] public virtual Recipe Recipe {get;set;}
    public int RecipeId {get;set;}
    
    static public Expression<Func<Rating_Recipe,Rating_Recipe>> FilterViewableAttributes(User current_User) {
      return self => self;
    }
    static public Func<Rating_Recipe,Rating_Recipe> FilterViewableAttributesLocal(User current_User) {
      return self => self;
    }
    
  }

  
  

  public partial class RecommendationPage_Recipe {
    public RecommendationPage_Recipe() {
      
    }
    public int Id {get;set;}
    
    
        [Newtonsoft.Json.JsonIgnore] public virtual RecommendationPage RecommendationPage {get;set;}
    public int RecommendationPageId {get;set;}
    [Newtonsoft.Json.JsonIgnore] public virtual Recipe Recipe {get;set;}
    public int RecipeId {get;set;}
    
    static public Expression<Func<RecommendationPage_Recipe,RecommendationPage_Recipe>> FilterViewableAttributes(User current_User) {
      return self => self;
    }
    static public Func<RecommendationPage_Recipe,RecommendationPage_Recipe> FilterViewableAttributesLocal(User current_User) {
      return self => self;
    }
    
  }

  
  



  public partial class LoggableEntities {
  public User User {get;set;}
}

  public partial class Session {
    public int Id {get;set;}
    public string CookieName {get;set;}
    public string Content {get;set;}
    public DateTime CreatedAt {get;set;}
  }
}
