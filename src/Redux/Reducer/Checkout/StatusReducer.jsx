import * as Type from '../../../Common/Const/Checkout/StatusConst';

const initState = {
    formOne: 
        { 
            tentt: 'COD',
            service: {}
        }
    ,
    formTwo: 
        { 
            order :{}
        }
}

export const StatusReducer =(state = initState, action)=>{
    switch (action.type) {
        case Type.STATUS_FORMTWO:{
            state.formTwo.order = action.order;
            return {...state};
        }
        case Type.SET_METHOD:{
            state.formOne.tentt = action.tentt;
            return {...state};
        }
        case Type.SET_SERVICE:{
            state.formOne.service = action.service;
            return {...state};
        }
        default:{
            return {...state}
        }
            break;
    }
}