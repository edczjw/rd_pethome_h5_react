import styled from "styled-components";

//手写px转remjs
function translateRem(pxValue) {
    const ratio = 37.5; // 根据项目配置比例的方式自行设定
    // pxValue = parseInt(pxValue); 
    return pxValue / ratio + 'rem';
}

export const EntranceWrap=styled.div `
    background-color: rgba(0,0,0,0.60);
    height: 100%; 
    position:relative; 
    .panelBox{
        position: absolute;
        bottom: 0;
        left:0;
        background: #FFFFFF;
        width: 100%;
        /* height:${translateRem(538)}; */
        /* box-shadow: 0 ${translateRem(3)} ${translateRem(3)} 0 rgba(85,100,122,0.03); */
        border-radius: ${translateRem(16)} ${translateRem(16)} 0 0;
        .panelBox_Htop{
            padding: ${translateRem(22)} ${translateRem(16)};
            .panelBox_Htop_title{
                font-family: PingFangSC-Medium;
                font-size: ${translateRem(16)};
                color: #333333;
                letter-spacing: ${translateRem(0.33)};
                line-height: ${translateRem(14)};
                display: flex; 
                align-items: center; 
                font-weight: 550; 
                .panelBox_Htop_img{
                    width: ${translateRem(24)};
                    height: ${translateRem(24)};
                    margin-right:${translateRem(8)};
                    object-fit: fill; 
                    display: flex; 
                    align-items: center; 
                    justify-content: center; 
                }
            }
            .pan_In_line{
                border-bottom:${translateRem(1)} solid #F1F1F1;
                margin-bottom:${translateRem(22)};
            }
            .pan_Innel{
                width: 100%; 
                padding: 0 0 ${translateRem(24)} ${translateRem(32)};
                font-family: PingFangSC-Regular;
                font-size: ${translateRem(14)};
                color: #9F9F9F;
                line-height: ${translateRem(12)};
                li{
                    margin-top:${translateRem(18.4)};
                    line-height: ${translateRem(18)}; 
                    display: flex;
                    span{ 
                        flex:1;
                        margin-left:${translateRem(24)};
                        color: #333333;
                    }
                }
            }
            .pan_Innel_ul{
                width: 100%; 
                padding-left:${translateRem(18)};
                font-family: PingFangSC-Regular;
                font-size: ${translateRem(15)};
                color: #333333;
                line-height: ${translateRem(14)};
                li{
                    margin-top:${translateRem(20)};
                    display: flex; 
                    align-items: center;  
                    .pan_Innel_ul_img{
                        width:${translateRem(13.7)};
                        height: ${translateRem(12.9)};
                        object-fit: fill; 
                        margin-right:${translateRem(11.3)};
                    } 
                }
            }
        }
    }
`
