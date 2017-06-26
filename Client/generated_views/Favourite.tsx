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
import * as BrowseViews from './Browse'
import * as HomepageViews from './Homepage'
import * as CustomViews from '../custom_views'









export function load_relations_Favourite(self, current_User:Models.User, callback?:()=>void) {
  callback && callback()
}

export function set_size_Favourite(self:FavouriteContext, new_size:Utils.EntitySize) {
  self.props.set_size(new_size, () => {
    if (new_size == "fullscreen")
      self.props.push(Favourite_to_page(self.props.entity.Id))
  })
}

export function render_Favourite_FavouriteView_editable_minimised(self:FavouriteContext) : JSX.Element {
  if (!Permissions.can_edit_Favourite(self.props.current_User)) return render_Favourite_FavouriteView_minimised(self)
  else
    return !Permissions.can_view_Favourite_FavouriteView(self.props.current_User) ? <div /> :
          <div className="model__attribute favouriteview">
  <div className="model__attribute-content">
    {CustomViews.FavouriteView({...self.props})}
  </div>
</div>
}


export function render_Favourite_FavouriteView_editable_maximised(self:FavouriteContext) : JSX.Element {
  if (!Permissions.can_edit_Favourite(self.props.current_User)) return render_Favourite_FavouriteView_maximised(self)
  else
    return !Permissions.can_view_Favourite_FavouriteView(self.props.current_User) ? <div /> :
          <div className="model__attribute favouriteview">
  <div className="model__attribute-content">
    {CustomViews.FavouriteView({...self.props})}
  </div>
</div>
}


export function render_editable_attributes_minimised_Favourite(self:FavouriteContext) {
  let attributes = (<div>
      {CustomViews.FavouriteView({...self.props})}
    </div>)
  return attributes
}

export function render_editable_attributes_maximised_Favourite(self:FavouriteContext) {
    let state = self.state()
    let attributes = (<div>
        {CustomViews.FavouriteView({...self.props})}
        
        
        
      </div>)
    return attributes
  }

export function render_breadcrumb_Favourite(self:FavouriteContext) {
  return <div className="breadcrumb-favourite">Favourite</div>
}

export function render_menu_Favourite(self:FavouriteContext) {
  let state = self.state()
  return <div className="menu">
        <img className="logo" src={"/images/logo.png"} alt="Logo"/>
        <div className="pages">
          {!Permissions.can_view_Favourite(self.props.current_User) ? null :
              <div className={`menu_entry page_link active-page`}>
                <a onClick={() => 
                  self.props.set_shown_relation("none")
                  
                }>
                  {i18next.t('Favourite')}
                </a>
              </div>
            }
        {!Permissions.can_view_Browse(self.props.current_User) ? null :
              <div className={`menu_entry page_link`}>
                <a onClick={() => 
                  Api.get_Browses(0, 1).then(e =>
                    e.Items.length > 0 && self.props.set_page(BrowseViews.Browse_to_page(e.Items[0].Item.Id))
                  )
                }>
                  {i18next.t('Browse')}
                </a>
              </div>
            }
        {!Permissions.can_view_Homepage(self.props.current_User) ? null :
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

export function render_local_menu_Favourite(self:FavouriteContext) {
  let state = self.state()
  return <div className="local-menu">
          <div className="local_menu_entries">
            <div className={`local_menu_entry${self.props.shown_relation == "none" ? " local_menu_entry--active" : ""}`}>
              <a onClick={() =>
                  self.props.set_shown_relation("none")
              }>
                {i18next.t('About this Favourite')}
              </a>
            </div>
          
          </div>
        </div>
}

export function render_controls_Favourite(self:FavouriteContext) {
  return <div className="control">
    {self.props.allow_maximisation && self.props.set_size ? <a className={`"favourite button button--toggle ${self.props.size != 'preview' ? 'button--toggle--open' : ''}`}
          onClick={() => {
            set_size_Favourite(self, self.props.size == "preview" ? "large" : "preview")}
          }>
      </a> : null}
    {Permissions.can_delete_Favourite(self.props.current_User) && self.props.size == "fullscreen" ? <a className="button button--delete"
      onClick={() => confirm(i18next.t('Are you sure?')) &&
        Api.delete_Favourite(self.props.entity).then(() => self.props.force_reload(() => self.props.pop()))
      }>
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

export function render_content_Favourite(self:FavouriteContext) {
  let actions:Array<()=>void> =
    [
      self.props.allow_maximisation && self.props.set_size && self.props.size == "preview" ?
        () => set_size_Favourite(self, self.props.size == "preview" ? "large" : "preview")
      :
        null,
    ].filter(a => a != null)
  let content =
    Permissions.can_view_Favourite(self.props.current_User) ?
      self.props.size == "preview" ?
        render_preview_Favourite(self)
      : self.props.size == "large" ?
        render_large_Favourite(self)
      : self.props.size == "fullscreen" ?
        render_large_Favourite(self)
      : "Error: unauthorised access to entity."
    : "Error: unauthorised access to entity."
  if (self.props.mode == "view" && actions.length == 1 && !false)
    return <a onClick={() => actions[0]()}>
      <div className={`${self.props.inline != undefined && self.props.inline ? "" : "model-content"} ${self.props.size == 'preview' ? 'model-content--preview' : ''}`}>
        {content}
      </div>
    </a>
  else
    return <div className={`${self.props.inline != undefined && self.props.inline ? "" : "model-content"} ${self.props.size == 'preview' ? 'model-content--preview' : ''}`}>
      {content}
    </div>
}

export function render_Favourite_FavouriteView_minimised(self:FavouriteContext) : JSX.Element {
      return !Permissions.can_view_Favourite_FavouriteView(self.props.current_User) ? null : <div className="model__attribute favouriteview">
  <div className="model__attribute-content">
    {CustomViews.FavouriteView({...self.props})}
  </div>
</div>
      
}

export function render_Favourite_FavouriteView_maximised(self:FavouriteContext) : JSX.Element {
        return !Permissions.can_view_Favourite_FavouriteView(self.props.current_User) ? null : <div className="model__attribute favouriteview">
  <div className="model__attribute-content">
    {CustomViews.FavouriteView({...self.props})}
  </div>
</div>
}

export function render_preview_Favourite(self:FavouriteContext) {
  let attributes:JSX.Element = null
  if (self.props.mode == "view" || !Permissions.can_edit_Favourite(self.props.current_User))
    attributes = (<div className="model__attributes">
      { render_Favourite_FavouriteView_minimised(self) }
    </div>)
  else
    attributes = render_editable_attributes_minimised_Favourite(self)
  return (<div className="block">
      {attributes}
    </div>)
}

export function render_large_Favourite(self:FavouriteContext) {
  let state = self.state()
  let attributes:JSX.Element = null
  if (self.props.mode == "view" || !Permissions.can_edit_Favourite(self.props.current_User))
    attributes = (<div className="model__attributes">
      { render_Favourite_FavouriteView_maximised(self) }
        
    </div>)
  else
    attributes = render_editable_attributes_maximised_Favourite(self)
  return (<div className="block">
      {self.props.nesting_depth == 0 && self.props.shown_relation != "all" && self.props.shown_relation != "none" ? null : attributes}
      {render_relations_Favourite(self)}
    </div>)
}




export function render_relations_Favourite(self:FavouriteContext) {
  return <div className="relations">
      
      
    </div>
}





export function render_saving_animations_Favourite(self:FavouriteContext) {
  return 
    
}

export type FavouriteContext = {state:()=>FavouriteState, props:Utils.EntityComponentProps<Models.Favourite>, setState:(new_state:FavouriteState, callback?:()=>void) => void}

export type FavouriteState = {
    update_count:number
    
  }
export class FavouriteComponent extends React.Component<Utils.EntityComponentProps<Models.Favourite>, FavouriteState> {
  constructor(props:Utils.EntityComponentProps<Models.Favourite>, context:any) {
    super(props, context)
    this.state = { update_count:0, }
  }

  get_self() {
    return {state:() => this.state, props:this.props, setState:(ns,c)=>this.setState(ns,c)}
  }

  componentWillReceiveProps(new_props:Utils.EntityComponentProps<Models.Favourite>) {
    if (new_props.size == "breadcrumb") return
    let current_logged_in_entity = this.props.current_User || null
    let new_logged_in_entity = new_props.current_User || null
    if (new_props.mode != this.props.mode || (new_props.size != this.props.size && (new_props.size == "large" || new_props.size == "fullscreen")) ||
        new_props.logic_frame != this.props.logic_frame ||
        (current_logged_in_entity && !new_logged_in_entity) ||
        (!current_logged_in_entity && new_logged_in_entity) ||
        (current_logged_in_entity && new_logged_in_entity && current_logged_in_entity.Id != new_logged_in_entity.Id)) {
      load_relations_Favourite(this.get_self(),  new_props.current_User)
    }
  }

  thread:number = null
  componentWillMount() {
    if (this.props.size == "breadcrumb") return
    if (this.props.size != "preview") {
      
      load_relations_Favourite(this.get_self(), this.props.current_User)
    }

    this.thread = setInterval(() => {
      

    }, 500)
  }

  componentWillUnmount() {
    clearInterval(this.thread)
  }

  render() {
    if (this.props.size == "breadcrumb") {
      return Permissions.can_view_Favourite(this.props.current_User) ?
              render_breadcrumb_Favourite(this.get_self())
              : null
    }

    return <div id={`Favourite_${this.props.entity.Id.toString()}_${this.state.update_count}`} className={`model favourite`}>
      { render_saving_animations_Favourite(this.get_self()) }
      { this.props.nesting_depth == 0 ? render_menu_Favourite(this.get_self()) : null }
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
        
        { render_controls_Favourite(this.get_self()) }
        { render_content_Favourite(this.get_self()) }
      </div>
    </div>
  }
}

export let Favourite = (props:Utils.EntityComponentProps<Models.Favourite>) : JSX.Element =>
  <FavouriteComponent {...props} />

export let Favourite_to_page = (id:number) => {
  let can_edit = Utils.any_of([Permissions.can_edit_Favourite])
  return Utils.scene_to_page<Models.Favourite>(can_edit, Favourite, Api.get_Favourite(id), Api.update_Favourite, "Favourite", "Favourite", `/Favourites/${id}`)
}

export let Favourite_to = (id:number, target_element_id:string, current_User:Models.User) => {
  Utils.render_page_manager(target_element_id,
    Favourite_to_page(id),
    current_User
  )
}
