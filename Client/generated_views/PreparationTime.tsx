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
import * as BrowseViews from './Browse'
import * as HomepageViews from './Homepage'
import * as RecipeViews from './Recipe'
import * as ThirtyViews from './Thirty'
import * as SixtyViews from './Sixty'
import * as NinetyViews from './Ninety'
import * as FifteenViews from './Fifteen'
import * as CustomViews from '../custom_views'
export let PreparationTime = (props:Utils.EntityComponentProps<Models.PreparationTime>) : JSX.Element =>
  props.entity.Kind == "Thirty" ?
      ThirtyViews.Thirty({...props,
            set_entity:(e,c) => props.set_entity(e as Models.PreparationTime, c),
            entity:props.entity as Models.Thirty})
       : props.entity.Kind == "Sixty" ?
      SixtyViews.Sixty({...props,
            set_entity:(e,c) => props.set_entity(e as Models.PreparationTime, c),
            entity:props.entity as Models.Sixty})
       : props.entity.Kind == "Ninety" ?
      NinetyViews.Ninety({...props,
            set_entity:(e,c) => props.set_entity(e as Models.PreparationTime, c),
            entity:props.entity as Models.Ninety})
       : props.entity.Kind == "Fifteen" ?
      FifteenViews.Fifteen({...props,
            set_entity:(e,c) => props.set_entity(e as Models.PreparationTime, c),
            entity:props.entity as Models.Fifteen})
       : null

export let PreparationTime_to_page = (id:number) => {
  let can_edit = Utils.any_of([Permissions.can_edit_PreparationTime, Permissions.can_edit_PreparationTime_Recipe, Permissions.can_edit_Recipe])
  return Utils.scene_to_page<Models.PreparationTime>(can_edit, PreparationTime, Api.get_PreparationTime(id), Api.update_PreparationTime, "PreparationTime", "PreparationTime", `/PreparationTimes/${id}`)
}

export let PreparationTime_to = (id:number, target_element_id:string, current_User:Models.User) => {
  Utils.render_page_manager(target_element_id,
    PreparationTime_to_page(id),
    current_User
  )
}
