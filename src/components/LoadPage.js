import React, {useRef, useState} from "react"

import {useNavigate, Link} from "react-router-dom"
import {useAuth, logout} from "../contexts/AuthContext"
import Note from "./Note"
import Dashboard from "./Dashboard"
import LogIn from "./LogIn"

function LoadPage ({page}) {
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const {currentUser,logout} = useAuth()

    async function logginout () {

        setError("")
    
        try{
          setError("")
          setLoading(true)
          navigate("/login")
          await logout()
        } catch {
          setError("failed to log out")
        }
      }
    
    switch (page) {
        case "home":
            return (
                <Note />
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
                        {logginout()}
                    </h1>
                </div>
            )
    
        default:
            return (
                // <div><h1>Nothing to see</h1></div>
                <Note />
            )
            break;
    }
}

export default LoadPage