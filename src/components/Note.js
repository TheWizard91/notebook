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

  // Window
  const width=useRef(window.innerWidth)
  const height=useRef(window.innerHeight)

  //main grid
  const mainGradClassName=useRef("ui grid")

  // outer row
  const outerRowClassName=useRef("row")
  const heightOfOuterRow=useRef("400px")
  const paddingTopOfOuterRow=useRef("5%")
  
  const header=useRef("ui center aligned icon header")
  const inputHint=useRef("sticky note outline")
  // const columnTwoMaxHeight=useRef("200px")
  const [columnTwoMaxHeight,setColumnTwoMaxHeight]=useState("800px")
  const [numberOfColumns,setNumberOfColumns]=useState()
  const [gravityWidthOfColumnOne,setGravityWidthOfColumnOne]=useState()

  const segmentOneHeight=useRef("80%")
  const [gravityWidthOfColumnTwo,setGravityWidthOfColumnTwo]=useState()

  const [buttonSize,setButtonSize]=useState("huge plus circle icon")
  const [sizeButtonForDesktop,setButtonSizeForDesktop]=useState("big")
  const [sendButtonMarginTop,setSendButtonMarginTop]=useState("15px")

  useEffect(() => {

    if(height.current > (width.current+100)){
      setNumberOfColumns(1)
      setButtonSize("big plus circle icon")
      setColumnTwoMaxHeight("250px")
    } else {
      setNumberOfColumns(2)
      setGravityWidthOfColumnOne(6)
      setGravityWidthOfColumnTwo(10)
      setButtonSizeForDesktop("large")
    }

    // Getting data from firebase
    db.collection("posts")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        postsDictionary[doc.id] = doc.data()
      })

      setPostDictionary(postsDictionary)

      // Setting up the posts from Firebase
      Object.keys(postsDictionary)
        .forEach(async function (key, index){
          if(index!=0){
            let timeStamp = postsDictionary[key]["time"]
            let enterPost = postsDictionary[key]["post"]
            let p_uri=postsDictionary[key]["post_id"]
            let likesCount=postsDictionary[key]["likes"]
            let favoritesCount=postsDictionary[key]["favorites"]
            postsFromFirebase["postsFromFirebase"].push({"time":timeStamp,"post":enterPost,"post_id":p_uri,"likes":likesCount,"favorites":favoritesCount})
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
    let t = new Date().toLocaleDateString('en-us', { weekday:"short", year:"numeric", month:"short", day:"numeric"})
    let post_uri=postURI.slice(0,8)
    // console.log("post_uri is: "+post_uri)
    db.collection("posts")
      .doc(post_uri)
      .set({
        post: p,
        time: t,
        likes: 0,
        favorites: 0,
        post_id: post_uri
    })

    setPost(p)
    setTimeStamp(t)
    setPostID(post_uri)
    setFavoriteCount(0)
    setLikesCount(0)
    console.log("p"+JSON.stringify(postsFromFirebase))
    postsFromFirebase["postsFromFirebase"].push({"time":t,"post":p,"post_id":post_uri,likes:0,favorites:0})
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
    <Grid 
      columns={numberOfColumns} 
      reversed="mobile"
      stackable >
      <link 
        rel="stylesheet" 
        href="/home/emmanuel/Desktop/ReactJSProjects/Diary/frontend/src/styles/notebookComponent.css"/>
      <Grid.Row
      // <div className={outerRowClassName.current}
        id="outerRow"
        style={{paddingTop:paddingTopOfOuterRow.current, height:heightOfOuterRow.current}}
        stretched 
        divided>
        <Grid.Column 
          width={gravityWidthOfColumnOne}>
          <Segment style={{height:segmentOneHeight.current}}>
            <div
              id = "notebook-element">  {/*className="ui card"*/} 
              <h2 className="text-center mb-2">
                <h3 className={header.current}>
                  <i className={inputHint.current}></i>
                  Write what comes to mind!
                </h3>
              </h2>
              {/* <div > */}
                <textarea
                  rows="10"
                  id="input-element"
                  className="ui segment"
                  type="text"
                  size="big"
                  ref={inputRef}
                  name="message"
                  style={{height:"75%",width:"100%"}}
                  onChange={handleChange}
                  placeholder='Type anything...'/>
              {/* </div> */}
            </div>
          </Segment>
          <Button 
            basic name="cloud"
            color="blue"
            className="circular ui icon basic red button"
            type="submit"
            size={sizeButtonForDesktop}
            value={timeStamp}
            onClick={sendPost}
            style={{width:"fit-content",padding:"0px",height:"0px",width:"0px",borderColor:"blue",borderRadius:"10px",left:"40%"}}
            data-tooltip="Press to send note to save on database." 
            data-position="top center"
            > <i className={buttonSize} style={{margin:"0px"}}></i>
          </Button>
        </Grid.Column>
        <Grid.Column 
          width={gravityWidthOfColumnTwo} 
          style={{height:"100%",borderColor:"transparent",
            overflow:'scroll',maxHeight:columnTwoMaxHeight}}>
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
                    favorites={entry.favorites}/>
                </div>)}
            )}
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export default Note