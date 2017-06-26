"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Models = require("../generated_models");
const Api = require("../generated_api");
const Components = require("../components/components");
const Permissions = require("./permissions");
const Utils = require("./view_utils");
const i18next = require("i18next");
const CustomViews = require("../custom_views");
function load_relations_() { }
exports.load_relations_ = load_relations_;
exports.Browse(self, current_User, Models.User, callback ?  : () => void );
{
    callback && callback();
}
function set_size_() { }
exports.set_size_ = set_size_;
exports.Browse(self, BrowseContext, new_size, Utils.EntitySize);
{
    self.props.set_size(new_size, () => {
        if (new_size == "fullscreen")
            self.props.push(exports.Browse_to_page(self.props.entity.Id));
    });
}
function render_() { }
exports.render_ = render_;
Browse_RecipeView_editable_minimised(self, BrowseContext);
JSX.Element;
{
    if (!Permissions.can_edit_)
        exports.Browse(self.props.current_User);
    return render_;
    Browse_RecipeView_minimised(self);
    return !Permissions.can_view_;
    Browse_RecipeView(self.props.current_User) ? React.createElement("div", null) :
        React.createElement("div", { className: "model__attribute recipeview" },
            React.createElement("div", { className: "model__attribute-content" }, CustomViews.Recipe_BrowseView(Object.assign({}, self.props))));
}
function render_() { }
exports.render_ = render_;
Browse_Test_editable_minimised(self, BrowseContext);
JSX.Element;
{
    if (!Permissions.can_edit_)
        exports.Browse(self.props.current_User);
    return render_;
    Browse_Test_minimised(self);
    return !Permissions.can_view_;
    Browse_Test(self.props.current_User) ? React.createElement("div", null) :
        React.createElement("div", { className: "model__attribute test" },
            React.createElement("label", { className: "attribute-label attribute-label-test" }, i18next.t(` Browse:Test`, { context: self.props.inline ? "inline" : "" })),
            React.createElement("div", { className: "model__attribute-content" }, Components.String(self.props.is_editable && Permissions.can_edit_, exports.Browse(self.props.current_User) && Permissions.can_edit_, Browse_Test(self.props.current_User), self.props.mode, () => self.props.entity.Test, v => self.props.set_entity(Object.assign({}, self.props.entity, { Test: v })))));
}
function render_() { }
exports.render_ = render_;
Browse_RecipeView_editable_maximised(self, BrowseContext);
JSX.Element;
{
    if (!Permissions.can_edit_)
        exports.Browse(self.props.current_User);
    return render_;
    Browse_RecipeView_maximised(self);
    return !Permissions.can_view_;
    Browse_RecipeView(self.props.current_User) ? React.createElement("div", null) :
        React.createElement("div", { className: "model__attribute recipeview" },
            React.createElement("div", { className: "model__attribute-content" }, CustomViews.Recipe_BrowseView(Object.assign({}, self.props))));
}
function render_() { }
exports.render_ = render_;
Browse_Test_editable_maximised(self, BrowseContext);
JSX.Element;
{
    if (!Permissions.can_edit_)
        exports.Browse(self.props.current_User);
    return render_;
    Browse_Test_maximised(self);
    return !Permissions.can_view_;
    Browse_Test(self.props.current_User) ? React.createElement("div", null) :
        React.createElement("div", { className: "model__attribute test" },
            React.createElement("label", { className: "attribute-label attribute-label-test" }, i18next.t(` Browse:Test`, { context: self.props.inline ? "inline" : "" })),
            React.createElement("div", { className: "model__attribute-content" }, Components.String(self.props.is_editable && Permissions.can_edit_, exports.Browse(self.props.current_User) && Permissions.can_edit_, Browse_Test(self.props.current_User), self.props.mode, () => self.props.entity.Test, v => self.props.set_entity(Object.assign({}, self.props.entity, { Test: v })))));
}
function render_editable_attributes_minimised_() { }
exports.render_editable_attributes_minimised_ = render_editable_attributes_minimised_;
exports.Browse(self, BrowseContext);
{
    let attributes = (React.createElement("div", null,
        render_,
        "(self)}",
        CustomViews.Recipe_BrowseView(Object.assign({}, self.props))));
    return attributes;
}
function render_editable_attributes_maximised_() { }
exports.render_editable_attributes_maximised_ = render_editable_attributes_maximised_;
exports.Browse(self, BrowseContext);
{
    let state = self.state();
    let attributes = (React.createElement("div", null,
        render_,
        "(self)}",
        CustomViews.Recipe_BrowseView(Object.assign({}, self.props))));
    return attributes;
}
function render_breadcrumb_() { }
exports.render_breadcrumb_ = render_breadcrumb_;
exports.Browse(self, BrowseContext);
{
    return React.createElement("div", { className: "breadcrumb- browse" }, " Browse");
}
function render_menu_() { }
exports.render_menu_ = render_menu_;
exports.Browse(self, BrowseContext);
{
    let state = self.state();
    return React.createElement("div", { className: "menu" },
        React.createElement("img", { className: "logo", src: "/images/logo.png", alt: "Logo" }),
        React.createElement("div", { className: "pages" },
            !Permissions.can_view_Favourite(self.props.current_User) ? null :
                React.createElement("div", { className: `menu_entry page_link` },
                    React.createElement("a", { onClick: () => Api.get_Favourites(0, 1).then(e => e.Items.length > 0 && self.props.set_page(FavouriteViews.Favourite_to_page(e.Items[0].Item.Id))) }, i18next.t('Favourite'))),
            !Permissions.can_view_,
            "(self.props.current_User) ? null :",
            React.createElement("div", { className: `menu_entry page_link active-page` },
                React.createElement("a", { onClick: () => self.props.set_shown_relation("none") }, i18next.t(' Browse'))),
            "}",
            !Permissions.can_view_Homepage(self.props.current_User) ? null :
                React.createElement("div", { className: `menu_entry page_link` },
                    React.createElement("a", { onClick: () => Api.get_Homepages(0, 1).then(e => e.Items.length > 0 && self.props.set_page(HomepageViews.Homepage_to_page(e.Items[0].Item.Id))) }, i18next.t('Homepage'))),
            React.createElement("div", { className: "menu_entries" },
                React.createElement("div", { className: "menu_entry menu_entry--with-sub" }))));
}
function render_local_menu_() { }
exports.render_local_menu_ = render_local_menu_;
exports.Browse(self, BrowseContext);
{
    let state = self.state();
    return React.createElement("div", { className: "local-menu" },
        React.createElement("div", { className: "local_menu_entries" },
            React.createElement("div", { className: `local_menu_entry${self.props.shown_relation == "none" ? " local_menu_entry--active" : ""}` },
                React.createElement("a", { onClick: () => self.props.set_shown_relation("none") }, i18next.t('About this  Browse')))));
}
function render_controls_() { }
exports.render_controls_ = render_controls_;
exports.Browse(self, BrowseContext);
{
    return React.createElement("div", { className: "control" },
        self.props.allow_maximisation && self.props.set_size ? React.createElement("a", { className: `" browse button button--toggle ${self.props.size != 'preview' ? 'button--toggle--open' : ''}`, onClick: () => {
                set_size_;
                exports.Browse(self, self.props.size == "preview" ? "large" : "preview");
            } }) : null,
        Permissions.can_delete_,
        "(self.props.current_User) && self.props.size == \"fullscreen\" ? ",
        React.createElement("a", { className: "button button--delete", onClick: () => confirm(i18next.t('Are you sure?')) &&
                Api.delete_, Browse: true }),
        "self.props.entity).then(() => self.props.force_reload(() => self.props.pop())) }>");
    null;
}
{
    self.props.unlink && self.props.mode != "view" ?
        React.createElement("a", { className: "button button--unlink", onClick: () => self.props.unlink() })
        :
            null;
}
{
    self.props.delete && self.props.mode != "view" ?
        React.createElement("a", { className: "button button--delete", onClick: () => self.props.delete() })
        :
            null;
}
div >
;
function render_content_() { }
exports.render_content_ = render_content_;
exports.Browse(self, BrowseContext);
{
    let actions = [
        self.props.allow_maximisation && self.props.set_size && self.props.size == "preview" ?
            () => set_size_ : Browse(self, self.props.size == "preview" ? "large" : "preview")
    ];
    null,
    ;
    filter(a => a != null);
    let content = Permissions.can_view_, Browse = (self.props.current_User) ?
        self.props.size == "preview" ?
            render_preview_ : Browse(self)
        : self.props.size == "large" ?
            render_large_ : Browse(self);
    self.props.size == "fullscreen" ?
        render_large_ : Browse(self);
    "Error: unauthorised access to entity.";
    "Error: unauthorised access to entity.";
    if (self.props.mode == "view" && actions.length == 1 && !false)
        return React.createElement("a", { onClick: () => actions[0]() },
            React.createElement("div", { className: `${self.props.inline != undefined && self.props.inline ? "" : "model-content"} ${self.props.size == 'preview' ? 'model-content--preview' : ''}` }, content));
    else
        return React.createElement("div", { className: `${self.props.inline != undefined && self.props.inline ? "" : "model-content"} ${self.props.size == 'preview' ? 'model-content--preview' : ''}` }, content);
}
function render_() { }
exports.render_ = render_;
Browse_RecipeView_minimised(self, BrowseContext);
JSX.Element;
{
    return !Permissions.can_view_;
    Browse_RecipeView(self.props.current_User) ? null : React.createElement("div", { className: "model__attribute recipeview" },
        React.createElement("div", { className: "model__attribute-content" }, CustomViews.Recipe_BrowseView(Object.assign({}, self.props))));
}
function render_() { }
exports.render_ = render_;
Browse_Test_minimised(self, BrowseContext);
JSX.Element;
{
    return !Permissions.can_view_;
    Browse_Test(self.props.current_User) ? null : React.createElement("div", { className: "model__attribute test" },
        React.createElement("label", { className: "attribute-label attribute-label-test" }, i18next.t(` Browse:Test`, { context: self.props.inline ? "inline" : "" })),
        React.createElement("div", { className: "model__attribute-content" }, Components.String(self.props.is_editable && Permissions.can_edit_, exports.Browse(self.props.current_User) && Permissions.can_edit_, Browse_Test(self.props.current_User), self.props.mode, () => self.props.entity.Test, v => self.props.set_entity(Object.assign({}, self.props.entity, { Test: v })))));
}
function render_() { }
exports.render_ = render_;
Browse_RecipeView_maximised(self, BrowseContext);
JSX.Element;
{
    return !Permissions.can_view_;
    Browse_RecipeView(self.props.current_User) ? null : React.createElement("div", { className: "model__attribute recipeview" },
        React.createElement("div", { className: "model__attribute-content" }, CustomViews.Recipe_BrowseView(Object.assign({}, self.props))));
}
function render_() { }
exports.render_ = render_;
Browse_Test_maximised(self, BrowseContext);
JSX.Element;
{
    return !Permissions.can_view_;
    Browse_Test(self.props.current_User) ? null : React.createElement("div", { className: "model__attribute test" },
        React.createElement("label", { className: "attribute-label attribute-label-test" }, i18next.t(` Browse:Test`, { context: self.props.inline ? "inline" : "" })),
        React.createElement("div", { className: "model__attribute-content" }, Components.String(self.props.is_editable && Permissions.can_edit_, exports.Browse(self.props.current_User) && Permissions.can_edit_, Browse_Test(self.props.current_User), self.props.mode, () => self.props.entity.Test, v => self.props.set_entity(Object.assign({}, self.props.entity, { Test: v })))));
}
function render_preview_() { }
exports.render_preview_ = render_preview_;
exports.Browse(self, BrowseContext);
{
    let attributes = null;
    if (self.props.mode == "view" || !Permissions.can_edit_)
        exports.Browse(self.props.current_User);
    attributes = (React.createElement("div", { className: "model__attributes" },
        render_,
        "(self) }",
        render_,
        "(self) }"));
    attributes = render_editable_attributes_minimised_;
    exports.Browse(self);
    return (React.createElement("div", { className: "block" }, attributes));
}
function render_large_() { }
exports.render_large_ = render_large_;
exports.Browse(self, BrowseContext);
{
    let state = self.state();
    let attributes = null;
    if (self.props.mode == "view" || !Permissions.can_edit_)
        exports.Browse(self.props.current_User);
    attributes = (React.createElement("div", { className: "model__attributes" },
        render_,
        "(self) }",
        render_,
        "(self) }"));
    attributes = render_editable_attributes_maximised_;
    exports.Browse(self);
    return (React.createElement("div", { className: "block" },
        self.props.nesting_depth == 0 && self.props.shown_relation != "all" && self.props.shown_relation != "none" ? null : attributes,
        render_relations_,
        "(self)}"));
}
function render_relations_() { }
exports.render_relations_ = render_relations_;
exports.Browse(self, BrowseContext);
{
    return React.createElement("div", { className: "relations" });
}
function render_saving_animations_() { }
exports.render_saving_animations_ = render_saving_animations_;
exports.Browse(self, BrowseContext);
{
    return;
}
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
            load_relations_;
            exports.Browse(this.get_self(), new_props.current_User);
        }
    }
    componentWillMount() {
        if (this.props.size == "breadcrumb")
            return;
        if (this.props.size != "preview") {
            load_relations_;
            exports.Browse(this.get_self(), this.props.current_User);
        }
        this.thread = setInterval(() => {
        }, 500);
    }
    componentWillUnmount() {
        clearInterval(this.thread);
    }
    render() {
        if (this.props.size == "breadcrumb") {
            return Permissions.can_view_;
            exports.Browse(this.props.current_User) ?
                render_breadcrumb_ : exports.Browse(this.get_self());
            null;
        }
        return React.createElement("div", { id: ` Browse_${this.props.entity.Id.toString()}_${this.state.update_count}`, className: `model  browse` },
            render_saving_animations_,
            "(this.get_self()) }",
            this.props.nesting_depth == 0 ? render_menu_ : exports.Browse(this.get_self()),
            " null }",
            React.createElement("div", { className: "content" },
                this.props.nesting_depth == 0 && !!this.props.toggle_button ?
                    React.createElement("div", { className: "topbar" },
                        this.props.breadcrumbs(),
                        React.createElement("div", { className: "topbar__buttons" },
                            this.props.toggle_button ? this.props.toggle_button() : null,
                            this.props.authentication_menu()))
                    :
                        null,
                render_controls_,
                "(this.get_self()) }",
                render_content_,
                "(this.get_self()) }"));
    }
}
exports.BrowseComponent = BrowseComponent;
exports.Browse = (props) => React.createElement(BrowseComponent, Object.assign({}, props));
exports.Browse_to_page = (id) => {
    let can_edit = Utils.any_of([Permissions.can_edit_, exports.Browse]);
    return Utils.scene_to_page(can_edit, exports.Browse, Api.get_, exports.Browse(id), Api.update_, exports.Browse, " Browse", " Browse", `/ Browses/${id}`);
};
exports.Browse_to = (id, target_element_id, current_User) => {
    Utils.render_page_manager(target_element_id, exports.Browse_to_page(id), current_User);
};
//# sourceMappingURL= Browse.js.map