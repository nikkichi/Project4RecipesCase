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
import * as MealViews from './Meal'
import * as AsianViews from './Asian'
import * as MediterraneanViews from './Mediterranean'
import * as GrillViews from './Grill'
import * as CustomViews from '../custom_views'
export let Cuisine = (props:Utils.EntityComponentProps<Models.Cuisine>) : JSX.Element =>
  props.entity.Kind == "Asian" ?
      AsianViews.Asian({...props,
            set_entity:(e,c) => props.set_entity(e as Models.Cuisine, c),
            entity:props.entity as Models.Asian})
       : props.entity.Kind == "Mediterranean" ?
      MediterraneanViews.Mediterranean({...props,
            set_entity:(e,c) => props.set_entity(e as Models.Cuisine, c),
            entity:props.entity as Models.Mediterranean})
       : props.entity.Kind == "Grill" ?
      GrillViews.Grill({...props,
            set_entity:(e,c) => props.set_entity(e as Models.Cuisine, c),
            entity:props.entity as Models.Grill})
       : null

export let Cuisine_to_page = (id:number) => {
  let can_edit = Utils.any_of([Permissions.can_edit_Cuisine, Permissions.can_edit_Cuisine_Meal, Permissions.can_edit_Meal])
  return Utils.scene_to_page<Models.Cuisine>(can_edit, Cuisine, Api.get_Cuisine(id), Api.update_Cuisine, "Cuisine", "Cuisine", `/Cuisines/${id}`)
}

export let Cuisine_to = (id:number, target_element_id:string, current_User:Models.User) => {
  Utils.render_page_manager(target_element_id,
    Cuisine_to_page(id),
    current_User
  )
}
