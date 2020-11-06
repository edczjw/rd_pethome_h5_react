/**
 * 封装缓存的操作方法
 */
const Storage = {
    //保存缓存
    set(name,value){
        localStorage.setItem(name,value)
    },

    //获取缓存信息
    get(name){
        return localStorage.getItem(name)
    },

    //移除缓存
    remove(name){
        localStorage.removeItem(name)
    }
}
export default Storage;