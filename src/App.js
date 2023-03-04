import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'semantic-ui-css/semantic.min.css'  
import SignUp from "./components/SignUp"
import {Container} from "semantic-ui-react" //"react-bootstrap"
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

class App extends Component {
  render() {
    return (
      <Container 
        id = "AppId"
        className = "d-flex align-items-center justify-content-center">
          <div className = "w-100"> {/*className = "w-100"*/}
              <Router>
                <AuthProvider>
                  <Routes>
                    <Route exact path="/dashboard" element={<Dashboard />}/>
                    {/* <Route exact path='/' element={<PrivateRoute/>} > */}
                      <Route exact path='/' element={<LogIn/>}/>
                    {/* </Route> */}
                    <Route path='/update-profile' element={<UpdateProfile/>}/>
                    <Route path="/signup" element={<SignUp/>}/>
                    {/* <Route path="/login" element={<LogIn/>}/> */}
                    <Route path="/forgot-password" element={<ForgotPassword/>}/>
                    <Route path="/note" element={<Note/>}/>
                    <Route path = "/mainpage" element={<MainPage/>}/>
                  </Routes>
                </AuthProvider>
              </Router>
          </div>
      </Container>
    );
  }
}

export default App;
