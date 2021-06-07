import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';
import Order from '../models/orderModel.js';

/*======================================================
      Get All Products  => /api/products/
=========================================================*/
const getProducts = asyncHandler(async (req, res) => {
	const pageSize = 4;
	const page = Number(req.query.pageNumber) || 1;

	const keyword = req.query.keyword
		? {
				name: {
					$regex: req.query.keyword,
					$options: 'i',
				},
			}
		: {};

	const count = await Product.countDocuments({ ...keyword });
	const products = await Product.find({ ...keyword })
		.limit(pageSize)
		.skip(pageSize * (page - 1));

	res.json({ products, page, pages: Math.ceil(count / pageSize) });
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

/*===============================================================
      (admin) CreateProduct  => (POST)/api/products
==================================================================*/
const createProduct = asyncHandler(async (req, res) => {
	const product = new Product({
		name: 'Default Name',
		price: 0,
		user: req.user._id,
		image: '/images/default_product.png',
		brand: 'Default Brand',
		category: 'Default Category',
		countInStock: 0,
		numReviews: 0,
		description: 'Default Description',
	});

	const createdProduct = await product.save();
	res.status(201).json(createdProduct);
});

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
		throw new Error('Product Not Found!');
	}
});

/*========================================================================
   (protected)Create New Review  => (POST)/api/products/:id/reviews
===========================================================================*/
const createProductReview = asyncHandler(async (req, res) => {
	const { rating, comment } = req.body;

	const product = await Product.findById(req.params.id);

	//**************** bring in users orders ****************//
	const orders = await Order.find({ user: req.user._id });

	//***** an array of product ids that user has ordered *****//
	const orderItems = [].concat.apply(
		[],
		orders.map(order => order.orderItems.map(item => item.product.toString()))
	);

	if (product) {
		//***** check if product id matches user orderedItems *****//
		const hasBought = orderItems.includes(product._id.toString());

		if (!hasBought) {
			res.status(400);
			throw new Error('Only Can Review Products Bought!');
		}

		const alreadyReviewed = product.reviews.find(
			r => r.user.toString() === req.user._id.toString()
		);

		if (alreadyReviewed) {
			res.status(400);
			throw new Error('Product Already Reviewed!');
		}

		const review = {
			name: req.user.name,
			rating: Number(rating),
			comment,
			user: req.user._id,
		};

		product.reviews.push(review);

		product.numReviews = product.reviews.length;

		product.rating =
			product.reviews.reduce((acc, item) => item.rating + acc, 0) /
			product.reviews.length;

		await product.save();
		res.status(201).json({ message: 'Review Added' });
	} else {
		res.status(404);
		throw new Error('Product Not Found!');
	}
});

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
	const products = await Product.find({}).sort({ rating: -1 }).limit(3);

	res.json(products);
});

export {
	getProducts,
	getProductById,
	deleteProduct,
	createProduct,
	updateProduct,
	createProductReview,
	getTopProducts,
};
