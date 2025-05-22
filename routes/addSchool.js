const express = require('express');
const { check, validationResult } = require('express-validator');

const addSchoolController = require('../controllers/addSchool-controller');

const router = express.Router();

router.post(
    '/',
    [
        check('name')
            .not()
            .isEmpty()
            .isString()
            .withMessage('Name is required.'),
        check('address')
            .not()
            .isEmpty()
            .isString()
            .withMessage('Address is required.'),
        check('latitude')
            .not()
            .isEmpty()
            .isFloat({ min: -90, max: 90 })
            .withMessage('Latitude must be a number between -90 and 90.'),
        check('longitude')
            .not()
            .isEmpty()
            .isFloat({ min: -180, max: 180 })
            .withMessage('Longitude must be a number between -180 and 180.')
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next(); // Proceed to the controller if validation passes
    },
    addSchoolController.addSchool
);

module.exports = router;