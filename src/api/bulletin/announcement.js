import{
    postJsonRequest,
    postRequest,
    getRequest,
    putJsonRequest,
    deleteRequest
} from '@/api/axios'
let url = 'bulletin/announcement/'
export const getAnnouncements=(params)=>{
    return getRequest(url,params);
}
export const getAnnouncement=(params)=>{
    return getRequest(url,params);
}
export const addAnnouncement=(params)=>{
    return postJsonRequest(url,params);
}
export const updateAnnouncement=(id,params)=>{
    return putJsonRequest(url+id+'/',params);
}
export const deleteAnnouncement=(params)=>{
    return deleteRequest(url+params+'/');
}
export const getAnnouncementDetail=(params)=>{
    return getRequest(url+params+'/');
}