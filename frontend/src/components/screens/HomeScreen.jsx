import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';

import Product from '../Product';
import Loader from '../Loader';
import Message from '../Message';
import { listProducts } from './../../actions/productActions';

export default function HomeScreen({ match }) {
	//**************** variables ****************//
	const keyword = match.params.keyword;
	const dispatch = useDispatch();
	const productList = useSelector(state => state.productList);
	const { loading, error, products } = productList;

	//**************** functions ****************//
	useEffect(() => {
		dispatch(listProducts(keyword));
	}, [dispatch, keyword]);

	return (
		<>
			<h1>Latest Products</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<Row>
					{products.map(product => (
						<Col key={product._id} sm='12' md='6' lg='4' xl='3'>
							<Product product={product} />
						</Col>
					))}
				</Row>
			)}
		</>
	);
}
