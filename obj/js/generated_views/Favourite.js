"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Api = require("../generated_api");
const Components = require("../components/components");
const Permissions = require("./permissions");
const Utils = require("./view_utils");
const i18next = require("i18next");
const HomepageViews = require("./Homepage");
const CustomViews = require("../custom_views");
function load_relations_Favourite(self, current_User, callback) {
    callback && callback();
}
exports.load_relations_Favourite = load_relations_Favourite;
function set_size_Favourite(self, new_size) {
    self.props.set_size(new_size, () => {
        if (new_size == "fullscreen")
            self.props.push(exports.Favourite_to_page(self.props.entity.Id));
    });
}
exports.set_size_Favourite = set_size_Favourite;
function render_Favourite_FavouriteView_editable_minimised(self) {
    if (!Permissions.can_edit_Favourite(self.props.current_User))
        return render_Favourite_FavouriteView_minimised(self);
    else
        return !Permissions.can_view_Favourite_FavouriteView(self.props.current_User) ? React.createElement("div", null) :
            React.createElement("div", { className: "model__attribute favouriteview" },
                React.createElement("div", { className: "model__attribute-content" }, CustomViews.FavouriteView(Object.assign({}, self.props))));
}
exports.render_Favourite_FavouriteView_editable_minimised = render_Favourite_FavouriteView_editable_minimised;
function render_Favourite_Test_editable_minimised(self) {
    if (!Permissions.can_edit_Favourite(self.props.current_User))
        return render_Favourite_Test_minimised(self);
    else
        return !Permissions.can_view_Favourite_Test(self.props.current_User) ? React.createElement("div", null) :
            React.createElement("div", { className: "model__attribute test" },
                React.createElement("label", { className: "attribute-label attribute-label-test" }, i18next.t(`Favourite:Test`, { context: self.props.inline ? "inline" : "" })),
                React.createElement("div", { className: "model__attribute-content" }, Components.String(self.props.is_editable && Permissions.can_edit_Favourite(self.props.current_User) && Permissions.can_edit_Favourite_Test(self.props.current_User), self.props.mode, () => self.props.entity.Test, v => self.props.set_entity(Object.assign({}, self.props.entity, { Test: v })))));
}
exports.render_Favourite_Test_editable_minimised = render_Favourite_Test_editable_minimised;
function render_Favourite_FavouriteView_editable_maximised(self) {
    if (!Permissions.can_edit_Favourite(self.props.current_User))
        return render_Favourite_FavouriteView_maximised(self);
    else
        return !Permissions.can_view_Favourite_FavouriteView(self.props.current_User) ? React.createElement("div", null) :
            React.createElement("div", { className: "model__attribute favouriteview" },
                React.createElement("div", { className: "model__attribute-content" }, CustomViews.FavouriteView(Object.assign({}, self.props))));
}
exports.render_Favourite_FavouriteView_editable_maximised = render_Favourite_FavouriteView_editable_maximised;
function render_Favourite_Test_editable_maximised(self) {
    if (!Permissions.can_edit_Favourite(self.props.current_User))
        return render_Favourite_Test_maximised(self);
    else
        return !Permissions.can_view_Favourite_Test(self.props.current_User) ? React.createElement("div", null) :
            React.createElement("div", { className: "model__attribute test" },
                React.createElement("label", { className: "attribute-label attribute-label-test" }, i18next.t(`Favourite:Test`, { context: self.props.inline ? "inline" : "" })),
                React.createElement("div", { className: "model__attribute-content" }, Components.String(self.props.is_editable && Permissions.can_edit_Favourite(self.props.current_User) && Permissions.can_edit_Favourite_Test(self.props.current_User), self.props.mode, () => self.props.entity.Test, v => self.props.set_entity(Object.assign({}, self.props.entity, { Test: v })))));
}
exports.render_Favourite_Test_editable_maximised = render_Favourite_Test_editable_maximised;
function render_editable_attributes_minimised_Favourite(self) {
    let attributes = (React.createElement("div", null,
        render_Favourite_Test_editable_minimised(self),
        CustomViews.FavouriteView(Object.assign({}, self.props))));
    return attributes;
}
exports.render_editable_attributes_minimised_Favourite = render_editable_attributes_minimised_Favourite;
function render_editable_attributes_maximised_Favourite(self) {
    let state = self.state();
    let attributes = (React.createElement("div", null,
        render_Favourite_Test_editable_maximised(self),
        CustomViews.FavouriteView(Object.assign({}, self.props))));
    return attributes;
}
exports.render_editable_attributes_maximised_Favourite = render_editable_attributes_maximised_Favourite;
function render_breadcrumb_Favourite(self) {
    return React.createElement("div", { className: "breadcrumb-favourite" }, "Favourite");
}
exports.render_breadcrumb_Favourite = render_breadcrumb_Favourite;
function render_menu_Favourite(self) {
    let state = self.state();
    return React.createElement("div", { className: "menu" },
        React.createElement("img", { className: "logo", src: "/images/logo.png", alt: "Logo" }),
        React.createElement("div", { className: "pages" },
            !Permissions.can_view_Favourite(self.props.current_User) ? null :
                React.createElement("div", { className: `menu_entry page_link active-page` },
                    React.createElement("a", { onClick: () => self.props.set_shown_relation("none") }, i18next.t('Favourite'))),
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
exports.render_menu_Favourite = render_menu_Favourite;
function render_local_menu_Favourite(self) {
    let state = self.state();
    return React.createElement("div", { className: "local-menu" },
        React.createElement("div", { className: "local_menu_entries" },
            React.createElement("div", { className: `local_menu_entry${self.props.shown_relation == "none" ? " local_menu_entry--active" : ""}` },
                React.createElement("a", { onClick: () => self.props.set_shown_relation("none") }, i18next.t('About this Favourite')))));
}
exports.render_local_menu_Favourite = render_local_menu_Favourite;
function render_controls_Favourite(self) {
    return React.createElement("div", { className: "control" },
        self.props.allow_maximisation && self.props.set_size ? React.createElement("a", { className: `"favourite button button--toggle ${self.props.size != 'preview' ? 'button--toggle--open' : ''}`, onClick: () => {
                set_size_Favourite(self, self.props.size == "preview" ? "large" : "preview");
            } }) : null,
        Permissions.can_delete_Favourite(self.props.current_User) && self.props.size == "fullscreen" ? React.createElement("a", { className: "button button--delete", onClick: () => confirm(i18next.t('Are you sure?')) &&
                Api.delete_Favourite(self.props.entity).then(() => self.props.force_reload(() => self.props.pop())) }) : null,
        self.props.unlink && self.props.mode != "view" ?
            React.createElement("a", { className: "button button--unlink", onClick: () => self.props.unlink() })
            :
                null,
        self.props.delete && self.props.mode != "view" ?
            React.createElement("a", { className: "button button--delete", onClick: () => self.props.delete() })
            :
                null);
}
exports.render_controls_Favourite = render_controls_Favourite;
function render_content_Favourite(self) {
    let actions = [
        self.props.allow_maximisation && self.props.set_size && self.props.size == "preview" ?
            () => set_size_Favourite(self, self.props.size == "preview" ? "large" : "preview")
            :
                null,
    ].filter(a => a != null);
    let content = Permissions.can_view_Favourite(self.props.current_User) ?
        self.props.size == "preview" ?
            render_preview_Favourite(self)
            : self.props.size == "large" ?
                render_large_Favourite(self)
                : self.props.size == "fullscreen" ?
                    render_large_Favourite(self)
                    : "Error: unauthorised access to entity."
        : "Error: unauthorised access to entity.";
    if (self.props.mode == "view" && actions.length == 1 && !false)
        return React.createElement("a", { onClick: () => actions[0]() },
            React.createElement("div", { className: `${self.props.inline != undefined && self.props.inline ? "" : "model-content"} ${self.props.size == 'preview' ? 'model-content--preview' : ''}` }, content));
    else
        return React.createElement("div", { className: `${self.props.inline != undefined && self.props.inline ? "" : "model-content"} ${self.props.size == 'preview' ? 'model-content--preview' : ''}` }, content);
}
exports.render_content_Favourite = render_content_Favourite;
function render_Favourite_FavouriteView_minimised(self) {
    return !Permissions.can_view_Favourite_FavouriteView(self.props.current_User) ? null : React.createElement("div", { className: "model__attribute favouriteview" },
        React.createElement("div", { className: "model__attribute-content" }, CustomViews.FavouriteView(Object.assign({}, self.props))));
}
exports.render_Favourite_FavouriteView_minimised = render_Favourite_FavouriteView_minimised;
function render_Favourite_Test_minimised(self) {
    return !Permissions.can_view_Favourite_Test(self.props.current_User) ? null : React.createElement("div", { className: "model__attribute test" },
        React.createElement("label", { className: "attribute-label attribute-label-test" }, i18next.t(`Favourite:Test`, { context: self.props.inline ? "inline" : "" })),
        React.createElement("div", { className: "model__attribute-content" }, Components.String(self.props.is_editable && Permissions.can_edit_Favourite(self.props.current_User) && Permissions.can_edit_Favourite_Test(self.props.current_User), self.props.mode, () => self.props.entity.Test, v => self.props.set_entity(Object.assign({}, self.props.entity, { Test: v })))));
}
exports.render_Favourite_Test_minimised = render_Favourite_Test_minimised;
function render_Favourite_FavouriteView_maximised(self) {
    return !Permissions.can_view_Favourite_FavouriteView(self.props.current_User) ? null : React.createElement("div", { className: "model__attribute favouriteview" },
        React.createElement("div", { className: "model__attribute-content" }, CustomViews.FavouriteView(Object.assign({}, self.props))));
}
exports.render_Favourite_FavouriteView_maximised = render_Favourite_FavouriteView_maximised;
function render_Favourite_Test_maximised(self) {
    return !Permissions.can_view_Favourite_Test(self.props.current_User) ? null : React.createElement("div", { className: "model__attribute test" },
        React.createElement("label", { className: "attribute-label attribute-label-test" }, i18next.t(`Favourite:Test`, { context: self.props.inline ? "inline" : "" })),
        React.createElement("div", { className: "model__attribute-content" }, Components.String(self.props.is_editable && Permissions.can_edit_Favourite(self.props.current_User) && Permissions.can_edit_Favourite_Test(self.props.current_User), self.props.mode, () => self.props.entity.Test, v => self.props.set_entity(Object.assign({}, self.props.entity, { Test: v })))));
}
exports.render_Favourite_Test_maximised = render_Favourite_Test_maximised;
function render_preview_Favourite(self) {
    let attributes = null;
    if (self.props.mode == "view" || !Permissions.can_edit_Favourite(self.props.current_User))
        attributes = (React.createElement("div", { className: "model__attributes" },
            render_Favourite_FavouriteView_minimised(self),
            render_Favourite_Test_minimised(self)));
    else
        attributes = render_editable_attributes_minimised_Favourite(self);
    return (React.createElement("div", { className: "block" }, attributes));
}
exports.render_preview_Favourite = render_preview_Favourite;
function render_large_Favourite(self) {
    let state = self.state();
    let attributes = null;
    if (self.props.mode == "view" || !Permissions.can_edit_Favourite(self.props.current_User))
        attributes = (React.createElement("div", { className: "model__attributes" },
            render_Favourite_FavouriteView_maximised(self),
            render_Favourite_Test_maximised(self)));
    else
        attributes = render_editable_attributes_maximised_Favourite(self);
    return (React.createElement("div", { className: "block" },
        self.props.nesting_depth == 0 && self.props.shown_relation != "all" && self.props.shown_relation != "none" ? null : attributes,
        render_relations_Favourite(self)));
}
exports.render_large_Favourite = render_large_Favourite;
function render_relations_Favourite(self) {
    return React.createElement("div", { className: "relations" });
}
exports.render_relations_Favourite = render_relations_Favourite;
function render_saving_animations_Favourite(self) {
    return;
}
exports.render_saving_animations_Favourite = render_saving_animations_Favourite;
class FavouriteComponent extends React.Component {
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
            load_relations_Favourite(this.get_self(), new_props.current_User);
        }
    }
    componentWillMount() {
        if (this.props.size == "breadcrumb")
            return;
        if (this.props.size != "preview") {
            load_relations_Favourite(this.get_self(), this.props.current_User);
        }
        this.thread = setInterval(() => {
        }, 500);
    }
    componentWillUnmount() {
        clearInterval(this.thread);
    }
    render() {
        if (this.props.size == "breadcrumb") {
            return Permissions.can_view_Favourite(this.props.current_User) ?
                render_breadcrumb_Favourite(this.get_self())
                : null;
        }
        return React.createElement("div", { id: `Favourite_${this.props.entity.Id.toString()}_${this.state.update_count}`, className: `model favourite` },
            render_saving_animations_Favourite(this.get_self()),
            this.props.nesting_depth == 0 ? render_menu_Favourite(this.get_self()) : null,
            React.createElement("div", { className: "content" },
                this.props.nesting_depth == 0 && !!this.props.toggle_button ?
                    React.createElement("div", { className: "topbar" },
                        this.props.breadcrumbs(),
                        React.createElement("div", { className: "topbar__buttons" },
                            this.props.toggle_button ? this.props.toggle_button() : null,
                            this.props.authentication_menu()))
                    :
                        null,
                render_controls_Favourite(this.get_self()),
                render_content_Favourite(this.get_self())));
    }
}
exports.FavouriteComponent = FavouriteComponent;
exports.Favourite = (props) => React.createElement(FavouriteComponent, Object.assign({}, props));
exports.Favourite_to_page = (id) => {
    let can_edit = Utils.any_of([Permissions.can_edit_Favourite]);
    return Utils.scene_to_page(can_edit, exports.Favourite, Api.get_Favourite(id), Api.update_Favourite, "Favourite", "Favourite", `/Favourites/${id}`);
};
exports.Favourite_to = (id, target_element_id, current_User) => {
    Utils.render_page_manager(target_element_id, exports.Favourite_to_page(id), current_User);
};
//# sourceMappingURL=Favourite.js.map