"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Api = require("../generated_api");
const Permissions = require("./permissions");
const Utils = require("./view_utils");
const ThirtyViews = require("./Thirty");
const FifteenViews = require("./Fifteen");
const SixtyViews = require("./Sixty");
const NinetyViews = require("./Ninety");
exports.PreparationTime = (props) => props.entity.Kind == "Thirty" ?
    ThirtyViews.Thirty(Object.assign({}, props, { set_entity: (e, c) => props.set_entity(e, c), entity: props.entity }))
    : props.entity.Kind == "Sixty" ?
        SixtyViews.Sixty(Object.assign({}, props, { set_entity: (e, c) => props.set_entity(e, c), entity: props.entity }))
        : props.entity.Kind == "Ninety" ?
            NinetyViews.Ninety(Object.assign({}, props, { set_entity: (e, c) => props.set_entity(e, c), entity: props.entity }))
            : props.entity.Kind == "Fifteen" ?
                FifteenViews.Fifteen(Object.assign({}, props, { set_entity: (e, c) => props.set_entity(e, c), entity: props.entity }))
                : null;
exports.PreparationTime_to_page = (id) => {
    let can_edit = Utils.any_of([Permissions.can_edit_PreparationTime, Permissions.can_edit_PreparationTime_Recipe, Permissions.can_edit_Recipe]);
    return Utils.scene_to_page(can_edit, exports.PreparationTime, Api.get_PreparationTime(id), Api.update_PreparationTime, "PreparationTime", "PreparationTime", `/PreparationTimes/${id}`);
};
exports.PreparationTime_to = (id, target_element_id, current_User) => {
    Utils.render_page_manager(target_element_id, exports.PreparationTime_to_page(id), current_User);
};
//# sourceMappingURL=PreparationTime.js.map