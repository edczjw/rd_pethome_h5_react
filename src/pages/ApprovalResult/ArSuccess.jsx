import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import {AppResultWrap} from './styleAppResult'
/**
 * 签约成功
 */
class ArSuccess extends Component {
    render() {
        let obj={
            if_show_arr_lft:true,//是否显示左上角返回键
            title:'签约成功',//页面标题
            desc:'请填写使用本人身份证登记开通的手机号。',//描述
            ft_concat:'委托授权书',//签署合同名称
            ft_text:"提交",//按钮文案
            ftshow:false,//是否显示底部按钮
            ftColor:false,//是否需要白色背景
        }
        return (
            <div className="OutWrapContainer">
                <AppResultWrap>
                    <Header {...obj}></Header>
                    <div className="apr_container">
                    <img className="success_img" src="images/icon_qiangyue.png" srcSet="images/icon_qiangyue@2x.png 2x, images/icon_qiangyue@3x.png 3x" alt=""/>
                    <div className="status_msg">签约成功</div>
                    <div className="status_desc">分期办理成功，请按照还款计划进行还款。</div>
                    <div className="gorpmsgbtn btn_sg">查看还款记录</div>
                    <div className="gorpmsgbtn">我知道了</div>
                    </div>
                </AppResultWrap> 
            </div>
        );
    }
}

export default ArSuccess;
