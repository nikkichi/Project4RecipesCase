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
const HomepageViews = require("./Homepage");
const MealViews = require("./Meal");
const PreparationTimeViews = require("./PreparationTime");
const UserViews = require("./User");
const RatingViews = require("./Rating");
const RecommendationPageViews = require("./RecommendationPage");
function Recipe_Meal_Recipe_can_create(self) {
    let state = self.state();
    return state.Meal == "loading" ? false : state.Meal.CanCreate;
}
exports.Recipe_Meal_Recipe_can_create = Recipe_Meal_Recipe_can_create;
function Recipe_PreparationTime_Recipe_can_create(self) {
    let state = self.state();
    return state.PreparationTime == "loading" ? false : state.PreparationTime.CanCreate;
}
exports.Recipe_PreparationTime_Recipe_can_create = Recipe_PreparationTime_Recipe_can_create;
function Recipe_User_Recipe_can_create(self) {
    let state = self.state();
    return state.User == "loading" ? false : state.User.CanCreate;
}
exports.Recipe_User_Recipe_can_create = Recipe_User_Recipe_can_create;
function Recipe_Recipe_Rating_can_create(self) {
    let state = self.state();
    return state.Rating == "loading" ? false : state.Rating.CanCreate;
}
exports.Recipe_Recipe_Rating_can_create = Recipe_Recipe_Rating_can_create;
function Recipe_RecommendationPage_Recipe_can_create(self) {
    let state = self.state();
    return state.RecommendationPage == "loading" ? false : state.RecommendationPage.CanCreate;
}
exports.Recipe_RecommendationPage_Recipe_can_create = Recipe_RecommendationPage_Recipe_can_create;
function Recipe_Meal_Recipe_can_delete(self) {
    let state = self.state();
    return state.Meal == "loading" ? false : state.Meal.CanDelete;
}
exports.Recipe_Meal_Recipe_can_delete = Recipe_Meal_Recipe_can_delete;
function Recipe_PreparationTime_Recipe_can_delete(self) {
    let state = self.state();
    return state.PreparationTime == "loading" ? false : state.PreparationTime.CanDelete;
}
exports.Recipe_PreparationTime_Recipe_can_delete = Recipe_PreparationTime_Recipe_can_delete;
function Recipe_User_Recipe_can_delete(self) {
    let state = self.state();
    return state.User == "loading" ? false : state.User.CanDelete;
}
exports.Recipe_User_Recipe_can_delete = Recipe_User_Recipe_can_delete;
function Recipe_Recipe_Rating_can_delete(self) {
    let state = self.state();
    return state.Rating == "loading" ? false : state.Rating.CanDelete;
}
exports.Recipe_Recipe_Rating_can_delete = Recipe_Recipe_Rating_can_delete;
function Recipe_RecommendationPage_Recipe_can_delete(self) {
    let state = self.state();
    return state.RecommendationPage == "loading" ? false : state.RecommendationPage.CanDelete;
}
exports.Recipe_RecommendationPage_Recipe_can_delete = Recipe_RecommendationPage_Recipe_can_delete;
function Recipe_Meal_Recipe_page_index(self) {
    let state = self.state();
    return state.Meal == "loading" ? 0 : state.Meal.PageIndex;
}
exports.Recipe_Meal_Recipe_page_index = Recipe_Meal_Recipe_page_index;
function Recipe_PreparationTime_Recipe_page_index(self) {
    let state = self.state();
    return state.PreparationTime == "loading" ? 0 : state.PreparationTime.PageIndex;
}
exports.Recipe_PreparationTime_Recipe_page_index = Recipe_PreparationTime_Recipe_page_index;
function Recipe_User_Recipe_page_index(self) {
    let state = self.state();
    return state.User == "loading" ? 0 : state.User.PageIndex;
}
exports.Recipe_User_Recipe_page_index = Recipe_User_Recipe_page_index;
function Recipe_Recipe_Rating_page_index(self) {
    let state = self.state();
    return state.Rating == "loading" ? 0 : state.Rating.PageIndex;
}
exports.Recipe_Recipe_Rating_page_index = Recipe_Recipe_Rating_page_index;
function Recipe_RecommendationPage_Recipe_page_index(self) {
    let state = self.state();
    return state.RecommendationPage == "loading" ? 0 : state.RecommendationPage.PageIndex;
}
exports.Recipe_RecommendationPage_Recipe_page_index = Recipe_RecommendationPage_Recipe_page_index;
function Recipe_Meal_Recipe_page_size(self) {
    let state = self.state();
    return state.Meal == "loading" ? 25 : state.Meal.PageSize;
}
exports.Recipe_Meal_Recipe_page_size = Recipe_Meal_Recipe_page_size;
function Recipe_PreparationTime_Recipe_page_size(self) {
    let state = self.state();
    return state.PreparationTime == "loading" ? 25 : state.PreparationTime.PageSize;
}
exports.Recipe_PreparationTime_Recipe_page_size = Recipe_PreparationTime_Recipe_page_size;
function Recipe_User_Recipe_page_size(self) {
    let state = self.state();
    return state.User == "loading" ? 25 : state.User.PageSize;
}
exports.Recipe_User_Recipe_page_size = Recipe_User_Recipe_page_size;
function Recipe_Recipe_Rating_page_size(self) {
    let state = self.state();
    return state.Rating == "loading" ? 25 : state.Rating.PageSize;
}
exports.Recipe_Recipe_Rating_page_size = Recipe_Recipe_Rating_page_size;
function Recipe_RecommendationPage_Recipe_page_size(self) {
    let state = self.state();
    return state.RecommendationPage == "loading" ? 25 : state.RecommendationPage.PageSize;
}
exports.Recipe_RecommendationPage_Recipe_page_size = Recipe_RecommendationPage_Recipe_page_size;
function Recipe_Meal_Recipe_search_query(self) {
    let state = self.state();
    return state.Meal == "loading" ? null : state.Meal.SearchQuery;
}
exports.Recipe_Meal_Recipe_search_query = Recipe_Meal_Recipe_search_query;
function Recipe_PreparationTime_Recipe_search_query(self) {
    let state = self.state();
    return state.PreparationTime == "loading" ? null : state.PreparationTime.SearchQuery;
}
exports.Recipe_PreparationTime_Recipe_search_query = Recipe_PreparationTime_Recipe_search_query;
function Recipe_User_Recipe_search_query(self) {
    let state = self.state();
    return state.User == "loading" ? null : state.User.SearchQuery;
}
exports.Recipe_User_Recipe_search_query = Recipe_User_Recipe_search_query;
function Recipe_Recipe_Rating_search_query(self) {
    let state = self.state();
    return state.Rating == "loading" ? null : state.Rating.SearchQuery;
}
exports.Recipe_Recipe_Rating_search_query = Recipe_Recipe_Rating_search_query;
function Recipe_RecommendationPage_Recipe_search_query(self) {
    let state = self.state();
    return state.RecommendationPage == "loading" ? null : state.RecommendationPage.SearchQuery;
}
exports.Recipe_RecommendationPage_Recipe_search_query = Recipe_RecommendationPage_Recipe_search_query;
function Recipe_Meal_Recipe_num_pages(self) {
    let state = self.state();
    return state.Meal == "loading" ? 1 : state.Meal.NumPages;
}
exports.Recipe_Meal_Recipe_num_pages = Recipe_Meal_Recipe_num_pages;
function Recipe_PreparationTime_Recipe_num_pages(self) {
    let state = self.state();
    return state.PreparationTime == "loading" ? 1 : state.PreparationTime.NumPages;
}
exports.Recipe_PreparationTime_Recipe_num_pages = Recipe_PreparationTime_Recipe_num_pages;
function Recipe_User_Recipe_num_pages(self) {
    let state = self.state();
    return state.User == "loading" ? 1 : state.User.NumPages;
}
exports.Recipe_User_Recipe_num_pages = Recipe_User_Recipe_num_pages;
function Recipe_Recipe_Rating_num_pages(self) {
    let state = self.state();
    return state.Rating == "loading" ? 1 : state.Rating.NumPages;
}
exports.Recipe_Recipe_Rating_num_pages = Recipe_Recipe_Rating_num_pages;
function Recipe_RecommendationPage_Recipe_num_pages(self) {
    let state = self.state();
    return state.RecommendationPage == "loading" ? 1 : state.RecommendationPage.NumPages;
}
exports.Recipe_RecommendationPage_Recipe_num_pages = Recipe_RecommendationPage_Recipe_num_pages;
function load_relation_Recipe_Meal_Recipe(self, force_first_page, current_User, callback) {
    let state = self.state();
    let prelude = force_first_page && state.Meal != "loading" ?
        (c) => state.Meal != "loading" && self.setState(Object.assign({}, state, { Meal: Object.assign({}, state.Meal, { PageIndex: 0 }) }), c)
        :
            (c) => c();
    Permissions.can_view_Meal(current_User) ?
        prelude(() => Api.get_Recipe_Meal_Recipes(self.props.entity, Recipe_Meal_Recipe_page_index(self), Recipe_Meal_Recipe_page_size(self), Recipe_Meal_Recipe_search_query(self)).then(Meals => self.setState(Object.assign({}, self.state(), { update_count: self.state().update_count + 1, Meal: Utils.raw_page_to_paginated_items((i, i_just_created) => {
                let state = self.state();
                return {
                    element: i,
                    size: state.Meal != "loading" ?
                        (state.Meal.Items.has(i.Id) ?
                            state.Meal.Items.get(i.Id).size
                            :
                                "preview" /* i_just_created ? "large" : "preview" */)
                        :
                            "preview" /* i_just_created ? "large" : "preview" */,
                    shown_relation: "all"
                };
            }, Meals) }), callback)))
        :
            prelude(() => callback && callback());
}
exports.load_relation_Recipe_Meal_Recipe = load_relation_Recipe_Meal_Recipe;
function load_relation_Recipe_PreparationTime_Recipe(self, force_first_page, current_User, callback) {
    let state = self.state();
    let prelude = force_first_page && state.PreparationTime != "loading" ?
        (c) => state.PreparationTime != "loading" && self.setState(Object.assign({}, state, { PreparationTime: Object.assign({}, state.PreparationTime, { PageIndex: 0 }) }), c)
        :
            (c) => c();
    Permissions.can_view_PreparationTime(current_User) ?
        prelude(() => Api.get_Recipe_PreparationTime_Recipes(self.props.entity, Recipe_PreparationTime_Recipe_page_index(self), Recipe_PreparationTime_Recipe_page_size(self), Recipe_PreparationTime_Recipe_search_query(self)).then(PreparationTimes => self.setState(Object.assign({}, self.state(), { update_count: self.state().update_count + 1, PreparationTime: Utils.raw_page_to_paginated_items((i, i_just_created) => {
                let state = self.state();
                return {
                    element: i,
                    size: state.PreparationTime != "loading" ?
                        (state.PreparationTime.Items.has(i.Id) ?
                            state.PreparationTime.Items.get(i.Id).size
                            :
                                "preview" /* i_just_created ? "large" : "preview" */)
                        :
                            "preview" /* i_just_created ? "large" : "preview" */,
                    shown_relation: "all"
                };
            }, PreparationTimes) }), callback)))
        :
            prelude(() => callback && callback());
}
exports.load_relation_Recipe_PreparationTime_Recipe = load_relation_Recipe_PreparationTime_Recipe;
function load_relation_Recipe_User_Recipe(self, force_first_page, current_User, callback) {
    let state = self.state();
    let prelude = force_first_page && state.User != "loading" ?
        (c) => state.User != "loading" && self.setState(Object.assign({}, state, { User: Object.assign({}, state.User, { PageIndex: 0 }) }), c)
        :
            (c) => c();
    Permissions.can_view_User(current_User) ?
        prelude(() => Api.get_Recipe_User_Recipes(self.props.entity, Recipe_User_Recipe_page_index(self), Recipe_User_Recipe_page_size(self), Recipe_User_Recipe_search_query(self)).then(Users => self.setState(Object.assign({}, self.state(), { update_count: self.state().update_count + 1, User: Utils.raw_page_to_paginated_items((i, i_just_created) => {
                let state = self.state();
                return {
                    element: i,
                    size: state.User != "loading" ?
                        (state.User.Items.has(i.Id) ?
                            state.User.Items.get(i.Id).size
                            :
                                "preview" /* i_just_created ? "large" : "preview" */)
                        :
                            "preview" /* i_just_created ? "large" : "preview" */,
                    shown_relation: "all"
                };
            }, Users) }), callback)))
        :
            prelude(() => callback && callback());
}
exports.load_relation_Recipe_User_Recipe = load_relation_Recipe_User_Recipe;
function load_relation_Recipe_Recipe_Rating(self, force_first_page, current_User, callback) {
    let state = self.state();
    let prelude = force_first_page && state.Rating != "loading" ?
        (c) => state.Rating != "loading" && self.setState(Object.assign({}, state, { Rating: Object.assign({}, state.Rating, { PageIndex: 0 }) }), c)
        :
            (c) => c();
    Permissions.can_view_Rating(current_User) ?
        prelude(() => Api.get_Recipe_Recipe_Ratings(self.props.entity, Recipe_Recipe_Rating_page_index(self), Recipe_Recipe_Rating_page_size(self), Recipe_Recipe_Rating_search_query(self)).then(Ratings => self.setState(Object.assign({}, self.state(), { update_count: self.state().update_count + 1, Rating: Utils.raw_page_to_paginated_items((i, i_just_created) => {
                let state = self.state();
                return {
                    element: i,
                    size: state.Rating != "loading" ?
                        (state.Rating.Items.has(i.Id) ?
                            state.Rating.Items.get(i.Id).size
                            :
                                "preview" /* i_just_created ? "large" : "preview" */)
                        :
                            "preview" /* i_just_created ? "large" : "preview" */,
                    shown_relation: "all"
                };
            }, Ratings) }), callback)))
        :
            prelude(() => callback && callback());
}
exports.load_relation_Recipe_Recipe_Rating = load_relation_Recipe_Recipe_Rating;
function load_relation_Recipe_RecommendationPage_Recipe(self, force_first_page, current_User, callback) {
    let state = self.state();
    let prelude = force_first_page && state.RecommendationPage != "loading" ?
        (c) => state.RecommendationPage != "loading" && self.setState(Object.assign({}, state, { RecommendationPage: Object.assign({}, state.RecommendationPage, { PageIndex: 0 }) }), c)
        :
            (c) => c();
    Permissions.can_view_RecommendationPage(current_User) ?
        prelude(() => Api.get_Recipe_RecommendationPage_Recipes(self.props.entity, Recipe_RecommendationPage_Recipe_page_index(self), Recipe_RecommendationPage_Recipe_page_size(self), Recipe_RecommendationPage_Recipe_search_query(self)).then(RecommendationPages => self.setState(Object.assign({}, self.state(), { update_count: self.state().update_count + 1, RecommendationPage: Utils.raw_page_to_paginated_items((i, i_just_created) => {
                let state = self.state();
                return {
                    element: i,
                    size: state.RecommendationPage != "loading" ?
                        (state.RecommendationPage.Items.has(i.Id) ?
                            state.RecommendationPage.Items.get(i.Id).size
                            :
                                "preview" /* i_just_created ? "large" : "preview" */)
                        :
                            "preview" /* i_just_created ? "large" : "preview" */,
                    shown_relation: "all"
                };
            }, RecommendationPages) }), callback)))
        :
            prelude(() => callback && callback());
}
exports.load_relation_Recipe_RecommendationPage_Recipe = load_relation_Recipe_RecommendationPage_Recipe;
function load_relations_Recipe(self, current_User, callback) {
    load_relation_Recipe_RecommendationPage_Recipe(self, false, self.props.current_User, () => load_relation_Recipe_Recipe_Rating(self, false, self.props.current_User, () => load_relation_Recipe_User_Recipe(self, false, self.props.current_User, () => load_relation_Recipe_PreparationTime_Recipe(self, false, self.props.current_User, () => load_relation_Recipe_Meal_Recipe(self, false, self.props.current_User, () => callback && callback())))));
}
exports.load_relations_Recipe = load_relations_Recipe;
function set_size_Recipe(self, new_size) {
    self.props.set_size(new_size, () => {
        if (new_size == "fullscreen")
            self.props.push(exports.Recipe_to_page(self.props.entity.Id));
    });
}
exports.set_size_Recipe = set_size_Recipe;
function render_Recipe_Name_editable_minimised(self) {
    if (!Permissions.can_edit_Recipe(self.props.current_User))
        return render_Recipe_Name_minimised(self);
    else
        return !Permissions.can_view_Recipe_Name(self.props.current_User) ? React.createElement("div", null) :
            React.createElement("div", { className: "model__attribute name" },
                React.createElement("label", { className: "attribute-label attribute-label-name" }, i18next.t(`Recipe:Name`, { context: self.props.inline ? "inline" : "" })),
                React.createElement("div", { className: "model__attribute-content" }, Components.String(self.props.is_editable && Permissions.can_edit_Recipe(self.props.current_User) && Permissions.can_edit_Recipe_Name(self.props.current_User), self.props.mode, () => self.props.entity.Name, v => self.props.set_entity(Object.assign({}, self.props.entity, { Name: v })))));
}
exports.render_Recipe_Name_editable_minimised = render_Recipe_Name_editable_minimised;
function render_Recipe_Ingredients_editable_minimised(self) {
    if (!Permissions.can_edit_Recipe(self.props.current_User))
        return render_Recipe_Ingredients_minimised(self);
    else
        return !Permissions.can_view_Recipe_Ingredients(self.props.current_User) ? React.createElement("div", null) :
            React.createElement("div", { className: "model__attribute ingredients" },
                React.createElement("label", { className: "attribute-label attribute-label-ingredients" }, i18next.t(`Recipe:Ingredients`, { context: self.props.inline ? "inline" : "" })),
                React.createElement("div", { className: "model__attribute-content" }, Components.String(self.props.is_editable && Permissions.can_edit_Recipe(self.props.current_User) && Permissions.can_edit_Recipe_Ingredients(self.props.current_User), self.props.mode, () => self.props.entity.Ingredients, v => self.props.set_entity(Object.assign({}, self.props.entity, { Ingredients: v })))));
}
exports.render_Recipe_Ingredients_editable_minimised = render_Recipe_Ingredients_editable_minimised;
function render_Recipe_Description_editable_minimised(self) {
    if (!Permissions.can_edit_Recipe(self.props.current_User))
        return render_Recipe_Description_minimised(self);
    else
        return !Permissions.can_view_Recipe_Description(self.props.current_User) ? React.createElement("div", null) :
            React.createElement("div", { className: "model__attribute description" },
                React.createElement("label", { className: "attribute-label attribute-label-description" }, i18next.t(`Recipe:Description`, { context: self.props.inline ? "inline" : "" })),
                React.createElement("div", { className: "model__attribute-content" }, Components.String(self.props.is_editable && Permissions.can_edit_Recipe(self.props.current_User) && Permissions.can_edit_Recipe_Description(self.props.current_User), self.props.mode, () => self.props.entity.Description, v => self.props.set_entity(Object.assign({}, self.props.entity, { Description: v })))));
}
exports.render_Recipe_Description_editable_minimised = render_Recipe_Description_editable_minimised;
function render_Recipe_Picture_editable_minimised(self) {
    if (!Permissions.can_edit_Recipe(self.props.current_User))
        return render_Recipe_Picture_minimised(self);
    else
        return !Permissions.can_view_Recipe_Picture(self.props.current_User) ? React.createElement("div", null) :
            React.createElement("div", { className: "model__attribute picture" },
                React.createElement("label", { className: "attribute-label attribute-label-picture" }, i18next.t(`Recipe:Picture`, { context: self.props.inline ? "inline" : "" })),
                React.createElement("div", { className: "model__attribute-content" }, Components.Image(self.props.is_editable && Permissions.can_edit_Recipe(self.props.current_User) && Permissions.can_edit_Recipe_Picture(self.props.current_User), self.props.mode, () => Api.get_Recipe_Picture(self.props.entity), (new_src) => Api.update_Recipe_Picture(self.props.entity, new_src))));
}
exports.render_Recipe_Picture_editable_minimised = render_Recipe_Picture_editable_minimised;
function render_Recipe_Name_editable_maximised(self) {
    if (!Permissions.can_edit_Recipe(self.props.current_User))
        return render_Recipe_Name_maximised(self);
    else
        return !Permissions.can_view_Recipe_Name(self.props.current_User) ? React.createElement("div", null) :
            React.createElement("div", { className: "model__attribute name" },
                React.createElement("label", { className: "attribute-label attribute-label-name" }, i18next.t(`Recipe:Name`, { context: self.props.inline ? "inline" : "" })),
                React.createElement("div", { className: "model__attribute-content" }, Components.String(self.props.is_editable && Permissions.can_edit_Recipe(self.props.current_User) && Permissions.can_edit_Recipe_Name(self.props.current_User), self.props.mode, () => self.props.entity.Name, v => self.props.set_entity(Object.assign({}, self.props.entity, { Name: v })))));
}
exports.render_Recipe_Name_editable_maximised = render_Recipe_Name_editable_maximised;
function render_Recipe_Ingredients_editable_maximised(self) {
    if (!Permissions.can_edit_Recipe(self.props.current_User))
        return render_Recipe_Ingredients_maximised(self);
    else
        return !Permissions.can_view_Recipe_Ingredients(self.props.current_User) ? React.createElement("div", null) :
            React.createElement("div", { className: "model__attribute ingredients" },
                React.createElement("label", { className: "attribute-label attribute-label-ingredients" }, i18next.t(`Recipe:Ingredients`, { context: self.props.inline ? "inline" : "" })),
                React.createElement("div", { className: "model__attribute-content" }, Components.String(self.props.is_editable && Permissions.can_edit_Recipe(self.props.current_User) && Permissions.can_edit_Recipe_Ingredients(self.props.current_User), self.props.mode, () => self.props.entity.Ingredients, v => self.props.set_entity(Object.assign({}, self.props.entity, { Ingredients: v })))));
}
exports.render_Recipe_Ingredients_editable_maximised = render_Recipe_Ingredients_editable_maximised;
function render_Recipe_Description_editable_maximised(self) {
    if (!Permissions.can_edit_Recipe(self.props.current_User))
        return render_Recipe_Description_maximised(self);
    else
        return !Permissions.can_view_Recipe_Description(self.props.current_User) ? React.createElement("div", null) :
            React.createElement("div", { className: "model__attribute description" },
                React.createElement("label", { className: "attribute-label attribute-label-description" }, i18next.t(`Recipe:Description`, { context: self.props.inline ? "inline" : "" })),
                React.createElement("div", { className: "model__attribute-content" }, Components.String(self.props.is_editable && Permissions.can_edit_Recipe(self.props.current_User) && Permissions.can_edit_Recipe_Description(self.props.current_User), self.props.mode, () => self.props.entity.Description, v => self.props.set_entity(Object.assign({}, self.props.entity, { Description: v })))));
}
exports.render_Recipe_Description_editable_maximised = render_Recipe_Description_editable_maximised;
function render_Recipe_Picture_editable_maximised(self) {
    if (!Permissions.can_edit_Recipe(self.props.current_User))
        return render_Recipe_Picture_maximised(self);
    else
        return !Permissions.can_view_Recipe_Picture(self.props.current_User) ? React.createElement("div", null) :
            React.createElement("div", { className: "model__attribute picture" },
                React.createElement("label", { className: "attribute-label attribute-label-picture" }, i18next.t(`Recipe:Picture`, { context: self.props.inline ? "inline" : "" })),
                React.createElement("div", { className: "model__attribute-content" }, Components.Image(self.props.is_editable && Permissions.can_edit_Recipe(self.props.current_User) && Permissions.can_edit_Recipe_Picture(self.props.current_User), self.props.mode, () => Api.get_Recipe_Picture(self.props.entity), (new_src) => Api.update_Recipe_Picture(self.props.entity, new_src))));
}
exports.render_Recipe_Picture_editable_maximised = render_Recipe_Picture_editable_maximised;
function render_editable_attributes_minimised_Recipe(self) {
    let attributes = (React.createElement("div", null,
        render_Recipe_Name_editable_minimised(self),
        render_Recipe_Ingredients_editable_minimised(self),
        render_Recipe_Description_editable_minimised(self),
        render_Recipe_Picture_editable_minimised(self)));
    return attributes;
}
exports.render_editable_attributes_minimised_Recipe = render_editable_attributes_minimised_Recipe;
function render_editable_attributes_maximised_Recipe(self) {
    let state = self.state();
    let attributes = (React.createElement("div", null,
        render_Recipe_Name_editable_maximised(self),
        render_Recipe_Ingredients_editable_maximised(self),
        render_Recipe_Description_editable_maximised(self),
        render_Recipe_Picture_editable_maximised(self)));
    return attributes;
}
exports.render_editable_attributes_maximised_Recipe = render_editable_attributes_maximised_Recipe;
function render_breadcrumb_Recipe(self) {
    return React.createElement("div", { className: "breadcrumb-recipe" }, "Recipe");
}
exports.render_breadcrumb_Recipe = render_breadcrumb_Recipe;
function render_menu_Recipe(self) {
    let state = self.state();
    return React.createElement("div", { className: "menu" },
        React.createElement("img", { className: "logo", src: "/images/logo.png", alt: "Logo" }),
        React.createElement("div", { className: "pages" },
            !Permissions.can_view_Favourite(self.props.current_User) ? null :
                React.createElement("div", { className: `menu_entry page_link` },
                    React.createElement("a", { onClick: () => Api.get_Favourites(0, 1).then(e => e.Items.length > 0 && self.props.set_page(FavouriteViews.Favourite_to_page(e.Items[0].Item.Id))) }, i18next.t('Favourite'))),
            !Permissions.can_view_,
            "(self.props.current_User) ? null :",
            React.createElement("div", { className: `menu_entry page_link` },
                React.createElement("a", { onClick: () => Api.get_, Browses: true }),
                "0, 1).then(e => e.Items.length > 0 && self.props.set_page( BrowseViews. Browse_to_page(e.Items[0].Item.Id)) ) }>",
                i18next.t(' Browse'))),
        "}",
        !Permissions.can_view_Homepage(self.props.current_User) ? null :
            React.createElement("div", { className: `menu_entry page_link` },
                React.createElement("a", { onClick: () => Api.get_Homepages(0, 1).then(e => e.Items.length > 0 && self.props.set_page(HomepageViews.Homepage_to_page(e.Items[0].Item.Id))) }, i18next.t('Homepage'))),
        React.createElement("div", { className: "menu_entries" },
            React.createElement("div", { className: "menu_entry menu_entry--with-sub" })));
    div >
    ;
}
exports.render_menu_Recipe = render_menu_Recipe;
function render_local_menu_Recipe(self) {
    let state = self.state();
    return React.createElement("div", { className: "local-menu" },
        React.createElement("div", { className: "local_menu_entries" },
            React.createElement("div", { className: `local_menu_entry${self.props.shown_relation == "none" ? " local_menu_entry--active" : ""}` },
                React.createElement("a", { onClick: () => self.props.set_shown_relation("none") }, i18next.t('About this Recipe'))),
            !Permissions.can_view_PreparationTime(self.props.current_User) ? null :
                React.createElement("div", { key: "PreparationTime_Recipe", className: `local_menu_entry${self.props.shown_relation == "PreparationTime_Recipe" ? " local_menu_entry--active" : ""}` },
                    React.createElement("a", { onClick: () => load_relation_Recipe_PreparationTime_Recipe(self, false, self.props.current_User, () => self.props.set_shown_relation("PreparationTime_Recipe")) }, i18next.t('PreparationTime_Recipes_inverted'))),
            !Permissions.can_view_Rating(self.props.current_User) ? null :
                React.createElement("div", { key: "Recipe_Rating", className: `local_menu_entry${self.props.shown_relation == "Recipe_Rating" ? " local_menu_entry--active" : ""}` },
                    React.createElement("a", { onClick: () => load_relation_Recipe_Recipe_Rating(self, false, self.props.current_User, () => self.props.set_shown_relation("Recipe_Rating")) }, i18next.t('Recipe_Ratings')))));
}
exports.render_local_menu_Recipe = render_local_menu_Recipe;
function render_controls_Recipe(self) {
    return React.createElement("div", { className: "control" },
        self.props.allow_maximisation && self.props.set_size ? React.createElement("a", { className: `"recipe button button--toggle ${self.props.size != 'preview' ? 'button--toggle--open' : ''}`, onClick: () => {
                set_size_Recipe(self, self.props.size == "preview" ? "large" : "preview");
            } }) : null,
        self.props.allow_fullscreen && self.props.set_size ? React.createElement("a", { className: "recipe button button--fullscreen", onClick: () => set_size_Recipe(self, self.props.size == "fullscreen" ? "large" : "fullscreen") }) : null,
        Permissions.can_delete_Recipe(self.props.current_User) && self.props.size == "fullscreen" ? React.createElement("a", { className: "button button--delete", onClick: () => confirm(i18next.t('Are you sure?')) &&
                Api.delete_Recipe(self.props.entity).then(() => self.props.force_reload(() => self.props.pop())) }) : null,
        self.props.size == "fullscreen" && self.props.pages_count > 0 ? React.createElement("a", { className: "recipe button button--close", onClick: () => self.props.pop() }) : null,
        self.props.unlink && self.props.mode != "view" ?
            React.createElement("a", { className: "button button--unlink", onClick: () => self.props.unlink() })
            :
                null,
        self.props.delete && self.props.mode != "view" ?
            React.createElement("a", { className: "button button--delete", onClick: () => self.props.delete() })
            :
                null);
}
exports.render_controls_Recipe = render_controls_Recipe;
function render_content_Recipe(self) {
    let actions = [
        self.props.allow_maximisation && self.props.set_size && self.props.size == "preview" ?
            () => set_size_Recipe(self, self.props.size == "preview" ? "large" : "preview")
            :
                null, self.props.allow_fullscreen && self.props.set_size && self.props.size == "preview" ?
            () => set_size_Recipe(self, self.props.size == "fullscreen" ? "large" : "fullscreen")
            :
                null,
    ].filter(a => a != null);
    let content = Permissions.can_view_Recipe(self.props.current_User) ?
        self.props.size == "preview" ?
            render_preview_Recipe(self)
            : self.props.size == "large" ?
                render_large_Recipe(self)
                : self.props.size == "fullscreen" ?
                    render_large_Recipe(self)
                    : "Error: unauthorised access to entity."
        : "Error: unauthorised access to entity.";
    if (self.props.mode == "view" && actions.length == 1 && !false)
        return React.createElement("a", { onClick: () => actions[0]() },
            React.createElement("div", { className: `${self.props.inline != undefined && self.props.inline ? "" : "model-content"} ${self.props.size == 'preview' ? 'model-content--preview' : ''}` }, content));
    else
        return React.createElement("div", { className: `${self.props.inline != undefined && self.props.inline ? "" : "model-content"} ${self.props.size == 'preview' ? 'model-content--preview' : ''}` }, content);
}
exports.render_content_Recipe = render_content_Recipe;
function render_Recipe_Name_minimised(self) {
    return !Permissions.can_view_Recipe_Name(self.props.current_User) ? null : React.createElement("div", { className: "model__attribute name" },
        React.createElement("label", { className: "attribute-label attribute-label-name" }, i18next.t(`Recipe:Name`, { context: self.props.inline ? "inline" : "" })),
        React.createElement("div", { className: "model__attribute-content" }, Components.String(self.props.is_editable && Permissions.can_edit_Recipe(self.props.current_User) && Permissions.can_edit_Recipe_Name(self.props.current_User), self.props.mode, () => self.props.entity.Name, v => self.props.set_entity(Object.assign({}, self.props.entity, { Name: v })))));
}
exports.render_Recipe_Name_minimised = render_Recipe_Name_minimised;
function render_Recipe_Ingredients_minimised(self) {
    return !Permissions.can_view_Recipe_Ingredients(self.props.current_User) ? null : React.createElement("div", { className: "model__attribute ingredients" },
        React.createElement("label", { className: "attribute-label attribute-label-ingredients" }, i18next.t(`Recipe:Ingredients`, { context: self.props.inline ? "inline" : "" })),
        React.createElement("div", { className: "model__attribute-content" }, Components.String(self.props.is_editable && Permissions.can_edit_Recipe(self.props.current_User) && Permissions.can_edit_Recipe_Ingredients(self.props.current_User), self.props.mode, () => self.props.entity.Ingredients, v => self.props.set_entity(Object.assign({}, self.props.entity, { Ingredients: v })))));
}
exports.render_Recipe_Ingredients_minimised = render_Recipe_Ingredients_minimised;
function render_Recipe_Description_minimised(self) {
    return !Permissions.can_view_Recipe_Description(self.props.current_User) ? null : React.createElement("div", { className: "model__attribute description" },
        React.createElement("label", { className: "attribute-label attribute-label-description" }, i18next.t(`Recipe:Description`, { context: self.props.inline ? "inline" : "" })),
        React.createElement("div", { className: "model__attribute-content" }, Components.String(self.props.is_editable && Permissions.can_edit_Recipe(self.props.current_User) && Permissions.can_edit_Recipe_Description(self.props.current_User), self.props.mode, () => self.props.entity.Description, v => self.props.set_entity(Object.assign({}, self.props.entity, { Description: v })))));
}
exports.render_Recipe_Description_minimised = render_Recipe_Description_minimised;
function render_Recipe_Picture_minimised(self) {
    return !Permissions.can_view_Recipe_Picture(self.props.current_User) ? null : React.createElement("div", { className: "model__attribute picture" },
        React.createElement("label", { className: "attribute-label attribute-label-picture" }, i18next.t(`Recipe:Picture`, { context: self.props.inline ? "inline" : "" })),
        React.createElement("div", { className: "model__attribute-content" }, Components.Image(self.props.is_editable && Permissions.can_edit_Recipe(self.props.current_User) && Permissions.can_edit_Recipe_Picture(self.props.current_User), self.props.mode, () => Api.get_Recipe_Picture(self.props.entity), (new_src) => Api.update_Recipe_Picture(self.props.entity, new_src))));
}
exports.render_Recipe_Picture_minimised = render_Recipe_Picture_minimised;
function render_Recipe_Name_maximised(self) {
    return !Permissions.can_view_Recipe_Name(self.props.current_User) ? null : React.createElement("div", { className: "model__attribute name" },
        React.createElement("label", { className: "attribute-label attribute-label-name" }, i18next.t(`Recipe:Name`, { context: self.props.inline ? "inline" : "" })),
        React.createElement("div", { className: "model__attribute-content" }, Components.String(self.props.is_editable && Permissions.can_edit_Recipe(self.props.current_User) && Permissions.can_edit_Recipe_Name(self.props.current_User), self.props.mode, () => self.props.entity.Name, v => self.props.set_entity(Object.assign({}, self.props.entity, { Name: v })))));
}
exports.render_Recipe_Name_maximised = render_Recipe_Name_maximised;
function render_Recipe_Ingredients_maximised(self) {
    return !Permissions.can_view_Recipe_Ingredients(self.props.current_User) ? null : React.createElement("div", { className: "model__attribute ingredients" },
        React.createElement("label", { className: "attribute-label attribute-label-ingredients" }, i18next.t(`Recipe:Ingredients`, { context: self.props.inline ? "inline" : "" })),
        React.createElement("div", { className: "model__attribute-content" }, Components.String(self.props.is_editable && Permissions.can_edit_Recipe(self.props.current_User) && Permissions.can_edit_Recipe_Ingredients(self.props.current_User), self.props.mode, () => self.props.entity.Ingredients, v => self.props.set_entity(Object.assign({}, self.props.entity, { Ingredients: v })))));
}
exports.render_Recipe_Ingredients_maximised = render_Recipe_Ingredients_maximised;
function render_Recipe_Description_maximised(self) {
    return !Permissions.can_view_Recipe_Description(self.props.current_User) ? null : React.createElement("div", { className: "model__attribute description" },
        React.createElement("label", { className: "attribute-label attribute-label-description" }, i18next.t(`Recipe:Description`, { context: self.props.inline ? "inline" : "" })),
        React.createElement("div", { className: "model__attribute-content" }, Components.String(self.props.is_editable && Permissions.can_edit_Recipe(self.props.current_User) && Permissions.can_edit_Recipe_Description(self.props.current_User), self.props.mode, () => self.props.entity.Description, v => self.props.set_entity(Object.assign({}, self.props.entity, { Description: v })))));
}
exports.render_Recipe_Description_maximised = render_Recipe_Description_maximised;
function render_Recipe_Picture_maximised(self) {
    return !Permissions.can_view_Recipe_Picture(self.props.current_User) ? null : React.createElement("div", { className: "model__attribute picture" },
        React.createElement("label", { className: "attribute-label attribute-label-picture" }, i18next.t(`Recipe:Picture`, { context: self.props.inline ? "inline" : "" })),
        React.createElement("div", { className: "model__attribute-content" }, Components.Image(self.props.is_editable && Permissions.can_edit_Recipe(self.props.current_User) && Permissions.can_edit_Recipe_Picture(self.props.current_User), self.props.mode, () => Api.get_Recipe_Picture(self.props.entity), (new_src) => Api.update_Recipe_Picture(self.props.entity, new_src))));
}
exports.render_Recipe_Picture_maximised = render_Recipe_Picture_maximised;
function render_preview_Recipe(self) {
    let attributes = null;
    if (self.props.mode == "view" || !Permissions.can_edit_Recipe(self.props.current_User))
        attributes = (React.createElement("div", { className: "model__attributes" },
            render_Recipe_Name_minimised(self),
            render_Recipe_Ingredients_minimised(self),
            render_Recipe_Description_minimised(self),
            render_Recipe_Picture_minimised(self)));
    else
        attributes = render_editable_attributes_minimised_Recipe(self);
    return (React.createElement("div", { className: "block" }, attributes));
}
exports.render_preview_Recipe = render_preview_Recipe;
function render_large_Recipe(self) {
    let state = self.state();
    let attributes = null;
    if (self.props.mode == "view" || !Permissions.can_edit_Recipe(self.props.current_User))
        attributes = (React.createElement("div", { className: "model__attributes" },
            render_Recipe_Name_maximised(self),
            render_Recipe_Ingredients_maximised(self),
            render_Recipe_Description_maximised(self),
            render_Recipe_Picture_maximised(self)));
    else
        attributes = render_editable_attributes_maximised_Recipe(self);
    return (React.createElement("div", { className: "block" },
        self.props.nesting_depth == 0 && self.props.shown_relation != "all" && self.props.shown_relation != "none" ? null : attributes,
        render_relations_Recipe(self)));
}
exports.render_large_Recipe = render_large_Recipe;
function render_Recipe_Meal_Recipe(self, context) {
    if ((context == "default" && self.props.shown_relation != "all" && self.props.shown_relation != "Meal_Recipe") || !Permissions.can_view_Meal(self.props.current_User))
        return null;
    let state = self.state();
    return React.createElement("div", null, List.render_relation("recipe_meal_recipe", "Recipe", "Meal", "Meals", self.props.nesting_depth > 0, false, false, false)(state.Meal != "loading" ?
        state.Meal.IdsInServerOrder.map(id => state.Meal != "loading" && state.Meal.Items.get(id)) :
        state.Meal, Recipe_Meal_Recipe_page_index(self), Recipe_Meal_Recipe_num_pages(self), new_page_index => {
        let state = self.state();
        state.Meal != "loading" &&
            self.setState(Object.assign({}, self.state(), { update_count: self.state().update_count + 1, Meal: Object.assign({}, state.Meal, { PageIndex: new_page_index }) }), () => load_relation_Recipe_Meal_Recipe(self, false, self.props.current_User));
    }, (i, _) => {
        let i_id = i.element.Id;
        let state = self.state();
        return React.createElement("div", { key: i_id, className: `model-nested__item ${i.size != "preview" ? "model-nested__item--open" : ""}
                        ${state.Meal != "loading" && state.Meal.JustCreated.has(i_id) && state.Meal.JustCreated.get(i_id) ? "newly-created" : ""}` },
            React.createElement("div", { key: i_id }, MealViews.Meal(Object.assign({}, self.props, { entity: i.element, inline: false, nesting_depth: self.props.nesting_depth + 1, size: i.size, allow_maximisation: true, allow_fullscreen: true, mode: self.props.mode == "edit" && (Permissions.can_edit_Meal_Recipe(self.props.current_User)
                    || Permissions.can_create_Meal_Recipe(self.props.current_User)
                    || Permissions.can_delete_Meal_Recipe(self.props.current_User)) ?
                    self.props.mode : "view", is_editable: state.Meal != "loading" && state.Meal.Editable.get(i_id), shown_relation: i.shown_relation, set_shown_relation: (new_shown_relation, callback) => {
                    let state = self.state();
                    state.Meal != "loading" &&
                        self.setState(Object.assign({}, self.state(), { Meal: Object.assign({}, state.Meal, { Items: state.Meal.Items.set(i_id, Object.assign({}, state.Meal.Items.get(i_id), { shown_relation: new_shown_relation })) }) }), callback);
                }, nested_entity_names: self.props.nested_entity_names.push("Meal"), set_size: (new_size, callback) => {
                    let new_shown_relation = new_size == "large" ? "all" : i.shown_relation;
                    let state = self.state();
                    state.Meal != "loading" &&
                        self.setState(Object.assign({}, self.state(), { Meal: Object.assign({}, state.Meal, { Items: state.Meal.Items.set(i_id, Object.assign({}, state.Meal.Items.get(i_id), { size: new_size, shown_relation: new_shown_relation })) }) }), callback);
                }, toggle_button: undefined, set_mode: undefined, set_entity: (new_entity, callback, force_update_count_increment) => {
                    let state = self.state();
                    state.Meal != "loading" &&
                        self.setState(Object.assign({}, self.state(), { dirty_Meal: state.dirty_Meal.set(i_id, new_entity), update_count: force_update_count_increment ? self.state().update_count + 1 : state.update_count, Meal: Object.assign({}, state.Meal, { Items: state.Meal.Items.set(i_id, Object.assign({}, state.Meal.Items.get(i_id), { element: new_entity })) }) }), callback);
                }, delete: undefined, unlink: !Permissions.can_delete_Meal_Recipe(self.props.current_User) ?
                    null
                    :
                        () => confirm(i18next.t('Are you sure?')) && Api.unlink_Meal_Meal_Recipes(i.element, self.props.entity).then(() => load_relation_Recipe_Meal_Recipe(self, false, self.props.current_User)) }))));
    }, () => React.createElement("div", null,
        Permissions.can_create_Meal(self.props.current_User) && Permissions.can_create_Meal_Recipe(self.props.current_User) && Recipe_Meal_Recipe_can_create(self) ? render_new_Recipe_Meal_Recipe(self) : null,
        Permissions.can_create_Meal_Recipe(self.props.current_User) ? render_add_existing_Recipe_Meal_Recipe(self) : null)));
}
exports.render_Recipe_Meal_Recipe = render_Recipe_Meal_Recipe;
function render_Recipe_PreparationTime_Recipe(self, context) {
    if ((context == "default" && self.props.shown_relation != "all" && self.props.shown_relation != "PreparationTime_Recipe") || !Permissions.can_view_PreparationTime(self.props.current_User))
        return null;
    let state = self.state();
    return React.createElement("div", null, List.render_relation("recipe_preparationtime_recipe", "Recipe", "PreparationTime", "PreparationTimes", self.props.nesting_depth > 0, false, false, false)(state.PreparationTime != "loading" ?
        state.PreparationTime.IdsInServerOrder.map(id => state.PreparationTime != "loading" && state.PreparationTime.Items.get(id)) :
        state.PreparationTime, Recipe_PreparationTime_Recipe_page_index(self), Recipe_PreparationTime_Recipe_num_pages(self), new_page_index => {
        let state = self.state();
        state.PreparationTime != "loading" &&
            self.setState(Object.assign({}, self.state(), { update_count: self.state().update_count + 1, PreparationTime: Object.assign({}, state.PreparationTime, { PageIndex: new_page_index }) }), () => load_relation_Recipe_PreparationTime_Recipe(self, false, self.props.current_User));
    }, (i, _) => {
        let i_id = i.element.Id;
        let state = self.state();
        return React.createElement("div", { key: i_id, className: `model-nested__item ${i.size != "preview" ? "model-nested__item--open" : ""}
                        ${state.PreparationTime != "loading" && state.PreparationTime.JustCreated.has(i_id) && state.PreparationTime.JustCreated.get(i_id) ? "newly-created" : ""}` },
            React.createElement("div", { key: i_id }, PreparationTimeViews.PreparationTime(Object.assign({}, self.props, { entity: i.element, inline: false, nesting_depth: self.props.nesting_depth + 1, size: i.size, allow_maximisation: true, allow_fullscreen: true, mode: self.props.mode == "edit" && (Permissions.can_edit_PreparationTime_Recipe(self.props.current_User)
                    || Permissions.can_create_PreparationTime_Recipe(self.props.current_User)
                    || Permissions.can_delete_PreparationTime_Recipe(self.props.current_User)) ?
                    self.props.mode : "view", is_editable: state.PreparationTime != "loading" && state.PreparationTime.Editable.get(i_id), shown_relation: i.shown_relation, set_shown_relation: (new_shown_relation, callback) => {
                    let state = self.state();
                    state.PreparationTime != "loading" &&
                        self.setState(Object.assign({}, self.state(), { PreparationTime: Object.assign({}, state.PreparationTime, { Items: state.PreparationTime.Items.set(i_id, Object.assign({}, state.PreparationTime.Items.get(i_id), { shown_relation: new_shown_relation })) }) }), callback);
                }, nested_entity_names: self.props.nested_entity_names.push("PreparationTime"), set_size: (new_size, callback) => {
                    let new_shown_relation = new_size == "large" ? "all" : i.shown_relation;
                    let state = self.state();
                    state.PreparationTime != "loading" &&
                        self.setState(Object.assign({}, self.state(), { PreparationTime: Object.assign({}, state.PreparationTime, { Items: state.PreparationTime.Items.set(i_id, Object.assign({}, state.PreparationTime.Items.get(i_id), { size: new_size, shown_relation: new_shown_relation })) }) }), callback);
                }, toggle_button: undefined, set_mode: undefined, set_entity: (new_entity, callback, force_update_count_increment) => {
                    let state = self.state();
                    state.PreparationTime != "loading" &&
                        self.setState(Object.assign({}, self.state(), { dirty_PreparationTime: state.dirty_PreparationTime.set(i_id, new_entity), update_count: force_update_count_increment ? self.state().update_count + 1 : state.update_count, PreparationTime: Object.assign({}, state.PreparationTime, { Items: state.PreparationTime.Items.set(i_id, Object.assign({}, state.PreparationTime.Items.get(i_id), { element: new_entity })) }) }), callback);
                }, delete: undefined, unlink: !Permissions.can_delete_PreparationTime_Recipe(self.props.current_User) ?
                    null
                    :
                        () => confirm(i18next.t('Are you sure?')) && Api.unlink_PreparationTime_PreparationTime_Recipes(i.element, self.props.entity).then(() => load_relation_Recipe_PreparationTime_Recipe(self, false, self.props.current_User)) }))));
    }, () => React.createElement("div", null,
        Permissions.can_create_PreparationTime(self.props.current_User) && Permissions.can_create_PreparationTime_Recipe(self.props.current_User) && Recipe_PreparationTime_Recipe_can_create(self) ? render_new_Recipe_PreparationTime_Recipe(self) : null,
        Permissions.can_create_PreparationTime_Recipe(self.props.current_User) ? render_add_existing_Recipe_PreparationTime_Recipe(self) : null)));
}
exports.render_Recipe_PreparationTime_Recipe = render_Recipe_PreparationTime_Recipe;
function render_Recipe_User_Recipe(self, context) {
    if ((context == "default" && self.props.shown_relation != "all" && self.props.shown_relation != "User_Recipe") || !Permissions.can_view_User(self.props.current_User))
        return null;
    let state = self.state();
    return React.createElement("div", null, List.render_relation("recipe_user_recipe", "Recipe", "User", "Users", self.props.nesting_depth > 0, false, false, false)(state.User != "loading" ?
        state.User.IdsInServerOrder.map(id => state.User != "loading" && state.User.Items.get(id)) :
        state.User, Recipe_User_Recipe_page_index(self), Recipe_User_Recipe_num_pages(self), new_page_index => {
        let state = self.state();
        state.User != "loading" &&
            self.setState(Object.assign({}, self.state(), { update_count: self.state().update_count + 1, User: Object.assign({}, state.User, { PageIndex: new_page_index }) }), () => load_relation_Recipe_User_Recipe(self, false, self.props.current_User));
    }, (i, _) => {
        let i_id = i.element.Id;
        let state = self.state();
        return React.createElement("div", { key: i_id, className: `model-nested__item ${i.size != "preview" ? "model-nested__item--open" : ""}
                        ${state.User != "loading" && state.User.JustCreated.has(i_id) && state.User.JustCreated.get(i_id) ? "newly-created" : ""}` },
            React.createElement("div", { key: i_id }, UserViews.User(Object.assign({}, self.props, { entity: i.element, inline: false, nesting_depth: self.props.nesting_depth + 1, size: i.size, allow_maximisation: true, allow_fullscreen: true, mode: self.props.mode == "edit" && (Permissions.can_edit_User_Recipe(self.props.current_User)
                    || Permissions.can_create_User_Recipe(self.props.current_User)
                    || Permissions.can_delete_User_Recipe(self.props.current_User)) ?
                    self.props.mode : "view", is_editable: state.User != "loading" && state.User.Editable.get(i_id), shown_relation: i.shown_relation, set_shown_relation: (new_shown_relation, callback) => {
                    let state = self.state();
                    state.User != "loading" &&
                        self.setState(Object.assign({}, self.state(), { User: Object.assign({}, state.User, { Items: state.User.Items.set(i_id, Object.assign({}, state.User.Items.get(i_id), { shown_relation: new_shown_relation })) }) }), callback);
                }, nested_entity_names: self.props.nested_entity_names.push("User"), set_size: (new_size, callback) => {
                    let new_shown_relation = new_size == "large" ? "all" : i.shown_relation;
                    let state = self.state();
                    state.User != "loading" &&
                        self.setState(Object.assign({}, self.state(), { User: Object.assign({}, state.User, { Items: state.User.Items.set(i_id, Object.assign({}, state.User.Items.get(i_id), { size: new_size, shown_relation: new_shown_relation })) }) }), callback);
                }, toggle_button: undefined, set_mode: undefined, set_entity: (new_entity, callback, force_update_count_increment) => {
                    let state = self.state();
                    state.User != "loading" &&
                        self.setState(Object.assign({}, self.state(), { dirty_User: state.dirty_User.set(i_id, new_entity), update_count: force_update_count_increment ? self.state().update_count + 1 : state.update_count, User: Object.assign({}, state.User, { Items: state.User.Items.set(i_id, Object.assign({}, state.User.Items.get(i_id), { element: new_entity })) }) }), callback);
                }, delete: undefined, unlink: !Permissions.can_delete_User_Recipe(self.props.current_User) ?
                    null
                    :
                        () => confirm(i18next.t('Are you sure?')) && Api.unlink_User_User_Recipes(i.element, self.props.entity).then(() => load_relation_Recipe_User_Recipe(self, false, self.props.current_User)) }))));
    }, () => React.createElement("div", null,
        Permissions.can_create_User(self.props.current_User) && Permissions.can_create_User_Recipe(self.props.current_User) && Recipe_User_Recipe_can_create(self) ? render_new_Recipe_User_Recipe(self) : null,
        Permissions.can_create_User_Recipe(self.props.current_User) ? render_add_existing_Recipe_User_Recipe(self) : null)));
}
exports.render_Recipe_User_Recipe = render_Recipe_User_Recipe;
function render_Recipe_Recipe_Rating(self, context) {
    if ((context == "default" && self.props.shown_relation != "all" && self.props.shown_relation != "Recipe_Rating") || !Permissions.can_view_Rating(self.props.current_User))
        return null;
    let state = self.state();
    return React.createElement("div", null, List.render_relation("recipe_recipe_rating", "Recipe", "Rating", "Ratings", self.props.nesting_depth > 0, false, false, false)(state.Rating != "loading" ?
        state.Rating.IdsInServerOrder.map(id => state.Rating != "loading" && state.Rating.Items.get(id)) :
        state.Rating, Recipe_Recipe_Rating_page_index(self), Recipe_Recipe_Rating_num_pages(self), new_page_index => {
        let state = self.state();
        state.Rating != "loading" &&
            self.setState(Object.assign({}, self.state(), { update_count: self.state().update_count + 1, Rating: Object.assign({}, state.Rating, { PageIndex: new_page_index }) }), () => load_relation_Recipe_Recipe_Rating(self, false, self.props.current_User));
    }, (i, _) => {
        let i_id = i.element.Id;
        let state = self.state();
        return React.createElement("div", { key: i_id, className: `model-nested__item ${i.size != "preview" ? "model-nested__item--open" : ""}
                        ${state.Rating != "loading" && state.Rating.JustCreated.has(i_id) && state.Rating.JustCreated.get(i_id) ? "newly-created" : ""}` },
            React.createElement("div", { key: i_id }, RatingViews.Rating(Object.assign({}, self.props, { entity: i.element, inline: false, nesting_depth: self.props.nesting_depth + 1, size: i.size, allow_maximisation: true, allow_fullscreen: true, mode: self.props.mode == "edit" && (Permissions.can_edit_Recipe_Rating(self.props.current_User)
                    || Permissions.can_create_Recipe_Rating(self.props.current_User)
                    || Permissions.can_delete_Recipe_Rating(self.props.current_User)) ?
                    self.props.mode : "view", is_editable: state.Rating != "loading" && state.Rating.Editable.get(i_id), shown_relation: i.shown_relation, set_shown_relation: (new_shown_relation, callback) => {
                    let state = self.state();
                    state.Rating != "loading" &&
                        self.setState(Object.assign({}, self.state(), { Rating: Object.assign({}, state.Rating, { Items: state.Rating.Items.set(i_id, Object.assign({}, state.Rating.Items.get(i_id), { shown_relation: new_shown_relation })) }) }), callback);
                }, nested_entity_names: self.props.nested_entity_names.push("Rating"), set_size: (new_size, callback) => {
                    let new_shown_relation = new_size == "large" ? "all" : i.shown_relation;
                    let state = self.state();
                    state.Rating != "loading" &&
                        self.setState(Object.assign({}, self.state(), { Rating: Object.assign({}, state.Rating, { Items: state.Rating.Items.set(i_id, Object.assign({}, state.Rating.Items.get(i_id), { size: new_size, shown_relation: new_shown_relation })) }) }), callback);
                }, toggle_button: undefined, set_mode: undefined, set_entity: (new_entity, callback, force_update_count_increment) => {
                    let state = self.state();
                    state.Rating != "loading" &&
                        self.setState(Object.assign({}, self.state(), { dirty_Rating: state.dirty_Rating.set(i_id, new_entity), update_count: force_update_count_increment ? self.state().update_count + 1 : state.update_count, Rating: Object.assign({}, state.Rating, { Items: state.Rating.Items.set(i_id, Object.assign({}, state.Rating.Items.get(i_id), { element: new_entity })) }) }), callback);
                }, delete: undefined, unlink: !Permissions.can_delete_Recipe_Rating(self.props.current_User) ?
                    null
                    :
                        () => confirm(i18next.t('Are you sure?')) && Api.unlink_Recipe_Recipe_Ratings(self.props.entity, i.element).then(() => load_relation_Recipe_Recipe_Rating(self, false, self.props.current_User)) }))));
    }, () => React.createElement("div", null,
        Permissions.can_create_Rating(self.props.current_User) && Permissions.can_create_Recipe_Rating(self.props.current_User) && Recipe_Recipe_Rating_can_create(self) ? render_new_Recipe_Recipe_Rating(self) : null,
        Permissions.can_create_Recipe_Rating(self.props.current_User) ? render_add_existing_Recipe_Recipe_Rating(self) : null)));
}
exports.render_Recipe_Recipe_Rating = render_Recipe_Recipe_Rating;
function render_Recipe_RecommendationPage_Recipe(self, context) {
    if ((context == "default" && self.props.shown_relation != "all" && self.props.shown_relation != "RecommendationPage_Recipe") || !Permissions.can_view_RecommendationPage(self.props.current_User))
        return null;
    let state = self.state();
    return React.createElement("div", null, List.render_relation("recipe_recommendationpage_recipe", "Recipe", "RecommendationPage", "RecommendationPages", self.props.nesting_depth > 0, false, false, false)(state.RecommendationPage != "loading" ?
        state.RecommendationPage.IdsInServerOrder.map(id => state.RecommendationPage != "loading" && state.RecommendationPage.Items.get(id)) :
        state.RecommendationPage, Recipe_RecommendationPage_Recipe_page_index(self), Recipe_RecommendationPage_Recipe_num_pages(self), new_page_index => {
        let state = self.state();
        state.RecommendationPage != "loading" &&
            self.setState(Object.assign({}, self.state(), { update_count: self.state().update_count + 1, RecommendationPage: Object.assign({}, state.RecommendationPage, { PageIndex: new_page_index }) }), () => load_relation_Recipe_RecommendationPage_Recipe(self, false, self.props.current_User));
    }, (i, _) => {
        let i_id = i.element.Id;
        let state = self.state();
        return React.createElement("div", { key: i_id, className: `model-nested__item ${i.size != "preview" ? "model-nested__item--open" : ""}
                        ${state.RecommendationPage != "loading" && state.RecommendationPage.JustCreated.has(i_id) && state.RecommendationPage.JustCreated.get(i_id) ? "newly-created" : ""}` },
            React.createElement("div", { key: i_id }, RecommendationPageViews.RecommendationPage(Object.assign({}, self.props, { entity: i.element, inline: false, nesting_depth: self.props.nesting_depth + 1, size: i.size, allow_maximisation: true, allow_fullscreen: true, mode: self.props.mode == "edit" && (Permissions.can_edit_RecommendationPage_Recipe(self.props.current_User)
                    || Permissions.can_create_RecommendationPage_Recipe(self.props.current_User)
                    || Permissions.can_delete_RecommendationPage_Recipe(self.props.current_User)) ?
                    self.props.mode : "view", is_editable: state.RecommendationPage != "loading" && state.RecommendationPage.Editable.get(i_id), shown_relation: i.shown_relation, set_shown_relation: (new_shown_relation, callback) => {
                    let state = self.state();
                    state.RecommendationPage != "loading" &&
                        self.setState(Object.assign({}, self.state(), { RecommendationPage: Object.assign({}, state.RecommendationPage, { Items: state.RecommendationPage.Items.set(i_id, Object.assign({}, state.RecommendationPage.Items.get(i_id), { shown_relation: new_shown_relation })) }) }), callback);
                }, nested_entity_names: self.props.nested_entity_names.push("RecommendationPage"), set_size: (new_size, callback) => {
                    let new_shown_relation = new_size == "large" ? "all" : i.shown_relation;
                    let state = self.state();
                    state.RecommendationPage != "loading" &&
                        self.setState(Object.assign({}, self.state(), { RecommendationPage: Object.assign({}, state.RecommendationPage, { Items: state.RecommendationPage.Items.set(i_id, Object.assign({}, state.RecommendationPage.Items.get(i_id), { size: new_size, shown_relation: new_shown_relation })) }) }), callback);
                }, toggle_button: undefined, set_mode: undefined, set_entity: (new_entity, callback, force_update_count_increment) => {
                    let state = self.state();
                    state.RecommendationPage != "loading" &&
                        self.setState(Object.assign({}, self.state(), { dirty_RecommendationPage: state.dirty_RecommendationPage.set(i_id, new_entity), update_count: force_update_count_increment ? self.state().update_count + 1 : state.update_count, RecommendationPage: Object.assign({}, state.RecommendationPage, { Items: state.RecommendationPage.Items.set(i_id, Object.assign({}, state.RecommendationPage.Items.get(i_id), { element: new_entity })) }) }), callback);
                }, delete: undefined, unlink: !Permissions.can_delete_RecommendationPage_Recipe(self.props.current_User) ?
                    null
                    :
                        () => confirm(i18next.t('Are you sure?')) && Api.unlink_RecommendationPage_RecommendationPage_Recipes(i.element, self.props.entity).then(() => load_relation_Recipe_RecommendationPage_Recipe(self, false, self.props.current_User)) }))));
    }, () => React.createElement("div", null,
        Permissions.can_create_RecommendationPage(self.props.current_User) && Permissions.can_create_RecommendationPage_Recipe(self.props.current_User) && Recipe_RecommendationPage_Recipe_can_create(self) ? render_new_Recipe_RecommendationPage_Recipe(self) : null,
        Permissions.can_create_RecommendationPage_Recipe(self.props.current_User) ? render_add_existing_Recipe_RecommendationPage_Recipe(self) : null)));
}
exports.render_Recipe_RecommendationPage_Recipe = render_Recipe_RecommendationPage_Recipe;
function render_relations_Recipe(self) {
    return React.createElement("div", { className: "relations" },
        render_Recipe_PreparationTime_Recipe(self, "default"),
        render_Recipe_Recipe_Rating(self, "default"));
}
exports.render_relations_Recipe = render_relations_Recipe;
function render_add_existing_Recipe_Meal_Recipe(self) {
    let state = self.state();
    return self.props.mode == "edit" ?
        React.createElement("div", { className: "button__actions" }, state.add_step_Meal != "open" ?
            React.createElement(Buttons.Add, { disabled: state.Meal == "loading" ? true : state.Meal.TotalCount >= 1, onClick: () => self.setState(Object.assign({}, self.state(), { add_step_Meal: "open" })), target_name: "Meal" })
            :
                React.createElement(List.AddToRelation, {
                    relation_name: "recipe_meal_recipe",
                    source_name: "Recipe",
                    target_name: "Meal",
                    target_plural: "Meals",
                    page_size: 25,
                    render_target: (i, i_id) => React.createElement("div", { key: i_id, className: "group__item" },
                        React.createElement("a", { className: "group__button button button--existing", onClick: () => self.setState(Object.assign({}, self.state(), { add_step_Meal: "saving" }), () => Api.link_Recipe_Meal_Recipes(self.props.entity, i).then(() => self.setState(Object.assign({}, self.state(), { add_step_Meal: "closed" }), () => load_relation_Recipe_Meal_Recipe(self, false, self.props.current_User)))) }, "Add existing"),
                        React.createElement("div", { className: "group__title", disabled: true }, MealViews.Meal(Object.assign({}, self.props, { entity: i, nesting_depth: self.props.nesting_depth + 1, size: "preview", mode: "view", is_editable: false, nested_entity_names: self.props.nested_entity_names.push("Meal"), set_size: undefined, toggle_button: undefined, set_mode: undefined, set_entity: (new_entity, callback) => { }, unlink: undefined, delete: undefined })))),
                    cancel: () => self.setState(Object.assign({}, self.state(), { add_step_Meal: "closed" })),
                    get_items: [
                        { name: "Lunch", get: (i, s) => __awaiter(this, void 0, void 0, function* () { return Api.get_unlinked_Recipe_Meal_Recipes_Lunch(self.props.entity, i, s); }) },
                        { name: "Brunch", get: (i, s) => __awaiter(this, void 0, void 0, function* () { return Api.get_unlinked_Recipe_Meal_Recipes_Brunch(self.props.entity, i, s); }) },
                        { name: "Dinner", get: (i, s) => __awaiter(this, void 0, void 0, function* () { return Api.get_unlinked_Recipe_Meal_Recipes_Dinner(self.props.entity, i, s); }) },
                        { name: "Breakfast", get: (i, s) => __awaiter(this, void 0, void 0, function* () { return Api.get_unlinked_Recipe_Meal_Recipes_Breakfast(self.props.entity, i, s); }) }
                    ]
                }))
        :
            null;
}
exports.render_add_existing_Recipe_Meal_Recipe = render_add_existing_Recipe_Meal_Recipe;
function render_add_existing_Recipe_PreparationTime_Recipe(self) {
    let state = self.state();
    return self.props.mode == "edit" ?
        React.createElement("div", { className: "button__actions" }, state.add_step_PreparationTime != "open" ?
            React.createElement(Buttons.Add, { disabled: state.PreparationTime == "loading" ? true : state.PreparationTime.TotalCount >= 1, onClick: () => self.setState(Object.assign({}, self.state(), { add_step_PreparationTime: "open" })), target_name: "PreparationTime" })
            :
                React.createElement(List.AddToRelation, {
                    relation_name: "recipe_preparationtime_recipe",
                    source_name: "Recipe",
                    target_name: "PreparationTime",
                    target_plural: "PreparationTimes",
                    page_size: 25,
                    render_target: (i, i_id) => React.createElement("div", { key: i_id, className: "group__item" },
                        React.createElement("a", { className: "group__button button button--existing", onClick: () => self.setState(Object.assign({}, self.state(), { add_step_PreparationTime: "saving" }), () => Api.link_Recipe_PreparationTime_Recipes(self.props.entity, i).then(() => self.setState(Object.assign({}, self.state(), { add_step_PreparationTime: "closed" }), () => load_relation_Recipe_PreparationTime_Recipe(self, false, self.props.current_User)))) }, "Add existing"),
                        React.createElement("div", { className: "group__title", disabled: true }, PreparationTimeViews.PreparationTime(Object.assign({}, self.props, { entity: i, nesting_depth: self.props.nesting_depth + 1, size: "preview", mode: "view", is_editable: false, nested_entity_names: self.props.nested_entity_names.push("PreparationTime"), set_size: undefined, toggle_button: undefined, set_mode: undefined, set_entity: (new_entity, callback) => { }, unlink: undefined, delete: undefined })))),
                    cancel: () => self.setState(Object.assign({}, self.state(), { add_step_PreparationTime: "closed" })),
                    get_items: [
                        { name: "Thirty", get: (i, s) => __awaiter(this, void 0, void 0, function* () { return Api.get_unlinked_Recipe_PreparationTime_Recipes_Thirty(self.props.entity, i, s); }) },
                        { name: "Sixty", get: (i, s) => __awaiter(this, void 0, void 0, function* () { return Api.get_unlinked_Recipe_PreparationTime_Recipes_Sixty(self.props.entity, i, s); }) },
                        { name: "Ninety", get: (i, s) => __awaiter(this, void 0, void 0, function* () { return Api.get_unlinked_Recipe_PreparationTime_Recipes_Ninety(self.props.entity, i, s); }) },
                        { name: "Fifteen", get: (i, s) => __awaiter(this, void 0, void 0, function* () { return Api.get_unlinked_Recipe_PreparationTime_Recipes_Fifteen(self.props.entity, i, s); }) }
                    ]
                }))
        :
            null;
}
exports.render_add_existing_Recipe_PreparationTime_Recipe = render_add_existing_Recipe_PreparationTime_Recipe;
function render_add_existing_Recipe_User_Recipe(self) {
    let state = self.state();
    return self.props.mode == "edit" ?
        React.createElement("div", { className: "button__actions" }, state.add_step_User != "open" ?
            React.createElement(Buttons.Add, { onClick: () => self.setState(Object.assign({}, self.state(), { add_step_User: "open" })), target_name: "User" })
            :
                React.createElement(List.AddToRelation, {
                    relation_name: "recipe_user_recipe",
                    source_name: "Recipe",
                    target_name: "User",
                    target_plural: "Users",
                    page_size: 25,
                    render_target: (i, i_id) => React.createElement("div", { key: i_id, className: "group__item" },
                        React.createElement("a", { className: "group__button button button--existing", onClick: () => self.setState(Object.assign({}, self.state(), { add_step_User: "saving" }), () => Api.link_Recipe_User_Recipes(self.props.entity, i).then(() => self.setState(Object.assign({}, self.state(), { add_step_User: "closed" }), () => load_relation_Recipe_User_Recipe(self, false, self.props.current_User)))) }, "Add existing"),
                        React.createElement("div", { className: "group__title", disabled: true }, UserViews.User(Object.assign({}, self.props, { entity: i, nesting_depth: self.props.nesting_depth + 1, size: "preview", mode: "view", is_editable: false, nested_entity_names: self.props.nested_entity_names.push("User"), set_size: undefined, toggle_button: undefined, set_mode: undefined, set_entity: (new_entity, callback) => { }, unlink: undefined, delete: undefined })))),
                    cancel: () => self.setState(Object.assign({}, self.state(), { add_step_User: "closed" })),
                    get_items: [
                        { name: "User", get: (i, s) => __awaiter(this, void 0, void 0, function* () { return Api.get_unlinked_Recipe_User_Recipes(self.props.entity, i, s); }) },
                    ]
                }))
        :
            null;
}
exports.render_add_existing_Recipe_User_Recipe = render_add_existing_Recipe_User_Recipe;
function render_add_existing_Recipe_Recipe_Rating(self) {
    let state = self.state();
    return self.props.mode == "edit" ?
        React.createElement("div", { className: "button__actions" }, state.add_step_Rating != "open" ?
            React.createElement(Buttons.Add, { onClick: () => self.setState(Object.assign({}, self.state(), { add_step_Rating: "open" })), target_name: "Rating" })
            :
                React.createElement(List.AddToRelation, {
                    relation_name: "recipe_recipe_rating",
                    source_name: "Recipe",
                    target_name: "Rating",
                    target_plural: "Ratings",
                    page_size: 25,
                    render_target: (i, i_id) => React.createElement("div", { key: i_id, className: "group__item" },
                        React.createElement("a", { className: "group__button button button--existing", onClick: () => self.setState(Object.assign({}, self.state(), { add_step_Rating: "saving" }), () => Api.link_Recipe_Recipe_Ratings(self.props.entity, i).then(() => self.setState(Object.assign({}, self.state(), { add_step_Rating: "closed" }), () => load_relation_Recipe_Recipe_Rating(self, false, self.props.current_User)))) }, "Add existing"),
                        React.createElement("div", { className: "group__title", disabled: true }, RatingViews.Rating(Object.assign({}, self.props, { entity: i, nesting_depth: self.props.nesting_depth + 1, size: "preview", mode: "view", is_editable: false, nested_entity_names: self.props.nested_entity_names.push("Rating"), set_size: undefined, toggle_button: undefined, set_mode: undefined, set_entity: (new_entity, callback) => { }, unlink: undefined, delete: undefined })))),
                    cancel: () => self.setState(Object.assign({}, self.state(), { add_step_Rating: "closed" })),
                    get_items: [
                        { name: "Rating", get: (i, s) => __awaiter(this, void 0, void 0, function* () { return Api.get_unlinked_Recipe_Recipe_Ratings(self.props.entity, i, s); }) },
                    ]
                }))
        :
            null;
}
exports.render_add_existing_Recipe_Recipe_Rating = render_add_existing_Recipe_Recipe_Rating;
function render_add_existing_Recipe_RecommendationPage_Recipe(self) {
    let state = self.state();
    return self.props.mode == "edit" ?
        React.createElement("div", { className: "button__actions" }, state.add_step_RecommendationPage != "open" ?
            React.createElement(Buttons.Add, { onClick: () => self.setState(Object.assign({}, self.state(), { add_step_RecommendationPage: "open" })), target_name: "RecommendationPage" })
            :
                React.createElement(List.AddToRelation, {
                    relation_name: "recipe_recommendationpage_recipe",
                    source_name: "Recipe",
                    target_name: "RecommendationPage",
                    target_plural: "RecommendationPages",
                    page_size: 25,
                    render_target: (i, i_id) => React.createElement("div", { key: i_id, className: "group__item" },
                        React.createElement("a", { className: "group__button button button--existing", onClick: () => self.setState(Object.assign({}, self.state(), { add_step_RecommendationPage: "saving" }), () => Api.link_Recipe_RecommendationPage_Recipes(self.props.entity, i).then(() => self.setState(Object.assign({}, self.state(), { add_step_RecommendationPage: "closed" }), () => load_relation_Recipe_RecommendationPage_Recipe(self, false, self.props.current_User)))) }, "Add existing"),
                        React.createElement("div", { className: "group__title", disabled: true }, RecommendationPageViews.RecommendationPage(Object.assign({}, self.props, { entity: i, nesting_depth: self.props.nesting_depth + 1, size: "preview", mode: "view", is_editable: false, nested_entity_names: self.props.nested_entity_names.push("RecommendationPage"), set_size: undefined, toggle_button: undefined, set_mode: undefined, set_entity: (new_entity, callback) => { }, unlink: undefined, delete: undefined })))),
                    cancel: () => self.setState(Object.assign({}, self.state(), { add_step_RecommendationPage: "closed" })),
                    get_items: [
                        { name: "RecommendationPage", get: (i, s) => __awaiter(this, void 0, void 0, function* () { return Api.get_unlinked_Recipe_RecommendationPage_Recipes(self.props.entity, i, s); }) },
                    ]
                }))
        :
            null;
}
exports.render_add_existing_Recipe_RecommendationPage_Recipe = render_add_existing_Recipe_RecommendationPage_Recipe;
function render_new_Recipe_Meal_Recipe(self) {
    let state = self.state();
    return self.props.mode == "edit" ?
        React.createElement("div", { className: "button__actions" },
            React.createElement(Buttons.Create, { target_name: "Meal", onClick: () => self.setState(Object.assign({}, self.state(), { add_step_Meal: "creating" })) }),
            state.add_step_Meal != "creating" ?
                null
                :
                    React.createElement("div", { className: "overlay__item overlay__item--new" },
                        React.createElement("div", { className: "new-lunch" },
                            React.createElement("button", { disabled: state.Meal == "loading" ? true : state.Meal.TotalCount >= 1, className: "new-lunch button button--new", onClick: () => Api.create_linked_Recipe_Meal_Recipes_Lunch(self.props.entity).then(e => {
                                    e.length > 0 &&
                                        Api.update_Lunch(Object.assign({}, e[0], { Kind: "Lunch", Description: "" })).then(() => load_relation_Recipe_Meal_Recipe(self, true, self.props.current_User, () => self.setState(Object.assign({}, self.state(), { add_step_Meal: "closed" }))));
                                }) }, i18next.t('Create new Lunch'))),
                        React.createElement("div", { className: "new-brunch" },
                            React.createElement("button", { disabled: state.Meal == "loading" ? true : state.Meal.TotalCount >= 1, className: "new-brunch button button--new", onClick: () => Api.create_linked_Recipe_Meal_Recipes_Brunch(self.props.entity).then(e => {
                                    e.length > 0 &&
                                        Api.update_Brunch(Object.assign({}, e[0], { Kind: "Brunch", Description: "" })).then(() => load_relation_Recipe_Meal_Recipe(self, true, self.props.current_User, () => self.setState(Object.assign({}, self.state(), { add_step_Meal: "closed" }))));
                                }) }, i18next.t('Create new Brunch'))),
                        React.createElement("div", { className: "new-dinner" },
                            React.createElement("button", { disabled: state.Meal == "loading" ? true : state.Meal.TotalCount >= 1, className: "new-dinner button button--new", onClick: () => Api.create_linked_Recipe_Meal_Recipes_Dinner(self.props.entity).then(e => {
                                    e.length > 0 &&
                                        Api.update_Dinner(Object.assign({}, e[0], { Kind: "Dinner", Description: "" })).then(() => load_relation_Recipe_Meal_Recipe(self, true, self.props.current_User, () => self.setState(Object.assign({}, self.state(), { add_step_Meal: "closed" }))));
                                }) }, i18next.t('Create new Dinner'))),
                        React.createElement("div", { className: "new-breakfast" },
                            React.createElement("button", { disabled: state.Meal == "loading" ? true : state.Meal.TotalCount >= 1, className: "new-breakfast button button--new", onClick: () => Api.create_linked_Recipe_Meal_Recipes_Breakfast(self.props.entity).then(e => {
                                    e.length > 0 &&
                                        Api.update_Breakfast(Object.assign({}, e[0], { Kind: "Breakfast", Description: "" })).then(() => load_relation_Recipe_Meal_Recipe(self, true, self.props.current_User, () => self.setState(Object.assign({}, self.state(), { add_step_Meal: "closed" }))));
                                }) }, i18next.t('Create new Breakfast'))),
                        React.createElement(Buttons.Cancel, { onClick: () => self.setState(Object.assign({}, self.state(), { add_step_Meal: "closed" })) })))
        :
            null;
}
exports.render_new_Recipe_Meal_Recipe = render_new_Recipe_Meal_Recipe;
function render_new_Recipe_PreparationTime_Recipe(self) {
    let state = self.state();
    return self.props.mode == "edit" ?
        React.createElement("div", { className: "button__actions" },
            React.createElement(Buttons.Create, { target_name: "PreparationTime", onClick: () => self.setState(Object.assign({}, self.state(), { add_step_PreparationTime: "creating" })) }),
            state.add_step_PreparationTime != "creating" ?
                null
                :
                    React.createElement("div", { className: "overlay__item overlay__item--new" },
                        React.createElement("div", { className: "new-thirty" },
                            React.createElement("button", { disabled: state.PreparationTime == "loading" ? true : state.PreparationTime.TotalCount >= 1, className: "new-thirty button button--new", onClick: () => Api.create_linked_Recipe_PreparationTime_Recipes_Thirty(self.props.entity).then(e => {
                                    e.length > 0 &&
                                        Api.update_Thirty(Object.assign({}, e[0], { Kind: "Thirty", Description: "" })).then(() => load_relation_Recipe_PreparationTime_Recipe(self, true, self.props.current_User, () => self.setState(Object.assign({}, self.state(), { add_step_PreparationTime: "closed" }))));
                                }) }, i18next.t('Create new Thirty'))),
                        React.createElement("div", { className: "new-sixty" },
                            React.createElement("button", { disabled: state.PreparationTime == "loading" ? true : state.PreparationTime.TotalCount >= 1, className: "new-sixty button button--new", onClick: () => Api.create_linked_Recipe_PreparationTime_Recipes_Sixty(self.props.entity).then(e => {
                                    e.length > 0 &&
                                        Api.update_Sixty(Object.assign({}, e[0], { Kind: "Sixty", Description: "" })).then(() => load_relation_Recipe_PreparationTime_Recipe(self, true, self.props.current_User, () => self.setState(Object.assign({}, self.state(), { add_step_PreparationTime: "closed" }))));
                                }) }, i18next.t('Create new Sixty'))),
                        React.createElement("div", { className: "new-ninety" },
                            React.createElement("button", { disabled: state.PreparationTime == "loading" ? true : state.PreparationTime.TotalCount >= 1, className: "new-ninety button button--new", onClick: () => Api.create_linked_Recipe_PreparationTime_Recipes_Ninety(self.props.entity).then(e => {
                                    e.length > 0 &&
                                        Api.update_Ninety(Object.assign({}, e[0], { Kind: "Ninety", Description: "" })).then(() => load_relation_Recipe_PreparationTime_Recipe(self, true, self.props.current_User, () => self.setState(Object.assign({}, self.state(), { add_step_PreparationTime: "closed" }))));
                                }) }, i18next.t('Create new Ninety'))),
                        React.createElement("div", { className: "new-fifteen" },
                            React.createElement("button", { disabled: state.PreparationTime == "loading" ? true : state.PreparationTime.TotalCount >= 1, className: "new-fifteen button button--new", onClick: () => Api.create_linked_Recipe_PreparationTime_Recipes_Fifteen(self.props.entity).then(e => {
                                    e.length > 0 &&
                                        Api.update_Fifteen(Object.assign({}, e[0], { Kind: "Fifteen", Description: "" })).then(() => load_relation_Recipe_PreparationTime_Recipe(self, true, self.props.current_User, () => self.setState(Object.assign({}, self.state(), { add_step_PreparationTime: "closed" }))));
                                }) }, i18next.t('Create new Fifteen'))),
                        React.createElement(Buttons.Cancel, { onClick: () => self.setState(Object.assign({}, self.state(), { add_step_PreparationTime: "closed" })) })))
        :
            null;
}
exports.render_new_Recipe_PreparationTime_Recipe = render_new_Recipe_PreparationTime_Recipe;
function render_new_Recipe_User_Recipe(self) {
    let state = self.state();
    return state.create_step_User != "none" ?
        React.createElement("div", { className: "overlay__item overlay__item--new" },
            React.createElement("label", null,
                i18next.t('Username'),
                React.createElement("input", { type: "text", value: state.create_step_User.username, onChange: (e) => state.create_step_User != "none" &&
                        self.setState(Object.assign({}, self.state(), { create_step_User: Object.assign({}, state.create_step_User, { username: e.target.value }) })) })),
            React.createElement("label", null,
                i18next.t('Email'),
                React.createElement("input", { type: "email", value: state.create_step_User.email, onChange: (e) => state.create_step_User != "none" &&
                        self.setState(Object.assign({}, self.state(), { create_step_User: Object.assign({}, state.create_step_User, { email: e.target.value }) })) })),
            React.createElement("label", null,
                i18next.t('Email confirmation'),
                React.createElement("input", { type: "email", value: state.create_step_User.email_confirmation, onChange: (e) => state.create_step_User != "none" &&
                        self.setState(Object.assign({}, self.state(), { create_step_User: Object.assign({}, state.create_step_User, { email_confirmation: e.target.value }) })) })),
            state.create_step_User.validation == "validating" ?
                React.createElement("div", { className: "loading" }, i18next.t('Validating'))
                :
                    React.createElement(Buttons.Create, { onClick: () => state.create_step_User != "none" &&
                            Api.validate_User(state.create_step_User.username, state.create_step_User.email, state.create_step_User.email_confirmation).then(is_valid => {
                                if (state.create_step_User != "none" && is_valid) {
                                    Api.register_User(state.create_step_User.username, state.create_step_User.email, state.create_step_User.email_confirmation).then(() => load_relation_Recipe_User_Recipe(self, false, self.props.current_User, () => self.setState(Object.assign({}, self.state(), { create_step_User: "none" }))));
                                }
                                else {
                                    state.create_step_User != "none" &&
                                        self.setState(Object.assign({}, self.state(), { create_step_User: Object.assign({}, state.create_step_User, { validation: "invalid" }) }), () => alert(i18next.t('The username and email combination is invalid or it might already be in use. Please try a different combination.')));
                                }
                            }).catch(() => state.create_step_User != "none" &&
                                self.setState(Object.assign({}, self.state(), { create_step_User: Object.assign({}, state.create_step_User, { validation: "invalid" }) }), () => alert(i18next.t('The username and email combination is invalid or it might already be in use. Please try a different combination.')))), target_name: "User" }),
            React.createElement(Buttons.Cancel, { onClick: () => self.setState(Object.assign({}, self.state(), { create_step_User: "none" })) }))
        : self.props.mode == "edit" ?
            React.createElement("div", { className: "button__actions" },
                React.createElement("div", { className: "new-user" },
                    React.createElement("button", { className: "new-user button button--new", onClick: () => self.setState(Object.assign({}, self.state(), { create_step_User: { validation: "invalid", username: "", email: "", email_confirmation: "" } })) }, i18next.t('Create new User'))))
            :
                null;
}
exports.render_new_Recipe_User_Recipe = render_new_Recipe_User_Recipe;
function render_new_Recipe_Recipe_Rating(self) {
    let state = self.state();
    return self.props.mode == "edit" ?
        React.createElement("div", { className: "button__actions" },
            React.createElement("div", { className: "new-rating" },
                React.createElement("button", { className: "new-rating button button--new", onClick: () => Api.create_linked_Recipe_Recipe_Ratings_Rating(self.props.entity).then(e => {
                        e.length > 0 &&
                            Api.update_Rating(Object.assign({}, e[0], { Number: 0 })).then(() => load_relation_Recipe_Recipe_Rating(self, true, self.props.current_User, () => self.setState(Object.assign({}, self.state(), { add_step_Rating: "closed" }))));
                    }) }, i18next.t('Create new Rating'))))
        :
            null;
}
exports.render_new_Recipe_Recipe_Rating = render_new_Recipe_Recipe_Rating;
function render_new_Recipe_RecommendationPage_Recipe(self) {
    let state = self.state();
    return self.props.mode == "edit" ?
        React.createElement("div", { className: "button__actions" },
            React.createElement("div", { className: "new-recommendationpage" },
                React.createElement("button", { className: "new-recommendationpage button button--new", onClick: () => Api.create_linked_Recipe_RecommendationPage_Recipes_RecommendationPage(self.props.entity).then(e => {
                        e.length > 0 &&
                            Api.update_RecommendationPage(Object.assign({}, e[0])).then(() => load_relation_Recipe_RecommendationPage_Recipe(self, true, self.props.current_User, () => self.setState(Object.assign({}, self.state(), { add_step_RecommendationPage: "closed" }))));
                    }) }, i18next.t('Create new RecommendationPage'))))
        :
            null;
}
exports.render_new_Recipe_RecommendationPage_Recipe = render_new_Recipe_RecommendationPage_Recipe;
function render_saving_animations_Recipe(self) {
    return self.state().dirty_Meal.count() > 0 ?
        React.createElement("div", { style: { position: "fixed", zIndex: 10000, top: 0, left: 0, width: "20px", height: "20px", backgroundColor: "red" }, className: "saving" }) :
        self.state().dirty_PreparationTime.count() > 0 ?
            React.createElement("div", { style: { position: "fixed", zIndex: 10000, top: 0, left: 0, width: "20px", height: "20px", backgroundColor: "red" }, className: "saving" }) :
            self.state().dirty_User.count() > 0 ?
                React.createElement("div", { style: { position: "fixed", zIndex: 10000, top: 0, left: 0, width: "20px", height: "20px", backgroundColor: "red" }, className: "saving" }) :
                self.state().dirty_Rating.count() > 0 ?
                    React.createElement("div", { style: { position: "fixed", zIndex: 10000, top: 0, left: 0, width: "20px", height: "20px", backgroundColor: "red" }, className: "saving" }) :
                    self.state().dirty_RecommendationPage.count() > 0 ?
                        React.createElement("div", { style: { position: "fixed", zIndex: 10000, top: 0, left: 0, width: "20px", height: "20px", backgroundColor: "red" }, className: "saving" })
                        : React.createElement("div", { style: { position: "fixed", zIndex: 10000, top: 0, left: 0, width: "20px", height: "20px", backgroundColor: "cornflowerblue" }, className: "saved" });
}
exports.render_saving_animations_Recipe = render_saving_animations_Recipe;
class RecipeComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.thread = null;
        this.state = { update_count: 0, add_step_Meal: "closed", dirty_Meal: Immutable.Map(), Meal: "loading", add_step_PreparationTime: "closed", dirty_PreparationTime: Immutable.Map(), PreparationTime: "loading", add_step_User: "closed", create_step_User: "none", dirty_User: Immutable.Map(), User: "loading", add_step_Rating: "closed", dirty_Rating: Immutable.Map(), Rating: "loading", add_step_RecommendationPage: "closed", dirty_RecommendationPage: Immutable.Map(), RecommendationPage: "loading" };
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
            load_relations_Recipe(this.get_self(), new_props.current_User);
        }
    }
    componentWillMount() {
        if (this.props.size == "breadcrumb")
            return;
        if (this.props.size != "preview") {
            load_relations_Recipe(this.get_self(), this.props.current_User);
        }
        this.thread = setInterval(() => {
            if (this.state.dirty_Meal.count() > 0) {
                let first = this.state.dirty_Meal.first();
                this.setState(Object.assign({}, this.state, { dirty_Meal: this.state.dirty_Meal.remove(first.Id) }), () => Api.update_Meal(first));
            }
            else if (this.state.dirty_PreparationTime.count() > 0) {
                let first = this.state.dirty_PreparationTime.first();
                this.setState(Object.assign({}, this.state, { dirty_PreparationTime: this.state.dirty_PreparationTime.remove(first.Id) }), () => Api.update_PreparationTime(first));
            }
            else if (this.state.dirty_User.count() > 0) {
                let first = this.state.dirty_User.first();
                this.setState(Object.assign({}, this.state, { dirty_User: this.state.dirty_User.remove(first.Id) }), () => Api.update_User(first));
            }
            else if (this.state.dirty_Rating.count() > 0) {
                let first = this.state.dirty_Rating.first();
                this.setState(Object.assign({}, this.state, { dirty_Rating: this.state.dirty_Rating.remove(first.Id) }), () => Api.update_Rating(first));
            }
            else if (this.state.dirty_RecommendationPage.count() > 0) {
                let first = this.state.dirty_RecommendationPage.first();
                this.setState(Object.assign({}, this.state, { dirty_RecommendationPage: this.state.dirty_RecommendationPage.remove(first.Id) }), () => Api.update_RecommendationPage(first));
            }
        }, 500);
    }
    componentWillUnmount() {
        clearInterval(this.thread);
    }
    render() {
        if (this.props.size == "breadcrumb") {
            return Permissions.can_view_Recipe(this.props.current_User) ?
                render_breadcrumb_Recipe(this.get_self())
                : null;
        }
        return React.createElement("div", { id: `Recipe_${this.props.entity.Id.toString()}_${this.state.update_count}`, className: `model recipe` },
            render_saving_animations_Recipe(this.get_self()),
            this.props.nesting_depth == 0 ? render_menu_Recipe(this.get_self()) : null,
            React.createElement("div", { className: "content" },
                this.props.nesting_depth == 0 && !!this.props.toggle_button ?
                    React.createElement("div", { className: "topbar" },
                        this.props.breadcrumbs(),
                        React.createElement("div", { className: "topbar__buttons" },
                            this.props.toggle_button ? this.props.toggle_button() : null,
                            this.props.authentication_menu()))
                    :
                        null,
                this.props.nesting_depth == 0 ? render_local_menu_Recipe(this.get_self()) : null,
                render_controls_Recipe(this.get_self()),
                render_content_Recipe(this.get_self())));
    }
}
exports.RecipeComponent = RecipeComponent;
exports.Recipe = (props) => React.createElement(RecipeComponent, Object.assign({}, props));
exports.Recipe_to_page = (id) => {
    let can_edit = Utils.any_of([Permissions.can_edit_Recipe, Permissions.can_edit_Meal_Recipe, Permissions.can_edit_PreparationTime_Recipe, Permissions.can_edit_User_Recipe, Permissions.can_edit_Recipe_Rating, Permissions.can_edit_RecommendationPage_Recipe, Permissions.can_edit_Meal, Permissions.can_edit_PreparationTime, Permissions.can_edit_User, Permissions.can_edit_Rating, Permissions.can_edit_RecommendationPage]);
    return Utils.scene_to_page(can_edit, exports.Recipe, Api.get_Recipe(id), Api.update_Recipe, "Recipe", "Recipe", `/Recipes/${id}`);
};
exports.Recipe_to = (id, target_element_id, current_User) => {
    Utils.render_page_manager(target_element_id, exports.Recipe_to_page(id), current_User);
};
//# sourceMappingURL=Recipe.js.map