import * as Types from '../../../Common/Const/Review/ReviewAction';

const reviewState = {
    reviews: [],
    reviewEdit: {}
}

export const ReviewReducer  =(state = reviewState, action)=>{
    switch (action.type) {
        case Types.FIND_ALL_COMMENT:{
            state.reviews = action.reviews;
            return {...state};
        }
        case Types.EDIT_REVIEW:{
            state.reviewEdit = action.reviewEdit;
            return {...state};
        }
        default:{
            return {...state};
        }
    }
}
