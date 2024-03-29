// import from react
import React, {useRef, useState, useEffect} from "react"
import {useNavigate, Link} from "react-router-dom"

// import for database
import ref from "../firebase/Storage"
import realtimeDB from '../firebase/realtimeDatabase';
import {firestore, collection, query, where, getDock} from "../firebase/firestore"
import db from "../firebase/firestore"
import {useAuth, logout, signOut} from "../contexts/AuthContext"

// import for this component
import Note from "./Note"
import Dashboard from "./Dashboard"
import LogIn from "./LogIn"
import UpdateProfile from "./UpdateProfile"
import NotificationsPage from "./NotificationsPage"

function LoadPage ({page, firstname, lastname, profile_image, id_of_current_user}) {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {logout} = useAuth();

    const [h, setHeight] = useState("0px")

    const width_of_page = useRef(window.innerWidth);
    const height_of_page = useRef(window.innerHeight);

    useEffect(() => {
        // console.log(page,firstname,lastname,profile_image,id_of_current_user);
        if (((width_of_page.current + 400) > height_of_page.current) && (height_of_page.current > 700)) {
            setHeight("600px")
        } else if (((width_of_page.current + 400) < height_of_page.current) && (height_of_page.current > 700)) {
            setHeight("300px")
        } else if (((width_of_page.current + 400) < height_of_page.current) && (height_of_page.current < 700)) {
            setHeight("250px")
        }
    })

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
                <NotificationsPage />
            )
            break;
        case "settings":
            return (
                <UpdateProfile />
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
                <Note 
                    u_firstname = {firstname}
                    u_lastname = {lastname}
                    u_profile_image = {profile_image}
                    u_id = {id_of_current_user}
                    height = {h} />
            )
    }
}

export default LoadPage