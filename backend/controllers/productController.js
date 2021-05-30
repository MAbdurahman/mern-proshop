import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

/*======================================================
      Get All Products  => /api/products/
=========================================================*/
const getProducts = asyncHandler(async (req, res) => {
	const products = await Product.find({});

	res.json(products);
});

/*=========================================================
      Get Single Product  => /api/products/:id
============================================================*/
const getProductById = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const product = await Product.findById(id);

	if (product) {
		res.json(product);

	} else {
		res.status(404);
		throw new Error('Product Not Found!');

	}
});

export {
   getProducts,
   getProductById
}

