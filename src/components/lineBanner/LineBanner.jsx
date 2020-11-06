import React, { Component } from 'react';
import {LineBWrap} from './styleLineBanner'

class LineBanner extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }
    render() {
        return (
            <div>
                <LineBWrap>{this.props.desc}</LineBWrap>
            </div>
        );
    }
}

export default LineBanner;
