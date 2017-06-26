"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const i18next = require("i18next");
class ToggleContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = { toggled: false };
    }
    render() {
        return React.createElement("div", { className: `toggle-container ${this.state.toggled ? "toggle-container--toggled" : ""} ` },
            React.createElement("a", { className: "toggle-button", onClick: () => this.setState(Object.assign({}, this.state, { toggled: !this.state.toggled })) }, i18next.t(this.props.button_text(this.state.toggled))),
            this.state.toggled ? this.props.content() : null);
    }
}
exports.ToggleContainer = ToggleContainer;
//# sourceMappingURL=toggle_container.js.map