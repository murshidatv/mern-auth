
import express from 'express';
import { verifyAdmin } from '../utils/verifyAdmin.js';
import { getUsers , getUserById ,searchUsers} from '../controllers/user.controller.js';
import { updateUserByAdmin, deleteUserByAdmin } from '../controllers/user.controller.js';
const router = express.Router();

// Protected Admin Route
router.get('/dashboard', verifyAdmin, (req, res) => {
  res.status(200).json({ message: 'Welcome to the Admin Dashboard' });
});

router.get('/users', verifyAdmin, getUsers);

router.get('/users/search', searchUsers);


router.get('/users/:id', verifyAdmin, getUserById);

// Admin can update any user's profile
router.post('/update/:id', verifyAdmin, updateUserByAdmin);

// Admin can delete any user
router.delete('/delete/:id', verifyAdmin, deleteUserByAdmin);
export default router;
