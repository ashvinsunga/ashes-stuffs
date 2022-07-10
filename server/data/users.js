import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Alvin Patricio',
    email: 'alvinpatricio@yahoo.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Badeth Pagela',
    email: 'badethpage@yahoo.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users;
