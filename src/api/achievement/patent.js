import{
    postJsonRequest,
    postRequest,
    getRequest,
    putJsonRequest,
    deleteRequest
} from '@/api/axios'
let url = 'achievement/patent/'
export const getPatents=(params)=>{
    return getRequest(url,params);
}
export const getPatent=(params)=>{
    return getRequest(url,params);
}
export const addPatent=(params)=>{
    return postJsonRequest(url,params);
}
export const updatePatent=(id,params)=>{
    return putJsonRequest(url+id+'/',params);
}
export const deletePatent=(params)=>{
    return deleteRequest(url+params+'/');
}
export const getPatentDetail=(params)=>{
    return getRequest(url+params+'/');
}
export const getPatentEcharts=(params)=>{
    return postRequest('achievement/ptat/',params)
}