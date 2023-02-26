import React from "react"
import { Card, Button } from "semantic-ui-react"

function LoadPosts ({ post,time }) {
    return (
        <div>
            <Card id = "livePostCardview" 
                style = {{ width:"100%" }}>
                <div className = "content">
                    <i class="large right floated user circle outline icon"></i>
                    <i class="large right floated like icon"></i>
                    <i class="large right floated star icon"></i>
                    <div 
                        className = "ui left floated header"
                        style = {{ width:"fit-content" }}
                        >{time}
                    </div>
                    <p></p>
                    <div 
                        className = "description"
                        >
                        {post}
                    </div>
                </div>
                <Button
                    style = {{backgroundColor:"#89CFF0"}}
                    data-tooltip = "Edit Post." 
                    data-position = "top center">
                    <i class = "large edit icon"></i>
                </Button>
            </Card>
        </div>
    )
}

export default LoadPosts