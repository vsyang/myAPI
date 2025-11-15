const validator = require('../helpers/validate');

const savePet = (req, res, next) => {
    const validationRule = {
        name: 'required|string',
        birthday: 'required|string',
        gender: 'required|string',
        breed: 'required|string',
        weight: 'required|numeric|min:1',
        sizeClass: 'required|string',
        temperament: 'required|string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

const saveOwner = (req, res, next) => {
    const validationRule = {
        firstName: 'required|string',
        lastName: 'required|string',
        email: 'required|email',
        phone: 'required|string|min:7',
        address: 'required|string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

module.exports = {
    savePet,
    saveOwner
};