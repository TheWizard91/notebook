import React,{useState,useEffect,useRef} from "react"
import {Card,Button,Grid,Segment,Divider,Transition,Image} from "semantic-ui-react"
import db from "../firebase/firestore"
import {doc,setDoc,updateDoc} from "firebase/firestore"

function LoadPosts ({post,time,post_id,likes,favorites}) {

    // const [postID,setPostID]=useState({postID:[]})
    const [visible,setVisibility]=useState({visible:false})
    const [editTextValue,setEditTextValue]=useState()
    const userProfileImagePath=useRef("https://scontent-lga3-2.xx.fbcdn.net/v/t39.30808-6/244590566_4376334679140670_8344111291006398210_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=5wyzmXJtou8AX_702gl&_nc_ht=scontent-lga3-2.xx&oh=00_AfBYTGJK2YFtRihob8-p5l4PwnFgy4cTD9m2LeaAox-g0Q&oe=6422313A")

    // Firebase Database
    const [postInFirestoreDatabase,setPostInFirestoreDatabase]=useState(post)
    const [timeInFirestoreDatabase,setTimeInFirestoreDatabase]=useState(time)
    const [likesInFirestoreDatabase,setLikesInFirestoreDatabase]=useState(likes)
    const [favoritesInFirestoreDatabase,setFavoriteInFirestoreDatabase]=useState(favorites)
    // console.log("likesIs: ",likes)
    // console.log("favoritesIs: ",favorites)
    const [postIdInFirestoreDatabase,setPostIdInFirestoreDatabase]=useState(post_id)
    const docRef = doc(db,"posts",post_id)
    const greenRef=useRef("#34CCAD")
    const blackRef=useRef("#000000")

    // Edit post or textarea
    const [editPostClicks,seteditPostClicks]=useState(1)
    // const greenColor=useRef("")

    // User
    const [userColor,setUserColor]=useState("black")

    // Likes starting from 1 becuase 0%2==0, and if we start from 0,
    // get false because when we startt handleOn.....
    // countFavoriteClicks==0 inside of the function.
    const [likesColor,setLikesColor]=useState("black")
    const [countLikesClicks,setCountLikesClicks]=useState(1)

    // Favotites
    const [favoritesColor,setFavoritesColor]=useState("black")
    const [countFavoriteClicks,setCountFavoriteClicks]=useState(1)

    /**TODO: I have setFavoriteInFirestoreDatabase(favoritesInFirestoreDatabase+1) or
     * setFavoriteInFirestoreDatabase(favoritesInFirestoreDatabase-1) to increase ordecrese
     * the 
     */
    const handleOnClickFavorites =(e)=> {
        e.preventDefault()
        setCountFavoriteClicks(countFavoriteClicks+1)
        console.log("before: "+countFavoriteClicks)
        if(countFavoriteClicks%2==1) {
            setFavoritesColor(greenRef.current)
            setFavoriteInFirestoreDatabase(favoritesInFirestoreDatabase+1)
            updateDoc(docRef,{
                favorites:1//favoritesInFirestoreDatabase
            },{
                merge:true
            }).then(()=>console.log("favorites updated"))
        } else {   
            setFavoritesColor(blackRef.current)
            setFavoriteInFirestoreDatabase(favoritesInFirestoreDatabase-1)
            updateDoc(docRef,{
                favorites:0//favoritesInFirestoreDatabase
            },{
                merge:true
            }).then(()=>console.log("favorites updated"))
        }
    }

    const onClickLikes =(e)=> {
        e.preventDefault()
        setCountLikesClicks(countLikesClicks+1)
        if(countLikesClicks%2==1) {
            setLikesColor(greenRef.current)
            setLikesInFirestoreDatabase(likesInFirestoreDatabase+1)
            updateDoc(docRef,{
                likes:1//likesInFirestoreDatabase
            },{
                merge:true
            }).then(()=>console.log("likes updated"))
        } else {
            setLikesColor(blackRef.current)
            setLikesInFirestoreDatabase(likesInFirestoreDatabase-1)
            updateDoc(docRef,{
                likes:0//likesInFirestoreDatabase
            },{
                merge:true
            }).then(()=>console.log("likes updated"))
        }
    }

    const editPost =(e)=>{
        e.preventDefault()
        setVisibility(!visible)
        seteditPostClicks(editPostClicks+1)
        console.log("editPostClicks: "+editPostClicks)
    }

    const handleEditTextChange =(e)=>{
        e.preventDefault()
        if (editPostClicks%2==0){
            setPostInFirestoreDatabase(e.target.value)
        }
        updateDoc(docRef,{
            post:e.target.value
        },{
            merge:true
        }).then(()=>console.log("post updated"))
    }  

    const initializeLikesColor=()=>{
        console.log("initializeLikesColor: "+favoritesInFirestoreDatabase)
        if(favoritesInFirestoreDatabase>0){
            setFavoritesColor(greenRef.current)
            // favoritesColor=greenRef.current
        } else{
            setFavoritesColor(blackRef.current)
        }
    }

    const initializeFavoritesColor=()=>{
        console.log("initializeFavoritesColor: "+likesInFirestoreDatabase)
        if(likesInFirestoreDatabase>0){
            setLikesColor(greenRef.current)
        } else {
            setLikesColor(blackRef.current)
        }
    }

    useEffect (()=>{
        /**Only for initial values. When the app starts the likes and favorites are 
         * set, becuase the has been fetched from the data from the database;
         * which is why I had the info passed as parameters in the very brggining.
        */
        setVisibility(false)
        initializeFavoritesColor()
        initializeLikesColor()
    },[])

    return (
        <div>
            <Card
                className="ui centered card"
                id="livePostCardview" 
                style={{width:"100%"}}>
                <div className="content">
                    {/* <Button
                        name="profile_image"
                        value="user_profile_image"
                        className="right floated ui circular pastel gray icon button"
                        style={{color:userColor}}>
                        <i className="user circle outline icon">
                        <Image src="https://scontent-lga3-2.xx.fbcdn.net/v/t39.30808-6/244590566_4376334679140670_8344111291006398210_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=5wyzmXJtou8AX_702gl&_nc_ht=scontent-lga3-2.xx&oh=00_AfBYTGJK2YFtRihob8-p5l4PwnFgy4cTD9m2LeaAox-g0Q&oe=6422313A"
                            style={{width:"15px",height:"15px"}} 
                            circular />
                        </i>
                    </Button> */}
                    <Button 
                        name="likes"
                        value="heart"
                        className="right floated ui circular pastel gray icon button"
                        style={{color:likesColor}}
                        onClick={onClickLikes}>
                        <i className="like icon"></i>
                    </Button>
                    <Button 
                        name="star"
                        value="favorites"
                        className="right floated ui circular pastel gray icon button"
                        style={{color:favoritesColor}}
                        onClick={handleOnClickFavorites}>
                        <i className="star icon"></i>
                    </Button>
                    <div 
                        className="ui left floated header"
                        style={{width:"fit-content"}}
                        >{timeInFirestoreDatabase}
                    </div>
                    <p></p>
                    <div className="description">
                        {postInFirestoreDatabase}
                    </div>
                    <Divider iverted/>
                    <Transition
                        visible={visible} 
                        animation="scale" 
                        duration={500}>
                        <textarea
                            id="input-element"
                            className="ui segment"
                            type="text"
                            value={editTextValue}
                            name="message"
                            style={{width:"100%"}}
                            onChange={handleEditTextChange}
                            placeholder='Type anything...'/>
                    </Transition>
                </div>
                <div>
                    <Button
                        className="ui circular icon button"
                        style={{backgroundColor:"#89CFF0",width:"fit-item",color:"#f5f5f5",marginBottom:"10px"}}
                        value={postIdInFirestoreDatabase}
                        onClick={editPost}
                        data-tooltip="Edit Post." 
                        data-position="top center"
                        content={visible ? 'Hide' : 'Show'}>
                        <i className="large edit icon"></i>
                    </Button>
                </div>
            </Card>
        </div>
    )
}

export default LoadPosts