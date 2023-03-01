import React from 'react';
import 'semantic-ui-react'
import {Link, useNavigate} from "react-router-dom"

function Footer () {
    return (
        <center>
            <div className="ui inverted vertical footer segment form-page" style = {{width:"fit-content"}}>
                <div className="ui container" style = {{marginLeft:"0px"}}>
                    <div id = "stayConnectedId">
                        <h1 className="ui header">Stay Connected</h1>
                        {/* <p><strong>Stay Connected</strong></p>
                         */}
                    </div>
                    <div id = "links">
                        <a 
                            href = {"https://www.linkedin.com/in/emmanuel-kofi-agyapong-783807bb/"}
                            id = "linkedinIcon">
                            <button 
                                className="ui circular linkedin icon button"
                                data-tooltip = "Checkout my LinkedIn." 
                                data-position = "top center"> 
                                <i className="big linkedin icon "></i>
                            </button>
                        </a>
                        <a 
                            href = {"https://github.com/TheWizard91"}
                            id = "githubIcon">
                            <button 
                                className="ui circular yellow github icon button"
                                data-tooltip = "Checkout my Github repos." 
                                data-position = "top center">
                                <i className="big github alternate icon"></i>
                            </button>
                        </a>
                            <a 
                                href = {"https://github.com/TheWizard91"}
                                id = "emailIcon">
                                <button 
                                    className="ui circular green envelop icon button"
                                    data-tooltip = "Send me an email." 
                                    data-position = "top center">
                                    <i className="big envelope icon"></i>
                                </button>
                            </a>
                    </div>
                </div>
            </div>
        </center>
    )
}

export default Footer