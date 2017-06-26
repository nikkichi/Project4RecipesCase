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
const Utils = require("../generated_views/view_utils");
const Buttons = require("./button_utils");
const i18next = require("i18next");
exports.render_relation = (relation_name, source_name, target_name, target_plural, show_title, inline, cards, side_selector) => function (items, page_index, num_pages, page_selected, render_target, render_new_targets) {
    return React.createElement("div", { className: `${relation_name} ${inline ? "inline-relation" : ""} ${side_selector ? "column-view-menu" : ""}` }, items == "loading" ?
        React.createElement("div", { className: "loading" },
            i18next.t(`Loading ${target_name}`),
            ".")
        :
            React.createElement("div", { className: `${inline ? "" : "model-nested"} ${cards ? "cards" : ""}` },
                inline || !show_title ? null : React.createElement("div", { className: "model-nested__title" }, i18next.t(target_plural)),
                React.createElement(Utils.Paginator, { PageIndex: page_index, NumPages: num_pages, page_selected: new_page_index => page_selected(new_page_index) }),
                items.map((i, i_id) => render_target(i, i_id)).valueSeq(),
                React.createElement("div", { className: "button__actions-wrapper" }, render_new_targets())));
};
function load_all(page_index, page_size, getPage) {
    return __awaiter(this, void 0, void 0, function* () {
        let page = yield getPage(page_index, page_size);
        let items = Immutable.List(page.Items.map(i => i.Item));
        if (page.PageIndex == page.NumPages - 1 || page.NumPages <= 1)
            return items;
        let rest = yield load_all(page_index + 1, page_size, getPage);
        return items.concat(rest).toList();
    });
}
exports.load_all = load_all;
exports.load_all_from = (source, page_index, page_size, getPage) => __awaiter(this, void 0, void 0, function* () {
    let page = yield getPage(source, page_index, page_size);
    let items = Immutable.List(page.Items.map(i => i.Item));
    if (page.PageIndex == page.NumPages - 1 || page.NumPages <= 1)
        return items;
    let rest = yield exports.load_all_from(source, page_index + 1, page_size, getPage);
    return items.concat(rest).toList();
});
function selector_first_step(show, selection_name, getTargets, continuation) {
    return () => {
        return React.createElement(SelectorFirstStep, {
            selection_name: selection_name,
            show: show,
            getTargets: getTargets,
            continuation: continuation
        }, null);
    };
}
exports.selector_first_step = selector_first_step;
function selector_step(relation_name, source_name, target_name, target_plural, show, render_element, selection_name, is_last, getUnwantedTargets, getTargets, continuation) {
    return (source) => {
        return React.createElement(SelectorStep, {
            relation_name: relation_name,
            source_name: source_name,
            target_name: target_name,
            target_plural: target_plural,
            source: source,
            selection_name: selection_name,
            is_last: is_last,
            show: show,
            render_element: render_element,
            getUnwantedTargets: getUnwantedTargets,
            getTargets: getTargets,
            continuation: continuation
        }, null);
    };
}
exports.selector_step = selector_step;
class SelectorFirstStep extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = { targets: "loading", step: "selecting", continuation_element: "none", update_count: 0 };
    }
    load() {
        load_all(0, 50, this.props.getTargets).then(targets => this.setState(Object.assign({}, this.state, { targets: targets })));
    }
    componentWillReceiveProps(new_props) {
        this.load();
    }
    componentWillMount() {
        this.load();
    }
    render() {
        return this.state.targets == "loading" ?
            React.createElement("div", { className: "loading" }, i18next.t("Loading..."))
            :
                React.createElement("div", null,
                    React.createElement("h3", null, i18next.t(`Select ${this.props.selection_name}`)),
                    React.createElement("select", { defaultValue: "", onChange: t => {
                            if (this.state.targets == "loading" || t.currentTarget.value == "")
                                return;
                            let selected = this.state.targets.get(parseInt(t.currentTarget.value));
                            this.setState(Object.assign({}, this.state, { step: { selected: selected } }), () => this.props.continuation(selected, ce => this.setState(Object.assign({}, this.state, { continuation_element: ce, update_count: this.state.update_count + 1 }))));
                        } },
                        React.createElement("option", { value: "" }),
                        this.state.targets.map((t, t_id) => React.createElement("option", { key: t_id, value: t_id.toString() }, this.props.show(t)))),
                    React.createElement("div", { key: this.state.update_count }, this.state.continuation_element != "none" ?
                        this.state.continuation_element
                        :
                            null));
    }
}
exports.SelectorFirstStep = SelectorFirstStep;
class SelectorStep extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = { unwanted_targets: "loading", targets: "loading", step: "selecting", continuation_element: "none", update_count: 0 };
    }
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            let unwanted_targets = yield load_all(0, 50, this.props.getUnwantedTargets);
            if (this.props.is_last)
                this.setState(Object.assign({}, this.state, { unwanted_targets: unwanted_targets, targets: Immutable.List() }));
            else {
                let targets = yield exports.load_all_from(this.props.source, 0, 50, this.props.getTargets);
                this.setState(Object.assign({}, this.state, { unwanted_targets: unwanted_targets, targets: targets }));
            }
        });
    }
    componentWillReceiveProps(new_props) {
        this.load();
    }
    componentWillMount() {
        this.load();
    }
    render() {
        return this.state.targets == "loading" || this.state.unwanted_targets == "loading" ?
            React.createElement("div", { className: "loading" }, i18next.t("Loading..."))
            :
                React.createElement("div", null,
                    React.createElement("h3", null, i18next.t(`Select ${this.props.selection_name}`)),
                    this.props.is_last ?
                        React.createElement(AddToRelation, {
                            relation_name: this.props.relation_name,
                            source_name: this.props.source_name,
                            target_name: this.props.target_name,
                            target_plural: this.props.target_plural,
                            suppress_overlay: true,
                            unwanted_items: this.state.unwanted_targets,
                            page_size: 25,
                            render_target: (t, t_id) => this.props.render_element(t, t_id),
                            cancel: () => { },
                            get_items: [{ name: "", get: (page_index, page_size) => this.props.getTargets(this.props.source, page_index, page_size) }]
                        })
                        :
                            React.createElement("select", { defaultValue: "", onChange: t => {
                                    if (this.state.targets == "loading" || t.currentTarget.value == "")
                                        return;
                                    let selected = this.state.targets.get(parseInt(t.currentTarget.value));
                                    this.setState(Object.assign({}, this.state, { step: { selected: selected } }), () => this.props.continuation(selected, ce => this.setState(Object.assign({}, this.state, { continuation_element: ce, update_count: this.state.update_count + 1 }))));
                                } },
                                React.createElement("option", { value: "" }),
                                this.state.targets.map((t, t_id) => this.state.unwanted_targets == "loading" || this.state.unwanted_targets.some(t1 => t.Id == t1.Id) ?
                                    null
                                    :
                                        React.createElement("option", { key: t_id, value: t_id.toString() }, this.props.show(t)))),
                    React.createElement("div", { key: this.state.update_count }, this.state.continuation_element != "none" ?
                        this.state.continuation_element
                        :
                            null));
    }
}
exports.SelectorStep = SelectorStep;
exports.render_add_to_relation_block = (relation_name, source_name, target_name, target_plural) => function (block, add_buttons, cancel) {
    return React.createElement("div", { className: `overlay new-${target_name.toLowerCase()}-background`, onClick: e => e.target == e.currentTarget && cancel() },
        React.createElement("div", { className: `overlay__item overlay__item--new add-existing-${target_name.toLowerCase()}` },
            React.createElement("div", { className: "group" }, block()),
            React.createElement("button", { onClick: () => cancel() }, i18next.t('Cancel'))),
        add_buttons());
};
class AddToRelation extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = { items: "loading", page_index: 0, num_pages: 0, step: this.props.get_items.length > 1 ? "selecting" : { selected: 0 } };
    }
    load_page(page_index) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.state.step == "selecting")
                return;
            let items_page = yield this.props.get_items[this.state.step.selected].get(page_index, this.props.page_size);
            this.setState(Object.assign({}, this.state, { items: Immutable.List(items_page.Items.map(i => i.Item)), page_index: items_page.PageIndex, num_pages: items_page.NumPages }));
        });
    }
    componentWillMount() {
        this.load_page(this.state.page_index);
    }
    render() {
        return React.createElement("div", null, this.state.step == "selecting" ?
            React.createElement("div", { className: this.props.suppress_overlay ? `overlay--inline new-${this.props.target_name.toLowerCase()}-background` : `overlay new-${this.props.target_name.toLowerCase()}-background`, onClick: e => e.target == e.currentTarget && this.props.cancel() },
                React.createElement("div", { className: this.props.suppress_overlay ? "" : `overlay__item` },
                    React.createElement("div", null, this.props.get_items.map((g, g_id) => React.createElement(Buttons.Add, { onClick: () => this.setState(Object.assign({}, this.state, { step: { selected: g_id } }), () => this.load_page(this.state.page_index)), target_name: g.name })))),
                this.props.suppress_overlay ? null : React.createElement("button", { onClick: () => this.props.cancel() }, i18next.t('Cancel')))
            :
                this.state.items == "loading" ?
                    React.createElement("div", { className: "loading" }, "Loading")
                    :
                        React.createElement("div", { className: this.props.suppress_overlay ? `overlay--inline new-${this.props.target_name.toLowerCase()}-background` : `overlay new-${this.props.target_name.toLowerCase()}-background`, onClick: e => e.target == e.currentTarget && this.props.cancel() },
                            React.createElement("div", { className: this.props.suppress_overlay ? "" : `overlay__item` },
                                React.createElement(Utils.Paginator, { PageIndex: this.state.page_index, NumPages: this.state.num_pages, page_selected: new_page_index => this.load_page(new_page_index) }),
                                React.createElement("div", { className: "group" }, this.state.items.filter((i, i_id) => !this.props.unwanted_items || !this.props.unwanted_items.some(u => u.Id == i.Id)).map((i, i_id) => this.props.render_target(i, i_id)).valueSeq()),
                                this.props.suppress_overlay ? null : React.createElement("button", { onClick: () => this.props.cancel() }, i18next.t('Cancel')))));
    }
}
exports.AddToRelation = AddToRelation;
function merge(new_items, old_items) {
    let items = new_items.Items.map((i, i_id) => old_items == "loading" || !old_items.Items.has(i.element.Id) ?
        i
        : Object.assign({}, i, { size: old_items.Items.get(i.element.Id).size, shown_relation: old_items.Items.get(i.element.Id).shown_relation })).toMap();
    return Object.assign({}, new_items, { Items: items });
}
exports.merge = merge;
class AddToRelationDropdown extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = { items: "loading", selection: "waiting" };
    }
    load_page() {
        return __awaiter(this, void 0, void 0, function* () {
            let items = yield load_all(0, this.props.page_size, this.props.get_items);
            this.setState(Object.assign({}, this.state, { items: Immutable.List(items) }));
        });
    }
    componentWillMount() {
        this.load_page();
    }
    render() {
        return React.createElement("div", null, this.state.items == "loading" ?
            React.createElement("div", { className: "loading" }, "Loading")
            :
                React.createElement("div", { className: `` },
                    React.createElement("select", { defaultValue: "", onChange: t => {
                            if (this.state.items == "loading" || t.currentTarget.value == "")
                                return;
                            let selected = this.state.items.get(parseInt(t.currentTarget.value));
                            this.setState(Object.assign({}, this.state, { selection: selected }));
                        } },
                        React.createElement("option", { value: "" }),
                        this.state.items.map((t, t_i) => React.createElement("option", { key: t.Id, value: t_i.toString() }, this.props.render_target(t, t.Id)))),
                    React.createElement("button", { onClick: () => this.props.cancel() }, i18next.t('Cancel')),
                    React.createElement("button", { disabled: this.state.selection == "waiting", onClick: () => this.state.selection != "waiting" &&
                            this.props.ok(this.state.selection) }, i18next.t('Ok'))));
    }
}
exports.AddToRelationDropdown = AddToRelationDropdown;
//# sourceMappingURL=list.js.map