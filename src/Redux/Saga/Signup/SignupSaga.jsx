import * as Action from "../../../Common/Action/Signup/SignupAction";
import { takeLatest, put, delay, call } from "redux-saga/effects";
import * as LOADING from "../../../Common/Const/Loading/Loading";
import { signUpService } from "../../../Services/SignupService";
import * as API from "../../../Common/API/domain";
import * as Type from "../../../Common/Const/Modal/ModalConst";
import * as MESSAGE from "../../../Common/Const/Notify/NotifyConst";
import LoginForm from "../../../Components/Modal/LoginForm";
import {notify} from '../../../libs/Notify/Notify';

function* signupAPI(action) {
  const { signup } = action;
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });

  yield delay(500);
  try {
    let { status } = yield call(() => {
      return signUpService.signup(signup);
    });
    if (status === API.STATUS.SUCCESS) {
      yield put({
        type: Type.CLOSE_MODAL,
      });

      yield put({
        type: Type.OPEN_FORM_MODAL,
        Component: <LoginForm />,
        title: "Đăng nhập",
        width: 600,
      });
      notify("success", MESSAGE.CREATE_ACCOUNT_SUCCESS_MESSAGE);
    } else {
      if(status === API.STATUS.NO_CONTENT){
        notify('warning',MESSAGE.CREATE_ACCOUNT_DUPLICATE_WARNING)
      }
    }
  } catch (error) {
    console.log("Error", error);
    notify("error", MESSAGE.CREATE_ACCOUNT_FAILED_MESSAGE);
  }

  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

export function* ActionSignupAPI() {
  yield takeLatest(Action.SIGN_UP_ACTION, signupAPI);
}
