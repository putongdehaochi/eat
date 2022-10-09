import Taro from "@tarojs/taro"
import _ from "lodash"

const promiseCatcher = (promise) => {
    return promise.then(res => [null, res]).catch(err => {
        const error = _.get(err, 'response.data') || '系统错误'
        return [error || {}]
    })
}

const handleError = (error) => {
    if (_.isEmpty(error)) return
    const { msg, message, errors = {} } = error || {}
    const title = msg || message || JSON.stringify(errors)
    Taro.showToast({ title, icon: 'none', duration: 2000 })
}

const isEmpty = (value) => {
    if (_.isNumber(value) || _.isBoolean(value) || _.isArray(value)) return false
    return _.isEmpty(value)
}

const filterParams = (params) => {
    params = { ...params }
    for (const key in params) {
        if (params.hasOwnProperty(key)) {
            const value = params[key]
            if (isEmpty(value)) {
                delete params[key]
            }
        }
    }
    return params
}

export {
    promiseCatcher,
    filterParams,
    handleError,
}