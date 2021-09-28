import { GET_VOTES, SET_VOTES } from '../types'

const INITIAL_STATE = {
  votes: '',
  voteResult: '',
  votesError: '',
  newFavorite: '',
  voteInProgress: false
}

const votes = (state = INITIAL_STATE, action: any) => {
  const { payload } = action
  switch (action.type) {
    case GET_VOTES: {
      return {
        ...state,
        votes: payload.votes,
        votesError: payload.votesError
      }
    }
    case SET_VOTES: {
      return {
        ...state,
        voteInProgress: payload.voteInProgress,
        voteResult: payload.voteResult,
        votesError: payload.votesError
      }
    }
    default:
      return state
  }
}

export default votes
