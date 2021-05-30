//**************** imports ****************//
import express from 'express';
import {
	authUser,
   getUserProfile,
   registerUser
} from '../controllers/userController.js';
import {
   protect
} from '../middleware/authMiddleware.js'

//**************** variables ****************//
const router = express.Router();

//**************** user routes ****************//
router.route('/').post(registerUser)
router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile);

export default router;
