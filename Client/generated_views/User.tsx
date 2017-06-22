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
import * as FavoriteViews from './Favorite'
import * as RatingViews from './Rating'
import * as RecommendationPageViews from './RecommendationPage'


export function User_User_Favorite_can_create(self:UserContext) {
  let state = self.state()
  return state.Favorite == "loading" ? false : state.Favorite.CanCreate
}
export function User_User_Rating_can_create(self:UserContext) {
  let state = self.state()
  return state.Rating == "loading" ? false : state.Rating.CanCreate
}
export function User_User_RecommendationPage_can_create(self:UserContext) {
  let state = self.state()
  return state.RecommendationPage == "loading" ? false : state.RecommendationPage.CanCreate
}
export function User_User_Favorite_can_delete(self:UserContext) {
  let state = self.state()
  return state.Favorite == "loading" ? false : state.Favorite.CanDelete
}
export function User_User_Rating_can_delete(self:UserContext) {
  let state = self.state()
  return state.Rating == "loading" ? false : state.Rating.CanDelete
}
export function User_User_RecommendationPage_can_delete(self:UserContext) {
  let state = self.state()
  return state.RecommendationPage == "loading" ? false : state.RecommendationPage.CanDelete
}
export function User_User_Favorite_page_index(self:UserContext) {
  let state = self.state()
  return state.Favorite == "loading" ? 0 : state.Favorite.PageIndex
}
export function User_User_Rating_page_index(self:UserContext) {
  let state = self.state()
  return state.Rating == "loading" ? 0 : state.Rating.PageIndex
}
export function User_User_RecommendationPage_page_index(self:UserContext) {
  let state = self.state()
  return state.RecommendationPage == "loading" ? 0 : state.RecommendationPage.PageIndex
}
export function User_User_Favorite_page_size(self:UserContext) {
  let state = self.state()
  return state.Favorite == "loading" ? 25 : state.Favorite.PageSize
}
export function User_User_Rating_page_size(self:UserContext) {
  let state = self.state()
  return state.Rating == "loading" ? 25 : state.Rating.PageSize
}
export function User_User_RecommendationPage_page_size(self:UserContext) {
  let state = self.state()
  return state.RecommendationPage == "loading" ? 25 : state.RecommendationPage.PageSize
}
export function User_User_Favorite_num_pages(self:UserContext) {
  let state = self.state()
  return state.Favorite == "loading" ? 1 : state.Favorite.NumPages
}
export function User_User_Rating_num_pages(self:UserContext) {
  let state = self.state()
  return state.Rating == "loading" ? 1 : state.Rating.NumPages
}
export function User_User_RecommendationPage_num_pages(self:UserContext) {
  let state = self.state()
  return state.RecommendationPage == "loading" ? 1 : state.RecommendationPage.NumPages
}

export function load_relation_User_User_Favorite(self:UserContext, current_User:Models.User, callback?:()=>void) {
  Permissions.can_view_Favorite(current_User) ?
    Api.get_User_User_Favorites(self.props.entity, User_User_Favorite_page_index(self), User_User_Favorite_page_size(self)).then(Favorites =>
      self.setState({...self.state(), update_count:self.state().update_count+1,
          Favorite:Utils.raw_page_to_paginated_items<Models.Favorite, Utils.EntityAndSize<Models.Favorite> & { shown_relation:string }>(i => {
            let state = self.state()
            return {
              element:i,
              size: state.Favorite != "loading" && state.Favorite.Items.has(i.Id) ? state.Favorite.Items.get(i.Id).size : "preview",
              shown_relation:"all"}}, Favorites)
          }, callback))
  :
    callback && callback()
}

export function load_relation_User_User_Rating(self:UserContext, current_User:Models.User, callback?:()=>void) {
  Permissions.can_view_Rating(current_User) ?
    Api.get_User_User_Ratings(self.props.entity, User_User_Rating_page_index(self), User_User_Rating_page_size(self)).then(Ratings =>
      self.setState({...self.state(), update_count:self.state().update_count+1,
          Rating:Utils.raw_page_to_paginated_items<Models.Rating, Utils.EntityAndSize<Models.Rating> & { shown_relation:string }>(i => {
            let state = self.state()
            return {
              element:i,
              size: state.Rating != "loading" && state.Rating.Items.has(i.Id) ? state.Rating.Items.get(i.Id).size : "preview",
              shown_relation:"all"}}, Ratings)
          }, callback))
  :
    callback && callback()
}

export function load_relation_User_User_RecommendationPage(self:UserContext, current_User:Models.User, callback?:()=>void) {
  Permissions.can_view_RecommendationPage(current_User) ?
    Api.get_User_User_RecommendationPages(self.props.entity, User_User_RecommendationPage_page_index(self), User_User_RecommendationPage_page_size(self)).then(RecommendationPages =>
      self.setState({...self.state(), update_count:self.state().update_count+1,
          RecommendationPage:Utils.raw_page_to_paginated_items<Models.RecommendationPage, Utils.EntityAndSize<Models.RecommendationPage> & { shown_relation:string }>(i => {
            let state = self.state()
            return {
              element:i,
              size: state.RecommendationPage != "loading" && state.RecommendationPage.Items.has(i.Id) ? state.RecommendationPage.Items.get(i.Id).size : "preview",
              shown_relation:"all"}}, RecommendationPages)
          }, callback))
  :
    callback && callback()
}

export function load_relations_User(self, current_User:Models.User, callback?:()=>void) {
  load_relation_User_User_RecommendationPage(self, self.props.current_User, 
        () => load_relation_User_User_Rating(self, self.props.current_User, 
        () => load_relation_User_User_Favorite(self, self.props.current_User, 
        () => callback && callback())))
}

export function set_size_User(self:UserContext, new_size:Utils.EntitySize) {
  self.props.set_size(new_size, () => {
    if (new_size == "fullscreen")
      self.props.push(User_to_page(self.props.entity.Id))
  })
}

export function render_User_Username_editable_minimised(self:UserContext) : JSX.Element {
  if (!Permissions.can_edit_User(self.props.current_User)) return render_User_Username_minimised(self)
  else
    return !Permissions.can_view_User_Username(self.props.current_User) ? <div /> :
          <div className="model__attribute username">
  <label className="attribute-label attribute-label-username">{i18next.t(`User:Username`, {context: self.props.inline ? "inline" : ""})}</label>
  <div className="model__attribute-content">
    { Components.String(
        false,
        self.props.mode,
        () => self.props.entity.Username,
        v => self.props.set_entity({...self.props.entity, Username:v})) } 
  </div>
</div>
}

export function render_User_Language_editable_minimised(self:UserContext) : JSX.Element {
  if (!Permissions.can_edit_User(self.props.current_User)) return render_User_Language_minimised(self)
  else
    return !Permissions.can_view_User_Language(self.props.current_User) ? <div /> :
          <div className="model__attribute language">
  <label className="attribute-label attribute-label-language">{i18next.t(`User:Language`, {context: self.props.inline ? "inline" : ""})}</label>
  <div className="model__attribute-content">
    { Components.Union(
          self.props.is_editable && Permissions.can_edit_User(self.props.current_User) && Permissions.can_edit_User_Language(self.props.current_User),
          self.props.mode,
          Immutable.List<Components.UnionCase>([{ value:"en", label:"en" }]),
          () => self.props.entity.Language,
          (v:string) => self.props.set_entity({...self.props.entity, Language:v})) }
  </div>
</div>
}

export function render_User_Email_editable_minimised(self:UserContext) : JSX.Element {
  if (!Permissions.can_edit_User(self.props.current_User)) return render_User_Email_minimised(self)
  else
    return !Permissions.can_view_User_Email(self.props.current_User) ? <div /> :
          null
}


export function render_User_Username_editable_maximised(self:UserContext) : JSX.Element {
  if (!Permissions.can_edit_User(self.props.current_User)) return render_User_Username_maximised(self)
  else
    return !Permissions.can_view_User_Username(self.props.current_User) ? <div /> :
          <div className="model__attribute username">
  <label className="attribute-label attribute-label-username">{i18next.t(`User:Username`, {context: self.props.inline ? "inline" : ""})}</label>
  <div className="model__attribute-content">
    { Components.String(
        false,
        self.props.mode,
        () => self.props.entity.Username,
        v => self.props.set_entity({...self.props.entity, Username:v})) } 
  </div>
</div>
}

export function render_User_Language_editable_maximised(self:UserContext) : JSX.Element {
  if (!Permissions.can_edit_User(self.props.current_User)) return render_User_Language_maximised(self)
  else
    return !Permissions.can_view_User_Language(self.props.current_User) ? <div /> :
          <div className="model__attribute language">
  <label className="attribute-label attribute-label-language">{i18next.t(`User:Language`, {context: self.props.inline ? "inline" : ""})}</label>
  <div className="model__attribute-content">
    { Components.Union(
          self.props.is_editable && Permissions.can_edit_User(self.props.current_User) && Permissions.can_edit_User_Language(self.props.current_User),
          self.props.mode,
          Immutable.List<Components.UnionCase>([{ value:"en", label:"en" }]),
          () => self.props.entity.Language,
          (v:string) => self.props.set_entity({...self.props.entity, Language:v})) }
  </div>
</div>
}

export function render_User_Email_editable_maximised(self:UserContext) : JSX.Element {
  if (!Permissions.can_edit_User(self.props.current_User)) return render_User_Email_maximised(self)
  else
    return !Permissions.can_view_User_Email(self.props.current_User) ? <div /> :
          <div className="model__attribute email">
  <label className="attribute-label attribute-label-email">{i18next.t(`User:Email`, {context: self.props.inline ? "inline" : ""})}</label>
  <div className="model__attribute-content">
    { Components.Email(
        false,
        self.props.mode,
        () => self.props.entity.Email,
        v => self.props.set_entity({...self.props.entity, Email:v})) } 
  </div>
</div>
}


export function render_editable_attributes_minimised_User(self:UserContext) {
  let attributes = (<div><button onClick={() => Api.reset_User_password(self.props.entity.Username, self.props.entity.Email)}>{self.props.entity.HasPassword ? i18next.t('common:Reset password') : i18next.t('common:Create password')}</button>
      {render_User_Username_editable_minimised(self)}
        {render_User_Language_editable_minimised(self)}
    </div>)
  return attributes
}

export function render_editable_attributes_maximised_User(self:UserContext) {
    let attributes = (<div><button onClick={() => Api.reset_User_password(self.props.entity.Username, self.props.entity.Email)}>{self.props.entity.HasPassword ? i18next.t('common:Reset password') : i18next.t('common:Create password')}</button>
        {render_User_Username_editable_maximised(self)}
        {render_User_Language_editable_maximised(self)}
        {render_User_Email_editable_maximised(self)}
      </div>)
    return attributes
  }

export function render_breadcrumb_User(self:UserContext) {
  return <div className="breadcrumb-user">User</div>
}

export function render_menu_User(self:UserContext) {
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

export function render_local_menu_User(self:UserContext) {
  let state = self.state()
  return <div className="local-menu">
          <div className="local_menu_entries">
            <div className={`local_menu_entry${self.props.shown_relation == "none" ? " local_menu_entry--active" : ""}`}>
              <a onClick={() =>
                  self.props.set_shown_relation("none")
              }>
                {i18next.t('About this User')}
              </a>
            </div>
          
            {!Permissions.can_view_Favorite(self.props.current_User) ? null :
                  <div key={"User_Favorite"} className={`local_menu_entry${self.props.shown_relation == "User_Favorite" ? " local_menu_entry--active" : ""}`}>
                    <a onClick={() =>
                      load_relation_User_User_Favorite(self,
                        self.props.current_User, 
                        () => self.props.set_shown_relation("User_Favorite"))
                    }>
                      {i18next.t('User_Favorites')}
                    </a>
                  </div>
                }
        {!Permissions.can_view_Rating(self.props.current_User) ? null :
                  <div key={"User_Rating"} className={`local_menu_entry${self.props.shown_relation == "User_Rating" ? " local_menu_entry--active" : ""}`}>
                    <a onClick={() =>
                      load_relation_User_User_Rating(self,
                        self.props.current_User, 
                        () => self.props.set_shown_relation("User_Rating"))
                    }>
                      {i18next.t('User_Ratings')}
                    </a>
                  </div>
                }
        {!Permissions.can_view_RecommendationPage(self.props.current_User) ? null :
                  <div key={"User_RecommendationPage"} className={`local_menu_entry${self.props.shown_relation == "User_RecommendationPage" ? " local_menu_entry--active" : ""}`}>
                    <a onClick={() =>
                      load_relation_User_User_RecommendationPage(self,
                        self.props.current_User, 
                        () => self.props.set_shown_relation("User_RecommendationPage"))
                    }>
                      {i18next.t('User_RecommendationPages')}
                    </a>
                  </div>
                }  
          </div>
        </div>
}

export function render_controls_User(self:UserContext) {
  return <div className="control">
    {Permissions.can_delete_User(self.props.current_User) && self.props.size == "fullscreen" ? <a className="button button--delete"
      onClick={() => confirm(i18next.t('Are you sure?')) &&
        Api.delete_User(self.props.entity).then(() => self.props.force_reload(() => self.props.pop()))
      }>
    </a> : null}
    {self.props.size == "fullscreen" && self.props.pages_count > 0 ? <a className="user button button--close"
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

export function render_content_User(self:UserContext) {
  return <div className={`${self.props.inline != undefined && self.props.inline ? "" : "model-content"} ${self.props.size == 'preview' ? 'model-content--preview' : ''}`}>
    {Permissions.can_view_User(self.props.current_User) ?
      self.props.size == "preview" ?
        render_preview_User(self)
      : self.props.size == "large" ?
        render_large_User(self)
      : self.props.size == "fullscreen" ?
        render_large_User(self)
      : "Error: unauthorised access to entity."
    : "Error: unauthorised access to entity."
    }
  </div>
}

export function render_User_Username_minimised(self:UserContext) : JSX.Element {
      return !Permissions.can_view_User_Username(self.props.current_User) ? null : <div className="model__attribute username">
  <label className="attribute-label attribute-label-username">{i18next.t(`User:Username`, {context: self.props.inline ? "inline" : ""})}</label>
  <div className="model__attribute-content">
    { Components.String(
        false,
        self.props.mode,
        () => self.props.entity.Username,
        v => self.props.set_entity({...self.props.entity, Username:v})) } 
  </div>
</div>
      
}
        export function render_User_Language_minimised(self:UserContext) : JSX.Element {
      return !Permissions.can_view_User_Language(self.props.current_User) ? null : <div className="model__attribute language">
  <label className="attribute-label attribute-label-language">{i18next.t(`User:Language`, {context: self.props.inline ? "inline" : ""})}</label>
  <div className="model__attribute-content">
    { Components.Union(
          self.props.is_editable && Permissions.can_edit_User(self.props.current_User) && Permissions.can_edit_User_Language(self.props.current_User),
          self.props.mode,
          Immutable.List<Components.UnionCase>([{ value:"en", label:"en" }]),
          () => self.props.entity.Language,
          (v:string) => self.props.set_entity({...self.props.entity, Language:v})) }
  </div>
</div>
      
}
        export function render_User_Email_minimised(self:UserContext) : JSX.Element {
      return null
}

export function render_User_Username_maximised(self:UserContext) : JSX.Element {
        return !Permissions.can_view_User_Username(self.props.current_User) ? null : <div className="model__attribute username">
  <label className="attribute-label attribute-label-username">{i18next.t(`User:Username`, {context: self.props.inline ? "inline" : ""})}</label>
  <div className="model__attribute-content">
    { Components.String(
        false,
        self.props.mode,
        () => self.props.entity.Username,
        v => self.props.set_entity({...self.props.entity, Username:v})) } 
  </div>
</div>
}
        export function render_User_Language_maximised(self:UserContext) : JSX.Element {
        return !Permissions.can_view_User_Language(self.props.current_User) ? null : <div className="model__attribute language">
  <label className="attribute-label attribute-label-language">{i18next.t(`User:Language`, {context: self.props.inline ? "inline" : ""})}</label>
  <div className="model__attribute-content">
    { Components.Union(
          self.props.is_editable && Permissions.can_edit_User(self.props.current_User) && Permissions.can_edit_User_Language(self.props.current_User),
          self.props.mode,
          Immutable.List<Components.UnionCase>([{ value:"en", label:"en" }]),
          () => self.props.entity.Language,
          (v:string) => self.props.set_entity({...self.props.entity, Language:v})) }
  </div>
</div>
}
        export function render_User_Email_maximised(self:UserContext) : JSX.Element {
        return !Permissions.can_view_User_Email(self.props.current_User) ? null : <div className="model__attribute email">
  <label className="attribute-label attribute-label-email">{i18next.t(`User:Email`, {context: self.props.inline ? "inline" : ""})}</label>
  <div className="model__attribute-content">
    { Components.Email(
        false,
        self.props.mode,
        () => self.props.entity.Email,
        v => self.props.set_entity({...self.props.entity, Email:v})) } 
  </div>
</div>
}

export function render_preview_User(self:UserContext) {
  let attributes:JSX.Element = null
  if (self.props.mode == "view" || !Permissions.can_edit_User(self.props.current_User))
    attributes = (<div className="model__attributes">
      { render_User_Username_minimised(self) }
        { render_User_Language_minimised(self) }
        { render_User_Email_minimised(self) }
    </div>)
  else
    attributes = render_editable_attributes_minimised_User(self)
  return (<div className="block">
      {attributes}
    </div>)
}

export function render_large_User(self:UserContext) {
  let attributes:JSX.Element = null
  if (self.props.mode == "view" || !Permissions.can_edit_User(self.props.current_User))
    attributes = (<div className="model__attributes">
      { render_User_Username_maximised(self) }
        { render_User_Language_maximised(self) }
        { render_User_Email_maximised(self) }
    </div>)
  else
    attributes = render_editable_attributes_maximised_User(self)
  return (<div className="block">
      {self.props.nesting_depth == 0 && self.props.shown_relation != "all" && self.props.shown_relation != "none" ? null : attributes}
      {render_relations_User(self)}
    </div>)
}


export function render_User_User_Favorite(self:UserContext, context:"presentation_structure"|"default") {
  if ((context == "default" && self.props.shown_relation != "all" && self.props.shown_relation != "User_Favorite") || !Permissions.can_view_Favorite(self.props.current_User))
    return null
  let state = self.state()
  return <div>
    { List.render_relation("user_user_favorite",
   "User",
   "Favorite",
   "Favorites",
   self.props.nesting_depth > 0,
   false,
   false,
   false)
  (
      state.Favorite != "loading" ? state.Favorite.Items : state.Favorite,
      User_User_Favorite_page_index(self),
      User_User_Favorite_num_pages(self),
      new_page_index => {
          let state = self.state()
          state.Favorite != "loading" &&
          self.setState({...self.state(),
            update_count:self.state().update_count+1,
            Favorite: {
              ...state.Favorite,
              PageIndex:new_page_index
            }
          }, () =>  load_relation_User_User_Favorite(self, self.props.current_User))
        },
      (i,i_id) => {
          let state = self.state()
          return <div key={i_id}
            className={`model-nested__item ${i.size != "preview" ? "model-nested__item--open" : ""} ` }
          
            >
            <div key={i_id}>
              {
                FavoriteViews.Favorite({
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
                  is_editable:state.Favorite != "loading" && state.Favorite.Editable.get(i_id),
                  shown_relation:i.shown_relation,
                  set_shown_relation:(new_shown_relation:string, callback) => {
                    let state = self.state()
                    state.Favorite != "loading" &&
                    self.setState({...self.state(),
                      Favorite:
                        {
                          ...state.Favorite,
                          Items:state.Favorite.Items.set(i_id,{...state.Favorite.Items.get(i_id), shown_relation:new_shown_relation})
                        }
                    }, callback)
                  },
                  nested_entity_names: self.props.nested_entity_names.push("Favorite"),
                  
                  set_size:(new_size:Utils.EntitySize, callback) => {
                    let new_shown_relation = new_size == "large" ? "all" : i.shown_relation
                    let state = self.state()
                    state.Favorite != "loading" &&
                    self.setState({...self.state(),
                      Favorite:
                        {
                          ...state.Favorite,
                          Items:state.Favorite.Items.set(i_id,
                            {...state.Favorite.Items.get(i_id),
                              size:new_size, shown_relation:new_shown_relation})
                        }
                    }, callback)
                  },
                    
                  toggle_button:undefined,
                  set_mode:undefined,
                  set_entity:(new_entity:Models.Favorite, callback?:()=>void, force_update_count_increment?:boolean) => {
                    let state = self.state()
                    state.Favorite != "loading" &&
                    self.setState({...self.state(),
                      dirty_Favorite:state.dirty_Favorite.set(i_id, new_entity),
                      update_count:force_update_count_increment ? self.state().update_count+1 : state.update_count,
                      Favorite:
                        {
                          ...state.Favorite,
                          Items:state.Favorite.Items.set(i_id,{...state.Favorite.Items.get(i_id), element:new_entity})
                        }
                    }, callback)
                  },
                  delete: undefined,
                  unlink: !Permissions.can_delete_User_Favorite(self.props.current_User) ?
                    null
                    :
                    () => confirm(i18next.t('Are you sure?')) && Api.unlink_User_User_Favorites(self.props.entity, i.element).then(() =>
                      load_relation_User_User_Favorite(self, self.props.current_User))
                })
              }
            </div>
          </div>
        },
      () =>
        <div>
          {Permissions.can_create_Favorite(self.props.current_User) && Permissions.can_create_User_Favorite(self.props.current_User) && User_User_Favorite_can_create(self) ? render_new_User_User_Favorite(self) : null}
          {Permissions.can_create_User_Favorite(self.props.current_User) ? render_add_existing_User_User_Favorite(self) : null}
        </div>)
    }
    
    </div>
}


export function render_User_User_Rating(self:UserContext, context:"presentation_structure"|"default") {
  if ((context == "default" && self.props.shown_relation != "all" && self.props.shown_relation != "User_Rating") || !Permissions.can_view_Rating(self.props.current_User))
    return null
  let state = self.state()
  return <div>
    { List.render_relation("user_user_rating",
   "User",
   "Rating",
   "Ratings",
   self.props.nesting_depth > 0,
   false,
   false,
   false)
  (
      state.Rating != "loading" ? state.Rating.Items : state.Rating,
      User_User_Rating_page_index(self),
      User_User_Rating_num_pages(self),
      new_page_index => {
          let state = self.state()
          state.Rating != "loading" &&
          self.setState({...self.state(),
            update_count:self.state().update_count+1,
            Rating: {
              ...state.Rating,
              PageIndex:new_page_index
            }
          }, () =>  load_relation_User_User_Rating(self, self.props.current_User))
        },
      (i,i_id) => {
          let state = self.state()
          return <div key={i_id}
            className={`model-nested__item ${i.size != "preview" ? "model-nested__item--open" : ""} ` }
          
            >
            <div key={i_id}>
              {
                RatingViews.Rating({
                  ...self.props,
                  entity:i.element,
                  inline:false,
                  nesting_depth:self.props.nesting_depth+1,
                  size: i.size,
                  allow_maximisation:true,
                  allow_fullscreen:true,
                  mode:self.props.mode == "edit" && (Permissions.can_edit_User_Rating(self.props.current_User)
                        || Permissions.can_create_User_Rating(self.props.current_User)
                        || Permissions.can_delete_User_Rating(self.props.current_User)) ?
                    self.props.mode : "view",
                  is_editable:state.Rating != "loading" && state.Rating.Editable.get(i_id),
                  shown_relation:i.shown_relation,
                  set_shown_relation:(new_shown_relation:string, callback) => {
                    let state = self.state()
                    state.Rating != "loading" &&
                    self.setState({...self.state(),
                      Rating:
                        {
                          ...state.Rating,
                          Items:state.Rating.Items.set(i_id,{...state.Rating.Items.get(i_id), shown_relation:new_shown_relation})
                        }
                    }, callback)
                  },
                  nested_entity_names: self.props.nested_entity_names.push("Rating"),
                  
                  set_size:(new_size:Utils.EntitySize, callback) => {
                    let new_shown_relation = new_size == "large" ? "all" : i.shown_relation
                    let state = self.state()
                    state.Rating != "loading" &&
                    self.setState({...self.state(),
                      Rating:
                        {
                          ...state.Rating,
                          Items:state.Rating.Items.set(i_id,
                            {...state.Rating.Items.get(i_id),
                              size:new_size, shown_relation:new_shown_relation})
                        }
                    }, callback)
                  },
                    
                  toggle_button:undefined,
                  set_mode:undefined,
                  set_entity:(new_entity:Models.Rating, callback?:()=>void, force_update_count_increment?:boolean) => {
                    let state = self.state()
                    state.Rating != "loading" &&
                    self.setState({...self.state(),
                      dirty_Rating:state.dirty_Rating.set(i_id, new_entity),
                      update_count:force_update_count_increment ? self.state().update_count+1 : state.update_count,
                      Rating:
                        {
                          ...state.Rating,
                          Items:state.Rating.Items.set(i_id,{...state.Rating.Items.get(i_id), element:new_entity})
                        }
                    }, callback)
                  },
                  delete: undefined,
                  unlink: !Permissions.can_delete_User_Rating(self.props.current_User) ?
                    null
                    :
                    () => confirm(i18next.t('Are you sure?')) && Api.unlink_User_User_Ratings(self.props.entity, i.element).then(() =>
                      load_relation_User_User_Rating(self, self.props.current_User))
                })
              }
            </div>
          </div>
        },
      () =>
        <div>
          {Permissions.can_create_Rating(self.props.current_User) && Permissions.can_create_User_Rating(self.props.current_User) && User_User_Rating_can_create(self) ? render_new_User_User_Rating(self) : null}
          {Permissions.can_create_User_Rating(self.props.current_User) ? render_add_existing_User_User_Rating(self) : null}
        </div>)
    }
    
    </div>
}


export function render_User_User_RecommendationPage(self:UserContext, context:"presentation_structure"|"default") {
  if ((context == "default" && self.props.shown_relation != "all" && self.props.shown_relation != "User_RecommendationPage") || !Permissions.can_view_RecommendationPage(self.props.current_User))
    return null
  let state = self.state()
  return <div>
    { List.render_relation("user_user_recommendationpage",
   "User",
   "RecommendationPage",
   "RecommendationPages",
   self.props.nesting_depth > 0,
   false,
   false,
   false)
  (
      state.RecommendationPage != "loading" ? state.RecommendationPage.Items : state.RecommendationPage,
      User_User_RecommendationPage_page_index(self),
      User_User_RecommendationPage_num_pages(self),
      new_page_index => {
          let state = self.state()
          state.RecommendationPage != "loading" &&
          self.setState({...self.state(),
            update_count:self.state().update_count+1,
            RecommendationPage: {
              ...state.RecommendationPage,
              PageIndex:new_page_index
            }
          }, () =>  load_relation_User_User_RecommendationPage(self, self.props.current_User))
        },
      (i,i_id) => {
          let state = self.state()
          return <div key={i_id}
            className={`model-nested__item ${i.size != "preview" ? "model-nested__item--open" : ""} ` }
          
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
                  mode:self.props.mode == "edit" && (Permissions.can_edit_User_RecommendationPage(self.props.current_User)
                        || Permissions.can_create_User_RecommendationPage(self.props.current_User)
                        || Permissions.can_delete_User_RecommendationPage(self.props.current_User)) ?
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
                  delete: undefined,
                  unlink: !Permissions.can_delete_User_RecommendationPage(self.props.current_User) ?
                    null
                    :
                    () => confirm(i18next.t('Are you sure?')) && Api.unlink_User_User_RecommendationPages(self.props.entity, i.element).then(() =>
                      load_relation_User_User_RecommendationPage(self, self.props.current_User))
                })
              }
            </div>
          </div>
        },
      () =>
        <div>
          {Permissions.can_create_RecommendationPage(self.props.current_User) && Permissions.can_create_User_RecommendationPage(self.props.current_User) && User_User_RecommendationPage_can_create(self) ? render_new_User_User_RecommendationPage(self) : null}
          {Permissions.can_create_User_RecommendationPage(self.props.current_User) ? render_add_existing_User_User_RecommendationPage(self) : null}
        </div>)
    }
    
    </div>
}



export function render_relations_User(self:UserContext) {
  return <div className="relations">
      { render_User_User_Favorite(self, "default") }
      { render_User_User_Rating(self, "default") }
      { render_User_User_RecommendationPage(self, "default") }
      
    </div>
}

export function render_add_existing_User_User_Favorite(self:UserContext) {
    
    let state = self.state()
    return self.props.mode == "edit" ?
      <div className="button__actions">
        {
          state.add_step_Favorite != "open" ?
            <Buttons.Add disabled={state.Favorite == "loading" ? true : state.Favorite.TotalCount >= 1} 
              onClick={() =>
                self.setState({...self.state(), add_step_Favorite:"open"}) }
                  target_name={"Favorite"} />
          :
          React.createElement(List.AddToRelation,
            {
              relation_name:"user_user_favorite",
              source_name:"User",
              target_name:"Favorite",
              target_plural:"Favorites",
              page_size:10,
              render_target:(i,i_id) =>
                <div key={i_id} className="group__item">
                  <a className="group__button button button--existing"
                    onClick={() =>
                        self.setState({...self.state(), add_step_Favorite:"saving"}, () =>
                          Api.link_User_User_Favorites(self.props.entity, i).then(() =>
                            self.setState({...self.state(), add_step_Favorite:"closed"}, () =>
                              load_relation_User_User_Favorite(self, self.props.current_User))))
                      }>
                      Add existing
                  </a>
                  <div className="group__title" disabled={true}>
                    {
                      FavoriteViews.Favorite({
                        ...self.props,
                        entity:i,
                        nesting_depth:self.props.nesting_depth+1,
                        size:"preview",
                        mode:"view",
                        is_editable:false,
                        nested_entity_names: self.props.nested_entity_names.push("Favorite"),
                        set_size:undefined,
                        toggle_button:undefined,
                        set_mode:undefined,
                        set_entity:(new_entity:Models.Favorite, callback?:()=>void) => {},
                        unlink: undefined,
                        delete: undefined
                      })
                    }
                  </div>
                </div>,
              cancel:() => self.setState({...self.state(), add_step_Favorite:"closed"}),
              get_items:[
                { name: "Favorite", get: async(i,s) => Api.get_unlinked_User_User_Favorites(self.props.entity, i, s) },
              ]
            })
        }
      </div>
    :
      null
    }
  
export function render_add_existing_User_User_Rating(self:UserContext) {
    
    let state = self.state()
    return self.props.mode == "edit" ?
      <div className="button__actions">
        {
          state.add_step_Rating != "open" ?
            <Buttons.Add 
              onClick={() =>
                self.setState({...self.state(), add_step_Rating:"open"}) }
                  target_name={"Rating"} />
          :
          React.createElement(List.AddToRelation,
            {
              relation_name:"user_user_rating",
              source_name:"User",
              target_name:"Rating",
              target_plural:"Ratings",
              page_size:10,
              render_target:(i,i_id) =>
                <div key={i_id} className="group__item">
                  <a className="group__button button button--existing"
                    onClick={() =>
                        self.setState({...self.state(), add_step_Rating:"saving"}, () =>
                          Api.link_User_User_Ratings(self.props.entity, i).then(() =>
                            self.setState({...self.state(), add_step_Rating:"closed"}, () =>
                              load_relation_User_User_Rating(self, self.props.current_User))))
                      }>
                      Add existing
                  </a>
                  <div className="group__title" disabled={true}>
                    {
                      RatingViews.Rating({
                        ...self.props,
                        entity:i,
                        nesting_depth:self.props.nesting_depth+1,
                        size:"preview",
                        mode:"view",
                        is_editable:false,
                        nested_entity_names: self.props.nested_entity_names.push("Rating"),
                        set_size:undefined,
                        toggle_button:undefined,
                        set_mode:undefined,
                        set_entity:(new_entity:Models.Rating, callback?:()=>void) => {},
                        unlink: undefined,
                        delete: undefined
                      })
                    }
                  </div>
                </div>,
              cancel:() => self.setState({...self.state(), add_step_Rating:"closed"}),
              get_items:[
                { name: "Rating", get: async(i,s) => Api.get_unlinked_User_User_Ratings(self.props.entity, i, s) },
              ]
            })
        }
      </div>
    :
      null
    }
  
export function render_add_existing_User_User_RecommendationPage(self:UserContext) {
    
    let state = self.state()
    return self.props.mode == "edit" ?
      <div className="button__actions">
        {
          state.add_step_RecommendationPage != "open" ?
            <Buttons.Add disabled={state.RecommendationPage == "loading" ? true : state.RecommendationPage.TotalCount >= 1} 
              onClick={() =>
                self.setState({...self.state(), add_step_RecommendationPage:"open"}) }
                  target_name={"RecommendationPage"} />
          :
          React.createElement(List.AddToRelation,
            {
              relation_name:"user_user_recommendationpage",
              source_name:"User",
              target_name:"RecommendationPage",
              target_plural:"RecommendationPages",
              page_size:10,
              render_target:(i,i_id) =>
                <div key={i_id} className="group__item">
                  <a className="group__button button button--existing"
                    onClick={() =>
                        self.setState({...self.state(), add_step_RecommendationPage:"saving"}, () =>
                          Api.link_User_User_RecommendationPages(self.props.entity, i).then(() =>
                            self.setState({...self.state(), add_step_RecommendationPage:"closed"}, () =>
                              load_relation_User_User_RecommendationPage(self, self.props.current_User))))
                      }>
                      Add existing
                  </a>
                  <div className="group__title" disabled={true}>
                    {
                      RecommendationPageViews.RecommendationPage({
                        ...self.props,
                        entity:i,
                        nesting_depth:self.props.nesting_depth+1,
                        size:"preview",
                        mode:"view",
                        is_editable:false,
                        nested_entity_names: self.props.nested_entity_names.push("RecommendationPage"),
                        set_size:undefined,
                        toggle_button:undefined,
                        set_mode:undefined,
                        set_entity:(new_entity:Models.RecommendationPage, callback?:()=>void) => {},
                        unlink: undefined,
                        delete: undefined
                      })
                    }
                  </div>
                </div>,
              cancel:() => self.setState({...self.state(), add_step_RecommendationPage:"closed"}),
              get_items:[
                { name: "RecommendationPage", get: async(i,s) => Api.get_unlinked_User_User_RecommendationPages(self.props.entity, i, s) },
              ]
            })
        }
      </div>
    :
      null
    }
  

export function render_new_User_User_Favorite(self:UserContext) {
    let state = self.state()
    return  self.props.mode == "edit" ?
      <div className="button__actions">
        <div className="new-favorite">
              <button disabled={state.Favorite == "loading" ? true : state.Favorite.TotalCount >= 1} 
                      className="new-favorite button button--new"
                      onClick={() =>
                          Api.create_linked_User_User_Favorites_Favorite(self.props.entity).then(e => {
                              e.length > 0 &&
                              Api.update_Favorite(
                                ({ ...e[0],  } as Models.Favorite)).then(() =>
                                load_relation_User_User_Favorite(self, self.props.current_User, () =>
                                    self.setState({...self.state(), add_step_Favorite:"closed"})
                                  )
                                )
                          })
                      }>
                  {i18next.t('Create new Favorite')}
              </button>
            </div>
        </div>
      :
      null
    }
  
export function render_new_User_User_Rating(self:UserContext) {
    let state = self.state()
    return  self.props.mode == "edit" ?
      <div className="button__actions">
        <div className="new-rating">
              <button 
                      className="new-rating button button--new"
                      onClick={() =>
                          Api.create_linked_User_User_Ratings_Rating(self.props.entity).then(e => {
                              e.length > 0 &&
                              Api.update_Rating(
                                ({ ...e[0],  } as Models.Rating)).then(() =>
                                load_relation_User_User_Rating(self, self.props.current_User, () =>
                                    self.setState({...self.state(), add_step_Rating:"closed"})
                                  )
                                )
                          })
                      }>
                  {i18next.t('Create new Rating')}
              </button>
            </div>
        </div>
      :
      null
    }
  
export function render_new_User_User_RecommendationPage(self:UserContext) {
    let state = self.state()
    return  self.props.mode == "edit" ?
      <div className="button__actions">
        <div className="new-recommendationpage">
              <button disabled={state.RecommendationPage == "loading" ? true : state.RecommendationPage.TotalCount >= 1} 
                      className="new-recommendationpage button button--new"
                      onClick={() =>
                          Api.create_linked_User_User_RecommendationPages_RecommendationPage(self.props.entity).then(e => {
                              e.length > 0 &&
                              Api.update_RecommendationPage(
                                ({ ...e[0],  } as Models.RecommendationPage)).then(() =>
                                load_relation_User_User_RecommendationPage(self, self.props.current_User, () =>
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
  

export function render_saving_animations_User(self:UserContext) {
  return self.state().dirty_Favorite.count() > 0 ?
    <div style={{position:"fixed", zIndex:10000, top:0, left:0, width:"20px", height:"20px", backgroundColor:"red"}} className="saving"/> : 
    self.state().dirty_Rating.count() > 0 ?
    <div style={{position:"fixed", zIndex:10000, top:0, left:0, width:"20px", height:"20px", backgroundColor:"red"}} className="saving"/> : 
    self.state().dirty_RecommendationPage.count() > 0 ?
    <div style={{position:"fixed", zIndex:10000, top:0, left:0, width:"20px", height:"20px", backgroundColor:"red"}} className="saving"/>
    : <div style={{position:"fixed", zIndex:10000, top:0, left:0, width:"20px", height:"20px", backgroundColor:"cornflowerblue"}} className="saved"/>
}

export type UserContext = {state:()=>UserState, props:Utils.EntityComponentProps<Models.User>, setState:(new_state:UserState, callback?:()=>void) => void}

export type UserState = {
    update_count:number
    add_step_Favorite:"closed"|"open"|"saving",
      dirty_Favorite:Immutable.Map<number,Models.Favorite>,
      Favorite:Utils.PaginatedItems<{ shown_relation: string } & Utils.EntityAndSize<Models.Favorite>>|"loading"
  add_step_Rating:"closed"|"open"|"saving",
      dirty_Rating:Immutable.Map<number,Models.Rating>,
      Rating:Utils.PaginatedItems<{ shown_relation: string } & Utils.EntityAndSize<Models.Rating>>|"loading"
  add_step_RecommendationPage:"closed"|"open"|"saving",
      dirty_RecommendationPage:Immutable.Map<number,Models.RecommendationPage>,
      RecommendationPage:Utils.PaginatedItems<{ shown_relation: string } & Utils.EntityAndSize<Models.RecommendationPage>>|"loading"
  }
export class UserComponent extends React.Component<Utils.EntityComponentProps<Models.User>, UserState> {
  constructor(props:Utils.EntityComponentProps<Models.User>, context:any) {
    super(props, context)
    this.state = { update_count:0, add_step_Favorite:"closed", dirty_Favorite:Immutable.Map<number,Models.Favorite>(), Favorite:"loading", add_step_Rating:"closed", dirty_Rating:Immutable.Map<number,Models.Rating>(), Rating:"loading", add_step_RecommendationPage:"closed", dirty_RecommendationPage:Immutable.Map<number,Models.RecommendationPage>(), RecommendationPage:"loading" }
  }

  get_self() {
    return {state:() => this.state, props:this.props, setState:(ns,c)=>this.setState(ns,c)}
  }

  componentWillReceiveProps(new_props:Utils.EntityComponentProps<Models.User>) {
    if (new_props.size == "breadcrumb") return
    let current_logged_in_entity = this.props.current_User || null
    let new_logged_in_entity = new_props.current_User || null
    if (new_props.mode != this.props.mode || (new_props.size != this.props.size && (new_props.size == "large" || new_props.size == "fullscreen")) ||
        new_props.logic_frame != this.props.logic_frame ||
        (current_logged_in_entity && !new_logged_in_entity) ||
        (!current_logged_in_entity && new_logged_in_entity) ||
        (current_logged_in_entity && new_logged_in_entity && current_logged_in_entity.Id != new_logged_in_entity.Id)) {
      load_relations_User(this.get_self(), new_props.current_User)
    }
  }

  thread:number = null
  componentWillMount() {
    if (this.props.size == "breadcrumb") return
    if (this.props.size != "preview")
      load_relations_User(this.get_self(), this.props.current_User)

    this.thread = setInterval(() => {
      if (this.state.dirty_Favorite.count() > 0) {
         let first = this.state.dirty_Favorite.first()
         this.setState({...this.state, dirty_Favorite: this.state.dirty_Favorite.remove(first.Id)}, () =>
           Api.update_Favorite(first)
         )
       } else if (this.state.dirty_Rating.count() > 0) {
         let first = this.state.dirty_Rating.first()
         this.setState({...this.state, dirty_Rating: this.state.dirty_Rating.remove(first.Id)}, () =>
           Api.update_Rating(first)
         )
       } else if (this.state.dirty_RecommendationPage.count() > 0) {
         let first = this.state.dirty_RecommendationPage.first()
         this.setState({...this.state, dirty_RecommendationPage: this.state.dirty_RecommendationPage.remove(first.Id)}, () =>
           Api.update_RecommendationPage(first)
         )
       }

    }, 500)
  }

  componentWillUnmount() {
    clearInterval(this.thread)
  }

  render() {
    if (this.props.size == "breadcrumb") {
      return Permissions.can_view_User(this.props.current_User) ?
              render_breadcrumb_User(this.get_self())
              : null
    }

    return <div id={`User_${this.props.entity.Id.toString()}_${this.state.update_count}`} className={`model user`}>
      { render_saving_animations_User(this.get_self()) }
      { this.props.nesting_depth == 0 ? render_menu_User(this.get_self()) : null }
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
        { this.props.nesting_depth == 0 ? render_local_menu_User(this.get_self()) : null }
        { render_controls_User(this.get_self()) }
        { render_content_User(this.get_self()) }
      </div>
    </div>
  }
}

export let User = (props:Utils.EntityComponentProps<Models.User>) : JSX.Element =>
  <UserComponent {...props} />

export let User_to_page = (id:number) => {
  let can_edit = Utils.any_of([Permissions.can_edit_User, Permissions.can_edit_User_Favorite, Permissions.can_edit_User_Rating, Permissions.can_edit_User_RecommendationPage, Permissions.can_edit_Favorite, Permissions.can_edit_Rating, Permissions.can_edit_RecommendationPage])
  return Utils.scene_to_page<Models.User>(can_edit, User, Api.get_User(id), Api.update_User, "User", "User", `/Users/${id}`)
}

export let User_to = (id:number, target_element_id:string, current_User:Models.User) => {
  Utils.render_page_manager(target_element_id,
    User_to_page(id),
    current_User
  )
}
