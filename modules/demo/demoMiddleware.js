let _v = require('../../helper/validate.js');
let utils = require('../../helper/utils.js');
let demoValidator = require('./demoValidator.js');
let demoMiddleware = {};

demoMiddleware.validateInput = (type, validateType) => {
    return function (req, res, next) {
            var demoValidators = {};
            var validators = demoValidator.getuserValidator(req,type);
            demoValidators = validators
            var error = _v.validate(req.body, demoValidators);
            if (!utils.empty(error)) {
                return errorUtil.validationError(res, error);
            }
            next();
        };
},
module.exports = demoMiddleware;

