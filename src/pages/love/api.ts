import http from '@/config/http';

export default {
    login(data: object) {
        return http.post('/movie/search', data)
    },
    getMovieList(params) {
        return http.get('/movie/list', params)
    }
}
