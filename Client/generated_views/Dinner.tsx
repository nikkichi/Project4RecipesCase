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









export function load_relations_Dinner(self, callback?:()=>void) {
  callback && callback()
}

export function set_size_Dinner(self:DinnerContext, new_size:Utils.EntitySize) {
  self.props.set_size(new_size, () => {
    if (new_size == "fullscreen")
      self.props.push(Dinner_to_page(self.props.entity.Id))
  })
}





export function render_editable_attributes_minimised_Dinner(self:DinnerContext) {
  let attributes = (<div>
      
    </div>)
  return attributes
}

export function render_editable_attributes_maximised_Dinner(self:DinnerContext) {
    let attributes = (<div>
        
      </div>)
    return attributes
  }

export function render_breadcrumb_Dinner(self:DinnerContext) {
  return <div className="breadcrumb-dinner">Dinner</div>
}

export function render_menu_Dinner(self:DinnerContext) {
  let state = self.state()
  return <div className="menu">
        <img className="logo" src={"/images/logo.png"} alt="Logo"/>
        <div className="pages">
          {!Permissions.can_view_Homepage() ? null :
              <div className={`menu_entry page_link`}>
                <a onClick={() => 
                  Api.get_Homepages(0, 1).then(e =>
                    e.Items.length > 0 && self.props.set_page(HomepageViews.Homepage_to_page(e.Items[0].Item.Id))
                  )
                }>
                  {i18next.t('Homepage')}
                </a>
              </div>
            }
          <div className="menu_entries">
          
            
                <div className="menu_entry menu_entry--with-sub">
                
                </div>  
          </div>
        </div>
      </div>
}

export function render_local_menu_Dinner(self:DinnerContext) {
  let state = self.state()
  return <div className="local-menu">
          <div className="local_menu_entries">
            <div className={`local_menu_entry${self.props.shown_relation == "none" ? " local_menu_entry--active" : ""}`}>
              <a onClick={() =>
                  self.props.set_shown_relation("none")
              }>
                {i18next.t('About this Dinner')}
              </a>
            </div>
          
              
          </div>
        </div>
}

export function render_controls_Dinner(self:DinnerContext) {
  return <div className="control">
    {self.props.allow_maximisation && self.props.set_size ? <a className={`"dinner button button--toggle ${self.props.size != 'preview' ? 'button--toggle--open' : ''}`}
          onClick={() => {
            set_size_Dinner(self, self.props.size == "preview" ? "large" : "preview")}
          }>
      </a> : null}
    {self.props.allow_fullscreen && self.props.set_size ? <a className="dinner button button--fullscreen"
        onClick={() => set_size_Dinner(self, self.props.size == "fullscreen" ? "large" : "fullscreen")}>
      </a> : null}
    {Permissions.can_delete_Dinner() && self.props.size == "fullscreen" ? <a className="button button--delete"
      onClick={() => confirm(i18next.t('Are you sure?')) &&
        Api.delete_Dinner(self.props.entity).then(() => self.props.force_reload(() => self.props.pop()))
      }>
    </a> : null}
    {self.props.size == "fullscreen" && self.props.pages_count > 0 ? <a className="dinner button button--close"
        onClick={() => self.props.pop()}>
    </a> : null}
    {self.props.unlink && self.props.mode != "view" ?
      <a className="button button--unlink"
          onClick={() => self.props.unlink()}>
      </a>
      :
      null
    }
    {self.props.delete && self.props.mode != "view" ?
      <a className="button button--delete"
          onClick={() => self.props.delete()}>
      </a>
      :
      null
    }
  </div>
}

export function render_content_Dinner(self:DinnerContext) {
  return <div className={`${self.props.inline != undefined && self.props.inline ? "" : "model-content"} ${self.props.size == 'preview' ? 'model-content--preview' : ''}`}>
    {Permissions.can_view_Dinner() ?
      self.props.size == "preview" ?
        render_preview_Dinner(self)
      : self.props.size == "large" ?
        render_large_Dinner(self)
      : self.props.size == "fullscreen" ?
        render_large_Dinner(self)
      : "Error: unauthorised access to entity."
    : "Error: unauthorised access to entity."
    }
  </div>
}





export function render_preview_Dinner(self:DinnerContext) {
  let attributes:JSX.Element = null
  if (self.props.mode == "view" || !Permissions.can_edit_Dinner())
    attributes = (<div className="model__attributes">
      
    </div>)
  else
    attributes = render_editable_attributes_minimised_Dinner(self)
  return (<div className="block">
      {attributes}
    </div>)
}

export function render_large_Dinner(self:DinnerContext) {
  let attributes:JSX.Element = null
  if (self.props.mode == "view" || !Permissions.can_edit_Dinner())
    attributes = (<div className="model__attributes">
      
    </div>)
  else
    attributes = render_editable_attributes_maximised_Dinner(self)
  return (<div className="block">
      {self.props.nesting_depth == 0 && self.props.shown_relation != "all" && self.props.shown_relation != "none" ? null : attributes}
      {render_relations_Dinner(self)}
    </div>)
}




export function render_relations_Dinner(self:DinnerContext) {
  return <div className="relations">
      
      
    </div>
}





export function render_saving_animations_Dinner(self:DinnerContext) {
  return 
    
}

export type DinnerContext = {state:()=>DinnerState, props:Utils.EntityComponentProps<Models.Dinner>, setState:(new_state:DinnerState, callback?:()=>void) => void}

export type DinnerState = {
    update_count:number
    
  }
export class DinnerComponent extends React.Component<Utils.EntityComponentProps<Models.Dinner>, DinnerState> {
  constructor(props:Utils.EntityComponentProps<Models.Dinner>, context:any) {
    super(props, context)
    this.state = { update_count:0,  }
  }

  get_self() {
    return {state:() => this.state, props:this.props, setState:(ns,c)=>this.setState(ns,c)}
  }

  componentWillReceiveProps(new_props:Utils.EntityComponentProps<Models.Dinner>) {
    if (new_props.size == "breadcrumb") return
    let current_logged_in_entity =  null
    let new_logged_in_entity =  null
    if (new_props.mode != this.props.mode || (new_props.size != this.props.size && (new_props.size == "large" || new_props.size == "fullscreen")) ||
        new_props.logic_frame != this.props.logic_frame ||
        (current_logged_in_entity && !new_logged_in_entity) ||
        (!current_logged_in_entity && new_logged_in_entity) ||
        (current_logged_in_entity && new_logged_in_entity && current_logged_in_entity.Id != new_logged_in_entity.Id)) {
      load_relations_Dinner(this.get_self(), )
    }
  }

  thread:number = null
  componentWillMount() {
    if (this.props.size == "breadcrumb") return
    if (this.props.size != "preview")
      load_relations_Dinner(this.get_self(), )

    this.thread = setInterval(() => {
      

    }, 500)
  }

  componentWillUnmount() {
    clearInterval(this.thread)
  }

  render() {
    if (this.props.size == "breadcrumb") {
      return Permissions.can_view_Dinner() ?
              render_breadcrumb_Dinner(this.get_self())
              : null
    }

    return <div id={`Dinner_${this.props.entity.Id.toString()}_${this.state.update_count}`} className={`model dinner`}>
      { render_saving_animations_Dinner(this.get_self()) }
      { this.props.nesting_depth == 0 ? render_menu_Dinner(this.get_self()) : null }
      <div className="content" >
        {
          this.props.nesting_depth == 0 && !!this.props.toggle_button ?
          <div className="topbar">
            { this.props.breadcrumbs() }
            <div className="topbar__buttons">
              
                {this.props.toggle_button ? this.props.toggle_button() : null}
              { this.props.authentication_menu() }
            </div>
          </div>
          :
          null
        }
        { this.props.nesting_depth == 0 ? render_local_menu_Dinner(this.get_self()) : null }
        { render_controls_Dinner(this.get_self()) }
        { render_content_Dinner(this.get_self()) }
      </div>
    </div>
  }
}

export let Dinner = (props:Utils.EntityComponentProps<Models.Dinner>) : JSX.Element =>
  <DinnerComponent {...props} />

export let Dinner_to_page = (id:number) => {
  let can_edit = Utils.any_of([Permissions.can_edit_Dinner])
  return Utils.scene_to_page<Models.Dinner>(can_edit, Dinner, Api.get_Dinner(id), Api.update_Dinner, "Dinner", "Dinner", `/Dinners/${id}`)
}

export let Dinner_to = (id:number, target_element_id:string, ) => {
  Utils.render_page_manager(target_element_id,
    Dinner_to_page(id),
    
  )
}
