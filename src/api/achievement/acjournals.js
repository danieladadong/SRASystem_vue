import{
    postJsonRequest,
    postRequest,
    getRequest,
    putJsonRequest,
    deleteRequest
} from '@/api/axios'
let url = 'achievement/acjournals/'
export const getAcJournals=(params)=>{
    return getRequest(url,params);
}
export const getAcJournal=(params)=>{
    return getRequest(url,params);
}
export const addAcJournals=(params)=>{
    return postJsonRequest(url,params);
}
export const updateAcJournals=(id,params)=>{
    return putJsonRequest(url+id+'/',params);
}
export const deleteAcJournals=(params)=>{
    return deleteRequest(url+params+'/');
}
export const getAcJournalDetail=(params)=>{
    return getRequest(url+params+'/');
}
export const getAcJournalsEcharts=(params)=>{
    return postRequest('achievement/ajtat/',params);
}