import http from '@/config/http';

export default {
    searchDbMovie(data: object) {
        return http.post('/movie/search', data)
    },
    getMovieList(params) {
        return http.get('/movie/list', params)
    },
    getDbMovieList(params) {
        return http.get('/movie/dbsearch', params)
    },
    getMyMovieList(params) {
        return http.get('/movie/search', params)
    }
}
