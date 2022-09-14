import{
    postJsonRequest,
    postRequest,
    getRequest,
    putJsonRequest,
    deleteRequest
} from '@/api/axios'
let url = 'research/dynamic/'
export const getDynamics=(params)=>{
    return getRequest(url,params);
}
export const getDynamic=(params)=>{
    return getRequest(url,params);
}
export const addDynamic=(params)=>{
    return postJsonRequest(url,params);
}
export const updateDynamic=(id,params)=>{
    return putJsonRequest(url+id+'/',params);
}
export const deleteDynamic=(params)=>{
    return deleteRequest(url+params+'/');
}
export const getDynamicDetail=(params)=>{
    return getRequest(url+params+'/');
}