import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './../Loader';
import Message from './../Message';
import { listUsers } from './../../actions/userActions';

export default function UserListScreen({ history }) {
	//**************** variables ****************//
	const dispatch = useDispatch();

	const userList = useSelector(state => state.userList);
	const { loading, error, users } = userList;

	const userLogin = useSelector(state => state.userLogin);
	const { userInfo } = userLogin;

	const redColor = {
		color: '#9B1414',
	};
   const redColorBg = {
      backgroundColor: '#9B1414'
   }
   const greenColor = {
      color: '#107229'
   }
	//**************** functions ****************//
	useEffect(() => {
		if (userInfo && userInfo.isAdmin) {
			dispatch(listUsers());
		} else {
			history.push('/login');
		}
	}, [dispatch, history, userInfo]);

	const deleteHandler = id => {
		if (window.confirm('Are you sure')) {
			// dispatch(deleteUser(id));
			console.log('user deleted!');
		}
	};
	return (
		<>
			<h2 className='text-center'>Users</h2>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<Table striped bordered hover responsive className='table-sm'>
					<thead>
						<tr>
							<th>ID</th>
							<th>NAME</th>
							<th>EMAIL</th>
							<th>ADMIN</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{users.map(user => (
							<tr key={user._id}>
								<td>{user._id}</td>
								<td>{user.name}</td>
								<td>
									<a href={`mailto:${user.email}`}>{user.email}</a>
								</td>
								<td>
									{user.isAdmin ? (
										<i
											className='fas fa-check'
											style={greenColor}
										></i>
									) : (
										<i
											className='fas fa-times'
											style={redColor}
										></i>
									)}
								</td>
								<td>
									<LinkContainer to={`/admin/user/${user._id}/edit`}>
										<Button variant='light' className='btn-sm'>
											<i className='fas fa-edit'></i>
										</Button>
									</LinkContainer>
									<Button
										style={redColorBg}
										className='btn-sm'
										onClick={() => deleteHandler(user._id)}
									>
										<i className='fas fa-trash'></i>
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</>
	);
}
