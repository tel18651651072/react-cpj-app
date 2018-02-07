/**
 * Created by mac on 2018/1/1.
 */

import axios from './requestConfig/axios'
import qs from 'qs'
const baseUrl = 'http://localhost:8124'

// axios.defaults.withCredentials = true
export function IdentifyGetCode() {
    return axios.get(baseUrl+'/ccap',{withCredentials: true})
        .catch(function (error) {
            console.log(error)
        })
}

export function IdentifypostCode(code) {
    return axios.post(baseUrl+'/IdentifyCode',qs.stringify({
        code:code
    }),{withCredentials: true})
        .catch(function (error) {
            console.log(error)
        })
}

export function register(token) {
    return axios.post(baseUrl+'/register',qs.stringify({token:token}),{withCredentials: true})
        .catch(function (error) {
            console.log(error)
        })
}

export function submitUserdata(userdata) {
    return axios.post(baseUrl+'/submitUserData',qs.stringify({userdata:userdata}),{withCredentials: true})
        .catch(err => {
            console.log(err)
        })
}

export function verifyEmail(email) {
    return axios.post(baseUrl+'/verifyEmail',qs.stringify({email:email}),{withCredentials: true})
        .catch(err => {
            console.log(err)
        })
}

export function verifyLogin(userdata) {
    return axios.post(baseUrl+'/verifyLogin',qs.stringify({userdata:userdata}),{withCredentials: true})
        .catch(err => {
            console.log(err)
        })
}

export function modifyInfo(userdata) {
    return axios.post(baseUrl+'/modifyInfo',qs.stringify({userdata:userdata}),{withCredentials: true})
        .catch(err => {
            console.log(err)
        })
}

export function emailTestPost(userdata) {
    return axios.post(baseUrl+'/emailTest',qs.stringify({userdata:userdata}),{withCredentials: true})
        .catch(function (error) {
        console.log(error)
    })
}

export function submitContent(contentData) {
    return axios.post(baseUrl+'/submitContent',qs.stringify({contentData:contentData}),{withCredentials: true})
        .catch(err => {
            console.log(err)
        })
}

export function fetchContent(classify) {
    return axios.post(baseUrl+'/fetchContent',qs.stringify({classify:classify}),{withCredentials: true})
        .catch(err => {
            console.log(err)
        })
}

export function searchResult(searchData) {
    return axios.post(baseUrl+'/searchResult',qs.stringify({searchData:searchData}),{withCredentials: true})
        .catch(err => {
            console.log(err)
        })
}

export function fetchDetail(uidcode) {
    return axios.post(baseUrl+'/fetchDetail',qs.stringify({uidcode:uidcode}),{withCredentials: true})
        .catch(err => {
            console.log(err)
        })
}

export function getSkimnum(pageInfo) {
    // axios.defaults.withCredentials = true
    return axios.post(baseUrl+'/getSkim',qs.stringify({pageInfo:pageInfo}),{withCredentials: true})
        .catch(err => {
            console.log(err)
        })
}

export function replySubmit(replyData) {
    return axios.post(baseUrl+'/reply',qs.stringify({replyData:replyData}),{withCredentials: true})
        .catch(err => {
            console.log(err)
        })
}

export function fetchReply(uid) {
    return axios.post(baseUrl+'/fetchReply',qs.stringify({uid:uid}),{withCredentials: true})
        .catch(err => {
            console.log(err)
        })
}

export function getSessionEmail() {
    return axios.post(baseUrl+'/getSessionEmail',qs.stringify({}),{withCredentials: true})
        .catch(err => {
            console.log(err)
        })
}

export function removeSessionEmail() {
    return axios.post(baseUrl+'/removeSessionEmail',qs.stringify({}),{withCredentials: true})
}

export function addFollow(followData) {
    return axios.post(baseUrl+'/addFollow',qs.stringify({followData:followData}),{withCredentials: true})
        .catch(err => {
            console.log(err)
        })
}

export function getFollow(followData) {
    return axios.post(baseUrl+'/getFollow',qs.stringify({followData:followData}),{withCredentials: true})
        .catch(err => {
            console.log(err)
        })
}

export function resaveImg(base,email) {
    return axios.post(baseUrl+'/resaveImg',qs.stringify({base:base,email:email}),{withCredentials: true})
}

export function myInfo(email) {
    return axios.post(baseUrl+'/myInfo',qs.stringify({email:email}),{withCredentials: true})
}

export function getFollowList(email) {
    return axios.post(baseUrl+'/getFollowList',qs.stringify({email:email}),{withCredentials: true})
}

export function fetchMyContent(email) {
    return axios.post(baseUrl+'/fetchMyContent',qs.stringify({email:email}),{withCredentials: true})
}

export function fetchMyReply(email) {
    return axios.post(baseUrl+'/fetchMyReply',qs.stringify({email:email}),{withCredentials: true})
}

export function updateContent(contentInfo) {
    return axios.post(baseUrl+'/updateContent',qs.stringify({contentInfo:contentInfo}),{withCredentials: true})
}
// 测试
// export function getSkimnum() {
//     // axios.defaults.withCredentials = true
//     return axios.post(baseUrl+'/getSkim')
//         .catch(err => {
//             console.log(err)
//         })
// }
