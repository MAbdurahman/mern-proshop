import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './components/screens/HomeScreen';
import ProductScreen from './components/screens/ProductScreen';
import CartScreen from './components/screens/CartScreen';
import LoginScreen from './components/screens/LoginScreen';
import RegisterScreen from './components/screens/RegisterScreen';
import ProfileScreen from './components/screens/ProfileScreen';
import ShippingScreen from './components/screens/ShippingScreen';
import PaymentScreen from './components/screens/PaymentScreen';
import PlaceOrderScreen from './components/screens/PlaceOrderScreen';
import OrderScreen from './components/screens/OrderScreen';
import UserListScreen from './components/screens/UserListScreen';
import UserEditScreen from './components/screens/UserEditScreen';
import ProductListScreen from './components/screens/ProductListScreen';
import ProductEditScreen from './components/screens/ProductEditScreen';
import OrderListScreen from './components/screens/OrderListScreen';

export default function App() {
	return (
		<Router>
			<Header />
			<main className='py-3 main--div'>
				<Container>
					<Route path='/order/:id' component={OrderScreen} />
					<Route path='/shipping' component={ShippingScreen} />
					<Route path='/payment' component={PaymentScreen} />
					<Route path='/placeOrder' component={PlaceOrderScreen} />
					<Route path='/login' component={LoginScreen} />
					<Route path='/register' component={RegisterScreen} />
					<Route path='/profile' component={ProfileScreen} />
					<Route path='/product/:id' component={ProductScreen} />
					<Route path='/cart/:id?' component={CartScreen} />
					<Route path='/admin/userlist' component={UserListScreen} />
					<Route path='/admin/user/:id/edit' component={UserEditScreen} />
					<Route
						path='/admin/productlist'
						component={ProductListScreen}
						exact
					/>
					<Route
						path='/admin/productlist/:pageNumber'
						component={ProductListScreen}
						exact
					/>
					<Route
						path='/admin/product/:id/edit'
						component={ProductEditScreen}
					/>
					<Route path='/admin/orderlist' component={OrderListScreen} />

					<Route path='/search/:keyword' component={HomeScreen} exact />
					<Route path='/page/:pageNumber' component={HomeScreen} exact />
					<Route
						path='/search/:keyword/page/:pageNumber'
						component={HomeScreen}
						exact
					/>
					<Route path='/' component={HomeScreen} exact />
				</Container>
			</main>
			<Footer />
		</Router>
	);
}
