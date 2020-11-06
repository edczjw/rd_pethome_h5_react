import styled from "styled-components"; 

//手写px转remjs
function translateRem(pxValue) {
    const ratio = 37.5; // 根据项目配置比例的方式自行设定
    // pxValue = parseInt(pxValue); 
    return pxValue / ratio + 'rem';
}
export const HeaderWrap=styled.div `
    width: 100%; 
    height: ${translateRem(39)};  
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: PingFangSC-Medium;
    font-size:  ${translateRem(18)};
    color: #333333;
    font-weight: 550;
    letter-spacing:  ${translateRem(-0.29)}; 
    background-color: #fff;  
    z-index:9999;
    .arrow_let{ 
        flex:1;
        .nav_left_img{
            width: ${translateRem(24)};
            height: ${translateRem(24)};
            object-fit: fill; 
            margin-left: ${translateRem(16)};
        }
    }
    .nav_tit{
        flex:2;
        text-align: center; 
    }
    .nav_rgt{
        flex:1;
    }
`