import Home from '../components/Home';
import Registration from '../components/auth/Registration'
import Login from '../components/auth/Login'
import UserShow from '../components/UserShow'
import React from "react";


const Logout = props => {
    props.logout()
    return <></>
}


export const routes = [
    {
        title: 'Home',
        exact: true,
        path: '/',
        icon: 'home',
        component: Home
    },
    {
        title: "Login",
        exact: true,
        path: '/login',
        icon: 'sign in',
        component: Login
    },
    {
        title: "Registration",
        exact: true,
        path: '/register',
        icon: 'signup',
        component: Registration
    },
    {
        title: "My Profile",
        exact: true,
        path: '/users/:id',
        icon: 'user',
        component: UserShow
    },
    {
        title: "Logout",
        exact: true,
        path: '/logout',
        icon: 'sign out',
        component: Logout
    },
    

]