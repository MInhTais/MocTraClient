import { FIND_ALL_PRODUCT_BEST_VIEWS_SELLER, FIND_ALL_STATISTICAL_SELLER } from "../../../Common/Const/Admin/SellerConst";

const initialState = {
  cpSeller: [],
  dtbhSeller:[],
  dtSeller:[],
  spSeller:[],
  sptSeller:[],
  spqtSeller:[]
};

export const StatisticalSellerReducer = (state = initialState, action) => {
  switch (action.type) {
    case FIND_ALL_STATISTICAL_SELLER: {
        const {cp,dtbh,dt,sp,spt} = action.data;
        state.cpSeller = cp;
        state.dtbhSeller = dtbh;
        state.dtSeller = dt;
        state.sptSeller = spt;
        state.spSeller = sp;
        console.log(state.dtbhSeller)
      return { ...state };
    }
    case FIND_ALL_PRODUCT_BEST_VIEWS_SELLER:{
      state.spqtSeller = action.data;
      return {...state};
    }
    default: {
      return { ...state };
    }
  }
};
