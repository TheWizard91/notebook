import React, {useRef, useState, setState, useEffect} from "react"
import {Button, Card, Grid, Segment, Menu, Icon, Divider} from "semantic-ui-react"
// import 'semantic-ui-css/semantic.min.css'
import ref from "../firebase/Storage"
import realtimeDB from '../firebase/realtimeDatabase';

import app from "../contexts/AuthContext"
// import firebase from "../firebase/firebase"
import {firestore, collection, query, where, getDock} from "../firebase/firestore"
import db from "../firebase/firestore"
import {useAuth, logout, signOut} from "../contexts/AuthContext"

import {Link, useNavigate} from "react-router-dom"
import LogIn from "./LogIn"

import "../styles/notebookComponent.css"
import "../App.css"

import LoadPosts from "./LoadPosts"

//import uuid v4
import {v4 as uuid} from 'uuid';

function Note({u_firstname, u_lastname, u_profile_image, u_id}) {

  /**TODO: Need to add the username for post and user id as well as the made up id. */
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const inputRef = useRef(null);
  const [info , setInfo] = useState();
  const [time_stamp, setTimeStamp] = useState("Date");
  const [enter_post, setPost] = useState("Post goes here");
  const [likes_count,setLikesCount] = useState();
  const [favorites_count,setFavoriteCount] = useState();
  const [post_ic,setPostID] = useState();
  const [user_firstname, setUserFirstname] = useState({user_firstname:u_firstname});
  const [user_lastname, setUserLastname] = useState({user_lastname:u_lastname});
  const [user_profile_image, setUserProfileImage] = useState({user_profile_image:u_profile_image});
  const [user_id, setUserId] = useState({user_id:u_id});
  const [postsDictionary, setPostDictionary] = useState({postsDictionary:{}});
  const [postsFromFirebase, setPostsFromFirebase] = useState({postsFromFirebase:[]});
  const postURI = uuid();

  // Window
  const width = useRef(window.innerWidth);
  const height = useRef(window.innerHeight);
  const is_login_active = useRef();

  //main grid
  const mainGradClassName = useRef("ui grid");

  // outer row
  const outerRowClassName = useRef("row");
  const heightOfOuterRow = useRef("400px"); // 400px I had to reduce it to accomodate 
  const paddingTopOfOuterRow = useRef("5%");
  
  const header = useRef("ui center aligned icon header")
  const inputHint = useRef("sticky note outline")
  // const columnTwoMaxHeight=useRef("200px")
  const [columnTwoMaxHeight, setColumnTwoMaxHeight] = useState("800px")
  const [numberOfColumns, setNumberOfColumns] = useState()
  const [gravityWidthOfColumnOne, setGravityWidthOfColumnOne] = useState()

  const segmentOneHeight = useRef("80%")
  const [gravityWidthOfColumnTwo, setGravityWidthOfColumnTwo] = useState()

  const [buttonSize,setButtonSize] = useState();
  const [sizeButtonForDesktop, setButtonSizeForDesktop] = useState("big")
  const [sendButtonMarginTop, setSendButtonMarginTop] = useState("15px")
  const [display_desktop_button, setDsplayDesktopButton] = useState();
  const [display_mobile_button, setDisplayMobileButton] = useState();

  const [activeItemInTextMenu, setactiveItemInTextMenu] = useState(); 

  const [right_orner_star, setRightCornerStar] = useState();

  const green = useRef("palegreen");
  const black = useRef("black");

  const [bold_color, setBoldColor] = useState();
  const [italic_color, setItalicColor] = useState();
  const [quotes_color, setQuotesColor] = useState();
  const [link_color, setLinkColor] = useState();
  const [user_color, setUserColor] = useState();
  const [photo_color, setPhotoColor] = useState();

  const [is_bold_active, setIsBoldActive] = useState(false);
  const [is_italic_active, setIsItalicActive] = useState(false);
  const [is_quotes_active, setIsQuotesActive] = useState(false);
  const [is_link_active, setIsLinkActive] = useState(false);
  const [is_user_active, setIsUserActive] = useState(false);
  const [is_photo_active, setIsPhotoActive] = useState(false);

  // textarea
  const [text_area_height, setTextAreaHeight] = useState();
  const [text_area_width, setTextAreaWidth] = useState();
  const [text_area_radius, setTextAreaRadius] = useState();

  // asterisk
  const [asterisk_height, setAsteriskHeight] = useState();
  const [asterisk_width, setAsteriskWidth] = useState();

  const dodger_blue = useRef("#1E90FF");
  const rose_white = useRef("#FFFAFA");
  const white_dove = useRef("#F0EFE7");

  const handleItemInTextMenuClicks = (e, {name, value, active}) => {
    // console.log("clicked: "+name)
    switch (name) {
      case "B":
        setBoldColor(dodger_blue.current);
        console.log("clicked: "+name);
        setIsBoldActive(true)
        console.log("is active? "+value);
        console.log("active var: "+active);
        break;
      case "I":
        setItalicColor(dodger_blue.current);
        break;
      case "Q":
        setQuotesColor(dodger_blue.current);
        break;
      case "L":
        setLinkColor(dodger_blue.current);
        break;
      case "C":
        setUserColor(dodger_blue.current);
        break;
      case "P":
        setPhotoColor(dodger_blue.current);
        break;
    }
  }
  
  useEffect(() => {
    // console.log("uuser_firstname",u_firstname);
    var window_width = width.current;
    var window_height = height.current;
    
    if(window_width < (window_height+200)) {
      setDisplayMobileButton("inline");
      setDsplayDesktopButton("none");
      setNumberOfColumns(1);
      setGravityWidthOfColumnOne(6)
      setGravityWidthOfColumnTwo(10)
      setButtonSize("large");
      setTextAreaHeight("90%");
      setTextAreaWidth("100%");
      setTextAreaRadius("20px");
      // setAsteriskHeight("100%");
      // setAsteriskWidth("100%");
    } else {
      // Pc Screen
      setDisplayMobileButton("none");
      setDsplayDesktopButton("inline");
      setButtonSize("huge");
      setNumberOfColumns(2); //text area and displaying the posts
      setGravityWidthOfColumnOne(6)
      setGravityWidthOfColumnTwo(10)
      setRightCornerStar("2.4%");
      setRightCornerStar("3.3%");
      setTextAreaHeight("90%");
      setTextAreaWidth("100%");
      setTextAreaRadius("20px");
      // setAsteriskHeight("100%");
      // setAsteriskWidth("100%");
    }

    // Getting data from firebase
    db.collection("posts")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          postsDictionary[doc.id] = doc.data()
    })

    setPostDictionary(postsDictionary)

    /**Setting up the posts from Firebase meaning, whenever we 
     * that whenever we refresh the page or restart the app,
     * the following code gets the post already in firebase for 
     * us to display them via pagination.
     */
    Object.keys(postsDictionary)
      .forEach(async function (key, index) {
        if(index != 0) {
          // console.log("key: ",key," index: ",index)
          /** Storing data gathered from firebase database to
            local variables. */
          let time_stamp = postsDictionary[key]["time"];
          let enter_post = postsDictionary[key]["post"];
          let post_id = postsDictionary[key]["post_id"];
          let likes_count = postsDictionary[key]["likes"];
          let favorites_count = postsDictionary[key]["favorites"];
          let current_user_firstname = postsDictionary[key]["firstname"];
          let current_user_lastname = postsDictionary[key]["lastname"];
          let current_user_profile_image = postsDictionary[key]["profile_image"];
          let current_user_id = postsDictionary[key]["user_id"];
          
          // Now pushing to object/component to be displayed.
          postsFromFirebase["postsFromFirebase"].push({"time":time_stamp,
            "post":enter_post,"post_id":post_id,
            "likes":likes_count,"favorites":favorites_count,
            "firstname":"current_user_firstname",
            "lastname":"current_user_lastname", 
            "profile_image_uri":"current_user_profile_image"
          });

          // setPostsFromFirebase(postsFromFirebase)
          setTimeStamp(time_stamp);
          setPost(enter_post);
          setPostID(post_id);
          setLikesCount(likes_count);
          setFavoriteCount(favorites_count);
          setUserFirstname(current_user_firstname);
          setUserLastname(current_user_lastname);
          setUserProfileImage(current_user_profile_image);
          setUserId(current_user_id);
          }
        })
      }).catch((error) => {
    })
    // Can't set the values here
  },[postsFromFirebase])

  const sendPost = (e) => {
    e.preventDefault()
    /**Send the new post in Firebase Database. */

    console.log("clicked the send button");
    let post_text = inputRef.current.value;
    let time = new Date().toLocaleDateString('en-us', { weekday:"short", year:"numeric", month:"short", day:"numeric"});
    let post_id = postURI.slice(0,8);

    // Set information to firebase databse
    db.collection("posts")
      .doc(post_id)
      .set({
        post: post_text,
        time: time,
        likes: 0,
        favorites: 0,
        post_id: post_id,
        firstname: u_firstname,
        lastname: u_lastname,
        profile_image: u_profile_image,
        user_id: user_id,
    })

    setPost(post_text);
    setTimeStamp(time);
    setPostID(post_id);
    setFavoriteCount(0);
    setLikesCount(0);
    setUserFirstname(user_firstname);
    setUserLastname(user_lastname);
    setUserId(user_id);
    // setProfileImage


    console.log("p"+JSON.stringify(postsFromFirebase));

    // Set the postwith new values -- prepare the post object before is sent to the firebase db.
    postsFromFirebase["postsFromFirebase"].push({"time": time, "post": post_text,
      "post_id": post_id, likes: 0, favorites: 0, "firstname": user_firstname,
      "lastname": user_lastname, "user_id": user_id});
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
          var data = doc.data();
          console.log(doc.id,"=>", data["post"])
        });
    }).catch((error) => {
      console.log("In FetchData: Error getting documents: ", error)
    })
  }

  return (
    <Grid 
      columns = {numberOfColumns} 
      reversed = "mobile"
      stackable 
      >
      <link 
        rel = "stylesheet" 
        href = "/home/emmanuel/Desktop/ReactJSProjects/Diary/frontend/src/styles/notebookComponent.css"/>
      <Grid.Row
        id = "outerRow"
        style = {{paddingTop:paddingTopOfOuterRow.current, 
                  height:heightOfOuterRow.current}}
        stretched 
        // divided
        >
        <Grid.Column width = {gravityWidthOfColumnOne}>
          <Segment style = {{height:segmentOneHeight.current}}>
            <div
              id = "notebook-element">  
              <h2 className = "text-center mb-2">
                <h3 className = {header.current}>
                  <i className = {inputHint.current}></i>
                  Write what comes to mind!
                </h3>
              </h2>
              {/* <Menu
                position = "center"
                incon = "labeled"
                fluid 
                widths = {10}
                secondary 
                // pointing
                >
                <Menu.Item
                  className = "item"
                  style = {{color:bold_color,backgroundColor:white_dove.current}}
                  active = {activeItemInTextMenu === "B"}
                  onClick = {handleItemInTextMenuClicks}
                  name = "B"
                  icon = "bold"
                  // color = "backgroundColor"
                  value = {is_bold_active}
                  data-tooltip = "Bold." 
                  data-position = "top center" >
                    <Icon name = "bold" />
                  </Menu.Item>
                <Menu.Item
                  active = {activeItemInTextMenu === "I"}
                  onClick = {handleItemInTextMenuClicks}
                  style = {{color:italic_color}}
                  name = "I"
                  value = {is_italic_active}
                  activeItemInTextMenu = "I"
                  icon = "italic"
                  data-tooltip = "Italic." 
                  data-position = "top center" >
                    <Icon name = "italic" />
                </Menu.Item>
                <Menu.Item
                  active = {activeItemInTextMenu === "Q"}
                  onClick = {handleItemInTextMenuClicks}
                  style = {{color:quotes_color}}
                  name = "Q"
                  value = {is_quotes_active}
                  activeItemInTextMenu = "Q"
                  icon = "quote right"
                  data-tooltip = "Add quote." 
                  data-position = "top center" >
                    <Icon name = "quote right" />
                </Menu.Item>
                <Menu.Item
                  active = {activeItemInTextMenu === "L"}
                  onClick = {handleItemInTextMenuClicks}
                  style = {{color:link_color}}
                  name = "L"
                  value = {is_link_active}
                  activeItemInTextMenu = "L"
                  icon = "linkify right"
                  data-tooltip = "Add a Link." 
                  data-position = "top center" >
                    <Icon name = "linkify right" />
                </Menu.Item>
                <Menu.Item 
                  active = {activeItemInTextMenu === "C"}
                  onClick = {handleItemInTextMenuClicks}
                  style = {{color:user_color}}
                  name = "C"
                  value = {is_user_active}
                  activeItemInTextMenu = "C"
                  icon = "users right"
                  data-tooltip = "Mentions Someone." 
                  data-position = "top center" >
                    <Icon name = "users right" />
                </Menu.Item>
                <Menu.Item
                  active = {activeItemInTextMenu === "P"}
                  onClick = {handleItemInTextMenuClicks}
                  style = {{color:photo_color}}
                  name = "P"
                  value = {is_photo_active}
                  activeItemInTextMenu = "P"
                  icon = "image right"
                  data-tooltip = "Add an Image." 
                  data-position = "top center" >
                    <Icon name = "image right" />
                </Menu.Item>
              </Menu> */}
              <Grid>
                <Grid.Row 
                  columns = {2}>
                  <Grid.Column 
                    width = {13}> {/**for full 18 */}
                        <textarea
                          rows = "10"
                          id = "input-element"
                          className = "ui segment"
                          type = "text"
                          size = "big"
                          ref = {inputRef}
                          name = "message"
                          style = {{height:text_area_height, width:text_area_width, 
                                    borderTopLeftRadius:text_area_radius,
                                    borderTopRightRadius:text_area_radius,
                                    borderBottomLeftRadius:text_area_radius,
                                    borderBottomRightRadius:text_area_radius
                                  }}
                          onChange = {handleChange}
                          placeholder = 'Type anything...'>
                        </textarea> {/**Text area */}
                    {/* </div> *Text area + Star */}
                  </Grid.Column>
                  <Grid.Column 
                    width = {3}
                    style = {{paddingLeft:"0px"}}>
                    <div 
                      id = "mobile-button" >
                      <Button 
                        className = "ui circular plus icon purple button"
                        type = "submit"
                        value = {time_stamp}
                        onClick = {sendPost}
                        style = {{color:rose_white, //dodger-blue: #1E90FF, ivory:#FFFFF0 ....a28089
                                  width:"fit-content", 
                                  height:"fit-content", 
                                  marginLeft:"0%", 
                                  marginTop:"100%",
                                  display:display_mobile_button}}
                        data-tooltip = "Press to send note to save on database." 
                        data-position = "top center"
                        > <i className = {buttonSize+" plus icon"}></i>
                      </Button>
                    </div>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </div>{/**"notebook-element"*/}
          </Segment>
          <div id = "desktop_button">
            <Button 
              className = "ui circular plus icon red button"
              type = "submit"
              value = {time_stamp}
              onClick = {sendPost}
              style = {{color:"white",
                      width:"fit-content", 
                      height:"fir-content", 
                      marginLeft:"0%",
                      display:display_desktop_button}}
              data-tooltip = "Press to send note to save on database." 
              data-position = "top center"
              ><i className = {buttonSize+" plus icon"}></i>
            </Button>
          </div>
        </Grid.Column>
        <Grid.Column 
          width = {gravityWidthOfColumnTwo} 
          style = {{height:"100%",
                  overflow:'scroll', 
                  maxHeight:columnTwoMaxHeight}}>
          <Segment style = {{backgroundColor:"#F3FDFE"}}>
              {postsFromFirebase["postsFromFirebase"]
              .map(entry => {if(entry.post != null && entry.time != null)
              return (
                <div style = {{marginTop:"15px"}}>
                  <LoadPosts 
                    post = {entry.post} 
                    time = {entry.time}
                    post_id = {entry.post_id}
                    likes = {entry.likes}
                    favorites = {entry.favorites}
                    firstname = {entry.firstname}
                    lastname = {entry.lastname}
                    profile_image = {entry.profile_image}/>
                </div>)}
            )}
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export default Note