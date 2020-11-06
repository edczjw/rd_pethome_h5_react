import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import Buttonsub from '../../components/button_submit/Buttonsub';
import {LiveTestOcrwrap} from './styleLiveTestOcr'
import { Toast } from 'antd-mobile';
import axios from '../../assests/js/request';
import Storage from '../../assests/js/Storage';

/**
 * 活体人脸识别
 */
class LiveTestOcr extends Component {
    // 构造器
    constructor(props){
        super(props)
        // 数据data
        this.state={    
            scene_id:'RdPetHomeH5',//场景
            web_title:'爱宠人脸识别',//网页展示用的标题文字
            token:'',//token
        } 
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleBack = this.handleBack.bind(this)
    };
    componentDidMount(){
        
    }
    //跳转至第三方OCR页面
    async handleSubmit(){
        var mchNo = Storage.get('mchNo')
        const {scene_id,web_title} = this.state
        let res = await axios.getToken({ mchNo,scene_id,web_title })
        if(res.code === '0000'){ 
            window.location.href = "https://api.megvii.com/faceid/lite/do?token=" + res.data.token
        }else{ 
            Toast.info(res.msg, 3);
        } 
    }
    //返回引导页
    handleBack(){
        var outerProcessNo = Storage.get('outerProcessNo')
        var firstPayAmt = Storage.get('firstPayAmt')
        var loanAmt = Storage.get('loanAmt')
        var merchantNo = Storage.get('mchNo')
        var sign = Storage.get('sign')
        var timestamp = Storage.get('timestamp')
        var partnerNo = Storage.get('partnerNo')
        var loanTerm = Storage.get('loanTerm')
        
        this.props.history.push('/EntrancePage?outerProcessNo='+outerProcessNo+'&loanTerm='+loanTerm+'&partnerNo='+partnerNo+'&sign='+sign+'&timestamp='+timestamp+'&firstPayAmt='+firstPayAmt+'&loanAmt='+loanAmt+'&merchantNo='+merchantNo)
    }
    render() {
        let obj={
            if_show_arr_lft:true,//是否显示左上角返回键
            title:'身份信息识别',//页面标题
            desc:'',//描述
            ft_concat:'委托授权书',//签署合同名称
            ft_text:"开始",//按钮文案
            ftshow:false,//是否显示底部合同
            ftColor:false,//是否需要底部白色背景
        }
        return (
            <div className="OutWrapContainer">
                <LiveTestOcrwrap>
                <Header history={this.props.history} {...obj} Back={this.handleBack}></Header>
                    <div className="linocr">仅用于核实身份</div>
                    <div className="ocrImg">
                        <div className="inone">为保证系统识别的效率和效果</div>
                        <div className="intwo">请正对手机，确保所处环境光线充足</div>
                        <img  className="inthree" src="images/livetest.png" srcSet="images/livetest@2x.png 2x, images/livetest@3x.png 3x" alt="" />
                        <div className="infour">请确认本人操作</div>
                        <div className="infive">稍后将录制一段视频，请按照页面指引操作</div>
                    </div>
                    <div className="fixbtn"> 
                        <Buttonsub history={this.props.history} {...obj} Submit={this.handleSubmit}></Buttonsub>
                    </div>
                </LiveTestOcrwrap> 
            </div>
        );
    }
}

export default LiveTestOcr;
