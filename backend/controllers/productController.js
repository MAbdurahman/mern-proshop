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

/*===============================================================
      (admin) DeleteProduct  => (DELETE)/api/products/:id
==================================================================*/
const deleteProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);

	if (product) {
		await product.remove();
		res.json({ message: 'Product Removed!' });
		
	} else {
		res.status(404);
		throw new Error('Product Not Found!');
	}
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
/*===============================================================
      (admin) CreateProduct  => (POST)/api/products
==================================================================*/
const createProduct = asyncHandler(async (req, res) => {
	const product = new Product({
		name: 'Sample name',
		price: 0,
		user: req.user._id,
		image: '/images/sample.jpg',
		brand: 'Sample brand',
		category: 'Sample category',
		countInStock: 0,
		numReviews: 0,
		description: 'Sample description',
	});

	const createdProduct = await product.save();
	res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
/*===============================================================
      (admin) UpdateProduct  => (PUT)/api/products/:id
==================================================================*/
const updateProduct = asyncHandler(async (req, res) => {
	const {
		name,
		price,
		description,
		image,
		brand,
		category,
		countInStock,
	} = req.body;

	const product = await Product.findById(req.params.id);

	if (product) {
		product.name = name;
		product.price = price;
		product.description = description;
		product.image = image;
		product.brand = brand;
		product.category = category;
		product.countInStock = countInStock;

		const updatedProduct = await product.save();
		res.json(updatedProduct);
	} else {
		res.status(404);
		throw new Error('Product not found');
	}
});

export {
	getProducts,
	getProductById,
	deleteProduct,
	createProduct,
	updateProduct,
};
