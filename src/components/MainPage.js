import React,{useRef,useState,useEffect} from 'react'
import { Card, Grid, Icon, Menu } from 'semantic-ui-react'
// import { useAuth, logout } from "../contexts/AuthContext"
import { useNavigate, Link } from "react-router-dom"
import "/home/emmanuel/Desktop/ReactJSProjects/Diary/frontend/src/styles/mainPage.css"
import Footer from "./Footer"
import LoadPage from "./LoadPage"
// import Notebook from "./Notebook"
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"

// import NavBar from "./NavBar"

function MainPage() {

    const windowWidth = useRef(window.innerWidth)
    const windowHeight = useRef(window.innerHeight)
    const [activeItem, setState] = React.useState();
    const [inconsSize,setIconsSize] = useState("big")

    const handleOnClick = (e, {value}) => setState(value)
    console.log("Clicked "+activeItem)
    // window.open("/"+activeItem);
    
    useEffect(()=>{
        if (windowHeight.current > windowWidth.current) {
            setIconsSize("larger")
        }
    })
    
    return (
        <div id = "mainPageContainer">
            <div id = "body">
                <Grid.Row>
                    <Menu id = "subMenu" pointing style = {{backgroundColor:"#c5aa6a"}}> {/**keepMounted className = "ui invert vertical pointing menu" */}
                        <Menu.Item
                            id = "homeId" 
                            // name = "home" 
                            icon = {inconsSize+" home icon"}
                            iconPosition = "right"
                            onClick = { handleOnClick }
                            active = { activeItem == "home" }
                            value = "home"
                            activeItem = "home">
                        </Menu.Item>
                        {/* <Menu.Item
                            id = "accountSettingsId" 
                            // name = "settings"
                            icon = "big icon settings"
                            onClick = { handleOnClick }
                            active = { activeItem == "dashboard" }
                            value = "dashboard"
                            activeItem = "dashboard">
                        </Menu.Item> */}
                        <Menu.Item
                            id = "logoutId" 
                            icon = {inconsSize+" power off left icon"}
                            onClick = { handleOnClick }
                            link = "logout"
                            active = { activeItem == "logout" }
                            value = "logout"
                            activeItem = "logout">
                        </Menu.Item>
                    </Menu>
                </Grid.Row>
                <div id = "subContainer">
                    <LoadPage page = { activeItem } />
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default MainPage