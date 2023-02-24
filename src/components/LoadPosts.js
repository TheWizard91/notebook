import React from "react"

import { useNavigate, Link } from "react-router-dom"
import Notebook from "./Notebook"
import Dashboard from "./Dashboard"
import LogIn from "./LogIn"

function LoadPage ({page}) {
    // window.open("/"+page)
    switch (page) {
        case "home":
            return (
                <Notebook />
            )
            break;
        case "dashboard":
            return (
                <Dashboard />
            )
        case "logout":
            return (
                <div>
                    <h1>
                        Logout
                    </h1>
                </div>
            )
    
        default:
            return (
                <div><h1>Nothing to see</h1></div>
            )
            break;
    }
}

export default LoadPage