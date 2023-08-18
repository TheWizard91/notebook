import React,{useState,prevState} from "react"
import { Link, useNavigate } from "react-router-dom"
import {Card,Icon,Image,Button,Grid,Segment,Divider,Transition} from "semantic-ui-react"
import LogIn from "./LogIn"
import New from "./New"
import SignUp from "./SignUp"
import "../styles/navigation.css"

function StartAppNav() {

    const [visible,setVisibility]=useState({visible:true})

    const toggleVisibility =(e)=>{
        e.preventDefault()
        setVisibility(!visible)

    }
    return (
        // <div>
        <header id="navHeader">
            <div className="left">
                <h3 id="name">
                    {/* <Link 
                        to="/login" 
                        element={<LogIn/>}
                        onClick={toggleVisibility}>Emmanuel K. Agyapong</Link> */}
                    <Transition 
                        visible={visible} 
                        animation="scale" 
                        duiation={500}>
                        <Button
                            content={visible ? 'Hide' : 'Show'}
                            onClick={toggleVisibility}>
                            <Link 
                                to="/login" 
                                element={<LogIn/>}
                                onClick={toggleVisibility}>Start The App</Link>
                        </ Button>
                    </Transition>
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
            {/* <nav className="menu">
                <ul className="navbar ml-auto">
                    <li>
                        <Link to="" className="nav-link">My work</Link>
                    </li>
                </ul>
            </nav> */}
        </header>
        // </div>
    )
}
export default StartAppNav