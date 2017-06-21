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

            modelBuilder.Entity("SimpleModelsAndRelations.Models.Homepage", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedDate");

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

            modelBuilder.Entity("SimpleModelsAndRelations.Models.PreparationTime", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedDate");

                    b.HasKey("Id");

                    b.ToTable("PreparationTime");
                });

            modelBuilder.Entity("SimpleModelsAndRelations.Models.Recipe", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedDate");

                    b.Property<string>("CuisineType");

                    b.Property<string>("Description");

                    b.Property<string>("Ingredients");

                    b.Property<string>("MealType");

                    b.Property<string>("Name");

                    b.Property<string>("PreparationType");

                    b.Property<int>("RatingType");

                    b.HasKey("Id");

                    b.ToTable("Recipe");
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
        }
    }
}
