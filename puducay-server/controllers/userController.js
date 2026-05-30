const User = require('../models/User');
const bcrypt = require('bcryptjs'); // For password hashing
const jwt = require('jsonwebtoken'); // For generating tokens

const getUsers = async (req, res) => {
    try {
        const users = await User.find({}, '-password'); // Exclude the password field
        res.json({ users });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createUser = async (req, res) => {
    try {

        const existingEmail = await User.findOne({
            email: req.body.email
        });

        if (existingEmail) {
            return res.status(400).json({
                message: 'Email already exists',
            });
        }

        const existingUsername = await User.findOne({
            username: req.body.username
        });

        if (existingUsername) {
            return res.status(400).json({
                message: 'Username already exists',
            });
        }

        if (!req.body.password) {
            return res.status(400).json({
                message: 'Password is required',
            });
        }

        const hashedPassword = await bcrypt.hash(
            req.body.password,
            10
        );

        const user = await User.create({
    ...req.body,
    type: req.body.type?.toLowerCase() || 'viewer',
    password: hashedPassword,
});

        res.status(201).json(user);

    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};

const updateUser = async (req, res) => {
    try {
        // Check if the password is being updated
        if (req.body.password) {
            // Hash the new password
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }
if (req.body.type) {
    req.body.type = req.body.type.toLowerCase();
}
        // Update the user with the new data
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });

        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!user.isActive) {
            return res.status(403).json({
                message: 'Your account is inactive. Please contact support.'
            });
        }

        const userType = user.type?.toLowerCase();

        if (userType === 'viewer') {
            return res.status(403).json({
                message: 'Viewers are not allowed to log in.'
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email, type: userType },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({
            message: 'Login successful',
            token,
            type: userType,
            firstName: user.firstName
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getUsers, createUser, updateUser, deleteUser, loginUser };