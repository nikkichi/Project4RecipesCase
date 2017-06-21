import * as Immutable from 'immutable'
import * as Moment from 'moment'

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
    
    
  }
  
export type Lunch = {
    Id : number
    CreatedDate:Moment.Moment
    
    Kind:"Lunch"
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
  Description : string
  RatingType : number
  Ingredients : string
  CuisineType : string
  MealType : string
  PreparationType : string
    
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
  
export type Grill = {
    Id : number
    CreatedDate:Moment.Moment
    
    Kind:"Grill"
  }
  

