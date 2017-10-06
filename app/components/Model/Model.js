import moment from 'moment';

class Model {

    constructor(properties) {
        // clone props
        properties = Object.assign({}, properties || {});

        this._dateFields.forEach((f) => {
            if (typeof properties[f] !== 'undefined') {
                properties[f] = moment(properties[f]);
            }
        });

        let defaultValues = {};
        if (typeof this.defaultValues == 'function') {
            defaultValues = this.defaultValues() || {};
        }

        return Object.assign(this, defaultValues, properties);
    }

    isNew () {
        return !this.id;
    }

}

Model.prototype._dateFields = [];

export default Model;
