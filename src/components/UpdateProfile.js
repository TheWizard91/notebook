
import React, { useRef, useState, useEffect } from "react"
import {useAuth,logout} from "../contexts/AuthContext"
import realtimeDB from '../firebase/realtimeDatabase'
import { Link, useNavigate } from "react-router-dom"
import {Form,Button,Card,Grid,Select,Input,Icon,Header,Image} from "semantic-ui-react"
import db from "../firebase/firestore"

function UpdateProfile() {
  // 
  const { currentUser, updatePassword, updateEmail } = useAuth()
  const [ error, setError ] = useState("")
  const [ loading, setLoading ] = useState(false)
  const navigate = useNavigate()
  // New values
  const [newFirstname,setNewFirstname] = useState()
  const [newLastname,setNewLastname] = useState()
  const [newEmail,setNewEmail]=useState()
  const [newPassword,setNewPassword] = useState()
  const [confirmNewPassword,setConfirmNewPassword]=useState()
  const [newProfileImageURL,setNewProfileImageURI]=useState()
  // TODO: Use these as it is a better way of doing it better.
  // Had to comment it of becuase the app is good enough to be lauched.
  // Just a few features to add to make it comeplete, use sign in com as reference.
  // const newFirstname=useRef()
  // const newLastname=useRef()
  // const newEmail=useRef()
  // const newPassword=useRef()
  // const confirmNewPassword=useRef()
  // const newProfileImageURL=useRef()
  
  // Old Values
  const [oldFirstname,setOldFirstname]=useState()
  const [oldLastname,setOldLastname]=useState()
  const [oldEmail,setOldEmail]=useState()
  const [oldPassword,setOldPassWord]=useState()
  const [oldProfileImageURL,setOldProfileImageURL]=useState()
  // Collect user's data
  const [ usersData, setUsersData ] = useState([]);
  const [ dataIdToBeUpdated, setDataIdToBeUpdated ] = useState("");

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
    
  }, [])

  console.log(usersData)
  const handleImageOnclick = (e) => {
    e.preventDefault()
    console.log("clicked")
  }

  return (
    <Grid
      className="d-flex align-items-center justify-content-center"
      style={{mainHeight:"100vh"}}
    >
      <Grid.Row >
        <Grid.Column width={6} style={{minWidth:"800px"}}>
          <Card style={{width:"100%"}}>
            <Form onSubmit={handleSubmit}>
              <Header className="text-center mb-4">Update Profile</Header>
              <Image 
                className="ui circular big centered image"
                src={oldProfileImageURL}
                onClick={handleImageOnclick}
                style={{backgroundColor:"transparent",height:"100px",width:"100px"}}
              />
              <Form.Field id="first-name">
                <Form.Input 
                  name="firstname"
                  label="firstname"
                  type="text"
                  id="user-first-name"
                  icon="user"
                  placeholder="Enter Firstname"
                  onChange={handleChange} 
                  ref={newFirstname} 
                  required 
                ></Form.Input>
              </Form.Field>
              <Form.Field id="last-name">
                <Form.Input
                  name="lastname" 
                  label="Lastname"
                  type="text" 
                  ref={newLastname}
                  icon="user"
                  id="user-first-name"
                  placeholder="Last Name"
                  onChange={handleChange} 
                  required
                ></Form.Input>
              </Form.Field>
              <Form.Field id="email">
                <Form.Input 
                  name="email"
                  label="Email"
                  type="email"
                  icon="envelope"
                  ref={newEmail} 
                  defaultValue={currentUser.email}
                  onChange={handleChange} 
                  required 
                ></Form.Input>
              </Form.Field>
              <Form.Field id="password">
                <Form.Input
                  name="new_password"
                  label="Passord"
                  placeholder="Leave blank to keep the same" 
                  type="password"
                  icon="lock"
                  ref={newPassword}
                  defaultValue={currentUser.password}
                  onChange={handleChange} 
                  required
                ></Form.Input>
              </Form.Field>
              <Form.Field id="password-confirm">
                <Form.Input
                  name="confirm_new_Password" 
                  label="Password"
                  placeholder="Confirm the new password" 
                  type="password"
                  icon="lock"
                  ref={confirmNewPassword} 
                  onChange={handleChange} 
                  required
                ></Form.Input>
              </Form.Field>
              <Button 
                disabled={loading}
                className="w-100" 
                type="submit"
                color="blue"
              >
                Update
              </Button>
            </Form>
            <div className="w-100 text-center mt-2">
              <Link to="/">Cancel</Link>
            </div>
          </Card>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export default UpdateProfile