const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require("../middleware/fetchUser")
const JWT_SECRET = process.env.JWT_SECRET;

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
        let success = false;
        // Check for validation errors
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({success, errors: errors.array() });
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
            success = true
            // Send token to user
            res.json({success, authToken });

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    }
);

// loging in a user
router.post(
    '/login',
    [
        body('email', 'Enter a valid email').isEmail(),
        body('password', 'password can not be blank').exists(),
    ],

    async (req, res) => {
        const errors = validationResult(req);
        let success = false
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {email, password} = req.body;
        try{
            let user = await  User.findOne({email})
            if(!user){
                return res.status(400).json({success, error: "please try to loggin with the correct credential "})
            }

            const passwordcompare = await bcrypt.compare(password, user.password);
            if(!passwordcompare){
                return res.status(400).json({success, error: "please try to loggin with the correct credential "})
            }

            // Data to be stored in JWT
            const data = {
                user: {
                    id: user.id
                }
            };

            // Generate JWT Token
            const authToken = jwt.sign(data, JWT_SECRET);
            success = true
            // Send token to user
            res.json({success, authToken });
        }catch(error){
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    }
)

router.post(
    '/getuser',
    
    fetchUser,

    async (req, res) => {
        try{
            userId = req.user.id;
            const user = await User.findById(userId).select("-password")
            res.send(user)
        }catch(error){
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    }
)
module.exports = router;