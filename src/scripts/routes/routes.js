import Home from '../views/pages/home-new';
import Favorite from '../views/pages/favorite-new';
import Detail from '../views/pages/detail';

const routes = {
    '/' : Home, //default page
    '/home' : Home,
    '/favorite': Favorite,
    '/detail/:id' : Detail,
};

export default routes;