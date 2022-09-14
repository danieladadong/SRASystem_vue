import{
    postJsonRequest,
    postRequest,
    getRequest,
    putJsonRequest,
    deleteRequest
} from '@/api/axios'
let url = 'achievement/achievement/'
export const getAchievements=(params)=>{
    return getRequest(url,params);
}
export const getAchievement=(params)=>{
    return getRequest(url,params);
}
export const addAchievement=(params)=>{
    return postJsonRequest(url,params);
}
export const updateAchievement=(id,params)=>{
    return putJsonRequest(url+id+'/',params);
}
export const deleteAchievement=(params)=>{
    return deleteRequest(url+params+'/');
}
export const getAchievementDetail=(params)=>{
    return getRequest(url+params+'/');
}
export const onepunchman=(params)=>{
    return postRequest('spider/journals/',params);
}
export const getAchievementCategory=(params)=>{
    return postRequest('achievement/stat/',params);
}