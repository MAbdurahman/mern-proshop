import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from './../Message';
import CheckoutSteps from './../CheckoutSteps';
import { createOrder } from './../../actions/orderActions';
import { ORDER_CREATE_RESET } from './../../constants/orderConstants';
import { USER_DETAILS_RESET } from './../../constants/userConstants';
import MetaData from '../MetaData';

export default function PlaceOrderScreen({ history }) {
	//**************** variables ****************//
	const dispatch = useDispatch();

	const cart = useSelector(state => state.cart);

	if (!cart.shippingAddress.address) {
		history.push('/shipping');
	} else if (!cart.paymentMethod) {
		history.push('/payment');
	}
	//******** calculate prices ********//
	const addDecimals = num => {
		return (Math.round(num * 100) / 100).toFixed(2);
	};

	cart.itemsPrice = addDecimals(
		cart.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
	);
	cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100);
	cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
	cart.totalPrice = (
		Number(cart.itemsPrice) +
		Number(cart.shippingPrice) +
		Number(cart.taxPrice)
	).toFixed(2);

	const orderCreate = useSelector(state => state.orderCreate);
	const { order, success, error } = orderCreate;

	//**************** functions ****************//
	useEffect(() => {
		if (success) {
			history.push(`/order/${order._id}`);
			dispatch({ type: USER_DETAILS_RESET });
			dispatch({ type: ORDER_CREATE_RESET });
		}
		// eslint-disable-next-line
	}, [dispatch, history, success]);

	const placeOrderHandler = () => {
		dispatch(
			createOrder({
				orderItems: cart.cartItems,
				shippingAddress: cart.shippingAddress,
				paymentMethod: cart.paymentMethod,
				itemsPrice: cart.itemsPrice,
				shippingPrice: cart.shippingPrice,
				taxPrice: cart.taxPrice,
				totalPrice: cart.totalPrice,
			})
		);
	};
	return (
		<>
		<MetaData title='Place Order'/>
			<CheckoutSteps step1 step2 step3 step4 />
			<Row className='mt-4'>
				<Col md={8}>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<h2>Shipping</h2>
							<p>
								<strong>Address:</strong>&nbsp;
								{cart.shippingAddress.address},{' '}
								{cart.shippingAddress.city}{' '}
								{cart.shippingAddress.postalCode},{' '}
								{cart.shippingAddress.country}
							</p>
						</ListGroup.Item>

						<ListGroup.Item>
							<h3 className='placeorder-h3'>Payment Method</h3>&nbsp;
							<strong>Method: </strong>
							{cart.paymentMethod}
						</ListGroup.Item>

						<ListGroup.Item>
							<h3 className='placeorder-h3'>Order Items</h3>
							{cart.cartItems.length === 0 ? (
								<Message>Your cart is empty</Message>
							) : (
								<ListGroup variant='flush'>
									{cart.cartItems.map((item, index) => (
										<ListGroup.Item key={index}>
											<Row>
												<Col md={2}>
													<Image
														src={item.image}
														alt={item.name}
														fluid
														rounded
													/>
												</Col>
												<Col>
													<Link to={`/product/${item.product}`}>
														{item.name}
													</Link>
												</Col>
												<Col md={5} className='placeorder-price'>
													{item.quantity} x ${item.price} = $
													{(item.quantity * item.price).toFixed(2)}
												</Col>
											</Row>
										</ListGroup.Item>
									))}
								</ListGroup>
							)}
						</ListGroup.Item>
					</ListGroup>
				</Col>
				<Col md={4}>
					<Card>
						<ListGroup variant='flush'>
							<ListGroup.Item>
								<h3 className='placeorder-h3'>Order Summary</h3>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Items</Col>
									<Col>${cart.itemsPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Shipping</Col>
									<Col>${cart.shippingPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Tax</Col>
									<Col>${cart.taxPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Total</Col>
									<Col>${cart.totalPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								{error && <Message variant='danger'>{error}</Message>}
							</ListGroup.Item>
							<ListGroup.Item>
								<Button
									type='button'
									className='btn-block dark-btn'
									disabled={cart.cartItems === 0}
									onClick={placeOrderHandler}
								>
									Place Order
								</Button>
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	);
}
