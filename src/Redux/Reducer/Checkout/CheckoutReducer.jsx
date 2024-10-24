import * as Type from '../../../Common/Const/Checkout/CheckoutConst';

const addressState = {
    province:[],
    district:[],
    award: [],
    service: [],
    fee : {},
    current:0,
    deliveries:[]
}

export const CheckoutReducer = (state=addressState, action)=>{
    switch (action.type) {
        case Type.FIND_ALL_PROVINCE:{
            state.province = action.province;
            return {...state};
        }    
        case Type.FIND_ALL_DISTRICT_BY_PROVINCE:{
            state.district = action.district;
            return {...state};
        }
        case Type.FIND_ALL_AWARD_BY_DISTRICT:{
            state.award = action.award;
            return {...state};
        }
        case Type.FIND_ALL_SERVICES_AVAILABLE:{
            state.service = action.service;
            return {...state};
        }
        case Type.FIND_FEES:{
            state.fee = action.fee;
            return {...state};
        }
        case Type.UPDATE_CURRENT:{
            if(action.increase){
                state.current = state.current + 1 >=3 ? state.current : state.current+1;
            }else{
                state.current = state.current - 1 < 0 ? state.current : state.current-1;
            }
            return {...state};
        }
        case Type.FIRST_CURRENT:{
            state.current = 0;
            return {...state};
        }
        case Type.SET_DELIVERIES:{
            state.deliveries =action.deliveries;
            return {...state};
        }
        default:{
            return {...state};
        }
            break;
    }
}