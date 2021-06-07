import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './../Loader';
import Message from './../Message';
import Paginate from './../Paginate';
import {
	listProducts,
	createProduct,
	deleteProduct,
} from './../../actions/productActions';
import { PRODUCT_CREATE_RESET } from './../../constants/productConstants';

export default function ProductListScreen({ history, match }) {
	//**************** variables ****************//
	const pageNumber = match.params.pageNumber || 1;

	const dispatch = useDispatch();

	const productList = useSelector(state => state.productList);
	const { loading, error, products, pages, page } = productList;

	const userLogin = useSelector(state => state.userLogin);
	const { userInfo } = userLogin;

	const productCreate = useSelector(state => state.productCreate);
	const {
		loading: loadingCreate,
		error: errorCreate,
		success: successCreate,
		product: createdProduct,
	} = productCreate;

	const productDelete = useSelector(state => state.productDelete);
	const {
		loading: loadingDelete,
		error: errorDelete,
		success: successDelete,
	} = productDelete;

		// const redColor = {
		// 	color: '#9B1414',
		// };
		const redColorBg = {
			backgroundColor: '#9B1414',
		};
		// const greenColor = {
		// 	color: '#107229',
		// };
	//**************** functions ****************//
	useEffect(() => {
		// if (userInfo && userInfo.isAdmin) {
		// 	dispatch(listProducts());
		// } else {
		// 	history.push('/login');
		// }
		dispatch({ type: PRODUCT_CREATE_RESET });

		if (!userInfo || !userInfo.isAdmin) {
			history.push('/login');

		}

		if (successCreate) {
			history.push(`/admin/product/${createdProduct._id}/edit`);

		} else {
			dispatch(listProducts('', pageNumber));
      
		}
	}, [dispatch, history, successDelete, createdProduct, successCreate, userInfo, pageNumber]);

	const deleteHandler = id => {
		if (window.confirm('Are you sure?')) {
			dispatch(deleteProduct(id));
		}
	};

	const createProductHandler = () => {
		dispatch(createProduct());
	};
	return (
		<>
			<Row className='align-items-center'>
				<Col>
					<h2>Products</h2>
				</Col>
				<Col className='text-right'>
					<Button className='my-3 dark-btn' onClick={createProductHandler}>
						<i className='fas fa-plus'></i> Create Product
					</Button>
				</Col>
			</Row>
			{loadingDelete && <Loader />}
			{errorDelete && <Message variant='danger'>{errorDelete}</Message>}
			{loadingCreate && <Loader />}
			{errorCreate && <Message variant='danger'>{errorCreate}</Message>}
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<>
					<Table striped bordered hover responsive className='table-sm'>
						<thead>
							<tr>
								<th>ID</th>
								<th>NAME</th>
								<th>PRICE</th>
								<th>CATEGORY</th>
								<th>BRAND</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{products.map(product => (
								<tr key={product._id}>
									<td>
										<Link to={`/product/${product._id}`}>
											{product._id}
										</Link>
									</td>
									<td>{product.name}</td>
									<td>${product.price}</td>
									<td>{product.category}</td>
									<td>{product.brand}</td>
									<td>
										<LinkContainer
											to={`/admin/product/${product._id}/edit`}
										>
											<Button variant='light' className='btn-sm'>
												<i className='fas fa-edit'></i>
											</Button>
										</LinkContainer>
										<Button
											variant='danger'
											className='btn-sm'
											style={redColorBg}
											onClick={() => deleteHandler(product._id)}
										>
											<i className='fas fa-trash'></i>
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
					<Paginate pages={pages} page={page} isAdmin={true} />
				</>
			)}
		</>
	);
}
