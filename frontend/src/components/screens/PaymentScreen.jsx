import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from './../FormContainer';
import CheckoutSteps from './../CheckoutSteps';
import { savePaymentMethod } from './../../actions/cartActions';

export default function PaymentScreen({ history }) {
	//**************** variables ****************//
	const cart = useSelector(state => state.cart);
	const { shippingAddress } = cart;

	if (!shippingAddress.address) {
		history.push('/shipping');
	}

	const [paymentMethod, setPaymentMethod] = useState('PayPal');

	const dispatch = useDispatch();

	//**************** functions ****************//
	const submitHandler = e => {
		e.preventDefault();
		dispatch(savePaymentMethod(paymentMethod));
		history.push('/placeorder');
	};
	return (
		<FormContainer>
			<CheckoutSteps step1 step2 step3 />
			<h2 className='text-center'>Payment Method</h2>
			<Form onSubmit={submitHandler}>
				<Form.Group>
					<Form.Label as='legend'>Select Method</Form.Label>
					<Col>
						<Form.Check
							type='radio'
							label='PayPal or Credit Card'
							id='PayPal'
							name='paymentMethod'
							value='PayPal'
							checked
							onChange={e => setPaymentMethod(e.target.value)}
						></Form.Check>
						{
							<Form.Check
								type='radio'
								label='Stripe'
								id='Stripe'
								name='paymentMethod'
								value='Stripe'
								onChange={e => setPaymentMethod(e.target.value)}
							></Form.Check>
						}
					</Col>
				</Form.Group>

				<Button
					className='btn-block dark-btn'
					type='submit'
					variant='primary'
				>
					Continue
				</Button>
			</Form>
		</FormContainer>
	);
}
