import {createStore,combineReducers,applyMiddleware} from 'redux'
import {createForms} from 'react-redux-form'
import {Dishes} from './dishes'
import {Leaders} from './leaders'
import {Promotions} from './Promotions'
import {Comments} from './comments'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { initialFeedback } from './form'


export const ConfigureStore=()=>{
    const store =createStore(
        combineReducers({
            dishes:Dishes,
            comments:Comments,
            promotions:Promotions,
            leaders:Leaders,
            ...createForms({
                feedback:initialFeedback
            })
         }),
         applyMiddleware(thunk,logger)
    )
    return store;
}