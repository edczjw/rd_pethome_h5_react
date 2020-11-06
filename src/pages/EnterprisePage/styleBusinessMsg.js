import styled from "styled-components"; 

//手写px转remjs
function translateRem(pxValue) {
    const ratio = 37.5; // 根据项目配置比例的方式自行设定
    // pxValue = parseInt(pxValue); 
    return pxValue / ratio + 'rem';
}
export const BusinessMsgWrap=styled.div ` 
    .inputAll{
        margin-bottom:${translateRem(10)}; 
        background-color: #fff;
        padding-left:${translateRem(16)};
        .am-input-item {
            height: ${translateRem(48)}; 
            line-height: ${translateRem(48)}; 
            padding-left:0;
            .am-input-label{
                font-family: PingFangSC-Regular;
                font-size: ${translateRem(16)};
                color: #333333;
                letter-spacing: ${translateRem(-0.35)};
                text-align: justify; 
            }
            .am-input-label-5{
                width: auto; 
                height: 100%;
                line-height:${translateRem(48)};
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
            .fake-input-placeholder{ 
                font-size: ${translateRem(16)} !important;
                line-height: 3;
            }
            .fake-input{ 
                font-family: PingFangSC-Regular !important;
                font-size: ${translateRem(16)} !important;
                color: #333333 !important;
                letter-spacing: ${translateRem(-0.2)} !important;
                text-align: right;
                caret-color: #333;
            }
        }
        .am-list-item .am-input-control input{
            text-align: right;
            font-family: PingFangSC-Regular;
            font-size: ${translateRem(16)};
            color: #333333;
            letter-spacing: ${translateRem(-0.2)};
            text-align: right;
        } 
    }
`