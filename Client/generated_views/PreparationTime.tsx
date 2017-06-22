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
import * as HomepageViews from './Homepage'
import * as RecipeViews from './Recipe'
import * as ninteeViews from './nintee'
import * as thirtyViews from './thirty'
import * as sixtyViews from './sixty'
import * as fifteenViews from './fifteen'

export let PreparationTime = (props:Utils.EntityComponentProps<Models.PreparationTime>) : JSX.Element =>
  props.entity.Kind == "nintee" ?
      ninteeViews.nintee({...props,
            set_entity:(e,c) => props.set_entity(e as Models.PreparationTime, c),
            entity:props.entity as Models.nintee})
       : props.entity.Kind == "thirty" ?
      thirtyViews.thirty({...props,
            set_entity:(e,c) => props.set_entity(e as Models.PreparationTime, c),
            entity:props.entity as Models.thirty})
       : props.entity.Kind == "sixty" ?
      sixtyViews.sixty({...props,
            set_entity:(e,c) => props.set_entity(e as Models.PreparationTime, c),
            entity:props.entity as Models.sixty})
       : props.entity.Kind == "fifteen" ?
      fifteenViews.fifteen({...props,
            set_entity:(e,c) => props.set_entity(e as Models.PreparationTime, c),
            entity:props.entity as Models.fifteen})
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
