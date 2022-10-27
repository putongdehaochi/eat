import http from '@/config/http';

export default {
    getFoodList(params) {
        return http.get('/food/list', params)
    },
    addFood(data) {
        return http.post('/food/add', data)
    },
    removeFood(data) {
        return http.post('/food/remove', data)
    },
    editFood(data) {
        return http.post('/food/edit', data)
    },
}
