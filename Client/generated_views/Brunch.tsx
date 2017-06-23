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
import * as CuisineViews from './Cuisine'
import * as RecipeViews from './Recipe'


export function Brunch_Cuisine_Meal_can_create(self:BrunchContext) {
  let state = self.state()
  return state.Cuisine == "loading" ? false : state.Cuisine.CanCreate
}
export function Brunch_Meal_Recipe_can_create(self:BrunchContext) {
  let state = self.state()
  return state.Recipe == "loading" ? false : state.Recipe.CanCreate
}
export function Brunch_Cuisine_Meal_can_delete(self:BrunchContext) {
  let state = self.state()
  return state.Cuisine == "loading" ? false : state.Cuisine.CanDelete
}
export function Brunch_Meal_Recipe_can_delete(self:BrunchContext) {
  let state = self.state()
  return state.Recipe == "loading" ? false : state.Recipe.CanDelete
}
export function Brunch_Cuisine_Meal_page_index(self:BrunchContext) {
  let state = self.state()
  return state.Cuisine == "loading" ? 0 : state.Cuisine.PageIndex
}
export function Brunch_Meal_Recipe_page_index(self:BrunchContext) {
  let state = self.state()
  return state.Recipe == "loading" ? 0 : state.Recipe.PageIndex
}
export function Brunch_Cuisine_Meal_page_size(self:BrunchContext) {
  let state = self.state()
  return state.Cuisine == "loading" ? 25 : state.Cuisine.PageSize
}
export function Brunch_Meal_Recipe_page_size(self:BrunchContext) {
  let state = self.state()
  return state.Recipe == "loading" ? 25 : state.Recipe.PageSize
}
export function Brunch_Cuisine_Meal_search_query(self:BrunchContext) {
  let state = self.state()
  return state.Cuisine == "loading" ? null : state.Cuisine.SearchQuery
}
export function Brunch_Meal_Recipe_search_query(self:BrunchContext) {
  let state = self.state()
  return state.Recipe == "loading" ? null : state.Recipe.SearchQuery
}
export function Brunch_Cuisine_Meal_num_pages(self:BrunchContext) {
  let state = self.state()
  return state.Cuisine == "loading" ? 1 : state.Cuisine.NumPages
}
export function Brunch_Meal_Recipe_num_pages(self:BrunchContext) {
  let state = self.state()
  return state.Recipe == "loading" ? 1 : state.Recipe.NumPages
}

export function load_relation_Brunch_Cuisine_Meal(self:BrunchContext, force_first_page:boolean, current_User:Models.User, callback?:()=>void) {
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
      Api.get_Meal_Cuisine_Meals(self.props.entity, Brunch_Cuisine_Meal_page_index(self), Brunch_Cuisine_Meal_page_size(self), Brunch_Cuisine_Meal_search_query(self)).then(Cuisines =>
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

export function load_relation_Brunch_Meal_Recipe(self:BrunchContext, force_first_page:boolean, current_User:Models.User, callback?:()=>void) {
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
      Api.get_Meal_Meal_Recipes(self.props.entity, Brunch_Meal_Recipe_page_index(self), Brunch_Meal_Recipe_page_size(self), Brunch_Meal_Recipe_search_query(self)).then(Recipes =>
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

export function load_relations_Brunch(self, current_User:Models.User, callback?:()=>void) {
  load_relation_Brunch_Meal_Recipe(self, false, self.props.current_User, 
        () => load_relation_Brunch_Cuisine_Meal(self, false, self.props.current_User, 
        () => callback && callback()))
}

export function set_size_Brunch(self:BrunchContext, new_size:Utils.EntitySize) {
  self.props.set_size(new_size, () => {
    if (new_size == "fullscreen")
      self.props.push(Brunch_to_page(self.props.entity.Id))
  })
}

export function render_Brunch_Description_editable_minimised(self:BrunchContext) : JSX.Element {
  if (!Permissions.can_edit_Brunch(self.props.current_User)) return render_Brunch_Description_minimised(self)
  else
    return !Permissions.can_view_Brunch_Description(self.props.current_User) ? <div /> :
          <div className="model__attribute description">
  <label className="attribute-label attribute-label-description">{i18next.t(`Brunch:Description`, {context: self.props.inline ? "inline" : ""})}</label>
  <div className="model__attribute-content">
    { Components.String(
        self.props.is_editable && Permissions.can_edit_Brunch(self.props.current_User) && Permissions.can_edit_Brunch_Description(self.props.current_User),
        self.props.mode,
        () => self.props.entity.Description,
        v => self.props.set_entity({...self.props.entity, Description:v})) } 
  </div>
</div>
}


export function render_Brunch_Description_editable_maximised(self:BrunchContext) : JSX.Element {
  if (!Permissions.can_edit_Brunch(self.props.current_User)) return render_Brunch_Description_maximised(self)
  else
    return !Permissions.can_view_Brunch_Description(self.props.current_User) ? <div /> :
          <div className="model__attribute description">
  <label className="attribute-label attribute-label-description">{i18next.t(`Brunch:Description`, {context: self.props.inline ? "inline" : ""})}</label>
  <div className="model__attribute-content">
    { Components.String(
        self.props.is_editable && Permissions.can_edit_Brunch(self.props.current_User) && Permissions.can_edit_Brunch_Description(self.props.current_User),
        self.props.mode,
        () => self.props.entity.Description,
        v => self.props.set_entity({...self.props.entity, Description:v})) } 
  </div>
</div>
}


export function render_editable_attributes_minimised_Brunch(self:BrunchContext) {
  let attributes = (<div>
      {render_Brunch_Description_editable_minimised(self)}
    </div>)
  return attributes
}

export function render_editable_attributes_maximised_Brunch(self:BrunchContext) {
    let state = self.state()
    let attributes = (<div>
        {render_Brunch_Description_editable_maximised(self)}
        
        
        
      </div>)
    return attributes
  }

export function render_breadcrumb_Brunch(self:BrunchContext) {
  return <div className="breadcrumb-brunch">Brunch</div>
}

export function render_menu_Brunch(self:BrunchContext) {
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
        {!Permissions.can_view_RecommendationPage(self.props.current_User) ? null :
                  <div className={`menu_entry${self.props.shown_relation == "Homepage_RecommendationPage" ? " active" : ""}`}>
                    <a onClick={() =>
                        {
                            Api.get_Homepages(0, 1).then(e =>
                              e.Items.length > 0 && self.props.set_page(HomepageViews.Homepage_to_page(e.Items[0].Item.Id),
                                () => self.props.set_shown_relation("Homepage_RecommendationPage"))
                            )
                        }
                      }>
                      {i18next.t('Homepage_RecommendationPages')}
                    </a>
                  </div>
                }
        {!Permissions.can_view_Cuisine(self.props.current_User) ? null :
                  <div className={`menu_entry${self.props.shown_relation == "Homepage_Cuisine" ? " active" : ""}`}>
                    <a onClick={() =>
                        {
                            Api.get_Homepages(0, 1).then(e =>
                              e.Items.length > 0 && self.props.set_page(HomepageViews.Homepage_to_page(e.Items[0].Item.Id),
                                () => self.props.set_shown_relation("Homepage_Cuisine"))
                            )
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

export function render_local_menu_Brunch(self:BrunchContext) {
  let state = self.state()
  return <div className="local-menu">
          <div className="local_menu_entries">
            <div className={`local_menu_entry${self.props.shown_relation == "none" ? " local_menu_entry--active" : ""}`}>
              <a onClick={() =>
                  self.props.set_shown_relation("none")
              }>
                {i18next.t('About this Brunch')}
              </a>
            </div>
          
            {!Permissions.can_view_Recipe(self.props.current_User) ? null :
                  <div key={"Meal_Recipe"} className={`local_menu_entry${self.props.shown_relation == "Meal_Recipe" ? " local_menu_entry--active" : ""}`}>
                    <a onClick={() =>
                      load_relation_Brunch_Meal_Recipe(self,
                        false,
                        self.props.current_User, 
                        () => self.props.set_shown_relation("Meal_Recipe"))
                    }>
                      {i18next.t('Meal_Recipes')}
                    </a>
                  </div>
                }  
          </div>
        </div>
}

export function render_controls_Brunch(self:BrunchContext) {
  return <div className="control">
    {self.props.allow_maximisation && self.props.set_size ? <a className={`"brunch button button--toggle ${self.props.size != 'preview' ? 'button--toggle--open' : ''}`}
          onClick={() => {
            set_size_Brunch(self, self.props.size == "preview" ? "large" : "preview")}
          }>
      </a> : null}
    {self.props.allow_fullscreen && self.props.set_size ? <a className="brunch button button--fullscreen"
        onClick={() => set_size_Brunch(self, self.props.size == "fullscreen" ? "large" : "fullscreen")}>
      </a> : null}
    {Permissions.can_delete_Brunch(self.props.current_User) && self.props.size == "fullscreen" ? <a className="button button--delete"
      onClick={() => confirm(i18next.t('Are you sure?')) &&
        Api.delete_Brunch(self.props.entity).then(() => self.props.force_reload(() => self.props.pop()))
      }>
    </a> : null}
    {self.props.size == "fullscreen" && self.props.pages_count > 0 ? <a className="brunch button button--close"
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

export function render_content_Brunch(self:BrunchContext) {
  let actions:Array<()=>void> =
    [
      self.props.allow_maximisation && self.props.set_size && self.props.size == "preview" ?
        () => set_size_Brunch(self, self.props.size == "preview" ? "large" : "preview")
      :
        null,self.props.allow_fullscreen && self.props.set_size && self.props.size == "preview" ?
        () => set_size_Brunch(self, self.props.size == "fullscreen" ? "large" : "fullscreen")
      :
        null,
    ].filter(a => a != null)
  let content =
    Permissions.can_view_Brunch(self.props.current_User) ?
      self.props.size == "preview" ?
        render_preview_Brunch(self)
      : self.props.size == "large" ?
        render_large_Brunch(self)
      : self.props.size == "fullscreen" ?
        render_large_Brunch(self)
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

export function render_Brunch_Description_minimised(self:BrunchContext) : JSX.Element {
      return !Permissions.can_view_Brunch_Description(self.props.current_User) ? null : <div className="model__attribute description">
  <label className="attribute-label attribute-label-description">{i18next.t(`Brunch:Description`, {context: self.props.inline ? "inline" : ""})}</label>
  <div className="model__attribute-content">
    { Components.String(
        self.props.is_editable && Permissions.can_edit_Brunch(self.props.current_User) && Permissions.can_edit_Brunch_Description(self.props.current_User),
        self.props.mode,
        () => self.props.entity.Description,
        v => self.props.set_entity({...self.props.entity, Description:v})) } 
  </div>
</div>
      
}

export function render_Brunch_Description_maximised(self:BrunchContext) : JSX.Element {
        return !Permissions.can_view_Brunch_Description(self.props.current_User) ? null : <div className="model__attribute description">
  <label className="attribute-label attribute-label-description">{i18next.t(`Brunch:Description`, {context: self.props.inline ? "inline" : ""})}</label>
  <div className="model__attribute-content">
    { Components.String(
        self.props.is_editable && Permissions.can_edit_Brunch(self.props.current_User) && Permissions.can_edit_Brunch_Description(self.props.current_User),
        self.props.mode,
        () => self.props.entity.Description,
        v => self.props.set_entity({...self.props.entity, Description:v})) } 
  </div>
</div>
}

export function render_preview_Brunch(self:BrunchContext) {
  let attributes:JSX.Element = null
  if (self.props.mode == "view" || !Permissions.can_edit_Brunch(self.props.current_User))
    attributes = (<div className="model__attributes">
      { render_Brunch_Description_minimised(self) }
    </div>)
  else
    attributes = render_editable_attributes_minimised_Brunch(self)
  return (<div className="block">
      {attributes}
    </div>)
}

export function render_large_Brunch(self:BrunchContext) {
  let state = self.state()
  let attributes:JSX.Element = null
  if (self.props.mode == "view" || !Permissions.can_edit_Brunch(self.props.current_User))
    attributes = (<div className="model__attributes">
      { render_Brunch_Description_maximised(self) }
        
    </div>)
  else
    attributes = render_editable_attributes_maximised_Brunch(self)
  return (<div className="block">
      {self.props.nesting_depth == 0 && self.props.shown_relation != "all" && self.props.shown_relation != "none" ? null : attributes}
      {render_relations_Brunch(self)}
    </div>)
}


export function render_Brunch_Cuisine_Meal(self:BrunchContext, context:"presentation_structure"|"default") {
  if ((context == "default" && self.props.shown_relation != "all" && self.props.shown_relation != "Cuisine_Meal") || !Permissions.can_view_Cuisine(self.props.current_User))
    return null
  let state = self.state()
  return <div>
    
    { List.render_relation("brunch_cuisine_meal",
   "Meal",
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
      Brunch_Cuisine_Meal_page_index(self),
      Brunch_Cuisine_Meal_num_pages(self),
      new_page_index => {
          let state = self.state()
          state.Cuisine != "loading" &&
          self.setState({...self.state(),
            update_count:self.state().update_count+1,
            Cuisine: {
              ...state.Cuisine,
              PageIndex:new_page_index
            }
          }, () =>  load_relation_Brunch_Cuisine_Meal(self, false, self.props.current_User))
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
                  mode:self.props.mode == "edit" && (Permissions.can_edit_Cuisine_Meal(self.props.current_User)
                        || Permissions.can_create_Cuisine_Meal(self.props.current_User)
                        || Permissions.can_delete_Cuisine_Meal(self.props.current_User)) ?
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
                  delete: undefined,
                  unlink: !Permissions.can_delete_Cuisine_Meal(self.props.current_User) ?
                    null
                    :
                    () => confirm(i18next.t('Are you sure?')) && Api.unlink_Cuisine_Cuisine_Meals(i.element, self.props.entity).then(() =>
                      load_relation_Brunch_Cuisine_Meal(self, false, self.props.current_User))
                })
              }
            </div>
          </div>
        },
      () =>
        <div>
          {Permissions.can_create_Cuisine(self.props.current_User) && Permissions.can_create_Cuisine_Meal(self.props.current_User) && Brunch_Cuisine_Meal_can_create(self) ? render_new_Brunch_Cuisine_Meal(self) : null}
          {Permissions.can_create_Cuisine_Meal(self.props.current_User) ? render_add_existing_Brunch_Cuisine_Meal(self) : null}
        </div>)
    }
    
    </div>
}


export function render_Brunch_Meal_Recipe(self:BrunchContext, context:"presentation_structure"|"default") {
  if ((context == "default" && self.props.shown_relation != "all" && self.props.shown_relation != "Meal_Recipe") || !Permissions.can_view_Recipe(self.props.current_User))
    return null
  let state = self.state()
  return <div>
    
    { List.render_relation("brunch_meal_recipe",
   "Meal",
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
      Brunch_Meal_Recipe_page_index(self),
      Brunch_Meal_Recipe_num_pages(self),
      new_page_index => {
          let state = self.state()
          state.Recipe != "loading" &&
          self.setState({...self.state(),
            update_count:self.state().update_count+1,
            Recipe: {
              ...state.Recipe,
              PageIndex:new_page_index
            }
          }, () =>  load_relation_Brunch_Meal_Recipe(self, false, self.props.current_User))
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
                  mode:self.props.mode == "edit" && (Permissions.can_edit_Meal_Recipe(self.props.current_User)
                        || Permissions.can_create_Meal_Recipe(self.props.current_User)
                        || Permissions.can_delete_Meal_Recipe(self.props.current_User)) ?
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
                  unlink: !Permissions.can_delete_Meal_Recipe(self.props.current_User) ?
                    null
                    :
                    () => confirm(i18next.t('Are you sure?')) && Api.unlink_Meal_Meal_Recipes(self.props.entity, i.element).then(() =>
                      load_relation_Brunch_Meal_Recipe(self, false, self.props.current_User))
                })
              }
            </div>
          </div>
        },
      () =>
        <div>
          {Permissions.can_create_Recipe(self.props.current_User) && Permissions.can_create_Meal_Recipe(self.props.current_User) && Brunch_Meal_Recipe_can_create(self) ? render_new_Brunch_Meal_Recipe(self) : null}
          {Permissions.can_create_Meal_Recipe(self.props.current_User) ? render_add_existing_Brunch_Meal_Recipe(self) : null}
        </div>)
    }
    
    </div>
}



export function render_relations_Brunch(self:BrunchContext) {
  return <div className="relations">
      { render_Brunch_Meal_Recipe(self, "default") }
      
    </div>
}

export function render_add_existing_Brunch_Cuisine_Meal(self:BrunchContext) {
    
    let state = self.state()
    return self.props.mode == "edit" ?
      <div className="button__actions">
        {
          state.add_step_Cuisine != "open" ?
            <Buttons.Add disabled={state.Cuisine == "loading" ? true : state.Cuisine.TotalCount >= 1} 
              onClick={() =>
                self.setState({...self.state(), add_step_Cuisine:"open"}) }
                  target_name={"Cuisine"} />
          :
          React.createElement(List.AddToRelation,
            {
              relation_name:"brunch_cuisine_meal",
              source_name:"Meal",
              target_name:"Cuisine",
              target_plural:"Cuisines",
              page_size:25,
              render_target:(i,i_id) =>
                <div key={i_id} className="group__item">
                  <a className="group__button button button--existing"
                    onClick={() =>
                        self.setState({...self.state(), add_step_Cuisine:"saving"}, () =>
                          Api.link_Meal_Cuisine_Meals(self.props.entity, i).then(() =>
                            self.setState({...self.state(), add_step_Cuisine:"closed"}, () =>
                              load_relation_Brunch_Cuisine_Meal(self, false, self.props.current_User))))
                      }>
                      Add existing
                  </a>
                  <div className="group__title" disabled={true}>
                    {
                      CuisineViews.Cuisine({
                        ...self.props,
                        entity:i,
                        nesting_depth:self.props.nesting_depth+1,
                        size:"preview",
                        mode:"view",
                        is_editable:false,
                        nested_entity_names: self.props.nested_entity_names.push("Cuisine"),
                        set_size:undefined,
                        toggle_button:undefined,
                        set_mode:undefined,
                        set_entity:(new_entity:Models.Cuisine, callback?:()=>void) => {},
                        unlink: undefined,
                        delete: undefined
                      })
                    }
                  </div>
                </div>,
              cancel:() => self.setState({...self.state(), add_step_Cuisine:"closed"}),
              get_items:[
                { name: "Asian", get: async(i,s) => Api.get_unlinked_Meal_Cuisine_Meals_Asian(self.props.entity, i, s) }, 
                { name: "Mediterranean", get: async(i,s) => Api.get_unlinked_Meal_Cuisine_Meals_Mediterranean(self.props.entity, i, s) }, 
                { name: "Grill", get: async(i,s) => Api.get_unlinked_Meal_Cuisine_Meals_Grill(self.props.entity, i, s) }
              ]
            })
        }
      </div>
    :
      null
    }
  
export function render_add_existing_Brunch_Meal_Recipe(self:BrunchContext) {
    
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
              relation_name:"brunch_meal_recipe",
              source_name:"Meal",
              target_name:"Recipe",
              target_plural:"Recipes",
              page_size:25,
              render_target:(i,i_id) =>
                <div key={i_id} className="group__item">
                  <a className="group__button button button--existing"
                    onClick={() =>
                        self.setState({...self.state(), add_step_Recipe:"saving"}, () =>
                          Api.link_Meal_Meal_Recipes(self.props.entity, i).then(() =>
                            self.setState({...self.state(), add_step_Recipe:"closed"}, () =>
                              load_relation_Brunch_Meal_Recipe(self, false, self.props.current_User))))
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
                { name: "Recipe", get: async(i,s) => Api.get_unlinked_Meal_Meal_Recipes(self.props.entity, i, s) },
              ]
            })
        }
      </div>
    :
      null
    }
  

export function render_new_Brunch_Cuisine_Meal(self:BrunchContext) {
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
              <button disabled={state.Cuisine == "loading" ? true : state.Cuisine.TotalCount >= 1} 
                      className="new-asian button button--new"
                      onClick={() =>
                          Api.create_linked_Meal_Cuisine_Meals_Asian(self.props.entity).then(e => {
                              e.length > 0 &&
                              Api.update_Asian(
                                ({ ...e[0], Kind:"Asian", Description:"" } as Models.Asian)).then(() =>
                                load_relation_Brunch_Cuisine_Meal(self, true, self.props.current_User, () =>
                                    self.setState({...self.state(), add_step_Cuisine:"closed"})
                                  )
                                )
                          })
                      }>
                  {i18next.t('Create new Asian')}
              </button>
            </div>
            <div className="new-mediterranean">
              <button disabled={state.Cuisine == "loading" ? true : state.Cuisine.TotalCount >= 1} 
                      className="new-mediterranean button button--new"
                      onClick={() =>
                          Api.create_linked_Meal_Cuisine_Meals_Mediterranean(self.props.entity).then(e => {
                              e.length > 0 &&
                              Api.update_Mediterranean(
                                ({ ...e[0], Kind:"Mediterranean", Description:"" } as Models.Mediterranean)).then(() =>
                                load_relation_Brunch_Cuisine_Meal(self, true, self.props.current_User, () =>
                                    self.setState({...self.state(), add_step_Cuisine:"closed"})
                                  )
                                )
                          })
                      }>
                  {i18next.t('Create new Mediterranean')}
              </button>
            </div>
            <div className="new-grill">
              <button disabled={state.Cuisine == "loading" ? true : state.Cuisine.TotalCount >= 1} 
                      className="new-grill button button--new"
                      onClick={() =>
                          Api.create_linked_Meal_Cuisine_Meals_Grill(self.props.entity).then(e => {
                              e.length > 0 &&
                              Api.update_Grill(
                                ({ ...e[0], Kind:"Grill", Description:"" } as Models.Grill)).then(() =>
                                load_relation_Brunch_Cuisine_Meal(self, true, self.props.current_User, () =>
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
  
export function render_new_Brunch_Meal_Recipe(self:BrunchContext) {
    let state = self.state()
    return  self.props.mode == "edit" ?
      <div className="button__actions">
        <div className="new-recipe">
              <button 
                      className="new-recipe button button--new"
                      onClick={() =>
                          Api.create_linked_Meal_Meal_Recipes_Recipe(self.props.entity).then(e => {
                              e.length > 0 &&
                              Api.update_Recipe(
                                ({ ...e[0], Name:"", Ingredients:"", Description:"", Picture:"" } as Models.Recipe)).then(() =>
                                load_relation_Brunch_Meal_Recipe(self, true, self.props.current_User, () =>
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
  

export function render_saving_animations_Brunch(self:BrunchContext) {
  return self.state().dirty_Cuisine.count() > 0 ?
    <div style={{position:"fixed", zIndex:10000, top:0, left:0, width:"20px", height:"20px", backgroundColor:"red"}} className="saving"/> : 
    self.state().dirty_Recipe.count() > 0 ?
    <div style={{position:"fixed", zIndex:10000, top:0, left:0, width:"20px", height:"20px", backgroundColor:"red"}} className="saving"/>
    : <div style={{position:"fixed", zIndex:10000, top:0, left:0, width:"20px", height:"20px", backgroundColor:"cornflowerblue"}} className="saved"/>
}

export type BrunchContext = {state:()=>BrunchState, props:Utils.EntityComponentProps<Models.Brunch>, setState:(new_state:BrunchState, callback?:()=>void) => void}

export type BrunchState = {
    update_count:number
    add_step_Cuisine:"closed"|"open"|"saving"|"adding"|"creating",
      dirty_Cuisine:Immutable.Map<number,Models.Cuisine>,
      Cuisine:Utils.PaginatedItems<{ shown_relation: string } & Utils.EntityAndSize<Models.Cuisine>>|"loading"
  add_step_Recipe:"closed"|"open"|"saving",
      dirty_Recipe:Immutable.Map<number,Models.Recipe>,
      Recipe:Utils.PaginatedItems<{ shown_relation: string } & Utils.EntityAndSize<Models.Recipe>>|"loading"
  }
export class BrunchComponent extends React.Component<Utils.EntityComponentProps<Models.Brunch>, BrunchState> {
  constructor(props:Utils.EntityComponentProps<Models.Brunch>, context:any) {
    super(props, context)
    this.state = { update_count:0,add_step_Cuisine:"closed", dirty_Cuisine:Immutable.Map<number,Models.Cuisine>(), Cuisine:"loading", add_step_Recipe:"closed", dirty_Recipe:Immutable.Map<number,Models.Recipe>(), Recipe:"loading" }
  }

  get_self() {
    return {state:() => this.state, props:this.props, setState:(ns,c)=>this.setState(ns,c)}
  }

  componentWillReceiveProps(new_props:Utils.EntityComponentProps<Models.Brunch>) {
    if (new_props.size == "breadcrumb") return
    let current_logged_in_entity = this.props.current_User || null
    let new_logged_in_entity = new_props.current_User || null
    if (new_props.mode != this.props.mode || (new_props.size != this.props.size && (new_props.size == "large" || new_props.size == "fullscreen")) ||
        new_props.logic_frame != this.props.logic_frame ||
        (current_logged_in_entity && !new_logged_in_entity) ||
        (!current_logged_in_entity && new_logged_in_entity) ||
        (current_logged_in_entity && new_logged_in_entity && current_logged_in_entity.Id != new_logged_in_entity.Id)) {
      load_relations_Brunch(this.get_self(),  new_props.current_User)
    }
  }

  thread:number = null
  componentWillMount() {
    if (this.props.size == "breadcrumb") return
    if (this.props.size != "preview") {
      
      load_relations_Brunch(this.get_self(), this.props.current_User)
    }

    this.thread = setInterval(() => {
      if (this.state.dirty_Cuisine.count() > 0) {
         let first = this.state.dirty_Cuisine.first()
         this.setState({...this.state, dirty_Cuisine: this.state.dirty_Cuisine.remove(first.Id)}, () =>
           Api.update_Cuisine(first)
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
      return Permissions.can_view_Brunch(this.props.current_User) ?
              render_breadcrumb_Brunch(this.get_self())
              : null
    }

    return <div id={`Brunch_${this.props.entity.Id.toString()}_${this.state.update_count}`} className={`model brunch`}>
      { render_saving_animations_Brunch(this.get_self()) }
      { this.props.nesting_depth == 0 ? render_menu_Brunch(this.get_self()) : null }
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
        { this.props.nesting_depth == 0 ? render_local_menu_Brunch(this.get_self()) : null }
        { render_controls_Brunch(this.get_self()) }
        { render_content_Brunch(this.get_self()) }
      </div>
    </div>
  }
}

export let Brunch = (props:Utils.EntityComponentProps<Models.Brunch>) : JSX.Element =>
  <BrunchComponent {...props} />

export let Brunch_to_page = (id:number) => {
  let can_edit = Utils.any_of([Permissions.can_edit_Brunch, Permissions.can_edit_Cuisine_Meal, Permissions.can_edit_Meal_Recipe, Permissions.can_edit_Cuisine, Permissions.can_edit_Recipe])
  return Utils.scene_to_page<Models.Brunch>(can_edit, Brunch, Api.get_Brunch(id), Api.update_Brunch, "Brunch", "Brunch", `/Brunches/${id}`)
}

export let Brunch_to = (id:number, target_element_id:string, current_User:Models.User) => {
  Utils.render_page_manager(target_element_id,
    Brunch_to_page(id),
    current_User
  )
}
