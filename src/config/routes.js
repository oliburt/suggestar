import HomeContainer from '../containers/HomeContainer';
import Registration from '../components/auth/Registration'
import Login from '../components/auth/Login'
import NewVenueForm from '../components/NewVenueForm';
import UserShowContainer from '../containers/UserShowContainer'
import React from "react";
import VenueShowContainer from '../containers/VenueShowContainer';
import NewListingForm from '../components/NewListingForm';
import ListingShowContainer from '../containers/ListingShowContainer';



const Logout = props => {
    props.logout()
    return <></>
}


export const beforeRoutes = [
    

]

export const afterRoutes = [
    {
        title: 'Venue Show',
        exact: true,
        path: '/venues/:id',
        component: VenueShowContainer
    },
    {
        title: 'Listing Show',
        exact: true,
        path: '/listings/:id',
        component: ListingShowContainer
    },
    

]


export const menuRoutes = [
    {
        title: 'Home',
        exact: true,
        path: '/',
        icon: 'home',
        component: HomeContainer
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
        path: '/user',
        icon: 'user',
        component: UserShowContainer
    },
    {
        title: "New Venue",
        exact: true,
        path: '/venues/new',
        icon: 'plus',
        component: NewVenueForm
    },
    {
        title: 'New Listing',
        exact: true,
        path: '/listings/new',
        icon: 'add to calendar',
        component: NewListingForm
    },
    {
        title: "Logout",
        exact: true,
        path: '/logout',
        icon: 'sign out',
        component: Logout
    },    
]

export const allRoutes = beforeRoutes.concat(menuRoutes).concat(afterRoutes)