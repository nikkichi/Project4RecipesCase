"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const i18next = require("i18next");
class LazyImage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = { image: "loading" };
    }
    componentWillMount() {
        this.props.download().then(src => this.setState(Object.assign({}, this.state, { image: { src: src } })));
    }
    render() {
        if (this.state.image == "loading")
            return React.createElement("div", { className: "loading" }, "Loading...");
        if (this.state.image == "uploading")
            return React.createElement("div", { className: "uploading" }, "Uploading...");
        return React.createElement("div", { className: "lazy-image" },
            React.createElement("img", { id: `${this.props.entity_name}_${this.props.entity_id}_${this.props.image_name}`, src: this.state.image.src }),
            this.props.can_edit ?
                React.createElement("div", { className: "image-controls" },
                    React.createElement("a", { className: "user button button--delete", style: !this.props.can_edit ? { pointerEvents: "none" } : {}, onClick: () => {
                            if (confirm(i18next.t('Are you sure?'))) {
                                let new_value = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAMSURBVBhXY/j//z8ABf4C/qc1gYQAAAAASUVORK5CYII=";
                                this.setState(Object.assign({}, this.state, { image: "uploading" }), () => this.props.upload(new_value).then(() => this.setState(Object.assign({}, this.state, { image: { src: new_value } }))));
                                {
                                }
                            }
                        } }),
                    React.createElement("input", { disabled: !this.props.can_edit, type: "file", accept: "image/*", onChange: (e) => {
                            let files = e.target.files;
                            let file_reader = new FileReader();
                            file_reader.onload = ((e) => {
                                let new_value = file_reader.result;
                                this.setState(Object.assign({}, this.state, { image: "uploading" }), () => this.props.upload(new_value).then(() => this.setState(Object.assign({}, this.state, { image: { src: new_value } }))));
                                {
                                }
                            });
                            file_reader.readAsDataURL(files[0]);
                        } }))
                :
                    null);
    }
}
exports.LazyImage = LazyImage;
//# sourceMappingURL=lazy_image.js.map