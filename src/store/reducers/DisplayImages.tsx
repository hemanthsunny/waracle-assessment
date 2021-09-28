import { SET_DISPLAY_IMAGES, SET_DISPLAY_IMAGES_ERROR } from '../types'

const INITIAL_STATE = {
  images: [],
  imagesError: ''
}

const displayImages = (state = INITIAL_STATE, action: any) => {
  const { payload } = action
  switch (action.type) {
    case SET_DISPLAY_IMAGES: {
      return {
        ...state,
        images: payload.images
      }
    }
    case SET_DISPLAY_IMAGES_ERROR: {
      return {
        ...state,
        imagesError: payload.imagesError
      }
    }
    default:
      return state
  }
}

export default displayImages
