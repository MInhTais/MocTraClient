import * as LOADING from "../../../Common/Const/Loading/Loading";
import { put, call, delay, takeLatest } from "redux-saga/effects";
import { authService } from "../../../Services/AuthService";
import * as System from "../../../Common/API/domain";
import * as Type from "../../../Common/Const/Auth/AuthConst";
import * as Action from "../../../Common/Action/Authentication/AuthAction";
import * as ChangePWD from "../../../Common/Action/Authentication/ChangePasswordAction";
import * as EditProfile from "../../../Common/Action/Authentication/EditProfileAction";
import * as TypeModal from "../../../Common/Const/Modal/ModalConst";
import { notify } from "../../../libs/Notify/Notify";
import * as MESSAGE from "../../../Common/Const/Notify/NotifyConst";
import _ from "lodash";
import { FORGET } from "../../../Common/Const/Auth/AuthConst";
import {
  FIND_VERIFICATION_CODE_ACTION,
  NEW_PASSWORD_ACTION,
} from "../../../Common/Action/Authentication/AuthAction";
import { history } from "../../../libs/History/history";
import {
  CLOSE_SUB_MODAL,
} from "../../../Common/Const/Modal/ModalConst";
import SignupForm from "../../../Components/Modal/SignupForm";
import { FIND_ALL_CATEGORIES_ACTION } from "../../../Common/Action/Category/CategoryAction";

function* login(action) {
  const { values } = action;
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(500);
  try {
    let { data, status } = yield call(() => {
      return authService.login(values);
    });
    if (status === System.STATUS.SUCCESS) {
      localStorage.setItem("credentials", JSON.stringify(data));
      yield put({
        type: Type.LOGIN,
        credentials: data,
      });

      yield put({
        type: TypeModal.CLOSE_MODAL,
      });
      history.push(
        _.find(data?.roles, (e) => e === Type.MANAGER || e === Type.STAFF)
          ? "/nha-cung-cap"
          : _.find(data?.roles, (e) => e === Type.SELLER)
          ? "/cua-hang"
          : ""
      );
    } else {
      console.log("ErrorS", status);
    }
  } catch (error) {
    console.group("Error", error);
    notify(
      "error",
      _.includes(error.toString(), "401")
        ? MESSAGE.LOGIN_ACCOUNT_BLOCK
        : MESSAGE.LOGIN_DONT_MATCH
    );
  }
  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

function* loginOAuth2(action) {
  const { values } = action;
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(500);
  try {
    let { data, status } = yield call(() => {
      return authService.loginOAuth2(values);
    });
    if (status === System.STATUS.SUCCESS) {
      localStorage.setItem("credentials", JSON.stringify(data));
      yield put({
        type: Type.LOGIN,
        credentials: data,
      });

      yield put({
        type: TypeModal.CLOSE_MODAL,
      });
      history.push(
        _.find(data?.roles, (e) => e === Type.MANAGER || e === Type.STAFF)
          ? "/nha-cung-cap"
          : _.find(data?.roles, (e) => e === Type.SELLER)
          ? "/cua-hang"
          : ""
      );
    } else {
      console.log("Error", status);
    }
  } catch (error) {
    console.group("Error", error);
    notify("error", MESSAGE.LOGIN_DONT_MATCH);
  }
  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

function* changePWDAPI(action) {
  const { user } = action;
  console.log("USER SAGA",user)
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(500);
  try {
    let { status } = yield call(() => {
      return authService.changedpwd(user);
    });
    if (status === System.STATUS.SUCCESS) {
      notify("success", MESSAGE.UPDATE_PASSWORD_SUCCESS);
    } else {
      console.log(status);
    }
  } catch (error) {
    notify("error", MESSAGE.UPDATE_PASSWORD_FAILED);
    console.log("Error", error);
  }
  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

function* findUserAPI(action) {
  const { username } = action;
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(500);
  try {
    let { data, status } = yield call(() => {
      return authService.findUserAPI(username);
    });
    if (status === System.STATUS.SUCCESS) {
      notify("success", MESSAGE.FORGET_SEND_MAIL_SUCCESS);
      localStorage.setItem("verifycode", JSON.stringify(data));
      yield put({
        type: CLOSE_SUB_MODAL,
      });

      yield put({
        type: FORGET,
        verified: data,
      });
    } else {
      console.log(status);
    }
  } catch (error) {
    console.log("Error", error);
    notify(
      "error",
      _.includes(error.toString(), "404")
        ? MESSAGE.NOT_EXISTS_USER
        : MESSAGE.SEND_MAIL_FAILED
    );
  }
  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

function* findVerificationCodeAPI(action) {
  const { verifycode } = action;
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(500);
  try {
    let { status } = yield call(() => {
      return authService.findVerificationCodeAPI(verifycode);
    });
    if (status === System.STATUS.SUCCESS) {
    } else {
      console.log(status);
    }
  } catch (error) {
    if (_.includes(error.toString(), "404")) {
      yield put({
        type: Type.DELETE_VERIFY_CODE,
      });
      history.replace("/trang-chu");
      notify("warning", MESSAGE.RECOVER_PASSWORD_VERIFY_CODE_TIME_OUT);
    }
    console.log("Error", error);
  }
  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

function* newPWDAPI(action) {
  const { newpass } = action;
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(500);
  try {
    let { status } = yield call(() => {
      return authService.newpassword(newpass);
    });
    if (status === System.STATUS.SUCCESS) {
      notify("success", MESSAGE.RECOVER_PASSWORD_SUCCESS);
      yield put({
        type: Type.DELETE_VERIFY_CODE,
      });
      history.replace("/trang-chu");
    } else {
      console.log(status);
    }
  } catch (error) {
    console.log("Error", error);
    if (_.includes(error.toString(), "404")) {
      yield put({
        type: Type.DELETE_VERIFY_CODE,
      });
      history.replace("/trang-chu");
    }
    notify(
      "error",
      _.includes(error.toString(), "404")
        ? MESSAGE.RECOVER_PASSWORD_VERIFY_CODE_TIME_OUT
        : MESSAGE.RECOVER_PASSWORD_FAILED
    );
  }
  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

function* editProfileAPI(action) {
  const { values } = action;
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(500);
  try {
    let { data, status } = yield call(() => {
      return authService.editprofile(values);
    });
    if (status === System.STATUS.SUCCESS) {
      notify("success", MESSAGE.UPDATE_SUCCESS_MESSAGE);
      localStorage.setItem("credentials", JSON.stringify(data));
      yield put({
        type: Type.LOGIN,
        credentials: data,
      });
    } else {
      console.log(status);
    }
  } catch (error) {
    console.log("Error", error);
    notify("error", MESSAGE.UPDATE_ERROR_MESSAGE);
  }
  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

function* orderWishlishOrderAPI(action) {
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(500);
  try {
    let { data, status } = yield call(authService.orderWishlistVoucher);
    if (status === System.STATUS.SUCCESS) {
      yield put({
        type: Type.ORDER_WISHLIST_VOUCHER,
        data,
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

function* deleteWishlistAPI(action) {
  const { mayt } = action;
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(500);
  try {
    let { status } = yield call(() => {
      return authService.deleteWishlist(mayt);
    });
    if (status === System.STATUS.SUCCESS) {
      yield put({
        type: Action.ORDER_WISHLIST_VOUCHER_ACTION,
      });
      notify("success", MESSAGE.DELETE_WISHLIST_SUCCESS);
    } else {
      console.log("Erorr", status);
    }
  } catch (error) {
    console.log("Error", error);
    notify("error", MESSAGE.DELETE_WISHLIST_FAILED);
  }
  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

function* addWishlistAPI(action) {
  const { wishlist } = action;
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(500);
  try {
    let { status } = yield call(() => {
      return authService.addWilish(wishlist);
    });
    if (status === System.STATUS.SUCCESS) {
      yield put({
        type: Action.ORDER_WISHLIST_VOUCHER_ACTION,
      });
      notify("success", MESSAGE.ADD_WISHLIST_SUCCESS);
    } else {
      console.log("Error", status);
    }
  } catch (error) {
    console.log("Error", error);
    notify(
      "error",
      _.includes(error.toString(), "400")
        ? MESSAGE.ADD_EXIST_WISHLIST_FAILED
        : MESSAGE.ADD_WISHLIST_FAILED
    );
  }
  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

function* deleteOrderingAPI(action) {
  const { madh } = action;
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(500);

  try {
    let { status } = yield call(() => {
      return authService.deleteOrdering(madh);
    });
    if (status === System.STATUS.SUCCESS) {
      yield put({
        type: Action.ORDER_WISHLIST_VOUCHER_ACTION,
      });

      yield put({
        type: FIND_ALL_CATEGORIES_ACTION
      })
      notify("success", MESSAGE.DELETE_ORDER_SUCCESS);
    }
  } catch (error) {
    console.log("Error", error);
    notify("error", MESSAGE.DELETE_ORDER_FAILED);
  }

  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

function* addVoucherAPI(action) {
  const { voucher } = action;
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(500);

  try {
    let { status } = yield call(() => {
      return authService.addVoucher(voucher);
    });
    if (status === System.STATUS.SUCCESS) {
      yield put({
        type: Action.ORDER_WISHLIST_VOUCHER_ACTION,
      });
      notify("success", MESSAGE.ADD_VOUCHER_SUCCESS);
    } else {
      console.log("Error", status);
    }
  } catch (error) {
    console.log("Error", error);
    notify("error", MESSAGE.ADD_VOUCHER_FAILED);
  }

  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

function* updateTokenAPI(action) {
  const { tendn } = action;
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(500);
  try {
    let { data, status } = yield call(() => {
      return authService.updateToken(tendn);
    });
    if (status === System.STATUS.SUCCESS) {
      localStorage.setItem("credentials", JSON.stringify(data));
      yield put({
        type: Type.LOGIN,
        credentials: data,
      });
    } else {
      console.log("Error", status);
    }
  } catch (error) {
    console.group("Error", error);
  }
  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

function* findUserRestictedAPI(action) {
  const { tendn } = action;
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(500);
  try {
    let { status, data } = yield call(() => {
      return authService.findAccountRestricted(tendn);
    });
    if (status === System.STATUS.SUCCESS) {
      yield put({
        type: Type.FIND_ACCOUNT_RESTRICTED,
        data,
      });
    } else {
      console.log(status);
    }
  } catch (error) {
    console.log("Error", error);
  }
  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

function* findAllEventsAPI(action) {
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(500);
  try {
    let { data, status } = yield call(authService.findAllEvents);
    if (status === System.STATUS.SUCCESS) {
      yield put({
        type: Type.FIND_ALL_EVENT,
        data,
      });
    } else {
      console.log(status);
    }
  } catch (error) {
    console.log("Error", error);
  }
  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

function* wheelLuckySpinAPI(action) {
  const { tenchitiet, mapt, mask } = action;
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(500);
  try {
    let { data, status } = yield call(() => {
      return authService.wheelLuckySpin(tenchitiet, mapt, mask);
    });
    if (status === System.STATUS.SUCCESS) {
      notify('success',`${MESSAGE.LUCKY_SPIN_REWARD_MESSAGE} ${data}`)
    } else if (status === System.STATUS.NO_CONTENT) {
      notify("warning", MESSAGE.CANNOT_WHEEL_SPIN_MESSAGE);
      console.log(status);
    }
  } catch (error) {
    console.log("Error", error);
  }
  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

function* findAllRewardJoinedAPI(action) {
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(500);
  try {
    let { data, status } = yield call(authService.findAllRewardJoined);
    if (status === System.STATUS.SUCCESS) {
      yield put({
        type: Type.FIND_ALL_REWARD_JOINED,
        data,
      });
    } else if (status === System.STATUS.NO_CONTENT) {
      console.log(status);
    }
  } catch (error) {
    console.log("Error", error);
  }
  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

function* findAllNotifyByUsernameAPI(action) {
  const { username } = action;
  try {
    let { data, status } = yield call(() => {
      return authService.findAllNotifyByUsernameAPI(username);
    });
    if (status === System.STATUS.SUCCESS) {
      yield put({
        type: Type.FIND_ALL_NOTIFY_BY_USERNAME,
        data,
      });
    } else {
      console.log(status);
    }
  } catch (error) {
    console.log("Error", error);
  }
}

function* updateStatusViewedAPI(action) {
  const {username} = action;
  yield delay(500);
  try {
    let {status } = yield call(()=>{return authService.updateStatusViewedAPI(username)});
    if (status === System.STATUS.SUCCESS) {
      yield put({
        type: Action.FIND_ALL_NOTIFY_BY_USERNAME_ACTION,
        username,
      });
    } else {
      console.log(status);
    }
  } catch (error) {
    console.log("Error", error);
  }
}

function* updateStatusReadAPI(action) {
  const {username,notify} = action;
  yield delay(500);
  try {
    let {status } = yield call(()=>{return authService.updateStatusReadAPI(notify)});
    if (status === System.STATUS.SUCCESS) {
      yield put({
        type: Action.FIND_ALL_NOTIFY_BY_USERNAME_ACTION,
        username,
      });
    } else {
      console.log(status);
    }
  } catch (error) {
    console.log("Error", error);
  }
}


function* giveToVoucherAPI(action) {
  const {tendn} = action;
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(500);
  try {
    let { status } = yield call(()=>{return authService.giveToVoucherAPI(tendn)});
    if (status === System.STATUS.SUCCESS) {
      yield put({
        type: TypeModal.CLOSE_FIRST_POPUP_MODAL
      })
      notify('success',MESSAGE.GIVE_TO_VOUCHER_SUCCESS);
      localStorage.setItem('fistVisit',true);
    } else if (status === System.STATUS.NO_CONTENT) {
      yield put({
        type: TypeModal.OPEN_FORM_MODAL,
        Component: <SignupForm />,
        title: Type.TITLE_SIGNUP,
        width: 1200,
      })
      notify('warning', MESSAGE.GIVE_TO_VOUCHER_WARNING);
    }
  } catch (error) {
    console.log("Error", error);
    notify('error', MESSAGE.GIVE_TO_VOUCHER_FAILED)
  }
  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

export function* ActionLogin() {
  yield takeLatest(Action.LOGIN_ACTION, login);
}

export function* ActionLoginOAuth2() {
  yield takeLatest(Action.LOGIN_WITH_OAUTH2_ACTION, loginOAuth2);
}

export function* ActionChangePwdAPI() {
  yield takeLatest(ChangePWD.CHANGED_PASSWORD_ACTION, changePWDAPI);
}

export function* ActionFindUserAPI() {
  yield takeLatest(Action.FIND_BY_USERNAME_ACTION, findUserAPI);
}

export function* ActionEditProfileAPI() {
  yield takeLatest(EditProfile.EDIT_PROFILE_ACTION, editProfileAPI);
}

export function* ActionOrderWishlishVoucherAPI() {
  yield takeLatest(Action.ORDER_WISHLIST_VOUCHER_ACTION, orderWishlishOrderAPI);
}

export function* ActionDeleteWishlistAPI() {
  yield takeLatest(Action.DELETE_WISHLIST_ACTION, deleteWishlistAPI);
}

export function* ActionAddWishlistAPI() {
  yield takeLatest(Action.ADD_WISHLIST_ACTION, addWishlistAPI);
}

export function* ActionDeleteOrderingAPI() {
  yield takeLatest(Action.DELETE_ORDERING_ACTION, deleteOrderingAPI);
}

export function* ActionAddVoucherAPI() {
  yield takeLatest(Action.ADD_VOUCHER_ACTION, addVoucherAPI);
}

export function* ActionFindVerifyCodeAPI() {
  yield takeLatest(FIND_VERIFICATION_CODE_ACTION, findVerificationCodeAPI);
}

export function* ActionNewPWDAPI() {
  yield takeLatest(NEW_PASSWORD_ACTION, newPWDAPI);
}
export function* ActionUpdateTokenAction() {
  yield takeLatest(Action.UPDATE_TOKEN_ACTION, updateTokenAPI);
}

export function* ActionFindRestrictedUserAPI() {
  yield takeLatest(Action.FIND_ACCOUNT_RESTRICTED_ACTION, findUserRestictedAPI);
}

export function* ActionFindAllEventsAPI() {
  yield takeLatest(Action.FIND_ALL_EVENT_ACTION, findAllEventsAPI);
}

export function* ActionWheelLuckySpinAPI() {
  yield takeLatest(Action.LUCKY_SPIN_EVENT_ACTION, wheelLuckySpinAPI);
}

export function * ActionFindAllRewardJoinedAPI(){
  yield takeLatest(Action.FIND_ALL_REWARD_JOINED_ACTION,findAllRewardJoinedAPI);
}

export function * ActionFindAllNotifyByUsernameAPI(){
  yield takeLatest(Action.FIND_ALL_NOTIFY_BY_USERNAME_ACTION, findAllNotifyByUsernameAPI)
}

export function * ActionUpdateStatusViewedAPI(){
  yield takeLatest(Action.UPDATE_STATUS_VIEWED_BY_USERNAME_ACTION, updateStatusViewedAPI)
}

export function * ActionUpdateStatusReadAPI(){
  yield takeLatest(Action.UPDATE_STATUS_READ_BY_USERNAME_ACTION, updateStatusReadAPI)
}

export function * ActionGiveToVoucherAPI(){
  yield takeLatest(Action.GIVE_TO_VOUCHER_ACTION,giveToVoucherAPI);
}