import{
    postJsonRequest,
    postRequest,
    getRequest,
    putJsonRequest,
    deleteRequest
} from '@/api/axios'
export const Login=(params)=>{
    return postRequest('login/',params);
}
export const Regist=(params)=>{
    return postRequest('regist/',params);
}