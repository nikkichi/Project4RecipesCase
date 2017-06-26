"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const LazyImage = require("./lazy_image");
const RichTextEditor = require("./rich_text");
const Moment = require("moment");
function format_int(num, length) {
    return (num / Math.pow(10, length)).toFixed(length).substr(2);
}
function Input(can_edit, mode, get_item, set_item, type, validation) {
    return mode == "view" ?
        React.createElement("div", null, get_item())
        :
            React.createElement("input", { disabled: !can_edit, type: type, value: get_item(), onChange: (e) => {
                    let new_value = e.target.value;
                    if (!validation || validation(new_value))
                        set_item(new_value);
                } });
}
exports.Input = Input;
function String(can_edit, mode, get_item, set_item, validation) {
    return Input(can_edit, mode, get_item, set_item, "text", validation);
}
exports.String = String;
function Tel(can_edit, mode, get_item, set_item, validation) {
    let item = get_item();
    return mode == "view" ?
        React.createElement("a", { href: `tel:${item}` }, item)
        :
            Input(can_edit, mode, get_item, set_item, "tel", validation);
}
exports.Tel = Tel;
function Email(can_edit, mode, get_item, set_item, validation) {
    let item = get_item();
    return mode == "view" ?
        React.createElement("a", { href: `mailto:${item}` }, item)
        :
            Input(can_edit, mode, get_item, set_item, "email", validation);
}
exports.Email = Email;
function Url(can_edit, mode, get_item, set_item, validation) {
    let item = get_item();
    return mode == "view" ?
        React.createElement("a", { href: `${item}` }, item)
        :
            Input(can_edit, mode, get_item, set_item, "url", validation);
}
exports.Url = Url;
function Title(can_edit, mode, get_item, set_item, validation) {
    return mode == "view" ?
        React.createElement("div", { className: "model-preview" }, get_item())
        :
            React.createElement("input", { disabled: !can_edit, type: "text", value: get_item(), onChange: (e) => {
                    let new_value = e.target.value;
                    if (!validation || validation(new_value))
                        set_item(new_value);
                } });
}
exports.Title = Title;
function Text(can_edit, mode, get_item, set_item, validation) {
    return React.createElement("textarea", { disabled: !can_edit || mode == "view", type: "text", value: get_item(), onChange: (e) => {
            let new_value = e.target.value;
            if (!validation || validation(new_value))
                set_item(new_value);
        } });
}
exports.Text = Text;
function Number(can_edit, mode, get_item, set_item, validation) {
    return mode == "view" ?
        React.createElement("div", null, (get_item() == NaN || get_item() == undefined) ? '' : get_item())
        :
            React.createElement("input", { disabled: !can_edit, type: "number", value: `${get_item()}`, onChange: (e) => {
                    let new_value = e.target.valueAsNumber;
                    if (isNaN(new_value))
                        new_value = 0;
                    if (!validation || validation(new_value))
                        set_item(new_value);
                } });
}
exports.Number = Number;
function Boolean(can_edit, mode, get_item, set_item) {
    return React.createElement("input", { disabled: !can_edit || mode == "view", type: "checkbox", checked: get_item(), onChange: (e) => {
            set_item(e.target.checked);
        } });
}
exports.Boolean = Boolean;
function DateTime(can_edit, mode, get_item, set_item) {
    let item = get_item();
    let default_value = `${format_int(item.year(), 4)}-${format_int(item.month() + 1, 2)}-${format_int(item.date(), 2)}T${format_int(item.hours(), 2)}:${format_int(item.minutes(), 2)}`;
    return mode == "view" ?
        React.createElement("div", null, `${format_int(item.date(), 2)}/${format_int(item.month() + 1, 2)}/${format_int(item.year(), 4)}  ${format_int(item.hours(), 2)}:${format_int(item.minutes(), 2)}`)
        : React.createElement("input", { disabled: !can_edit, type: "datetime-local", value: default_value, onChange: (e) => {
                set_item(Moment.utc(e.currentTarget.value));
            } });
}
exports.DateTime = DateTime;
function DateOnly(can_edit, mode, get_item, set_item) {
    let item = get_item();
    let default_value = `${format_int(item.year(), 4)}-${format_int(item.month() + 1, 2)}-${format_int(item.date(), 2)}`;
    return mode == "view" ?
        React.createElement("div", null, `${format_int(item.date(), 2)}/${format_int(item.month() + 1, 2)}/${format_int(item.year(), 4)}`)
        : React.createElement("input", { disabled: !can_edit, type: "date", value: default_value, onChange: (e) => {
                set_item(Moment.utc(new Date(e.currentTarget.value)).startOf('d').add(12, 'h'));
                // set_item(e.currentTarget.valueAsDate)
            } });
}
exports.DateOnly = DateOnly;
function Time(can_edit, mode, get_item, set_item) {
    let item = get_item();
    let default_value = `${format_int(item.hours(), 2)}:${format_int(item.minutes(), 2)}`;
    return mode == "view" ?
        React.createElement("div", null, default_value)
        : React.createElement("input", { disabled: !can_edit, type: "time", value: default_value, onChange: (e) => {
                set_item(Moment.utc(new Date(e.currentTarget.valueAsDate)));
                // set_item(e.currentTarget.valueAsDate)
            } });
}
exports.Time = Time;
function Union(can_edit, mode, options, get_item, set_item) {
    let item = get_item();
    let current = options.find(o => o.value == item);
    return mode == "view" ? React.createElement("div", null, current ? current.label : "") :
        React.createElement("select", { value: item, onChange: (s) => set_item(s.currentTarget.value) }, options.map(o => React.createElement("option", { key: o.value, value: o.value }, o.label)));
}
exports.Union = Union;
function Image(can_edit, mode, get_item, set_item) {
    return React.createElement(LazyImage.LazyImage, { can_edit: can_edit && mode == "edit", download: () => get_item(), upload: (new_src) => set_item(new_src) });
}
exports.Image = Image;
function RichText(can_edit, mode, get_item, set_item) {
    let item = get_item();
    return React.createElement(RichTextEditor.RichTextEditor, { initial_state: item ?
            RichTextEditor.RichTextEditor.deserialize_state(item) :
            RichTextEditor.RichTextEditor.empty_state(), set_state: (s, on_success) => {
            let new_value = RichTextEditor.RichTextEditor.serialize_state(s);
            set_item(new_value);
        }, editable: can_edit && mode == "edit" });
}
exports.RichText = RichText;
function File(can_edit, mode, url, label, upload) {
    return React.createElement("div", null,
        React.createElement("span", null,
            "Filename:",
            React.createElement("a", { href: url }, label)),
        mode == "view" ? null :
            React.createElement("input", { disabled: !can_edit, type: "file", onChange: (e) => {
                    let files = e.target.files;
                    upload(files[0]);
                } }));
}
exports.File = File;
//# sourceMappingURL=components.js.map