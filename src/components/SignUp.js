import React,{useRef,useState,useEffect} from 'react'
import RegisterForm from "./RegisterForm"
// import {Form,Button,Card,Alert} from "react-bootstrap"
import {useAuth} from "../contexts/AuthContext"
import {Link, useNavigate} from "react-router-dom"
import {Form,Input,TextArea,Button,Select,Card,Grid,Icon} from 'semantic-ui-react'
import {Placeholder} from 'semantic-ui-react'
// import ImageLoader from "./ImageLoader"
// import {initializeApp} from "firebase/app"
// import {getFirestore} from "firebase/firestore"
import app from "../contexts/AuthContext"
import firebase from "../firebase/firebase"
import firestore from "../firebase/firestore"
import ref from "../firebase/Storage"
import realtimeDB from '../firebase/realtimeDatabase';
import LogIn from "../components/LogIn"
// import { PhotoPlaceholder } from 'react-placeholder-image';
// import { CustomPlaceholder } from 'react-placeholder-image';

// import { setCurrentUserUID } from "../contexts/AuthContext"

function SignUp() {

  // const firstNameRef = useRef()
  // const lastNameRef = useRef()
  // const emailRef = useRef()
  // const passwordRef = useRef()
  // const passwordConfirmationRef = useRef()
  const [firstname,setFirstname]=useState()
  const [lastname,setLastname]=useState()
  const [email,setEmail]=useState()
  const [password,setPassword]=useState()
  const [confirmPassword,setConfirmPassword]=useState()
  const {currentUser,signup}=useAuth()
  const [error,setError]=useState("")
  const [loading,setLoading]=useState(false)
  const navigate = useNavigate()

  // alert(currentUser)
  // const currentUserUID

  // const [ selectedImage, setSelectedImage ] = useState(null)

  // const currentUserUID = setCurrentUserUID(currentUser)

  async function handleSubmit(e) {
    e.preventDefault()
    console.log("Clicked!")
    // Vasditaion checks
    if (passwordRef.current.value !== passwordConfirmationRef.current.value) {
      return setError("Password do not matrch")
    }

    try {

      setError("")
      setLoading(true)

      // Create user in authetication first so we have it created with the uid
      signup(emailRef.current.value, passwordRef.current.value)

      // Create user in the database. // using user's name: firstNameRef.current.value
      // db.collection("users").doc(currentUser.uid).set({
      //   firstName: firstNameRef.current.value,
      //   lastName: lastNameRef.current.value,
      //   email: emailRef.current.value,
      //   password: passwordRef.current.value,
      //   // id: currentUser.uid,
      // })

      // for id currentUser.uid
      await realtimeDB.ref(currentUser.uid).set({
        firstName: firstname.current.value,
        lastName: lastname.current.value,
        email: email.current.value,
        password: password.current.value,
        id: currentUser.uid,
      }).catch(alert)

      // console.log("users id: "+currentUser.uid+" and users name: "+firstNameRef.current.value)
      navigate("/")

    } catch {

      setError("Failed to create an account")

    }
    
    setLoading(false)
  }

  return (
    <div>
      {/* <RegisterForm /> */}
      <Grid
        className="ui container center aligned"
        textAlign="center"
        verticalAlign='middle'>
        <Grid.Row>
          {/* <h2 className="text-center mb-4">Sign Up</h2> */}
          {/* {JSON.stringify(currentUser)} */}
          {/* {currentUser && currentUser.email} */}
          {/* {currentUser.email} */}
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
          <Grid.Column width={6} style = {{minWidth: "600px",maxHeight:"800px"}}>
            <Card style={{width:"100%"}}>
              <Form 
                size="big"
                key="big"
                onSubmit={handleSubmit}>
                <h2 className="text-center mb-4">Sign Up</h2>
                <Form.Field id = "first-name">
                  <Form.Input 
                    type="text"
                    label="Email"
                    placeholder="Enter Firstname..." 
                    icon="user"
                    ref={firstNameRef} 
                    required></Form.Input>
                </Form.Field>
                {/* </Form.Group> */}
                <Form.Field id="last-name">
                  {/* <Form.Label>Last Name</Form.Label> */}
                  <Form.Input 
                    type="text"
                    label="Lastname"
                    placeholder="Enter Lastname..." 
                    icon="user"
                    ref={lastNameRef} 
                    required></Form.Input>
                </Form.Field>
                <Form.Field id="email">
                  {/* <Form.Label>Email</Form.Label> */}
                  <Form.Input 
                    type="email"
                    label="Email"
                    placeholder="Enter Email..." 
                    icon="envelope"
                    ref={emailRef} 
                    required></Form.Input>
                </Form.Field>
                <Form.Field id = "password">
                  {/* <Form.Label>Password</Form.Label> */}
                  <Form.Input 
                    type="password"
                    label="Enter Password"
                    placeholder="Enter Password..." 
                    icon="lock"
                    ref={passwordRef} 
                    required></Form.Input>
                </Form.Field>
                <Form.Field id="password-confirm">
                  {/* <Form.Label>Password Confirmation</Form.Label> */}
                  <Form.Input
                    type="password"
                    label="Confirm Password"
                    placeholder="Confirm Password..." 
                    icon="lock"
                    ref={passwordConfirmationRef} 
                    required></Form.Input>
                </Form.Field>
                <Button 
                  disabled={loading} 
                  className="w-100"
                  color="blue" 
                  type="submit">Sign Up</Button> {/*onCLick={saveChange}*/}
              </Form>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <div className = "w-100 text-center mt-2">
        Already have an account? <Link to="/" element={<LogIn />}>Log In</Link>
      </div>
    </div>
  )
}

export default SignUp