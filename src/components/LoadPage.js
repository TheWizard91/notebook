import React, {useRef, useState} from "react"

import {useNavigate, Link} from "react-router-dom"
import {useAuth, logout} from "../contexts/AuthContext"
import Notebook from "./Notebook"
import Dashboard from "./Dashboard"
import LogIn from "./LogIn"

function LoadPage ({page}) {
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const {currentUser, logout} = useAuth()

    async function logginout () {

        setError("")
    
        try{
          setError("")
          setLoading(true)
          navigate("/")
          await logout()
        } catch {
          setError("failed to log out")
        }
      }
    
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
                        Logout . {logginout()}
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