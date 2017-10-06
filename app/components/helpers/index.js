const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

var Helpers = {

    validateEmail(email) {
        return EMAIL_REGEX.test(email);
    },

    getEmailDomain(email) {
        let index = email.indexOf('@');
        return index !== -1 ? email.slice((index + 1), email.length) : false;
    },

    matchDomain(emailFirst, emailSecond) {
        return this.getEmailDomain(emailFirst) === this.getEmailDomain(emailSecond);
    },

    mapObjectToOptions(obj) {
        return Object.keys(obj).map(function (key) {
            return {
                label: obj[key],
                value: key
            };
        });
    },

}

export default Helpers;
