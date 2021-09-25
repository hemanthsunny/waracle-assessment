import post from 'services/post'

import {
  SET_UPLOAD_IMAGES
} from 'store/types'

export const SetUploadImages = (content) => {
  return (dispatch) => {
    dispatch({
      type: SET_UPLOAD_IMAGES,
      payload: {
        uploading: true
      }
    })
    post(content.url, content.formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((res) => {
      dispatch({
        type: SET_UPLOAD_IMAGES,
        payload: {
          uploadedImageResult: {
            status: res.status,
            data: res.data
          },
          uploading: false
        }
      })
    })
  }
}

export const SetUploadedResult = (content) => {
  return (dispatch) => {
    dispatch({
      type: SET_UPLOAD_IMAGES,
      payload: {
        uploading: false,
        uploadedImageResult: content
      }
    })
  }
}
