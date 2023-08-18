import React, {Component, useState, useRef, useEffect, setState} from 'react';
import logo from './logo.svg';
import ReactDOM from 'react-dom'
import {SemanticUIReact, Segment, Container, Grid, Button} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'
import 'semantic-ui-react';
import SignUp from "./components/SignUp"
import {AuthProvider} from "../src/contexts/AuthContext"
import {BrowserRouter as Router, Routes, Route, Link, useLocation} from "react-router-dom"
import Dashboard from "./components/Dashboard"
import LogIn from "./components/LogIn"
import PrivateRoute from './components/PrivateRoute'
import ForgotPassword from "./components/ForgotPassword"
import UpdateProfile from "./components/UpdateProfile"
import NotificationsPage from "./components/NotificationsPage"
import Images from "./components/Images"
import ImageUploader from "./components/ImageUploader"
import PrivateRouteTwo from "./components/PrivateRouteTwo"
import Note from "./components/Note"
import MainPage from "./components/MainPage"
import LoadPage from "./components/LoadPage"
import LoadPosts from "./components/LoadPosts"
import New from "./components/New"
import Hamburger from 'hamburger-react'
import Navigation from "./components/Navigation"
import StartAppNav from "./components/StartAppNav"

function App () {
/**TODO: Fix sizes for mobile (i.e. Iphone Pro 12 and responsive are different!) */
  return (
    <Segment style = {{height:"100%"}}>
      <Container>
        <Grid 
          columns = {1}
          stackable 
          centered
          vertical
          id = "AppId">
            <div>
                <Router>
                  <StartAppNav />
                  <AuthProvider>
                    <Routes>
                      <Route path = "/dashboard" element = {<Dashboard/>} />
                      <Route path = '/' element = {<PrivateRoute/>} >
                        <Route exact = {true} path = '/' element = {<LogIn/>} />
                      </Route>
                      <Route path = '/update-profile' element = {<UpdateProfile/>} />
                      <Route path = "/signup" element = {<SignUp/> } />
                      <Route path = "/login"element = {<LogIn/>} />
                      <Route path = "/forgot-password" element = {<ForgotPassword/>} />
                      <Route path = "/note" element = {<Note/>} />
                      <Route path = "/mainpage" element = {<MainPage/>} />
                      <Route path = "/new" element = {<New/>}/>
                      <Route path = "/update-profile" element = {<UpdateProfile/>} />
                      <Route path = "/notifications-page" element = {<NotificationsPage/>} />
                      <Route path = "/images" element = {<Images/>} />
                      <Route path = "/image-uploader" element = {<ImageUploader/>} />
                    </Routes>
                  </AuthProvider>
                </Router>
            </div>
        </Grid>
      </Container>
    </Segment>
  );
}

export default App;
