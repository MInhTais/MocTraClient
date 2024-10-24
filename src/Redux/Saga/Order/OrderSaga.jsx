import * as LOADING from "../../../Common/Const/Loading/Loading";
import { call, takeLatest, put, delay } from "redux-saga/effects";
import { orderService } from "../../../Services/OrderService";
import { STATUS } from "../../../Common/API/domain";
import {
  FIND_ALL_ORDER_FALSE,
  FIND_ALL_ORDER_FALSE_AND_PROVIDERID,
} from "../../../Common/Const/Order/OrderConst";
import {
  UPDATE_ORDER_MY_STORE_ACTION,
  ACCEPT_ORDER_DETAIL_SELLER_ACTION,
  DELETE_ORDER_DETAIL_ADMIN_ACTION,
  DELETE_ORDER_DETAIL_SELLER_ACTION,
  FIND_ALL_BY_PROVIDERID_ORDER_FALSE_ACTION,
  FIND_ALL_ORDER_FALSE_ACTION,
  UPDATE_ORDER_ACTION,
  RECEIVED_ORDER_ACTION,
  FIND_ALL_ORDERED_BY_MONTH_ACTION,
  ADD_RETURN_GOOD_ACTION,
  UPDATE_ORDER_RECEIVED_DATE_TIME_ACTION,
  UPDATE_RETURN_GOOD_ACTION,
  DELETE_RETURN_GOOD_ACTION,
  ACCEPT_LIST_ORDER_ACTION,
} from "../../../Common/Action/Order/OrderAction";
import { notify } from "../../../libs/Notify/Notify";
import * as MESSAGE from "../../../Common/Const/Notify/NotifyConst";
import { CLOSE_MODAL } from "../../../Common/Const/Modal/ModalConst";
import { ORDER_WISHLIST_VOUCHER_ACTION } from "../../../Common/Action/Authentication/AuthAction";
import {
  FIND_ALL_ORDER_BY_MONTH,
  MANAGER,
  SELLER,
} from "../../../Common/Const/Auth/AuthConst";
import { CLOSE_DRAWER } from "../../../Common/Const/Admin/Drawer";
import _ from "lodash";
import { FIND_ALL_CATEGORIES_ACTION } from "../../../Common/Action/Category/CategoryAction";

function* findAllOrderFalseAPI(action) {
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(500);
  try {
    let { data, status } = yield call(orderService.findAllOrderFalse);
    if (status === STATUS.SUCCESS) {
      yield put({
        type: FIND_ALL_ORDER_FALSE,
        data,
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

function* findAllOrderByProviderIDAndFalseAPI(action) {
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(500);
  try {
    let { data, status } = yield call(orderService.findAllProductByProviderID);
    if (status === STATUS.SUCCESS) {
      yield put({
        type: FIND_ALL_ORDER_FALSE_AND_PROVIDERID,
        data,
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

function* updateOrderAPI(action) {
  const { order } = action;
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(500);
  try {
    let { status } = yield call(() => {
      return orderService.updateOrder(order);
    });
    if (status === STATUS.SUCCESS) {
      yield put({
        type: FIND_ALL_ORDER_FALSE_ACTION,
      });

      yield put({
        type: CLOSE_DRAWER,
      });
      notify("success", MESSAGE.CONFIRM_ORDER_SUCCESS);
    } else {
      console.log("Error STATUS");
    }
  } catch (error) {
    console.log("Error: ", error);
    notify("error", MESSAGE.CONFIRM_ORDER_FAILED);
  }
  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

function* acceptOrderSellerAPI(action) {
  const { detail } = action;
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(500);
  try {
    let { status } = yield call(() => {
      return orderService.acceptOrderDetailSeller(detail);
    });
    if (status === STATUS.SUCCESS) {
      yield put({
        type: FIND_ALL_BY_PROVIDERID_ORDER_FALSE_ACTION,
      });
      notify("success", MESSAGE.CONFIRM_ORDER_SUCCESS);
    } else {
      console.log("Error STATUS");
    }
  } catch (error) {
    console.log("Error: ", error);
    notify("error", MESSAGE.CONFIRM_ORDER_FAILED);
  }
  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

function* deleteOrderSellerAPI(action) {
  const { detail } = action;
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(500);
  try {
    let { status } = yield call(() => {
      return orderService.deleteOrderDetailSeller(detail);
    });
    if (status === STATUS.SUCCESS) {
      yield put({
        type: FIND_ALL_BY_PROVIDERID_ORDER_FALSE_ACTION,
      });
      notify("success", MESSAGE.DELETE_ORDER_SUCCESS);
    } else {
      console.log("Error STATUS");
    }
  } catch (error) {
    console.log("Error: ", error);
    notify("error", MESSAGE.DELETE_ORDER_FAILED);
  }
  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

function* receivedOrderAPI(action) {
  const { detail } = action;
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(500);
  try {
    let { status } = yield call(() => {
      return orderService.receivedOrderAPI(detail);
    });
    if (status === STATUS.SUCCESS) {
      yield put({
        type: ORDER_WISHLIST_VOUCHER_ACTION,
      });
      notify("success", MESSAGE.RECEIVED_ORDER_SUCCESS);
    } else {
    }
  } catch (error) {
    console.log("Error: ", error);
    notify("error", MESSAGE.UPDATE_ERROR_MESSAGE);
  }
  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

function* deleteOrderAdminAPI(action) {
  const { detail } = action;
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(500);
  try {
    let { status } = yield call(() => {
      return orderService.deleteOrderDetailAdmin(detail);
    });
    if (status === STATUS.SUCCESS) {
      yield put({
        type: FIND_ALL_ORDER_FALSE_ACTION,
      });

      yield put({
        type: FIND_ALL_ORDER_FALSE_ACTION,
      });

      yield put({
        type: FIND_ALL_CATEGORIES_ACTION,
      });

      yield put({
        type: CLOSE_MODAL,
      });
      notify("success", MESSAGE.DELETE_ORDER_SUCCESS);
    } else {
      console.log("Error STATUS");
    }
  } catch (error) {
    console.log("Error: ", error);
    notify("error", MESSAGE.DELETE_ORDER_FAILED);
  }
  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

function* updateOrderMyStoreAPI(action) {
  const { detail } = action;
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(500);
  try {
    let { status } = yield call(() => {
      return orderService.updateOrderDetailMyStoreAPI(detail);
    });
    if (status === STATUS.SUCCESS) {
      yield put({
        type: FIND_ALL_ORDER_FALSE_ACTION,
      });

      yield put({
        type: FIND_ALL_ORDER_FALSE_ACTION,
      });
      notify("success", MESSAGE.CONFIRM_ORDER_SUCCESS);
    } else {
      console.log("Error STATUS");
    }
  } catch (error) {
    console.log("Error: ", error);
    notify("error", MESSAGE.CONFIRM_ORDER_FAILED);
  }
  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

function* findAllOrderByMonthAPI(action) {
  try {
    const { month } = action;
    let { status, data } = yield call(() => {
      return orderService.findAllOrderByMonth(month);
    });
    if (status === STATUS.SUCCESS) {
      yield put({
        type: FIND_ALL_ORDER_BY_MONTH,
        data,
      });
    } else {
      console.log("Error STATUS");
    }
  } catch (error) {
    console.log("Error: ", error);
  }
}

function* addReturnGoodAPI(action) {
  const { dth } = action;
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(500);
  try {
    let { status } = yield call(() => {
      return orderService.addReturnGoodAPI(dth);
    });
    if (status === STATUS.SUCCESS) {
      notify("success", MESSAGE.ADD_RETURN_GOOD_SUCCESS);
      yield put({
        type: CLOSE_DRAWER,
      });
    } else {
    }
  } catch (error) {
    console.log("Error: ", error);
    notify("error", MESSAGE.ADD_RETURN_GOOD_FAILED);
  }
  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

function* updateOrderDatetimeAPI(action) {
  const { detail, roles } = action;
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(500);
  try {
    let { status } = yield call(() => {
      return orderService.updateOrderDatetime(detail);
    });
    if (status === STATUS.SUCCESS) {
      if (_.isEqual(roles, MANAGER)) {
        yield put({
          type: FIND_ALL_ORDER_FALSE_ACTION,
        });
      } else {
        yield put({
          type: FIND_ALL_BY_PROVIDERID_ORDER_FALSE_ACTION,
        });
      }
      notify("success", MESSAGE.CONFIRM_ORDER_SUCCESS);
    } else {
      console.log("Error STATUS");
    }
  } catch (error) {
    console.log("Error: ", error);
    notify("error", MESSAGE.CONFIRM_ORDER_FAILED);
  }
  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

function* updateReturnGoodsAPI(action) {
  const { dth, roles } = action;
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(500);
  try {
    let { status } = yield call(() => {
      return orderService.updateReturnGoods(dth);
    });
    if (status === STATUS.SUCCESS) {
      if (_.isEqual(roles, MANAGER) || _.isEqual(roles, SELLER)) {
        yield put({
          type: _.isEqual(roles, MANAGER)
            ? FIND_ALL_ORDER_FALSE_ACTION
            : FIND_ALL_BY_PROVIDERID_ORDER_FALSE_ACTION,
        });
      }
      notify("success", MESSAGE.UPDATE_RETURN_GOOD_SUCCESS);
    } else {
      console.log("Error STATUS");
    }
  } catch (error) {
    console.log("Error: ", error);
    notify("error", MESSAGE.UPDATE_RETURN_GOOD_FAILED);
  }
  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

function* deleteReturnGoodsAPI(action) {
  const { dth, roles } = action;
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(500);
  try {
    let { status } = yield call(() => {
      return orderService.deleteReturnGoods(dth);
    });
    if (status === STATUS.SUCCESS) {
      if (_.isEqual(roles, MANAGER)) {
        yield put({
          type: FIND_ALL_ORDER_FALSE_ACTION,
        });
      } else {
        yield put({
          type: FIND_ALL_BY_PROVIDERID_ORDER_FALSE_ACTION,
        });
      }

      notify("success", MESSAGE.DELETE_RETURN_GOOD_SUCCESS);
    } else {
      console.log("Error STATUS");
    }
  } catch (error) {
    console.log("Error: ", error);
    notify("error", MESSAGE.DELETE_RETURN_GOOD_FAIELD);
  }
  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

function* acceptListOrderDetailAPI(action) {
  const { detail, roles } = action;
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(500);
  try {
    _.map(detail, (e) => {
      e.pheduyet = true;
    });

    let { status } = yield call(() => {
      return orderService.acceptOrderDetail(detail);
    });
    if (status === STATUS.SUCCESS) {
      if (_.isEqual(roles, MANAGER)) {
        yield put({
          type: FIND_ALL_ORDER_FALSE_ACTION,
        });
      } else {
        yield put({
          type: FIND_ALL_BY_PROVIDERID_ORDER_FALSE_ACTION,
        });
      }

      notify("success", MESSAGE.ADD_LIST_ORDER_DETAIL_SUCCESS);
    } else {
      console.log("Error STATUS");
    }
  } catch (error) {
    console.log("Error: ", error);
    notify("error", MESSAGE.ADD_LIST_ORDER_DETAIL_FAILED);
  }
  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

export function* ActionFindAllOrderFalseAPI() {
  yield takeLatest(FIND_ALL_ORDER_FALSE_ACTION, findAllOrderFalseAPI);
}

export function* ActionUpdateOrderAPI() {
  yield takeLatest(UPDATE_ORDER_ACTION, updateOrderAPI);
}

export function* ActionFindAllOrderByProviderIDAndFalseAPI() {
  yield takeLatest(
    FIND_ALL_BY_PROVIDERID_ORDER_FALSE_ACTION,
    findAllOrderByProviderIDAndFalseAPI
  );
}

export function* ActionAcceptOrderSellerAPI() {
  yield takeLatest(ACCEPT_ORDER_DETAIL_SELLER_ACTION, acceptOrderSellerAPI);
}

export function* ActionDeleteOrderSellerAPI() {
  yield takeLatest(DELETE_ORDER_DETAIL_SELLER_ACTION, deleteOrderSellerAPI);
}

export function* ActionDeleteOrderAdminAPI() {
  yield takeLatest(DELETE_ORDER_DETAIL_ADMIN_ACTION, deleteOrderAdminAPI);
}

export function* ActionUpdateOrderMyStoreAPI() {
  yield takeLatest(UPDATE_ORDER_MY_STORE_ACTION, updateOrderMyStoreAPI);
}

export function* ActionReceivedOrderAPI() {
  yield takeLatest(RECEIVED_ORDER_ACTION, receivedOrderAPI);
}

export function* ActionFindAllOrderedByMonthAPI() {
  yield takeLatest(FIND_ALL_ORDERED_BY_MONTH_ACTION, findAllOrderByMonthAPI);
}

export function* ActionUpdateOrderDatetimeAPI() {
  yield takeLatest(
    UPDATE_ORDER_RECEIVED_DATE_TIME_ACTION,
    updateOrderDatetimeAPI
  );
}

export function* ActionAddReturnGoodAPI() {
  yield takeLatest(ADD_RETURN_GOOD_ACTION, addReturnGoodAPI);
}

export function* ActionUpdateReturnGoodAPI() {
  yield takeLatest(UPDATE_RETURN_GOOD_ACTION, updateReturnGoodsAPI);
}

export function* ActionDeleteReturnGoodAPI() {
  yield takeLatest(DELETE_RETURN_GOOD_ACTION, deleteReturnGoodsAPI);
}

export function* ActionAcceptListOrderDetailAPI() {
  yield takeLatest(ACCEPT_LIST_ORDER_ACTION, acceptListOrderDetailAPI);
}
