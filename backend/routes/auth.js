const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

// Create a user using POST "/api/auth/createuser"
router.post(
    '/createuser',
    [
        body('name', 'Name must be at least 3 characters').isLength({ min: 3 }),
        body('email', 'Enter a valid email').isEmail(),
        body('password', 'Password must be at least 8 characters').isLength({ min: 8 })
    ],

    async (req, res) => {

        // Check validation errors
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            //checking existinguser
             let user = await User.findOne({ email: req.body.email });
                console.log(user)
            if (user) {
                return res.status(400).json({
                    error: "Sorry, a user with this email already exists"
                });
            }
            // Create and save user
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });

            res.json(user);

        } catch (error) {
           console.error(error.message);
           res.status(500).send("Dont duplicate the values bro");
        }
    }
);

module.exports = router;