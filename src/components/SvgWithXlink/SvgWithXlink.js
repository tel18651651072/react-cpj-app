/**
 * Created by mac on 2018/2/4.
 */

import React, {Component} from 'react';

function SvgWithXlink (props) {
    return (
        <svg
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
        >
            <style>
                { `.classA { fill:${props.fill} }` }
            </style>
            <defs>
                <g id="Port">
                    <circle style={{fill:'inherit'}} r="10"/>
                </g>
            </defs>

            <text y="15">black</text>
            <use x="70" y="10" xlinkHref="#Port" />
            <text y="35">{ props.fill }</text>
            <use x="70" y="30" xlinkHref="#Port" className="classA"/>
            <text y="55">blue</text>
            <use x="0" y="50" xlinkHref="#Port" style={{fill:'blue'}}/>
        </svg>
    );
}

export default SvgWithXlink
