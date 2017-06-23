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
import * as CustomViews from '../custom_views'

export function Fifteen_PreparationTime_Recipe_can_create(self:FifteenContext) {
  let state = self.state()
  return state.Recipe == "loading" ? false : state.Recipe.CanCreate
}
export function Fifteen_PreparationTime_Recipe_can_delete(self:FifteenContext) {
  let state = self.state()
  return state.Recipe == "loading" ? false : state.Recipe.CanDelete
}
export function Fifteen_PreparationTime_Recipe_page_index(self:FifteenContext) {
  let state = self.state()
  return state.Recipe == "loading" ? 0 : state.Recipe.PageIndex
}
export function Fifteen_PreparationTime_Recipe_page_size(self:FifteenContext) {
  let state = self.state()
  return state.Recipe == "loading" ? 25 : state.Recipe.PageSize
}
export function Fifteen_PreparationTime_Recipe_search_query(self:FifteenContext) {
  let state = self.state()
  return state.Recipe == "loading" ? null : state.Recipe.SearchQuery
}
export function Fifteen_PreparationTime_Recipe_num_pages(self:FifteenContext) {
  let state = self.state()
  return state.Recipe == "loading" ? 1 : state.Recipe.NumPages
}

export function load_relation_Fifteen_PreparationTime_Recipe(self:FifteenContext, force_first_page:boolean, current_User:Models.User, callback?:()=>void) {
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
      Api.get_PreparationTime_PreparationTime_Recipes(self.props.entity, Fifteen_PreparationTime_Recipe_page_index(self), Fifteen_PreparationTime_Recipe_page_size(self), Fifteen_PreparationTime_Recipe_search_query(self)).then(Recipes =>
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

export function load_relations_Fifteen(self, current_User:Models.User, callback?:()=>void) {
  load_relation_Fifteen_PreparationTime_Recipe(self, false, self.props.current_User, 
        () => callback && callback())
}

export function set_size_Fifteen(self:FifteenContext, new_size:Utils.EntitySize) {
  self.props.set_size(new_size, () => {
    if (new_size == "fullscreen")
      self.props.push(Fifteen_to_page(self.props.entity.Id))
  })
}

export function render_Fifteen_Description_editable_minimised(self:FifteenContext) : JSX.Element {
  if (!Permissions.can_edit_Fifteen(self.props.current_User)) return render_Fifteen_Description_minimised(self)
  else
    return !Permissions.can_view_Fifteen_Description(self.props.current_User) ? <div /> :
          <div className="model__attribute description">
  <label className="attribute-label attribute-label-description">{i18next.t(`Fifteen:Description`, {context: self.props.inline ? "inline" : ""})}</label>
  <div className="model__attribute-content">
    { Components.String(
        self.props.is_editable && Permissions.can_edit_Fifteen(self.props.current_User) && Permissions.can_edit_Fifteen_Description(self.props.current_User),
        self.props.mode,
        () => self.props.entity.Description,
        v => self.props.set_entity({...self.props.entity, Description:v})) } 
  </div>
</div>
}


export function render_Fifteen_Description_editable_maximised(self:FifteenContext) : JSX.Element {
  if (!Permissions.can_edit_Fifteen(self.props.current_User)) return render_Fifteen_Description_maximised(self)
  else
    return !Permissions.can_view_Fifteen_Description(self.props.current_User) ? <div /> :
          <div className="model__attribute description">
  <label className="attribute-label attribute-label-description">{i18next.t(`Fifteen:Description`, {context: self.props.inline ? "inline" : ""})}</label>
  <div className="model__attribute-content">
    { Components.String(
        self.props.is_editable && Permissions.can_edit_Fifteen(self.props.current_User) && Permissions.can_edit_Fifteen_Description(self.props.current_User),
        self.props.mode,
        () => self.props.entity.Description,
        v => self.props.set_entity({...self.props.entity, Description:v})) } 
  </div>
</div>
}


export function render_editable_attributes_minimised_Fifteen(self:FifteenContext) {
  let attributes = (<div>
      {render_Fifteen_Description_editable_minimised(self)}
    </div>)
  return attributes
}

export function render_editable_attributes_maximised_Fifteen(self:FifteenContext) {
    let state = self.state()
    let attributes = (<div>
        {render_Fifteen_Description_editable_maximised(self)}
        
        
        
      </div>)
    return attributes
  }

export function render_breadcrumb_Fifteen(self:FifteenContext) {
  return <div className="breadcrumb-fifteen">Fifteen</div>
}

export function render_menu_Fifteen(self:FifteenContext) {
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

export function render_local_menu_Fifteen(self:FifteenContext) {
  let state = self.state()
  return <div className="local-menu">
          <div className="local_menu_entries">
            <div className={`local_menu_entry${self.props.shown_relation == "none" ? " local_menu_entry--active" : ""}`}>
              <a onClick={() =>
                  self.props.set_shown_relation("none")
              }>
                {i18next.t('About this Fifteen')}
              </a>
            </div>
          
            {!Permissions.can_view_Recipe(self.props.current_User) ? null :
                  <div key={"PreparationTime_Recipe"} className={`local_menu_entry${self.props.shown_relation == "PreparationTime_Recipe" ? " local_menu_entry--active" : ""}`}>
                    <a onClick={() =>
                      load_relation_Fifteen_PreparationTime_Recipe(self,
                        false,
                        self.props.current_User, 
                        () => self.props.set_shown_relation("PreparationTime_Recipe"))
                    }>
                      {i18next.t('PreparationTime_Recipes')}
                    </a>
                  </div>
                }  
          </div>
        </div>
}

export function render_controls_Fifteen(self:FifteenContext) {
  return <div className="control">
    {self.props.allow_maximisation && self.props.set_size ? <a className={`"fifteen button button--toggle ${self.props.size != 'preview' ? 'button--toggle--open' : ''}`}
          onClick={() => {
            set_size_Fifteen(self, self.props.size == "preview" ? "large" : "preview")}
          }>
      </a> : null}
    {self.props.allow_fullscreen && self.props.set_size ? <a className="fifteen button button--fullscreen"
        onClick={() => set_size_Fifteen(self, self.props.size == "fullscreen" ? "large" : "fullscreen")}>
      </a> : null}
    {Permissions.can_delete_Fifteen(self.props.current_User) && self.props.size == "fullscreen" ? <a className="button button--delete"
      onClick={() => confirm(i18next.t('Are you sure?')) &&
        Api.delete_Fifteen(self.props.entity).then(() => self.props.force_reload(() => self.props.pop()))
      }>
    </a> : null}
    {self.props.size == "fullscreen" && self.props.pages_count > 0 ? <a className="fifteen button button--close"
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

export function render_content_Fifteen(self:FifteenContext) {
  let actions:Array<()=>void> =
    [
      self.props.allow_maximisation && self.props.set_size && self.props.size == "preview" ?
        () => set_size_Fifteen(self, self.props.size == "preview" ? "large" : "preview")
      :
        null,self.props.allow_fullscreen && self.props.set_size && self.props.size == "preview" ?
        () => set_size_Fifteen(self, self.props.size == "fullscreen" ? "large" : "fullscreen")
      :
        null,
    ].filter(a => a != null)
  let content =
    Permissions.can_view_Fifteen(self.props.current_User) ?
      self.props.size == "preview" ?
        render_preview_Fifteen(self)
      : self.props.size == "large" ?
        render_large_Fifteen(self)
      : self.props.size == "fullscreen" ?
        render_large_Fifteen(self)
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

export function render_Fifteen_Description_minimised(self:FifteenContext) : JSX.Element {
      return !Permissions.can_view_Fifteen_Description(self.props.current_User) ? null : <div className="model__attribute description">
  <label className="attribute-label attribute-label-description">{i18next.t(`Fifteen:Description`, {context: self.props.inline ? "inline" : ""})}</label>
  <div className="model__attribute-content">
    { Components.String(
        self.props.is_editable && Permissions.can_edit_Fifteen(self.props.current_User) && Permissions.can_edit_Fifteen_Description(self.props.current_User),
        self.props.mode,
        () => self.props.entity.Description,
        v => self.props.set_entity({...self.props.entity, Description:v})) } 
  </div>
</div>
      
}

export function render_Fifteen_Description_maximised(self:FifteenContext) : JSX.Element {
        return !Permissions.can_view_Fifteen_Description(self.props.current_User) ? null : <div className="model__attribute description">
  <label className="attribute-label attribute-label-description">{i18next.t(`Fifteen:Description`, {context: self.props.inline ? "inline" : ""})}</label>
  <div className="model__attribute-content">
    { Components.String(
        self.props.is_editable && Permissions.can_edit_Fifteen(self.props.current_User) && Permissions.can_edit_Fifteen_Description(self.props.current_User),
        self.props.mode,
        () => self.props.entity.Description,
        v => self.props.set_entity({...self.props.entity, Description:v})) } 
  </div>
</div>
}

export function render_preview_Fifteen(self:FifteenContext) {
  let attributes:JSX.Element = null
  if (self.props.mode == "view" || !Permissions.can_edit_Fifteen(self.props.current_User))
    attributes = (<div className="model__attributes">
      { render_Fifteen_Description_minimised(self) }
    </div>)
  else
    attributes = render_editable_attributes_minimised_Fifteen(self)
  return (<div className="block">
      {attributes}
    </div>)
}

export function render_large_Fifteen(self:FifteenContext) {
  let state = self.state()
  let attributes:JSX.Element = null
  if (self.props.mode == "view" || !Permissions.can_edit_Fifteen(self.props.current_User))
    attributes = (<div className="model__attributes">
      { render_Fifteen_Description_maximised(self) }
        
    </div>)
  else
    attributes = render_editable_attributes_maximised_Fifteen(self)
  return (<div className="block">
      {self.props.nesting_depth == 0 && self.props.shown_relation != "all" && self.props.shown_relation != "none" ? null : attributes}
      {render_relations_Fifteen(self)}
    </div>)
}


export function render_Fifteen_PreparationTime_Recipe(self:FifteenContext, context:"presentation_structure"|"default") {
  if ((context == "default" && self.props.shown_relation != "all" && self.props.shown_relation != "PreparationTime_Recipe") || !Permissions.can_view_Recipe(self.props.current_User))
    return null
  let state = self.state()
  return <div>
    
    { List.render_relation("fifteen_preparationtime_recipe",
   "PreparationTime",
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
      Fifteen_PreparationTime_Recipe_page_index(self),
      Fifteen_PreparationTime_Recipe_num_pages(self),
      new_page_index => {
          let state = self.state()
          state.Recipe != "loading" &&
          self.setState({...self.state(),
            update_count:self.state().update_count+1,
            Recipe: {
              ...state.Recipe,
              PageIndex:new_page_index
            }
          }, () =>  load_relation_Fifteen_PreparationTime_Recipe(self, false, self.props.current_User))
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
                  mode:self.props.mode == "edit" && (Permissions.can_edit_PreparationTime_Recipe(self.props.current_User)
                        || Permissions.can_create_PreparationTime_Recipe(self.props.current_User)
                        || Permissions.can_delete_PreparationTime_Recipe(self.props.current_User)) ?
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
                  unlink: !Permissions.can_delete_PreparationTime_Recipe(self.props.current_User) ?
                    null
                    :
                    () => confirm(i18next.t('Are you sure?')) && Api.unlink_PreparationTime_PreparationTime_Recipes(self.props.entity, i.element).then(() =>
                      load_relation_Fifteen_PreparationTime_Recipe(self, false, self.props.current_User))
                })
              }
            </div>
          </div>
        },
      () =>
        <div>
          {Permissions.can_create_Recipe(self.props.current_User) && Permissions.can_create_PreparationTime_Recipe(self.props.current_User) && Fifteen_PreparationTime_Recipe_can_create(self) ? render_new_Fifteen_PreparationTime_Recipe(self) : null}
          {Permissions.can_create_PreparationTime_Recipe(self.props.current_User) ? render_add_existing_Fifteen_PreparationTime_Recipe(self) : null}
        </div>)
    }
    
    </div>
}



export function render_relations_Fifteen(self:FifteenContext) {
  return <div className="relations">
      { render_Fifteen_PreparationTime_Recipe(self, "default") }
      
    </div>
}

export function render_add_existing_Fifteen_PreparationTime_Recipe(self:FifteenContext) {
    
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
              relation_name:"fifteen_preparationtime_recipe",
              source_name:"PreparationTime",
              target_name:"Recipe",
              target_plural:"Recipes",
              page_size:25,
              render_target:(i,i_id) =>
                <div key={i_id} className="group__item">
                  <a className="group__button button button--existing"
                    onClick={() =>
                        self.setState({...self.state(), add_step_Recipe:"saving"}, () =>
                          Api.link_PreparationTime_PreparationTime_Recipes(self.props.entity, i).then(() =>
                            self.setState({...self.state(), add_step_Recipe:"closed"}, () =>
                              load_relation_Fifteen_PreparationTime_Recipe(self, false, self.props.current_User))))
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
                { name: "Recipe", get: async(i,s) => Api.get_unlinked_PreparationTime_PreparationTime_Recipes(self.props.entity, i, s) },
              ]
            })
        }
      </div>
    :
      null
    }
  

export function render_new_Fifteen_PreparationTime_Recipe(self:FifteenContext) {
    let state = self.state()
    return  self.props.mode == "edit" ?
      <div className="button__actions">
        <div className="new-recipe">
              <button 
                      className="new-recipe button button--new"
                      onClick={() =>
                          Api.create_linked_PreparationTime_PreparationTime_Recipes_Recipe(self.props.entity).then(e => {
                              e.length > 0 &&
                              Api.update_Recipe(
                                ({ ...e[0], Name:"", Ingredients:"", Description:"", Picture:"" } as Models.Recipe)).then(() =>
                                load_relation_Fifteen_PreparationTime_Recipe(self, true, self.props.current_User, () =>
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
  

export function render_saving_animations_Fifteen(self:FifteenContext) {
  return self.state().dirty_Recipe.count() > 0 ?
    <div style={{position:"fixed", zIndex:10000, top:0, left:0, width:"20px", height:"20px", backgroundColor:"red"}} className="saving"/>
    : <div style={{position:"fixed", zIndex:10000, top:0, left:0, width:"20px", height:"20px", backgroundColor:"cornflowerblue"}} className="saved"/>
}

export type FifteenContext = {state:()=>FifteenState, props:Utils.EntityComponentProps<Models.Fifteen>, setState:(new_state:FifteenState, callback?:()=>void) => void}

export type FifteenState = {
    update_count:number
    add_step_Recipe:"closed"|"open"|"saving",
      dirty_Recipe:Immutable.Map<number,Models.Recipe>,
      Recipe:Utils.PaginatedItems<{ shown_relation: string } & Utils.EntityAndSize<Models.Recipe>>|"loading"
  }
export class FifteenComponent extends React.Component<Utils.EntityComponentProps<Models.Fifteen>, FifteenState> {
  constructor(props:Utils.EntityComponentProps<Models.Fifteen>, context:any) {
    super(props, context)
    this.state = { update_count:0,add_step_Recipe:"closed", dirty_Recipe:Immutable.Map<number,Models.Recipe>(), Recipe:"loading" }
  }

  get_self() {
    return {state:() => this.state, props:this.props, setState:(ns,c)=>this.setState(ns,c)}
  }

  componentWillReceiveProps(new_props:Utils.EntityComponentProps<Models.Fifteen>) {
    if (new_props.size == "breadcrumb") return
    let current_logged_in_entity = this.props.current_User || null
    let new_logged_in_entity = new_props.current_User || null
    if (new_props.mode != this.props.mode || (new_props.size != this.props.size && (new_props.size == "large" || new_props.size == "fullscreen")) ||
        new_props.logic_frame != this.props.logic_frame ||
        (current_logged_in_entity && !new_logged_in_entity) ||
        (!current_logged_in_entity && new_logged_in_entity) ||
        (current_logged_in_entity && new_logged_in_entity && current_logged_in_entity.Id != new_logged_in_entity.Id)) {
      load_relations_Fifteen(this.get_self(),  new_props.current_User)
    }
  }

  thread:number = null
  componentWillMount() {
    if (this.props.size == "breadcrumb") return
    if (this.props.size != "preview") {
      
      load_relations_Fifteen(this.get_self(), this.props.current_User)
    }

    this.thread = setInterval(() => {
      if (this.state.dirty_Recipe.count() > 0) {
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
      return Permissions.can_view_Fifteen(this.props.current_User) ?
              render_breadcrumb_Fifteen(this.get_self())
              : null
    }

    return <div id={`Fifteen_${this.props.entity.Id.toString()}_${this.state.update_count}`} className={`model fifteen`}>
      { render_saving_animations_Fifteen(this.get_self()) }
      { this.props.nesting_depth == 0 ? render_menu_Fifteen(this.get_self()) : null }
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
        { this.props.nesting_depth == 0 ? render_local_menu_Fifteen(this.get_self()) : null }
        { render_controls_Fifteen(this.get_self()) }
        { render_content_Fifteen(this.get_self()) }
      </div>
    </div>
  }
}

export let Fifteen = (props:Utils.EntityComponentProps<Models.Fifteen>) : JSX.Element =>
  <FifteenComponent {...props} />

export let Fifteen_to_page = (id:number) => {
  let can_edit = Utils.any_of([Permissions.can_edit_Fifteen, Permissions.can_edit_PreparationTime_Recipe, Permissions.can_edit_Recipe])
  return Utils.scene_to_page<Models.Fifteen>(can_edit, Fifteen, Api.get_Fifteen(id), Api.update_Fifteen, "Fifteen", "Fifteen", `/Fifteens/${id}`)
}

export let Fifteen_to = (id:number, target_element_id:string, current_User:Models.User) => {
  Utils.render_page_manager(target_element_id,
    Fifteen_to_page(id),
    current_User
  )
}
