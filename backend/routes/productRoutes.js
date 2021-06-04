//**************** imports ****************//
import express from 'express';
import {
   getProducts,
   getProductById,
   deleteProduct,
   createProduct,
   updateProduct
   } from '../controllers/productController.js';
import { protect, admin } from './../middleware/authMiddleware.js'

//**************** variables ****************//
const router = express.Router();

//**************** product routes ****************//
router.route('/').get(getProducts)
router.route('/').post(protect, admin, createProduct)


router.route('/:id').get(getProductById)
router.route('/:id').delete(protect, admin, deleteProduct)
router.route('/:id').put(protect, admin, updateProduct)



export default router;
