import * as React from "react"
import * as ReactDOM from "react-dom"
import * as Immutable from "immutable"
import * as Models from '../generated_models'
import * as Api from '../generated_api'
import * as List from '../containers/list'

export let can_view_nintee = (current_User:Models.User) => true

export let can_create_nintee = (current_User:Models.User) => false

export let can_edit_nintee = (current_User:Models.User) => true

export let can_delete_nintee = (current_User:Models.User) => false
  



export let can_view_thirty = (current_User:Models.User) => true

export let can_create_thirty = (current_User:Models.User) => false

export let can_edit_thirty = (current_User:Models.User) => true

export let can_delete_thirty = (current_User:Models.User) => false
  



export let can_view_Meal = (current_User:Models.User) => true

export let can_create_Meal = (current_User:Models.User) => false

export let can_edit_Meal = (current_User:Models.User) => true

export let can_delete_Meal = (current_User:Models.User) => false
  



export let can_view_Asian = (current_User:Models.User) => true

export let can_create_Asian = (current_User:Models.User) => true

export let can_edit_Asian = (current_User:Models.User) => true

export let can_delete_Asian = (current_User:Models.User) => true
  



export let can_view_Cuisine = (current_User:Models.User) => true

export let can_create_Cuisine = (current_User:Models.User) => true

export let can_edit_Cuisine = (current_User:Models.User) => true

export let can_delete_Cuisine = (current_User:Models.User) => true
  



export let can_view_PreparationTime = (current_User:Models.User) => true

export let can_create_PreparationTime = (current_User:Models.User) => false

export let can_edit_PreparationTime = (current_User:Models.User) => true

export let can_delete_PreparationTime = (current_User:Models.User) => false
  



export let can_view_sixty = (current_User:Models.User) => true

export let can_create_sixty = (current_User:Models.User) => false

export let can_edit_sixty = (current_User:Models.User) => true

export let can_delete_sixty = (current_User:Models.User) => false
  



export let can_view_RecommendationPage = (current_User:Models.User) => true

export let can_create_RecommendationPage = (current_User:Models.User) => false

export let can_edit_RecommendationPage = (current_User:Models.User) => true

export let can_delete_RecommendationPage = (current_User:Models.User) => false
  



export let can_view_Lunch = (current_User:Models.User) => true

export let can_create_Lunch = (current_User:Models.User) => false

export let can_edit_Lunch = (current_User:Models.User) => true

export let can_delete_Lunch = (current_User:Models.User) => false
  



export let can_view_User = (current_User:Models.User) => true

export let can_create_User = (current_User:Models.User) => true

export let can_edit_User = (current_User:Models.User) => true

export let can_delete_User = (current_User:Models.User) => true
  
export let can_view_User_Username = (current_User:Models.User) => true

export let can_edit_User_Username = (current_User:Models.User) => true

export let can_view_User_Language = (current_User:Models.User) => true

export let can_edit_User_Language = (current_User:Models.User) => true

export let can_view_User_Email = (current_User:Models.User) => true

export let can_edit_User_Email = (current_User:Models.User) => true



export let can_view_Homepage = (current_User:Models.User) => true

export let can_create_Homepage = (current_User:Models.User) => false

export let can_edit_Homepage = (current_User:Models.User) => true

export let can_delete_Homepage = (current_User:Models.User) => false
  



export let can_view_Brunch = (current_User:Models.User) => true

export let can_create_Brunch = (current_User:Models.User) => false

export let can_edit_Brunch = (current_User:Models.User) => true

export let can_delete_Brunch = (current_User:Models.User) => false
  



export let can_view_Recipe = (current_User:Models.User) => true

export let can_create_Recipe = (current_User:Models.User) => false

export let can_edit_Recipe = (current_User:Models.User) => true

export let can_delete_Recipe = (current_User:Models.User) => false
  
export let can_view_Recipe_Name = (current_User:Models.User) => true

export let can_edit_Recipe_Name = (current_User:Models.User) => true

export let can_view_Recipe_Ingredients = (current_User:Models.User) => true

export let can_edit_Recipe_Ingredients = (current_User:Models.User) => true

export let can_view_Recipe_Description = (current_User:Models.User) => true

export let can_edit_Recipe_Description = (current_User:Models.User) => true

export let can_view_Recipe_RatingType = (current_User:Models.User) => true

export let can_edit_Recipe_RatingType = (current_User:Models.User) => true

export let can_view_Recipe_Picture = (current_User:Models.User) => true

export let can_edit_Recipe_Picture = (current_User:Models.User) => true



export let can_view_Dinner = (current_User:Models.User) => true

export let can_create_Dinner = (current_User:Models.User) => false

export let can_edit_Dinner = (current_User:Models.User) => true

export let can_delete_Dinner = (current_User:Models.User) => false
  



export let can_view_Mediterranean = (current_User:Models.User) => true

export let can_create_Mediterranean = (current_User:Models.User) => true

export let can_edit_Mediterranean = (current_User:Models.User) => true

export let can_delete_Mediterranean = (current_User:Models.User) => true
  



export let can_view_Breakfast = (current_User:Models.User) => true

export let can_create_Breakfast = (current_User:Models.User) => false

export let can_edit_Breakfast = (current_User:Models.User) => true

export let can_delete_Breakfast = (current_User:Models.User) => false
  



export let can_view_Favorite = (current_User:Models.User) => true

export let can_create_Favorite = (current_User:Models.User) => false

export let can_edit_Favorite = (current_User:Models.User) => true

export let can_delete_Favorite = (current_User:Models.User) => false
  



export let can_view_fifteen = (current_User:Models.User) => true

export let can_create_fifteen = (current_User:Models.User) => false

export let can_edit_fifteen = (current_User:Models.User) => true

export let can_delete_fifteen = (current_User:Models.User) => false
  



export let can_view_Rating = (current_User:Models.User) => true

export let can_create_Rating = (current_User:Models.User) => false

export let can_edit_Rating = (current_User:Models.User) => true

export let can_delete_Rating = (current_User:Models.User) => false
  



export let can_view_Grill = (current_User:Models.User) => true

export let can_create_Grill = (current_User:Models.User) => true

export let can_edit_Grill = (current_User:Models.User) => true

export let can_delete_Grill = (current_User:Models.User) => true
  




export let can_view_Asian_Recipe = (current_User:Models.User) => true

export let can_create_Asian_Recipe = (current_User:Models.User) => true

export let can_edit_Asian_Recipe = (current_User:Models.User) => true

export let can_delete_Asian_Recipe = (current_User:Models.User) => true
  

export let can_view_Mediterranean_Recipe = (current_User:Models.User) => true

export let can_create_Mediterranean_Recipe = (current_User:Models.User) => true

export let can_edit_Mediterranean_Recipe = (current_User:Models.User) => true

export let can_delete_Mediterranean_Recipe = (current_User:Models.User) => true
  

export let can_view_Grill_Recipe = (current_User:Models.User) => true

export let can_create_Grill_Recipe = (current_User:Models.User) => true

export let can_edit_Grill_Recipe = (current_User:Models.User) => true

export let can_delete_Grill_Recipe = (current_User:Models.User) => true
  

export let can_view_Breakfast_Recipe = (current_User:Models.User) => true

export let can_create_Breakfast_Recipe = (current_User:Models.User) => true

export let can_edit_Breakfast_Recipe = (current_User:Models.User) => true

export let can_delete_Breakfast_Recipe = (current_User:Models.User) => true
  

export let can_view_Brunch_Recipe = (current_User:Models.User) => true

export let can_create_Brunch_Recipe = (current_User:Models.User) => true

export let can_edit_Brunch_Recipe = (current_User:Models.User) => true

export let can_delete_Brunch_Recipe = (current_User:Models.User) => true
  

export let can_view_Lunch_Recipe = (current_User:Models.User) => true

export let can_create_Lunch_Recipe = (current_User:Models.User) => true

export let can_edit_Lunch_Recipe = (current_User:Models.User) => true

export let can_delete_Lunch_Recipe = (current_User:Models.User) => true
  

export let can_view_Dinner_Recipe = (current_User:Models.User) => true

export let can_create_Dinner_Recipe = (current_User:Models.User) => true

export let can_edit_Dinner_Recipe = (current_User:Models.User) => true

export let can_delete_Dinner_Recipe = (current_User:Models.User) => true
  

export let can_view_PreparationTime_Recipe = (current_User:Models.User) => true

export let can_create_PreparationTime_Recipe = (current_User:Models.User) => true

export let can_edit_PreparationTime_Recipe = (current_User:Models.User) => true

export let can_delete_PreparationTime_Recipe = (current_User:Models.User) => true
  

export let can_view_User_Favorite = (current_User:Models.User) => true

export let can_create_User_Favorite = (current_User:Models.User) => true

export let can_edit_User_Favorite = (current_User:Models.User) => true

export let can_delete_User_Favorite = (current_User:Models.User) => true
  

export let can_view_User_Rating = (current_User:Models.User) => true

export let can_create_User_Rating = (current_User:Models.User) => true

export let can_edit_User_Rating = (current_User:Models.User) => true

export let can_delete_User_Rating = (current_User:Models.User) => true
  

export let can_view_User_RecommendationPage = (current_User:Models.User) => true

export let can_create_User_RecommendationPage = (current_User:Models.User) => true

export let can_edit_User_RecommendationPage = (current_User:Models.User) => true

export let can_delete_User_RecommendationPage = (current_User:Models.User) => true
  

export let can_view_Favorite_Recipe = (current_User:Models.User) => true

export let can_create_Favorite_Recipe = (current_User:Models.User) => true

export let can_edit_Favorite_Recipe = (current_User:Models.User) => true

export let can_delete_Favorite_Recipe = (current_User:Models.User) => true
  

export let can_view_Rating_Recipe = (current_User:Models.User) => true

export let can_create_Rating_Recipe = (current_User:Models.User) => true

export let can_edit_Rating_Recipe = (current_User:Models.User) => true

export let can_delete_Rating_Recipe = (current_User:Models.User) => true
  

export let can_view_RecommendationPage_Recipe = (current_User:Models.User) => true

export let can_create_RecommendationPage_Recipe = (current_User:Models.User) => true

export let can_edit_RecommendationPage_Recipe = (current_User:Models.User) => true

export let can_delete_RecommendationPage_Recipe = (current_User:Models.User) => true
  

export let can_view_Homepage_Recipe = (current_User:Models.User) => true

export let can_create_Homepage_Recipe = (current_User:Models.User) => true

export let can_edit_Homepage_Recipe = (current_User:Models.User) => true

export let can_delete_Homepage_Recipe = (current_User:Models.User) => true
  


