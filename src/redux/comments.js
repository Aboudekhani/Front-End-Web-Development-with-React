import * as ActionTypes from './AcionTypes';



export const Comments =(state={
    errMess:null,
    Comments:[]
},action)=>{
    switch (action.type) {
        case ActionTypes.ADD_COMMENT:
            var comment =action.payload;
            comment.id = state.comments.length
            comment.date = new Date().toISOString();
            return {...state, comments:state.comments.concat(comment)}

        case ActionTypes.ADD_COMMENTS:
            return {...state,isLoading:false , errmess: null ,comments :action.payload}

        case ActionTypes.DISHES_FAILED:
            return {...state,isLoading:false , errmess:action.payload  ,comments : []}
    
        default:
            return state;
    }
}