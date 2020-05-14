import { 
    compose,
    applyMiddleware,
    createStore, 
    combineReducers } from 'redux'
import thunk from 'redux-thunk'
import feedbackReducer from '../reducers/Feedbacks'

const reducers = combineReducers({
    feedback: feedbackReducer
})

export default createStore(
    reducers, 
    compose(applyMiddleware(thunk))
)