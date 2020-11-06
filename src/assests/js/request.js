import {request} from './http'
/**
 * 集合所有请求
 */
const axios = {
    // 获取设备信息
    async getEquipment(paramsOst){  
        var timestamp = Date.parse(new Date()); 
        const res = await request({
            url: '/query/get/equipment',
            params: {
                outerProcessNo: paramsOst.outerProcessNo,
                timestamp: timestamp
            }
        });  
        return res;
    },

    // 获取节点流程信息
    async getProcess(paramsOst){  
        var timestamp = Date.parse(new Date()); 
        const res = await request({
            url: '/apply/get/process',
            params: {
                mchNo: paramsOst.mchNo,
                timestamp: timestamp
            }
        });  
        return res;
    },

    // 上传营业执照
    async uploadLicense(paramsOst){   
        const res = await request({
            url: '/apply/business/license/ocr',
            method:'post', 
            data:{
                outerProcessNo:paramsOst.outerProcessNo,
                imageBase64:paramsOst.imageBase64
            }
        });  
        return res;
    },

    // 上传动物许可证
    async uploadAnimal(paramsOst){
        const res = await request({
            url: '/apply/animal/treat/license/ocr',
            method:'post', 
            data:{
                outerProcessNo:paramsOst.outerProcessNo,
                imageBase64:paramsOst.imageBase64
            }
        });  
        return res; 
    },

    // 提交企业信息
    async SubmitBusiness(paramsOst){
        const res = await request({
            url: '/apply/commit/emp/info',
            method:'post', 
            data:paramsOst
        });  
        return res; 
    },

    // 图片上传
    async uploadPic(paramsOst){
        const res = await request({
            url: '/apply/upload/img',
            method:'post', 
            data:paramsOst
        });  
        return res; 
    },

    //提交企业认证补充信息
    async submitImgSupport(paramsOst){
        const res = await request({
            url: '/apply/commit/mch/add',
            method:'post', 
            data:paramsOst
        });  
        return res;  
    },

    //提交经营信息
    async submitBusinessMsg(paramsOst){
        const res = await request({
            url: '/apply/commit/business',
            method:'post', 
            data:paramsOst
        });  
        return res;  
    },

    //提交申请人信息
    async submitApply(paramsOst){
        const res = await request({
            url: '/apply/commit/applicant',
            method:'post', 
            data:paramsOst
        });  
        return res;  
    },
    
    //获取申请人姓名和身份证信息
    async getApplyMsg(paramsOst){
        var timestamp = Date.parse(new Date()); 
        const res = await request({
            url: '/query/get/applicant', 
            params:{
                mchNo:paramsOst.mchNo,
                timestamp:timestamp
            }
        });  
        return res;  
    },

    //发送短信验证码
    async SendValidateCode(paramsOst){ 
        const res = await request({
            url: '/apply/bind/card  ', 
            method:'post', 
            data:paramsOst
        });  
        return res;  
    },
    //提交银行卡信息
    async subMitBank(paramsOst){ 
        const res = await request({
            url: '/apply/bind/card/confirm', 
            method:'post', 
            data:paramsOst
        });  
        return res;  
    },
    //提交联系人信息
    async subContractInfo(paramsOst){ 
        const res = await request({
            url: '/apply/commit/contact', 
            method:'post', 
            data:paramsOst
        });  
        return res;  
    },
    //获取人脸识别token
    async getToken(paramsOst){ 
        const res = await request({
            url: '/apply/kyc/getToken?mchNo='+paramsOst.mchNo, 
            method:'post', 
            data:paramsOst
        });  
        return res;  
    },
    //获取还款试算详情
    async getRepayDetail(paramsOst){ 
        const res = await request({
            url: '/loan/tryCalculate',  
            method:'post', 
            data:paramsOst
        });  
        return res;  
    },
    //提交审批接口
    async SubmitCheck(paramsOst){ 
        const res = await request({
            url: '/apply/commit/check', 
            method:'post', 
            data:paramsOst
        });  
        return res;  
    },

    //查看协议
    async getContract(paramsOst){  
        var timestamp = Date.parse(new Date()); 
        const res = await request({
            url: '/query/view/contract',
            params: {
                contractType: paramsOst.contractType,
                mchNo:paramsOst.mchNo,
                timestamp: timestamp
            }
        });  
        return res;
    },
    //提交签约接口
    async SubmitSignWd(paramsOst){ 
        const res = await request({
            url: '/apply/confirm/sign', 
            method:'post', 
            data:paramsOst
        });  
        return res;  
    },
    //获取网商银行还款账户
    async getMyAccount(paramsOst){  
        var timestamp = Date.parse(new Date()); 
        const res = await request({
            url: '/loan/repay/wsAccount',
            params: { 
                mchNo:paramsOst.mchNo,
                timestamp: timestamp
            }
        });  
        return res;
    },
    //获取分期借款还款计划
    async getFenQiRplan(paramsOst){  
        var timestamp = Date.parse(new Date()); 
        const res = await request({
            url: '/loan/repayPlan',
            params: { 
                mchNo:paramsOst.mchNo,
                timestamp: timestamp
            }
        });  
        return res;
    },
    //取消申请在途借款
    async cancelLoan(paramsOst){  
        var timestamp = Date.parse(new Date()); 
        const res = await request({
            url: '/apply/cancel/apply',
            params: { 
                mchNo:paramsOst.mchNo,
                timestamp: timestamp
            }
        });  
        return res;
    },
    //提交还款接口
    async SubmitSign(paramsOst){ 
        const res = await request({
            url: '/loan/repay/commit', 
            method:'post', 
            data:paramsOst
        });  
        return res;  
    },
    //H5验签校验
    async H5SignCheck(paramsOst){ 
        const res = await request({
            url: '/apply/chk/sign', 
            method:'post', 
            data:paramsOst
        });  
        return res;  
    },
}
export default axios;