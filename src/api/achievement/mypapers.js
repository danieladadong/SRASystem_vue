import{
    postJsonRequest,
    postRequest,
    getRequest,
    putJsonRequest,
    deleteRequest
} from '@/api/axios'
let url = 'achievement/paper/'
export const getMyPapers=(params)=>{
    return getRequest(url,params);
}
export const getMyPaper=(params)=>{
    return getRequest(url,params);
}
export const addMyPapers=(params)=>{
    return postJsonRequest(url,params);
}
export const updateMyPapers=(id,params)=>{
    return putJsonRequest(url+id+'/',params);
}
export const deleteMyPapers=(params)=>{
    return deleteRequest(url+params+'/');
}
export const getMyPaperDetail=(params)=>{
    return getRequest(url+params+'/');
}
export const getPaperEcharts=(params)=>{
    return postRequest('achievement/papertat/',params);
}