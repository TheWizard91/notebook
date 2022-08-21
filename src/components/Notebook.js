
import { Button, Card } from "semantic-ui-react"
import 'semantic-ui-css/semantic.min.css'
import ref from "../firebase/Storage"
import realtimeDB from '../firebase/realtimeDatabase';

import firebase from "../firebase/firebase"
import firestore from "../firebase/firestore"
import db from "../firebase/firestore"

import React, { useRef, useState, useEffect } from "react"
// import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth, logout } from "../contexts/AuthContext"
import { Link, useNavigate } from "react-router-dom"


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

  const sendPost = (e) => {
    e.preventDefault()
    // TODO: Use realtime database instead as storage is only for media type of bjects.
    // alert("post: "+inputRef.current.value)
    realtimeDB.ref("dataName").set({
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
    db.collection("Users").get().then((querySnapshot) => {
         
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
      navigate("/login")
      await logout()
      navigate("/login")
      // alert("Email: "+currentUser.email+" logged out")
    } catch {
      setError("failed to log out")
    }
  }
  return (
    <div className = "ui centered grid">
      <div className="computer only row">
      <div className="column"></div>
    </div>
      <div 
        className="ui card"
        style = {{  height: 300, width: 1000 }}
        >
        <h2 className ="text-center mb-4">Notebook</h2>
        {/* <div class="content">
          <div class="right floated meta">14h</div>
          <img class="ui avatar image" src="/images/avatar/large/elliot.jpg" /> Elliot
        </div>
        <div class="image">
          <img />
        </div> */}

        <div class="six wide tablet eight wide computer column">
          <input 
            className = "ui segment"
            type = "text"
            ref = { inputRef }
            name = "message"
            onChange = { handleChange }
            placeholder =  'Type here...'
            style = {{  height: 200, width: 400 }}/>
        </div>
        {/* <div class="six wide tablet eight wide computer column"> */}
          <Button 
            basic name = "cloud"
              color = "blue"
              className = "ui incon basic button"
              type = "submit"
              size = "big"
              onClick = { sendPost }>  
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