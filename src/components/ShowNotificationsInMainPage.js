import React, {useState, prevState, useEffect, useRef} from "react"
import {Card, Icon, Image, Button, Grid, Segment, Divider, Transition, Menu} from "semantic-ui-react"
import {Link} from "react-router-dom"
import NotificationsPage from "./NotificationsPage"

function ShowNotificationsInMainPage ({is_the_notification_section_visible}) {
    // {is_there_any_notification, is_notification_visible}
    // const [is_visible] = useState(!is_the_notification_section_visible);
    
    useEffect (() => {
        // console.log("is_the_notification_section_visible: "+is_the_notification_section_visible);
        // console.log("is_visible: ",is_visible);
    })
    return (
        <Transition
            visible = {is_the_notification_section_visible}
            animation = 'scale' 
            duration = {500}>
            <div 
                id = "show_notifications_in_main_page_container"
                stryle = {{backgroundColor:"#666362"}}>
                <Segment
                    inverted
                    id = "my_segment"
                    color = "red"
                    >
                        <p>something</p>
                </Segment>
                {/* <Segment inverted color='red' secondary>
                    I am pretty noticeable but you might check out other content before you
                    look at me.
                </Segment>
                <Segment inverted color='red' tertiary>
                    If you notice me you must be looking very hard.
                </Segment> */}
                <Link to = "/notifications-page" element = {<NotificationsPage />}>view all</Link>
            </div>
        </Transition>
    )
}

export default ShowNotificationsInMainPage;