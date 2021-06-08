import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

export default function SearchBox({ history }) {
	//**************** variables ****************//
	const [keyword, setKeyword] = useState('');
	//**************** functions ****************//
	const submitHandler = e => {
		e.preventDefault();
		if (keyword.trim()) {
			history.push(`/search/${keyword}`);

		} else {
			history.push('/');

		}
	};
	return (
		<Form onSubmit={submitHandler} inline>
			<Form.Control
				type='text'
				name='q'
				onChange={e => setKeyword(e.target.value)}
				placeholder='Products. . .'
				className=' ml-sm-5'
			></Form.Control>
			<Button type='submit' variant='outline-info' className='p-2 searchbox'>
				Search
			</Button>
		</Form>
	);
}
