using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using SimpleModelsAndRelations.Models;

namespace SimpleModelsAndRelations.Migrations
{
    [DbContext(typeof(SimpleModelsAndRelationsContext))]
    [Migration("20170622124022_SpecChange_20170622414009")]
    partial class SpecChange_20170622414009
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.1.1");

            modelBuilder.Entity("SimpleModelsAndRelations.Models.Asian_Recipe", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AsianId");

                    b.Property<int>("RecipeId");

                    b.HasKey("Id");

                    b.HasIndex("AsianId");

                    b.HasIndex("RecipeId");

                    b.ToTable("Asian_Recipe");
                });

            modelBuilder.Entity("SimpleModelsAndRelations.Models.Breakfast_Recipe", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("BreakfastId");

                    b.Property<int>("RecipeId");

                    b.HasKey("Id");

                    b.HasIndex("BreakfastId");

                    b.HasIndex("RecipeId");

                    b.ToTable("Breakfast_Recipe");
                });

            modelBuilder.Entity("SimpleModelsAndRelations.Models.Brunch_Recipe", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("BrunchId");

                    b.Property<int>("RecipeId");

                    b.HasKey("Id");

                    b.HasIndex("BrunchId");

                    b.HasIndex("RecipeId");

                    b.ToTable("Brunch_Recipe");
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

            modelBuilder.Entity("SimpleModelsAndRelations.Models.Dinner_Recipe", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("DinnerId");

                    b.Property<int>("RecipeId");

                    b.HasKey("Id");

                    b.HasIndex("DinnerId");

                    b.HasIndex("RecipeId");

                    b.ToTable("Dinner_Recipe");
                });

            modelBuilder.Entity("SimpleModelsAndRelations.Models.Favorite", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedDate");

                    b.HasKey("Id");

                    b.ToTable("Favorite");
                });

            modelBuilder.Entity("SimpleModelsAndRelations.Models.Favorite_Recipe", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("FavoriteId");

                    b.Property<int>("RecipeId");

                    b.HasKey("Id");

                    b.HasIndex("FavoriteId");

                    b.HasIndex("RecipeId");

                    b.ToTable("Favorite_Recipe");
                });

            modelBuilder.Entity("SimpleModelsAndRelations.Models.Grill_Recipe", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("GrillId");

                    b.Property<int>("RecipeId");

                    b.HasKey("Id");

                    b.HasIndex("GrillId");

                    b.HasIndex("RecipeId");

                    b.ToTable("Grill_Recipe");
                });

            modelBuilder.Entity("SimpleModelsAndRelations.Models.Homepage", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedDate");

                    b.HasKey("Id");

                    b.ToTable("Homepage");
                });

            modelBuilder.Entity("SimpleModelsAndRelations.Models.Lunch_Recipe", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("LunchId");

                    b.Property<int>("RecipeId");

                    b.HasKey("Id");

                    b.HasIndex("LunchId");

                    b.HasIndex("RecipeId");

                    b.ToTable("Lunch_Recipe");
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

            modelBuilder.Entity("SimpleModelsAndRelations.Models.Mediterranean_Recipe", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("MediterraneanId");

                    b.Property<int>("RecipeId");

                    b.HasKey("Id");

                    b.HasIndex("MediterraneanId");

                    b.HasIndex("RecipeId");

                    b.ToTable("Mediterranean_Recipe");
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

                    b.HasKey("Id");

                    b.ToTable("Rating");
                });

            modelBuilder.Entity("SimpleModelsAndRelations.Models.Rating_Recipe", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("RatingId");

                    b.Property<int>("RecipeId");

                    b.HasKey("Id");

                    b.HasIndex("RatingId");

                    b.HasIndex("RecipeId");

                    b.ToTable("Rating_Recipe");
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

                    b.Property<int>("RatingType");

                    b.HasKey("Id");

                    b.ToTable("Recipe");
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

                    b.Property<string>("Content");

                    b.Property<string>("CookieName");

                    b.Property<DateTime>("CreatedAt");

                    b.HasKey("Id");

                    b.HasIndex("CookieName");

                    b.ToTable("Session");
                });

            modelBuilder.Entity("SimpleModelsAndRelations.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedDate");

                    b.Property<string>("Email");

                    b.Property<string>("Language");

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

            modelBuilder.Entity("SimpleModelsAndRelations.Models.User_Favorite", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("FavoriteId");

                    b.Property<int>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("FavoriteId");

                    b.HasIndex("UserId");

                    b.ToTable("User_Favorite");
                });

            modelBuilder.Entity("SimpleModelsAndRelations.Models.User_Rating", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("RatingId");

                    b.Property<int>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("RatingId");

                    b.HasIndex("UserId");

                    b.ToTable("User_Rating");
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


                    b.ToTable("Asian");

                    b.HasDiscriminator().HasValue("Asian");
                });

            modelBuilder.Entity("SimpleModelsAndRelations.Models.Grill", b =>
                {
                    b.HasBaseType("SimpleModelsAndRelations.Models.Cuisine");


                    b.ToTable("Grill");

                    b.HasDiscriminator().HasValue("Grill");
                });

            modelBuilder.Entity("SimpleModelsAndRelations.Models.Mediterranean", b =>
                {
                    b.HasBaseType("SimpleModelsAndRelations.Models.Cuisine");


                    b.ToTable("Mediterranean");

                    b.HasDiscriminator().HasValue("Mediterranean");
                });

            modelBuilder.Entity("SimpleModelsAndRelations.Models.Breakfast", b =>
                {
                    b.HasBaseType("SimpleModelsAndRelations.Models.Meal");


                    b.ToTable("Breakfast");

                    b.HasDiscriminator().HasValue("Breakfast");
                });

            modelBuilder.Entity("SimpleModelsAndRelations.Models.Brunch", b =>
                {
                    b.HasBaseType("SimpleModelsAndRelations.Models.Meal");


                    b.ToTable("Brunch");

                    b.HasDiscriminator().HasValue("Brunch");
                });

            modelBuilder.Entity("SimpleModelsAndRelations.Models.Dinner", b =>
                {
                    b.HasBaseType("SimpleModelsAndRelations.Models.Meal");


                    b.ToTable("Dinner");

                    b.HasDiscriminator().HasValue("Dinner");
                });

            modelBuilder.Entity("SimpleModelsAndRelations.Models.Lunch", b =>
                {
                    b.HasBaseType("SimpleModelsAndRelations.Models.Meal");


                    b.ToTable("Lunch");

                    b.HasDiscriminator().HasValue("Lunch");
                });

            modelBuilder.Entity("SimpleModelsAndRelations.Models.fifteen", b =>
                {
                    b.HasBaseType("SimpleModelsAndRelations.Models.PreparationTime");

                    b.Property<string>("Description");

                    b.ToTable("fifteen");

                    b.HasDiscriminator().HasValue("fifteen");
                });

            modelBuilder.Entity("SimpleModelsAndRelations.Models.nintee", b =>
                {
                    b.HasBaseType("SimpleModelsAndRelations.Models.PreparationTime");

                    b.Property<string>("Description");

                    b.ToTable("nintee");

                    b.HasDiscriminator().HasValue("nintee");
                });

            modelBuilder.Entity("SimpleModelsAndRelations.Models.sixty", b =>
                {
                    b.HasBaseType("SimpleModelsAndRelations.Models.PreparationTime");

                    b.Property<string>("Description");

                    b.ToTable("sixty");

                    b.HasDiscriminator().HasValue("sixty");
                });

            modelBuilder.Entity("SimpleModelsAndRelations.Models.thirty", b =>
                {
                    b.HasBaseType("SimpleModelsAndRelations.Models.PreparationTime");

                    b.Property<string>("Description");

                    b.ToTable("thirty");

                    b.HasDiscriminator().HasValue("thirty");
                });

            modelBuilder.Entity("SimpleModelsAndRelations.Models.Asian_Recipe", b =>
                {
                    b.HasOne("SimpleModelsAndRelations.Models.Asian", "Asian")
                        .WithMany("Asian_Recipes")
                        .HasForeignKey("AsianId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("SimpleModelsAndRelations.Models.Recipe", "Recipe")
                        .WithMany("Asian_Recipes")
                        .HasForeignKey("RecipeId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("SimpleModelsAndRelations.Models.Breakfast_Recipe", b =>
                {
                    b.HasOne("SimpleModelsAndRelations.Models.Breakfast", "Breakfast")
                        .WithMany("Breakfast_Recipes")
                        .HasForeignKey("BreakfastId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("SimpleModelsAndRelations.Models.Recipe", "Recipe")
                        .WithMany("Breakfast_Recipes")
                        .HasForeignKey("RecipeId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("SimpleModelsAndRelations.Models.Brunch_Recipe", b =>
                {
                    b.HasOne("SimpleModelsAndRelations.Models.Brunch", "Brunch")
                        .WithMany("Brunch_Recipes")
                        .HasForeignKey("BrunchId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("SimpleModelsAndRelations.Models.Recipe", "Recipe")
                        .WithMany("Brunch_Recipes")
                        .HasForeignKey("RecipeId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("SimpleModelsAndRelations.Models.Dinner_Recipe", b =>
                {
                    b.HasOne("SimpleModelsAndRelations.Models.Dinner", "Dinner")
                        .WithMany("Dinner_Recipes")
                        .HasForeignKey("DinnerId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("SimpleModelsAndRelations.Models.Recipe", "Recipe")
                        .WithMany("Dinner_Recipes")
                        .HasForeignKey("RecipeId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("SimpleModelsAndRelations.Models.Favorite_Recipe", b =>
                {
                    b.HasOne("SimpleModelsAndRelations.Models.Favorite", "Favorite")
                        .WithMany("Favorite_Recipes")
                        .HasForeignKey("FavoriteId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("SimpleModelsAndRelations.Models.Recipe", "Recipe")
                        .WithMany("Favorite_Recipes")
                        .HasForeignKey("RecipeId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("SimpleModelsAndRelations.Models.Grill_Recipe", b =>
                {
                    b.HasOne("SimpleModelsAndRelations.Models.Grill", "Grill")
                        .WithMany("Grill_Recipes")
                        .HasForeignKey("GrillId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("SimpleModelsAndRelations.Models.Recipe", "Recipe")
                        .WithMany("Grill_Recipes")
                        .HasForeignKey("RecipeId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("SimpleModelsAndRelations.Models.Lunch_Recipe", b =>
                {
                    b.HasOne("SimpleModelsAndRelations.Models.Lunch", "Lunch")
                        .WithMany("Lunch_Recipes")
                        .HasForeignKey("LunchId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("SimpleModelsAndRelations.Models.Recipe", "Recipe")
                        .WithMany("Lunch_Recipes")
                        .HasForeignKey("RecipeId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("SimpleModelsAndRelations.Models.Mediterranean_Recipe", b =>
                {
                    b.HasOne("SimpleModelsAndRelations.Models.Mediterranean", "Mediterranean")
                        .WithMany("Mediterranean_Recipes")
                        .HasForeignKey("MediterraneanId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("SimpleModelsAndRelations.Models.Recipe", "Recipe")
                        .WithMany("Mediterranean_Recipes")
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

            modelBuilder.Entity("SimpleModelsAndRelations.Models.Rating_Recipe", b =>
                {
                    b.HasOne("SimpleModelsAndRelations.Models.Rating", "Rating")
                        .WithMany("Rating_Recipes")
                        .HasForeignKey("RatingId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("SimpleModelsAndRelations.Models.Recipe", "Recipe")
                        .WithMany("Rating_Recipes")
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

            modelBuilder.Entity("SimpleModelsAndRelations.Models.User_Favorite", b =>
                {
                    b.HasOne("SimpleModelsAndRelations.Models.Favorite", "Favorite")
                        .WithMany("User_Favorites")
                        .HasForeignKey("FavoriteId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("SimpleModelsAndRelations.Models.User", "User")
                        .WithMany("User_Favorites")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("SimpleModelsAndRelations.Models.User_Rating", b =>
                {
                    b.HasOne("SimpleModelsAndRelations.Models.Rating", "Rating")
                        .WithMany("User_Ratings")
                        .HasForeignKey("RatingId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("SimpleModelsAndRelations.Models.User", "User")
                        .WithMany("User_Ratings")
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
