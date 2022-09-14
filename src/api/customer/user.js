import{
    postJsonRequest,
    postRequest,
    getRequest,
    putJsonRequest,
    deleteRequest
} from '@/api/axios'
let url = 'customer/user/'
export const getUsers=(params)=>{
    return getRequest(url,params);
}
export const getUser=(params)=>{
    return getRequest(url,params);
}
export const addUser=(params)=>{
    return postJsonRequest(url,params);
}
export const updateUser=(id,params)=>{
    return putJsonRequest(url+id+'/',params);
}
export const deleteUser=(params)=>{
    return deleteRequest(url+params+'/');
}
export const getUserDetail=(params)=>{
    return getRequest(url+params+'/')
}
