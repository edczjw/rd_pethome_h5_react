import React, { Component } from 'react';
import {RepayPlanWrap} from './styleRepayPlan'
import Header from '../../components/Header/Header';
import LineBanner from '../../components/lineBanner/LineBanner'; 
import Storage from '../../assests/js/Storage';
/**
 * 还款计划
 */
class RepayPlan extends Component {
    // 构造器
    constructor(props){
        super(props)
        // 数据data
        this.state={  
            rpList: [],
        }
        this.handleBack = this.handleBack.bind(this)
    };

    componentDidMount(){
        // 从缓存中获取还款计划列表
        this.setState({
            rpList:JSON.parse(Storage.get('playList'))
        })
        
    }
    //返回引导页
    handleBack(){ 
        this.props.history.go(-1)
    }
    render() {
        let obj={
            if_show_arr_lft:true,//是否显示左上角返回键
            title:'还款计划',//页面标题
            desc:'请留意还款时间，按时还款',//描述
            ft_concat:'',//签署合同名称
            ft_text:"",//按钮文案
            ftshow:false,//是否显示底部按钮
            ftColor:false,//是否需要白色背景
        }
        let li = this.state.rpList.map((item,index)=>{
            return <li key={index}>
                <div className="lfli">
                    <div className="rpiner_top">还款金额 {item.shouldRepayAmt} 元</div>
                    <div className="rpiner_btm">还款日{item.shouldRepayDate} / 第{item.shouldRepayTerm}期</div>
                </div> 
                </li>
        })
        return (
            <div className="OutWrapContainer" style={{backgroundColor:'#F9F9F9'}}>
                <RepayPlanWrap>
                <Header history={this.props.history} {...obj} Back={this.handleBack}></Header>
                    <LineBanner {...obj}></LineBanner> 
                    <div className="RpNum">
                        <ul>
                            {li}
                        </ul>
                    </div>
                </RepayPlanWrap>
            </div>
        );
    }
}

export default RepayPlan;
