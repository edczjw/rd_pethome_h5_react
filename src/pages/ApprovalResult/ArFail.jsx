import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import {AppResultWrap} from './styleAppResult'
import Storage from '../../assests/js/Storage'; 
/**
 * 审批拒绝
 */
function translateRem(pxValue) {
    const ratio = 37.5; // 根据项目配置比例的方式自行设定
    // pxValue = parseInt(pxValue); 
    return pxValue / ratio + 'rem';
} 
class ArFail extends Component {
    constructor(props){
        super(props)
        this.state={
            rejectReason:'',//拒绝原因
            closeExpireTime:'',//下次申请时间
        }
        this.handleBack=this.handleBack.bind(this)
    }
    componentDidMount(){
        this.setState({
            rejectReason:Storage.get('rejectReason'),//拒绝原因
            closeExpireTime:Storage.get('closeExpireTime'),//下次申请时间
        })
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
            title:'审批拒绝',//页面标题
            desc:'请填写使用本人身份证登记开通的手机号。',//描述
            ft_concat:'委托授权书',//签署合同名称
            ft_text:"提交",//按钮文案
            ftshow:false,//是否显示底部按钮
            ftColor:false,//是否需要白色背景
        }
        //格式化设备名称
        let eqName = Storage.get('equipName').split(',').map((item,index)=>{
            return <div style={{lineHeight: translateRem(20) }}  key={index}>{item}</div> 
        })
        return (
            <div className="OutWrapContainer">
                <AppResultWrap>
                <Header history={this.props.history} {...obj} Back={this.handleBack}></Header>
                    <div className="apr_container"> 
                        <img className="doing_img" src="images/icon_jjue.png" srcSet="images/icon_jjue@2x.png 2x, images/icon_jjue@3x.png 3x" alt=""/>

                        <div className="checking">审批拒绝</div>
                        <div className="descing">因{this.state.rejectReason}原因，本次申请审核未通过。<br/>您可以在{this.state.closeExpireTime}后再次尝试申请，感谢您的支持。</div>
                        {/* <div className="gorpmsgbtn btn_sg" onClick={()=>this.handleBack()}>我知道了</div> */}

                        <div className="equip_detail">
                            <ul>
                                <li>
                                    设备名称
                                    <span>{eqName}</span>
                                </li>
                                <li>
                                    设备价格
                                    <span>{parseInt(Storage.get('equipPrice')).toFixed(2)}元</span>
                                </li> 
                            </ul>
                        </div>
                    </div>
                </AppResultWrap> 
            </div>
        );
    }
}

export default ArFail;
