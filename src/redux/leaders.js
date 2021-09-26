import * as actionTypes from './AcionTypes'

export const Leaders =(state ={
    isLoading: true,
    errmes: null ,
    leaders: []
},action)=>{
    switch (action.type) {
        case actionTypes.ADD_LEADERS:
            return {...state,isLoading:false , errmess: null ,leaders :action.payload}
            
        case actionTypes.LEADERS_LOADING:
            return {...state,isLoading:true , errmess: null ,leaders : []}

        case actionTypes.LEADERS_FAILED:
            return {...state,isLoading:false , errmess:action.payload  ,leaders : []}
        default:
            return state;
    }
}