using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using SimpleModelsAndRelations.Models;

namespace SimpleModelsAndRelations.Migrations
{
    [DbContext(typeof(SimpleModelsAndRelationsContext))]
    partial class SimpleModelsAndRelationsContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.1.1");

            modelBuilder.Entity("SimpleModelsAndRelations.Models.Browse", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedDate");

                    b.HasKey("Id");

                    b.ToTable("Browse");
                });

            modelBuilder.Entity("SimpleModelsAndRelations.Models.Cuisine", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedDate");

                    b.Property<string>("Discriminator")
                        .IsRequired();

                    b.HasKey("Id");

                    b.ToTable("Cuisine");

                    b.HasDiscriminator<string>("Discriminator").HasValue("Cuisine");
                });

            modelBuilder.Entity("SimpleModelsAndRelations.Models.Cuisine_Meal", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("CuisineId");

                    b.Property<int>("MealId");

                    b.HasKey("Id");

                    b.HasIndex("CuisineId");

                    b.HasIndex("MealId");

                    b.ToTable("Cuisine_Meal");
                });

            modelBuilder.Entity("SimpleModelsAndRelations.Models.Favourite", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedDate");

                    b.HasKey("Id");

                    b.ToTable("Favourite");
                });

            modelBuilder.Entity("SimpleModelsAndRelations.Models.Homepage", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedDate");

                    b.Property<string>("Test");

                    b.HasKey("Id");

                    b.ToTable("Homepage");
                });

            modelBuilder.Entity("SimpleModelsAndRelations.Models.Meal", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedDate");

                    b.Property<string>("Discriminator")
                        .IsRequired();

                    b.HasKey("Id");

                    b.ToTable("Meal");

                    b.HasDiscriminator<string>("Discriminator").HasValue("Meal");
                });

            modelBuilder.Entity("SimpleModelsAndRelations.Models.Meal_Recipe", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("MealId");

                    b.Property<int>("RecipeId");

                    b.HasKey("Id");

                    b.HasIndex("MealId");

                    b.HasIndex("RecipeId");

                    b.ToTable("Meal_Recipe");
                });

            modelBuilder.Entity("SimpleModelsAndRelations.Models.PreparationTime", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedDate");

                    b.Property<string>("Discriminator")
                        .IsRequired();

                    b.HasKey("Id");

                    b.ToTable("PreparationTime");

                    b.HasDiscriminator<string>("Discriminator").HasValue("PreparationTime");
                });

            modelBuilder.Entity("SimpleModelsAndRelations.Models.PreparationTime_Recipe", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("PreparationTimeId");

                    b.Property<int>("RecipeId");

                    b.HasKey("Id");

                    b.HasIndex("PreparationTimeId");

                    b.HasIndex("RecipeId");

                    b.ToTable("PreparationTime_Recipe");
                });

            modelBuilder.Entity("SimpleModelsAndRelations.Models.Rating", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedDate");

                    b.Property<int>("Number");

                    b.HasKey("Id");

                    b.ToTable("Rating");
                });

            modelBuilder.Entity("SimpleModelsAndRelations.Models.Recipe", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedDate");

                    b.Property<string>("Description");

                    b.Property<string>("Ingredients");

                    b.Property<string>("Name");

                    b.Property<string>("Picture");

                    b.HasKey("Id");

                    b.ToTable("Recipe");
                });

            modelBuilder.Entity("SimpleModelsAndRelations.Models.Recipe_Rating", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("RatingId");

                    b.Property<int>("RecipeId");

                    b.HasKey("Id");

                    b.HasIndex("RatingId");

                    b.HasIndex("RecipeId");

                    b.ToTable("Recipe_Rating");
                });

            modelBuilder.Entity("SimpleModelsAndRelations.Models.Recommendation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedDate");

                    b.HasKey("Id");

                    b.ToTable("Recommendation");
                });

            modelBuilder.Entity("SimpleModelsAndRelations.Models.RecommendationPage", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedDate");

                    b.HasKey("Id");

                    b.ToTable("RecommendationPage");
                });

            modelBuilder.Entity("SimpleModelsAndRelations.Models.RecommendationPage_Recipe", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("RecipeId");

                    b.Property<int>("RecommendationPageId");

                    b.HasKey("Id");

                    b.HasIndex("RecipeId");

                    b.HasIndex("RecommendationPageId");

                    b.ToTable("RecommendationPage_Recipe");
                });

            modelBuilder.Entity("SimpleModelsAndRelations.Models.Session", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("AdditionalInfo");

                    b.Property<string>("Content");

                    b.Property<string>("CookieName");

                    b.Property<DateTime>("CreatedAt");

                    b.Property<int?>("LoggedEntityId");

                    b.Property<string>("LoggedEntityName");

                    b.HasKey("Id");

                    b.HasIndex("CookieName");

                    b.HasIndex("CreatedAt");

                    b.HasIndex("LoggedEntityId");

                    b.HasIndex("LoggedEntityName");

                    b.ToTable("Session");
                });

            modelBuilder.Entity("SimpleModelsAndRelations.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedDate");

                    b.Property<string>("Email");

                    b.Property<string>("Language");

                    b.Property<DateTime>("LastLoginAttempt");

                    b.Property<string>("PasswordHash");

                    b.Property<string>("PasswordSalt");

                    b.Property<string>("Username");

                    b.HasKey("Id");

                    b.HasIndex("Email")
                        .IsUnique();

                    b.HasIndex("Username")
                        .IsUnique();

                    b.ToTable("User");
                });

            modelBuilder.Entity("SimpleModelsAndRelations.Models.User_Recipe", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("RecipeId");

                    b.Property<int>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("RecipeId");

                    b.HasIndex("UserId");

                    b.ToTable("User_Recipe");
                });

            modelBuilder.Entity("SimpleModelsAndRelations.Models.User_RecommendationPage", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("RecommendationPageId");

                    b.Property<int>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("RecommendationPageId");

                    b.HasIndex("UserId");

                    b.ToTable("User_RecommendationPage");
                });

            modelBuilder.Entity("SimpleModelsAndRelations.Models.Asian", b =>
                {
                    b.HasBaseType("SimpleModelsAndRelations.Models.Cuisine");

                    b.Property<string>("Description");

                    b.ToTable("Asian");

                    b.HasDiscriminator().HasValue("Asian");
                });

            modelBuilder.Entity("SimpleModelsAndRelations.Models.Grill", b =>
                {
                    b.HasBaseType("SimpleModelsAndRelations.Models.Cuisine");

                    b.Property<string>("Description");

                    b.ToTable("Grill");

                    b.HasDiscriminator().HasValue("Grill");
                });

            modelBuilder.Entity("SimpleModelsAndRelations.Models.Mediterranean", b =>
                {
                    b.HasBaseType("SimpleModelsAndRelations.Models.Cuisine");

                    b.Property<string>("Description");

                    b.ToTable("Mediterranean");

                    b.HasDiscriminator().HasValue("Mediterranean");
                });

            modelBuilder.Entity("SimpleModelsAndRelations.Models.Breakfast", b =>
                {
                    b.HasBaseType("SimpleModelsAndRelations.Models.Meal");

                    b.Property<string>("Description");

                    b.ToTable("Breakfast");

                    b.HasDiscriminator().HasValue("Breakfast");
                });

            modelBuilder.Entity("SimpleModelsAndRelations.Models.Brunch", b =>
                {
                    b.HasBaseType("SimpleModelsAndRelations.Models.Meal");

                    b.Property<string>("Description");

                    b.ToTable("Brunch");

                    b.HasDiscriminator().HasValue("Brunch");
                });

            modelBuilder.Entity("SimpleModelsAndRelations.Models.Dinner", b =>
                {
                    b.HasBaseType("SimpleModelsAndRelations.Models.Meal");

                    b.Property<string>("Description");

                    b.ToTable("Dinner");

                    b.HasDiscriminator().HasValue("Dinner");
                });

            modelBuilder.Entity("SimpleModelsAndRelations.Models.Lunch", b =>
                {
                    b.HasBaseType("SimpleModelsAndRelations.Models.Meal");

                    b.Property<string>("Description");

                    b.ToTable("Lunch");

                    b.HasDiscriminator().HasValue("Lunch");
                });

            modelBuilder.Entity("SimpleModelsAndRelations.Models.Fifteen", b =>
                {
                    b.HasBaseType("SimpleModelsAndRelations.Models.PreparationTime");

                    b.Property<string>("Description");

                    b.ToTable("Fifteen");

                    b.HasDiscriminator().HasValue("Fifteen");
                });

            modelBuilder.Entity("SimpleModelsAndRelations.Models.Ninety", b =>
                {
                    b.HasBaseType("SimpleModelsAndRelations.Models.PreparationTime");

                    b.Property<string>("Description");

                    b.ToTable("Ninety");

                    b.HasDiscriminator().HasValue("Ninety");
                });

            modelBuilder.Entity("SimpleModelsAndRelations.Models.Sixty", b =>
                {
                    b.HasBaseType("SimpleModelsAndRelations.Models.PreparationTime");

                    b.Property<string>("Description");

                    b.ToTable("Sixty");

                    b.HasDiscriminator().HasValue("Sixty");
                });

            modelBuilder.Entity("SimpleModelsAndRelations.Models.Thirty", b =>
                {
                    b.HasBaseType("SimpleModelsAndRelations.Models.PreparationTime");

                    b.Property<string>("Description");

                    b.ToTable("Thirty");

                    b.HasDiscriminator().HasValue("Thirty");
                });

            modelBuilder.Entity("SimpleModelsAndRelations.Models.Cuisine_Meal", b =>
                {
                    b.HasOne("SimpleModelsAndRelations.Models.Cuisine", "Cuisine")
                        .WithMany("Cuisine_Meals")
                        .HasForeignKey("CuisineId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("SimpleModelsAndRelations.Models.Meal", "Meal")
                        .WithMany("Cuisine_Meals")
                        .HasForeignKey("MealId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("SimpleModelsAndRelations.Models.Meal_Recipe", b =>
                {
                    b.HasOne("SimpleModelsAndRelations.Models.Meal", "Meal")
                        .WithMany("Meal_Recipes")
                        .HasForeignKey("MealId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("SimpleModelsAndRelations.Models.Recipe", "Recipe")
                        .WithMany("Meal_Recipes")
                        .HasForeignKey("RecipeId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("SimpleModelsAndRelations.Models.PreparationTime_Recipe", b =>
                {
                    b.HasOne("SimpleModelsAndRelations.Models.PreparationTime", "PreparationTime")
                        .WithMany("PreparationTime_Recipes")
                        .HasForeignKey("PreparationTimeId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("SimpleModelsAndRelations.Models.Recipe", "Recipe")
                        .WithMany("PreparationTime_Recipes")
                        .HasForeignKey("RecipeId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("SimpleModelsAndRelations.Models.Recipe_Rating", b =>
                {
                    b.HasOne("SimpleModelsAndRelations.Models.Rating", "Rating")
                        .WithMany("Recipe_Ratings")
                        .HasForeignKey("RatingId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("SimpleModelsAndRelations.Models.Recipe", "Recipe")
                        .WithMany("Recipe_Ratings")
                        .HasForeignKey("RecipeId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("SimpleModelsAndRelations.Models.RecommendationPage_Recipe", b =>
                {
                    b.HasOne("SimpleModelsAndRelations.Models.Recipe", "Recipe")
                        .WithMany("RecommendationPage_Recipes")
                        .HasForeignKey("RecipeId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("SimpleModelsAndRelations.Models.RecommendationPage", "RecommendationPage")
                        .WithMany("RecommendationPage_Recipes")
                        .HasForeignKey("RecommendationPageId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("SimpleModelsAndRelations.Models.User_Recipe", b =>
                {
                    b.HasOne("SimpleModelsAndRelations.Models.Recipe", "Recipe")
                        .WithMany("User_Recipes")
                        .HasForeignKey("RecipeId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("SimpleModelsAndRelations.Models.User", "User")
                        .WithMany("User_Recipes")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("SimpleModelsAndRelations.Models.User_RecommendationPage", b =>
                {
                    b.HasOne("SimpleModelsAndRelations.Models.RecommendationPage", "RecommendationPage")
                        .WithMany("User_RecommendationPages")
                        .HasForeignKey("RecommendationPageId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("SimpleModelsAndRelations.Models.User", "User")
                        .WithMany("User_RecommendationPages")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
        }
    }
}
