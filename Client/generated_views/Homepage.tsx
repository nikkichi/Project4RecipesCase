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
import * as RecipeViews from './Recipe'
import * as RecommendationPageViews from './RecommendationPage'
import * as CuisineViews from './Cuisine'


export function Homepage_Homepage_Recipe_can_create(self:HomepageContext) {
  let state = self.state()
  return state.Recipe == "loading" ? false : state.Recipe.CanCreate
}
export function Homepage_Homepage_RecommendationPage_can_create(self:HomepageContext) {
  let state = self.state()
  return state.RecommendationPage == "loading" ? false : state.RecommendationPage.CanCreate
}
export function Homepage_Homepage_Cuisine_can_create(self:HomepageContext) {
  let state = self.state()
  return state.Cuisine == "loading" ? false : state.Cuisine.CanCreate
}
export function Homepage_Homepage_Recipe_can_delete(self:HomepageContext) {
  let state = self.state()
  return state.Recipe == "loading" ? false : state.Recipe.CanDelete
}
export function Homepage_Homepage_RecommendationPage_can_delete(self:HomepageContext) {
  let state = self.state()
  return state.RecommendationPage == "loading" ? false : state.RecommendationPage.CanDelete
}
export function Homepage_Homepage_Cuisine_can_delete(self:HomepageContext) {
  let state = self.state()
  return state.Cuisine == "loading" ? false : state.Cuisine.CanDelete
}
export function Homepage_Homepage_Recipe_page_index(self:HomepageContext) {
  let state = self.state()
  return state.Recipe == "loading" ? 0 : state.Recipe.PageIndex
}
export function Homepage_Homepage_RecommendationPage_page_index(self:HomepageContext) {
  let state = self.state()
  return state.RecommendationPage == "loading" ? 0 : state.RecommendationPage.PageIndex
}
export function Homepage_Homepage_Cuisine_page_index(self:HomepageContext) {
  let state = self.state()
  return state.Cuisine == "loading" ? 0 : state.Cuisine.PageIndex
}
export function Homepage_Homepage_Recipe_page_size(self:HomepageContext) {
  let state = self.state()
  return state.Recipe == "loading" ? 25 : state.Recipe.PageSize
}
export function Homepage_Homepage_RecommendationPage_page_size(self:HomepageContext) {
  let state = self.state()
  return state.RecommendationPage == "loading" ? 25 : state.RecommendationPage.PageSize
}
export function Homepage_Homepage_Cuisine_page_size(self:HomepageContext) {
  let state = self.state()
  return state.Cuisine == "loading" ? 25 : state.Cuisine.PageSize
}
export function Homepage_Homepage_Recipe_search_query(self:HomepageContext) {
  let state = self.state()
  return state.Recipe == "loading" ? null : state.Recipe.SearchQuery
}
export function Homepage_Homepage_RecommendationPage_search_query(self:HomepageContext) {
  let state = self.state()
  return state.RecommendationPage == "loading" ? null : state.RecommendationPage.SearchQuery
}
export function Homepage_Homepage_Cuisine_search_query(self:HomepageContext) {
  let state = self.state()
  return state.Cuisine == "loading" ? null : state.Cuisine.SearchQuery
}
export function Homepage_Homepage_Recipe_num_pages(self:HomepageContext) {
  let state = self.state()
  return state.Recipe == "loading" ? 1 : state.Recipe.NumPages
}
export function Homepage_Homepage_RecommendationPage_num_pages(self:HomepageContext) {
  let state = self.state()
  return state.RecommendationPage == "loading" ? 1 : state.RecommendationPage.NumPages
}
export function Homepage_Homepage_Cuisine_num_pages(self:HomepageContext) {
  let state = self.state()
  return state.Cuisine == "loading" ? 1 : state.Cuisine.NumPages
}

export function load_relation_Homepage_Homepage_Recipe(self:HomepageContext, force_first_page:boolean, current_User:Models.User, callback?:()=>void) {
  let state = self.state()
  let prelude = force_first_page && state.Recipe != "loading" ?
    (c:() => void) => state.Recipe != "loading" && self.setState({
      ...state,
      Recipe: {...state.Recipe, PageIndex:0 }
    }, c)
    :
    (c:() => void) => c()
  Permissions.can_view_Recipe(current_User) ?
    prelude(() =>
      Api.get_Homepage_Homepage_Recipes(self.props.entity, Homepage_Homepage_Recipe_page_index(self), Homepage_Homepage_Recipe_page_size(self), Homepage_Homepage_Recipe_search_query(self)).then(Recipes =>
        self.setState({...self.state(), update_count:self.state().update_count+1,
            Recipe:Utils.raw_page_to_paginated_items<Models.Recipe, Utils.EntityAndSize<Models.Recipe> & { shown_relation:string }>((i, i_just_created) => {
              let state = self.state()
              return {
                element:i,
                size: state.Recipe != "loading" ?
                  (state.Recipe.Items.has(i.Id) ?
                    state.Recipe.Items.get(i.Id).size
                  :
                    "preview" /* i_just_created ? "large" : "preview" */)
                  :
                    "preview" /* i_just_created ? "large" : "preview" */,
                shown_relation:"all"}}, Recipes)
            }, callback)))
    :
      prelude(() => callback && callback())
}

export function load_relation_Homepage_Homepage_RecommendationPage(self:HomepageContext, force_first_page:boolean, current_User:Models.User, callback?:()=>void) {
  let state = self.state()
  let prelude = force_first_page && state.RecommendationPage != "loading" ?
    (c:() => void) => state.RecommendationPage != "loading" && self.setState({
      ...state,
      RecommendationPage: {...state.RecommendationPage, PageIndex:0 }
    }, c)
    :
    (c:() => void) => c()
  Permissions.can_view_RecommendationPage(current_User) ?
    prelude(() =>
      Api.get_Homepage_Homepage_RecommendationPages(self.props.entity, Homepage_Homepage_RecommendationPage_page_index(self), Homepage_Homepage_RecommendationPage_page_size(self), Homepage_Homepage_RecommendationPage_search_query(self)).then(RecommendationPages =>
        self.setState({...self.state(), update_count:self.state().update_count+1,
            RecommendationPage:Utils.raw_page_to_paginated_items<Models.RecommendationPage, Utils.EntityAndSize<Models.RecommendationPage> & { shown_relation:string }>((i, i_just_created) => {
              let state = self.state()
              return {
                element:i,
                size: state.RecommendationPage != "loading" ?
                  (state.RecommendationPage.Items.has(i.Id) ?
                    state.RecommendationPage.Items.get(i.Id).size
                  :
                    "preview" /* i_just_created ? "large" : "preview" */)
                  :
                    "preview" /* i_just_created ? "large" : "preview" */,
                shown_relation:"all"}}, RecommendationPages)
            }, callback)))
    :
      prelude(() => callback && callback())
}

export function load_relation_Homepage_Homepage_Cuisine(self:HomepageContext, force_first_page:boolean, current_User:Models.User, callback?:()=>void) {
  let state = self.state()
  let prelude = force_first_page && state.Cuisine != "loading" ?
    (c:() => void) => state.Cuisine != "loading" && self.setState({
      ...state,
      Cuisine: {...state.Cuisine, PageIndex:0 }
    }, c)
    :
    (c:() => void) => c()
  Permissions.can_view_Cuisine(current_User) ?
    prelude(() =>
      Api.get_Homepage_Homepage_Cuisines(self.props.entity, Homepage_Homepage_Cuisine_page_index(self), Homepage_Homepage_Cuisine_page_size(self), Homepage_Homepage_Cuisine_search_query(self)).then(Cuisines =>
        self.setState({...self.state(), update_count:self.state().update_count+1,
            Cuisine:Utils.raw_page_to_paginated_items<Models.Cuisine, Utils.EntityAndSize<Models.Cuisine> & { shown_relation:string }>((i, i_just_created) => {
              let state = self.state()
              return {
                element:i,
                size: state.Cuisine != "loading" ?
                  (state.Cuisine.Items.has(i.Id) ?
                    state.Cuisine.Items.get(i.Id).size
                  :
                    "preview" /* i_just_created ? "large" : "preview" */)
                  :
                    "preview" /* i_just_created ? "large" : "preview" */,
                shown_relation:"all"}}, Cuisines)
            }, callback)))
    :
      prelude(() => callback && callback())
}

export function load_relations_Homepage(self, current_User:Models.User, callback?:()=>void) {
  load_relation_Homepage_Homepage_Cuisine(self, false, self.props.current_User, 
        () => load_relation_Homepage_Homepage_RecommendationPage(self, false, self.props.current_User, 
        () => load_relation_Homepage_Homepage_Recipe(self, false, self.props.current_User, 
        () => callback && callback())))
}

export function set_size_Homepage(self:HomepageContext, new_size:Utils.EntitySize) {
  self.props.set_size(new_size, () => {
    if (new_size == "fullscreen")
      self.props.push(Homepage_to_page(self.props.entity.Id))
  })
}





export function render_editable_attributes_minimised_Homepage(self:HomepageContext) {
  let attributes = (<div>
      
    </div>)
  return attributes
}

export function render_editable_attributes_maximised_Homepage(self:HomepageContext) {
    let state = self.state()
    let attributes = (<div>
        
        
        
        
      </div>)
    return attributes
  }

export function render_breadcrumb_Homepage(self:HomepageContext) {
  return <div className="breadcrumb-homepage">Homepage</div>
}

export function render_menu_Homepage(self:HomepageContext) {
  let state = self.state()
  return <div className="menu">
        <img className="logo" src={"/images/logo.png"} alt="Logo"/>
        <div className="pages">
          {!Permissions.can_view_Homepage(self.props.current_User) ? null :
              <div className={`menu_entry page_link active-page`}>
                <a onClick={() => 
                  self.props.set_shown_relation("none")
                  
                }>
                  {i18next.t('Homepage')}
                </a>
              </div>
            }
          <div className="menu_entries">
          
            {!Permissions.can_view_Recipe(self.props.current_User) ? null :
                  <div className={`menu_entry${self.props.shown_relation == "Homepage_Recipe" ? " active" : ""}`}>
                    <a onClick={() =>
                        {self.props.set_shown_relation("Homepage_Recipe")
                        }
                      }>
                      {i18next.t('Homepage_Recipes')}
                    </a>
                  </div>
                }
        {!Permissions.can_view_RecommendationPage(self.props.current_User) ? null :
                  <div className={`menu_entry${self.props.shown_relation == "Homepage_RecommendationPage" ? " active" : ""}`}>
                    <a onClick={() =>
                        {self.props.set_shown_relation("Homepage_RecommendationPage")
                        }
                      }>
                      {i18next.t('Homepage_RecommendationPages')}
                    </a>
                  </div>
                }
        {!Permissions.can_view_Cuisine(self.props.current_User) ? null :
                  <div className={`menu_entry${self.props.shown_relation == "Homepage_Cuisine" ? " active" : ""}`}>
                    <a onClick={() =>
                        {self.props.set_shown_relation("Homepage_Cuisine")
                        }
                      }>
                      {i18next.t('Homepage_Cuisines')}
                    </a>
                  </div>
                }
                <div className="menu_entry menu_entry--with-sub">
                
                </div>  
          </div>
        </div>
      </div>
}

export function render_local_menu_Homepage(self:HomepageContext) {
  let state = self.state()
  return <div className="local-menu">
          <div className="local_menu_entries">
            <div className={`local_menu_entry${self.props.shown_relation == "none" ? " local_menu_entry--active" : ""}`}>
              <a onClick={() =>
                  self.props.set_shown_relation("none")
              }>
                {i18next.t('About this Homepage')}
              </a>
            </div>
          
          </div>
        </div>
}

export function render_controls_Homepage(self:HomepageContext) {
  return <div className="control">
    {self.props.allow_maximisation && self.props.set_size ? <a className={`"homepage button button--toggle ${self.props.size != 'preview' ? 'button--toggle--open' : ''}`}
          onClick={() => {
            set_size_Homepage(self, self.props.size == "preview" ? "large" : "preview")}
          }>
      </a> : null}
    {Permissions.can_delete_Homepage(self.props.current_User) && self.props.size == "fullscreen" ? <a className="button button--delete"
      onClick={() => confirm(i18next.t('Are you sure?')) &&
        Api.delete_Homepage(self.props.entity).then(() => self.props.force_reload(() => self.props.pop()))
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

export function render_content_Homepage(self:HomepageContext) {
  let actions:Array<()=>void> =
    [
      self.props.allow_maximisation && self.props.set_size && self.props.size == "preview" ?
        () => set_size_Homepage(self, self.props.size == "preview" ? "large" : "preview")
      :
        null,
    ].filter(a => a != null)
  let content =
    Permissions.can_view_Homepage(self.props.current_User) ?
      self.props.size == "preview" ?
        render_preview_Homepage(self)
      : self.props.size == "large" ?
        render_large_Homepage(self)
      : self.props.size == "fullscreen" ?
        render_large_Homepage(self)
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





export function render_preview_Homepage(self:HomepageContext) {
  let attributes:JSX.Element = null
  if (self.props.mode == "view" || !Permissions.can_edit_Homepage(self.props.current_User))
    attributes = (<div className="model__attributes">
      
    </div>)
  else
    attributes = render_editable_attributes_minimised_Homepage(self)
  return (<div className="block">
      {attributes}
    </div>)
}

export function render_large_Homepage(self:HomepageContext) {
  let state = self.state()
  let attributes:JSX.Element = null
  if (self.props.mode == "view" || !Permissions.can_edit_Homepage(self.props.current_User))
    attributes = (<div className="model__attributes">
      
        
    </div>)
  else
    attributes = render_editable_attributes_maximised_Homepage(self)
  return (<div className="block">
      {self.props.nesting_depth == 0 && self.props.shown_relation != "all" && self.props.shown_relation != "none" ? null : attributes}
      {render_relations_Homepage(self)}
    </div>)
}


export function render_Homepage_Homepage_Recipe(self:HomepageContext, context:"presentation_structure"|"default") {
  if ((context == "default" && self.props.shown_relation != "all" && self.props.shown_relation != "Homepage_Recipe") || !Permissions.can_view_Recipe(self.props.current_User))
    return null
  let state = self.state()
  return <div>
    
    { List.render_relation("homepage_homepage_recipe",
   "Homepage",
   "Recipe",
   "Recipes",
   self.props.nesting_depth > 0,
   false,
   false,
   false)
  (
      state.Recipe != "loading" ?
        state.Recipe.IdsInServerOrder.map(id => state.Recipe != "loading" && state.Recipe.Items.get(id)):
        state.Recipe,
      Homepage_Homepage_Recipe_page_index(self),
      Homepage_Homepage_Recipe_num_pages(self),
      new_page_index => {
          let state = self.state()
          state.Recipe != "loading" &&
          self.setState({...self.state(),
            update_count:self.state().update_count+1,
            Recipe: {
              ...state.Recipe,
              PageIndex:new_page_index
            }
          }, () =>  load_relation_Homepage_Homepage_Recipe(self, false, self.props.current_User))
        },
      (i,_) => {
          let i_id = i.element.Id
          let state = self.state()
          return <div key={i_id}
            className={`model-nested__item ${i.size != "preview" ? "model-nested__item--open" : ""}
                        ${state.Recipe != "loading" && state.Recipe.JustCreated.has(i_id) && state.Recipe.JustCreated.get(i_id) ? "newly-created" : ""}` }
          
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
                  mode:self.props.mode == "edit" && (Permissions.can_edit_Homepage_Recipe(self.props.current_User)
                        || Permissions.can_create_Homepage_Recipe(self.props.current_User)
                        || Permissions.can_delete_Homepage_Recipe(self.props.current_User)) ?
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
                  unlink: undefined,
                    delete: !Permissions.can_delete_Recipe(self.props.current_User) || !Homepage_Homepage_Recipe_can_delete(self) ?
                    null
                    :
                    () => confirm(i18next.t('Are you sure?')) && Api.delete_Recipe(i.element).then(() =>
                      load_relation_Homepage_Homepage_Recipe(self, false, self.props.current_User))
                })
              }
            </div>
          </div>
        },
      () =>
        <div>
          {Permissions.can_create_Recipe(self.props.current_User) && Permissions.can_create_Homepage_Recipe(self.props.current_User) && Homepage_Homepage_Recipe_can_create(self) ? render_new_Homepage_Homepage_Recipe(self) : null}
          
        </div>)
    }
    
    </div>
}


export function render_Homepage_Homepage_RecommendationPage(self:HomepageContext, context:"presentation_structure"|"default") {
  if ((context == "default" && self.props.shown_relation != "all" && self.props.shown_relation != "Homepage_RecommendationPage") || !Permissions.can_view_RecommendationPage(self.props.current_User))
    return null
  let state = self.state()
  return <div>
    
    { List.render_relation("homepage_homepage_recommendationpage",
   "Homepage",
   "RecommendationPage",
   "RecommendationPages",
   self.props.nesting_depth > 0,
   false,
   false,
   false)
  (
      state.RecommendationPage != "loading" ?
        state.RecommendationPage.IdsInServerOrder.map(id => state.RecommendationPage != "loading" && state.RecommendationPage.Items.get(id)):
        state.RecommendationPage,
      Homepage_Homepage_RecommendationPage_page_index(self),
      Homepage_Homepage_RecommendationPage_num_pages(self),
      new_page_index => {
          let state = self.state()
          state.RecommendationPage != "loading" &&
          self.setState({...self.state(),
            update_count:self.state().update_count+1,
            RecommendationPage: {
              ...state.RecommendationPage,
              PageIndex:new_page_index
            }
          }, () =>  load_relation_Homepage_Homepage_RecommendationPage(self, false, self.props.current_User))
        },
      (i,_) => {
          let i_id = i.element.Id
          let state = self.state()
          return <div key={i_id}
            className={`model-nested__item ${i.size != "preview" ? "model-nested__item--open" : ""}
                        ${state.RecommendationPage != "loading" && state.RecommendationPage.JustCreated.has(i_id) && state.RecommendationPage.JustCreated.get(i_id) ? "newly-created" : ""}` }
          
            >
            <div key={i_id}>
              {
                RecommendationPageViews.RecommendationPage({
                  ...self.props,
                  entity:i.element,
                  inline:false,
                  nesting_depth:self.props.nesting_depth+1,
                  size: i.size,
                  allow_maximisation:true,
                  allow_fullscreen:true,
                  mode:self.props.mode == "edit" && (Permissions.can_edit_Homepage_RecommendationPage(self.props.current_User)
                        || Permissions.can_create_Homepage_RecommendationPage(self.props.current_User)
                        || Permissions.can_delete_Homepage_RecommendationPage(self.props.current_User)) ?
                    self.props.mode : "view",
                  is_editable:state.RecommendationPage != "loading" && state.RecommendationPage.Editable.get(i_id),
                  shown_relation:i.shown_relation,
                  set_shown_relation:(new_shown_relation:string, callback) => {
                    let state = self.state()
                    state.RecommendationPage != "loading" &&
                    self.setState({...self.state(),
                      RecommendationPage:
                        {
                          ...state.RecommendationPage,
                          Items:state.RecommendationPage.Items.set(i_id,{...state.RecommendationPage.Items.get(i_id), shown_relation:new_shown_relation})
                        }
                    }, callback)
                  },
                  nested_entity_names: self.props.nested_entity_names.push("RecommendationPage"),
                  
                  set_size:(new_size:Utils.EntitySize, callback) => {
                    let new_shown_relation = new_size == "large" ? "all" : i.shown_relation
                    let state = self.state()
                    state.RecommendationPage != "loading" &&
                    self.setState({...self.state(),
                      RecommendationPage:
                        {
                          ...state.RecommendationPage,
                          Items:state.RecommendationPage.Items.set(i_id,
                            {...state.RecommendationPage.Items.get(i_id),
                              size:new_size, shown_relation:new_shown_relation})
                        }
                    }, callback)
                  },
                    
                  toggle_button:undefined,
                  set_mode:undefined,
                  set_entity:(new_entity:Models.RecommendationPage, callback?:()=>void, force_update_count_increment?:boolean) => {
                    let state = self.state()
                    state.RecommendationPage != "loading" &&
                    self.setState({...self.state(),
                      dirty_RecommendationPage:state.dirty_RecommendationPage.set(i_id, new_entity),
                      update_count:force_update_count_increment ? self.state().update_count+1 : state.update_count,
                      RecommendationPage:
                        {
                          ...state.RecommendationPage,
                          Items:state.RecommendationPage.Items.set(i_id,{...state.RecommendationPage.Items.get(i_id), element:new_entity})
                        }
                    }, callback)
                  },
                  unlink: undefined,
                    delete: !Permissions.can_delete_RecommendationPage(self.props.current_User) || !Homepage_Homepage_RecommendationPage_can_delete(self) ?
                    null
                    :
                    () => confirm(i18next.t('Are you sure?')) && Api.delete_RecommendationPage(i.element).then(() =>
                      load_relation_Homepage_Homepage_RecommendationPage(self, false, self.props.current_User))
                })
              }
            </div>
          </div>
        },
      () =>
        <div>
          {Permissions.can_create_RecommendationPage(self.props.current_User) && Permissions.can_create_Homepage_RecommendationPage(self.props.current_User) && Homepage_Homepage_RecommendationPage_can_create(self) ? render_new_Homepage_Homepage_RecommendationPage(self) : null}
          
        </div>)
    }
    
    </div>
}


export function render_Homepage_Homepage_Cuisine(self:HomepageContext, context:"presentation_structure"|"default") {
  if ((context == "default" && self.props.shown_relation != "all" && self.props.shown_relation != "Homepage_Cuisine") || !Permissions.can_view_Cuisine(self.props.current_User))
    return null
  let state = self.state()
  return <div>
    
    { List.render_relation("homepage_homepage_cuisine",
   "Homepage",
   "Cuisine",
   "Cuisines",
   self.props.nesting_depth > 0,
   false,
   false,
   false)
  (
      state.Cuisine != "loading" ?
        state.Cuisine.IdsInServerOrder.map(id => state.Cuisine != "loading" && state.Cuisine.Items.get(id)):
        state.Cuisine,
      Homepage_Homepage_Cuisine_page_index(self),
      Homepage_Homepage_Cuisine_num_pages(self),
      new_page_index => {
          let state = self.state()
          state.Cuisine != "loading" &&
          self.setState({...self.state(),
            update_count:self.state().update_count+1,
            Cuisine: {
              ...state.Cuisine,
              PageIndex:new_page_index
            }
          }, () =>  load_relation_Homepage_Homepage_Cuisine(self, false, self.props.current_User))
        },
      (i,_) => {
          let i_id = i.element.Id
          let state = self.state()
          return <div key={i_id}
            className={`model-nested__item ${i.size != "preview" ? "model-nested__item--open" : ""}
                        ${state.Cuisine != "loading" && state.Cuisine.JustCreated.has(i_id) && state.Cuisine.JustCreated.get(i_id) ? "newly-created" : ""}` }
          
            >
            <div key={i_id}>
              {
                CuisineViews.Cuisine({
                  ...self.props,
                  entity:i.element,
                  inline:false,
                  nesting_depth:self.props.nesting_depth+1,
                  size: i.size,
                  allow_maximisation:true,
                  allow_fullscreen:true,
                  mode:self.props.mode == "edit" && (Permissions.can_edit_Homepage_Cuisine(self.props.current_User)
                        || Permissions.can_create_Homepage_Cuisine(self.props.current_User)
                        || Permissions.can_delete_Homepage_Cuisine(self.props.current_User)) ?
                    self.props.mode : "view",
                  is_editable:state.Cuisine != "loading" && state.Cuisine.Editable.get(i_id),
                  shown_relation:i.shown_relation,
                  set_shown_relation:(new_shown_relation:string, callback) => {
                    let state = self.state()
                    state.Cuisine != "loading" &&
                    self.setState({...self.state(),
                      Cuisine:
                        {
                          ...state.Cuisine,
                          Items:state.Cuisine.Items.set(i_id,{...state.Cuisine.Items.get(i_id), shown_relation:new_shown_relation})
                        }
                    }, callback)
                  },
                  nested_entity_names: self.props.nested_entity_names.push("Cuisine"),
                  
                  set_size:(new_size:Utils.EntitySize, callback) => {
                    let new_shown_relation = new_size == "large" ? "all" : i.shown_relation
                    let state = self.state()
                    state.Cuisine != "loading" &&
                    self.setState({...self.state(),
                      Cuisine:
                        {
                          ...state.Cuisine,
                          Items:state.Cuisine.Items.set(i_id,
                            {...state.Cuisine.Items.get(i_id),
                              size:new_size, shown_relation:new_shown_relation})
                        }
                    }, callback)
                  },
                    
                  toggle_button:undefined,
                  set_mode:undefined,
                  set_entity:(new_entity:Models.Cuisine, callback?:()=>void, force_update_count_increment?:boolean) => {
                    let state = self.state()
                    state.Cuisine != "loading" &&
                    self.setState({...self.state(),
                      dirty_Cuisine:state.dirty_Cuisine.set(i_id, new_entity),
                      update_count:force_update_count_increment ? self.state().update_count+1 : state.update_count,
                      Cuisine:
                        {
                          ...state.Cuisine,
                          Items:state.Cuisine.Items.set(i_id,{...state.Cuisine.Items.get(i_id), element:new_entity})
                        }
                    }, callback)
                  },
                  unlink: undefined,
                    delete: !Permissions.can_delete_Cuisine(self.props.current_User) || !Homepage_Homepage_Cuisine_can_delete(self) ?
                    null
                    :
                    () => confirm(i18next.t('Are you sure?')) && Api.delete_Cuisine(i.element).then(() =>
                      load_relation_Homepage_Homepage_Cuisine(self, false, self.props.current_User))
                })
              }
            </div>
          </div>
        },
      () =>
        <div>
          {Permissions.can_create_Cuisine(self.props.current_User) && Permissions.can_create_Homepage_Cuisine(self.props.current_User) && Homepage_Homepage_Cuisine_can_create(self) ? render_new_Homepage_Homepage_Cuisine(self) : null}
          
        </div>)
    }
    
    </div>
}



export function render_relations_Homepage(self:HomepageContext) {
  return <div className="relations">
      { render_Homepage_Homepage_Recipe(self, "default") }
      { render_Homepage_Homepage_RecommendationPage(self, "default") }
      { render_Homepage_Homepage_Cuisine(self, "default") }
      
    </div>
}



export function render_new_Homepage_Homepage_Recipe(self:HomepageContext) {
    let state = self.state()
    return  self.props.mode == "edit" ?
      <div className="button__actions">
        <div className="new-recipe">
              <button 
                      className="new-recipe button button--new"
                      onClick={() =>
                          Api.create_Recipe().then(e => {
                              Api.update_Recipe(
                                ({ ...e, Name:"", Ingredients:"", Description:"", Picture:"" } as Models.Recipe)).then(() =>
                                load_relation_Homepage_Homepage_Recipe(self, true, self.props.current_User, () =>
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
  
export function render_new_Homepage_Homepage_RecommendationPage(self:HomepageContext) {
    let state = self.state()
    return  self.props.mode == "edit" ?
      <div className="button__actions">
        <div className="new-recommendationpage">
              <button 
                      className="new-recommendationpage button button--new"
                      onClick={() =>
                          Api.create_RecommendationPage().then(e => {
                              Api.update_RecommendationPage(
                                ({ ...e,  } as Models.RecommendationPage)).then(() =>
                                load_relation_Homepage_Homepage_RecommendationPage(self, true, self.props.current_User, () =>
                                    self.setState({...self.state(), add_step_RecommendationPage:"closed"})
                                  )
                                )
                          })
                      }>
                  {i18next.t('Create new RecommendationPage')}
              </button>
            </div>
        </div>
      :
      null
    }
  
export function render_new_Homepage_Homepage_Cuisine(self:HomepageContext) {
    let state = self.state()
    return  self.props.mode == "edit" ?
      <div className="button__actions">
        <Buttons.Create target_name={"Cuisine"} onClick={() => self.setState({...self.state(), add_step_Cuisine:"creating"})}  />
            {
            state.add_step_Cuisine != "creating" ?
            null
            :
            <div className="overlay__item overlay__item--new">
              <div className="new-asian">
              <button 
                      className="new-asian button button--new"
                      onClick={() =>
                          Api.create_Asian().then(e => {
                              Api.update_Cuisine(
                                ({ ...e, Kind:"Asian", Description:"" } as Models.Asian)).then(() =>
                                load_relation_Homepage_Homepage_Cuisine(self, true, self.props.current_User, () =>
                                    self.setState({...self.state(), add_step_Cuisine:"closed"})
                                  )
                                )
                          })
                      }>
                  {i18next.t('Create new Asian')}
              </button>
            </div>
            <div className="new-mediterranean">
              <button 
                      className="new-mediterranean button button--new"
                      onClick={() =>
                          Api.create_Mediterranean().then(e => {
                              Api.update_Cuisine(
                                ({ ...e, Kind:"Mediterranean", Description:"" } as Models.Mediterranean)).then(() =>
                                load_relation_Homepage_Homepage_Cuisine(self, true, self.props.current_User, () =>
                                    self.setState({...self.state(), add_step_Cuisine:"closed"})
                                  )
                                )
                          })
                      }>
                  {i18next.t('Create new Mediterranean')}
              </button>
            </div>
            <div className="new-grill">
              <button 
                      className="new-grill button button--new"
                      onClick={() =>
                          Api.create_Grill().then(e => {
                              Api.update_Cuisine(
                                ({ ...e, Kind:"Grill", Description:"" } as Models.Grill)).then(() =>
                                load_relation_Homepage_Homepage_Cuisine(self, true, self.props.current_User, () =>
                                    self.setState({...self.state(), add_step_Cuisine:"closed"})
                                  )
                                )
                          })
                      }>
                  {i18next.t('Create new Grill')}
              </button>
            </div>
              <Buttons.Cancel onClick={() => self.setState({...self.state(), add_step_Cuisine:"closed"})} />
            </div>
            }
        </div>
      :
      null
    }
  

export function render_saving_animations_Homepage(self:HomepageContext) {
  return self.state().dirty_Recipe.count() > 0 ?
    <div style={{position:"fixed", zIndex:10000, top:0, left:0, width:"20px", height:"20px", backgroundColor:"red"}} className="saving"/> : 
    self.state().dirty_RecommendationPage.count() > 0 ?
    <div style={{position:"fixed", zIndex:10000, top:0, left:0, width:"20px", height:"20px", backgroundColor:"red"}} className="saving"/> : 
    self.state().dirty_Cuisine.count() > 0 ?
    <div style={{position:"fixed", zIndex:10000, top:0, left:0, width:"20px", height:"20px", backgroundColor:"red"}} className="saving"/>
    : <div style={{position:"fixed", zIndex:10000, top:0, left:0, width:"20px", height:"20px", backgroundColor:"cornflowerblue"}} className="saved"/>
}

export type HomepageContext = {state:()=>HomepageState, props:Utils.EntityComponentProps<Models.Homepage>, setState:(new_state:HomepageState, callback?:()=>void) => void}

export type HomepageState = {
    update_count:number
    add_step_Recipe:"closed"|"open"|"saving",
      dirty_Recipe:Immutable.Map<number,Models.Recipe>,
      Recipe:Utils.PaginatedItems<{ shown_relation: string } & Utils.EntityAndSize<Models.Recipe>>|"loading"
  add_step_RecommendationPage:"closed"|"open"|"saving",
      dirty_RecommendationPage:Immutable.Map<number,Models.RecommendationPage>,
      RecommendationPage:Utils.PaginatedItems<{ shown_relation: string } & Utils.EntityAndSize<Models.RecommendationPage>>|"loading"
  add_step_Cuisine:"closed"|"open"|"saving"|"adding"|"creating",
      dirty_Cuisine:Immutable.Map<number,Models.Cuisine>,
      Cuisine:Utils.PaginatedItems<{ shown_relation: string } & Utils.EntityAndSize<Models.Cuisine>>|"loading"
  }
export class HomepageComponent extends React.Component<Utils.EntityComponentProps<Models.Homepage>, HomepageState> {
  constructor(props:Utils.EntityComponentProps<Models.Homepage>, context:any) {
    super(props, context)
    this.state = { update_count:0,add_step_Recipe:"closed", dirty_Recipe:Immutable.Map<number,Models.Recipe>(), Recipe:"loading", add_step_RecommendationPage:"closed", dirty_RecommendationPage:Immutable.Map<number,Models.RecommendationPage>(), RecommendationPage:"loading", add_step_Cuisine:"closed", dirty_Cuisine:Immutable.Map<number,Models.Cuisine>(), Cuisine:"loading" }
  }

  get_self() {
    return {state:() => this.state, props:this.props, setState:(ns,c)=>this.setState(ns,c)}
  }

  componentWillReceiveProps(new_props:Utils.EntityComponentProps<Models.Homepage>) {
    if (new_props.size == "breadcrumb") return
    let current_logged_in_entity = this.props.current_User || null
    let new_logged_in_entity = new_props.current_User || null
    if (new_props.mode != this.props.mode || (new_props.size != this.props.size && (new_props.size == "large" || new_props.size == "fullscreen")) ||
        new_props.logic_frame != this.props.logic_frame ||
        (current_logged_in_entity && !new_logged_in_entity) ||
        (!current_logged_in_entity && new_logged_in_entity) ||
        (current_logged_in_entity && new_logged_in_entity && current_logged_in_entity.Id != new_logged_in_entity.Id)) {
      load_relations_Homepage(this.get_self(),  new_props.current_User)
    }
  }

  thread:number = null
  componentWillMount() {
    if (this.props.size == "breadcrumb") return
    if (this.props.size != "preview") {
      
      load_relations_Homepage(this.get_self(), this.props.current_User)
    }

    this.thread = setInterval(() => {
      if (this.state.dirty_Recipe.count() > 0) {
         let first = this.state.dirty_Recipe.first()
         this.setState({...this.state, dirty_Recipe: this.state.dirty_Recipe.remove(first.Id)}, () =>
           Api.update_Recipe(first)
         )
       } else if (this.state.dirty_RecommendationPage.count() > 0) {
         let first = this.state.dirty_RecommendationPage.first()
         this.setState({...this.state, dirty_RecommendationPage: this.state.dirty_RecommendationPage.remove(first.Id)}, () =>
           Api.update_RecommendationPage(first)
         )
       } else if (this.state.dirty_Cuisine.count() > 0) {
         let first = this.state.dirty_Cuisine.first()
         this.setState({...this.state, dirty_Cuisine: this.state.dirty_Cuisine.remove(first.Id)}, () =>
           Api.update_Cuisine(first)
         )
       }

    }, 500)
  }

  componentWillUnmount() {
    clearInterval(this.thread)
  }

  render() {
    if (this.props.size == "breadcrumb") {
      return Permissions.can_view_Homepage(this.props.current_User) ?
              render_breadcrumb_Homepage(this.get_self())
              : null
    }

    return <div id={`Homepage_${this.props.entity.Id.toString()}_${this.state.update_count}`} className={`model homepage`}>
      { render_saving_animations_Homepage(this.get_self()) }
      { this.props.nesting_depth == 0 ? render_menu_Homepage(this.get_self()) : null }
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
        
        { render_controls_Homepage(this.get_self()) }
        { render_content_Homepage(this.get_self()) }
      </div>
    </div>
  }
}

export let Homepage = (props:Utils.EntityComponentProps<Models.Homepage>) : JSX.Element =>
  <HomepageComponent {...props} />

export let Homepage_to_page = (id:number) => {
  let can_edit = Utils.any_of([Permissions.can_edit_Homepage, Permissions.can_edit_Homepage_Recipe, Permissions.can_edit_Homepage_RecommendationPage, Permissions.can_edit_Homepage_Cuisine, Permissions.can_edit_Recipe, Permissions.can_edit_RecommendationPage, Permissions.can_edit_Cuisine])
  return Utils.scene_to_page<Models.Homepage>(can_edit, Homepage, Api.get_Homepage(id), Api.update_Homepage, "Homepage", "Homepage", `/Homepages/${id}`)
}

export let Homepage_to = (id:number, target_element_id:string, current_User:Models.User) => {
  Utils.render_page_manager(target_element_id,
    Homepage_to_page(id),
    current_User
  )
}
