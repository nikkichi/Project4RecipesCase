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
const Api = require("./generated_api");
class IComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = { i: 0, j: 1, recipes: Immutable.List() };
    }
    componentWillMount() {
        var thread = setInterval(() => {
            this.setState(Object.assign({}, this.state, { i: this.state.i + 1 }));
        }, 1000);
        this.get_recipes().then(online_recipes => this.setState(Object.assign({}, this.state, { recipes: online_recipes })));
    }
    get_recipes() {
        return __awaiter(this, void 0, void 0, function* () {
            let recipes_page = yield Api.get_Recipes(0, 100);
            let loaded_recipes = Immutable.List(recipes_page.Items.map(r => r.Item));
            for (let i = 1; i < recipes_page.NumPages; i++) {
                let recipes = yield Api.get_Recipes(i, 100);
                loaded_recipes = loaded_recipes.concat(Immutable.List(recipes.Items.map(r => r.Item))).toList();
            }
            return Immutable.List(loaded_recipes);
        });
    }
    render() {
        console.log(this.props.props);
        if (this.props.props.current_User == undefined)
            return React.createElement("div", null, "Log in first ...");
        return React.createElement("div", null,
            React.createElement("div", null,
                " Hello ",
                this.props.props.current_User.Username),
            React.createElement("div", { id: "recipes" }, this.state.recipes.map(recipe => React.createElement("div", null,
                " ",
                recipe.Name,
                " "))),
            React.createElement("div", null, this.state.i));
    }
}
exports.default = IComponent;
exports.AppTest = (props) => {
    return React.createElement(IComponent, { props: props });
};
exports.FavouriteView = (props) => React.createElement("div", null,
    React.createElement("div", null, "hello favourite"));
exports.BrowseView = (props) => React.createElement("div", null,
    React.createElement("div", null, "Hello recipe"));
//# sourceMappingURL=custom_views.js.map