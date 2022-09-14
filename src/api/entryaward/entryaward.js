import{
    postJsonRequest,
    postRequest,
    getRequest,
    putJsonRequest,
    deleteRequest
} from '@/api/axios'
let url = 'entryaward/entryawards/'
export const getEntryWards=(params)=>{
    return getRequest(url,params);
}
export const getEntryWard=(params)=>{
    return getRequest(url,params);
}
export const addEntryWard=(params)=>{
    return postJsonRequest(url,params);
}
export const updateEntryWard=(id,params)=>{
    return putJsonRequest(url+id+'/',params);
}
export const deleteEntryWard=(params)=>{
    return deleteRequest(url+params+'/');
}
export const getEntryWardDetail=(params)=>{
    return getRequest(url+params+'/');
}