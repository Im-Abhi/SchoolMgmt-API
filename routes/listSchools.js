const express = require('express');
const { check, validationResult } = require('express-validator');

const listSchoolsController = require('../controllers/listSchools-controller');

const router = express.Router();

router.get(
    '/',
    [
        check('latitude')
            .isFloat({ min: -90, max: 90 })
            .withMessage('Latitude must be a number(FLOAT) between -90 and 90.'),
        check('longitude')
            .isFloat({ min: -180, max: 180 })
            .withMessage('Longitude must be a number(FLOAT) between -180 and 180.')
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        errors.errors.map(error => error.location = "query")
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next(); // Proceed to the controller if validation passes
    },
    listSchoolsController.listSchools
);

module.exports = router;