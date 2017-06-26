"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Api = require("../generated_api");
const Permissions = require("./permissions");
const Utils = require("./view_utils");
const DinnerViews = require("./Dinner");
const BrunchViews = require("./Brunch");
const BreakfastViews = require("./Breakfast");
const LunchViews = require("./Lunch");
exports.Meal = (props) => props.entity.Kind == "Lunch" ?
    LunchViews.Lunch(Object.assign({}, props, { set_entity: (e, c) => props.set_entity(e, c), entity: props.entity }))
    : props.entity.Kind == "Brunch" ?
        BrunchViews.Brunch(Object.assign({}, props, { set_entity: (e, c) => props.set_entity(e, c), entity: props.entity }))
        : props.entity.Kind == "Dinner" ?
            DinnerViews.Dinner(Object.assign({}, props, { set_entity: (e, c) => props.set_entity(e, c), entity: props.entity }))
            : props.entity.Kind == "Breakfast" ?
                BreakfastViews.Breakfast(Object.assign({}, props, { set_entity: (e, c) => props.set_entity(e, c), entity: props.entity }))
                : null;
exports.Meal_to_page = (id) => {
    let can_edit = Utils.any_of([Permissions.can_edit_Meal, Permissions.can_edit_Cuisine_Meal, Permissions.can_edit_Meal_Recipe, Permissions.can_edit_Cuisine, Permissions.can_edit_Recipe]);
    return Utils.scene_to_page(can_edit, exports.Meal, Api.get_Meal(id), Api.update_Meal, "Meal", "Meal", `/Meals/${id}`);
};
exports.Meal_to = (id, target_element_id, current_User) => {
    Utils.render_page_manager(target_element_id, exports.Meal_to_page(id), current_User);
};
//# sourceMappingURL=Meal.js.map