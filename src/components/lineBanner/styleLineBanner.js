import styled from "styled-components";

//手写px转remjs
function translateRem(pxValue) {
    const ratio = 37.5; // 根据项目配置比例的方式自行设定
    // pxValue = parseInt(pxValue); 
    return pxValue / ratio + 'rem';
}
export const LineBWrap=styled.div `
    width: 100%; 
    padding: ${translateRem(12)} ${translateRem(14)} ${translateRem(13)} ${translateRem(16)};
    font-family: PingFangSC-Regular;
    font-size: ${translateRem(14)};
    color: #CBA05D;
    line-height:${translateRem(20)};
    letter-spacing: ${translateRem(-0.2)};
    background: #FBF4E9;
`