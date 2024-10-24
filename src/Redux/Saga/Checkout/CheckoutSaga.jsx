import * as LOADING from "../../../Common/Const/Loading/Loading";
import { call, takeLatest, put, delay } from "redux-saga/effects";
import { checkoutService } from "../../../Services/CheckoutService";
import * as System from "../../../Common/API/domain";
import * as Action from "../../../Common/Action/Checkout/CheckoutAction";
import * as Type from "../../../Common/Const/Checkout/CheckoutConst";
import { history } from "../../../libs/History/history";
import { notify } from "../../../libs/Notify/Notify";
import _ from "lodash";
import * as MESSAGE from "../../../Common/Const/Notify/NotifyConst";
import { CLOSE_MODAL } from "../../../Common/Const/Modal/ModalConst";
import { CLEAR_PRODUCT_IN_CART, DELETE_VOUCHER} from "../../../Common/Const/Cart/CartConst";
import { FIND_ALL_CATEGORIES_ACTION } from "../../../Common/Action/Category/CategoryAction";
import {GET_VOUCHER} from '../../../Common/Const/Cart/CartConst';

function* findAllAddressAPI(action) {
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(500);
  try {
    let {data:{data},status} = yield call(checkoutService.findAllProvinceGoShip);
    if (status === System.STATUS.SUCCESS) {
      yield put({
        type: Type.FIND_ALL_PROVINCE,
        province: data,
      });

    } else {
      console.log("Error STATUS");
    }
  } catch (error) {
    console.log("Error: ", error);
  }
  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

function* findAllDistrictAPI(action) {
  const { ProvinceID } = action;
  try {
    let {data:{data},status} = yield call(() => {
      return checkoutService.findAllDistrictByProvinceGoShip(ProvinceID);
    });
    if (status === System.STATUS.SUCCESS) {
      yield put({
        type: Type.FIND_ALL_DISTRICT_BY_PROVINCE,
        district: data,
        ProvinceID,
      });
    }
  } catch (error) {
    console.log("Error", error);
  }
}

function* findAllAwardAPI(action) {
  const { DistrictID } = action;
  try {
    let { data:{data}, status } = yield call(() => {
      return checkoutService.findAllWardByDistrictGoShip(DistrictID);
    });
    if (status === System.STATUS.SUCCESS) {
      yield put({
        type: Type.FIND_ALL_AWARD_BY_DISTRICT,
        award: data,
      });
    }
  } catch (error) {
    console.log("Error", error);
  }
}

function* findFeesGoShipAPI(action) {
  const { addressDefault } = action;
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(500);
  try {
    let { data:{data}, status } = yield call(() => {
      return checkoutService.findFeesByServiceGoShip(addressDefault?.huyen?.id, addressDefault?.tinh?.id);
    });
    if (status === System.STATUS.SUCCESS) {
      yield put({
        type: Type.SET_DELIVERIES,
        deliveries: data,
      });
    } else {
      console.log("Error", status);
    }
  } catch (error) {
    console.log("Error", error);
  }

  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

function* saveAPI(action) {
  const { order, voucher,credentials } = action;
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  try {
    let { status } = yield call(() => {
      return checkoutService.save(order);
    });
    if (status === System.STATUS.SUCCESS) {
      
      yield put({
        type: CLEAR_PRODUCT_IN_CART,
        data: order?.chitietdh 
      })

      if(!_.isEmpty(voucher)){
        yield put({
          type: Action.UPDATE_VOUCHER_ACTION,
          voucher
        })
        yield put({
          type: DELETE_VOUCHER
        })
      }else{
        credentials ? history.push('/don-hang-dang-cho') : history.push('/trang-chu')
        yield put({
          type: FIND_ALL_CATEGORIES_ACTION
        })
      }

      yield put({
        type: CLOSE_MODAL
      })
    }
  } catch (error) {
    console.log("Error", error);
  }
  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

function* updateVoucherAPI(action) {
  const { voucher } = action;
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(500);

  try {
    let { status } = yield call(() => {
      return checkoutService.updateVoucher(voucher);
    });
    if (status === System.STATUS.SUCCESS) {
      JSON.parse(localStorage.getItem("credentials"))
        ? history.replace("/don-hang-dang-cho")
        : history.replace("/trang-chu");
    } else {
      console.log("Error", status);
    }
  } catch (error) {
    console.log("Error", error);
    notify(
      "error",
      _.includes(error.toString(), "400") ? MESSAGE.UPDATE_VOUCHER_FAILED : ""
    );
  }

  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

export function* ActionFindAllAddressAPI() {
  yield takeLatest(Action.FIND_ALL_PROVINCE_ACTION, findAllAddressAPI);
}

export function* ActionFindAllDistrictAPI() {
  yield takeLatest(
    Action.FIND_ALL_DISTRICT_BY_PROVINCE_ACTION,
    findAllDistrictAPI
  );
}

export function* ActionFindAllAwardAPI() {
  yield takeLatest(Action.FIND_ALL_AWARD_BY_DISTRICT_ACTION, findAllAwardAPI);
}

export function* ActionSaveAPI() {
  yield takeLatest(Action.ADD_ORDER_ACTION, saveAPI);
}

export function* ActionUpdateVoucherAPI() {
  yield takeLatest(Action.UPDATE_VOUCHER_ACTION, updateVoucherAPI);
}

export function * ActionFindFeesByServiceGoShipAPI(){
  yield takeLatest(Action.FIND_FEES_GOSHIP_ACTION,findFeesGoShipAPI);
}