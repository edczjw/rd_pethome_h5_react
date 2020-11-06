import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import Buttonsub from '../../components/button_submit/Buttonsub';
import { Enteroutwrap } from './styleEnterprise';
import { Toast,List, InputItem } from 'antd-mobile';
import axios from '../../assests/js/request';
import Storage from '../../assests/js/Storage';
import {compress} from '../../assests/js/Exif'
import EXIF from "exif-js"

/**
 * 企业信息页
 */
class Enterprise extends Component {
    constructor(props){
        super(props);
        this.state = {
            showBtn:true,//是否显示底部按钮
            showCon:false,//是否显示下半部分
            busiCertificateUrl:'',//营业执照url
            animalTreatUrl:'',//动物诊疗许可证url

            //存放营业执照识别相关信息 
            mchNo:'',//商户编号
            outerProcessNo:'',//贷款客户请求流水号
            address:'',//营业执照识别地址
            applyAmt:0,//申请金额
            firstPayAmt:0,//首付款金额
            business:'',//经营范围
            composingForm:'',//形成形式
            hospitalName:'',//医院名称 
            legal:'',//法定代表人
            mchName:'',//企业名称
            mainType:'',//主体类型
            name:'',//公司名称
            period:'',//营业期限
            organCode:'',//注册号或统一社会信用代码 
        }
        //react创建input的ref
        this.fileInputEl1 = React.createRef();
        this.fileInputEl2 = React.createRef();

        //注意这里！！！处理子组件调用父组件的方法this指向问题
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleBack = this.handleBack.bind(this) 
    }
    //上传营业执照
    upChangephoto1(e){ 
        let file = e.target.files || e.dataTransfer.files; 
        file.length && this.imgPreview(file[0],'business')
    }
    // 上传动物许可证
    upChangephoto2(e){
        if(this.state.busiCertificateUrl === ''){ 
            Toast.info('请先上传营业执照', 3);
        }else{ 
            let file = e.target.files || e.dataTransfer.files; 
            file.length && this.imgPreview(file[0],'animal')
        }
    }
 
    //调用接口
    imgPreview(file,type){  
        var imageBase64 = ''
        let Orientation
        // 去获取拍照时的信息，解决拍出来的照片旋转问题
        EXIF.getData(file, function () {
            Orientation = EXIF.getTag(this, 'Orientation')
        })
        if(file && window.FileReader && /^image/.test(file.type)){
            console.log('读取图片',file.name);
            let fileReader = new FileReader();
            fileReader.readAsDataURL(file) // file为第一个文件
            fileReader.onload = ()=>{
                var img = new Image()
                img.src = fileReader.result // reader.result为获取结果  
                imageBase64 = img.src.substring(img.src.indexOf(",") + 1)

                //判断图片长度  是否压缩 是否小于2M,是就直接上传，反之压缩图片
                if (fileReader.result.length <= (2048 * 1024)) { 
                    this.controllUploadApi(type,imageBase64)
                } else {
                    img.onload = ()=> {
                        let data = compress(img, Orientation);
                        var headerImage = data.substring(data.indexOf(",") + 1);
                        this.controllUploadApi(type,headerImage)
                    }
                } 
            }
        }  
    }

    async controllUploadApi(type,imageBase64){  
        Toast.loading('上传中...',8);
        var outerProcessNo = Storage.get('outerProcessNo') 
        if(type === 'business'){ 
            //上传营业执照
            let res = await axios.uploadLicense({outerProcessNo,imageBase64})  
            if(res.code === '0000'){ 
                Toast.hide();
                Toast.info('识别成功', 3);
                this.setState({
                    showCon:true, 
                    loanTerm:null,
                    address:res.data.address,//营业执照识别地址
                    busiCertificateUrl:res.data.imageUrl,//营业执照url 
                    business:res.data.business,//经营范围
                    composingForm:res.data.composingForm,//形成形式
                    hospitalName:res.data.hospitalName,//医院名称 
                    legal:res.data.legal,//法定代表人
                    mchName:res.data.name,//企业名称
                    mainType:res.data.mainType,//主体类型 
                    period:res.data.period,//营业期限
                    organCode:res.data.regNum,//注册号或统一社会信用代码 
                })
            }else{ 
                Toast.hide();
                this.setState({
                    showCon:false,
                    busiCertificateUrl:'', 
                    address:'',//营业执照识别地址
                    busiCertificateUrl:'',//营业执照url 
                    business:'',//经营范围
                    composingForm:'',//形成形式
                    hospitalName:'',//医院名称 
                    legal:'',//法定代表人
                    mchName:'',//企业名称
                    mainType:'',//主体类型 
                    period:'',//营业期限
                    organCode:'',//注册号或统一社会信用代码 
                }) 
                Toast.info(res.msg, 3);
            }
        }else if(type === 'animal'){
            //上传动物许可证
            let res = await axios.uploadAnimal({imageBase64}) 
            if(res.code === '0000'){ 
                Toast.hide();
                Toast.info('上传成功', 3);
                this.setState({
                    showCon:true,
                    animalTreatUrl:res.data.imageUrl,
                    data:res.data
                })
            }else{
                Toast.hide();
                Toast.info(res.msg, 3);
                this.setState({
                    showCon:false,
                    animalTreatUrl:'',
                    data:{}
                }) 
            }
        }
    }

    //修改修改输入框的值
    txtChanged(e,name){    
        switch (name) {
            case 'mchName':
                this.setState({
                    mchName:e
                })
                break;
            case 'organCode': 
                this.setState({
                    organCode:e
                })
                break;
            case 'business':
                this.setState({
                    business:e
                }) 
                break;
            case 'legal':
                this.setState({
                    legal:e
                }) 
                break;
            case 'hospitalName':
                this.setState({
                    hospitalName:e
                }) 
                break; 
            default:
                break;
        } 
    }

    //提交企业信息
    async handleSubmit(){  
        var mchNo = Storage.get('mchNo')  
        this.setState(
            //防止异步不更新数据
            Object.assign({}, { 
                mchNo:mchNo,
                loanTerm:Storage.get('loanTerm'),
                outerProcessNo:Storage.get('outerProcessNo'),
                applyAmt:Storage.get('loanAmt'),
                firstPayAmt:Storage.get('firstPayAmt')
             }),async ()=> {   
                 if(this.ifNull()){ 
                    let res = await axios.SubmitBusiness(this.state); 
                    if(res.code === '0000'){
                        console.log('提交成功');
                        this.props.history.push('/EnterSupport')
                    }else{ 
                        Toast.info(res.msg, 3);
                    }
                 }
            }
        )  
    }
    //判断是否有空
    ifNull(){
        if(this.state.busiCertificateUrl === ''){  
            Toast.info('请上传营业执照', 3);
            return false
        }
        else if(this.state.animalTreatUrl === ''){ 
            Toast.info('请上传动物诊疗许可证', 3);
            return false
        }
        else if(this.state.mchName === ''){ 
            Toast.info('企业名称不能为空', 3);
            return false
        }
        else if(this.state.organCode === ''){ 
            Toast.info('注册号不能为空', 3);
            return false
        }
        else if(this.state.business === ''){ 
            Toast.info('经营范围不能为空', 3);
            return false
        }
        else if(this.state.legal === ''){ 
            Toast.info('法人代表不能为空', 3);
            return false
        }else{
            return true
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

    //校验
    validBlur(type){
        this.setState({showBtn:true});
        if(type==='legal' && this.state.legal.length>0 ){
            if(!/^([\u4E00-\u9FA5])*$/.test(this.state.legal)){ 
                Toast.info('请输入中文姓名', 3);
                this.setState({legal:''});
            } 
        }
    }

    render() {
        let obj={
            if_show_arr_lft:true,//是否显示左上角返回键
            title:'企业信息认证',//页面标题 
            ft_concat:'委托授权书',//签署合同名称
            ft_text:"提交",//按钮文案
            ftshow:false,//是否显示底部按钮
        }
        return (
            <div className="OutWrapContainer"> 
                <Header history={this.props.history} {...obj} Back={this.handleBack}></Header>
                <Enteroutwrap> 
                    <div className="linbinmsg">
                        <img src="images/tips.png" srcSet="images/tips@1.5x.png 1.5x,images/tips@2x.png 2x, images/tips@3x.png 3x" alt=""/>您正在申请仁东小贷的贷款产品。
                    </div>
                    <div className="enter_contain">
                        <label className='tan_label'>上传企业证件信息</label>
                        <div className="uploadimg">
                            <div className="uplod_fk">  
                                <input 
                                    type="file" 
                                    ref={this.fileInputEl1}	//挂载ref
                                    accept="image/*" 
                                    hidden  //隐藏
                                    name="file1"  
                                    onChange={(e)=>this.upChangephoto1(e)}
                                />
                                {/* 触发input上传 */}
                                <a  onClick={() => {
                                    this.fileInputEl1.current.click()		//当点击a标签的时候触发事件 
                                }} 
                                >
                                    {
                                        this.state.busiCertificateUrl === ''?
                                        <img src="images/idcard_yyzz@1x.png" srcSet="images/idcard_yyzz@2x.png 2x, images/idcard_yyzz@3x.png 3x" alt=""/>: 
                                        <div className="resetUpload">
                                            <img className="realimg" src={this.state.busiCertificateUrl} alt=""/>  
                                            <img className="rsimg" src="images/iconCard.png" srcSet="images/iconCard@2x.png 2x, images/iconCard@3x.png 3x" alt=""/>
                                            <div className="resetUploadmsg">重新上传<span style={{color: '#3291FF'}}>营业执照</span></div>
                                        </div>
                                    }
                                </a>
                            </div>
                            <div className="uplod_fk"> 
                                <input 
                                    type="file" 
                                    ref={this.fileInputEl2}	//挂载ref
                                    accept="image/*" 
                                    hidden  //隐藏
                                    name="file1" 
                                    onChange={(e)=>this.upChangephoto2(e)}
                                />
                                {/* 触发input上传 */}
                                <a  onClick={() => {
                                    this.fileInputEl2.current.click()		//当点击a标签的时候触发事件 
                                }} 
                                >
                                    {
                                        this.state.animalTreatUrl === ''?
                                        <img src="images/idcard_dwzj@1x.png" srcSet="images/idcard_dwzj@2x.png 2x, images/idcard_dwzj@3x.png 3x" alt=""/>: 
                                        <div className="resetUpload">
                                            <img className="realimg" src={this.state.animalTreatUrl} alt=""/>  
                                            <img className="rsimg" src="images/iconCard.png" srcSet="images/iconCard@2x.png 2x, images/iconCard@3x.png 3x" alt=""/>
                                            <div className="resetUploadmsg">重新上传<span style={{color: '#3291FF'}}>动物诊疗许可证</span></div>
                                        </div>
                                    }
                                </a>
                            </div>
                        </div>
                        
                        <div className="edit_mg">
                            {
                                this.state.showCon === true? 
                                <div>
                                <List renderHeader={() => '企业名称'}> 
                                    <InputItem 
                                        clear
                                        name="mchName"
                                        placeholder="请输入企业名称" 
                                        value={this.state.mchName}
                                        onBlur={()=>this.setState({showBtn:true})}
                                        onFocus={()=>this.setState({showBtn:false})}
                                        onChange={ (e) => this.txtChanged(e,'mchName') }
                                    ></InputItem> 
                                </List>
                                <List renderHeader={() => '注册号（或统一社会信用代码）'}>
                                    <InputItem 
                                        clear
                                        name="organCode"
                                        maxLength='18'
                                        onBlur={()=>this.setState({showBtn:true})}
                                        onFocus={()=>this.setState({showBtn:false})}
                                        value={this.state.organCode}
                                        placeholder="请输入注册号（或统一社会信用代码）"
                                        onChange={ e => this.txtChanged(e,'organCode') } 
                                    ></InputItem> 
                                </List>
                                <List renderHeader={() => '经营场所'}>
                                    <InputItem 
                                        clear
                                        name="address"
                                        onBlur={()=>this.setState({showBtn:true})}
                                        onFocus={()=>this.setState({showBtn:false})}
                                        value={this.state.address}
                                        placeholder="请输入经营场所" 
                                        onChange={ e => this.txtChanged(e,'address') }
                                    ></InputItem> 
                                </List>
                                <List renderHeader={() => '法人'}>
                                    <InputItem 
                                        clear
                                        name="legal"
                                        onBlur={()=>this.validBlur('legal')}
                                        onFocus={()=>this.setState({showBtn:false})}
                                        value={this.state.legal}
                                        placeholder="请输入法人" 
                                        onChange={ e => this.txtChanged(e,'legal') }
                                    ></InputItem> 
                                </List>
                                <List renderHeader={() => '医院名称'}>
                                    <InputItem 
                                        disabled
                                        onBlur={()=>this.setState({showBtn:true})}
                                        onFocus={()=>this.setState({showBtn:false})}
                                        name="hospitalName"
                                        value={this.state.hospitalName}
                                        placeholder="请输入医院名称" 
                                        onChange={ e => this.txtChanged(e,'hospitalName') }
                                    ></InputItem> 
                                </List></div>:null
                            }
                        </div>
                    </div>
                    {
                        this.state.showBtn? 
                        <div className="fixbtn"> 
                            <Buttonsub history={this.props.history} {...obj} Submit={this.handleSubmit}></Buttonsub>
                        </div>:<div className="fixbtn1"> 
                            <Buttonsub history={this.props.history} {...obj} Submit={this.handleSubmit}></Buttonsub>
                        </div>
                    }
                </Enteroutwrap>
            </div>
        );
    }
}

export default Enterprise;
