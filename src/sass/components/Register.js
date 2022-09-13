import React, {useState, setState, setData, Component} from 'react'
import {Button, Checkbox, Form} from "semantic-ui-react"
import 'semantic-ui-css/semantic.min.css'
import '../styles/loginForm.css';
// import {initializeApp} from "firebase/app"
// import {getFirestore, collection, getAuth, createUserWithEmailAndPassword } from "firebase/auth"
// import { getAnalytics } from "firebase/analytics";

class RegisterForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: ""
        }
    }

    handleFirstName = (event) =>{
        // this.setData({firstName: e.target.value})
        // event.preventDefault()
        // alert(e.target.value)
        this.setState({firstName: event.target.value})
        // console.log(this.state.firstName)
        // alert(this.state.firstName)
    
    } 
    
    handleLastName(e) {
        e.preventDefault()
        this.setState({lastName: e.target.value})
    }
    
    handleEmail(e) {
        e.preventDefault()
        this.setState({email: e.target.value})
    }
    
    handlePassword(e) {
        e.preventDefault()
        this.setState({password: e.target.value})
    }
    
    handleLogIn() {
        console.log("First Name: "+this.state.firstName)
        console.log("Last Name: "+this.state.lastName)
        console.log("Email: "+this.state.mail)
        console.log("Password: "+this.state.password)
    }
    

    render() {

        return(
            <div>
                <Form>
        
                    <Form class="formStyles">
                        <label>First Name</label>
                        <input 
                            type="text"
                            name="firtst name"
                            placeholder="First Name"
                            value={this.state.firstName}
                            onChange={this.handleFirstName} />
                    </Form>
    
                    <Form.Field className="formStyles">
                        <label>Last Name</label>
                        <input
                            type="text"
                            name="last name"
                            placeholder="Last Name" 
                            value={this.state.lastName}
                            onChange={this.handleLastName} />
                    </Form.Field>
    
                    <Form.Field className="formStyles">
                        <label>E-mail</label>
                        <input
                            type="text"
                            name="email"
                            placeholder="E-mail" 
                            value={this.state.email}
                            onChange={this.handleEmail} />
                    </Form.Field>
    
                    <Form.Field className="formStyles">
                        <label>Password</label>
                        <input 
                            type="text"
                            name="passwword"
                            placeholder="Password" 
                            value={this.state.password}
                            onChange={this.handlePassword} />
                    </Form.Field>
    
                </Form>
    
                <button class="ui primary button">Sign Up</button><button class="ui secondary button">Already Have an Account?</button>
                {/* <div><button class="ui primary button">Primary</button><button class="ui secondary button">Secondary</button></div> */}
    
            </div>
        )
    }
}

const Buttons = () => (
    <div>
        <Button content="SignUp" Sign Up />
        <Button content="Already Have na Account?" Already Have an Account />
    </div>
)

export default RegisterForm;