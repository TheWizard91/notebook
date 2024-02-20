import React,{useState,prevState} from "react"
import { Link, useNavigate } from "react-router-dom"
import {Card,Icon,Image,Button,Grid,Segment,Divider,Transition} from "semantic-ui-react"
import LogIn from "./LogIn"
import New from "./New"
import SignUp from "./SignUp"
import "../styles/navigation.css"

function StartAppNav() {

    const [visible,setVisibility] = useState({visible:true})

    const toggleVisibility = (e) =>{
        e.preventDefault()
        setVisibility(!visible)

    }
    return (
        <header id="navHeader">
            <div>{/**className="left" */}
                <h3 id = "name">
                {/* <Link to = "/login" element = { <LogIn/> }>Start The App</Link> */}
                <Transition 
                    visible = {visible} 
                    animation = "scale" 
                    duiation = {500}>
                    <Button
                        content = {visible ? 'Hide' : 'Show'}
                        onClick = {toggleVisibility}
                        color = {"#c0d8c4"}>
                        <Link 
                            to = "/login"
                            element = {<LogIn/>}>Start The App</Link>
                    </ Button>
                </Transition>
                </h3>
            </div>
        </header>
    )
}
export default StartAppNav