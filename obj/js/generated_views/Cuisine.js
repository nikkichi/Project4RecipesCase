"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Api = require("../generated_api");
const Permissions = require("./permissions");
const Utils = require("./view_utils");
const AsianViews = require("./Asian");
const MediterraneanViews = require("./Mediterranean");
const GrillViews = require("./Grill");
exports.Cuisine = (props) => props.entity.Kind == "Asian" ?
    AsianViews.Asian(Object.assign({}, props, { set_entity: (e, c) => props.set_entity(e, c), entity: props.entity }))
    : props.entity.Kind == "Mediterranean" ?
        MediterraneanViews.Mediterranean(Object.assign({}, props, { set_entity: (e, c) => props.set_entity(e, c), entity: props.entity }))
        : props.entity.Kind == "Grill" ?
            GrillViews.Grill(Object.assign({}, props, { set_entity: (e, c) => props.set_entity(e, c), entity: props.entity }))
            : null;
exports.Cuisine_to_page = (id) => {
    let can_edit = Utils.any_of([Permissions.can_edit_Cuisine, Permissions.can_edit_Cuisine_Meal, Permissions.can_edit_Meal]);
    return Utils.scene_to_page(can_edit, exports.Cuisine, Api.get_Cuisine(id), Api.update_Cuisine, "Cuisine", "Cuisine", `/Cuisines/${id}`);
};
exports.Cuisine_to = (id, target_element_id, current_User) => {
    Utils.render_page_manager(target_element_id, exports.Cuisine_to_page(id), current_User);
};
//# sourceMappingURL=Cuisine.js.map