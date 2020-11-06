import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import {AppResultWrap} from './styleAppResult'
import Storage from '../../assests/js/Storage'; 
import axios from '../../assests/js/request';
import { Toast } from 'antd-mobile';
/**
 * 正在审批中
 */
function translateRem(pxValue) {
    const ratio = 37.5; // 根据项目配置比例的方式自行设定
    // pxValue = parseInt(pxValue); 
    return pxValue / ratio + 'rem';
} 
class ArDoing extends Component {
    constructor(props){
        super(props)
        this.state={
            periods:'',//期数
            loanAmt:'',//分期金额
        }
        this.handleBack=this.handleBack.bind(this)
    }
    componentDidMount(){ 
        this.getrpDetail()
    } 
    //获取还款试算接口
    async getrpDetail(){  
        var mchNo = Storage.get('mchNo');
        var tryCalAmt = Storage.get('loanAmt');
        var commitStatus = 'Y'
        let res = await axios.getRepayDetail({ mchNo,tryCalAmt,commitStatus}); 
        if(res.code === '0000'){ 
            Storage.set('playList',JSON.stringify(res.data.playList))
            this.setState({ 
                loanAmt:res.data.loanAmt,//	stringexample: 5000分期金额
                periods:res.data.periods,//	stringexample: 6 期分期期数
            })
        } else{ 
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
            if_show_arr_lft:false,//是否显示左上角返回键
            title:'审批中',//页面标题
            desc:'请填写使用本人身份证登记开通的手机号。',//描述
            ft_concat:'委托授权书',//签署合同名称
            ft_text:"提交",//按钮文案
            ftshow:false,//是否显示底部按钮
            ftColor:false,//是否需要白色背景
        }
        //格式化设备名称
        let eqName = Storage.get('equipName').split(',').map((item,index)=>{
            return <div style={{lineHeight: translateRem(20) }} key={index}>{item}</div> 
        })
        return (
            <div className="OutWrapContainer">
                <AppResultWrap>
                <Header history={this.props.history} {...obj} Back={this.handleBack}></Header>
                    <div className="apr_container"> 
                        <img className="doing_img" src="images/icon_shengpi.png" srcSet="images/icon_shengpi@2x.png 2x, images/icon_shengpi@3x.png 3x" alt=""/>

                        <div className="checking">审批中...</div>
                        <div className="descing">您有可能会收到号码为 16600456837; 16600457029; 18526103256 申请确认电话。请您留意</div>
                        {/* <div className="gorpmsgbtn btn_sg" onClick={()=>this.handleBack()}>我知道了</div> */}

                        <div className="equip_detail">
                            <ul>
                                <li>设备名称
                                    <span>{eqName}</span>
                                </li>
                                <li>设备价格
                                    <span>{parseInt(Storage.get('equipPrice')).toFixed(2)}元</span>
                                </li>
                                <li>分期金额
                                    <span>{parseInt(this.state.loanAmt).toFixed(2)}元</span>
                                </li>
                                <li>分期期数
                                    <span>{this.state.periods}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </AppResultWrap> 
            </div>
        );
    }
}

export default ArDoing;
