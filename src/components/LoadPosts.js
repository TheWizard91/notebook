import React, {useState, useEffect, useRef} from "react"
import {Card, Button, Grid, Segment, Divider, Transition, Image} from "semantic-ui-react"
import {Link, useNavigate} from "react-router-dom"
import db from "../firebase/firestore"
import {doc, setDoc, updateDoc, deleteDoc} from "firebase/firestore"
import imageUploader from "./ImageUploader"

function LoadPosts ({post, time, post_id, post_image, likes, favorites, current_user_firstname, current_user_lastname, current_user_profile_image, current_user_id}) {
    
    // TODO: handleOnDelete works but need to find a way to refresh the page to see the updated secontion.
    // 
    const [postID, setPostID] = useState({postID: []})
    const [visible, setVisibility] = useState({visible: false})
    const [editTextValue,setEditTextValue] = useState()
    const [reply_text, setReplyText] = useState();
    const userProfileImagePath = useRef("https://emmanuelcodes.netlify.app/profile_image.7e798b21.jpg")

    // Firebase Database
    const [postInFirestoreDatabase, setPostInFirestoreDatabase] = useState(post)
    const [time_in_firestore_database, setTimeInFirestoreDatabase] = useState(time)
    const [likesInFirestoreDatabase, setLikesInFirestoreDatabase] = useState(likes)
    const [favoritesInFirestoreDatabase, setFavoriteInFirestoreDatabase] = useState(favorites);
    const [image_of_the_post, setPostImage] = useState(post_image);
    const [user_firstname, setUserFisrstname] = useState(current_user_firstname);
    const [uset_lastname, setUserLastname] = useState(current_user_lastname);
    const [user_profile_image, setUserProfileImage] = useState(current_user_profile_image);
    const [user_id, setUserId] = useState(current_user_id);
    const [postIdInFirestoreDatabase, setPostIdInFirestoreDatabase] = useState(post_id);
    const docRef = doc(db, "posts", post_id);
    
    // Colors
    const greenRef = useRef("#34CCAD");
    const blackRef = useRef("#000000");
    const dusty_white = useRef("#edf756");
    const medium_purple = useRef("#d0bdf4");
    const dark_sand = useRef("#a28089");
    const ice_cold = useRef("#a0d2eb");
    const white_ivory = useRef("#FFFFF0");

    // Edit post or textarea
    const [editPostClicks, seteditPostClicks] = useState(1)
    // const greenColor=useRef("")

    // User
    const [userColor, setUserColor] = useState("black")

    // Likes starting from 1 becuase 0%2==0, and if we start from 0,
    // get false because when we startt handleOn.....
    // countFavoriteClicks==0 inside of the function.
    const [likesColor, setLikesColor] = useState("black")
    const [countLikesClicks, setCountLikesClicks] = useState(1)

    // Favotites
    const [favoritesColor, setFavoritesColor] = useState("black")
    const [countFavoriteClicks, setCountFavoriteClicks] = useState(1);

    const navigate = useNavigate();

    const user_profile_image_ref = useRef("https://semantic-ui.com/images/avatar2/small/patrick.png");

    /**TODO: I have setFavoriteInFirestoreDatabase(favoritesInFirestoreDatabase+1) or
     * setFavoriteInFirestoreDatabase(favoritesInFirestoreDatabase-1) to increase ordecrese
     * the 
     */
    
    const handleOnClick = (e, {name, value}) => {
        switch (name) {
            case "delete":
                handleOnClickDelete();
                break;
            case "likes":
                handleOnClickLikes();
                break;
            case "start":
                handleOnClickFavorites();
                break;
            case "user":
                handleOnClickUser();
                break;
        }
    }
      
    async function handleOnClickDelete () {
        console.log("delete button is clicked!");
        await deleteDoc(docRef);
    }

    const handleOnClickFavorites = () => {
        setCountFavoriteClicks(countFavoriteClicks+1)
        // console.log("before: "+countFavoriteClicks)
        if((countFavoriteClicks%2) == 1) {
            setFavoritesColor(greenRef.current)
            setFavoriteInFirestoreDatabase(favoritesInFirestoreDatabase+1)
            updateDoc(docRef,{
                favorites:1//favoritesInFirestoreDatabase
            },{
                merge:true
            }).then(() => console.log("favorites updated"))
        } else {   
            setFavoritesColor(blackRef.current)
            setFavoriteInFirestoreDatabase(favoritesInFirestoreDatabase-1)
            updateDoc(docRef,{
                favorites:0//favoritesInFirestoreDatabase
            },{
                merge:true
            }).then(() => console.log("favorites updated"))
        }
    }

    const handleOnClickLikes = () => {
        setCountLikesClicks(countLikesClicks+1)
        if((countLikesClicks%2) == 1) {
            setLikesColor(greenRef.current)
            setLikesInFirestoreDatabase(likesInFirestoreDatabase+1)
            updateDoc(docRef,{
                likes:1//likesInFirestoreDatabase
            },{
                merge:true
            }).then(() => console.log("likes updated"))
        } else {
            setLikesColor(blackRef.current)
            setLikesInFirestoreDatabase(likesInFirestoreDatabase-1)
            updateDoc(docRef,{
                likes:0//likesInFirestoreDatabase
            },{
                merge:true
            }).then(() => console.log("likes updated"))
        }
    }

    const editPost = (e) => {
        e.preventDefault()
        setVisibility(!visible)
        seteditPostClicks(editPostClicks+1)
        // console.log("editPostClicks: "+editPostClicks)
    }

    const handleEditTextChange = (e) =>{
        e.preventDefault()
        if ((editPostClicks%2) == 0){
            setPostInFirestoreDatabase(e.target.value)
        }
        updateDoc(docRef,{
            post:e.target.value
        },{
            merge:true
        }).then(()=>console.log("post updated"))
    }

    const handleReplyPost = (e) => {
        e.preventDefault();
        console.log("reply");
        if ((reply_text%2) == 0){
            setPostInFirestoreDatabase(e.target.value)
        }
        updateDoc(docRef,{
            post:e.target.value
        },{
            merge:true
        }).then(()=>console.log("post updated"))
    }

    const initializeLikesColor = () => {
        // console.log("initializeLikesColor: "+favoritesInFirestoreDatabase)
        if(favoritesInFirestoreDatabase > 0){
            setFavoritesColor(greenRef.current)
            // favoritesColor=greenRef.current
        } else{
            setFavoritesColor(blackRef.current)
        }
    }

    const initializeFavoritesColor = () => {
        // console.log("initializeFavoritesColor: "+likesInFirestoreDatabase)
        if(likesInFirestoreDatabase>0){
            setLikesColor(greenRef.current)
        } else {
            setLikesColor(blackRef.current)
        }
    }

    const handleOnClickUser = () => {
        // console.log("user clicked!");
        navigate("image-uploader");
    }

    useEffect (()=>{

        /**Only for initial values. When the app starts the likes and favorites are 
         * set, becuase the has been fetched from the data from the database;
         * which is why I had the info passed as parameters in the very brggining.
        */
        // console.log("user_profile_image_ref: ",user_profile_image_ref);
        setVisibility(false)
        initializeFavoritesColor()
        initializeLikesColor()
    },[])

    return (
        <div>
            <Card
                className = "ui centered card"
                id = "livePostCardview" 
                style = {{width:"100%", 
                        borderRadius:"1em",
                        borderWidth:"medium",
                        borderColor:"red",
                        backgroundColor:"#e5eaf5"}}>
                <div className = "content">
                    {/* TODO: Delete button must be included ones I fugure out how to update the local screen besides the db. */}
                    <Button
                        name = "delete"//profile_image
                        value = "del" // user_profile_image
                        className = "right floated ui circular times pastel gray icon button" //right floated ui circular pastel gray icon button
                        data-tooltip = "Delete." 
                        data-position = "top center"
                        style = {{color:userColor, 
                                backgroundColor:dark_sand.current}}
                        onClick = {handleOnClick}>
                        <i className = "times icon" //circle outline
                        > 
                        </i>
                    </Button>
                    <Button 
                        name = "likes"
                        value = "heart"
                        className = "right floated ui circular pastel gray icon button"
                        data-tooltip = "Like." 
                        data-position = "top center"
                        style = {{color:likesColor,
                                backgroundColor:medium_purple.current}}
                        onClick = {handleOnClick}>
                        <i className = "like icon"></i>
                    </Button>
                    <Button 
                        name = "star"
                        value = "favorites"
                        className = "right floated ui circular pastel gray icon button"
                        data-tooltip = "Favorite." 
                        data-position = "top center"
                        style = {{color:favoritesColor, 
                                backgroundColor:dusty_white.current}}
                        onClick = {handleOnClickFavorites}>
                        <i className = "star icon"></i>
                    </Button>
                    {/* <image
                        className = "ui big image"
                        avatar
                        src = {user_profile_image_ref} /> */}
                    {/* <Button 
                        name = "user"
                        value = "user_name"
                        className = "left floated ui circular pastel gray icon button"
                        style = {{color:white_ivory.current,
                            backgroundColor:"black"
                            }}
                        onClick = {handleOnClick}>
                        <i className = "user icon"></i>
                    </Button> */}
                    {/* TODO: Add name and say User on {date}: */}
                    <div 
                        className = "ui left floated text"//ui left floated header
                        style = {{width: "fit-content"}}
                        >{time_in_firestore_database}
                    </div>
                    <p></p>
                    <div className = "description">
                        {postInFirestoreDatabase}
                    </div>
                    <Divider 
                        iverted
                        horizontal 
                        color = "#a28089">
                            Edit Post Or Reply
                    </Divider>
                    <Transition
                        visible = {visible} 
                        animation = "scale" 
                        duration = {500}>
                        <textarea
                            id = "input-element"
                            className = "ui segment"
                            type = "text"
                            value = {editTextValue}
                            name = "message"
                            style = {{width: "100%"}}
                            onChange = {handleEditTextChange}
                            placeholder = 'Type anything...'/>
                    </Transition>
                </div>
                <div>
                    <Button
                        className = "ui circular icon button"
                        style = {{backgroundColor:ice_cold.current,
                                width:"fit-item",
                                color:"#1E90FF", // dodger-blue:1E90FF,a white:f5f5f5
                                marginBottom:"10px"}}
                        value = {postIdInFirestoreDatabase}
                        onClick = {editPost}
                        data-tooltip = "Edit." 
                        data-position = "top center"
                        content = {visible ? 'Hide' : 'Show'}>
                        <i className = "edit icon"></i>
                    </Button>{/**myBlue#89CFF0 iceCold:#a0d2eb*/}
                    {/* <Button
                        className = "ui circular icon button"
                        style = {{backgroundColor:ice_cold.current,
                                width:"fit-item",
                                color:"#1E90FF", // dodger-blue:1E90FF,a white:f5f5f5
                                marginBottom:"10px"}}
                        value = {postIdInFirestoreDatabase}
                        onClick = {handleReplyPost}
                        data-tooltip = "Reply." 
                        data-position = "top center"
                        content = {visible ? 'Hide' : 'Show'}>
                        <i className = "reply icon"></i>
                    </Button> */}
                    {/**myBlue#89CFF0 iceCold:#a0d2eb*/}
                </div>
            </Card>
        </div>
    )
}

export default LoadPosts