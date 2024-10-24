import {
  ADD_PRODUCT_SELLER_ACTION,
  DELETE_PRODUCT_SELLER_ACTION,
  UPDATE_PRODUCT_SELLER_ACTION,
  GET_ALL_PRODUCT_SELLER_ACTION,
  FIND_ALL_STATISTICAL_SELLER_ACTION,
  FIND_ALL_PRODUCT_BEST_VIEWS_SELLER_ACTION,
  GET_REFERENCES_PRODUCT_ACTION,
  GET_MY_STORE_ACTION,
  UPDATE_MY_STORE_ACTION,
} from "../../../Common/Action/Admin/SellerAction";
import { CLOSE_DRAWER } from "../../../Common/Const/Admin/Drawer";
import { FIND_ALL_PRODUCT_BEST_VIEWS_SELLER, FIND_ALL_STATISTICAL_SELLER, GET_ALL_PRODUCT_SELLER, GET_ALL_PRODUCT_SELLER_BY_PROVIDERID, GET_MY_STORE, GET_REFERENCES_PRODUCT } from "../../../Common/Const/Admin/SellerConst";
import {
  DISPLAY_LOADING,
  HIDE_LOADING,
} from "../../../Common/Const/Loading/Loading";
import {
  ADD_ERROR_MESSAGE,
  ADD_SUCCESS_MESSAGE,
  CREATE_SHOP_FAILED_MESSAGE,
  CREATE_SHOP_SUCCESS_MESSAGE,
  DELETE_ERROR_MESSAGE,
  DELETE_SUCCESS_MESSAGE,
  UPDATE_ERROR_MESSAGE,
  UPDATE_SUCCESS_MESSAGE,
} from "../../../Common/Const/Notify/NotifyConst";
import { sellerService } from "../../../Services/SellerService";
import { call, put, delay, takeLatest } from "redux-saga/effects";
import { notify } from "../../../libs/Notify/Notify";
import * as System from "../../../Common/API/domain";
import _ from "lodash";
import { CLOSE_MODAL } from "../../../Common/Const/Modal/ModalConst";
import { SIGN_UP_SHOP_ACTION } from "../../../Common/Action/Signup/SignupAction";
import { UPDATE_TOKEN_ACTION } from "../../../Common/Action/Authentication/AuthAction";
import { ADD_LIST_PRODUCT_ACTION } from "../../../Common/Action/Admin/AdminAction";

function* findAllAPI(action) {
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(500);

  try {
    let { data, status } = yield call(sellerService.findAll);
    if (status === System.STATUS.SUCCESS) {
      yield put({
        type: GET_ALL_PRODUCT_SELLER,
        data,
      });
    } else {
      console.log(status);
    }
  } catch (error) {
    console.log(error);
  }

  yield put({
    type: HIDE_LOADING,
  });
}

function* addProductAPI(action) {
  const { product } = action;
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(500);

  try {
    let { status } = yield call(() => {
      return sellerService.addProduct(product);
    });
    if (status === System.STATUS.SUCCESS) {
      yield put({
        type: GET_ALL_PRODUCT_SELLER_ACTION,
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

function* updateProductAPI(action) {
  const { product } = action;
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(500);

  try {
    let { status } = yield call(() => {
      return sellerService.updateProduct(product);
    });
    if (status === System.STATUS.SUCCESS) {
      yield put({
        type: GET_ALL_PRODUCT_SELLER_ACTION,
      });

      yield put({
        type: CLOSE_DRAWER,
      });

      notify("success", UPDATE_SUCCESS_MESSAGE);
    } else {
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

function* deleteProductAPI(action) {
  const { product } = action;
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(500);

  try {
    let { status } = yield call(() => {
      return sellerService.deleteProduct(product);
    });
    if (status === System.STATUS.SUCCESS) {
      yield put({
        type: GET_ALL_PRODUCT_SELLER_ACTION,
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

function* signUpShopAPI(action) {
  const { values } = action;
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(500);

  try {
    let { status, data } = yield call(() => {
      return sellerService.signUpShop(values);
    });
    if (status === System.STATUS.SUCCESS) {
      
      yield put({
        type: UPDATE_TOKEN_ACTION,
        tendn: data
      })

      yield put({
        type: CLOSE_MODAL,
      });

      notify("success", CREATE_SHOP_SUCCESS_MESSAGE);
    } else {
      console.log(status);
    }
  } catch (error) {
    console.log(error);
    notify("error", CREATE_SHOP_FAILED_MESSAGE);
  }

  yield put({
    type: HIDE_LOADING,
  });
}

function* findAllStatisticalSellerAPI(action) {
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(500);

  try {
    let { status, data } = yield call(sellerService.findAllStatisticalSeller);
    if (status === System.STATUS.SUCCESS) {
      yield put({
        type: FIND_ALL_STATISTICAL_SELLER,
        data
      })
    } else {
      console.log(status);
    }
  } catch (error) {
    console.log(error);
  }

  yield put({
    type: HIDE_LOADING,
  });
}

function* getMyStoreAPI(action) {
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(500);

  try {
    let { status, data } = yield call(sellerService.getMyStoreAPI);
    if (status === System.STATUS.SUCCESS) {
      yield put({
        type: GET_MY_STORE,
        data
      })
    } else {
      console.log(status);
    }
  } catch (error) {
    console.log(error);
  }

  yield put({
    type: HIDE_LOADING,
  });
}

function* updateMyStoreAPI(action) {
  const {cuahang} = action;
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(500);

  try {
    let { status, data } = yield call(()=>{return sellerService.updateMyStoreAPI(cuahang)});
    if (status === System.STATUS.SUCCESS) {
      yield put({
        type: GET_MY_STORE,
        data
      })
      notify('success',UPDATE_SUCCESS_MESSAGE)
    } else {
      console.log(status);
    }
  } catch (error) {
    console.log(error);
    notify('error',UPDATE_ERROR_MESSAGE)
  }

  yield put({
    type: HIDE_LOADING,
  });
}

function* addListProductAPI(action) {
  const { products } = action;
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(500);

  try {
    let { status } = yield call(() => {
      return sellerService.addListProduct(products);
    });
    if (status === System.STATUS.SUCCESS) {
      yield put({
        type: GET_ALL_PRODUCT_SELLER_ACTION,
      });
      notify("success", ADD_SUCCESS_MESSAGE);
    } else {
      console.log(status);
      notify("error", ADD_ERROR_MESSAGE);
    }
  } catch (error) {
    notify('error',ADD_ERROR_MESSAGE);
    console.log(error);
    
  }
  yield put({
    type: HIDE_LOADING,
  });
}

function * findAllProductBestViewAPI(action){
  const { month } = action;
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(500);

  try {
    let { status,data } = yield call(() => {
      return sellerService.findAllProductsBestView(month);
    });
    if (status === System.STATUS.SUCCESS) {
      yield put({
        type: FIND_ALL_PRODUCT_BEST_VIEWS_SELLER,
        data
      });
    } else {
      console.log(status);
    }
  } catch (error) {
    console.log(error);
  }
  yield put({
    type: HIDE_LOADING,
  });
}

function * getReferencesProductAPI(action){
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(500);

  try {
    let { status,data } = yield call(sellerService.getReferencesProduct);
    if (status === System.STATUS.SUCCESS) {
      yield put({
        type: GET_REFERENCES_PRODUCT,
        data
      });
    } else {
      console.log(status);
    }
  } catch (error) {
    console.log(error);
  }
  yield put({
    type: HIDE_LOADING,
  });
}

export function* ActionFindAllStatisticalSellerAPI() {
  yield takeLatest(FIND_ALL_STATISTICAL_SELLER_ACTION, findAllStatisticalSellerAPI);
}

export function* ActionFindAllProductAPI() {
  yield takeLatest(GET_ALL_PRODUCT_SELLER_ACTION, findAllAPI);
}

export function* ActionAddProductAPI() {
  yield takeLatest(ADD_PRODUCT_SELLER_ACTION, addProductAPI);
}

export function* ActionUpdateProductAPI() {
  yield takeLatest(UPDATE_PRODUCT_SELLER_ACTION, updateProductAPI);
}

export function* ActionDeleteProductAPI() {
  yield takeLatest(DELETE_PRODUCT_SELLER_ACTION, deleteProductAPI);
}

export function* ActionSignUpShopAPI() {
  yield takeLatest(SIGN_UP_SHOP_ACTION, signUpShopAPI);
}

export function* ActionAddListProductAPI() {
  yield takeLatest(ADD_LIST_PRODUCT_ACTION, addListProductAPI);
}

export function* ActionFindAllProductBestViewAPI() {
  yield takeLatest(FIND_ALL_PRODUCT_BEST_VIEWS_SELLER_ACTION, findAllProductBestViewAPI);
}

export function * ActionGetReferencesProductAPI(){
  yield takeLatest(GET_REFERENCES_PRODUCT_ACTION,getReferencesProductAPI);
}

export function * ActionGetMyStoreAPI(){
  yield takeLatest(GET_MY_STORE_ACTION, getMyStoreAPI);
}

export function * ActionUpdateMyStoreAPI(){
  yield takeLatest(UPDATE_MY_STORE_ACTION, updateMyStoreAPI);
}