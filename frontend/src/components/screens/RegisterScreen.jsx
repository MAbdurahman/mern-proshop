import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Message';
import Loader from '../Loader';
import FormContainer from '../FormContainer';
import { register } from '../../actions/userActions';

export default function RegisterScreen({ history, location }) {
	//**************** variables ****************//
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [message, setMessage] = useState(null);

	const dispatch = useDispatch();

	const userRegister = useSelector(state => state.userRegister);
	const { loading, error, userInfo } = userRegister;

	const redirect = location.search ? location.search.split('=')[1] : '/';

	//**************** functions ****************//
	useEffect(() => {
		if (userInfo) {
			history.push(redirect);
		}
	}, [history, userInfo, redirect]);

	const submitHandler = e => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setMessage('Passwords Do Not Match!');

		} else {
         setMessage(null);
			dispatch(register(name, email, password));

		}
	};
	return (
		<FormContainer>
			<h1 className='text-center'>Sign Up</h1>
			{message && <Message variant='danger'>{message}</Message>}
			{error && <Message variant='danger'>{error}</Message>}
			{loading && <Loader />}
			<Form onSubmit={submitHandler}>
				<Form.Group controlId='name'>
					<Form.Label>Name</Form.Label>
					<Form.Control
						type='name'
						placeholder='First and last name'
						value={name}
						onChange={e => setName(e.target.value)}
					></Form.Control>
				</Form.Group>
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
						placeholder='Password'
						value={password}
						onChange={e => setPassword(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId='confirmPassword'>
					<Form.Label>Confirm Password</Form.Label>
					<Form.Control
						type='password'
						placeholder='Confirmed password'
						value={confirmPassword}
						onChange={e => setConfirmPassword(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Button
					className='btn-block dark-btn btn-form'
					type='submit'
					variant='primary'
				>
					Sign Up
				</Button>
			</Form>

			<Row className='py-3'>
				<Col>
					Have an Account?&nbsp;&nbsp;
					<Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
						Sign In
					</Link>
				</Col>
			</Row>
		</FormContainer>
	);
}
