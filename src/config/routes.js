import Home from '../components/Home';
import Registration from '../components/auth/Registration'
import Login from '../components/auth/Login'
import UserEdit from '../components/UserEdit';
import UserShowContainer from '../containers/UserShowContainer'
import React from "react";


const Logout = props => {
    props.logout()
    return <></>
}

export const otherRoutes = [
    {
        title: 'UserEdit',
        exact: true,
        path: '/users/edit',
        icon: 'edit',
        component: UserEdit
    },
]


export const menuRoutes = [
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
        component: UserShowContainer
    },
    {
        title: "Logout",
        exact: true,
        path: '/logout',
        icon: 'sign out',
        component: Logout
    },    
]

export const allRoutes = otherRoutes.concat(menuRoutes)