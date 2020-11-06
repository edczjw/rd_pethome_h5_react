import styled from "styled-components"; 

//手写px转remjs
function translateRem(pxValue) {
    const ratio = 37.5; // 根据项目配置比例的方式自行设定
    // pxValue = parseInt(pxValue); 
    return pxValue / ratio + 'rem';
}
export const AppResultWrap=styled.div `   
    height: 100%;
    background-color: #F9F9F9;
    .apr_container{ 
        background-color: #fff;
        margin-top: ${translateRem(8)}; 
        text-align: center;
        height: calc( 100% - ${translateRem(46)} );
        /* 成功 */
        .success_img{
            margin-top: ${translateRem(33.5)};
            width: ${translateRem(89)}; 
            object-fit: fill;
        }
        .status_msg{
            font-family: PingFangSC-Medium;
            font-size: ${translateRem(18)};
            color: #333333;
            text-align: center;
            line-height: ${translateRem(18)};
            margin-top: ${translateRem(16)};
            font-weight: 550;
        }
        .status_desc{
            font-family: PingFangSC-Regular;
            font-size: ${translateRem(15)};
            color: #9F9F9F;
            text-align: center;
            line-height: ${translateRem(21)};
            margin-top: ${translateRem(8.5)};
        }
        .gorpmsgbtn{
            width:${translateRem(286)};
            height: ${translateRem(44)};
            border: ${translateRem(1)} solid #3291FF;
            border-radius: ${translateRem(22)};
            display: flex;
            justify-content: center;
            align-items: center;
            margin:0 auto;
            margin-bottom: ${translateRem(15)};
            color: #3291FF;
            font-family: PingFangSC-Medium;
            font-size: ${translateRem(16)};
            letter-spacing: ${translateRem(-0.18)};
        }
        .btn_sg{
            background-image: linear-gradient(225deg, #158AFE 0%, #3FA5F0 100%);
            color: #FFFFFF;
            margin-top: ${translateRem(25)};
        }

        /* 审批中 */
        .doing_img{
            width: ${translateRem(89)}; 
            object-fit: fill;
            margin-top: ${translateRem(18)};
        }
        .checking{
            font-family: PingFangSC-Medium;
            font-size: ${translateRem(17)};
            color: #333333;
            text-align: center;
            font-weight: 550;
            line-height: ${translateRem(18)};
            margin-top: ${translateRem(9.5)};
        }
        .descing{
            margin-top: ${translateRem(11.5)};
            font-family: PingFangSC-Regular;
            font-size: ${translateRem(14)};
            color: #9F9F9F;
            letter-spacing: 0;
            text-align: center;
            line-height: ${translateRem(21)};
            margin-left: ${translateRem(29)};
            margin-right: ${translateRem(9)};
        }
        .equip_detail{
            margin: ${translateRem(41)}  ${translateRem(34)} 0 ${translateRem(35)};;
            background: #F9F9F9;
            border-radius: ${translateRem(8)};
            padding:  ${translateRem(24.5)}  ${translateRem(16)} ${translateRem(8.6)};
            ul{
                li{
                    display: flex; 
                    flex-wrap:wrap; 
                    margin-bottom: ${translateRem(17)};
                    font-family: PingFangSC-Regular;
                    font-size: ${translateRem(14)};
                    color: #9F9F9F;  
                    span{ 
                        flex:1;
                        margin-left:${translateRem(24)};
                        color: #333333;
                        line-height: ${translateRem(14)}; 
                        text-align: left;
                    } 
                } 
            }
        }
    }
    
`