import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import Buttonsub from '../../components/button_submit/Buttonsub';
import LineBanner from '../../components/lineBanner/LineBanner'; 
import {BusinessMsgWrap} from './styleBusinessMsg';
import { Toast,InputItem,Picker } from 'antd-mobile';
import CustomChildren from '../../components/ShengShiQuPicker/CustomChildren'
import axios from '../../assests/js/request';
import Storage from '../../assests/js/Storage';

/**
 * 经营信息
 */
class BusinessMsg extends Component {
    // 构造器
    constructor(props){
        super(props)
        // 数据data
        this.state={  
            showBtn:true,//是否显示底部按钮
            pickerValue: [],//存放经营地址
            mchNo:'',	//string商户编号
            busAddressArea:'',	//string经营地址区
            busAddressCity:'',	//string经营地址市
            busAddressDetail:'',	//string详细经营地址
            busAddressProvince:'',	//string经营地址省
            busLimit:'',	//number经营年限不能为空
            doctorCount:'',	//integer($int32)医生数量
            monthlyConsumablePurchases:'',	//number月均耗材采购额
            monthlyDrugPurchases:'',	//number月均药品采购额
            monthlyIncome:'',	//number月均收入
            otherPerCount:'',	//integer($int32)其他人员数量
        }
        //注意这里！！！处理子组件调用父组件的方法this指向问题
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleBack = this.handleBack.bind(this)
    } 
    //修改修改输入框的值
    txtChanged(e,name){ 
        switch (name) {
            case 'busLimit':
                this.setState({
                    busLimit:e
                })
                break;
            case 'doctorCount': 
                this.setState({
                    doctorCount:e
                })
                break;
            case 'otherPerCount':
                this.setState({
                    otherPerCount:e
                }) 
                break;
            case 'monthlyIncome':
                this.setState({
                    monthlyIncome:e
                }) 
                break;
            case 'monthlyDrugPurchases':
                this.setState({
                    monthlyDrugPurchases:e
                }) 
                break; 
            case 'monthlyConsumablePurchases':
                this.setState({
                    monthlyConsumablePurchases:e
                }) 
                break;
            case 'busAddressDetail':
                this.setState({
                    busAddressDetail:e
                }) 
                break;
            default:
                break;
        } 
    }
    
    //判断是否有空
    ifNull(){
        if(this.state.busLimit === ''){  
            Toast.info('请填入经营年限', 3);
            return false
        }
        else if(this.state.doctorCount === ''){ 
            Toast.info('请输入医生数量', 3);
            return false
        }
        else if(this.state.otherPerCount === ''){ 
            Toast.info('请输入其他人员数量', 3);
            return false
        }
        else if(this.state.monthlyIncome === ''){ 
            Toast.info('请输入月均收入', 3);
            return false
        }
        else if(this.state.monthlyDrugPurchases === ''){ 
            Toast.info('请输入月均药品采购额', 3);
            return false
        }
        else if(this.state.monthlyConsumablePurchases === ''){ 
            Toast.info('请输入月均耗材采购额', 3);
            return false
        }
        else if(this.state.busAddressProvince === ''){ 
            Toast.info('请选择经营地址（省市区）', 3);
            return false
        }
        else if(this.state.busAddressDetail === ''){ 
            Toast.info('请输入详细地址', 3);
            return false
        }else{
            return true
        } 
    }
     
    //提交经营信息
    async handleSubmit(){  
        var mchNo = Storage.get('mchNo')  
        this.setState(
            //防止异步不更新数据
            Object.assign({}, { 
                mchNo:mchNo
             }),async ()=> {   
                 if(this.ifNull()){ 
                    let res = await axios.submitBusinessMsg(this.state); 
                    if(res.code === '0000'){ 
                        Toast.info('提交成功', 3,()=>{
                            this.props.history.push('/LiveTestOcr')
                        });
                        
                    }else{ 
                        Toast.info(res.msg, 3);
                    }
                 }
            }
        )  
    }
    //选择省市区进行拆分
    setDirect(v){
        var busAddressProvince = v[0]
        var busAddressCity = v[1]
        var busAddressArea = v[2] 
        this.setState({ 
            busAddressProvince:busAddressProvince,
            busAddressCity:busAddressCity,
            busAddressArea:busAddressArea,
            pickerValue:v,
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
 
    //校验
    validBlur(type){
        this.setState({showBtn:true});
        if(type==='busLimit' && this.state.busLimit.length>0){
            if(!/((^[1-9]\d*)|^0)(\.\d{0,1}){0,1}$/.test(this.state.busLimit)){   
                Toast.info('只限输入一位小数', 3);
                this.setState({busLimit:''});
        }
        }else if(type==='doctorCount' && this.state.doctorCount.length>0 ){
            if(!/^[1-9]\d*$/.test(this.state.doctorCount)){  
                Toast.info('请输入整数', 3);
                this.setState({doctorCount:''});
        }
        }else if(type==='otherPerCount' && this.state.otherPerCount.length>0){
            if(!/^[1-9]\d*$/.test(this.state.otherPerCount)){  
                Toast.info('请输入整数', 3);
                this.setState({otherPerCount:''});
        }
        }else if(type === 'monthlyIncome' && this.state.monthlyIncome.length>0){
            if(!/((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/.test(this.state.monthlyIncome)){  
                Toast.info('请输入正确格式金额', 3);
                this.setState({monthlyIncome:''});
        }
        }else if(type === 'monthlyDrugPurchases' && this.state.monthlyDrugPurchases.length>0){
            if(!/((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/.test(this.state.monthlyDrugPurchases)){  
                Toast.info('请输入正确格式金额', 3);
                this.setState({monthlyDrugPurchases:''});
        }
        }else if(type === 'monthlyConsumablePurchases' && this.state.monthlyConsumablePurchases.length>0){
            if(!/((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/.test(this.state.monthlyConsumablePurchases)){  
                Toast.info('请输入正确格式金额', 3);
                this.setState({monthlyConsumablePurchases:''});
        }
        }
    }
    render() {
        let obj={
            if_show_arr_lft:true,//是否显示左上角返回键
            title:'经营信息填写',//页面标题
            desc:'请如实填写医院的经营情况。',//描述
            ft_concat:'委托授权书',//签署合同名称
            ft_text:"下一步",//按钮文案
            ftshow:false,//是否显示底部按钮
            ftColor:true,//是否需要白色背景
        }
        let antdDistrict =[];
        //引入省市区js
        let districtData = require('../../assests/js/area'); 
        Object.keys(districtData).forEach((index)=>{
            let itemLevel1 ={};
            let itemLevel2 ={};
            itemLevel1.value = districtData[index].name;
            itemLevel1.label = districtData[index].name;
            itemLevel1.children = [];
            let data = districtData[index].cities;
            Object.keys(data).forEach((index)=>{
                itemLevel2.value = data[index].name;
                itemLevel2.label = data[index].name;
                itemLevel2.children = [];
                let data2 = data[index].districts;
                let itemLevel3 ={};
                itemLevel3.children = [];
                Object.keys(data2).forEach((index)=>{
                    itemLevel3.value = data2[index];
                    itemLevel3.label = data2[index];
                    itemLevel2.children.push(itemLevel3);
                    itemLevel3 ={};
                });
                itemLevel1.children.push(itemLevel2);
                itemLevel2 ={};
            });
            antdDistrict.push(itemLevel1)
        }); 


        return (
            <div className="OutWrapContainer"  style={{backgroundColor:'#F9F9F9'}}>
                <BusinessMsgWrap>
                    <Header history={this.props.history} {...obj} Back={this.handleBack}></Header>
                    <LineBanner {...obj}></LineBanner>  
                    <div className="inputAll">
                        <InputItem 
                            placeholder="请输入经营年限" 
                            clear
                            onBlur={()=>this.validBlur('busLimit')}
                            onFocus={()=>this.setState({showBtn:false})}
                            type='money'
                            name="busLimit" 
                            value={this.state.busLimit}
                            onChange={ e => this.txtChanged(e,'busLimit') } 
                        >经营年限(年)</InputItem>
                        <InputItem 
                            placeholder="请输入医生数量" 
                            clear
                            onBlur={()=>this.validBlur('doctorCount')}
                            onFocus={()=>this.setState({showBtn:false})}
                            type='money'
                            disabledKeys={['.']}
                            name="doctorCount" 
                            value={this.state.doctorCount}
                            onChange={ e => this.txtChanged(e,'doctorCount') } 
                        >医生数量</InputItem>
                        <InputItem 
                            placeholder="请输入其他人员数量" 
                            clear
                            onBlur={()=>this.validBlur('otherPerCount')}
                            onFocus={()=>this.setState({showBtn:false})}
                            type='money'
                            disabledKeys={['.']}
                            name="otherPerCount" 
                            value={this.state.otherPerCount}
                            onChange={ e => this.txtChanged(e,'otherPerCount') } 
                        >其他人员数量</InputItem>
                    </div>
                    <div className="inputAll">
                        <InputItem 
                            placeholder="请输入金额" 
                            clear
                            onBlur={()=>this.validBlur('monthlyIncome')}
                            onFocus={()=>this.setState({showBtn:false})}
                            type='money'
                            name="monthlyIncome" 
                            value={this.state.monthlyIncome}
                            onChange={ e => this.txtChanged(e,'monthlyIncome') } 
                        >月均收入 (元）</InputItem>
                        <InputItem 
                            placeholder="请输入金额" 
                            clear
                            onBlur={()=>this.validBlur('monthlyDrugPurchases')}
                            onFocus={()=>this.setState({showBtn:false})}
                            type='money'
                            name="monthlyDrugPurchases" 
                            value={this.state.monthlyDrugPurchases}
                            onChange={ e => this.txtChanged(e,'monthlyDrugPurchases') } 
                        >月均药品采购额 (元）</InputItem>
                        <InputItem 
                            placeholder="请输入金额" 
                            clear
                            onBlur={()=>this.validBlur('monthlyConsumablePurchases')}
                            onFocus={()=>this.setState({showBtn:false})}
                            type='money'
                            name="monthlyConsumablePurchases" 
                            value={this.state.monthlyConsumablePurchases}
                            onChange={ e => this.txtChanged(e,'monthlyConsumablePurchases') } 
                        >月均耗材采购额 (元）</InputItem>
                    </div>
                    <div className="inputAll">
                        <Picker
                            title="选择地区"
                            extra=""
                            data={antdDistrict}
                            value={this.state.pickerValue}
                            onChange={v => this.setDirect(v)}
                            onOk={v => this.setState({ pickerValue: v })}
                            onClick={()=>{console.log('xx')}}
                        >
                            <CustomChildren>经营地址</CustomChildren>
                        </Picker>
                        <InputItem 
                            placeholder="请精确填写至门牌号" 
                            clear
                            onBlur={()=>this.setState({showBtn:true})}
                            onFocus={()=>this.setState({showBtn:false})}
                            name="busAddressDetail" 
                            value={this.state.busAddressDetail}
                            onChange={ e => this.txtChanged(e,'busAddressDetail') } 
                        >详细地址</InputItem> 
                    </div> 
                    {
                        this.state.showBtn? 
                        <div className="fixbtn"> 
                            <Buttonsub history={this.props.history} {...obj} Submit={this.handleSubmit}></Buttonsub>
                        </div>:<div className="fixbtn1"> 
                            <Buttonsub history={this.props.history} {...obj} Submit={this.handleSubmit}></Buttonsub>
                        </div>
                    }
                </BusinessMsgWrap>
            </div>
        );
    }
}

export default BusinessMsg;
