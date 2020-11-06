import React, { Component } from 'react';
import {StyleActionPops} from './styleActionPops'

class ActionPopQs extends Component {
    constructor(props){
        super(props)
        this.state=({
            currentIndex:1,
            list:[]
        })
    } 
    //动态选择添加类
    handleSelect(index,value){ 
        //切换选择值
        this.setState({
            currentIndex:index
        })
        this.props.parent.getQsMsg(this, index,value)
        //关闭弹窗
        setTimeout(()=>{
            this.props.setShowpop()
        },120)
    }
    render() { 
        var li = this.props.myList.map((item,index)=>{
            return <li onClick={()=>this.handleSelect(index+1,item.value)} key={index} className={index===this.state.currentIndex-1? 'active':null}>{item.value}</li>
        })
        return (
            <div>
            {
                this.props.showpopkk === true?
                <StyleActionPops>
                    <div className="slectionPops">
                        <div className="closeAll" onClick={()=>{this.props.setShowpop()}}>
                            <img src="images/arlet_icon_close.png" alt=""/>
                        </div>
                        <div className="titl">亲属关系</div>
                        <div className="laybin">请在下列选项中选择一项</div>
                        <ul>
                            {li}
                        </ul>
                    </div>
                </StyleActionPops>:null
            }</div>
        );
    }
}

export default ActionPopQs;
