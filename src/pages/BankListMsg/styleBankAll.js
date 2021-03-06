import styled from "styled-components"; 

//手写px转remjs
function translateRem(pxValue) {
    const ratio = 37.5; // 根据项目配置比例的方式自行设定
    // pxValue = parseInt(pxValue); 
    return pxValue / ratio + 'rem';
}
export const BankAllWrap=styled.div `  
    .bk_linbaner{
        padding:${translateRem(24)} ${translateRem(16)} ${translateRem(10.5)};
        display:flex;
        justify-content: space-between;
        align-items: center;
        font-family: PingFangSC-Regular;
        font-size: ${translateRem(12)};
        .SeeBkSupport{
            color: #3291FF;
            display:flex;
            justify-content: center;
            align-items: center;
            img{   
                width:${translateRem(16)};
                height:auto;
                object-fit: fill;
                margin-left:${translateRem(4)};
            }
        }
    }
    .bk_input{ 
        margin-bottom:${translateRem(10)}; 
        background-color: #fff;
        padding-left:${translateRem(16)};
        .am-input-item {
            height: ${translateRem(48)}; 
            padding-left:0;
            .getCode{
                position: absolute;
                right: 0;
                top: calc( 50% - ${translateRem(16)});
                border-left:${translateRem(1)} solid #EEEEEE;
                height: ${translateRem(32)}; 
                padding: 0 ${translateRem(19.5)};
                font-family: PingFangSC-Regular;
                font-size: ${translateRem(14)}; 
                color: #3291FF;
                letter-spacing: ${translateRem(-0.29)}; 
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .am-input-label{
                font-family: PingFangSC-Regular;
                font-size: ${translateRem(16)};
                color: #333333;
                letter-spacing: ${translateRem(-0.35)}; 
                line-height: ${translateRem(18)};
            }
            .am-input-label-5{
                width: ${translateRem(48)};
            }
        }
        .am-list-line{
            border-bottom:${translateRem(1)} solid #E8E8E8 !important;
        }
        .am-list-line::after{
            height:0 !important;
        }
        .am-list-item{
            min-height:${translateRem(21)};
            .am-input-clear{
                width:${translateRem(18)};
                height:${translateRem(18)};
                margin-left:${translateRem(10)};
                background-size:${translateRem(18)} auto;
            }
        }
        .am-list-item .am-input-control input{
            text-align: right;
            font-family: PingFangSC-Regular;
            font-size: ${translateRem(16)};
            color: #333333;
            letter-spacing: ${translateRem(-0.2)};
            text-align: left;
            margin-left:${translateRem(16)}; 
        } 
    }
    .support_bklist{
        margin-top:${translateRem(8)};
        background-color: #fff;
        padding-left: ${translateRem(16)};
        font-family: PingFangSC-Medium;
        font-size: ${translateRem(16)};
        color: #333333;
        letter-spacing: ${translateRem(-0.18)};
        line-height: ${translateRem(16)};
        ul{
            li{
                display:flex; 
                align-items: center;
                height: ${translateRem(64)};
                font-weight: 550;
                border-bottom:${translateRem(1)} solid #E8E8E8 !important;
                img{
                    width:${translateRem(42)};
                    height:${translateRem(42)};
                    object-fit: fill;
                    margin-right:${translateRem(15)};
                }
            }
        }
    }
`