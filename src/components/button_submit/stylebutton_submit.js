import styled from "styled-components"; 

//手写px转remjs
function translateRem(pxValue) {
    const ratio = 37.5; // 根据项目配置比例的方式自行设定
    // pxValue = parseInt(pxValue); 
    return pxValue / ratio + 'rem';
}
export const Ftbutton=styled.div ` 
    .pan_backcol{
        background-color: #F9F9F9 !important; 
    }
    @supports (bottom: constant(safe-area-inset-bottom)) or (bottom: env(safe-area-inset-bottom)) {
    .panelBox_foot_submit {
            /* ios < 11.2 */ 
            padding-bottom: calc( constant(safe-area-inset-bottom) +${translateRem(12)});
            /* ios >= 11.2 */ 
            padding-bottom: calc( env(safe-area-inset-bottom)  +${translateRem(12)});
            }
    }
    .panelBox_foot_submit{ 
        width:100%; 
        padding-left: ${translateRem(16)};
        padding-right: ${translateRem(16)};
        margin-top:${translateRem(21)};
        background: #fff; 
        
        .btn_submit{
            height: ${translateRem(48)};
            background-image: linear-gradient(225deg, #158AFE 0%, #3FA5F0 100%);
            border-radius: ${translateRem(24)}; 
            font-family: PingFangSC-Medium;
            font-size: ${translateRem(16)};
            color: #FFFFFF;
            letter-spacing: ${translateRem(-0.18)};
            display: flex; 
            align-items: center; 
            justify-content: center; 
            margin-bottom: ${translateRem(6)};;
        }
        .agree_banr{ 
            margin:0 auto;
            display: flex; 
            align-items: center; 
            justify-content: center;  
            .check_submit{ 
                font-family: PingFangSC-Regular !important; 
                letter-spacing: ${translateRem(-0.2)} !important;
                line-height: ${translateRem(14)} !important; 
                margin-left:0; 
                label{ 
                    color: #9F9F9F; 
                    margin-left:${translateRem(24)};
                    font-size: ${translateRem(12)} !important; 
                    .am-checkbox-checked{  
                        .am-checkbox-inner {
                            border-color: #46BB36;
                            background: #46BB36;
                        }
                    } 
                    .am-checkbox{ 
                        width: ${translateRem(16)};    
                        
                        .am-checkbox-inner{
                            border:${translateRem(1)} solid #46BB36;
                            width: ${translateRem(16)};
                            height: ${translateRem(16)};
                            top: calc( 50% - ${translateRem(8)});
                            display: flex; 
                            align-items: center; 
                            justify-content: center; 
                        }
                        .am-checkbox-inner:after{  
                            top:${translateRem(2)};
                            right:${translateRem(5.25)};
                            width: ${translateRem(4)};
                            height:  ${translateRem(9)};;
                        }
                    }
                    a{
                        color: #3FA5F0; 
                    }
                }
            }
        }
    }
`