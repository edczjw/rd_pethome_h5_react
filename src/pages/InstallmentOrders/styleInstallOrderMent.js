import styled from "styled-components"; 

//手写px转remjs
function translateRem(pxValue) {
    const ratio = 37.5; // 根据项目配置比例的方式自行设定
    // pxValue = parseInt(pxValue); 
    return pxValue / ratio + 'rem';
}
export const InstallOrderMentWrap=styled.div ` 
    width:100%;
    height:100%;
    background: #F9F9F9;  
    .InsContainer{
        background-color: #fff;
        padding-top: ${translateRem(22)}; 
        padding-left: ${translateRem(16)};
        padding-right: ${translateRem(16)};
        .I_tit{ 
            display: flex; 
            align-items: center;
            margin-bottom: ${translateRem(15)};
            img{
                width: ${translateRem(24)};
                height: ${translateRem(24)};
                object-fit: fill;
            }
            span{
                font-family: PingFangSC-Medium;
                font-size: ${translateRem(16)};
                color: #333333;
                letter-spacing: ${translateRem(0.33)}; 
                margin-left:${translateRem(8)}; 
                font-weight: 550;
            }
        }
        .detailmsg{ 
            padding-left: ${translateRem(32)}; 
            .vflik{
                display: flex;
                align-items: center;
            }
            .flexbiner{ 
                display: flex;  
                font-family: PingFangSC-Regular;
                font-size: ${translateRem(14)};
                flex-wrap: wrap;
                margin-bottom: ${translateRem(17)};
                line-height: ${translateRem(18)};
                .detul{
                    color: #9F9F9F; 
                    margin-right: ${translateRem(24)};
                }
                .equipmentmsg{
                    flex:1;
                    color: #333333;
                    span{
                        display: inline-block;
                        width: ${translateRem(70)};
                        padding: ${translateRem(7.5)};
                        background: #FFFFFF;
                        text-align: center;
                        border: ${translateRem(1)} solid #EEF1F5;
                        box-shadow: 0 ${translateRem(3)} ${translateRem(3)} 0 rgba(230,230,230,0.50);
                        border-radius: ${translateRem(22)};
                        margin-right: ${translateRem(22)};
                    }
                    .activeSpan{
                        color:#fff;
                        border: none;
                        background-image: linear-gradient(-45deg, #158AFE 0%, #2694FD 45%, #359EFB 55%, #59B5F9 100%);
                        box-shadow: 0 ${translateRem(3)} ${translateRem(3)} 0 rgba(50,145,255,0.14);
                    }
                }
            } 
        }
    }
    .Ic_1{
        padding-bottom: ${translateRem(3)};
        margin-bottom: ${translateRem(8)};
    }
    .Ic_2{ 
        padding-bottom: ${translateRem(9.8)};
    }
    .seeRpdetail{
        position: relative;
        width: 100%;
        height: ${translateRem(50.2)};
        background-color: #fff;
        font-family: PingFangSC-Regular;
        font-size: ${translateRem(14)};
        color: #999999;
        letter-spacing: 0;
        display: flex;
        justify-content: center;
        align-items: center;  
        img{
            width: ${translateRem(6)};
            height: ${translateRem(12)};
            object-fit: fill;
            margin-left: ${translateRem(10)};
        }
    }
    .seeRpdetail::before{
        content: '';
        position: absolute;
        top:0;
        height: ${translateRem(1)};
        background-color: #E8E8E8;
        width: calc( 100% - ${translateRem(32)});
    }
    .Accbiner{
        background: #F9F9F9; 
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-family: PingFangSC-Regular;
        padding: ${translateRem(18)} ${translateRem(6)} ${translateRem(9)} ${translateRem(16)};
        font-size: ${translateRem(12)};
        letter-spacing: ${translateRem(-0.25)};
        .Ab_1{
            color: #AAAAAA;
        }
        .Gorp{
            display: flex;
            justify-content: center;
            align-items: center; 
            color: #3291FF;
            .am-icon{
                margin-left:${translateRem(-2)};
            }
        }
    }
    .componentAccount{
        padding: ${translateRem(22)} ${translateRem(16)} ${translateRem(30)};
        background-color: #fff;
        .I_tit{ 
            display: flex; 
            align-items: center;
            margin-bottom: ${translateRem(15)};
            img{
                width: ${translateRem(24)};
                height: ${translateRem(24)};
                object-fit: fill;
            }
            span{
                font-family: PingFangSC-Medium;
                font-size: ${translateRem(16)};
                color: #333333;
                letter-spacing: ${translateRem(0.33)}; 
                margin-left:${translateRem(8)}; 
                font-weight: 550;
            }
        }
         
        .AccountBkCrd{ 
            margin:0 ${translateRem(12)} 0 ${translateRem(32)} ;
            padding: ${translateRem(20)} ${translateRem(15)} ${translateRem(6)} ${translateRem(18.5)}; 
            height: 100%; 
            background-image: linear-gradient(225deg, #158AFE 0%, #2694FD 45%, #359EFB 55%, #59B5F9 100%);
            border-radius: ${translateRem(8)};
            ul{
                li{
                    font-family: PingFangSC-Semibold;
                    color: #FFFFFF;
                    letter-spacing: 0;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap: wrap;
                    span{ 
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                    .copy{
                        border: ${translateRem(1)} solid #87BFFF;
                        font-family: PingFangSC-Regular;
                        font-size: ${translateRem(10)};
                        letter-spacing: 0;
                        border-radius: ${translateRem(12.5)};
                        width: ${translateRem(62)};
                        height: ${translateRem(26)};
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                    img{
                        width: ${translateRem(14)};
                        height: ${translateRem(14)};
                        object-fit: fill;
                        margin-right: ${translateRem(6)};
                    }
                } 
            }
        }
    }
`