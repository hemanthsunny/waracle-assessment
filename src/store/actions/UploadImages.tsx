import post from 'services/post'

import {
  SET_UPLOAD_IMAGES
} from 'store/types'

interface Content {
  url: string,
  formData: any
}

export const SetUploadImages = (content: Content) => {
  return (dispatch: Function) => {
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
            status: 200,
            data: {
              message: 'Successful'
            }
          },
          uploading: false
        }
      })
    }).catch(err => {
      err = err.toJSON()
      dispatch({
        type: SET_UPLOAD_IMAGES,
        payload: {
          uploadedImageResult: {
            status: err.code || 500,
            data: err.message
          },
          uploading: false
        }
      })
    })
  }
}

export const SetUploadedResult = (content: any) => {
  return (dispatch: Function) => {
    dispatch({
      type: SET_UPLOAD_IMAGES,
      payload: {
        uploading: false,
        uploadedImageResult: content
      }
    })
  }
}
