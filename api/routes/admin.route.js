import express from 'express';
import { createUser, getUsers, updateUser, deleteUser, searchUsers } from '../controllers/admin.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
import { verifyAdmin } from '../utils/verifyAdmin.js'; // Add this middleware

const router = express.Router();

// Admin routes 
router.post('/create', verifyToken, verifyAdmin, createUser);
router.get('/users', verifyToken, verifyAdmin, getUsers); 
router.put('/update/:id', verifyToken, verifyAdmin, updateUser);
router.delete('/delete/:id', verifyToken, verifyAdmin, deleteUser); 
router.get('/search', verifyToken, verifyAdmin, searchUsers); 

export default router;
