import * as Immutable from 'immutable'
import * as Moment from 'moment'

export type nintee = {
    Id : number
    CreatedDate:Moment.Moment
    
    Kind:"nintee"
  }
  
export type thirty = {
    Id : number
    CreatedDate:Moment.Moment
    
    Kind:"thirty"
  }
  
export type Meal = {
    Id : number
    CreatedDate:Moment.Moment
    
    
  } & (Lunch | Brunch | Dinner | Breakfast)
  
export type Asian = {
    Id : number
    CreatedDate:Moment.Moment
    
    Kind:"Asian"
  }
  
export type Cuisine = {
    Id : number
    CreatedDate:Moment.Moment
    
    
  } & (Asian | Mediterranean | Grill)
  
export type PreparationTime = {
    Id : number
    CreatedDate:Moment.Moment
    
    
  } & (nintee | thirty | sixty | fifteen)
  
export type sixty = {
    Id : number
    CreatedDate:Moment.Moment
    
    Kind:"sixty"
  }
  
export type RecommendationPage = {
    Id : number
    CreatedDate:Moment.Moment
    
    
  }
  
export type Lunch = {
    Id : number
    CreatedDate:Moment.Moment
    
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
    
    Kind:"Brunch"
  }
  
export type Recipe = {
    Id : number
    CreatedDate:Moment.Moment
    Name : string
  Ingredients : string
  Description : string
  RatingType : number
  Picture : string
    
  }
  
export type Dinner = {
    Id : number
    CreatedDate:Moment.Moment
    
    Kind:"Dinner"
  }
  
export type Mediterranean = {
    Id : number
    CreatedDate:Moment.Moment
    
    Kind:"Mediterranean"
  }
  
export type Breakfast = {
    Id : number
    CreatedDate:Moment.Moment
    
    Kind:"Breakfast"
  }
  
export type Favorite = {
    Id : number
    CreatedDate:Moment.Moment
    
    
  }
  
export type fifteen = {
    Id : number
    CreatedDate:Moment.Moment
    
    Kind:"fifteen"
  }
  
export type Rating = {
    Id : number
    CreatedDate:Moment.Moment
    
    
  }
  
export type Grill = {
    Id : number
    CreatedDate:Moment.Moment
    
    Kind:"Grill"
  }
  
export type Asian_Recipe = {
    Id : number
    CreatedDate:Moment.Moment
    AsianId : number
  RecipeId : number
    
  }
  

export type Mediterranean_Recipe = {
    Id : number
    CreatedDate:Moment.Moment
    MediterraneanId : number
  RecipeId : number
    
  }
  

export type Grill_Recipe = {
    Id : number
    CreatedDate:Moment.Moment
    GrillId : number
  RecipeId : number
    
  }
  

export type Breakfast_Recipe = {
    Id : number
    CreatedDate:Moment.Moment
    BreakfastId : number
  RecipeId : number
    
  }
  

export type Brunch_Recipe = {
    Id : number
    CreatedDate:Moment.Moment
    BrunchId : number
  RecipeId : number
    
  }
  

export type Lunch_Recipe = {
    Id : number
    CreatedDate:Moment.Moment
    LunchId : number
  RecipeId : number
    
  }
  

export type Dinner_Recipe = {
    Id : number
    CreatedDate:Moment.Moment
    DinnerId : number
  RecipeId : number
    
  }
  

export type PreparationTime_Recipe = {
    Id : number
    CreatedDate:Moment.Moment
    PreparationTimeId : number
  RecipeId : number
    
  }
  

export type User_Favorite = {
    Id : number
    CreatedDate:Moment.Moment
    UserId : number
  FavoriteId : number
    
  }
  

export type User_Rating = {
    Id : number
    CreatedDate:Moment.Moment
    UserId : number
  RatingId : number
    
  }
  

export type User_RecommendationPage = {
    Id : number
    CreatedDate:Moment.Moment
    UserId : number
  RecommendationPageId : number
    
  }
  

export type Favorite_Recipe = {
    Id : number
    CreatedDate:Moment.Moment
    FavoriteId : number
  RecipeId : number
    
  }
  

export type Rating_Recipe = {
    Id : number
    CreatedDate:Moment.Moment
    RatingId : number
  RecipeId : number
    
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
  

