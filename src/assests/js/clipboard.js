import Clipboard from 'clipboard'
import { Toast } from 'antd-mobile';

/**
 * 封装复制功能  修复bug
 * @param {*} text 
 * @param {*} type 
 * @param {*} event 
 */
export default function handleClipboard(text,type,event){
    const clipboard =  new Clipboard(event.target,{
        text:()=>text
    })
    clipboard.on('success',() => {
        if(type === 'name'){ 
            Toast.info('复制户名成功', 3);
        }else if(type === 'account'){
            Toast.info('复制账号成功', 3); 
        }else if(type === 'bankName'){
            Toast.info('复制银行名称成功', 3); 
        }
        clipboard.destroy()
    })
    clipboard.on('error',() =>{
        Toast.info('复制失败', 3); 
        clipboard.destroy()
    })
    clipboard.onClick(event)
}