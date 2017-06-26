import * as React from "react"
import * as ReactDOM from "react-dom"
import * as Immutable from "immutable"
import * as Models from '../generated_models'
import * as Api from '../generated_api'
import * as List from '../containers/list'
import * as Components from '../components/components'
import * as Buttons from '../containers/button_utils'
import * as ToggleContainer from '../containers/toggle_container'
import * as Permissions from './permissions'
import * as Utils from './view_utils'
import * as Draft from 'draft-js'
import * as i18next from 'i18next'
import * as Moment from 'moment'
import * as FavouriteViews from './Favourite'
import * as HomepageViews from './Homepage'
import * as CuisineViews from './Cuisine'
import * as RecipeViews from './Recipe'
import * as LunchViews from './Lunch'
import * as BrunchViews from './Brunch'
import * as DinnerViews from './Dinner'
import * as BreakfastViews from './Breakfast'
import * as CustomViews from '../custom_views'
export let Meal = (props:Utils.EntityComponentProps<Models.Meal>) : JSX.Element =>
  props.entity.Kind == "Lunch" ?
      LunchViews.Lunch({...props,
            set_entity:(e,c) => props.set_entity(e as Models.Meal, c),
            entity:props.entity as Models.Lunch})
       : props.entity.Kind == "Brunch" ?
      BrunchViews.Brunch({...props,
            set_entity:(e,c) => props.set_entity(e as Models.Meal, c),
            entity:props.entity as Models.Brunch})
       : props.entity.Kind == "Dinner" ?
      DinnerViews.Dinner({...props,
            set_entity:(e,c) => props.set_entity(e as Models.Meal, c),
            entity:props.entity as Models.Dinner})
       : props.entity.Kind == "Breakfast" ?
      BreakfastViews.Breakfast({...props,
            set_entity:(e,c) => props.set_entity(e as Models.Meal, c),
            entity:props.entity as Models.Breakfast})
       : null

export let Meal_to_page = (id:number) => {
  let can_edit = Utils.any_of([Permissions.can_edit_Meal, Permissions.can_edit_Cuisine_Meal, Permissions.can_edit_Meal_Recipe, Permissions.can_edit_Cuisine, Permissions.can_edit_Recipe])
  return Utils.scene_to_page<Models.Meal>(can_edit, Meal, Api.get_Meal(id), Api.update_Meal, "Meal", "Meal", `/Meals/${id}`)
}

export let Meal_to = (id:number, target_element_id:string, current_User:Models.User) => {
  Utils.render_page_manager(target_element_id,
    Meal_to_page(id),
    current_User
  )
}
