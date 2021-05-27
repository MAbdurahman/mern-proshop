//**************** imports ****************//
import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import products from '../data/products.js';

import connectDatabase from './config/databaseConfig.js';

//**************** variables ****************//
const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV;


//**************** configuration setup ****************//
dotenv.config();
connectDatabase();



//**************** restful apis ****************//
app.get('/', (req, res) => {
	res.send('API is at Home');
})
app.get('/api/products', (req, res) => {
	res.json(products)
});
app.get('/api/products/:id', (req, res) => {
	const { id } = req.params;
	const product = products.find(product => product._id === id);
	res.json(product);
});


//**************** app listening ****************//
const server = app.listen(PORT, () => {
   console.log(
		`The server is listening at - http://127.0.0.1:${PORT} in ${NODE_ENV} mode🔥`.yellow
	);
});