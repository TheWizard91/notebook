import React,{useRef,useState,useEffect} from 'react'
import RegisterForm from "./RegisterForm"
import {useAuth} from "../contexts/AuthContext"
import {Link, useNavigate} from "react-router-dom"
import {Form,Input,TextArea,Button,Select,Card,Grid,Icon} from 'semantic-ui-react'
import {Placeholder} from 'semantic-ui-react'
import app from "../contexts/AuthContext"
import firebase from "../firebase/firebase"
import firestore from "../firebase/firestore"
import ref from "../firebase/Storage"
import realtimeDB from '../firebase/realtimeDatabase';
import LogIn from "../components/LogIn"

function SignUp() {
  const [firstname,setFirstname]=useState()
  const [lastname,setLastname]=useState()
  const [email,setEmail]=useState()
  const [password,setPassword]=useState()
  const [confirmPassword,setConfirmPassword]=useState()
  const {currentUser,signup,logout,setUserId}=useAuth()
  const [error,setError]=useState("")
  const [loading,setLoading]=useState(false)
  const navigate = useNavigate()

  async function handleSubmit (e) {
    e.preventDefault()
    // loadUserInfoToRealtimeDB()

    // Validating and checking
    if (password !== confirmPassword) {
      return setError("Password do not match")
    }

    try {
      setError("")
      setLoading(true)
      // Create user in authetication first so we have it created with the uid
      let promise=new Promise((resolve,reject)=>{
        setTimeout(() => {
          signup(email,password)
          setUserId()
          loadUserInfoToRealtimeDB()
          console.log("Success!")
          resolve("Success!")
          // console.log("uid: "+currentUser.uid)
        }, 1000);
      })

      // Adding user to realtime db by id currentUser.uid
      promise.then(result=>(
        // setUserId(),
        // console.log("uid: "+currentUser.uid),
        // loadUserInfoToRealtimeDB(),
        logout(),
        navigate("/")
      )).catch(err=>logout())
    } catch {
      setError("Failed to create an account")
    }
    setLoading(false)
  }

  const loadUserInfoToRealtimeDB =()=> {
    realtimeDB.ref(firstname).set({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
      // id: currentUser.uid,
      profileImageURI: ""
    }).catch(alert)
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
        console.log("confirmPassword is: "+e.target.value)
        setConfirmPassword(e.target.value)
        break;
    
      default:
        break;
    }
  }

  return (
    <div>
      <Grid
        className="ui container center aligned"
        textAlign="center"
        verticalAlign='middle'>
        <Grid.Row>
          <Grid.Column width={6} style={{minWidth: "800px",maxHeight:"800px"}}>
            <Card style={{width:"100%"}}>
              <Form 
                size="big"
                key="big"
                onSubmit={handleSubmit}>
                <h2 className="text-center mb-4">Sign Up</h2>
                <Form.Field id = "first-name">
                  <Form.Input 
                    name="firstname"
                    type="text"
                    label="Firstname"
                    placeholder="Enter Firstname..." 
                    icon="user"
                    onChange={handleChange}
                    value={firstname} 
                    required></Form.Input>
                </Form.Field>
                <Form.Field id="last-name">
                  <Form.Input 
                    name="lastname"
                    type="text"
                    label="Lastname"
                    placeholder="Enter Lastname..." 
                    icon="user"
                    onChange={handleChange}
                    value={lastname} 
                    required></Form.Input>
                </Form.Field>
                <Form.Field id="email">
                  <Form.Input 
                    name="email"
                    type="email"
                    label="Email"
                    placeholder="Enter Email..." 
                    icon="envelope"
                    onChange={handleChange}
                    value={email} 
                    required></Form.Input>
                </Form.Field>
                <Form.Field id="password">
                  <Form.Input 
                    name="password"
                    type="password"
                    label="Enter Password"
                    placeholder="Enter Password..." 
                    icon="lock"
                    onChange={handleChange}
                    value={password} 
                    required></Form.Input>
                </Form.Field>
                <Form.Field id="password-confirm">
                  <Form.Input
                    name="confirm_password"
                    type="password"
                    label="Confirm Password"
                    placeholder="Confirm Password..." 
                    icon="lock"
                    onChange={handleChange}
                    value={confirmPassword} 
                    required></Form.Input>
                </Form.Field>
                <Button 
                  disabled={loading} 
                  className="w-100"
                  color="blue" 
                  size="big"
                  type="submit">Sign Up</Button>
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