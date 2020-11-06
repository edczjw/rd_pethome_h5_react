import React, { Component } from 'react';
import axios from '../../assests/js/request';
import { Toast } from 'antd-mobile';
/**
 * 验证码倒计时
 */
class GetCode extends Component {
    constructor(props) {
        super(props)
        this.state = {
            count: 60,
            linked: true
        }
    }
    // 计时
    countDown() {
        const { count } = this.state;
        if (count === 1) {
            this.setState({
                count: 60,
                linked: true,
            });
        } else {
            this.setState({
                count: count - 1,
                linked: false,
            });
            setTimeout(this.countDown.bind(this), 1000);
        }
    }
    //点击开始发送验证码
    handleClick = () => { 
        const { linked } = this.state;
        const {cardNo,idNo,mchNo,mobile,name} = this.props.msg
        if (!linked) {
            return;
        }else if(cardNo === ''){ 
            Toast.info('请填写银行卡', 3);
            return
        }else if(idNo === ''){ 
            Toast.info('请填写身份证号码', 3);
            return
        }else if(mobile === ''){ 
            Toast.info('请填写手机号码', 3);
            return
        }else if(name === ''){ 
            Toast.info('请填写姓名', 3);
            return
        } 
        this.sendValidCode({cardNo,idNo,mchNo,mobile,name})
    };


    //发送短信验证码
    async sendValidCode(data) {
        let res = await axios.SendValidateCode(data); 
        if(res.code === '0000'){
            //倒计时
            this.countDown();
            const {bankName,requestNo} = res.data
            this.props.getDetail({bankName,requestNo})
            console.log('获取验证码成功');
        }else{ 
            Toast.info(res.msg, 3);
        }
    }
 
    render() {
        return (
            <div className="getCode" onClick={() => this.handleClick()}>
                {
                    this.state.linked
                        ? '获取验证码'
                        : `${this.state.count} 秒后重发`
                }
            </div>
        );
    }
}

export default GetCode;
