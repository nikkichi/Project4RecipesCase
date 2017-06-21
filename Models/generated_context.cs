using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace SimpleModelsAndRelations.Models{
  public partial class SimpleModelsAndRelationsContext {
    public DbSet<Meal> Meal { get; set; }
    public DbSet<Asian> Asian { get; set; }
    public DbSet<Cuisine> Cuisine { get; set; }
    public DbSet<PreparationTime> PreparationTime { get; set; }
    public DbSet<Lunch> Lunch { get; set; }
    public DbSet<Homepage> Homepage { get; set; }
    public DbSet<Brunch> Brunch { get; set; }
    public DbSet<Recipe> Recipe { get; set; }
    public DbSet<Dinner> Dinner { get; set; }
    public DbSet<Mediterranean> Mediterranean { get; set; }
    public DbSet<Breakfast> Breakfast { get; set; }
    public DbSet<Grill> Grill { get; set; }
    
    
    
    
    
    
    
    
    
    
    
    
    
    public DbSet<Session> Session { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder) {



  
    
    
    
    
    
    
    
    
    
    
    

  
      modelBuilder.Entity<Session>()
              .HasIndex(b => b.CookieName);
    }
  }
}
    