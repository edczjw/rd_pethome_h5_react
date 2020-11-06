import React, { Component } from 'react';
import {InstallOrderMentWrap} from './styleInstallOrderMent'
import Header from '../../components/Header/Header';
import Buttonsub from '../../components/button_submit/Buttonsub';
import LineBanner from '../../components/lineBanner/LineBanner'; 
import axios from '../../assests/js/request';
import Storage from '../../assests/js/Storage';
import { Toast } from 'antd-mobile';

/**
 * 审批通过提交签约
 */
function translateRem(pxValue) {
    const ratio = 37.5; // 根据项目配置比例的方式自行设定
    // pxValue = parseInt(pxValue); 
    return pxValue / ratio + 'rem';
} 
class OrderPassSubmit extends Component {
    constructor(props){
        super(props)
        this.state={
            equipName:'', 
            equipPrice:'',
            downPayAmt:'',//	stringexample: 2000.00元首付款金额
            firstRepayDate:'',//	stringexample: 2020年09月20日首期还款日
            handleDate:'',//	stringexample: 2020年09月20日办理时间
            loanAmt:'',//	stringexample: 5000分期金额
            periods:'',//	stringexample: 6 期分期期数
            repayAmt:'',//	stringexample: 20000 / 期还款金额
        }
        this.handleBack= this.handleBack.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount(){
        //获取设备信息
        this.getEquipDetail()
        //获取分期信息
        this.getAllDetail() 
    } 
     
    //获取设备信息
    async getEquipDetail(){
        var outerProcessNo = Storage.get('outerProcessNo')
        let res = await axios.getEquipment({outerProcessNo}); 
        if(res.code === '0000'){
            this.setState({ 
                equipName:res.data.equipName,
                equipPrice:res.data.equipPrice
            })
        }else{
            Toast.info(res.msg, 3);
        }
    }
    //获取还款试算分期信息
    async getAllDetail(){ 
        var mchNo = Storage.get('mchNo');
        var tryCalAmt = Storage.get('loanAmt');
        var commitStatus = 'Y'
        let res = await axios.getRepayDetail({ mchNo,tryCalAmt,commitStatus}); 
        if(res.code === '0000'){ 
            Storage.set('playList',JSON.stringify(res.data.playList))
            this.setState({ 
                downPayAmt:res.data.downPayAmt,//	stringexample: 2000.00元首付款金额
                firstRepayDate:res.data.firstRepayDate,//	stringexample: 2020年09月20日首期还款日
                handleDate:res.data.handleDate,//	stringexample: 2020年09月20日办理时间
                loanAmt:res.data.loanAmt,//	stringexample: 5000分期金额
                periods:res.data.periods,//	stringexample: 6 期分期期数
                repayAmt:res.data.repayAmt,//	stringexample: 20000 / 期还款金额
            })
        } else{
            Toast.info(res.msg, 3);
        }
    }
    //提交分期订单签约
    async handleSubmit(){  
        var mchNo = Storage.get('mchNo') 
        let res = await axios.SubmitSignWd({ mchNo }); 
        if(res.code === '0000'){
            Toast.info('签约成功', 3,()=>{
                this.props.history.push('/AccountInsOrder')
            });
            
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
            title:'分期订单签约',//页面标题 
            desc:'请留意还款时间，按时还款',//描述
            ft_concat:'借款协议',//签署合同名称
            c2:4,
            ft_text:"确认并签约",//按钮文案
            ftshow:true,//是否显示底部按钮合同
            ftColor:true,//是否需要白色背景
        }
        //格式化设备名称
        let eqName = this.state.equipName.split(',').map((item,index)=>{
            return <div style={{lineHeight: translateRem(20) }} key={index}>{item}</div> 
        })
        return (
            <div className="OutWrapContainer"> 
                <InstallOrderMentWrap>
                <Header history={this.props.history} {...obj} Back={this.handleBack}></Header>
                <LineBanner {...obj}></LineBanner>
                <div className="InsContainer Ic_1">
                    <div className="I_tit">
                        <img className="pan_Innel_ul_img" src="images/icon_ddang@2x.png" srcSet="images/icon_ddang@2x.png 2x, images/icon_ddang@3x.png 3x" alt=""/><span>订单信息</span>
                    </div>
                    <div className="detailmsg">
                        <div className="flexbiner"> 
                            <div className="detul">设备名称</div>
                            <div className="equipmentmsg">{eqName}</div>
                        </div>
                        <div className="flexbiner"> 
                            <div className="detul">设备价格</div>
                            <div className="equipmentmsg">{this.state.equipPrice}</div>
                        </div>
                    </div>
                </div>
                <div className="InsContainer Ic_2">
                    <div className="I_tit">
                        <img className="pan_Innel_ul_img" src="images/icon_fenqi@2x.png" srcSet="images/icon_fenqi@2x.png 2x, images/icon_fenqi@3x.png 3x" alt=""/><span>分期信息</span>
                    </div>
                    <div className="detailmsg"> 
                        <div className="flexbiner"> 
                            <div className="detul">分期金额</div>
                            <div className="equipmentmsg">{this.state.loanAmt}元</div>
                        </div>
                        <div className="flexbiner"> 
                            <div className="detul">分期期数</div>
                            <div className="equipmentmsg">{this.state.periods}</div>
                        </div>
                        <div className="flexbiner"> 
                            <div className="detul">还款金额</div>
                            <div className="equipmentmsg">{this.state.repayAmt}</div>
                        </div>
                        <div className="flexbiner"> 
                            <div className="detul">首期还款日</div>
                            <div className="equipmentmsg">{this.state.firstRepayDate}</div>
                        </div>  
                        <div className="flexbiner"> 
                            <div className="detul">逾期罚息</div>
                            <div className="equipmentmsg">逾期本金*0.05*逾期天数</div>
                        </div> 
                    </div>
                </div>
                <div className="seeRpdetail" onClick={()=>this.props.history.push('/RepayPlan')}>
                    还款计划详情<img className="pan_Innel_ul_img" src="images/DisclosureIndicator@2x.png" srcSet="images/DisclosureIndicator@2x.png 2x, images/DisclosureIndicator@3x.png 3x" alt=""/>
                </div>
                
                {/* 顶高 */}
                <div style={{height:'186px',width:'100%',backgroundColor:'rgb(249, 249, 249)'}}></div>
                <div className="fixbtn"> 
                    <Buttonsub history={this.props.history} {...obj} Submit={this.handleSubmit}></Buttonsub>
                </div>
                </InstallOrderMentWrap>
            </div>
        );
    }
}

export default OrderPassSubmit;
