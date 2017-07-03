"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Immutable = require("immutable");
const Api = require("../generated_api");
const List = require("../containers/list");
const Components = require("../components/components");
const Buttons = require("../containers/button_utils");
const Permissions = require("./permissions");
const Utils = require("./view_utils");
const i18next = require("i18next");
const FavouriteViews = require("./Favourite");
const BrowseViews = require("./Browse");
const HomepageViews = require("./Homepage");
const RecommendationViews = require("./Recommendation");
const CuisineViews = require("./Cuisine");
const RecipeViews = require("./Recipe");
function Breakfast_Cuisine_Meal_can_create(self) {
    let state = self.state();
    return state.Cuisine == "loading" ? false : state.Cuisine.CanCreate;
}
exports.Breakfast_Cuisine_Meal_can_create = Breakfast_Cuisine_Meal_can_create;
function Breakfast_Meal_Recipe_can_create(self) {
    let state = self.state();
    return state.Recipe == "loading" ? false : state.Recipe.CanCreate;
}
exports.Breakfast_Meal_Recipe_can_create = Breakfast_Meal_Recipe_can_create;
function Breakfast_Cuisine_Meal_can_delete(self) {
    let state = self.state();
    return state.Cuisine == "loading" ? false : state.Cuisine.CanDelete;
}
exports.Breakfast_Cuisine_Meal_can_delete = Breakfast_Cuisine_Meal_can_delete;
function Breakfast_Meal_Recipe_can_delete(self) {
    let state = self.state();
    return state.Recipe == "loading" ? false : state.Recipe.CanDelete;
}
exports.Breakfast_Meal_Recipe_can_delete = Breakfast_Meal_Recipe_can_delete;
function Breakfast_Cuisine_Meal_page_index(self) {
    let state = self.state();
    return state.Cuisine == "loading" ? 0 : state.Cuisine.PageIndex;
}
exports.Breakfast_Cuisine_Meal_page_index = Breakfast_Cuisine_Meal_page_index;
function Breakfast_Meal_Recipe_page_index(self) {
    let state = self.state();
    return state.Recipe == "loading" ? 0 : state.Recipe.PageIndex;
}
exports.Breakfast_Meal_Recipe_page_index = Breakfast_Meal_Recipe_page_index;
function Breakfast_Cuisine_Meal_page_size(self) {
    let state = self.state();
    return state.Cuisine == "loading" ? 25 : state.Cuisine.PageSize;
}
exports.Breakfast_Cuisine_Meal_page_size = Breakfast_Cuisine_Meal_page_size;
function Breakfast_Meal_Recipe_page_size(self) {
    let state = self.state();
    return state.Recipe == "loading" ? 25 : state.Recipe.PageSize;
}
exports.Breakfast_Meal_Recipe_page_size = Breakfast_Meal_Recipe_page_size;
function Breakfast_Cuisine_Meal_search_query(self) {
    let state = self.state();
    return state.Cuisine == "loading" ? null : state.Cuisine.SearchQuery;
}
exports.Breakfast_Cuisine_Meal_search_query = Breakfast_Cuisine_Meal_search_query;
function Breakfast_Meal_Recipe_search_query(self) {
    let state = self.state();
    return state.Recipe == "loading" ? null : state.Recipe.SearchQuery;
}
exports.Breakfast_Meal_Recipe_search_query = Breakfast_Meal_Recipe_search_query;
function Breakfast_Cuisine_Meal_num_pages(self) {
    let state = self.state();
    return state.Cuisine == "loading" ? 1 : state.Cuisine.NumPages;
}
exports.Breakfast_Cuisine_Meal_num_pages = Breakfast_Cuisine_Meal_num_pages;
function Breakfast_Meal_Recipe_num_pages(self) {
    let state = self.state();
    return state.Recipe == "loading" ? 1 : state.Recipe.NumPages;
}
exports.Breakfast_Meal_Recipe_num_pages = Breakfast_Meal_Recipe_num_pages;
function load_relation_Breakfast_Cuisine_Meal(self, force_first_page, current_User, callback) {
    let state = self.state();
    let prelude = force_first_page && state.Cuisine != "loading" ?
        (c) => state.Cuisine != "loading" && self.setState(Object.assign({}, state, { Cuisine: Object.assign({}, state.Cuisine, { PageIndex: 0 }) }), c)
        :
            (c) => c();
    Permissions.can_view_Cuisine(current_User) ?
        prelude(() => Api.get_Meal_Cuisine_Meals(self.props.entity, Breakfast_Cuisine_Meal_page_index(self), Breakfast_Cuisine_Meal_page_size(self), Breakfast_Cuisine_Meal_search_query(self)).then(Cuisines => self.setState(Object.assign({}, self.state(), { update_count: self.state().update_count + 1, Cuisine: Utils.raw_page_to_paginated_items((i, i_just_created) => {
                let state = self.state();
                return {
                    element: i,
                    size: state.Cuisine != "loading" ?
                        (state.Cuisine.Items.has(i.Id) ?
                            state.Cuisine.Items.get(i.Id).size
                            :
                                "preview" /* i_just_created ? "large" : "preview" */)
                        :
                            "preview" /* i_just_created ? "large" : "preview" */,
                    shown_relation: "all"
                };
            }, Cuisines) }), callback)))
        :
            prelude(() => callback && callback());
}
exports.load_relation_Breakfast_Cuisine_Meal = load_relation_Breakfast_Cuisine_Meal;
function load_relation_Breakfast_Meal_Recipe(self, force_first_page, current_User, callback) {
    let state = self.state();
    let prelude = force_first_page && state.Recipe != "loading" ?
        (c) => state.Recipe != "loading" && self.setState(Object.assign({}, state, { Recipe: Object.assign({}, state.Recipe, { PageIndex: 0 }) }), c)
        :
            (c) => c();
    Permissions.can_view_Recipe(current_User) ?
        prelude(() => Api.get_Meal_Meal_Recipes(self.props.entity, Breakfast_Meal_Recipe_page_index(self), Breakfast_Meal_Recipe_page_size(self), Breakfast_Meal_Recipe_search_query(self)).then(Recipes => self.setState(Object.assign({}, self.state(), { update_count: self.state().update_count + 1, Recipe: Utils.raw_page_to_paginated_items((i, i_just_created) => {
                let state = self.state();
                return {
                    element: i,
                    size: state.Recipe != "loading" ?
                        (state.Recipe.Items.has(i.Id) ?
                            state.Recipe.Items.get(i.Id).size
                            :
                                "preview" /* i_just_created ? "large" : "preview" */)
                        :
                            "preview" /* i_just_created ? "large" : "preview" */,
                    shown_relation: "all"
                };
            }, Recipes) }), callback)))
        :
            prelude(() => callback && callback());
}
exports.load_relation_Breakfast_Meal_Recipe = load_relation_Breakfast_Meal_Recipe;
function load_relations_Breakfast(self, current_User, callback) {
    load_relation_Breakfast_Meal_Recipe(self, false, self.props.current_User, () => load_relation_Breakfast_Cuisine_Meal(self, false, self.props.current_User, () => callback && callback()));
}
exports.load_relations_Breakfast = load_relations_Breakfast;
function set_size_Breakfast(self, new_size) {
    self.props.set_size(new_size, () => {
        if (new_size == "fullscreen")
            self.props.push(exports.Breakfast_to_page(self.props.entity.Id));
    });
}
exports.set_size_Breakfast = set_size_Breakfast;
function render_Breakfast_Description_editable_minimised(self) {
    if (!Permissions.can_edit_Breakfast(self.props.current_User))
        return render_Breakfast_Description_minimised(self);
    else
        return !Permissions.can_view_Breakfast_Description(self.props.current_User) ? React.createElement("div", null) :
            React.createElement("div", { className: "model__attribute description" },
                React.createElement("label", { className: "attribute-label attribute-label-description" }, i18next.t(`Breakfast:Description`, { context: self.props.inline ? "inline" : "" })),
                React.createElement("div", { className: "model__attribute-content" }, Components.String(self.props.is_editable && Permissions.can_edit_Breakfast(self.props.current_User) && Permissions.can_edit_Breakfast_Description(self.props.current_User), self.props.mode, () => self.props.entity.Description, v => self.props.set_entity(Object.assign({}, self.props.entity, { Description: v })))));
}
exports.render_Breakfast_Description_editable_minimised = render_Breakfast_Description_editable_minimised;
function render_Breakfast_Description_editable_maximised(self) {
    if (!Permissions.can_edit_Breakfast(self.props.current_User))
        return render_Breakfast_Description_maximised(self);
    else
        return !Permissions.can_view_Breakfast_Description(self.props.current_User) ? React.createElement("div", null) :
            React.createElement("div", { className: "model__attribute description" },
                React.createElement("label", { className: "attribute-label attribute-label-description" }, i18next.t(`Breakfast:Description`, { context: self.props.inline ? "inline" : "" })),
                React.createElement("div", { className: "model__attribute-content" }, Components.String(self.props.is_editable && Permissions.can_edit_Breakfast(self.props.current_User) && Permissions.can_edit_Breakfast_Description(self.props.current_User), self.props.mode, () => self.props.entity.Description, v => self.props.set_entity(Object.assign({}, self.props.entity, { Description: v })))));
}
exports.render_Breakfast_Description_editable_maximised = render_Breakfast_Description_editable_maximised;
function render_editable_attributes_minimised_Breakfast(self) {
    let attributes = (React.createElement("div", null, render_Breakfast_Description_editable_minimised(self)));
    return attributes;
}
exports.render_editable_attributes_minimised_Breakfast = render_editable_attributes_minimised_Breakfast;
function render_editable_attributes_maximised_Breakfast(self) {
    let state = self.state();
    let attributes = (React.createElement("div", null, render_Breakfast_Description_editable_maximised(self)));
    return attributes;
}
exports.render_editable_attributes_maximised_Breakfast = render_editable_attributes_maximised_Breakfast;
function render_breadcrumb_Breakfast(self) {
    return React.createElement("div", { className: "breadcrumb-breakfast" }, "Breakfast");
}
exports.render_breadcrumb_Breakfast = render_breadcrumb_Breakfast;
function render_menu_Breakfast(self) {
    let state = self.state();
    return React.createElement("div", { className: "menu" },
        React.createElement("img", { className: "logo", src: "/images/logo.png", alt: "Logo" }),
        React.createElement("div", { className: "pages" },
            !Permissions.can_view_Favourite(self.props.current_User) ? null :
                React.createElement("div", { className: `menu_entry page_link` },
                    React.createElement("a", { onClick: () => Api.get_Favourites(0, 1).then(e => e.Items.length > 0 && self.props.set_page(FavouriteViews.Favourite_to_page(e.Items[0].Item.Id))) }, i18next.t('Favourite'))),
            !Permissions.can_view_Browse(self.props.current_User) ? null :
                React.createElement("div", { className: `menu_entry page_link` },
                    React.createElement("a", { onClick: () => Api.get_Browses(0, 1).then(e => e.Items.length > 0 && self.props.set_page(BrowseViews.Browse_to_page(e.Items[0].Item.Id))) }, i18next.t('Browse'))),
            !Permissions.can_view_Homepage(self.props.current_User) ? null :
                React.createElement("div", { className: `menu_entry page_link` },
                    React.createElement("a", { onClick: () => Api.get_Homepages(0, 1).then(e => e.Items.length > 0 && self.props.set_page(HomepageViews.Homepage_to_page(e.Items[0].Item.Id))) }, i18next.t('Homepage'))),
            !Permissions.can_view_Recommendation(self.props.current_User) ? null :
                React.createElement("div", { className: `menu_entry page_link` },
                    React.createElement("a", { onClick: () => Api.get_Recommendations(0, 1).then(e => e.Items.length > 0 && self.props.set_page(RecommendationViews.Recommendation_to_page(e.Items[0].Item.Id))) }, i18next.t('Recommendation'))),
            React.createElement("div", { className: "menu_entries" },
                React.createElement("div", { className: "menu_entry menu_entry--with-sub" }))));
}
exports.render_menu_Breakfast = render_menu_Breakfast;
function render_local_menu_Breakfast(self) {
    let state = self.state();
    return React.createElement("div", { className: "local-menu" },
        React.createElement("div", { className: "local_menu_entries" },
            React.createElement("div", { className: `local_menu_entry${self.props.shown_relation == "none" ? " local_menu_entry--active" : ""}` },
                React.createElement("a", { onClick: () => self.props.set_shown_relation("none") }, i18next.t('About this Breakfast'))),
            !Permissions.can_view_Recipe(self.props.current_User) ? null :
                React.createElement("div", { key: "Meal_Recipe", className: `local_menu_entry${self.props.shown_relation == "Meal_Recipe" ? " local_menu_entry--active" : ""}` },
                    React.createElement("a", { onClick: () => load_relation_Breakfast_Meal_Recipe(self, false, self.props.current_User, () => self.props.set_shown_relation("Meal_Recipe")) }, i18next.t('Meal_Recipes')))));
}
exports.render_local_menu_Breakfast = render_local_menu_Breakfast;
function render_controls_Breakfast(self) {
    return React.createElement("div", { className: "control" },
        self.props.allow_maximisation && self.props.set_size ? React.createElement("a", { className: `"breakfast button button--toggle ${self.props.size != 'preview' ? 'button--toggle--open' : ''}`, onClick: () => {
                set_size_Breakfast(self, self.props.size == "preview" ? "large" : "preview");
            } }) : null,
        self.props.allow_fullscreen && self.props.set_size ? React.createElement("a", { className: "breakfast button button--fullscreen", onClick: () => set_size_Breakfast(self, self.props.size == "fullscreen" ? "large" : "fullscreen") }) : null,
        Permissions.can_delete_Breakfast(self.props.current_User) && self.props.size == "fullscreen" ? React.createElement("a", { className: "button button--delete", onClick: () => confirm(i18next.t('Are you sure?')) &&
                Api.delete_Breakfast(self.props.entity).then(() => self.props.force_reload(() => self.props.pop())) }) : null,
        self.props.size == "fullscreen" && self.props.pages_count > 0 ? React.createElement("a", { className: "breakfast button button--close", onClick: () => self.props.pop() }) : null,
        self.props.unlink && self.props.mode != "view" ?
            React.createElement("a", { className: "button button--unlink", onClick: () => self.props.unlink() })
            :
                null,
        self.props.delete && self.props.mode != "view" ?
            React.createElement("a", { className: "button button--delete", onClick: () => self.props.delete() })
            :
                null);
}
exports.render_controls_Breakfast = render_controls_Breakfast;
function render_content_Breakfast(self) {
    let actions = [
        self.props.allow_maximisation && self.props.set_size && self.props.size == "preview" ?
            () => set_size_Breakfast(self, self.props.size == "preview" ? "large" : "preview")
            :
                null, self.props.allow_fullscreen && self.props.set_size && self.props.size == "preview" ?
            () => set_size_Breakfast(self, self.props.size == "fullscreen" ? "large" : "fullscreen")
            :
                null,
    ].filter(a => a != null);
    let content = Permissions.can_view_Breakfast(self.props.current_User) ?
        self.props.size == "preview" ?
            render_preview_Breakfast(self)
            : self.props.size == "large" ?
                render_large_Breakfast(self)
                : self.props.size == "fullscreen" ?
                    render_large_Breakfast(self)
                    : "Error: unauthorised access to entity."
        : "Error: unauthorised access to entity.";
    if (self.props.mode == "view" && actions.length == 1 && !false)
        return React.createElement("a", { onClick: () => actions[0]() },
            React.createElement("div", { className: `${self.props.inline != undefined && self.props.inline ? "" : "model-content"} ${self.props.size == 'preview' ? 'model-content--preview' : ''}` }, content));
    else
        return React.createElement("div", { className: `${self.props.inline != undefined && self.props.inline ? "" : "model-content"} ${self.props.size == 'preview' ? 'model-content--preview' : ''}` }, content);
}
exports.render_content_Breakfast = render_content_Breakfast;
function render_Breakfast_Description_minimised(self) {
    return !Permissions.can_view_Breakfast_Description(self.props.current_User) ? null : React.createElement("div", { className: "model__attribute description" },
        React.createElement("label", { className: "attribute-label attribute-label-description" }, i18next.t(`Breakfast:Description`, { context: self.props.inline ? "inline" : "" })),
        React.createElement("div", { className: "model__attribute-content" }, Components.String(self.props.is_editable && Permissions.can_edit_Breakfast(self.props.current_User) && Permissions.can_edit_Breakfast_Description(self.props.current_User), self.props.mode, () => self.props.entity.Description, v => self.props.set_entity(Object.assign({}, self.props.entity, { Description: v })))));
}
exports.render_Breakfast_Description_minimised = render_Breakfast_Description_minimised;
function render_Breakfast_Description_maximised(self) {
    return !Permissions.can_view_Breakfast_Description(self.props.current_User) ? null : React.createElement("div", { className: "model__attribute description" },
        React.createElement("label", { className: "attribute-label attribute-label-description" }, i18next.t(`Breakfast:Description`, { context: self.props.inline ? "inline" : "" })),
        React.createElement("div", { className: "model__attribute-content" }, Components.String(self.props.is_editable && Permissions.can_edit_Breakfast(self.props.current_User) && Permissions.can_edit_Breakfast_Description(self.props.current_User), self.props.mode, () => self.props.entity.Description, v => self.props.set_entity(Object.assign({}, self.props.entity, { Description: v })))));
}
exports.render_Breakfast_Description_maximised = render_Breakfast_Description_maximised;
function render_preview_Breakfast(self) {
    let attributes = null;
    if (self.props.mode == "view" || !Permissions.can_edit_Breakfast(self.props.current_User))
        attributes = (React.createElement("div", { className: "model__attributes" }, render_Breakfast_Description_minimised(self)));
    else
        attributes = render_editable_attributes_minimised_Breakfast(self);
    return (React.createElement("div", { className: "block" }, attributes));
}
exports.render_preview_Breakfast = render_preview_Breakfast;
function render_large_Breakfast(self) {
    let state = self.state();
    let attributes = null;
    if (self.props.mode == "view" || !Permissions.can_edit_Breakfast(self.props.current_User))
        attributes = (React.createElement("div", { className: "model__attributes" }, render_Breakfast_Description_maximised(self)));
    else
        attributes = render_editable_attributes_maximised_Breakfast(self);
    return (React.createElement("div", { className: "block" },
        self.props.nesting_depth == 0 && self.props.shown_relation != "all" && self.props.shown_relation != "none" ? null : attributes,
        render_relations_Breakfast(self)));
}
exports.render_large_Breakfast = render_large_Breakfast;
function render_Breakfast_Cuisine_Meal(self, context) {
    if ((context == "default" && self.props.shown_relation != "all" && self.props.shown_relation != "Cuisine_Meal") || !Permissions.can_view_Cuisine(self.props.current_User))
        return null;
    let state = self.state();
    return React.createElement("div", null, List.render_relation("breakfast_cuisine_meal", "Meal", "Cuisine", "Cuisines", self.props.nesting_depth > 0, false, false, false)(state.Cuisine != "loading" ?
        state.Cuisine.IdsInServerOrder.map(id => state.Cuisine != "loading" && state.Cuisine.Items.get(id)) :
        state.Cuisine, Breakfast_Cuisine_Meal_page_index(self), Breakfast_Cuisine_Meal_num_pages(self), new_page_index => {
        let state = self.state();
        state.Cuisine != "loading" &&
            self.setState(Object.assign({}, self.state(), { update_count: self.state().update_count + 1, Cuisine: Object.assign({}, state.Cuisine, { PageIndex: new_page_index }) }), () => load_relation_Breakfast_Cuisine_Meal(self, false, self.props.current_User));
    }, (i, _) => {
        let i_id = i.element.Id;
        let state = self.state();
        return React.createElement("div", { key: i_id, className: `model-nested__item ${i.size != "preview" ? "model-nested__item--open" : ""}
                        ${state.Cuisine != "loading" && state.Cuisine.JustCreated.has(i_id) && state.Cuisine.JustCreated.get(i_id) ? "newly-created" : ""}` },
            React.createElement("div", { key: i_id }, CuisineViews.Cuisine(Object.assign({}, self.props, { entity: i.element, inline: false, nesting_depth: self.props.nesting_depth + 1, size: i.size, allow_maximisation: true, allow_fullscreen: true, mode: self.props.mode == "edit" && (Permissions.can_edit_Cuisine_Meal(self.props.current_User)
                    || Permissions.can_create_Cuisine_Meal(self.props.current_User)
                    || Permissions.can_delete_Cuisine_Meal(self.props.current_User)) ?
                    self.props.mode : "view", is_editable: state.Cuisine != "loading" && state.Cuisine.Editable.get(i_id), shown_relation: i.shown_relation, set_shown_relation: (new_shown_relation, callback) => {
                    let state = self.state();
                    state.Cuisine != "loading" &&
                        self.setState(Object.assign({}, self.state(), { Cuisine: Object.assign({}, state.Cuisine, { Items: state.Cuisine.Items.set(i_id, Object.assign({}, state.Cuisine.Items.get(i_id), { shown_relation: new_shown_relation })) }) }), callback);
                }, nested_entity_names: self.props.nested_entity_names.push("Cuisine"), set_size: (new_size, callback) => {
                    let new_shown_relation = new_size == "large" ? "all" : i.shown_relation;
                    let state = self.state();
                    state.Cuisine != "loading" &&
                        self.setState(Object.assign({}, self.state(), { Cuisine: Object.assign({}, state.Cuisine, { Items: state.Cuisine.Items.set(i_id, Object.assign({}, state.Cuisine.Items.get(i_id), { size: new_size, shown_relation: new_shown_relation })) }) }), callback);
                }, toggle_button: undefined, set_mode: undefined, set_entity: (new_entity, callback, force_update_count_increment) => {
                    let state = self.state();
                    state.Cuisine != "loading" &&
                        self.setState(Object.assign({}, self.state(), { dirty_Cuisine: state.dirty_Cuisine.set(i_id, new_entity), update_count: force_update_count_increment ? self.state().update_count + 1 : state.update_count, Cuisine: Object.assign({}, state.Cuisine, { Items: state.Cuisine.Items.set(i_id, Object.assign({}, state.Cuisine.Items.get(i_id), { element: new_entity })) }) }), callback);
                }, delete: undefined, unlink: !Permissions.can_delete_Cuisine_Meal(self.props.current_User) ?
                    null
                    :
                        () => confirm(i18next.t('Are you sure?')) && Api.unlink_Cuisine_Cuisine_Meals(i.element, self.props.entity).then(() => load_relation_Breakfast_Cuisine_Meal(self, false, self.props.current_User)) }))));
    }, () => React.createElement("div", null,
        Permissions.can_create_Cuisine(self.props.current_User) && Permissions.can_create_Cuisine_Meal(self.props.current_User) && Breakfast_Cuisine_Meal_can_create(self) ? render_new_Breakfast_Cuisine_Meal(self) : null,
        Permissions.can_create_Cuisine_Meal(self.props.current_User) ? render_add_existing_Breakfast_Cuisine_Meal(self) : null)));
}
exports.render_Breakfast_Cuisine_Meal = render_Breakfast_Cuisine_Meal;
function render_Breakfast_Meal_Recipe(self, context) {
    if ((context == "default" && self.props.shown_relation != "all" && self.props.shown_relation != "Meal_Recipe") || !Permissions.can_view_Recipe(self.props.current_User))
        return null;
    let state = self.state();
    return React.createElement("div", null, List.render_relation("breakfast_meal_recipe", "Meal", "Recipe", "Recipes", self.props.nesting_depth > 0, false, false, false)(state.Recipe != "loading" ?
        state.Recipe.IdsInServerOrder.map(id => state.Recipe != "loading" && state.Recipe.Items.get(id)) :
        state.Recipe, Breakfast_Meal_Recipe_page_index(self), Breakfast_Meal_Recipe_num_pages(self), new_page_index => {
        let state = self.state();
        state.Recipe != "loading" &&
            self.setState(Object.assign({}, self.state(), { update_count: self.state().update_count + 1, Recipe: Object.assign({}, state.Recipe, { PageIndex: new_page_index }) }), () => load_relation_Breakfast_Meal_Recipe(self, false, self.props.current_User));
    }, (i, _) => {
        let i_id = i.element.Id;
        let state = self.state();
        return React.createElement("div", { key: i_id, className: `model-nested__item ${i.size != "preview" ? "model-nested__item--open" : ""}
                        ${state.Recipe != "loading" && state.Recipe.JustCreated.has(i_id) && state.Recipe.JustCreated.get(i_id) ? "newly-created" : ""}` },
            React.createElement("div", { key: i_id }, RecipeViews.Recipe(Object.assign({}, self.props, { entity: i.element, inline: false, nesting_depth: self.props.nesting_depth + 1, size: i.size, allow_maximisation: true, allow_fullscreen: true, mode: self.props.mode == "edit" && (Permissions.can_edit_Meal_Recipe(self.props.current_User)
                    || Permissions.can_create_Meal_Recipe(self.props.current_User)
                    || Permissions.can_delete_Meal_Recipe(self.props.current_User)) ?
                    self.props.mode : "view", is_editable: state.Recipe != "loading" && state.Recipe.Editable.get(i_id), shown_relation: i.shown_relation, set_shown_relation: (new_shown_relation, callback) => {
                    let state = self.state();
                    state.Recipe != "loading" &&
                        self.setState(Object.assign({}, self.state(), { Recipe: Object.assign({}, state.Recipe, { Items: state.Recipe.Items.set(i_id, Object.assign({}, state.Recipe.Items.get(i_id), { shown_relation: new_shown_relation })) }) }), callback);
                }, nested_entity_names: self.props.nested_entity_names.push("Recipe"), set_size: (new_size, callback) => {
                    let new_shown_relation = new_size == "large" ? "all" : i.shown_relation;
                    let state = self.state();
                    state.Recipe != "loading" &&
                        self.setState(Object.assign({}, self.state(), { Recipe: Object.assign({}, state.Recipe, { Items: state.Recipe.Items.set(i_id, Object.assign({}, state.Recipe.Items.get(i_id), { size: new_size, shown_relation: new_shown_relation })) }) }), callback);
                }, toggle_button: undefined, set_mode: undefined, set_entity: (new_entity, callback, force_update_count_increment) => {
                    let state = self.state();
                    state.Recipe != "loading" &&
                        self.setState(Object.assign({}, self.state(), { dirty_Recipe: state.dirty_Recipe.set(i_id, new_entity), update_count: force_update_count_increment ? self.state().update_count + 1 : state.update_count, Recipe: Object.assign({}, state.Recipe, { Items: state.Recipe.Items.set(i_id, Object.assign({}, state.Recipe.Items.get(i_id), { element: new_entity })) }) }), callback);
                }, delete: undefined, unlink: !Permissions.can_delete_Meal_Recipe(self.props.current_User) ?
                    null
                    :
                        () => confirm(i18next.t('Are you sure?')) && Api.unlink_Meal_Meal_Recipes(self.props.entity, i.element).then(() => load_relation_Breakfast_Meal_Recipe(self, false, self.props.current_User)) }))));
    }, () => React.createElement("div", null,
        Permissions.can_create_Recipe(self.props.current_User) && Permissions.can_create_Meal_Recipe(self.props.current_User) && Breakfast_Meal_Recipe_can_create(self) ? render_new_Breakfast_Meal_Recipe(self) : null,
        Permissions.can_create_Meal_Recipe(self.props.current_User) ? render_add_existing_Breakfast_Meal_Recipe(self) : null)));
}
exports.render_Breakfast_Meal_Recipe = render_Breakfast_Meal_Recipe;
function render_relations_Breakfast(self) {
    return React.createElement("div", { className: "relations" }, render_Breakfast_Meal_Recipe(self, "default"));
}
exports.render_relations_Breakfast = render_relations_Breakfast;
function render_add_existing_Breakfast_Cuisine_Meal(self) {
    let state = self.state();
    return self.props.mode == "edit" ?
        React.createElement("div", { className: "button__actions" }, state.add_step_Cuisine != "open" ?
            React.createElement(Buttons.Add, { disabled: state.Cuisine == "loading" ? true : state.Cuisine.TotalCount >= 1, onClick: () => self.setState(Object.assign({}, self.state(), { add_step_Cuisine: "open" })), target_name: "Cuisine" })
            :
                React.createElement(List.AddToRelation, {
                    relation_name: "breakfast_cuisine_meal",
                    source_name: "Meal",
                    target_name: "Cuisine",
                    target_plural: "Cuisines",
                    page_size: 25,
                    render_target: (i, i_id) => React.createElement("div", { key: i_id, className: "group__item" },
                        React.createElement("a", { className: "group__button button button--existing", onClick: () => self.setState(Object.assign({}, self.state(), { add_step_Cuisine: "saving" }), () => Api.link_Meal_Cuisine_Meals(self.props.entity, i).then(() => self.setState(Object.assign({}, self.state(), { add_step_Cuisine: "closed" }), () => load_relation_Breakfast_Cuisine_Meal(self, false, self.props.current_User)))) }, "Add existing"),
                        React.createElement("div", { className: "group__title", disabled: true }, CuisineViews.Cuisine(Object.assign({}, self.props, { entity: i, nesting_depth: self.props.nesting_depth + 1, size: "preview", mode: "view", is_editable: false, nested_entity_names: self.props.nested_entity_names.push("Cuisine"), set_size: undefined, toggle_button: undefined, set_mode: undefined, set_entity: (new_entity, callback) => { }, unlink: undefined, delete: undefined })))),
                    cancel: () => self.setState(Object.assign({}, self.state(), { add_step_Cuisine: "closed" })),
                    get_items: [
                        { name: "Asian", get: (i, s) => __awaiter(this, void 0, void 0, function* () { return Api.get_unlinked_Meal_Cuisine_Meals_Asian(self.props.entity, i, s); }) },
                        { name: "Mediterranean", get: (i, s) => __awaiter(this, void 0, void 0, function* () { return Api.get_unlinked_Meal_Cuisine_Meals_Mediterranean(self.props.entity, i, s); }) },
                        { name: "Grill", get: (i, s) => __awaiter(this, void 0, void 0, function* () { return Api.get_unlinked_Meal_Cuisine_Meals_Grill(self.props.entity, i, s); }) }
                    ]
                }))
        :
            null;
}
exports.render_add_existing_Breakfast_Cuisine_Meal = render_add_existing_Breakfast_Cuisine_Meal;
function render_add_existing_Breakfast_Meal_Recipe(self) {
    let state = self.state();
    return self.props.mode == "edit" ?
        React.createElement("div", { className: "button__actions" }, state.add_step_Recipe != "open" ?
            React.createElement(Buttons.Add, { onClick: () => self.setState(Object.assign({}, self.state(), { add_step_Recipe: "open" })), target_name: "Recipe" })
            :
                React.createElement(List.AddToRelation, {
                    relation_name: "breakfast_meal_recipe",
                    source_name: "Meal",
                    target_name: "Recipe",
                    target_plural: "Recipes",
                    page_size: 25,
                    render_target: (i, i_id) => React.createElement("div", { key: i_id, className: "group__item" },
                        React.createElement("a", { className: "group__button button button--existing", onClick: () => self.setState(Object.assign({}, self.state(), { add_step_Recipe: "saving" }), () => Api.link_Meal_Meal_Recipes(self.props.entity, i).then(() => self.setState(Object.assign({}, self.state(), { add_step_Recipe: "closed" }), () => load_relation_Breakfast_Meal_Recipe(self, false, self.props.current_User)))) }, "Add existing"),
                        React.createElement("div", { className: "group__title", disabled: true }, RecipeViews.Recipe(Object.assign({}, self.props, { entity: i, nesting_depth: self.props.nesting_depth + 1, size: "preview", mode: "view", is_editable: false, nested_entity_names: self.props.nested_entity_names.push("Recipe"), set_size: undefined, toggle_button: undefined, set_mode: undefined, set_entity: (new_entity, callback) => { }, unlink: undefined, delete: undefined })))),
                    cancel: () => self.setState(Object.assign({}, self.state(), { add_step_Recipe: "closed" })),
                    get_items: [
                        { name: "Recipe", get: (i, s) => __awaiter(this, void 0, void 0, function* () { return Api.get_unlinked_Meal_Meal_Recipes(self.props.entity, i, s); }) },
                    ]
                }))
        :
            null;
}
exports.render_add_existing_Breakfast_Meal_Recipe = render_add_existing_Breakfast_Meal_Recipe;
function render_new_Breakfast_Cuisine_Meal(self) {
    let state = self.state();
    return self.props.mode == "edit" ?
        React.createElement("div", { className: "button__actions" },
            React.createElement(Buttons.Create, { target_name: "Cuisine", onClick: () => self.setState(Object.assign({}, self.state(), { add_step_Cuisine: "creating" })) }),
            state.add_step_Cuisine != "creating" ?
                null
                :
                    React.createElement("div", { className: "overlay__item overlay__item--new" },
                        React.createElement("div", { className: "new-asian" },
                            React.createElement("button", { disabled: state.Cuisine == "loading" ? true : state.Cuisine.TotalCount >= 1, className: "new-asian button button--new", onClick: () => Api.create_linked_Meal_Cuisine_Meals_Asian(self.props.entity).then(e => {
                                    e.length > 0 &&
                                        Api.update_Asian(Object.assign({}, e[0], { Kind: "Asian", Description: "" })).then(() => load_relation_Breakfast_Cuisine_Meal(self, true, self.props.current_User, () => self.setState(Object.assign({}, self.state(), { add_step_Cuisine: "closed" }))));
                                }) }, i18next.t('Create new Asian'))),
                        React.createElement("div", { className: "new-mediterranean" },
                            React.createElement("button", { disabled: state.Cuisine == "loading" ? true : state.Cuisine.TotalCount >= 1, className: "new-mediterranean button button--new", onClick: () => Api.create_linked_Meal_Cuisine_Meals_Mediterranean(self.props.entity).then(e => {
                                    e.length > 0 &&
                                        Api.update_Mediterranean(Object.assign({}, e[0], { Kind: "Mediterranean", Description: "" })).then(() => load_relation_Breakfast_Cuisine_Meal(self, true, self.props.current_User, () => self.setState(Object.assign({}, self.state(), { add_step_Cuisine: "closed" }))));
                                }) }, i18next.t('Create new Mediterranean'))),
                        React.createElement("div", { className: "new-grill" },
                            React.createElement("button", { disabled: state.Cuisine == "loading" ? true : state.Cuisine.TotalCount >= 1, className: "new-grill button button--new", onClick: () => Api.create_linked_Meal_Cuisine_Meals_Grill(self.props.entity).then(e => {
                                    e.length > 0 &&
                                        Api.update_Grill(Object.assign({}, e[0], { Kind: "Grill", Description: "" })).then(() => load_relation_Breakfast_Cuisine_Meal(self, true, self.props.current_User, () => self.setState(Object.assign({}, self.state(), { add_step_Cuisine: "closed" }))));
                                }) }, i18next.t('Create new Grill'))),
                        React.createElement(Buttons.Cancel, { onClick: () => self.setState(Object.assign({}, self.state(), { add_step_Cuisine: "closed" })) })))
        :
            null;
}
exports.render_new_Breakfast_Cuisine_Meal = render_new_Breakfast_Cuisine_Meal;
function render_new_Breakfast_Meal_Recipe(self) {
    let state = self.state();
    return self.props.mode == "edit" ?
        React.createElement("div", { className: "button__actions" },
            React.createElement("div", { className: "new-recipe" },
                React.createElement("button", { className: "new-recipe button button--new", onClick: () => Api.create_linked_Meal_Meal_Recipes_Recipe(self.props.entity).then(e => {
                        e.length > 0 &&
                            Api.update_Recipe(Object.assign({}, e[0], { Name: "", Ingredients: "", Description: "", Picture: "" })).then(() => load_relation_Breakfast_Meal_Recipe(self, true, self.props.current_User, () => self.setState(Object.assign({}, self.state(), { add_step_Recipe: "closed" }))));
                    }) }, i18next.t('Create new Recipe'))))
        :
            null;
}
exports.render_new_Breakfast_Meal_Recipe = render_new_Breakfast_Meal_Recipe;
function render_saving_animations_Breakfast(self) {
    return self.state().dirty_Cuisine.count() > 0 ?
        React.createElement("div", { style: { position: "fixed", zIndex: 10000, top: 0, left: 0, width: "20px", height: "20px", backgroundColor: "red" }, className: "saving" }) :
        self.state().dirty_Recipe.count() > 0 ?
            React.createElement("div", { style: { position: "fixed", zIndex: 10000, top: 0, left: 0, width: "20px", height: "20px", backgroundColor: "red" }, className: "saving" })
            : React.createElement("div", { style: { position: "fixed", zIndex: 10000, top: 0, left: 0, width: "20px", height: "20px", backgroundColor: "cornflowerblue" }, className: "saved" });
}
exports.render_saving_animations_Breakfast = render_saving_animations_Breakfast;
class BreakfastComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.thread = null;
        this.state = { update_count: 0, add_step_Cuisine: "closed", dirty_Cuisine: Immutable.Map(), Cuisine: "loading", add_step_Recipe: "closed", dirty_Recipe: Immutable.Map(), Recipe: "loading" };
    }
    get_self() {
        return { state: () => this.state, props: this.props, setState: (ns, c) => this.setState(ns, c) };
    }
    componentWillReceiveProps(new_props) {
        if (new_props.size == "breadcrumb")
            return;
        let current_logged_in_entity = this.props.current_User || null;
        let new_logged_in_entity = new_props.current_User || null;
        if (new_props.mode != this.props.mode || (new_props.size != this.props.size && (new_props.size == "large" || new_props.size == "fullscreen")) ||
            new_props.logic_frame != this.props.logic_frame ||
            (current_logged_in_entity && !new_logged_in_entity) ||
            (!current_logged_in_entity && new_logged_in_entity) ||
            (current_logged_in_entity && new_logged_in_entity && current_logged_in_entity.Id != new_logged_in_entity.Id)) {
            load_relations_Breakfast(this.get_self(), new_props.current_User);
        }
    }
    componentWillMount() {
        if (this.props.size == "breadcrumb")
            return;
        if (this.props.size != "preview") {
            load_relations_Breakfast(this.get_self(), this.props.current_User);
        }
        this.thread = setInterval(() => {
            if (this.state.dirty_Cuisine.count() > 0) {
                let first = this.state.dirty_Cuisine.first();
                this.setState(Object.assign({}, this.state, { dirty_Cuisine: this.state.dirty_Cuisine.remove(first.Id) }), () => Api.update_Cuisine(first));
            }
            else if (this.state.dirty_Recipe.count() > 0) {
                let first = this.state.dirty_Recipe.first();
                this.setState(Object.assign({}, this.state, { dirty_Recipe: this.state.dirty_Recipe.remove(first.Id) }), () => Api.update_Recipe(first));
            }
        }, 500);
    }
    componentWillUnmount() {
        clearInterval(this.thread);
    }
    render() {
        if (this.props.size == "breadcrumb") {
            return Permissions.can_view_Breakfast(this.props.current_User) ?
                render_breadcrumb_Breakfast(this.get_self())
                : null;
        }
        return React.createElement("div", { id: `Breakfast_${this.props.entity.Id.toString()}_${this.state.update_count}`, className: `model breakfast` },
            render_saving_animations_Breakfast(this.get_self()),
            this.props.nesting_depth == 0 ? render_menu_Breakfast(this.get_self()) : null,
            React.createElement("div", { className: "content" },
                this.props.nesting_depth == 0 && !!this.props.toggle_button ?
                    React.createElement("div", { className: "topbar" },
                        this.props.breadcrumbs(),
                        React.createElement("div", { className: "topbar__buttons" },
                            this.props.toggle_button ? this.props.toggle_button() : null,
                            this.props.authentication_menu()))
                    :
                        null,
                this.props.nesting_depth == 0 ? render_local_menu_Breakfast(this.get_self()) : null,
                render_controls_Breakfast(this.get_self()),
                render_content_Breakfast(this.get_self())));
    }
}
exports.BreakfastComponent = BreakfastComponent;
exports.Breakfast = (props) => React.createElement(BreakfastComponent, Object.assign({}, props));
exports.Breakfast_to_page = (id) => {
    let can_edit = Utils.any_of([Permissions.can_edit_Breakfast, Permissions.can_edit_Cuisine_Meal, Permissions.can_edit_Meal_Recipe, Permissions.can_edit_Cuisine, Permissions.can_edit_Recipe]);
    return Utils.scene_to_page(can_edit, exports.Breakfast, Api.get_Breakfast(id), Api.update_Breakfast, "Breakfast", "Breakfast", `/Breakfasts/${id}`);
};
exports.Breakfast_to = (id, target_element_id, current_User) => {
    Utils.render_page_manager(target_element_id, exports.Breakfast_to_page(id), current_User);
};
//# sourceMappingURL=Breakfast.js.map