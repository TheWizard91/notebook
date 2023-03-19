import React, { useRef, useState, useEffect } from "react"
import { Button, Card, Grid, Segment } from "semantic-ui-react"
// import 'semantic-ui-css/semantic.min.css'
import ref from "../firebase/Storage"
import realtimeDB from '../firebase/realtimeDatabase';

import app from "../contexts/AuthContext"
import firebase from "../firebase/firebase"
import { firestore, collection, query, where, getDock } from "../firebase/firestore"
import db from "../firebase/firestore"
import { useAuth, logout, signOut } from "../contexts/AuthContext"

import { Link, useNavigate } from "react-router-dom"
import LogIn from "./LogIn"

import "../styles/notebookComponent.css"
import "../App.css"

import LoadPosts from "./LoadPosts"

//import uuid v4
import { v4 as uuid } from 'uuid';

function Note() {

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
  const [enterPost, setPost] = useState("Post goes here")
  const [likesCount,setLikesCount]=useState()
  const [favoritesCount,setFavoriteCount]=useState()
  const [postID,setPostID]=useState()
  const [postsDictionary, setPostDictionary] = useState({postsDictionry:{}})
  const [postsFromFirebase, setPostsFromFirebase] = useState({postsFromFirebase:[]})
  const postURI = uuid()

  useEffect(() => {
    // Getting data from firebase
    db.collection("posts")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        postsDictionary[doc.id] = doc.data()
      })

      setPostDictionary(postsDictionary)

      // Settting up the posts to postsFromFirebase
      Object.keys(postsDictionary)
        .forEach(async function (key, index){
          if(index!=0){
            let timeStamp = postsDictionary[key]["time"]
            let enterPost = postsDictionary[key]["post"]
            let p_uri=postsDictionary[key]["post_id"]
            let likesCount=postsDictionary[key]["likes"]
            let favoritesCount=postsDictionary[key]["favorite"]
            postsFromFirebase["postsFromFirebase"].push({"time":timeStamp,"post":enterPost,"post_id":p_uri,"likes":likesCount,"favorite":favoritesCount})
            // setPostsFromFirebase(postsFromFirebase)
            setTimeStamp(timeStamp)
            setPost(enterPost)
            setPostID(p_uri)
            setLikesCount(likesCount)
            setFavoriteCount(favoritesCount)
          }
        })
      }).catch((error) => {
    })
    // Can't set the values here
  },[postsFromFirebase])

  const sendPost = (e) => {
    e.preventDefault()

    let p = inputRef.current.value
    let t = new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})
    let post_uri=postURI.slice(0,8)
    // console.log("post_uri is: "+post_uri)
    db.collection("posts")
      .doc(post_uri)
      .set({
        post: p,
        time: t,
        likes: 0,
        favorite: 0,
        post_id: post_uri
    })

    setPost(p)
    setTimeStamp(t)
    setPostID(post_uri)
    // console.log("p"+JSON.stringify(postsFromFirebase))
    postsFromFirebase["postsFromFirebase"].push({"time":t,"post":p,"post_id":post_uri})
  }
  
  const handleChange = (e) => {
    e.preventDefault()
    console.log("post: "+inputRef.current.value)
  }

  // Start the fetch operation as soon as
  // the page loads
  window.addEventListener('load', () => {
    fetchData();
  });

  // Fetch the required data using the get() method
  const fetchData = () => {
    db.collection("posts")
      .get()
      .then((querySnapshot) => {
        // Loop through the data and store
        // it in array to display
        querySnapshot.forEach((doc) => {
          var data=doc.data();
          console.log(doc.id,"=>",data["post"])
        });
    }).catch((error) => {
      console.log("In FetchData: Error getting documents: ", error)
    })
  }

  return (
    <Grid columns={2}>
      <link 
        rel="stylesheet" 
        href="/home/emmanuel/Desktop/ReactJSProjects/Diary/frontend/src/styles/notebookComponent.css" 
      />
      <Grid.Row stretched style={{paddingTop:"5%", height:"600px"}} divided>
        <Grid.Column width={6}>
          <Segment style={{height:"80%"}}>
            <div
              id = "notebook-element" 
              // className="ui card" 
            >
              <h2 className="text-center mb-2">
                <h1 className="ui center aligned icon header">
                  <i className="sticky note outline"></i>
                  Write what comes to mind!
                </h1>
              </h2>
              <div style={{height:"75%"}}>
                <textarea
                  rows="10"
                  id="input-element"
                  className="ui segment"
                  type="text"
                  ref={inputRef}
                  name="message"
                  onChange={handleChange}
                  placeholder='Type anything...' 
                />
              </div>
            </div>
          </Segment>
          <Button 
            basic name="cloud"
            color="blue"
            className="circular ui icon basic red button"
            type="submit"
            size="big"
            value={timeStamp}
            onClick={sendPost}
            style={{width:"fit-content",padding:"0px",height:"0px",width:"0px",borderColor:"blue",borderRadius:"10px",left:"40%"}}
            data-tooltip="Press to send note to save on database." 
            data-position="top center"
            > <i className="huge plus circle icon" style={{margin:"0px"}}></i>
          </Button>
        </Grid.Column>
        <Grid.Column 
          width={10} 
          style={{height:"100%",borderColor:"transparent",overflow:'scroll',maxHeight:"800px"}}>
          <Segment style={{backgroundColor:"#F3FDFE"}}>
              {postsFromFirebase["postsFromFirebase"]
              .map(entry=> {if(entry.post!=null && entry.time!=null)
              return (
                <div style={{marginTop:"15px"}}>
                  <LoadPosts 
                    post={entry.post} 
                    time={entry.time}
                    post_id={entry.post_id}
                    likes={entry.likes}
                    favorite={entry.favorite}
                    />
                </div>)}
            )}
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export default Note