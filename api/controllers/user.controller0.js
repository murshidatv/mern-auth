import { errorHandler } from "../utils/error.js";
import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';

export const test = (req, res) => {
  res.json({
    message: 'API is working!',
  });
};

// Update User
export const updateUser = async (req, res, next) => {
  // Check if the logged-in user is trying to update their own profile
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, 'You can update only your account!'));
  }

  try {
    // Hash the password if it is provided
    if (req.body.password) {
      req.body.password = await bcryptjs.hashSync(req.body.password, 10);
    }

    // Update the user in the database
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          profilePicture: req.body.profilePicture, // Save the profile picture URL
        }
      },
      { new: true } // This option ensures that the updated document is returned
    );

    // Remove the password field from the response
    const { password, ...rest } = updatedUser._doc;

    // Send the response with the updated user info
    res.status(200).json({ success: true, user: rest });

  } catch (error) {
    next(error); // Pass any errors to the error handling middleware
  }
};
