import{
    postJsonRequest,
    postRequest,
    getRequest,
    putJsonRequest,
    deleteRequest
} from '@/api/axios'
let url = 'research/project/'
export const getProjects=(params)=>{
    return getRequest(url,params);
}
export const getProject=(params)=>{
    return getRequest(url,params);
}
export const addProject=(params)=>{
    return postJsonRequest(url,params);
}
export const updateProject=(id,params)=>{
    return putJsonRequest(url+id+'/',params);
}
export const deleteProject=(params)=>{
    return deleteRequest(url+params+'/');
}
export const getProjectDetail=(params)=>{
    return getRequest(url+params+'/');
}