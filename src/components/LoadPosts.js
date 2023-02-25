import React from "react"
import {Card, Button} from "semantic-ui-react"

function LoadPosts ({post,time}) {
    return (
        <div>
            <Card id = "livePostCardview" style = {{width:"100%"}}>
                <div className = "content">
                    <i class="right floated like icon"></i>
                    <i class="right floated star icon"></i>
                    <div 
                        className = "ui left floated header"
                        style = {{width:"fit-content"}}
                        >{time}
                    </div>
                    <p></p>
                    <div 
                        className = "description"
                        >
                        {post}
                    </div>
                </div>
                <Button>
                    <i class="edit icon"></i>
                </Button>
            </Card>
        </div>
    )
}

export default LoadPosts