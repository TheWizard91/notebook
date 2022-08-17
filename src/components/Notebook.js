// import React, { useState, useRef } from 'react'
// import { Card } from "react-bootstrap"
import { Button, Card } from "semantic-ui-react"
import 'semantic-ui-css/semantic.min.css'
import ref from "../firebase/Storage"
import realtimeDB from '../firebase/realtimeDatabase';

import React, { useRef, useState, useEffect } from "react"
// import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useNavigate } from "react-router-dom"


function Notebook() {

  // const [post, setPost] = useState("");
  const inputRef = useRef(null)

  const firstNameRef = useRef()
  const lastNameRef = useRef()
  const emailRef = useRef()
  const {currentUser, updatePassword, updateEmail} = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const sendPost = (e) => {
    e.preventDefault()
    // TODO: Use realtime database instead as storage is only for media type of bjects.
    alert("post: "+inputRef.current.value)
    realtimeDB.ref("user 2").set({
      post: inputRef.current.value
    }).catch(alert)
  }
  
  const handleChange = (e) => {
    e.preventDefault()
    console.log("post: "+inputRef.current.value)
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
    </div>
  )
}

export default Notebook