import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Message';
import Loader from '../Loader';
import FormContainer from '../FormContainer';
import { login } from '../../actions/userActions';

export default function LoginScreen({ history, location }) {
	//**************** variables ****************//
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const dispatch = useDispatch();

	const userLogin = useSelector(state => state.userLogin);
	const { loading, error, userInfo } = userLogin;

	const redirect = location.search ? location.search.split('=')[1] : '/';
	//**************** functions ****************//
	useEffect(() => {
		if (userInfo) {
			history.push(redirect);
		}
	}, [history, userInfo, redirect]);

	const submitHandler = e => {
		e.preventDefault();
		dispatch(login(email, password));
	};
	return (
		<FormContainer>
			<h1 className='text-center'>Sign In</h1>
			{error && <Message variant='danger'>{error}</Message>}
			{loading && <Loader />}
			<Form onSubmit={submitHandler}>
				<Form.Group controlId='email'>
					<Form.Label>Email</Form.Label>
					<Form.Control
						type='email'
						placeholder='email@example.com'
						value={email}
						onChange={e => setEmail(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId='password'>
					<Form.Label>Password</Form.Label>
					<Form.Control
						type='password'
						placeholder='********'
						value={password}
						onChange={e => setPassword(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Button className='btn-block dark-btn btn-form' type='submit' variant='primary'>
					Sign In
				</Button>
			</Form>

			<Row className='py-3'>
				<Col>
					New Customer?{' '}
					<Link
						to={redirect ? `/register?redirect=${redirect}` : '/register'}
					>
						&nbsp;Register
					</Link>
				</Col>
			</Row>
		</FormContainer>
	);
}
