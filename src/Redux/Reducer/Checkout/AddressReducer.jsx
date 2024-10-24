import {
  ADD_ADDRESS,
  DELETE_ADDRESS,
  GET_ADDRESS_DETAIL,
  INVISIBLE_SELECT_TAG,
  ISNT_CHECKOUT,
  IS_CHECKOUT,
  UPDATE_ADDRESS,
  UPDATE_ADDRESS_DEFAULT,
  VISIBLE_SELECT_TAG,
} from "../../../Common/Const/Order/OrderConst";
import { notify } from "../../../libs/Notify/Notify";
import * as MESSAGE from "../../../Common/Const/Notify/NotifyConst";
import _ from "lodash";
const initialState = {
  address: JSON.parse(localStorage.getItem("address"))
    ? JSON.parse(localStorage.getItem("address"))
    : [],
  detail: {},
  edit: null,
  index: null,
  visibleCbo: null,
  checkout: null,
};

export const AddressReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ADDRESS_DETAIL: {
      state.detail = action.detail;
      state.edit = action.edit;
      state.index = action.index;
      state.visibleCbo = false;
      return { ...state };
    }
    case VISIBLE_SELECT_TAG: {
      state.visibleCbo = true;
      return { ...state };
    }
    case INVISIBLE_SELECT_TAG: {
      state.visibleCbo = false;
      return { ...state };
    }
    case ADD_ADDRESS: {
      let addressUpdate = !state.address ? [] : [...state.address];
      let index = _.findIndex(addressUpdate, (e) => e.macdinh === true);
      if (index !== -1 && action.address.macdinh === true) {
        addressUpdate[index].macdinh = false;
      }

      if (action?.address?.macdinh === false && addressUpdate?.length === 0) {
        action.address.macdinh = true;
      }

      addressUpdate.push(action.address);
      state.address = addressUpdate;
      localStorage.setItem("address", JSON.stringify(addressUpdate));
      notify("success", MESSAGE.ADD_ADDRESS_SUCCESS);
      return { ...state };
    }
    case UPDATE_ADDRESS: {
      let addressUpdate = JSON.parse(localStorage.getItem("address"));
      if (action?.address?.macdinh === true) {
        let index = _.findIndex(addressUpdate, (e) => e.macdinh === true);
        if (index !== -1 && action.address.macdinh === true) {
          addressUpdate[index].macdinh = false;
        }
      }
      addressUpdate[action.index] = action.address;
      state.address = addressUpdate;
      notify("success", MESSAGE.UPDATE_ADDRESS_SUCCESS);
      localStorage.setItem("address", JSON.stringify(addressUpdate));
      return { ...state };
    }
    case UPDATE_ADDRESS_DEFAULT: {
      let addressUpdate = JSON.parse(localStorage.getItem("address"));
      let i = _.findIndex(addressUpdate, (e) => e.macdinh === true);
      if (i !== -1) {
        addressUpdate[i].macdinh = false;
        addressUpdate[action.index].macdinh = true;
      } else if (addressUpdate?.length > 0) {
        _.first(addressUpdate).macdinh = true;
      }
      state.address = addressUpdate;
      notify("success", MESSAGE.UPDATE_ADDRESS_DEFAULT_SUCCESS);
      localStorage.setItem("address", JSON.stringify(addressUpdate));
      return { ...state };
    }
    case DELETE_ADDRESS: {
      let addressUpdate = [...state.address];
      addressUpdate.splice(action.index, 1);
      state.address = addressUpdate;
      localStorage.setItem("address", JSON.stringify(addressUpdate));
      notify("success", MESSAGE.DELETE_ADDRESS_SUCCESS);
      return { ...state };
    }
    case IS_CHECKOUT: {
      state.checkout = true;
      return { ...state };
    }
    case ISNT_CHECKOUT:{
      state.checkout = false;
      return {...state};
    }
    default:
      return state;
  }
};
