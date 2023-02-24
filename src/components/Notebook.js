
import React, { useRef, useState, useEffect } from "react"
import { Button, Card, Grid, Segment } from "semantic-ui-react"
import 'semantic-ui-css/semantic.min.css'
import ref from "../firebase/Storage"
import realtimeDB from '../firebase/realtimeDatabase';

import firebase from "../firebase/firebase"
import firestore from "../firebase/firestore"
import db from "../firebase/firestore"

import { useAuth, logout, signOut } from "../contexts/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import LogIn from "./LogIn"

import "../styles/notebookComponent.css"
import "../App.css"

import LoadPosts from "./LoadPosts"

function Notebook() {

  const firstNameRef = useRef()
  const lastNameRef = useRef()
  const emailRef = useRef()
  const {currentUser, updatePassword, updateEmail, logout} = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const inputRef = useRef(null)
  const [info , setInfo] = useState();
  const [timeStamp, setTimeStamp] = useState()
  const [enterPost, setState] = useState()
  const [postURI,setPostURI] = useState()

  const sendPost = (e) => {
    e.preventDefault()
    // TODO: Try to start from the login page.
    realtimeDB.ref(currentUser.uid).set({
      post: inputRef.current.value
    }).catch(alert)
    setState(inputRef.current.value)
    // setTimeStamp(timeStamp.current.value)
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
  const Fetchdata = () =>{
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
      setError("")
      setLoading(true)
      navigate("/")
      await logout()
    } catch {
      setError("failed to log out")
    }
  }

  return (
    <Grid columns = {2}>
      <link rel="stylesheet" 
        href="/home/emmanuel/Desktop/ReactJSProjects/Diary/frontend/src/styles/notebookComponent.css" 
      />
      <Grid.Row stretched style = {{ paddingTop:"5%" }} divided>
        <Grid.Column width = {6}>
          <Segment>
            <div
              id = "notebook-element" 
              // className="ui card" 
            >
              <h2 className = "text-center mb-2">
                <h1 className = "ui center aligned icon header">
                  <i className = "sticky note outline"></i>
                  Write what comes in mind!
                </h1>
              </h2>
              <div>
                <textarea
                  rows = "10"
                  id = "input-element"
                  className = "ui segment"
                  type = "text"
                  ref = { inputRef }
                  name = "message"
                  onChange = { handleChange }
                  placeholder =  'Type anything...'
                />
              </div>
            </div>
          </Segment>
          <Button 
            basic name = "cloud"
            color = "blue"
            className = "ui incon basic button"
            type = "submit"
            size = "big"
            onClick = { sendPost }
            data-tooltip="Press to send note to save on database." 
            data-position="top center"
            // time = { Date.now() } 
            > <i className = "send icon"></i>
          </Button>
        </Grid.Column>
        <Grid.Column width = {10} style = {{height:"100%", borderColor:"transparent"}}>
          <Segment>
            <div>
              <LoadPosts 
                post = {enterPost}
                timeStamp = "Date"/>
            </div>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export default Notebook