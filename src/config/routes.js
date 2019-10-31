import Home from '../components/Home';
import Registration from '../components/auth/Registration'

export const routes = [
    {
        title: 'Home',
        path: '/',
        component: Home
    },
    {
        title: "Registration",
        path: '/register',
        component: Registration
    }
]