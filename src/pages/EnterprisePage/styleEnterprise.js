import styled from "styled-components"; 

//手写px转remjs
function translateRem(pxValue) {
    const ratio = 37.5; // 根据项目配置比例的方式自行设定
    // pxValue = parseInt(pxValue); 
    return pxValue / ratio + 'rem';
}
export const Enteroutwrap=styled.div ` 
    width:100%; 
    font-family: PingFangSC-Regular;
    .linbinmsg{ 
        font-size: ${translateRem(14)};
        background: #F9F9F9;
        color: #9F9F9F;
        letter-spacing: ${translateRem(-0.31)};
        line-height: ${translateRem(21)};
        display:flex; 
        align-items: center;
        padding:${translateRem(13)}  ${translateRem(16)};
        img{
            margin-right:${translateRem(10.5)};
        }
    }
    .enter_contain{ 
        padding: ${translateRem(20)} ${translateRem(16)} ${translateRem(210)};

        .tan_label{ 
            font-family: PingFangSC-Regular;
            font-size: ${translateRem(15)};
            color: #333333;
            letter-spacing: ${translateRem(-0.24)};
        }
        .uploadimg{ 
            padding: ${translateRem(18)} 0 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap:wrap;
            .uplod_fk{
                width: ${translateRem(167)};
                height: ${translateRem(109)};  
                position: relative;
                .deleteThisImg{
                    position: absolute;
                    right: ${translateRem(-4.5)};
                    top: ${translateRem(-4.5)};
                    width: ${translateRem(13)};
                    height: auto;
                    object-fit: fill;
                    z-index: 999;
                    img{
                        width: 100%;
                        height: 100%;
                        border: none;
                    }
                }
                img{
                    width:100%;
                    height: 100%;
                    object-fit: fill; 
                    height: ${translateRem(109)};
                    border-radius: ${translateRem(4)};
                    border:${translateRem(1)} solid #eee;
                }
                a{ 
                    display:block;
                    width:100%;
                    height: 100%;  
                    img{
                        width:100%;
                        height: 100%;
                        object-fit: fill; 
                        height: ${translateRem(109)};
                        border-radius: ${translateRem(8)};
                        border:${translateRem(1)} solid #eee;
                    }
                    .resetUpload{
                        width:100%;
                        height: 100%;  
                        position: relative;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        flex-direction: column;
                        .realimg{
                            opacity: .4;
                        }
                        .rsimg{
                            width: ${translateRem(46)};
                            height: ${translateRem(46)};
                            position: absolute;
                            top:${translateRem(20)}; 
                            object-fit: fill;
                            border:${translateRem(0)} solid #eee;
                        }
                        .resetUploadmsg{
                            position: absolute; 
                            top:${translateRem(75)};
                            color: #333333;
                            font-size:${translateRem(13)};
                        }
                    }
                }
            }
        }
    }
    .enter_contain1{ 
        padding: ${translateRem(25)} ${translateRem(16)} ${translateRem(0)};
        .uploadimg{  
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap:wrap;
            .uplod_fk{
                width: ${translateRem(167)};
                height: ${translateRem(109)};
                a{ 
                    display:block;
                    width:100%;
                    height: 100%;  
                    img{
                        width:100%;
                        height: 100%;
                        object-fit: fill; 
                        height: ${translateRem(109)};
                        border-radius: ${translateRem(4)};
                    }
                    .resetUpload{
                        width:100%;
                        height: 100%;  
                        position: relative;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        flex-direction: column;
                        .realimg{
                            opacity: .4;
                        }
                        .rsimg{
                            width: ${translateRem(46)};
                            height: ${translateRem(46)};
                            position: absolute;
                            top:${translateRem(20)}; 
                            object-fit: fill;
                        }
                        .resetUploadmsg{
                            position: absolute; 
                            top:${translateRem(75)};
                            color: #333333;
                            font-size:${translateRem(13)};
                        }
                    }
                }
            }
        }
    }
    .edit_mg{
        padding-top:${translateRem(22)}; 
        padding-bottom:${translateRem(106)};
        .am-list-header{
            padding: 0; 
            font-family: PingFangSC-Light;
            font-size: ${translateRem(12)};
            color: #666666;
            letter-spacing: ${translateRem(-0.19)};
        }
        .am-list-body{
            margin-top:${translateRem(7.5)};
            margin-bottom:${translateRem(19.8)};
        }
        .am-list-body::before{
            height: 0; 
        }
        .am-list-body::after{
            background-color: #F1F1F1;
        }
        .am-input-item{
            padding-left:0;
            height:${translateRem(21)};
            overflow: visible;
        }
        .am-list-line{ 
            overflow: visible;
        }
        .am-list-item{
            min-height:${translateRem(21)};
            .am-input-clear{
                width:${translateRem(18)};
                height:${translateRem(18)};
                background-size:${translateRem(18)} auto;
                margin-bottom: 0.13333333333333333rem;
            }
        }
        .am-input-control{
            height: auto !important;
            font-family: PingFangSC-Medium;
            font-size: ${translateRem(15)};
            color: #333333;
            letter-spacing: ${translateRem(-0.24)};
            padding-bottom:${translateRem(5)};
            input{
                font-family: PingFangSC-Medium;
                font-size: ${translateRem(15)}; 
            }
        }
    } 
    
`