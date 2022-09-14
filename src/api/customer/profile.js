import{
    postJsonRequest,
    postRequest,
    getRequest,
    putJsonRequest,
    deleteRequest
} from '@/api/axios'
let url = 'customer/profile/'
export const getProfiles=(params)=>{
    return getRequest(url,params);
}
export const getProfile=(params)=>{
    return getRequest(url,params);
}
export const addProfile=(params)=>{
    return postJsonRequest(url,params);
}
export const updateProfile=(id,params)=>{
    return putJsonRequest(url+id+'/',params);
}
export const deleteProfile=(params)=>{
    return deleteRequest(url+params+'/');
}
export const getProfileDetail=(params)=>{
    return getRequest(url+params+'/')
}