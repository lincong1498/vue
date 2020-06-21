import axios from 'axios';
// 携带令牌的get方法
function get(url, params = {}) {
    const token = localStorage.getItem('htuser')?JSON.parse(localStorage.getItem('htuser')).token:'';
    return new Promise((res, rej) => {
        axios({
            url,
            params,
            headers: {
                'Authorization': token
            }
        }).then(response => {
            res(response)
        }).catch(err => {
            rej(err);
        })
    })
}

function post(url, data = {}) {
    const token = localStorage.getItem('htuser')?JSON.parse(localStorage.getItem('htuser')).token:'';
    return new Promise((res, rej) => {
        axios({
            url,
            data,
            method:'post',
            headers: {
                'Authorization': token
            }
        }).then(response => {
            res(response)
        }).catch(err => {
            rej(err);
        })
    })
}
export default {get,post}