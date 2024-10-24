import { call, takeLatest, put, delay } from "redux-saga/effects";
import { authorityService } from "../../../Services/AuthorityService";
import * as LOADING from "../../../Common/Const/Loading/Loading";
import * as Action from '../../../Common/Action/Authorities/AuthoritiesAction';
import * as API from "../../../Common/API/domain";
import * as Authority from '../../../Common/Const/Authority/AuthorityConst';
import {notify} from '../../../libs/Notify/Notify';
import * as type from '../../../Common/Const/Notify/NotifyConst';
import { ADD_ROLE_ADMIN_ACTION, DELETE_ROLE_ADMIN_ACTION, UPDATE_ROLE_ADMIN_ACTION } from "../../../Common/Action/Admin/AdminAction";
import { CLOSE_DRAWER } from "../../../Common/Const/Admin/Drawer";

function* findAllAPI(action) {
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(1000);

  try {
    let { data, status } = yield call(authorityService.findAll);
    if (status === API.STATUS.SUCCESS) {
      yield put({
        type: Authority.GET_ALL_AUTHORITIES,
        authorities: data
      });
      yield delay(1000);
    } else {
      console.log("Error");
    }
  } catch (error) {
    console.log("Error", error);
  }

  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

function * saveAPI(action){
  const {authority} = action;
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  delay(1000);

  try {
    let {status } = yield call(()=>{return authorityService.save(authority)});
    if (status === API.STATUS.SUCCESS) {
      yield put({
        type: Action.GET_ALL_AUTHORITIES_ACTION
      });
      notify('success', type.ADD_SUCCESS_MESSAGE);
    } else {
      console.log("Error");
    }
  } catch (error) {
    console.log("Error", error);
    notify('error', error.toString().includes('404') ? type.ADD_AUTHORITY_ERROR_MESSAGE : type.ADD_ERROR_MESSAGE);
  }

  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

function * deleteAPI(action){
  const {authority} = action;
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(1000);

  try {
    let { status } = yield call(()=>{return authorityService.delete(authority)});
    if (status === API.STATUS.SUCCESS) {
      yield put({
        type: Action.GET_ALL_AUTHORITIES_ACTION
      });
      notify('success',type.DELETE_SUCCESS_MESSAGE);
    } else {
      console.log("Error");
    }
  } catch (error) {
    console.log("Error", error);
    notify('success',type.DELETE_ERROR_MESSAGE);
  }

  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

function * saveRoleAPI(action){
  const {role} = action;
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  delay(1000);

  try {
    let {status } = yield call(()=>{return authorityService.addRole(role)});
    if (status === API.STATUS.SUCCESS) {
      yield put({
        type: Action.GET_ALL_AUTHORITIES_ACTION
      });

      yield put({
        type: CLOSE_DRAWER
      })
      notify('success', type.ADD_SUCCESS_MESSAGE);
    } else {
      console.log("Error");
    }
  } catch (error) {
    console.log("Error", error);
    notify('error', type.ADD_ERROR_MESSAGE);
  }

  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

function * updateRoleAPI(action){
  const {role} = action;
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  delay(1000);

  try {
    let {status } = yield call(()=>{return authorityService.updateRole(role)});
    if (status === API.STATUS.SUCCESS) {
      yield put({
        type: Action.GET_ALL_AUTHORITIES_ACTION
      });

      yield put({
        type: CLOSE_DRAWER
      })
      notify('success', type.UPDATE_SUCCESS_MESSAGE);
    } else {
      console.log("Error");
    }
  } catch (error) {
    console.log("Error", error);
    notify('error', type.UPDATE_ERROR_MESSAGE);
  }

  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

function * deleteRoleAPI(action){
  const {role} = action;
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(1000);

  try {
    let { status } = yield call(()=>{return authorityService.deleteRole(role)});
    if (status === API.STATUS.SUCCESS) {
      yield put({
        type: Action.GET_ALL_AUTHORITIES_ACTION
      });
      yield put({
        type: CLOSE_DRAWER
      })
      notify('success',type.DELETE_SUCCESS_MESSAGE);
    } else {
      console.log("Error");
    }
  } catch (error) {
    console.log("Error", error);
    notify('success',type.DELETE_ERROR_MESSAGE);
  }

  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

export function * ActionFindAllAuthorities(){
    yield takeLatest(
      Action.GET_ALL_AUTHORITIES_ACTION,
      findAllAPI
    )
}

export function * ActionSaveAuthority(){
  yield takeLatest(
    Action.ADD_AUTHORITIES_ACTION,
    saveAPI
  )
}

export function * ActionDeleteAuthority(){
  yield takeLatest(
    Action.DELETE_AUTHORITIES_ACTION,
    deleteAPI
  )
}

export function * ActionSaveRoleAPI(){
  yield takeLatest(
    ADD_ROLE_ADMIN_ACTION,
    saveRoleAPI
  )
}

export function * ActionUpdateRoleAPI(){
  yield takeLatest(
    UPDATE_ROLE_ADMIN_ACTION,
    updateRoleAPI
  )
}

export function * ActionDeleteRoleAPI(){
  yield takeLatest(
    DELETE_ROLE_ADMIN_ACTION,
    deleteRoleAPI
  )
}