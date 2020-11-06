import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import Buttonsub from '../../components/button_submit/Buttonsub'
import LineBanner from '../../components/lineBanner/LineBanner';
import { EntranceWrap } from './styleEntrancePage'; 
import axios from '../../assests/js/request';
import { Toast,Modal } from 'antd-mobile';
import UrlParam from '../../assests/js/addressParameter';
import Storage from '../../assests/js/Storage';
/**
 * 引导页
 */
const alert = Modal.alert;
class EntrancePage extends Component {
    // 构造器
    constructor(props) {
        super(props)
        // 数据data
        this.state = {
            outerProcessNo:'',//贷款客户请求流水号
            merchantNo:'',//商编号
            equipName:'/',//设备名称
            equipPrice:'/',//设备价格
            loanAmt:0,//分期金额
            firstPayAmt:0,//首付款金额
            btnWan:'立即申请'
        }
        this.changeMsgBtn = this.changeMsgBtn.bind(this)
        this.handleBtn = this.handleBtn.bind(this)
    };
    //生命周期 使用异步
    async componentDidMount() { 
        //获取outerProcessNo merchantNo 
        var outerProcessNo = UrlParam.getParams('outerProcessNo', this.props.location.search) 
        var merchantNo = UrlParam.getParams('merchantNo', this.props.location.search) 
        var partnerNo = UrlParam.getParams('partnerNo', this.props.location.search) 
        var loanAmt = UrlParam.getParams('loanAmt', this.props.location.search) 
        var firstPayAmt = UrlParam.getParams('firstPayAmt', this.props.location.search) 
        var sign = UrlParam.getParams('sign', this.props.location.search)
        var timestamp = UrlParam.getParams('timestamp', this.props.location.search)
        var loanTerm = UrlParam.getParams('loanTerm', this.props.location.search)
        var productNo = UrlParam.getParams('productNo', this.props.location.search)

        //存进缓存中
        Storage.set('outerProcessNo',outerProcessNo)
        Storage.set('mchNo',merchantNo)
        Storage.set('partnerNo',partnerNo)
        Storage.set('loanAmt',loanAmt)
        Storage.set('sign',sign) 
        Storage.set('timestamp',timestamp) 
        Storage.set('loanTerm',loanTerm)  
        Storage.set('firstPayAmt',firstPayAmt)  

        //H5验签校验
        let res = await axios.H5SignCheck({firstPayAmt,loanAmt,merchantNo,partnerNo,outerProcessNo,sign,timestamp,loanTerm})  
        if(res.code === '0000'){   
            //验签通过则调用其他接口
            this.handleBtn()
            this.getEquipMsg(outerProcessNo,loanAmt,firstPayAmt) 
        }else{ 
            Toast.info(res.msg, 0);
        }
    }  
     
    //根据状态切换按钮文案
    changeMsgBtn(){
        this.props.history.push('/Enterprise')
    }

    //调用获取设备信息接口 
    async getEquipMsg(outerProcessNo,loanAmt,firstPayAmt){
        let res = await axios.getEquipment({outerProcessNo}) 

        if(res.code === '0000'){  
            Storage.set('equipName',res.data.equipName)
            Storage.set('equipPrice',res.data.equipPrice) 
            // 修改数据
            this.setState({
                equipName:res.data.equipName,
                equipPrice:res.data.equipPrice,
                loanAmt:loanAmt,
                firstPayAmt:firstPayAmt
            }) 
        }else{ 
            Toast.info(res.msg, 3);
        }
    }

    //取消申请
    async CancelLoaning(){
        var mchNo = Storage.get('mchNo') 
        let res = await axios.cancelLoan({mchNo})
        if(res.code === '0000'){
            Toast.info('取消成功', 3);
            this.setState({
                btnWan:'立即申请'
            })
        }else{ 
            Toast.info(res.msg, 3);
        }
    }
    //点击跳转查询节点
    async handleBtn(){ 
        var mchNo = Storage.get('mchNo') 
        //调用获取节点流程信息接口
        let res = await axios.getProcess({mchNo}) 

        /**
         * 先判断是否已存在贷款  有弹窗提示  无再判断是否在途贷款  跳转页面
         */
        if(res.code === '0000'){  
            //判断是否存在在贷
            if(res.data.existOnLoaning === 'N'){ 
                //判断是否存在在途
                    if(res.data.existOnGoing === 'Y'){ 
                        this.setState({
                            btnWan:'继续申请'
                        })  

                        if(res.data.nextPoint === 9){
                            Storage.set('outerProcessNo',res.data.outerProcessNo) 
                            alert('', '您当前有一笔审批中的申请，请等待审批结果', [
                                // { text: '取消', onPress: () => console.log('取消') },
                                { text: '查看详情', onPress: () => this.props.history.push('/ArDoing')},
                            ])
                        }else{
                        alert('', '您当前有一笔审批中的申请，是否继续申请？', [
                            { text: '取消当前申请', onPress: () => {
                                this.CancelLoaning()
                            } },
                            { text: '继续申请', onPress: () => {  
                                Storage.set('outerProcessNo',res.data.outerProcessNo)  
                                /**
                                 * （1-企业信息 2-企业信息补充 3-经营信息 4-身份证OCR及活体认证 5-申请人信息 6-添加银行卡 7-添加联系人 8-提交审批 9-(特殊)审批中页面) 10-(特殊)待签约页面 11-(特殊)审批拒绝页面 12-(特殊)已签约分期订单页面
                                 */
                                switch (res.data.nextPoint) {  
                                    case 2:
                                        this.props.history.push('/EnterSupport')
                                        break;
                                    case 3:
                                        this.props.history.push('/BusinessMsg')
                                        break; 
                                    case 4:
                                        this.props.history.push('/LiveTestOcr')
                                        break; 
                                    case 5:
                                        this.props.history.push('/ApplicationPeo')
                                        break; 
                                    case 6:
                                        this.props.history.push('/BankListMsg')
                                        break; 
                                    case 7:
                                        this.props.history.push('/AddContract')
                                        break;
                                    case 8:
                                        this.props.history.push('/InsMentOrderSubmit')
                                        break;
                                    case 9:
                                        this.props.history.push('/ArDoing')
                                        break;
                                    case 10:
                                        this.props.history.push('/OrderPassSubmit')
                                        break;
                                    case 12:
                                        this.props.history.push('/AccountInsOrder')
                                        break;
                                    default:
                                        break;
                                }}},
                          ])  
                        }
                    }else{ 
                        this.setState({
                            btnWan:'立即申请'
                        })
                        /**
                         * （1-企业信息 2-企业信息补充 3-经营信息 4-身份证OCR及活体认证 5-申请人信息 6-添加银行卡 7-添加联系人 8-提交审批 9-(特殊)审批中页面) 10-(特殊)待签约页面 11-(特殊)审批拒绝页面 12-(特殊)已签约分期订单页面
                         */
                        switch (res.data.nextPoint) { 
                            case 11:
                                /**
                                * 拒绝原因和拒绝时间
                                */
                                Storage.set('closeExpireTime',res.data.closeExpireTime)
                                Storage.set('rejectReason',res.data.rejectReason)
                                this.props.history.push('/ArFail')
                                break;
                            default:
                                break;
                        }
                    }
            }else{ 
                Storage.set('outerProcessNo',res.data.outerProcessNo) 
                alert('', '您当前有一笔设备分期还款中', [
                    // { text: '取消', onPress: () => console.log('取消') },
                    { text: '查看详情', onPress: () => this.props.history.push('/AccountInsOrder')},
                  ])
            }
        }else{ 
            Toast.info(res.msg, 3);
        }
    }

render() {
    let obj = {
        if_show_arr_lft: false,//是否显示左上角返回键
        title: '设备分期申请',//页面标题
        desc: '即将申请广州仁东互联网小额贷款有限公司的贷款产品。仅接受企业法人申请，请如实提供企业信息。',//描述
        ft_concat: '征信查询授权',//签署合同名称
        ft_concat1:'信息采集及使用授权',
        c1:1,//对应ft_concat1
        c2:2,//对应ft_concat
        ft_text: this.state.btnWan,//按钮文案
        ftshow: true,//是否显示底部按钮
    }
    let eqName = this.state.equipName.split(',').map((item,index)=>{
        return <div key={index}>{item}</div> 
    })
    return (
        <div className="OutWrapContainer">
            <EntranceWrap>
                <Header {...obj}></Header>
                <LineBanner {...obj}></LineBanner>
                <div className="panelBox">
                    <div className="panelBox_Htop">
                        <div className="panelBox_Htop_title">
                            <img className="panelBox_Htop_img" src="images/icon_fenqi@2x.png" srcSet="images/icon_fenqi@2x.png 2x, images/icon_fenqi@3x.png 3x" alt="" />
                                分期设备信息
                            </div>
                        <ul className="pan_Innel pan_In_line">
                            <li>设备名称<span>
                                {eqName}
                            </span></li>
                            <li>设备价格<span>{this.state.equipPrice}</span></li>
                            <li>首付款金额<span>{parseInt(this.state.firstPayAmt).toFixed(2)}元</span></li>
                            <li>分期金额<span>{parseInt(this.state.loanAmt).toFixed(2)}元</span></li>
                        </ul>

                        <div className="panelBox_Htop_title">
                            申请中将需要您提供以下相关资料
                            </div>
                        <ul className="pan_Innel_ul">
                            <li><img className="pan_Innel_ul_img" src="images/icon_xz.png" srcSet="images/icon_xz@1.5x.png 1.5x,images/icon_xz@2x.png 2x, images/icon_xz@3x.png 3x" alt="" />企业营业执照等证照信息</li>
                            <li><img className="pan_Innel_ul_img" src="images/icon_xz.png" srcSet="images/icon_xz@1.5x.png 1.5x,images/icon_xz@2x.png 2x, images/icon_xz@3x.png 3x" alt="" />法人身份证件信息</li>
                            <li><img className="pan_Innel_ul_img" src="images/icon_xz.png" srcSet="images/icon_xz@1.5x.png 1.5x,images/icon_xz@2x.png 2x, images/icon_xz@3x.png 3x" alt="" />企业经营信息</li>
                            <li><img className="pan_Innel_ul_img" src="images/icon_xz.png" srcSet="images/icon_xz@1.5x.png 1.5x,images/icon_xz@2x.png 2x, images/icon_xz@3x.png 3x" alt="" />法人相关其他联系信息</li>
                        </ul>
                    </div>
                <div className="fixbtn1"> 
                <Buttonsub history={this.props.history} {...obj} Submit={this.changeMsgBtn}></Buttonsub></div>
                </div>
            </EntranceWrap>
        </div>
    );
}
}

export default EntrancePage;
