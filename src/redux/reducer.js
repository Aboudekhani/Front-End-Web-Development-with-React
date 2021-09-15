import { DISHES } from '../shared/dishes';
import { COMMENTS}from '../shared/comments'
import {PROMOTIONS} from '../shared/promotion'
import {LEADERS} from '../shared/leaders'


export const initialState={
    dishes :DISHES,
    promotions : PROMOTIONS,
    leaders : LEADERS,
    comments:COMMENTS,
    selectedDish : null
}

export const Reducer=(state = initialState,action)=>{
    return state;
}