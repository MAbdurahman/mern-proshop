import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

export default function Footer() {
	return (
		<footer className='grey-bg'>
			<Container>
				<Row>
					<Col className='text-center py-3'>
						<a className='footer-link' href='#!'>Terms and Conditions</a>
						&copy;&nbsp;2021&nbsp;ProTech,Inc.
					</Col>
				</Row>
			</Container>
		</footer>
	);
}
