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

const HomeComponent = (props) => {
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

const mapStateToProps = (state) => {
  const { images, imagesError } = state.displayImages
  const { votes, votesError } = state.votes
  const { favorites, favoritesError } = state.favorites
  return { images, imagesError, votes, votesError, favorites, favoritesError }
}

const mapDispatchToProps = (dispatch) => {
  return {
    bindDisplayImages: (content) => dispatch(SetDisplayImages(content)),
    bindUploadedResult: (content) => dispatch(SetUploadedResult(content)),
    bindSetFavorites: (content) => dispatch(SetFavorites(content)),
    bindGetFavorites: (content) => dispatch(GetFavorites(content)),
    bindSetVotes: (content) => dispatch(SetVotes(content)),
    bindGetVotes: (content) => dispatch(GetVotes(content))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeComponent)
