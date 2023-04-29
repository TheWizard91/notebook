import React,{useState,prevState} from "react"
import { Link, useNavigate } from "react-router-dom"
import {Card,Icon,Image,Button,Grid,Segment,Divider,Transition} from "semantic-ui-react"
import LogIn from "./LogIn"
import New from "./New"
import SignUp from "./SignUp"
import "../styles/navigation.css"

function Navigation() {

    const [visible,setVisibility]=useState({visible:true})

    const toggleVisibility =(e)=>{
        e.preventDefault()
        setVisibility(!visible)
    }
    return (
        <header id="navHeader">
            <div className="left">
                <h3 id="name">
                    {/* <Button
                        content={visible ? 'Hide' : 'Show'}
                        onClick={toggleVisibility}/> */}
                    <Link 
                        to="/login" 
                        element={<LogIn/>}>Start The App</Link>
                    {/* <Divider hiden/> */}
                    {/* <Transition
                        visible={visible} 
                        animation="scale" 
                        duiation={500}>
                        <Image 
                            size="small"
                            src='https://react.semantic-ui.com/images/leaves/1.png'/>
                    </Transition> */}
                </h3>
            </div>
            <nav className="menu">
                <ul className="navbar ml-auto" style={{marginBottom:"0px"}}>
                    <li>
                        <a 
                            href="https://github.com/TheWizard91/notebook" 
                            target="_blank">
                            Docs/Overview
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Navigation