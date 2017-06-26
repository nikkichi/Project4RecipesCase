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
const RecipeViews = require("./Recipe");
function Thirty_PreparationTime_Recipe_can_create(self) {
    let state = self.state();
    return state.Recipe == "loading" ? false : state.Recipe.CanCreate;
}
exports.Thirty_PreparationTime_Recipe_can_create = Thirty_PreparationTime_Recipe_can_create;
function Thirty_PreparationTime_Recipe_can_delete(self) {
    let state = self.state();
    return state.Recipe == "loading" ? false : state.Recipe.CanDelete;
}
exports.Thirty_PreparationTime_Recipe_can_delete = Thirty_PreparationTime_Recipe_can_delete;
function Thirty_PreparationTime_Recipe_page_index(self) {
    let state = self.state();
    return state.Recipe == "loading" ? 0 : state.Recipe.PageIndex;
}
exports.Thirty_PreparationTime_Recipe_page_index = Thirty_PreparationTime_Recipe_page_index;
function Thirty_PreparationTime_Recipe_page_size(self) {
    let state = self.state();
    return state.Recipe == "loading" ? 25 : state.Recipe.PageSize;
}
exports.Thirty_PreparationTime_Recipe_page_size = Thirty_PreparationTime_Recipe_page_size;
function Thirty_PreparationTime_Recipe_search_query(self) {
    let state = self.state();
    return state.Recipe == "loading" ? null : state.Recipe.SearchQuery;
}
exports.Thirty_PreparationTime_Recipe_search_query = Thirty_PreparationTime_Recipe_search_query;
function Thirty_PreparationTime_Recipe_num_pages(self) {
    let state = self.state();
    return state.Recipe == "loading" ? 1 : state.Recipe.NumPages;
}
exports.Thirty_PreparationTime_Recipe_num_pages = Thirty_PreparationTime_Recipe_num_pages;
function load_relation_Thirty_PreparationTime_Recipe(self, force_first_page, current_User, callback) {
    let state = self.state();
    let prelude = force_first_page && state.Recipe != "loading" ?
        (c) => state.Recipe != "loading" && self.setState(Object.assign({}, state, { Recipe: Object.assign({}, state.Recipe, { PageIndex: 0 }) }), c)
        :
            (c) => c();
    Permissions.can_view_Recipe(current_User) ?
        prelude(() => Api.get_PreparationTime_PreparationTime_Recipes(self.props.entity, Thirty_PreparationTime_Recipe_page_index(self), Thirty_PreparationTime_Recipe_page_size(self), Thirty_PreparationTime_Recipe_search_query(self)).then(Recipes => self.setState(Object.assign({}, self.state(), { update_count: self.state().update_count + 1, Recipe: Utils.raw_page_to_paginated_items((i, i_just_created) => {
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
exports.load_relation_Thirty_PreparationTime_Recipe = load_relation_Thirty_PreparationTime_Recipe;
function load_relations_Thirty(self, current_User, callback) {
    load_relation_Thirty_PreparationTime_Recipe(self, false, self.props.current_User, () => callback && callback());
}
exports.load_relations_Thirty = load_relations_Thirty;
function set_size_Thirty(self, new_size) {
    self.props.set_size(new_size, () => {
        if (new_size == "fullscreen")
            self.props.push(exports.Thirty_to_page(self.props.entity.Id));
    });
}
exports.set_size_Thirty = set_size_Thirty;
function render_Thirty_Description_editable_minimised(self) {
    if (!Permissions.can_edit_Thirty(self.props.current_User))
        return render_Thirty_Description_minimised(self);
    else
        return !Permissions.can_view_Thirty_Description(self.props.current_User) ? React.createElement("div", null) :
            React.createElement("div", { className: "model__attribute description" },
                React.createElement("label", { className: "attribute-label attribute-label-description" }, i18next.t(`Thirty:Description`, { context: self.props.inline ? "inline" : "" })),
                React.createElement("div", { className: "model__attribute-content" }, Components.String(self.props.is_editable && Permissions.can_edit_Thirty(self.props.current_User) && Permissions.can_edit_Thirty_Description(self.props.current_User), self.props.mode, () => self.props.entity.Description, v => self.props.set_entity(Object.assign({}, self.props.entity, { Description: v })))));
}
exports.render_Thirty_Description_editable_minimised = render_Thirty_Description_editable_minimised;
function render_Thirty_Description_editable_maximised(self) {
    if (!Permissions.can_edit_Thirty(self.props.current_User))
        return render_Thirty_Description_maximised(self);
    else
        return !Permissions.can_view_Thirty_Description(self.props.current_User) ? React.createElement("div", null) :
            React.createElement("div", { className: "model__attribute description" },
                React.createElement("label", { className: "attribute-label attribute-label-description" }, i18next.t(`Thirty:Description`, { context: self.props.inline ? "inline" : "" })),
                React.createElement("div", { className: "model__attribute-content" }, Components.String(self.props.is_editable && Permissions.can_edit_Thirty(self.props.current_User) && Permissions.can_edit_Thirty_Description(self.props.current_User), self.props.mode, () => self.props.entity.Description, v => self.props.set_entity(Object.assign({}, self.props.entity, { Description: v })))));
}
exports.render_Thirty_Description_editable_maximised = render_Thirty_Description_editable_maximised;
function render_editable_attributes_minimised_Thirty(self) {
    let attributes = (React.createElement("div", null, render_Thirty_Description_editable_minimised(self)));
    return attributes;
}
exports.render_editable_attributes_minimised_Thirty = render_editable_attributes_minimised_Thirty;
function render_editable_attributes_maximised_Thirty(self) {
    let state = self.state();
    let attributes = (React.createElement("div", null, render_Thirty_Description_editable_maximised(self)));
    return attributes;
}
exports.render_editable_attributes_maximised_Thirty = render_editable_attributes_maximised_Thirty;
function render_breadcrumb_Thirty(self) {
    return React.createElement("div", { className: "breadcrumb-thirty" }, "Thirty");
}
exports.render_breadcrumb_Thirty = render_breadcrumb_Thirty;
function render_menu_Thirty(self) {
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
exports.render_menu_Thirty = render_menu_Thirty;
function render_local_menu_Thirty(self) {
    let state = self.state();
    return React.createElement("div", { className: "local-menu" },
        React.createElement("div", { className: "local_menu_entries" },
            React.createElement("div", { className: `local_menu_entry${self.props.shown_relation == "none" ? " local_menu_entry--active" : ""}` },
                React.createElement("a", { onClick: () => self.props.set_shown_relation("none") }, i18next.t('About this Thirty'))),
            !Permissions.can_view_Recipe(self.props.current_User) ? null :
                React.createElement("div", { key: "PreparationTime_Recipe", className: `local_menu_entry${self.props.shown_relation == "PreparationTime_Recipe" ? " local_menu_entry--active" : ""}` },
                    React.createElement("a", { onClick: () => load_relation_Thirty_PreparationTime_Recipe(self, false, self.props.current_User, () => self.props.set_shown_relation("PreparationTime_Recipe")) }, i18next.t('PreparationTime_Recipes')))));
}
exports.render_local_menu_Thirty = render_local_menu_Thirty;
function render_controls_Thirty(self) {
    return React.createElement("div", { className: "control" },
        self.props.allow_maximisation && self.props.set_size ? React.createElement("a", { className: `"thirty button button--toggle ${self.props.size != 'preview' ? 'button--toggle--open' : ''}`, onClick: () => {
                set_size_Thirty(self, self.props.size == "preview" ? "large" : "preview");
            } }) : null,
        self.props.allow_fullscreen && self.props.set_size ? React.createElement("a", { className: "thirty button button--fullscreen", onClick: () => set_size_Thirty(self, self.props.size == "fullscreen" ? "large" : "fullscreen") }) : null,
        Permissions.can_delete_Thirty(self.props.current_User) && self.props.size == "fullscreen" ? React.createElement("a", { className: "button button--delete", onClick: () => confirm(i18next.t('Are you sure?')) &&
                Api.delete_Thirty(self.props.entity).then(() => self.props.force_reload(() => self.props.pop())) }) : null,
        self.props.size == "fullscreen" && self.props.pages_count > 0 ? React.createElement("a", { className: "thirty button button--close", onClick: () => self.props.pop() }) : null,
        self.props.unlink && self.props.mode != "view" ?
            React.createElement("a", { className: "button button--unlink", onClick: () => self.props.unlink() })
            :
                null,
        self.props.delete && self.props.mode != "view" ?
            React.createElement("a", { className: "button button--delete", onClick: () => self.props.delete() })
            :
                null);
}
exports.render_controls_Thirty = render_controls_Thirty;
function render_content_Thirty(self) {
    let actions = [
        self.props.allow_maximisation && self.props.set_size && self.props.size == "preview" ?
            () => set_size_Thirty(self, self.props.size == "preview" ? "large" : "preview")
            :
                null, self.props.allow_fullscreen && self.props.set_size && self.props.size == "preview" ?
            () => set_size_Thirty(self, self.props.size == "fullscreen" ? "large" : "fullscreen")
            :
                null,
    ].filter(a => a != null);
    let content = Permissions.can_view_Thirty(self.props.current_User) ?
        self.props.size == "preview" ?
            render_preview_Thirty(self)
            : self.props.size == "large" ?
                render_large_Thirty(self)
                : self.props.size == "fullscreen" ?
                    render_large_Thirty(self)
                    : "Error: unauthorised access to entity."
        : "Error: unauthorised access to entity.";
    if (self.props.mode == "view" && actions.length == 1 && !false)
        return React.createElement("a", { onClick: () => actions[0]() },
            React.createElement("div", { className: `${self.props.inline != undefined && self.props.inline ? "" : "model-content"} ${self.props.size == 'preview' ? 'model-content--preview' : ''}` }, content));
    else
        return React.createElement("div", { className: `${self.props.inline != undefined && self.props.inline ? "" : "model-content"} ${self.props.size == 'preview' ? 'model-content--preview' : ''}` }, content);
}
exports.render_content_Thirty = render_content_Thirty;
function render_Thirty_Description_minimised(self) {
    return !Permissions.can_view_Thirty_Description(self.props.current_User) ? null : React.createElement("div", { className: "model__attribute description" },
        React.createElement("label", { className: "attribute-label attribute-label-description" }, i18next.t(`Thirty:Description`, { context: self.props.inline ? "inline" : "" })),
        React.createElement("div", { className: "model__attribute-content" }, Components.String(self.props.is_editable && Permissions.can_edit_Thirty(self.props.current_User) && Permissions.can_edit_Thirty_Description(self.props.current_User), self.props.mode, () => self.props.entity.Description, v => self.props.set_entity(Object.assign({}, self.props.entity, { Description: v })))));
}
exports.render_Thirty_Description_minimised = render_Thirty_Description_minimised;
function render_Thirty_Description_maximised(self) {
    return !Permissions.can_view_Thirty_Description(self.props.current_User) ? null : React.createElement("div", { className: "model__attribute description" },
        React.createElement("label", { className: "attribute-label attribute-label-description" }, i18next.t(`Thirty:Description`, { context: self.props.inline ? "inline" : "" })),
        React.createElement("div", { className: "model__attribute-content" }, Components.String(self.props.is_editable && Permissions.can_edit_Thirty(self.props.current_User) && Permissions.can_edit_Thirty_Description(self.props.current_User), self.props.mode, () => self.props.entity.Description, v => self.props.set_entity(Object.assign({}, self.props.entity, { Description: v })))));
}
exports.render_Thirty_Description_maximised = render_Thirty_Description_maximised;
function render_preview_Thirty(self) {
    let attributes = null;
    if (self.props.mode == "view" || !Permissions.can_edit_Thirty(self.props.current_User))
        attributes = (React.createElement("div", { className: "model__attributes" }, render_Thirty_Description_minimised(self)));
    else
        attributes = render_editable_attributes_minimised_Thirty(self);
    return (React.createElement("div", { className: "block" }, attributes));
}
exports.render_preview_Thirty = render_preview_Thirty;
function render_large_Thirty(self) {
    let state = self.state();
    let attributes = null;
    if (self.props.mode == "view" || !Permissions.can_edit_Thirty(self.props.current_User))
        attributes = (React.createElement("div", { className: "model__attributes" }, render_Thirty_Description_maximised(self)));
    else
        attributes = render_editable_attributes_maximised_Thirty(self);
    return (React.createElement("div", { className: "block" },
        self.props.nesting_depth == 0 && self.props.shown_relation != "all" && self.props.shown_relation != "none" ? null : attributes,
        render_relations_Thirty(self)));
}
exports.render_large_Thirty = render_large_Thirty;
function render_Thirty_PreparationTime_Recipe(self, context) {
    if ((context == "default" && self.props.shown_relation != "all" && self.props.shown_relation != "PreparationTime_Recipe") || !Permissions.can_view_Recipe(self.props.current_User))
        return null;
    let state = self.state();
    return React.createElement("div", null, List.render_relation("thirty_preparationtime_recipe", "PreparationTime", "Recipe", "Recipes", self.props.nesting_depth > 0, false, false, false)(state.Recipe != "loading" ?
        state.Recipe.IdsInServerOrder.map(id => state.Recipe != "loading" && state.Recipe.Items.get(id)) :
        state.Recipe, Thirty_PreparationTime_Recipe_page_index(self), Thirty_PreparationTime_Recipe_num_pages(self), new_page_index => {
        let state = self.state();
        state.Recipe != "loading" &&
            self.setState(Object.assign({}, self.state(), { update_count: self.state().update_count + 1, Recipe: Object.assign({}, state.Recipe, { PageIndex: new_page_index }) }), () => load_relation_Thirty_PreparationTime_Recipe(self, false, self.props.current_User));
    }, (i, _) => {
        let i_id = i.element.Id;
        let state = self.state();
        return React.createElement("div", { key: i_id, className: `model-nested__item ${i.size != "preview" ? "model-nested__item--open" : ""}
                        ${state.Recipe != "loading" && state.Recipe.JustCreated.has(i_id) && state.Recipe.JustCreated.get(i_id) ? "newly-created" : ""}` },
            React.createElement("div", { key: i_id }, RecipeViews.Recipe(Object.assign({}, self.props, { entity: i.element, inline: false, nesting_depth: self.props.nesting_depth + 1, size: i.size, allow_maximisation: true, allow_fullscreen: true, mode: self.props.mode == "edit" && (Permissions.can_edit_PreparationTime_Recipe(self.props.current_User)
                    || Permissions.can_create_PreparationTime_Recipe(self.props.current_User)
                    || Permissions.can_delete_PreparationTime_Recipe(self.props.current_User)) ?
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
                }, delete: undefined, unlink: !Permissions.can_delete_PreparationTime_Recipe(self.props.current_User) ?
                    null
                    :
                        () => confirm(i18next.t('Are you sure?')) && Api.unlink_PreparationTime_PreparationTime_Recipes(self.props.entity, i.element).then(() => load_relation_Thirty_PreparationTime_Recipe(self, false, self.props.current_User)) }))));
    }, () => React.createElement("div", null,
        Permissions.can_create_Recipe(self.props.current_User) && Permissions.can_create_PreparationTime_Recipe(self.props.current_User) && Thirty_PreparationTime_Recipe_can_create(self) ? render_new_Thirty_PreparationTime_Recipe(self) : null,
        Permissions.can_create_PreparationTime_Recipe(self.props.current_User) ? render_add_existing_Thirty_PreparationTime_Recipe(self) : null)));
}
exports.render_Thirty_PreparationTime_Recipe = render_Thirty_PreparationTime_Recipe;
function render_relations_Thirty(self) {
    return React.createElement("div", { className: "relations" }, render_Thirty_PreparationTime_Recipe(self, "default"));
}
exports.render_relations_Thirty = render_relations_Thirty;
function render_add_existing_Thirty_PreparationTime_Recipe(self) {
    let state = self.state();
    return self.props.mode == "edit" ?
        React.createElement("div", { className: "button__actions" }, state.add_step_Recipe != "open" ?
            React.createElement(Buttons.Add, { onClick: () => self.setState(Object.assign({}, self.state(), { add_step_Recipe: "open" })), target_name: "Recipe" })
            :
                React.createElement(List.AddToRelation, {
                    relation_name: "thirty_preparationtime_recipe",
                    source_name: "PreparationTime",
                    target_name: "Recipe",
                    target_plural: "Recipes",
                    page_size: 25,
                    render_target: (i, i_id) => React.createElement("div", { key: i_id, className: "group__item" },
                        React.createElement("a", { className: "group__button button button--existing", onClick: () => self.setState(Object.assign({}, self.state(), { add_step_Recipe: "saving" }), () => Api.link_PreparationTime_PreparationTime_Recipes(self.props.entity, i).then(() => self.setState(Object.assign({}, self.state(), { add_step_Recipe: "closed" }), () => load_relation_Thirty_PreparationTime_Recipe(self, false, self.props.current_User)))) }, "Add existing"),
                        React.createElement("div", { className: "group__title", disabled: true }, RecipeViews.Recipe(Object.assign({}, self.props, { entity: i, nesting_depth: self.props.nesting_depth + 1, size: "preview", mode: "view", is_editable: false, nested_entity_names: self.props.nested_entity_names.push("Recipe"), set_size: undefined, toggle_button: undefined, set_mode: undefined, set_entity: (new_entity, callback) => { }, unlink: undefined, delete: undefined })))),
                    cancel: () => self.setState(Object.assign({}, self.state(), { add_step_Recipe: "closed" })),
                    get_items: [
                        { name: "Recipe", get: (i, s) => __awaiter(this, void 0, void 0, function* () { return Api.get_unlinked_PreparationTime_PreparationTime_Recipes(self.props.entity, i, s); }) },
                    ]
                }))
        :
            null;
}
exports.render_add_existing_Thirty_PreparationTime_Recipe = render_add_existing_Thirty_PreparationTime_Recipe;
function render_new_Thirty_PreparationTime_Recipe(self) {
    let state = self.state();
    return self.props.mode == "edit" ?
        React.createElement("div", { className: "button__actions" },
            React.createElement("div", { className: "new-recipe" },
                React.createElement("button", { className: "new-recipe button button--new", onClick: () => Api.create_linked_PreparationTime_PreparationTime_Recipes_Recipe(self.props.entity).then(e => {
                        e.length > 0 &&
                            Api.update_Recipe(Object.assign({}, e[0], { Name: "", Ingredients: "", Description: "", Picture: "" })).then(() => load_relation_Thirty_PreparationTime_Recipe(self, true, self.props.current_User, () => self.setState(Object.assign({}, self.state(), { add_step_Recipe: "closed" }))));
                    }) }, i18next.t('Create new Recipe'))))
        :
            null;
}
exports.render_new_Thirty_PreparationTime_Recipe = render_new_Thirty_PreparationTime_Recipe;
function render_saving_animations_Thirty(self) {
    return self.state().dirty_Recipe.count() > 0 ?
        React.createElement("div", { style: { position: "fixed", zIndex: 10000, top: 0, left: 0, width: "20px", height: "20px", backgroundColor: "red" }, className: "saving" })
        : React.createElement("div", { style: { position: "fixed", zIndex: 10000, top: 0, left: 0, width: "20px", height: "20px", backgroundColor: "cornflowerblue" }, className: "saved" });
}
exports.render_saving_animations_Thirty = render_saving_animations_Thirty;
class ThirtyComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.thread = null;
        this.state = { update_count: 0, add_step_Recipe: "closed", dirty_Recipe: Immutable.Map(), Recipe: "loading" };
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
            load_relations_Thirty(this.get_self(), new_props.current_User);
        }
    }
    componentWillMount() {
        if (this.props.size == "breadcrumb")
            return;
        if (this.props.size != "preview") {
            load_relations_Thirty(this.get_self(), this.props.current_User);
        }
        this.thread = setInterval(() => {
            if (this.state.dirty_Recipe.count() > 0) {
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
            return Permissions.can_view_Thirty(this.props.current_User) ?
                render_breadcrumb_Thirty(this.get_self())
                : null;
        }
        return React.createElement("div", { id: `Thirty_${this.props.entity.Id.toString()}_${this.state.update_count}`, className: `model thirty` },
            render_saving_animations_Thirty(this.get_self()),
            this.props.nesting_depth == 0 ? render_menu_Thirty(this.get_self()) : null,
            React.createElement("div", { className: "content" },
                this.props.nesting_depth == 0 && !!this.props.toggle_button ?
                    React.createElement("div", { className: "topbar" },
                        this.props.breadcrumbs(),
                        React.createElement("div", { className: "topbar__buttons" },
                            this.props.toggle_button ? this.props.toggle_button() : null,
                            this.props.authentication_menu()))
                    :
                        null,
                this.props.nesting_depth == 0 ? render_local_menu_Thirty(this.get_self()) : null,
                render_controls_Thirty(this.get_self()),
                render_content_Thirty(this.get_self())));
    }
}
exports.ThirtyComponent = ThirtyComponent;
exports.Thirty = (props) => React.createElement(ThirtyComponent, Object.assign({}, props));
exports.Thirty_to_page = (id) => {
    let can_edit = Utils.any_of([Permissions.can_edit_Thirty, Permissions.can_edit_PreparationTime_Recipe, Permissions.can_edit_Recipe]);
    return Utils.scene_to_page(can_edit, exports.Thirty, Api.get_Thirty(id), Api.update_Thirty, "Thirty", "Thirty", `/Thirties/${id}`);
};
exports.Thirty_to = (id, target_element_id, current_User) => {
    Utils.render_page_manager(target_element_id, exports.Thirty_to_page(id), current_User);
};
//# sourceMappingURL=Thirty.js.map