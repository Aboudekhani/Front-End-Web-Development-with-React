import * as actionTypes from './AcionTypes';

export const Dishes =(state={
    isLoading: true,
    errmes: null ,
    dishes: []
},action)=>{
    switch(action.type){
        case actionTypes.ADD_DISHES:
            return {...state,isLoading:false , errmess: null ,dishes :action.payload}
            
        case actionTypes.DISHES_LOADING:
            return {...state,isLoading:true , errmess: null ,dishes : []}

        case actionTypes.DISHES_FAILED:
            return {...state,isLoading:false , errmess:action.payload  ,dishes : []}

        default:
            return state;
    }
}