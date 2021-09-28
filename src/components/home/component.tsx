import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { HeaderComponent, HomeCardComponent } from 'components'
import {
  SetDisplayImages,
  SetUploadedResult,
  SetFavorites,
  GetFavorites,
  SetVotes,
  GetVotes
} from 'store/actions'

interface Props {
  images: Array<any>,
  bindUploadedResult: Function,
  bindDisplayImages: Function,
  bindGetFavorites: Function,
  bindGetVotes: Function,
  imagesError: {message: string}
}

const HomeComponent = (props: Props) => {
  useEffect(() => {
    if (!props.images[0]) {
      props.bindUploadedResult('')
      props.bindDisplayImages({
        url: 'images',
        queryParams: {
          sub_id: 'User-123',
          limit: 10,
          size: 'full',
          order: 'DESC'
        }
      })
      props.bindGetFavorites({ url: 'favourites' })
      props.bindGetVotes({ url: 'votes' })
    }
  })

  return (
    <div>
      <HeaderComponent path='/' />
      <div className='container'>
        {
          props.imagesError && <div>
            {props.imagesError.message}
          </div>
        }
        {
          props.images && props.images.map((img, idx) => (
            <HomeCardComponent image={img} key={idx} />
          ))
        }
      </div>
    </div>
  )
}

const mapStateToProps = (state: any) => {
  const { images, imagesError } = state.displayImages
  const { votes, votesError } = state.votes
  const { favorites, favoritesError } = state.favorites
  return { images, imagesError, votes, votesError, favorites, favoritesError }
}

const mapDispatchToProps = (dispatch: Function) => {
  return {
    bindDisplayImages: (content: any) => dispatch(SetDisplayImages(content)),
    bindUploadedResult: (content: any) => dispatch(SetUploadedResult(content)),
    bindSetFavorites: (content: any) => dispatch(SetFavorites(content)),
    bindGetFavorites: (content: any) => dispatch(GetFavorites(content)),
    bindSetVotes: (content: any) => dispatch(SetVotes(content)),
    bindGetVotes: (content: any) => dispatch(GetVotes(content))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeComponent)
