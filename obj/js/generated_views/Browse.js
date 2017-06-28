"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Api = require("../generated_api");
const Permissions = require("./permissions");
const Utils = require("./view_utils");
const i18next = require("i18next");
const FavouriteViews = require("./Favourite");
const HomepageViews = require("./Homepage");
const RecommendationViews = require("./Recommendation");
const CustomViews = require("../custom_views");
function load_relations_Browse(self, current_User, callback) {
    callback && callback();
}
exports.load_relations_Browse = load_relations_Browse;
function set_size_Browse(self, new_size) {
    self.props.set_size(new_size, () => {
        if (new_size == "fullscreen")
            self.props.push(exports.Browse_to_page(self.props.entity.Id));
    });
}
exports.set_size_Browse = set_size_Browse;
function render_Browse_BrowseView_editable_minimised(self) {
    if (!Permissions.can_edit_Browse(self.props.current_User))
        return render_Browse_BrowseView_minimised(self);
    else
        return !Permissions.can_view_Browse_BrowseView(self.props.current_User) ? React.createElement("div", null) :
            React.createElement("div", { className: "model__attribute browseview" },
                React.createElement("div", { className: "model__attribute-content" }, CustomViews.BrowseView(Object.assign({}, self.props))));
}
exports.render_Browse_BrowseView_editable_minimised = render_Browse_BrowseView_editable_minimised;
function render_Browse_BrowseView_editable_maximised(self) {
    if (!Permissions.can_edit_Browse(self.props.current_User))
        return render_Browse_BrowseView_maximised(self);
    else
        return !Permissions.can_view_Browse_BrowseView(self.props.current_User) ? React.createElement("div", null) :
            React.createElement("div", { className: "model__attribute browseview" },
                React.createElement("div", { className: "model__attribute-content" }, CustomViews.BrowseView(Object.assign({}, self.props))));
}
exports.render_Browse_BrowseView_editable_maximised = render_Browse_BrowseView_editable_maximised;
function render_editable_attributes_minimised_Browse(self) {
    let attributes = (React.createElement("div", null, CustomViews.BrowseView(Object.assign({}, self.props))));
    return attributes;
}
exports.render_editable_attributes_minimised_Browse = render_editable_attributes_minimised_Browse;
function render_editable_attributes_maximised_Browse(self) {
    let state = self.state();
    let attributes = (React.createElement("div", null, CustomViews.BrowseView(Object.assign({}, self.props))));
    return attributes;
}
exports.render_editable_attributes_maximised_Browse = render_editable_attributes_maximised_Browse;
function render_breadcrumb_Browse(self) {
    return React.createElement("div", { className: "breadcrumb-browse" }, "Browse");
}
exports.render_breadcrumb_Browse = render_breadcrumb_Browse;
function render_menu_Browse(self) {
    let state = self.state();
    return React.createElement("div", { className: "menu" },
        React.createElement("img", { className: "logo", src: "/images/logo.png", alt: "Logo" }),
        React.createElement("div", { className: "pages" },
            !Permissions.can_view_Favourite(self.props.current_User) ? null :
                React.createElement("div", { className: `menu_entry page_link` },
                    React.createElement("a", { onClick: () => Api.get_Favourites(0, 1).then(e => e.Items.length > 0 && self.props.set_page(FavouriteViews.Favourite_to_page(e.Items[0].Item.Id))) }, i18next.t('Favourite'))),
            !Permissions.can_view_Browse(self.props.current_User) ? null :
                React.createElement("div", { className: `menu_entry page_link active-page` },
                    React.createElement("a", { onClick: () => self.props.set_shown_relation("none") }, i18next.t('Browse'))),
            !Permissions.can_view_Homepage(self.props.current_User) ? null :
                React.createElement("div", { className: `menu_entry page_link` },
                    React.createElement("a", { onClick: () => Api.get_Homepages(0, 1).then(e => e.Items.length > 0 && self.props.set_page(HomepageViews.Homepage_to_page(e.Items[0].Item.Id))) }, i18next.t('Homepage'))),
            !Permissions.can_view_Recommendation(self.props.current_User) ? null :
                React.createElement("div", { className: `menu_entry page_link` },
                    React.createElement("a", { onClick: () => Api.get_Recommendations(0, 1).then(e => e.Items.length > 0 && self.props.set_page(RecommendationViews.Recommendation_to_page(e.Items[0].Item.Id))) }, i18next.t('Recommendation'))),
            React.createElement("div", { className: "menu_entries" },
                React.createElement("div", { className: "menu_entry menu_entry--with-sub" }))));
}
exports.render_menu_Browse = render_menu_Browse;
function render_local_menu_Browse(self) {
    let state = self.state();
    return React.createElement("div", { className: "local-menu" },
        React.createElement("div", { className: "local_menu_entries" },
            React.createElement("div", { className: `local_menu_entry${self.props.shown_relation == "none" ? " local_menu_entry--active" : ""}` },
                React.createElement("a", { onClick: () => self.props.set_shown_relation("none") }, i18next.t('About this Browse')))));
}
exports.render_local_menu_Browse = render_local_menu_Browse;
function render_controls_Browse(self) {
    return React.createElement("div", { className: "control" },
        self.props.allow_maximisation && self.props.set_size ? React.createElement("a", { className: `"browse button button--toggle ${self.props.size != 'preview' ? 'button--toggle--open' : ''}`, onClick: () => {
                set_size_Browse(self, self.props.size == "preview" ? "large" : "preview");
            } }) : null,
        Permissions.can_delete_Browse(self.props.current_User) && self.props.size == "fullscreen" ? React.createElement("a", { className: "button button--delete", onClick: () => confirm(i18next.t('Are you sure?')) &&
                Api.delete_Browse(self.props.entity).then(() => self.props.force_reload(() => self.props.pop())) }) : null,
        self.props.unlink && self.props.mode != "view" ?
            React.createElement("a", { className: "button button--unlink", onClick: () => self.props.unlink() })
            :
                null,
        self.props.delete && self.props.mode != "view" ?
            React.createElement("a", { className: "button button--delete", onClick: () => self.props.delete() })
            :
                null);
}
exports.render_controls_Browse = render_controls_Browse;
function render_content_Browse(self) {
    let actions = [
        self.props.allow_maximisation && self.props.set_size && self.props.size == "preview" ?
            () => set_size_Browse(self, self.props.size == "preview" ? "large" : "preview")
            :
                null,
    ].filter(a => a != null);
    let content = Permissions.can_view_Browse(self.props.current_User) ?
        self.props.size == "preview" ?
            render_preview_Browse(self)
            : self.props.size == "large" ?
                render_large_Browse(self)
                : self.props.size == "fullscreen" ?
                    render_large_Browse(self)
                    : "Error: unauthorised access to entity."
        : "Error: unauthorised access to entity.";
    if (self.props.mode == "view" && actions.length == 1 && !false)
        return React.createElement("a", { onClick: () => actions[0]() },
            React.createElement("div", { className: `${self.props.inline != undefined && self.props.inline ? "" : "model-content"} ${self.props.size == 'preview' ? 'model-content--preview' : ''}` }, content));
    else
        return React.createElement("div", { className: `${self.props.inline != undefined && self.props.inline ? "" : "model-content"} ${self.props.size == 'preview' ? 'model-content--preview' : ''}` }, content);
}
exports.render_content_Browse = render_content_Browse;
function render_Browse_BrowseView_minimised(self) {
    return !Permissions.can_view_Browse_BrowseView(self.props.current_User) ? null : React.createElement("div", { className: "model__attribute browseview" },
        React.createElement("div", { className: "model__attribute-content" }, CustomViews.BrowseView(Object.assign({}, self.props))));
}
exports.render_Browse_BrowseView_minimised = render_Browse_BrowseView_minimised;
function render_Browse_BrowseView_maximised(self) {
    return !Permissions.can_view_Browse_BrowseView(self.props.current_User) ? null : React.createElement("div", { className: "model__attribute browseview" },
        React.createElement("div", { className: "model__attribute-content" }, CustomViews.BrowseView(Object.assign({}, self.props))));
}
exports.render_Browse_BrowseView_maximised = render_Browse_BrowseView_maximised;
function render_preview_Browse(self) {
    let attributes = null;
    if (self.props.mode == "view" || !Permissions.can_edit_Browse(self.props.current_User))
        attributes = (React.createElement("div", { className: "model__attributes" }, render_Browse_BrowseView_minimised(self)));
    else
        attributes = render_editable_attributes_minimised_Browse(self);
    return (React.createElement("div", { className: "block" }, attributes));
}
exports.render_preview_Browse = render_preview_Browse;
function render_large_Browse(self) {
    let state = self.state();
    let attributes = null;
    if (self.props.mode == "view" || !Permissions.can_edit_Browse(self.props.current_User))
        attributes = (React.createElement("div", { className: "model__attributes" }, render_Browse_BrowseView_maximised(self)));
    else
        attributes = render_editable_attributes_maximised_Browse(self);
    return (React.createElement("div", { className: "block" },
        self.props.nesting_depth == 0 && self.props.shown_relation != "all" && self.props.shown_relation != "none" ? null : attributes,
        render_relations_Browse(self)));
}
exports.render_large_Browse = render_large_Browse;
function render_relations_Browse(self) {
    return React.createElement("div", { className: "relations" });
}
exports.render_relations_Browse = render_relations_Browse;
function render_saving_animations_Browse(self) {
    return;
}
exports.render_saving_animations_Browse = render_saving_animations_Browse;
class BrowseComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.thread = null;
        this.state = { update_count: 0, };
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
            load_relations_Browse(this.get_self(), new_props.current_User);
        }
    }
    componentWillMount() {
        if (this.props.size == "breadcrumb")
            return;
        if (this.props.size != "preview") {
            load_relations_Browse(this.get_self(), this.props.current_User);
        }
        this.thread = setInterval(() => {
        }, 500);
    }
    componentWillUnmount() {
        clearInterval(this.thread);
    }
    render() {
        if (this.props.size == "breadcrumb") {
            return Permissions.can_view_Browse(this.props.current_User) ?
                render_breadcrumb_Browse(this.get_self())
                : null;
        }
        return React.createElement("div", { id: `Browse_${this.props.entity.Id.toString()}_${this.state.update_count}`, className: `model browse` },
            render_saving_animations_Browse(this.get_self()),
            this.props.nesting_depth == 0 ? render_menu_Browse(this.get_self()) : null,
            React.createElement("div", { className: "content" },
                this.props.nesting_depth == 0 && !!this.props.toggle_button ?
                    React.createElement("div", { className: "topbar" },
                        this.props.breadcrumbs(),
                        React.createElement("div", { className: "topbar__buttons" },
                            this.props.toggle_button ? this.props.toggle_button() : null,
                            this.props.authentication_menu()))
                    :
                        null,
                render_controls_Browse(this.get_self()),
                render_content_Browse(this.get_self())));
    }
}
exports.BrowseComponent = BrowseComponent;
exports.Browse = (props) => React.createElement(BrowseComponent, Object.assign({}, props));
exports.Browse_to_page = (id) => {
    let can_edit = Utils.any_of([Permissions.can_edit_Browse]);
    return Utils.scene_to_page(can_edit, exports.Browse, Api.get_Browse(id), Api.update_Browse, "Browse", "Browse", `/Browses/${id}`);
};
exports.Browse_to = (id, target_element_id, current_User) => {
    Utils.render_page_manager(target_element_id, exports.Browse_to_page(id), current_User);
};
//# sourceMappingURL=Browse.js.map