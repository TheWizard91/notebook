import React,{useState,useEffect} from "react"
import {Card,Button,Grid,Segment,Divider,Transition} from "semantic-ui-react"
import db from "../firebase/firestore"

function LoadPosts ({post,time,post_id}) {

    const [postID,setPostID]=useState({postID:[]})
    // console.log("post_id: "+post_id)
    const [visible,setVisibility]=useState({visible:true})
    const [editTextValue,setEditTextValue]=useState()

    const editPost =(e)=>{
        e.preventDefault()
        // console.log("In editPost: "+e.target.value)
        setVisibility(!visible)
    }

    const handleEditTextChange =(e)=>{
        e.preventDefault()
        console.log("typing: "+e.target.value)
        // setEditTextValue(e.target.value)
        post=e.target.value
    }
    useEffect (()=>{
        setVisibility(false)
        // if(visible==true) 
        // db.collection("posts")
        //   .get()
        //   .then((querySnapshot)=>{
        //     querySnapshot.forEach((doc)=>{
        //         // console.log("dataIs: "+JSON.stringify(doc.data().post_id))
        //         postID["postID"].push(doc.data().post_id)
        //         // console.log("postID is: "+JSON.stringify(postID))
        //     })
        //     setPostID(postID)
        //   })
    },[])

    return (
        <div>
            <Card
                className="ui centered card"
                id="livePostCardview" 
                style={{width:"100%"}}>
                <div className="content">
                    <i className="large right floated user circle outline icon"></i>
                    <i className="large right floated like icon"></i>
                    <i className="large right floated star icon"></i>
                    <div 
                        className="ui left floated header"
                        style={{width:"fit-content"}}
                        >{time}
                    </div>
                    <p></p>
                    <div className="description">
                        {post}
                    </div>
                    <Divider iverted/>
                    <Transition
                        visible={visible} 
                        animation="scale" 
                        duiation={500}>
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
                    value={post_id}
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