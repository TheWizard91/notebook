import React from "react"
import { Link, useNavigate } from "react-router-dom"
import {Card,Icon,Image,Button,Grid,Segment} from "semantic-ui-react"
import LogIn from "./LogIn"
import New from "./New"
import SignUp from "./SignUp"
import "../styles/navigation.css"

function Navigation() {
    // const navigate = useNavigate()
    // const handleOnClick = (e) => {
    //     e.preventDefault()
    //     navigate("/login")
    // }
    return (
        <div>
            <h3 id="name">
            <Link to = "/login" element = { <LogIn/> }>Emmanuel K. Agyapong</Link>
            </h3>
        </div>
        // <Button
        //     name="transitionButton" 
        //     className="ui circular green power off icon button"
        //     data-tooltip = "Press to sart the app." 
        //     data-position = "top center"
        //     onClick={handleOnClick}
        // ><i className="huge power off icon"></i>
        // </Button>
    )
}

export default Navigation