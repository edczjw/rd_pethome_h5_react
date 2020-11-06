import styled from "styled-components"; 

//手写px转remjs
function translateRem(pxValue) {
    const ratio = 37.5; // 根据项目配置比例的方式自行设定
    // pxValue = parseInt(pxValue); 
    return pxValue / ratio + 'rem';
}
export const Toastwrap=styled.div ` 
    background: rgba(0,0,0,0.75);
    border-radius: ${translateRem(12)};
    display: flex;
    justify-content: center;
    align-items: center; 
    flex-direction: column;
    flex-wrap: wrap;
    font-family: PingFangSC-Regular;
    font-size: ${translateRem(16)};
    color: #FFFFFF;
    letter-spacing: 0;
    text-align: center;
    padding: ${translateRem(25)} ${translateRem(30)};
    z-index: 9999; 
    max-width: ${translateRem(222)};
    .toast_img{  
        width: 100%;
        margin-bottom: ${translateRem(15)};
        img{
            width: ${translateRem(40)};
            height: ${translateRem(40)};
            object-fit: fill;
            margin: 0 auto;
        }
    }
    .to_text{
        width: 100%; 
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
    }
`