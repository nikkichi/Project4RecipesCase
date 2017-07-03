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
const Moment = require("moment");
require("whatwg-fetch");
exports.parse_date = (e) => { return Object.assign({}, e, { CreatedDate: Moment.utc(e.CreatedDate) }); };
exports.make_page = (res, parse_other_args) => {
    return {
        Items: res.Items.map((i) => { return Object.assign({}, i, { Item: exports.parse_date(i.Item) }); }).map((i) => { return Object.assign({}, i, { Item: parse_other_args(i.Item) }); }),
        PageIndex: res.PageIndex,
        SearchQuery: res.SearchQuery,
        NumPages: res.NumPages,
        PageSize: res.PageSize,
        TotalCount: res.TotalCount,
        CanCreate: res.CanCreate,
        CanDelete: res.CanDelete
    };
};
function create_Thirty() {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Thirty/`, { method: 'post', credentials: 'include', headers: { 'content-type': 'application/json',
                'X-XSRF-TOKEN': document.getElementsByName("__RequestVerificationToken")[0].value } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return Object.assign({}, json, { CreatedDate: Moment.utc(json.CreatedDate) });
    });
}
exports.create_Thirty = create_Thirty;
function update_Thirty(item) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Thirty/`, { method: 'put',
            body: JSON.stringify(Object.assign({}, item, { CreatedDate: undefined })), credentials: 'include', headers: { 'content-type': 'application/json', 'X-XSRF-TOKEN': document.getElementsByName("__RequestVerificationToken")[0].value } });
        if (!res.ok)
            throw Error(res.statusText);
        return;
    });
}
exports.update_Thirty = update_Thirty;
function delete_Thirty(source) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Thirty/${source.Id}`, { method: 'delete', credentials: 'include', headers: { 'content-type': 'application/json', 'X-XSRF-TOKEN': document.getElementsByName("__RequestVerificationToken")[0].value } });
        if (!res.ok)
            throw Error(res.statusText);
        return;
    });
}
exports.delete_Thirty = delete_Thirty;
function get_Thirty(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Thirty/${id}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return { Item: Object.assign({}, json.Item, { CreatedDate: Moment.utc(json.Item.CreatedDate) }),
            Editable: !!json.Editable, JustCreated: false };
    });
}
exports.get_Thirty = get_Thirty;
function get_Thirties(page_index, page_size, search_query = null) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Thirty?page_index=${page_index}&page_size=${page_size}${(search_query != null ? "&page_size=" + search_query : "")}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return exports.make_page(json, e => { return Object.assign({}, e); });
    });
}
exports.get_Thirties = get_Thirties;
function get_Meal_Cuisine_Meals(source, page_index, page_size, query_string = null) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Meal/${source.Id}/Cuisine_Meals?page_index=${page_index}&page_size=${page_size}${(query_string != null ? "&search_query=" + query_string : "")}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return exports.make_page(json, e => { return Object.assign({}, e); });
    });
}
exports.get_Meal_Cuisine_Meals = get_Meal_Cuisine_Meals;
function get_Meal_Cuisine_Meals_Cuisine(source, page_index, page_size, id) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Meal/${source.Id}/Cuisine_Meals/${id}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return Object.assign({}, json, { CreatedDate: Moment.utc(json.CreatedDate) });
    });
}
exports.get_Meal_Cuisine_Meals_Cuisine = get_Meal_Cuisine_Meals_Cuisine;
function get_Meal_Cuisine_Meals_Cuisine_by_id(source, id) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Meal/${source.Id}/Cuisine_Meals/${id}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return Object.assign({}, json, { CreatedDate: Moment.utc(json.CreatedDate) });
    });
}
exports.get_Meal_Cuisine_Meals_Cuisine_by_id = get_Meal_Cuisine_Meals_Cuisine_by_id;
function get_unlinked_Meal_Cuisine_Meals(source, page_index, page_size) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Meal/${source.Id}/unlinked/Cuisine_Meals?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return exports.make_page(json, e => { return Object.assign({}, e); });
    });
}
exports.get_unlinked_Meal_Cuisine_Meals = get_unlinked_Meal_Cuisine_Meals;
function get_unlinked_Meal_Cuisine_Meals_Asian(source, page_index, page_size) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Meal/${source.Id}/unlinked/Cuisine_Meals/Asian?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return exports.make_page(json, e => { return Object.assign({}, e); });
    });
}
exports.get_unlinked_Meal_Cuisine_Meals_Asian = get_unlinked_Meal_Cuisine_Meals_Asian;
function get_unlinked_Meal_Cuisine_Meals_Mediterranean(source, page_index, page_size) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Meal/${source.Id}/unlinked/Cuisine_Meals/Mediterranean?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return exports.make_page(json, e => { return Object.assign({}, e); });
    });
}
exports.get_unlinked_Meal_Cuisine_Meals_Mediterranean = get_unlinked_Meal_Cuisine_Meals_Mediterranean;
function get_unlinked_Meal_Cuisine_Meals_Grill(source, page_index, page_size) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Meal/${source.Id}/unlinked/Cuisine_Meals/Grill?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return exports.make_page(json, e => { return Object.assign({}, e); });
    });
}
exports.get_unlinked_Meal_Cuisine_Meals_Grill = get_unlinked_Meal_Cuisine_Meals_Grill;
function create_linked_Meal_Cuisine_Meals_Asian(source) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Meal/${source.Id}/Cuisine_Meals_Asian`, { method: 'post', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return json.map(e => { return Object.assign({}, e, { CreatedDate: Moment.utc(e.CreatedDate) }); });
    });
}
exports.create_linked_Meal_Cuisine_Meals_Asian = create_linked_Meal_Cuisine_Meals_Asian;
function create_linked_Meal_Cuisine_Meals_Mediterranean(source) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Meal/${source.Id}/Cuisine_Meals_Mediterranean`, { method: 'post', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return json.map(e => { return Object.assign({}, e, { CreatedDate: Moment.utc(e.CreatedDate) }); });
    });
}
exports.create_linked_Meal_Cuisine_Meals_Mediterranean = create_linked_Meal_Cuisine_Meals_Mediterranean;
function create_linked_Meal_Cuisine_Meals_Grill(source) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Meal/${source.Id}/Cuisine_Meals_Grill`, { method: 'post', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return json.map(e => { return Object.assign({}, e, { CreatedDate: Moment.utc(e.CreatedDate) }); });
    });
}
exports.create_linked_Meal_Cuisine_Meals_Grill = create_linked_Meal_Cuisine_Meals_Grill;
function link_Meal_Cuisine_Meals(source, target) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Meal/${source.Id}/Cuisine_Meals/${target.Id}`, { method: 'post', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        return;
    });
}
exports.link_Meal_Cuisine_Meals = link_Meal_Cuisine_Meals;
function unlink_Meal_Cuisine_Meals(source, target) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Meal/${source.Id}/Cuisine_Meals/${target.Id}`, { method: 'delete', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        return;
    });
}
exports.unlink_Meal_Cuisine_Meals = unlink_Meal_Cuisine_Meals;
function get_Meal_Meal_Recipes(source, page_index, page_size, query_string = null) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Meal/${source.Id}/Meal_Recipes?page_index=${page_index}&page_size=${page_size}${(query_string != null ? "&search_query=" + query_string : "")}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return exports.make_page(json, e => { return Object.assign({}, e); });
    });
}
exports.get_Meal_Meal_Recipes = get_Meal_Meal_Recipes;
function get_Meal_Meal_Recipes_Recipe(source, page_index, page_size, id) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Meal/${source.Id}/Meal_Recipes/${id}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return Object.assign({}, json, { CreatedDate: Moment.utc(json.CreatedDate) });
    });
}
exports.get_Meal_Meal_Recipes_Recipe = get_Meal_Meal_Recipes_Recipe;
function get_Meal_Meal_Recipes_Recipe_by_id(source, id) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Meal/${source.Id}/Meal_Recipes/${id}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return Object.assign({}, json, { CreatedDate: Moment.utc(json.CreatedDate) });
    });
}
exports.get_Meal_Meal_Recipes_Recipe_by_id = get_Meal_Meal_Recipes_Recipe_by_id;
function get_unlinked_Meal_Meal_Recipes(source, page_index, page_size) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Meal/${source.Id}/unlinked/Meal_Recipes?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return exports.make_page(json, e => { return Object.assign({}, e); });
    });
}
exports.get_unlinked_Meal_Meal_Recipes = get_unlinked_Meal_Meal_Recipes;
function create_linked_Meal_Meal_Recipes_Recipe(source) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Meal/${source.Id}/Meal_Recipes_Recipe`, { method: 'post', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return json.map(e => { return Object.assign({}, e, { CreatedDate: Moment.utc(e.CreatedDate) }); });
    });
}
exports.create_linked_Meal_Meal_Recipes_Recipe = create_linked_Meal_Meal_Recipes_Recipe;
function link_Meal_Meal_Recipes(source, target) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Meal/${source.Id}/Meal_Recipes/${target.Id}`, { method: 'post', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        return;
    });
}
exports.link_Meal_Meal_Recipes = link_Meal_Meal_Recipes;
function unlink_Meal_Meal_Recipes(source, target) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Meal/${source.Id}/Meal_Recipes/${target.Id}`, { method: 'delete', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        return;
    });
}
exports.unlink_Meal_Meal_Recipes = unlink_Meal_Meal_Recipes;
function create_Meal() {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Meal/`, { method: 'post', credentials: 'include', headers: { 'content-type': 'application/json',
                'X-XSRF-TOKEN': document.getElementsByName("__RequestVerificationToken")[0].value } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return Object.assign({}, json, { CreatedDate: Moment.utc(json.CreatedDate) });
    });
}
exports.create_Meal = create_Meal;
function update_Meal(item) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = item.Kind == "Lunch" ? yield update_Lunch(item) : item.Kind == "Brunch" ? yield update_Brunch(item) : item.Kind == "Dinner" ? yield update_Dinner(item) : item.Kind == "Breakfast" ? yield update_Breakfast(item) : null;
        return;
    });
}
exports.update_Meal = update_Meal;
function delete_Meal(source) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Meal/${source.Id}`, { method: 'delete', credentials: 'include', headers: { 'content-type': 'application/json', 'X-XSRF-TOKEN': document.getElementsByName("__RequestVerificationToken")[0].value } });
        if (!res.ok)
            throw Error(res.statusText);
        return;
    });
}
exports.delete_Meal = delete_Meal;
function get_Meal(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Meal/${id}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return { Item: Object.assign({}, json.Item, { CreatedDate: Moment.utc(json.Item.CreatedDate) }),
            Editable: !!json.Editable, JustCreated: false };
    });
}
exports.get_Meal = get_Meal;
function get_Meals(page_index, page_size, search_query = null) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Meal?page_index=${page_index}&page_size=${page_size}${(search_query != null ? "&page_size=" + search_query : "")}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return exports.make_page(json, e => { return Object.assign({}, e); });
    });
}
exports.get_Meals = get_Meals;
function create_Asian() {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Asian/`, { method: 'post', credentials: 'include', headers: { 'content-type': 'application/json',
                'X-XSRF-TOKEN': document.getElementsByName("__RequestVerificationToken")[0].value } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return Object.assign({}, json, { CreatedDate: Moment.utc(json.CreatedDate) });
    });
}
exports.create_Asian = create_Asian;
function update_Asian(item) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Asian/`, { method: 'put',
            body: JSON.stringify(Object.assign({}, item, { CreatedDate: undefined })), credentials: 'include', headers: { 'content-type': 'application/json', 'X-XSRF-TOKEN': document.getElementsByName("__RequestVerificationToken")[0].value } });
        if (!res.ok)
            throw Error(res.statusText);
        return;
    });
}
exports.update_Asian = update_Asian;
function delete_Asian(source) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Asian/${source.Id}`, { method: 'delete', credentials: 'include', headers: { 'content-type': 'application/json', 'X-XSRF-TOKEN': document.getElementsByName("__RequestVerificationToken")[0].value } });
        if (!res.ok)
            throw Error(res.statusText);
        return;
    });
}
exports.delete_Asian = delete_Asian;
function get_Asian(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Asian/${id}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return { Item: Object.assign({}, json.Item, { CreatedDate: Moment.utc(json.Item.CreatedDate) }),
            Editable: !!json.Editable, JustCreated: false };
    });
}
exports.get_Asian = get_Asian;
function get_Asians(page_index, page_size, search_query = null) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Asian?page_index=${page_index}&page_size=${page_size}${(search_query != null ? "&page_size=" + search_query : "")}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return exports.make_page(json, e => { return Object.assign({}, e); });
    });
}
exports.get_Asians = get_Asians;
function get_Cuisine_Cuisine_Meals(source, page_index, page_size, query_string = null) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Cuisine/${source.Id}/Cuisine_Meals?page_index=${page_index}&page_size=${page_size}${(query_string != null ? "&search_query=" + query_string : "")}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return exports.make_page(json, e => { return Object.assign({}, e); });
    });
}
exports.get_Cuisine_Cuisine_Meals = get_Cuisine_Cuisine_Meals;
function get_Cuisine_Cuisine_Meals_Meal(source, page_index, page_size, id) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Cuisine/${source.Id}/Cuisine_Meals/${id}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return Object.assign({}, json, { CreatedDate: Moment.utc(json.CreatedDate) });
    });
}
exports.get_Cuisine_Cuisine_Meals_Meal = get_Cuisine_Cuisine_Meals_Meal;
function get_Cuisine_Cuisine_Meals_Meal_by_id(source, id) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Cuisine/${source.Id}/Cuisine_Meals/${id}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return Object.assign({}, json, { CreatedDate: Moment.utc(json.CreatedDate) });
    });
}
exports.get_Cuisine_Cuisine_Meals_Meal_by_id = get_Cuisine_Cuisine_Meals_Meal_by_id;
function get_unlinked_Cuisine_Cuisine_Meals(source, page_index, page_size) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Cuisine/${source.Id}/unlinked/Cuisine_Meals?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return exports.make_page(json, e => { return Object.assign({}, e); });
    });
}
exports.get_unlinked_Cuisine_Cuisine_Meals = get_unlinked_Cuisine_Cuisine_Meals;
function get_unlinked_Cuisine_Cuisine_Meals_Lunch(source, page_index, page_size) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Cuisine/${source.Id}/unlinked/Cuisine_Meals/Lunch?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return exports.make_page(json, e => { return Object.assign({}, e); });
    });
}
exports.get_unlinked_Cuisine_Cuisine_Meals_Lunch = get_unlinked_Cuisine_Cuisine_Meals_Lunch;
function get_unlinked_Cuisine_Cuisine_Meals_Brunch(source, page_index, page_size) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Cuisine/${source.Id}/unlinked/Cuisine_Meals/Brunch?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return exports.make_page(json, e => { return Object.assign({}, e); });
    });
}
exports.get_unlinked_Cuisine_Cuisine_Meals_Brunch = get_unlinked_Cuisine_Cuisine_Meals_Brunch;
function get_unlinked_Cuisine_Cuisine_Meals_Dinner(source, page_index, page_size) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Cuisine/${source.Id}/unlinked/Cuisine_Meals/Dinner?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return exports.make_page(json, e => { return Object.assign({}, e); });
    });
}
exports.get_unlinked_Cuisine_Cuisine_Meals_Dinner = get_unlinked_Cuisine_Cuisine_Meals_Dinner;
function get_unlinked_Cuisine_Cuisine_Meals_Breakfast(source, page_index, page_size) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Cuisine/${source.Id}/unlinked/Cuisine_Meals/Breakfast?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return exports.make_page(json, e => { return Object.assign({}, e); });
    });
}
exports.get_unlinked_Cuisine_Cuisine_Meals_Breakfast = get_unlinked_Cuisine_Cuisine_Meals_Breakfast;
function create_linked_Cuisine_Cuisine_Meals_Lunch(source) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Cuisine/${source.Id}/Cuisine_Meals_Lunch`, { method: 'post', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return json.map(e => { return Object.assign({}, e, { CreatedDate: Moment.utc(e.CreatedDate) }); });
    });
}
exports.create_linked_Cuisine_Cuisine_Meals_Lunch = create_linked_Cuisine_Cuisine_Meals_Lunch;
function create_linked_Cuisine_Cuisine_Meals_Brunch(source) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Cuisine/${source.Id}/Cuisine_Meals_Brunch`, { method: 'post', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return json.map(e => { return Object.assign({}, e, { CreatedDate: Moment.utc(e.CreatedDate) }); });
    });
}
exports.create_linked_Cuisine_Cuisine_Meals_Brunch = create_linked_Cuisine_Cuisine_Meals_Brunch;
function create_linked_Cuisine_Cuisine_Meals_Dinner(source) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Cuisine/${source.Id}/Cuisine_Meals_Dinner`, { method: 'post', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return json.map(e => { return Object.assign({}, e, { CreatedDate: Moment.utc(e.CreatedDate) }); });
    });
}
exports.create_linked_Cuisine_Cuisine_Meals_Dinner = create_linked_Cuisine_Cuisine_Meals_Dinner;
function create_linked_Cuisine_Cuisine_Meals_Breakfast(source) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Cuisine/${source.Id}/Cuisine_Meals_Breakfast`, { method: 'post', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return json.map(e => { return Object.assign({}, e, { CreatedDate: Moment.utc(e.CreatedDate) }); });
    });
}
exports.create_linked_Cuisine_Cuisine_Meals_Breakfast = create_linked_Cuisine_Cuisine_Meals_Breakfast;
function link_Cuisine_Cuisine_Meals(source, target) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Cuisine/${source.Id}/Cuisine_Meals/${target.Id}`, { method: 'post', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        return;
    });
}
exports.link_Cuisine_Cuisine_Meals = link_Cuisine_Cuisine_Meals;
function unlink_Cuisine_Cuisine_Meals(source, target) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Cuisine/${source.Id}/Cuisine_Meals/${target.Id}`, { method: 'delete', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        return;
    });
}
exports.unlink_Cuisine_Cuisine_Meals = unlink_Cuisine_Cuisine_Meals;
function create_Cuisine() {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Cuisine/`, { method: 'post', credentials: 'include', headers: { 'content-type': 'application/json',
                'X-XSRF-TOKEN': document.getElementsByName("__RequestVerificationToken")[0].value } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return Object.assign({}, json, { CreatedDate: Moment.utc(json.CreatedDate) });
    });
}
exports.create_Cuisine = create_Cuisine;
function update_Cuisine(item) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = item.Kind == "Asian" ? yield update_Asian(item) : item.Kind == "Mediterranean" ? yield update_Mediterranean(item) : item.Kind == "Grill" ? yield update_Grill(item) : null;
        return;
    });
}
exports.update_Cuisine = update_Cuisine;
function delete_Cuisine(source) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Cuisine/${source.Id}`, { method: 'delete', credentials: 'include', headers: { 'content-type': 'application/json', 'X-XSRF-TOKEN': document.getElementsByName("__RequestVerificationToken")[0].value } });
        if (!res.ok)
            throw Error(res.statusText);
        return;
    });
}
exports.delete_Cuisine = delete_Cuisine;
function get_Cuisine(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Cuisine/${id}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return { Item: Object.assign({}, json.Item, { CreatedDate: Moment.utc(json.Item.CreatedDate) }),
            Editable: !!json.Editable, JustCreated: false };
    });
}
exports.get_Cuisine = get_Cuisine;
function get_Cuisines(page_index, page_size, search_query = null) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Cuisine?page_index=${page_index}&page_size=${page_size}${(search_query != null ? "&page_size=" + search_query : "")}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return exports.make_page(json, e => { return Object.assign({}, e); });
    });
}
exports.get_Cuisines = get_Cuisines;
function get_PreparationTime_PreparationTime_Recipes(source, page_index, page_size, query_string = null) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/PreparationTime/${source.Id}/PreparationTime_Recipes?page_index=${page_index}&page_size=${page_size}${(query_string != null ? "&search_query=" + query_string : "")}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return exports.make_page(json, e => { return Object.assign({}, e); });
    });
}
exports.get_PreparationTime_PreparationTime_Recipes = get_PreparationTime_PreparationTime_Recipes;
function get_PreparationTime_PreparationTime_Recipes_Recipe(source, page_index, page_size, id) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/PreparationTime/${source.Id}/PreparationTime_Recipes/${id}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return Object.assign({}, json, { CreatedDate: Moment.utc(json.CreatedDate) });
    });
}
exports.get_PreparationTime_PreparationTime_Recipes_Recipe = get_PreparationTime_PreparationTime_Recipes_Recipe;
function get_PreparationTime_PreparationTime_Recipes_Recipe_by_id(source, id) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/PreparationTime/${source.Id}/PreparationTime_Recipes/${id}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return Object.assign({}, json, { CreatedDate: Moment.utc(json.CreatedDate) });
    });
}
exports.get_PreparationTime_PreparationTime_Recipes_Recipe_by_id = get_PreparationTime_PreparationTime_Recipes_Recipe_by_id;
function get_unlinked_PreparationTime_PreparationTime_Recipes(source, page_index, page_size) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/PreparationTime/${source.Id}/unlinked/PreparationTime_Recipes?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return exports.make_page(json, e => { return Object.assign({}, e); });
    });
}
exports.get_unlinked_PreparationTime_PreparationTime_Recipes = get_unlinked_PreparationTime_PreparationTime_Recipes;
function create_linked_PreparationTime_PreparationTime_Recipes_Recipe(source) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/PreparationTime/${source.Id}/PreparationTime_Recipes_Recipe`, { method: 'post', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return json.map(e => { return Object.assign({}, e, { CreatedDate: Moment.utc(e.CreatedDate) }); });
    });
}
exports.create_linked_PreparationTime_PreparationTime_Recipes_Recipe = create_linked_PreparationTime_PreparationTime_Recipes_Recipe;
function link_PreparationTime_PreparationTime_Recipes(source, target) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/PreparationTime/${source.Id}/PreparationTime_Recipes/${target.Id}`, { method: 'post', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        return;
    });
}
exports.link_PreparationTime_PreparationTime_Recipes = link_PreparationTime_PreparationTime_Recipes;
function unlink_PreparationTime_PreparationTime_Recipes(source, target) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/PreparationTime/${source.Id}/PreparationTime_Recipes/${target.Id}`, { method: 'delete', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        return;
    });
}
exports.unlink_PreparationTime_PreparationTime_Recipes = unlink_PreparationTime_PreparationTime_Recipes;
function create_PreparationTime() {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/PreparationTime/`, { method: 'post', credentials: 'include', headers: { 'content-type': 'application/json',
                'X-XSRF-TOKEN': document.getElementsByName("__RequestVerificationToken")[0].value } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return Object.assign({}, json, { CreatedDate: Moment.utc(json.CreatedDate) });
    });
}
exports.create_PreparationTime = create_PreparationTime;
function update_PreparationTime(item) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = item.Kind == "Thirty" ? yield update_Thirty(item) : item.Kind == "Sixty" ? yield update_Sixty(item) : item.Kind == "Ninety" ? yield update_Ninety(item) : item.Kind == "Fifteen" ? yield update_Fifteen(item) : null;
        return;
    });
}
exports.update_PreparationTime = update_PreparationTime;
function delete_PreparationTime(source) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/PreparationTime/${source.Id}`, { method: 'delete', credentials: 'include', headers: { 'content-type': 'application/json', 'X-XSRF-TOKEN': document.getElementsByName("__RequestVerificationToken")[0].value } });
        if (!res.ok)
            throw Error(res.statusText);
        return;
    });
}
exports.delete_PreparationTime = delete_PreparationTime;
function get_PreparationTime(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/PreparationTime/${id}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return { Item: Object.assign({}, json.Item, { CreatedDate: Moment.utc(json.Item.CreatedDate) }),
            Editable: !!json.Editable, JustCreated: false };
    });
}
exports.get_PreparationTime = get_PreparationTime;
function get_PreparationTimes(page_index, page_size, search_query = null) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/PreparationTime?page_index=${page_index}&page_size=${page_size}${(search_query != null ? "&page_size=" + search_query : "")}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return exports.make_page(json, e => { return Object.assign({}, e); });
    });
}
exports.get_PreparationTimes = get_PreparationTimes;
function create_Sixty() {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Sixty/`, { method: 'post', credentials: 'include', headers: { 'content-type': 'application/json',
                'X-XSRF-TOKEN': document.getElementsByName("__RequestVerificationToken")[0].value } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return Object.assign({}, json, { CreatedDate: Moment.utc(json.CreatedDate) });
    });
}
exports.create_Sixty = create_Sixty;
function update_Sixty(item) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Sixty/`, { method: 'put',
            body: JSON.stringify(Object.assign({}, item, { CreatedDate: undefined })), credentials: 'include', headers: { 'content-type': 'application/json', 'X-XSRF-TOKEN': document.getElementsByName("__RequestVerificationToken")[0].value } });
        if (!res.ok)
            throw Error(res.statusText);
        return;
    });
}
exports.update_Sixty = update_Sixty;
function delete_Sixty(source) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Sixty/${source.Id}`, { method: 'delete', credentials: 'include', headers: { 'content-type': 'application/json', 'X-XSRF-TOKEN': document.getElementsByName("__RequestVerificationToken")[0].value } });
        if (!res.ok)
            throw Error(res.statusText);
        return;
    });
}
exports.delete_Sixty = delete_Sixty;
function get_Sixty(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Sixty/${id}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return { Item: Object.assign({}, json.Item, { CreatedDate: Moment.utc(json.Item.CreatedDate) }),
            Editable: !!json.Editable, JustCreated: false };
    });
}
exports.get_Sixty = get_Sixty;
function get_Sixties(page_index, page_size, search_query = null) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Sixty?page_index=${page_index}&page_size=${page_size}${(search_query != null ? "&page_size=" + search_query : "")}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return exports.make_page(json, e => { return Object.assign({}, e); });
    });
}
exports.get_Sixties = get_Sixties;
function get_RecommendationPage_User_RecommendationPages(source, page_index, page_size, query_string = null) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/RecommendationPage/${source.Id}/User_RecommendationPages?page_index=${page_index}&page_size=${page_size}${(query_string != null ? "&search_query=" + query_string : "")}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return exports.make_page(json, e => { return Object.assign({}, e); });
    });
}
exports.get_RecommendationPage_User_RecommendationPages = get_RecommendationPage_User_RecommendationPages;
function get_RecommendationPage_User_RecommendationPages_User(source, page_index, page_size, id) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/RecommendationPage/${source.Id}/User_RecommendationPages/${id}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return Object.assign({}, json, { CreatedDate: Moment.utc(json.CreatedDate) });
    });
}
exports.get_RecommendationPage_User_RecommendationPages_User = get_RecommendationPage_User_RecommendationPages_User;
function get_RecommendationPage_User_RecommendationPages_User_by_id(source, id) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/RecommendationPage/${source.Id}/User_RecommendationPages/${id}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return Object.assign({}, json, { CreatedDate: Moment.utc(json.CreatedDate) });
    });
}
exports.get_RecommendationPage_User_RecommendationPages_User_by_id = get_RecommendationPage_User_RecommendationPages_User_by_id;
function get_unlinked_RecommendationPage_User_RecommendationPages(source, page_index, page_size) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/RecommendationPage/${source.Id}/unlinked/User_RecommendationPages?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return exports.make_page(json, e => { return Object.assign({}, e); });
    });
}
exports.get_unlinked_RecommendationPage_User_RecommendationPages = get_unlinked_RecommendationPage_User_RecommendationPages;
function create_linked_RecommendationPage_User_RecommendationPages_User(source) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/RecommendationPage/${source.Id}/User_RecommendationPages_User`, { method: 'post', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return json.map(e => { return Object.assign({}, e, { CreatedDate: Moment.utc(e.CreatedDate) }); });
    });
}
exports.create_linked_RecommendationPage_User_RecommendationPages_User = create_linked_RecommendationPage_User_RecommendationPages_User;
function link_RecommendationPage_User_RecommendationPages(source, target) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/RecommendationPage/${source.Id}/User_RecommendationPages/${target.Id}`, { method: 'post', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        return;
    });
}
exports.link_RecommendationPage_User_RecommendationPages = link_RecommendationPage_User_RecommendationPages;
function unlink_RecommendationPage_User_RecommendationPages(source, target) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/RecommendationPage/${source.Id}/User_RecommendationPages/${target.Id}`, { method: 'delete', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        return;
    });
}
exports.unlink_RecommendationPage_User_RecommendationPages = unlink_RecommendationPage_User_RecommendationPages;
function get_RecommendationPage_RecommendationPage_Recipes(source, page_index, page_size, query_string = null) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/RecommendationPage/${source.Id}/RecommendationPage_Recipes?page_index=${page_index}&page_size=${page_size}${(query_string != null ? "&search_query=" + query_string : "")}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return exports.make_page(json, e => { return Object.assign({}, e); });
    });
}
exports.get_RecommendationPage_RecommendationPage_Recipes = get_RecommendationPage_RecommendationPage_Recipes;
function get_RecommendationPage_RecommendationPage_Recipes_Recipe(source, page_index, page_size, id) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/RecommendationPage/${source.Id}/RecommendationPage_Recipes/${id}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return Object.assign({}, json, { CreatedDate: Moment.utc(json.CreatedDate) });
    });
}
exports.get_RecommendationPage_RecommendationPage_Recipes_Recipe = get_RecommendationPage_RecommendationPage_Recipes_Recipe;
function get_RecommendationPage_RecommendationPage_Recipes_Recipe_by_id(source, id) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/RecommendationPage/${source.Id}/RecommendationPage_Recipes/${id}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return Object.assign({}, json, { CreatedDate: Moment.utc(json.CreatedDate) });
    });
}
exports.get_RecommendationPage_RecommendationPage_Recipes_Recipe_by_id = get_RecommendationPage_RecommendationPage_Recipes_Recipe_by_id;
function get_unlinked_RecommendationPage_RecommendationPage_Recipes(source, page_index, page_size) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/RecommendationPage/${source.Id}/unlinked/RecommendationPage_Recipes?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return exports.make_page(json, e => { return Object.assign({}, e); });
    });
}
exports.get_unlinked_RecommendationPage_RecommendationPage_Recipes = get_unlinked_RecommendationPage_RecommendationPage_Recipes;
function create_linked_RecommendationPage_RecommendationPage_Recipes_Recipe(source) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/RecommendationPage/${source.Id}/RecommendationPage_Recipes_Recipe`, { method: 'post', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return json.map(e => { return Object.assign({}, e, { CreatedDate: Moment.utc(e.CreatedDate) }); });
    });
}
exports.create_linked_RecommendationPage_RecommendationPage_Recipes_Recipe = create_linked_RecommendationPage_RecommendationPage_Recipes_Recipe;
function link_RecommendationPage_RecommendationPage_Recipes(source, target) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/RecommendationPage/${source.Id}/RecommendationPage_Recipes/${target.Id}`, { method: 'post', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        return;
    });
}
exports.link_RecommendationPage_RecommendationPage_Recipes = link_RecommendationPage_RecommendationPage_Recipes;
function unlink_RecommendationPage_RecommendationPage_Recipes(source, target) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/RecommendationPage/${source.Id}/RecommendationPage_Recipes/${target.Id}`, { method: 'delete', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        return;
    });
}
exports.unlink_RecommendationPage_RecommendationPage_Recipes = unlink_RecommendationPage_RecommendationPage_Recipes;
function create_RecommendationPage() {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/RecommendationPage/`, { method: 'post', credentials: 'include', headers: { 'content-type': 'application/json',
                'X-XSRF-TOKEN': document.getElementsByName("__RequestVerificationToken")[0].value } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return Object.assign({}, json, { CreatedDate: Moment.utc(json.CreatedDate) });
    });
}
exports.create_RecommendationPage = create_RecommendationPage;
function update_RecommendationPage(item) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/RecommendationPage/`, { method: 'put',
            body: JSON.stringify(Object.assign({}, item, { CreatedDate: undefined })), credentials: 'include', headers: { 'content-type': 'application/json', 'X-XSRF-TOKEN': document.getElementsByName("__RequestVerificationToken")[0].value } });
        if (!res.ok)
            throw Error(res.statusText);
        return;
    });
}
exports.update_RecommendationPage = update_RecommendationPage;
function delete_RecommendationPage(source) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/RecommendationPage/${source.Id}`, { method: 'delete', credentials: 'include', headers: { 'content-type': 'application/json', 'X-XSRF-TOKEN': document.getElementsByName("__RequestVerificationToken")[0].value } });
        if (!res.ok)
            throw Error(res.statusText);
        return;
    });
}
exports.delete_RecommendationPage = delete_RecommendationPage;
function get_RecommendationPage(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/RecommendationPage/${id}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return { Item: Object.assign({}, json.Item, { CreatedDate: Moment.utc(json.Item.CreatedDate) }),
            Editable: !!json.Editable, JustCreated: false };
    });
}
exports.get_RecommendationPage = get_RecommendationPage;
function get_RecommendationPages(page_index, page_size, search_query = null) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/RecommendationPage?page_index=${page_index}&page_size=${page_size}${(search_query != null ? "&page_size=" + search_query : "")}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return exports.make_page(json, e => { return Object.assign({}, e); });
    });
}
exports.get_RecommendationPages = get_RecommendationPages;
function create_Favourite() {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Favourite/`, { method: 'post', credentials: 'include', headers: { 'content-type': 'application/json',
                'X-XSRF-TOKEN': document.getElementsByName("__RequestVerificationToken")[0].value } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return Object.assign({}, json, { CreatedDate: Moment.utc(json.CreatedDate) });
    });
}
exports.create_Favourite = create_Favourite;
function update_Favourite(item) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Favourite/`, { method: 'put',
            body: JSON.stringify(Object.assign({}, item, { CreatedDate: undefined })), credentials: 'include', headers: { 'content-type': 'application/json', 'X-XSRF-TOKEN': document.getElementsByName("__RequestVerificationToken")[0].value } });
        if (!res.ok)
            throw Error(res.statusText);
        return;
    });
}
exports.update_Favourite = update_Favourite;
function delete_Favourite(source) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Favourite/${source.Id}`, { method: 'delete', credentials: 'include', headers: { 'content-type': 'application/json', 'X-XSRF-TOKEN': document.getElementsByName("__RequestVerificationToken")[0].value } });
        if (!res.ok)
            throw Error(res.statusText);
        return;
    });
}
exports.delete_Favourite = delete_Favourite;
function get_Favourite(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Favourite/${id}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return { Item: Object.assign({}, json.Item, { CreatedDate: Moment.utc(json.Item.CreatedDate) }),
            Editable: !!json.Editable, JustCreated: false };
    });
}
exports.get_Favourite = get_Favourite;
function get_Favourites(page_index, page_size, search_query = null) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Favourite?page_index=${page_index}&page_size=${page_size}${(search_query != null ? "&page_size=" + search_query : "")}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return exports.make_page(json, e => { return Object.assign({}, e); });
    });
}
exports.get_Favourites = get_Favourites;
function create_Browse() {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Browse/`, { method: 'post', credentials: 'include', headers: { 'content-type': 'application/json',
                'X-XSRF-TOKEN': document.getElementsByName("__RequestVerificationToken")[0].value } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return Object.assign({}, json, { CreatedDate: Moment.utc(json.CreatedDate) });
    });
}
exports.create_Browse = create_Browse;
function update_Browse(item) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Browse/`, { method: 'put',
            body: JSON.stringify(Object.assign({}, item, { CreatedDate: undefined })), credentials: 'include', headers: { 'content-type': 'application/json', 'X-XSRF-TOKEN': document.getElementsByName("__RequestVerificationToken")[0].value } });
        if (!res.ok)
            throw Error(res.statusText);
        return;
    });
}
exports.update_Browse = update_Browse;
function delete_Browse(source) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Browse/${source.Id}`, { method: 'delete', credentials: 'include', headers: { 'content-type': 'application/json', 'X-XSRF-TOKEN': document.getElementsByName("__RequestVerificationToken")[0].value } });
        if (!res.ok)
            throw Error(res.statusText);
        return;
    });
}
exports.delete_Browse = delete_Browse;
function get_Browse(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Browse/${id}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return { Item: Object.assign({}, json.Item, { CreatedDate: Moment.utc(json.Item.CreatedDate) }),
            Editable: !!json.Editable, JustCreated: false };
    });
}
exports.get_Browse = get_Browse;
function get_Browses(page_index, page_size, search_query = null) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Browse?page_index=${page_index}&page_size=${page_size}${(search_query != null ? "&page_size=" + search_query : "")}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return exports.make_page(json, e => { return Object.assign({}, e); });
    });
}
exports.get_Browses = get_Browses;
function create_Lunch() {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Lunch/`, { method: 'post', credentials: 'include', headers: { 'content-type': 'application/json',
                'X-XSRF-TOKEN': document.getElementsByName("__RequestVerificationToken")[0].value } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return Object.assign({}, json, { CreatedDate: Moment.utc(json.CreatedDate) });
    });
}
exports.create_Lunch = create_Lunch;
function update_Lunch(item) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Lunch/`, { method: 'put',
            body: JSON.stringify(Object.assign({}, item, { CreatedDate: undefined })), credentials: 'include', headers: { 'content-type': 'application/json', 'X-XSRF-TOKEN': document.getElementsByName("__RequestVerificationToken")[0].value } });
        if (!res.ok)
            throw Error(res.statusText);
        return;
    });
}
exports.update_Lunch = update_Lunch;
function delete_Lunch(source) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Lunch/${source.Id}`, { method: 'delete', credentials: 'include', headers: { 'content-type': 'application/json', 'X-XSRF-TOKEN': document.getElementsByName("__RequestVerificationToken")[0].value } });
        if (!res.ok)
            throw Error(res.statusText);
        return;
    });
}
exports.delete_Lunch = delete_Lunch;
function get_Lunch(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Lunch/${id}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return { Item: Object.assign({}, json.Item, { CreatedDate: Moment.utc(json.Item.CreatedDate) }),
            Editable: !!json.Editable, JustCreated: false };
    });
}
exports.get_Lunch = get_Lunch;
function get_Lunches(page_index, page_size, search_query = null) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Lunch?page_index=${page_index}&page_size=${page_size}${(search_query != null ? "&page_size=" + search_query : "")}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return exports.make_page(json, e => { return Object.assign({}, e); });
    });
}
exports.get_Lunches = get_Lunches;
function get_User_User_Recipes(source, page_index, page_size, query_string = null) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/User/${source.Id}/User_Recipes?page_index=${page_index}&page_size=${page_size}${(query_string != null ? "&search_query=" + query_string : "")}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return exports.make_page(json, e => { return Object.assign({}, e); });
    });
}
exports.get_User_User_Recipes = get_User_User_Recipes;
function get_User_User_Recipes_Recipe(source, page_index, page_size, id) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/User/${source.Id}/User_Recipes/${id}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return Object.assign({}, json, { CreatedDate: Moment.utc(json.CreatedDate) });
    });
}
exports.get_User_User_Recipes_Recipe = get_User_User_Recipes_Recipe;
function get_User_User_Recipes_Recipe_by_id(source, id) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/User/${source.Id}/User_Recipes/${id}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return Object.assign({}, json, { CreatedDate: Moment.utc(json.CreatedDate) });
    });
}
exports.get_User_User_Recipes_Recipe_by_id = get_User_User_Recipes_Recipe_by_id;
function get_unlinked_User_User_Recipes(source, page_index, page_size) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/User/${source.Id}/unlinked/User_Recipes?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return exports.make_page(json, e => { return Object.assign({}, e); });
    });
}
exports.get_unlinked_User_User_Recipes = get_unlinked_User_User_Recipes;
function create_linked_User_User_Recipes_Recipe(source) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/User/${source.Id}/User_Recipes_Recipe`, { method: 'post', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return json.map(e => { return Object.assign({}, e, { CreatedDate: Moment.utc(e.CreatedDate) }); });
    });
}
exports.create_linked_User_User_Recipes_Recipe = create_linked_User_User_Recipes_Recipe;
function link_User_User_Recipes(source, target) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/User/${source.Id}/User_Recipes/${target.Id}`, { method: 'post', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        return;
    });
}
exports.link_User_User_Recipes = link_User_User_Recipes;
function unlink_User_User_Recipes(source, target) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/User/${source.Id}/User_Recipes/${target.Id}`, { method: 'delete', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        return;
    });
}
exports.unlink_User_User_Recipes = unlink_User_User_Recipes;
function get_User_User_RecommendationPages(source, page_index, page_size, query_string = null) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/User/${source.Id}/User_RecommendationPages?page_index=${page_index}&page_size=${page_size}${(query_string != null ? "&search_query=" + query_string : "")}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return exports.make_page(json, e => { return Object.assign({}, e); });
    });
}
exports.get_User_User_RecommendationPages = get_User_User_RecommendationPages;
function get_User_User_RecommendationPages_RecommendationPage(source, page_index, page_size, id) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/User/${source.Id}/User_RecommendationPages/${id}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return Object.assign({}, json, { CreatedDate: Moment.utc(json.CreatedDate) });
    });
}
exports.get_User_User_RecommendationPages_RecommendationPage = get_User_User_RecommendationPages_RecommendationPage;
function get_User_User_RecommendationPages_RecommendationPage_by_id(source, id) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/User/${source.Id}/User_RecommendationPages/${id}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return Object.assign({}, json, { CreatedDate: Moment.utc(json.CreatedDate) });
    });
}
exports.get_User_User_RecommendationPages_RecommendationPage_by_id = get_User_User_RecommendationPages_RecommendationPage_by_id;
function get_unlinked_User_User_RecommendationPages(source, page_index, page_size) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/User/${source.Id}/unlinked/User_RecommendationPages?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return exports.make_page(json, e => { return Object.assign({}, e); });
    });
}
exports.get_unlinked_User_User_RecommendationPages = get_unlinked_User_User_RecommendationPages;
function create_linked_User_User_RecommendationPages_RecommendationPage(source) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/User/${source.Id}/User_RecommendationPages_RecommendationPage`, { method: 'post', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return json.map(e => { return Object.assign({}, e, { CreatedDate: Moment.utc(e.CreatedDate) }); });
    });
}
exports.create_linked_User_User_RecommendationPages_RecommendationPage = create_linked_User_User_RecommendationPages_RecommendationPage;
function link_User_User_RecommendationPages(source, target) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/User/${source.Id}/User_RecommendationPages/${target.Id}`, { method: 'post', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        return;
    });
}
exports.link_User_User_RecommendationPages = link_User_User_RecommendationPages;
function unlink_User_User_RecommendationPages(source, target) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/User/${source.Id}/User_RecommendationPages/${target.Id}`, { method: 'delete', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        return;
    });
}
exports.unlink_User_User_RecommendationPages = unlink_User_User_RecommendationPages;
function create_User() {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/User/`, { method: 'post', credentials: 'include', headers: { 'content-type': 'application/json',
                'X-XSRF-TOKEN': document.getElementsByName("__RequestVerificationToken")[0].value } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return Object.assign({}, json, { CreatedDate: Moment.utc(json.CreatedDate) });
    });
}
exports.create_User = create_User;
function update_User(item) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/User/`, { method: 'put',
            body: JSON.stringify(Object.assign({}, item, { CreatedDate: undefined })), credentials: 'include', headers: { 'content-type': 'application/json', 'X-XSRF-TOKEN': document.getElementsByName("__RequestVerificationToken")[0].value } });
        if (!res.ok)
            throw Error(res.statusText);
        return;
    });
}
exports.update_User = update_User;
function delete_User(source) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/User/${source.Id}`, { method: 'delete', credentials: 'include', headers: { 'content-type': 'application/json', 'X-XSRF-TOKEN': document.getElementsByName("__RequestVerificationToken")[0].value } });
        if (!res.ok)
            throw Error(res.statusText);
        return;
    });
}
exports.delete_User = delete_User;
function get_User(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/User/${id}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return { Item: Object.assign({}, json.Item, { CreatedDate: Moment.utc(json.Item.CreatedDate) }),
            Editable: !!json.Editable, JustCreated: false };
    });
}
exports.get_User = get_User;
function get_Users(page_index, page_size, search_query = null) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/User?page_index=${page_index}&page_size=${page_size}${(search_query != null ? "&page_size=" + search_query : "")}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return exports.make_page(json, e => { return Object.assign({}, e); });
    });
}
exports.get_Users = get_Users;
function delete_User_sessions() {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/User/DeleteSessions`, { method: 'post', credentials: 'include',
            headers: { 'content-type': 'application/json',
                'X-XSRF-TOKEN': document.getElementsByName("__RequestVerificationToken")[0].value } });
        return;
    });
}
exports.delete_User_sessions = delete_User_sessions;
function active_User_sessions() {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/User/ActiveSessions`, { method: 'post', credentials: 'include',
            headers: { 'content-type': 'application/json',
                'X-XSRF-TOKEN': document.getElementsByName("__RequestVerificationToken")[0].value } });
        if (!res.ok)
            return [];
        let json = yield res.json();
        return json;
    });
}
exports.active_User_sessions = active_User_sessions;
function validate_User(username, email, email_confirmation) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/User/Validate`, { method: 'post', credentials: 'include',
            body: JSON.stringify({ Username: username, Email: email, EmailConfirmation: email_confirmation }),
            headers: { 'content-type': 'application/json',
                'X-XSRF-TOKEN': document.getElementsByName("__RequestVerificationToken")[0].value } });
        if (!res.ok)
            return false;
        let json = yield res.json();
        return !!json;
    });
}
exports.validate_User = validate_User;
function register_User(username, email, email_confirmation) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/User/Register`, { method: 'post', credentials: 'include',
            body: JSON.stringify({ Username: username, Email: email, EmailConfirmation: email_confirmation }),
            headers: { 'content-type': 'application/json',
                'X-XSRF-TOKEN': document.getElementsByName("__RequestVerificationToken")[0].value } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return Object.assign({}, json, { CreatedDate: new Date(json.CreatedDate) });
    });
}
exports.register_User = register_User;
function login_User(username, email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/User/Login`, { method: 'post', credentials: 'include',
            body: JSON.stringify({ Username: username, Email: email, Password: password }),
            headers: { 'content-type': 'application/json',
                'X-XSRF-TOKEN': document.getElementsByName("__RequestVerificationToken")[0].value } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return Object.assign({}, json, { CreatedDate: new Date(json.CreatedDate) });
    });
}
exports.login_User = login_User;
function logout_User() {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/User/Logout`, { method: 'post', credentials: 'include',
            headers: { 'content-type': 'application/json',
                'X-XSRF-TOKEN': document.getElementsByName("__RequestVerificationToken")[0].value } });
        if (!res.ok)
            throw Error(res.statusText);
        return;
    });
}
exports.logout_User = logout_User;
function change_User_password(username, email, password, new_password, new_password_confirmation) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/User/ChangePassword`, { method: 'post', credentials: 'include',
            body: JSON.stringify({ Username: username, Email: email, Password: password, NewPassword: new_password, NewPasswordConfirmation: new_password_confirmation }),
            headers: { 'content-type': 'application/json',
                'X-XSRF-TOKEN': document.getElementsByName("__RequestVerificationToken")[0].value } });
        if (!res.ok)
            throw Error(res.statusText);
        return;
    });
}
exports.change_User_password = change_User_password;
function reset_User_password(username, email) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/User/ResetPassword`, { method: 'post', credentials: 'include',
            body: JSON.stringify({ Username: username, Email: email }),
            headers: { 'content-type': 'application/json',
                'X-XSRF-TOKEN': document.getElementsByName("__RequestVerificationToken")[0].value } });
        if (!res.ok)
            throw Error(res.statusText);
        return;
    });
}
exports.reset_User_password = reset_User_password;
function create_Homepage() {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Homepage/`, { method: 'post', credentials: 'include', headers: { 'content-type': 'application/json',
                'X-XSRF-TOKEN': document.getElementsByName("__RequestVerificationToken")[0].value } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return Object.assign({}, json, { CreatedDate: Moment.utc(json.CreatedDate) });
    });
}
exports.create_Homepage = create_Homepage;
function update_Homepage(item) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Homepage/`, { method: 'put',
            body: JSON.stringify(Object.assign({}, item, { CreatedDate: undefined })), credentials: 'include', headers: { 'content-type': 'application/json', 'X-XSRF-TOKEN': document.getElementsByName("__RequestVerificationToken")[0].value } });
        if (!res.ok)
            throw Error(res.statusText);
        return;
    });
}
exports.update_Homepage = update_Homepage;
function delete_Homepage(source) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Homepage/${source.Id}`, { method: 'delete', credentials: 'include', headers: { 'content-type': 'application/json', 'X-XSRF-TOKEN': document.getElementsByName("__RequestVerificationToken")[0].value } });
        if (!res.ok)
            throw Error(res.statusText);
        return;
    });
}
exports.delete_Homepage = delete_Homepage;
function get_Homepage(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Homepage/${id}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return { Item: Object.assign({}, json.Item, { CreatedDate: Moment.utc(json.Item.CreatedDate) }),
            Editable: !!json.Editable, JustCreated: false };
    });
}
exports.get_Homepage = get_Homepage;
function get_Homepages(page_index, page_size, search_query = null) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Homepage?page_index=${page_index}&page_size=${page_size}${(search_query != null ? "&page_size=" + search_query : "")}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return exports.make_page(json, e => { return Object.assign({}, e); });
    });
}
exports.get_Homepages = get_Homepages;
function create_Brunch() {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Brunch/`, { method: 'post', credentials: 'include', headers: { 'content-type': 'application/json',
                'X-XSRF-TOKEN': document.getElementsByName("__RequestVerificationToken")[0].value } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return Object.assign({}, json, { CreatedDate: Moment.utc(json.CreatedDate) });
    });
}
exports.create_Brunch = create_Brunch;
function update_Brunch(item) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Brunch/`, { method: 'put',
            body: JSON.stringify(Object.assign({}, item, { CreatedDate: undefined })), credentials: 'include', headers: { 'content-type': 'application/json', 'X-XSRF-TOKEN': document.getElementsByName("__RequestVerificationToken")[0].value } });
        if (!res.ok)
            throw Error(res.statusText);
        return;
    });
}
exports.update_Brunch = update_Brunch;
function delete_Brunch(source) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Brunch/${source.Id}`, { method: 'delete', credentials: 'include', headers: { 'content-type': 'application/json', 'X-XSRF-TOKEN': document.getElementsByName("__RequestVerificationToken")[0].value } });
        if (!res.ok)
            throw Error(res.statusText);
        return;
    });
}
exports.delete_Brunch = delete_Brunch;
function get_Brunch(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Brunch/${id}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return { Item: Object.assign({}, json.Item, { CreatedDate: Moment.utc(json.Item.CreatedDate) }),
            Editable: !!json.Editable, JustCreated: false };
    });
}
exports.get_Brunch = get_Brunch;
function get_Brunches(page_index, page_size, search_query = null) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Brunch?page_index=${page_index}&page_size=${page_size}${(search_query != null ? "&page_size=" + search_query : "")}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return exports.make_page(json, e => { return Object.assign({}, e); });
    });
}
exports.get_Brunches = get_Brunches;
function get_Recipe_Meal_Recipes(source, page_index, page_size, query_string = null) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Recipe/${source.Id}/Meal_Recipes?page_index=${page_index}&page_size=${page_size}${(query_string != null ? "&search_query=" + query_string : "")}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return exports.make_page(json, e => { return Object.assign({}, e); });
    });
}
exports.get_Recipe_Meal_Recipes = get_Recipe_Meal_Recipes;
function get_Recipe_Meal_Recipes_Meal(source, page_index, page_size, id) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Recipe/${source.Id}/Meal_Recipes/${id}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return Object.assign({}, json, { CreatedDate: Moment.utc(json.CreatedDate) });
    });
}
exports.get_Recipe_Meal_Recipes_Meal = get_Recipe_Meal_Recipes_Meal;
function get_Recipe_Meal_Recipes_Meal_by_id(source, id) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Recipe/${source.Id}/Meal_Recipes/${id}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return Object.assign({}, json, { CreatedDate: Moment.utc(json.CreatedDate) });
    });
}
exports.get_Recipe_Meal_Recipes_Meal_by_id = get_Recipe_Meal_Recipes_Meal_by_id;
function get_unlinked_Recipe_Meal_Recipes(source, page_index, page_size) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Recipe/${source.Id}/unlinked/Meal_Recipes?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return exports.make_page(json, e => { return Object.assign({}, e); });
    });
}
exports.get_unlinked_Recipe_Meal_Recipes = get_unlinked_Recipe_Meal_Recipes;
function get_unlinked_Recipe_Meal_Recipes_Lunch(source, page_index, page_size) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Recipe/${source.Id}/unlinked/Meal_Recipes/Lunch?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return exports.make_page(json, e => { return Object.assign({}, e); });
    });
}
exports.get_unlinked_Recipe_Meal_Recipes_Lunch = get_unlinked_Recipe_Meal_Recipes_Lunch;
function get_unlinked_Recipe_Meal_Recipes_Brunch(source, page_index, page_size) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Recipe/${source.Id}/unlinked/Meal_Recipes/Brunch?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return exports.make_page(json, e => { return Object.assign({}, e); });
    });
}
exports.get_unlinked_Recipe_Meal_Recipes_Brunch = get_unlinked_Recipe_Meal_Recipes_Brunch;
function get_unlinked_Recipe_Meal_Recipes_Dinner(source, page_index, page_size) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Recipe/${source.Id}/unlinked/Meal_Recipes/Dinner?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return exports.make_page(json, e => { return Object.assign({}, e); });
    });
}
exports.get_unlinked_Recipe_Meal_Recipes_Dinner = get_unlinked_Recipe_Meal_Recipes_Dinner;
function get_unlinked_Recipe_Meal_Recipes_Breakfast(source, page_index, page_size) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Recipe/${source.Id}/unlinked/Meal_Recipes/Breakfast?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return exports.make_page(json, e => { return Object.assign({}, e); });
    });
}
exports.get_unlinked_Recipe_Meal_Recipes_Breakfast = get_unlinked_Recipe_Meal_Recipes_Breakfast;
function create_linked_Recipe_Meal_Recipes_Lunch(source) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Recipe/${source.Id}/Meal_Recipes_Lunch`, { method: 'post', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return json.map(e => { return Object.assign({}, e, { CreatedDate: Moment.utc(e.CreatedDate) }); });
    });
}
exports.create_linked_Recipe_Meal_Recipes_Lunch = create_linked_Recipe_Meal_Recipes_Lunch;
function create_linked_Recipe_Meal_Recipes_Brunch(source) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Recipe/${source.Id}/Meal_Recipes_Brunch`, { method: 'post', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return json.map(e => { return Object.assign({}, e, { CreatedDate: Moment.utc(e.CreatedDate) }); });
    });
}
exports.create_linked_Recipe_Meal_Recipes_Brunch = create_linked_Recipe_Meal_Recipes_Brunch;
function create_linked_Recipe_Meal_Recipes_Dinner(source) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Recipe/${source.Id}/Meal_Recipes_Dinner`, { method: 'post', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return json.map(e => { return Object.assign({}, e, { CreatedDate: Moment.utc(e.CreatedDate) }); });
    });
}
exports.create_linked_Recipe_Meal_Recipes_Dinner = create_linked_Recipe_Meal_Recipes_Dinner;
function create_linked_Recipe_Meal_Recipes_Breakfast(source) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Recipe/${source.Id}/Meal_Recipes_Breakfast`, { method: 'post', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return json.map(e => { return Object.assign({}, e, { CreatedDate: Moment.utc(e.CreatedDate) }); });
    });
}
exports.create_linked_Recipe_Meal_Recipes_Breakfast = create_linked_Recipe_Meal_Recipes_Breakfast;
function link_Recipe_Meal_Recipes(source, target) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Recipe/${source.Id}/Meal_Recipes/${target.Id}`, { method: 'post', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        return;
    });
}
exports.link_Recipe_Meal_Recipes = link_Recipe_Meal_Recipes;
function unlink_Recipe_Meal_Recipes(source, target) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Recipe/${source.Id}/Meal_Recipes/${target.Id}`, { method: 'delete', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        return;
    });
}
exports.unlink_Recipe_Meal_Recipes = unlink_Recipe_Meal_Recipes;
function get_Recipe_PreparationTime_Recipes(source, page_index, page_size, query_string = null) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Recipe/${source.Id}/PreparationTime_Recipes?page_index=${page_index}&page_size=${page_size}${(query_string != null ? "&search_query=" + query_string : "")}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return exports.make_page(json, e => { return Object.assign({}, e); });
    });
}
exports.get_Recipe_PreparationTime_Recipes = get_Recipe_PreparationTime_Recipes;
function get_Recipe_PreparationTime_Recipes_PreparationTime(source, page_index, page_size, id) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Recipe/${source.Id}/PreparationTime_Recipes/${id}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return Object.assign({}, json, { CreatedDate: Moment.utc(json.CreatedDate) });
    });
}
exports.get_Recipe_PreparationTime_Recipes_PreparationTime = get_Recipe_PreparationTime_Recipes_PreparationTime;
function get_Recipe_PreparationTime_Recipes_PreparationTime_by_id(source, id) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Recipe/${source.Id}/PreparationTime_Recipes/${id}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return Object.assign({}, json, { CreatedDate: Moment.utc(json.CreatedDate) });
    });
}
exports.get_Recipe_PreparationTime_Recipes_PreparationTime_by_id = get_Recipe_PreparationTime_Recipes_PreparationTime_by_id;
function get_unlinked_Recipe_PreparationTime_Recipes(source, page_index, page_size) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Recipe/${source.Id}/unlinked/PreparationTime_Recipes?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return exports.make_page(json, e => { return Object.assign({}, e); });
    });
}
exports.get_unlinked_Recipe_PreparationTime_Recipes = get_unlinked_Recipe_PreparationTime_Recipes;
function get_unlinked_Recipe_PreparationTime_Recipes_Thirty(source, page_index, page_size) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Recipe/${source.Id}/unlinked/PreparationTime_Recipes/Thirty?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return exports.make_page(json, e => { return Object.assign({}, e); });
    });
}
exports.get_unlinked_Recipe_PreparationTime_Recipes_Thirty = get_unlinked_Recipe_PreparationTime_Recipes_Thirty;
function get_unlinked_Recipe_PreparationTime_Recipes_Sixty(source, page_index, page_size) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Recipe/${source.Id}/unlinked/PreparationTime_Recipes/Sixty?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return exports.make_page(json, e => { return Object.assign({}, e); });
    });
}
exports.get_unlinked_Recipe_PreparationTime_Recipes_Sixty = get_unlinked_Recipe_PreparationTime_Recipes_Sixty;
function get_unlinked_Recipe_PreparationTime_Recipes_Ninety(source, page_index, page_size) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Recipe/${source.Id}/unlinked/PreparationTime_Recipes/Ninety?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return exports.make_page(json, e => { return Object.assign({}, e); });
    });
}
exports.get_unlinked_Recipe_PreparationTime_Recipes_Ninety = get_unlinked_Recipe_PreparationTime_Recipes_Ninety;
function get_unlinked_Recipe_PreparationTime_Recipes_Fifteen(source, page_index, page_size) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Recipe/${source.Id}/unlinked/PreparationTime_Recipes/Fifteen?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return exports.make_page(json, e => { return Object.assign({}, e); });
    });
}
exports.get_unlinked_Recipe_PreparationTime_Recipes_Fifteen = get_unlinked_Recipe_PreparationTime_Recipes_Fifteen;
function create_linked_Recipe_PreparationTime_Recipes_Thirty(source) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Recipe/${source.Id}/PreparationTime_Recipes_Thirty`, { method: 'post', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return json.map(e => { return Object.assign({}, e, { CreatedDate: Moment.utc(e.CreatedDate) }); });
    });
}
exports.create_linked_Recipe_PreparationTime_Recipes_Thirty = create_linked_Recipe_PreparationTime_Recipes_Thirty;
function create_linked_Recipe_PreparationTime_Recipes_Sixty(source) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Recipe/${source.Id}/PreparationTime_Recipes_Sixty`, { method: 'post', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return json.map(e => { return Object.assign({}, e, { CreatedDate: Moment.utc(e.CreatedDate) }); });
    });
}
exports.create_linked_Recipe_PreparationTime_Recipes_Sixty = create_linked_Recipe_PreparationTime_Recipes_Sixty;
function create_linked_Recipe_PreparationTime_Recipes_Ninety(source) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Recipe/${source.Id}/PreparationTime_Recipes_Ninety`, { method: 'post', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return json.map(e => { return Object.assign({}, e, { CreatedDate: Moment.utc(e.CreatedDate) }); });
    });
}
exports.create_linked_Recipe_PreparationTime_Recipes_Ninety = create_linked_Recipe_PreparationTime_Recipes_Ninety;
function create_linked_Recipe_PreparationTime_Recipes_Fifteen(source) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Recipe/${source.Id}/PreparationTime_Recipes_Fifteen`, { method: 'post', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return json.map(e => { return Object.assign({}, e, { CreatedDate: Moment.utc(e.CreatedDate) }); });
    });
}
exports.create_linked_Recipe_PreparationTime_Recipes_Fifteen = create_linked_Recipe_PreparationTime_Recipes_Fifteen;
function link_Recipe_PreparationTime_Recipes(source, target) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Recipe/${source.Id}/PreparationTime_Recipes/${target.Id}`, { method: 'post', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        return;
    });
}
exports.link_Recipe_PreparationTime_Recipes = link_Recipe_PreparationTime_Recipes;
function unlink_Recipe_PreparationTime_Recipes(source, target) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Recipe/${source.Id}/PreparationTime_Recipes/${target.Id}`, { method: 'delete', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        return;
    });
}
exports.unlink_Recipe_PreparationTime_Recipes = unlink_Recipe_PreparationTime_Recipes;
function get_Recipe_User_Recipes(source, page_index, page_size, query_string = null) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Recipe/${source.Id}/User_Recipes?page_index=${page_index}&page_size=${page_size}${(query_string != null ? "&search_query=" + query_string : "")}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return exports.make_page(json, e => { return Object.assign({}, e); });
    });
}
exports.get_Recipe_User_Recipes = get_Recipe_User_Recipes;
function get_Recipe_User_Recipes_User(source, page_index, page_size, id) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Recipe/${source.Id}/User_Recipes/${id}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return Object.assign({}, json, { CreatedDate: Moment.utc(json.CreatedDate) });
    });
}
exports.get_Recipe_User_Recipes_User = get_Recipe_User_Recipes_User;
function get_Recipe_User_Recipes_User_by_id(source, id) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Recipe/${source.Id}/User_Recipes/${id}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return Object.assign({}, json, { CreatedDate: Moment.utc(json.CreatedDate) });
    });
}
exports.get_Recipe_User_Recipes_User_by_id = get_Recipe_User_Recipes_User_by_id;
function get_unlinked_Recipe_User_Recipes(source, page_index, page_size) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Recipe/${source.Id}/unlinked/User_Recipes?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return exports.make_page(json, e => { return Object.assign({}, e); });
    });
}
exports.get_unlinked_Recipe_User_Recipes = get_unlinked_Recipe_User_Recipes;
function create_linked_Recipe_User_Recipes_User(source) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Recipe/${source.Id}/User_Recipes_User`, { method: 'post', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return json.map(e => { return Object.assign({}, e, { CreatedDate: Moment.utc(e.CreatedDate) }); });
    });
}
exports.create_linked_Recipe_User_Recipes_User = create_linked_Recipe_User_Recipes_User;
function link_Recipe_User_Recipes(source, target) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Recipe/${source.Id}/User_Recipes/${target.Id}`, { method: 'post', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        return;
    });
}
exports.link_Recipe_User_Recipes = link_Recipe_User_Recipes;
function unlink_Recipe_User_Recipes(source, target) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Recipe/${source.Id}/User_Recipes/${target.Id}`, { method: 'delete', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        return;
    });
}
exports.unlink_Recipe_User_Recipes = unlink_Recipe_User_Recipes;
function get_Recipe_Recipe_Ratings(source, page_index, page_size, query_string = null) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Recipe/${source.Id}/Recipe_Ratings?page_index=${page_index}&page_size=${page_size}${(query_string != null ? "&search_query=" + query_string : "")}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return exports.make_page(json, e => { return Object.assign({}, e); });
    });
}
exports.get_Recipe_Recipe_Ratings = get_Recipe_Recipe_Ratings;
function get_Recipe_Recipe_Ratings_Rating(source, page_index, page_size, id) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Recipe/${source.Id}/Recipe_Ratings/${id}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return Object.assign({}, json, { CreatedDate: Moment.utc(json.CreatedDate) });
    });
}
exports.get_Recipe_Recipe_Ratings_Rating = get_Recipe_Recipe_Ratings_Rating;
function get_Recipe_Recipe_Ratings_Rating_by_id(source, id) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Recipe/${source.Id}/Recipe_Ratings/${id}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return Object.assign({}, json, { CreatedDate: Moment.utc(json.CreatedDate) });
    });
}
exports.get_Recipe_Recipe_Ratings_Rating_by_id = get_Recipe_Recipe_Ratings_Rating_by_id;
function get_unlinked_Recipe_Recipe_Ratings(source, page_index, page_size) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Recipe/${source.Id}/unlinked/Recipe_Ratings?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return exports.make_page(json, e => { return Object.assign({}, e); });
    });
}
exports.get_unlinked_Recipe_Recipe_Ratings = get_unlinked_Recipe_Recipe_Ratings;
function create_linked_Recipe_Recipe_Ratings_Rating(source) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Recipe/${source.Id}/Recipe_Ratings_Rating`, { method: 'post', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return json.map(e => { return Object.assign({}, e, { CreatedDate: Moment.utc(e.CreatedDate) }); });
    });
}
exports.create_linked_Recipe_Recipe_Ratings_Rating = create_linked_Recipe_Recipe_Ratings_Rating;
function link_Recipe_Recipe_Ratings(source, target) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Recipe/${source.Id}/Recipe_Ratings/${target.Id}`, { method: 'post', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        return;
    });
}
exports.link_Recipe_Recipe_Ratings = link_Recipe_Recipe_Ratings;
function unlink_Recipe_Recipe_Ratings(source, target) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Recipe/${source.Id}/Recipe_Ratings/${target.Id}`, { method: 'delete', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        return;
    });
}
exports.unlink_Recipe_Recipe_Ratings = unlink_Recipe_Recipe_Ratings;
function get_Recipe_RecommendationPage_Recipes(source, page_index, page_size, query_string = null) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Recipe/${source.Id}/RecommendationPage_Recipes?page_index=${page_index}&page_size=${page_size}${(query_string != null ? "&search_query=" + query_string : "")}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return exports.make_page(json, e => { return Object.assign({}, e); });
    });
}
exports.get_Recipe_RecommendationPage_Recipes = get_Recipe_RecommendationPage_Recipes;
function get_Recipe_RecommendationPage_Recipes_RecommendationPage(source, page_index, page_size, id) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Recipe/${source.Id}/RecommendationPage_Recipes/${id}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return Object.assign({}, json, { CreatedDate: Moment.utc(json.CreatedDate) });
    });
}
exports.get_Recipe_RecommendationPage_Recipes_RecommendationPage = get_Recipe_RecommendationPage_Recipes_RecommendationPage;
function get_Recipe_RecommendationPage_Recipes_RecommendationPage_by_id(source, id) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Recipe/${source.Id}/RecommendationPage_Recipes/${id}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return Object.assign({}, json, { CreatedDate: Moment.utc(json.CreatedDate) });
    });
}
exports.get_Recipe_RecommendationPage_Recipes_RecommendationPage_by_id = get_Recipe_RecommendationPage_Recipes_RecommendationPage_by_id;
function get_unlinked_Recipe_RecommendationPage_Recipes(source, page_index, page_size) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Recipe/${source.Id}/unlinked/RecommendationPage_Recipes?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return exports.make_page(json, e => { return Object.assign({}, e); });
    });
}
exports.get_unlinked_Recipe_RecommendationPage_Recipes = get_unlinked_Recipe_RecommendationPage_Recipes;
function create_linked_Recipe_RecommendationPage_Recipes_RecommendationPage(source) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Recipe/${source.Id}/RecommendationPage_Recipes_RecommendationPage`, { method: 'post', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return json.map(e => { return Object.assign({}, e, { CreatedDate: Moment.utc(e.CreatedDate) }); });
    });
}
exports.create_linked_Recipe_RecommendationPage_Recipes_RecommendationPage = create_linked_Recipe_RecommendationPage_Recipes_RecommendationPage;
function link_Recipe_RecommendationPage_Recipes(source, target) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Recipe/${source.Id}/RecommendationPage_Recipes/${target.Id}`, { method: 'post', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        return;
    });
}
exports.link_Recipe_RecommendationPage_Recipes = link_Recipe_RecommendationPage_Recipes;
function unlink_Recipe_RecommendationPage_Recipes(source, target) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Recipe/${source.Id}/RecommendationPage_Recipes/${target.Id}`, { method: 'delete', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        return;
    });
}
exports.unlink_Recipe_RecommendationPage_Recipes = unlink_Recipe_RecommendationPage_Recipes;
function create_Recipe() {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Recipe/`, { method: 'post', credentials: 'include', headers: { 'content-type': 'application/json',
                'X-XSRF-TOKEN': document.getElementsByName("__RequestVerificationToken")[0].value } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return Object.assign({}, json, { CreatedDate: Moment.utc(json.CreatedDate) });
    });
}
exports.create_Recipe = create_Recipe;
function update_Recipe(item) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Recipe/`, { method: 'put',
            body: JSON.stringify(Object.assign({}, item, { CreatedDate: undefined, Picture: "" })), credentials: 'include', headers: { 'content-type': 'application/json', 'X-XSRF-TOKEN': document.getElementsByName("__RequestVerificationToken")[0].value } });
        if (!res.ok)
            throw Error(res.statusText);
        return;
    });
}
exports.update_Recipe = update_Recipe;
function delete_Recipe(source) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Recipe/${source.Id}`, { method: 'delete', credentials: 'include', headers: { 'content-type': 'application/json', 'X-XSRF-TOKEN': document.getElementsByName("__RequestVerificationToken")[0].value } });
        if (!res.ok)
            throw Error(res.statusText);
        return;
    });
}
exports.delete_Recipe = delete_Recipe;
function get_Recipe(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Recipe/${id}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return { Item: Object.assign({}, json.Item, { CreatedDate: Moment.utc(json.Item.CreatedDate) }),
            Editable: !!json.Editable, JustCreated: false };
    });
}
exports.get_Recipe = get_Recipe;
function get_Recipes(page_index, page_size, search_query = null) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Recipe?page_index=${page_index}&page_size=${page_size}${(search_query != null ? "&page_size=" + search_query : "")}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return exports.make_page(json, e => { return Object.assign({}, e); });
    });
}
exports.get_Recipes = get_Recipes;
function get_Recipe_Picture(item) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Recipe/${item.Id}/Picture`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return json.Content;
    });
}
exports.get_Recipe_Picture = get_Recipe_Picture;
function update_Recipe_Picture(item, new_src) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Recipe/${item.Id}/Picture`, { method: 'put', body: JSON.stringify({ Content: new_src }), credentials: 'include', headers: { 'content-type': 'application/json', 'X-XSRF-TOKEN': document.getElementsByName("__RequestVerificationToken")[0].value } });
        if (!res.ok)
            throw Error(res.statusText);
        return;
    });
}
exports.update_Recipe_Picture = update_Recipe_Picture;
function create_Dinner() {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Dinner/`, { method: 'post', credentials: 'include', headers: { 'content-type': 'application/json',
                'X-XSRF-TOKEN': document.getElementsByName("__RequestVerificationToken")[0].value } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return Object.assign({}, json, { CreatedDate: Moment.utc(json.CreatedDate) });
    });
}
exports.create_Dinner = create_Dinner;
function update_Dinner(item) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Dinner/`, { method: 'put',
            body: JSON.stringify(Object.assign({}, item, { CreatedDate: undefined })), credentials: 'include', headers: { 'content-type': 'application/json', 'X-XSRF-TOKEN': document.getElementsByName("__RequestVerificationToken")[0].value } });
        if (!res.ok)
            throw Error(res.statusText);
        return;
    });
}
exports.update_Dinner = update_Dinner;
function delete_Dinner(source) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Dinner/${source.Id}`, { method: 'delete', credentials: 'include', headers: { 'content-type': 'application/json', 'X-XSRF-TOKEN': document.getElementsByName("__RequestVerificationToken")[0].value } });
        if (!res.ok)
            throw Error(res.statusText);
        return;
    });
}
exports.delete_Dinner = delete_Dinner;
function get_Dinner(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Dinner/${id}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return { Item: Object.assign({}, json.Item, { CreatedDate: Moment.utc(json.Item.CreatedDate) }),
            Editable: !!json.Editable, JustCreated: false };
    });
}
exports.get_Dinner = get_Dinner;
function get_Dinners(page_index, page_size, search_query = null) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Dinner?page_index=${page_index}&page_size=${page_size}${(search_query != null ? "&page_size=" + search_query : "")}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return exports.make_page(json, e => { return Object.assign({}, e); });
    });
}
exports.get_Dinners = get_Dinners;
function create_Mediterranean() {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Mediterranean/`, { method: 'post', credentials: 'include', headers: { 'content-type': 'application/json',
                'X-XSRF-TOKEN': document.getElementsByName("__RequestVerificationToken")[0].value } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return Object.assign({}, json, { CreatedDate: Moment.utc(json.CreatedDate) });
    });
}
exports.create_Mediterranean = create_Mediterranean;
function update_Mediterranean(item) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Mediterranean/`, { method: 'put',
            body: JSON.stringify(Object.assign({}, item, { CreatedDate: undefined })), credentials: 'include', headers: { 'content-type': 'application/json', 'X-XSRF-TOKEN': document.getElementsByName("__RequestVerificationToken")[0].value } });
        if (!res.ok)
            throw Error(res.statusText);
        return;
    });
}
exports.update_Mediterranean = update_Mediterranean;
function delete_Mediterranean(source) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Mediterranean/${source.Id}`, { method: 'delete', credentials: 'include', headers: { 'content-type': 'application/json', 'X-XSRF-TOKEN': document.getElementsByName("__RequestVerificationToken")[0].value } });
        if (!res.ok)
            throw Error(res.statusText);
        return;
    });
}
exports.delete_Mediterranean = delete_Mediterranean;
function get_Mediterranean(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Mediterranean/${id}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return { Item: Object.assign({}, json.Item, { CreatedDate: Moment.utc(json.Item.CreatedDate) }),
            Editable: !!json.Editable, JustCreated: false };
    });
}
exports.get_Mediterranean = get_Mediterranean;
function get_Mediterraneans(page_index, page_size, search_query = null) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Mediterranean?page_index=${page_index}&page_size=${page_size}${(search_query != null ? "&page_size=" + search_query : "")}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return exports.make_page(json, e => { return Object.assign({}, e); });
    });
}
exports.get_Mediterraneans = get_Mediterraneans;
function create_Ninety() {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Ninety/`, { method: 'post', credentials: 'include', headers: { 'content-type': 'application/json',
                'X-XSRF-TOKEN': document.getElementsByName("__RequestVerificationToken")[0].value } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return Object.assign({}, json, { CreatedDate: Moment.utc(json.CreatedDate) });
    });
}
exports.create_Ninety = create_Ninety;
function update_Ninety(item) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Ninety/`, { method: 'put',
            body: JSON.stringify(Object.assign({}, item, { CreatedDate: undefined })), credentials: 'include', headers: { 'content-type': 'application/json', 'X-XSRF-TOKEN': document.getElementsByName("__RequestVerificationToken")[0].value } });
        if (!res.ok)
            throw Error(res.statusText);
        return;
    });
}
exports.update_Ninety = update_Ninety;
function delete_Ninety(source) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Ninety/${source.Id}`, { method: 'delete', credentials: 'include', headers: { 'content-type': 'application/json', 'X-XSRF-TOKEN': document.getElementsByName("__RequestVerificationToken")[0].value } });
        if (!res.ok)
            throw Error(res.statusText);
        return;
    });
}
exports.delete_Ninety = delete_Ninety;
function get_Ninety(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Ninety/${id}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return { Item: Object.assign({}, json.Item, { CreatedDate: Moment.utc(json.Item.CreatedDate) }),
            Editable: !!json.Editable, JustCreated: false };
    });
}
exports.get_Ninety = get_Ninety;
function get_Nineties(page_index, page_size, search_query = null) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Ninety?page_index=${page_index}&page_size=${page_size}${(search_query != null ? "&page_size=" + search_query : "")}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return exports.make_page(json, e => { return Object.assign({}, e); });
    });
}
exports.get_Nineties = get_Nineties;
function create_Recommendation() {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Recommendation/`, { method: 'post', credentials: 'include', headers: { 'content-type': 'application/json',
                'X-XSRF-TOKEN': document.getElementsByName("__RequestVerificationToken")[0].value } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return Object.assign({}, json, { CreatedDate: Moment.utc(json.CreatedDate) });
    });
}
exports.create_Recommendation = create_Recommendation;
function update_Recommendation(item) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Recommendation/`, { method: 'put',
            body: JSON.stringify(Object.assign({}, item, { CreatedDate: undefined })), credentials: 'include', headers: { 'content-type': 'application/json', 'X-XSRF-TOKEN': document.getElementsByName("__RequestVerificationToken")[0].value } });
        if (!res.ok)
            throw Error(res.statusText);
        return;
    });
}
exports.update_Recommendation = update_Recommendation;
function delete_Recommendation(source) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Recommendation/${source.Id}`, { method: 'delete', credentials: 'include', headers: { 'content-type': 'application/json', 'X-XSRF-TOKEN': document.getElementsByName("__RequestVerificationToken")[0].value } });
        if (!res.ok)
            throw Error(res.statusText);
        return;
    });
}
exports.delete_Recommendation = delete_Recommendation;
function get_Recommendation(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Recommendation/${id}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return { Item: Object.assign({}, json.Item, { CreatedDate: Moment.utc(json.Item.CreatedDate) }),
            Editable: !!json.Editable, JustCreated: false };
    });
}
exports.get_Recommendation = get_Recommendation;
function get_Recommendations(page_index, page_size, search_query = null) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Recommendation?page_index=${page_index}&page_size=${page_size}${(search_query != null ? "&page_size=" + search_query : "")}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return exports.make_page(json, e => { return Object.assign({}, e); });
    });
}
exports.get_Recommendations = get_Recommendations;
function create_Breakfast() {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Breakfast/`, { method: 'post', credentials: 'include', headers: { 'content-type': 'application/json',
                'X-XSRF-TOKEN': document.getElementsByName("__RequestVerificationToken")[0].value } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return Object.assign({}, json, { CreatedDate: Moment.utc(json.CreatedDate) });
    });
}
exports.create_Breakfast = create_Breakfast;
function update_Breakfast(item) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Breakfast/`, { method: 'put',
            body: JSON.stringify(Object.assign({}, item, { CreatedDate: undefined })), credentials: 'include', headers: { 'content-type': 'application/json', 'X-XSRF-TOKEN': document.getElementsByName("__RequestVerificationToken")[0].value } });
        if (!res.ok)
            throw Error(res.statusText);
        return;
    });
}
exports.update_Breakfast = update_Breakfast;
function delete_Breakfast(source) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Breakfast/${source.Id}`, { method: 'delete', credentials: 'include', headers: { 'content-type': 'application/json', 'X-XSRF-TOKEN': document.getElementsByName("__RequestVerificationToken")[0].value } });
        if (!res.ok)
            throw Error(res.statusText);
        return;
    });
}
exports.delete_Breakfast = delete_Breakfast;
function get_Breakfast(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Breakfast/${id}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return { Item: Object.assign({}, json.Item, { CreatedDate: Moment.utc(json.Item.CreatedDate) }),
            Editable: !!json.Editable, JustCreated: false };
    });
}
exports.get_Breakfast = get_Breakfast;
function get_Breakfasts(page_index, page_size, search_query = null) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Breakfast?page_index=${page_index}&page_size=${page_size}${(search_query != null ? "&page_size=" + search_query : "")}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return exports.make_page(json, e => { return Object.assign({}, e); });
    });
}
exports.get_Breakfasts = get_Breakfasts;
function create_Fifteen() {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Fifteen/`, { method: 'post', credentials: 'include', headers: { 'content-type': 'application/json',
                'X-XSRF-TOKEN': document.getElementsByName("__RequestVerificationToken")[0].value } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return Object.assign({}, json, { CreatedDate: Moment.utc(json.CreatedDate) });
    });
}
exports.create_Fifteen = create_Fifteen;
function update_Fifteen(item) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Fifteen/`, { method: 'put',
            body: JSON.stringify(Object.assign({}, item, { CreatedDate: undefined })), credentials: 'include', headers: { 'content-type': 'application/json', 'X-XSRF-TOKEN': document.getElementsByName("__RequestVerificationToken")[0].value } });
        if (!res.ok)
            throw Error(res.statusText);
        return;
    });
}
exports.update_Fifteen = update_Fifteen;
function delete_Fifteen(source) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Fifteen/${source.Id}`, { method: 'delete', credentials: 'include', headers: { 'content-type': 'application/json', 'X-XSRF-TOKEN': document.getElementsByName("__RequestVerificationToken")[0].value } });
        if (!res.ok)
            throw Error(res.statusText);
        return;
    });
}
exports.delete_Fifteen = delete_Fifteen;
function get_Fifteen(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Fifteen/${id}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return { Item: Object.assign({}, json.Item, { CreatedDate: Moment.utc(json.Item.CreatedDate) }),
            Editable: !!json.Editable, JustCreated: false };
    });
}
exports.get_Fifteen = get_Fifteen;
function get_Fifteens(page_index, page_size, search_query = null) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Fifteen?page_index=${page_index}&page_size=${page_size}${(search_query != null ? "&page_size=" + search_query : "")}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return exports.make_page(json, e => { return Object.assign({}, e); });
    });
}
exports.get_Fifteens = get_Fifteens;
function get_Rating_Recipe_Ratings(source, page_index, page_size, query_string = null) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Rating/${source.Id}/Recipe_Ratings?page_index=${page_index}&page_size=${page_size}${(query_string != null ? "&search_query=" + query_string : "")}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return exports.make_page(json, e => { return Object.assign({}, e); });
    });
}
exports.get_Rating_Recipe_Ratings = get_Rating_Recipe_Ratings;
function get_Rating_Recipe_Ratings_Recipe(source, page_index, page_size, id) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Rating/${source.Id}/Recipe_Ratings/${id}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return Object.assign({}, json, { CreatedDate: Moment.utc(json.CreatedDate) });
    });
}
exports.get_Rating_Recipe_Ratings_Recipe = get_Rating_Recipe_Ratings_Recipe;
function get_Rating_Recipe_Ratings_Recipe_by_id(source, id) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Rating/${source.Id}/Recipe_Ratings/${id}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return Object.assign({}, json, { CreatedDate: Moment.utc(json.CreatedDate) });
    });
}
exports.get_Rating_Recipe_Ratings_Recipe_by_id = get_Rating_Recipe_Ratings_Recipe_by_id;
function get_unlinked_Rating_Recipe_Ratings(source, page_index, page_size) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Rating/${source.Id}/unlinked/Recipe_Ratings?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return exports.make_page(json, e => { return Object.assign({}, e); });
    });
}
exports.get_unlinked_Rating_Recipe_Ratings = get_unlinked_Rating_Recipe_Ratings;
function create_linked_Rating_Recipe_Ratings_Recipe(source) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Rating/${source.Id}/Recipe_Ratings_Recipe`, { method: 'post', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return json.map(e => { return Object.assign({}, e, { CreatedDate: Moment.utc(e.CreatedDate) }); });
    });
}
exports.create_linked_Rating_Recipe_Ratings_Recipe = create_linked_Rating_Recipe_Ratings_Recipe;
function link_Rating_Recipe_Ratings(source, target) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Rating/${source.Id}/Recipe_Ratings/${target.Id}`, { method: 'post', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        return;
    });
}
exports.link_Rating_Recipe_Ratings = link_Rating_Recipe_Ratings;
function unlink_Rating_Recipe_Ratings(source, target) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Rating/${source.Id}/Recipe_Ratings/${target.Id}`, { method: 'delete', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        return;
    });
}
exports.unlink_Rating_Recipe_Ratings = unlink_Rating_Recipe_Ratings;
function create_Rating() {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Rating/`, { method: 'post', credentials: 'include', headers: { 'content-type': 'application/json',
                'X-XSRF-TOKEN': document.getElementsByName("__RequestVerificationToken")[0].value } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return Object.assign({}, json, { CreatedDate: Moment.utc(json.CreatedDate) });
    });
}
exports.create_Rating = create_Rating;
function update_Rating(item) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Rating/`, { method: 'put',
            body: JSON.stringify(Object.assign({}, item, { CreatedDate: undefined })), credentials: 'include', headers: { 'content-type': 'application/json', 'X-XSRF-TOKEN': document.getElementsByName("__RequestVerificationToken")[0].value } });
        if (!res.ok)
            throw Error(res.statusText);
        return;
    });
}
exports.update_Rating = update_Rating;
function delete_Rating(source) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Rating/${source.Id}`, { method: 'delete', credentials: 'include', headers: { 'content-type': 'application/json', 'X-XSRF-TOKEN': document.getElementsByName("__RequestVerificationToken")[0].value } });
        if (!res.ok)
            throw Error(res.statusText);
        return;
    });
}
exports.delete_Rating = delete_Rating;
function get_Rating(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Rating/${id}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return { Item: Object.assign({}, json.Item, { CreatedDate: Moment.utc(json.Item.CreatedDate) }),
            Editable: !!json.Editable, JustCreated: false };
    });
}
exports.get_Rating = get_Rating;
function get_Ratings(page_index, page_size, search_query = null) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Rating?page_index=${page_index}&page_size=${page_size}${(search_query != null ? "&page_size=" + search_query : "")}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return exports.make_page(json, e => { return Object.assign({}, e); });
    });
}
exports.get_Ratings = get_Ratings;
function create_Grill() {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Grill/`, { method: 'post', credentials: 'include', headers: { 'content-type': 'application/json',
                'X-XSRF-TOKEN': document.getElementsByName("__RequestVerificationToken")[0].value } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return Object.assign({}, json, { CreatedDate: Moment.utc(json.CreatedDate) });
    });
}
exports.create_Grill = create_Grill;
function update_Grill(item) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Grill/`, { method: 'put',
            body: JSON.stringify(Object.assign({}, item, { CreatedDate: undefined })), credentials: 'include', headers: { 'content-type': 'application/json', 'X-XSRF-TOKEN': document.getElementsByName("__RequestVerificationToken")[0].value } });
        if (!res.ok)
            throw Error(res.statusText);
        return;
    });
}
exports.update_Grill = update_Grill;
function delete_Grill(source) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Grill/${source.Id}`, { method: 'delete', credentials: 'include', headers: { 'content-type': 'application/json', 'X-XSRF-TOKEN': document.getElementsByName("__RequestVerificationToken")[0].value } });
        if (!res.ok)
            throw Error(res.statusText);
        return;
    });
}
exports.delete_Grill = delete_Grill;
function get_Grill(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Grill/${id}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return { Item: Object.assign({}, json.Item, { CreatedDate: Moment.utc(json.Item.CreatedDate) }),
            Editable: !!json.Editable, JustCreated: false };
    });
}
exports.get_Grill = get_Grill;
function get_Grills(page_index, page_size, search_query = null) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/Grill?page_index=${page_index}&page_size=${page_size}${(search_query != null ? "&page_size=" + search_query : "")}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        let json = yield res.json();
        return exports.make_page(json, e => { return Object.assign({}, e); });
    });
}
exports.get_Grills = get_Grills;
//# sourceMappingURL=generated_api.js.map