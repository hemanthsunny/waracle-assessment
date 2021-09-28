import { combineReducers } from 'redux'
import displayImages from './DisplayImages'
import uploadImages from './UploadImages'
import favorites from './Favorites'
import votes from './Votes'

export default combineReducers({
  displayImages,
  uploadImages,
  favorites,
  votes
})
