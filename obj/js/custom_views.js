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
class BookmarkComponent extends React.Component {
    constuctor(props, context) {
        this.state = {};
    }
}
exports.BookmarkComponent = BookmarkComponent;
class FavComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = { bookmark: false };
    }
    change_bookmark() {
        if (this.state.bookmark == true) {
            return false;
        }
        return true;
    }
    render() {
        console.log(this.state.bookmark);
        return React.createElement("div", null,
            React.createElement("button", { onClick: () => this.setState(Object.assign({}, this.state, { bookmark: this.change_bookmark() })), style: this.state.bookmark ? {
                    borderColor: 'yellow',
                    backgroundColor: 'yellow',
                    borderWidth: 1,
                    borderRadius: 10,
                    color: 'white',
                } :
                    {
                        borderColor: 'black',
                        borderWidth: 1,
                        borderRadius: 10,
                        color: 'black',
                    }, marginHeight: 10, marginWidth: 10, width: 10, height: 10 }, "Bookmark"));
    }
}
exports.FavComponent = FavComponent;
class StarsComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = { stars: Immutable.List([{ value: 1, state: false }, { value: 2, state: false }, { value: 3, state: false }, { value: 4, state: false }, { value: 5, state: false }]) };
    }
    render() {
        return React.createElement("div", null,
            this.state.stars.map(star => React.createElement("button", { onClick: () => this.setState(Object.assign({}, this.state, { stars: this.state.stars.map(star1 => { if (star1.value <= star.value)
                        return Object.assign({}, star1, { state: true });
                    else
                        return Object.assign({}, star1, { state: false }); }).toList() })), style: star.state ? {
                    borderColor: '#08ABCE',
                    backgroundColor: '#08ABCE',
                    borderWidth: 1,
                    borderRadius: 15,
                    color: 'white',
                } :
                    {
                        borderColor: '#08ABCE',
                        borderWidth: 1,
                        borderRadius: 15,
                        color: '#08ABCE',
                    }, marginHeight: 10, marginWidth: 10, width: 10, height: 10 }, star.value)),
            " ");
    }
}
exports.StarsComponent = StarsComponent;
class CuisineComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = { is_expanded: false };
    }
    update_me(value) {
        this.setState(Object.assign({}, this.state, { is_expanded: value }));
    }
    render() {
        return (React.createElement("span", { style: { marginLeft: 10, marginTop: 10 } },
            !this.state.is_expanded ? React.createElement("button", { onClick: () => this.update_me(true) }, this.props.cuisine.Kind) :
                React.createElement("button", { onClick: () => this.update_me(false) },
                    "Close ",
                    this.props.cuisine.Kind),
            this.state.is_expanded ? React.createElement(Meals, { props: this.props.props, cuisine: this.props.cuisine }) : React.createElement("span", null)));
    }
}
exports.CuisineComponent = CuisineComponent;
class Cuisines extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            cuisines: Immutable.List()
        };
    }
    componentWillMount() {
        this.get_cuisines().then(online_cuisines => this.setState(Object.assign({}, this.state, { cuisines: online_cuisines })));
    }
    get_cuisines() {
        return __awaiter(this, void 0, void 0, function* () {
            let cuisine_page = yield Api.get_Cuisines(0, 100);
            let loaded_cuisines = Immutable.List(cuisine_page.Items.map(r => r.Item));
            for (let i = 1; i < cuisine_page.NumPages; i++) {
                let cuisines = yield Api.get_Cuisines(i, 100);
                loaded_cuisines = loaded_cuisines.concat(Immutable.List(cuisines.Items.map(r => r.Item))).toList();
            }
            return Immutable.List(loaded_cuisines);
        });
    }
    render() {
        return React.createElement("span", null,
            React.createElement("h1", null, "Choose cuisine"),
            React.createElement("view", { style: { flex: 1, flexDirection: 'row' } }, this.state.cuisines.map(r => React.createElement(CuisineComponent, { props: this.props.props, cuisine: r }))));
    }
}
exports.Cuisines = Cuisines;
class MealsComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = { is_expanded: false };
    }
    update_me(value) {
        this.setState(Object.assign({}, this.state, { is_expanded: value }));
    }
    render() {
        return React.createElement("span", { style: { marginLeft: 10, marginTop: 10 } },
            !this.state.is_expanded ? React.createElement("button", { onClick: () => this.update_me(true) }, this.props.meal.Kind) :
                React.createElement("button", { onClick: () => this.update_me(false) },
                    "Close ",
                    this.props.meal.Kind),
            this.state.is_expanded ? React.createElement(Recipes, { props: this.props.props, meal: this.props.meal }) : React.createElement("span", null));
    }
}
exports.MealsComponent = MealsComponent;
class Meals extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            meals: Immutable.List()
        };
    }
    componentWillMount() {
        this.get_meals().then(online_meals => this.setState(Object.assign({}, this.state, { meals: online_meals })));
    }
    get_meals() {
        return __awaiter(this, void 0, void 0, function* () {
            let meal_page = yield Api.get_Cuisine_Cuisine_Meals(this.props.cuisine, 0, 100);
            let loaded_meals = Immutable.List(meal_page.Items.map(r => r.Item));
            for (let i = 1; i < meal_page.NumPages; i++) {
                let meals = yield Api.get_Cuisine_Cuisine_Meals(this.props.cuisine, 0, 100);
                loaded_meals = loaded_meals.concat(Immutable.List(meals.Items.map(r => r.Item))).toList();
            }
            return Immutable.List(loaded_meals);
        });
    }
    render() {
        return React.createElement("div", null,
            React.createElement("div", { style: { marginTop: 10 } }, this.state.meals.map(r => React.createElement(MealsComponent, { props: this.props.props, meal: r }))));
    }
}
exports.Meals = Meals;
class RecipesComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = { is_expanded: false };
    }
    update_me(value) {
        this.setState(Object.assign({}, this.state, { is_expanded: value }));
    }
    render() {
        return React.createElement("div", null,
            " ",
            React.createElement("br", null),
            React.createElement("h2", null, this.props.recipe.Name),
            !this.state.is_expanded ? React.createElement("button", { onClick: () => this.update_me(true) }, "+") :
                React.createElement("button", { onClick: () => this.update_me(false) }, "Close "),
            this.state.is_expanded ? React.createElement(Info, { props: this.props.props, ingredients: this.props.recipe.Ingredients, info: this.props.recipe.Description }) : React.createElement("span", null));
    }
}
exports.RecipesComponent = RecipesComponent;
class Recipes extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            recipes: Immutable.List()
        };
    }
    componentWillMount() {
        this.get_recipes().then(online_recipes => this.setState(Object.assign({}, this.state, { recipes: online_recipes })));
    }
    get_recipes() {
        return __awaiter(this, void 0, void 0, function* () {
            let recipe_page = yield Api.get_Meal_Meal_Recipes(this.props.meal, 0, 100);
            let loaded_recipes = Immutable.List(recipe_page.Items.map(r => r.Item));
            for (let i = 1; i < recipe_page.NumPages; i++) {
                let recipes = yield Api.get_Meal_Meal_Recipes(this.props.meal, 0, 100);
                loaded_recipes = loaded_recipes.concat(Immutable.List(recipes.Items.map(r => r.Item))).toList();
            }
            return Immutable.List(loaded_recipes);
        });
    }
    render() {
        return React.createElement("div", null,
            React.createElement("div", null, this.state.recipes.map(r => React.createElement(RecipesComponent, { props: this.props.props, recipe: r }))));
    }
}
exports.Recipes = Recipes;
class Info extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};
    }
    render() {
        if (this.props.props.current_User == undefined)
            return React.createElement("div", null,
                React.createElement("div", null,
                    React.createElement("h3", null, "Ingredients")),
                React.createElement("div", null, this.props.ingredients),
                React.createElement("br", null),
                React.createElement("div", null,
                    React.createElement("h3", null, "Description")),
                React.createElement("div", null, this.props.info));
        return React.createElement("div", null,
            React.createElement("div", null,
                React.createElement("h3", null, "Ingredients")),
            React.createElement("div", null, this.props.ingredients),
            React.createElement("br", null),
            React.createElement("div", null,
                React.createElement("h3", null, "Description")),
            React.createElement("div", null, this.props.info),
            React.createElement("br", null),
            React.createElement("div", null,
                React.createElement("h3", null, "Rate")),
            React.createElement(StarsComponent, null),
            React.createElement("br", null),
            React.createElement(FavComponent, { props: this.props.props }));
    }
}
exports.Info = Info;
class IComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = { i: 0, j: 1, recipes: Immutable.List() };
    }
    componentWillMount() {
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
        return React.createElement("div", null,
            React.createElement(Cuisines, { props: this.props.props }));
    }
}
exports.default = IComponent;
class BrowseComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            SearchedQuery: "", i: 0, j: 1,
            Items: Immutable.List()
        };
    }
    componentWillMount() {
        this.get_recipes().then(online_recipes => this.setState(Object.assign({}, this.state, { Items: online_recipes.map(recipe => { return { title: recipe.Name, ingredients: recipe.Ingredients, info: recipe.Description, is_expanded: false }; }).toList() })));
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
        return React.createElement("div", null,
            React.createElement("input", { value: this.state.SearchedQuery, onChange: event => this.setState(Object.assign({}, this.state, { SearchedQuery: event.target.value })) }),
            this.state.Items.filter(item => item.title.toLowerCase().includes(this.state.SearchedQuery.toLowerCase()))
                .map(item => React.createElement(ItemComponent, { title: item.title, ingredients: item.ingredients, info: item.info })));
    }
}
exports.BrowseComponent = BrowseComponent;
class ItemComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = { is_expanded: false };
    }
    update_me(value) {
        this.setState(Object.assign({}, this.state, { is_expanded: value }));
    }
    render() {
        return React.createElement("div", null,
            React.createElement("span", null,
                React.createElement("h1", null, this.props.title)),
            this.state.is_expanded ? React.createElement("div", null,
                React.createElement("h2", null, "Ingredients"),
                this.props.ingredients,
                React.createElement("br", null),
                React.createElement("h2", null, "Description"),
                this.props.info,
                React.createElement("br", null),
                React.createElement("h2", null, "Rate"),
                React.createElement("div", null,
                    React.createElement(StarsComponent, null)),
                React.createElement("br", null)) : React.createElement("span", null),
            !this.state.is_expanded ? React.createElement("button", { onClick: () => this.update_me(true) }, "+") :
                React.createElement("button", { onClick: () => this.update_me(false) }, "-"));
    }
}
exports.AppTest = (props) => {
    return React.createElement(IComponent, { props: props });
};
exports.FavouriteView = (props) => React.createElement("div", null,
    React.createElement("div", null, "hello favourite"),
    " ",
    React.createElement("button", null, " Greg "),
    "  ");
exports.BrowseView = (props) => {
    return React.createElement(BrowseComponent, null);
};
exports.RecView = (props) => React.createElement("div", null,
    React.createElement("div", null, " Hello recommendations "));
//# sourceMappingURL=custom_views.js.map