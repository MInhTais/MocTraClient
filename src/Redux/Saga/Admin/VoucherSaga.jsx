import { CLOSE_DRAWER } from "../../../Common/Const/Admin/Drawer";

import {
  DISPLAY_LOADING,
  HIDE_LOADING,
} from "../../../Common/Const/Loading/Loading";
import {
  ADD_ERROR_MESSAGE,
  ADD_SUCCESS_MESSAGE,
  DELETE_ERROR_MESSAGE,
  DELETE_SUCCESS_MESSAGE,
  UPDATE_ERROR_MESSAGE,
  UPDATE_SUCCESS_MESSAGE,
  UPDATE_VOUCHER_DUPLICATE_WARNING,
} from "../../../Common/Const/Notify/NotifyConst";
import { adminService } from "../../../Services/AdminService";
import { call, put, delay, takeLatest } from "redux-saga/effects";
import { notify } from "../../../libs/Notify/Notify";
import * as System from "../../../Common/API/domain";
import _ from "lodash";
import {
  ADD_FAST_VOUCHER_ADMIN_ACTION,
  ADD_VOUCHER_ADMIN_ACTION,
  DELETE_VOUCHER_ADMIN_ACTION,
  FIND_ALL_ACTION,
  UPDATE_VOUCHER_ADMIN_ACTION,
} from "../../../Common/Action/Admin/AdminAction";

function* addVoucherAPI(action) {
  const { voucher } = action;
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(500);

  try {
    let { status } = yield call(() => {
      return adminService.addVoucher(voucher);
    });
    if (status === System.STATUS.SUCCESS) {
      yield put({
        type: FIND_ALL_ACTION,
      });

      yield put({
        type: CLOSE_DRAWER,
      });
      notify("success", ADD_SUCCESS_MESSAGE);
    } else {
      console.log(status);
      notify("error", ADD_ERROR_MESSAGE);
    }
  } catch (error) {
    console.log(error);
    notify("error", ADD_ERROR_MESSAGE);
  }

  yield put({
    type: HIDE_LOADING,
  });
}

function* updateVoucherAPI(action) {
  const { voucher } = action;
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(500);

  try {
    let { status } = yield call(() => {
      return adminService.updateVoucher(voucher);
    });
    if (status === System.STATUS.SUCCESS) {
      yield put({
        type: FIND_ALL_ACTION,
      });

      yield put({
        type: CLOSE_DRAWER,
      });

      notify("success", UPDATE_SUCCESS_MESSAGE);
    }else if(status === System.STATUS.NO_CONTENT){
        notify('warning',UPDATE_VOUCHER_DUPLICATE_WARNING)
    }
     else {
      console.log(status);
      notify("error", UPDATE_ERROR_MESSAGE);
    }
  } catch (error) {
    console.log(error);
    notify("error", UPDATE_ERROR_MESSAGE);
  }

  yield put({
    type: HIDE_LOADING,
  });
}

function* deleteVoucherAPI(action) {
  const { voucher } = action;
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(500);

  try {
    let { status } = yield call(() => {
      return adminService.deleteVoucher(voucher);
    });
    if (status === System.STATUS.SUCCESS) {
      yield put({
        type: FIND_ALL_ACTION,
      });
      notify("success", DELETE_SUCCESS_MESSAGE);
    } else {
      console.log(status);
      notify("error", DELETE_ERROR_MESSAGE);
    }
  } catch (error) {
    console.log(error);
    notify("error", DELETE_ERROR_MESSAGE);
  }

  yield put({
    type: HIDE_LOADING,
  });
}

function* addFastVoucherAPI(action) {
  const { voucher } = action;
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(500);

  try {
    let { status } = yield call(() => {
      return adminService.addFastVoucher(voucher);
    });
    if (status === System.STATUS.SUCCESS) {
      yield put({
        type: FIND_ALL_ACTION,
      });

      yield put({
        type: CLOSE_DRAWER,
      });
      notify("success", ADD_SUCCESS_MESSAGE);
    } else {
      console.log(status);
      notify("error", ADD_ERROR_MESSAGE);
    }
  } catch (error) {
    console.log(error);
    notify("error", ADD_ERROR_MESSAGE);
  }

  yield put({
    type: HIDE_LOADING,
  });
}

export function* ActionAddVoucherAPI() {
  yield takeLatest(ADD_VOUCHER_ADMIN_ACTION, addVoucherAPI);
}

export function* ActionUpdateVoucherAPI() {
  yield takeLatest(UPDATE_VOUCHER_ADMIN_ACTION, updateVoucherAPI);
}

export function* ActionDeleteVoucherAPI() {
  yield takeLatest(DELETE_VOUCHER_ADMIN_ACTION, deleteVoucherAPI);
}

export function * ActionAddFastVoucherAPI(){
  yield takeLatest(ADD_FAST_VOUCHER_ADMIN_ACTION,addFastVoucherAPI);
}
