import * as LOADING from "../../../Common/Const/Loading/Loading";
import { takeLatest, put, call, delay } from "redux-saga/effects";
import * as System from "../../../Common/API/domain";
import { productService } from "../../../Services/ProductService";
import * as Type from "../../../Common/Const/Product/ProductConst";
import * as Action from "../../../Common/Action/Product/Product";
import _ from "lodash";
import { notify } from "../../../libs/Notify/Notify";
import * as MESSAGE from '../../../Common/Const/Notify/NotifyConst';
function* findAllSanphamByMaspAPI(action) {
  const { masp } = action;
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(1000);

  try {
    let { data, status } = yield call(() => {
      return productService.findAllByMasp(masp);
    });
    if (status === System.STATUS.SUCCESS) {
      yield put({
        type: Type.FIND_BY_MASP,
        product: data,
      });

      let related = yield call(() => {
        return productService.findAllByCategoryId(data.loaisp.maloai);
      });
      if (related.status === System.STATUS.SUCCESS) {
        yield put({
          type: Type.FIND_BY_MASP_BY_CATEGORY,
          related: related.data,
        });
      } else {
        console.log("Error", related.status);
      }
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

function* findAllSanphamByTenspAPI(action) {
  const { tensp } = action;
  try {
    if(_.includes(tensp,'5 sao') || _.includes(tensp,'4 sao') || _.includes(tensp,'3 sao')){
      let danhgia = _.includes(tensp,'5 sao') ? 5 : _.includes(tensp,'4 sao') ? 4 : 3;
      let { status, data } = yield call(() => {
        return productService.findAllByReviews(danhgia);
      });
      if (status === System.STATUS.SUCCESS) {
        yield put({
          type: Type.GET_ALL_PRODUCT_BY_KEYWORD,
          listProduct: data,
        });
      }
    }else{
      let { status, data } = yield call(() => {
        return productService.findAllByTensp(tensp);
      });
      if (status === System.STATUS.SUCCESS) {
        yield put({
          type: Type.GET_ALL_PRODUCT_BY_KEYWORD,
          listProduct: data,
        });
  
        let search = {
          title: tensp,
          type: "keyword",
          url: `/search/${tensp}`,
        };
      }
    }
    
  } catch (error) {
    console.log("Error", error);
  }
}

function* findAllSanphamBySearchAPI(action) {
  const { tensp, loai } = action;
  try {
    if (!loai) {
      let { status, data } = yield call(() => {
        return productService.findAllByTensp(tensp);
      });
      if (status === System.STATUS.SUCCESS) {
        yield put({
          type: Type.GET_ALL_PRODUCT_BY_SEARCH,
          listSearch: data,
        });
      }
    } else {
      let { status, data } = yield call(() => {
        return productService.findAllByCategory(tensp);
      });
      if (status === System.STATUS.SUCCESS) {
        yield put({
          type: Type.GET_ALL_PRODUCT_BY_SEARCH,
          listSearch: data,
        });
      }
    }
  } catch (error) {
    console.log("Error", error);
  }
}

function* updateViewAPI(action) {
  const { product } = action;
  try {
    let { status, data } = yield call(() => {
      return productService.updateView(product);
    });
    if (status === System.STATUS.SUCCESS) {
      yield put({
        type: Type.FIND_BY_MASP,
        product: data,
      });
    }
  } catch (error) {
    console.log("Error", error);
  }
}

function* findAllSanphamByMaloai(action) {
  const { maloai } = action;
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(500);
  try {
    let { status, data } = yield call(() => {
      return productService.findAllByCategoryId(maloai);
    });
    if (status === System.STATUS.SUCCESS) {
      yield put({
        type: Type.GET_ALL_PRODUCT_BY_KEYWORD,
        listProduct: data,
      });
    }
  } catch (error) {
    console.log("Error", error);
  }
  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

function* findAllProductByBrandID(action) {
  const { math } = action;
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(500);
  try {
    let { status, data } = yield call(() => {
      return productService.findAllByMath(math);
    });
    if (status === System.STATUS.SUCCESS) {
      yield put({
        type: Type.GET_ALL_PRODUCT_BY_KEYWORD,
        listProduct: data,
      });
    }
  } catch (error) {
    console.log("Error", error);
  }
  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

function* findAllProductByMainCategoryID(action) {
  const { manhom } = action;
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(500);
  try {
    let { status, data } = yield call(() => {
      return productService.findAllByMainCategoryID(manhom);
    });
    if (status === System.STATUS.SUCCESS) {
      yield put({
        type: Type.GET_ALL_PRODUCT_BY_KEYWORD,
        listProduct: data,
      });
    }
  } catch (error) {
    console.log("Error", error);
  }
  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

function* findAllProductByReviewsAPI(action) {
  const { danhgia } = action;
  yield delay(500);
  try {
    let { status, data } = yield call(() => {
      return productService.findAllByReviews(danhgia);
    });
    if (status === System.STATUS.SUCCESS) {
      yield put({
        type: Type.GET_ALL_PRODUCT_BY_KEYWORD,
        listProduct: data,
      });
    }
  } catch (error) {
    console.log("Error", error);
  }
}

function* findAllProductByPricesAPI(action) {
  const { min,max,range,ten } = action;
  yield delay(500);
  try {
    let { status, data } = yield call(() => {
      return productService.findAllByPrices(min,range,max,ten);
    });
    if (status === System.STATUS.SUCCESS) {
      yield put({
        type: Type.GET_ALL_PRODUCT_BY_KEYWORD,
        listProduct: data,
      });
    }
  } catch (error) {
    console.log("Error", error);
  }
}

function* addProductViolationAPI(action) {
  const { violation } = action;
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(500);
  try {
    let { status } = yield call(() => {
      return productService.addProductViolation(violation);
    });
    if (status === System.STATUS.SUCCESS) {
      notify('success',MESSAGE.ADD_PRODUCT_VIOLATION_SUCCESS);
    }
  } catch (error) {
    notify('error',MESSAGE.ADD_PRODUCT_VIOLATION_FAILED);
    console.log("Error", error);
  }
  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

export function* ActionFindAllSanphamByMaspAPI() {
  yield takeLatest(Action.FIND_ALL_BY_MASP_ACTION, findAllSanphamByMaspAPI);
}

export function* ActionFindAllSanphamByTenspAPI() {
  yield takeLatest(
    Action.GET_ALL_PRODUCT_BY_KEYWORD_ACTION,
    findAllSanphamByTenspAPI
  );
}

export function* ActionFindAllSanphamBySearchAPI() {
  yield takeLatest(
    Action.GET_ALL_PRODUCT_BY_SEARCH_ACTION,
    findAllSanphamBySearchAPI
  );
}

export function* ActionUpdateViewAPI() {
  yield takeLatest(
    Action.UPDATE_VIEW_PRODUCT_ACTION,
    updateViewAPI
  );
}

export function* ActionFindAllSanphamByMaloaiAPI() {
  yield takeLatest(Action.FIND_ALL_BY_PRODUCT_BY_CATEGORY_ACTION, findAllSanphamByMaloai);
}

export function* ActionAddProductViolationAPI() {
  yield takeLatest(Action.ADD_PRODUCT_VIOLATION_ACTION, addProductViolationAPI);
}

export function* ActionFindAllByBrandIDAPI() {
  yield takeLatest(Action.FIND_ALL_PRODUCT_BY_BRAND_ACTION, findAllProductByBrandID);
}

export function * ActionFindAllByMainCategoryIDAPI(){
  yield takeLatest(Action.FIND_ALL_PRODUCTS_BY_CATEGORY_ACTION,findAllProductByMainCategoryID);
}

export function * ActionFindAllByReviewsAPI(){
  yield takeLatest(Action.FIND_ALL_PRODUCTS_BY_REVIEWS_ACTION,findAllProductByReviewsAPI);
}

export function * ActionFindAllByPricesAPI(){
  yield takeLatest(Action.FIND_ALL_PRODUCTS_BY_PRICES_ACTION,findAllProductByPricesAPI);
}