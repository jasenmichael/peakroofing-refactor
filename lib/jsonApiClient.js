import axios from 'axios'
import qs from 'qs'

export default {
  get: (uri, params = null) => {
    const query = params ? '?' + qs.stringify(params, { indices: false }) : ''
    const url = `${process.env.REST_URL}/${uri}${query}`
    console.log(url)
    return axios.get(url)
        .then((res) => {
            return res.data
        })
  },
}