import React, { useRef, useState, useEffect } from 'react'
import RegisterForm from "./RegisterForm"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import {Link, useNavigate} from "react-router-dom"
import LogIn from "./LogIn"
import { Placeholder } from 'semantic-ui-react'
// import ImageLoader from "./ImageLoader"
// import {initializeApp} from "firebase/app"
// import {getFirestore} from "firebase/firestore"
import app from "../contexts/AuthContext"
import firebase from "../firebase/firebase"
import firestore from "../firebase/firestore"
import db from "../firebase/firestore"
import { PhotoPlaceholder } from 'react-placeholder-image';
import { CustomPlaceholder } from 'react-placeholder-image';

import { setDoc, doc } from "../firebase/firebase"
import realtimeDB from '../firebase/realtimeDatabase';

// import { setCurrentUserUID } from "../contexts/AuthContext"

function SignUp() {

  const firstNameRef = useRef()
  const lastNameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmationRef = useRef()
  const { signup } = useAuth()
  // const { currentUser } = useAuth()
  const [ error, setError ] = useState("")
  const [ loading, setLoading ] = useState(false)
  const navigate = useNavigate()

  // alert(currentUser)
  // const currentUserUID

  // const [ selectedImage, setSelectedImage ] = useState(null)

  // const currentUserUID = setCurrentUserUID(currentUser)

  async function handleSubmit(e) {
    e.preventDefault()

    // Vasditaion checks
    if (passwordRef.current.value !==
      passwordConfirmationRef.current.value) {
      return setError("Password do not matrch")
    }

    try {

      setError("")
      setLoading(true)

      // Create user in authetication first so we have it created with the uid
      await signup(emailRef.current.value, passwordRef.current.value)

      // Create user in the database. // using user's name: firstNameRef.current.value
      // db.collection("users").doc(firstNameRef.current.value).set({
      //   firstName: firstNameRef.current.value,
      //   lastName: lastNameRef.current.value,
      //   email: emailRef.current.value,
      //   password: passwordRef.current.value,
      //   // id: currentUser.uid,
      // })
      db.collection("users").add({
        firstName: firstNameRef.current.value,
        lastName: lastNameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value
      })
      // for id currentUser.uid
      // realtimeDB.ref(firstNameRef.current.value).set({
      //   firstName: firstNameRef.current.value,
      //   lastName: lastNameRef.current.value,
      //   email: emailRef.current.value,
      //   password: passwordRef.current.value,
      //   // id: currentUser.uid,
      // }).catch(alert)

      // console.log("users id: "+currentUser.uid+" and users name: "+firstNameRef.current.value)
      navigate("/")

    } catch {
      console(useAuth().uid)
      setError("Failed to create an account")

    }
    
    setLoading(false)
  }

  return (
    <div>
      {/* <RegisterForm /> */}
      <Card>
        <Card.Body>
          <h2 className = "text-center mb-4">Sign Up</h2>
          {/* {JSON.stringify(currentUser)} */}
          {/* {currentUser && currentUser.email} */}
          {/* {currentUser.email} */}
          {error && <Alert variant = "danger">{error}</Alert>}
          {/* <ImageLoader /> */}
          {/* <figure className="figure">
            <img src=".../100x100" className="figure-img img-fluid rounded" />
            <figcaption className="figure-caption">A caption for the above image.</figcaption>
          </figure> */}
          {/* <PhotoPlaceholder width={200} height={100} grayscale /> */}
          {/* <CustomPlaceholder 
            width = {370} 
            height = { 200 } 
            backgroundColor="#123456"
            textColor="#ffffff"
            text="Inster Profile Image" 
            alt = "noit fount"
            src = {URL.createObjectURL(selectedImage)}
            onChange = {(event) => {
              console.log(event.target.files[0]);
              setSelectedImage(event.target.files[0])
            }}
          /> */}
          <Form onSubmit = { handleSubmit }>
            <Form.Group id = "first-name">
              <Form.Label>First Name</Form.Label>
              <Form.Control type = "text" ref = { firstNameRef } required />
            </Form.Group>
            <Form.Group id = "last-name">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type = "text" ref = { lastNameRef } required />
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type = "email" ref = { emailRef } required />
            </Form.Group>
            <Form.Group id = "password">
              <Form.Label>Password</Form.Label>
              <Form.Control type = "password" ref = { passwordRef } required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type = "password" ref = { passwordConfirmationRef } required />
            </Form.Group>
            <Button disabled = { loading } className = "w-100" type = "submit">Sign Up</Button> {/*onCLick={saveChange}*/}
          </Form>
        </Card.Body>
      </Card>
      <div className = "w-100 text-center mt-2">
        Already have an account? <Link to="/login" element = { <LogIn /> }>Log In</Link>
      </div>
    </div>
  )
}

export default SignUp