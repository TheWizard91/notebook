
import React, { useRef, useState, useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import realtimeDB from '../firebase/realtimeDatabase'
import { Link, useNavigate } from "react-router-dom"
import {Form,Button,Card,Grid,Select,Input,Icon,Header,Image} from "semantic-ui-react"
import db from "../firebase/firestore"

function UpdateProfile() {
  const firstNameRef = useRef()
  const lastNameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { currentUser, updatePassword, updateEmail } = useAuth()
  const [ error, setError ] = useState("")
  const [ loading, setLoading ] = useState(false)
  const navigate = useNavigate()

  const [ usersData, setUsersData ] = useState([]);
  const [ dataIdToBeUpdated, setDataIdToBeUpdated ] = useState("");

  function handleSubmit(e) {
    e.preventDefault()
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    const promises = []
    setLoading(true)
    setError("")

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value))
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value))
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
    console.log("printing user input"+firstName.current.value)
  }

  useEffect(() => {
    db.collection("users")
      .get()
      .then((querySnapshot) => {
        const data = []
        querySnapshot.forEach((doc) => {
          console.log(doc.is, " => ", doc.data());
          data.push(doc.data());
        })
        setUsersData(data);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }, [])

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
                src="user outline"
                onClick={handleImageOnclick}
                style={{backgroundColor:"transparent",height:"100px",width:"100px"}}
                />
              <Form.Field id="first-name">
                <Form.Input 
                  label = "Firstname"
                  type = "text"
                  id =  "user-first-name"
                  placeholder="Enter Firstname"
                  onChange = { handleChange } 
                  ref = { firstNameRef } 
                  required 
                ></Form.Input>
              </Form.Field>
              <Form.Field id="last-name">
                <Form.Input 
                  label = "Lastname"
                  type = "text" 
                  ref = { lastNameRef } 
                  required 
                  id =  "user-first-name"
                  placeholder="Last Name"
                  // onChange = { handleChange } 
                  required
                ></Form.Input>
              </Form.Field>
              <Form.Field id="email">
                <Form.Input 
                  label = "Email"
                  type = "email" 
                  iconPosition = "right"
                  icon = "user"
                  ref = { emailRef } 
                  defaultValue = { currentUser.email }
                  required 
                ></Form.Input>
              </Form.Field>
              <Form.Field id="password">
                <Form.Input
                  label = "New Passord"
                  placeholder = "Leave blank to keep the same" 
                  type = "password" 
                  iconPosition = "right"
                  icon = "lock"
                  ref = { passwordRef }
                  placeholder="Enter Old Password"
                  required
                ></Form.Input>
              </Form.Field>
              <Form.Field id = "password-confirm">
                <Form.Input 
                  label = "Password"
                  placeholder = "Leave blank to keep the same" 
                  type = "password" 
                  iconPosition = "right"
                  icon = "lock"
                  ref = { passwordConfirmRef } 
                  required
                ></Form.Input>
              </Form.Field>
              <Button 
                disabled = { loading } 
                // onClick = { handleSubmit } 
                className = "w-100" 
                type = "submit"
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