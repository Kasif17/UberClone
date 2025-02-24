const { body, validationResult } = require('express-validator');

const validateRequest = async (req, res, next) => {
    // rule
    const rules = [
        body('fullName.firstName')
            .notEmpty().withMessage('First Name must not be empty')
            .isLength({ min: 3 }).withMessage('First Name must be at least 3 characters long'),
        body('fullName.lastName')
            .optional()
            .isLength({ min: 3 }).withMessage('Last Name must be at least 3 characters long'),
        body('email')
            .notEmpty().withMessage('Email must not be empty')
            .isEmail().withMessage('Email must be a valid email address'),
        body('password')
            .notEmpty().withMessage('Password must not be empty')
            .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
        body('vehical.color')
            .notEmpty().isLength({ min: 3 }).withMessage('vehical color must be at least 3 characters long'),
        body('vehical.plate')
            .notEmpty().isLength({ min: 3 }).withMessage('vehical plate must be at least 3 characters long'),
        body('vehical.capacity').isInt({ min: 1 }).withMessage('vehical capacity must be at least 1 characters long'),
        body('vehical.vehicalType').isIn(['car','motorcycle','auto']).withMessage('invalid type')
    ];


    // run 
    await Promise.all(rules.map((rule) => rule.run(req)));

    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        return res.status(400).json({
                        success: false,
                        errorMassage:validationErrors.array()[0].msg
                    });
    }

    next();
};

module.exports = validateRequest;
