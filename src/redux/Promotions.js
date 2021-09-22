 import * as actionTypes from './AcionTypes'


export const Promotions=(state={
    isLoading: true,
    errmes: null ,
    promotions: []
},action)=>{
    switch (action.type) {
        case actionTypes.ADD_PROMOS:
            return {...state,isLoading:false , errmess: null ,promotions :action.payload}
            
        case actionTypes.PROMOS_LOADING:
            return {...state,isLoading:true , errmess: null ,promotions : []}

        case actionTypes.PROMOS_FAILED:
            return {...state,isLoading:false , errmess:action.payload  ,promotions : []}
        default:
            return state;
    }
}