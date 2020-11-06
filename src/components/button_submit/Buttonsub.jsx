import React, { Component } from 'react';
import { Toast,Checkbox,Modal } from 'antd-mobile';
import {Ftbutton} from './stylebutton_submit' 
import Storage from '../../assests/js/Storage';
import axios from '../../assests/js/request';

const alert = Modal.alert;
const AgreeItem = Checkbox.AgreeItem; 
class Buttonsub extends Component {
    constructor(props){
        super(props)
        this.state={ 
            imgUrl:'',
            name:'',
            checked:false
        }
        this.showConcat = this.showConcat.bind(this)
    }  
    //查看协议
    async showConcat(type,name){ 
        var contractType = type
        var mchNo = Storage.get('mchNo') 
        let res = await axios.getContract({contractType,mchNo}); 
        if(res.code === '0000'){ 
          this.props.history.push({pathname:"/Contract?name=" + name + '&ImgUrl=' + res.data.url});
        }else{ 
            Toast.info(res.msg, 3);
        }
    }
    render() {
        return ( 
            <Ftbutton> 
                <div  className={`panelBox_foot_submit ${this.props.ftColor? 'pan_backcol':''}`} >
                    <div className="btn_submit"  onClick={()=>{
                        // 判断是不是显示合同协议
                        if(this.props.ftshow){ 
                          //判断是不是勾选了
                          if(this.state.checked){ 
                            // 提交
                            this.props.Submit()
                          }else{
                              {
                                this.props.ft_concat1?
                                alert('', `请阅读并同意《${this.props.ft_concat}》、《${this.props.ft_concat1}》`, [ 
                                  { text: '确定', onPress: () => console.log('确定') },
                                ]):
                                alert('', `请已阅读并同意《${this.props.ft_concat}》`, [ 
                                  { text: '确定', onPress: () => console.log('确定') },
                                ])
                              }
                            }
                      }else{
                        // 提交
                        this.props.Submit()
                      }
                      }}>{this.props.ft_text}</div>  
                    {/* 条件渲染 */}
                    {
                    this.props.ftshow?  
                    <div className="agree_banr">
                    <AgreeItem data-seed="logId" className="check_submit"
                        onChange={e => this.setState({
                          checked:!this.state.checked
                        })}>
                        已阅读并同意 <a href="www.baidu.com" onClick={(e) => { e.preventDefault();this.showConcat(this.props.c2,this.props.ft_concat); }}>《{this.props.ft_concat}》</a>
                        {
                            this.props.ft_concat1?
                            <a href="www.baidu.com" onClick={(e) => { e.preventDefault(); 
                              this.showConcat(this.props.c1,this.props.ft_concat1); }}>《{this.props.ft_concat1}》</a>:null
                        }
                    </AgreeItem></div> :null
                    }
                </div> 
            </Ftbutton>
        );
    }
}

export default Buttonsub;
