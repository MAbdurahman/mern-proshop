import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	Row,
	Col,
	ListGroup,
	Image,
	Form,
	Button,
	Card,
} from 'react-bootstrap';
import Message from '../Message';
import { addToCart, removeFromCart } from '../../actions/cartActions';
import MetaData from '../MetaData';

export default function CartScreen({ history, location, match }) {
	//**************** variables ****************//
	const productId = match.params.id;
	const quantity = location.search ? Number(location.search.split('=')[1]) : 1;

	const dispatch = useDispatch();
	const cart = useSelector(state => state.cart);
	const { cartItems } = cart;

	//**************** functions ****************//
	useEffect(() => {
		if (productId) {
			dispatch(addToCart(productId, quantity));
		}
	}, [dispatch, productId, quantity]);

	const removeFromCartHandler = id => {
      dispatch(removeFromCart(id));
   };

	const checkoutHandler = () => {
		history.push('/login?redirect=shipping');
	};

	return (
		<Row>
			<MetaData title='Cart'/>
			<Col md={8}>
				<h2>Shopping Cart</h2>
				{cartItems.length === 0 ? (
					<Message>
						Your cart is empty &nbsp;
						<Link to='/'>
							&larr; Go Back
						</Link>
					</Message>
				) : (
					<ListGroup variant='flush'>
						{cartItems.map(item => (
							<ListGroup.Item key={item.product}>
								<Row>
									<Col md={2}>
										<Image
											src={item.image}
											alt={item.name}
											fluid
											rounded
										/>
									</Col>
									<Col md={3}>
										<Link to={`/product/${item.product}`}>
											{item.name}
										</Link>
									</Col>
									<Col md={2}>${item.price}</Col>
									<Col md={2}>
										<Form.Control
											as='select'
											value={item.quantity}
											onChange={e =>
												dispatch(addToCart(item.product, Number(e.target.value)))
											}
										>
											{[...Array(item.countInStock).keys()].map(
												x => (
													<option key={x + 1} value={x + 1}>
														{x + 1}
													</option>
												)
											)}
										</Form.Control>
									</Col>
									<Col md={2}>
										<Button
											className='cart-delete-button-main btn-block'
											type='button'
											
											onClick={() =>
												removeFromCartHandler(item.product)
											}
										>
											Delete
										</Button>
									</Col>
								</Row>
							</ListGroup.Item>
						))}
					</ListGroup>
				)}
			</Col>
			<Col md={4}>
				<Card>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<h3 className='form-heading'>
								Subtotal (
								{cartItems.reduce((acc, item) => acc + item.quantity, 0)})
								items
							</h3>
							$
							{cartItems
								.reduce((acc, item) => acc + item.quantity * item.price, 0)
								.toFixed(2)}
						</ListGroup.Item>
						<ListGroup.Item>
							<Button
								type='button'
								className='btn-block dark-btn cart-proceed-btn'
								disabled={cartItems.length === 0}
								onClick={checkoutHandler}
							>
								Proceed To Checkout
							</Button>
						</ListGroup.Item>
					</ListGroup>
				</Card>
			</Col>
		</Row>
	);
}
