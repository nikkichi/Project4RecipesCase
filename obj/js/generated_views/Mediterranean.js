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
const MealViews = require("./Meal");
function Mediterranean_Cuisine_Meal_can_create(self) {
    let state = self.state();
    return state.Meal == "loading" ? false : state.Meal.CanCreate;
}
exports.Mediterranean_Cuisine_Meal_can_create = Mediterranean_Cuisine_Meal_can_create;
function Mediterranean_Cuisine_Meal_can_delete(self) {
    let state = self.state();
    return state.Meal == "loading" ? false : state.Meal.CanDelete;
}
exports.Mediterranean_Cuisine_Meal_can_delete = Mediterranean_Cuisine_Meal_can_delete;
function Mediterranean_Cuisine_Meal_page_index(self) {
    let state = self.state();
    return state.Meal == "loading" ? 0 : state.Meal.PageIndex;
}
exports.Mediterranean_Cuisine_Meal_page_index = Mediterranean_Cuisine_Meal_page_index;
function Mediterranean_Cuisine_Meal_page_size(self) {
    let state = self.state();
    return state.Meal == "loading" ? 25 : state.Meal.PageSize;
}
exports.Mediterranean_Cuisine_Meal_page_size = Mediterranean_Cuisine_Meal_page_size;
function Mediterranean_Cuisine_Meal_search_query(self) {
    let state = self.state();
    return state.Meal == "loading" ? null : state.Meal.SearchQuery;
}
exports.Mediterranean_Cuisine_Meal_search_query = Mediterranean_Cuisine_Meal_search_query;
function Mediterranean_Cuisine_Meal_num_pages(self) {
    let state = self.state();
    return state.Meal == "loading" ? 1 : state.Meal.NumPages;
}
exports.Mediterranean_Cuisine_Meal_num_pages = Mediterranean_Cuisine_Meal_num_pages;
function load_relation_Mediterranean_Cuisine_Meal(self, force_first_page, current_User, callback) {
    let state = self.state();
    let prelude = force_first_page && state.Meal != "loading" ?
        (c) => state.Meal != "loading" && self.setState(Object.assign({}, state, { Meal: Object.assign({}, state.Meal, { PageIndex: 0 }) }), c)
        :
            (c) => c();
    Permissions.can_view_Meal(current_User) ?
        prelude(() => Api.get_Cuisine_Cuisine_Meals(self.props.entity, Mediterranean_Cuisine_Meal_page_index(self), Mediterranean_Cuisine_Meal_page_size(self), Mediterranean_Cuisine_Meal_search_query(self)).then(Meals => self.setState(Object.assign({}, self.state(), { update_count: self.state().update_count + 1, Meal: Utils.raw_page_to_paginated_items((i, i_just_created) => {
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
exports.load_relation_Mediterranean_Cuisine_Meal = load_relation_Mediterranean_Cuisine_Meal;
function load_relations_Mediterranean(self, current_User, callback) {
    load_relation_Mediterranean_Cuisine_Meal(self, false, self.props.current_User, () => callback && callback());
}
exports.load_relations_Mediterranean = load_relations_Mediterranean;
function set_size_Mediterranean(self, new_size) {
    self.props.set_size(new_size, () => {
        if (new_size == "fullscreen")
            self.props.push(exports.Mediterranean_to_page(self.props.entity.Id));
    });
}
exports.set_size_Mediterranean = set_size_Mediterranean;
function render_Mediterranean_Description_editable_minimised(self) {
    if (!Permissions.can_edit_Mediterranean(self.props.current_User))
        return render_Mediterranean_Description_minimised(self);
    else
        return !Permissions.can_view_Mediterranean_Description(self.props.current_User) ? React.createElement("div", null) :
            React.createElement("div", { className: "model__attribute description" },
                React.createElement("label", { className: "attribute-label attribute-label-description" }, i18next.t(`Mediterranean:Description`, { context: self.props.inline ? "inline" : "" })),
                React.createElement("div", { className: "model__attribute-content" }, Components.String(self.props.is_editable && Permissions.can_edit_Mediterranean(self.props.current_User) && Permissions.can_edit_Mediterranean_Description(self.props.current_User), self.props.mode, () => self.props.entity.Description, v => self.props.set_entity(Object.assign({}, self.props.entity, { Description: v })))));
}
exports.render_Mediterranean_Description_editable_minimised = render_Mediterranean_Description_editable_minimised;
function render_Mediterranean_Description_editable_maximised(self) {
    if (!Permissions.can_edit_Mediterranean(self.props.current_User))
        return render_Mediterranean_Description_maximised(self);
    else
        return !Permissions.can_view_Mediterranean_Description(self.props.current_User) ? React.createElement("div", null) :
            React.createElement("div", { className: "model__attribute description" },
                React.createElement("label", { className: "attribute-label attribute-label-description" }, i18next.t(`Mediterranean:Description`, { context: self.props.inline ? "inline" : "" })),
                React.createElement("div", { className: "model__attribute-content" }, Components.String(self.props.is_editable && Permissions.can_edit_Mediterranean(self.props.current_User) && Permissions.can_edit_Mediterranean_Description(self.props.current_User), self.props.mode, () => self.props.entity.Description, v => self.props.set_entity(Object.assign({}, self.props.entity, { Description: v })))));
}
exports.render_Mediterranean_Description_editable_maximised = render_Mediterranean_Description_editable_maximised;
function render_editable_attributes_minimised_Mediterranean(self) {
    let attributes = (React.createElement("div", null, render_Mediterranean_Description_editable_minimised(self)));
    return attributes;
}
exports.render_editable_attributes_minimised_Mediterranean = render_editable_attributes_minimised_Mediterranean;
function render_editable_attributes_maximised_Mediterranean(self) {
    let state = self.state();
    let attributes = (React.createElement("div", null, render_Mediterranean_Description_editable_maximised(self)));
    return attributes;
}
exports.render_editable_attributes_maximised_Mediterranean = render_editable_attributes_maximised_Mediterranean;
function render_breadcrumb_Mediterranean(self) {
    return React.createElement("div", { className: "breadcrumb-mediterranean" }, "Mediterranean");
}
exports.render_breadcrumb_Mediterranean = render_breadcrumb_Mediterranean;
function render_menu_Mediterranean(self) {
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
exports.render_menu_Mediterranean = render_menu_Mediterranean;
function render_local_menu_Mediterranean(self) {
    let state = self.state();
    return React.createElement("div", { className: "local-menu" },
        React.createElement("div", { className: "local_menu_entries" },
            React.createElement("div", { className: `local_menu_entry${self.props.shown_relation == "none" ? " local_menu_entry--active" : ""}` },
                React.createElement("a", { onClick: () => self.props.set_shown_relation("none") }, i18next.t('About this Mediterranean'))),
            !Permissions.can_view_Meal(self.props.current_User) ? null :
                React.createElement("div", { key: "Cuisine_Meal", className: `local_menu_entry${self.props.shown_relation == "Cuisine_Meal" ? " local_menu_entry--active" : ""}` },
                    React.createElement("a", { onClick: () => load_relation_Mediterranean_Cuisine_Meal(self, false, self.props.current_User, () => self.props.set_shown_relation("Cuisine_Meal")) }, i18next.t('Cuisine_Meals')))));
}
exports.render_local_menu_Mediterranean = render_local_menu_Mediterranean;
function render_controls_Mediterranean(self) {
    return React.createElement("div", { className: "control" },
        self.props.allow_maximisation && self.props.set_size ? React.createElement("a", { className: `"mediterranean button button--toggle ${self.props.size != 'preview' ? 'button--toggle--open' : ''}`, onClick: () => {
                set_size_Mediterranean(self, self.props.size == "preview" ? "large" : "preview");
            } }) : null,
        self.props.allow_fullscreen && self.props.set_size ? React.createElement("a", { className: "mediterranean button button--fullscreen", onClick: () => set_size_Mediterranean(self, self.props.size == "fullscreen" ? "large" : "fullscreen") }) : null,
        Permissions.can_delete_Mediterranean(self.props.current_User) && self.props.size == "fullscreen" ? React.createElement("a", { className: "button button--delete", onClick: () => confirm(i18next.t('Are you sure?')) &&
                Api.delete_Mediterranean(self.props.entity).then(() => self.props.force_reload(() => self.props.pop())) }) : null,
        self.props.size == "fullscreen" && self.props.pages_count > 0 ? React.createElement("a", { className: "mediterranean button button--close", onClick: () => self.props.pop() }) : null,
        self.props.unlink && self.props.mode != "view" ?
            React.createElement("a", { className: "button button--unlink", onClick: () => self.props.unlink() })
            :
                null,
        self.props.delete && self.props.mode != "view" ?
            React.createElement("a", { className: "button button--delete", onClick: () => self.props.delete() })
            :
                null);
}
exports.render_controls_Mediterranean = render_controls_Mediterranean;
function render_content_Mediterranean(self) {
    let actions = [
        self.props.allow_maximisation && self.props.set_size && self.props.size == "preview" ?
            () => set_size_Mediterranean(self, self.props.size == "preview" ? "large" : "preview")
            :
                null, self.props.allow_fullscreen && self.props.set_size && self.props.size == "preview" ?
            () => set_size_Mediterranean(self, self.props.size == "fullscreen" ? "large" : "fullscreen")
            :
                null,
    ].filter(a => a != null);
    let content = Permissions.can_view_Mediterranean(self.props.current_User) ?
        self.props.size == "preview" ?
            render_preview_Mediterranean(self)
            : self.props.size == "large" ?
                render_large_Mediterranean(self)
                : self.props.size == "fullscreen" ?
                    render_large_Mediterranean(self)
                    : "Error: unauthorised access to entity."
        : "Error: unauthorised access to entity.";
    if (self.props.mode == "view" && actions.length == 1 && !false)
        return React.createElement("a", { onClick: () => actions[0]() },
            React.createElement("div", { className: `${self.props.inline != undefined && self.props.inline ? "" : "model-content"} ${self.props.size == 'preview' ? 'model-content--preview' : ''}` }, content));
    else
        return React.createElement("div", { className: `${self.props.inline != undefined && self.props.inline ? "" : "model-content"} ${self.props.size == 'preview' ? 'model-content--preview' : ''}` }, content);
}
exports.render_content_Mediterranean = render_content_Mediterranean;
function render_Mediterranean_Description_minimised(self) {
    return !Permissions.can_view_Mediterranean_Description(self.props.current_User) ? null : React.createElement("div", { className: "model__attribute description" },
        React.createElement("label", { className: "attribute-label attribute-label-description" }, i18next.t(`Mediterranean:Description`, { context: self.props.inline ? "inline" : "" })),
        React.createElement("div", { className: "model__attribute-content" }, Components.String(self.props.is_editable && Permissions.can_edit_Mediterranean(self.props.current_User) && Permissions.can_edit_Mediterranean_Description(self.props.current_User), self.props.mode, () => self.props.entity.Description, v => self.props.set_entity(Object.assign({}, self.props.entity, { Description: v })))));
}
exports.render_Mediterranean_Description_minimised = render_Mediterranean_Description_minimised;
function render_Mediterranean_Description_maximised(self) {
    return !Permissions.can_view_Mediterranean_Description(self.props.current_User) ? null : React.createElement("div", { className: "model__attribute description" },
        React.createElement("label", { className: "attribute-label attribute-label-description" }, i18next.t(`Mediterranean:Description`, { context: self.props.inline ? "inline" : "" })),
        React.createElement("div", { className: "model__attribute-content" }, Components.String(self.props.is_editable && Permissions.can_edit_Mediterranean(self.props.current_User) && Permissions.can_edit_Mediterranean_Description(self.props.current_User), self.props.mode, () => self.props.entity.Description, v => self.props.set_entity(Object.assign({}, self.props.entity, { Description: v })))));
}
exports.render_Mediterranean_Description_maximised = render_Mediterranean_Description_maximised;
function render_preview_Mediterranean(self) {
    let attributes = null;
    if (self.props.mode == "view" || !Permissions.can_edit_Mediterranean(self.props.current_User))
        attributes = (React.createElement("div", { className: "model__attributes" }, render_Mediterranean_Description_minimised(self)));
    else
        attributes = render_editable_attributes_minimised_Mediterranean(self);
    return (React.createElement("div", { className: "block" }, attributes));
}
exports.render_preview_Mediterranean = render_preview_Mediterranean;
function render_large_Mediterranean(self) {
    let state = self.state();
    let attributes = null;
    if (self.props.mode == "view" || !Permissions.can_edit_Mediterranean(self.props.current_User))
        attributes = (React.createElement("div", { className: "model__attributes" }, render_Mediterranean_Description_maximised(self)));
    else
        attributes = render_editable_attributes_maximised_Mediterranean(self);
    return (React.createElement("div", { className: "block" },
        self.props.nesting_depth == 0 && self.props.shown_relation != "all" && self.props.shown_relation != "none" ? null : attributes,
        render_relations_Mediterranean(self)));
}
exports.render_large_Mediterranean = render_large_Mediterranean;
function render_Mediterranean_Cuisine_Meal(self, context) {
    if ((context == "default" && self.props.shown_relation != "all" && self.props.shown_relation != "Cuisine_Meal") || !Permissions.can_view_Meal(self.props.current_User))
        return null;
    let state = self.state();
    return React.createElement("div", null, List.render_relation("mediterranean_cuisine_meal", "Cuisine", "Meal", "Meals", self.props.nesting_depth > 0, false, false, false)(state.Meal != "loading" ?
        state.Meal.IdsInServerOrder.map(id => state.Meal != "loading" && state.Meal.Items.get(id)) :
        state.Meal, Mediterranean_Cuisine_Meal_page_index(self), Mediterranean_Cuisine_Meal_num_pages(self), new_page_index => {
        let state = self.state();
        state.Meal != "loading" &&
            self.setState(Object.assign({}, self.state(), { update_count: self.state().update_count + 1, Meal: Object.assign({}, state.Meal, { PageIndex: new_page_index }) }), () => load_relation_Mediterranean_Cuisine_Meal(self, false, self.props.current_User));
    }, (i, _) => {
        let i_id = i.element.Id;
        let state = self.state();
        return React.createElement("div", { key: i_id, className: `model-nested__item ${i.size != "preview" ? "model-nested__item--open" : ""}
                        ${state.Meal != "loading" && state.Meal.JustCreated.has(i_id) && state.Meal.JustCreated.get(i_id) ? "newly-created" : ""}` },
            React.createElement("div", { key: i_id }, MealViews.Meal(Object.assign({}, self.props, { entity: i.element, inline: false, nesting_depth: self.props.nesting_depth + 1, size: i.size, allow_maximisation: true, allow_fullscreen: true, mode: self.props.mode == "edit" && (Permissions.can_edit_Cuisine_Meal(self.props.current_User)
                    || Permissions.can_create_Cuisine_Meal(self.props.current_User)
                    || Permissions.can_delete_Cuisine_Meal(self.props.current_User)) ?
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
                }, delete: undefined, unlink: !Permissions.can_delete_Cuisine_Meal(self.props.current_User) ?
                    null
                    :
                        () => confirm(i18next.t('Are you sure?')) && Api.unlink_Cuisine_Cuisine_Meals(self.props.entity, i.element).then(() => load_relation_Mediterranean_Cuisine_Meal(self, false, self.props.current_User)) }))));
    }, () => React.createElement("div", null,
        Permissions.can_create_Meal(self.props.current_User) && Permissions.can_create_Cuisine_Meal(self.props.current_User) && Mediterranean_Cuisine_Meal_can_create(self) ? render_new_Mediterranean_Cuisine_Meal(self) : null,
        Permissions.can_create_Cuisine_Meal(self.props.current_User) ? render_add_existing_Mediterranean_Cuisine_Meal(self) : null)));
}
exports.render_Mediterranean_Cuisine_Meal = render_Mediterranean_Cuisine_Meal;
function render_relations_Mediterranean(self) {
    return React.createElement("div", { className: "relations" }, render_Mediterranean_Cuisine_Meal(self, "default"));
}
exports.render_relations_Mediterranean = render_relations_Mediterranean;
function render_add_existing_Mediterranean_Cuisine_Meal(self) {
    let state = self.state();
    return self.props.mode == "edit" ?
        React.createElement("div", { className: "button__actions" }, state.add_step_Meal != "open" ?
            React.createElement(Buttons.Add, { onClick: () => self.setState(Object.assign({}, self.state(), { add_step_Meal: "open" })), target_name: "Meal" })
            :
                React.createElement(List.AddToRelation, {
                    relation_name: "mediterranean_cuisine_meal",
                    source_name: "Cuisine",
                    target_name: "Meal",
                    target_plural: "Meals",
                    page_size: 25,
                    render_target: (i, i_id) => React.createElement("div", { key: i_id, className: "group__item" },
                        React.createElement("a", { className: "group__button button button--existing", onClick: () => self.setState(Object.assign({}, self.state(), { add_step_Meal: "saving" }), () => Api.link_Cuisine_Cuisine_Meals(self.props.entity, i).then(() => self.setState(Object.assign({}, self.state(), { add_step_Meal: "closed" }), () => load_relation_Mediterranean_Cuisine_Meal(self, false, self.props.current_User)))) }, "Add existing"),
                        React.createElement("div", { className: "group__title", disabled: true }, MealViews.Meal(Object.assign({}, self.props, { entity: i, nesting_depth: self.props.nesting_depth + 1, size: "preview", mode: "view", is_editable: false, nested_entity_names: self.props.nested_entity_names.push("Meal"), set_size: undefined, toggle_button: undefined, set_mode: undefined, set_entity: (new_entity, callback) => { }, unlink: undefined, delete: undefined })))),
                    cancel: () => self.setState(Object.assign({}, self.state(), { add_step_Meal: "closed" })),
                    get_items: [
                        { name: "Lunch", get: (i, s) => __awaiter(this, void 0, void 0, function* () { return Api.get_unlinked_Cuisine_Cuisine_Meals_Lunch(self.props.entity, i, s); }) },
                        { name: "Brunch", get: (i, s) => __awaiter(this, void 0, void 0, function* () { return Api.get_unlinked_Cuisine_Cuisine_Meals_Brunch(self.props.entity, i, s); }) },
                        { name: "Dinner", get: (i, s) => __awaiter(this, void 0, void 0, function* () { return Api.get_unlinked_Cuisine_Cuisine_Meals_Dinner(self.props.entity, i, s); }) },
                        { name: "Breakfast", get: (i, s) => __awaiter(this, void 0, void 0, function* () { return Api.get_unlinked_Cuisine_Cuisine_Meals_Breakfast(self.props.entity, i, s); }) }
                    ]
                }))
        :
            null;
}
exports.render_add_existing_Mediterranean_Cuisine_Meal = render_add_existing_Mediterranean_Cuisine_Meal;
function render_new_Mediterranean_Cuisine_Meal(self) {
    let state = self.state();
    return self.props.mode == "edit" ?
        React.createElement("div", { className: "button__actions" },
            React.createElement(Buttons.Create, { target_name: "Meal", onClick: () => self.setState(Object.assign({}, self.state(), { add_step_Meal: "creating" })) }),
            state.add_step_Meal != "creating" ?
                null
                :
                    React.createElement("div", { className: "overlay__item overlay__item--new" },
                        React.createElement("div", { className: "new-lunch" },
                            React.createElement("button", { className: "new-lunch button button--new", onClick: () => Api.create_linked_Cuisine_Cuisine_Meals_Lunch(self.props.entity).then(e => {
                                    e.length > 0 &&
                                        Api.update_Lunch(Object.assign({}, e[0], { Kind: "Lunch", Description: "" })).then(() => load_relation_Mediterranean_Cuisine_Meal(self, true, self.props.current_User, () => self.setState(Object.assign({}, self.state(), { add_step_Meal: "closed" }))));
                                }) }, i18next.t('Create new Lunch'))),
                        React.createElement("div", { className: "new-brunch" },
                            React.createElement("button", { className: "new-brunch button button--new", onClick: () => Api.create_linked_Cuisine_Cuisine_Meals_Brunch(self.props.entity).then(e => {
                                    e.length > 0 &&
                                        Api.update_Brunch(Object.assign({}, e[0], { Kind: "Brunch", Description: "" })).then(() => load_relation_Mediterranean_Cuisine_Meal(self, true, self.props.current_User, () => self.setState(Object.assign({}, self.state(), { add_step_Meal: "closed" }))));
                                }) }, i18next.t('Create new Brunch'))),
                        React.createElement("div", { className: "new-dinner" },
                            React.createElement("button", { className: "new-dinner button button--new", onClick: () => Api.create_linked_Cuisine_Cuisine_Meals_Dinner(self.props.entity).then(e => {
                                    e.length > 0 &&
                                        Api.update_Dinner(Object.assign({}, e[0], { Kind: "Dinner", Description: "" })).then(() => load_relation_Mediterranean_Cuisine_Meal(self, true, self.props.current_User, () => self.setState(Object.assign({}, self.state(), { add_step_Meal: "closed" }))));
                                }) }, i18next.t('Create new Dinner'))),
                        React.createElement("div", { className: "new-breakfast" },
                            React.createElement("button", { className: "new-breakfast button button--new", onClick: () => Api.create_linked_Cuisine_Cuisine_Meals_Breakfast(self.props.entity).then(e => {
                                    e.length > 0 &&
                                        Api.update_Breakfast(Object.assign({}, e[0], { Kind: "Breakfast", Description: "" })).then(() => load_relation_Mediterranean_Cuisine_Meal(self, true, self.props.current_User, () => self.setState(Object.assign({}, self.state(), { add_step_Meal: "closed" }))));
                                }) }, i18next.t('Create new Breakfast'))),
                        React.createElement(Buttons.Cancel, { onClick: () => self.setState(Object.assign({}, self.state(), { add_step_Meal: "closed" })) })))
        :
            null;
}
exports.render_new_Mediterranean_Cuisine_Meal = render_new_Mediterranean_Cuisine_Meal;
function render_saving_animations_Mediterranean(self) {
    return self.state().dirty_Meal.count() > 0 ?
        React.createElement("div", { style: { position: "fixed", zIndex: 10000, top: 0, left: 0, width: "20px", height: "20px", backgroundColor: "red" }, className: "saving" })
        : React.createElement("div", { style: { position: "fixed", zIndex: 10000, top: 0, left: 0, width: "20px", height: "20px", backgroundColor: "cornflowerblue" }, className: "saved" });
}
exports.render_saving_animations_Mediterranean = render_saving_animations_Mediterranean;
class MediterraneanComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.thread = null;
        this.state = { update_count: 0, add_step_Meal: "closed", dirty_Meal: Immutable.Map(), Meal: "loading" };
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
            load_relations_Mediterranean(this.get_self(), new_props.current_User);
        }
    }
    componentWillMount() {
        if (this.props.size == "breadcrumb")
            return;
        if (this.props.size != "preview") {
            load_relations_Mediterranean(this.get_self(), this.props.current_User);
        }
        this.thread = setInterval(() => {
            if (this.state.dirty_Meal.count() > 0) {
                let first = this.state.dirty_Meal.first();
                this.setState(Object.assign({}, this.state, { dirty_Meal: this.state.dirty_Meal.remove(first.Id) }), () => Api.update_Meal(first));
            }
        }, 500);
    }
    componentWillUnmount() {
        clearInterval(this.thread);
    }
    render() {
        if (this.props.size == "breadcrumb") {
            return Permissions.can_view_Mediterranean(this.props.current_User) ?
                render_breadcrumb_Mediterranean(this.get_self())
                : null;
        }
        return React.createElement("div", { id: `Mediterranean_${this.props.entity.Id.toString()}_${this.state.update_count}`, className: `model mediterranean` },
            render_saving_animations_Mediterranean(this.get_self()),
            this.props.nesting_depth == 0 ? render_menu_Mediterranean(this.get_self()) : null,
            React.createElement("div", { className: "content" },
                this.props.nesting_depth == 0 && !!this.props.toggle_button ?
                    React.createElement("div", { className: "topbar" },
                        this.props.breadcrumbs(),
                        React.createElement("div", { className: "topbar__buttons" },
                            this.props.toggle_button ? this.props.toggle_button() : null,
                            this.props.authentication_menu()))
                    :
                        null,
                this.props.nesting_depth == 0 ? render_local_menu_Mediterranean(this.get_self()) : null,
                render_controls_Mediterranean(this.get_self()),
                render_content_Mediterranean(this.get_self())));
    }
}
exports.MediterraneanComponent = MediterraneanComponent;
exports.Mediterranean = (props) => React.createElement(MediterraneanComponent, Object.assign({}, props));
exports.Mediterranean_to_page = (id) => {
    let can_edit = Utils.any_of([Permissions.can_edit_Mediterranean, Permissions.can_edit_Cuisine_Meal, Permissions.can_edit_Meal]);
    return Utils.scene_to_page(can_edit, exports.Mediterranean, Api.get_Mediterranean(id), Api.update_Mediterranean, "Mediterranean", "Mediterranean", `/Mediterraneans/${id}`);
};
exports.Mediterranean_to = (id, target_element_id, current_User) => {
    Utils.render_page_manager(target_element_id, exports.Mediterranean_to_page(id), current_User);
};
//# sourceMappingURL=Mediterranean.js.map