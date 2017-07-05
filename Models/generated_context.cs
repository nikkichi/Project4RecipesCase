using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace SimpleModelsAndRelations.Models{
  public partial class SimpleModelsAndRelationsContext {
    public DbSet<Thirty> Thirty { get; set; }
    public DbSet<Meal> Meal { get; set; }
    public DbSet<Asian> Asian { get; set; }
    public DbSet<Cuisine> Cuisine { get; set; }
    public DbSet<PreparationTime> PreparationTime { get; set; }
    public DbSet<Sixty> Sixty { get; set; }
    public DbSet<RecommendationPage> RecommendationPage { get; set; }
    public DbSet<Favourite> Favourite { get; set; }
    public DbSet<Browse> Browse { get; set; }
    public DbSet<Lunch> Lunch { get; set; }
    public DbSet<User> User { get; set; }
    public DbSet<Homepage> Homepage { get; set; }
    public DbSet<Brunch> Brunch { get; set; }
    public DbSet<Recipe> Recipe { get; set; }
    public DbSet<Dinner> Dinner { get; set; }
    public DbSet<Mediterranean> Mediterranean { get; set; }
    public DbSet<Ninety> Ninety { get; set; }
    public DbSet<Recommendation> Recommendation { get; set; }
    public DbSet<Breakfast> Breakfast { get; set; }
    public DbSet<Fifteen> Fifteen { get; set; }
    public DbSet<Rating> Rating { get; set; }
    public DbSet<Grill> Grill { get; set; }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    public DbSet<Cuisine_Meal> Cuisine_Meal { get; set; }
    public DbSet<Meal_Recipe> Meal_Recipe { get; set; }
    public DbSet<PreparationTime_Recipe> PreparationTime_Recipe { get; set; }
    public DbSet<User_Recipe> User_Recipe { get; set; }
    public DbSet<Recipe_Rating> Recipe_Rating { get; set; }
    public DbSet<User_RecommendationPage> User_RecommendationPage { get; set; }
    public DbSet<RecommendationPage_Recipe> RecommendationPage_Recipe { get; set; }
    public DbSet<User_Rating> User_Rating { get; set; }
    public DbSet<Session> Session { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder) {

      modelBuilder.Entity<User>()
              .HasIndex(b => b.Username)
              .IsUnique();
      modelBuilder.Entity<User>()
              .HasIndex(b => b.Email)
              .IsUnique();



  
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    

  
      modelBuilder.Entity<Session>()
        .HasIndex(b => b.CookieName);
      modelBuilder.Entity<Session>()
        .HasIndex(b => b.LoggedEntityName);
      modelBuilder.Entity<Session>()
        .HasIndex(b => b.LoggedEntityId);
      modelBuilder.Entity<Session>()
        .HasIndex(b => b.CreatedAt);
    }
  }
}
    