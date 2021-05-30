//**************** imports ****************//
import express from 'express';
import {
	authUser
} from '../controllers/userController.js';

//**************** variables ****************//
const router = express.Router();

//**************** user routes ****************//
router.post('/login', authUser)

export default router;
