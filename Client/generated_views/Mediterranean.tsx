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
import * as MealViews from './Meal'
import * as CustomViews from '../custom_views'

export function Mediterranean_Cuisine_Meal_can_create(self:MediterraneanContext) {
  let state = self.state()
  return state.Meal == "loading" ? false : state.Meal.CanCreate
}
export function Mediterranean_Cuisine_Meal_can_delete(self:MediterraneanContext) {
  let state = self.state()
  return state.Meal == "loading" ? false : state.Meal.CanDelete
}
export function Mediterranean_Cuisine_Meal_page_index(self:MediterraneanContext) {
  let state = self.state()
  return state.Meal == "loading" ? 0 : state.Meal.PageIndex
}
export function Mediterranean_Cuisine_Meal_page_size(self:MediterraneanContext) {
  let state = self.state()
  return state.Meal == "loading" ? 25 : state.Meal.PageSize
}
export function Mediterranean_Cuisine_Meal_search_query(self:MediterraneanContext) {
  let state = self.state()
  return state.Meal == "loading" ? null : state.Meal.SearchQuery
}
export function Mediterranean_Cuisine_Meal_num_pages(self:MediterraneanContext) {
  let state = self.state()
  return state.Meal == "loading" ? 1 : state.Meal.NumPages
}

export function load_relation_Mediterranean_Cuisine_Meal(self:MediterraneanContext, force_first_page:boolean, current_User:Models.User, callback?:()=>void) {
  let state = self.state()
  let prelude = force_first_page && state.Meal != "loading" ?
    (c:() => void) => state.Meal != "loading" && self.setState({
      ...state,
      Meal: {...state.Meal, PageIndex:0 }
    }, c)
    :
    (c:() => void) => c()
  Permissions.can_view_Meal(current_User) ?
    prelude(() =>
      Api.get_Cuisine_Cuisine_Meals(self.props.entity, Mediterranean_Cuisine_Meal_page_index(self), Mediterranean_Cuisine_Meal_page_size(self), Mediterranean_Cuisine_Meal_search_query(self)).then(Meals =>
        self.setState({...self.state(), update_count:self.state().update_count+1,
            Meal:Utils.raw_page_to_paginated_items<Models.Meal, Utils.EntityAndSize<Models.Meal> & { shown_relation:string }>((i, i_just_created) => {
              let state = self.state()
              return {
                element:i,
                size: state.Meal != "loading" ?
                  (state.Meal.Items.has(i.Id) ?
                    state.Meal.Items.get(i.Id).size
                  :
                    "preview" /* i_just_created ? "large" : "preview" */)
                  :
                    "preview" /* i_just_created ? "large" : "preview" */,
                shown_relation:"all"}}, Meals)
            }, callback)))
    :
      prelude(() => callback && callback())
}

export function load_relations_Mediterranean(self, current_User:Models.User, callback?:()=>void) {
  load_relation_Mediterranean_Cuisine_Meal(self, false, self.props.current_User, 
        () => callback && callback())
}

export function set_size_Mediterranean(self:MediterraneanContext, new_size:Utils.EntitySize) {
  self.props.set_size(new_size, () => {
    if (new_size == "fullscreen")
      self.props.push(Mediterranean_to_page(self.props.entity.Id))
  })
}

export function render_Mediterranean_Description_editable_minimised(self:MediterraneanContext) : JSX.Element {
  if (!Permissions.can_edit_Mediterranean(self.props.current_User)) return render_Mediterranean_Description_minimised(self)
  else
    return !Permissions.can_view_Mediterranean_Description(self.props.current_User) ? <div /> :
          <div className="model__attribute description">
  <label className="attribute-label attribute-label-description">{i18next.t(`Mediterranean:Description`, {context: self.props.inline ? "inline" : ""})}</label>
  <div className="model__attribute-content">
    { Components.String(
        self.props.is_editable && Permissions.can_edit_Mediterranean(self.props.current_User) && Permissions.can_edit_Mediterranean_Description(self.props.current_User),
        self.props.mode,
        () => self.props.entity.Description,
        v => self.props.set_entity({...self.props.entity, Description:v})) } 
  </div>
</div>
}


export function render_Mediterranean_Description_editable_maximised(self:MediterraneanContext) : JSX.Element {
  if (!Permissions.can_edit_Mediterranean(self.props.current_User)) return render_Mediterranean_Description_maximised(self)
  else
    return !Permissions.can_view_Mediterranean_Description(self.props.current_User) ? <div /> :
          <div className="model__attribute description">
  <label className="attribute-label attribute-label-description">{i18next.t(`Mediterranean:Description`, {context: self.props.inline ? "inline" : ""})}</label>
  <div className="model__attribute-content">
    { Components.String(
        self.props.is_editable && Permissions.can_edit_Mediterranean(self.props.current_User) && Permissions.can_edit_Mediterranean_Description(self.props.current_User),
        self.props.mode,
        () => self.props.entity.Description,
        v => self.props.set_entity({...self.props.entity, Description:v})) } 
  </div>
</div>
}


export function render_editable_attributes_minimised_Mediterranean(self:MediterraneanContext) {
  let attributes = (<div>
      {render_Mediterranean_Description_editable_minimised(self)}
    </div>)
  return attributes
}

export function render_editable_attributes_maximised_Mediterranean(self:MediterraneanContext) {
    let state = self.state()
    let attributes = (<div>
        {render_Mediterranean_Description_editable_maximised(self)}
        
        
        
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
          {!Permissions.can_view_Favourite(self.props.current_User) ? null :
              <div className={`menu_entry page_link`}>
                <a onClick={() => 
                  Api.get_Favourites(0, 1).then(e =>
                    e.Items.length > 0 && self.props.set_page(FavouriteViews.Favourite_to_page(e.Items[0].Item.Id))
                  )
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
          
            {!Permissions.can_view_Meal(self.props.current_User) ? null :
                  <div key={"Cuisine_Meal"} className={`local_menu_entry${self.props.shown_relation == "Cuisine_Meal" ? " local_menu_entry--active" : ""}`}>
                    <a onClick={() =>
                      load_relation_Mediterranean_Cuisine_Meal(self,
                        false,
                        self.props.current_User, 
                        () => self.props.set_shown_relation("Cuisine_Meal"))
                    }>
                      {i18next.t('Cuisine_Meals')}
                    </a>
                  </div>
                }  
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
    {Permissions.can_delete_Mediterranean(self.props.current_User) && self.props.size == "fullscreen" ? <a className="button button--delete"
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
  let actions:Array<()=>void> =
    [
      self.props.allow_maximisation && self.props.set_size && self.props.size == "preview" ?
        () => set_size_Mediterranean(self, self.props.size == "preview" ? "large" : "preview")
      :
        null,self.props.allow_fullscreen && self.props.set_size && self.props.size == "preview" ?
        () => set_size_Mediterranean(self, self.props.size == "fullscreen" ? "large" : "fullscreen")
      :
        null,
    ].filter(a => a != null)
  let content =
    Permissions.can_view_Mediterranean(self.props.current_User) ?
      self.props.size == "preview" ?
        render_preview_Mediterranean(self)
      : self.props.size == "large" ?
        render_large_Mediterranean(self)
      : self.props.size == "fullscreen" ?
        render_large_Mediterranean(self)
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

export function render_Mediterranean_Description_minimised(self:MediterraneanContext) : JSX.Element {
      return !Permissions.can_view_Mediterranean_Description(self.props.current_User) ? null : <div className="model__attribute description">
  <label className="attribute-label attribute-label-description">{i18next.t(`Mediterranean:Description`, {context: self.props.inline ? "inline" : ""})}</label>
  <div className="model__attribute-content">
    { Components.String(
        self.props.is_editable && Permissions.can_edit_Mediterranean(self.props.current_User) && Permissions.can_edit_Mediterranean_Description(self.props.current_User),
        self.props.mode,
        () => self.props.entity.Description,
        v => self.props.set_entity({...self.props.entity, Description:v})) } 
  </div>
</div>
      
}

export function render_Mediterranean_Description_maximised(self:MediterraneanContext) : JSX.Element {
        return !Permissions.can_view_Mediterranean_Description(self.props.current_User) ? null : <div className="model__attribute description">
  <label className="attribute-label attribute-label-description">{i18next.t(`Mediterranean:Description`, {context: self.props.inline ? "inline" : ""})}</label>
  <div className="model__attribute-content">
    { Components.String(
        self.props.is_editable && Permissions.can_edit_Mediterranean(self.props.current_User) && Permissions.can_edit_Mediterranean_Description(self.props.current_User),
        self.props.mode,
        () => self.props.entity.Description,
        v => self.props.set_entity({...self.props.entity, Description:v})) } 
  </div>
</div>
}

export function render_preview_Mediterranean(self:MediterraneanContext) {
  let attributes:JSX.Element = null
  if (self.props.mode == "view" || !Permissions.can_edit_Mediterranean(self.props.current_User))
    attributes = (<div className="model__attributes">
      { render_Mediterranean_Description_minimised(self) }
    </div>)
  else
    attributes = render_editable_attributes_minimised_Mediterranean(self)
  return (<div className="block">
      {attributes}
    </div>)
}

export function render_large_Mediterranean(self:MediterraneanContext) {
  let state = self.state()
  let attributes:JSX.Element = null
  if (self.props.mode == "view" || !Permissions.can_edit_Mediterranean(self.props.current_User))
    attributes = (<div className="model__attributes">
      { render_Mediterranean_Description_maximised(self) }
        
    </div>)
  else
    attributes = render_editable_attributes_maximised_Mediterranean(self)
  return (<div className="block">
      {self.props.nesting_depth == 0 && self.props.shown_relation != "all" && self.props.shown_relation != "none" ? null : attributes}
      {render_relations_Mediterranean(self)}
    </div>)
}


export function render_Mediterranean_Cuisine_Meal(self:MediterraneanContext, context:"presentation_structure"|"default") {
  if ((context == "default" && self.props.shown_relation != "all" && self.props.shown_relation != "Cuisine_Meal") || !Permissions.can_view_Meal(self.props.current_User))
    return null
  let state = self.state()
  return <div>
    
    { List.render_relation("mediterranean_cuisine_meal",
   "Cuisine",
   "Meal",
   "Meals",
   self.props.nesting_depth > 0,
   false,
   false,
   false)
  (
      state.Meal != "loading" ?
        state.Meal.IdsInServerOrder.map(id => state.Meal != "loading" && state.Meal.Items.get(id)):
        state.Meal,
      Mediterranean_Cuisine_Meal_page_index(self),
      Mediterranean_Cuisine_Meal_num_pages(self),
      new_page_index => {
          let state = self.state()
          state.Meal != "loading" &&
          self.setState({...self.state(),
            update_count:self.state().update_count+1,
            Meal: {
              ...state.Meal,
              PageIndex:new_page_index
            }
          }, () =>  load_relation_Mediterranean_Cuisine_Meal(self, false, self.props.current_User))
        },
      (i,_) => {
          let i_id = i.element.Id
          let state = self.state()
          return <div key={i_id}
            className={`model-nested__item ${i.size != "preview" ? "model-nested__item--open" : ""}
                        ${state.Meal != "loading" && state.Meal.JustCreated.has(i_id) && state.Meal.JustCreated.get(i_id) ? "newly-created" : ""}` }
          
            >
            <div key={i_id}>
              {
                MealViews.Meal({
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
                  is_editable:state.Meal != "loading" && state.Meal.Editable.get(i_id),
                  shown_relation:i.shown_relation,
                  set_shown_relation:(new_shown_relation:string, callback) => {
                    let state = self.state()
                    state.Meal != "loading" &&
                    self.setState({...self.state(),
                      Meal:
                        {
                          ...state.Meal,
                          Items:state.Meal.Items.set(i_id,{...state.Meal.Items.get(i_id), shown_relation:new_shown_relation})
                        }
                    }, callback)
                  },
                  nested_entity_names: self.props.nested_entity_names.push("Meal"),
                  
                  set_size:(new_size:Utils.EntitySize, callback) => {
                    let new_shown_relation = new_size == "large" ? "all" : i.shown_relation
                    let state = self.state()
                    state.Meal != "loading" &&
                    self.setState({...self.state(),
                      Meal:
                        {
                          ...state.Meal,
                          Items:state.Meal.Items.set(i_id,
                            {...state.Meal.Items.get(i_id),
                              size:new_size, shown_relation:new_shown_relation})
                        }
                    }, callback)
                  },
                    
                  toggle_button:undefined,
                  set_mode:undefined,
                  set_entity:(new_entity:Models.Meal, callback?:()=>void, force_update_count_increment?:boolean) => {
                    let state = self.state()
                    state.Meal != "loading" &&
                    self.setState({...self.state(),
                      dirty_Meal:state.dirty_Meal.set(i_id, new_entity),
                      update_count:force_update_count_increment ? self.state().update_count+1 : state.update_count,
                      Meal:
                        {
                          ...state.Meal,
                          Items:state.Meal.Items.set(i_id,{...state.Meal.Items.get(i_id), element:new_entity})
                        }
                    }, callback)
                  },
                  delete: undefined,
                  unlink: !Permissions.can_delete_Cuisine_Meal(self.props.current_User) ?
                    null
                    :
                    () => confirm(i18next.t('Are you sure?')) && Api.unlink_Cuisine_Cuisine_Meals(self.props.entity, i.element).then(() =>
                      load_relation_Mediterranean_Cuisine_Meal(self, false, self.props.current_User))
                })
              }
            </div>
          </div>
        },
      () =>
        <div>
          {Permissions.can_create_Meal(self.props.current_User) && Permissions.can_create_Cuisine_Meal(self.props.current_User) && Mediterranean_Cuisine_Meal_can_create(self) ? render_new_Mediterranean_Cuisine_Meal(self) : null}
          {Permissions.can_create_Cuisine_Meal(self.props.current_User) ? render_add_existing_Mediterranean_Cuisine_Meal(self) : null}
        </div>)
    }
    
    </div>
}



export function render_relations_Mediterranean(self:MediterraneanContext) {
  return <div className="relations">
      { render_Mediterranean_Cuisine_Meal(self, "default") }
      
    </div>
}

export function render_add_existing_Mediterranean_Cuisine_Meal(self:MediterraneanContext) {
    
    let state = self.state()
    return self.props.mode == "edit" ?
      <div className="button__actions">
        {
          state.add_step_Meal != "open" ?
            <Buttons.Add 
              onClick={() =>
                self.setState({...self.state(), add_step_Meal:"open"}) }
                  target_name={"Meal"} />
          :
          React.createElement(List.AddToRelation,
            {
              relation_name:"mediterranean_cuisine_meal",
              source_name:"Cuisine",
              target_name:"Meal",
              target_plural:"Meals",
              page_size:25,
              render_target:(i,i_id) =>
                <div key={i_id} className="group__item">
                  <a className="group__button button button--existing"
                    onClick={() =>
                        self.setState({...self.state(), add_step_Meal:"saving"}, () =>
                          Api.link_Cuisine_Cuisine_Meals(self.props.entity, i).then(() =>
                            self.setState({...self.state(), add_step_Meal:"closed"}, () =>
                              load_relation_Mediterranean_Cuisine_Meal(self, false, self.props.current_User))))
                      }>
                      Add existing
                  </a>
                  <div className="group__title" disabled={true}>
                    {
                      MealViews.Meal({
                        ...self.props,
                        entity:i,
                        nesting_depth:self.props.nesting_depth+1,
                        size:"preview",
                        mode:"view",
                        is_editable:false,
                        nested_entity_names: self.props.nested_entity_names.push("Meal"),
                        set_size:undefined,
                        toggle_button:undefined,
                        set_mode:undefined,
                        set_entity:(new_entity:Models.Meal, callback?:()=>void) => {},
                        unlink: undefined,
                        delete: undefined
                      })
                    }
                  </div>
                </div>,
              cancel:() => self.setState({...self.state(), add_step_Meal:"closed"}),
              get_items:[
                { name: "Lunch", get: async(i,s) => Api.get_unlinked_Cuisine_Cuisine_Meals_Lunch(self.props.entity, i, s) }, 
                { name: "Brunch", get: async(i,s) => Api.get_unlinked_Cuisine_Cuisine_Meals_Brunch(self.props.entity, i, s) }, 
                { name: "Dinner", get: async(i,s) => Api.get_unlinked_Cuisine_Cuisine_Meals_Dinner(self.props.entity, i, s) }, 
                { name: "Breakfast", get: async(i,s) => Api.get_unlinked_Cuisine_Cuisine_Meals_Breakfast(self.props.entity, i, s) }
              ]
            })
        }
      </div>
    :
      null
    }
  

export function render_new_Mediterranean_Cuisine_Meal(self:MediterraneanContext) {
    let state = self.state()
    return  self.props.mode == "edit" ?
      <div className="button__actions">
        <Buttons.Create target_name={"Meal"} onClick={() => self.setState({...self.state(), add_step_Meal:"creating"})}  />
            {
            state.add_step_Meal != "creating" ?
            null
            :
            <div className="overlay__item overlay__item--new">
              <div className="new-lunch">
              <button 
                      className="new-lunch button button--new"
                      onClick={() =>
                          Api.create_linked_Cuisine_Cuisine_Meals_Lunch(self.props.entity).then(e => {
                              e.length > 0 &&
                              Api.update_Lunch(
                                ({ ...e[0], Kind:"Lunch", Description:"" } as Models.Lunch)).then(() =>
                                load_relation_Mediterranean_Cuisine_Meal(self, true, self.props.current_User, () =>
                                    self.setState({...self.state(), add_step_Meal:"closed"})
                                  )
                                )
                          })
                      }>
                  {i18next.t('Create new Lunch')}
              </button>
            </div>
            <div className="new-brunch">
              <button 
                      className="new-brunch button button--new"
                      onClick={() =>
                          Api.create_linked_Cuisine_Cuisine_Meals_Brunch(self.props.entity).then(e => {
                              e.length > 0 &&
                              Api.update_Brunch(
                                ({ ...e[0], Kind:"Brunch", Description:"" } as Models.Brunch)).then(() =>
                                load_relation_Mediterranean_Cuisine_Meal(self, true, self.props.current_User, () =>
                                    self.setState({...self.state(), add_step_Meal:"closed"})
                                  )
                                )
                          })
                      }>
                  {i18next.t('Create new Brunch')}
              </button>
            </div>
            <div className="new-dinner">
              <button 
                      className="new-dinner button button--new"
                      onClick={() =>
                          Api.create_linked_Cuisine_Cuisine_Meals_Dinner(self.props.entity).then(e => {
                              e.length > 0 &&
                              Api.update_Dinner(
                                ({ ...e[0], Kind:"Dinner", Description:"" } as Models.Dinner)).then(() =>
                                load_relation_Mediterranean_Cuisine_Meal(self, true, self.props.current_User, () =>
                                    self.setState({...self.state(), add_step_Meal:"closed"})
                                  )
                                )
                          })
                      }>
                  {i18next.t('Create new Dinner')}
              </button>
            </div>
            <div className="new-breakfast">
              <button 
                      className="new-breakfast button button--new"
                      onClick={() =>
                          Api.create_linked_Cuisine_Cuisine_Meals_Breakfast(self.props.entity).then(e => {
                              e.length > 0 &&
                              Api.update_Breakfast(
                                ({ ...e[0], Kind:"Breakfast", Description:"" } as Models.Breakfast)).then(() =>
                                load_relation_Mediterranean_Cuisine_Meal(self, true, self.props.current_User, () =>
                                    self.setState({...self.state(), add_step_Meal:"closed"})
                                  )
                                )
                          })
                      }>
                  {i18next.t('Create new Breakfast')}
              </button>
            </div>
              <Buttons.Cancel onClick={() => self.setState({...self.state(), add_step_Meal:"closed"})} />
            </div>
            }
        </div>
      :
      null
    }
  

export function render_saving_animations_Mediterranean(self:MediterraneanContext) {
  return self.state().dirty_Meal.count() > 0 ?
    <div style={{position:"fixed", zIndex:10000, top:0, left:0, width:"20px", height:"20px", backgroundColor:"red"}} className="saving"/>
    : <div style={{position:"fixed", zIndex:10000, top:0, left:0, width:"20px", height:"20px", backgroundColor:"cornflowerblue"}} className="saved"/>
}

export type MediterraneanContext = {state:()=>MediterraneanState, props:Utils.EntityComponentProps<Models.Mediterranean>, setState:(new_state:MediterraneanState, callback?:()=>void) => void}

export type MediterraneanState = {
    update_count:number
    add_step_Meal:"closed"|"open"|"saving"|"adding"|"creating",
      dirty_Meal:Immutable.Map<number,Models.Meal>,
      Meal:Utils.PaginatedItems<{ shown_relation: string } & Utils.EntityAndSize<Models.Meal>>|"loading"
  }
export class MediterraneanComponent extends React.Component<Utils.EntityComponentProps<Models.Mediterranean>, MediterraneanState> {
  constructor(props:Utils.EntityComponentProps<Models.Mediterranean>, context:any) {
    super(props, context)
    this.state = { update_count:0,add_step_Meal:"closed", dirty_Meal:Immutable.Map<number,Models.Meal>(), Meal:"loading" }
  }

  get_self() {
    return {state:() => this.state, props:this.props, setState:(ns,c)=>this.setState(ns,c)}
  }

  componentWillReceiveProps(new_props:Utils.EntityComponentProps<Models.Mediterranean>) {
    if (new_props.size == "breadcrumb") return
    let current_logged_in_entity = this.props.current_User || null
    let new_logged_in_entity = new_props.current_User || null
    if (new_props.mode != this.props.mode || (new_props.size != this.props.size && (new_props.size == "large" || new_props.size == "fullscreen")) ||
        new_props.logic_frame != this.props.logic_frame ||
        (current_logged_in_entity && !new_logged_in_entity) ||
        (!current_logged_in_entity && new_logged_in_entity) ||
        (current_logged_in_entity && new_logged_in_entity && current_logged_in_entity.Id != new_logged_in_entity.Id)) {
      load_relations_Mediterranean(this.get_self(),  new_props.current_User)
    }
  }

  thread:number = null
  componentWillMount() {
    if (this.props.size == "breadcrumb") return
    if (this.props.size != "preview") {
      
      load_relations_Mediterranean(this.get_self(), this.props.current_User)
    }

    this.thread = setInterval(() => {
      if (this.state.dirty_Meal.count() > 0) {
         let first = this.state.dirty_Meal.first()
         this.setState({...this.state, dirty_Meal: this.state.dirty_Meal.remove(first.Id)}, () =>
           Api.update_Meal(first)
         )
       }

    }, 500)
  }

  componentWillUnmount() {
    clearInterval(this.thread)
  }

  render() {
    if (this.props.size == "breadcrumb") {
      return Permissions.can_view_Mediterranean(this.props.current_User) ?
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
  let can_edit = Utils.any_of([Permissions.can_edit_Mediterranean, Permissions.can_edit_Cuisine_Meal, Permissions.can_edit_Meal])
  return Utils.scene_to_page<Models.Mediterranean>(can_edit, Mediterranean, Api.get_Mediterranean(id), Api.update_Mediterranean, "Mediterranean", "Mediterranean", `/Mediterraneans/${id}`)
}

export let Mediterranean_to = (id:number, target_element_id:string, current_User:Models.User) => {
  Utils.render_page_manager(target_element_id,
    Mediterranean_to_page(id),
    current_User
  )
}
