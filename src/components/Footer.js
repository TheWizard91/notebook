import React from 'react';
import 'semantic-ui-react'
import {Link, useNavigate} from "react-router-dom"

function Footer () {
    return (
        <center>
            <div className="ui inverted vertical footer segment form-page">
                <div className="ui container">
                    <div id = "stayConnectedId">
                        <p><strong>Stay Connected</strong></p>
                    </div>
                    <div id = "links">
                        <a 
                            href = {"https://www.linkedin.com/in/emmanuel-kofi-agyapong-783807bb/"}
                            id = "linkedinIcon">
                            <i className="big linkedin icon "></i>
                        </a>
                        <a 
                            href = {"https://github.com/TheWizard91"}
                            id = "githubIcon">
                            <i className="big github icon"></i>
                        </a>
                        <a 
                            href = {"https://github.com/TheWizard91"}
                            id = "emailIcon">
                            <i className="big envelope icon"></i>
                        </a>
                    </div>
                </div>
            </div>
        </center>
    )
}

export default Footer