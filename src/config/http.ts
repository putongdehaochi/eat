const Fly = require("flyio/dist/npm/wx");
import { filterParams } from '@/utils'
import Taro from '@tarojs/taro';
import env from '@/env.json'
import _ from 'lodash';
const fly = new Fly();
const fly2 = new Fly();

fly.config.baseURL = `${env.host}/api/v1`

fly.interceptors.request.use(config => {
    const { baseURL, url, method, body } = config
    const token_type = "Bearer"
    const { token } = Taro.getStorageSync('user')
    if (!token) Taro.redirectTo({ url: '/pages/login/index' })
    config.headers.Authorization = token_type + ' ' + token
    console.group(`---------- 请求 [${baseURL}${url} ${method}]`);
    console.log('参数: ', filterParams(body));
    console.groupEnd()
    config.body = filterParams(body)
    return config
})

fly.interceptors.response.use(response => {
    const { status, request } = response
    const { baseURL, url } = request

    console.group(`========== 响应 [${baseURL}${url} code:${status}]`);
    console.log('结果: ', response);
    console.groupEnd()
    let data = _.get(response, 'data', response)
    return data
})

export default fly

fly2.config.baseURL = `${env.musicHost}`

fly2.interceptors.request.use(config => {
    const { baseURL, url, method, body } = config
    console.group(`---------- 请求 [${baseURL}${url} ${method}]`);
    console.log('参数: ', filterParams(body));
    console.groupEnd()
    config.body = filterParams(body)
    return config
})

fly2.interceptors.response.use(response => {
    const { status, request } = response
    const { baseURL, url } = request

    console.group(`========== 响应 [${baseURL}${url} code:${status}]`);
    console.log('结果: ', response);
    console.groupEnd()
    let data = _.get(response, 'data', response)
    return data
})

export { fly2 as musicHttp }