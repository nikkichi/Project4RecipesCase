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









export function load_relations_Mediterranean(self, callback?:()=>void) {
  callback && callback()
}

export function set_size_Mediterranean(self:MediterraneanContext, new_size:Utils.EntitySize) {
  self.props.set_size(new_size, () => {
    if (new_size == "fullscreen")
      self.props.push(Mediterranean_to_page(self.props.entity.Id))
  })
}





export function render_editable_attributes_minimised_Mediterranean(self:MediterraneanContext) {
  let attributes = (<div>
      
    </div>)
  return attributes
}

export function render_editable_attributes_maximised_Mediterranean(self:MediterraneanContext) {
    let attributes = (<div>
        
      </div>)
    return attributes
  }

export function render_breadcrumb_Mediterranean(self:MediterraneanContext) {
  return <div className="breadcrumb-mediterranean">Mediterranean</div>
}

export function render_menu_Mediterranean(self:MediterraneanContext) {
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

export function render_local_menu_Mediterranean(self:MediterraneanContext) {
  let state = self.state()
  return <div className="local-menu">
          <div className="local_menu_entries">
            <div className={`local_menu_entry${self.props.shown_relation == "none" ? " local_menu_entry--active" : ""}`}>
              <a onClick={() =>
                  self.props.set_shown_relation("none")
              }>
                {i18next.t('About this Mediterranean')}
              </a>
            </div>
          
              
          </div>
        </div>
}

export function render_controls_Mediterranean(self:MediterraneanContext) {
  return <div className="control">
    {self.props.allow_maximisation && self.props.set_size ? <a className={`"mediterranean button button--toggle ${self.props.size != 'preview' ? 'button--toggle--open' : ''}`}
          onClick={() => {
            set_size_Mediterranean(self, self.props.size == "preview" ? "large" : "preview")}
          }>
      </a> : null}
    {self.props.allow_fullscreen && self.props.set_size ? <a className="mediterranean button button--fullscreen"
        onClick={() => set_size_Mediterranean(self, self.props.size == "fullscreen" ? "large" : "fullscreen")}>
      </a> : null}
    {Permissions.can_delete_Mediterranean() && self.props.size == "fullscreen" ? <a className="button button--delete"
      onClick={() => confirm(i18next.t('Are you sure?')) &&
        Api.delete_Mediterranean(self.props.entity).then(() => self.props.force_reload(() => self.props.pop()))
      }>
    </a> : null}
    {self.props.size == "fullscreen" && self.props.pages_count > 0 ? <a className="mediterranean button button--close"
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

export function render_content_Mediterranean(self:MediterraneanContext) {
  return <div className={`${self.props.inline != undefined && self.props.inline ? "" : "model-content"} ${self.props.size == 'preview' ? 'model-content--preview' : ''}`}>
    {Permissions.can_view_Mediterranean() ?
      self.props.size == "preview" ?
        render_preview_Mediterranean(self)
      : self.props.size == "large" ?
        render_large_Mediterranean(self)
      : self.props.size == "fullscreen" ?
        render_large_Mediterranean(self)
      : "Error: unauthorised access to entity."
    : "Error: unauthorised access to entity."
    }
  </div>
}





export function render_preview_Mediterranean(self:MediterraneanContext) {
  let attributes:JSX.Element = null
  if (self.props.mode == "view" || !Permissions.can_edit_Mediterranean())
    attributes = (<div className="model__attributes">
      
    </div>)
  else
    attributes = render_editable_attributes_minimised_Mediterranean(self)
  return (<div className="block">
      {attributes}
    </div>)
}

export function render_large_Mediterranean(self:MediterraneanContext) {
  let attributes:JSX.Element = null
  if (self.props.mode == "view" || !Permissions.can_edit_Mediterranean())
    attributes = (<div className="model__attributes">
      
    </div>)
  else
    attributes = render_editable_attributes_maximised_Mediterranean(self)
  return (<div className="block">
      {self.props.nesting_depth == 0 && self.props.shown_relation != "all" && self.props.shown_relation != "none" ? null : attributes}
      {render_relations_Mediterranean(self)}
    </div>)
}




export function render_relations_Mediterranean(self:MediterraneanContext) {
  return <div className="relations">
      
      
    </div>
}





export function render_saving_animations_Mediterranean(self:MediterraneanContext) {
  return 
    
}

export type MediterraneanContext = {state:()=>MediterraneanState, props:Utils.EntityComponentProps<Models.Mediterranean>, setState:(new_state:MediterraneanState, callback?:()=>void) => void}

export type MediterraneanState = {
    update_count:number
    
  }
export class MediterraneanComponent extends React.Component<Utils.EntityComponentProps<Models.Mediterranean>, MediterraneanState> {
  constructor(props:Utils.EntityComponentProps<Models.Mediterranean>, context:any) {
    super(props, context)
    this.state = { update_count:0,  }
  }

  get_self() {
    return {state:() => this.state, props:this.props, setState:(ns,c)=>this.setState(ns,c)}
  }

  componentWillReceiveProps(new_props:Utils.EntityComponentProps<Models.Mediterranean>) {
    if (new_props.size == "breadcrumb") return
    let current_logged_in_entity =  null
    let new_logged_in_entity =  null
    if (new_props.mode != this.props.mode || (new_props.size != this.props.size && (new_props.size == "large" || new_props.size == "fullscreen")) ||
        new_props.logic_frame != this.props.logic_frame ||
        (current_logged_in_entity && !new_logged_in_entity) ||
        (!current_logged_in_entity && new_logged_in_entity) ||
        (current_logged_in_entity && new_logged_in_entity && current_logged_in_entity.Id != new_logged_in_entity.Id)) {
      load_relations_Mediterranean(this.get_self(), )
    }
  }

  thread:number = null
  componentWillMount() {
    if (this.props.size == "breadcrumb") return
    if (this.props.size != "preview")
      load_relations_Mediterranean(this.get_self(), )

    this.thread = setInterval(() => {
      

    }, 500)
  }

  componentWillUnmount() {
    clearInterval(this.thread)
  }

  render() {
    if (this.props.size == "breadcrumb") {
      return Permissions.can_view_Mediterranean() ?
              render_breadcrumb_Mediterranean(this.get_self())
              : null
    }

    return <div id={`Mediterranean_${this.props.entity.Id.toString()}_${this.state.update_count}`} className={`model mediterranean`}>
      { render_saving_animations_Mediterranean(this.get_self()) }
      { this.props.nesting_depth == 0 ? render_menu_Mediterranean(this.get_self()) : null }
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
        { this.props.nesting_depth == 0 ? render_local_menu_Mediterranean(this.get_self()) : null }
        { render_controls_Mediterranean(this.get_self()) }
        { render_content_Mediterranean(this.get_self()) }
      </div>
    </div>
  }
}

export let Mediterranean = (props:Utils.EntityComponentProps<Models.Mediterranean>) : JSX.Element =>
  <MediterraneanComponent {...props} />

export let Mediterranean_to_page = (id:number) => {
  let can_edit = Utils.any_of([Permissions.can_edit_Mediterranean])
  return Utils.scene_to_page<Models.Mediterranean>(can_edit, Mediterranean, Api.get_Mediterranean(id), Api.update_Mediterranean, "Mediterranean", "Mediterranean", `/Mediterraneans/${id}`)
}

export let Mediterranean_to = (id:number, target_element_id:string, ) => {
  Utils.render_page_manager(target_element_id,
    Mediterranean_to_page(id),
    
  )
}
