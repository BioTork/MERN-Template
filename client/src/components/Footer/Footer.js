//code for navbar borrowed and tweaked from React Social Icons: https://www.npmjs.com/package/react-social-icons

import React from 'react';
import './Footer.css';
import { SocialIcon } from 'react-social-icons';

//Footer component with social media icons
function Footer() {
    return (
        <div className = "footerClass">
            <div className= "rowC">
                <div className="social">
                    <SocialIcon target="_blank" url="https://twitter.com/BioTork/" style={{ height: 30, width: 30 }} />
                </div>
                <div className="social">
                    <SocialIcon target="_blank" url="https://www.facebook.com/biotork/" style={{ height: 30, width: 30 }} />
                
                </div>
                <div className="social">
                    COPYRIGHT BIOTORK 2017
                </div>
            </div>
        </div>
    );
}

export default Footer;
