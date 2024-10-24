import * as Type from '../../../Common/Const/Admin/AdminConst';

const adminState = {
    ncc: [],
    dvd:[],
    th:[],
    nl:[],
    l:[],
    sp:[],
    mgg:[],
    doitac:[],
    tongdg:[],
    bcspvp:[],
    spqtmt:[],
    tabsKey: 1,
    xemctnd:{},
    sk:[],
    ptsk:[],
    reward:[]
}

export const AdminReducer = (state = adminState, action)=>{
    switch (action.type) {
        case Type.FIND_ALL:{
            const {ncc,dvd,th,nl,l,sp,mgg,doitac,bcspvp,sk,ptsk} = action.data;
            state.ncc = ncc;
            state.dvd = dvd;
            state.th = th;
            state.nl = nl;
            state.l = l;
            state.sp = sp;
            state.mgg= mgg;
            state.doitac = doitac;
            state.bcspvp = bcspvp;
            state.sk = sk;
            state.ptsk = ptsk;
            return {...state};
        }
        case Type.FIND_ALL_BY_PRODUCT:{
            state.sp = action.sp;
            return {...state};
        }
        case Type.FIND_ALL_REVIEW_BY_PRODUCT:{
            state.tongdg = action.data;
            return {...state};
        }
        case Type.SET_TABS_KEY:{
            state.tabsKey = action.tabsKey;
            return {...state};
        }
        case Type.VIEW_FAST_USER:{
           state.xemctnd = action.data;
           return {...state};
        }
        case Type.FIND_ALL_BRAND_BY_CATEGORYID: {
            state.th = action.data;
            return {...state};
        }
        case Type.FIND_ALL_PRODUCT_BEST_VIEWS_ADMIN:{
            state.spqtmt = action.data;
            return {...state};
        }
        case Type.FIND_ALL_REWARD_BY_EVENT_ID:{
            state.reward = action.data;
            return {...state};
        }
        default:{
            return {...state};
        }
    }
}