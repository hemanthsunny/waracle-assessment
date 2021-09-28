import get from 'services/get'

import {
  SET_DISPLAY_IMAGES,
  SET_DISPLAY_IMAGES_ERROR
} from 'store/types'

interface Content {
  url: string,
  data: any
}

export const SetDisplayImages = (content: Content) => {
  return (dispatch: any) => {
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
