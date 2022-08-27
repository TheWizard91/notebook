import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'semantic-ui-css/semantic.min.css'  
import SignUp from "./components/SignUp"
import {Container} from "react-bootstrap"
import {AuthProvider} from "../src/contexts/AuthContext"
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"
import Dashboard from "./components/Dashboard"
import LogIn from "./components/LogIn"
import PrivateRoute from './components/PrivateRoute'
import ForgotPassword from "./components/ForgotPassword"
import UpdateProfile from "./components/UpdateProfile"
import PrivateRouteTwo from "./components/PrivateRouteTwo"
import Notebook from "./components/Notebook"

class App extends Component {
  render() {
    return (
        <Container className="d-flex align-items-center justify-content-center"
          style={{ minHeight: "100vh" }}>
            <div className="w-100" style={{ maxWidth: "400px" }}>
                <Router>
                  <AuthProvider>
                    <Routes>
                      {/* <PrivateRoute exact path="/" element={<PrivateRoute />} /> */}
                      <Route exact path="/dasboard" element={<Dashboard />} />
                      <Route exact path='/' element={<PrivateRoute/>} >
                        <Route exact path='/' element={<LogIn/>}/>
                      </Route>
                      <Route path='/' element={<PrivateRouteTwo/>} >
                        <Route path='/update-profile' element={<UpdateProfile/>}/>
                      </Route>
                      <Route path="/signup" element={<SignUp />} />
                      <Route path="/" exact={true} element={<LogIn />} />
                      <Route path="/login" exact={true} element={<LogIn />} />
                      <Route path="/forgot-password" element={<ForgotPassword />} />
                      <Route path="/notebook" element = { <Notebook /> } />
                    </Routes>
                  </AuthProvider>
                </Router>
            </div>
        </Container>
    );
  }
}

export default App;
