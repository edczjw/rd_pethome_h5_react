import React, { Component } from 'react';
import {RepayPlanWrap} from './styleRepayPlan'
import Header from '../../components/Header/Header';
import LineBanner from '../../components/lineBanner/LineBanner'; 
import { Toast,Modal} from 'antd-mobile';
import axios from '../../assests/js/request';
import Storage from '../../assests/js/Storage';
/**
 * 还款计划(可以进行还款操作)
 */
const alert = Modal.alert;
class MoveRepayPlan extends Component {
    // 构造器
    constructor(props){
        super(props)
        // 数据data
        this.state={  
            RealRpList: [],
        }
        this.handleBack= this.handleBack.bind(this)
    };

    componentDidMount(){  
        this.getAllDetail()
    }
    
  
    //获取分期借款还款计划
    async getAllDetail(){ 
        Toast.loading('正在更新...',10);
        var mchNo = Storage.get('mchNo'); 
        let res = await axios.getFenQiRplan({ mchNo}); 
        if(res.code === '0000'){  
            Toast.hide();
            this.setState({ 
                RealRpList:res.data.repayPlanList
            })
        } else{
            Toast.hide();
            Toast.info(res.msg, 3);
        }
    } 
    //返回引导页
    handleBack(){ 
        this.props.history.push('/AccountInsOrder')
    }

    //还款
    LoanRpay(repayAmt,repayTerm){ 
        alert('', <div className="alrtBox">
            <div className="alrtTit">还款确认</div>
            <div className="alrtdesc">请确认已向以下还款账户完成还款金额的转账</div>
            <div className="alrtFlex">
                <p>开户行</p><span>浙江网商银行</span>
            </div><div className="alrtFlex">
                <p>户名</p><span>广州仁东互联网小额贷款有限公司</span>
            </div><div className="alrtFlex">
                <p>账号</p><span>{Storage.get('wsAccount')}</span>
            </div>
        </div>, [
            { text: '返回', onPress: () => console.log('取消') },
            { text: '确认并还款', onPress: async () => { 
                Toast.loading('正在还款中...',10);
                var mchNo = Storage.get('mchNo'); 
                let res = await axios.SubmitSign({ mchNo,repayAmt,repayTerm}); 
                if(res.code === '0000'){  
                    Toast.hide();
                    //3秒更新列表
                    Toast.info('还款申请提交成功，请稍后查看还款结果。', 6, ()=>{ 
                        //更新列表
                        this.getAllDetail()
                    }); 
                } else{
                    Toast.hide();
                    Toast.info(res.msg, 3);
                }
            }},
          ])
        
    }
    render() {
        let obj={
            if_show_arr_lft:true,//是否显示左上角返回键
            title:'还款计划',//页面标题
            desc:'请留意还款时间，按时还款',//描述
            ft_concat:'',//签署合同名称
            ft_text:"",//按钮文案
            ftshow:false,//是否显示底部按钮
            ftColor:false,//是否需要白色背景
        }
        // 0-待还款，1-已还款，2-还款中
        let li = this.state.RealRpList.map((item,index)=>{
            return <li key={index}>
                <div className="lfli">
                    <div className="rpiner_top">还款金额 {item.shouldRepayAmt} 元</div>
                    <div className="rpiner_btm">还款日{item.shouldRepayDate} / 第{item.shouldRepayTerm}期</div>
                </div>
                {
                    (()=>{switch (item.shouldRepayStatus) {
                        case 0:
                            return <div className="rgtli" onClick={()=>{
                                this.LoanRpay(item.shouldRepayAmt,item.shouldRepayTerm)
                            }}>  
                            {
                                item.overdueFlag === 0?'去还款':<span style={{color: '#FF3334'}}>逾期-去还款</span>
                            }
                                <img className="pan_Innel_ul_img" src="images/DisclosureIndicator.png" srcSet="images/DisclosureIndicator@2x.png 2x, images/DisclosureIndicator@3x.png 3x" alt=""/>
                            </div>
                            break;
                        case 1:
                            return <div className="rgtli">  
                            <img className="pan_Innel_ul_img1" src="images/cion_yhk@2x.png" srcSet="images/cion_yhk@2x.png 2x, images/cion_yhk@3x.png 3x" alt=""/>
                        </div>
                            break;
                        case 2:
                            return <div className="rgtli">还款中...</div>
                            break;
                    
                        default:
                            break;
                    } })()
                } 
                </li>
        })
        return (
            <div className="OutWrapContainer" style={{backgroundColor:'#F9F9F9'}}>
                <RepayPlanWrap>
                <Header history={this.props.history} {...obj} Back={this.handleBack}></Header>
                    <LineBanner {...obj}></LineBanner> 
                    <div className="RpNum">
                        <ul>
                            {li}
                        </ul>
                    </div>
                </RepayPlanWrap>
            </div>
        );
    }
}

export default MoveRepayPlan;
