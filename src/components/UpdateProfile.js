
import React, { useRef, useState, useEffect } from "react"
// import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import {Form,Button,Card,Grid,Select,Input,Icon,Header} from "semantic-ui-react"
import db from "../firebase/firestore"

export default function UpdateProfile() {
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

    // db.collection("Users").doc(dataIdToBeUpdated).update({
    //   firstName: firstNameRef.current.value,
    //   lastName: lastNameRef.current.value,
    //   email: emailRef.current.value,
    //   password: currentUser.password
    // })
    // setDataIdToBeUpdated("");

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

    // setDataIdToBeUpdated("");

  }

  // const handleChange = (e) => {
  //   e.preventDefault()
  //   db.collection("Users").add({
  //     firstName: firstNameRef.current.value,
  //     lastName: lastNameRef.current.value
  //   })
  // }

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

  // const updateData = (e) => {
  //   e.preventDefault()
  //   db.collection("Users").doc(dataIdToBeUpdated).update({
  //     firstName: firstNameRef.current.value,
  //     lastName: lastNameRef.current.value,
  //     email: emailRef.current.value,
  //     password: currentUser.password
  //   })
  // }

  return (
    <Grid
      className="d-flex align-items-center justify-content-center"
      style={{mainHeight:"100vh"}}>
      <Grid.Row centered>
        <Grid.Column width={6} style={{minWidth:"800px"}}>
          <Card style={{width:"100%"}}>
            <Form onSubmit={handleSubmit}>
              <Header className="text-center mb-4">Update Profile</Header>
              <Form.Field id="first-name">
                {/* <Form.Label>First Name</Form.Label> */}
                <Form.Input 
                  label = "Firstname"
                  type = "text"
                  id =  "user-first-name"
                  placeholder="Enter Firstname"
                  // onChange = { handleChange } 
                  ref = { firstNameRef } 
                  required 
                ></Form.Input>
              </Form.Field>
              <Form.Field id="last-name">
                {/* <Form.Label>Last Name</Form.Label> */}
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
                {/* <Form.Label>Email</Form.Label> */}
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
                {/* <Form.Label>Password</Form.Label> */}
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
                {/* <Form.Label>Password Confirmation</Form.Label> */}
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