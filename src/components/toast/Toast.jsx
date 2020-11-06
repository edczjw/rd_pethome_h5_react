import React, { Component } from 'react';
import {Toastwrap} from './styleToast'

/**
 * toast显示
 */
class Toast extends Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <div className="ToastOutWrap">
                <Toastwrap> 
                    {
                        this.props.status===0?
                        null:
                        <div className="toast_img">
                            {
                                this.props.status===1?
                                <img src="images/success.png" alt=""/>:<img src="images/wrong@2x.png" setSrc="images/wrong@2x.png 2x, images/wrong@3x.png 3x" alt=""/>
                            } 
                        </div>
                    }
                    <div className="to_text">{this.props.text}</div>
                </Toastwrap> 
            </div>
        );
    }
}

export default Toast;
