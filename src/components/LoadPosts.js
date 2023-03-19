import React,{useState,useEffect} from "react"
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
            setFavoritesColor("#34CCAD")
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
            setFavoritesColor("black")
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
            setLikesColor("#34CCAD")
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
            setLikesColor("black")
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
    useEffect (()=>{
        /**Only for initial values. */
        setVisibility(false)
        // setPostInFirestoreDatabase(post)
        // setTimeInFirestoreDatabase(time)
        // setPostIdInFirestoreDatabase(post_id)
        // setLikesInFirestoreDatabase(likes)
        // setFavoriteInFirestoreDatabase(favorite)
        console.log("fav: "+favoriteInFirestoreDatabase)
        setFavoriteInFirestoreDatabase(+1)
    },[])

    return (
        <div>
            <Card
                className="ui centered card"
                id="livePostCardview" 
                style={{width:"100%"}}>
                <div className="content">
                    <Button
                        name="profile_image"
                        value="user_profile_image"
                        className="right floated ui circular pastel gray icon button"
                        style={{color:userColor}}>{/**"#34CCAD"*/}
                        <i className="user circle outline icon"></i>
                    </Button>
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
                <Button
                    style={{backgroundColor:"#89CFF0"}}
                    value={postIdInFirestoreDatabase}
                    onClick={editPost}
                    data-tooltip="Edit Post." 
                    data-position="top center"
                    content={visible ? 'Hide' : 'Show'}>
                    <i class="large edit icon"></i>
                </Button>
            </Card>
        </div>
    )
}

export default LoadPosts