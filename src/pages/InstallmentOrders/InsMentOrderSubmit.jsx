import React, { Component } from 'react';
import {InstallOrderMentWrap} from './styleInstallOrderMent'
import Header from '../../components/Header/Header';
import Buttonsub from '../../components/button_submit/Buttonsub';
import LineBanner from '../../components/lineBanner/LineBanner'; 
import axios from '../../assests/js/request';
import Storage from '../../assests/js/Storage';
import { Toast } from 'antd-mobile';

/**
 * 分期订单提交审批
 */

function translateRem(pxValue) {
    const ratio = 37.5; // 根据项目配置比例的方式自行设定
    // pxValue = parseInt(pxValue); 
    return pxValue / ratio + 'rem';
} 
class InsMentOrderSubmit extends Component {
    constructor(props){
        super(props)
        this.state=({ 
            equipName:'',//设备名称
            equipPrice:'',//设备价格
            loanTerm:null,//期数
            productNo:'',//	string产品编号  
            downPayAmt:'',//	stringexample: 2000.00元首付款金额
            firstRepayDate:'',//	stringexample: 2020年09月20日首期还款日
            handleDate:'',//	stringexample: 2020年09月20日办理时间
            loanAmt:'',//	stringexample: 5000分期金额
            periods:'',//	stringexample: 6 期分期期数
            playList:[],//还款详情列表
            repayAmt:'',//	stringexample: 20000 / 期还款金额

        })
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleBack = this.handleBack.bind(this) 
    }

    componentDidMount(){
        var loanTerm = Storage.get('loanTerm') 
        if(loanTerm === '6'){ 
            this.setState(
                //防止异步不更新数据
                Object.assign({}, { 
                    loanTerm:loanTerm,
                    productNo:'P0010',
                    equipName:Storage.get('equipName'),
                    equipPrice:Storage.get('equipPrice')
                 }),async ()=> {    
                    this.getrpDetail() 
                }
            )  
        }else if(loanTerm === '12'){ 
            this.setState(
                //防止异步不更新数据
                Object.assign({}, { 
                    loanTerm:loanTerm,
                    productNo:'P0011',
                    equipName:Storage.get('equipName'),
                    equipPrice:Storage.get('equipPrice')
                 }),async ()=> {    
                    this.getrpDetail() 
                }
            )  
        }
    }  

    //获取还款试算接口
    async getrpDetail(){ 
        const {productNo} = this.state
        var mchNo = Storage.get('mchNo');
        var tryCalAmt = Storage.get('loanAmt');
        var commitStatus = 'N'
        let res = await axios.getRepayDetail({ mchNo,productNo,tryCalAmt,commitStatus}); 
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
 
    //提交审批
    async handleSubmit(){ 
        // 将期数和分期金额存入缓存  便于其他页面获取显示
        Storage.set('loanAmt',this.state.loanAmt)
        Storage.set('periods',this.state.periods)

        var mchNo = Storage.get('mchNo')  
        var productNo = this.state.productNo
        let res = await axios.SubmitCheck({mchNo,productNo}); 
        if(res.code === '0000'){ 
            this.props.history.push('/ArDoing')
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
            title:'分期订单审批',//页面标题 
            desc:'请确认当前申请的设备分期信息',//描述
            ft_concat:'委托授权书',//签署合同名称
            ft_text:"提交审批",//按钮文案
            ftshow:false,//是否显示底部按钮合同
            ftColor:false,//是否需要白色背景
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
                            <div className="equipmentmsg">{parseInt(this.state.equipPrice).toFixed(2)}元</div>
                        </div>
                    </div>
                </div>
                <div className="InsContainer Ic_2">
                    <div className="I_tit">
                        <img className="pan_Innel_ul_img" src="images/icon_fenqi@2x.png" srcSet="images/icon_fenqi@2x.png 2x, images/icon_fenqi@3x.png 3x" alt=""/><span>分期信息</span>
                    </div>
                    <div className="detailmsg">
                        <div className="flexbiner"> 
                            <div className="detul">首付款金额</div>
                            <div className="equipmentmsg">{this.state.downPayAmt}</div>
                        </div>
                        <div className="flexbiner"> 
                            <div className="detul">分期金额</div>
                            <div className="equipmentmsg">{parseInt(this.state.loanAmt).toFixed(2)}元</div>
                        </div>
                        <div className="flexbiner"> 
                            <div className="detul">还款金额</div>
                            <div className="equipmentmsg">{this.state.repayAmt}</div>
                        </div>
                        <div className="flexbiner"> 
                            <div className="detul">办理时间</div>
                            <div className="equipmentmsg">{this.state.handleDate}</div>
                        </div>
                        <div className="flexbiner"> 
                            <div className="detul">首期还款日</div>
                            <div className="equipmentmsg">{this.state.firstRepayDate}</div>
                        </div> 
                        <div className="flexbiner vflik"> 
                            <div className="detul">分期期数</div>
                            <div className="equipmentmsg ">
                                {this.state.loanTerm}期
                            </div>
                        </div>
                    </div>
                </div>
                <div className="seeRpdetail"  onClick={()=>this.props.history.push('/RepayPlan')}>
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

export default InsMentOrderSubmit;
