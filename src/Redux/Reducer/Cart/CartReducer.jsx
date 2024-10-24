import * as Type from "../../../Common/Const/Cart/CartConst";
import _ from 'lodash';
import {notify} from '../../../libs/Notify/Notify'; 
import * as MESSAGE from '../../../Common/Const/Notify/NotifyConst';
import { SELECT_ALL_TOGGLE } from "../../../Common/Const/Order/OrderConst";
let carts = JSON.parse(localStorage.getItem("carts"))
? JSON.parse(localStorage.getItem("carts"))
: []
const cartInit = {
  carts,
  allStick: (_.filter(carts,e=>e.stick)?.length === carts?.length && carts?.length >0) ? true : false,
  voucher: {},
  waiting: false
}; 

export const CartReducer = (state = cartInit, action) => {
  switch (action.type) {
    case Type.GET_ALL_CART:{
      state.carts = JSON.parse(localStorage.getItem("carts"))
      return {...state}
    }break;
    case Type.ADD_CART: {
    let cartUpdate = localStorage.getItem('carts') ? JSON.parse(localStorage.getItem('carts')) :[];
      if (cartUpdate === null) {
        cartUpdate.push(action.sanpham);
      } else { 
        let index = _.findIndex(cartUpdate,cart => cart.masp === action.sanpham.masp);
        if (index !== -1) {
          cartUpdate[index].sl += (cartUpdate[index].sl+1 <= cartUpdate[index].conlai) ? 1 :0;
          if(cartUpdate[index].sl+1 > cartUpdate[index].conlai){
            notify('warning',MESSAGE.ADD_MAX_QUANTITY_WARNING) 
          }
        } else {
          cartUpdate.push(action.sanpham);
        }
      }
      state.carts = cartUpdate;
      localStorage.setItem("carts", JSON.stringify(cartUpdate));
      return { ...state};
    }break;
    case Type.ADD_CART_QUANTITY_FREE: {
      let cartUpdate = JSON.parse(localStorage.getItem('carts'));
      if(cartUpdate === null){
        cartUpdate.push(action?.sanpham);     
      }else {
        let index = _.findIndex(cartUpdate,cart => cart.masp === action.sanpham.masp);
        if (index !== -1) {
          cartUpdate[index].sl += (cartUpdate[index].sl+action.sl <= cartUpdate[index].conlai) ? action.sl : 0;
        } else {
          cartUpdate.push(action.sanpham);
        }
      }
      state.carts = cartUpdate;
      localStorage.setItem("carts", JSON.stringify(cartUpdate));
      setTimeout(() => {
        state.waiting=false;
      }, 3000);
      return {...state};
    }break;
    case Type.UPDATE_QUANTITY_CART: {
      const { index, increase } = action;
      let cartUpdate = [...state.carts];
      if (increase) {
        if(cartUpdate[index].conlai >= cartUpdate[index].sl + 1){
          cartUpdate[index].sl += 1;
        }else{
          notify('warning',MESSAGE.ADD_MAX_QUANTITY_WARNING);
        }     
      } else {
        if (cartUpdate[index].sl > 1) {
          cartUpdate[index].sl -= 1;
        }
      }
      localStorage.setItem("carts", JSON.stringify(cartUpdate));
      state.carts = cartUpdate;
      return { ...state };
    };break;
    case Type.UPDATE_QUANTITY_CART_DETAIL: {
      const { masp, increase } = action;
      let cartUpdate = [...state.carts];
      let index = _.findIndex(cartUpdate, e=> e.masp === masp);
      if (increase) {
        cartUpdate[index].sl += 1;
      } else {
        if (cartUpdate[index].sl > 1) {
          cartUpdate[index].sl -= 1;
        }
      }
      localStorage.setItem("carts", JSON.stringify(cartUpdate));
      state.carts = cartUpdate;
      return { ...state };
    };break;
    case Type.CLEAR_PRODUCT_IN_CART:{
      let chitietdh = action.data;
      let cartUpdate =JSON.parse(localStorage.getItem("carts"));
      _.map(chitietdh,(item)=>{ 
        cartUpdate =_.filter(cartUpdate,(cart)=>cart.masp !== item?.hdspct?.masp);
      })
      state.carts = cartUpdate;
      localStorage.setItem("carts", JSON.stringify(cartUpdate));
      return {...state};
    }
    case Type.REMOVE_PRODUCT_TO_CART: {
      let cartUpdate = _.filter([...state.carts],(sp) => sp.masp !== action.masp);
      localStorage.setItem("carts", JSON.stringify(cartUpdate));
      state.carts = cartUpdate;
      return { ...state };
    }break;
    case Type.GET_VOUCHER:{
      state.voucher = action.voucher;
      notify('success', `Mã ${state?.voucher?.magg} đã áp dụng thành công`);
      return {...state};
    }
    case Type.DELETE_VOUCHER:{
      state.voucher = null;
      return {...state};
    }
    case Type.CANCEL_VOUCHER:{
      state.voucher = null;
      notify('success',`Hủy bỏ áp dụng thành công mã ${action?.voucher?.magg}`)
      return {...state};
    }
    case Type.SET_STICK:{
      const {index,stick} = action;
      let cartUpdate = [...state.carts];
      cartUpdate[index].stick = stick;
      localStorage.setItem("carts", JSON.stringify(cartUpdate));
      let allStick = _.filter(cartUpdate,e=>e.stick)?.length === cartUpdate?.length ? true : false
      state.allStick = allStick;
      state.carts = cartUpdate;
      return {...state};
    }
    case Type.SET_ALL_STICK:{
      const {stick} = action;
      let cartUpdate = [...state.carts];
      _.map(cartUpdate,(item)=>{
        item.stick = stick;
      })
      localStorage.setItem("carts", JSON.stringify(cartUpdate));
      state.carts = cartUpdate;
      state.allStick = stick;
      return {...state};
    }
    case SELECT_ALL_TOGGLE:{
      let cart = [...state.carts];
      state.allStick = _.filter(cart,e=>e.stick)?.length  === cart?.length ? true : false;
      return {...state};
    }
    default: {
      return { ...state };
    }
  }
};
