
import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

/*======================================================
      Get All Products  => /api/products/
=========================================================*/
export const getProducts = asyncHandler(async(req, res) => {
   const products = await Product.find({});

   res.json(products);

})