import styled from "styled-components"; 

//手写px转remjs
function translateRem(pxValue) {
    const ratio = 37.5; // 根据项目配置比例的方式自行设定
    // pxValue = parseInt(pxValue); 
    return pxValue / ratio + 'rem';
}
export const StyleActionPops=styled.div `  
z-index:999;
width: 100%;  
position:absolute;
left: 0;
top: ${translateRem(42)};  
bottom:0;
background-color: rgba(0,0,0,0.60);
padding: 0 ${translateRem(16)};
display: flex;
align-items: center;
.slectionPops{  
    width: 100%;
    background: #FFFFFF;
    padding: ${translateRem(28)} ${translateRem(24)} ${translateRem(10)};
    border-radius: ${translateRem(5)};
    position: relative;
    .closeAll{
        position: absolute;
        top:${translateRem(12)};
        right: ${translateRem(12)};
        img{
            width:${translateRem(20)};
            height: ${translateRem(20)};
            object-fit: fill;
        }
    }
    .titl{
        font-family: PingFangSC-Medium;
        font-size: ${translateRem(18)};
        color: #333333;
        letter-spacing: 0;
        line-height: ${translateRem(18)};
        margin-bottom:${translateRem(8)};
        font-weight: 550;
    }
    .laybin{
        font-family: PingFangSC-Regular;
        font-size: ${translateRem(13)};
        color: #9F9F9F;
        letter-spacing: 0;
        line-height: ${translateRem(13)};
        margin-bottom:${translateRem(28)};
    }
    ul{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width:100%;
        flex-wrap: wrap;
        li{
            padding: ${translateRem(11)} ${translateRem(25)};
            background: #F1F1F1;
            border-radius: ${translateRem(4)};
            font-family: PingFangSC-Medium;
            font-size: ${translateRem(16)}; 
            color: #333333;
            letter-spacing: ${translateRem(-0.84)};
            margin-right:${translateRem(16)};
            margin-bottom:${translateRem(16)};
        }
        .active{
            background-image: linear-gradient(225deg, #158AFE 0%, #3FA5F0 100%);
            color: #fff;
        }
    } 
}
`