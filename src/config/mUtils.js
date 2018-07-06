/**
 * 存储
 */
export const setStore = (name,value)=>{
    if(!name){return}
    if(typeof value !== 'string'){
        value = JSON.stringify(value);
    }
    window.localStorage.setItem(name,value);
}

export const getStore = (name)=>{
   return name?window.localStorage.getItem(name):null;
}
export const removeStore = (name)=>{
    return name?window.localStorage.removeItem(name):null;
}