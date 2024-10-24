import { GET_ALL_PRODUCT_SELLER, GET_ALL_PRODUCT_SELLER_BY_PROVIDERID, GET_MY_STORE, GET_REFERENCES_PRODUCT } from "../../../Common/Const/Admin/SellerConst";


const initialState = {
    dsSP: [],
    nhacungcap:{},
    dsSPCC :[],
    references:[],
    cuahang:{}
}

export const SellerReducer= (state = initialState, action) => {
    switch (action.type) {

    case GET_ALL_PRODUCT_SELLER:{
        state.dsSP = action.data.product;
        state.nhacungcap = action.data.provider;
        console.log("PRODUCT SELLER", state.dsSP,state.nhacungcap)
        return {...state};
    }
    case GET_ALL_PRODUCT_SELLER_BY_PROVIDERID:{
        state.dsSPCC = action.data;
        return {...state};
    }
    case GET_REFERENCES_PRODUCT:{
        state.references = action.data;
        return {...state};
    }
    case GET_MY_STORE:{
        state.cuahang = action.data;
        console.log("state",state.cuahang)
        return {...state};
    }
    default:
        return {...state};
    }
}
