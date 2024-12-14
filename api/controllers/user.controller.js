
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';
import bcryptjs from 'bcryptjs';

export const test = (req,res)=>{
    res.json({
        message:'hello'
    })
}


export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
      return next(errorHandler(401, 'You can update only your account!'));
    }
    try {
      if (req.body.password) {
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
      }
  
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            profilePicture: req.body.profilePicture,
          },
        },
        { new: true }
      );
      const { password, ...rest } = updatedUser._doc;
      res.status(200).json(rest);
    } catch (error) {
      next(error);
    }
  };

  export const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
      return next(errorHandler(401, 'You can delete only your account!'));
    }
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json('User has been deleted...');
    } catch (error) {
      next(error);
    }
  
  }

  export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find({ isAdmin: { $ne: true } })
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  };

  export const getUserById = async (req, res, next) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        if (!user) {
            return next(errorHandler(404, 'User not found'));
        }

        // Optionally remove sensitive data like password before sending the response
        const { password, ...rest } = user._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};

export const updateUserByAdmin = async (req, res, next) => {
    const { id } = req.params; // Get user ID from the route parameter
    const { username, email, profilePicture, password } = req.body; // Get the fields to update from the request body
  
    try {
      // If password is provided, hash it before updating
      let updatedData = { username, email, profilePicture };
  
      if (password) {
        const hashedPassword = bcryptjs.hashSync(password, 10); // Hash the new password
        updatedData.password = hashedPassword;
      }
  
      // Find and update the user by ID
      const updatedUser = await User.findByIdAndUpdate(id, updatedData, { new: true });
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Respond with the updated user (excluding password)
      const { password: _, ...rest } = updatedUser._doc; // Omit the password field
      res.status(200).json(rest);
    } catch (error) {
      next(error); // Pass errors to error handler middleware
    }
  };

  export const deleteUserByAdmin = async (req, res, next) => {
    const { id } = req.params; // Get user ID from the route parameter
  
    try {
      // Find and delete the user by ID
      const deletedUser = await User.findByIdAndDelete(id);
  
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Respond with a success message
      res.status(200).json({ message: 'User has been deleted' });
    } catch (error) {
      next(error); // Pass errors to error handler middleware
    }
  };

  export const searchUsers = async (req, res, next) => {
    const { query } = req.query; // Get search query from request query parameters

    try {
        // Search for users whose username or email matches the query (case-insensitive)
        const users = await User.find({
            isAdmin: { $ne: 1 },
            $or: [
                { username: { $regex: query, $options: "i" } },
                { email: { $regex: query, $options: "i" } }
            ]
        });

        res.status(200).json(users);
    } catch (error) {
        next(error); // Handle errors with middleware
    }
};