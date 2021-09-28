import axios from 'axios'

export default async function (url: string, data: any, headers = {}) {
  axios.defaults.headers.common['x-api-key'] = process.env.REACT_APP_CAT_API_KEY
  return await axios.post(
    process.env.REACT_APP_CAT_API_URL + url,
    data,
    headers
  )
}
