/**
 * 获取地址参数
 */
const UrlParam={  
    getParams(t,f){
        //f.substring(1)除去问号?   再拆分成数组
        for (var e = decodeURIComponent(f).substring(1).split("&"), s = 0; s < e.length; s++) {
            //继续拆分成数组
            var r = e[s].split("="); 
            if (r[0] === t) return r[1]
        }
        return false 
    }
}
export default UrlParam;
 