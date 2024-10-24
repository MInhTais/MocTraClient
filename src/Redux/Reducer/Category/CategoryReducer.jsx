import * as Category from '../../../Common/Const/Category/CategoryConst';

const stateCategory={
    categories: [],
    preview:{},
    image:{}
}

export const CategoryReducer = (state = stateCategory, action)=>{
    switch (action.type) {
        case Category.FIND_ALL_CATEGORIES:{
            state.categories = action.categories;
            return {...state};
        }
        case Category.UPLOAD_PICTURE_CATEGORY:{
            state.image = action.image;
            state.preview = action.preview;
            return {...state};
        } 
        default:{
            return {...state};
        }
            break;
    }
}