import React, {useRef,useState,useEffect} from 'react'
import RegisterForm from "./RegisterForm"
import { Form, Input, TextArea, Button, Select, Card, Grid, Icon } from 'semantic-ui-react'
import {useAuth} from "../contexts/AuthContext"
import SignUp from "./SignUp"
import ForgotPassword from "./ForgotPassword"
import {Link, useNavigate} from "react-router-dom"
import MainPage from "./MainPage"

function LogIn() {

  /**TODO: Add onFocus and onBlur in the input component;
   * so that you could use their attributes to make the 
   * app better.
   */

  const [emailRef, setEmailRef] = React.useState("");
  const [passwordRef, setPasswordRef] = React.useState("");
  const {login} = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // const device=useRef("ui container center aligned")
  const headerString = useRef("ui dividing header text-center mb-4")
  // const formWidth=useRef()
  // const formHeight=useRef()
  // console.log(window.innerWidth,window.innerHeight)
  const [formWidth, setFormWidth] = useState()
  const [formHeight, setFormHeight] = useState()
  const [screenSize, setScreenSize] = useState()
  // const is_component_active = true;

  const adjust_horizontal_position = useRef("+50%");
  const adjust_vertical_postion = useRef("0%");
  const l = useRef("myLocation");

  useEffect(() => {

    // console.log("my_location.current: "+my_location.current);
    let width_original_lenght = window.innerWidth
    let height_original_lenght = window.innerHeight
    // console.log("width: "+width_original_lenght," height: "+height_original_lenght)

    if(height_original_lenght > (width_original_lenght + 100)) {
      let width_length_to_set = width_original_lenght * (400/width_original_lenght)
      let height_length_to_set = height_original_lenght * (400/height_original_lenght)
      // console.log("width_length_to_set: "+width_length_to_set+" height_length_to_set: "+height_length_to_set);
      setFormWidth(width_length_to_set+"px")
      setFormHeight(height_length_to_set+"px")
    } else {
      let width_length_to_set = width_original_lenght * (600/width_original_lenght)
      let height_length_to_set = height_original_lenght * (400/height_original_lenght)
      // console.log("width_length_to_set: "+width_length_to_set+" height_length_to_set: "+height_length_to_set);
      setFormWidth(width_length_to_set+"px")
      setFormHeight(height_length_to_set+"px")
    }
  }, [])

  async function handleSubmit (e) {
    // Preventing the form to be submitted before the
    // following code is successful, becuase we
    // only submit the form only after the 
    // data has been loaded to the database.
    e.preventDefault()
    try {
      setError("");
      setLoading(true);
      await login(emailRef, passwordRef);
      navigate("/mainpage");
    } catch {
      setError("Failed to log in");
    }

    setLoading(false)
  }

  const handleChangeEmail = (e) => {
    e.preventDefault()
    setEmailRef(e.target.value)
    // console.log("emailIs",e.target.value, "")
  }

  const handleChangePassword = (e) => {
    e.preventDefault()
    setPasswordRef(e.target.value)
    console.log("passswordlIs", e.target.value)
  }

  return (
    <div id = "loginId">
      <Grid 
        style = {{borderColor: "red", transform: "translate("+adjust_vertical_postion.current+","+adjust_horizontal_position.current+")"}}
        className= {screenSize}
        textAlign = "center"
        verticalAlign = 'middle'
        >
        <Grid.Row centered>
          <Grid.Column width = {6} style = {{minWidth:formWidth,maxHeight:formHeight}}>
            <Card style = {{width:"100%"}}>
              <div>
                <Form 
                  size = "big"
                  key = "big"
                  onSubmit = {handleSubmit}>
                  <h2 className = {headerString.current}> Log In</h2>
                  <Form.Group>
                    <Form.Field width = {16}>
                      <Form.Input
                        label = "Email"
                        icon = "envelope"
                        type = "email"
                        placeholder = "Enter Email..."
                        value = {emailRef}
                        onChange = {handleChangeEmail}
                        required
                        >
                      </Form.Input>
                    </Form.Field>
                  </Form.Group>
                  <Form.Field>
                    <Form.Input 
                      label = "password"
                      // iconPosition = "right"
                      icon = "lock"
                      type = "password"
                      placeholder = "Ennter Password..."
                      value = {passwordRef}
                      onChange = {handleChangePassword}
                      required>
                    </Form.Input>
                  </Form.Field>
                    <Button
                      className = "w-100"
                      color = "primary"
                      disabled = {loading}
                      icon = "login"
                      size = "big"
                      type = "submit">Login</Button>
                    <div className = "w-100 text-center mt-2">
                      <Link to = "/forgot-password" element = {<ForgotPassword/>}>
                        Forgot Password?
                      </Link>
                    </div>
                </Form>
              </div>
            </Card>
            <div className = "w-100 text-center mt-2">
            Need an account? <Link to = "/signup" element = {<SignUp l = {l.current}/>}>Sign Up</Link>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  )
}

export default LogIn