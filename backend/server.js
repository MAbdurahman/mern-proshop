//**************** imports ****************//
import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';

import productRoutes from './routes/productRoutes.js';
import connectDatabase from './config/databaseConfig.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

//**************** variables ****************//
const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV;

//**************** configuration setup ****************//
dotenv.config();
connectDatabase();

//**************** middleware****************//
app.use(express.json());

//**************** routes****************//
app.get('/', (req, res) => {
	res.send('API is at Home');
});

app.use('/api/products', productRoutes);


//**************** handle errors middleware ****************//
app.use(notFound);
app.use(errorHandler);

//**************** app listening ****************//
const server = app.listen(PORT, () => {
	console.log(
		`The server is listening at - http://127.0.0.1:${PORT} in ${NODE_ENV} mode🔥`
			.yellow
	);
});
