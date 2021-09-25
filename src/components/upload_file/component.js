import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { UploadIcon, TrashIcon } from '@heroicons/react/outline'

import { HeaderComponent } from 'components'
import { SetUploadImages } from 'store/actions'

const UploadFileComponent = (props) => {
  const [selectedImage, setSelectedImage] = useState('')
  const history = useHistory()

  useEffect(() => {
    if (props.uploadedImageResult) {
      history.push('/')
    }
  })

  const uploadImage = async (file) => {
    if (!file) {
      alert('image is invalid')
      return null
    }
    var formData = new FormData()
    formData.append('file', file)
    formData.append('sub_id', 'User-123')

    setSelectedImage(file)
    await props.bindUploadImages({
      url: 'images/upload',
      formData
    })
  }

  const removeSelectedImage = () => {
    setSelectedImage('')
  }

  return (
    <div>
    <HeaderComponent path='/upload' />
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Upload an image</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Replace with your content */}
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96">
              <div className="flex justify-center mt-6">
              {
                props.uploading
                  ? <div>Uploading</div>
                  : <label className="w-64 flex flex-col items-center px-4 py-6 bg-white rounded-md shadow-md tracking-wide uppercase border border-blue cursor-pointer hover:bg-purple-600 hover:font-bold text-purple-600 ease-linear transition-all duration-150">
                      <UploadIcon className="block h-8 w-8 mr-2" aria-hidden="true" />
                    <span className="mt-3 text-base font-light leading-normal">Upload a cat image</span>
                    <input type='file' className="hidden" onChange={e => uploadImage(e.target.files[0])} accept='image/*' />
                  </label>
              }

              </div>
              {
                selectedImage && (
                  <div>
                    <img
                      src={URL.createObjectURL(selectedImage)}
                      alt='Cat img'
                    />
                    <TrashIcon className="block h-8 w-8 mr-2" aria-hidden="true" onClick={removeSelectedImage} />
                  </div>
                )
              }
            </div>
          </div>
          {/* /End replace */}
        </div>
      </main>
    </div>
  )
}

const mapStateToProps = (state) => {
  const { uploading, uploadedImageResult } = state.uploadImages
  return { uploading, uploadedImageResult }
}

const mapDispatchToProps = (dispatch) => {
  return {
    bindUploadImages: (content) => dispatch(SetUploadImages(content))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadFileComponent)
