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
                            <button class="ui circular linkedin icon button">
                                <i className="big linkedin icon "></i>
                            </button>
                        </a>
                        <a 
                            href = {"https://github.com/TheWizard91"}
                            id = "githubIcon">
                            <button class="ui circular github icon button">
                                <i className="big github icon"></i>
                            </button>
                        </a>
                            <a 
                                href = {"https://github.com/TheWizard91"}
                                id = "emailIcon">
                                <button class="ui circular black envelop icon button">
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