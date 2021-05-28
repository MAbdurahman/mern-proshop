import bcrypt from 'bcryptjs';

const users = [
	{
		name: 'Tom Stockman',
		email: 'tstockman@test.com',
		password: bcrypt.hashSync('abcd1234', 10),
		isAdmin: true,
	},
	{
		name: 'Linda Brown',
		email: 'lbrown@test.com',
		password: bcrypt.hashSync('abcd1234', 10),
	},
	{
		name: 'Gwen Johnson',
		email: 'jane@test.com',
		password: bcrypt.hashSync('abcd1234', 10),
	},
];

export default users;
