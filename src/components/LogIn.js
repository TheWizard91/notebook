import React, {useRef, useState} from 'react'
import RegisterForm from "./RegisterForm"
import { Form, Input, TextArea, Button, Select, Card, Grid, Icon } from 'semantic-ui-react'
import {useAuth} from "../contexts/AuthContext"
import SignUp from "./SignUp"
import {Link, useNavigate} from "react-router-dom"
import MainPage from "./MainPage"

function LogIn() {

  const [emailRef,setEmailRef] = React.useState("");
  const [passwordRef,setPasswordRef] = React.useState("");
  const {login} = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit (e) {
    // Preventing the form to be submitted before the
    // following code is successful, becuase we
    // only submit the form only after the 
    // data has been loaded to the database.
    e.preventDefault()
    try {
      setError("")
      setLoading(true)
      await login(emailRef, passwordRef)
      navigate("/mainpage")
    } catch {
      setError("Failed to log in")
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
    console.log("passswordlIs",e.target.value)
  }

  return (
    <div id = "loginId">
      <Grid 
        className="ui container center aligned"
        // style = {{minHeight:"100vh"}}
        textAlign="center"
        verticalAlign='middle'
        >
        <Grid.Row centered>
          <Grid.Column width={6} style={{minWidth:"600px",maxHeight:"800px"}}>
            <Card style={{width:"100%"}}>
              <div>
                <Form 
                  size="big"
                  key="big"
                  onSubmit={handleSubmit}>
                  <h2 className="ui dividing header text-center mb-4"> Log In</h2>
                  <Form.Group>
                    <Form.Field width={16}>
                      <Form.Input
                        label="Email"
                        icon="envelope"
                        type="email"
                        placeholder="Enter Email..."
                        value={emailRef}
                        onChange={handleChangeEmail}
                        required
                        >
                      </Form.Input>
                    </Form.Field>
                  </Form.Group>
                  <Form.Field>
                    <Form.Input 
                      label="password"
                      // iconPosition = "right"
                      icon="lock"
                      type="password"
                      placeholder="Ennter Password..."
                      value={passwordRef}
                      onChange={handleChangePassword}
                      required>
                    </Form.Input>
                  </Form.Field>
                    <Button
                      className="w-100"
                      color="primary"
                      disabled={loading}
                      icon="login"
                      size="big"
                      type="submit">Login</Button>
                    <div className="w-100 text-center mt-2">
                      <Link to="/forgot-password" element={<SignUp/>}>
                        Forgot Password?
                      </Link>
                    </div>
                </Form>
              </div>
            </Card>
            <div className="w-100 text-center mt-2">
              Need an account? <Link to="/signup" element={<SignUp/>}>Sign Up</Link>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  )
}

export default LogIn