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
import * as DinnerViews from './Dinner'
import * as BrunchViews from './Brunch'
import * as HomepageViews from './Homepage'
import * as RatingViews from './Rating'
import * as PreparationTimeViews from './PreparationTime'
import * as FavoriteViews from './Favorite'
import * as BreakfastViews from './Breakfast'
import * as AsianViews from './Asian'
import * as LunchViews from './Lunch'
import * as MediterraneanViews from './Mediterranean'
import * as GrillViews from './Grill'
import * as RecommendationPageViews from './RecommendationPage'


export function Recipe_Asian_Recipe_can_create(self:RecipeContext) {
  let state = self.state()
  return state.Asian == "loading" ? false : state.Asian.CanCreate
}
export function Recipe_Mediterranean_Recipe_can_create(self:RecipeContext) {
  let state = self.state()
  return state.Mediterranean == "loading" ? false : state.Mediterranean.CanCreate
}
export function Recipe_Grill_Recipe_can_create(self:RecipeContext) {
  let state = self.state()
  return state.Grill == "loading" ? false : state.Grill.CanCreate
}
export function Recipe_Breakfast_Recipe_can_create(self:RecipeContext) {
  let state = self.state()
  return state.Breakfast == "loading" ? false : state.Breakfast.CanCreate
}
export function Recipe_Brunch_Recipe_can_create(self:RecipeContext) {
  let state = self.state()
  return state.Brunch == "loading" ? false : state.Brunch.CanCreate
}
export function Recipe_Lunch_Recipe_can_create(self:RecipeContext) {
  let state = self.state()
  return state.Lunch == "loading" ? false : state.Lunch.CanCreate
}
export function Recipe_Dinner_Recipe_can_create(self:RecipeContext) {
  let state = self.state()
  return state.Dinner == "loading" ? false : state.Dinner.CanCreate
}
export function Recipe_PreparationTime_Recipe_can_create(self:RecipeContext) {
  let state = self.state()
  return state.PreparationTime == "loading" ? false : state.PreparationTime.CanCreate
}
export function Recipe_Favorite_Recipe_can_create(self:RecipeContext) {
  let state = self.state()
  return state.Favorite == "loading" ? false : state.Favorite.CanCreate
}
export function Recipe_Rating_Recipe_can_create(self:RecipeContext) {
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
export function Recipe_Asian_Recipe_can_delete(self:RecipeContext) {
  let state = self.state()
  return state.Asian == "loading" ? false : state.Asian.CanDelete
}
export function Recipe_Mediterranean_Recipe_can_delete(self:RecipeContext) {
  let state = self.state()
  return state.Mediterranean == "loading" ? false : state.Mediterranean.CanDelete
}
export function Recipe_Grill_Recipe_can_delete(self:RecipeContext) {
  let state = self.state()
  return state.Grill == "loading" ? false : state.Grill.CanDelete
}
export function Recipe_Breakfast_Recipe_can_delete(self:RecipeContext) {
  let state = self.state()
  return state.Breakfast == "loading" ? false : state.Breakfast.CanDelete
}
export function Recipe_Brunch_Recipe_can_delete(self:RecipeContext) {
  let state = self.state()
  return state.Brunch == "loading" ? false : state.Brunch.CanDelete
}
export function Recipe_Lunch_Recipe_can_delete(self:RecipeContext) {
  let state = self.state()
  return state.Lunch == "loading" ? false : state.Lunch.CanDelete
}
export function Recipe_Dinner_Recipe_can_delete(self:RecipeContext) {
  let state = self.state()
  return state.Dinner == "loading" ? false : state.Dinner.CanDelete
}
export function Recipe_PreparationTime_Recipe_can_delete(self:RecipeContext) {
  let state = self.state()
  return state.PreparationTime == "loading" ? false : state.PreparationTime.CanDelete
}
export function Recipe_Favorite_Recipe_can_delete(self:RecipeContext) {
  let state = self.state()
  return state.Favorite == "loading" ? false : state.Favorite.CanDelete
}
export function Recipe_Rating_Recipe_can_delete(self:RecipeContext) {
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
export function Recipe_Asian_Recipe_page_index(self:RecipeContext) {
  let state = self.state()
  return state.Asian == "loading" ? 0 : state.Asian.PageIndex
}
export function Recipe_Mediterranean_Recipe_page_index(self:RecipeContext) {
  let state = self.state()
  return state.Mediterranean == "loading" ? 0 : state.Mediterranean.PageIndex
}
export function Recipe_Grill_Recipe_page_index(self:RecipeContext) {
  let state = self.state()
  return state.Grill == "loading" ? 0 : state.Grill.PageIndex
}
export function Recipe_Breakfast_Recipe_page_index(self:RecipeContext) {
  let state = self.state()
  return state.Breakfast == "loading" ? 0 : state.Breakfast.PageIndex
}
export function Recipe_Brunch_Recipe_page_index(self:RecipeContext) {
  let state = self.state()
  return state.Brunch == "loading" ? 0 : state.Brunch.PageIndex
}
export function Recipe_Lunch_Recipe_page_index(self:RecipeContext) {
  let state = self.state()
  return state.Lunch == "loading" ? 0 : state.Lunch.PageIndex
}
export function Recipe_Dinner_Recipe_page_index(self:RecipeContext) {
  let state = self.state()
  return state.Dinner == "loading" ? 0 : state.Dinner.PageIndex
}
export function Recipe_PreparationTime_Recipe_page_index(self:RecipeContext) {
  let state = self.state()
  return state.PreparationTime == "loading" ? 0 : state.PreparationTime.PageIndex
}
export function Recipe_Favorite_Recipe_page_index(self:RecipeContext) {
  let state = self.state()
  return state.Favorite == "loading" ? 0 : state.Favorite.PageIndex
}
export function Recipe_Rating_Recipe_page_index(self:RecipeContext) {
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
export function Recipe_Asian_Recipe_page_size(self:RecipeContext) {
  let state = self.state()
  return state.Asian == "loading" ? 25 : state.Asian.PageSize
}
export function Recipe_Mediterranean_Recipe_page_size(self:RecipeContext) {
  let state = self.state()
  return state.Mediterranean == "loading" ? 25 : state.Mediterranean.PageSize
}
export function Recipe_Grill_Recipe_page_size(self:RecipeContext) {
  let state = self.state()
  return state.Grill == "loading" ? 25 : state.Grill.PageSize
}
export function Recipe_Breakfast_Recipe_page_size(self:RecipeContext) {
  let state = self.state()
  return state.Breakfast == "loading" ? 25 : state.Breakfast.PageSize
}
export function Recipe_Brunch_Recipe_page_size(self:RecipeContext) {
  let state = self.state()
  return state.Brunch == "loading" ? 25 : state.Brunch.PageSize
}
export function Recipe_Lunch_Recipe_page_size(self:RecipeContext) {
  let state = self.state()
  return state.Lunch == "loading" ? 25 : state.Lunch.PageSize
}
export function Recipe_Dinner_Recipe_page_size(self:RecipeContext) {
  let state = self.state()
  return state.Dinner == "loading" ? 25 : state.Dinner.PageSize
}
export function Recipe_PreparationTime_Recipe_page_size(self:RecipeContext) {
  let state = self.state()
  return state.PreparationTime == "loading" ? 25 : state.PreparationTime.PageSize
}
export function Recipe_Favorite_Recipe_page_size(self:RecipeContext) {
  let state = self.state()
  return state.Favorite == "loading" ? 25 : state.Favorite.PageSize
}
export function Recipe_Rating_Recipe_page_size(self:RecipeContext) {
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
export function Recipe_Asian_Recipe_num_pages(self:RecipeContext) {
  let state = self.state()
  return state.Asian == "loading" ? 1 : state.Asian.NumPages
}
export function Recipe_Mediterranean_Recipe_num_pages(self:RecipeContext) {
  let state = self.state()
  return state.Mediterranean == "loading" ? 1 : state.Mediterranean.NumPages
}
export function Recipe_Grill_Recipe_num_pages(self:RecipeContext) {
  let state = self.state()
  return state.Grill == "loading" ? 1 : state.Grill.NumPages
}
export function Recipe_Breakfast_Recipe_num_pages(self:RecipeContext) {
  let state = self.state()
  return state.Breakfast == "loading" ? 1 : state.Breakfast.NumPages
}
export function Recipe_Brunch_Recipe_num_pages(self:RecipeContext) {
  let state = self.state()
  return state.Brunch == "loading" ? 1 : state.Brunch.NumPages
}
export function Recipe_Lunch_Recipe_num_pages(self:RecipeContext) {
  let state = self.state()
  return state.Lunch == "loading" ? 1 : state.Lunch.NumPages
}
export function Recipe_Dinner_Recipe_num_pages(self:RecipeContext) {
  let state = self.state()
  return state.Dinner == "loading" ? 1 : state.Dinner.NumPages
}
export function Recipe_PreparationTime_Recipe_num_pages(self:RecipeContext) {
  let state = self.state()
  return state.PreparationTime == "loading" ? 1 : state.PreparationTime.NumPages
}
export function Recipe_Favorite_Recipe_num_pages(self:RecipeContext) {
  let state = self.state()
  return state.Favorite == "loading" ? 1 : state.Favorite.NumPages
}
export function Recipe_Rating_Recipe_num_pages(self:RecipeContext) {
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

export function load_relation_Recipe_Asian_Recipe(self:RecipeContext, current_User:Models.User, callback?:()=>void) {
  Permissions.can_view_Asian(current_User) ?
    Api.get_Recipe_Asian_Recipes(self.props.entity, Recipe_Asian_Recipe_page_index(self), Recipe_Asian_Recipe_page_size(self)).then(Asians =>
      self.setState({...self.state(), update_count:self.state().update_count+1,
          Asian:Utils.raw_page_to_paginated_items<Models.Asian, Utils.EntityAndSize<Models.Asian> & { shown_relation:string }>(i => {
            let state = self.state()
            return {
              element:i,
              size: state.Asian != "loading" && state.Asian.Items.has(i.Id) ? state.Asian.Items.get(i.Id).size : "preview",
              shown_relation:"all"}}, Asians)
          }, callback))
  :
    callback && callback()
}

export function load_relation_Recipe_Mediterranean_Recipe(self:RecipeContext, current_User:Models.User, callback?:()=>void) {
  Permissions.can_view_Mediterranean(current_User) ?
    Api.get_Recipe_Mediterranean_Recipes(self.props.entity, Recipe_Mediterranean_Recipe_page_index(self), Recipe_Mediterranean_Recipe_page_size(self)).then(Mediterraneans =>
      self.setState({...self.state(), update_count:self.state().update_count+1,
          Mediterranean:Utils.raw_page_to_paginated_items<Models.Mediterranean, Utils.EntityAndSize<Models.Mediterranean> & { shown_relation:string }>(i => {
            let state = self.state()
            return {
              element:i,
              size: state.Mediterranean != "loading" && state.Mediterranean.Items.has(i.Id) ? state.Mediterranean.Items.get(i.Id).size : "preview",
              shown_relation:"all"}}, Mediterraneans)
          }, callback))
  :
    callback && callback()
}

export function load_relation_Recipe_Grill_Recipe(self:RecipeContext, current_User:Models.User, callback?:()=>void) {
  Permissions.can_view_Grill(current_User) ?
    Api.get_Recipe_Grill_Recipes(self.props.entity, Recipe_Grill_Recipe_page_index(self), Recipe_Grill_Recipe_page_size(self)).then(Grills =>
      self.setState({...self.state(), update_count:self.state().update_count+1,
          Grill:Utils.raw_page_to_paginated_items<Models.Grill, Utils.EntityAndSize<Models.Grill> & { shown_relation:string }>(i => {
            let state = self.state()
            return {
              element:i,
              size: state.Grill != "loading" && state.Grill.Items.has(i.Id) ? state.Grill.Items.get(i.Id).size : "preview",
              shown_relation:"all"}}, Grills)
          }, callback))
  :
    callback && callback()
}

export function load_relation_Recipe_Breakfast_Recipe(self:RecipeContext, current_User:Models.User, callback?:()=>void) {
  Permissions.can_view_Breakfast(current_User) ?
    Api.get_Recipe_Breakfast_Recipes(self.props.entity, Recipe_Breakfast_Recipe_page_index(self), Recipe_Breakfast_Recipe_page_size(self)).then(Breakfasts =>
      self.setState({...self.state(), update_count:self.state().update_count+1,
          Breakfast:Utils.raw_page_to_paginated_items<Models.Breakfast, Utils.EntityAndSize<Models.Breakfast> & { shown_relation:string }>(i => {
            let state = self.state()
            return {
              element:i,
              size: state.Breakfast != "loading" && state.Breakfast.Items.has(i.Id) ? state.Breakfast.Items.get(i.Id).size : "preview",
              shown_relation:"all"}}, Breakfasts)
          }, callback))
  :
    callback && callback()
}

export function load_relation_Recipe_Brunch_Recipe(self:RecipeContext, current_User:Models.User, callback?:()=>void) {
  Permissions.can_view_Brunch(current_User) ?
    Api.get_Recipe_Brunch_Recipes(self.props.entity, Recipe_Brunch_Recipe_page_index(self), Recipe_Brunch_Recipe_page_size(self)).then(Brunches =>
      self.setState({...self.state(), update_count:self.state().update_count+1,
          Brunch:Utils.raw_page_to_paginated_items<Models.Brunch, Utils.EntityAndSize<Models.Brunch> & { shown_relation:string }>(i => {
            let state = self.state()
            return {
              element:i,
              size: state.Brunch != "loading" && state.Brunch.Items.has(i.Id) ? state.Brunch.Items.get(i.Id).size : "preview",
              shown_relation:"all"}}, Brunches)
          }, callback))
  :
    callback && callback()
}

export function load_relation_Recipe_Lunch_Recipe(self:RecipeContext, current_User:Models.User, callback?:()=>void) {
  Permissions.can_view_Lunch(current_User) ?
    Api.get_Recipe_Lunch_Recipes(self.props.entity, Recipe_Lunch_Recipe_page_index(self), Recipe_Lunch_Recipe_page_size(self)).then(Lunches =>
      self.setState({...self.state(), update_count:self.state().update_count+1,
          Lunch:Utils.raw_page_to_paginated_items<Models.Lunch, Utils.EntityAndSize<Models.Lunch> & { shown_relation:string }>(i => {
            let state = self.state()
            return {
              element:i,
              size: state.Lunch != "loading" && state.Lunch.Items.has(i.Id) ? state.Lunch.Items.get(i.Id).size : "preview",
              shown_relation:"all"}}, Lunches)
          }, callback))
  :
    callback && callback()
}

export function load_relation_Recipe_Dinner_Recipe(self:RecipeContext, current_User:Models.User, callback?:()=>void) {
  Permissions.can_view_Dinner(current_User) ?
    Api.get_Recipe_Dinner_Recipes(self.props.entity, Recipe_Dinner_Recipe_page_index(self), Recipe_Dinner_Recipe_page_size(self)).then(Dinners =>
      self.setState({...self.state(), update_count:self.state().update_count+1,
          Dinner:Utils.raw_page_to_paginated_items<Models.Dinner, Utils.EntityAndSize<Models.Dinner> & { shown_relation:string }>(i => {
            let state = self.state()
            return {
              element:i,
              size: state.Dinner != "loading" && state.Dinner.Items.has(i.Id) ? state.Dinner.Items.get(i.Id).size : "preview",
              shown_relation:"all"}}, Dinners)
          }, callback))
  :
    callback && callback()
}

export function load_relation_Recipe_PreparationTime_Recipe(self:RecipeContext, current_User:Models.User, callback?:()=>void) {
  Permissions.can_view_PreparationTime(current_User) ?
    Api.get_Recipe_PreparationTime_Recipes(self.props.entity, Recipe_PreparationTime_Recipe_page_index(self), Recipe_PreparationTime_Recipe_page_size(self)).then(PreparationTimes =>
      self.setState({...self.state(), update_count:self.state().update_count+1,
          PreparationTime:Utils.raw_page_to_paginated_items<Models.PreparationTime, Utils.EntityAndSize<Models.PreparationTime> & { shown_relation:string }>(i => {
            let state = self.state()
            return {
              element:i,
              size: state.PreparationTime != "loading" && state.PreparationTime.Items.has(i.Id) ? state.PreparationTime.Items.get(i.Id).size : "preview",
              shown_relation:"all"}}, PreparationTimes)
          }, callback))
  :
    callback && callback()
}

export function load_relation_Recipe_Favorite_Recipe(self:RecipeContext, current_User:Models.User, callback?:()=>void) {
  Permissions.can_view_Favorite(current_User) ?
    Api.get_Recipe_Favorite_Recipes(self.props.entity, Recipe_Favorite_Recipe_page_index(self), Recipe_Favorite_Recipe_page_size(self)).then(Favorites =>
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

export function load_relation_Recipe_Rating_Recipe(self:RecipeContext, current_User:Models.User, callback?:()=>void) {
  Permissions.can_view_Rating(current_User) ?
    Api.get_Recipe_Rating_Recipes(self.props.entity, Recipe_Rating_Recipe_page_index(self), Recipe_Rating_Recipe_page_size(self)).then(Ratings =>
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

export function load_relation_Recipe_RecommendationPage_Recipe(self:RecipeContext, current_User:Models.User, callback?:()=>void) {
  Permissions.can_view_RecommendationPage(current_User) ?
    Api.get_Recipe_RecommendationPage_Recipes(self.props.entity, Recipe_RecommendationPage_Recipe_page_index(self), Recipe_RecommendationPage_Recipe_page_size(self)).then(RecommendationPages =>
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

export function load_relation_Recipe_Homepage_Recipe(self:RecipeContext, current_User:Models.User, callback?:()=>void) {
  Permissions.can_view_Homepage(current_User) ?
    Api.get_Recipe_Homepage_Recipes(self.props.entity, Recipe_Homepage_Recipe_page_index(self), Recipe_Homepage_Recipe_page_size(self)).then(Homepages =>
      self.setState({...self.state(), update_count:self.state().update_count+1,
          Homepage:Utils.raw_page_to_paginated_items<Models.Homepage, Utils.EntityAndSize<Models.Homepage> & { shown_relation:string }>(i => {
            let state = self.state()
            return {
              element:i,
              size: state.Homepage != "loading" && state.Homepage.Items.has(i.Id) ? state.Homepage.Items.get(i.Id).size : "preview",
              shown_relation:"all"}}, Homepages)
          }, callback))
  :
    callback && callback()
}

export function load_relations_Recipe(self, current_User:Models.User, callback?:()=>void) {
  load_relation_Recipe_Homepage_Recipe(self, self.props.current_User, 
        () => load_relation_Recipe_RecommendationPage_Recipe(self, self.props.current_User, 
        () => load_relation_Recipe_Rating_Recipe(self, self.props.current_User, 
        () => load_relation_Recipe_Favorite_Recipe(self, self.props.current_User, 
        () => load_relation_Recipe_PreparationTime_Recipe(self, self.props.current_User, 
        () => load_relation_Recipe_Dinner_Recipe(self, self.props.current_User, 
        () => load_relation_Recipe_Lunch_Recipe(self, self.props.current_User, 
        () => load_relation_Recipe_Brunch_Recipe(self, self.props.current_User, 
        () => load_relation_Recipe_Breakfast_Recipe(self, self.props.current_User, 
        () => load_relation_Recipe_Grill_Recipe(self, self.props.current_User, 
        () => load_relation_Recipe_Mediterranean_Recipe(self, self.props.current_User, 
        () => load_relation_Recipe_Asian_Recipe(self, self.props.current_User, 
        () => callback && callback()))))))))))))
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

export function render_Recipe_RatingType_editable_minimised(self:RecipeContext) : JSX.Element {
  if (!Permissions.can_edit_Recipe(self.props.current_User)) return render_Recipe_RatingType_minimised(self)
  else
    return !Permissions.can_view_Recipe_RatingType(self.props.current_User) ? <div /> :
          <div className="model__attribute ratingtype">
  <label className="attribute-label attribute-label-ratingtype">{i18next.t(`Recipe:RatingType`, {context: self.props.inline ? "inline" : ""})}</label>
  <div className="model__attribute-content">
    { Components.Number(
        self.props.is_editable && Permissions.can_edit_Recipe(self.props.current_User) && Permissions.can_edit_Recipe_RatingType(self.props.current_User),
        self.props.mode,
        () => self.props.entity.RatingType,
        v => self.props.set_entity({...self.props.entity, RatingType:v})) } 
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

export function render_Recipe_RatingType_editable_maximised(self:RecipeContext) : JSX.Element {
  if (!Permissions.can_edit_Recipe(self.props.current_User)) return render_Recipe_RatingType_maximised(self)
  else
    return !Permissions.can_view_Recipe_RatingType(self.props.current_User) ? <div /> :
          <div className="model__attribute ratingtype">
  <label className="attribute-label attribute-label-ratingtype">{i18next.t(`Recipe:RatingType`, {context: self.props.inline ? "inline" : ""})}</label>
  <div className="model__attribute-content">
    { Components.Number(
        self.props.is_editable && Permissions.can_edit_Recipe(self.props.current_User) && Permissions.can_edit_Recipe_RatingType(self.props.current_User),
        self.props.mode,
        () => self.props.entity.RatingType,
        v => self.props.set_entity({...self.props.entity, RatingType:v})) } 
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
        {render_Recipe_RatingType_editable_minimised(self)}
        {render_Recipe_Picture_editable_minimised(self)}
    </div>)
  return attributes
}

export function render_editable_attributes_maximised_Recipe(self:RecipeContext) {
    let attributes = (<div>
        {render_Recipe_Name_editable_maximised(self)}
        {render_Recipe_Ingredients_editable_maximised(self)}
        {render_Recipe_Description_editable_maximised(self)}
        {render_Recipe_RatingType_editable_maximised(self)}
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
                        self.props.current_User, 
                        () => self.props.set_shown_relation("PreparationTime_Recipe"))
                    }>
                      {i18next.t('PreparationTime_Recipes_inverted')}
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
  return <div className={`${self.props.inline != undefined && self.props.inline ? "" : "model-content"} ${self.props.size == 'preview' ? 'model-content--preview' : ''}`}>
    {Permissions.can_view_Recipe(self.props.current_User) ?
      self.props.size == "preview" ?
        render_preview_Recipe(self)
      : self.props.size == "large" ?
        render_large_Recipe(self)
      : self.props.size == "fullscreen" ?
        render_large_Recipe(self)
      : "Error: unauthorised access to entity."
    : "Error: unauthorised access to entity."
    }
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
        export function render_Recipe_RatingType_minimised(self:RecipeContext) : JSX.Element {
      return !Permissions.can_view_Recipe_RatingType(self.props.current_User) ? null : <div className="model__attribute ratingtype">
  <label className="attribute-label attribute-label-ratingtype">{i18next.t(`Recipe:RatingType`, {context: self.props.inline ? "inline" : ""})}</label>
  <div className="model__attribute-content">
    { Components.Number(
        self.props.is_editable && Permissions.can_edit_Recipe(self.props.current_User) && Permissions.can_edit_Recipe_RatingType(self.props.current_User),
        self.props.mode,
        () => self.props.entity.RatingType,
        v => self.props.set_entity({...self.props.entity, RatingType:v})) } 
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
        export function render_Recipe_RatingType_maximised(self:RecipeContext) : JSX.Element {
        return !Permissions.can_view_Recipe_RatingType(self.props.current_User) ? null : <div className="model__attribute ratingtype">
  <label className="attribute-label attribute-label-ratingtype">{i18next.t(`Recipe:RatingType`, {context: self.props.inline ? "inline" : ""})}</label>
  <div className="model__attribute-content">
    { Components.Number(
        self.props.is_editable && Permissions.can_edit_Recipe(self.props.current_User) && Permissions.can_edit_Recipe_RatingType(self.props.current_User),
        self.props.mode,
        () => self.props.entity.RatingType,
        v => self.props.set_entity({...self.props.entity, RatingType:v})) } 
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
        { render_Recipe_RatingType_minimised(self) }
        { render_Recipe_Picture_minimised(self) }
    </div>)
  else
    attributes = render_editable_attributes_minimised_Recipe(self)
  return (<div className="block">
      {attributes}
    </div>)
}

export function render_large_Recipe(self:RecipeContext) {
  let attributes:JSX.Element = null
  if (self.props.mode == "view" || !Permissions.can_edit_Recipe(self.props.current_User))
    attributes = (<div className="model__attributes">
      { render_Recipe_Name_maximised(self) }
        { render_Recipe_Ingredients_maximised(self) }
        { render_Recipe_Description_maximised(self) }
        { render_Recipe_RatingType_maximised(self) }
        { render_Recipe_Picture_maximised(self) }
    </div>)
  else
    attributes = render_editable_attributes_maximised_Recipe(self)
  return (<div className="block">
      {self.props.nesting_depth == 0 && self.props.shown_relation != "all" && self.props.shown_relation != "none" ? null : attributes}
      {render_relations_Recipe(self)}
    </div>)
}


export function render_Recipe_Asian_Recipe(self:RecipeContext, context:"presentation_structure"|"default") {
  if ((context == "default" && self.props.shown_relation != "all" && self.props.shown_relation != "Asian_Recipe") || !Permissions.can_view_Asian(self.props.current_User))
    return null
  let state = self.state()
  return <div>
    { List.render_relation("recipe_asian_recipe",
   "Recipe",
   "Asian",
   "Asians",
   self.props.nesting_depth > 0,
   false,
   false,
   false)
  (
      state.Asian != "loading" ? state.Asian.Items : state.Asian,
      Recipe_Asian_Recipe_page_index(self),
      Recipe_Asian_Recipe_num_pages(self),
      new_page_index => {
          let state = self.state()
          state.Asian != "loading" &&
          self.setState({...self.state(),
            update_count:self.state().update_count+1,
            Asian: {
              ...state.Asian,
              PageIndex:new_page_index
            }
          }, () =>  load_relation_Recipe_Asian_Recipe(self, self.props.current_User))
        },
      (i,i_id) => {
          let state = self.state()
          return <div key={i_id}
            className={`model-nested__item ${i.size != "preview" ? "model-nested__item--open" : ""} ` }
          
            >
            <div key={i_id}>
              {
                AsianViews.Asian({
                  ...self.props,
                  entity:i.element,
                  inline:false,
                  nesting_depth:self.props.nesting_depth+1,
                  size: i.size,
                  allow_maximisation:true,
                  allow_fullscreen:true,
                  mode:self.props.mode == "edit" && (Permissions.can_edit_Asian_Recipe(self.props.current_User)
                        || Permissions.can_create_Asian_Recipe(self.props.current_User)
                        || Permissions.can_delete_Asian_Recipe(self.props.current_User)) ?
                    self.props.mode : "view",
                  is_editable:state.Asian != "loading" && state.Asian.Editable.get(i_id),
                  shown_relation:i.shown_relation,
                  set_shown_relation:(new_shown_relation:string, callback) => {
                    let state = self.state()
                    state.Asian != "loading" &&
                    self.setState({...self.state(),
                      Asian:
                        {
                          ...state.Asian,
                          Items:state.Asian.Items.set(i_id,{...state.Asian.Items.get(i_id), shown_relation:new_shown_relation})
                        }
                    }, callback)
                  },
                  nested_entity_names: self.props.nested_entity_names.push("Asian"),
                  
                  set_size:(new_size:Utils.EntitySize, callback) => {
                    let new_shown_relation = new_size == "large" ? "all" : i.shown_relation
                    let state = self.state()
                    state.Asian != "loading" &&
                    self.setState({...self.state(),
                      Asian:
                        {
                          ...state.Asian,
                          Items:state.Asian.Items.set(i_id,
                            {...state.Asian.Items.get(i_id),
                              size:new_size, shown_relation:new_shown_relation})
                        }
                    }, callback)
                  },
                    
                  toggle_button:undefined,
                  set_mode:undefined,
                  set_entity:(new_entity:Models.Asian, callback?:()=>void, force_update_count_increment?:boolean) => {
                    let state = self.state()
                    state.Asian != "loading" &&
                    self.setState({...self.state(),
                      dirty_Asian:state.dirty_Asian.set(i_id, new_entity),
                      update_count:force_update_count_increment ? self.state().update_count+1 : state.update_count,
                      Asian:
                        {
                          ...state.Asian,
                          Items:state.Asian.Items.set(i_id,{...state.Asian.Items.get(i_id), element:new_entity})
                        }
                    }, callback)
                  },
                  delete: undefined,
                  unlink: !Permissions.can_delete_Asian_Recipe(self.props.current_User) ?
                    null
                    :
                    () => confirm(i18next.t('Are you sure?')) && Api.unlink_Asian_Asian_Recipes(i.element, self.props.entity).then(() =>
                      load_relation_Recipe_Asian_Recipe(self, self.props.current_User))
                })
              }
            </div>
          </div>
        },
      () =>
        <div>
          {Permissions.can_create_Asian(self.props.current_User) && Permissions.can_create_Asian_Recipe(self.props.current_User) && Recipe_Asian_Recipe_can_create(self) ? render_new_Recipe_Asian_Recipe(self) : null}
          {Permissions.can_create_Asian_Recipe(self.props.current_User) ? render_add_existing_Recipe_Asian_Recipe(self) : null}
        </div>)
    }
    
    </div>
}


export function render_Recipe_Mediterranean_Recipe(self:RecipeContext, context:"presentation_structure"|"default") {
  if ((context == "default" && self.props.shown_relation != "all" && self.props.shown_relation != "Mediterranean_Recipe") || !Permissions.can_view_Mediterranean(self.props.current_User))
    return null
  let state = self.state()
  return <div>
    { List.render_relation("recipe_mediterranean_recipe",
   "Recipe",
   "Mediterranean",
   "Mediterraneans",
   self.props.nesting_depth > 0,
   false,
   false,
   false)
  (
      state.Mediterranean != "loading" ? state.Mediterranean.Items : state.Mediterranean,
      Recipe_Mediterranean_Recipe_page_index(self),
      Recipe_Mediterranean_Recipe_num_pages(self),
      new_page_index => {
          let state = self.state()
          state.Mediterranean != "loading" &&
          self.setState({...self.state(),
            update_count:self.state().update_count+1,
            Mediterranean: {
              ...state.Mediterranean,
              PageIndex:new_page_index
            }
          }, () =>  load_relation_Recipe_Mediterranean_Recipe(self, self.props.current_User))
        },
      (i,i_id) => {
          let state = self.state()
          return <div key={i_id}
            className={`model-nested__item ${i.size != "preview" ? "model-nested__item--open" : ""} ` }
          
            >
            <div key={i_id}>
              {
                MediterraneanViews.Mediterranean({
                  ...self.props,
                  entity:i.element,
                  inline:false,
                  nesting_depth:self.props.nesting_depth+1,
                  size: i.size,
                  allow_maximisation:true,
                  allow_fullscreen:true,
                  mode:self.props.mode == "edit" && (Permissions.can_edit_Mediterranean_Recipe(self.props.current_User)
                        || Permissions.can_create_Mediterranean_Recipe(self.props.current_User)
                        || Permissions.can_delete_Mediterranean_Recipe(self.props.current_User)) ?
                    self.props.mode : "view",
                  is_editable:state.Mediterranean != "loading" && state.Mediterranean.Editable.get(i_id),
                  shown_relation:i.shown_relation,
                  set_shown_relation:(new_shown_relation:string, callback) => {
                    let state = self.state()
                    state.Mediterranean != "loading" &&
                    self.setState({...self.state(),
                      Mediterranean:
                        {
                          ...state.Mediterranean,
                          Items:state.Mediterranean.Items.set(i_id,{...state.Mediterranean.Items.get(i_id), shown_relation:new_shown_relation})
                        }
                    }, callback)
                  },
                  nested_entity_names: self.props.nested_entity_names.push("Mediterranean"),
                  
                  set_size:(new_size:Utils.EntitySize, callback) => {
                    let new_shown_relation = new_size == "large" ? "all" : i.shown_relation
                    let state = self.state()
                    state.Mediterranean != "loading" &&
                    self.setState({...self.state(),
                      Mediterranean:
                        {
                          ...state.Mediterranean,
                          Items:state.Mediterranean.Items.set(i_id,
                            {...state.Mediterranean.Items.get(i_id),
                              size:new_size, shown_relation:new_shown_relation})
                        }
                    }, callback)
                  },
                    
                  toggle_button:undefined,
                  set_mode:undefined,
                  set_entity:(new_entity:Models.Mediterranean, callback?:()=>void, force_update_count_increment?:boolean) => {
                    let state = self.state()
                    state.Mediterranean != "loading" &&
                    self.setState({...self.state(),
                      dirty_Mediterranean:state.dirty_Mediterranean.set(i_id, new_entity),
                      update_count:force_update_count_increment ? self.state().update_count+1 : state.update_count,
                      Mediterranean:
                        {
                          ...state.Mediterranean,
                          Items:state.Mediterranean.Items.set(i_id,{...state.Mediterranean.Items.get(i_id), element:new_entity})
                        }
                    }, callback)
                  },
                  delete: undefined,
                  unlink: !Permissions.can_delete_Mediterranean_Recipe(self.props.current_User) ?
                    null
                    :
                    () => confirm(i18next.t('Are you sure?')) && Api.unlink_Mediterranean_Mediterranean_Recipes(i.element, self.props.entity).then(() =>
                      load_relation_Recipe_Mediterranean_Recipe(self, self.props.current_User))
                })
              }
            </div>
          </div>
        },
      () =>
        <div>
          {Permissions.can_create_Mediterranean(self.props.current_User) && Permissions.can_create_Mediterranean_Recipe(self.props.current_User) && Recipe_Mediterranean_Recipe_can_create(self) ? render_new_Recipe_Mediterranean_Recipe(self) : null}
          {Permissions.can_create_Mediterranean_Recipe(self.props.current_User) ? render_add_existing_Recipe_Mediterranean_Recipe(self) : null}
        </div>)
    }
    
    </div>
}


export function render_Recipe_Grill_Recipe(self:RecipeContext, context:"presentation_structure"|"default") {
  if ((context == "default" && self.props.shown_relation != "all" && self.props.shown_relation != "Grill_Recipe") || !Permissions.can_view_Grill(self.props.current_User))
    return null
  let state = self.state()
  return <div>
    { List.render_relation("recipe_grill_recipe",
   "Recipe",
   "Grill",
   "Grills",
   self.props.nesting_depth > 0,
   false,
   false,
   false)
  (
      state.Grill != "loading" ? state.Grill.Items : state.Grill,
      Recipe_Grill_Recipe_page_index(self),
      Recipe_Grill_Recipe_num_pages(self),
      new_page_index => {
          let state = self.state()
          state.Grill != "loading" &&
          self.setState({...self.state(),
            update_count:self.state().update_count+1,
            Grill: {
              ...state.Grill,
              PageIndex:new_page_index
            }
          }, () =>  load_relation_Recipe_Grill_Recipe(self, self.props.current_User))
        },
      (i,i_id) => {
          let state = self.state()
          return <div key={i_id}
            className={`model-nested__item ${i.size != "preview" ? "model-nested__item--open" : ""} ` }
          
            >
            <div key={i_id}>
              {
                GrillViews.Grill({
                  ...self.props,
                  entity:i.element,
                  inline:false,
                  nesting_depth:self.props.nesting_depth+1,
                  size: i.size,
                  allow_maximisation:true,
                  allow_fullscreen:true,
                  mode:self.props.mode == "edit" && (Permissions.can_edit_Grill_Recipe(self.props.current_User)
                        || Permissions.can_create_Grill_Recipe(self.props.current_User)
                        || Permissions.can_delete_Grill_Recipe(self.props.current_User)) ?
                    self.props.mode : "view",
                  is_editable:state.Grill != "loading" && state.Grill.Editable.get(i_id),
                  shown_relation:i.shown_relation,
                  set_shown_relation:(new_shown_relation:string, callback) => {
                    let state = self.state()
                    state.Grill != "loading" &&
                    self.setState({...self.state(),
                      Grill:
                        {
                          ...state.Grill,
                          Items:state.Grill.Items.set(i_id,{...state.Grill.Items.get(i_id), shown_relation:new_shown_relation})
                        }
                    }, callback)
                  },
                  nested_entity_names: self.props.nested_entity_names.push("Grill"),
                  
                  set_size:(new_size:Utils.EntitySize, callback) => {
                    let new_shown_relation = new_size == "large" ? "all" : i.shown_relation
                    let state = self.state()
                    state.Grill != "loading" &&
                    self.setState({...self.state(),
                      Grill:
                        {
                          ...state.Grill,
                          Items:state.Grill.Items.set(i_id,
                            {...state.Grill.Items.get(i_id),
                              size:new_size, shown_relation:new_shown_relation})
                        }
                    }, callback)
                  },
                    
                  toggle_button:undefined,
                  set_mode:undefined,
                  set_entity:(new_entity:Models.Grill, callback?:()=>void, force_update_count_increment?:boolean) => {
                    let state = self.state()
                    state.Grill != "loading" &&
                    self.setState({...self.state(),
                      dirty_Grill:state.dirty_Grill.set(i_id, new_entity),
                      update_count:force_update_count_increment ? self.state().update_count+1 : state.update_count,
                      Grill:
                        {
                          ...state.Grill,
                          Items:state.Grill.Items.set(i_id,{...state.Grill.Items.get(i_id), element:new_entity})
                        }
                    }, callback)
                  },
                  delete: undefined,
                  unlink: !Permissions.can_delete_Grill_Recipe(self.props.current_User) ?
                    null
                    :
                    () => confirm(i18next.t('Are you sure?')) && Api.unlink_Grill_Grill_Recipes(i.element, self.props.entity).then(() =>
                      load_relation_Recipe_Grill_Recipe(self, self.props.current_User))
                })
              }
            </div>
          </div>
        },
      () =>
        <div>
          {Permissions.can_create_Grill(self.props.current_User) && Permissions.can_create_Grill_Recipe(self.props.current_User) && Recipe_Grill_Recipe_can_create(self) ? render_new_Recipe_Grill_Recipe(self) : null}
          {Permissions.can_create_Grill_Recipe(self.props.current_User) ? render_add_existing_Recipe_Grill_Recipe(self) : null}
        </div>)
    }
    
    </div>
}


export function render_Recipe_Breakfast_Recipe(self:RecipeContext, context:"presentation_structure"|"default") {
  if ((context == "default" && self.props.shown_relation != "all" && self.props.shown_relation != "Breakfast_Recipe") || !Permissions.can_view_Breakfast(self.props.current_User))
    return null
  let state = self.state()
  return <div>
    { List.render_relation("recipe_breakfast_recipe",
   "Recipe",
   "Breakfast",
   "Breakfasts",
   self.props.nesting_depth > 0,
   false,
   false,
   false)
  (
      state.Breakfast != "loading" ? state.Breakfast.Items : state.Breakfast,
      Recipe_Breakfast_Recipe_page_index(self),
      Recipe_Breakfast_Recipe_num_pages(self),
      new_page_index => {
          let state = self.state()
          state.Breakfast != "loading" &&
          self.setState({...self.state(),
            update_count:self.state().update_count+1,
            Breakfast: {
              ...state.Breakfast,
              PageIndex:new_page_index
            }
          }, () =>  load_relation_Recipe_Breakfast_Recipe(self, self.props.current_User))
        },
      (i,i_id) => {
          let state = self.state()
          return <div key={i_id}
            className={`model-nested__item ${i.size != "preview" ? "model-nested__item--open" : ""} ` }
          
            >
            <div key={i_id}>
              {
                BreakfastViews.Breakfast({
                  ...self.props,
                  entity:i.element,
                  inline:false,
                  nesting_depth:self.props.nesting_depth+1,
                  size: i.size,
                  allow_maximisation:true,
                  allow_fullscreen:true,
                  mode:self.props.mode == "edit" && (Permissions.can_edit_Breakfast_Recipe(self.props.current_User)
                        || Permissions.can_create_Breakfast_Recipe(self.props.current_User)
                        || Permissions.can_delete_Breakfast_Recipe(self.props.current_User)) ?
                    self.props.mode : "view",
                  is_editable:state.Breakfast != "loading" && state.Breakfast.Editable.get(i_id),
                  shown_relation:i.shown_relation,
                  set_shown_relation:(new_shown_relation:string, callback) => {
                    let state = self.state()
                    state.Breakfast != "loading" &&
                    self.setState({...self.state(),
                      Breakfast:
                        {
                          ...state.Breakfast,
                          Items:state.Breakfast.Items.set(i_id,{...state.Breakfast.Items.get(i_id), shown_relation:new_shown_relation})
                        }
                    }, callback)
                  },
                  nested_entity_names: self.props.nested_entity_names.push("Breakfast"),
                  
                  set_size:(new_size:Utils.EntitySize, callback) => {
                    let new_shown_relation = new_size == "large" ? "all" : i.shown_relation
                    let state = self.state()
                    state.Breakfast != "loading" &&
                    self.setState({...self.state(),
                      Breakfast:
                        {
                          ...state.Breakfast,
                          Items:state.Breakfast.Items.set(i_id,
                            {...state.Breakfast.Items.get(i_id),
                              size:new_size, shown_relation:new_shown_relation})
                        }
                    }, callback)
                  },
                    
                  toggle_button:undefined,
                  set_mode:undefined,
                  set_entity:(new_entity:Models.Breakfast, callback?:()=>void, force_update_count_increment?:boolean) => {
                    let state = self.state()
                    state.Breakfast != "loading" &&
                    self.setState({...self.state(),
                      dirty_Breakfast:state.dirty_Breakfast.set(i_id, new_entity),
                      update_count:force_update_count_increment ? self.state().update_count+1 : state.update_count,
                      Breakfast:
                        {
                          ...state.Breakfast,
                          Items:state.Breakfast.Items.set(i_id,{...state.Breakfast.Items.get(i_id), element:new_entity})
                        }
                    }, callback)
                  },
                  delete: undefined,
                  unlink: !Permissions.can_delete_Breakfast_Recipe(self.props.current_User) ?
                    null
                    :
                    () => confirm(i18next.t('Are you sure?')) && Api.unlink_Breakfast_Breakfast_Recipes(i.element, self.props.entity).then(() =>
                      load_relation_Recipe_Breakfast_Recipe(self, self.props.current_User))
                })
              }
            </div>
          </div>
        },
      () =>
        <div>
          {Permissions.can_create_Breakfast(self.props.current_User) && Permissions.can_create_Breakfast_Recipe(self.props.current_User) && Recipe_Breakfast_Recipe_can_create(self) ? render_new_Recipe_Breakfast_Recipe(self) : null}
          {Permissions.can_create_Breakfast_Recipe(self.props.current_User) ? render_add_existing_Recipe_Breakfast_Recipe(self) : null}
        </div>)
    }
    
    </div>
}


export function render_Recipe_Brunch_Recipe(self:RecipeContext, context:"presentation_structure"|"default") {
  if ((context == "default" && self.props.shown_relation != "all" && self.props.shown_relation != "Brunch_Recipe") || !Permissions.can_view_Brunch(self.props.current_User))
    return null
  let state = self.state()
  return <div>
    { List.render_relation("recipe_brunch_recipe",
   "Recipe",
   "Brunch",
   "Brunches",
   self.props.nesting_depth > 0,
   false,
   false,
   false)
  (
      state.Brunch != "loading" ? state.Brunch.Items : state.Brunch,
      Recipe_Brunch_Recipe_page_index(self),
      Recipe_Brunch_Recipe_num_pages(self),
      new_page_index => {
          let state = self.state()
          state.Brunch != "loading" &&
          self.setState({...self.state(),
            update_count:self.state().update_count+1,
            Brunch: {
              ...state.Brunch,
              PageIndex:new_page_index
            }
          }, () =>  load_relation_Recipe_Brunch_Recipe(self, self.props.current_User))
        },
      (i,i_id) => {
          let state = self.state()
          return <div key={i_id}
            className={`model-nested__item ${i.size != "preview" ? "model-nested__item--open" : ""} ` }
          
            >
            <div key={i_id}>
              {
                BrunchViews.Brunch({
                  ...self.props,
                  entity:i.element,
                  inline:false,
                  nesting_depth:self.props.nesting_depth+1,
                  size: i.size,
                  allow_maximisation:true,
                  allow_fullscreen:true,
                  mode:self.props.mode == "edit" && (Permissions.can_edit_Brunch_Recipe(self.props.current_User)
                        || Permissions.can_create_Brunch_Recipe(self.props.current_User)
                        || Permissions.can_delete_Brunch_Recipe(self.props.current_User)) ?
                    self.props.mode : "view",
                  is_editable:state.Brunch != "loading" && state.Brunch.Editable.get(i_id),
                  shown_relation:i.shown_relation,
                  set_shown_relation:(new_shown_relation:string, callback) => {
                    let state = self.state()
                    state.Brunch != "loading" &&
                    self.setState({...self.state(),
                      Brunch:
                        {
                          ...state.Brunch,
                          Items:state.Brunch.Items.set(i_id,{...state.Brunch.Items.get(i_id), shown_relation:new_shown_relation})
                        }
                    }, callback)
                  },
                  nested_entity_names: self.props.nested_entity_names.push("Brunch"),
                  
                  set_size:(new_size:Utils.EntitySize, callback) => {
                    let new_shown_relation = new_size == "large" ? "all" : i.shown_relation
                    let state = self.state()
                    state.Brunch != "loading" &&
                    self.setState({...self.state(),
                      Brunch:
                        {
                          ...state.Brunch,
                          Items:state.Brunch.Items.set(i_id,
                            {...state.Brunch.Items.get(i_id),
                              size:new_size, shown_relation:new_shown_relation})
                        }
                    }, callback)
                  },
                    
                  toggle_button:undefined,
                  set_mode:undefined,
                  set_entity:(new_entity:Models.Brunch, callback?:()=>void, force_update_count_increment?:boolean) => {
                    let state = self.state()
                    state.Brunch != "loading" &&
                    self.setState({...self.state(),
                      dirty_Brunch:state.dirty_Brunch.set(i_id, new_entity),
                      update_count:force_update_count_increment ? self.state().update_count+1 : state.update_count,
                      Brunch:
                        {
                          ...state.Brunch,
                          Items:state.Brunch.Items.set(i_id,{...state.Brunch.Items.get(i_id), element:new_entity})
                        }
                    }, callback)
                  },
                  delete: undefined,
                  unlink: !Permissions.can_delete_Brunch_Recipe(self.props.current_User) ?
                    null
                    :
                    () => confirm(i18next.t('Are you sure?')) && Api.unlink_Brunch_Brunch_Recipes(i.element, self.props.entity).then(() =>
                      load_relation_Recipe_Brunch_Recipe(self, self.props.current_User))
                })
              }
            </div>
          </div>
        },
      () =>
        <div>
          {Permissions.can_create_Brunch(self.props.current_User) && Permissions.can_create_Brunch_Recipe(self.props.current_User) && Recipe_Brunch_Recipe_can_create(self) ? render_new_Recipe_Brunch_Recipe(self) : null}
          {Permissions.can_create_Brunch_Recipe(self.props.current_User) ? render_add_existing_Recipe_Brunch_Recipe(self) : null}
        </div>)
    }
    
    </div>
}


export function render_Recipe_Lunch_Recipe(self:RecipeContext, context:"presentation_structure"|"default") {
  if ((context == "default" && self.props.shown_relation != "all" && self.props.shown_relation != "Lunch_Recipe") || !Permissions.can_view_Lunch(self.props.current_User))
    return null
  let state = self.state()
  return <div>
    { List.render_relation("recipe_lunch_recipe",
   "Recipe",
   "Lunch",
   "Lunches",
   self.props.nesting_depth > 0,
   false,
   false,
   false)
  (
      state.Lunch != "loading" ? state.Lunch.Items : state.Lunch,
      Recipe_Lunch_Recipe_page_index(self),
      Recipe_Lunch_Recipe_num_pages(self),
      new_page_index => {
          let state = self.state()
          state.Lunch != "loading" &&
          self.setState({...self.state(),
            update_count:self.state().update_count+1,
            Lunch: {
              ...state.Lunch,
              PageIndex:new_page_index
            }
          }, () =>  load_relation_Recipe_Lunch_Recipe(self, self.props.current_User))
        },
      (i,i_id) => {
          let state = self.state()
          return <div key={i_id}
            className={`model-nested__item ${i.size != "preview" ? "model-nested__item--open" : ""} ` }
          
            >
            <div key={i_id}>
              {
                LunchViews.Lunch({
                  ...self.props,
                  entity:i.element,
                  inline:false,
                  nesting_depth:self.props.nesting_depth+1,
                  size: i.size,
                  allow_maximisation:true,
                  allow_fullscreen:true,
                  mode:self.props.mode == "edit" && (Permissions.can_edit_Lunch_Recipe(self.props.current_User)
                        || Permissions.can_create_Lunch_Recipe(self.props.current_User)
                        || Permissions.can_delete_Lunch_Recipe(self.props.current_User)) ?
                    self.props.mode : "view",
                  is_editable:state.Lunch != "loading" && state.Lunch.Editable.get(i_id),
                  shown_relation:i.shown_relation,
                  set_shown_relation:(new_shown_relation:string, callback) => {
                    let state = self.state()
                    state.Lunch != "loading" &&
                    self.setState({...self.state(),
                      Lunch:
                        {
                          ...state.Lunch,
                          Items:state.Lunch.Items.set(i_id,{...state.Lunch.Items.get(i_id), shown_relation:new_shown_relation})
                        }
                    }, callback)
                  },
                  nested_entity_names: self.props.nested_entity_names.push("Lunch"),
                  
                  set_size:(new_size:Utils.EntitySize, callback) => {
                    let new_shown_relation = new_size == "large" ? "all" : i.shown_relation
                    let state = self.state()
                    state.Lunch != "loading" &&
                    self.setState({...self.state(),
                      Lunch:
                        {
                          ...state.Lunch,
                          Items:state.Lunch.Items.set(i_id,
                            {...state.Lunch.Items.get(i_id),
                              size:new_size, shown_relation:new_shown_relation})
                        }
                    }, callback)
                  },
                    
                  toggle_button:undefined,
                  set_mode:undefined,
                  set_entity:(new_entity:Models.Lunch, callback?:()=>void, force_update_count_increment?:boolean) => {
                    let state = self.state()
                    state.Lunch != "loading" &&
                    self.setState({...self.state(),
                      dirty_Lunch:state.dirty_Lunch.set(i_id, new_entity),
                      update_count:force_update_count_increment ? self.state().update_count+1 : state.update_count,
                      Lunch:
                        {
                          ...state.Lunch,
                          Items:state.Lunch.Items.set(i_id,{...state.Lunch.Items.get(i_id), element:new_entity})
                        }
                    }, callback)
                  },
                  delete: undefined,
                  unlink: !Permissions.can_delete_Lunch_Recipe(self.props.current_User) ?
                    null
                    :
                    () => confirm(i18next.t('Are you sure?')) && Api.unlink_Lunch_Lunch_Recipes(i.element, self.props.entity).then(() =>
                      load_relation_Recipe_Lunch_Recipe(self, self.props.current_User))
                })
              }
            </div>
          </div>
        },
      () =>
        <div>
          {Permissions.can_create_Lunch(self.props.current_User) && Permissions.can_create_Lunch_Recipe(self.props.current_User) && Recipe_Lunch_Recipe_can_create(self) ? render_new_Recipe_Lunch_Recipe(self) : null}
          {Permissions.can_create_Lunch_Recipe(self.props.current_User) ? render_add_existing_Recipe_Lunch_Recipe(self) : null}
        </div>)
    }
    
    </div>
}


export function render_Recipe_Dinner_Recipe(self:RecipeContext, context:"presentation_structure"|"default") {
  if ((context == "default" && self.props.shown_relation != "all" && self.props.shown_relation != "Dinner_Recipe") || !Permissions.can_view_Dinner(self.props.current_User))
    return null
  let state = self.state()
  return <div>
    { List.render_relation("recipe_dinner_recipe",
   "Recipe",
   "Dinner",
   "Dinners",
   self.props.nesting_depth > 0,
   false,
   false,
   false)
  (
      state.Dinner != "loading" ? state.Dinner.Items : state.Dinner,
      Recipe_Dinner_Recipe_page_index(self),
      Recipe_Dinner_Recipe_num_pages(self),
      new_page_index => {
          let state = self.state()
          state.Dinner != "loading" &&
          self.setState({...self.state(),
            update_count:self.state().update_count+1,
            Dinner: {
              ...state.Dinner,
              PageIndex:new_page_index
            }
          }, () =>  load_relation_Recipe_Dinner_Recipe(self, self.props.current_User))
        },
      (i,i_id) => {
          let state = self.state()
          return <div key={i_id}
            className={`model-nested__item ${i.size != "preview" ? "model-nested__item--open" : ""} ` }
          
            >
            <div key={i_id}>
              {
                DinnerViews.Dinner({
                  ...self.props,
                  entity:i.element,
                  inline:false,
                  nesting_depth:self.props.nesting_depth+1,
                  size: i.size,
                  allow_maximisation:true,
                  allow_fullscreen:true,
                  mode:self.props.mode == "edit" && (Permissions.can_edit_Dinner_Recipe(self.props.current_User)
                        || Permissions.can_create_Dinner_Recipe(self.props.current_User)
                        || Permissions.can_delete_Dinner_Recipe(self.props.current_User)) ?
                    self.props.mode : "view",
                  is_editable:state.Dinner != "loading" && state.Dinner.Editable.get(i_id),
                  shown_relation:i.shown_relation,
                  set_shown_relation:(new_shown_relation:string, callback) => {
                    let state = self.state()
                    state.Dinner != "loading" &&
                    self.setState({...self.state(),
                      Dinner:
                        {
                          ...state.Dinner,
                          Items:state.Dinner.Items.set(i_id,{...state.Dinner.Items.get(i_id), shown_relation:new_shown_relation})
                        }
                    }, callback)
                  },
                  nested_entity_names: self.props.nested_entity_names.push("Dinner"),
                  
                  set_size:(new_size:Utils.EntitySize, callback) => {
                    let new_shown_relation = new_size == "large" ? "all" : i.shown_relation
                    let state = self.state()
                    state.Dinner != "loading" &&
                    self.setState({...self.state(),
                      Dinner:
                        {
                          ...state.Dinner,
                          Items:state.Dinner.Items.set(i_id,
                            {...state.Dinner.Items.get(i_id),
                              size:new_size, shown_relation:new_shown_relation})
                        }
                    }, callback)
                  },
                    
                  toggle_button:undefined,
                  set_mode:undefined,
                  set_entity:(new_entity:Models.Dinner, callback?:()=>void, force_update_count_increment?:boolean) => {
                    let state = self.state()
                    state.Dinner != "loading" &&
                    self.setState({...self.state(),
                      dirty_Dinner:state.dirty_Dinner.set(i_id, new_entity),
                      update_count:force_update_count_increment ? self.state().update_count+1 : state.update_count,
                      Dinner:
                        {
                          ...state.Dinner,
                          Items:state.Dinner.Items.set(i_id,{...state.Dinner.Items.get(i_id), element:new_entity})
                        }
                    }, callback)
                  },
                  delete: undefined,
                  unlink: !Permissions.can_delete_Dinner_Recipe(self.props.current_User) ?
                    null
                    :
                    () => confirm(i18next.t('Are you sure?')) && Api.unlink_Dinner_Dinner_Recipes(i.element, self.props.entity).then(() =>
                      load_relation_Recipe_Dinner_Recipe(self, self.props.current_User))
                })
              }
            </div>
          </div>
        },
      () =>
        <div>
          {Permissions.can_create_Dinner(self.props.current_User) && Permissions.can_create_Dinner_Recipe(self.props.current_User) && Recipe_Dinner_Recipe_can_create(self) ? render_new_Recipe_Dinner_Recipe(self) : null}
          {Permissions.can_create_Dinner_Recipe(self.props.current_User) ? render_add_existing_Recipe_Dinner_Recipe(self) : null}
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
      state.PreparationTime != "loading" ? state.PreparationTime.Items : state.PreparationTime,
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
          }, () =>  load_relation_Recipe_PreparationTime_Recipe(self, self.props.current_User))
        },
      (i,i_id) => {
          let state = self.state()
          return <div key={i_id}
            className={`model-nested__item ${i.size != "preview" ? "model-nested__item--open" : ""} ` }
          
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
                      load_relation_Recipe_PreparationTime_Recipe(self, self.props.current_User))
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


export function render_Recipe_Favorite_Recipe(self:RecipeContext, context:"presentation_structure"|"default") {
  if ((context == "default" && self.props.shown_relation != "all" && self.props.shown_relation != "Favorite_Recipe") || !Permissions.can_view_Favorite(self.props.current_User))
    return null
  let state = self.state()
  return <div>
    { List.render_relation("recipe_favorite_recipe",
   "Recipe",
   "Favorite",
   "Favorites",
   self.props.nesting_depth > 0,
   false,
   false,
   false)
  (
      state.Favorite != "loading" ? state.Favorite.Items : state.Favorite,
      Recipe_Favorite_Recipe_page_index(self),
      Recipe_Favorite_Recipe_num_pages(self),
      new_page_index => {
          let state = self.state()
          state.Favorite != "loading" &&
          self.setState({...self.state(),
            update_count:self.state().update_count+1,
            Favorite: {
              ...state.Favorite,
              PageIndex:new_page_index
            }
          }, () =>  load_relation_Recipe_Favorite_Recipe(self, self.props.current_User))
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
                  mode:self.props.mode == "edit" && (Permissions.can_edit_Favorite_Recipe(self.props.current_User)
                        || Permissions.can_create_Favorite_Recipe(self.props.current_User)
                        || Permissions.can_delete_Favorite_Recipe(self.props.current_User)) ?
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
                  unlink: !Permissions.can_delete_Favorite_Recipe(self.props.current_User) ?
                    null
                    :
                    () => confirm(i18next.t('Are you sure?')) && Api.unlink_Favorite_Favorite_Recipes(i.element, self.props.entity).then(() =>
                      load_relation_Recipe_Favorite_Recipe(self, self.props.current_User))
                })
              }
            </div>
          </div>
        },
      () =>
        <div>
          {Permissions.can_create_Favorite(self.props.current_User) && Permissions.can_create_Favorite_Recipe(self.props.current_User) && Recipe_Favorite_Recipe_can_create(self) ? render_new_Recipe_Favorite_Recipe(self) : null}
          {Permissions.can_create_Favorite_Recipe(self.props.current_User) ? render_add_existing_Recipe_Favorite_Recipe(self) : null}
        </div>)
    }
    
    </div>
}


export function render_Recipe_Rating_Recipe(self:RecipeContext, context:"presentation_structure"|"default") {
  if ((context == "default" && self.props.shown_relation != "all" && self.props.shown_relation != "Rating_Recipe") || !Permissions.can_view_Rating(self.props.current_User))
    return null
  let state = self.state()
  return <div>
    { List.render_relation("recipe_rating_recipe",
   "Recipe",
   "Rating",
   "Ratings",
   self.props.nesting_depth > 0,
   false,
   false,
   false)
  (
      state.Rating != "loading" ? state.Rating.Items : state.Rating,
      Recipe_Rating_Recipe_page_index(self),
      Recipe_Rating_Recipe_num_pages(self),
      new_page_index => {
          let state = self.state()
          state.Rating != "loading" &&
          self.setState({...self.state(),
            update_count:self.state().update_count+1,
            Rating: {
              ...state.Rating,
              PageIndex:new_page_index
            }
          }, () =>  load_relation_Recipe_Rating_Recipe(self, self.props.current_User))
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
                  mode:self.props.mode == "edit" && (Permissions.can_edit_Rating_Recipe(self.props.current_User)
                        || Permissions.can_create_Rating_Recipe(self.props.current_User)
                        || Permissions.can_delete_Rating_Recipe(self.props.current_User)) ?
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
                  unlink: !Permissions.can_delete_Rating_Recipe(self.props.current_User) ?
                    null
                    :
                    () => confirm(i18next.t('Are you sure?')) && Api.unlink_Rating_Rating_Recipes(i.element, self.props.entity).then(() =>
                      load_relation_Recipe_Rating_Recipe(self, self.props.current_User))
                })
              }
            </div>
          </div>
        },
      () =>
        <div>
          {Permissions.can_create_Rating(self.props.current_User) && Permissions.can_create_Rating_Recipe(self.props.current_User) && Recipe_Rating_Recipe_can_create(self) ? render_new_Recipe_Rating_Recipe(self) : null}
          {Permissions.can_create_Rating_Recipe(self.props.current_User) ? render_add_existing_Recipe_Rating_Recipe(self) : null}
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
      state.RecommendationPage != "loading" ? state.RecommendationPage.Items : state.RecommendationPage,
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
          }, () =>  load_relation_Recipe_RecommendationPage_Recipe(self, self.props.current_User))
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
                      load_relation_Recipe_RecommendationPage_Recipe(self, self.props.current_User))
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
      state.Homepage != "loading" ? state.Homepage.Items : state.Homepage,
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
          }, () =>  load_relation_Recipe_Homepage_Recipe(self, self.props.current_User))
        },
      (i,i_id) => {
          let state = self.state()
          return <div key={i_id}
            className={`model-nested__item ${i.size != "preview" ? "model-nested__item--open" : ""} ` }
          
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
                      load_relation_Recipe_Homepage_Recipe(self, self.props.current_User))
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
      
    </div>
}

export function render_add_existing_Recipe_Asian_Recipe(self:RecipeContext) {
    
    let state = self.state()
    return self.props.mode == "edit" ?
      <div className="button__actions">
        {
          state.add_step_Asian != "open" ?
            <Buttons.Add disabled={state.Asian == "loading" ? true : state.Asian.TotalCount >= 1} 
              onClick={() =>
                self.setState({...self.state(), add_step_Asian:"open"}) }
                  target_name={"Asian"} />
          :
          React.createElement(List.AddToRelation,
            {
              relation_name:"recipe_asian_recipe",
              source_name:"Recipe",
              target_name:"Asian",
              target_plural:"Asians",
              page_size:10,
              render_target:(i,i_id) =>
                <div key={i_id} className="group__item">
                  <a className="group__button button button--existing"
                    onClick={() =>
                        self.setState({...self.state(), add_step_Asian:"saving"}, () =>
                          Api.link_Recipe_Asian_Recipes(self.props.entity, i).then(() =>
                            self.setState({...self.state(), add_step_Asian:"closed"}, () =>
                              load_relation_Recipe_Asian_Recipe(self, self.props.current_User))))
                      }>
                      Add existing
                  </a>
                  <div className="group__title" disabled={true}>
                    {
                      AsianViews.Asian({
                        ...self.props,
                        entity:i,
                        nesting_depth:self.props.nesting_depth+1,
                        size:"preview",
                        mode:"view",
                        is_editable:false,
                        nested_entity_names: self.props.nested_entity_names.push("Asian"),
                        set_size:undefined,
                        toggle_button:undefined,
                        set_mode:undefined,
                        set_entity:(new_entity:Models.Asian, callback?:()=>void) => {},
                        unlink: undefined,
                        delete: undefined
                      })
                    }
                  </div>
                </div>,
              cancel:() => self.setState({...self.state(), add_step_Asian:"closed"}),
              get_items:[
                { name: "Asian", get: async(i,s) => Api.get_unlinked_Recipe_Asian_Recipes(self.props.entity, i, s) },
              ]
            })
        }
      </div>
    :
      null
    }
  
export function render_add_existing_Recipe_Mediterranean_Recipe(self:RecipeContext) {
    
    let state = self.state()
    return self.props.mode == "edit" ?
      <div className="button__actions">
        {
          state.add_step_Mediterranean != "open" ?
            <Buttons.Add disabled={state.Mediterranean == "loading" ? true : state.Mediterranean.TotalCount >= 1} 
              onClick={() =>
                self.setState({...self.state(), add_step_Mediterranean:"open"}) }
                  target_name={"Mediterranean"} />
          :
          React.createElement(List.AddToRelation,
            {
              relation_name:"recipe_mediterranean_recipe",
              source_name:"Recipe",
              target_name:"Mediterranean",
              target_plural:"Mediterraneans",
              page_size:10,
              render_target:(i,i_id) =>
                <div key={i_id} className="group__item">
                  <a className="group__button button button--existing"
                    onClick={() =>
                        self.setState({...self.state(), add_step_Mediterranean:"saving"}, () =>
                          Api.link_Recipe_Mediterranean_Recipes(self.props.entity, i).then(() =>
                            self.setState({...self.state(), add_step_Mediterranean:"closed"}, () =>
                              load_relation_Recipe_Mediterranean_Recipe(self, self.props.current_User))))
                      }>
                      Add existing
                  </a>
                  <div className="group__title" disabled={true}>
                    {
                      MediterraneanViews.Mediterranean({
                        ...self.props,
                        entity:i,
                        nesting_depth:self.props.nesting_depth+1,
                        size:"preview",
                        mode:"view",
                        is_editable:false,
                        nested_entity_names: self.props.nested_entity_names.push("Mediterranean"),
                        set_size:undefined,
                        toggle_button:undefined,
                        set_mode:undefined,
                        set_entity:(new_entity:Models.Mediterranean, callback?:()=>void) => {},
                        unlink: undefined,
                        delete: undefined
                      })
                    }
                  </div>
                </div>,
              cancel:() => self.setState({...self.state(), add_step_Mediterranean:"closed"}),
              get_items:[
                { name: "Mediterranean", get: async(i,s) => Api.get_unlinked_Recipe_Mediterranean_Recipes(self.props.entity, i, s) },
              ]
            })
        }
      </div>
    :
      null
    }
  
export function render_add_existing_Recipe_Grill_Recipe(self:RecipeContext) {
    
    let state = self.state()
    return self.props.mode == "edit" ?
      <div className="button__actions">
        {
          state.add_step_Grill != "open" ?
            <Buttons.Add disabled={state.Grill == "loading" ? true : state.Grill.TotalCount >= 1} 
              onClick={() =>
                self.setState({...self.state(), add_step_Grill:"open"}) }
                  target_name={"Grill"} />
          :
          React.createElement(List.AddToRelation,
            {
              relation_name:"recipe_grill_recipe",
              source_name:"Recipe",
              target_name:"Grill",
              target_plural:"Grills",
              page_size:10,
              render_target:(i,i_id) =>
                <div key={i_id} className="group__item">
                  <a className="group__button button button--existing"
                    onClick={() =>
                        self.setState({...self.state(), add_step_Grill:"saving"}, () =>
                          Api.link_Recipe_Grill_Recipes(self.props.entity, i).then(() =>
                            self.setState({...self.state(), add_step_Grill:"closed"}, () =>
                              load_relation_Recipe_Grill_Recipe(self, self.props.current_User))))
                      }>
                      Add existing
                  </a>
                  <div className="group__title" disabled={true}>
                    {
                      GrillViews.Grill({
                        ...self.props,
                        entity:i,
                        nesting_depth:self.props.nesting_depth+1,
                        size:"preview",
                        mode:"view",
                        is_editable:false,
                        nested_entity_names: self.props.nested_entity_names.push("Grill"),
                        set_size:undefined,
                        toggle_button:undefined,
                        set_mode:undefined,
                        set_entity:(new_entity:Models.Grill, callback?:()=>void) => {},
                        unlink: undefined,
                        delete: undefined
                      })
                    }
                  </div>
                </div>,
              cancel:() => self.setState({...self.state(), add_step_Grill:"closed"}),
              get_items:[
                { name: "Grill", get: async(i,s) => Api.get_unlinked_Recipe_Grill_Recipes(self.props.entity, i, s) },
              ]
            })
        }
      </div>
    :
      null
    }
  
export function render_add_existing_Recipe_Breakfast_Recipe(self:RecipeContext) {
    
    let state = self.state()
    return self.props.mode == "edit" ?
      <div className="button__actions">
        {
          state.add_step_Breakfast != "open" ?
            <Buttons.Add disabled={state.Breakfast == "loading" ? true : state.Breakfast.TotalCount >= 1} 
              onClick={() =>
                self.setState({...self.state(), add_step_Breakfast:"open"}) }
                  target_name={"Breakfast"} />
          :
          React.createElement(List.AddToRelation,
            {
              relation_name:"recipe_breakfast_recipe",
              source_name:"Recipe",
              target_name:"Breakfast",
              target_plural:"Breakfasts",
              page_size:10,
              render_target:(i,i_id) =>
                <div key={i_id} className="group__item">
                  <a className="group__button button button--existing"
                    onClick={() =>
                        self.setState({...self.state(), add_step_Breakfast:"saving"}, () =>
                          Api.link_Recipe_Breakfast_Recipes(self.props.entity, i).then(() =>
                            self.setState({...self.state(), add_step_Breakfast:"closed"}, () =>
                              load_relation_Recipe_Breakfast_Recipe(self, self.props.current_User))))
                      }>
                      Add existing
                  </a>
                  <div className="group__title" disabled={true}>
                    {
                      BreakfastViews.Breakfast({
                        ...self.props,
                        entity:i,
                        nesting_depth:self.props.nesting_depth+1,
                        size:"preview",
                        mode:"view",
                        is_editable:false,
                        nested_entity_names: self.props.nested_entity_names.push("Breakfast"),
                        set_size:undefined,
                        toggle_button:undefined,
                        set_mode:undefined,
                        set_entity:(new_entity:Models.Breakfast, callback?:()=>void) => {},
                        unlink: undefined,
                        delete: undefined
                      })
                    }
                  </div>
                </div>,
              cancel:() => self.setState({...self.state(), add_step_Breakfast:"closed"}),
              get_items:[
                { name: "Breakfast", get: async(i,s) => Api.get_unlinked_Recipe_Breakfast_Recipes(self.props.entity, i, s) },
              ]
            })
        }
      </div>
    :
      null
    }
  
export function render_add_existing_Recipe_Brunch_Recipe(self:RecipeContext) {
    
    let state = self.state()
    return self.props.mode == "edit" ?
      <div className="button__actions">
        {
          state.add_step_Brunch != "open" ?
            <Buttons.Add disabled={state.Brunch == "loading" ? true : state.Brunch.TotalCount >= 1} 
              onClick={() =>
                self.setState({...self.state(), add_step_Brunch:"open"}) }
                  target_name={"Brunch"} />
          :
          React.createElement(List.AddToRelation,
            {
              relation_name:"recipe_brunch_recipe",
              source_name:"Recipe",
              target_name:"Brunch",
              target_plural:"Brunches",
              page_size:10,
              render_target:(i,i_id) =>
                <div key={i_id} className="group__item">
                  <a className="group__button button button--existing"
                    onClick={() =>
                        self.setState({...self.state(), add_step_Brunch:"saving"}, () =>
                          Api.link_Recipe_Brunch_Recipes(self.props.entity, i).then(() =>
                            self.setState({...self.state(), add_step_Brunch:"closed"}, () =>
                              load_relation_Recipe_Brunch_Recipe(self, self.props.current_User))))
                      }>
                      Add existing
                  </a>
                  <div className="group__title" disabled={true}>
                    {
                      BrunchViews.Brunch({
                        ...self.props,
                        entity:i,
                        nesting_depth:self.props.nesting_depth+1,
                        size:"preview",
                        mode:"view",
                        is_editable:false,
                        nested_entity_names: self.props.nested_entity_names.push("Brunch"),
                        set_size:undefined,
                        toggle_button:undefined,
                        set_mode:undefined,
                        set_entity:(new_entity:Models.Brunch, callback?:()=>void) => {},
                        unlink: undefined,
                        delete: undefined
                      })
                    }
                  </div>
                </div>,
              cancel:() => self.setState({...self.state(), add_step_Brunch:"closed"}),
              get_items:[
                { name: "Brunch", get: async(i,s) => Api.get_unlinked_Recipe_Brunch_Recipes(self.props.entity, i, s) },
              ]
            })
        }
      </div>
    :
      null
    }
  
export function render_add_existing_Recipe_Lunch_Recipe(self:RecipeContext) {
    
    let state = self.state()
    return self.props.mode == "edit" ?
      <div className="button__actions">
        {
          state.add_step_Lunch != "open" ?
            <Buttons.Add disabled={state.Lunch == "loading" ? true : state.Lunch.TotalCount >= 1} 
              onClick={() =>
                self.setState({...self.state(), add_step_Lunch:"open"}) }
                  target_name={"Lunch"} />
          :
          React.createElement(List.AddToRelation,
            {
              relation_name:"recipe_lunch_recipe",
              source_name:"Recipe",
              target_name:"Lunch",
              target_plural:"Lunches",
              page_size:10,
              render_target:(i,i_id) =>
                <div key={i_id} className="group__item">
                  <a className="group__button button button--existing"
                    onClick={() =>
                        self.setState({...self.state(), add_step_Lunch:"saving"}, () =>
                          Api.link_Recipe_Lunch_Recipes(self.props.entity, i).then(() =>
                            self.setState({...self.state(), add_step_Lunch:"closed"}, () =>
                              load_relation_Recipe_Lunch_Recipe(self, self.props.current_User))))
                      }>
                      Add existing
                  </a>
                  <div className="group__title" disabled={true}>
                    {
                      LunchViews.Lunch({
                        ...self.props,
                        entity:i,
                        nesting_depth:self.props.nesting_depth+1,
                        size:"preview",
                        mode:"view",
                        is_editable:false,
                        nested_entity_names: self.props.nested_entity_names.push("Lunch"),
                        set_size:undefined,
                        toggle_button:undefined,
                        set_mode:undefined,
                        set_entity:(new_entity:Models.Lunch, callback?:()=>void) => {},
                        unlink: undefined,
                        delete: undefined
                      })
                    }
                  </div>
                </div>,
              cancel:() => self.setState({...self.state(), add_step_Lunch:"closed"}),
              get_items:[
                { name: "Lunch", get: async(i,s) => Api.get_unlinked_Recipe_Lunch_Recipes(self.props.entity, i, s) },
              ]
            })
        }
      </div>
    :
      null
    }
  
export function render_add_existing_Recipe_Dinner_Recipe(self:RecipeContext) {
    
    let state = self.state()
    return self.props.mode == "edit" ?
      <div className="button__actions">
        {
          state.add_step_Dinner != "open" ?
            <Buttons.Add disabled={state.Dinner == "loading" ? true : state.Dinner.TotalCount >= 1} 
              onClick={() =>
                self.setState({...self.state(), add_step_Dinner:"open"}) }
                  target_name={"Dinner"} />
          :
          React.createElement(List.AddToRelation,
            {
              relation_name:"recipe_dinner_recipe",
              source_name:"Recipe",
              target_name:"Dinner",
              target_plural:"Dinners",
              page_size:10,
              render_target:(i,i_id) =>
                <div key={i_id} className="group__item">
                  <a className="group__button button button--existing"
                    onClick={() =>
                        self.setState({...self.state(), add_step_Dinner:"saving"}, () =>
                          Api.link_Recipe_Dinner_Recipes(self.props.entity, i).then(() =>
                            self.setState({...self.state(), add_step_Dinner:"closed"}, () =>
                              load_relation_Recipe_Dinner_Recipe(self, self.props.current_User))))
                      }>
                      Add existing
                  </a>
                  <div className="group__title" disabled={true}>
                    {
                      DinnerViews.Dinner({
                        ...self.props,
                        entity:i,
                        nesting_depth:self.props.nesting_depth+1,
                        size:"preview",
                        mode:"view",
                        is_editable:false,
                        nested_entity_names: self.props.nested_entity_names.push("Dinner"),
                        set_size:undefined,
                        toggle_button:undefined,
                        set_mode:undefined,
                        set_entity:(new_entity:Models.Dinner, callback?:()=>void) => {},
                        unlink: undefined,
                        delete: undefined
                      })
                    }
                  </div>
                </div>,
              cancel:() => self.setState({...self.state(), add_step_Dinner:"closed"}),
              get_items:[
                { name: "Dinner", get: async(i,s) => Api.get_unlinked_Recipe_Dinner_Recipes(self.props.entity, i, s) },
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
              page_size:10,
              render_target:(i,i_id) =>
                <div key={i_id} className="group__item">
                  <a className="group__button button button--existing"
                    onClick={() =>
                        self.setState({...self.state(), add_step_PreparationTime:"saving"}, () =>
                          Api.link_Recipe_PreparationTime_Recipes(self.props.entity, i).then(() =>
                            self.setState({...self.state(), add_step_PreparationTime:"closed"}, () =>
                              load_relation_Recipe_PreparationTime_Recipe(self, self.props.current_User))))
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
                { name: "nintee", get: async(i,s) => Api.get_unlinked_Recipe_PreparationTime_Recipes_nintee(self.props.entity, i, s) }, 
                { name: "thirty", get: async(i,s) => Api.get_unlinked_Recipe_PreparationTime_Recipes_thirty(self.props.entity, i, s) }, 
                { name: "sixty", get: async(i,s) => Api.get_unlinked_Recipe_PreparationTime_Recipes_sixty(self.props.entity, i, s) }, 
                { name: "fifteen", get: async(i,s) => Api.get_unlinked_Recipe_PreparationTime_Recipes_fifteen(self.props.entity, i, s) }
              ]
            })
        }
      </div>
    :
      null
    }
  
export function render_add_existing_Recipe_Favorite_Recipe(self:RecipeContext) {
    
    let state = self.state()
    return self.props.mode == "edit" ?
      <div className="button__actions">
        {
          state.add_step_Favorite != "open" ?
            <Buttons.Add 
              onClick={() =>
                self.setState({...self.state(), add_step_Favorite:"open"}) }
                  target_name={"Favorite"} />
          :
          React.createElement(List.AddToRelation,
            {
              relation_name:"recipe_favorite_recipe",
              source_name:"Recipe",
              target_name:"Favorite",
              target_plural:"Favorites",
              page_size:10,
              render_target:(i,i_id) =>
                <div key={i_id} className="group__item">
                  <a className="group__button button button--existing"
                    onClick={() =>
                        self.setState({...self.state(), add_step_Favorite:"saving"}, () =>
                          Api.link_Recipe_Favorite_Recipes(self.props.entity, i).then(() =>
                            self.setState({...self.state(), add_step_Favorite:"closed"}, () =>
                              load_relation_Recipe_Favorite_Recipe(self, self.props.current_User))))
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
                { name: "Favorite", get: async(i,s) => Api.get_unlinked_Recipe_Favorite_Recipes(self.props.entity, i, s) },
              ]
            })
        }
      </div>
    :
      null
    }
  
export function render_add_existing_Recipe_Rating_Recipe(self:RecipeContext) {
    
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
              relation_name:"recipe_rating_recipe",
              source_name:"Recipe",
              target_name:"Rating",
              target_plural:"Ratings",
              page_size:10,
              render_target:(i,i_id) =>
                <div key={i_id} className="group__item">
                  <a className="group__button button button--existing"
                    onClick={() =>
                        self.setState({...self.state(), add_step_Rating:"saving"}, () =>
                          Api.link_Recipe_Rating_Recipes(self.props.entity, i).then(() =>
                            self.setState({...self.state(), add_step_Rating:"closed"}, () =>
                              load_relation_Recipe_Rating_Recipe(self, self.props.current_User))))
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
                { name: "Rating", get: async(i,s) => Api.get_unlinked_Recipe_Rating_Recipes(self.props.entity, i, s) },
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
              page_size:10,
              render_target:(i,i_id) =>
                <div key={i_id} className="group__item">
                  <a className="group__button button button--existing"
                    onClick={() =>
                        self.setState({...self.state(), add_step_RecommendationPage:"saving"}, () =>
                          Api.link_Recipe_RecommendationPage_Recipes(self.props.entity, i).then(() =>
                            self.setState({...self.state(), add_step_RecommendationPage:"closed"}, () =>
                              load_relation_Recipe_RecommendationPage_Recipe(self, self.props.current_User))))
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
  

export function render_new_Recipe_Asian_Recipe(self:RecipeContext) {
    let state = self.state()
    return  self.props.mode == "edit" ?
      <div className="button__actions">
        <div className="new-asian">
              <button disabled={state.Asian == "loading" ? true : state.Asian.TotalCount >= 1} 
                      className="new-asian button button--new"
                      onClick={() =>
                          Api.create_linked_Recipe_Asian_Recipes_Asian(self.props.entity).then(e => {
                              e.length > 0 &&
                              Api.update_Asian(
                                ({ ...e[0], Kind:"Asian",  } as Models.Asian)).then(() =>
                                load_relation_Recipe_Asian_Recipe(self, self.props.current_User, () =>
                                    self.setState({...self.state(), add_step_Asian:"closed"})
                                  )
                                )
                          })
                      }>
                  {i18next.t('Create new Asian')}
              </button>
            </div>
        </div>
      :
      null
    }
  
export function render_new_Recipe_Mediterranean_Recipe(self:RecipeContext) {
    let state = self.state()
    return  self.props.mode == "edit" ?
      <div className="button__actions">
        <div className="new-mediterranean">
              <button disabled={state.Mediterranean == "loading" ? true : state.Mediterranean.TotalCount >= 1} 
                      className="new-mediterranean button button--new"
                      onClick={() =>
                          Api.create_linked_Recipe_Mediterranean_Recipes_Mediterranean(self.props.entity).then(e => {
                              e.length > 0 &&
                              Api.update_Mediterranean(
                                ({ ...e[0], Kind:"Mediterranean",  } as Models.Mediterranean)).then(() =>
                                load_relation_Recipe_Mediterranean_Recipe(self, self.props.current_User, () =>
                                    self.setState({...self.state(), add_step_Mediterranean:"closed"})
                                  )
                                )
                          })
                      }>
                  {i18next.t('Create new Mediterranean')}
              </button>
            </div>
        </div>
      :
      null
    }
  
export function render_new_Recipe_Grill_Recipe(self:RecipeContext) {
    let state = self.state()
    return  self.props.mode == "edit" ?
      <div className="button__actions">
        <div className="new-grill">
              <button disabled={state.Grill == "loading" ? true : state.Grill.TotalCount >= 1} 
                      className="new-grill button button--new"
                      onClick={() =>
                          Api.create_linked_Recipe_Grill_Recipes_Grill(self.props.entity).then(e => {
                              e.length > 0 &&
                              Api.update_Grill(
                                ({ ...e[0], Kind:"Grill",  } as Models.Grill)).then(() =>
                                load_relation_Recipe_Grill_Recipe(self, self.props.current_User, () =>
                                    self.setState({...self.state(), add_step_Grill:"closed"})
                                  )
                                )
                          })
                      }>
                  {i18next.t('Create new Grill')}
              </button>
            </div>
        </div>
      :
      null
    }
  
export function render_new_Recipe_Breakfast_Recipe(self:RecipeContext) {
    let state = self.state()
    return  self.props.mode == "edit" ?
      <div className="button__actions">
        <div className="new-breakfast">
              <button disabled={state.Breakfast == "loading" ? true : state.Breakfast.TotalCount >= 1} 
                      className="new-breakfast button button--new"
                      onClick={() =>
                          Api.create_linked_Recipe_Breakfast_Recipes_Breakfast(self.props.entity).then(e => {
                              e.length > 0 &&
                              Api.update_Breakfast(
                                ({ ...e[0], Kind:"Breakfast",  } as Models.Breakfast)).then(() =>
                                load_relation_Recipe_Breakfast_Recipe(self, self.props.current_User, () =>
                                    self.setState({...self.state(), add_step_Breakfast:"closed"})
                                  )
                                )
                          })
                      }>
                  {i18next.t('Create new Breakfast')}
              </button>
            </div>
        </div>
      :
      null
    }
  
export function render_new_Recipe_Brunch_Recipe(self:RecipeContext) {
    let state = self.state()
    return  self.props.mode == "edit" ?
      <div className="button__actions">
        <div className="new-brunch">
              <button disabled={state.Brunch == "loading" ? true : state.Brunch.TotalCount >= 1} 
                      className="new-brunch button button--new"
                      onClick={() =>
                          Api.create_linked_Recipe_Brunch_Recipes_Brunch(self.props.entity).then(e => {
                              e.length > 0 &&
                              Api.update_Brunch(
                                ({ ...e[0], Kind:"Brunch",  } as Models.Brunch)).then(() =>
                                load_relation_Recipe_Brunch_Recipe(self, self.props.current_User, () =>
                                    self.setState({...self.state(), add_step_Brunch:"closed"})
                                  )
                                )
                          })
                      }>
                  {i18next.t('Create new Brunch')}
              </button>
            </div>
        </div>
      :
      null
    }
  
export function render_new_Recipe_Lunch_Recipe(self:RecipeContext) {
    let state = self.state()
    return  self.props.mode == "edit" ?
      <div className="button__actions">
        <div className="new-lunch">
              <button disabled={state.Lunch == "loading" ? true : state.Lunch.TotalCount >= 1} 
                      className="new-lunch button button--new"
                      onClick={() =>
                          Api.create_linked_Recipe_Lunch_Recipes_Lunch(self.props.entity).then(e => {
                              e.length > 0 &&
                              Api.update_Lunch(
                                ({ ...e[0], Kind:"Lunch",  } as Models.Lunch)).then(() =>
                                load_relation_Recipe_Lunch_Recipe(self, self.props.current_User, () =>
                                    self.setState({...self.state(), add_step_Lunch:"closed"})
                                  )
                                )
                          })
                      }>
                  {i18next.t('Create new Lunch')}
              </button>
            </div>
        </div>
      :
      null
    }
  
export function render_new_Recipe_Dinner_Recipe(self:RecipeContext) {
    let state = self.state()
    return  self.props.mode == "edit" ?
      <div className="button__actions">
        <div className="new-dinner">
              <button disabled={state.Dinner == "loading" ? true : state.Dinner.TotalCount >= 1} 
                      className="new-dinner button button--new"
                      onClick={() =>
                          Api.create_linked_Recipe_Dinner_Recipes_Dinner(self.props.entity).then(e => {
                              e.length > 0 &&
                              Api.update_Dinner(
                                ({ ...e[0], Kind:"Dinner",  } as Models.Dinner)).then(() =>
                                load_relation_Recipe_Dinner_Recipe(self, self.props.current_User, () =>
                                    self.setState({...self.state(), add_step_Dinner:"closed"})
                                  )
                                )
                          })
                      }>
                  {i18next.t('Create new Dinner')}
              </button>
            </div>
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
              <div className="new-nintee">
              <button disabled={state.PreparationTime == "loading" ? true : state.PreparationTime.TotalCount >= 1} 
                      className="new-nintee button button--new"
                      onClick={() =>
                          Api.create_linked_Recipe_PreparationTime_Recipes_nintee(self.props.entity).then(e => {
                              e.length > 0 &&
                              Api.update_nintee(
                                ({ ...e[0], Kind:"nintee", Description:"" } as Models.nintee)).then(() =>
                                load_relation_Recipe_PreparationTime_Recipe(self, self.props.current_User, () =>
                                    self.setState({...self.state(), add_step_PreparationTime:"closed"})
                                  )
                                )
                          })
                      }>
                  {i18next.t('Create new nintee')}
              </button>
            </div>
            <div className="new-thirty">
              <button disabled={state.PreparationTime == "loading" ? true : state.PreparationTime.TotalCount >= 1} 
                      className="new-thirty button button--new"
                      onClick={() =>
                          Api.create_linked_Recipe_PreparationTime_Recipes_thirty(self.props.entity).then(e => {
                              e.length > 0 &&
                              Api.update_thirty(
                                ({ ...e[0], Kind:"thirty", Description:"" } as Models.thirty)).then(() =>
                                load_relation_Recipe_PreparationTime_Recipe(self, self.props.current_User, () =>
                                    self.setState({...self.state(), add_step_PreparationTime:"closed"})
                                  )
                                )
                          })
                      }>
                  {i18next.t('Create new thirty')}
              </button>
            </div>
            <div className="new-sixty">
              <button disabled={state.PreparationTime == "loading" ? true : state.PreparationTime.TotalCount >= 1} 
                      className="new-sixty button button--new"
                      onClick={() =>
                          Api.create_linked_Recipe_PreparationTime_Recipes_sixty(self.props.entity).then(e => {
                              e.length > 0 &&
                              Api.update_sixty(
                                ({ ...e[0], Kind:"sixty", Description:"" } as Models.sixty)).then(() =>
                                load_relation_Recipe_PreparationTime_Recipe(self, self.props.current_User, () =>
                                    self.setState({...self.state(), add_step_PreparationTime:"closed"})
                                  )
                                )
                          })
                      }>
                  {i18next.t('Create new sixty')}
              </button>
            </div>
            <div className="new-fifteen">
              <button disabled={state.PreparationTime == "loading" ? true : state.PreparationTime.TotalCount >= 1} 
                      className="new-fifteen button button--new"
                      onClick={() =>
                          Api.create_linked_Recipe_PreparationTime_Recipes_fifteen(self.props.entity).then(e => {
                              e.length > 0 &&
                              Api.update_fifteen(
                                ({ ...e[0], Kind:"fifteen", Description:"" } as Models.fifteen)).then(() =>
                                load_relation_Recipe_PreparationTime_Recipe(self, self.props.current_User, () =>
                                    self.setState({...self.state(), add_step_PreparationTime:"closed"})
                                  )
                                )
                          })
                      }>
                  {i18next.t('Create new fifteen')}
              </button>
            </div>
              <Buttons.Cancel onClick={() => self.setState({...self.state(), add_step_PreparationTime:"closed"})} />
            </div>
            }
        </div>
      :
      null
    }
  
export function render_new_Recipe_Favorite_Recipe(self:RecipeContext) {
    let state = self.state()
    return  self.props.mode == "edit" ?
      <div className="button__actions">
        <div className="new-favorite">
              <button 
                      className="new-favorite button button--new"
                      onClick={() =>
                          Api.create_linked_Recipe_Favorite_Recipes_Favorite(self.props.entity).then(e => {
                              e.length > 0 &&
                              Api.update_Favorite(
                                ({ ...e[0],  } as Models.Favorite)).then(() =>
                                load_relation_Recipe_Favorite_Recipe(self, self.props.current_User, () =>
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
  
export function render_new_Recipe_Rating_Recipe(self:RecipeContext) {
    let state = self.state()
    return  self.props.mode == "edit" ?
      <div className="button__actions">
        <div className="new-rating">
              <button 
                      className="new-rating button button--new"
                      onClick={() =>
                          Api.create_linked_Recipe_Rating_Recipes_Rating(self.props.entity).then(e => {
                              e.length > 0 &&
                              Api.update_Rating(
                                ({ ...e[0],  } as Models.Rating)).then(() =>
                                load_relation_Recipe_Rating_Recipe(self, self.props.current_User, () =>
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
                                load_relation_Recipe_RecommendationPage_Recipe(self, self.props.current_User, () =>
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
  return self.state().dirty_Asian.count() > 0 ?
    <div style={{position:"fixed", zIndex:10000, top:0, left:0, width:"20px", height:"20px", backgroundColor:"red"}} className="saving"/> : 
    self.state().dirty_Mediterranean.count() > 0 ?
    <div style={{position:"fixed", zIndex:10000, top:0, left:0, width:"20px", height:"20px", backgroundColor:"red"}} className="saving"/> : 
    self.state().dirty_Grill.count() > 0 ?
    <div style={{position:"fixed", zIndex:10000, top:0, left:0, width:"20px", height:"20px", backgroundColor:"red"}} className="saving"/> : 
    self.state().dirty_Breakfast.count() > 0 ?
    <div style={{position:"fixed", zIndex:10000, top:0, left:0, width:"20px", height:"20px", backgroundColor:"red"}} className="saving"/> : 
    self.state().dirty_Brunch.count() > 0 ?
    <div style={{position:"fixed", zIndex:10000, top:0, left:0, width:"20px", height:"20px", backgroundColor:"red"}} className="saving"/> : 
    self.state().dirty_Lunch.count() > 0 ?
    <div style={{position:"fixed", zIndex:10000, top:0, left:0, width:"20px", height:"20px", backgroundColor:"red"}} className="saving"/> : 
    self.state().dirty_Dinner.count() > 0 ?
    <div style={{position:"fixed", zIndex:10000, top:0, left:0, width:"20px", height:"20px", backgroundColor:"red"}} className="saving"/> : 
    self.state().dirty_PreparationTime.count() > 0 ?
    <div style={{position:"fixed", zIndex:10000, top:0, left:0, width:"20px", height:"20px", backgroundColor:"red"}} className="saving"/> : 
    self.state().dirty_Favorite.count() > 0 ?
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
    add_step_Asian:"closed"|"open"|"saving",
      dirty_Asian:Immutable.Map<number,Models.Asian>,
      Asian:Utils.PaginatedItems<{ shown_relation: string } & Utils.EntityAndSize<Models.Asian>>|"loading"
  add_step_Mediterranean:"closed"|"open"|"saving",
      dirty_Mediterranean:Immutable.Map<number,Models.Mediterranean>,
      Mediterranean:Utils.PaginatedItems<{ shown_relation: string } & Utils.EntityAndSize<Models.Mediterranean>>|"loading"
  add_step_Grill:"closed"|"open"|"saving",
      dirty_Grill:Immutable.Map<number,Models.Grill>,
      Grill:Utils.PaginatedItems<{ shown_relation: string } & Utils.EntityAndSize<Models.Grill>>|"loading"
  add_step_Breakfast:"closed"|"open"|"saving",
      dirty_Breakfast:Immutable.Map<number,Models.Breakfast>,
      Breakfast:Utils.PaginatedItems<{ shown_relation: string } & Utils.EntityAndSize<Models.Breakfast>>|"loading"
  add_step_Brunch:"closed"|"open"|"saving",
      dirty_Brunch:Immutable.Map<number,Models.Brunch>,
      Brunch:Utils.PaginatedItems<{ shown_relation: string } & Utils.EntityAndSize<Models.Brunch>>|"loading"
  add_step_Lunch:"closed"|"open"|"saving",
      dirty_Lunch:Immutable.Map<number,Models.Lunch>,
      Lunch:Utils.PaginatedItems<{ shown_relation: string } & Utils.EntityAndSize<Models.Lunch>>|"loading"
  add_step_Dinner:"closed"|"open"|"saving",
      dirty_Dinner:Immutable.Map<number,Models.Dinner>,
      Dinner:Utils.PaginatedItems<{ shown_relation: string } & Utils.EntityAndSize<Models.Dinner>>|"loading"
  add_step_PreparationTime:"closed"|"open"|"saving"|"adding"|"creating",
      dirty_PreparationTime:Immutable.Map<number,Models.PreparationTime>,
      PreparationTime:Utils.PaginatedItems<{ shown_relation: string } & Utils.EntityAndSize<Models.PreparationTime>>|"loading"
  add_step_Favorite:"closed"|"open"|"saving",
      dirty_Favorite:Immutable.Map<number,Models.Favorite>,
      Favorite:Utils.PaginatedItems<{ shown_relation: string } & Utils.EntityAndSize<Models.Favorite>>|"loading"
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
    this.state = { update_count:0, add_step_Asian:"closed", dirty_Asian:Immutable.Map<number,Models.Asian>(), Asian:"loading", add_step_Mediterranean:"closed", dirty_Mediterranean:Immutable.Map<number,Models.Mediterranean>(), Mediterranean:"loading", add_step_Grill:"closed", dirty_Grill:Immutable.Map<number,Models.Grill>(), Grill:"loading", add_step_Breakfast:"closed", dirty_Breakfast:Immutable.Map<number,Models.Breakfast>(), Breakfast:"loading", add_step_Brunch:"closed", dirty_Brunch:Immutable.Map<number,Models.Brunch>(), Brunch:"loading", add_step_Lunch:"closed", dirty_Lunch:Immutable.Map<number,Models.Lunch>(), Lunch:"loading", add_step_Dinner:"closed", dirty_Dinner:Immutable.Map<number,Models.Dinner>(), Dinner:"loading", add_step_PreparationTime:"closed", dirty_PreparationTime:Immutable.Map<number,Models.PreparationTime>(), PreparationTime:"loading", add_step_Favorite:"closed", dirty_Favorite:Immutable.Map<number,Models.Favorite>(), Favorite:"loading", add_step_Rating:"closed", dirty_Rating:Immutable.Map<number,Models.Rating>(), Rating:"loading", add_step_RecommendationPage:"closed", dirty_RecommendationPage:Immutable.Map<number,Models.RecommendationPage>(), RecommendationPage:"loading", add_step_Homepage:"closed", dirty_Homepage:Immutable.Map<number,Models.Homepage>(), Homepage:"loading" }
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
      load_relations_Recipe(this.get_self(), new_props.current_User)
    }
  }

  thread:number = null
  componentWillMount() {
    if (this.props.size == "breadcrumb") return
    if (this.props.size != "preview")
      load_relations_Recipe(this.get_self(), this.props.current_User)

    this.thread = setInterval(() => {
      if (this.state.dirty_Asian.count() > 0) {
         let first = this.state.dirty_Asian.first()
         this.setState({...this.state, dirty_Asian: this.state.dirty_Asian.remove(first.Id)}, () =>
           Api.update_Asian(first)
         )
       } else if (this.state.dirty_Mediterranean.count() > 0) {
         let first = this.state.dirty_Mediterranean.first()
         this.setState({...this.state, dirty_Mediterranean: this.state.dirty_Mediterranean.remove(first.Id)}, () =>
           Api.update_Mediterranean(first)
         )
       } else if (this.state.dirty_Grill.count() > 0) {
         let first = this.state.dirty_Grill.first()
         this.setState({...this.state, dirty_Grill: this.state.dirty_Grill.remove(first.Id)}, () =>
           Api.update_Grill(first)
         )
       } else if (this.state.dirty_Breakfast.count() > 0) {
         let first = this.state.dirty_Breakfast.first()
         this.setState({...this.state, dirty_Breakfast: this.state.dirty_Breakfast.remove(first.Id)}, () =>
           Api.update_Breakfast(first)
         )
       } else if (this.state.dirty_Brunch.count() > 0) {
         let first = this.state.dirty_Brunch.first()
         this.setState({...this.state, dirty_Brunch: this.state.dirty_Brunch.remove(first.Id)}, () =>
           Api.update_Brunch(first)
         )
       } else if (this.state.dirty_Lunch.count() > 0) {
         let first = this.state.dirty_Lunch.first()
         this.setState({...this.state, dirty_Lunch: this.state.dirty_Lunch.remove(first.Id)}, () =>
           Api.update_Lunch(first)
         )
       } else if (this.state.dirty_Dinner.count() > 0) {
         let first = this.state.dirty_Dinner.first()
         this.setState({...this.state, dirty_Dinner: this.state.dirty_Dinner.remove(first.Id)}, () =>
           Api.update_Dinner(first)
         )
       } else if (this.state.dirty_PreparationTime.count() > 0) {
         let first = this.state.dirty_PreparationTime.first()
         this.setState({...this.state, dirty_PreparationTime: this.state.dirty_PreparationTime.remove(first.Id)}, () =>
           Api.update_PreparationTime(first)
         )
       } else if (this.state.dirty_Favorite.count() > 0) {
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
  let can_edit = Utils.any_of([Permissions.can_edit_Recipe, Permissions.can_edit_Asian_Recipe, Permissions.can_edit_Mediterranean_Recipe, Permissions.can_edit_Grill_Recipe, Permissions.can_edit_Breakfast_Recipe, Permissions.can_edit_Brunch_Recipe, Permissions.can_edit_Lunch_Recipe, Permissions.can_edit_Dinner_Recipe, Permissions.can_edit_PreparationTime_Recipe, Permissions.can_edit_Favorite_Recipe, Permissions.can_edit_Rating_Recipe, Permissions.can_edit_RecommendationPage_Recipe, Permissions.can_edit_Homepage_Recipe, Permissions.can_edit_Asian, Permissions.can_edit_Mediterranean, Permissions.can_edit_Grill, Permissions.can_edit_Breakfast, Permissions.can_edit_Brunch, Permissions.can_edit_Lunch, Permissions.can_edit_Dinner, Permissions.can_edit_PreparationTime, Permissions.can_edit_Favorite, Permissions.can_edit_Rating, Permissions.can_edit_RecommendationPage, Permissions.can_edit_Homepage])
  return Utils.scene_to_page<Models.Recipe>(can_edit, Recipe, Api.get_Recipe(id), Api.update_Recipe, "Recipe", "Recipe", `/Recipes/${id}`)
}

export let Recipe_to = (id:number, target_element_id:string, current_User:Models.User) => {
  Utils.render_page_manager(target_element_id,
    Recipe_to_page(id),
    current_User
  )
}
