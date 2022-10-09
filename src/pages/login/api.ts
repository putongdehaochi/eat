import http from '@/config/http';

export default {
    login(data: object) {
        return http.post('/users/login', data)
    },
}
