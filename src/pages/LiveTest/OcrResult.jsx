import React, { Component } from 'react';
import UrlParam from '../../assests/js/addressParameter'; 
import {LiveTestOcrwrap} from './styleLiveTestOcr'

/**
 * ocr结果页
 */ 
class OcrResult extends Component {
    constructor(props){
        super(props)
        this.state={

        }
    }

    componentDidMount(){
        if(UrlParam.getParams('status', this.props.location.search) ==='S'){  
            this.props.history.push('/ApplicationPeo')
            // alert('', <div style={{textAlign:'center'}}>人脸识别成功！</div>, [ 
            // { text: '好的', onPress: () => this.props.history.push('/ApplicationPeo')},
            // ])
        }else if(UrlParam.getParams('status', this.props.location.search) ==='F'){  
            this.props.history.push('/LiveTestOcr')
            // alert('', '很抱歉，人脸识别失败，请重新返回操作', [ 
            // { text: '我知道了', onPress: () => this.props.history.push('/LiveTestOcr')},
            // ])
        } 
    } 

    render() {
        return (
            <div className="OutWrapContainer">
            <LiveTestOcrwrap>

            </LiveTestOcrwrap> 
            </div>
        );
    }
}

export default OcrResult;
