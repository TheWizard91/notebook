import React from 'react'
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
    const [activeItem, setState] = React.useState();

    const handleOnClick = (e, {value}) => setState(value)
    console.log("Clicked "+activeItem)
    // window.open("/"+activeItem);
    
    return (
        <div id = "mainPageContainer">
            <div id = "body" style = {{ height:"100%"}}>
                <Grid.Row>
                    <Menu id = "subMenu" pointing> {/**keepMounted className = "ui invert vertical pointing menu" */}
                        <Menu.Item
                            id = "homeId" 
                            // name = "home" 
                            icon = "big home icon"
                            iconPosition = "right"
                            size = "large"
                            onClick = { handleOnClick }
                            link = "/home"
                            active = { activeItem == "home" }
                            value = "home"
                            activeItem = "home">
                        </Menu.Item>
                        {/* <Menu.Item
                            id = "notesId" 
                            // name = "notes"
                            iconPosition = "right"
                            icon = "big sticky note icon"
                            size = "large"
                            onClick = { handleOnClick }
                            value = "notebook"
                            link = "/notebook"
                            active = { activeItem == "notes" }
                            > 
                        </Menu.Item> */}
                        <Menu.Item
                            id = "accountSettingsId" 
                            // name = "settings"
                            icon = "big cog icon"
                            size = "large"
                            onClick = { handleOnClick }
                            value = "settings"
                            link = "settings"
                            active = { activeItem == "settings" }
                            value = "dashboard">
                        </Menu.Item>
                        <Menu.Item
                            id = "logoutId" 
                            // name = "settings"
                            icon = "big arrow circle left icon"
                            size = "big"
                            onClick = { handleOnClick }
                            value = "logout"
                            link = "logout"
                            active = { activeItem == "logout" }
                            value = "logout">
                        </Menu.Item>
                    </Menu>
                </Grid.Row>
                <div id = "subContainer">
                    <LoadPage page = { activeItem } />
                </div>
            </div>
            <Footer />
        </div>
    )
    
}

export default MainPage