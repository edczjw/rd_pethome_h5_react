import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import Buttonsub from '../../components/button_submit/Buttonsub';
import { BankAllWrap } from './styleBankAll'
import { Toast,InputItem } from 'antd-mobile';
import axios from '../../assests/js/request';
import Storage from '../../assests/js/Storage';
import GetCode from '../../components/DaojishiYzm/GetCode'

/**
 * 银行卡信息填写
 */

function translateRem(pxValue) {
    const ratio = 37.5; // 根据项目配置比例的方式自行设定
    // pxValue = parseInt(pxValue); 
    return pxValue / ratio + 'rem';
} 
const customIcon = () => (
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',paddingTop:translateRem(13),paddingLeft:translateRem(28),paddingRight:translateRem(28),paddingBottom:translateRem(6)}}> 
    <img style={{width:translateRem(40),height:'auto',objectFit:'fill'}} src="images/Ion_Success.png" alt=""/> 
    <span style={{fontFamily: 'PingFangSC-Regular',fontSize: '16px',marginTop:translateRem(14)}}>提交成功</span>
    </div>
  );
class BankListMsg extends Component {
    // 构造器
    constructor(props) {
        super(props)
        // 数据data
        this.state = {
            showBtn:true,//是否显示底部按钮
            nameFormate: '',//格式化的姓名
            idNoFormate: '',//格式化的身份证
            name: '',//姓名
            idNo: '',//身份证号码
            bankName:'',//银行卡名字
            cardNo:'',//	string银行卡号 
            mchNo:'',//	string商户编号
            mobile:'',//	string银行预留手机号 
            requestNo:'',//	string绑卡请求号, 绑卡鉴权返回的参数
            validateCode:'',//	string短信验证码
        }
        this.LookBankList = this.LookBankList.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleBack = this.handleBack.bind(this)  
    };

    componentDidMount() {
        this.getNameIdno() 
    } 
     
    //获取借款人姓名和身份证进行反显
    async getNameIdno() { 
        var mchNo = Storage.get('mchNo')
        let res = await axios.getApplyMsg({ mchNo })
        if (res.code === '0000') {
            var nameFormate = ''
            var idNoFormate = ''
            if ((res.data.name).length <= 3) {
                nameFormate = '*' + (res.data.name).substring(1, (res.data.name).length);
                nameFormate = nameFormate.substr(0, 1) + ' ' + nameFormate.substr(1, nameFormate.length);
            } else if (3 < nameFormate(res.data.name).length < 6) {
                nameFormate = '**' + (res.data.name).substring(2, (res.data.name).length);
            }
            idNoFormate = (res.data.idNo).replace(/(.{4}).*(.{4})/, "$1**********$2");
            idNoFormate = idNoFormate.substr(0, 4) + ' ' + idNoFormate.substr(4, 5) + ' ' + idNoFormate.substr(5, 5) + ' ' + idNoFormate.substr(14, 18);

            this.setState({
                nameFormate: nameFormate,
                idNoFormate:idNoFormate,
                name: res.data.name,
                idNo: res.data.idNo,
                mchNo:mchNo
            })
        } else { 
            Toast.info(res.msg, 3);
        }

    }

    //跳转至银行卡支持列表
    LookBankList() {
        this.props.history.push('/SupportBankList')
    }

    //提交银行卡信息
    async handleSubmit(){   
        if(this.ifNull()){  
            const {bankName,cardNo,idNo,mchNo,mobile,name,requestNo,validateCode} = this.state
            let res = await axios.subMitBank({bankName,cardNo,idNo,mchNo,mobile,name,requestNo,validateCode}); 
            if(res.code === '0000'){  
                Toast.info(customIcon(), 3,()=>{
                    this.props.history.push('/AddContract')
                })  
            }else{ 
                Toast.info(res.msg, 3);
            }
        } 
    }
    //判断是否有空
    ifNull(){
        if(this.state.cardNo === ''){  
            Toast.info('请填写银行卡', 3);
            return false
        }
        else if(this.state.mobile === ''){ 
            Toast.info('请填写手机号', 3);
            return false
        }
        else if(this.state.bankName === ''){ 
            Toast.info('请获取正确的验证码', 3);
            return false
        }
        else if(this.state.validateCode === ''){ 
            Toast.info('请填写验证码', 3);
            return false
        }else{
            return true
        } 
    }

    //接收子组件获取验证码获得的requestNo&bankName
    getDetail=(data)=>{
        this.setState({
            bankName:data.bankName,
            requestNo:data.requestNo
        })
    }

    //修改修改输入框的值
    txtChanged(e,name){    
        switch (name) {
            case 'cardNo':
                this.setState({
                    cardNo:e
                })
                break;
            case 'mobile': 
                this.setState({
                    mobile:e
                })
                break;
            case 'validateCode':
                this.setState({
                    validateCode:e
                }) 
                break; 
            default:
                break;
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
        this.props.history.push('/EntrancePage?outerProcessNo='+outerProcessNo+'&loanTerm='+loanTerm+'&partnerNo='+partnerNo+'&firstPayAmt='+firstPayAmt+'&loanAmt='+loanAmt+'&merchantNo='+merchantNo)
    }
    //校验
    validBlur(type){
        this.setState({showBtn:true});
        if(type==='cardNo' && this.state.cardNo.length>0){ 
            if(!/^(\d{16}|\d{17}|\d{18}|\d{19})$/.test(this.state.cardNo)){ 
                Toast.info('请输入正确格式的银行卡号码', 3);
                this.setState({cardNo:''})
            } 
        }else if(type==='mobile' && this.state.mobile.length>0){
            if(!/^(1[3-9])\d{9}$/.test(this.state.mobile)){ 
                Toast.info('请输入正确格式的手机号码', 3);
                this.setState({mobile:''});
            }
        }
    }
    render() {
        let obj = {
            if_show_arr_lft: true,//是否显示左上角返回键
            title: '银行卡',//页面标题
            desc: '',//描述
            ft_concat: '委托扣款授权书',//签署合同名称
            c2:3,
            ft_text: "提交",//按钮文案
            ftshow: true,//是否显示底部合同
            ftColor: true,//是否需要底部白色背景
        }
        return (
            <div className="OutWrapContainer" style={{ backgroundColor: '#F9F9F9' }}>
                <BankAllWrap>
                <Header history={this.props.history} {...obj} Back={this.handleBack}></Header>
                    <div className="bk_linbaner">
                        <div style={{ color: '#AAAAAA' }}>*该银行卡用于贷款发放及收款</div>
                        <div className="SeeBkSupport" onClick={() => this.LookBankList()}>查看支持银行<img src="images/Icon_Informations_Blue@2x.png" srcSet="images/Icon_Informations_Blue@2x.png 2x, images/Icon_Informations_Blue@3x.png 3x" alt="" /></div>
                    </div>

                    <div className="bk_input">
                        <InputItem
                            placeholder="请输入持卡人姓名"
                            clear
                            disabled
                            value={this.state.nameFormate}
                        >持卡人</InputItem>
                        <InputItem
                            placeholder="请输入持卡人身份证号码"
                            clear
                            disabled
                            value={this.state.idNoFormate}
                        >身份证</InputItem>
                        <InputItem
                            placeholder="请输入正确格式的银行卡卡号"
                            clear
                            maxLength='19'
                            onFocus={()=>this.setState({showBtn:false})} 
                            value={this.state.cardNo}
                            onBlur={()=>this.validBlur('cardNo')}
                            onChange={ e => this.txtChanged(e,'cardNo') }
                        >卡号</InputItem>
                    </div>
                    <div className="bk_input">
                        <InputItem
                            placeholder="请输入正确格式的持卡人手机号"
                            clear
                            type='number'
                            maxLength='11'
                            onFocus={()=>this.setState({showBtn:false})} 
                            value={this.state.mobile}
                            onBlur={()=>this.validBlur('mobile')}
                            onChange={ e => this.txtChanged(e,'mobile') }
                        >手机号</InputItem>
                        <InputItem
                            placeholder="请输入6位数字验证码" 
                            maxLength='6'
                            type='number'
                            onBlur={()=>this.validBlur('validateCode')}
                            onFocus={()=>this.setState({showBtn:false})} 
                            value={this.state.validateCode}
                            onChange={ e => this.txtChanged(e,'validateCode') }
                        >验证码
                        <GetCode msg={this.state} getDetail={this.getDetail}></GetCode></InputItem>
                    </div>
                    {
                        this.state.showBtn? 
                        <div className="fixbtn"> 
                            <Buttonsub history={this.props.history} {...obj} Submit={this.handleSubmit}></Buttonsub>
                        </div>:<div className="fixbtn1"> 
                            <Buttonsub history={this.props.history} {...obj} Submit={this.handleSubmit}></Buttonsub>
                        </div>
                    }
                </BankAllWrap>
            </div>
        );
    }
}

export default BankListMsg;
