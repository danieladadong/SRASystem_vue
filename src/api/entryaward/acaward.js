import{
    postJsonRequest,
    postRequest,
    getRequest,
    putJsonRequest,
    deleteRequest
} from '@/api/axios'
let url = 'entryaward/achievementaward/'
export const getAcwards=(params)=>{
    return getRequest(url,params);
}
export const getAcward=(params)=>{
    return getRequest(url,params);
}
export const addAcward=(params)=>{
    return postJsonRequest(url,params);
}
export const updateAcward=(id,params)=>{
    return putJsonRequest(url+id+'/',params);
}
export const deleteAcward=(params)=>{
    return deleteRequest(url+params+'/');
}
export const getAcwardDetail=(params)=>{
    return getRequest(url+params+'/');
}