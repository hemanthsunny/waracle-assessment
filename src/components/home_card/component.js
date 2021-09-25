import React, { useState } from 'react'
import { connect } from 'react-redux'

import {
  SetDisplayImages,
  SetUploadedResult,
  SetFavorites,
  GetFavorites,
  RemoveFavorites,
  SetVotes,
  GetVotes
} from 'store/actions'

const HomeCardComponent = (props) => {
  const [vote, setVote] = useState(props.votes && props.votes.find((v) => v.image_id === props.image.id))
  const [favorite, setFavorite] = useState(props.favorites && props.favorites.find((v) => v.image_id === props.image.id))

  console.log('fav', favorite)
  const addFavorite = (id) => {
    if (!id) {
      alert('Id is required')
      return
    }
    /*
      Update the favourites
    */
    props.bindSetFavorites({
      url: 'favourites',
      data: {
        image_id: id,
        sub_id: 'User-123'
      }
    })

    /*
      Refresh the favourites
    */
    props.bindGetFavorites({ url: 'favourites' })
    setFavorite(props.favorites && props.favorites.find((v) => v.image_id === props.image.id))
  }

  const removeFavorite = (id) => {
    if (!id) {
      alert('Id is required')
      return
    }
    /*
      Update the favourites
    */
    props.bindRemoveFavorites({
      url: `favourites/${id}`
    })

    /*
      Refresh the favourites
    */
    props.bindGetFavorites({ url: 'favourites' })
    setFavorite('')
  }

  const handleVoteUpDown = (id, value) => {
    if (!id) {
      alert('Id is required')
      return
    }
    /*
      Update the votes
    */
    props.bindSetVotes({
      url: 'votes',
      data: {
        image_id: id,
        value: +value,
        sub_id: 'User-123'
      }
    })

    /*
      Refresh the votes
    */
    props.bindGetVotes({ url: 'votes' })
    setVote({ ...vote, value })
  }

  return (
    <div className="relative w-40 h-40 overflow-hidden">
      <img src={props.image.url} alt="Avatar" className="object-cover w-full h-full" />
      <div className="absolute w-full py-2.5 bottom-0 inset-x-0 text-white text-xs text-center leading-4">
        <div className="flex justify-center mt-6">
          {
            vote && vote.value === 1
              ? <img src={require('assets/svgs/ThumbsUpDark.svg').default} alt="Avatar" className="w-6 h-6 object-cover" onClick={e => handleVoteUpDown(props.image.id, 1)} />
              : <img src={require('assets/svgs/ThumbsUpLight.svg').default} alt="Avatar" className="w-6 h-6 object-cover" onClick={e => handleVoteUpDown(props.image.id, 1)} />
          }
          {
            vote && vote.value === 0
              ? <img src={require('assets/svgs/ThumbsDownDark.svg').default} alt="Avatar" className="w-6 h-6 object-cover" onClick={e => handleVoteUpDown(props.image.id, 0)} />
              : <img src={require('assets/svgs/ThumbsDownLight.svg').default} alt="Avatar" className="w-6 h-6 object-cover" onClick={e => handleVoteUpDown(props.image.id, 0)} />
          }
          {
            favorite
              ? <img src={require('assets/svgs/StarDark.svg').default} alt="Avatar" className="w-6 h-6 object-cover" onClick={e => removeFavorite(favorite.id)} />
              : <img src={require('assets/svgs/StarLight.svg').default} alt="Avatar" className="w-6 h-6 object-cover" onClick={e => addFavorite(props.image.id)} />
          }
        </div>
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
    bindRemoveFavorites: (content) => dispatch(RemoveFavorites(content)),
    bindSetVotes: (content) => dispatch(SetVotes(content)),
    bindGetVotes: (content) => dispatch(GetVotes(content))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeCardComponent)
