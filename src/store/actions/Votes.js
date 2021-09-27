import get from 'services/get'
import post from 'services/post'
import remove from 'services/delete'

import {
  GET_VOTES,
  SET_VOTES
} from 'store/types'

export const GetVotes = (content) => {
  return (dispatch) => {
    get(content.url, content.data).then((res) => {
      dispatch({
        type: GET_VOTES,
        payload: {
          votes: res.data
        }
      })
    }).catch(err => {
      dispatch({
        type: GET_VOTES,
        payload: {
          votesError: err.toJSON()
        }
      })
    })
  }
}

export const SetVotes = (content) => {
  return (dispatch) => {
    dispatch({
      type: SET_VOTES,
      payload: {
        voteResult: '',
        votesError: '',
        voteInProgress: true
      }
    })
    post(content.url, content.data).then((res) => {
      dispatch({
        type: SET_VOTES,
        payload: {
          voteResult: {
            status: res.status,
            data: res.data
          },
          voteInProgress: false
        }
      })
    }).catch(err => {
      dispatch({
        type: SET_VOTES,
        payload: {
          votesError: err.toJSON(),
          voteInProgress: false
        }
      })
    })
  }
}

export const RemoveVotes = (content) => {
  return (dispatch) => {
    dispatch({
      type: SET_VOTES,
      payload: {
        voteResult: '',
        votesError: '',
        voteInProgress: true
      }
    })

    remove(content.url).then((res) => {
      dispatch({
        type: SET_VOTES,
        payload: {
          voteResult: {
            status: res.status,
            data: res.data
          },
          voteInProgress: false
        }
      })
    }).catch(err => {
      dispatch({
        type: SET_VOTES,
        payload: {
          votesError: err.toJSON(),
          voteInProgress: false
        }
      })
    })
  }
}

export const RemoveVoteResult = (content) => {
  return (dispatch) => {
    dispatch({
      type: SET_VOTES,
      payload: {
        voteResult: '',
        voteError: ''
      }
    })
  }
}
