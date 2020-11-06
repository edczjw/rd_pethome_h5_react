import{createGlobalStyle}from"styled-components";

//手写px转remjs
function translateRem(pxValue) {
    const ratio = 37.5; // 根据项目配置比例的方式自行设定
    // pxValue = parseInt(pxValue); 
    return pxValue / ratio + 'rem';
}

export const Globalstyle=createGlobalStyle`
/*! minireset.css v0.0.6 | MIT License | github.com/jgthms/minireset.css */
html,
body,
p,
ol,
ul,
li,
dl,
dt,
dd,
blockquote,
figure,
fieldset,
legend,
textarea,
pre,
iframe,
hr,
h1,
h2,
h3,
h4,
h5,
h6 {
    margin: 0;
    padding: 0
}

h1,
h2,
h3,
h4,
h5,
h6 {
    font-size: 100%;
    font-weight: normal
}

ul {
    list-style: none;
}

button,
input,
select,
textarea {
    margin: 0
}

html {
    box-sizing: border-box;
    font-size: 37.5px;  
}

html,body,#root,.App{
    height: 100%;
    background: #fff;
} 

@supports (top: constant(safe-area-inset-top)) or (top: env(safe-area-inset-top)) {
    #root {
        /* ios < 11.2 */ 
        padding-top: constant(safe-area-inset-top) ;
        /* ios >= 11.2 */ 
        padding-top: env(safe-area-inset-top);
        }
} 
@supports (bottom: constant(safe-area-inset-bottom)) or (bottom: env(safe-area-inset-bottom)) {
    #root {
        /* ios < 11.2 */ 
        padding-bottom: constant(safe-area-inset-bottom);
        /* ios >= 11.2 */ 
        padding-bottom: env(safe-area-inset-bottom);
        }
}
 
*,
*::before,
*::after {
    box-sizing: inherit
}

img,
video {
    height: auto;
    max-width: 100%
}

iframe {
    border: 0
}

table {
    border-collapse: collapse;
    border-spacing: 0
}

input {
    caret-color:  #3C91FF;
    line-height: normal !important
}

input:disabled{  
    color:rgb(0, 0, 0);
    opacity: 1;
    -webkit-text-fill-color: rgb(0, 0, 0);
}

        
input::-webkit-input-placeholder { 
    color: #AAAAAA !important; 
    padding-top: ${translateRem(2.8)}; 
}

input::-moz-placeholder { 
    color: #AAAAAA !important; 
    padding-top: ${translateRem(2.8)}; 
}

input::-moz-placeholder { 
    color: #AAAAAA !important;  
    padding-top: ${translateRem(2.8)}; 
}

input::-ms-input-placeholder { 
    color: #AAAAAA !important; 
    padding-top: ${translateRem(2.8)}; 
    
}
td,
th {
    padding: 0
}

td:not([align]),
th:not([align]) {
    text-align: left
}

/* // 禁止长按图片保存 */
img {
    -webkit-touch-callout: none;
    pointer-events: none; 
}

element {
    -webkit-touch-callout: none;
}

/* // 禁止长按选择文字 //滑动不粘手，顺畅 */
div {
    -webkit-user-select: none;
    -webkit-overflow-scrolling: touch; 
    -webkit-touch-callout: none;
}

.OutWrapContainer{
    height:100%
}
 
.fixbtn{ 
    position: fixed;
    left:0;
    bottom: 0;
    width:100%;
    z-index:99
}
.fixbtn1{ 
    position: static;
    left:0;
    bottom: 0;
    width:100%;
    z-index:99
}

.seemore{
    font-family: PingFangSC-Regular;
    font-size: ${translateRem(14)};
    color: #9F9F9F;
    letter-spacing: ${translateRem(-0.2)};
    text-align: center;
    padding:${translateRem(16)};
}
.ToastOutWrap{
    width: 100%; 
    position: fixed;
    top:40%;  
    display: flex;
    justify-content: center;
    align-items: center; 
}
.am-toast > span{
    max-width: 90%;
}
.am-toast-notice-content .am-toast-text{
    padding: ${translateRem(12)} ${translateRem(20)};
    font-family: PingFangSC-Regular;
    font-size: ${translateRem(16)};
    color: #FFFFFF;
    letter-spacing: 0;
    line-height: ${translateRem(16)};
    border-radius: ${translateRem(8)};
    background: rgba(0,0,0,0.70);
}
.am-modal-transparent{
    width: ${translateRem(320)}; 
}
.am-modal-transparent .am-modal-content{
    padding: 0;
    border-radius: ${translateRem(8)};
}
.am-modal-transparent .am-modal-content .am-modal-body{
    padding: ${translateRem(30)} ${translateRem(28)} ${translateRem(25)};
    font-family: PingFangSC-Regular;
    font-size: ${translateRem(16)};
    color: #333333;
    letter-spacing: 0;
    text-align: justify;
    line-height: ${translateRem(24)}; 
    .alrtBox{
        text-align: left;
        font-family: PingFangSC-Regular;
        .alrtTit{
            font-family: PingFangSC-Medium;
            font-size: ${translateRem(18)};
            color: #333333;
            letter-spacing: 0;
            line-height: ${translateRem(18)};
            font-weight: 550;
        }
        .alrtdesc{
            margin-top: ${translateRem(8)};
            font-size: ${translateRem(13)};
            color: #9A9A9A;
            letter-spacing: 0;
            line-height: ${translateRem(13)};
            padding-bottom: ${translateRem(7)};
        }
        .alrtFlex{ 
            margin-top: ${translateRem(18)};
            font-size: ${translateRem(14)};
            color: #9F9F9F;
            line-height: ${translateRem(12)};
            display: flex;
            align-items: center;
            p{
                width:${translateRem(50)};
            }
            span{
                flex: 1;
                margin-left: ${translateRem(3)};
                color: #333333;
            }
        }
    } 
}
.am-modal-footer{
    height: ${translateRem(48)};
    font-family: PingFangSC-Medium;
    font-size: ${translateRem(17)};
    color: #3C91FF;
    letter-spacing: ${translateRem(-0.2)};
    text-align: center;
    line-height: ${translateRem(18)};
}
.am-modal-button{ 
    font-size: ${translateRem(17)} !important;
}
.am-modal-button-group-h .am-modal-button:first-child{
    color: #999999;
}  
.am-list-item .am-input-control input:disabled{
    color:#000 !important;
}
.am-list-item .am-input-control input{
    padding:0; 
}
.am-list-item .am-input-control{
    font-size: ${translateRem(16)};
    height: 100%;
    line-height: ${translateRem(48)};
}
.am-modal-button{ 
    color: #177EF4;
}
.am-modal-button-active{
    background-color: #fff;
}
.am-list-item .am-input-control .fake-input-container{
    height: 100%;
    line-height: ${translateRem(48)};
}
.am-list-item .fake-input-placeholder{
    height: 100%;
    line-height: ${translateRem(48)};
}
.am-list-item .am-input-control .fake-input-container .fake-input.focus:after{
    height: ${translateRem(23)};
    top:calc( 50% - ${translateRem(11.5)});
    border-right:${translateRem(2)} solid #177EF4;
    right:0;
}
.am-list-item .am-input-label{
    padding: 0;
}
`;