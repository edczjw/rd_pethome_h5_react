import styled from "styled-components"; 

//手写px转remjs
function translateRem(pxValue) {
    const ratio = 37.5; // 根据项目配置比例的方式自行设定
    // pxValue = parseInt(pxValue); 
    return pxValue / ratio + 'rem';
}
export const LiveTestOcrwrap=styled.div ` 
    .linocr{
        background: #F1F2F3;
        font-family: PingFangSC-Regular;
        font-size: ${translateRem(13)};
        color: #AAAAAA;
        letter-spacing: ${translateRem(-0.28)}; 
        padding: ${translateRem(15)} ${translateRem(16)};
    }
    .ocrImg{
        padding-top: ${translateRem(37)};
        text-align: center;
        .inone{
            font-family: PingFangSC-Regular;
            font-size: ${translateRem(14)};
            color: #666666;
            letter-spacing: ${translateRem(-0.25)};
            text-align: center;
            line-height: ${translateRem(21)};
        }
        .intwo{
            font-family: PingFangSC-Semibold;
            font-size: ${translateRem(18)};
            color: #333333;
            letter-spacing: ${translateRem(-0.32)};
            text-align: center;
            line-height: ${translateRem(18)};
            margin-top: ${translateRem(17)};
            font-weight: 550;
        }
        .inthree{
            width: ${translateRem(198)};
            height: auto;
            object-fit: fill;
            margin-top: ${translateRem(20)};
        }
        .infour{
            font-family: PingFangSC-Semibold;
            font-size: ${translateRem(14)};
            color: #333333;
            letter-spacing: ${translateRem(-0.25)};
            text-align: center;
            line-height: ${translateRem(18)};
            margin-top: ${translateRem(11)};
        }
        .infive{
            font-family: PingFangSC-Regular;
            font-size: ${translateRem(15)};
            color: #333333;
            letter-spacing: ${translateRem(-0.27)};
            text-align: center;
            line-height: ${translateRem(18)};
            margin-top: ${translateRem(8)};
        }
    }
`