import { SET_SENT_FEEDBACKS } from '../actions/ActionTypes'

const initialState = {
    sentFeedbacks: []
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        //Update the sent feedbacks
        case SET_SENT_FEEDBACKS:
            return {
                ...state,
                sentFeedbacks: action.payload
            }
        default:
            return {
                ...state
            }
    }
}

export default reducer
