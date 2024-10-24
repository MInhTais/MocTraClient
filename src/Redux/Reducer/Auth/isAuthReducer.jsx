import * as Type from '../../../Common/Const/Auth/AuthConst';

const owvState = {
    orderconfirm:[],
    ordered:[],
    orderDetail:[],
    ordering:[],
    wishlist: [],
    myvoucher:[],
    vouchers:[],
    user: {},
    events:{},
    joined:[]
}

export const isAuthReducer = (state=owvState,action)=>{
    switch (action.type) {
        case Type.ORDER_WISHLIST_VOUCHER:{
            const {ordered,ordering,orderconfirm,wishlist,myvoucher,vouchers,user} = action.data;
            state.ordered = ordered;
            state.ordering = ordering;
            state.wishlist = wishlist;
            state.myvoucher = myvoucher;
            state.vouchers = vouchers;
            state.user = user;
            state.orderconfirm = orderconfirm;
            return {...state};
        }
        case Type.FIND_ALL_EVENT:{
            state.events = action.data;
            return {...state};
        }
        case Type.FIND_ALL_REWARD_JOINED:{
            state.joined = action.data;
            return {...state};
        }
        case Type.FIND_ALL_ORDER_BY_MONTH:{
            state.ordered = action.data;
            return {...state};
        }
        case Type.VIEW_ALL_ORDER_DETAIL:{
            state.orderDetail = action.orderDetail;
            return {...state};
        }
        default:{
            return {...state};
        }
    }
}