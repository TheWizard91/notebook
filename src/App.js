import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css' 
import SignUp from "./components/SignUp"
import {Container} from "react-bootstrap" //"semantic-ui-react" 
import {AuthProvider} from "../src/contexts/AuthContext"
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"
import Dashboard from "./components/Dashboard"
import LogIn from "./components/LogIn"
import PrivateRoute from './components/PrivateRoute'
import ForgotPassword from "./components/ForgotPassword"
import UpdateProfile from "./components/UpdateProfile"
import PrivateRouteTwo from "./components/PrivateRouteTwo"
import Note from "./components/Note"
import MainPage from "./components/MainPage"
import LoadPage from "./components/LoadPage"
import LoadPosts from "./components/LoadPosts"
import Navigation from "./components/Navigation"
import New from "./components/New"

class App extends Component {
  render() {
    return (
      <Container
      // className = "d-flex align-items-center justify-content-center"
        id = "AppId">
          <div className = "w-100"> {/*className = "w-100"*/}
              <Router>
                <Navigation/>
                <AuthProvider>
                  <Routes>
                    <Route exact path="/dashboard" element={<Dashboard />}/>
                    <Route exact path='/' element={<PrivateRoute/>} >
                      <Route exact={true}  path='/' element={<LogIn/>}/>
                    </Route>
                    <Route path='/update-profile' element={<UpdateProfile/>}/>
                    <Route path="/signup" element={<SignUp/>}/>
                    <Route path="/login" exact={true} element={<LogIn/>}/>
                    <Route path="/forgot-password" element={<ForgotPassword/>}/>
                    <Route path="/note" element={<Note/>}/>
                    <Route path = "/mainpage" element={<MainPage/>}/>
                    <Route path = "/new" element={<New/>}/>
                  </Routes>
                </AuthProvider>
              </Router>
          </div>
      </Container>
    );
  }
}

export default App;
