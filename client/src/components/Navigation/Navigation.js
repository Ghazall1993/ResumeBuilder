import React, { useState } from "react";
import { Navbar, Button, Nav } from "react-bootstrap";
import { Switch, Route, Link } from "react-router-dom";
import Login from "components/userLR/Login";
import Registration from "components/userLR/Registration";
import ResumeBuilder from "components/ResumeBuilder/ResumeBuilder";
import { useHistory } from 'react-router-dom';
import logo from "img/logo.png";
import "./Navigation.css"
import Landing from "components/LandingPage/Landing"
import axios from 'axios';

export default function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const history = useHistory();

  const handleLogout = (event) => {
    event.preventDefault();
    axios.get(
      '/users/logout'
    ).then(() => {
      setIsLoggedIn(false);
      setIsRegistered(false);
      history.replace('/login');
    }).catch(error => console.log(error));
  }

  const handleRegisteredUsers = (data) => {
    setIsLoggedIn(data);
    setIsRegistered(data)
  }

  return (
    <>
      <Navbar className="navigation-bar non-printable" variant="dark" fixed="top">
        <Navbar.Brand as={Link} to="/" className="font-weight-bold">
          <img
            alt=""
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
        YourResume.Rock
        </Navbar.Brand>
        <Nav className="ml-auto">
          {!isLoggedIn || !isRegistered ?
            <Nav.Link as={Link} to="/resume">Build Resume</Nav.Link> : null
          }
          {isLoggedIn ?
            <Button variant="outline-secondary" onClick={handleLogout}>Logout</Button>
            : isRegistered ? null :
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
          }
          {!isRegistered ?
            <Nav.Link as={Link} to="/registration">Register</Nav.Link>
            :
            null
          }
        </Nav>
      </Navbar>

      <Switch>
        <Route path="/login">
          <Login
            setIsLoggedIn={setIsLoggedIn}
            onUpdate={(e) => setIsRegistered(e)}
          />
        </Route>

        <Route path="/registration">
          <Registration
            onUpdate={handleRegisteredUsers}
          />
        </Route>

        <Route path="/resume">
          <ResumeBuilder />
        </Route>

        <Route path="/">
          {isLoggedIn ? <ResumeBuilder /> : <Landing />}
        </Route>
      </Switch>
    </>
  )
}