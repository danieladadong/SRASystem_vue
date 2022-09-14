import{
    postJsonRequest,
    postRequest,
    getRequest,
    putJsonRequest,
    deleteRequest
} from '@/api/axios'
let url = 'bulletin/acexchange/'
export const getAcexchanges=(params)=>{
    return getRequest(url,params);
}
export const getAcexchange=(params)=>{
    return getRequest(url,params);
}
export const addAcexchange=(params)=>{
    return postJsonRequest(url,params);
}
export const updateAcexchange=(id,params)=>{
    return putJsonRequest(url+id+'/',params);
}
export const deleteAcexchange=(params)=>{
    return deleteRequest(url+params+'/');
}
export const getAcexchangeDetail=(params)=>{
    return getRequest(url+params+'/');
}