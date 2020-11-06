import styled from "styled-components"; 

//手写px转remjs
function translateRem(pxValue) {
    const ratio = 37.5; // 根据项目配置比例的方式自行设定
    // pxValue = parseInt(pxValue); 
    return pxValue / ratio + 'rem';
}
export const RepayPlanWrap=styled.div ` 
    .RpNum{
        padding-left: ${translateRem(16)};
        width: 100%;
        background-color: #fff;
        ul{
            li{
                display: flex;
                justify-content: space-between;
                align-items: center; 
                height: ${translateRem(78)};
                padding-right: ${translateRem(16)};
                border-bottom:1px solid #E8E8E8;
                position: relative;
                .lfli{ 
                    display: flex;
                    flex-direction: column; 
                    justify-content:center;
                    height: 100%;
                    .rpiner_top{
                        font-family: PingFangSC-Medium;
                        font-size: ${translateRem(18)};
                        color: #333333;
                        letter-spacing: ${translateRem(-0.39)};
                        text-align: justify;
                        line-height: ${translateRem(18)}; 
                        margin-bottom: ${translateRem(10)};;
                    }
                    .rpiner_btm{
                        font-family: PingFangSC-Regular;
                        font-size: ${translateRem(14)};
                        color: #999999;
                        letter-spacing: ${translateRem(-0.31)};
                        text-align: justify;
                        line-height: ${translateRem(16)};
                    }
                }
                .rgtli{
                    flex: 1; 
                    font-family: PingFangSC-Regular;
                    font-size: ${translateRem(16)};
                    color: #333333;
                    letter-spacing: ${translateRem(-0.23)};
                    text-align: right; 
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    height: 100%;
                    img{
                        margin-left: ${translateRem(9.5)};
                        margin-right: ${translateRem(-4.5)};
                    }
                    .pan_Innel_ul_img1{
                        width:${translateRem(66)};
                        height: auto;
                        position: absolute;
                        bottom: 0;
                        right: 0;
                    }
                }
            }
        }
    }
`