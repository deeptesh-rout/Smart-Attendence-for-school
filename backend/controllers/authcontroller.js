const User = require('../models/User');
const bcrypt = require('bcrypt');


const signup = async (req, res) => {
    try {
        const { email, username, password,phoneNumber } = req.body;

        if (!email || !username || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

       
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: "Email or username already exists" });
        }

        
        const hashedPassword = await bcrypt.hash(password, 10);

   
        const user = await User.create({ email, username, password: hashedPassword });

        res.status(201).json({ message: "User registered successfully", userId: user._id });
    } catch (err) {
        if (err.code === 11000) {
            const field = Object.keys(err.keyPattern)[0];
            return res.status(400).json({ message: `${field} already exists` });
        }
        res.status(500).json({ error: err.message });
    }
};


const login = async (req, res) => {
    try {
        const { email, password } = req.body;

     
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

       
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

    
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        res.status(200).json({ message: "Login successful", userId: user._id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const googleCallback = (req, res) => {
    res.redirect('/dashboard'); 
};

module.exports = {
    signup,
    login,
    googleCallback
};
