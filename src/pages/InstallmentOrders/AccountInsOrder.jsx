import React, { Component } from 'react';
import {InstallOrderMentWrap} from './styleInstallOrderMent'
import Header from '../../components/Header/Header';  
import { Toast,Icon } from 'antd-mobile';
import axios from '../../assests/js/request';
import Storage from '../../assests/js/Storage';
import handleClipboard from '../../assests/js/clipboard'
/**
 * 分期订单提交审批
 */

//手写px转remjs
function translateRem(pxValue) {
    const ratio = 37.5; // 根据项目配置比例的方式自行设定
    // pxValue = parseInt(pxValue); 
    return pxValue / ratio + 'rem';
}
class AccountInsOrder extends Component {
    constructor(props){
        super(props)
        this.state=({  
            deviceList:[],//
            downPayAmt:'',//	number首付款金额 
            firstRepayDate:'',//	string首期还款日：yyyy年MM月dd日 
            handleDate:'',//	string办理时间：yyyy年MM月dd日 
            loanAmt:'',//	number分期金额 
            repayAmtStr:'',//	string还款金额：20000 / 期 
            repayPlanList:[],//	[还款计划{...}]
            repayTermStr:'',//	string分期期数：6期 
            wsAccount:'',//	string网商子账号
            FormatAccount:'',//格式化的账号
        })
        this.handleBack= this.handleBack.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount(){ 
        //获取分期信息
        this.getAllDetail()  
    } 
     
    //获取分期借款还款计划
    async getAllDetail(){ 
        var mchNo = Storage.get('mchNo'); 
        let res = await axios.getFenQiRplan({ mchNo}); 
        if(res.code === '0000'){ 
            var FormatAccount = res.data.wsAccount.substr(0, 4) + ' ' + res.data.wsAccount.substr(4, 4) + ' ' + res.data.wsAccount.substr(8, 4) +
            ' ' + res.data.wsAccount.substr(12, 4) + ' ' + res.data.wsAccount.substr(16, 4)

            Storage.set('RealRepayPlanList',JSON.stringify(res.data.repayPlanList))
            Storage.set('wsAccount',res.data.wsAccount)
            this.setState({ 
                deviceList:res.data.deviceList,//设备信息列表
                downPayAmt:res.data.downPayAmt,//	stringexample: 2000.00元首付款金额
                firstRepayDate:res.data.firstRepayDate,//	stringexample: 2020年09月20日首期还款日
                handleDate:res.data.handleDate,//	stringexample: 2020年09月20日办理时间
                loanAmt:res.data.loanAmt,//	stringexample: 5000分期金额
                repayAmtStr:res.data.repayAmtStr,//还款金额：20000 / 期
                repayTermStr:res.data.repayTermStr,//分期期数：6期
                wsAccount:res.data.wsAccount,//网商子账号
                FormatAccount:FormatAccount,//格式化
            })
        } else{
            Toast.info(res.msg, 3);
        }
    } 
    //提交分期订单签约
    async handleSubmit(){  
        var mchNo = Storage.get('mchNo') 
        let res = await axios.SubmitSign({ mchNo }); 
        if(res.code === '0000'){
            Toast.info(res.msg, 3);
            this.props.history.push('/AccountInsOrder')
        }else{
            Toast.info(res.msg, 3);
        }
          
    }
    //复制信息
    copy(type,event){ 
        if(type === 'name'){ 
            handleClipboard('广州仁东互联网小额贷款有限公司',type,event)
        }else if(type === 'account'){
            handleClipboard(this.state.wsAccount,type,event)
        }else if(type === 'bankName'){
            handleClipboard('浙江网商银行',type,event)
        } 
    }
    //返回引导页
    handleBack(){
        //跳转至爱宠的页面
        window.location.href='https://cdn.5ichong.com/rd-success.html'
        // var outerProcessNo = Storage.get('outerProcessNo')
        // var firstPayAmt = Storage.get('firstPayAmt')
        // var loanAmt = Storage.get('loanAmt')
        // var merchantNo = Storage.get('mchNo')
        // this.props.history.push('/EntrancePage?outerProcessNo='+outerProcessNo+'&firstPayAmt='+firstPayAmt+'&loanAmt='+loanAmt+'&merchantNo='+merchantNo)
    }
    render() {
        let obj={
            if_show_arr_lft:true,//是否显示左上角返回键
            title:'分期订单账户',//页面标题 
            desc:'请确认当前申请的设备分期信息',//描述
            ft_concat:'委托授权书',//签署合同名称
            ft_text:"提交审批",//按钮文案
            ftshow:false,//是否显示底部按钮合同
            ftColor:false,//是否需要白色背景
        } 
        let equip = this.state.deviceList.map((item,index)=>{
            return <div key={index}>
                        <div className="flexbiner"> 
                            <div className="detul">设备名称</div>
                            <div className="equipmentmsg">{item.deviceName}</div>
                        </div>
                        <div className="flexbiner"> 
                            <div className="detul">设备价格</div>
                            <div className="equipmentmsg">{parseInt(item.devicePrice).toFixed(2)}元</div>
                        </div>
                    </div>
        })
        return (
            <div className="OutWrapContainer" style={{background:'#F9F9F9'}}> 
                <InstallOrderMentWrap>
                <Header history={this.props.history} {...obj} Back={this.handleBack}></Header>
                <div className="Accbiner">
                    <div className="Ab_1">请留意还款时间，按时还款</div>
                    <div className="Gorp"  onClick={()=>this.props.history.push('/MoveRepayPlan')}>
                        去还款<Icon type="right" size='md' />
                    </div>
                </div>
                <div className="InsContainer Ic_1">
                    <div className="I_tit">
                        <img className="pan_Innel_ul_img" src="images/icon_ddang@2x.png" srcSet="images/icon_ddang@2x.png 2x, images/icon_ddang@3x.png 3x" alt=""/><span>订单信息</span>
                    </div>
                    <div className="detailmsg">
                        {equip}
                    </div>
                </div>
                <div className="InsContainer Ic_2">
                    <div className="I_tit">
                        <img className="pan_Innel_ul_img" src="images/icon_fenqi@2x.png" srcSet="images/icon_fenqi@2x.png 2x, images/icon_fenqi@3x.png 3x" alt=""/><span>分期信息</span>
                    </div>
                    <div className="detailmsg">
                        <div className="flexbiner"> 
                            <div className="detul">首付款金额</div>
                            <div className="equipmentmsg">{parseInt(this.state.downPayAmt).toFixed(2)}元</div>
                        </div>
                        <div className="flexbiner"> 
                            <div className="detul">分期期数</div>
                            <div className="equipmentmsg">{this.state.repayTermStr}</div>
                        </div>
                        <div className="flexbiner"> 
                            <div className="detul">分期金额</div>
                            <div className="equipmentmsg">{parseInt(this.state.loanAmt).toFixed(2)}元</div>
                        </div>
                        <div className="flexbiner"> 
                            <div className="detul">还款金额</div>
                            <div className="equipmentmsg">{this.state.repayAmtStr}</div>
                        </div>
                        <div className="flexbiner"> 
                            <div className="detul">办理时间</div>
                            <div className="equipmentmsg">{this.state.handleDate}</div>
                        </div>
                        <div className="flexbiner"> 
                            <div className="detul">首期还款日</div>
                            <div className="equipmentmsg">{this.state.firstRepayDate}</div>
                        </div>  
                    </div>
                </div>
                <div style={{paddingBottom:translateRem(8),background:'#F9F9F9'}}>
                <div className="seeRpdetail" onClick={()=>this.props.history.push('/MoveRepayPlan')}>
                    还款计划详情<img className="pan_Innel_ul_img" src="images/DisclosureIndicator@2x.png" srcSet="images/DisclosureIndicator@2x.png 2x, images/DisclosureIndicator@3x.png 3x" alt=""/>
                </div> </div>
                <div className="componentAccount">
                    <div className="I_tit">
                        <img className="pan_Innel_ul_img" src="images/icon_zhuanz@2x.png" srcSet="images/icon_zhuanz@2x.png 2x, images/icon_zhuanz@3x.png 3x" alt=""/><span>转账还款账号</span>
                    </div>
                    <div className="AccountBkCrd">
                        <ul>
                            <li style={{marginBottom:translateRem(15)}}>
                                <span>广州仁东互联网小额贷款有限公司</span>
                                <span className="copy ra_bt" data-clipboard-text="广州仁东互联网小额贷款有限公司" onClick={(e)=>this.copy('name',e)}>复制户名</span>
                            </li>
                            <li style={{marginBottom:translateRem(31)}}>
                                <span style={{fontSize:translateRem(14)}}>{this.state.FormatAccount}</span>
                                <div className="copy ra_bt" data-clipboard-text={this.state.wsAccount} onClick={(e)=>this.copy('account',e)}>复制账号</div>
                            </li>
                            <li>
                                <span style={{fontSize:translateRem(13)}}>
                                <img className="pan_Innel_ul_img" src="images/bklogo.png" srcSet="images/bklogo@2x.png 2x, images/bklogo@3x.png 3x" alt=""/>浙江网商银行</span>
                                <span className="copy ra_bt" data-clipboard-text="浙江网商银行" onClick={(e)=>this.copy('bankName',e)}>复制银行</span>
                            </li>
                        </ul>
                    </div>
                </div>
                </InstallOrderMentWrap>
            </div>
        );
    }
}

export default AccountInsOrder;
