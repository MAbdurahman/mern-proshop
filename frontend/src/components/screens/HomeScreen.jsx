import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import Product from '../Product';
import Loader from '../Loader';
import Message from '../Message';
import MetaData from './../MetaData';
import Paginate from './../Paginate';
import ProductCarousel from './../ProductCarousel';
import { listProducts } from './../../actions/productActions';

export default function HomeScreen({ match }) {
	//**************** variables ****************//
	const keyword = match.params.keyword;
	const pageNumber = match.params.pageNumber || 1;
	const dispatch = useDispatch();

	const productList = useSelector(state => state.productList);
	const { loading, error, products, pages, page } = productList;

	//**************** functions ****************//
	useEffect(() => {
		dispatch(listProducts(keyword, pageNumber));
	}, [dispatch, keyword, pageNumber]);

	return (
		<>
		<MetaData title='Home'/>
			{!keyword ? (
				<ProductCarousel />
			) : (
				<Link to='/' className='btn btn-light dark-outline mt-3'>
					Go Back
				</Link>
			)}
			<h2>Latest Products</h2>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<>
					<Row>
						{products.map(product => (
							<Col key={product._id} sm='12' md='6' lg='4' xl='3'>
								<Product product={product} />
							</Col>
						))}
					</Row>
					<Paginate
						pages={pages}
						page={page}
						keyword={keyword ? keyword : ''}
					/>
				</>
			)}
		</>
	);
}
