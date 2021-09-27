import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { UploadIcon, TrashIcon } from '@heroicons/react/outline'
import { toast } from 'react-toastify'

import { HeaderComponent } from 'components'
import { SetUploadImages } from 'store/actions'

const UploadFileComponent = (props) => {
  const [selectedImage, setSelectedImage] = useState('')
  const history = useHistory()

  useEffect(() => {
    if (props.uploadedImageResult) {
      if (props.uploadedImageResult.status === 200) {
        toast.success('Successfully uploaded!', {
          position: toast.POSITION.TOP_RIGHT
        })
      } else {
        toast.error('Something went wrong. Try again later!', {
          position: toast.POSITION.TOP_RIGHT
        })
      }
      history.push('/')
    }
  })

  const selectImage = async (file) => {
    if (!file) {
      toast.error('Invalid image. Try again!', {
        position: toast.POSITION.TOP_RIGHT
      })
      return null
    }
    setSelectedImage(file)
  }

  const uploadImage = async () => {
    if (!selectedImage) {
      toast.error('Image not found. Try again!', {
        position: toast.POSITION.TOP_RIGHT
      })
      return null
    }
    console.log('selectImage', selectedImage, props.uploading)
    const formData = new FormData()
    formData.append('file', selectedImage)
    formData.append('sub_id', 'User-123')
    await props.bindUploadImages({
      url: 'images/upload',
      formData
    })
  }

  const removeSelectedImage = () => {
    setSelectedImage('')
  }

  return (
    <div className='font-quicksand'>
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
              </div>
              {
                selectedImage
                  ? (
                    <div className='flex justify-evenly align-items-center'>
                      <img
                        src={URL.createObjectURL(selectedImage)}
                        alt='Cat img'
                        className='w-80 h-80 py-6 object-contain'
                      />
                      {
                        props.uploading
                          ? <div className="">
                            <button className='flex bg-green-500 hover:bg-green-700 duration-500 text-white font-bold py-2 px-4 rounded my-3' disabled>
                              <UploadIcon className='block h-6 w-6 mr-2 animate-bounce' aria-hidden="true" />
                              Uploading...
                            </button>
                          </div>
                          : <div className="">
                            <button className='flex bg-green-500 hover:bg-green-700 duration-500 text-white font-bold py-2 px-4 rounded my-3' onClick={uploadImage} disabled={props.loading}>
                              <UploadIcon className='block h-6 w-6 mr-2' aria-hidden="true" />
                              <span>Upload image</span>
                            </button>
                            <button className='flex bg-red-500 hover:bg-red-700 duration-500 text-white font-bold py-2 px-4 rounded' onClick={removeSelectedImage}>
                              <TrashIcon className="block h-6 w-6 mr-2" aria-hidden="true" /> Remove
                            </button>
                          </div>
                        }
                    </div>
                    )
                  : (
                    <div className="flex justify-center mt-6">
                      <label className="w-64 flex flex-col items-center px-4 py-6 bg-white rounded-md shadow-md tracking-wide uppercase border border-blue cursor-pointer hover:bg-purple-600 hover:font-bold text-purple-600 ease-linear transition-all duration-150">
                          <UploadIcon className="block h-8 w-8 mr-2 animate-bounce" aria-hidden="true" />
                        <span className="mt-3 text-base font-light leading-normal">Select a cat image</span>
                        <input type='file' className="hidden" onChange={e => selectImage(e.target.files[0])} accept='image/*' />
                      </label>
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
