import{
    postJsonRequest,
    postRequest,
    getRequest,
    putJsonRequest,
    deleteRequest
} from '@/api/axios'
let url = 'achievement/acmonograph/'
export const getAcMonographs=(params)=>{
    return getRequest(url,params);
}
export const getAcMonograph=(params)=>{
    return getRequest(url,params);
}
export const addAcMonograph=(params)=>{
    return postJsonRequest(url,params);
}
export const updateAcMonograph=(id,params)=>{
    return putJsonRequest(url+id+'/',params);
}
export const deleteAcMonograph=(params)=>{
    return deleteRequest(url+params+'/');
}
export const getAcMonographDetail=(params)=>{
    return getRequest(url+params+'/');
}