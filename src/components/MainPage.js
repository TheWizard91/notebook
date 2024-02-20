// React dependencies imports.
import React,{useRef,useState,useEffect} from 'react'
import { Card, Grid, Icon, Menu } from 'semantic-ui-react'
import { useNavigate, Link } from "react-router-dom"

// import for database.
import ref from "../firebase/Storage"
import realtimeDB from '../firebase/realtimeDatabase';
import {firestore, collection, query, where, getDock} from "../firebase/firestore"
import db from "../firebase/firestore"
import {useAuth, logout, signOut} from "../contexts/AuthContext"

// Friendly components imports.
import Footer from "./Footer"
import LoadPage from "./LoadPage"
import Navigation from "./Navigation"

// Css imports.
import "/home/emmanuel/Desktop/ReactJSProjects/Diary/frontend/src/styles/mainPage.css"


function MainPage() {

    const made_up_user_id = useRef(null);
    const windowWidth = useRef(window.innerWidth)
    const windowHeight = useRef(window.innerHeight)
    const [active_item, setActiveItem] = React.useState();
    const [inconsSize,setIconsSize] = useState("big")
    
    // 
    const {currentUser, updatePassword, updateEmail, logout} = useAuth();

    // 
    const [f_name, setFirstname] = useState();
    const [l_name, setLastname] = useState();
    const [p_image, setProfileImage] = useState();
    const [t_current_user_id, setTemporaryCurrentUserId] = useState({t_current_user_id:"some_user"});
    const [user_information_query, setUserInformationQuery] = useState({user_information_query:{}});
    const [fake_id, setFakeId] = useState({fake_id:""});
    const id_ref = useRef();

    const handleOnClick = (e, {value}) => setActiveItem(value)
    
    useEffect(() => {
        if (windowHeight.current > windowWidth.current) {
            setIconsSize("larger");
        }

        setFirstname("emmanuel");
        setLastname("agyapong");
        setProfileImage("None yet");
        setTemporaryCurrentUserId("000000");
        console.log("id:",t_current_user_id);
        
    },1);

    const setRealUserIdToUser = () => {
        db.collection("users") 
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    user_information_query[doc.id] = doc.data()
                    // for (const[key, value] of Object.entries(user_information_query[doc.id])) {
                    //     if (value == currentUser.email) {
                    //         db.collection("users").doc(doc.id).add("real_id":currentUser.uid)
                    //     }
                    // }
                })
        })

        setUserInformationQuery(user_information_query);
        
        console.log("user_information_query",user_information_query)
        
        // setUserInformationQuery(user_information_query);
        // for (const[key, value] of Object.entries(user_information_query)) {
        //     console.log("key:",key)
        // }

        
    }

    const foo = (id) => {
        // console.log("outside:",id);
        // setFakeId(id);
        setTemporaryCurrentUserId(id)
        console.log("fake_id:",t_current_user_id);
    }

    return (
        <div id = "mainPageContainer">
            <div id = "body">
                <Navigation />
                <div id = "subContainer">
                    <LoadPage 
                        page = {active_item}
                        firstname = {f_name}
                        lastname = {l_name}
                        profile_image = {p_image} 
                        id_of_current_user = {currentUser.uid} />
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default MainPage