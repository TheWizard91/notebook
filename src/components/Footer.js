import React, {useRef,useState,useEffect} from 'react';
import 'semantic-ui-react'
import {Link, useNavigate} from "react-router-dom"

function Footer () {

    // getting the size of window
    const windowWidth=useRef(window.innerWidth)
    const windowHeight=useRef(window.innerHeight)

    // setting the with size for the buttons 
    // through useEffect()
    const [width,setWidth]=useState("15%")
    const [height,setHeight]=useState("15%")
    const [footerWidth,setFooterWidth]=useState("fit-content")

    const [buttonSize,setButtonSize]=useState("big")

    useEffect(()=> {
        console.log("in useeffect")
        console.log("windowHeight: ",windowHeight.current)
        console.log("windowWidth: ",windowWidth.current)
        if (windowHeight.current > windowWidth.current) {
            setFooterWidth("100%")
            setWidth("5%")
            setHeight("5%")
            setButtonSize("large")
            let element = document.getElementById("stayConnectedId")
            let hidden = element.getAttribute("hidden")
            element.setAttribute("hidden","hidden")
        }
    })

    return (
        <center>
            <div className = "ui inverted vertical footer segment form-page" style = {{width:footerWidth}}>
                <div className = "ui container" style = {{marginLeft:"0px"}}>
                    <div id = "stayConnectedId">
                        <h1 id="connect"className = "ui header">Stay Connected</h1>
                    </div>
                    <div id = "links">
                        <a 
                            href = {"https://www.linkedin.com/in/emmanuel-kofi-agyapong-783807bb/"}
                            id = "linkedinIcon">
                            <button 
                                className = "ui circular linkedin icon button"
                                data-tooltip = "Checkout my LinkedIn." 
                                data-position = "top center"
                                style = {{marginRight:width}}> 
                                <i className = {buttonSize+" linkedin icon"}></i>
                            </button>
                        </a>
                        <a 
                            href = {"https://github.com/TheWizard91"}
                            id = "githubIcon">
                            <button 
                                className = "ui circular yellow github icon button"
                                data-tooltip = "Checkout my Github repos." 
                                data-position = "top center"
                                style = {{marginRight:width,marginLeft:width}}>
                                <i className={buttonSize+" github alternate icon"}></i>
                            </button>
                        </a>
                            <a 
                                href = {"https://github.com/TheWizard91"}
                                id = "emailIcon">
                                <button 
                                    className = "ui circular green envelop icon button"
                                    data-tooltip = "Send me an email." 
                                    data-position = "top center"
                                    style = {{marginLeft:width}}>
                                    <i className = {buttonSize+" envelope icon"}></i>
                                </button>
                            </a>
                    </div>
                </div>
            </div>
        </center>
    )
}

export default Footer