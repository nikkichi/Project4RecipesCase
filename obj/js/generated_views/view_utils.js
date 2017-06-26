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
const ReactDOM = require("react-dom");
const Immutable = require("immutable");
const Api = require("../generated_api");
const KeepAliveApi = require("../generated_keep_alive_api");
const i18next = require("i18next");
require("whatwg-fetch");
exports.any_of = (predicates) => (current_User) => predicates.map(p => p(current_User)).some(p => p);
class AuthenticationMenu extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.username = null;
        this.email = null;
        this.email_confirmation = null;
        this.password = null;
        this.new_password = null;
        this.new_password_confirmation = null;
        this.state = { kind: "menu" };
    }
    render() {
        let current_logged_in_entity = this.props.current_User || null;
        let current_state = this.state;
        let restore_state = () => this.setState(current_state);
        let error = (message) => () => this.setState(Object.assign({}, this.state, { kind: "error", message: i18next.t(message), action: restore_state }));
        if (this.state.kind == "menu") {
            return React.createElement("div", { className: "topbar__action-wrapper" },
                current_logged_in_entity ?
                    React.createElement(LanguageSelector, { current_User: this.props.current_User, set_User: u => this.props.set_User(u) })
                    :
                        null,
                React.createElement("div", { className: "authentication-menu" },
                    React.createElement("a", { className: "authentication-menu__user-btn", onClick: () => {
                            if (current_logged_in_entity)
                                this.setState({ kind: "choose-logout-changepassword" });
                            else
                                this.setState({ kind: "choose-login-register" });
                        } })));
        }
        else if (this.state.kind == "choose-login-register") {
            return React.createElement("div", { className: "authentication-menu" },
                React.createElement("a", { className: "authentication-menu__user-btn" }),
                React.createElement("div", { className: "overlay", onClick: e => e.target == e.currentTarget && this.setState({ kind: "menu" }) },
                    React.createElement("div", { className: "authentication-menu__popup" },
                        React.createElement("a", { className: "button-login", onClick: () => {
                                this.setState(Object.assign({}, this.state, { kind: "logging-in", action: (username, password) => Api.login_User(username, username, password).then(e => this.setState({ kind: "menu" }, () => this.props.set_User(e))).catch(error("Login error. Please check your username or email.")), reset_action: (username) => Api.reset_User_password(username, username).then(() => location.reload() || this.setState(Object.assign({}, this.state, { kind: "menu" }))).catch(error("Error: please check your username or email.")) }));
                            } }, i18next.t('Login as User')))));
        }
        else if (this.state.kind == "choose-logout-changepassword") {
            return React.createElement("div", { className: "authentication-menu" },
                React.createElement("a", { className: "authentication-menu__user-btn" }),
                React.createElement("div", { className: "overlay", onClick: e => e.target == e.currentTarget && this.setState({ kind: "menu" }) },
                    React.createElement("div", { className: "authentication-menu__popup" },
                        React.createElement("a", { onClick: () => {
                                let action = (password, new_password, new_password_confirmation) => new_password_confirmation != new_password ?
                                    error("Password and password confirmation do not match.")()
                                    :
                                        this.props.current_User ? Api.change_User_password(this.props.current_User.Username, this.props.current_User.Email, password, new_password, new_password_confirmation).then(() => this.setState({ kind: "menu" })).catch(error("Server error.")) :
                                            null;
                                this.setState(Object.assign({}, this.state, { kind: "changing-password", action: action }));
                            } }, i18next.t('Change password')),
                        React.createElement("a", { onClick: () => this.props.current_User ? Api.logout_User().then(() => this.setState({ kind: "menu" }, () => this.props.set_User(null))) :
                                null }, i18next.t('Logout')),
                        React.createElement("a", { onClick: () => this.setState({ kind: "menu" }) }, i18next.t('Back')))));
        }
        else if (this.state.kind == "logging-in") {
            return React.createElement("form", { className: "authentication-menu", onSubmit: e => {
                    e.preventDefault();
                    this.state.kind == "logging-in" && this.state.action(this.username.value, this.password.value);
                } },
                React.createElement("a", { className: "authentication-menu__user-btn" }),
                React.createElement("div", { className: "overlay", onClick: e => e.target == e.currentTarget && this.setState({ kind: "menu" }) },
                    React.createElement("div", { className: "authentication-menu__popup" },
                        React.createElement("label", null, i18next.t('Username or email')),
                        React.createElement("input", { type: "text", ref: u => this.username = u }),
                        React.createElement("label", null, i18next.t('Password')),
                        React.createElement("input", { type: "password", ref: p => this.password = p }),
                        React.createElement("button", { className: "button button-submit", type: "submit" }, i18next.t('Submit')),
                        React.createElement("button", { className: "button", onClick: () => {
                                this.setState(Object.assign({}, this.state, { kind: "menu" }));
                            } }, i18next.t('Cancel')),
                        React.createElement("a", { className: "authentication-menu__forgot-password", onClick: () => {
                                if (this.state.kind != "logging-in")
                                    return;
                                let new_state = Object.assign({}, this.state, { kind: "resetting-password", action: this.state.reset_action });
                                this.setState(new_state);
                            } }, i18next.t('Forgotten password')))));
        }
        else if (this.state.kind == "registering") {
            return React.createElement("form", { className: "authentication-menu", onSubmit: e => {
                    e.preventDefault();
                    this.state.kind == "registering" && this.state.action(this.username.value, this.email.value, this.email_confirmation.value);
                } },
                React.createElement("a", { className: "authentication-menu__user-btn" }),
                React.createElement("div", { className: "overlay", onClick: e => e.target == e.currentTarget && this.setState({ kind: "menu" }) },
                    React.createElement("div", { className: "authentication-menu__popup" },
                        React.createElement("label", null, i18next.t('Username')),
                        React.createElement("input", { type: "text", ref: u => this.username = u }),
                        React.createElement("label", null, i18next.t('Email')),
                        React.createElement("input", { type: "text", ref: u => this.email = u }),
                        React.createElement("label", null, i18next.t('Email confirmation')),
                        React.createElement("input", { type: "text", ref: u => this.email_confirmation = u }),
                        React.createElement("button", { className: "button button-submit", type: "submit" }, i18next.t('Submit')),
                        React.createElement("button", { className: "button", onClick: () => {
                                this.setState(Object.assign({}, this.state, { kind: "menu" }));
                            } }, i18next.t('Cancel')))));
        }
        else if (this.state.kind == "changing-password") {
            return React.createElement("form", { className: "authentication-menu", onSubmit: e => {
                    e.preventDefault();
                    this.state.kind == "changing-password" && this.state.action(this.password.value, this.new_password.value, this.new_password_confirmation.value);
                } },
                React.createElement("a", { className: "authentication-menu__user-btn" }),
                React.createElement("div", { className: "overlay", onClick: e => e.target == e.currentTarget && this.setState({ kind: "menu" }) },
                    React.createElement("div", { className: "authentication-menu__popup" },
                        React.createElement("label", null, i18next.t('Old password')),
                        React.createElement("input", { type: "password", ref: p => this.password = p }),
                        React.createElement("label", null, i18next.t('New password')),
                        React.createElement("input", { type: "password", ref: p => this.new_password = p }),
                        React.createElement("label", null, i18next.t('New password confirmation')),
                        React.createElement("input", { type: "password", ref: p => this.new_password_confirmation = p }),
                        React.createElement("div", null,
                            React.createElement("button", { className: "button button-submit", type: "submit" }, i18next.t('Submit')),
                            React.createElement("button", { className: "button", onClick: () => {
                                    this.setState(Object.assign({}, this.state, { kind: "menu" }));
                                } }, i18next.t('Cancel'))))));
        }
        else if (this.state.kind == "resetting-password") {
            return React.createElement("form", { className: "authentication-menu", onSubmit: e => {
                    e.preventDefault();
                    this.state.kind == "resetting-password" && this.state.action(this.username.value);
                } },
                React.createElement("a", { className: "authentication-menu__user-btn" }),
                React.createElement("div", { className: "overlay", onClick: e => e.target == e.currentTarget && this.setState({ kind: "menu" }) },
                    React.createElement("div", { className: "authentication-menu__popup" },
                        React.createElement("label", null, i18next.t('Username or email')),
                        React.createElement("input", { type: "text", ref: u => this.username = u }),
                        React.createElement("div", null,
                            React.createElement("button", { className: "button button-submit", type: "submit" }, i18next.t('Reset password')),
                            React.createElement("button", { className: "button", onClick: () => {
                                    this.setState(Object.assign({}, this.state, { kind: "menu" }));
                                } }, i18next.t('Cancel'))))));
        }
        else if (this.state.kind == "error") {
            return React.createElement("div", { className: "authentication-menu" },
                React.createElement("a", { className: "authentication-menu__user-btn" }),
                React.createElement("div", { className: "overlay", onClick: e => e.target == e.currentTarget && this.setState({ kind: "menu" }) },
                    React.createElement("div", { className: "overlay__item" },
                        React.createElement("h2", { className: "overlay__title" }, this.state.message),
                        React.createElement("button", { className: "button button-ok", onClick: () => this.state.kind == "error" && this.state.action() }, i18next.t('Ok')))));
        }
    }
}
exports.AuthenticationMenu = AuthenticationMenu;
class LanguageSelector extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = { changing_language: false };
    }
    render() {
        return null;
    }
}
function raw_page_to_paginated_items(f, x) {
    return {
        IdsInServerOrder: Immutable.List(x.Items.map(e => e.Item.Id)),
        Items: Immutable.Map(x.Items.map(e => [e.Item.Id, f(e.Item, e.JustCreated)])),
        Editable: Immutable.Map(x.Items.map(e => [e.Item.Id, e.Editable])),
        JustCreated: Immutable.Map(x.Items.map(e => [e.Item.Id, e.JustCreated])),
        SearchQuery: x.SearchQuery,
        PageIndex: x.PageIndex,
        PageSize: x.PageSize,
        NumPages: x.NumPages,
        TotalCount: x.TotalCount,
        CanCreate: x.CanCreate,
        CanDelete: x.CanDelete
    };
}
exports.raw_page_to_paginated_items = raw_page_to_paginated_items;
class Paginator extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};
    }
    render() {
        if (this.props.NumPages <= 1)
            return null;
        return React.createElement("div", { className: "paginator", style: { margin: "auto", width: "25%" } },
            this.props.NumPages > 3 ? React.createElement("a", { className: "page", style: { margin: "5px" }, onClick: () => this.props.page_selected(0) }, i18next.t('First')) : null,
            this.props.PageIndex > 2 ? "..." : null,
            this.props.PageIndex > 0 ?
                React.createElement("a", { className: "page", style: { margin: "5px" }, onClick: () => this.props.page_selected(this.props.PageIndex - 1) }, i18next.t('Prev')) : null,
            this.props.PageIndex > 0 ?
                React.createElement("a", { className: "page", style: { margin: "5px" }, onClick: () => this.props.page_selected(this.props.PageIndex - 1) }, this.props.PageIndex) : null,
            React.createElement("span", { className: "page", style: { margin: "5px" } }, this.props.PageIndex + 1),
            this.props.PageIndex < this.props.NumPages - 1 ?
                React.createElement("a", { className: "page", style: { margin: "5px" }, onClick: () => this.props.page_selected(this.props.PageIndex + 1) }, this.props.PageIndex + 2) : null,
            this.props.PageIndex < this.props.NumPages - 1 ?
                React.createElement("a", { className: "page", style: { margin: "5px" }, onClick: () => this.props.page_selected(this.props.PageIndex + 1) }, i18next.t('Next')) : null,
            this.props.PageIndex < this.props.NumPages - 2 ? "..." : null,
            this.props.NumPages > 3 ?
                React.createElement("a", { className: "page", style: { margin: "5px" }, onClick: () => this.props.page_selected(this.props.NumPages - 1) }, i18next.t('Last')) : null);
    }
}
exports.Paginator = Paginator;
// the scene will be responsible for most of the animations and transitions, but also
// managing the stack of renderers for navigation and url rewrites
class Scene extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.thread = null;
        this.state = { current_renderer: props.initial_renderer, is_dirty: false, size: props.is_breadcrumb ? "breadcrumb" : "fullscreen", mode: "view" };
    }
    componentDidMount() {
        this.props.get_element.then(e => this.setState(Object.assign({}, this.state, { element: e })));
    }
    componentWillMount() {
        this.thread = setInterval(() => {
            if (this.state.is_dirty && this.state.element) {
                this.props.save_element(this.state.element.Item).then(() => this.setState(Object.assign({}, this.state, { is_dirty: false }))).catch(() => console.log(`Update failed.`));
            }
        }, 500);
    }
    componentWillUnmount() {
        clearInterval(this.thread);
    }
    render() {
        let toggle_button = () => this.props.can_edit ?
            React.createElement("a", { className: `toggle-mode toggle-mode--${this.state.mode}`, onClick: () => this.setState(Object.assign({}, this.state, { mode: this.state.mode == "view" ? "edit" : "view" })) },
                React.createElement("span", null))
            :
                null;
        return this.state.element ?
            React.createElement("div", { className: "scene" },
                this.state.is_dirty ?
                    React.createElement("div", { style: { position: "fixed", top: 0, left: 0, zIndex: 1000, width: "20px", height: "20px", backgroundColor: "red" }, className: "saving" })
                    :
                        React.createElement("div", { style: { position: "fixed", top: 0, left: 0, zIndex: 1000, width: "20px", height: "20px", backgroundColor: "cornflowerblue" }, className: "saved" }),
                this.state.current_renderer({
                    current_User: this.props.current_User,
                    shown_relation: this.props.shown_relation,
                    set_shown_relation: this.props.set_shown_relation,
                    is_animating: this.props.is_animating,
                    is_breadcrumb: this.props.is_breadcrumb,
                    pages_count: this.props.pages_count,
                    set_page: this.props.set_page,
                    push: this.props.push,
                    pop: this.props.pop,
                    always_maximised: this.props.always_maximised,
                    allow_fullscreen: this.props.allow_fullscreen,
                    allow_maximisation: this.props.allow_maximisation,
                    entity: this.state.element.Item,
                    authentication_menu: this.props.authentication_menu,
                    breadcrumbs: this.props.breadcrumbs,
                    toggle_button: toggle_button,
                    nesting_depth: 0,
                    size: this.state.size,
                    mode: this.state.mode,
                    is_editable: this.state.element.Editable,
                    set_entity: (new_entity, callback, force_update_count_increment) => {
                        this.setState(Object.assign({}, this.state, { is_dirty: true, element: Object.assign({}, this.state.element, { Item: new_entity }) }), callback);
                    },
                    nested_entity_names: this.props.nested_entity_names.push(this.props.entity_name),
                    set_size: undefined,
                    set_mode: (new_mode, callback) => this.setState(Object.assign({}, this.state, { mode: this.state.mode == "view" ? "edit" : "view" })),
                    logic_frame: this.props.logic_frame,
                    force_reload: this.props.force_reload
                }))
            : React.createElement("div", { className: "loading" }, "Loading...");
    }
}
function scene_to_page(can_edit, renderer, get_element, save_element, entity_name, title, url) {
    let SceneT = Scene;
    return {
        render: (is_breadcrumb) => (is_animating) => (pages_count, logic_frame, force_reload) => (current_User) => (shown_relation, set_shown_relation) => (authentication_menu, breadcrumbs) => (nested_entity_names) => (set_page, push, pop) => React.createElement(SceneT, { is_breadcrumb: is_breadcrumb, is_animating: is_animating, pages_count: pages_count, logic_frame: logic_frame, force_reload: force_reload, set_page: set_page, push: push, pop: pop, initial_renderer: renderer, get_element: get_element, shown_relation: shown_relation, set_shown_relation: set_shown_relation, authentication_menu: authentication_menu, breadcrumbs: breadcrumbs, allow_fullscreen: true, allow_maximisation: true, always_maximised: true, nested_entity_names: nested_entity_names, entity_name: entity_name, save_element: e => save_element(e), can_edit: can_edit(current_User) && !is_breadcrumb, current_User: current_User }),
        url: url,
        title: title
    };
}
exports.scene_to_page = scene_to_page;
class PageManager extends React.Component {
    constructor(props, context) {
        super();
        this.keep_alive_thread = null;
        this.state = {
            connection: "connected",
            pages: Immutable.Stack([Object.assign({}, props.initial_page, { shown_relation: "none" })]),
            current_User: props.current_User, logic_frame: 0
        };
    }
    componentWillMount() {
        this.onpopstate = window.addEventListener("popstate", (e) => {
            e.stopPropagation();
            this.pop();
        });
        this.keep_alive_thread = setInterval(() => {
            if (this.props.current_User)
                KeepAliveApi.ping_as_User().then(() => this.state.connection != "connected" && this.setState(Object.assign({}, this.state, { connection: "connected" }))).catch(() => {
                    if (this.state.connection == "maybe-disconnected1")
                        this.setState(Object.assign({}, this.state, { connection: "maybe-disconnected2" }));
                    else if (this.state.connection == "maybe-disconnected2")
                        this.setState(Object.assign({}, this.state, { connection: "disconnected" }));
                    else if (this.state.connection == "connected")
                        this.setState(Object.assign({}, this.state, { connection: "maybe-disconnected1" }));
                    else
                        this.setState(Object.assign({}, this.state, { connection: "disconnected" }));
                });
            else
                KeepAliveApi.ping().then(() => this.setState(Object.assign({}, this.state, { connection: "connected" }))).catch(() => {
                    if (this.state.connection == "maybe-disconnected1")
                        this.setState(Object.assign({}, this.state, { connection: "maybe-disconnected2" }));
                    else if (this.state.connection == "maybe-disconnected2")
                        this.setState(Object.assign({}, this.state, { connection: "disconnected" }));
                    else if (this.state.connection == "connected")
                        this.setState(Object.assign({}, this.state, { connection: "maybe-disconnected1" }));
                    else
                        this.setState(Object.assign({}, this.state, { connection: "disconnected" }));
                });
        }, 5000);
    }
    componentWillUnmount() {
        window.removeEventListener("popstate", this.onpopstate);
        clearInterval(this.keep_alive_thread);
    }
    set_page(new_page, callback) {
        window.history.pushState(null, new_page.title, new_page.url);
        this.setState(Object.assign({}, this.state, { pages: this.state.pages.push(Object.assign({}, new_page, { shown_relation: "none" })) }), () => this.setState(Object.assign({}, this.state, { pages: Immutable.Stack([Object.assign({}, new_page, { shown_relation: "none" })]) }), callback));
    }
    push(new_page, callback) {
        window.history.pushState(null, new_page.title, new_page.url);
        this.setState(Object.assign({}, this.state, { pages: this.state.pages.push(Object.assign({}, new_page, { shown_relation: "none" })) }), callback);
    }
    pop(callback) {
        let new_pages = this.state.pages.pop();
        let new_page = new_pages.peek();
        window.history.pushState(null, new_page.title, new_page.url);
        this.setState(Object.assign({}, this.state, { pages: new_pages }), callback);
    }
    render() {
        let authentication_menu = () => React.createElement(AuthenticationMenu, { current_User: this.state.current_User, set_User: (new_User) => this.setState(Object.assign({}, this.state, { current_User: new_User }), () => location.reload()) });
        let breadcrumbs = () => React.createElement("div", { className: "breadcrumbs" }, this.state.pages.count() == 1 ?
            null
            :
                this.state.pages.map((p, i) => React.createElement("a", { key: `${i}`, className: "breadcrumbs__item", style: Object.assign({}, (i == this.state.pages.count() - 1 ?
                        { pointerEvents: "none", border: "none" } : {}), (i == 0 ? { marginLeft: "5px" } : {})), onClick: () => {
                        let new_pages = Immutable.Stack(this.state.pages.reverse().take(i + 1).reverse());
                        let new_page = new_pages.peek();
                        window.history.replaceState(null, new_page.title, new_page.url);
                        this.setState(Object.assign({}, this.state, { pages: new_pages }));
                    } }, p.render(true)(false)(this.state.pages.count(), this.state.logic_frame, (c) => c && c())(this.state.current_User)(p.shown_relation, np => { })(authentication_menu, breadcrumbs)(Immutable.Stack())((np, c) => { }, (np, c) => { }, c => { }))).reverse());
        let disconnected_warning = this.state.connection == "disconnected" ?
            React.createElement("div", { className: "overlay overlay--disconnected" },
                React.createElement("div", { className: "overlay__item" },
                    React.createElement("h2", { className: "overlay__title" }, i18next.t('There seems to be a connection issue')),
                    React.createElement("button", { onClick: () => location.reload() }, i18next.t('Click here to reload the page'))))
            :
                null;
        return React.createElement("div", { id: "curr", key: `${this.state.pages.peek().url}_${this.state.pages.count()}` },
            disconnected_warning,
            this.state.pages.peek().render(false)(false)(this.state.pages.count(), this.state.logic_frame, (c) => this.setState(Object.assign({}, this.state, { logic_frame: this.state.logic_frame + 1 }), c))(this.state.current_User)(this.state.pages.peek().shown_relation, (np, c) => this.setState(Object.assign({}, this.state, { pages: this.state.pages.pop().push(Object.assign({}, this.state.pages.peek(), { shown_relation: np })) }), c))(authentication_menu, breadcrumbs)(Immutable.Stack())((np, c) => this.set_page(np, c), (np, c) => this.push(np, c), c => this.pop(c)));
    }
}
exports.PageManager = PageManager;
function render_page_manager(target_element_id, initial_page, current_User) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/translations.json`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        let resources = yield res.json();
        i18next.init({
            lng: current_User ? current_User.Language : "nl",
            fallbackLng: "en",
            ns: ["common", "Thirty", "Meal", "Asian", "Cuisine", "PreparationTime", "Sixty", "RecommendationPage", "Favourite", " Browse", "Lunch", "User", "Homepage", "Brunch", "Recipe", "Dinner", "Mediterranean", "Ninety", "Breakfast", "Fifteen", "Rating", "Grill"],
            resources: resources
        }, (err, t) => {
            ReactDOM.render(React.createElement(PageManager, { initial_page: initial_page, current_User: current_User }), document.getElementById(target_element_id));
        });
    });
}
exports.render_page_manager = render_page_manager;
//# sourceMappingURL=view_utils.js.map