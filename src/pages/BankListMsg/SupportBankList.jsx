import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import {BankAllWrap} from './styleBankAll' 

/**
 * 支持的银行卡列表
 */
class SupportBankList extends Component {
    constructor(props){
        super(props)
        this.handleBack = this.handleBack.bind(this)
    }
    //返回引导页
    handleBack(){ 
        this.props.history.push('/BankListMsg')
    }
    render() {
        let obj={
            if_show_arr_lft:true,//是否显示左上角返回键
            title:'支持银行卡列表',//页面标题
            desc:'',//描述
            ft_concat:'委托授权书',//签署合同名称
            ft_text:"提交",//按钮文案
            ftshow:false,//是否显示底部合同
            ftColor:false,//是否需要底部白色背景
        }

        //银行卡列表
        let bankList = require('../../assests/js/bankList'); 
        var li = bankList.map((item,index)=>{
        return <li key={index}><img src={item.bkurl} srcSet={`${item.bkurl} 2x, ${item.bkurl3} 3x`} alt=""/> {item.bkName}</li>
        })
        return (
            <div className="OutWrapContainer"  style={{backgroundColor:'#F9F9F9'}}>
            <BankAllWrap>
                <Header history={this.props.history} {...obj} Back={this.handleBack}></Header>

                <div className="support_bklist">
                    <ul>
                        {li}
                    </ul>
                </div>
                <div className="seemore">没有更多</div>
            </BankAllWrap>
            </div>
        );
    }
}

export default SupportBankList;
