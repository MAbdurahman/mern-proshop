//**************** imports ****************//
import express from 'express';
import asyncHandler from 'express-async-handler';
import Product from '../models/ProductModel.js';
import { notFound, errorHandler } from '../middleware/errorMiddleware.js';

//**************** variables ****************//
const router = express.Router();

//**************** product routes ****************//
router.get('/', asyncHandler( async (req, res) => {
	const products = await Product.find({});
   res.json(products);

}));
router.get('/:id', asyncHandler( async (req, res) => {
	const { id } = req.params;
	const product = await Product.findById(id);
   if (product) {
      res.json(product);

   } else {
      res.status(404);
      throw new Error('Product Not Found!');
   }

}));

export default router;
