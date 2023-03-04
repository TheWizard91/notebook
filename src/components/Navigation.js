import React from "react"
import { Link, useNavigate } from "react-router-dom"
import {Card,Icon,Image,Button,Grid,Segment} from "semantic-ui-react"
import LogIn from "./LogIn"
import New from "./New"
import SignUp from "./SignUp"
import "../styles/navigation.css"

function Navigation() {
    return (
        <div>
            <h3 id="name">
            <Link to = "/login" element = { <LogIn/> }>Emmanuel K. Agyapong</Link>
            </h3>
        </div>
    )
}

export default Navigation