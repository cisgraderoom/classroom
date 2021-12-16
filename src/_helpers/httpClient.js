import axios from 'axios'
import config from '../config/config'
import router from '../router/index'

const httpClient = axios.create({
    baseURL: config.backendURL,
})

httpClient.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        if (error.response.status == 401) {
            router.push('/').catch(() => {})
        }
        if (error.response.status == 403) {
            router.push('/list').catch(() => {})
        }
        return Promise.reject(error)
    }
)

export default httpClient
