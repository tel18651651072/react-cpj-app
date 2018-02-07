/**
 * Created by mac on 2018/2/4.
 */
import React, {Component} from 'react';

function Logo (props) {
    return (
        <svg width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1">
            <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{stopColor:'#66ccff',stopOpacity:1}} />
                    <stop offset="100%" style={{stopColor:'#2c65f5',stopOpacity:0.7}} />
                </linearGradient>
            </defs>
            {/*<ellipse cx="200" cy="70" rx="35" ry="35" fill="url(#grad1)" />*/}
            <circle cx="25" cy="20"  r="20" fill="url(#grad1)" />
            <text fill="#ffcc00" fontSize="12" fontFamily="Verdana" x="5" y="25">THREE</text>
            <text fill="#ffffff" fontSize="25" fontFamily="Verdana" x="12" y="29">匠</text>
        </svg>
    );
}

export default Logo


