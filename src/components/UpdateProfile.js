
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
  // const [newFirstname,setNewFirstname] = useState()
  // const [newLastname,setNewLastname] = useState()
  // const [newEmail,setNewEmail]=useState()
  // const [newPassword,setNewPassword] = useState()
  // const [confirmNewPassword,setConfirmNewPassword]=useState()
  // const [newProfileImageURL,setNewProfileImageURI]=useState()
  // 
  const newFirstname=useRef()
  const newLastname=useRef()
  const newEmail=useRef()
  const newPassword=useRef()
  const confirmNewPassword=useRef()
  const newProfileImageURL=useRef()
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
        navigate("/")
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
        // setNewFirstname(e.target.value)
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
    // db.collection("users")
    //   .get()
    //   .then((querySnapshot) => {
    //     const data = []
    //     querySnapshot.forEach((doc) => {
    //       console.log(doc.is, " => ", doc.data());
    //       data.push(doc.data());
    //     })
    //     setUsersData(data);
    //   })
    //   .catch((error) => {
    //     console.log("Error getting documents: ", error);
    //   });
    realtimeDB.ref(currentUser.uid)
    .get()
    .then((snapshot) => {
      if(snapshot.exists()) {
        // let old_firstname = snapshot.val().firstName
        // let old_lastname = snapshot.val().lastName
        // let old_email = snapshot.val().email
        // let old_password = snapshot.val().password
        // let old_profile_image_uri = snapshot.val().profileImage
        // setOldFirstname(old_firstname)
        // setOldLastname(old_lastname)
        // setOldEmail(old_email)
        // setOldPassWord(old_password)
        // setOldProfileImageURL(old_profile_image_uri)
        // usersData.push(old_firstname)
        // usersData.push(old_lastname)
        // usersData.push(old_email)
        // usersData.push(old_password)
        // usersData.push(old_profile_image_uri)

        let oldFirstname = snapshot.val().firstName
        let oldLastname = snapshot.val().lastName
        let oldEmail = snapshot.val().email
        let oldPassword = snapshot.val().password
        let oldProfileImageURI = snapshot.val().profileImage

        usersData.push(oldFirstname)
        usersData.push(oldLastname)
        usersData.push(oldEmail)
        usersData.push(oldPassword)
        usersData.push(oldProfileImageURI)

      } else {
        console.log("No data vailable")
      }
    }).catch((error) => {
      console.error(error)
    })
    
  }, [])

  // console.log(usersData)
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
                  iconPosition="right"
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
                  iconPosition="right"
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
                  iconPosition="right"
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
                  iconPosition="right"
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
                  iconPosition="right"
                  icon="lock"
                  ref={confirmNewPassword} 
                  onChange={handleChange} 
                  required
                ></Form.Input>
              </Form.Field>
              <Button 
                disabled={loading} 
                onClick={handleSubmit} 
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