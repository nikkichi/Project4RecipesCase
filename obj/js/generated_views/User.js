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
const Moment = require("moment");
const FavouriteViews = require("./Favourite");
const BrowseViews = require("./Browse");
const HomepageViews = require("./Homepage");
const RecommendationViews = require("./Recommendation");
const RecipeViews = require("./Recipe");
const RecommendationPageViews = require("./RecommendationPage");
function User_User_Recipe_can_create(self) {
    let state = self.state();
    return state.Recipe == "loading" ? false : state.Recipe.CanCreate;
}
exports.User_User_Recipe_can_create = User_User_Recipe_can_create;
function User_User_RecommendationPage_can_create(self) {
    let state = self.state();
    return state.RecommendationPage == "loading" ? false : state.RecommendationPage.CanCreate;
}
exports.User_User_RecommendationPage_can_create = User_User_RecommendationPage_can_create;
function User_User_Recipe_can_delete(self) {
    let state = self.state();
    return state.Recipe == "loading" ? false : state.Recipe.CanDelete;
}
exports.User_User_Recipe_can_delete = User_User_Recipe_can_delete;
function User_User_RecommendationPage_can_delete(self) {
    let state = self.state();
    return state.RecommendationPage == "loading" ? false : state.RecommendationPage.CanDelete;
}
exports.User_User_RecommendationPage_can_delete = User_User_RecommendationPage_can_delete;
function User_User_Recipe_page_index(self) {
    let state = self.state();
    return state.Recipe == "loading" ? 0 : state.Recipe.PageIndex;
}
exports.User_User_Recipe_page_index = User_User_Recipe_page_index;
function User_User_RecommendationPage_page_index(self) {
    let state = self.state();
    return state.RecommendationPage == "loading" ? 0 : state.RecommendationPage.PageIndex;
}
exports.User_User_RecommendationPage_page_index = User_User_RecommendationPage_page_index;
function User_User_Recipe_page_size(self) {
    let state = self.state();
    return state.Recipe == "loading" ? 25 : state.Recipe.PageSize;
}
exports.User_User_Recipe_page_size = User_User_Recipe_page_size;
function User_User_RecommendationPage_page_size(self) {
    let state = self.state();
    return state.RecommendationPage == "loading" ? 25 : state.RecommendationPage.PageSize;
}
exports.User_User_RecommendationPage_page_size = User_User_RecommendationPage_page_size;
function User_User_Recipe_search_query(self) {
    let state = self.state();
    return state.Recipe == "loading" ? null : state.Recipe.SearchQuery;
}
exports.User_User_Recipe_search_query = User_User_Recipe_search_query;
function User_User_RecommendationPage_search_query(self) {
    let state = self.state();
    return state.RecommendationPage == "loading" ? null : state.RecommendationPage.SearchQuery;
}
exports.User_User_RecommendationPage_search_query = User_User_RecommendationPage_search_query;
function User_User_Recipe_num_pages(self) {
    let state = self.state();
    return state.Recipe == "loading" ? 1 : state.Recipe.NumPages;
}
exports.User_User_Recipe_num_pages = User_User_Recipe_num_pages;
function User_User_RecommendationPage_num_pages(self) {
    let state = self.state();
    return state.RecommendationPage == "loading" ? 1 : state.RecommendationPage.NumPages;
}
exports.User_User_RecommendationPage_num_pages = User_User_RecommendationPage_num_pages;
function load_relation_User_User_Recipe(self, force_first_page, current_User, callback) {
    let state = self.state();
    let prelude = force_first_page && state.Recipe != "loading" ?
        (c) => state.Recipe != "loading" && self.setState(Object.assign({}, state, { Recipe: Object.assign({}, state.Recipe, { PageIndex: 0 }) }), c)
        :
            (c) => c();
    Permissions.can_view_Recipe(current_User) ?
        prelude(() => Api.get_User_User_Recipes(self.props.entity, User_User_Recipe_page_index(self), User_User_Recipe_page_size(self), User_User_Recipe_search_query(self)).then(Recipes => self.setState(Object.assign({}, self.state(), { update_count: self.state().update_count + 1, Recipe: Utils.raw_page_to_paginated_items((i, i_just_created) => {
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
exports.load_relation_User_User_Recipe = load_relation_User_User_Recipe;
function load_relation_User_User_RecommendationPage(self, force_first_page, current_User, callback) {
    let state = self.state();
    let prelude = force_first_page && state.RecommendationPage != "loading" ?
        (c) => state.RecommendationPage != "loading" && self.setState(Object.assign({}, state, { RecommendationPage: Object.assign({}, state.RecommendationPage, { PageIndex: 0 }) }), c)
        :
            (c) => c();
    Permissions.can_view_RecommendationPage(current_User) ?
        prelude(() => Api.get_User_User_RecommendationPages(self.props.entity, User_User_RecommendationPage_page_index(self), User_User_RecommendationPage_page_size(self), User_User_RecommendationPage_search_query(self)).then(RecommendationPages => self.setState(Object.assign({}, self.state(), { update_count: self.state().update_count + 1, RecommendationPage: Utils.raw_page_to_paginated_items((i, i_just_created) => {
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
exports.load_relation_User_User_RecommendationPage = load_relation_User_User_RecommendationPage;
function load_relations_User(self, current_User, callback) {
    load_relation_User_User_RecommendationPage(self, false, self.props.current_User, () => load_relation_User_User_Recipe(self, false, self.props.current_User, () => callback && callback()));
}
exports.load_relations_User = load_relations_User;
function set_size_User(self, new_size) {
    self.props.set_size(new_size, () => {
        if (new_size == "fullscreen")
            self.props.push(exports.User_to_page(self.props.entity.Id));
    });
}
exports.set_size_User = set_size_User;
function render_User_Username_editable_minimised(self) {
    if (!Permissions.can_edit_User(self.props.current_User))
        return render_User_Username_minimised(self);
    else
        return !Permissions.can_view_User_Username(self.props.current_User) ? React.createElement("div", null) :
            React.createElement("div", { className: "model__attribute username" },
                React.createElement("label", { className: "attribute-label attribute-label-username" }, i18next.t(`User:Username`, { context: self.props.inline ? "inline" : "" })),
                React.createElement("div", { className: "model__attribute-content" }, Components.String(false /* because username and email cannot be edited */, self.props.mode, () => self.props.entity.Username, v => self.props.set_entity(Object.assign({}, self.props.entity, { Username: v })))));
}
exports.render_User_Username_editable_minimised = render_User_Username_editable_minimised;
function render_User_Language_editable_minimised(self) {
    if (!Permissions.can_edit_User(self.props.current_User))
        return render_User_Language_minimised(self);
    else
        return !Permissions.can_view_User_Language(self.props.current_User) ? React.createElement("div", null) :
            React.createElement("div", { className: "model__attribute language" },
                React.createElement("label", { className: "attribute-label attribute-label-language" }, i18next.t(`User:Language`, { context: self.props.inline ? "inline" : "" })),
                React.createElement("div", { className: "model__attribute-content" }, Components.Union(self.props.is_editable && Permissions.can_edit_User(self.props.current_User) && Permissions.can_edit_User_Language(self.props.current_User), self.props.mode, Immutable.List([{ value: "en", label: "en" }]), () => self.props.entity.Language, (v) => self.props.set_entity(Object.assign({}, self.props.entity, { Language: v })))));
}
exports.render_User_Language_editable_minimised = render_User_Language_editable_minimised;
function render_User_Email_editable_minimised(self) {
    if (!Permissions.can_edit_User(self.props.current_User))
        return render_User_Email_minimised(self);
    else
        return !Permissions.can_view_User_Email(self.props.current_User) ? React.createElement("div", null) :
            null;
}
exports.render_User_Email_editable_minimised = render_User_Email_editable_minimised;
function render_User_Username_editable_maximised(self) {
    if (!Permissions.can_edit_User(self.props.current_User))
        return render_User_Username_maximised(self);
    else
        return !Permissions.can_view_User_Username(self.props.current_User) ? React.createElement("div", null) :
            React.createElement("div", { className: "model__attribute username" },
                React.createElement("label", { className: "attribute-label attribute-label-username" }, i18next.t(`User:Username`, { context: self.props.inline ? "inline" : "" })),
                React.createElement("div", { className: "model__attribute-content" }, Components.String(false /* because username and email cannot be edited */, self.props.mode, () => self.props.entity.Username, v => self.props.set_entity(Object.assign({}, self.props.entity, { Username: v })))));
}
exports.render_User_Username_editable_maximised = render_User_Username_editable_maximised;
function render_User_Language_editable_maximised(self) {
    if (!Permissions.can_edit_User(self.props.current_User))
        return render_User_Language_maximised(self);
    else
        return !Permissions.can_view_User_Language(self.props.current_User) ? React.createElement("div", null) :
            React.createElement("div", { className: "model__attribute language" },
                React.createElement("label", { className: "attribute-label attribute-label-language" }, i18next.t(`User:Language`, { context: self.props.inline ? "inline" : "" })),
                React.createElement("div", { className: "model__attribute-content" }, Components.Union(self.props.is_editable && Permissions.can_edit_User(self.props.current_User) && Permissions.can_edit_User_Language(self.props.current_User), self.props.mode, Immutable.List([{ value: "en", label: "en" }]), () => self.props.entity.Language, (v) => self.props.set_entity(Object.assign({}, self.props.entity, { Language: v })))));
}
exports.render_User_Language_editable_maximised = render_User_Language_editable_maximised;
function render_User_Email_editable_maximised(self) {
    if (!Permissions.can_edit_User(self.props.current_User))
        return render_User_Email_maximised(self);
    else
        return !Permissions.can_view_User_Email(self.props.current_User) ? React.createElement("div", null) :
            React.createElement("div", { className: "model__attribute email" },
                React.createElement("label", { className: "attribute-label attribute-label-email" }, i18next.t(`User:Email`, { context: self.props.inline ? "inline" : "" })),
                React.createElement("div", { className: "model__attribute-content" }, Components.Email(false, self.props.mode, () => self.props.entity.Email, v => self.props.set_entity(Object.assign({}, self.props.entity, { Email: v })))));
}
exports.render_User_Email_editable_maximised = render_User_Email_editable_maximised;
function render_editable_attributes_minimised_User(self) {
    let attributes = (React.createElement("div", null,
        render_User_Username_editable_minimised(self),
        render_User_Language_editable_minimised(self)));
    return attributes;
}
exports.render_editable_attributes_minimised_User = render_editable_attributes_minimised_User;
function render_editable_attributes_maximised_User(self) {
    let state = self.state();
    let attributes = (React.createElement("div", null,
        render_User_Username_editable_maximised(self),
        render_User_Language_editable_maximised(self),
        render_User_Email_editable_maximised(self),
        React.createElement("button", { onClick: () => Api.reset_User_password(self.props.entity.Username, self.props.entity.Email).then(() => location.reload()) }, self.props.entity.HasPassword ? i18next.t('common:Reset password') : i18next.t('common:Create password')),
        React.createElement("button", { onClick: () => Api.delete_User_sessions().then(() => location.reload()) }, i18next.t('common:Delete sessions')),
        state.active_sessions != "loading" ?
            React.createElement("div", { className: "active-user-sessions" },
                React.createElement("label", { className: "attribute-label attribute-label-active_sessions" }, i18next.t("Active sessions")),
                state.active_sessions.map(s => React.createElement("div", null,
                    s.Item1,
                    " - ",
                    Moment(s.Item2).format("DD/MM/YYYY"))))
            :
                React.createElement("div", { className: "loading" }, i18next.t("loading"))));
    return attributes;
}
exports.render_editable_attributes_maximised_User = render_editable_attributes_maximised_User;
function render_breadcrumb_User(self) {
    return React.createElement("div", { className: "breadcrumb-user" }, "User");
}
exports.render_breadcrumb_User = render_breadcrumb_User;
function render_menu_User(self) {
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
exports.render_menu_User = render_menu_User;
function render_local_menu_User(self) {
    let state = self.state();
    return React.createElement("div", { className: "local-menu" },
        React.createElement("div", { className: "local_menu_entries" },
            React.createElement("div", { className: `local_menu_entry${self.props.shown_relation == "none" ? " local_menu_entry--active" : ""}` },
                React.createElement("a", { onClick: () => self.props.set_shown_relation("none") }, i18next.t('About this User'))),
            !Permissions.can_view_Recipe(self.props.current_User) ? null :
                React.createElement("div", { key: "User_Recipe", className: `local_menu_entry${self.props.shown_relation == "User_Recipe" ? " local_menu_entry--active" : ""}` },
                    React.createElement("a", { onClick: () => load_relation_User_User_Recipe(self, false, self.props.current_User, () => self.props.set_shown_relation("User_Recipe")) }, i18next.t('User_Recipes'))),
            !Permissions.can_view_RecommendationPage(self.props.current_User) ? null :
                React.createElement("div", { key: "User_RecommendationPage", className: `local_menu_entry${self.props.shown_relation == "User_RecommendationPage" ? " local_menu_entry--active" : ""}` },
                    React.createElement("a", { onClick: () => load_relation_User_User_RecommendationPage(self, false, self.props.current_User, () => self.props.set_shown_relation("User_RecommendationPage")) }, i18next.t('User_RecommendationPages')))));
}
exports.render_local_menu_User = render_local_menu_User;
function render_controls_User(self) {
    return React.createElement("div", { className: "control" },
        Permissions.can_delete_User(self.props.current_User) && self.props.size == "fullscreen" ? React.createElement("a", { className: "button button--delete", onClick: () => confirm(i18next.t('Are you sure?')) &&
                Api.delete_User(self.props.entity).then(() => self.props.force_reload(() => self.props.pop())) }) : null,
        self.props.size == "fullscreen" && self.props.pages_count > 0 ? React.createElement("a", { className: "user button button--close", onClick: () => self.props.pop() }) : null,
        self.props.unlink && self.props.mode != "view" ?
            React.createElement("a", { className: "button button--unlink", onClick: () => self.props.unlink() })
            :
                null,
        self.props.delete && self.props.mode != "view" ?
            React.createElement("a", { className: "button button--delete", onClick: () => self.props.delete() })
            :
                null);
}
exports.render_controls_User = render_controls_User;
function render_content_User(self) {
    let actions = [].filter(a => a != null);
    let content = Permissions.can_view_User(self.props.current_User) ?
        self.props.size == "preview" ?
            render_preview_User(self)
            : self.props.size == "large" ?
                render_large_User(self)
                : self.props.size == "fullscreen" ?
                    render_large_User(self)
                    : "Error: unauthorised access to entity."
        : "Error: unauthorised access to entity.";
    if (self.props.mode == "view" && actions.length == 1 && !false)
        return React.createElement("a", { onClick: () => actions[0]() },
            React.createElement("div", { className: `${self.props.inline != undefined && self.props.inline ? "" : "model-content"} ${self.props.size == 'preview' ? 'model-content--preview' : ''}` }, content));
    else
        return React.createElement("div", { className: `${self.props.inline != undefined && self.props.inline ? "" : "model-content"} ${self.props.size == 'preview' ? 'model-content--preview' : ''}` }, content);
}
exports.render_content_User = render_content_User;
function render_User_Username_minimised(self) {
    return !Permissions.can_view_User_Username(self.props.current_User) ? null : React.createElement("div", { className: "model__attribute username" },
        React.createElement("label", { className: "attribute-label attribute-label-username" }, i18next.t(`User:Username`, { context: self.props.inline ? "inline" : "" })),
        React.createElement("div", { className: "model__attribute-content" }, Components.String(false /* because username and email cannot be edited */, self.props.mode, () => self.props.entity.Username, v => self.props.set_entity(Object.assign({}, self.props.entity, { Username: v })))));
}
exports.render_User_Username_minimised = render_User_Username_minimised;
function render_User_Language_minimised(self) {
    return !Permissions.can_view_User_Language(self.props.current_User) ? null : React.createElement("div", { className: "model__attribute language" },
        React.createElement("label", { className: "attribute-label attribute-label-language" }, i18next.t(`User:Language`, { context: self.props.inline ? "inline" : "" })),
        React.createElement("div", { className: "model__attribute-content" }, Components.Union(self.props.is_editable && Permissions.can_edit_User(self.props.current_User) && Permissions.can_edit_User_Language(self.props.current_User), self.props.mode, Immutable.List([{ value: "en", label: "en" }]), () => self.props.entity.Language, (v) => self.props.set_entity(Object.assign({}, self.props.entity, { Language: v })))));
}
exports.render_User_Language_minimised = render_User_Language_minimised;
function render_User_Email_minimised(self) {
    return null;
}
exports.render_User_Email_minimised = render_User_Email_minimised;
function render_User_Username_maximised(self) {
    return !Permissions.can_view_User_Username(self.props.current_User) ? null : React.createElement("div", { className: "model__attribute username" },
        React.createElement("label", { className: "attribute-label attribute-label-username" }, i18next.t(`User:Username`, { context: self.props.inline ? "inline" : "" })),
        React.createElement("div", { className: "model__attribute-content" }, Components.String(false /* because username and email cannot be edited */, self.props.mode, () => self.props.entity.Username, v => self.props.set_entity(Object.assign({}, self.props.entity, { Username: v })))));
}
exports.render_User_Username_maximised = render_User_Username_maximised;
function render_User_Language_maximised(self) {
    return !Permissions.can_view_User_Language(self.props.current_User) ? null : React.createElement("div", { className: "model__attribute language" },
        React.createElement("label", { className: "attribute-label attribute-label-language" }, i18next.t(`User:Language`, { context: self.props.inline ? "inline" : "" })),
        React.createElement("div", { className: "model__attribute-content" }, Components.Union(self.props.is_editable && Permissions.can_edit_User(self.props.current_User) && Permissions.can_edit_User_Language(self.props.current_User), self.props.mode, Immutable.List([{ value: "en", label: "en" }]), () => self.props.entity.Language, (v) => self.props.set_entity(Object.assign({}, self.props.entity, { Language: v })))));
}
exports.render_User_Language_maximised = render_User_Language_maximised;
function render_User_Email_maximised(self) {
    return !Permissions.can_view_User_Email(self.props.current_User) ? null : React.createElement("div", { className: "model__attribute email" },
        React.createElement("label", { className: "attribute-label attribute-label-email" }, i18next.t(`User:Email`, { context: self.props.inline ? "inline" : "" })),
        React.createElement("div", { className: "model__attribute-content" }, Components.Email(false, self.props.mode, () => self.props.entity.Email, v => self.props.set_entity(Object.assign({}, self.props.entity, { Email: v })))));
}
exports.render_User_Email_maximised = render_User_Email_maximised;
function render_preview_User(self) {
    let attributes = null;
    if (self.props.mode == "view" || !Permissions.can_edit_User(self.props.current_User))
        attributes = (React.createElement("div", { className: "model__attributes" },
            render_User_Username_minimised(self),
            render_User_Language_minimised(self),
            render_User_Email_minimised(self)));
    else
        attributes = render_editable_attributes_minimised_User(self);
    return (React.createElement("div", { className: "block" }, attributes));
}
exports.render_preview_User = render_preview_User;
function render_large_User(self) {
    let state = self.state();
    let attributes = null;
    if (self.props.mode == "view" || !Permissions.can_edit_User(self.props.current_User))
        attributes = (React.createElement("div", { className: "model__attributes" },
            render_User_Username_maximised(self),
            render_User_Language_maximised(self),
            render_User_Email_maximised(self),
            state.active_sessions != "loading" ?
                React.createElement("div", { className: "active-user-sessions" },
                    React.createElement("label", { className: "attribute-label attribute-label-active_sessions" }, i18next.t("Active sessions")),
                    state.active_sessions.map(s => React.createElement("div", null,
                        s.Item1,
                        " - ",
                        Moment(s.Item2).format("DD/MM/YYYY"))))
                :
                    React.createElement("div", { className: "loading" }, i18next.t("loading"))));
    else
        attributes = render_editable_attributes_maximised_User(self);
    return (React.createElement("div", { className: "block" },
        self.props.nesting_depth == 0 && self.props.shown_relation != "all" && self.props.shown_relation != "none" ? null : attributes,
        render_relations_User(self)));
}
exports.render_large_User = render_large_User;
function render_User_User_Recipe(self, context) {
    if ((context == "default" && self.props.shown_relation != "all" && self.props.shown_relation != "User_Recipe") || !Permissions.can_view_Recipe(self.props.current_User))
        return null;
    let state = self.state();
    return React.createElement("div", null, List.render_relation("user_user_recipe", "User", "Recipe", "Recipes", self.props.nesting_depth > 0, false, false, false)(state.Recipe != "loading" ?
        state.Recipe.IdsInServerOrder.map(id => state.Recipe != "loading" && state.Recipe.Items.get(id)) :
        state.Recipe, User_User_Recipe_page_index(self), User_User_Recipe_num_pages(self), new_page_index => {
        let state = self.state();
        state.Recipe != "loading" &&
            self.setState(Object.assign({}, self.state(), { update_count: self.state().update_count + 1, Recipe: Object.assign({}, state.Recipe, { PageIndex: new_page_index }) }), () => load_relation_User_User_Recipe(self, false, self.props.current_User));
    }, (i, _) => {
        let i_id = i.element.Id;
        let state = self.state();
        return React.createElement("div", { key: i_id, className: `model-nested__item ${i.size != "preview" ? "model-nested__item--open" : ""}
                        ${state.Recipe != "loading" && state.Recipe.JustCreated.has(i_id) && state.Recipe.JustCreated.get(i_id) ? "newly-created" : ""}` },
            React.createElement("div", { key: i_id }, RecipeViews.Recipe(Object.assign({}, self.props, { entity: i.element, inline: false, nesting_depth: self.props.nesting_depth + 1, size: i.size, allow_maximisation: true, allow_fullscreen: true, mode: self.props.mode == "edit" && (Permissions.can_edit_User_Recipe(self.props.current_User)
                    || Permissions.can_create_User_Recipe(self.props.current_User)
                    || Permissions.can_delete_User_Recipe(self.props.current_User)) ?
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
                }, delete: undefined, unlink: !Permissions.can_delete_User_Recipe(self.props.current_User) ?
                    null
                    :
                        () => confirm(i18next.t('Are you sure?')) && Api.unlink_User_User_Recipes(self.props.entity, i.element).then(() => load_relation_User_User_Recipe(self, false, self.props.current_User)) }))));
    }, () => React.createElement("div", null,
        Permissions.can_create_Recipe(self.props.current_User) && Permissions.can_create_User_Recipe(self.props.current_User) && User_User_Recipe_can_create(self) ? render_new_User_User_Recipe(self) : null,
        Permissions.can_create_User_Recipe(self.props.current_User) ? render_add_existing_User_User_Recipe(self) : null)));
}
exports.render_User_User_Recipe = render_User_User_Recipe;
function render_User_User_RecommendationPage(self, context) {
    if ((context == "default" && self.props.shown_relation != "all" && self.props.shown_relation != "User_RecommendationPage") || !Permissions.can_view_RecommendationPage(self.props.current_User))
        return null;
    let state = self.state();
    return React.createElement("div", null, List.render_relation("user_user_recommendationpage", "User", "RecommendationPage", "RecommendationPages", self.props.nesting_depth > 0, false, false, false)(state.RecommendationPage != "loading" ?
        state.RecommendationPage.IdsInServerOrder.map(id => state.RecommendationPage != "loading" && state.RecommendationPage.Items.get(id)) :
        state.RecommendationPage, User_User_RecommendationPage_page_index(self), User_User_RecommendationPage_num_pages(self), new_page_index => {
        let state = self.state();
        state.RecommendationPage != "loading" &&
            self.setState(Object.assign({}, self.state(), { update_count: self.state().update_count + 1, RecommendationPage: Object.assign({}, state.RecommendationPage, { PageIndex: new_page_index }) }), () => load_relation_User_User_RecommendationPage(self, false, self.props.current_User));
    }, (i, _) => {
        let i_id = i.element.Id;
        let state = self.state();
        return React.createElement("div", { key: i_id, className: `model-nested__item ${i.size != "preview" ? "model-nested__item--open" : ""}
                        ${state.RecommendationPage != "loading" && state.RecommendationPage.JustCreated.has(i_id) && state.RecommendationPage.JustCreated.get(i_id) ? "newly-created" : ""}` },
            React.createElement("div", { key: i_id }, RecommendationPageViews.RecommendationPage(Object.assign({}, self.props, { entity: i.element, inline: false, nesting_depth: self.props.nesting_depth + 1, size: i.size, allow_maximisation: true, allow_fullscreen: true, mode: self.props.mode == "edit" && (Permissions.can_edit_User_RecommendationPage(self.props.current_User)
                    || Permissions.can_create_User_RecommendationPage(self.props.current_User)
                    || Permissions.can_delete_User_RecommendationPage(self.props.current_User)) ?
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
                }, delete: undefined, unlink: !Permissions.can_delete_User_RecommendationPage(self.props.current_User) ?
                    null
                    :
                        () => confirm(i18next.t('Are you sure?')) && Api.unlink_User_User_RecommendationPages(self.props.entity, i.element).then(() => load_relation_User_User_RecommendationPage(self, false, self.props.current_User)) }))));
    }, () => React.createElement("div", null,
        Permissions.can_create_RecommendationPage(self.props.current_User) && Permissions.can_create_User_RecommendationPage(self.props.current_User) && User_User_RecommendationPage_can_create(self) ? render_new_User_User_RecommendationPage(self) : null,
        Permissions.can_create_User_RecommendationPage(self.props.current_User) ? render_add_existing_User_User_RecommendationPage(self) : null)));
}
exports.render_User_User_RecommendationPage = render_User_User_RecommendationPage;
function render_relations_User(self) {
    return React.createElement("div", { className: "relations" },
        render_User_User_Recipe(self, "default"),
        render_User_User_RecommendationPage(self, "default"));
}
exports.render_relations_User = render_relations_User;
function render_add_existing_User_User_Recipe(self) {
    let state = self.state();
    return self.props.mode == "edit" ?
        React.createElement("div", { className: "button__actions" }, state.add_step_Recipe != "open" ?
            React.createElement(Buttons.Add, { onClick: () => self.setState(Object.assign({}, self.state(), { add_step_Recipe: "open" })), target_name: "Recipe" })
            :
                React.createElement(List.AddToRelation, {
                    relation_name: "user_user_recipe",
                    source_name: "User",
                    target_name: "Recipe",
                    target_plural: "Recipes",
                    page_size: 25,
                    render_target: (i, i_id) => React.createElement("div", { key: i_id, className: "group__item" },
                        React.createElement("a", { className: "group__button button button--existing", onClick: () => self.setState(Object.assign({}, self.state(), { add_step_Recipe: "saving" }), () => Api.link_User_User_Recipes(self.props.entity, i).then(() => self.setState(Object.assign({}, self.state(), { add_step_Recipe: "closed" }), () => load_relation_User_User_Recipe(self, false, self.props.current_User)))) }, "Add existing"),
                        React.createElement("div", { className: "group__title", disabled: true }, RecipeViews.Recipe(Object.assign({}, self.props, { entity: i, nesting_depth: self.props.nesting_depth + 1, size: "preview", mode: "view", is_editable: false, nested_entity_names: self.props.nested_entity_names.push("Recipe"), set_size: undefined, toggle_button: undefined, set_mode: undefined, set_entity: (new_entity, callback) => { }, unlink: undefined, delete: undefined })))),
                    cancel: () => self.setState(Object.assign({}, self.state(), { add_step_Recipe: "closed" })),
                    get_items: [
                        { name: "Recipe", get: (i, s) => __awaiter(this, void 0, void 0, function* () { return Api.get_unlinked_User_User_Recipes(self.props.entity, i, s); }) },
                    ]
                }))
        :
            null;
}
exports.render_add_existing_User_User_Recipe = render_add_existing_User_User_Recipe;
function render_add_existing_User_User_RecommendationPage(self) {
    let state = self.state();
    return self.props.mode == "edit" ?
        React.createElement("div", { className: "button__actions" }, state.add_step_RecommendationPage != "open" ?
            React.createElement(Buttons.Add, { disabled: state.RecommendationPage == "loading" ? true : state.RecommendationPage.TotalCount >= 1, onClick: () => self.setState(Object.assign({}, self.state(), { add_step_RecommendationPage: "open" })), target_name: "RecommendationPage" })
            :
                React.createElement(List.AddToRelation, {
                    relation_name: "user_user_recommendationpage",
                    source_name: "User",
                    target_name: "RecommendationPage",
                    target_plural: "RecommendationPages",
                    page_size: 25,
                    render_target: (i, i_id) => React.createElement("div", { key: i_id, className: "group__item" },
                        React.createElement("a", { className: "group__button button button--existing", onClick: () => self.setState(Object.assign({}, self.state(), { add_step_RecommendationPage: "saving" }), () => Api.link_User_User_RecommendationPages(self.props.entity, i).then(() => self.setState(Object.assign({}, self.state(), { add_step_RecommendationPage: "closed" }), () => load_relation_User_User_RecommendationPage(self, false, self.props.current_User)))) }, "Add existing"),
                        React.createElement("div", { className: "group__title", disabled: true }, RecommendationPageViews.RecommendationPage(Object.assign({}, self.props, { entity: i, nesting_depth: self.props.nesting_depth + 1, size: "preview", mode: "view", is_editable: false, nested_entity_names: self.props.nested_entity_names.push("RecommendationPage"), set_size: undefined, toggle_button: undefined, set_mode: undefined, set_entity: (new_entity, callback) => { }, unlink: undefined, delete: undefined })))),
                    cancel: () => self.setState(Object.assign({}, self.state(), { add_step_RecommendationPage: "closed" })),
                    get_items: [
                        { name: "RecommendationPage", get: (i, s) => __awaiter(this, void 0, void 0, function* () { return Api.get_unlinked_User_User_RecommendationPages(self.props.entity, i, s); }) },
                    ]
                }))
        :
            null;
}
exports.render_add_existing_User_User_RecommendationPage = render_add_existing_User_User_RecommendationPage;
function render_new_User_User_Recipe(self) {
    let state = self.state();
    return self.props.mode == "edit" ?
        React.createElement("div", { className: "button__actions" },
            React.createElement("div", { className: "new-recipe" },
                React.createElement("button", { className: "new-recipe button button--new", onClick: () => Api.create_linked_User_User_Recipes_Recipe(self.props.entity).then(e => {
                        e.length > 0 &&
                            Api.update_Recipe(Object.assign({}, e[0], { Name: "", Ingredients: "", Description: "", Picture: "" })).then(() => load_relation_User_User_Recipe(self, true, self.props.current_User, () => self.setState(Object.assign({}, self.state(), { add_step_Recipe: "closed" }))));
                    }) }, i18next.t('Create new Recipe'))))
        :
            null;
}
exports.render_new_User_User_Recipe = render_new_User_User_Recipe;
function render_new_User_User_RecommendationPage(self) {
    let state = self.state();
    return self.props.mode == "edit" ?
        React.createElement("div", { className: "button__actions" },
            React.createElement("div", { className: "new-recommendationpage" },
                React.createElement("button", { disabled: state.RecommendationPage == "loading" ? true : state.RecommendationPage.TotalCount >= 1, className: "new-recommendationpage button button--new", onClick: () => Api.create_linked_User_User_RecommendationPages_RecommendationPage(self.props.entity).then(e => {
                        e.length > 0 &&
                            Api.update_RecommendationPage(Object.assign({}, e[0])).then(() => load_relation_User_User_RecommendationPage(self, true, self.props.current_User, () => self.setState(Object.assign({}, self.state(), { add_step_RecommendationPage: "closed" }))));
                    }) }, i18next.t('Create new RecommendationPage'))))
        :
            null;
}
exports.render_new_User_User_RecommendationPage = render_new_User_User_RecommendationPage;
function render_saving_animations_User(self) {
    return self.state().dirty_Recipe.count() > 0 ?
        React.createElement("div", { style: { position: "fixed", zIndex: 10000, top: 0, left: 0, width: "20px", height: "20px", backgroundColor: "red" }, className: "saving" }) :
        self.state().dirty_RecommendationPage.count() > 0 ?
            React.createElement("div", { style: { position: "fixed", zIndex: 10000, top: 0, left: 0, width: "20px", height: "20px", backgroundColor: "red" }, className: "saving" })
            : React.createElement("div", { style: { position: "fixed", zIndex: 10000, top: 0, left: 0, width: "20px", height: "20px", backgroundColor: "cornflowerblue" }, className: "saved" });
}
exports.render_saving_animations_User = render_saving_animations_User;
class UserComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.thread = null;
        this.state = { update_count: 0, active_sessions: "loading", add_step_Recipe: "closed", dirty_Recipe: Immutable.Map(), Recipe: "loading", add_step_RecommendationPage: "closed", dirty_RecommendationPage: Immutable.Map(), RecommendationPage: "loading" };
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
            load_relations_User(this.get_self(), new_props.current_User);
        }
    }
    componentWillMount() {
        if (this.props.size == "breadcrumb")
            return;
        if (this.props.size != "preview") {
            Api.active_User_sessions().then(active_sessions => this.setState(Object.assign({}, this.state, { active_sessions: active_sessions })));
            load_relations_User(this.get_self(), this.props.current_User);
        }
        this.thread = setInterval(() => {
            if (this.state.dirty_Recipe.count() > 0) {
                let first = this.state.dirty_Recipe.first();
                this.setState(Object.assign({}, this.state, { dirty_Recipe: this.state.dirty_Recipe.remove(first.Id) }), () => Api.update_Recipe(first));
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
            return Permissions.can_view_User(this.props.current_User) ?
                render_breadcrumb_User(this.get_self())
                : null;
        }
        return React.createElement("div", { id: `User_${this.props.entity.Id.toString()}_${this.state.update_count}`, className: `model user` },
            render_saving_animations_User(this.get_self()),
            this.props.nesting_depth == 0 ? render_menu_User(this.get_self()) : null,
            React.createElement("div", { className: "content" },
                this.props.nesting_depth == 0 && !!this.props.toggle_button ?
                    React.createElement("div", { className: "topbar" },
                        this.props.breadcrumbs(),
                        React.createElement("div", { className: "topbar__buttons" },
                            this.props.toggle_button ? this.props.toggle_button() : null,
                            this.props.authentication_menu()))
                    :
                        null,
                this.props.nesting_depth == 0 ? render_local_menu_User(this.get_self()) : null,
                render_controls_User(this.get_self()),
                render_content_User(this.get_self())));
    }
}
exports.UserComponent = UserComponent;
exports.User = (props) => React.createElement(UserComponent, Object.assign({}, props));
exports.User_to_page = (id) => {
    let can_edit = Utils.any_of([Permissions.can_edit_User, Permissions.can_edit_User_Recipe, Permissions.can_edit_User_RecommendationPage, Permissions.can_edit_Recipe, Permissions.can_edit_RecommendationPage]);
    return Utils.scene_to_page(can_edit, exports.User, Api.get_User(id), Api.update_User, "User", "User", `/Users/${id}`);
};
exports.User_to = (id, target_element_id, current_User) => {
    Utils.render_page_manager(target_element_id, exports.User_to_page(id), current_User);
};
//# sourceMappingURL=User.js.map