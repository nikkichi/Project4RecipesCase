using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace SimpleModelsAndRelations.Models{
  public partial class SimpleModelsAndRelationsContext {
    public DbSet<nintee> nintee { get; set; }
    public DbSet<thirty> thirty { get; set; }
    public DbSet<Meal> Meal { get; set; }
    public DbSet<Asian> Asian { get; set; }
    public DbSet<Cuisine> Cuisine { get; set; }
    public DbSet<PreparationTime> PreparationTime { get; set; }
    public DbSet<sixty> sixty { get; set; }
    public DbSet<RecommendationPage> RecommendationPage { get; set; }
    public DbSet<Lunch> Lunch { get; set; }
    public DbSet<User> User { get; set; }
    public DbSet<Homepage> Homepage { get; set; }
    public DbSet<Brunch> Brunch { get; set; }
    public DbSet<Recipe> Recipe { get; set; }
    public DbSet<Dinner> Dinner { get; set; }
    public DbSet<Mediterranean> Mediterranean { get; set; }
    public DbSet<Breakfast> Breakfast { get; set; }
    public DbSet<Favorite> Favorite { get; set; }
    public DbSet<fifteen> fifteen { get; set; }
    public DbSet<Rating> Rating { get; set; }
    public DbSet<Grill> Grill { get; set; }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    public DbSet<Asian_Recipe> Asian_Recipe { get; set; }
    public DbSet<Mediterranean_Recipe> Mediterranean_Recipe { get; set; }
    public DbSet<Grill_Recipe> Grill_Recipe { get; set; }
    public DbSet<Breakfast_Recipe> Breakfast_Recipe { get; set; }
    public DbSet<Brunch_Recipe> Brunch_Recipe { get; set; }
    public DbSet<Lunch_Recipe> Lunch_Recipe { get; set; }
    public DbSet<Dinner_Recipe> Dinner_Recipe { get; set; }
    public DbSet<PreparationTime_Recipe> PreparationTime_Recipe { get; set; }
    public DbSet<User_Favorite> User_Favorite { get; set; }
    public DbSet<User_Rating> User_Rating { get; set; }
    public DbSet<User_RecommendationPage> User_RecommendationPage { get; set; }
    public DbSet<Favorite_Recipe> Favorite_Recipe { get; set; }
    public DbSet<Rating_Recipe> Rating_Recipe { get; set; }
    public DbSet<RecommendationPage_Recipe> RecommendationPage_Recipe { get; set; }
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
    }
  }
}
    