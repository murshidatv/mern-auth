import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';





// Create a new user (admin only)
export const createUser = async (req, res, next) => {
    const { username, email, password, profilePicture, isAdmin } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    
    const newUser = new User({
        username, 
        email, 
        password: hashedPassword, 
        profilePicture, 
        isAdmin: isAdmin || false
    });

    try {
        await newUser.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        next(error);
    }
};

// Get all users (admin only)
export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

// Update user information (admin only)
export const updateUser = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorHandler(403, 'You are not authorized to perform this action.'));
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
};

// Delete a user (admin only)
export const deleteUser = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorHandler(403, 'You are not authorized to perform this action.'));
    }

    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json('User has been deleted.');
    } catch (error) {
        next(error);
    }
};

// Search users (admin only)
export const searchUsers = async (req, res, next) => {
    const query = req.query.query;
    try {
        const users = await User.find({
            $or: [
                { username: { $regex: query, $options: 'i' } },
                { email: { $regex: query, $options: 'i' } },
            ]
        });
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};
