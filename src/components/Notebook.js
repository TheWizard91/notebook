
import { Button, Card } from "semantic-ui-react"
import 'semantic-ui-css/semantic.min.css'
import ref from "../firebase/Storage"
import realtimeDB from '../firebase/realtimeDatabase';

import firebase from "../firebase/firebase"
import firestore from "../firebase/firestore"
import db from "../firebase/firestore"

import React, { useRef, useState, useEffect } from "react"
// import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth, logout, signOut } from "../contexts/AuthContext"
import { Link, useNavigate } from "react-router-dom"

import "../styles/notebookComponent.css"
import "../App.css"


// import cogoToast from "cogo-toast"

function Notebook() {

  // const [post, setPost] = useState("");
  const inputRef = useRef(null)

  const firstNameRef = useRef()
  const lastNameRef = useRef()
  const emailRef = useRef()
  const {currentUser, updatePassword, updateEmail, logout} = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const [info , setInfo] = useState([]);

  // cogoToast.info("Hi from the developer if you have just eneterd the website, please press teh logout button first make, make an account, login and be back here. Else post something!",
  //  { position: 'top-center', heading: 'Information' });


  const sendPost = (e) => {
    e.preventDefault()
    // TODO: Use realtime database instead as storage is only for media type of bjects.
    // alert("post: "+inputRef.current.value)
    realtimeDB.ref(currentUser.uid).set({
      post: inputRef.current.value
    }).catch(alert)

  }
  
  const handleChange = (e) => {
    e.preventDefault()
    console.log("post: "+inputRef.current.value)
  }

  // Start the fetch operation as soon as
  // the page loads
  window.addEventListener('load', () => {
    Fetchdata();
  });

  // Fetch the required data using the get() method
  const Fetchdata = ()=>{
    db.collection("users").get().then((querySnapshot) => {
         
        // Loop through the data and store
        // it in array to display
        querySnapshot.forEach(element => {
            var data = element.data();
            setInfo(arr => [...arr , data]);
              
        });
    })
  }

  async function logginout () {

    setError("")

    try{
      await logout()
      navigate("/login")
      // alert("Email: "+currentUser.email+" logged out")
    } catch {
      setError("failed to log out")
    }
  }
  return (
    <div 
      className = "ui centered grid">
      <div className="computer only row">
      <div className="column"></div>
    </div>
    {/* Media Queries */}
    <link rel="stylesheet" href="/home/emmanuel/Desktop/ReactJSProjects/Diary/frontend/src/styles/notebookComponent.css" />
    
      <div
        id = "notebook-element" 
        className="ui card"
        >
          {/* 
        style = {{  height: 300, width: 1000 }} */}
        <h2 
          className = "text-center mb-4">
            Notebook
        </h2>


        {/* <div 
          class="ui button" 
          data-tooltip="Hi from the developer if you have just eneterd the website, please press the logout button first make, make an account, login and be back here. Else post something!" 
          data-position="top center">
          Top Center
        </div> */}
        {/* <div class="content">
          <div class="right floated meta">14h</div>
          <img class="ui avatar image" src="/images/avatar/large/elliot.jpg" /> Elliot
        </div>
        <div class="image">
          <img />
        </div> */}

        <div className="six wide tablet eight wide computer column">
          <input 
            id = "input-element"
            className = "ui segment"
            type = "text"
            ref = { inputRef }
            name = "message"
            onChange = { handleChange }
            placeholder =  'Type here...'
          /> 
            {/* 
            style = {{  height: 200, width: 400 }} */}
        </div>
        {/* <div class="six wide tablet eight wide computer column"> */}
          <Button 
            basic name = "cloud"
            color = "blue"
            className = "ui incon basic button"
            type = "submit"
            size = "big"
            onClick = { sendPost }
            data-tooltip="App under cunstruction so if you just entered the website, please logout and create an account first." 
            data-position="top center">  
              <i className = "cloud icon"></i>
          </Button>
        {/* </div> */}
      </div>
      <Button 
        basic name = "logout"
        color = "blue"
        className = "ui incon basic button"
        type = "submit"
        size = "big"
        onClick = { logginout }>  
          <i className = "logout icon"></i>
      </Button>
    </div>
  )
}

export default Notebook