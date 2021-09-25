import get from 'services/get'

import {
  SET_DISPLAY_IMAGES,
  SET_DISPLAY_IMAGES_ERROR
} from 'store/types'

export const SetDisplayImages = (content) => {
  return (dispatch) => {
    get(content.url, content.data).then((res) => {
      dispatch({
        type: SET_DISPLAY_IMAGES,
        payload: {
          images: res.data
        }
      })
    }).catch(err => {
      dispatch({
        type: SET_DISPLAY_IMAGES_ERROR,
        payload: {
          imagesError: err.toJSON()
        }
      })
    })
  }
}
