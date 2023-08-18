import React, { useRef, useState, useEffect } from "react"
import {useAuth,logout} from "../contexts/AuthContext"
import realtimeDB from '../firebase/realtimeDatabase'
import { Link, useNavigate } from "react-router-dom"
import {Form, Button, Card, Grid, Select, Input, Icon, Header, Image, Segment} from "semantic-ui-react"
import db from "../firebase/firestore"
import ContentLoader, { Facebook } from 'react-content-loader'
import ReactImagePickerEditor, { ImagePickerConf } from 'react-image-picker-editor';
import 'react-image-picker-editor/dist/index.css'
import MainPage from "./MainPage"
// import MagicBell, { FloatingNotificationInbox } from '@magicbell/magicbell-react';

// https://www.npmjs.com/package/@magicbell/magicbell-react
// https://medium.com/@musturi.rakesh/notification-component-in-react-javascript-b9c574b2c494
// https://hackernoon.com/how-to-add-notifications-to-your-react-navigation-bar
// import "../styles/imagePicker.css"

// https://codesandbox.io/s/image-picker-form-image-box-srt0q?file=/src/index.js:0-1411
// https://codepen.io/mrMetalWood/pen/XjXrrV
function UpdateProfile() {
  
  // Firebase stuff. 
  const { currentUser, updatePassword, updateEmail } = useAuth();
  const [ error, setError ] = useState("");
  const [ loading, setLoading ] = useState(false);
  const navigate = useNavigate();

  // New values
  const [newFirstname, setNewFirstname] = useState();
  const [newLastname, setNewLastname] = useState();
  const [newEmail, setNewEmail] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmNewPassword, setConfirmNewPassword] = useState();
  const [newProfileImageURL, setNewProfileImageURI] = useState();

  // Old Values
  const [oldFirstname, setOldFirstname] = useState();
  const [oldLastname, setOldLastname] = useState();
  const [oldEmail, setOldEmail] = useState();
  const [oldPassword, setOldPassWord] = useState();
  const [oldProfileImageURL, setOldProfileImageURL] = useState();
  const old_profile_image_uri = useRef();

  // Collect user's data
  const [ usersData, setUsersData] = useState([]);
  const [ dataIdToBeUpdated, setDataIdToBeUpdated ] = useState("");

  // Window
  const window_width_ref = useRef(window.innerWidth);
  const window_heigth_ref = useRef(window.innerHeight);

  // Adjusting the form's size.
  const adjust_horizontal_position = useRef("10%");
  const adjust_vertical_postion = useRef("0%");
  const [form_width, setFormWidth] = useState();
  const [form_height, setFormHeight] = useState();

  function handleSubmit(e) {
    e.preventDefault()
    if (newPassword.current.value !== confirmNewPassword.current.value) {
      return setError("Passwords do not match")
    }

    const promises = []
    setLoading(true)
    setError("")

    if (newEmail.current.value !== currentUser.email) {
      promises.push(updateEmail(newEmail.current.value))
    }
    if (newPassword.current.value) {
      promises.push(updatePassword(newPassword.current.value))
    }

    Promise.all(promises)
      .then(() => {
        navigate("/login")
      })
      .catch(() => {
        setError("Failed to update account")
      })
      .finally(() => {
        setLoading(false)
      })
    
  }

  const handleChange =(e)=>{
    e.preventDefault()
    let me = "me";
    switch (e.target.name) {

      case "firstname":
        // console.log("firstname: "+e.target.value)
        console.log("firstname: "+e.target.value)
        break;

      case "lastname":
        // setNewLastname(e.target.value)
        console.log("lastname: "+e.target.value)
        break

      case "email":
        // setNewEmail(e.target.value)
        console.log("email: "+e.target.value)
        break

      case "new_password":
        // setNewPassword(e.target.value)
        console.log("new_password: "+e.target.value)
        break

      case "confirm_new_password":
        // setConfirmNewPassword(e.target.value)
        console.log("confirm_new_password: "+e.target.value)
        break

      default:
        break;
    }
  }

  useEffect(() => {
    let width = window_width_ref.current;
    let height = window_heigth_ref.current;
    let width_for_form = 0;
    let height_for_form = 0;//no-initial-user-image
    console.log("old_image: "+old_profile_image_uri.current);
    console.log("width: "+width+" height: "+height);
    if (height > (width+100)) {
      // Mobile
      width_for_form = width * (400/width);
      height_for_form = 800;
      setFormWidth(width_for_form+"px");
      setFormHeight(height_for_form+"px");
    } else {
      // Desktop
      width_for_form = width * (600/width);
      height_for_form = 800;
      setFormWidth(width_for_form+"px");
      setFormHeight(height_for_form+"px");
    }
    realtimeDB.ref(currentUser.uid)
    .get()
    .then((snapshot) => {
      if(snapshot.exists()) {
        let old_firstname = snapshot.val().firstName
        let old_lastname = snapshot.val().lastName
        let old_email = snapshot.val().email
        let old_password = snapshot.val().password
        let old_profile_image_uri = snapshot.val().profileImage
        setOldFirstname(old_firstname)
        setOldLastname(old_lastname)
        setOldEmail(old_email)
        setOldPassWord(old_password)
        setOldProfileImageURL(old_profile_image_uri)
        usersData.push(old_firstname)
        usersData.push(old_lastname)
        usersData.push(old_email)
        usersData.push(old_password)
        usersData.push(old_profile_image_uri)
      } else {
        console.log("No data vailable")
      }
    }).catch((error) => {
      console.error(error)
    })
  }, []);

  const handleOnPreviewClick = (e) => {
    e.preventDefault()
    // console.log("clicked");
  }

  return (
    <Grid
      className = "ui container center aligned"
      textAlign = "center"
      verticalAlign = 'middle'
      style = {{borderColor: "red", 
      transform: "translate("+adjust_vertical_postion.current+","+adjust_horizontal_position.current+")"}}
    >
      <Grid.Row >
        <Grid.Column 
          width = {6} 
          style = {{minWidth:form_width, maxHeight:form_height}}>
          <Card style = {{width:"100%"}}>
            <Form onSubmit = {handleSubmit}>
              <Header className="text-center mb-4">Update Profile</Header>
              {/* TODO: Add Image picker option so that the user can have a user image. */}
              {/* <Image 
                // className = "ui circular big centered image"
                class = "ui avatar image"
                src = {oldProfileImageURL}
                onClick = {handleOnPreviewClick}
                style = {{backgroundColor:"black", height:"100px",width:"100px"}}
                size = "big"
                avatar
                centered /> */}
              <Form.Field id = "first-name">
                <Form.Input 
                  name = "firstname"
                  label = "firstname"
                  type = "text"
                  id = "user-first-name"
                  icon = "user"
                  placeholder = "Enter Firstname"
                  onChange = {handleChange} 
                  ref = {newFirstname} 
                  required 
                ></Form.Input>
              </Form.Field>
              <Form.Field id="last-name">
                <Form.Input
                  name = "lastname" 
                  label = "Lastname"
                  type = "text" 
                  ref = {newLastname}
                  icon = "user"
                  id = "user-first-name"
                  placeholder = "Last Name"
                  onChange = {handleChange} 
                  required
                ></Form.Input>
              </Form.Field>
              <Form.Field id = "email">
                <Form.Input 
                  name = "email"
                  label = "Email"
                  type = "email"
                  icon = "envelope"
                  ref = {newEmail} 
                  defaultValue = {currentUser.email}
                  onChange = {handleChange} 
                  required 
                ></Form.Input>
              </Form.Field>
              <Form.Field id = "password">
                <Form.Input
                  name = "new_password"
                  label = "Passord"
                  placeholder = "Leave blank to keep the same" 
                  type = "password"
                  icon = "lock"
                  ref = {newPassword}
                  defaultValue = {currentUser.password}
                  onChange = {handleChange} 
                  required
                ></Form.Input>
              </Form.Field>
              <Form.Field id = "password-confirm">
                <Form.Input
                  name = "confirm_new_Password" 
                  label = "Password"
                  placeholder = "Confirm the new password" 
                  type = "password"
                  icon = "lock"
                  ref = {confirmNewPassword} 
                  onChange = {handleChange} 
                  required
                ></Form.Input>
              </Form.Field>
              <Button 
                disabled = {loading}
                className = "w-100" 
                type = "submit"
                color = "blue"
              >
                Update
              </Button>
            </Form>
            <div className = "w-100 text-center mt-2">
              <Link to = "/mainpage">Cancel</Link>
            </div>
          </Card>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export default UpdateProfile