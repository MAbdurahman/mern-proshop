//**************** imports ****************//
import express from 'express';
import {
	authUser,
   getUserProfile,
   registerUser,
   updateUserProfile,
   getUsers,
   deleteUser
} from '../controllers/userController.js';
import {
   protect, admin
} from '../middleware/authMiddleware.js'

//**************** variables ****************//
const router = express.Router();

//**************** user routes ****************//
router.route('/').post(registerUser).get(protect, admin, getUsers);
router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

router.route('/:id').delete(protect, admin, deleteUser);

export default router;
