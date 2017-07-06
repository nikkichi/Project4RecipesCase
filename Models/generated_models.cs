using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace SimpleModelsAndRelations.Models
{
    public partial class Thirty: PreparationTime {
    public Thirty() {
      
    }
    
    
        public string Description {get;set;}
    
    static new public Expression<Func<Thirty,Thirty>> FilterViewableAttributes(User current_User) {
      return self => self;
    }
    static public new Func<Thirty,Thirty> FilterViewableAttributesLocal(User current_User) {
      return self => self;
    }
    static public Thirty WithoutImages(Thirty self) {
      
      return self;
    }
  }

  
  
  public partial class Meal: IEntity {
    public Meal() {
      Cuisine_Meals = new HashSet<Cuisine_Meal>();
      Meal_Recipes = new HashSet<Meal_Recipe>();
    }
    public int Id {get;set;}
    [Newtonsoft.Json.JsonIgnore] public virtual ICollection<Cuisine_Meal> Cuisine_Meals {get;set;}
    [Newtonsoft.Json.JsonIgnore] public virtual ICollection<Meal_Recipe> Meal_Recipes {get;set;}
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
      
    }
    
    
        public string Description {get;set;}
    
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
      Cuisine_Meals = new HashSet<Cuisine_Meal>();
      Cuisine_Recipes = new HashSet<Cuisine_Recipe>();
    }
    public int Id {get;set;}
    [Newtonsoft.Json.JsonIgnore] public virtual ICollection<Cuisine_Meal> Cuisine_Meals {get;set;}
    [Newtonsoft.Json.JsonIgnore] public virtual ICollection<Cuisine_Recipe> Cuisine_Recipes {get;set;}
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
    public string Kind {get { return this is Thirty ? "Thirty": this is Sixty ? "Sixty": this is Ninety ? "Ninety": this is Fifteen ? "Fifteen" : null; } }
    
    
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

  
  
  public partial class Sixty: PreparationTime {
    public Sixty() {
      
    }
    
    
        public string Description {get;set;}
    
    static new public Expression<Func<Sixty,Sixty>> FilterViewableAttributes(User current_User) {
      return self => self;
    }
    static public new Func<Sixty,Sixty> FilterViewableAttributesLocal(User current_User) {
      return self => self;
    }
    static public Sixty WithoutImages(Sixty self) {
      
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

  
  
  public partial class Favourite: IEntity {
    public Favourite() {
      
    }
    public int Id {get;set;}
    
    [Newtonsoft.Json.JsonProperty(ItemConverterType = typeof(Newtonsoft.Json.Converters.JavaScriptDateTimeConverter))] public DateTime CreatedDate{ get; set; }
        
    
    static public Expression<Func<Favourite,Favourite>> FilterViewableAttributes(User current_User) {
      return self => self;
    }
    static public Func<Favourite,Favourite> FilterViewableAttributesLocal(User current_User) {
      return self => self;
    }
    static public Favourite WithoutImages(Favourite self) {
      
      return self;
    }
  }

  
  
  public partial class Browse: IEntity {
    public Browse() {
      
    }
    public int Id {get;set;}
    
    [Newtonsoft.Json.JsonProperty(ItemConverterType = typeof(Newtonsoft.Json.Converters.JavaScriptDateTimeConverter))] public DateTime CreatedDate{ get; set; }
        
    
    static public Expression<Func<Browse,Browse>> FilterViewableAttributes(User current_User) {
      return self => self;
    }
    static public Func<Browse,Browse> FilterViewableAttributesLocal(User current_User) {
      return self => self;
    }
    static public Browse WithoutImages(Browse self) {
      
      return self;
    }
  }

  
  
  public partial class Lunch: Meal {
    public Lunch() {
      
    }
    
    
        public string Description {get;set;}
    
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
      User_Recipes = new HashSet<User_Recipe>();
      User_RecommendationPages = new HashSet<User_RecommendationPage>();
      User_Ratings = new HashSet<User_Rating>();
    }
    public int Id {get;set;}
    [Newtonsoft.Json.JsonIgnore] public virtual ICollection<User_Recipe> User_Recipes {get;set;}
    [Newtonsoft.Json.JsonIgnore] public virtual ICollection<User_RecommendationPage> User_RecommendationPages {get;set;}
    [Newtonsoft.Json.JsonIgnore] public virtual ICollection<User_Rating> User_Ratings {get;set;}
    [Newtonsoft.Json.JsonProperty(ItemConverterType = typeof(Newtonsoft.Json.Converters.JavaScriptDateTimeConverter))] public DateTime CreatedDate{ get; set; }
        public string Username {get;set;}
    public string Language {get;set;}
    public string Email {get;set;}
    [Newtonsoft.Json.JsonIgnore] public string PasswordHash {get;set;}
    [Newtonsoft.Json.JsonIgnore] public string PasswordSalt {get;set;}
    [Newtonsoft.Json.JsonIgnore] public DateTime LastLoginAttempt {get;set;}
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
      
    }
    
    
        public string Description {get;set;}
    
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
      Meal_Recipes = new HashSet<Meal_Recipe>();
      PreparationTime_Recipes = new HashSet<PreparationTime_Recipe>();
      User_Recipes = new HashSet<User_Recipe>();
      Recipe_Ratings = new HashSet<Recipe_Rating>();
      RecommendationPage_Recipes = new HashSet<RecommendationPage_Recipe>();
      Cuisine_Recipes = new HashSet<Cuisine_Recipe>();
    }
    public int Id {get;set;}
    [Newtonsoft.Json.JsonIgnore] public virtual ICollection<Meal_Recipe> Meal_Recipes {get;set;}
    [Newtonsoft.Json.JsonIgnore] public virtual ICollection<PreparationTime_Recipe> PreparationTime_Recipes {get;set;}
    [Newtonsoft.Json.JsonIgnore] public virtual ICollection<User_Recipe> User_Recipes {get;set;}
    [Newtonsoft.Json.JsonIgnore] public virtual ICollection<Recipe_Rating> Recipe_Ratings {get;set;}
    [Newtonsoft.Json.JsonIgnore] public virtual ICollection<RecommendationPage_Recipe> RecommendationPage_Recipes {get;set;}
    [Newtonsoft.Json.JsonIgnore] public virtual ICollection<Cuisine_Recipe> Cuisine_Recipes {get;set;}
    [Newtonsoft.Json.JsonProperty(ItemConverterType = typeof(Newtonsoft.Json.Converters.JavaScriptDateTimeConverter))] public DateTime CreatedDate{ get; set; }
        public string Name {get;set;}
    public string Ingredients {get;set;}
    public string Description {get;set;}
    public string Picture {get;set;}
    
    static public Expression<Func<Recipe,Recipe>> FilterViewableAttributes(User current_User) {
      return self => self;
    }
    static public Func<Recipe,Recipe> FilterViewableAttributesLocal(User current_User) {
      return self => self;
    }
    static public Recipe WithoutImages(Recipe self) {
      
      return self;
    }
  }

  
  
  public partial class Dinner: Meal {
    public Dinner() {
      
    }
    
    
        public string Description {get;set;}
    
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
      
    }
    
    
        public string Description {get;set;}
    
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

  
  
  public partial class Ninety: PreparationTime {
    public Ninety() {
      
    }
    
    
        public string Description {get;set;}
    
    static new public Expression<Func<Ninety,Ninety>> FilterViewableAttributes(User current_User) {
      return self => self;
    }
    static public new Func<Ninety,Ninety> FilterViewableAttributesLocal(User current_User) {
      return self => self;
    }
    static public Ninety WithoutImages(Ninety self) {
      
      return self;
    }
  }

  
  
  public partial class Recommendation: IEntity {
    public Recommendation() {
      
    }
    public int Id {get;set;}
    
    [Newtonsoft.Json.JsonProperty(ItemConverterType = typeof(Newtonsoft.Json.Converters.JavaScriptDateTimeConverter))] public DateTime CreatedDate{ get; set; }
        
    
    static public Expression<Func<Recommendation,Recommendation>> FilterViewableAttributes(User current_User) {
      return self => self;
    }
    static public Func<Recommendation,Recommendation> FilterViewableAttributesLocal(User current_User) {
      return self => self;
    }
    static public Recommendation WithoutImages(Recommendation self) {
      
      return self;
    }
  }

  
  
  public partial class Breakfast: Meal {
    public Breakfast() {
      
    }
    
    
        public string Description {get;set;}
    
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

  
  
  public partial class Fifteen: PreparationTime {
    public Fifteen() {
      
    }
    
    
        public string Description {get;set;}
    
    static new public Expression<Func<Fifteen,Fifteen>> FilterViewableAttributes(User current_User) {
      return self => self;
    }
    static public new Func<Fifteen,Fifteen> FilterViewableAttributesLocal(User current_User) {
      return self => self;
    }
    static public Fifteen WithoutImages(Fifteen self) {
      
      return self;
    }
  }

  
  
  public partial class Rating: IEntity {
    public Rating() {
      Recipe_Ratings = new HashSet<Recipe_Rating>();
      User_Ratings = new HashSet<User_Rating>();
    }
    public int Id {get;set;}
    [Newtonsoft.Json.JsonIgnore] public virtual ICollection<Recipe_Rating> Recipe_Ratings {get;set;}
    [Newtonsoft.Json.JsonIgnore] public virtual ICollection<User_Rating> User_Ratings {get;set;}
    [Newtonsoft.Json.JsonProperty(ItemConverterType = typeof(Newtonsoft.Json.Converters.JavaScriptDateTimeConverter))] public DateTime CreatedDate{ get; set; }
        public int Number {get;set;}
    
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
      
    }
    
    
        public string Description {get;set;}
    
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

  
  
    public partial class Cuisine_Meal {
    public Cuisine_Meal() {
      
    }
    public int Id {get;set;}
    
    
        [Newtonsoft.Json.JsonIgnore] public virtual Cuisine Cuisine {get;set;}
    public int CuisineId {get;set;}
    [Newtonsoft.Json.JsonIgnore] public virtual Meal Meal {get;set;}
    public int MealId {get;set;}
    
    static public Expression<Func<Cuisine_Meal,Cuisine_Meal>> FilterViewableAttributes(User current_User) {
      return self => self;
    }
    static public Func<Cuisine_Meal,Cuisine_Meal> FilterViewableAttributesLocal(User current_User) {
      return self => self;
    }
    
  }

  
  

  public partial class Meal_Recipe {
    public Meal_Recipe() {
      
    }
    public int Id {get;set;}
    
    
        [Newtonsoft.Json.JsonIgnore] public virtual Meal Meal {get;set;}
    public int MealId {get;set;}
    [Newtonsoft.Json.JsonIgnore] public virtual Recipe Recipe {get;set;}
    public int RecipeId {get;set;}
    
    static public Expression<Func<Meal_Recipe,Meal_Recipe>> FilterViewableAttributes(User current_User) {
      return self => self;
    }
    static public Func<Meal_Recipe,Meal_Recipe> FilterViewableAttributesLocal(User current_User) {
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

  
  

  public partial class User_Recipe {
    public User_Recipe() {
      
    }
    public int Id {get;set;}
    
    
        [Newtonsoft.Json.JsonIgnore] public virtual User User {get;set;}
    public int UserId {get;set;}
    [Newtonsoft.Json.JsonIgnore] public virtual Recipe Recipe {get;set;}
    public int RecipeId {get;set;}
    
    static public Expression<Func<User_Recipe,User_Recipe>> FilterViewableAttributes(User current_User) {
      return self => self;
    }
    static public Func<User_Recipe,User_Recipe> FilterViewableAttributesLocal(User current_User) {
      return self => self;
    }
    
  }

  
  

  public partial class Recipe_Rating {
    public Recipe_Rating() {
      
    }
    public int Id {get;set;}
    
    
        [Newtonsoft.Json.JsonIgnore] public virtual Recipe Recipe {get;set;}
    public int RecipeId {get;set;}
    [Newtonsoft.Json.JsonIgnore] public virtual Rating Rating {get;set;}
    public int RatingId {get;set;}
    
    static public Expression<Func<Recipe_Rating,Recipe_Rating>> FilterViewableAttributes(User current_User) {
      return self => self;
    }
    static public Func<Recipe_Rating,Recipe_Rating> FilterViewableAttributesLocal(User current_User) {
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

  
  

  public partial class Cuisine_Recipe {
    public Cuisine_Recipe() {
      
    }
    public int Id {get;set;}
    
    
        [Newtonsoft.Json.JsonIgnore] public virtual Cuisine Cuisine {get;set;}
    public int CuisineId {get;set;}
    [Newtonsoft.Json.JsonIgnore] public virtual Recipe Recipe {get;set;}
    public int RecipeId {get;set;}
    
    static public Expression<Func<Cuisine_Recipe,Cuisine_Recipe>> FilterViewableAttributes(User current_User) {
      return self => self;
    }
    static public Func<Cuisine_Recipe,Cuisine_Recipe> FilterViewableAttributesLocal(User current_User) {
      return self => self;
    }
    
  }

  
  

  public partial class LoggableEntities {
  public User User {get;set;}
}

  public partial class Session {
    public int Id {get;set;}
    public int? LoggedEntityId {get;set;}
    public string LoggedEntityName {get;set;}
    public string AdditionalInfo {get;set;}
    public string CookieName {get;set;}
    public string Content {get;set;}
    public DateTime CreatedAt {get;set;}
  }
}
