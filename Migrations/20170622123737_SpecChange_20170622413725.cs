using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace SimpleModelsAndRelations.Migrations
{
    public partial class SpecChange_20170622413725 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Cuisine",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    Discriminator = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cuisine", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Favorite",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    CreatedDate = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Favorite", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Homepage",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    CreatedDate = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Homepage", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Meal",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    Discriminator = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Meal", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PreparationTime",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    Discriminator = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PreparationTime", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Rating",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    CreatedDate = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rating", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Recipe",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    Description = table.Column<string>(nullable: true),
                    Ingredients = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    Picture = table.Column<string>(nullable: true),
                    RatingType = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Recipe", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RecommendationPage",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    CreatedDate = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RecommendationPage", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Session",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Content = table.Column<string>(nullable: true),
                    CookieName = table.Column<string>(nullable: true),
                    CreatedAt = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Session", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    Email = table.Column<string>(nullable: true),
                    Language = table.Column<string>(nullable: true),
                    PasswordHash = table.Column<string>(nullable: true),
                    PasswordSalt = table.Column<string>(nullable: true),
                    Username = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Asian_Recipe",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    AsianId = table.Column<int>(nullable: false),
                    RecipeId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Asian_Recipe", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Asian_Recipe_Cuisine_AsianId",
                        column: x => x.AsianId,
                        principalTable: "Cuisine",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Asian_Recipe_Recipe_RecipeId",
                        column: x => x.RecipeId,
                        principalTable: "Recipe",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Breakfast_Recipe",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    BreakfastId = table.Column<int>(nullable: false),
                    RecipeId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Breakfast_Recipe", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Breakfast_Recipe_Meal_BreakfastId",
                        column: x => x.BreakfastId,
                        principalTable: "Meal",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Breakfast_Recipe_Recipe_RecipeId",
                        column: x => x.RecipeId,
                        principalTable: "Recipe",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Brunch_Recipe",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    BrunchId = table.Column<int>(nullable: false),
                    RecipeId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Brunch_Recipe", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Brunch_Recipe_Meal_BrunchId",
                        column: x => x.BrunchId,
                        principalTable: "Meal",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Brunch_Recipe_Recipe_RecipeId",
                        column: x => x.RecipeId,
                        principalTable: "Recipe",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Dinner_Recipe",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    DinnerId = table.Column<int>(nullable: false),
                    RecipeId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Dinner_Recipe", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Dinner_Recipe_Meal_DinnerId",
                        column: x => x.DinnerId,
                        principalTable: "Meal",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Dinner_Recipe_Recipe_RecipeId",
                        column: x => x.RecipeId,
                        principalTable: "Recipe",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Favorite_Recipe",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    FavoriteId = table.Column<int>(nullable: false),
                    RecipeId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Favorite_Recipe", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Favorite_Recipe_Favorite_FavoriteId",
                        column: x => x.FavoriteId,
                        principalTable: "Favorite",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Favorite_Recipe_Recipe_RecipeId",
                        column: x => x.RecipeId,
                        principalTable: "Recipe",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Grill_Recipe",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    GrillId = table.Column<int>(nullable: false),
                    RecipeId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Grill_Recipe", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Grill_Recipe_Cuisine_GrillId",
                        column: x => x.GrillId,
                        principalTable: "Cuisine",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Grill_Recipe_Recipe_RecipeId",
                        column: x => x.RecipeId,
                        principalTable: "Recipe",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Lunch_Recipe",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    LunchId = table.Column<int>(nullable: false),
                    RecipeId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Lunch_Recipe", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Lunch_Recipe_Meal_LunchId",
                        column: x => x.LunchId,
                        principalTable: "Meal",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Lunch_Recipe_Recipe_RecipeId",
                        column: x => x.RecipeId,
                        principalTable: "Recipe",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Mediterranean_Recipe",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    MediterraneanId = table.Column<int>(nullable: false),
                    RecipeId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Mediterranean_Recipe", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Mediterranean_Recipe_Cuisine_MediterraneanId",
                        column: x => x.MediterraneanId,
                        principalTable: "Cuisine",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Mediterranean_Recipe_Recipe_RecipeId",
                        column: x => x.RecipeId,
                        principalTable: "Recipe",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PreparationTime_Recipe",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    PreparationTimeId = table.Column<int>(nullable: false),
                    RecipeId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PreparationTime_Recipe", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PreparationTime_Recipe_PreparationTime_PreparationTimeId",
                        column: x => x.PreparationTimeId,
                        principalTable: "PreparationTime",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PreparationTime_Recipe_Recipe_RecipeId",
                        column: x => x.RecipeId,
                        principalTable: "Recipe",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Rating_Recipe",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    RatingId = table.Column<int>(nullable: false),
                    RecipeId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rating_Recipe", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Rating_Recipe_Rating_RatingId",
                        column: x => x.RatingId,
                        principalTable: "Rating",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Rating_Recipe_Recipe_RecipeId",
                        column: x => x.RecipeId,
                        principalTable: "Recipe",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RecommendationPage_Recipe",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    RecipeId = table.Column<int>(nullable: false),
                    RecommendationPageId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RecommendationPage_Recipe", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RecommendationPage_Recipe_Recipe_RecipeId",
                        column: x => x.RecipeId,
                        principalTable: "Recipe",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RecommendationPage_Recipe_RecommendationPage_RecommendationPageId",
                        column: x => x.RecommendationPageId,
                        principalTable: "RecommendationPage",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "User_Favorite",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    FavoriteId = table.Column<int>(nullable: false),
                    UserId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User_Favorite", x => x.Id);
                    table.ForeignKey(
                        name: "FK_User_Favorite_Favorite_FavoriteId",
                        column: x => x.FavoriteId,
                        principalTable: "Favorite",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_User_Favorite_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "User_Rating",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    RatingId = table.Column<int>(nullable: false),
                    UserId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User_Rating", x => x.Id);
                    table.ForeignKey(
                        name: "FK_User_Rating_Rating_RatingId",
                        column: x => x.RatingId,
                        principalTable: "Rating",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_User_Rating_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "User_RecommendationPage",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    RecommendationPageId = table.Column<int>(nullable: false),
                    UserId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User_RecommendationPage", x => x.Id);
                    table.ForeignKey(
                        name: "FK_User_RecommendationPage_RecommendationPage_RecommendationPageId",
                        column: x => x.RecommendationPageId,
                        principalTable: "RecommendationPage",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_User_RecommendationPage_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Asian_Recipe_AsianId",
                table: "Asian_Recipe",
                column: "AsianId");

            migrationBuilder.CreateIndex(
                name: "IX_Asian_Recipe_RecipeId",
                table: "Asian_Recipe",
                column: "RecipeId");

            migrationBuilder.CreateIndex(
                name: "IX_Breakfast_Recipe_BreakfastId",
                table: "Breakfast_Recipe",
                column: "BreakfastId");

            migrationBuilder.CreateIndex(
                name: "IX_Breakfast_Recipe_RecipeId",
                table: "Breakfast_Recipe",
                column: "RecipeId");

            migrationBuilder.CreateIndex(
                name: "IX_Brunch_Recipe_BrunchId",
                table: "Brunch_Recipe",
                column: "BrunchId");

            migrationBuilder.CreateIndex(
                name: "IX_Brunch_Recipe_RecipeId",
                table: "Brunch_Recipe",
                column: "RecipeId");

            migrationBuilder.CreateIndex(
                name: "IX_Dinner_Recipe_DinnerId",
                table: "Dinner_Recipe",
                column: "DinnerId");

            migrationBuilder.CreateIndex(
                name: "IX_Dinner_Recipe_RecipeId",
                table: "Dinner_Recipe",
                column: "RecipeId");

            migrationBuilder.CreateIndex(
                name: "IX_Favorite_Recipe_FavoriteId",
                table: "Favorite_Recipe",
                column: "FavoriteId");

            migrationBuilder.CreateIndex(
                name: "IX_Favorite_Recipe_RecipeId",
                table: "Favorite_Recipe",
                column: "RecipeId");

            migrationBuilder.CreateIndex(
                name: "IX_Grill_Recipe_GrillId",
                table: "Grill_Recipe",
                column: "GrillId");

            migrationBuilder.CreateIndex(
                name: "IX_Grill_Recipe_RecipeId",
                table: "Grill_Recipe",
                column: "RecipeId");

            migrationBuilder.CreateIndex(
                name: "IX_Lunch_Recipe_LunchId",
                table: "Lunch_Recipe",
                column: "LunchId");

            migrationBuilder.CreateIndex(
                name: "IX_Lunch_Recipe_RecipeId",
                table: "Lunch_Recipe",
                column: "RecipeId");

            migrationBuilder.CreateIndex(
                name: "IX_Mediterranean_Recipe_MediterraneanId",
                table: "Mediterranean_Recipe",
                column: "MediterraneanId");

            migrationBuilder.CreateIndex(
                name: "IX_Mediterranean_Recipe_RecipeId",
                table: "Mediterranean_Recipe",
                column: "RecipeId");

            migrationBuilder.CreateIndex(
                name: "IX_PreparationTime_Recipe_PreparationTimeId",
                table: "PreparationTime_Recipe",
                column: "PreparationTimeId");

            migrationBuilder.CreateIndex(
                name: "IX_PreparationTime_Recipe_RecipeId",
                table: "PreparationTime_Recipe",
                column: "RecipeId");

            migrationBuilder.CreateIndex(
                name: "IX_Rating_Recipe_RatingId",
                table: "Rating_Recipe",
                column: "RatingId");

            migrationBuilder.CreateIndex(
                name: "IX_Rating_Recipe_RecipeId",
                table: "Rating_Recipe",
                column: "RecipeId");

            migrationBuilder.CreateIndex(
                name: "IX_RecommendationPage_Recipe_RecipeId",
                table: "RecommendationPage_Recipe",
                column: "RecipeId");

            migrationBuilder.CreateIndex(
                name: "IX_RecommendationPage_Recipe_RecommendationPageId",
                table: "RecommendationPage_Recipe",
                column: "RecommendationPageId");

            migrationBuilder.CreateIndex(
                name: "IX_Session_CookieName",
                table: "Session",
                column: "CookieName");

            migrationBuilder.CreateIndex(
                name: "IX_User_Email",
                table: "User",
                column: "Email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_User_Username",
                table: "User",
                column: "Username",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_User_Favorite_FavoriteId",
                table: "User_Favorite",
                column: "FavoriteId");

            migrationBuilder.CreateIndex(
                name: "IX_User_Favorite_UserId",
                table: "User_Favorite",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_User_Rating_RatingId",
                table: "User_Rating",
                column: "RatingId");

            migrationBuilder.CreateIndex(
                name: "IX_User_Rating_UserId",
                table: "User_Rating",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_User_RecommendationPage_RecommendationPageId",
                table: "User_RecommendationPage",
                column: "RecommendationPageId");

            migrationBuilder.CreateIndex(
                name: "IX_User_RecommendationPage_UserId",
                table: "User_RecommendationPage",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Asian_Recipe");

            migrationBuilder.DropTable(
                name: "Breakfast_Recipe");

            migrationBuilder.DropTable(
                name: "Brunch_Recipe");

            migrationBuilder.DropTable(
                name: "Dinner_Recipe");

            migrationBuilder.DropTable(
                name: "Favorite_Recipe");

            migrationBuilder.DropTable(
                name: "Grill_Recipe");

            migrationBuilder.DropTable(
                name: "Homepage");

            migrationBuilder.DropTable(
                name: "Lunch_Recipe");

            migrationBuilder.DropTable(
                name: "Mediterranean_Recipe");

            migrationBuilder.DropTable(
                name: "PreparationTime_Recipe");

            migrationBuilder.DropTable(
                name: "Rating_Recipe");

            migrationBuilder.DropTable(
                name: "RecommendationPage_Recipe");

            migrationBuilder.DropTable(
                name: "Session");

            migrationBuilder.DropTable(
                name: "User_Favorite");

            migrationBuilder.DropTable(
                name: "User_Rating");

            migrationBuilder.DropTable(
                name: "User_RecommendationPage");

            migrationBuilder.DropTable(
                name: "Meal");

            migrationBuilder.DropTable(
                name: "Cuisine");

            migrationBuilder.DropTable(
                name: "PreparationTime");

            migrationBuilder.DropTable(
                name: "Recipe");

            migrationBuilder.DropTable(
                name: "Favorite");

            migrationBuilder.DropTable(
                name: "Rating");

            migrationBuilder.DropTable(
                name: "RecommendationPage");

            migrationBuilder.DropTable(
                name: "User");
        }
    }
}
