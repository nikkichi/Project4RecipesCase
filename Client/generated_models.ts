import * as Immutable from 'immutable'
import * as Moment from 'moment'

export type Thirty = {
    Id : number
    CreatedDate:Moment.Moment
    Description : string
    Kind:"Thirty"
  }
  
export type Meal = {
    Id : number
    CreatedDate:Moment.Moment
    
    
  } & (Lunch | Brunch | Dinner | Breakfast)
  
export type Asian = {
    Id : number
    CreatedDate:Moment.Moment
    Description : string
    Kind:"Asian"
  }
  
export type Cuisine = {
    Id : number
    CreatedDate:Moment.Moment
    
    
  } & (Asian | Mediterranean | Grill)
  
export type PreparationTime = {
    Id : number
    CreatedDate:Moment.Moment
    
    
  } & (Thirty | Sixty | Ninety | Fifteen)
  
export type Sixty = {
    Id : number
    CreatedDate:Moment.Moment
    Description : string
    Kind:"Sixty"
  }
  
export type RecommendationPage = {
    Id : number
    CreatedDate:Moment.Moment
    
    
  }
  
export type Lunch = {
    Id : number
    CreatedDate:Moment.Moment
    Description : string
    Kind:"Lunch"
  }
  
export type User = {
    Id : number
    CreatedDate:Moment.Moment
    Username : string
  Language : string
  Email : string
HasPassword:boolean
    
  }
  
export type Homepage = {
    Id : number
    CreatedDate:Moment.Moment
    
    
  }
  
export type Brunch = {
    Id : number
    CreatedDate:Moment.Moment
    Description : string
    Kind:"Brunch"
  }
  
export type Recipe = {
    Id : number
    CreatedDate:Moment.Moment
    Name : string
  Ingredients : string
  Description : string
  Picture : string
    
  }
  
export type Dinner = {
    Id : number
    CreatedDate:Moment.Moment
    Description : string
    Kind:"Dinner"
  }
  
export type Mediterranean = {
    Id : number
    CreatedDate:Moment.Moment
    Description : string
    Kind:"Mediterranean"
  }
  
export type Ninety = {
    Id : number
    CreatedDate:Moment.Moment
    Description : string
    Kind:"Ninety"
  }
  
export type Breakfast = {
    Id : number
    CreatedDate:Moment.Moment
    Description : string
    Kind:"Breakfast"
  }
  
export type Fifteen = {
    Id : number
    CreatedDate:Moment.Moment
    Description : string
    Kind:"Fifteen"
  }
  
export type Rating = {
    Id : number
    CreatedDate:Moment.Moment
    Number : number
    
  }
  
export type Grill = {
    Id : number
    CreatedDate:Moment.Moment
    Description : string
    Kind:"Grill"
  }
  
export type Cuisine_Meal = {
    Id : number
    CreatedDate:Moment.Moment
    CuisineId : number
  MealId : number
    
  }
  

export type Meal_Recipe = {
    Id : number
    CreatedDate:Moment.Moment
    MealId : number
  RecipeId : number
    
  }
  

export type PreparationTime_Recipe = {
    Id : number
    CreatedDate:Moment.Moment
    PreparationTimeId : number
  RecipeId : number
    
  }
  

export type User_Recipe = {
    Id : number
    CreatedDate:Moment.Moment
    UserId : number
  RecipeId : number
    
  }
  

export type Recipe_Rating = {
    Id : number
    CreatedDate:Moment.Moment
    RecipeId : number
  RatingId : number
    
  }
  

export type User_RecommendationPage = {
    Id : number
    CreatedDate:Moment.Moment
    UserId : number
  RecommendationPageId : number
    
  }
  

export type RecommendationPage_Recipe = {
    Id : number
    CreatedDate:Moment.Moment
    RecommendationPageId : number
  RecipeId : number
    
  }
  

export type Homepage_Recipe = {
    Id : number
    CreatedDate:Moment.Moment
    HomepageId : number
  RecipeId : number
    
  }
  

export type Homepage_RecommendationPage = {
    Id : number
    CreatedDate:Moment.Moment
    HomepageId : number
  RecommendationPageId : number
    
  }
  

export type Homepage_Cuisine = {
    Id : number
    CreatedDate:Moment.Moment
    HomepageId : number
  CuisineId : number
    
  }
  

