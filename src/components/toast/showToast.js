import React, { Component } from 'react';
import Toast from './Toast'
var showToast = {
    //status: 0 无图片  1 成功  2 失败
    success(text,status){
        return (<Toast text={text} status={status}></Toast>)
    }
}
export default showToast;