import Home from '../pages/home/Home';
import User from '../pages/user/User';
import Users from '../pages/users/Users';
import Error404 from '../pages/error/Error';
export default [
  {
    path: '/users',
    exact: true,
    page: Users,
  },
  {
    path: '/users/:id',
    exact: true,
    page: User,
  },
  {
    path: '/',
    exact: true,
    page: Home,
  },
  {
    path: '*',
    page: Error404,
  },
];
