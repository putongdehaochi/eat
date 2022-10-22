import http from '@/config/http';

export default {
    getMovieList(params) {
        return http.get('/movie/list', params)
    },
    getDbMovieList(params) {
        return http.get('/movie/dbsearch', params)
    },
    getMyMovieList(params) {
        return http.get('/movie/search', params)
    },
    addFavorMovie(data) {
        return http.post('/movie/add', data)
    },
    removeFavorMovie(data) {
        return http.post('/movie/remove', data)
    }
}
