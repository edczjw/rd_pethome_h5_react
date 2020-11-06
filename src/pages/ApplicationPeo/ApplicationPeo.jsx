import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import Buttonsub from '../../components/button_submit/Buttonsub'
import LineBanner from '../../components/lineBanner/LineBanner'; 
import {ApplicationPeoWrap} from './styleApplicationPeo';
import { Toast,InputItem,Picker } from 'antd-mobile';
import CustomChildren from '../../components/ShengShiQuPicker/CustomChildren'
import axios from '../../assests/js/request';
import Storage from '../../assests/js/Storage';

/**
 * 申请人信息
 */
 
class ApplicationPeo extends Component {
    // 构造器
    constructor(props){
        super(props)
        // 数据data
        this.state={  
            showBtn:true,//是否显示底部按钮
            pickerValue: [],
            pickerHunyinValue: [],
            addressArea:'',	//string居住地区 
            addressCity:'',	//string居住地市 
            addressDetails:'',	//string 居住地详细地址 
            addressProvince:'',	//string居住地省 
            maritalStatus:'',	//integer($int32)婚姻状态 1-已婚 2-未婚 3-离异 4-丧偶 
            mchNo:'',	//string商户编号 
            mobile:'',	//string手机号
        }
        //注意这里！！！处理子组件调用父组件的方法this指向问题
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleBack = this.handleBack.bind(this)
    };
     
    //修改输入框的值
    txtChanged(e,name){ 
        switch (name) {
            case 'mobile':
                this.setState({
                    mobile:e
                })
                break;
            case 'addressDetails': 
                this.setState({
                    addressDetails:e
                })
                break;
            default:
                break;
        } 
    }
    
    //判断是否有空
    ifNull(){
        if(this.state.mobile === ''){  
            Toast.info('请填入手机号', 3);
            return false
        }
        else if(this.state.maritalStatus === ''){ 
            Toast.info('请选择婚姻状况', 3);
            return false
        }
        else if(this.state.addressProvince === ''){ 
            Toast.info('请选择居住地址', 3);
            return false
        }
        else if(this.state.addressDetails === ''){ 
            Toast.info('请输入居住详细地址', 3);
            return false
        }else{
            return true
        } 
    }
     
    //提交申请人信息
    async handleSubmit(){  
        var mchNo = Storage.get('mchNo')  
        this.setState(
            //防止异步不更新数据
            Object.assign({}, { 
                mchNo:mchNo
             }),async ()=> {   
                 if(this.ifNull()){ 
                    let res = await axios.submitApply(this.state); 
                    if(res.code === '0000'){ 
                        Toast.info('提交成功', 3,()=>{
                            this.props.history.push('/BankListMsg')
                        });
                        
                    }else{ 
                        Toast.info(res.msg, 3);
                    }
                 }
            }
        )  
    }
    //选择婚姻
    setHunYin(v){ 
        console.log(v[0]);
        this.setState({ 
            maritalStatus:v[0]
        })
    }
    //选择省市区进行拆分
    setDirect(v){ 
        var busAddressProvince = v[0]
        var busAddressCity = v[1]
        var busAddressArea = v[2]  
        this.setState({ 
            addressProvince:busAddressProvince,
            addressCity:busAddressCity,
            addressArea:busAddressArea,
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
        if(type==='mobile' && this.state.mobile.length>0 ){
            if(!/^(1[3-9])\d{9}$/.test(this.state.mobile))
            { 
                Toast.info('请输入正确格式手机号', 3);
                this.setState({mobile:''});
            } 
        }
    }
    render() {
        let obj={
            if_show_arr_lft:true,//是否显示左上角返回键
            title:'申请人信息',//页面标题
            desc:'请填写使用本人身份证登记开通的手机号。',//描述
            ft_concat:'委托授权书',//签署合同名称
            ft_text:"提交",//按钮文案
            ftshow:false,//是否显示底部按钮
            ftColor:false,//是否需要白色背景
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
 
        //引入单列婚姻状态并赋值
        let HunYinList = []
        let HunYinData = require('../../assests/js/HunYin');  
        Object.keys(HunYinData).forEach((index)=>{
            let itemLevel1 ={}; 
            itemLevel1.value = HunYinData[index].StatusIndex;
            itemLevel1.label = HunYinData[index].label; 
            HunYinList.push(itemLevel1)
        });  

        return (
            <div className="OutWrapContainer"  style={{backgroundColor:'#F9F9F9'}}>
                <ApplicationPeoWrap>
                    <Header history={this.props.history} {...obj} Back={this.handleBack}></Header>
                    <LineBanner {...obj}></LineBanner>  
                    <div className="inputAll">
                        <InputItem 
                            placeholder="请输入本人实名手机号码" 
                            clear
                            name="mobile" 
                            type='number'
                            maxLength="11"
                            onBlur={()=>this.validBlur('mobile')}
                            onFocus={()=>this.setState({showBtn:false})} 
                            value={this.state.mobile}
                            onChange={ e => this.txtChanged(e,'mobile') } 
                        >手机号</InputItem>  
                        <Picker
                            title="选择婚姻状况"
                            extra=""
                            cols={1}
                            data={HunYinList}
                            value={this.state.pickerHunyinValue}
                            onChange={v => this.setHunYin(v)}
                            onOk={v => this.setState({ pickerHunyinValue: v })}
                            onClick={()=>{console.log('xx')}}
                        >
                            <CustomChildren>婚育状况</CustomChildren>
                        </Picker>
                        <Picker
                            title="选择地区"
                            extra=""
                            data={antdDistrict}
                            value={this.state.pickerValue}
                            onChange={v => this.setDirect(v)}
                            onOk={v => this.setState({ pickerValue: v })}
                            onClick={()=>{console.log('xx')}}
                        >
                            <CustomChildren>居住地址</CustomChildren>
                        </Picker>
                        <InputItem 
                            placeholder="请精确填写至门牌号" 
                            clear
                            onBlur={()=>this.setState({showBtn:true})}
                            onFocus={()=>this.setState({showBtn:false})}
                            name="addressDetails" 
                            value={this.state.addressDetails}
                            onChange={ e => this.txtChanged(e,'addressDetails') } 
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
                </ApplicationPeoWrap>
            </div>
        );
    }
}

export default ApplicationPeo;
