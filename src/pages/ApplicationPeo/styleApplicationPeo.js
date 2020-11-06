import styled from "styled-components"; 

//手写px转remjs
function translateRem(pxValue) {
    const ratio = 37.5; // 根据项目配置比例的方式自行设定
    // pxValue = parseInt(pxValue); 
    return pxValue / ratio + 'rem';
}
export const ApplicationPeoWrap=styled.div ` 
    .inputAll{
        margin-bottom:${translateRem(10)}; 
        background-color: #fff;
        padding-left:${translateRem(16)};
        .am-input-item {
            height: ${translateRem(48)}; 
            padding-left:0;
            .am-input-label{
                font-family: PingFangSC-Regular;
                font-size: ${translateRem(16)};
                color: #333333;
                letter-spacing: ${translateRem(-0.35)};
                text-align: justify;
                line-height: ${translateRem(18)};
            }
            .am-input-label-5{
                width: ${translateRem(63)};
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
            text-align: right; 
        }  
    } 
`