const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = "thisismysecretkey";

// Create a user using POST "/api/auth/createuser"
// Doesn't require authentication
router.post(
    '/createuser',
    [
        body('name', 'Name must be at least 3 characters').isLength({ min: 3 }),
        body('email', 'Enter a valid email').isEmail(),
        body('password', 'Password must be at least 8 characters').isLength({ min: 8 })
    ],

    async (req, res) => {

        // Check for validation errors
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {

            // Check whether the user already exists
            let user = await User.findOne({ email: req.body.email });

            if (user) {
                return res.status(400).json({
                    error: "Sorry, a user with this email already exists"
                });
            }

            // Generate Salt
            const salt = await bcrypt.genSalt(10);

            // Secure Password
            const secPass = await bcrypt.hash(req.body.password, salt);

            // Create User
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass
            });

            // Data to be stored in JWT
            const data = {
                user: {
                    id: user.id
                }
            };

            // Generate JWT Token
            const authToken = jwt.sign(data, JWT_SECRET);

            // Send token to user
            res.json({ authToken });

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    }
);

module.exports = router;