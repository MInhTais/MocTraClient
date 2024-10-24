import * as LOADING from "../../../Common/Const/Loading/Loading";
import { put, call, delay, takeLatest } from "redux-saga/effects";
import { notify } from "../../../libs/Notify/Notify";
import * as MESSAGE from "../../../Common/Const/Notify/NotifyConst";
import { pictureService } from "../../../Services/PictureService";
import * as Action from "../../../Common/Action/Picture/PictureAction";
import * as EditAction from "../../../Common/Action/Authentication/EditProfileAction";
import * as System from "../../../Common/API/domain";
import * as AdminAction from '../../../Common/Action/Admin/AdminAction';
import _ from "lodash";
import { MANAGER } from "../../../Common/Const/Auth/AuthConst";
import { ADD_PRODUCT_SELLER_ACTION, UPDATE_PRODUCT_SELLER_ACTION } from "../../../Common/Action/Admin/SellerAction";
import { ADD_RETURN_GOOD_ACTION } from "../../../Common/Action/Order/OrderAction";
import { ORDER_WISHLIST_VOUCHER_ACTION } from "../../../Common/Action/Authentication/AuthAction";

function* uploadAPI(action) {
  const { hinhanh, editprofile, values , oldImage} = action;
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(500);
  try {
    if(oldImage || !hinhanh){
      yield put({
        type: EditAction.EDIT_PROFILE_ACTION,
        values
      })
      yield put({
        type: ORDER_WISHLIST_VOUCHER_ACTION
      })
    }
    else{
      let { data, status } = yield call(() => {
        return pictureService.save(hinhanh);
      });
      if (status === System.STATUS.SUCCESS) {
        if(editprofile){
          values.hinhanh = data.name;
          yield put({
            type: EditAction.EDIT_PROFILE_ACTION,
            values
          })

          yield put({
            type: ORDER_WISHLIST_VOUCHER_ACTION
          })
        }
        notify('success',MESSAGE.UPLOAD_PICTURE_SUCCESS);
      } else {
        console.log("Error", status);
      }
    }
  } catch (error) {
    console.group("Error", error);
    notify("error", MESSAGE.UPLOAD_PICTURE_FAILED);
  }
  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

function* uploadProductAPI(action) {
  const { hinhanh, edit, values , oldImage, roles} = action;
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(500);
  try {
    if(oldImage){
      if(_.isEqual(roles,MANAGER)){
        yield put({
          type: AdminAction.UPDATE_PRODUCT_ACTION,
          product: values
        })
      }else{
        yield put({
          type: UPDATE_PRODUCT_SELLER_ACTION,
          product: values
        })
      }
    }else{
      let { data, status } = yield call(() => {
        return pictureService.savePicture(hinhanh);
      });
      if (status === System.STATUS.SUCCESS) {        
          values.hinhanh = data.name;
          if(_.isEqual(roles,MANAGER)){
            yield put({
              type: edit ? AdminAction.UPDATE_PRODUCT_ACTION : AdminAction.ADD_PRODUCT_ACTION,
              product: values
            })
          }else{
            yield put({
              type: edit ? UPDATE_PRODUCT_SELLER_ACTION : ADD_PRODUCT_SELLER_ACTION,
              product: values
            })
          }
        notify('success',MESSAGE.UPLOAD_PICTURE_SUCCESS);
      } else {
        console.log("Error", status);
      }
    }
  } catch (error) {
    console.group("Error", error);
    notify("error", MESSAGE.UPLOAD_PICTURE_FAILED);
  }
  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

function* uploadCarouselAPI(action) {
  const { hinhanh, edit, values , oldImage} = action;
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(500);
  try {
    if(oldImage){
      yield put({
        type: AdminAction.UPDATE_CAROUSEL_ACTION,
        carousel: values
      })
    }else{
      let { data, status } = yield call(() => {
        return pictureService.savePictureCarousel(hinhanh);
      });
      if (status === System.STATUS.SUCCESS) {        
          values.hinhanh = data.name;
          yield put({
            type: edit ? AdminAction.UPDATE_CAROUSEL_ACTION : AdminAction.ADD_CAROUSEL_ACTION,
            carousel: values
          })
        notify('success',MESSAGE.UPLOAD_PICTURE_SUCCESS);
      } else {
        console.log("Error", status);
      }
    }
  } catch (error) {
    console.group("Error", error);
    notify("error", MESSAGE.UPLOAD_PICTURE_FAILED);
  }
  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

function* uploadSubCategoryAPI(action) {
  const { hinhanh, edit, values , oldImage} = action;
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(500);
  try {
    if(oldImage){
        yield put({
          type: AdminAction.UPDATE_SUB_CATEGORY_ACTION,
          category: values
        })
    }else{
      let { data, status } = yield call(() => {
        return pictureService.savePictureCategory(hinhanh);
      });
      if (status === System.STATUS.SUCCESS) {        
          values.hinhanh = data.name;
            yield put({
              type: edit ? AdminAction.UPDATE_SUB_CATEGORY_ACTION : AdminAction.ADD_SUB_CATEGORY_ACTION,
              category: values
            })
        notify('success',MESSAGE.UPLOAD_PICTURE_SUCCESS);
      } else {
        console.log("Error", status);
      }
    }
  } catch (error) {
    console.group("Error", error);
    notify("error", MESSAGE.UPLOAD_PICTURE_FAILED);
  }
  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

function* uploadListReturnGoodAPI(action) {
  const {list, dth} = action;
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(500);
  try {
      let {data,status } = yield call(() => {
        return pictureService.saveListReturnGood(list);
      });
      if (status === System.STATUS.SUCCESS) {        
            dth.hinhanh1 = data[0];
            dth.hinhanh2 = data[1];
            dth.hinhanh3 = data[2];
            dth.hinhanh4 = data[3];
            dth.hinhanh5 = data[4];
            yield put({
              type: ADD_RETURN_GOOD_ACTION,
              dth
            })
        notify('success',MESSAGE.UPLOAD_PICTURE_SUCCESS);
      } else if(status===System.STATUS.NO_CONTENT){
        notify('warning', "Vui lòng chọn hình")
      }else{
        console.log("Error", status);
      }
    
  } catch (error) {
    console.group("Error", error);
    notify("error", MESSAGE.UPLOAD_PICTURE_FAILED);
  }
  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

export function* ActionUploadAPI() {
  yield takeLatest(Action.UPLOAD_PICTURE_ACTION, uploadAPI);
}

export function * ActionUploadProductAPI(){
  yield takeLatest(Action.UPLOAD_PICTURE_PRODUCT_ACTION, uploadProductAPI)
}

export function * ActionUploadCarouselAPI(){
  yield takeLatest(Action.UPLOAD_PICTURE_CAROUSEL_ACTION, uploadCarouselAPI)
}

export function * ActionUploadCategoryAPI(){
  yield takeLatest(Action.UPLOAD_PICTURE_SUB_CATEGORY_ACTION, uploadSubCategoryAPI)
}

export function * ActionUploadListReturnGoodAPI(){
  yield takeLatest(Action.UPLOAD_LIST_PICTURE_RETURN_GOOD_ACTION, uploadListReturnGoodAPI)
}