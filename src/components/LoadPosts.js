import React,{useState,useEffect} from "react"
import {Card,Button,Grid,Segment,Divider,Transition} from "semantic-ui-react"
import db from "../firebase/firestore"

function LoadPosts ({post,time,post_id}) {

    const [postID,setPostID]=useState({postID:[]})
    // console.log("post_id: "+post_id)
    const [visible,setVisibility]=useState({visible:false})
    const [editTextValue,setEditTextValue]=useState()
    const [po,setP]=useState()
    const [ti,setT]=useState()
    const [p_uid,setPUID]=useState()
    const [clicks,setClicks]=useState(1)

    const editPost =(e)=>{
        e.preventDefault()
        setVisibility(!visible)
        setClicks(clicks+1)
        console.log("c: "+clicks)
    }

    const handleEditTextChange =(e)=>{
        e.preventDefault()
        console.log("typing: "+e.target.value)
        if (clicks%2==0){
            setP(e.target.value)
        }
        console.log("p_uid: "+post_id)
        console.log("post: "+po)
        console.log("time: "+ti)
        db.collection("posts")
          .doc(post_id)
          .set({
            post:po,
            time:ti,
            likes:0,
            favorite:0,
            post_id:post_id
          })
    }
    useEffect (()=>{
        setVisibility(false)
        setP(post)
        setT(time)
        setPUID(p_uid)
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
                        >{ti}
                    </div>
                    <p></p>
                    <div className="description">
                        {po}
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
                    value={p_uid}
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