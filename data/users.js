import bcrypt from 'bcryptjs';

const users = [
	{
		name: 'Tom Stockman',
		email: 'tom@example.com',
		password: bcrypt.hashSync('abcd1234', 10),
		isAdmin: true,
	},
	{
		name: 'Ahmed Zahir',
		email: 'ahmed@example.com',
		password: bcrypt.hashSync('abcd1234', 10),
	},
	{
		name: 'Linda Browne',
		email: 'linda@example.com',
		password: bcrypt.hashSync('abcd1234', 10),
	},
];

export default users;
