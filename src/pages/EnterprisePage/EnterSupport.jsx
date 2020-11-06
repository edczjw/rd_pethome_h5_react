import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import Buttonsub from '../../components/button_submit/Buttonsub';
import { Enteroutwrap } from './styleEnterprise';
import axios from '../../assests/js/request';
import Storage from '../../assests/js/Storage';
import { Toast } from 'antd-mobile';
import {compress} from '../../assests/js/Exif'
import EXIF from "exif-js"

/**
 * 企业信息上传补充
 */
class EnterSupport extends Component {
    constructor(props){
        super(props);
        /**
         * 图片类型 3-职业医师资格证 4-医院门头照片 
         */
        this.state = {
            imageUrl1:'',
            imageUrl2:'',
        }
        //react创建input的ref
        this.fileInputEl1 = React.createRef();
        this.fileInputEl2 = React.createRef(); 

        this.handleBtn = this.handleBtn.bind(this)
        this.handleBack = this.handleBack.bind(this)
    }
    //上传执业医师资格证
    upChangephoto1(e){
        let file = e.target.files || e.dataTransfer.files; 
        file.length && this.imgPreview(file[0],3) 
    }
    // 上传医院门头照片
    upChangephoto2(e){
        let file = e.target.files || e.dataTransfer.files; 
        file.length && this.imgPreview(file[0],4) 
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
        if(type === 3){ 
            //上传职业医师资格证
            let res = await axios.uploadPic({imageBase64})  
            if(res.code === '0000'){ 
                Toast.hide();
                Toast.info('上传成功', 3);
                this.setState({ 
                    imageUrl1:res.data.imageUrl
                })
            }else{  
                Toast.hide();
                Toast.info(res.msg, 3);
            }
        }else if(type === 4){
            //上传医院门头照片
            let res = await axios.uploadPic({imageBase64}) 
            if(res.code === '0000'){ 
                Toast.hide();
                Toast.info('上传成功', 3);
                this.setState({
                    imageUrl2:res.data.imageUrl
                })
            }else{ 
                Toast.hide();
                Toast.info(res.msg, 3);
            }
        }
    }

    //存储两张图片至缓存
    async handleBtn(){     
        this.setState(
            //防止异步不更新数据
            Object.assign({}, { 
                
             }),()=> {     
                 if(this.state.imageUrl1 === '' || this.state.imageUrl2 === ''){
                    Toast.info('两张图片必须上传', 3);
                 }else{  
                     //存缓存
                     Storage.set('imageUrl1',this.state.imageUrl1)
                     Storage.set('imageUrl2',this.state.imageUrl2)
                    this.props.history.push('/EnterSupportHome') 
                 }
            }
        )  
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
            title:'企业信息认证',//页面标题 
            ft_concat:'',//签署合同名称
            ft_text:"下一步",//按钮文案
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
                        <label className='tan_label'>上传企业证件补充信息</label>
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
                                <a href="javascript:void(0)" onClick={() => {
                                    this.fileInputEl1.current.click()		//当点击a标签的时候触发事件 
                                }} 
                                >
                                    {
                                        this.state.imageUrl1 === ''?
                                        <img src="images/idcard_yshi@1x.png" srcSet="images/idcard_yshi@2x.png 2x, images/idcard_yshi.png 3x" alt=""/>:
                                        <div className="resetUpload">
                                            <img className="realimg" src={this.state.imageUrl1} alt=""/>  
                                            <img className="rsimg" src="images/iconCard.png" srcSet="images/iconCard@2x.png 2x, images/iconCard@3x.png 3x" alt=""/>
                                            <div className="resetUploadmsg">重新上传<span style={{color: '#3291FF'}}>执业医师资格证</span></div>
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
                                <a href="javascript:void(0)" onClick={() => {
                                    this.fileInputEl2.current.click()		//当点击a标签的时候触发事件 
                                }} 
                                >
                                    {
                                        this.state.imageUrl2 === ''?
                                        <img src="images/idcard_yyuand@1x.png" srcSet="images/idcard_yyuand@2x.png 2x, images/idcard_yyuand.png 3x" alt=""/>:
                                        <div className="resetUpload">
                                            <img className="realimg" src={this.state.imageUrl2} alt=""/>  
                                            <img className="rsimg" src="images/iconCard.png" srcSet="images/iconCard@2x.png 2x, images/iconCard@3x.png 3x" alt=""/>
                                            <div className="resetUploadmsg">重新上传<span style={{color: '#3291FF'}}>医院门头照片</span></div>
                                        </div>

                                    }
                                </a>
                            </div>
                        </div> 
                    </div>
                    <div className="fixbtn"> 
                        <Buttonsub history={this.props.history} {...obj} Submit={this.handleBtn}></Buttonsub>
                    </div>
                </Enteroutwrap>
            </div>
        );
    }
}

export default EnterSupport;
