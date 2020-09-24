import React, { createContext, useState } from 'react';
import './App.css';
import Home from './Components/Home/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Destination from './Components/Destination/Destination';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import Auth from './Components/Auth/Auth';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import NotFound from './Components/NotFound/NotFound';
import Booking from './Components/Booking/Booking';
import Header from './Components/Header/Header';
import { Map } from '@material-ui/icons';

export const userContext = createContext()
firebase.initializeApp(firebaseConfig);

function App() {

  const [showArea, setShowArea] = useState(
    {
      id: 1,
      title: "Cox's Bazar",
      description: "Why Cox's Bazar is a Great Tourist Attraction Cox's Bazar Review. Cox's Bazar is famous for its long natural sandy sea beach. ... Cox's Bazar has the world's largest unbroken sea beach which stretches more than 120 km. The entire beach is a stretch of golden sandy sea beach which is reachable by motorbike.",
      img: "https://i.ibb.co/p1Fm5yD/coxsbazar.png"
    }
  )

  const [loggedIn, setLoggedIn] = useState(false)
  const [name, setName] = useState("user")

  return (

    <userContext.Provider value={[showArea, setShowArea, loggedIn, setLoggedIn, name, setName]}>
      <Router>
        <Header></Header>
        <Switch>

          <Route exact path="/">
            <Home></Home>
          </Route>

          <Route exact path="/booking">
            <Booking></Booking>
          </Route>


          <Route exact path="/booking/destination">
            <Destination></Destination>
          </Route>

          <Route exact path="/auth">
            <Auth></Auth>
          </Route>

          <Route path="*">
            <NotFound></NotFound>
          </Route>

        </Switch>
      </Router>

    </userContext.Provider>
  );
}

export default App;
