import React from 'react';
import { Link } from 'react-router-dom';
/* import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'; */

export default function CheckoutSteps({ step2, step3, step4}) {
	return (
		<div className='d-flex justify-content-center mb-3 checkout-progress'>
			{step2 ? (
				<Link to='/shipping' className='float-right'>
					<div className='triangle2-active'></div>
					<div className='step active-step'>Shipping</div>
					<div className='triangle2-active'></div>
				</Link>
			) : (
				<Link to='#!' disabled>
					<div className='triangle2-incomplete'></div>
					<div className='step incomplete'>Shipping</div>
					<div className='triangle2-incomplete'></div>
				</Link>
			)}
			{step3 ? (
				<Link to='/payment' className='float-right'>
					<div className='triangle2-active'></div>
					<div className='step active-step'>Payment</div>
					<div className='triangle2-active'></div>
				</Link>
			) : (
				<Link to='#!' disabled>
					<div className='triangle2-incomplete'></div>
					<div className='step incomplete'>Payment</div>
					<div className='triangle2-incomplete'></div>
				</Link>
			)}
			{step4 ? (
				<Link to='/placeorder' className='float-right'>
					<div className='triangle2-active'></div>
					<div className='step active-step'>Place Order</div>
					<div className='triangle2-active'></div>
				</Link>
			) : (
				<Link to='#!' disabled>
					<div className='triangle2-incomplete'></div>
					<div className='step incomplete'>Place Order</div>
					<div className='triangle2-incomplete'></div>
				</Link>
			)}
		</div>
	);

}
