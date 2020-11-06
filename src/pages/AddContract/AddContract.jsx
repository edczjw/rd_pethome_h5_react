import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import Buttonsub from '../../components/button_submit/Buttonsub' 
import {StyleAddContract} from './StyleAddContract';
import { Toast,InputItem,Picker } from 'antd-mobile';
import CustomChildren from '../../components/ShengShiQuPicker/CustomChildren' 
import QsActionPop from '../../components/ShengShiQuPicker/QsActionPop' 
import StActionPop from '../../components/ShengShiQuPicker/StActionPop' 
import ActionPopQs from '../../components/ShengShiQuPicker/ActionPopQs' 
import ActionPopSoc from '../../components/ShengShiQuPicker/ActionPopSoc' 
import axios from '../../assests/js/request';
import Storage from '../../assests/js/Storage';

/**
 * 添加联系人
 */
 
class AddContract extends Component {
    // 构造器
    constructor(props){
        super(props)
        // 数据data
        this.state={   
            showBtn:true,//是否显示底部按钮
            pickerValue1: [],
            pickerValue2: [],
            showqspop:false,//显示亲属关系
            showsocpop:false, 
            Qinshu:'',//亲属值
            Socity:'',//社会值
            popList:[],//空数组   

            directContactAddressArea:'',	//string直系联系人居住地区
            directContactAddressCity:'',	//string直系联系人居住地市
            directContactAddressDetail:'',	//string直系联系人居住地详细地址
            directContactAddressProvince:'',	//string直系联系人居住地省
            directContactMobile:'',	//string直系联系人手机号
            directContactName:'',	//string直系联系人姓名
            directContactRelation:'',	//integer($int32)直系联系人关系 1-配偶 2-父母 3-子女
            mchNo:'',	//string商户编号
            otherContactAddressArea:'',	//string其他联系人居住地区
            otherContactAddressCity:'',	//string其他联系人居住地市
            otherContactAddressDetail:'',	//string其他联系人居住地详细地址
            otherContactAddressProvince:'',	//string其他联系人居住地省
            otherContactMobile:'',	//string其他联系人手机号
            otherContactName:'',	//string其他联系人姓名
            otherContactRelation:'',	//integer($int32)其他联系人关系 4-亲戚 5-同事 6-朋友 7-其他 
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleBack = this.handleBack.bind(this) 
    };  
    //提交联系人信息
    async handleSubmit(){ 
        var mchNo = Storage.get('mchNo')  
        this.setState(
            //防止异步不更新数据
            Object.assign({}, { 
                mchNo:mchNo
             }),async ()=> {   
                 if(this.ifNull()){ 
                    let res = await axios.subContractInfo(this.state); 
                    if(res.code === '0000'){ 
                        Toast.info('提交成功', 3,()=>{
                            this.props.history.push('/InsMentOrderSubmit')
                        });
                    }else{ 
                        Toast.info(res.msg, 3);
                    }
                 }
            }
        )  
    }
    //判断是否有空
    ifNull(){
        if(this.state.directContactRelation === ''){  
            Toast.info('请选择亲属关系', 3);
            return false
        }
        else if(this.state.directContactName === ''){ 
            Toast.info('请填写直系亲属姓名', 3);
            return false
        }
        else if(this.state.directContactMobile === ''){ 
            Toast.info('请填写直系亲属手机号码', 3);
            return false
        }
        else if(this.state.directContactAddressProvince === ''){ 
            Toast.info('请选择直系亲属居住地址', 3);
            return false
        }
        else if(this.state.directContactAddressDetail === ''){ 
            Toast.info('请填写直系亲属详细居住地址', 3);
            return false
        }
        else if(this.state.otherContactRelation === ''){ 
            Toast.info('请选择其他联系人关系', 3);
            return false
        }
        else if(this.state.otherContactName === ''){ 
            Toast.info('请选择其他联系人关系', 3);
            return false
        }
        else if(this.state.otherContactMobile === ''){ 
            Toast.info('请填写其他联系人手机号码', 3);
            return false
        }
        else if(this.state.otherContactAddressProvince === ''){ 
            Toast.info('请填写其他联系人居住地址', 3);
            return false
        }
        else if(this.state.otherContactAddressDetail === ''){ 
            Toast.info('请填写其他联系人详细居住地址', 3);
            return false
        }else{
            return true
        } 
    }
    //打开亲属pop
    handleQinShu(){  
        this.setState({
            showqspop:true,
            popList:[
                {
                    index:1,
                    value:'配偶'
                },
                {
                    index:2,
                    value:'父母'
                },
                {
                    index:3,
                    value:'子女'
                }
            ]
        })
    }
    //打开社会关系pop
    handleSoc(){ 
        this.setState({
            showsocpop:true,
            popList:[
                {
                    index:4,
                    value:'亲戚'
                },
                {
                    index:5,
                    value:'同事'
                },
                {
                    index:6,
                    value:'朋友'
                },
                {
                    index:7,
                    value:'同学'
                }
            ]
        })
    }

    //关闭弹窗pop
    setQsSwpop=()=>{ 
        this.setState({
            showqspop:false
        })
    }
    setSocSwpop=()=>{ 
        this.setState({
            showsocpop:false
        })
    }
    //子组件传过来的值
    getQsMsg = (result, msg,value) => { 
        this.setState({
            directContactRelation:msg,
            Qinshu:value
        })
    }
    getSocMsg = (result, msg,value) => { 
        this.setState({
            otherContactRelation:msg,
            Socity:value
        })
    }
    //修改修改输入框的值
    txtChanged(e,name){    
        switch (name) {
            case 'directContactName':
                this.setState({
                    directContactName:e
                })
                break;
            case 'directContactMobile': 
                this.setState({
                    directContactMobile:e
                })
                break;
            case 'directContactAddressDetail':
                this.setState({
                    directContactAddressDetail:e
                }) 
                break;  
            case 'otherContactName':
                this.setState({
                    otherContactName:e
                }) 
                break;  
            case 'otherContactMobile':
                this.setState({
                    otherContactMobile:e
                }) 
                break;  
            case 'otherContactAddressDetail':
                this.setState({
                    otherContactAddressDetail:e
                }) 
                break; 
            default:
                break;
        } 
    }
    
    //亲属---选择省市区进行拆分
    setDirect1(v){ 
        var directContactAddressProvince = v[0]
        var directContactAddressCity = v[1]
        var directContactAddressArea = v[2]  
        this.setState({ 
            directContactAddressProvince:directContactAddressProvince,
            directContactAddressCity:directContactAddressCity,
            directContactAddressArea:directContactAddressArea
        })
    }
    //其他---选择省市区进行拆分
    setDirect2(v){ 
        var otherContactAddressProvince = v[0]
        var otherContactAddressCity = v[1]
        var otherContactAddressArea = v[2]  
        this.setState({ 
            otherContactAddressProvince:otherContactAddressProvince,
            otherContactAddressCity:otherContactAddressCity,
            otherContactAddressArea:otherContactAddressArea
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
        if(type==='directContactName' && this.state.directContactName.length>0 ){
            if(!/^([\u4E00-\u9FA5])*$/.test(this.state.directContactName)){ 
                Toast.info('请输入中文姓名', 3);
                this.setState({directContactName:''});
            }
        }else if(type==='directContactMobile' && this.state.directContactMobile.length>0 ){
            if(!/^(1[3-9])\d{9}$/.test(this.state.directContactMobile)){  
                Toast.info('请输入正确格式的手机号码', 3);
                this.setState({directContactMobile:''});
            }
        }else if(type==='otherContactName' && this.state.otherContactName.length>0 ){
            if(!/^([\u4E00-\u9FA5])*$/.test(this.state.otherContactName)){ 
                 Toast.info('请输入中文姓名', 3);
                 this.setState({otherContactName:''});
                }
        }else if(type==='otherContactMobile' && this.state.otherContactMobile.length>0 ){
            if(!/^(1[3-9])\d{9}$/.test(this.state.otherContactMobile)){ 
                 Toast.info('请输入正确格式的手机号码', 3);
                 this.setState({otherContactMobile:''});
                }
        }
    }
    render() { 
        let obj={
            if_show_arr_lft:true,//是否显示左上角返回键
            title:'添加联系人',//页面标题
            desc:'请填写使用本人身份证登记开通的手机号。',//描述
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
            <div className="OutWrapContainer"  style={{backgroundColor:'#F9F9F9',height:'auto'}}>
                <StyleAddContract>
                <Header history={this.props.history} {...obj} Back={this.handleBack}></Header>

                    {/* 亲属关系弹框 */}  
                    <ActionPopQs parent={this} myList={this.state.popList} showpopkk = {this.state.showqspop} setShowpop={this.setQsSwpop}></ActionPopQs>  

                    {/* 社会关系 */}
                    <ActionPopSoc parent={this} myList={this.state.popList} showpopkk = {this.state.showsocpop} setShowpop={this.setSocSwpop}></ActionPopSoc>  

                    <div className="addlinebin">需填写全部两个联系人信息</div>
                    <div className="Add_inputAll">  
                        <QsActionPop 
                        extra='请选择关系'
                        value={this.state.Qinshu}
                        onClick={()=>{this.handleQinShu()}}
                        >亲属关系</QsActionPop>
                        <InputItem 
                            placeholder="请输入真实姓名" 
                            clear
                            onBlur={()=>this.validBlur('directContactName')}
                            onFocus={()=>this.setState({showBtn:false})} 
                            value={this.state.directContactName}
                            onChange={ e => this.txtChanged(e,'directContactName') }
                        >姓名</InputItem>
                        <InputItem 
                            placeholder="请输入正确格式手机号码" 
                            clear
                            onBlur={()=>this.validBlur('directContactMobile')}
                            onFocus={()=>this.setState({showBtn:false})} 
                            type='number' 
                            maxLength='11'
                            value={this.state.directContactMobile}
                            onChange={ e => this.txtChanged(e,'directContactMobile') }
                        >手机号</InputItem> 
                        <Picker
                            title="选择地区"
                            extra=""
                            data={antdDistrict}
                            value={this.state.pickerValue1}
                            onChange={v => this.setDirect1(v)}
                            onOk={v => this.setState({ pickerValue1: v })}
                            onClick={()=>{console.log('xx')}}
                        >
                            <CustomChildren>居住地址</CustomChildren>
                        </Picker>
                        <InputItem 
                            placeholder="请精确填写至门牌号" 
                            clear
                            onBlur={()=>this.setState({showBtn:true})}
                            onFocus={()=>this.setState({showBtn:false})} 
                            value={this.state.directContactAddressDetail}
                            onChange={ e => this.txtChanged(e,'directContactAddressDetail') }
                        >详细地址</InputItem>   
                    </div> 
                    
                    <div className="Add_inputAll"> 
                        <StActionPop 
                        extra='请选择关系'
                        value={this.state.Socity}
                        onClick={()=>{this.handleSoc()}}
                        >社会关系</StActionPop>
                        <InputItem 
                            placeholder="请输入真实姓名" 
                            clear
                            onBlur={()=>this.validBlur('otherContactName')}
                            onFocus={()=>this.setState({showBtn:false})} 
                            value={this.state.otherContactName}
                            onChange={ e => this.txtChanged(e,'otherContactName') }
                        >联系人姓名</InputItem>
                        <InputItem 
                            placeholder="请输入正确格式手机号码" 
                            clear
                            onBlur={()=>this.validBlur('otherContactMobile')}
                            onFocus={()=>this.setState({showBtn:false})} 
                            type='number' 
                            maxLength='11'
                            value={this.state.otherContactMobile}
                            onChange={ e => this.txtChanged(e,'otherContactMobile') }
                        >手机号</InputItem> 
                        <Picker
                            title="选择地区"
                            extra=""
                            data={antdDistrict}
                            value={this.state.pickerValue2}
                            onChange={v => this.setDirect2(v)}
                            onOk={v => this.setState({ pickerValue2: v })}
                            onClick={()=>{console.log('xx')}}
                        >
                            <CustomChildren>居住地址</CustomChildren>
                        </Picker>
                        <InputItem 
                            placeholder="请精确填写至门牌号" 
                            clear
                            onBlur={()=>this.setState({showBtn:true})}
                            onFocus={()=>this.setState({showBtn:false})} 
                            value={this.state.otherContactAddressDetail}
                            onChange={ e => this.txtChanged(e,'otherContactAddressDetail') }
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
                </StyleAddContract>
            </div>
        );
    }
}

export default AddContract;
