
import React, { useRef, useState, useEffect } from "react"
import { Button, Card, Grid, Segment } from "semantic-ui-react"
import 'semantic-ui-css/semantic.min.css'
import ref from "../firebase/Storage"
import realtimeDB from '../firebase/realtimeDatabase';

import app from "../contexts/AuthContext"
import firebase from "../firebase/firebase"
import { firestore, collection, query, where, getDock } from "../firebase/firestore"
import db from "../firebase/firestore"
import { useAuth, logout, signOut } from "../contexts/AuthContext"
// import { db } from "../firebase/config"

import { Link, useNavigate } from "react-router-dom"
import LogIn from "./LogIn"

import "../styles/notebookComponent.css"
import "../App.css"

import LoadPosts from "./LoadPosts"

//import uuid v4
import { v4 as uuid } from 'uuid';

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
  const [timeStamp, setTimeStamp] = useState("Date")
  const [enterPost, setState] = useState("Post goes here")
  const [postsDictionary, setPostDictionary] = useState({postsDictionry:{}})

  useEffect(() => {
    db.collection("posts")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // console.log(doc.id, "=>", doc.data())
        postsDictionary[doc.id] = doc.data()
      })

      // console.log("inside of use state "+ JSON.stringify(postsDictionary))
      setPostDictionary(postsDictionary)
      // console.log("loop")
      // for(let ps in postsDictionary) {
      //   console.log("loop")
      //   // console.log(postsDictionary[key][i])
      // }
      Object.keys(postsDictionary)
        .forEach(function(key, index){
          console.log(postsDictionary[key],index)
          for(let k in postsDictionary[key]) {
            // console.log("key = "+JSON.stringify(k)+" value is = "+JSON.stringify(postsDictionary[key][k]))
            // if(key=="time") let time=postsDictionary[key]
            // console.log(postsDictionary[key][i])
            // console.log()
            let timeStamp = postsDictionary[key]["time"]
            let enterPost = postsDictionary[key]["post"]
            // setState(enterPost)
            // setTimeStamp(timeStamp)
            document.title = '<LoadPosts post = ${enterpost} time = ${timeStamp}/>'
          }
      })
    }).catch((error) => {
      console.log("Error getting documents: ", error)
    })
  })

  const postURI = uuid()

  const sendPost = (e) => {
    e.preventDefault()

    // realtimeDB.ref(currentUser.uid).set({
    //   post: inputRef.current.value,
    //   time: new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}),
    //   postId: postURI.slice(0,8),
    //   like: 0,
    //   favorite: 0
    // }).catch(alert)

    db.collection("posts")
      .doc(postURI.slice(0,8))
      .set({
      post: inputRef.current.value,
      time: new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}),
      likes: 0,
      favorite: 0
    })
    setState(inputRef.current.value)
    setTimeStamp(new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}))

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

  // const getData = () => {
  //   db.collection("posts")
  //     .get()
  //     .then((querySnapshot) => {
  //       querySnapshot.forEach((doc) => {
  //         console.log(doc.id, "=>", doc.data())
  //         postsDictionry[doc.id] = doc.data()
  //       })
  //     }).catch((error) => {
  //       console.log("Error getting documents: ", error)
  //     })
  // }
  
  return (
    <Grid columns = {2}>
      <link 
        rel = "stylesheet" 
        href="/home/emmanuel/Desktop/ReactJSProjects/Diary/frontend/src/styles/notebookComponent.css" 
      />
      <Grid.Row stretched style = {{paddingTop:"5%"}} divided>
        <Grid.Column width = {6}>
          <Segment>
            <div
              id = "notebook-element" 
              // className="ui card" 
            >
              <h2 className = "text-center mb-2">
                <h1 className = "ui center aligned icon header">
                  <i className = "sticky note outline"></i>
                  Write what comes to mind!
                </h1>
              </h2>
              <div>
                <textarea
                  rows = "10"
                  id = "input-element"
                  className = "ui segment"
                  type = "text"
                  ref = {inputRef}
                  name = "message"
                  onChange = {handleChange}
                  placeholder =  'Type anything...'
                />
              </div>
            </div>
          </Segment>
          <Button 
            basic name = "cloud"
            color = "blue"
            className = "big ui incon basic button"
            type = "submit"
            size = "big"
            value = {timeStamp}
            onClick = {sendPost}
            data-tooltip = "Press to send note to save on database." 
            data-position = "top center"
            > <i className = "send icon"></i>
          </Button>
        </Grid.Column>
        <Grid.Column 
          width = {10} 
          style = {{height:"100%",borderColor:"transparent"}}>
          <Segment style={{backgroundColor:"#F3FDFE"}}>
            <div>
              <LoadPosts post = {enterPost} time = {timeStamp}/>
            </div>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
    
  )
}

export default Notebook