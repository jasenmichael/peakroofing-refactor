// import jsonapiParse from 'jsonapi-parse'
import axios from 'axios'
import qs from 'qs'

// Add a response interceptor to format response with jsonapi-parse
// axios.interceptors.response.use(response => {
//   return jsonapiParse.parse(response.data).data
// });

export default {
  get: (uri, params = null) => {
    const query = params ? '?' + qs.stringify(params, { indices: false }) : '';
    const url = `${process.env.rest_URL}/${uri}${query}`
    console.log(url)
    return axios.get(url)
        .then((res) => {
            return res.data
        })
  },
};