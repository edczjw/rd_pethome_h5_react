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
 * 房租合同信息上传补充
 */
function translateRem(pxValue) {
    const ratio = 37.5; // 根据项目配置比例的方式自行设定
    // pxValue = parseInt(pxValue); 
    return pxValue / ratio + 'rem';
}  
const customIcon = (igUrl) => (
    <div style={{overflow:'scroll'}}> 
        <img style={{width:'100%',height:'auto',objectFit:'fill'}} src={igUrl} alt=""/>  
    </div>
  );
class EnterSupportHome extends Component {
    constructor(props){
        super(props);
        /**
         * 图片类型 5-医院房产证明或房屋租赁合同
         */
        this.state = {  
            addList:[]
        }
        this.LoImgList = []
        //react创建input的ref
        this.fileInputEl3 = React.createRef();
        this.handleBtn = this.handleBtn.bind(this)
        this.handleBack = this.handleBack.bind(this)
    } 

    //上传加号
    upChangephoto4(e){
        let file = e.target.files || e.dataTransfer.files; 
        file.length && this.imgPreview(file[0],5) 
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
        if(type === 5){
            //上传医院房产证明或房屋租赁合同
            let res = await axios.uploadPic({imageBase64}) 
            if(res.code === '0000'){ 
                Toast.hide();
                Toast.info('上传成功', 3); 
                this.LoImgList.push({
                    imageUrl:res.data.imageUrl,
                    type:type
                }) 
                this.setState({
                    addList:this.LoImgList
                })
                console.log(this.LoImgList);
            }else{  
                Toast.hide();
                Toast.info(res.msg, 3);
            }
        }
    }

    //跳转至企业经营信息
    async handleBtn(){   
        //获取缓存中的两张图片
        const imageUrl1 = Storage.get('imageUrl1')
        const imageUrl2 = Storage.get('imageUrl2')

        if(!imageUrl1 || !imageUrl2){
            Toast.info('请返回重新上传补件资料', 3,()=>{
                this.props.history.push('/EnterSupport')
            });
            return;
        }else if(this.LoImgList.length === 0){ 
            Toast.info('请上传租赁合同', 3);
            return;
        }

        var _that = this
        var mchNo = Storage.get('mchNo') 
        //添加前两张图片至LoImgList
        this.LoImgList.push({
            imageUrl:imageUrl1,
            type:3
        },{
            imageUrl:imageUrl2,
            type:4
        })
        
        const addList = this.LoImgList 
        //提交企业补充信息
        let res = await axios.submitImgSupport({mchNo,addList}) 
        if(res.code === '0000'){ 
            Toast.info('提交成功', 3,()=>{
                this.props.history.push('/BusinessMsg')
            });
            
        }else{
            Toast.info(res.msg, 3);
        } 
                
    }
    // 删除指定图片
    deleteThisImg(index){
        this.LoImgList.splice(index,1) 
        this.setState(
            //防止异步不更新数据
            Object.assign({}, {  
                addList:this.LoImgList
             }),()=> {      
                Toast.info('成功删除此图片！', 3);
            }
        )  
    }

    //预览图片
    ViewImg(igUrl){ 
        Toast.info(customIcon(igUrl),5,null) 
    }
    //返回引导页
    handleBack(){
        this.props.history.go(-1)
    }
    render() {
        let obj={
            if_show_arr_lft:true,//是否显示左上角返回键
            title:'企业信息认证',//页面标题 
            ft_concat:'',//签署合同名称
            ft_text:"提交",//按钮文案
            ftshow:false,//是否显示底部按钮
        }

        // 上传listimg
        let ImgLi = this.state.addList.map((item,index)=>{
            return (<div key={index}>{   
                item.imageUrl === ''?
                null:<div className="uplod_fk" onClick={()=>{this.ViewImg(item.imageUrl)}} style={{marginBottom:translateRem(18)}}> 
                        <div className="deleteThisImg" onClick={()=>{this.deleteThisImg(index)}}>
                            <img src="images/delete.png" srcSet="images/delete@2x.png 2x,images/delete@3x.png 3x" alt=""/>
                        </div>
                        <img className="realimg" src={item.imageUrl} alt=""/>
                    </div>
                }</div>)
        })
        return (
            <div className="OutWrapContainer"> 
                <Header history={this.props.history} {...obj} Back={this.handleBack}></Header>
                <Enteroutwrap> 
                    <div className="linbinmsg">
                        <img src="images/tips.png" srcSet="images/tips@1.5x.png 1.5x,images/tips@2x.png 2x, images/tips@3x.png 3x" alt=""/>租赁合同如有多页，请依次完整上传
                    </div>
                    <div className="enter_contain"> 
                        <label className='tan_label'>上传房产证明或租赁合同</label>
                        <div className="uploadimg">
                             {ImgLi}
                             <div className="uplod_fk" style={{marginBottom:translateRem(18)}}>  
                                <input 
                                    type="file" 
                                    ref={this.fileInputEl3}	//挂载ref
                                    accept="image/*" 
                                    hidden  //隐藏
                                    name="file1"  
                                    onChange={(e)=>this.upChangephoto4(e)}
                                />
                                {/* 触发input上传 */}
                                <a href="javascript:void(0)" onClick={() => {
                                    this.fileInputEl3.current.click()		//当点击a标签的时候触发事件 
                                }} 
                                > 
                                <img src="images/idcard_fdcee@1x.png" srcSet="images/idcard_fdcee@2x.png 2x, images/idcard_fdcee.png 3x" alt=""/>
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

export default EnterSupportHome;
