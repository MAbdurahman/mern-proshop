import React from 'react';
import { Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown, Image } from 'react-bootstrap';
import SearchBox from './SearchBox';
import { logout } from '../actions/userActions';

export default function Header() {
	//**************** variables ****************//
	const dispatch = useDispatch();

	const userLogin = useSelector(state => state.userLogin);
	const { userInfo } = userLogin;

	//**************** functions ****************//
	const logoutHandler = () => {
		dispatch(logout());
	};
	return (
		<header className='header'>
			<Navbar
				bg='dark'
				/* className='fixed-top' */
				fixed='top'
				variant='dark'
				expand='lg'
				collapseOnSelect
			>
				<Container>
					<LinkContainer to='/'>
						<Navbar.Brand className='navbar-brand'>
							<Image src='/images/logo.png' width='40px'  height='40px' />{''} ProTech
						</Navbar.Brand>
					</LinkContainer>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
						<Nav className='ml-auto'>
							<Route
								render={({ history }) => (
									<SearchBox history={history} />
								)}
							/>{' '}
							<LinkContainer to='/cart' id='cart'>
								<Nav.Link>
									<i className='fas fa-shopping-cart'></i>&nbsp;Cart
								</Nav.Link>
							</LinkContainer>
							{userInfo ? (
								<NavDropdown title={userInfo.name} id='username'>
									<LinkContainer to='/profile'>
										<NavDropdown.Item className='dropdown-profile-dark'>
											Profile
										</NavDropdown.Item>
									</LinkContainer>
									<NavDropdown.Item
										className='dropdown-logout-red'
										onClick={logoutHandler}
									>
										Logout
									</NavDropdown.Item>
								</NavDropdown>
							) : (
								<LinkContainer to='/login'>
									<Nav.Link>
										<i className='fas fa-user'></i>&nbsp;Sign In
									</Nav.Link>
								</LinkContainer>
							)}
							{userInfo && userInfo.isAdmin && (
								<NavDropdown title='Admin' id='adminmenu'>
									<LinkContainer to='/admin/userlist'>
										<NavDropdown.Item className='dropdown-profile-dark'>
											Users
										</NavDropdown.Item>
									</LinkContainer>
									<LinkContainer to='/admin/productlist'>
										<NavDropdown.Item className='dropdown-profile-dark'>
											Products
										</NavDropdown.Item>
									</LinkContainer>
									<LinkContainer to='/admin/orderlist'>
										<NavDropdown.Item className='dropdown-profile-dark'>
											Orders
										</NavDropdown.Item>
									</LinkContainer>
								</NavDropdown>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
}
