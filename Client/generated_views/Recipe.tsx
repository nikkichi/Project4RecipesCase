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









export function load_relations_Recipe(self, callback?:()=>void) {
  callback && callback()
}

export function set_size_Recipe(self:RecipeContext, new_size:Utils.EntitySize) {
  self.props.set_size(new_size, () => {
    if (new_size == "fullscreen")
      self.props.push(Recipe_to_page(self.props.entity.Id))
  })
}

export function render_Recipe_Name_editable_minimised(self:RecipeContext) : JSX.Element {
  if (!Permissions.can_edit_Recipe()) return render_Recipe_Name_minimised(self)
  else
    return !Permissions.can_view_Recipe_Name() ? <div /> :
          <div className="model__attribute name">
  <label className="attribute-label attribute-label-name">{i18next.t(`Recipe:Name`, {context: self.props.inline ? "inline" : ""})}</label>
  <div className="model__attribute-content">
    { Components.String(
        self.props.is_editable && Permissions.can_edit_Recipe() && Permissions.can_edit_Recipe_Name(),
        self.props.mode,
        () => self.props.entity.Name,
        v => self.props.set_entity({...self.props.entity, Name:v})) } 
  </div>
</div>
}

export function render_Recipe_Description_editable_minimised(self:RecipeContext) : JSX.Element {
  if (!Permissions.can_edit_Recipe()) return render_Recipe_Description_minimised(self)
  else
    return !Permissions.can_view_Recipe_Description() ? <div /> :
          <div className="model__attribute description">
  <label className="attribute-label attribute-label-description">{i18next.t(`Recipe:Description`, {context: self.props.inline ? "inline" : ""})}</label>
  <div className="model__attribute-content">
    { Components.String(
        self.props.is_editable && Permissions.can_edit_Recipe() && Permissions.can_edit_Recipe_Description(),
        self.props.mode,
        () => self.props.entity.Description,
        v => self.props.set_entity({...self.props.entity, Description:v})) } 
  </div>
</div>
}

export function render_Recipe_RatingType_editable_minimised(self:RecipeContext) : JSX.Element {
  if (!Permissions.can_edit_Recipe()) return render_Recipe_RatingType_minimised(self)
  else
    return !Permissions.can_view_Recipe_RatingType() ? <div /> :
          <div className="model__attribute ratingtype">
  <label className="attribute-label attribute-label-ratingtype">{i18next.t(`Recipe:RatingType`, {context: self.props.inline ? "inline" : ""})}</label>
  <div className="model__attribute-content">
    { Components.Number(
        self.props.is_editable && Permissions.can_edit_Recipe() && Permissions.can_edit_Recipe_RatingType(),
        self.props.mode,
        () => self.props.entity.RatingType,
        v => self.props.set_entity({...self.props.entity, RatingType:v})) } 
  </div>
</div>
}

export function render_Recipe_Ingredients_editable_minimised(self:RecipeContext) : JSX.Element {
  if (!Permissions.can_edit_Recipe()) return render_Recipe_Ingredients_minimised(self)
  else
    return !Permissions.can_view_Recipe_Ingredients() ? <div /> :
          <div className="model__attribute ingredients">
  <label className="attribute-label attribute-label-ingredients">{i18next.t(`Recipe:Ingredients`, {context: self.props.inline ? "inline" : ""})}</label>
  <div className="model__attribute-content">
    { Components.String(
        self.props.is_editable && Permissions.can_edit_Recipe() && Permissions.can_edit_Recipe_Ingredients(),
        self.props.mode,
        () => self.props.entity.Ingredients,
        v => self.props.set_entity({...self.props.entity, Ingredients:v})) } 
  </div>
</div>
}

export function render_Recipe_CuisineType_editable_minimised(self:RecipeContext) : JSX.Element {
  if (!Permissions.can_edit_Recipe()) return render_Recipe_CuisineType_minimised(self)
  else
    return !Permissions.can_view_Recipe_CuisineType() ? <div /> :
          <div className="model__attribute cuisinetype">
  <label className="attribute-label attribute-label-cuisinetype">{i18next.t(`Recipe:CuisineType`, {context: self.props.inline ? "inline" : ""})}</label>
  <div className="model__attribute-content">
    { Components.String(
        self.props.is_editable && Permissions.can_edit_Recipe() && Permissions.can_edit_Recipe_CuisineType(),
        self.props.mode,
        () => self.props.entity.CuisineType,
        v => self.props.set_entity({...self.props.entity, CuisineType:v})) } 
  </div>
</div>
}

export function render_Recipe_MealType_editable_minimised(self:RecipeContext) : JSX.Element {
  if (!Permissions.can_edit_Recipe()) return render_Recipe_MealType_minimised(self)
  else
    return !Permissions.can_view_Recipe_MealType() ? <div /> :
          <div className="model__attribute mealtype">
  <label className="attribute-label attribute-label-mealtype">{i18next.t(`Recipe:MealType`, {context: self.props.inline ? "inline" : ""})}</label>
  <div className="model__attribute-content">
    { Components.String(
        self.props.is_editable && Permissions.can_edit_Recipe() && Permissions.can_edit_Recipe_MealType(),
        self.props.mode,
        () => self.props.entity.MealType,
        v => self.props.set_entity({...self.props.entity, MealType:v})) } 
  </div>
</div>
}

export function render_Recipe_PreparationType_editable_minimised(self:RecipeContext) : JSX.Element {
  if (!Permissions.can_edit_Recipe()) return render_Recipe_PreparationType_minimised(self)
  else
    return !Permissions.can_view_Recipe_PreparationType() ? <div /> :
          <div className="model__attribute preparationtype">
  <label className="attribute-label attribute-label-preparationtype">{i18next.t(`Recipe:PreparationType`, {context: self.props.inline ? "inline" : ""})}</label>
  <div className="model__attribute-content">
    { Components.String(
        self.props.is_editable && Permissions.can_edit_Recipe() && Permissions.can_edit_Recipe_PreparationType(),
        self.props.mode,
        () => self.props.entity.PreparationType,
        v => self.props.set_entity({...self.props.entity, PreparationType:v})) } 
  </div>
</div>
}


export function render_Recipe_Name_editable_maximised(self:RecipeContext) : JSX.Element {
  if (!Permissions.can_edit_Recipe()) return render_Recipe_Name_maximised(self)
  else
    return !Permissions.can_view_Recipe_Name() ? <div /> :
          <div className="model__attribute name">
  <label className="attribute-label attribute-label-name">{i18next.t(`Recipe:Name`, {context: self.props.inline ? "inline" : ""})}</label>
  <div className="model__attribute-content">
    { Components.String(
        self.props.is_editable && Permissions.can_edit_Recipe() && Permissions.can_edit_Recipe_Name(),
        self.props.mode,
        () => self.props.entity.Name,
        v => self.props.set_entity({...self.props.entity, Name:v})) } 
  </div>
</div>
}

export function render_Recipe_Description_editable_maximised(self:RecipeContext) : JSX.Element {
  if (!Permissions.can_edit_Recipe()) return render_Recipe_Description_maximised(self)
  else
    return !Permissions.can_view_Recipe_Description() ? <div /> :
          <div className="model__attribute description">
  <label className="attribute-label attribute-label-description">{i18next.t(`Recipe:Description`, {context: self.props.inline ? "inline" : ""})}</label>
  <div className="model__attribute-content">
    { Components.String(
        self.props.is_editable && Permissions.can_edit_Recipe() && Permissions.can_edit_Recipe_Description(),
        self.props.mode,
        () => self.props.entity.Description,
        v => self.props.set_entity({...self.props.entity, Description:v})) } 
  </div>
</div>
}

export function render_Recipe_RatingType_editable_maximised(self:RecipeContext) : JSX.Element {
  if (!Permissions.can_edit_Recipe()) return render_Recipe_RatingType_maximised(self)
  else
    return !Permissions.can_view_Recipe_RatingType() ? <div /> :
          <div className="model__attribute ratingtype">
  <label className="attribute-label attribute-label-ratingtype">{i18next.t(`Recipe:RatingType`, {context: self.props.inline ? "inline" : ""})}</label>
  <div className="model__attribute-content">
    { Components.Number(
        self.props.is_editable && Permissions.can_edit_Recipe() && Permissions.can_edit_Recipe_RatingType(),
        self.props.mode,
        () => self.props.entity.RatingType,
        v => self.props.set_entity({...self.props.entity, RatingType:v})) } 
  </div>
</div>
}

export function render_Recipe_Ingredients_editable_maximised(self:RecipeContext) : JSX.Element {
  if (!Permissions.can_edit_Recipe()) return render_Recipe_Ingredients_maximised(self)
  else
    return !Permissions.can_view_Recipe_Ingredients() ? <div /> :
          <div className="model__attribute ingredients">
  <label className="attribute-label attribute-label-ingredients">{i18next.t(`Recipe:Ingredients`, {context: self.props.inline ? "inline" : ""})}</label>
  <div className="model__attribute-content">
    { Components.String(
        self.props.is_editable && Permissions.can_edit_Recipe() && Permissions.can_edit_Recipe_Ingredients(),
        self.props.mode,
        () => self.props.entity.Ingredients,
        v => self.props.set_entity({...self.props.entity, Ingredients:v})) } 
  </div>
</div>
}

export function render_Recipe_CuisineType_editable_maximised(self:RecipeContext) : JSX.Element {
  if (!Permissions.can_edit_Recipe()) return render_Recipe_CuisineType_maximised(self)
  else
    return !Permissions.can_view_Recipe_CuisineType() ? <div /> :
          <div className="model__attribute cuisinetype">
  <label className="attribute-label attribute-label-cuisinetype">{i18next.t(`Recipe:CuisineType`, {context: self.props.inline ? "inline" : ""})}</label>
  <div className="model__attribute-content">
    { Components.String(
        self.props.is_editable && Permissions.can_edit_Recipe() && Permissions.can_edit_Recipe_CuisineType(),
        self.props.mode,
        () => self.props.entity.CuisineType,
        v => self.props.set_entity({...self.props.entity, CuisineType:v})) } 
  </div>
</div>
}

export function render_Recipe_MealType_editable_maximised(self:RecipeContext) : JSX.Element {
  if (!Permissions.can_edit_Recipe()) return render_Recipe_MealType_maximised(self)
  else
    return !Permissions.can_view_Recipe_MealType() ? <div /> :
          <div className="model__attribute mealtype">
  <label className="attribute-label attribute-label-mealtype">{i18next.t(`Recipe:MealType`, {context: self.props.inline ? "inline" : ""})}</label>
  <div className="model__attribute-content">
    { Components.String(
        self.props.is_editable && Permissions.can_edit_Recipe() && Permissions.can_edit_Recipe_MealType(),
        self.props.mode,
        () => self.props.entity.MealType,
        v => self.props.set_entity({...self.props.entity, MealType:v})) } 
  </div>
</div>
}

export function render_Recipe_PreparationType_editable_maximised(self:RecipeContext) : JSX.Element {
  if (!Permissions.can_edit_Recipe()) return render_Recipe_PreparationType_maximised(self)
  else
    return !Permissions.can_view_Recipe_PreparationType() ? <div /> :
          <div className="model__attribute preparationtype">
  <label className="attribute-label attribute-label-preparationtype">{i18next.t(`Recipe:PreparationType`, {context: self.props.inline ? "inline" : ""})}</label>
  <div className="model__attribute-content">
    { Components.String(
        self.props.is_editable && Permissions.can_edit_Recipe() && Permissions.can_edit_Recipe_PreparationType(),
        self.props.mode,
        () => self.props.entity.PreparationType,
        v => self.props.set_entity({...self.props.entity, PreparationType:v})) } 
  </div>
</div>
}


export function render_editable_attributes_minimised_Recipe(self:RecipeContext) {
  let attributes = (<div>
      {render_Recipe_Name_editable_minimised(self)}
        {render_Recipe_Description_editable_minimised(self)}
        {render_Recipe_RatingType_editable_minimised(self)}
        {render_Recipe_Ingredients_editable_minimised(self)}
        {render_Recipe_CuisineType_editable_minimised(self)}
        {render_Recipe_MealType_editable_minimised(self)}
        {render_Recipe_PreparationType_editable_minimised(self)}
    </div>)
  return attributes
}

export function render_editable_attributes_maximised_Recipe(self:RecipeContext) {
    let attributes = (<div>
        {render_Recipe_Name_editable_maximised(self)}
        {render_Recipe_Description_editable_maximised(self)}
        {render_Recipe_RatingType_editable_maximised(self)}
        {render_Recipe_Ingredients_editable_maximised(self)}
        {render_Recipe_CuisineType_editable_maximised(self)}
        {render_Recipe_MealType_editable_maximised(self)}
        {render_Recipe_PreparationType_editable_maximised(self)}
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
    {Permissions.can_delete_Recipe() && self.props.size == "fullscreen" ? <a className="button button--delete"
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
    {Permissions.can_view_Recipe() ?
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
      return !Permissions.can_view_Recipe_Name() ? null : <div className="model__attribute name">
  <label className="attribute-label attribute-label-name">{i18next.t(`Recipe:Name`, {context: self.props.inline ? "inline" : ""})}</label>
  <div className="model__attribute-content">
    { Components.String(
        self.props.is_editable && Permissions.can_edit_Recipe() && Permissions.can_edit_Recipe_Name(),
        self.props.mode,
        () => self.props.entity.Name,
        v => self.props.set_entity({...self.props.entity, Name:v})) } 
  </div>
</div>
      
}
        export function render_Recipe_Description_minimised(self:RecipeContext) : JSX.Element {
      return !Permissions.can_view_Recipe_Description() ? null : <div className="model__attribute description">
  <label className="attribute-label attribute-label-description">{i18next.t(`Recipe:Description`, {context: self.props.inline ? "inline" : ""})}</label>
  <div className="model__attribute-content">
    { Components.String(
        self.props.is_editable && Permissions.can_edit_Recipe() && Permissions.can_edit_Recipe_Description(),
        self.props.mode,
        () => self.props.entity.Description,
        v => self.props.set_entity({...self.props.entity, Description:v})) } 
  </div>
</div>
      
}
        export function render_Recipe_RatingType_minimised(self:RecipeContext) : JSX.Element {
      return !Permissions.can_view_Recipe_RatingType() ? null : <div className="model__attribute ratingtype">
  <label className="attribute-label attribute-label-ratingtype">{i18next.t(`Recipe:RatingType`, {context: self.props.inline ? "inline" : ""})}</label>
  <div className="model__attribute-content">
    { Components.Number(
        self.props.is_editable && Permissions.can_edit_Recipe() && Permissions.can_edit_Recipe_RatingType(),
        self.props.mode,
        () => self.props.entity.RatingType,
        v => self.props.set_entity({...self.props.entity, RatingType:v})) } 
  </div>
</div>
      
}
        export function render_Recipe_Ingredients_minimised(self:RecipeContext) : JSX.Element {
      return !Permissions.can_view_Recipe_Ingredients() ? null : <div className="model__attribute ingredients">
  <label className="attribute-label attribute-label-ingredients">{i18next.t(`Recipe:Ingredients`, {context: self.props.inline ? "inline" : ""})}</label>
  <div className="model__attribute-content">
    { Components.String(
        self.props.is_editable && Permissions.can_edit_Recipe() && Permissions.can_edit_Recipe_Ingredients(),
        self.props.mode,
        () => self.props.entity.Ingredients,
        v => self.props.set_entity({...self.props.entity, Ingredients:v})) } 
  </div>
</div>
      
}
        export function render_Recipe_CuisineType_minimised(self:RecipeContext) : JSX.Element {
      return !Permissions.can_view_Recipe_CuisineType() ? null : <div className="model__attribute cuisinetype">
  <label className="attribute-label attribute-label-cuisinetype">{i18next.t(`Recipe:CuisineType`, {context: self.props.inline ? "inline" : ""})}</label>
  <div className="model__attribute-content">
    { Components.String(
        self.props.is_editable && Permissions.can_edit_Recipe() && Permissions.can_edit_Recipe_CuisineType(),
        self.props.mode,
        () => self.props.entity.CuisineType,
        v => self.props.set_entity({...self.props.entity, CuisineType:v})) } 
  </div>
</div>
      
}
        export function render_Recipe_MealType_minimised(self:RecipeContext) : JSX.Element {
      return !Permissions.can_view_Recipe_MealType() ? null : <div className="model__attribute mealtype">
  <label className="attribute-label attribute-label-mealtype">{i18next.t(`Recipe:MealType`, {context: self.props.inline ? "inline" : ""})}</label>
  <div className="model__attribute-content">
    { Components.String(
        self.props.is_editable && Permissions.can_edit_Recipe() && Permissions.can_edit_Recipe_MealType(),
        self.props.mode,
        () => self.props.entity.MealType,
        v => self.props.set_entity({...self.props.entity, MealType:v})) } 
  </div>
</div>
      
}
        export function render_Recipe_PreparationType_minimised(self:RecipeContext) : JSX.Element {
      return !Permissions.can_view_Recipe_PreparationType() ? null : <div className="model__attribute preparationtype">
  <label className="attribute-label attribute-label-preparationtype">{i18next.t(`Recipe:PreparationType`, {context: self.props.inline ? "inline" : ""})}</label>
  <div className="model__attribute-content">
    { Components.String(
        self.props.is_editable && Permissions.can_edit_Recipe() && Permissions.can_edit_Recipe_PreparationType(),
        self.props.mode,
        () => self.props.entity.PreparationType,
        v => self.props.set_entity({...self.props.entity, PreparationType:v})) } 
  </div>
</div>
      
}

export function render_Recipe_Name_maximised(self:RecipeContext) : JSX.Element {
        return !Permissions.can_view_Recipe_Name() ? null : <div className="model__attribute name">
  <label className="attribute-label attribute-label-name">{i18next.t(`Recipe:Name`, {context: self.props.inline ? "inline" : ""})}</label>
  <div className="model__attribute-content">
    { Components.String(
        self.props.is_editable && Permissions.can_edit_Recipe() && Permissions.can_edit_Recipe_Name(),
        self.props.mode,
        () => self.props.entity.Name,
        v => self.props.set_entity({...self.props.entity, Name:v})) } 
  </div>
</div>
}
        export function render_Recipe_Description_maximised(self:RecipeContext) : JSX.Element {
        return !Permissions.can_view_Recipe_Description() ? null : <div className="model__attribute description">
  <label className="attribute-label attribute-label-description">{i18next.t(`Recipe:Description`, {context: self.props.inline ? "inline" : ""})}</label>
  <div className="model__attribute-content">
    { Components.String(
        self.props.is_editable && Permissions.can_edit_Recipe() && Permissions.can_edit_Recipe_Description(),
        self.props.mode,
        () => self.props.entity.Description,
        v => self.props.set_entity({...self.props.entity, Description:v})) } 
  </div>
</div>
}
        export function render_Recipe_RatingType_maximised(self:RecipeContext) : JSX.Element {
        return !Permissions.can_view_Recipe_RatingType() ? null : <div className="model__attribute ratingtype">
  <label className="attribute-label attribute-label-ratingtype">{i18next.t(`Recipe:RatingType`, {context: self.props.inline ? "inline" : ""})}</label>
  <div className="model__attribute-content">
    { Components.Number(
        self.props.is_editable && Permissions.can_edit_Recipe() && Permissions.can_edit_Recipe_RatingType(),
        self.props.mode,
        () => self.props.entity.RatingType,
        v => self.props.set_entity({...self.props.entity, RatingType:v})) } 
  </div>
</div>
}
        export function render_Recipe_Ingredients_maximised(self:RecipeContext) : JSX.Element {
        return !Permissions.can_view_Recipe_Ingredients() ? null : <div className="model__attribute ingredients">
  <label className="attribute-label attribute-label-ingredients">{i18next.t(`Recipe:Ingredients`, {context: self.props.inline ? "inline" : ""})}</label>
  <div className="model__attribute-content">
    { Components.String(
        self.props.is_editable && Permissions.can_edit_Recipe() && Permissions.can_edit_Recipe_Ingredients(),
        self.props.mode,
        () => self.props.entity.Ingredients,
        v => self.props.set_entity({...self.props.entity, Ingredients:v})) } 
  </div>
</div>
}
        export function render_Recipe_CuisineType_maximised(self:RecipeContext) : JSX.Element {
        return !Permissions.can_view_Recipe_CuisineType() ? null : <div className="model__attribute cuisinetype">
  <label className="attribute-label attribute-label-cuisinetype">{i18next.t(`Recipe:CuisineType`, {context: self.props.inline ? "inline" : ""})}</label>
  <div className="model__attribute-content">
    { Components.String(
        self.props.is_editable && Permissions.can_edit_Recipe() && Permissions.can_edit_Recipe_CuisineType(),
        self.props.mode,
        () => self.props.entity.CuisineType,
        v => self.props.set_entity({...self.props.entity, CuisineType:v})) } 
  </div>
</div>
}
        export function render_Recipe_MealType_maximised(self:RecipeContext) : JSX.Element {
        return !Permissions.can_view_Recipe_MealType() ? null : <div className="model__attribute mealtype">
  <label className="attribute-label attribute-label-mealtype">{i18next.t(`Recipe:MealType`, {context: self.props.inline ? "inline" : ""})}</label>
  <div className="model__attribute-content">
    { Components.String(
        self.props.is_editable && Permissions.can_edit_Recipe() && Permissions.can_edit_Recipe_MealType(),
        self.props.mode,
        () => self.props.entity.MealType,
        v => self.props.set_entity({...self.props.entity, MealType:v})) } 
  </div>
</div>
}
        export function render_Recipe_PreparationType_maximised(self:RecipeContext) : JSX.Element {
        return !Permissions.can_view_Recipe_PreparationType() ? null : <div className="model__attribute preparationtype">
  <label className="attribute-label attribute-label-preparationtype">{i18next.t(`Recipe:PreparationType`, {context: self.props.inline ? "inline" : ""})}</label>
  <div className="model__attribute-content">
    { Components.String(
        self.props.is_editable && Permissions.can_edit_Recipe() && Permissions.can_edit_Recipe_PreparationType(),
        self.props.mode,
        () => self.props.entity.PreparationType,
        v => self.props.set_entity({...self.props.entity, PreparationType:v})) } 
  </div>
</div>
}

export function render_preview_Recipe(self:RecipeContext) {
  let attributes:JSX.Element = null
  if (self.props.mode == "view" || !Permissions.can_edit_Recipe())
    attributes = (<div className="model__attributes">
      { render_Recipe_Name_minimised(self) }
        { render_Recipe_Description_minimised(self) }
        { render_Recipe_RatingType_minimised(self) }
        { render_Recipe_Ingredients_minimised(self) }
        { render_Recipe_CuisineType_minimised(self) }
        { render_Recipe_MealType_minimised(self) }
        { render_Recipe_PreparationType_minimised(self) }
    </div>)
  else
    attributes = render_editable_attributes_minimised_Recipe(self)
  return (<div className="block">
      {attributes}
    </div>)
}

export function render_large_Recipe(self:RecipeContext) {
  let attributes:JSX.Element = null
  if (self.props.mode == "view" || !Permissions.can_edit_Recipe())
    attributes = (<div className="model__attributes">
      { render_Recipe_Name_maximised(self) }
        { render_Recipe_Description_maximised(self) }
        { render_Recipe_RatingType_maximised(self) }
        { render_Recipe_Ingredients_maximised(self) }
        { render_Recipe_CuisineType_maximised(self) }
        { render_Recipe_MealType_maximised(self) }
        { render_Recipe_PreparationType_maximised(self) }
    </div>)
  else
    attributes = render_editable_attributes_maximised_Recipe(self)
  return (<div className="block">
      {self.props.nesting_depth == 0 && self.props.shown_relation != "all" && self.props.shown_relation != "none" ? null : attributes}
      {render_relations_Recipe(self)}
    </div>)
}




export function render_relations_Recipe(self:RecipeContext) {
  return <div className="relations">
      
      
    </div>
}





export function render_saving_animations_Recipe(self:RecipeContext) {
  return 
    
}

export type RecipeContext = {state:()=>RecipeState, props:Utils.EntityComponentProps<Models.Recipe>, setState:(new_state:RecipeState, callback?:()=>void) => void}

export type RecipeState = {
    update_count:number
    
  }
export class RecipeComponent extends React.Component<Utils.EntityComponentProps<Models.Recipe>, RecipeState> {
  constructor(props:Utils.EntityComponentProps<Models.Recipe>, context:any) {
    super(props, context)
    this.state = { update_count:0,  }
  }

  get_self() {
    return {state:() => this.state, props:this.props, setState:(ns,c)=>this.setState(ns,c)}
  }

  componentWillReceiveProps(new_props:Utils.EntityComponentProps<Models.Recipe>) {
    if (new_props.size == "breadcrumb") return
    let current_logged_in_entity =  null
    let new_logged_in_entity =  null
    if (new_props.mode != this.props.mode || (new_props.size != this.props.size && (new_props.size == "large" || new_props.size == "fullscreen")) ||
        new_props.logic_frame != this.props.logic_frame ||
        (current_logged_in_entity && !new_logged_in_entity) ||
        (!current_logged_in_entity && new_logged_in_entity) ||
        (current_logged_in_entity && new_logged_in_entity && current_logged_in_entity.Id != new_logged_in_entity.Id)) {
      load_relations_Recipe(this.get_self(), )
    }
  }

  thread:number = null
  componentWillMount() {
    if (this.props.size == "breadcrumb") return
    if (this.props.size != "preview")
      load_relations_Recipe(this.get_self(), )

    this.thread = setInterval(() => {
      

    }, 500)
  }

  componentWillUnmount() {
    clearInterval(this.thread)
  }

  render() {
    if (this.props.size == "breadcrumb") {
      return Permissions.can_view_Recipe() ?
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
  let can_edit = Utils.any_of([Permissions.can_edit_Recipe])
  return Utils.scene_to_page<Models.Recipe>(can_edit, Recipe, Api.get_Recipe(id), Api.update_Recipe, "Recipe", "Recipe", `/Recipes/${id}`)
}

export let Recipe_to = (id:number, target_element_id:string, ) => {
  Utils.render_page_manager(target_element_id,
    Recipe_to_page(id),
    
  )
}
