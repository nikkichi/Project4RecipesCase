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
import * as MealViews from './Meal'
import * as PreparationTimeViews from './PreparationTime'
import * as UserViews from './User'
import * as RatingViews from './Rating'
import * as RecommendationPageViews from './RecommendationPage'


export function Recipe_Meal_Recipe_can_create(self:RecipeContext) {
  let state = self.state()
  return state.Meal == "loading" ? false : state.Meal.CanCreate
}
export function Recipe_PreparationTime_Recipe_can_create(self:RecipeContext) {
  let state = self.state()
  return state.PreparationTime == "loading" ? false : state.PreparationTime.CanCreate
}
export function Recipe_User_Recipe_can_create(self:RecipeContext) {
  let state = self.state()
  return state.User == "loading" ? false : state.User.CanCreate
}
export function Recipe_Recipe_Rating_can_create(self:RecipeContext) {
  let state = self.state()
  return state.Rating == "loading" ? false : state.Rating.CanCreate
}
export function Recipe_RecommendationPage_Recipe_can_create(self:RecipeContext) {
  let state = self.state()
  return state.RecommendationPage == "loading" ? false : state.RecommendationPage.CanCreate
}
export function Recipe_Homepage_Recipe_can_create(self:RecipeContext) {
  let state = self.state()
  return state.Homepage == "loading" ? false : state.Homepage.CanCreate
}
export function Recipe_Meal_Recipe_can_delete(self:RecipeContext) {
  let state = self.state()
  return state.Meal == "loading" ? false : state.Meal.CanDelete
}
export function Recipe_PreparationTime_Recipe_can_delete(self:RecipeContext) {
  let state = self.state()
  return state.PreparationTime == "loading" ? false : state.PreparationTime.CanDelete
}
export function Recipe_User_Recipe_can_delete(self:RecipeContext) {
  let state = self.state()
  return state.User == "loading" ? false : state.User.CanDelete
}
export function Recipe_Recipe_Rating_can_delete(self:RecipeContext) {
  let state = self.state()
  return state.Rating == "loading" ? false : state.Rating.CanDelete
}
export function Recipe_RecommendationPage_Recipe_can_delete(self:RecipeContext) {
  let state = self.state()
  return state.RecommendationPage == "loading" ? false : state.RecommendationPage.CanDelete
}
export function Recipe_Homepage_Recipe_can_delete(self:RecipeContext) {
  let state = self.state()
  return state.Homepage == "loading" ? false : state.Homepage.CanDelete
}
export function Recipe_Meal_Recipe_page_index(self:RecipeContext) {
  let state = self.state()
  return state.Meal == "loading" ? 0 : state.Meal.PageIndex
}
export function Recipe_PreparationTime_Recipe_page_index(self:RecipeContext) {
  let state = self.state()
  return state.PreparationTime == "loading" ? 0 : state.PreparationTime.PageIndex
}
export function Recipe_User_Recipe_page_index(self:RecipeContext) {
  let state = self.state()
  return state.User == "loading" ? 0 : state.User.PageIndex
}
export function Recipe_Recipe_Rating_page_index(self:RecipeContext) {
  let state = self.state()
  return state.Rating == "loading" ? 0 : state.Rating.PageIndex
}
export function Recipe_RecommendationPage_Recipe_page_index(self:RecipeContext) {
  let state = self.state()
  return state.RecommendationPage == "loading" ? 0 : state.RecommendationPage.PageIndex
}
export function Recipe_Homepage_Recipe_page_index(self:RecipeContext) {
  let state = self.state()
  return state.Homepage == "loading" ? 0 : state.Homepage.PageIndex
}
export function Recipe_Meal_Recipe_page_size(self:RecipeContext) {
  let state = self.state()
  return state.Meal == "loading" ? 25 : state.Meal.PageSize
}
export function Recipe_PreparationTime_Recipe_page_size(self:RecipeContext) {
  let state = self.state()
  return state.PreparationTime == "loading" ? 25 : state.PreparationTime.PageSize
}
export function Recipe_User_Recipe_page_size(self:RecipeContext) {
  let state = self.state()
  return state.User == "loading" ? 25 : state.User.PageSize
}
export function Recipe_Recipe_Rating_page_size(self:RecipeContext) {
  let state = self.state()
  return state.Rating == "loading" ? 25 : state.Rating.PageSize
}
export function Recipe_RecommendationPage_Recipe_page_size(self:RecipeContext) {
  let state = self.state()
  return state.RecommendationPage == "loading" ? 25 : state.RecommendationPage.PageSize
}
export function Recipe_Homepage_Recipe_page_size(self:RecipeContext) {
  let state = self.state()
  return state.Homepage == "loading" ? 25 : state.Homepage.PageSize
}
export function Recipe_Meal_Recipe_search_query(self:RecipeContext) {
  let state = self.state()
  return state.Meal == "loading" ? null : state.Meal.SearchQuery
}
export function Recipe_PreparationTime_Recipe_search_query(self:RecipeContext) {
  let state = self.state()
  return state.PreparationTime == "loading" ? null : state.PreparationTime.SearchQuery
}
export function Recipe_User_Recipe_search_query(self:RecipeContext) {
  let state = self.state()
  return state.User == "loading" ? null : state.User.SearchQuery
}
export function Recipe_Recipe_Rating_search_query(self:RecipeContext) {
  let state = self.state()
  return state.Rating == "loading" ? null : state.Rating.SearchQuery
}
export function Recipe_RecommendationPage_Recipe_search_query(self:RecipeContext) {
  let state = self.state()
  return state.RecommendationPage == "loading" ? null : state.RecommendationPage.SearchQuery
}
export function Recipe_Homepage_Recipe_search_query(self:RecipeContext) {
  let state = self.state()
  return state.Homepage == "loading" ? null : state.Homepage.SearchQuery
}
export function Recipe_Meal_Recipe_num_pages(self:RecipeContext) {
  let state = self.state()
  return state.Meal == "loading" ? 1 : state.Meal.NumPages
}
export function Recipe_PreparationTime_Recipe_num_pages(self:RecipeContext) {
  let state = self.state()
  return state.PreparationTime == "loading" ? 1 : state.PreparationTime.NumPages
}
export function Recipe_User_Recipe_num_pages(self:RecipeContext) {
  let state = self.state()
  return state.User == "loading" ? 1 : state.User.NumPages
}
export function Recipe_Recipe_Rating_num_pages(self:RecipeContext) {
  let state = self.state()
  return state.Rating == "loading" ? 1 : state.Rating.NumPages
}
export function Recipe_RecommendationPage_Recipe_num_pages(self:RecipeContext) {
  let state = self.state()
  return state.RecommendationPage == "loading" ? 1 : state.RecommendationPage.NumPages
}
export function Recipe_Homepage_Recipe_num_pages(self:RecipeContext) {
  let state = self.state()
  return state.Homepage == "loading" ? 1 : state.Homepage.NumPages
}

export function load_relation_Recipe_Meal_Recipe(self:RecipeContext, force_first_page:boolean, current_User:Models.User, callback?:()=>void) {
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
      Api.get_Recipe_Meal_Recipes(self.props.entity, Recipe_Meal_Recipe_page_index(self), Recipe_Meal_Recipe_page_size(self), Recipe_Meal_Recipe_search_query(self)).then(Meals =>
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

export function load_relation_Recipe_PreparationTime_Recipe(self:RecipeContext, force_first_page:boolean, current_User:Models.User, callback?:()=>void) {
  let state = self.state()
  let prelude = force_first_page && state.PreparationTime != "loading" ?
    (c:() => void) => state.PreparationTime != "loading" && self.setState({
      ...state,
      PreparationTime: {...state.PreparationTime, PageIndex:0 }
    }, c)
    :
    (c:() => void) => c()
  Permissions.can_view_PreparationTime(current_User) ?
    prelude(() =>
      Api.get_Recipe_PreparationTime_Recipes(self.props.entity, Recipe_PreparationTime_Recipe_page_index(self), Recipe_PreparationTime_Recipe_page_size(self), Recipe_PreparationTime_Recipe_search_query(self)).then(PreparationTimes =>
        self.setState({...self.state(), update_count:self.state().update_count+1,
            PreparationTime:Utils.raw_page_to_paginated_items<Models.PreparationTime, Utils.EntityAndSize<Models.PreparationTime> & { shown_relation:string }>((i, i_just_created) => {
              let state = self.state()
              return {
                element:i,
                size: state.PreparationTime != "loading" ?
                  (state.PreparationTime.Items.has(i.Id) ?
                    state.PreparationTime.Items.get(i.Id).size
                  :
                    "preview" /* i_just_created ? "large" : "preview" */)
                  :
                    "preview" /* i_just_created ? "large" : "preview" */,
                shown_relation:"all"}}, PreparationTimes)
            }, callback)))
    :
      prelude(() => callback && callback())
}

export function load_relation_Recipe_User_Recipe(self:RecipeContext, force_first_page:boolean, current_User:Models.User, callback?:()=>void) {
  let state = self.state()
  let prelude = force_first_page && state.User != "loading" ?
    (c:() => void) => state.User != "loading" && self.setState({
      ...state,
      User: {...state.User, PageIndex:0 }
    }, c)
    :
    (c:() => void) => c()
  Permissions.can_view_User(current_User) ?
    prelude(() =>
      Api.get_Recipe_User_Recipes(self.props.entity, Recipe_User_Recipe_page_index(self), Recipe_User_Recipe_page_size(self), Recipe_User_Recipe_search_query(self)).then(Users =>
        self.setState({...self.state(), update_count:self.state().update_count+1,
            User:Utils.raw_page_to_paginated_items<Models.User, Utils.EntityAndSize<Models.User> & { shown_relation:string }>((i, i_just_created) => {
              let state = self.state()
              return {
                element:i,
                size: state.User != "loading" ?
                  (state.User.Items.has(i.Id) ?
                    state.User.Items.get(i.Id).size
                  :
                    "preview" /* i_just_created ? "large" : "preview" */)
                  :
                    "preview" /* i_just_created ? "large" : "preview" */,
                shown_relation:"all"}}, Users)
            }, callback)))
    :
      prelude(() => callback && callback())
}

export function load_relation_Recipe_Recipe_Rating(self:RecipeContext, force_first_page:boolean, current_User:Models.User, callback?:()=>void) {
  let state = self.state()
  let prelude = force_first_page && state.Rating != "loading" ?
    (c:() => void) => state.Rating != "loading" && self.setState({
      ...state,
      Rating: {...state.Rating, PageIndex:0 }
    }, c)
    :
    (c:() => void) => c()
  Permissions.can_view_Rating(current_User) ?
    prelude(() =>
      Api.get_Recipe_Recipe_Ratings(self.props.entity, Recipe_Recipe_Rating_page_index(self), Recipe_Recipe_Rating_page_size(self), Recipe_Recipe_Rating_search_query(self)).then(Ratings =>
        self.setState({...self.state(), update_count:self.state().update_count+1,
            Rating:Utils.raw_page_to_paginated_items<Models.Rating, Utils.EntityAndSize<Models.Rating> & { shown_relation:string }>((i, i_just_created) => {
              let state = self.state()
              return {
                element:i,
                size: state.Rating != "loading" ?
                  (state.Rating.Items.has(i.Id) ?
                    state.Rating.Items.get(i.Id).size
                  :
                    "preview" /* i_just_created ? "large" : "preview" */)
                  :
                    "preview" /* i_just_created ? "large" : "preview" */,
                shown_relation:"all"}}, Ratings)
            }, callback)))
    :
      prelude(() => callback && callback())
}

export function load_relation_Recipe_RecommendationPage_Recipe(self:RecipeContext, force_first_page:boolean, current_User:Models.User, callback?:()=>void) {
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
      Api.get_Recipe_RecommendationPage_Recipes(self.props.entity, Recipe_RecommendationPage_Recipe_page_index(self), Recipe_RecommendationPage_Recipe_page_size(self), Recipe_RecommendationPage_Recipe_search_query(self)).then(RecommendationPages =>
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

export function load_relation_Recipe_Homepage_Recipe(self:RecipeContext, force_first_page:boolean, current_User:Models.User, callback?:()=>void) {
  let state = self.state()
  let prelude = force_first_page && state.Homepage != "loading" ?
    (c:() => void) => state.Homepage != "loading" && self.setState({
      ...state,
      Homepage: {...state.Homepage, PageIndex:0 }
    }, c)
    :
    (c:() => void) => c()
  Permissions.can_view_Homepage(current_User) ?
    prelude(() =>
      Api.get_Recipe_Homepage_Recipes(self.props.entity, Recipe_Homepage_Recipe_page_index(self), Recipe_Homepage_Recipe_page_size(self), Recipe_Homepage_Recipe_search_query(self)).then(Homepages =>
        self.setState({...self.state(), update_count:self.state().update_count+1,
            Homepage:Utils.raw_page_to_paginated_items<Models.Homepage, Utils.EntityAndSize<Models.Homepage> & { shown_relation:string }>((i, i_just_created) => {
              let state = self.state()
              return {
                element:i,
                size: state.Homepage != "loading" ?
                  (state.Homepage.Items.has(i.Id) ?
                    state.Homepage.Items.get(i.Id).size
                  :
                    "preview" /* i_just_created ? "large" : "preview" */)
                  :
                    "preview" /* i_just_created ? "large" : "preview" */,
                shown_relation:"all"}}, Homepages)
            }, callback)))
    :
      prelude(() => callback && callback())
}

export function load_relations_Recipe(self, current_User:Models.User, callback?:()=>void) {
  load_relation_Recipe_Homepage_Recipe(self, false, self.props.current_User, 
        () => load_relation_Recipe_RecommendationPage_Recipe(self, false, self.props.current_User, 
        () => load_relation_Recipe_Recipe_Rating(self, false, self.props.current_User, 
        () => load_relation_Recipe_User_Recipe(self, false, self.props.current_User, 
        () => load_relation_Recipe_PreparationTime_Recipe(self, false, self.props.current_User, 
        () => load_relation_Recipe_Meal_Recipe(self, false, self.props.current_User, 
        () => callback && callback()))))))
}

export function set_size_Recipe(self:RecipeContext, new_size:Utils.EntitySize) {
  self.props.set_size(new_size, () => {
    if (new_size == "fullscreen")
      self.props.push(Recipe_to_page(self.props.entity.Id))
  })
}

export function render_Recipe_Name_editable_minimised(self:RecipeContext) : JSX.Element {
  if (!Permissions.can_edit_Recipe(self.props.current_User)) return render_Recipe_Name_minimised(self)
  else
    return !Permissions.can_view_Recipe_Name(self.props.current_User) ? <div /> :
          <div className="model__attribute name">
  <label className="attribute-label attribute-label-name">{i18next.t(`Recipe:Name`, {context: self.props.inline ? "inline" : ""})}</label>
  <div className="model__attribute-content">
    { Components.String(
        self.props.is_editable && Permissions.can_edit_Recipe(self.props.current_User) && Permissions.can_edit_Recipe_Name(self.props.current_User),
        self.props.mode,
        () => self.props.entity.Name,
        v => self.props.set_entity({...self.props.entity, Name:v})) } 
  </div>
</div>
}

export function render_Recipe_Ingredients_editable_minimised(self:RecipeContext) : JSX.Element {
  if (!Permissions.can_edit_Recipe(self.props.current_User)) return render_Recipe_Ingredients_minimised(self)
  else
    return !Permissions.can_view_Recipe_Ingredients(self.props.current_User) ? <div /> :
          <div className="model__attribute ingredients">
  <label className="attribute-label attribute-label-ingredients">{i18next.t(`Recipe:Ingredients`, {context: self.props.inline ? "inline" : ""})}</label>
  <div className="model__attribute-content">
    { Components.String(
        self.props.is_editable && Permissions.can_edit_Recipe(self.props.current_User) && Permissions.can_edit_Recipe_Ingredients(self.props.current_User),
        self.props.mode,
        () => self.props.entity.Ingredients,
        v => self.props.set_entity({...self.props.entity, Ingredients:v})) } 
  </div>
</div>
}

export function render_Recipe_Description_editable_minimised(self:RecipeContext) : JSX.Element {
  if (!Permissions.can_edit_Recipe(self.props.current_User)) return render_Recipe_Description_minimised(self)
  else
    return !Permissions.can_view_Recipe_Description(self.props.current_User) ? <div /> :
          <div className="model__attribute description">
  <label className="attribute-label attribute-label-description">{i18next.t(`Recipe:Description`, {context: self.props.inline ? "inline" : ""})}</label>
  <div className="model__attribute-content">
    { Components.String(
        self.props.is_editable && Permissions.can_edit_Recipe(self.props.current_User) && Permissions.can_edit_Recipe_Description(self.props.current_User),
        self.props.mode,
        () => self.props.entity.Description,
        v => self.props.set_entity({...self.props.entity, Description:v})) } 
  </div>
</div>
}

export function render_Recipe_Picture_editable_minimised(self:RecipeContext) : JSX.Element {
  if (!Permissions.can_edit_Recipe(self.props.current_User)) return render_Recipe_Picture_minimised(self)
  else
    return !Permissions.can_view_Recipe_Picture(self.props.current_User) ? <div /> :
          <div className="model__attribute picture">
  <label className="attribute-label attribute-label-picture">{i18next.t(`Recipe:Picture`, {context: self.props.inline ? "inline" : ""})}</label>
  <div className="model__attribute-content">
    { Components.Image(
        self.props.is_editable && Permissions.can_edit_Recipe(self.props.current_User) && Permissions.can_edit_Recipe_Picture(self.props.current_User),
        self.props.mode,
        () => Api.get_Recipe_Picture(self.props.entity),
        (new_src:string) => Api.update_Recipe_Picture(self.props.entity, new_src)) }
  </div>
</div>
}


export function render_Recipe_Name_editable_maximised(self:RecipeContext) : JSX.Element {
  if (!Permissions.can_edit_Recipe(self.props.current_User)) return render_Recipe_Name_maximised(self)
  else
    return !Permissions.can_view_Recipe_Name(self.props.current_User) ? <div /> :
          <div className="model__attribute name">
  <label className="attribute-label attribute-label-name">{i18next.t(`Recipe:Name`, {context: self.props.inline ? "inline" : ""})}</label>
  <div className="model__attribute-content">
    { Components.String(
        self.props.is_editable && Permissions.can_edit_Recipe(self.props.current_User) && Permissions.can_edit_Recipe_Name(self.props.current_User),
        self.props.mode,
        () => self.props.entity.Name,
        v => self.props.set_entity({...self.props.entity, Name:v})) } 
  </div>
</div>
}

export function render_Recipe_Ingredients_editable_maximised(self:RecipeContext) : JSX.Element {
  if (!Permissions.can_edit_Recipe(self.props.current_User)) return render_Recipe_Ingredients_maximised(self)
  else
    return !Permissions.can_view_Recipe_Ingredients(self.props.current_User) ? <div /> :
          <div className="model__attribute ingredients">
  <label className="attribute-label attribute-label-ingredients">{i18next.t(`Recipe:Ingredients`, {context: self.props.inline ? "inline" : ""})}</label>
  <div className="model__attribute-content">
    { Components.String(
        self.props.is_editable && Permissions.can_edit_Recipe(self.props.current_User) && Permissions.can_edit_Recipe_Ingredients(self.props.current_User),
        self.props.mode,
        () => self.props.entity.Ingredients,
        v => self.props.set_entity({...self.props.entity, Ingredients:v})) } 
  </div>
</div>
}

export function render_Recipe_Description_editable_maximised(self:RecipeContext) : JSX.Element {
  if (!Permissions.can_edit_Recipe(self.props.current_User)) return render_Recipe_Description_maximised(self)
  else
    return !Permissions.can_view_Recipe_Description(self.props.current_User) ? <div /> :
          <div className="model__attribute description">
  <label className="attribute-label attribute-label-description">{i18next.t(`Recipe:Description`, {context: self.props.inline ? "inline" : ""})}</label>
  <div className="model__attribute-content">
    { Components.String(
        self.props.is_editable && Permissions.can_edit_Recipe(self.props.current_User) && Permissions.can_edit_Recipe_Description(self.props.current_User),
        self.props.mode,
        () => self.props.entity.Description,
        v => self.props.set_entity({...self.props.entity, Description:v})) } 
  </div>
</div>
}

export function render_Recipe_Picture_editable_maximised(self:RecipeContext) : JSX.Element {
  if (!Permissions.can_edit_Recipe(self.props.current_User)) return render_Recipe_Picture_maximised(self)
  else
    return !Permissions.can_view_Recipe_Picture(self.props.current_User) ? <div /> :
          <div className="model__attribute picture">
  <label className="attribute-label attribute-label-picture">{i18next.t(`Recipe:Picture`, {context: self.props.inline ? "inline" : ""})}</label>
  <div className="model__attribute-content">
    { Components.Image(
        self.props.is_editable && Permissions.can_edit_Recipe(self.props.current_User) && Permissions.can_edit_Recipe_Picture(self.props.current_User),
        self.props.mode,
        () => Api.get_Recipe_Picture(self.props.entity),
        (new_src:string) => Api.update_Recipe_Picture(self.props.entity, new_src)) }
  </div>
</div>
}


export function render_editable_attributes_minimised_Recipe(self:RecipeContext) {
  let attributes = (<div>
      {render_Recipe_Name_editable_minimised(self)}
        {render_Recipe_Ingredients_editable_minimised(self)}
        {render_Recipe_Description_editable_minimised(self)}
        {render_Recipe_Picture_editable_minimised(self)}
    </div>)
  return attributes
}

export function render_editable_attributes_maximised_Recipe(self:RecipeContext) {
    let state = self.state()
    let attributes = (<div>
        {render_Recipe_Name_editable_maximised(self)}
        {render_Recipe_Ingredients_editable_maximised(self)}
        {render_Recipe_Description_editable_maximised(self)}
        {render_Recipe_Picture_editable_maximised(self)}
        
        
        
      </div>)
    return attributes
  }

export function render_breadcrumb_Recipe(self:RecipeContext) {
  return <div className="breadcrumb-recipe">Recipe</div>
}

export function render_menu_Recipe(self:RecipeContext) {
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
                  <div className={`menu_entry active`}>
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

export function render_local_menu_Recipe(self:RecipeContext) {
  let state = self.state()
  return <div className="local-menu">
          <div className="local_menu_entries">
            <div className={`local_menu_entry${self.props.shown_relation == "none" ? " local_menu_entry--active" : ""}`}>
              <a onClick={() =>
                  self.props.set_shown_relation("none")
              }>
                {i18next.t('About this Recipe')}
              </a>
            </div>
          
            {!Permissions.can_view_PreparationTime(self.props.current_User) ? null :
                  <div key={"PreparationTime_Recipe"} className={`local_menu_entry${self.props.shown_relation == "PreparationTime_Recipe" ? " local_menu_entry--active" : ""}`}>
                    <a onClick={() =>
                      load_relation_Recipe_PreparationTime_Recipe(self,
                        false,
                        self.props.current_User, 
                        () => self.props.set_shown_relation("PreparationTime_Recipe"))
                    }>
                      {i18next.t('PreparationTime_Recipes_inverted')}
                    </a>
                  </div>
                }
        {!Permissions.can_view_Rating(self.props.current_User) ? null :
                  <div key={"Recipe_Rating"} className={`local_menu_entry${self.props.shown_relation == "Recipe_Rating" ? " local_menu_entry--active" : ""}`}>
                    <a onClick={() =>
                      load_relation_Recipe_Recipe_Rating(self,
                        false,
                        self.props.current_User, 
                        () => self.props.set_shown_relation("Recipe_Rating"))
                    }>
                      {i18next.t('Recipe_Ratings')}
                    </a>
                  </div>
                }  
          </div>
        </div>
}

export function render_controls_Recipe(self:RecipeContext) {
  return <div className="control">
    {self.props.allow_maximisation && self.props.set_size ? <a className={`"recipe button button--toggle ${self.props.size != 'preview' ? 'button--toggle--open' : ''}`}
          onClick={() => {
            set_size_Recipe(self, self.props.size == "preview" ? "large" : "preview")}
          }>
      </a> : null}
    {self.props.allow_fullscreen && self.props.set_size ? <a className="recipe button button--fullscreen"
        onClick={() => set_size_Recipe(self, self.props.size == "fullscreen" ? "large" : "fullscreen")}>
      </a> : null}
    {Permissions.can_delete_Recipe(self.props.current_User) && self.props.size == "fullscreen" ? <a className="button button--delete"
      onClick={() => confirm(i18next.t('Are you sure?')) &&
        Api.delete_Recipe(self.props.entity).then(() => self.props.force_reload(() => self.props.pop()))
      }>
    </a> : null}
    {self.props.size == "fullscreen" && self.props.pages_count > 0 ? <a className="recipe button button--close"
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

export function render_content_Recipe(self:RecipeContext) {
  let actions:Array<()=>void> =
    [
      self.props.allow_maximisation && self.props.set_size && self.props.size == "preview" ?
        () => set_size_Recipe(self, self.props.size == "preview" ? "large" : "preview")
      :
        null,self.props.allow_fullscreen && self.props.set_size && self.props.size == "preview" ?
        () => set_size_Recipe(self, self.props.size == "fullscreen" ? "large" : "fullscreen")
      :
        null,
    ].filter(a => a != null)
  let content =
    Permissions.can_view_Recipe(self.props.current_User) ?
      self.props.size == "preview" ?
        render_preview_Recipe(self)
      : self.props.size == "large" ?
        render_large_Recipe(self)
      : self.props.size == "fullscreen" ?
        render_large_Recipe(self)
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

export function render_Recipe_Name_minimised(self:RecipeContext) : JSX.Element {
      return !Permissions.can_view_Recipe_Name(self.props.current_User) ? null : <div className="model__attribute name">
  <label className="attribute-label attribute-label-name">{i18next.t(`Recipe:Name`, {context: self.props.inline ? "inline" : ""})}</label>
  <div className="model__attribute-content">
    { Components.String(
        self.props.is_editable && Permissions.can_edit_Recipe(self.props.current_User) && Permissions.can_edit_Recipe_Name(self.props.current_User),
        self.props.mode,
        () => self.props.entity.Name,
        v => self.props.set_entity({...self.props.entity, Name:v})) } 
  </div>
</div>
      
}
        export function render_Recipe_Ingredients_minimised(self:RecipeContext) : JSX.Element {
      return !Permissions.can_view_Recipe_Ingredients(self.props.current_User) ? null : <div className="model__attribute ingredients">
  <label className="attribute-label attribute-label-ingredients">{i18next.t(`Recipe:Ingredients`, {context: self.props.inline ? "inline" : ""})}</label>
  <div className="model__attribute-content">
    { Components.String(
        self.props.is_editable && Permissions.can_edit_Recipe(self.props.current_User) && Permissions.can_edit_Recipe_Ingredients(self.props.current_User),
        self.props.mode,
        () => self.props.entity.Ingredients,
        v => self.props.set_entity({...self.props.entity, Ingredients:v})) } 
  </div>
</div>
      
}
        export function render_Recipe_Description_minimised(self:RecipeContext) : JSX.Element {
      return !Permissions.can_view_Recipe_Description(self.props.current_User) ? null : <div className="model__attribute description">
  <label className="attribute-label attribute-label-description">{i18next.t(`Recipe:Description`, {context: self.props.inline ? "inline" : ""})}</label>
  <div className="model__attribute-content">
    { Components.String(
        self.props.is_editable && Permissions.can_edit_Recipe(self.props.current_User) && Permissions.can_edit_Recipe_Description(self.props.current_User),
        self.props.mode,
        () => self.props.entity.Description,
        v => self.props.set_entity({...self.props.entity, Description:v})) } 
  </div>
</div>
      
}
        export function render_Recipe_Picture_minimised(self:RecipeContext) : JSX.Element {
      return !Permissions.can_view_Recipe_Picture(self.props.current_User) ? null : <div className="model__attribute picture">
  <label className="attribute-label attribute-label-picture">{i18next.t(`Recipe:Picture`, {context: self.props.inline ? "inline" : ""})}</label>
  <div className="model__attribute-content">
    { Components.Image(
        self.props.is_editable && Permissions.can_edit_Recipe(self.props.current_User) && Permissions.can_edit_Recipe_Picture(self.props.current_User),
        self.props.mode,
        () => Api.get_Recipe_Picture(self.props.entity),
        (new_src:string) => Api.update_Recipe_Picture(self.props.entity, new_src)) }
  </div>
</div>
      
}

export function render_Recipe_Name_maximised(self:RecipeContext) : JSX.Element {
        return !Permissions.can_view_Recipe_Name(self.props.current_User) ? null : <div className="model__attribute name">
  <label className="attribute-label attribute-label-name">{i18next.t(`Recipe:Name`, {context: self.props.inline ? "inline" : ""})}</label>
  <div className="model__attribute-content">
    { Components.String(
        self.props.is_editable && Permissions.can_edit_Recipe(self.props.current_User) && Permissions.can_edit_Recipe_Name(self.props.current_User),
        self.props.mode,
        () => self.props.entity.Name,
        v => self.props.set_entity({...self.props.entity, Name:v})) } 
  </div>
</div>
}
        export function render_Recipe_Ingredients_maximised(self:RecipeContext) : JSX.Element {
        return !Permissions.can_view_Recipe_Ingredients(self.props.current_User) ? null : <div className="model__attribute ingredients">
  <label className="attribute-label attribute-label-ingredients">{i18next.t(`Recipe:Ingredients`, {context: self.props.inline ? "inline" : ""})}</label>
  <div className="model__attribute-content">
    { Components.String(
        self.props.is_editable && Permissions.can_edit_Recipe(self.props.current_User) && Permissions.can_edit_Recipe_Ingredients(self.props.current_User),
        self.props.mode,
        () => self.props.entity.Ingredients,
        v => self.props.set_entity({...self.props.entity, Ingredients:v})) } 
  </div>
</div>
}
        export function render_Recipe_Description_maximised(self:RecipeContext) : JSX.Element {
        return !Permissions.can_view_Recipe_Description(self.props.current_User) ? null : <div className="model__attribute description">
  <label className="attribute-label attribute-label-description">{i18next.t(`Recipe:Description`, {context: self.props.inline ? "inline" : ""})}</label>
  <div className="model__attribute-content">
    { Components.String(
        self.props.is_editable && Permissions.can_edit_Recipe(self.props.current_User) && Permissions.can_edit_Recipe_Description(self.props.current_User),
        self.props.mode,
        () => self.props.entity.Description,
        v => self.props.set_entity({...self.props.entity, Description:v})) } 
  </div>
</div>
}
        export function render_Recipe_Picture_maximised(self:RecipeContext) : JSX.Element {
        return !Permissions.can_view_Recipe_Picture(self.props.current_User) ? null : <div className="model__attribute picture">
  <label className="attribute-label attribute-label-picture">{i18next.t(`Recipe:Picture`, {context: self.props.inline ? "inline" : ""})}</label>
  <div className="model__attribute-content">
    { Components.Image(
        self.props.is_editable && Permissions.can_edit_Recipe(self.props.current_User) && Permissions.can_edit_Recipe_Picture(self.props.current_User),
        self.props.mode,
        () => Api.get_Recipe_Picture(self.props.entity),
        (new_src:string) => Api.update_Recipe_Picture(self.props.entity, new_src)) }
  </div>
</div>
}

export function render_preview_Recipe(self:RecipeContext) {
  let attributes:JSX.Element = null
  if (self.props.mode == "view" || !Permissions.can_edit_Recipe(self.props.current_User))
    attributes = (<div className="model__attributes">
      { render_Recipe_Name_minimised(self) }
        { render_Recipe_Ingredients_minimised(self) }
        { render_Recipe_Description_minimised(self) }
        { render_Recipe_Picture_minimised(self) }
    </div>)
  else
    attributes = render_editable_attributes_minimised_Recipe(self)
  return (<div className="block">
      {attributes}
    </div>)
}

export function render_large_Recipe(self:RecipeContext) {
  let state = self.state()
  let attributes:JSX.Element = null
  if (self.props.mode == "view" || !Permissions.can_edit_Recipe(self.props.current_User))
    attributes = (<div className="model__attributes">
      { render_Recipe_Name_maximised(self) }
        { render_Recipe_Ingredients_maximised(self) }
        { render_Recipe_Description_maximised(self) }
        { render_Recipe_Picture_maximised(self) }
        
    </div>)
  else
    attributes = render_editable_attributes_maximised_Recipe(self)
  return (<div className="block">
      {self.props.nesting_depth == 0 && self.props.shown_relation != "all" && self.props.shown_relation != "none" ? null : attributes}
      {render_relations_Recipe(self)}
    </div>)
}


export function render_Recipe_Meal_Recipe(self:RecipeContext, context:"presentation_structure"|"default") {
  if ((context == "default" && self.props.shown_relation != "all" && self.props.shown_relation != "Meal_Recipe") || !Permissions.can_view_Meal(self.props.current_User))
    return null
  let state = self.state()
  return <div>
    
    { List.render_relation("recipe_meal_recipe",
   "Recipe",
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
      Recipe_Meal_Recipe_page_index(self),
      Recipe_Meal_Recipe_num_pages(self),
      new_page_index => {
          let state = self.state()
          state.Meal != "loading" &&
          self.setState({...self.state(),
            update_count:self.state().update_count+1,
            Meal: {
              ...state.Meal,
              PageIndex:new_page_index
            }
          }, () =>  load_relation_Recipe_Meal_Recipe(self, false, self.props.current_User))
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
                  mode:self.props.mode == "edit" && (Permissions.can_edit_Meal_Recipe(self.props.current_User)
                        || Permissions.can_create_Meal_Recipe(self.props.current_User)
                        || Permissions.can_delete_Meal_Recipe(self.props.current_User)) ?
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
                  unlink: !Permissions.can_delete_Meal_Recipe(self.props.current_User) ?
                    null
                    :
                    () => confirm(i18next.t('Are you sure?')) && Api.unlink_Meal_Meal_Recipes(i.element, self.props.entity).then(() =>
                      load_relation_Recipe_Meal_Recipe(self, false, self.props.current_User))
                })
              }
            </div>
          </div>
        },
      () =>
        <div>
          {Permissions.can_create_Meal(self.props.current_User) && Permissions.can_create_Meal_Recipe(self.props.current_User) && Recipe_Meal_Recipe_can_create(self) ? render_new_Recipe_Meal_Recipe(self) : null}
          {Permissions.can_create_Meal_Recipe(self.props.current_User) ? render_add_existing_Recipe_Meal_Recipe(self) : null}
        </div>)
    }
    
    </div>
}


export function render_Recipe_PreparationTime_Recipe(self:RecipeContext, context:"presentation_structure"|"default") {
  if ((context == "default" && self.props.shown_relation != "all" && self.props.shown_relation != "PreparationTime_Recipe") || !Permissions.can_view_PreparationTime(self.props.current_User))
    return null
  let state = self.state()
  return <div>
    
    { List.render_relation("recipe_preparationtime_recipe",
   "Recipe",
   "PreparationTime",
   "PreparationTimes",
   self.props.nesting_depth > 0,
   false,
   false,
   false)
  (
      state.PreparationTime != "loading" ?
        state.PreparationTime.IdsInServerOrder.map(id => state.PreparationTime != "loading" && state.PreparationTime.Items.get(id)):
        state.PreparationTime,
      Recipe_PreparationTime_Recipe_page_index(self),
      Recipe_PreparationTime_Recipe_num_pages(self),
      new_page_index => {
          let state = self.state()
          state.PreparationTime != "loading" &&
          self.setState({...self.state(),
            update_count:self.state().update_count+1,
            PreparationTime: {
              ...state.PreparationTime,
              PageIndex:new_page_index
            }
          }, () =>  load_relation_Recipe_PreparationTime_Recipe(self, false, self.props.current_User))
        },
      (i,_) => {
          let i_id = i.element.Id
          let state = self.state()
          return <div key={i_id}
            className={`model-nested__item ${i.size != "preview" ? "model-nested__item--open" : ""}
                        ${state.PreparationTime != "loading" && state.PreparationTime.JustCreated.has(i_id) && state.PreparationTime.JustCreated.get(i_id) ? "newly-created" : ""}` }
          
            >
            <div key={i_id}>
              {
                PreparationTimeViews.PreparationTime({
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
                  is_editable:state.PreparationTime != "loading" && state.PreparationTime.Editable.get(i_id),
                  shown_relation:i.shown_relation,
                  set_shown_relation:(new_shown_relation:string, callback) => {
                    let state = self.state()
                    state.PreparationTime != "loading" &&
                    self.setState({...self.state(),
                      PreparationTime:
                        {
                          ...state.PreparationTime,
                          Items:state.PreparationTime.Items.set(i_id,{...state.PreparationTime.Items.get(i_id), shown_relation:new_shown_relation})
                        }
                    }, callback)
                  },
                  nested_entity_names: self.props.nested_entity_names.push("PreparationTime"),
                  
                  set_size:(new_size:Utils.EntitySize, callback) => {
                    let new_shown_relation = new_size == "large" ? "all" : i.shown_relation
                    let state = self.state()
                    state.PreparationTime != "loading" &&
                    self.setState({...self.state(),
                      PreparationTime:
                        {
                          ...state.PreparationTime,
                          Items:state.PreparationTime.Items.set(i_id,
                            {...state.PreparationTime.Items.get(i_id),
                              size:new_size, shown_relation:new_shown_relation})
                        }
                    }, callback)
                  },
                    
                  toggle_button:undefined,
                  set_mode:undefined,
                  set_entity:(new_entity:Models.PreparationTime, callback?:()=>void, force_update_count_increment?:boolean) => {
                    let state = self.state()
                    state.PreparationTime != "loading" &&
                    self.setState({...self.state(),
                      dirty_PreparationTime:state.dirty_PreparationTime.set(i_id, new_entity),
                      update_count:force_update_count_increment ? self.state().update_count+1 : state.update_count,
                      PreparationTime:
                        {
                          ...state.PreparationTime,
                          Items:state.PreparationTime.Items.set(i_id,{...state.PreparationTime.Items.get(i_id), element:new_entity})
                        }
                    }, callback)
                  },
                  delete: undefined,
                  unlink: !Permissions.can_delete_PreparationTime_Recipe(self.props.current_User) ?
                    null
                    :
                    () => confirm(i18next.t('Are you sure?')) && Api.unlink_PreparationTime_PreparationTime_Recipes(i.element, self.props.entity).then(() =>
                      load_relation_Recipe_PreparationTime_Recipe(self, false, self.props.current_User))
                })
              }
            </div>
          </div>
        },
      () =>
        <div>
          {Permissions.can_create_PreparationTime(self.props.current_User) && Permissions.can_create_PreparationTime_Recipe(self.props.current_User) && Recipe_PreparationTime_Recipe_can_create(self) ? render_new_Recipe_PreparationTime_Recipe(self) : null}
          {Permissions.can_create_PreparationTime_Recipe(self.props.current_User) ? render_add_existing_Recipe_PreparationTime_Recipe(self) : null}
        </div>)
    }
    
    </div>
}


export function render_Recipe_User_Recipe(self:RecipeContext, context:"presentation_structure"|"default") {
  if ((context == "default" && self.props.shown_relation != "all" && self.props.shown_relation != "User_Recipe") || !Permissions.can_view_User(self.props.current_User))
    return null
  let state = self.state()
  return <div>
    
    { List.render_relation("recipe_user_recipe",
   "Recipe",
   "User",
   "Users",
   self.props.nesting_depth > 0,
   false,
   false,
   false)
  (
      state.User != "loading" ?
        state.User.IdsInServerOrder.map(id => state.User != "loading" && state.User.Items.get(id)):
        state.User,
      Recipe_User_Recipe_page_index(self),
      Recipe_User_Recipe_num_pages(self),
      new_page_index => {
          let state = self.state()
          state.User != "loading" &&
          self.setState({...self.state(),
            update_count:self.state().update_count+1,
            User: {
              ...state.User,
              PageIndex:new_page_index
            }
          }, () =>  load_relation_Recipe_User_Recipe(self, false, self.props.current_User))
        },
      (i,_) => {
          let i_id = i.element.Id
          let state = self.state()
          return <div key={i_id}
            className={`model-nested__item ${i.size != "preview" ? "model-nested__item--open" : ""}
                        ${state.User != "loading" && state.User.JustCreated.has(i_id) && state.User.JustCreated.get(i_id) ? "newly-created" : ""}` }
          
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
                  mode:self.props.mode == "edit" && (Permissions.can_edit_User_Recipe(self.props.current_User)
                        || Permissions.can_create_User_Recipe(self.props.current_User)
                        || Permissions.can_delete_User_Recipe(self.props.current_User)) ?
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
                  unlink: !Permissions.can_delete_User_Recipe(self.props.current_User) ?
                    null
                    :
                    () => confirm(i18next.t('Are you sure?')) && Api.unlink_User_User_Recipes(i.element, self.props.entity).then(() =>
                      load_relation_Recipe_User_Recipe(self, false, self.props.current_User))
                })
              }
            </div>
          </div>
        },
      () =>
        <div>
          {Permissions.can_create_User(self.props.current_User) && Permissions.can_create_User_Recipe(self.props.current_User) && Recipe_User_Recipe_can_create(self) ? render_new_Recipe_User_Recipe(self) : null}
          {Permissions.can_create_User_Recipe(self.props.current_User) ? render_add_existing_Recipe_User_Recipe(self) : null}
        </div>)
    }
    
    </div>
}


export function render_Recipe_Recipe_Rating(self:RecipeContext, context:"presentation_structure"|"default") {
  if ((context == "default" && self.props.shown_relation != "all" && self.props.shown_relation != "Recipe_Rating") || !Permissions.can_view_Rating(self.props.current_User))
    return null
  let state = self.state()
  return <div>
    
    { List.render_relation("recipe_recipe_rating",
   "Recipe",
   "Rating",
   "Ratings",
   self.props.nesting_depth > 0,
   false,
   false,
   false)
  (
      state.Rating != "loading" ?
        state.Rating.IdsInServerOrder.map(id => state.Rating != "loading" && state.Rating.Items.get(id)):
        state.Rating,
      Recipe_Recipe_Rating_page_index(self),
      Recipe_Recipe_Rating_num_pages(self),
      new_page_index => {
          let state = self.state()
          state.Rating != "loading" &&
          self.setState({...self.state(),
            update_count:self.state().update_count+1,
            Rating: {
              ...state.Rating,
              PageIndex:new_page_index
            }
          }, () =>  load_relation_Recipe_Recipe_Rating(self, false, self.props.current_User))
        },
      (i,_) => {
          let i_id = i.element.Id
          let state = self.state()
          return <div key={i_id}
            className={`model-nested__item ${i.size != "preview" ? "model-nested__item--open" : ""}
                        ${state.Rating != "loading" && state.Rating.JustCreated.has(i_id) && state.Rating.JustCreated.get(i_id) ? "newly-created" : ""}` }
          
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
                  mode:self.props.mode == "edit" && (Permissions.can_edit_Recipe_Rating(self.props.current_User)
                        || Permissions.can_create_Recipe_Rating(self.props.current_User)
                        || Permissions.can_delete_Recipe_Rating(self.props.current_User)) ?
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
                  unlink: !Permissions.can_delete_Recipe_Rating(self.props.current_User) ?
                    null
                    :
                    () => confirm(i18next.t('Are you sure?')) && Api.unlink_Recipe_Recipe_Ratings(self.props.entity, i.element).then(() =>
                      load_relation_Recipe_Recipe_Rating(self, false, self.props.current_User))
                })
              }
            </div>
          </div>
        },
      () =>
        <div>
          {Permissions.can_create_Rating(self.props.current_User) && Permissions.can_create_Recipe_Rating(self.props.current_User) && Recipe_Recipe_Rating_can_create(self) ? render_new_Recipe_Recipe_Rating(self) : null}
          {Permissions.can_create_Recipe_Rating(self.props.current_User) ? render_add_existing_Recipe_Recipe_Rating(self) : null}
        </div>)
    }
    
    </div>
}


export function render_Recipe_RecommendationPage_Recipe(self:RecipeContext, context:"presentation_structure"|"default") {
  if ((context == "default" && self.props.shown_relation != "all" && self.props.shown_relation != "RecommendationPage_Recipe") || !Permissions.can_view_RecommendationPage(self.props.current_User))
    return null
  let state = self.state()
  return <div>
    
    { List.render_relation("recipe_recommendationpage_recipe",
   "Recipe",
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
      Recipe_RecommendationPage_Recipe_page_index(self),
      Recipe_RecommendationPage_Recipe_num_pages(self),
      new_page_index => {
          let state = self.state()
          state.RecommendationPage != "loading" &&
          self.setState({...self.state(),
            update_count:self.state().update_count+1,
            RecommendationPage: {
              ...state.RecommendationPage,
              PageIndex:new_page_index
            }
          }, () =>  load_relation_Recipe_RecommendationPage_Recipe(self, false, self.props.current_User))
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
                  mode:self.props.mode == "edit" && (Permissions.can_edit_RecommendationPage_Recipe(self.props.current_User)
                        || Permissions.can_create_RecommendationPage_Recipe(self.props.current_User)
                        || Permissions.can_delete_RecommendationPage_Recipe(self.props.current_User)) ?
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
                  unlink: !Permissions.can_delete_RecommendationPage_Recipe(self.props.current_User) ?
                    null
                    :
                    () => confirm(i18next.t('Are you sure?')) && Api.unlink_RecommendationPage_RecommendationPage_Recipes(i.element, self.props.entity).then(() =>
                      load_relation_Recipe_RecommendationPage_Recipe(self, false, self.props.current_User))
                })
              }
            </div>
          </div>
        },
      () =>
        <div>
          {Permissions.can_create_RecommendationPage(self.props.current_User) && Permissions.can_create_RecommendationPage_Recipe(self.props.current_User) && Recipe_RecommendationPage_Recipe_can_create(self) ? render_new_Recipe_RecommendationPage_Recipe(self) : null}
          {Permissions.can_create_RecommendationPage_Recipe(self.props.current_User) ? render_add_existing_Recipe_RecommendationPage_Recipe(self) : null}
        </div>)
    }
    
    </div>
}


export function render_Recipe_Homepage_Recipe(self:RecipeContext, context:"presentation_structure"|"default") {
  if ((context == "default" && self.props.shown_relation != "all" && self.props.shown_relation != "Homepage_Recipe") || !Permissions.can_view_Homepage(self.props.current_User))
    return null
  let state = self.state()
  return <div>
    
    { List.render_relation("recipe_homepage_recipe",
   "Recipe",
   "Homepage",
   "Homepages",
   self.props.nesting_depth > 0,
   false,
   false,
   false)
  (
      state.Homepage != "loading" ?
        state.Homepage.IdsInServerOrder.map(id => state.Homepage != "loading" && state.Homepage.Items.get(id)):
        state.Homepage,
      Recipe_Homepage_Recipe_page_index(self),
      Recipe_Homepage_Recipe_num_pages(self),
      new_page_index => {
          let state = self.state()
          state.Homepage != "loading" &&
          self.setState({...self.state(),
            update_count:self.state().update_count+1,
            Homepage: {
              ...state.Homepage,
              PageIndex:new_page_index
            }
          }, () =>  load_relation_Recipe_Homepage_Recipe(self, false, self.props.current_User))
        },
      (i,_) => {
          let i_id = i.element.Id
          let state = self.state()
          return <div key={i_id}
            className={`model-nested__item ${i.size != "preview" ? "model-nested__item--open" : ""}
                        ${state.Homepage != "loading" && state.Homepage.JustCreated.has(i_id) && state.Homepage.JustCreated.get(i_id) ? "newly-created" : ""}` }
          
            >
            <div key={i_id}>
              {
                HomepageViews.Homepage({
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
                  is_editable:state.Homepage != "loading" && state.Homepage.Editable.get(i_id),
                  shown_relation:i.shown_relation,
                  set_shown_relation:(new_shown_relation:string, callback) => {
                    let state = self.state()
                    state.Homepage != "loading" &&
                    self.setState({...self.state(),
                      Homepage:
                        {
                          ...state.Homepage,
                          Items:state.Homepage.Items.set(i_id,{...state.Homepage.Items.get(i_id), shown_relation:new_shown_relation})
                        }
                    }, callback)
                  },
                  nested_entity_names: self.props.nested_entity_names.push("Homepage"),
                  
                  set_size:(new_size:Utils.EntitySize, callback) => {
                    let new_shown_relation = new_size == "large" ? "all" : i.shown_relation
                    let state = self.state()
                    state.Homepage != "loading" &&
                    self.setState({...self.state(),
                      Homepage:
                        {
                          ...state.Homepage,
                          Items:state.Homepage.Items.set(i_id,
                            {...state.Homepage.Items.get(i_id),
                              size:new_size, shown_relation:new_shown_relation})
                        }
                    }, callback)
                  },
                    
                  toggle_button:undefined,
                  set_mode:undefined,
                  set_entity:(new_entity:Models.Homepage, callback?:()=>void, force_update_count_increment?:boolean) => {
                    let state = self.state()
                    state.Homepage != "loading" &&
                    self.setState({...self.state(),
                      dirty_Homepage:state.dirty_Homepage.set(i_id, new_entity),
                      update_count:force_update_count_increment ? self.state().update_count+1 : state.update_count,
                      Homepage:
                        {
                          ...state.Homepage,
                          Items:state.Homepage.Items.set(i_id,{...state.Homepage.Items.get(i_id), element:new_entity})
                        }
                    }, callback)
                  },
                  unlink: undefined,
                    delete: !Permissions.can_delete_Homepage(self.props.current_User) || !Recipe_Homepage_Recipe_can_delete(self) ?
                    null
                    :
                    () => confirm(i18next.t('Are you sure?')) && Api.delete_Homepage(i.element).then(() =>
                      load_relation_Recipe_Homepage_Recipe(self, false, self.props.current_User))
                })
              }
            </div>
          </div>
        },
      () =>
        <div>
          
          
        </div>)
    }
    
    </div>
}



export function render_relations_Recipe(self:RecipeContext) {
  return <div className="relations">
      { render_Recipe_PreparationTime_Recipe(self, "default") }
      { render_Recipe_Recipe_Rating(self, "default") }
      
    </div>
}

export function render_add_existing_Recipe_Meal_Recipe(self:RecipeContext) {
    
    let state = self.state()
    return self.props.mode == "edit" ?
      <div className="button__actions">
        {
          state.add_step_Meal != "open" ?
            <Buttons.Add disabled={state.Meal == "loading" ? true : state.Meal.TotalCount >= 1} 
              onClick={() =>
                self.setState({...self.state(), add_step_Meal:"open"}) }
                  target_name={"Meal"} />
          :
          React.createElement(List.AddToRelation,
            {
              relation_name:"recipe_meal_recipe",
              source_name:"Recipe",
              target_name:"Meal",
              target_plural:"Meals",
              page_size:25,
              render_target:(i,i_id) =>
                <div key={i_id} className="group__item">
                  <a className="group__button button button--existing"
                    onClick={() =>
                        self.setState({...self.state(), add_step_Meal:"saving"}, () =>
                          Api.link_Recipe_Meal_Recipes(self.props.entity, i).then(() =>
                            self.setState({...self.state(), add_step_Meal:"closed"}, () =>
                              load_relation_Recipe_Meal_Recipe(self, false, self.props.current_User))))
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
                { name: "Lunch", get: async(i,s) => Api.get_unlinked_Recipe_Meal_Recipes_Lunch(self.props.entity, i, s) }, 
                { name: "Brunch", get: async(i,s) => Api.get_unlinked_Recipe_Meal_Recipes_Brunch(self.props.entity, i, s) }, 
                { name: "Dinner", get: async(i,s) => Api.get_unlinked_Recipe_Meal_Recipes_Dinner(self.props.entity, i, s) }, 
                { name: "Breakfast", get: async(i,s) => Api.get_unlinked_Recipe_Meal_Recipes_Breakfast(self.props.entity, i, s) }
              ]
            })
        }
      </div>
    :
      null
    }
  
export function render_add_existing_Recipe_PreparationTime_Recipe(self:RecipeContext) {
    
    let state = self.state()
    return self.props.mode == "edit" ?
      <div className="button__actions">
        {
          state.add_step_PreparationTime != "open" ?
            <Buttons.Add disabled={state.PreparationTime == "loading" ? true : state.PreparationTime.TotalCount >= 1} 
              onClick={() =>
                self.setState({...self.state(), add_step_PreparationTime:"open"}) }
                  target_name={"PreparationTime"} />
          :
          React.createElement(List.AddToRelation,
            {
              relation_name:"recipe_preparationtime_recipe",
              source_name:"Recipe",
              target_name:"PreparationTime",
              target_plural:"PreparationTimes",
              page_size:25,
              render_target:(i,i_id) =>
                <div key={i_id} className="group__item">
                  <a className="group__button button button--existing"
                    onClick={() =>
                        self.setState({...self.state(), add_step_PreparationTime:"saving"}, () =>
                          Api.link_Recipe_PreparationTime_Recipes(self.props.entity, i).then(() =>
                            self.setState({...self.state(), add_step_PreparationTime:"closed"}, () =>
                              load_relation_Recipe_PreparationTime_Recipe(self, false, self.props.current_User))))
                      }>
                      Add existing
                  </a>
                  <div className="group__title" disabled={true}>
                    {
                      PreparationTimeViews.PreparationTime({
                        ...self.props,
                        entity:i,
                        nesting_depth:self.props.nesting_depth+1,
                        size:"preview",
                        mode:"view",
                        is_editable:false,
                        nested_entity_names: self.props.nested_entity_names.push("PreparationTime"),
                        set_size:undefined,
                        toggle_button:undefined,
                        set_mode:undefined,
                        set_entity:(new_entity:Models.PreparationTime, callback?:()=>void) => {},
                        unlink: undefined,
                        delete: undefined
                      })
                    }
                  </div>
                </div>,
              cancel:() => self.setState({...self.state(), add_step_PreparationTime:"closed"}),
              get_items:[
                { name: "Thirty", get: async(i,s) => Api.get_unlinked_Recipe_PreparationTime_Recipes_Thirty(self.props.entity, i, s) }, 
                { name: "Sixty", get: async(i,s) => Api.get_unlinked_Recipe_PreparationTime_Recipes_Sixty(self.props.entity, i, s) }, 
                { name: "Ninety", get: async(i,s) => Api.get_unlinked_Recipe_PreparationTime_Recipes_Ninety(self.props.entity, i, s) }, 
                { name: "Fifteen", get: async(i,s) => Api.get_unlinked_Recipe_PreparationTime_Recipes_Fifteen(self.props.entity, i, s) }
              ]
            })
        }
      </div>
    :
      null
    }
  
export function render_add_existing_Recipe_User_Recipe(self:RecipeContext) {
    
    let state = self.state()
    return self.props.mode == "edit" ?
      <div className="button__actions">
        {
          state.add_step_User != "open" ?
            <Buttons.Add 
              onClick={() =>
                self.setState({...self.state(), add_step_User:"open"}) }
                  target_name={"User"} />
          :
          React.createElement(List.AddToRelation,
            {
              relation_name:"recipe_user_recipe",
              source_name:"Recipe",
              target_name:"User",
              target_plural:"Users",
              page_size:25,
              render_target:(i,i_id) =>
                <div key={i_id} className="group__item">
                  <a className="group__button button button--existing"
                    onClick={() =>
                        self.setState({...self.state(), add_step_User:"saving"}, () =>
                          Api.link_Recipe_User_Recipes(self.props.entity, i).then(() =>
                            self.setState({...self.state(), add_step_User:"closed"}, () =>
                              load_relation_Recipe_User_Recipe(self, false, self.props.current_User))))
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
                { name: "User", get: async(i,s) => Api.get_unlinked_Recipe_User_Recipes(self.props.entity, i, s) },
              ]
            })
        }
      </div>
    :
      null
    }
  
export function render_add_existing_Recipe_Recipe_Rating(self:RecipeContext) {
    
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
              relation_name:"recipe_recipe_rating",
              source_name:"Recipe",
              target_name:"Rating",
              target_plural:"Ratings",
              page_size:25,
              render_target:(i,i_id) =>
                <div key={i_id} className="group__item">
                  <a className="group__button button button--existing"
                    onClick={() =>
                        self.setState({...self.state(), add_step_Rating:"saving"}, () =>
                          Api.link_Recipe_Recipe_Ratings(self.props.entity, i).then(() =>
                            self.setState({...self.state(), add_step_Rating:"closed"}, () =>
                              load_relation_Recipe_Recipe_Rating(self, false, self.props.current_User))))
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
                { name: "Rating", get: async(i,s) => Api.get_unlinked_Recipe_Recipe_Ratings(self.props.entity, i, s) },
              ]
            })
        }
      </div>
    :
      null
    }
  
export function render_add_existing_Recipe_RecommendationPage_Recipe(self:RecipeContext) {
    
    let state = self.state()
    return self.props.mode == "edit" ?
      <div className="button__actions">
        {
          state.add_step_RecommendationPage != "open" ?
            <Buttons.Add 
              onClick={() =>
                self.setState({...self.state(), add_step_RecommendationPage:"open"}) }
                  target_name={"RecommendationPage"} />
          :
          React.createElement(List.AddToRelation,
            {
              relation_name:"recipe_recommendationpage_recipe",
              source_name:"Recipe",
              target_name:"RecommendationPage",
              target_plural:"RecommendationPages",
              page_size:25,
              render_target:(i,i_id) =>
                <div key={i_id} className="group__item">
                  <a className="group__button button button--existing"
                    onClick={() =>
                        self.setState({...self.state(), add_step_RecommendationPage:"saving"}, () =>
                          Api.link_Recipe_RecommendationPage_Recipes(self.props.entity, i).then(() =>
                            self.setState({...self.state(), add_step_RecommendationPage:"closed"}, () =>
                              load_relation_Recipe_RecommendationPage_Recipe(self, false, self.props.current_User))))
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
                { name: "RecommendationPage", get: async(i,s) => Api.get_unlinked_Recipe_RecommendationPage_Recipes(self.props.entity, i, s) },
              ]
            })
        }
      </div>
    :
      null
    }
  

export function render_new_Recipe_Meal_Recipe(self:RecipeContext) {
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
              <button disabled={state.Meal == "loading" ? true : state.Meal.TotalCount >= 1} 
                      className="new-lunch button button--new"
                      onClick={() =>
                          Api.create_linked_Recipe_Meal_Recipes_Lunch(self.props.entity).then(e => {
                              e.length > 0 &&
                              Api.update_Lunch(
                                ({ ...e[0], Kind:"Lunch", Description:"" } as Models.Lunch)).then(() =>
                                load_relation_Recipe_Meal_Recipe(self, true, self.props.current_User, () =>
                                    self.setState({...self.state(), add_step_Meal:"closed"})
                                  )
                                )
                          })
                      }>
                  {i18next.t('Create new Lunch')}
              </button>
            </div>
            <div className="new-brunch">
              <button disabled={state.Meal == "loading" ? true : state.Meal.TotalCount >= 1} 
                      className="new-brunch button button--new"
                      onClick={() =>
                          Api.create_linked_Recipe_Meal_Recipes_Brunch(self.props.entity).then(e => {
                              e.length > 0 &&
                              Api.update_Brunch(
                                ({ ...e[0], Kind:"Brunch", Description:"" } as Models.Brunch)).then(() =>
                                load_relation_Recipe_Meal_Recipe(self, true, self.props.current_User, () =>
                                    self.setState({...self.state(), add_step_Meal:"closed"})
                                  )
                                )
                          })
                      }>
                  {i18next.t('Create new Brunch')}
              </button>
            </div>
            <div className="new-dinner">
              <button disabled={state.Meal == "loading" ? true : state.Meal.TotalCount >= 1} 
                      className="new-dinner button button--new"
                      onClick={() =>
                          Api.create_linked_Recipe_Meal_Recipes_Dinner(self.props.entity).then(e => {
                              e.length > 0 &&
                              Api.update_Dinner(
                                ({ ...e[0], Kind:"Dinner", Description:"" } as Models.Dinner)).then(() =>
                                load_relation_Recipe_Meal_Recipe(self, true, self.props.current_User, () =>
                                    self.setState({...self.state(), add_step_Meal:"closed"})
                                  )
                                )
                          })
                      }>
                  {i18next.t('Create new Dinner')}
              </button>
            </div>
            <div className="new-breakfast">
              <button disabled={state.Meal == "loading" ? true : state.Meal.TotalCount >= 1} 
                      className="new-breakfast button button--new"
                      onClick={() =>
                          Api.create_linked_Recipe_Meal_Recipes_Breakfast(self.props.entity).then(e => {
                              e.length > 0 &&
                              Api.update_Breakfast(
                                ({ ...e[0], Kind:"Breakfast", Description:"" } as Models.Breakfast)).then(() =>
                                load_relation_Recipe_Meal_Recipe(self, true, self.props.current_User, () =>
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
  
export function render_new_Recipe_PreparationTime_Recipe(self:RecipeContext) {
    let state = self.state()
    return  self.props.mode == "edit" ?
      <div className="button__actions">
        <Buttons.Create target_name={"PreparationTime"} onClick={() => self.setState({...self.state(), add_step_PreparationTime:"creating"})}  />
            {
            state.add_step_PreparationTime != "creating" ?
            null
            :
            <div className="overlay__item overlay__item--new">
              <div className="new-thirty">
              <button disabled={state.PreparationTime == "loading" ? true : state.PreparationTime.TotalCount >= 1} 
                      className="new-thirty button button--new"
                      onClick={() =>
                          Api.create_linked_Recipe_PreparationTime_Recipes_Thirty(self.props.entity).then(e => {
                              e.length > 0 &&
                              Api.update_Thirty(
                                ({ ...e[0], Kind:"Thirty", Description:"" } as Models.Thirty)).then(() =>
                                load_relation_Recipe_PreparationTime_Recipe(self, true, self.props.current_User, () =>
                                    self.setState({...self.state(), add_step_PreparationTime:"closed"})
                                  )
                                )
                          })
                      }>
                  {i18next.t('Create new Thirty')}
              </button>
            </div>
            <div className="new-sixty">
              <button disabled={state.PreparationTime == "loading" ? true : state.PreparationTime.TotalCount >= 1} 
                      className="new-sixty button button--new"
                      onClick={() =>
                          Api.create_linked_Recipe_PreparationTime_Recipes_Sixty(self.props.entity).then(e => {
                              e.length > 0 &&
                              Api.update_Sixty(
                                ({ ...e[0], Kind:"Sixty", Description:"" } as Models.Sixty)).then(() =>
                                load_relation_Recipe_PreparationTime_Recipe(self, true, self.props.current_User, () =>
                                    self.setState({...self.state(), add_step_PreparationTime:"closed"})
                                  )
                                )
                          })
                      }>
                  {i18next.t('Create new Sixty')}
              </button>
            </div>
            <div className="new-ninety">
              <button disabled={state.PreparationTime == "loading" ? true : state.PreparationTime.TotalCount >= 1} 
                      className="new-ninety button button--new"
                      onClick={() =>
                          Api.create_linked_Recipe_PreparationTime_Recipes_Ninety(self.props.entity).then(e => {
                              e.length > 0 &&
                              Api.update_Ninety(
                                ({ ...e[0], Kind:"Ninety", Description:"" } as Models.Ninety)).then(() =>
                                load_relation_Recipe_PreparationTime_Recipe(self, true, self.props.current_User, () =>
                                    self.setState({...self.state(), add_step_PreparationTime:"closed"})
                                  )
                                )
                          })
                      }>
                  {i18next.t('Create new Ninety')}
              </button>
            </div>
            <div className="new-fifteen">
              <button disabled={state.PreparationTime == "loading" ? true : state.PreparationTime.TotalCount >= 1} 
                      className="new-fifteen button button--new"
                      onClick={() =>
                          Api.create_linked_Recipe_PreparationTime_Recipes_Fifteen(self.props.entity).then(e => {
                              e.length > 0 &&
                              Api.update_Fifteen(
                                ({ ...e[0], Kind:"Fifteen", Description:"" } as Models.Fifteen)).then(() =>
                                load_relation_Recipe_PreparationTime_Recipe(self, true, self.props.current_User, () =>
                                    self.setState({...self.state(), add_step_PreparationTime:"closed"})
                                  )
                                )
                          })
                      }>
                  {i18next.t('Create new Fifteen')}
              </button>
            </div>
              <Buttons.Cancel onClick={() => self.setState({...self.state(), add_step_PreparationTime:"closed"})} />
            </div>
            }
        </div>
      :
      null
    }
  
export function render_new_Recipe_User_Recipe(self:RecipeContext) {
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
                          load_relation_Recipe_User_Recipe(self, false, self.props.current_User, () =>
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
              <button 
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
  
export function render_new_Recipe_Recipe_Rating(self:RecipeContext) {
    let state = self.state()
    return  self.props.mode == "edit" ?
      <div className="button__actions">
        <div className="new-rating">
              <button 
                      className="new-rating button button--new"
                      onClick={() =>
                          Api.create_linked_Recipe_Recipe_Ratings_Rating(self.props.entity).then(e => {
                              e.length > 0 &&
                              Api.update_Rating(
                                ({ ...e[0], Number:0 } as Models.Rating)).then(() =>
                                load_relation_Recipe_Recipe_Rating(self, true, self.props.current_User, () =>
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
  
export function render_new_Recipe_RecommendationPage_Recipe(self:RecipeContext) {
    let state = self.state()
    return  self.props.mode == "edit" ?
      <div className="button__actions">
        <div className="new-recommendationpage">
              <button 
                      className="new-recommendationpage button button--new"
                      onClick={() =>
                          Api.create_linked_Recipe_RecommendationPage_Recipes_RecommendationPage(self.props.entity).then(e => {
                              e.length > 0 &&
                              Api.update_RecommendationPage(
                                ({ ...e[0],  } as Models.RecommendationPage)).then(() =>
                                load_relation_Recipe_RecommendationPage_Recipe(self, true, self.props.current_User, () =>
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
  

export function render_saving_animations_Recipe(self:RecipeContext) {
  return self.state().dirty_Meal.count() > 0 ?
    <div style={{position:"fixed", zIndex:10000, top:0, left:0, width:"20px", height:"20px", backgroundColor:"red"}} className="saving"/> : 
    self.state().dirty_PreparationTime.count() > 0 ?
    <div style={{position:"fixed", zIndex:10000, top:0, left:0, width:"20px", height:"20px", backgroundColor:"red"}} className="saving"/> : 
    self.state().dirty_User.count() > 0 ?
    <div style={{position:"fixed", zIndex:10000, top:0, left:0, width:"20px", height:"20px", backgroundColor:"red"}} className="saving"/> : 
    self.state().dirty_Rating.count() > 0 ?
    <div style={{position:"fixed", zIndex:10000, top:0, left:0, width:"20px", height:"20px", backgroundColor:"red"}} className="saving"/> : 
    self.state().dirty_RecommendationPage.count() > 0 ?
    <div style={{position:"fixed", zIndex:10000, top:0, left:0, width:"20px", height:"20px", backgroundColor:"red"}} className="saving"/> : 
    self.state().dirty_Homepage.count() > 0 ?
    <div style={{position:"fixed", zIndex:10000, top:0, left:0, width:"20px", height:"20px", backgroundColor:"red"}} className="saving"/>
    : <div style={{position:"fixed", zIndex:10000, top:0, left:0, width:"20px", height:"20px", backgroundColor:"cornflowerblue"}} className="saved"/>
}

export type RecipeContext = {state:()=>RecipeState, props:Utils.EntityComponentProps<Models.Recipe>, setState:(new_state:RecipeState, callback?:()=>void) => void}

export type RecipeState = {
    update_count:number
    add_step_Meal:"closed"|"open"|"saving"|"adding"|"creating",
      dirty_Meal:Immutable.Map<number,Models.Meal>,
      Meal:Utils.PaginatedItems<{ shown_relation: string } & Utils.EntityAndSize<Models.Meal>>|"loading"
  add_step_PreparationTime:"closed"|"open"|"saving"|"adding"|"creating",
      dirty_PreparationTime:Immutable.Map<number,Models.PreparationTime>,
      PreparationTime:Utils.PaginatedItems<{ shown_relation: string } & Utils.EntityAndSize<Models.PreparationTime>>|"loading"
  add_step_User:"closed"|"open"|"saving",
      create_step_User:{ validation:"valid"|"validating"|"invalid", username:string, email:string, email_confirmation:string }|"none",dirty_User:Immutable.Map<number,Models.User>,
      User:Utils.PaginatedItems<{ shown_relation: string } & Utils.EntityAndSize<Models.User>>|"loading"
  add_step_Rating:"closed"|"open"|"saving",
      dirty_Rating:Immutable.Map<number,Models.Rating>,
      Rating:Utils.PaginatedItems<{ shown_relation: string } & Utils.EntityAndSize<Models.Rating>>|"loading"
  add_step_RecommendationPage:"closed"|"open"|"saving",
      dirty_RecommendationPage:Immutable.Map<number,Models.RecommendationPage>,
      RecommendationPage:Utils.PaginatedItems<{ shown_relation: string } & Utils.EntityAndSize<Models.RecommendationPage>>|"loading"
  add_step_Homepage:"closed"|"open"|"saving",
      dirty_Homepage:Immutable.Map<number,Models.Homepage>,
      Homepage:Utils.PaginatedItems<{ shown_relation: string } & Utils.EntityAndSize<Models.Homepage>>|"loading"
  }
export class RecipeComponent extends React.Component<Utils.EntityComponentProps<Models.Recipe>, RecipeState> {
  constructor(props:Utils.EntityComponentProps<Models.Recipe>, context:any) {
    super(props, context)
    this.state = { update_count:0,add_step_Meal:"closed", dirty_Meal:Immutable.Map<number,Models.Meal>(), Meal:"loading", add_step_PreparationTime:"closed", dirty_PreparationTime:Immutable.Map<number,Models.PreparationTime>(), PreparationTime:"loading", add_step_User:"closed", create_step_User:"none",dirty_User:Immutable.Map<number,Models.User>(), User:"loading", add_step_Rating:"closed", dirty_Rating:Immutable.Map<number,Models.Rating>(), Rating:"loading", add_step_RecommendationPage:"closed", dirty_RecommendationPage:Immutable.Map<number,Models.RecommendationPage>(), RecommendationPage:"loading", add_step_Homepage:"closed", dirty_Homepage:Immutable.Map<number,Models.Homepage>(), Homepage:"loading" }
  }

  get_self() {
    return {state:() => this.state, props:this.props, setState:(ns,c)=>this.setState(ns,c)}
  }

  componentWillReceiveProps(new_props:Utils.EntityComponentProps<Models.Recipe>) {
    if (new_props.size == "breadcrumb") return
    let current_logged_in_entity = this.props.current_User || null
    let new_logged_in_entity = new_props.current_User || null
    if (new_props.mode != this.props.mode || (new_props.size != this.props.size && (new_props.size == "large" || new_props.size == "fullscreen")) ||
        new_props.logic_frame != this.props.logic_frame ||
        (current_logged_in_entity && !new_logged_in_entity) ||
        (!current_logged_in_entity && new_logged_in_entity) ||
        (current_logged_in_entity && new_logged_in_entity && current_logged_in_entity.Id != new_logged_in_entity.Id)) {
      load_relations_Recipe(this.get_self(),  new_props.current_User)
    }
  }

  thread:number = null
  componentWillMount() {
    if (this.props.size == "breadcrumb") return
    if (this.props.size != "preview") {
      
      load_relations_Recipe(this.get_self(), this.props.current_User)
    }

    this.thread = setInterval(() => {
      if (this.state.dirty_Meal.count() > 0) {
         let first = this.state.dirty_Meal.first()
         this.setState({...this.state, dirty_Meal: this.state.dirty_Meal.remove(first.Id)}, () =>
           Api.update_Meal(first)
         )
       } else if (this.state.dirty_PreparationTime.count() > 0) {
         let first = this.state.dirty_PreparationTime.first()
         this.setState({...this.state, dirty_PreparationTime: this.state.dirty_PreparationTime.remove(first.Id)}, () =>
           Api.update_PreparationTime(first)
         )
       } else if (this.state.dirty_User.count() > 0) {
         let first = this.state.dirty_User.first()
         this.setState({...this.state, dirty_User: this.state.dirty_User.remove(first.Id)}, () =>
           Api.update_User(first)
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
       } else if (this.state.dirty_Homepage.count() > 0) {
         let first = this.state.dirty_Homepage.first()
         this.setState({...this.state, dirty_Homepage: this.state.dirty_Homepage.remove(first.Id)}, () =>
           Api.update_Homepage(first)
         )
       }

    }, 500)
  }

  componentWillUnmount() {
    clearInterval(this.thread)
  }

  render() {
    if (this.props.size == "breadcrumb") {
      return Permissions.can_view_Recipe(this.props.current_User) ?
              render_breadcrumb_Recipe(this.get_self())
              : null
    }

    return <div id={`Recipe_${this.props.entity.Id.toString()}_${this.state.update_count}`} className={`model recipe`}>
      { render_saving_animations_Recipe(this.get_self()) }
      { this.props.nesting_depth == 0 ? render_menu_Recipe(this.get_self()) : null }
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
        { this.props.nesting_depth == 0 ? render_local_menu_Recipe(this.get_self()) : null }
        { render_controls_Recipe(this.get_self()) }
        { render_content_Recipe(this.get_self()) }
      </div>
    </div>
  }
}

export let Recipe = (props:Utils.EntityComponentProps<Models.Recipe>) : JSX.Element =>
  <RecipeComponent {...props} />

export let Recipe_to_page = (id:number) => {
  let can_edit = Utils.any_of([Permissions.can_edit_Recipe, Permissions.can_edit_Meal_Recipe, Permissions.can_edit_PreparationTime_Recipe, Permissions.can_edit_User_Recipe, Permissions.can_edit_Recipe_Rating, Permissions.can_edit_RecommendationPage_Recipe, Permissions.can_edit_Homepage_Recipe, Permissions.can_edit_Meal, Permissions.can_edit_PreparationTime, Permissions.can_edit_User, Permissions.can_edit_Rating, Permissions.can_edit_RecommendationPage, Permissions.can_edit_Homepage])
  return Utils.scene_to_page<Models.Recipe>(can_edit, Recipe, Api.get_Recipe(id), Api.update_Recipe, "Recipe", "Recipe", `/Recipes/${id}`)
}

export let Recipe_to = (id:number, target_element_id:string, current_User:Models.User) => {
  Utils.render_page_manager(target_element_id,
    Recipe_to_page(id),
    current_User
  )
}
