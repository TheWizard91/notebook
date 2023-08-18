import React,{useRef,useState,useEffect} from 'react'
import RegisterForm from "./RegisterForm"
import {useAuth} from "../contexts/AuthContext"
import {Link, useNavigate} from "react-router-dom"
import {Form, Input, TextArea, Button, Select, Card, Grid, Icon, Divider, Transaction} from 'semantic-ui-react'
import {Placeholder} from 'semantic-ui-react'
import app from "../contexts/AuthContext"
// import firestore from "../firebase/firestore"
import {firestore, collection, query, where, getDock} from "../firebase/firestore"
import db from "../firebase/firestore"
import ref from "../firebase/Storage"
import realtimeDB from '../firebase/realtimeDatabase'
import LogIn from "../components/LogIn"
// import defaultExport, {User} from "../models/User"
import {v4 as uuid} from 'uuid';

function SignUp({l}) {

  /**TODO: 
   * I created a new user_id because from the time sestUserId() to the time
   * loadUser...... method  the user is not made yet, at least not 
   * the id. Fix it.*/
  
  // const vIs = useRef(l);
  // const [loc, setLoc]=useState("l");

  const [firstname, setFirstname] = useState()
  const [lastname, setLastname] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [confirm_password, setConfirmPassword] = useState()
  const {current_user, signup, logout, setUserId} = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  /**Need to setup the values for the size of the form */
  const [form_width, setFormWidth] = useState()
  const [form_heigth, setFormHeight] = useState()

  const adjust_horizontal_position = useRef("10%");
  const adjust_vertical_postion = useRef("0%");

  // const [fake_user_id, setFakeUserId] = useState();
  const user_uri = uuid();

  useEffect(() => {
    // setLoc("M")
    // console.log("vIs: "+vIs.current," loc: "+loc);
    let width_original_lenght = window.innerWidth;
    let height_original_lenght = window.innerHeight;
    
    if(height_original_lenght > (width_original_lenght + 100)) {
      let width_length_to_set = width_original_lenght * (400/width_original_lenght)
      let height_length_to_set = 800;
      setFormWidth(width_length_to_set+"px")
      setFormHeight(height_length_to_set+"px")
    } else {
      let width_length_to_set = width_original_lenght * (600/width_original_lenght)
      let height_length_to_set = 800;
      setFormWidth(width_length_to_set+"px")
      setFormHeight(height_length_to_set+"px")
    }
  })
  
  async function handleSubmit (e) {
    e.preventDefault()

    // Validating and checking
    if (password !== confirm_password) {
      return setError("Password do not match")
    }

    let firstname_of_current_user = firstname;
    let lastname_of_current_user = lastname;
    let email_of_current_user = email;
    let password_of_current_user = password;
    let current_user_id_uri = user_uri.slice(0, 8);//current_user.uid 
    let time = new Date().toLocaleDateString('en-us', { weekday:"short", year:"numeric", month:"short", day:"numeric"})

    // setFakeUserId(current_user_id_uri);

    loadUserInformationToFirebaseDatabase(firstname_of_current_user,
      lastname_of_current_user, email_of_current_user, password_of_current_user,
      current_user_id_uri);

    try {
      setError("")
      setLoading(true)
      // Create user in authetication first so we have it created with the uid
      let promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          signup(email, password);
          setUserId();
          loadNotificationToRealtimeDB(firstname_of_current_user,
            lastname_of_current_user, email_of_current_user, password_of_current_user,
            current_user_id_uri, time);
          console.log("Success!");
          resolve("Success!");
        }, 1000);
      })

      // Adding user to realtime db by id current_user.uid
      promise.then(result=>(
        logout(),
        navigate("/")
      )).catch((err) => logout())
    } catch {
      setError("Failed to create an account")
    }
    setLoading(false)
  }

  const loadNotificationToRealtimeDB = (user_firstname,
    user_lastname,user_elmail,user_password,user_id,notification_time) => {
    /**Loading information to realtime database for notifications. */
    realtimeDB.ref(user_id).set({
      firstname: user_firstname,//firstname,
      lastname: user_lastname,//lastname
      email: user_elmail,//email
      password: user_password,//password
      temporary_user_id: user_id,//---
      real_user_id: "working-on-it",
      profile_image_uri: "https://firebasestorage.googleapis.com/v0/b/thejournal-d14eb.appspot.com/o/storage_of_me%2Fprofile_images%2F1e87a7f1-aced-4dce-a853-fb163ef52b24.jpg?alt=media&token=0bdb1342-01a9-467e-964b-2007ab2dccbc",
      time: notification_time,
    }).catch(alert)
  }

  // const userConverter = {
  //   toFirestore: (user)=> {
  //       return {
  //           firstname:user.firstname,
  //           lastname: user.lastname,
  //           email: user.emal,
  //           temporary_user_id: user.temporary_user_id,
  //           permanent_user_id: user.permanent_user_id,
  //           profile_image_uri: user.profile_image_uri
  //       };
  //   },
  //   fromFirestore: (snapshot, options) => {
  //       const data = snapshot.data(options);
  //       return new User(data.firstname, data.lastname, data.email, data.temporary_user_id, data.permanent_user_id, data.profile_image_uri);
  //   }
  // };


  const loadUserInformationToFirebaseDatabase = (user_firstname,user_lastname,user_elmail,user_password,user_id) => {
    /**Creating the user in FirebaseDB. */

    db.collection("users")
      .doc(firstname)//
      .set({
        firstname: user_firstname,//firstname_of_current_user,
        lastname: user_lastname,//lastname_of_current_user,
        email: user_elmail,//email_of_current_user,
        password: user_password,//password_of_current_user,
        temporary_user_id: user_id,//current_user_id_uri,
        profile_image: "https://firebasestorage.googleapis.com/v0/b/thejournal-d14eb.appspot.com/o/storage_of_me%2Fprofile_images%2F1e87a7f1-aced-4dce-a853-fb163ef52b24.jpg?alt=media&token=0bdb1342-01a9-467e-964b-2007ab2dccbc",
        message:user_firstname+" welcome to Notebook ^,^!"
    })
    // const ref = doc(db, "firstname", "lastname").withConverter(cityConverter);
    // await setDoc(ref, new User(user_firstname,user_lastname,user_elmail,user_password,user_id,"",profile_image))
  }

  // Set values entered by uset to variables by hook
  const handleChange = (e) => {
    switch (e.target.name) {
      case "firstname":
        console.log("firstname is: "+e.target.value)
        setFirstname(e.target.value)
        break;

      case "lastname":
        console.log("latname is: "+e.target.value)
        setLastname(e.target.value)
        break;

      case "email":
        console.log("email is: "+e.target.value)
        setEmail(e.target.value)
        break;

      case "password":
        console.log("password is: "+e.target.value)
        setPassword(e.target.value)
        break;
    
      case "confirm_password":
        console.log("confirm_password is: "+e.target.value)
        setConfirmPassword(e.target.value)
        break;
    
      default:
        break;
    }
  }

  return (
    <div>
      <Grid
        className = "ui container center aligned"
        textAlign = "center"
        verticalAlign = 'middle'
        style = {{borderColor: "red", transform: "translate("+adjust_vertical_postion.current+","+adjust_horizontal_position.current+")"}}>
        <Grid.Row>
          <Grid.Column width = {6} style = {{minWidth:form_width, maxHeight:form_heigth}}>
            <Card style = {{width:"100%"}}>
              <Form 
                size = "big"
                key = "big"
                onSubmit = {handleSubmit}>
                <h2 className = "text-center mb-4">Sign Up</h2>
                <Form.Field id = "first-name">
                  <Form.Input 
                    name = "firstname"
                    type = "text"
                    label = "Firstname"
                    placeholder = "Enter Firstname..." 
                    icon = "user"
                    onChange = {handleChange}
                    value = {firstname} 
                    required></Form.Input>
                </Form.Field>
                <Form.Field id = "last-name">
                  <Form.Input 
                    name = "lastname"
                    type = "text"
                    label = "Lastname"
                    placeholder = "Enter Lastname..." 
                    icon = "user"
                    onChange = {handleChange}
                    value = {lastname} 
                    required></Form.Input>
                </Form.Field>
                <Form.Field id = "email">
                  <Form.Input 
                    name = "email"
                    type = "email"
                    label = "Email"
                    placeholder = "Enter Email..." 
                    icon = "envelope"
                    onChange = {handleChange}
                    value = {email} 
                    required></Form.Input>
                </Form.Field>
                <Form.Field id = "password">
                  <Form.Input 
                    name = "password"
                    type = "password"
                    label = "Enter Password"
                    placeholder = "Enter Password..." 
                    icon = "lock"
                    onChange = {handleChange}
                    value = {password} 
                    required></Form.Input>
                </Form.Field>
                <Form.Field id = "password-confirm">
                  <Form.Input
                    name = "confirm_password"
                    type = "password"
                    label = "Confirm Password"
                    placeholder = "Confirm Password..." 
                    icon = "lock"
                    onChange = {handleChange}
                    value = {confirm_password} 
                    required></Form.Input>
                </Form.Field>
                <Button 
                  disabled = {loading} 
                  className = "w-100"
                  color = "blue" 
                  size = "big"
                  type = "submit">Sign Up</Button>
              </Form>
            </Card>
          </Grid.Column>
        </Grid.Row>
        <div className = "w-100 text-center mt-2">
          Already have an account? <Link to = "/" element = {<LogIn/>}>Log In</Link>
        </div>
      </Grid>
    </div>
  )
}

export default SignUp