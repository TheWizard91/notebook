import React, {useState, prevState, useEffect, useRef} from "react"
import {Link, useNavigate} from "react-router-dom"
import {Card, Icon, Image, Button, Grid, Segment, Divider, Transition, Menu} from "semantic-ui-react"
import LogIn from "./LogIn"
import New from "./New"
import SignUp from "./SignUp"
import UpdateProfile from "./UpdateProfile"
import NotificationsPage from "./NotificationsPage"
import ShowNotificationsInMainPage from "./ShowNotificationsInMainPage"
import Images from "./Images"
import "../styles/navigation.css"
import {Spin as Hamburger} from 'hamburger-react' // GH repo https://github.com/cyntler/hamburger-react   https://hamburger-react.netlify.app/
import {useAuth} from "../contexts/AuthContext"
import app from "../contexts/AuthContext"
import firebase from "../firebase/firebase"
import firestore from "../firebase/firestore"
import ref from "../firebase/Storage"
import realtimeDB from '../firebase/realtimeDatabase';

function Navigation() {

    // Menu
    const [hiden_menu_visibility, setVisibility] = useState({visible:false})
    const [isOpen, setOpen] = useState(false)
    const menu_button_color = useRef("#BDB5D5"); // purple wisteria
    const [menu_item_button_color, setMenuItemButtonColor] = useState({menu_item_button_color:menu_button_color.current});
    const [is_logout_active, setIsLogoutActive] = useState();
    const [is_settings_active, setIsSettingsActive] = useState();
    const [is_notifications_button_clicked, setIsNotificationsButtonClicked] = useState({is_notifications_button_clicked:true});
    const [active_item, setActiveItem] = useState();
    const [logo_width, setLogoWidth] = useState();
    const [inner_menu_width, setInnerMenuWidth] = useState();
    const [menu_button_width, setMenuButtonWidth] = useState();
    const [count, setCount] = useState();
    // const [loading, setLoading] = useState(false);
    const {logout} = useAuth(); 
    const navigate = useNavigate();

    // window size
    const width_ref = useRef(window.innerWidth);
    const height_ref = useRef(window.innerHeight);
    const [adjust_margin_to_the_telft_for_logo, setLeftMarginForTheLogo] = useState();
    // const [visible, setVisible] = useState(false);

    // colors
    const white_ghost = useRef("#C5CDD8");
    const dodger_blue = useRef("#1E90FF");
    const rose_white = useRef("#FFFAFA");
    const white_dove = useRef("#F0EFE7");
    const ash_gray = useRef("#666362");
    const inner_menu_button_size = useRef("large");

    useEffect(() => {
        // setIsNotificationsButtonClicked(false);
        // console.log("hiden_menu_visibility: "+hiden_menu_visibility);
        // console.log("is_notifications_button_clicked: "+is_notifications_button_clicked);
        setVisibility(!hiden_menu_visibility);
        if (width_ref.current > height_ref.current) {
            setLeftMarginForTheLogo("80%");
            // not-mobile
            setLogoWidth(2);
            setInnerMenuWidth(12);
            setMenuButtonWidth(2);
        } else {
            // mobile
            setLeftMarginForTheLogo("75%");
            setLogoWidth(3);
            setInnerMenuWidth(10);
            setMenuButtonWidth(3);
        }
    },[isOpen])

    const innerMenuHandler = (e, {name}) => {
        e.preventDefault();
        console.log("visibility: "+is_notifications_button_clicked);

        switch (name) {
            case "bell":  
                setIsNotificationsButtonClicked(!is_notifications_button_clicked);
                break;
            case "power_off":
                logout();
                navigate("/");
                break;
            case "settings":
                navigate("/update-profile");
                break;
            case "images":
                navigate("/images");
                break;
            default:
                break;
        }
    }

    return (
        <div id = "my_navigation_bar">
            <Grid 
                columns = {16}
                reversed = "mobile">
                <Grid.Column width = {menu_button_width}>
                    <Hamburger 
                        duration = {0.8}
                        toggled = {isOpen} 
                        toggle = {setOpen}
                        color = {menu_button_color.current}/>
                </Grid.Column>
                <Grid.Column
                    width = {inner_menu_width}
                    style = {{display: "inline"}}>
                    <Transition 
                        visible = {hiden_menu_visibility}//hiden_menu_visibility
                        animation = "scale"
                        duration = "500">
                        <Menu
                            incon = "labeled"
                            item = {4}
                            fluid 
                            secondary
                            left
                            horizontal>
                            <Button
                                className = "ui circular icon button"
                                name = "power_off"
                                style = {{color:white_ghost,backgroundColor:menu_item_button_color}}
                                onClick = {innerMenuHandler}>
                                <Icon name = {inner_menu_button_size.current+" power off"} />
                            </Button>
                            <Button
                                className = "ui circular icon button"
                                name = "images"
                                style = {{color:white_ghost,backgroundColor:menu_item_button_color}}
                                onClick = {innerMenuHandler}>
                                <Icon name = {inner_menu_button_size.current+" images"} />
                            </Button>
                            <Button
                                className = "ui circular icon button"
                                name = "settings"
                                style = {{color:white_ghost,backgroundColor:menu_item_button_color}}
                                onClick = {innerMenuHandler}>
                                <Icon name = {inner_menu_button_size.current+" settings"} />
                            </Button> 
                            <Button
                                className = "ui circular icon button"
                                name = "bell"
                                style = {{color:white_ghost,backgroundColor:menu_item_button_color}}
                                onClick = {innerMenuHandler}
                                value = {count}>
                                <Icon name = {inner_menu_button_size.current+" bell"} />
                            </Button>
                            <ShowNotificationsInMainPage is_the_notification_section_visible = {!is_notifications_button_clicked}/>
                        </Menu>
                    </Transition> {/**Menu Transiction*/}
                </Grid.Column> {/**Menu Container.*/}
                <Grid.Column
                    width = {logo_width}>
                    <Icon 
                        name = "large ui circular icon"
                        style = {{marginLeft:"0",
                                borderColor:"red", 
                                color:white_ghost.current,backgroundColor:ash_gray.current}}>
                        EA
                    </Icon>
                </Grid.Column>  {/**Logo*/}
            </Grid>
        </div> 
    )
}

export default Navigation