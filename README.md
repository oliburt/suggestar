# Suggestar

Suggestar is an application built with two goals in mind. The first is for it to serve as a platform for people to discover 'suggestions' for events/places/activities based on the time and the users proximity. When a user opens up the application the home page will give them a scrollable stream of 'listings' (posted by other users) that may be of interest for them to go to. They can filter these listings by category and also click on the map tab to see markers of each listing at their venue's location. The user can view informational pages about each listing and their specified venue. If a user creates an account they can also leave 'likes' on a listing and reviews on a venue.

The second goal is to allow businesses that involve providing a service of some kind at some venue to be able to post listings of what service/promotion/event they are running at specific time. The goal would be to reach new customers who may be within the proximity of their venue. A person who uses suggestar for this purpose can create an account and setup informational pages about their venues and post listings for any of their venues that will appear on the home stream to any users in the correct proximity and on the correct day. This user can also update and delete any listings and venues they have created.
This repo is only for the front end of the application. You can find the back-end here: [Backend-Repo](https://github.com/oliburt/suggestar-backend)


## Prerequisites

This was built on macOS.

In order to run this project on your own machine you will need first need Node.js and node-package-manager (npm) installed. (This was built with Node v.12.9.1 and npm v.6.13.1)

You can download node [here](https://nodejs.org/en/).
Npm should be installed with Node.

You can then fork and clone this directory onto your machine, open the root directory in your terminal and run

```
npm install
```
to install all dependencies.

Then you can fire up the development server by running:
```
npm start
```

*You will also need to start up the [Backend-Repo](https://github.com/oliburt/suggestar-backend) and make sure that the API_ENDPOINT variable in /src/adapters/API.js points to the correct url that you setup*

*This project also makes use of google maps and google places api. Currently the project is setup so that it uses my personal api key and my google developer account is restricted to only accept requests from a select number of IP addresses that I set up. If you wish to fork and clone this project you will have to setup up your own [google developers](https://console.developers.google.com/) account, create an api key, select the google maps and places apis and then include the correct script in index.html*


## Main Features

Starting up the application lands you on the homepage. Without logging in or signing up the user has access to most of the main features of the app. The user can see all nearby listings and change the distance and category filters. The user can also see listings on the map. By clicking on a listing the user is given an informational display page. This page will also link the user to another informational display page about the venue of the listing where the user can read reviews about the venue.

After signing up, a user can then 'like' listings, leave reviews on venues and create their own venues and listings. Listings are dependent on their venue for their location.

For the homepage stream listings are fetched from the database if they are within the next 24 hours from the time of the request and if they are within a 10km proximity of the users location.

This project was also styled to be responsive in changing its layout with mobile devices in mind (although this has only been tested through chrome's devtools and not on any actual mobile devices)

## Technology Stack

### Frontend

- JavaScript
- HTML
- CSS
- [Node.js]((https://nodejs.org/en/)) + NPM
- React (This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app))
- [Redux](https://redux.js.org/) + [Redux Devtools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)
- [React Router Dom](https://reacttraining.com/react-router/web/guides/quick-start)
- Google Maps API for showing the map and displaying venue locations with markers.
- Google Places API for autofilling the address in the new venue form as well as retrieving and maintaing geolocation data
- [React Google Maps Package](https://tomchentw.github.io/react-google-maps/)
- [React Places Autocomplete Package](https://github.com/hibiken/react-places-autocomplete)
- [React DatePicker Package](https://reactdatepicker.com/)
- [React Star Rating Component Package](https://github.com/voronianski/react-star-rating-component)
- Styling done with [Semantic-UI-React](https://react.semantic-ui.com/)

### Backend - [Backend-Repo](https://github.com/oliburt/suggestar-backend)

- [Ruby](https://www.ruby-lang.org/en/documentation/)
- [Rails](https://rubyonrails.org/) (Initialized with 'rails new' with '--api' flag)
- [Postgres](https://www.postgresql.org/)
- Active-Model-Serializers for data serialization
- Bcrypt for password authentication
- Rack-Cors for CORS
- JWT for user Auth (stored in an HTTP-Only Cookie)
- Figaro for managing secret env variables.


## Future Development Plans

- More filter, sort and search options. Eg. sort by likes or search by venue.
- A testing suite
- Refactor controllers to seperate concerns on inital call and user validation.
- Add action cable for websockets to send broadcast new listings and likes and reviews.

## Author

Oliver Burt