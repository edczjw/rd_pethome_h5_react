import axios from 'axios';
axios.defaults.baseURL = '/h5';
export const request = (params)=>{
    return new Promise((resolve,reject)=>{
        axios({
            ...params
        }).then(res=>{  //axios返回的是一个promise对象
            resolve(res.data)   
        }).catch(err=>{ 
            alert('发生异常')
        })
    })
} 