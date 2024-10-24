import { FIND_ALL_ORDER_FALSE,ADD_LIST_PICTURE_RETURN_GOOD, FIND_ALL_ORDER_FALSE_AND_PROVIDERID, FIND_ALL_ORDER_MY_STORE } from "../../../Common/Const/Order/OrderConst";

const initialState = {
  order: [],
  detail:[],
  returngoods:[],
  orderSeller: [],
  orderMyStore:[],
  listImage: []
};

export const OrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case FIND_ALL_ORDER_FALSE: {
      const {order,returngoods,detail} = action.data;
      console.log(action.data)
      state.returngoods = returngoods;
      state.order = order;
      state.detail = detail;
      return { ...state };
    }
    case FIND_ALL_ORDER_FALSE_AND_PROVIDERID:{
      const {orderSeller,orderAllSeller,returngoods} = action.data;
      state.order = orderSeller;
      state.orderSeller = orderAllSeller;
      state.returngoods = returngoods;
      return {...state};
    }
    case FIND_ALL_ORDER_MY_STORE:{
      state.orderMyStore = action.data;
      return {...state};
    }
    case ADD_LIST_PICTURE_RETURN_GOOD:{
      state.listImage = action.listImage;
      return {...state};
    }
    default: {
      return { ...state };
    }
  }
};
