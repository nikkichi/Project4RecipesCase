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
import * as UserViews from './User'
import * as RecipeViews from './Recipe'


export function Favorite_User_Favorite_can_create(self:FavoriteContext) {
  let state = self.state()
  return state.User == "loading" ? false : state.User.CanCreate
}
export function Favorite_Favorite_Recipe_can_create(self:FavoriteContext) {
  let state = self.state()
  return state.Recipe == "loading" ? false : state.Recipe.CanCreate
}
export function Favorite_User_Favorite_can_delete(self:FavoriteContext) {
  let state = self.state()
  return state.User == "loading" ? false : state.User.CanDelete
}
export function Favorite_Favorite_Recipe_can_delete(self:FavoriteContext) {
  let state = self.state()
  return state.Recipe == "loading" ? false : state.Recipe.CanDelete
}
export function Favorite_User_Favorite_page_index(self:FavoriteContext) {
  let state = self.state()
  return state.User == "loading" ? 0 : state.User.PageIndex
}
export function Favorite_Favorite_Recipe_page_index(self:FavoriteContext) {
  let state = self.state()
  return state.Recipe == "loading" ? 0 : state.Recipe.PageIndex
}
export function Favorite_User_Favorite_page_size(self:FavoriteContext) {
  let state = self.state()
  return state.User == "loading" ? 25 : state.User.PageSize
}
export function Favorite_Favorite_Recipe_page_size(self:FavoriteContext) {
  let state = self.state()
  return state.Recipe == "loading" ? 25 : state.Recipe.PageSize
}
export function Favorite_User_Favorite_num_pages(self:FavoriteContext) {
  let state = self.state()
  return state.User == "loading" ? 1 : state.User.NumPages
}
export function Favorite_Favorite_Recipe_num_pages(self:FavoriteContext) {
  let state = self.state()
  return state.Recipe == "loading" ? 1 : state.Recipe.NumPages
}

export function load_relation_Favorite_User_Favorite(self:FavoriteContext, current_User:Models.User, callback?:()=>void) {
  Permissions.can_view_User(current_User) ?
    Api.get_Favorite_User_Favorites(self.props.entity, Favorite_User_Favorite_page_index(self), Favorite_User_Favorite_page_size(self)).then(Users =>
      self.setState({...self.state(), update_count:self.state().update_count+1,
          User:Utils.raw_page_to_paginated_items<Models.User, Utils.EntityAndSize<Models.User> & { shown_relation:string }>(i => {
            let state = self.state()
            return {
              element:i,
              size: state.User != "loading" && state.User.Items.has(i.Id) ? state.User.Items.get(i.Id).size : "preview",
              shown_relation:"all"}}, Users)
          }, callback))
  :
    callback && callback()
}

export function load_relation_Favorite_Favorite_Recipe(self:FavoriteContext, current_User:Models.User, callback?:()=>void) {
  Permissions.can_view_Recipe(current_User) ?
    Api.get_Favorite_Favorite_Recipes(self.props.entity, Favorite_Favorite_Recipe_page_index(self), Favorite_Favorite_Recipe_page_size(self)).then(Recipes =>
      self.setState({...self.state(), update_count:self.state().update_count+1,
          Recipe:Utils.raw_page_to_paginated_items<Models.Recipe, Utils.EntityAndSize<Models.Recipe> & { shown_relation:string }>(i => {
            let state = self.state()
            return {
              element:i,
              size: state.Recipe != "loading" && state.Recipe.Items.has(i.Id) ? state.Recipe.Items.get(i.Id).size : "preview",
              shown_relation:"all"}}, Recipes)
          }, callback))
  :
    callback && callback()
}

export function load_relations_Favorite(self, current_User:Models.User, callback?:()=>void) {
  load_relation_Favorite_Favorite_Recipe(self, self.props.current_User, 
        () => load_relation_Favorite_User_Favorite(self, self.props.current_User, 
        () => callback && callback()))
}

export function set_size_Favorite(self:FavoriteContext, new_size:Utils.EntitySize) {
  self.props.set_size(new_size, () => {
    if (new_size == "fullscreen")
      self.props.push(Favorite_to_page(self.props.entity.Id))
  })
}





export function render_editable_attributes_minimised_Favorite(self:FavoriteContext) {
  let attributes = (<div>
      
    </div>)
  return attributes
}

export function render_editable_attributes_maximised_Favorite(self:FavoriteContext) {
    let attributes = (<div>
        
      </div>)
    return attributes
  }

export function render_breadcrumb_Favorite(self:FavoriteContext) {
  return <div className="breadcrumb-favorite">Favorite</div>
}

export function render_menu_Favorite(self:FavoriteContext) {
  let state = self.state()
  return <div className="menu">
        <img className="logo" src={"/images/logo.png"} alt="Logo"/>
        <div className="pages">
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
          
            {!Permissions.can_view_Recipe(self.props.current_User) ? null :
                  <div className={`menu_entry${self.props.shown_relation == "Homepage_Recipe" ? " active" : ""}`}>
                    <a onClick={() =>
                        {
                            Api.get_Homepages(0, 1).then(e =>
                              e.Items.length > 0 && self.props.set_page(HomepageViews.Homepage_to_page(e.Items[0].Item.Id),
                                () => self.props.set_shown_relation("Homepage_Recipe"))
                            )
                        }
                      }>
                      {i18next.t('Homepage_Recipes')}
                    </a>
                  </div>
                }
                <div className="menu_entry menu_entry--with-sub">
                
                </div>  
          </div>
        </div>
      </div>
}

export function render_local_menu_Favorite(self:FavoriteContext) {
  let state = self.state()
  return <div className="local-menu">
          <div className="local_menu_entries">
            <div className={`local_menu_entry${self.props.shown_relation == "none" ? " local_menu_entry--active" : ""}`}>
              <a onClick={() =>
                  self.props.set_shown_relation("none")
              }>
                {i18next.t('About this Favorite')}
              </a>
            </div>
          
            {!Permissions.can_view_Recipe(self.props.current_User) ? null :
                  <div key={"Favorite_Recipe"} className={`local_menu_entry${self.props.shown_relation == "Favorite_Recipe" ? " local_menu_entry--active" : ""}`}>
                    <a onClick={() =>
                      load_relation_Favorite_Favorite_Recipe(self,
                        self.props.current_User, 
                        () => self.props.set_shown_relation("Favorite_Recipe"))
                    }>
                      {i18next.t('Favorite_Recipes')}
                    </a>
                  </div>
                }  
          </div>
        </div>
}

export function render_controls_Favorite(self:FavoriteContext) {
  return <div className="control">
    {self.props.allow_maximisation && self.props.set_size ? <a className={`"favorite button button--toggle ${self.props.size != 'preview' ? 'button--toggle--open' : ''}`}
          onClick={() => {
            set_size_Favorite(self, self.props.size == "preview" ? "large" : "preview")}
          }>
      </a> : null}
    {self.props.allow_fullscreen && self.props.set_size ? <a className="favorite button button--fullscreen"
        onClick={() => set_size_Favorite(self, self.props.size == "fullscreen" ? "large" : "fullscreen")}>
      </a> : null}
    {Permissions.can_delete_Favorite(self.props.current_User) && self.props.size == "fullscreen" ? <a className="button button--delete"
      onClick={() => confirm(i18next.t('Are you sure?')) &&
        Api.delete_Favorite(self.props.entity).then(() => self.props.force_reload(() => self.props.pop()))
      }>
    </a> : null}
    {self.props.size == "fullscreen" && self.props.pages_count > 0 ? <a className="favorite button button--close"
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

export function render_content_Favorite(self:FavoriteContext) {
  return <div className={`${self.props.inline != undefined && self.props.inline ? "" : "model-content"} ${self.props.size == 'preview' ? 'model-content--preview' : ''}`}>
    {Permissions.can_view_Favorite(self.props.current_User) ?
      self.props.size == "preview" ?
        render_preview_Favorite(self)
      : self.props.size == "large" ?
        render_large_Favorite(self)
      : self.props.size == "fullscreen" ?
        render_large_Favorite(self)
      : "Error: unauthorised access to entity."
    : "Error: unauthorised access to entity."
    }
  </div>
}





export function render_preview_Favorite(self:FavoriteContext) {
  let attributes:JSX.Element = null
  if (self.props.mode == "view" || !Permissions.can_edit_Favorite(self.props.current_User))
    attributes = (<div className="model__attributes">
      
    </div>)
  else
    attributes = render_editable_attributes_minimised_Favorite(self)
  return (<div className="block">
      {attributes}
    </div>)
}

export function render_large_Favorite(self:FavoriteContext) {
  let attributes:JSX.Element = null
  if (self.props.mode == "view" || !Permissions.can_edit_Favorite(self.props.current_User))
    attributes = (<div className="model__attributes">
      
    </div>)
  else
    attributes = render_editable_attributes_maximised_Favorite(self)
  return (<div className="block">
      {self.props.nesting_depth == 0 && self.props.shown_relation != "all" && self.props.shown_relation != "none" ? null : attributes}
      {render_relations_Favorite(self)}
    </div>)
}


export function render_Favorite_User_Favorite(self:FavoriteContext, context:"presentation_structure"|"default") {
  if ((context == "default" && self.props.shown_relation != "all" && self.props.shown_relation != "User_Favorite") || !Permissions.can_view_User(self.props.current_User))
    return null
  let state = self.state()
  return <div>
    { List.render_relation("favorite_user_favorite",
   "Favorite",
   "User",
   "Users",
   self.props.nesting_depth > 0,
   false,
   false,
   false)
  (
      state.User != "loading" ? state.User.Items : state.User,
      Favorite_User_Favorite_page_index(self),
      Favorite_User_Favorite_num_pages(self),
      new_page_index => {
          let state = self.state()
          state.User != "loading" &&
          self.setState({...self.state(),
            update_count:self.state().update_count+1,
            User: {
              ...state.User,
              PageIndex:new_page_index
            }
          }, () =>  load_relation_Favorite_User_Favorite(self, self.props.current_User))
        },
      (i,i_id) => {
          let state = self.state()
          return <div key={i_id}
            className={`model-nested__item ${i.size != "preview" ? "model-nested__item--open" : ""} ` }
          
            >
            <div key={i_id}>
              {
                UserViews.User({
                  ...self.props,
                  entity:i.element,
                  inline:false,
                  nesting_depth:self.props.nesting_depth+1,
                  size: i.size,
                  allow_maximisation:true,
                  allow_fullscreen:true,
                  mode:self.props.mode == "edit" && (Permissions.can_edit_User_Favorite(self.props.current_User)
                        || Permissions.can_create_User_Favorite(self.props.current_User)
                        || Permissions.can_delete_User_Favorite(self.props.current_User)) ?
                    self.props.mode : "view",
                  is_editable:state.User != "loading" && state.User.Editable.get(i_id),
                  shown_relation:i.shown_relation,
                  set_shown_relation:(new_shown_relation:string, callback) => {
                    let state = self.state()
                    state.User != "loading" &&
                    self.setState({...self.state(),
                      User:
                        {
                          ...state.User,
                          Items:state.User.Items.set(i_id,{...state.User.Items.get(i_id), shown_relation:new_shown_relation})
                        }
                    }, callback)
                  },
                  nested_entity_names: self.props.nested_entity_names.push("User"),
                  
                  set_size:(new_size:Utils.EntitySize, callback) => {
                    let new_shown_relation = new_size == "large" ? "all" : i.shown_relation
                    let state = self.state()
                    state.User != "loading" &&
                    self.setState({...self.state(),
                      User:
                        {
                          ...state.User,
                          Items:state.User.Items.set(i_id,
                            {...state.User.Items.get(i_id),
                              size:new_size, shown_relation:new_shown_relation})
                        }
                    }, callback)
                  },
                    
                  toggle_button:undefined,
                  set_mode:undefined,
                  set_entity:(new_entity:Models.User, callback?:()=>void, force_update_count_increment?:boolean) => {
                    let state = self.state()
                    state.User != "loading" &&
                    self.setState({...self.state(),
                      dirty_User:state.dirty_User.set(i_id, new_entity),
                      update_count:force_update_count_increment ? self.state().update_count+1 : state.update_count,
                      User:
                        {
                          ...state.User,
                          Items:state.User.Items.set(i_id,{...state.User.Items.get(i_id), element:new_entity})
                        }
                    }, callback)
                  },
                  delete: undefined,
                  unlink: !Permissions.can_delete_User_Favorite(self.props.current_User) ?
                    null
                    :
                    () => confirm(i18next.t('Are you sure?')) && Api.unlink_User_User_Favorites(i.element, self.props.entity).then(() =>
                      load_relation_Favorite_User_Favorite(self, self.props.current_User))
                })
              }
            </div>
          </div>
        },
      () =>
        <div>
          {Permissions.can_create_User(self.props.current_User) && Permissions.can_create_User_Favorite(self.props.current_User) && Favorite_User_Favorite_can_create(self) ? render_new_Favorite_User_Favorite(self) : null}
          {Permissions.can_create_User_Favorite(self.props.current_User) ? render_add_existing_Favorite_User_Favorite(self) : null}
        </div>)
    }
    
    </div>
}


export function render_Favorite_Favorite_Recipe(self:FavoriteContext, context:"presentation_structure"|"default") {
  if ((context == "default" && self.props.shown_relation != "all" && self.props.shown_relation != "Favorite_Recipe") || !Permissions.can_view_Recipe(self.props.current_User))
    return null
  let state = self.state()
  return <div>
    { List.render_relation("favorite_favorite_recipe",
   "Favorite",
   "Recipe",
   "Recipes",
   self.props.nesting_depth > 0,
   false,
   false,
   false)
  (
      state.Recipe != "loading" ? state.Recipe.Items : state.Recipe,
      Favorite_Favorite_Recipe_page_index(self),
      Favorite_Favorite_Recipe_num_pages(self),
      new_page_index => {
          let state = self.state()
          state.Recipe != "loading" &&
          self.setState({...self.state(),
            update_count:self.state().update_count+1,
            Recipe: {
              ...state.Recipe,
              PageIndex:new_page_index
            }
          }, () =>  load_relation_Favorite_Favorite_Recipe(self, self.props.current_User))
        },
      (i,i_id) => {
          let state = self.state()
          return <div key={i_id}
            className={`model-nested__item ${i.size != "preview" ? "model-nested__item--open" : ""} ` }
          
            >
            <div key={i_id}>
              {
                RecipeViews.Recipe({
                  ...self.props,
                  entity:i.element,
                  inline:false,
                  nesting_depth:self.props.nesting_depth+1,
                  size: i.size,
                  allow_maximisation:true,
                  allow_fullscreen:true,
                  mode:self.props.mode == "edit" && (Permissions.can_edit_Favorite_Recipe(self.props.current_User)
                        || Permissions.can_create_Favorite_Recipe(self.props.current_User)
                        || Permissions.can_delete_Favorite_Recipe(self.props.current_User)) ?
                    self.props.mode : "view",
                  is_editable:state.Recipe != "loading" && state.Recipe.Editable.get(i_id),
                  shown_relation:i.shown_relation,
                  set_shown_relation:(new_shown_relation:string, callback) => {
                    let state = self.state()
                    state.Recipe != "loading" &&
                    self.setState({...self.state(),
                      Recipe:
                        {
                          ...state.Recipe,
                          Items:state.Recipe.Items.set(i_id,{...state.Recipe.Items.get(i_id), shown_relation:new_shown_relation})
                        }
                    }, callback)
                  },
                  nested_entity_names: self.props.nested_entity_names.push("Recipe"),
                  
                  set_size:(new_size:Utils.EntitySize, callback) => {
                    let new_shown_relation = new_size == "large" ? "all" : i.shown_relation
                    let state = self.state()
                    state.Recipe != "loading" &&
                    self.setState({...self.state(),
                      Recipe:
                        {
                          ...state.Recipe,
                          Items:state.Recipe.Items.set(i_id,
                            {...state.Recipe.Items.get(i_id),
                              size:new_size, shown_relation:new_shown_relation})
                        }
                    }, callback)
                  },
                    
                  toggle_button:undefined,
                  set_mode:undefined,
                  set_entity:(new_entity:Models.Recipe, callback?:()=>void, force_update_count_increment?:boolean) => {
                    let state = self.state()
                    state.Recipe != "loading" &&
                    self.setState({...self.state(),
                      dirty_Recipe:state.dirty_Recipe.set(i_id, new_entity),
                      update_count:force_update_count_increment ? self.state().update_count+1 : state.update_count,
                      Recipe:
                        {
                          ...state.Recipe,
                          Items:state.Recipe.Items.set(i_id,{...state.Recipe.Items.get(i_id), element:new_entity})
                        }
                    }, callback)
                  },
                  delete: undefined,
                  unlink: !Permissions.can_delete_Favorite_Recipe(self.props.current_User) ?
                    null
                    :
                    () => confirm(i18next.t('Are you sure?')) && Api.unlink_Favorite_Favorite_Recipes(self.props.entity, i.element).then(() =>
                      load_relation_Favorite_Favorite_Recipe(self, self.props.current_User))
                })
              }
            </div>
          </div>
        },
      () =>
        <div>
          {Permissions.can_create_Recipe(self.props.current_User) && Permissions.can_create_Favorite_Recipe(self.props.current_User) && Favorite_Favorite_Recipe_can_create(self) ? render_new_Favorite_Favorite_Recipe(self) : null}
          {Permissions.can_create_Favorite_Recipe(self.props.current_User) ? render_add_existing_Favorite_Favorite_Recipe(self) : null}
        </div>)
    }
    
    </div>
}



export function render_relations_Favorite(self:FavoriteContext) {
  return <div className="relations">
      { render_Favorite_Favorite_Recipe(self, "default") }
      
    </div>
}

export function render_add_existing_Favorite_User_Favorite(self:FavoriteContext) {
    
    let state = self.state()
    return self.props.mode == "edit" ?
      <div className="button__actions">
        {
          state.add_step_User != "open" ?
            <Buttons.Add disabled={state.User == "loading" ? true : state.User.TotalCount >= 1} 
              onClick={() =>
                self.setState({...self.state(), add_step_User:"open"}) }
                  target_name={"User"} />
          :
          React.createElement(List.AddToRelation,
            {
              relation_name:"favorite_user_favorite",
              source_name:"Favorite",
              target_name:"User",
              target_plural:"Users",
              page_size:10,
              render_target:(i,i_id) =>
                <div key={i_id} className="group__item">
                  <a className="group__button button button--existing"
                    onClick={() =>
                        self.setState({...self.state(), add_step_User:"saving"}, () =>
                          Api.link_Favorite_User_Favorites(self.props.entity, i).then(() =>
                            self.setState({...self.state(), add_step_User:"closed"}, () =>
                              load_relation_Favorite_User_Favorite(self, self.props.current_User))))
                      }>
                      Add existing
                  </a>
                  <div className="group__title" disabled={true}>
                    {
                      UserViews.User({
                        ...self.props,
                        entity:i,
                        nesting_depth:self.props.nesting_depth+1,
                        size:"preview",
                        mode:"view",
                        is_editable:false,
                        nested_entity_names: self.props.nested_entity_names.push("User"),
                        set_size:undefined,
                        toggle_button:undefined,
                        set_mode:undefined,
                        set_entity:(new_entity:Models.User, callback?:()=>void) => {},
                        unlink: undefined,
                        delete: undefined
                      })
                    }
                  </div>
                </div>,
              cancel:() => self.setState({...self.state(), add_step_User:"closed"}),
              get_items:[
                { name: "User", get: async(i,s) => Api.get_unlinked_Favorite_User_Favorites(self.props.entity, i, s) },
              ]
            })
        }
      </div>
    :
      null
    }
  
export function render_add_existing_Favorite_Favorite_Recipe(self:FavoriteContext) {
    
    let state = self.state()
    return self.props.mode == "edit" ?
      <div className="button__actions">
        {
          state.add_step_Recipe != "open" ?
            <Buttons.Add 
              onClick={() =>
                self.setState({...self.state(), add_step_Recipe:"open"}) }
                  target_name={"Recipe"} />
          :
          React.createElement(List.AddToRelation,
            {
              relation_name:"favorite_favorite_recipe",
              source_name:"Favorite",
              target_name:"Recipe",
              target_plural:"Recipes",
              page_size:10,
              render_target:(i,i_id) =>
                <div key={i_id} className="group__item">
                  <a className="group__button button button--existing"
                    onClick={() =>
                        self.setState({...self.state(), add_step_Recipe:"saving"}, () =>
                          Api.link_Favorite_Favorite_Recipes(self.props.entity, i).then(() =>
                            self.setState({...self.state(), add_step_Recipe:"closed"}, () =>
                              load_relation_Favorite_Favorite_Recipe(self, self.props.current_User))))
                      }>
                      Add existing
                  </a>
                  <div className="group__title" disabled={true}>
                    {
                      RecipeViews.Recipe({
                        ...self.props,
                        entity:i,
                        nesting_depth:self.props.nesting_depth+1,
                        size:"preview",
                        mode:"view",
                        is_editable:false,
                        nested_entity_names: self.props.nested_entity_names.push("Recipe"),
                        set_size:undefined,
                        toggle_button:undefined,
                        set_mode:undefined,
                        set_entity:(new_entity:Models.Recipe, callback?:()=>void) => {},
                        unlink: undefined,
                        delete: undefined
                      })
                    }
                  </div>
                </div>,
              cancel:() => self.setState({...self.state(), add_step_Recipe:"closed"}),
              get_items:[
                { name: "Recipe", get: async(i,s) => Api.get_unlinked_Favorite_Favorite_Recipes(self.props.entity, i, s) },
              ]
            })
        }
      </div>
    :
      null
    }
  

export function render_new_Favorite_User_Favorite(self:FavoriteContext) {
    let state = self.state()
    return state.create_step_User != "none" ?
            <div className="overlay__item overlay__item--new">
              <label>
                {i18next.t('Username')}
                <input type="text"
                  value={state.create_step_User.username}
                  onChange={(e) =>
                    state.create_step_User != "none" &&
                    self.setState({...self.state(),
                      create_step_User: {...state.create_step_User,
                        username: (e.target as HTMLInputElement).value }})
                  }/>
              </label>
              <label>
                {i18next.t('Email')}
                <input type="email"
                  value={state.create_step_User.email}
                  onChange={(e) =>
                    state.create_step_User != "none" &&
                    self.setState({...self.state(),
                      create_step_User: {...state.create_step_User,
                        email: (e.target as HTMLInputElement).value }})
                  }/>
              </label>
              <label>
                {i18next.t('Email confirmation')}
                <input type="email"
                  value={state.create_step_User.email_confirmation}
                  onChange={(e) =>
                    state.create_step_User != "none" &&
                    self.setState({...self.state(),
                      create_step_User: {...state.create_step_User,
                        email_confirmation: (e.target as HTMLInputElement).value }})
                  }/>
              </label>
              { state.create_step_User.validation == "validating" ?
                <div className="loading">{i18next.t('Validating')}</div>
              :
                <Buttons.Create onClick={() =>
                  state.create_step_User != "none" &&
                  Api.validate_User(state.create_step_User.username, state.create_step_User.email, state.create_step_User.email_confirmation).then(is_valid =>
                    {
                      if (state.create_step_User != "none" && is_valid) {
                        Api.register_User(state.create_step_User.username, state.create_step_User.email, state.create_step_User.email_confirmation).then(() =>
                          load_relation_Favorite_User_Favorite(self, self.props.current_User, () =>
                            self.setState({...self.state(), create_step_User:"none"})
                          )
                        )
                      } else {
                        state.create_step_User != "none" &&
                        self.setState({...self.state(),
                          create_step_User: {...state.create_step_User, validation: "invalid" } }, () =>
                          alert(i18next.t('The username and email combination is invalid or it might already be in use. Please try a different combination.')))
                      }
                    }).catch(() =>
                      state.create_step_User != "none" &&
                      self.setState({...self.state(),
                        create_step_User: {...state.create_step_User, validation: "invalid" } }, () =>
                        alert(i18next.t('The username and email combination is invalid or it might already be in use. Please try a different combination.')))
                    )
                } target_name="User" />
              }
              <Buttons.Cancel onClick={() => self.setState({...self.state(), create_step_User:"none"})} />
            </div>
      :  self.props.mode == "edit" ?
      <div className="button__actions">
        <div className="new-user">
              <button disabled={state.User == "loading" ? true : state.User.TotalCount >= 1} 
                      className="new-user button button--new"
                      onClick={() =>
                          self.setState({...self.state(), create_step_User:{ validation:"invalid", username:"", email:"", email_confirmation:"" }
                          })
                      }>
                  {i18next.t('Create new User')}
              </button>
            </div>
        </div>
      :
      null
    }
  
export function render_new_Favorite_Favorite_Recipe(self:FavoriteContext) {
    let state = self.state()
    return  self.props.mode == "edit" ?
      <div className="button__actions">
        <div className="new-recipe">
              <button 
                      className="new-recipe button button--new"
                      onClick={() =>
                          Api.create_linked_Favorite_Favorite_Recipes_Recipe(self.props.entity).then(e => {
                              e.length > 0 &&
                              Api.update_Recipe(
                                ({ ...e[0], Name:"", Ingredients:"", Description:"", RatingType:0, Picture:"" } as Models.Recipe)).then(() =>
                                load_relation_Favorite_Favorite_Recipe(self, self.props.current_User, () =>
                                    self.setState({...self.state(), add_step_Recipe:"closed"})
                                  )
                                )
                          })
                      }>
                  {i18next.t('Create new Recipe')}
              </button>
            </div>
        </div>
      :
      null
    }
  

export function render_saving_animations_Favorite(self:FavoriteContext) {
  return self.state().dirty_User.count() > 0 ?
    <div style={{position:"fixed", zIndex:10000, top:0, left:0, width:"20px", height:"20px", backgroundColor:"red"}} className="saving"/> : 
    self.state().dirty_Recipe.count() > 0 ?
    <div style={{position:"fixed", zIndex:10000, top:0, left:0, width:"20px", height:"20px", backgroundColor:"red"}} className="saving"/>
    : <div style={{position:"fixed", zIndex:10000, top:0, left:0, width:"20px", height:"20px", backgroundColor:"cornflowerblue"}} className="saved"/>
}

export type FavoriteContext = {state:()=>FavoriteState, props:Utils.EntityComponentProps<Models.Favorite>, setState:(new_state:FavoriteState, callback?:()=>void) => void}

export type FavoriteState = {
    update_count:number
    add_step_User:"closed"|"open"|"saving",
      create_step_User:{ validation:"valid"|"validating"|"invalid", username:string, email:string, email_confirmation:string }|"none",dirty_User:Immutable.Map<number,Models.User>,
      User:Utils.PaginatedItems<{ shown_relation: string } & Utils.EntityAndSize<Models.User>>|"loading"
  add_step_Recipe:"closed"|"open"|"saving",
      dirty_Recipe:Immutable.Map<number,Models.Recipe>,
      Recipe:Utils.PaginatedItems<{ shown_relation: string } & Utils.EntityAndSize<Models.Recipe>>|"loading"
  }
export class FavoriteComponent extends React.Component<Utils.EntityComponentProps<Models.Favorite>, FavoriteState> {
  constructor(props:Utils.EntityComponentProps<Models.Favorite>, context:any) {
    super(props, context)
    this.state = { update_count:0, add_step_User:"closed", create_step_User:"none",dirty_User:Immutable.Map<number,Models.User>(), User:"loading", add_step_Recipe:"closed", dirty_Recipe:Immutable.Map<number,Models.Recipe>(), Recipe:"loading" }
  }

  get_self() {
    return {state:() => this.state, props:this.props, setState:(ns,c)=>this.setState(ns,c)}
  }

  componentWillReceiveProps(new_props:Utils.EntityComponentProps<Models.Favorite>) {
    if (new_props.size == "breadcrumb") return
    let current_logged_in_entity = this.props.current_User || null
    let new_logged_in_entity = new_props.current_User || null
    if (new_props.mode != this.props.mode || (new_props.size != this.props.size && (new_props.size == "large" || new_props.size == "fullscreen")) ||
        new_props.logic_frame != this.props.logic_frame ||
        (current_logged_in_entity && !new_logged_in_entity) ||
        (!current_logged_in_entity && new_logged_in_entity) ||
        (current_logged_in_entity && new_logged_in_entity && current_logged_in_entity.Id != new_logged_in_entity.Id)) {
      load_relations_Favorite(this.get_self(), new_props.current_User)
    }
  }

  thread:number = null
  componentWillMount() {
    if (this.props.size == "breadcrumb") return
    if (this.props.size != "preview")
      load_relations_Favorite(this.get_self(), this.props.current_User)

    this.thread = setInterval(() => {
      if (this.state.dirty_User.count() > 0) {
         let first = this.state.dirty_User.first()
         this.setState({...this.state, dirty_User: this.state.dirty_User.remove(first.Id)}, () =>
           Api.update_User(first)
         )
       } else if (this.state.dirty_Recipe.count() > 0) {
         let first = this.state.dirty_Recipe.first()
         this.setState({...this.state, dirty_Recipe: this.state.dirty_Recipe.remove(first.Id)}, () =>
           Api.update_Recipe(first)
         )
       }

    }, 500)
  }

  componentWillUnmount() {
    clearInterval(this.thread)
  }

  render() {
    if (this.props.size == "breadcrumb") {
      return Permissions.can_view_Favorite(this.props.current_User) ?
              render_breadcrumb_Favorite(this.get_self())
              : null
    }

    return <div id={`Favorite_${this.props.entity.Id.toString()}_${this.state.update_count}`} className={`model favorite`}>
      { render_saving_animations_Favorite(this.get_self()) }
      { this.props.nesting_depth == 0 ? render_menu_Favorite(this.get_self()) : null }
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
        { this.props.nesting_depth == 0 ? render_local_menu_Favorite(this.get_self()) : null }
        { render_controls_Favorite(this.get_self()) }
        { render_content_Favorite(this.get_self()) }
      </div>
    </div>
  }
}

export let Favorite = (props:Utils.EntityComponentProps<Models.Favorite>) : JSX.Element =>
  <FavoriteComponent {...props} />

export let Favorite_to_page = (id:number) => {
  let can_edit = Utils.any_of([Permissions.can_edit_Favorite, Permissions.can_edit_User_Favorite, Permissions.can_edit_Favorite_Recipe, Permissions.can_edit_User, Permissions.can_edit_Recipe])
  return Utils.scene_to_page<Models.Favorite>(can_edit, Favorite, Api.get_Favorite(id), Api.update_Favorite, "Favorite", "Favorite", `/Favorites/${id}`)
}

export let Favorite_to = (id:number, target_element_id:string, current_User:Models.User) => {
  Utils.render_page_manager(target_element_id,
    Favorite_to_page(id),
    current_User
  )
}
