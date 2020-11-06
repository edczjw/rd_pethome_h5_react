import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import UrlParam from '../../assests/js/addressParameter';
/**
 * 合同协议展示
 */
class Contract extends Component {
    constructor(props){
        super(props)
        this.state={
            name:'',//标题
            imguel:'',
        }
        this.handleBack = this.handleBack.bind(this)
    }
    componentDidMount(){
        //从地址中获取标题和图片地址
        var name = UrlParam.getParams('name', this.props.location.search)
        var imguel = UrlParam.getParams('ImgUrl', this.props.location.search) 
        this.setState({
            name:name,
            imguel:imguel
        }) 
    }

    //返回
    handleBack(){
        this.props.history.go(-1)
    }
    render() {
        let obj={
            if_show_arr_lft:true,//是否显示左上角返回键
            title:this.state.name,//页面标题
            desc:'',//描述
            ft_concat:'委托授权书',//签署合同名称
            ft_text:"提交",//按钮文案
            ftshow:false,//是否显示底部合同
            ftColor:false,//是否需要底部白色背景
        }
        return (
            <div className="OutWrapContainer">
            <Header history={this.props.history} {...obj} Back={this.handleBack}></Header>
                <div className="Contract_Img_box"> 
                    <img src={this.state.imguel} alt=""/>
                </div>
            </div>
        );
    }
}

export default Contract;
