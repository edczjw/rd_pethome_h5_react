import React from 'react';  
import {Globalstyle} from './assests/style/globalStyled.js';//全局样式
import { HashRouter,Route,Switch } from 'react-router-dom';

//引入页面
import EntrancePage from './pages/EntrancePage/EntrancePage';
import Enterprise from './pages/EnterprisePage/Enterprise';
import EnterSupport from './pages/EnterprisePage/EnterSupport';
import EnterSupportHome from './pages/EnterprisePage/EnterSupportHome';
import BusinessMsg from './pages/EnterprisePage/BusinessMsg';
import ApplicationPeo from './pages/ApplicationPeo/ApplicationPeo';
import BankListMsg from './pages/BankListMsg/BankListMsg';
import SupportBankList from './pages/BankListMsg/SupportBankList';
import AddContract from './pages/AddContract/AddContract';
import InsMentOrderSubmit from './pages/InstallmentOrders/InsMentOrderSubmit';
import OrderPassSubmit from './pages/InstallmentOrders/OrderPassSubmit';
import AccountInsOrder from './pages/InstallmentOrders/AccountInsOrder';
import ArSuccess from './pages/ApprovalResult/ArSuccess';
import ArFail from './pages/ApprovalResult/ArFail';
import ArDoing from './pages/ApprovalResult/ArDoing';
import RepayPlan from './pages/RepayPlan/RepayPlan';
import LiveTestOcr from './pages/LiveTest/LiveTestOcr';
import OcrResult from './pages/LiveTest/OcrResult';
import MoveRepayPlan from './pages/RepayPlan/MoveRepayPlan';
import Contract from './pages/Contract/Contract';

function App() {
  return (
    <div className="App"> 
      {/* 以组件的形式引入全局样式 Globalstyle */}
      <Globalstyle></Globalstyle>

      <HashRouter>
        <Switch>
            {/* 根地址 */}
            <Route exact path="/" component={EntrancePage}></Route>
            {/* 入口页面 */}
            <Route path='/EntrancePage' component={EntrancePage}></Route>
            {/* 企业信息 */}
            <Route path='/Enterprise' component={Enterprise}></Route> 
            {/* 企业信息补充 */}
            <Route path='/EnterSupport' component={EnterSupport}></Route> 
            {/* 房租信息补充 */}
            <Route path='/EnterSupportHome' component={EnterSupportHome}></Route> 
            {/* 经营信息 */}
            <Route path='/BusinessMsg' component={BusinessMsg}></Route> 
            {/* 活体人脸识别 */}
            <Route path='/LiveTestOcr' component={LiveTestOcr}></Route> 
            {/* OCR结果页面 */}
            <Route path='/OcrResult' component={OcrResult}></Route> 
            {/* 申请人信息 */}
            <Route path='/ApplicationPeo' component={ApplicationPeo}></Route> 
            {/* 银行卡信息 */}
            <Route path='/BankListMsg' component={BankListMsg}></Route> 
            {/* 支持的银行卡 */}
            <Route path='/SupportBankList' component={SupportBankList}></Route> 
            {/* 添加联系人 */}
            <Route path='/AddContract' component={AddContract}></Route> 
            {/* 订单分期审批提交 */}
            <Route path='/InsMentOrderSubmit' component={InsMentOrderSubmit}></Route>
            {/* 审批通过提交签约  */}
            <Route path='/OrderPassSubmit' component={OrderPassSubmit}></Route> 
            {/* 分期订单账户 */}
            <Route path='/AccountInsOrder' component={AccountInsOrder}></Route> 
            {/* 审批成功 */}
            <Route path='/ArSuccess' component={ArSuccess}></Route> 
            {/* 审批拒绝 */}
            <Route path='/ArFail' component={ArFail}></Route> 
            {/* 审批处理中 */}
            <Route path='/ArDoing' component={ArDoing}></Route> 
            {/* 还款计划 */}
            <Route path='/RepayPlan' component={RepayPlan}></Route> 
            {/* 还款计划可操作 */}
            <Route path='/MoveRepayPlan' component={MoveRepayPlan}></Route> 
            {/* 合同协议 */}
            <Route path='/Contract' component={Contract}></Route> 
        </Switch>
      </HashRouter> 
    </div>
  );
}

export default App;
