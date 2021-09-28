import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { toast } from 'react-toastify'

import {
  SetDisplayImages,
  SetUploadedResult,
  SetFavorites,
  GetFavorites,
  RemoveFavorites,
  RemoveFavoritesResult,
  SetVotes,
  GetVotes,
  RemoveVotes,
  RemoveVoteResult
} from 'store/actions'

interface Props {
  voteResult: string,
  bindGetFavorites: Function,
  votes: any[],
  image: {
    id: string,
    url: string
  },
  bindRemoveVoteResult: Function,
  bindGetVotes: Function,
  bindSetVotes: Function,
  bindRemoveVotes: Function,
  favoritesResult: any,
  favorites: any[],
  bindRemoveFavoritesResult: Function,
  bindSetFavorites: Function,
  bindRemoveFavorites: Function
}

interface Vote {
  id: string,
  value: number
}

interface Favorite {
  id: any
}

const HomeCardComponent = (props: Props) => {
  const [vote, setVote] = useState<Vote>({ id: '', value: 2 })
  const [likeLen, setLikeLen] = useState(0)
  const [dislikeLen, setDislikeLen] = useState(0)
  const [favorite, setFavorite] = useState<Favorite>({ id: '' })

  useEffect(() => {
    if (props.voteResult || !vote || !vote.id) {
      props.bindGetVotes({ url: 'votes' })
      setTimeout(() => {
        setVote(props.votes && props.votes.find((v) => v.image_id === props.image.id))
        setLikeLen(props.votes && props.votes.filter((v) => v.image_id === props.image.id && v.value === 1).length)
        setDislikeLen(props.votes && props.votes.filter((v) => v.image_id === props.image.id && v.value === 0).length)
        props.bindRemoveVoteResult()
      }, 2000)
    }
    if (props.favoritesResult || !favorite || !favorite.id) {
      props.bindGetFavorites({ url: 'favourites' })
      setFavorite(props.favorites && props.favorites.find((v) => v.image_id === props.image.id))
      setTimeout(() => {
        props.bindRemoveFavoritesResult()
      }, 2000)
    }
  })

  const addFavorite = (id: string) => {
    if (!id) {
      toast.error('Something went wrong. Try again later!', {
        position: toast.POSITION.TOP_RIGHT
      })
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
  }

  const removeFavorite = (id: string) => {
    if (!id) {
      toast.error('Something went wrong. Try again later!', {
        position: toast.POSITION.TOP_RIGHT
      })
      return
    }
    /*
      Update the favourites
    */
    props.bindRemoveFavorites({
      url: `favourites/${id}`
    })
  }

  const handleVoteUpDown = (id: string, value: number) => {
    if (!id) {
      toast.error('Something went wrong. Try again later!', {
        position: toast.POSITION.TOP_RIGHT
      })
      return
    }
    props.bindGetVotes({ url: 'votes' })
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
  }

  const removeVote = () => {
    if (!vote.id) {
      toast.error('Something went wrong. Try again later!', {
        position: toast.POSITION.TOP_RIGHT
      })
      return
    }
    /*
      Update the votes
    */
    props.bindRemoveVotes({
      url: `votes/${vote.id}`
    })
  }

  return (
    <div className="grid grid-flow-col auto-cols-max relative overflow-hidden font-quicksand max-w-sm">
      <div className="card">
        <img src={props.image.url} alt="Avatar" className="object-cover w-96 h-96 transform hover:scale-90 transition duration-500" />
        <div className="">
          <div className="flex justify-between mx-3 my-3">
            {
              vote && vote.value === 1
                ? <button className='flex bg-green-500 hover:bg-green-600 duration-500 text-white font-bold py-2 px-4 rounded' onClick={removeVote}>
                  <img src={require('assets/svgs/ThumbsUpDark.svg').default} alt="Avatar" className="w-6 h-6 object-cover mr-2 transform hover:scale-125 duration-100" /> Like ({likeLen || 0})
                </button>
                : <button className='flex bg-green-500 hover:bg-green-600 duration-500 text-white font-bold py-2 px-4 rounded transform active:scale-90' onClick={e => handleVoteUpDown(props.image.id, 1)}>
                  <img src={require('assets/svgs/ThumbsUpLight.svg').default} alt="Avatar" className="w-6 h-6 object-cover mr-2 transform hover:scale-125 duration-100" /> Like ({likeLen || 0})
                </button>
            }
            {
              vote && vote.value === 0
                ? <button className='flex bg-red-500 hover:bg-red-700 duration-500 text-white font-bold py-2 px-4 rounded' onClick={removeVote}>
                  <img src={require('assets/svgs/ThumbsDownDark.svg').default} alt="Avatar" className="w-6 h-6 object-cover mr-2 transform hover:scale-125 duration-100" style={{ marginTop: '3px' }} />Dislike ({dislikeLen || 0})
                </button>
                : <button className='flex bg-red-500 hover:bg-red-700 duration-500 text-white font-bold py-2 px-4 rounded' onClick={e => handleVoteUpDown(props.image.id, 0)}>
                  <img src={require('assets/svgs/ThumbsDownLight.svg').default} alt="Avatar" className="w-6 h-6 object-cover mr-2 transform hover:scale-125 duration-100" style={{ marginTop: '3px' }} /> Dislike ({dislikeLen || 0})
                </button>
            }
          </div>
          <div className="text-right">
            {
              favorite
                ? <button className='flex bg-blue-500 hover:bg-blue-700 duration-500 text-white font-bold py-2 w-full rounded justify-center transform hover:scale-90 duration-10' onClick={e => removeFavorite(favorite.id)}>
                  <img src={require('assets/svgs/StarDark.svg').default} alt="Avatar" className="w-6 h-6 object-cover mr-3 transform hover:scale-125 duration-100" /> Unfavourite
                </button>
                : <button className='flex bg-blue-500 hover:bg-blue-700 duration-500 text-white font-bold py-2 w-full rounded justify-center transform hover:scale-90 duration-10' onClick={e => addFavorite(props.image.id)}>
                  <img src={require('assets/svgs/StarLight.svg').default} alt="Avatar" className="w-6 h-6 object-cover mr-3" /> Favourite
                </button>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state: any) => {
  const { images, imagesError } = state.displayImages
  const { votes, votesError, voteResult } = state.votes
  const { favorites, favoritesError, favoritesResult } = state.favorites
  return { images, imagesError, votes, votesError, voteResult, favorites, favoritesError, favoritesResult }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    bindDisplayImages: (content: any) => dispatch(SetDisplayImages(content)),
    bindUploadedResult: (content: any) => dispatch(SetUploadedResult(content)),
    bindSetFavorites: (content: any) => dispatch(SetFavorites(content)),
    bindGetFavorites: (content: any) => dispatch(GetFavorites(content)),
    bindRemoveFavorites: (content: any) => dispatch(RemoveFavorites(content)),
    bindSetVotes: (content: any) => dispatch(SetVotes(content)),
    bindGetVotes: (content: any) => dispatch(GetVotes(content)),
    bindRemoveVotes: (content: any) => dispatch(RemoveVotes(content)),
    bindRemoveVoteResult: (content: any) => dispatch(RemoveVoteResult(content)),
    bindRemoveFavoritesResult: (content: any) => dispatch(RemoveFavoritesResult(content))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeCardComponent)
