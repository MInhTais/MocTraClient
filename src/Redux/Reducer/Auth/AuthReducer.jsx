import * as Type from '../../../Common/Const/Auth/AuthConst';
let authentication = JSON.parse(localStorage.getItem('credentials'));
let verify = JSON.parse(localStorage.getItem('verifycode'));
const authState = {
    credentials: authentication,
    verified: verify,
    restricted: {},
    notify:[]
}

export const AuthReducer = (state = authState, action)=>{
    switch (action.type) {
        case Type.LOGIN:{
            state.credentials = action.credentials;
            return {...state};
        }
        case Type.LOGOUT:{
            localStorage.removeItem('credentials');
            state.credentials = null;
            return {...state};
        }
        case Type.FORGET:{
            state.verified = action.verified;
            return {...state};
        }
        case Type.DELETE_VERIFY_CODE:{
            localStorage.removeItem('verifycode');
            return {...state};
        }
        case Type.FIND_ACCOUNT_RESTRICTED:{
            state.restricted = action.data;
            return {...state};
        }
        case Type.FIND_ALL_NOTIFY_BY_USERNAME:{
            state.notify = action.data;
            return {...state};
        }
        default:{
            return {...state};
        }
            break;
    }
}