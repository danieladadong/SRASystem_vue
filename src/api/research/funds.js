import{
    postJsonRequest,
    postRequest,
    getRequest,
    putJsonRequest,
    deleteRequest
} from '@/api/axios'
let url = 'research/fund/'
export const getFunds=(params)=>{
    return getRequest(url,params);
}
export const getFund=(params)=>{
    return getRequest(url,params);
}
export const addFund=(params)=>{
    return postJsonRequest(url,params);
}
export const updateFund=(id,params)=>{
    return putJsonRequest(url+id+'/',params);
}
export const deleteFund=(params)=>{
    return deleteRequest(url+params+'/');
}
export const getFundDetail=(params)=>{
    return getRequest(url+params+'/');
}