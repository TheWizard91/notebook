import React,{useState,useEffect,useRef} from "react"
import {Card,Button,Grid,Segment,Divider,Transition} from "semantic-ui-react"
import db from "../firebase/firestore"
import {doc,setDoc,updateDoc} from "firebase/firestore"

function LoadPosts ({post,time,post_id,likes,favorite}) {

    // const [postID,setPostID]=useState({postID:[]})
    const [visible,setVisibility]=useState({visible:false})
    const [editTextValue,setEditTextValue]=useState()

    // Firebase Database
    const [postInFirestoreDatabase,setPostInFirestoreDatabase]=useState(post)
    const [timeInFirestoreDatabase,setTimeInFirestoreDatabase]=useState(time)
    const [likesInFirestoreDatabase,setLikesInFirestoreDatabase]=useState(likes)
    const [favoriteInFirestoreDatabase,setFavoriteInFirestoreDatabase]=useState(favorite)
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

    const handleOnClickFavorites =(e)=> {
        e.preventDefault()
        setCountFavoriteClicks(countFavoriteClicks+1)
        console.log("before: "+countFavoriteClicks)
        if(countFavoriteClicks%2==1) {
            setFavoritesColor(greenRef.current)
            setFavoriteInFirestoreDatabase(favoriteInFirestoreDatabase+1)
            updateDoc(docRef,{
                favorite:favoriteInFirestoreDatabase
            },{
                merge:true
            }).then(()=>console.log("favorites updated"))
            console.log("getting green")
            console.log("favoritesColor: "+favoritesColor)
            console.log("after if: "+countFavoriteClicks)
            console.log("favoriteInFirestoreDatabase: "+favoriteInFirestoreDatabase)
        } else {   
            setFavoritesColor(blackRef.current)
            setFavoriteInFirestoreDatabase(favoriteInFirestoreDatabase-1)
            updateDoc(docRef,{
                favorite:favoriteInFirestoreDatabase
            },{
                merge:true
            }).then(()=>console.log("favorites updated"))
            console.log("getting black")
            console.log("favoritesColor: "+favoritesColor)
            console.log("after else: "+countFavoriteClicks)
            console.log("favoriteInFirestoreDatabase: "+favoriteInFirestoreDatabase)
        }
    }

    const onClickLikes = (e) => {
        e.preventDefault()
        setCountLikesClicks(countLikesClicks+1)
        if(countLikesClicks%2==1) {
            setLikesColor(greenRef.current)
            setLikesInFirestoreDatabase(likesInFirestoreDatabase+1)
            // console.log("getting green")
            // console.log("color: "+likesColor)
            // console.log("countLikesColor: "+countLikesClicks)
            // console.log("likesInFirestoreDatabase: "+likesInFirestoreDatabase)
            updateDoc(docRef,{
                likes:likesInFirestoreDatabase
            },{
                merge:true
            }).then(()=>console.log("likes updated"))
        } else {
            setLikesColor(blackRef.current)
            setLikesInFirestoreDatabase(likesInFirestoreDatabase-1)
            // console.log("getting black")
            // console.log("color: "+likesColor)
            // console.log("countLikesColor: "+countLikesClicks)
            // console.log("likesInFirestoreDatabase: "+likesInFirestoreDatabase)
            updateDoc(docRef,{
                likes:likesInFirestoreDatabase
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
        if(favoriteInFirestoreDatabase>0){
            setFavoritesColor(greenRef.current)
            // favoritesColor=greenRef.current
        } else{
            setFavoritesColor(blackRef.current)
        }
    }

    const initializeFavoritesColor=()=>{
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
        console.log("fav: "+favoriteInFirestoreDatabase)
        console.log("likes: "+likesInFirestoreDatabase)
        console.log("green: "+greenRef.current)
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
                        <i className="user circle outline icon"></i>
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