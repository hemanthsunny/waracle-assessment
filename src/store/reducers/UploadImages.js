import { SET_UPLOAD_IMAGES } from '../types'

const INITIAL_STATE = {
  uploading: false,
  uploadedImageResult: ''
}

const uploadImages = (state = INITIAL_STATE, action) => {
  const { payload } = action
  switch (action.type) {
    case SET_UPLOAD_IMAGES: {
      return {
        ...state,
        uploading: payload.uploading,
        uploadedImageResult: payload.uploadedImageResult || ''
      }
    }
    default:
      return state
  }
}

export default uploadImages
