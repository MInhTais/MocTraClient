import * as Action from '../../../Common/Const/Authority/AuthorityConst';
const authoritiesInit = {
    authorities: {}
}

export const AuthorityReducer = (state=authoritiesInit, action)=>{
    switch (action.type) {
        case Action.GET_ALL_AUTHORITIES:{
            state.authorities = action.authorities;
            return {...state};
        }
        case Action.ADD_AUTHORITIES:{
            return {...state}
        }
        case Action.DELETE_AUTHORITIES:{
            return {...state}
        }
        default:{
            return {...state};
        }
    }
}