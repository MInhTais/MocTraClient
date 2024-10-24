import * as LOADING from "../../../Common/Const/Loading/Loading";
import { call, takeLatest, put, delay } from "redux-saga/effects";
import { checkoutService } from "../../../Services/CheckoutService";
import * as System from "../../../Common/API/domain";
import * as Action from "../../../Common/Action/Checkout/CheckoutAction";
import * as Type from "../../../Common/Const/Checkout/CheckoutConst";

function* findAllAddressAPI(action) {
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(500);
  try {
    let p = yield call(checkoutService.findAllProvince);
    if (p.status === System.STATUS.SUCCESS) {
      yield put({
        type: Type.FIND_ALL_PROVINCE,
        province: p.data.data,
      });

      console.log("PROVINCE SAGA", p.data);
      let d = yield call(() => {
        return checkoutService.findAllDistrictByProvince(
          p.data.data[0].ProvinceID
        );
      });
      if (d.status === System.STATUS.SUCCESS) {
        yield put({
          type: Type.FIND_ALL_DISTRICT_BY_PROVINCE,
          district: d.data.data,
          ProvinceID: p.data.data[0].ProvinceID,
        });

        console.log("DISTRICT SAGA", d.data);
        var a = yield call(() => {
          return checkoutService.findAllWardByDistrict(d.data.data[0].DistrictID);
        });
        if (a.status === System.STATUS.SUCCESS) {
          yield put({
            type: Type.FIND_ALL_AWARD_BY_DISTRICT,
            award: a.data.data,
          });
          console.log("AWARD SAGA", a.data);
          let s = yield call(() => {return checkoutService.findAllServicesByDistrict(d.data.data[0].DistrictID)});
          if (s.status === System.STATUS.SUCCESS) {
            yield put({
              type: Type.FIND_ALL_SERVICES_AVAILABLE,
              service: s.data.data,
            });
            console.log("Service", s.data.data);
          }
          var f = yield call(() => {
            return checkoutService.findFeesByService(s.data.data[0].service_id, d.data.data[0].DistrictID, a.data.data[0].WardCode);
          });
          if (f.status === System.STATUS.SUCCESS) {
            yield put({
              type: Type.FIND_FEES,
              fee: f.data.data,
            });
            console.log("FEE SAGA", f.data);
          }
        }
      }
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
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(500);

  try {
    let d = yield call(() => {
      return checkoutService.findAllDistrictByProvince(ProvinceID);
    });
    if (d.status === System.STATUS.SUCCESS) {
      yield put({
        type: Type.FIND_ALL_DISTRICT_BY_PROVINCE,
        district: d.data.data,
        ProvinceID,
      });
      console.log("DISTRICT SAGA", d.data);
      var w = yield call(() => {
        return checkoutService.findAllWardByDistrict(d.data.data[0].DistrictID);
      });
      if (w.status === System.STATUS.SUCCESS) {
        yield put({
          type: Type.FIND_ALL_AWARD_BY_DISTRICT,
          award: w.data.data,
        });
        console.log("AWARD SAGA", w.data);
        let s = yield call(() => {
          return checkoutService.findAllServicesByDistrict(d.data.data[0].DistrictID);
        });
        if (s.status === System.STATUS.SUCCESS) {
          yield put({
            type: Type.FIND_ALL_SERVICES_AVAILABLE,
            service: s.data.data,
          });
          console.log("Service", s.data.data);
          var f = yield call(() => {
            return checkoutService.findFeesByService(s.data.data[0].service_id,
              d.data.data[0].DistrictID,
              w.data.data[0].WardCode);
          });
          if (f.status === System.STATUS.SUCCESS) {
            yield put({
              type: Type.FIND_FEES,
              fee: f.data.data,
            });
            console.log("FEE SAGA", f.data);
          }
        }
        
      }
    }
  } catch (error) {
    console.log("Error", error);
  }
  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

function* findAllAwardAPI(action) {
  const { DistrictID } = action;
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(500);

  try {
    let { data, status } = yield call(() => {
      return checkoutService.findAllWardByDistrict(DistrictID);
    });
    if (status === System.STATUS.SUCCESS) {
      yield put({
        type: Type.FIND_ALL_AWARD_BY_DISTRICT,
        award: data.data,
      });
      yield put({
        type: Action.FIND_ALL_SERVICE_AVAILABLE_ACTION,
        DistrictID,
      });

      console.log("AWARD SAGA", data);
      let s = yield call(() => {
        return checkoutService.findAllServicesByDistrict(DistrictID);
      });
      if (s.status === System.STATUS.SUCCESS) {
        yield put({
          type: Type.FIND_ALL_SERVICES_AVAILABLE,
          service: s.data.data,
        });
        console.log("Service", s.data.data);
      }
      var f = yield call(() => {
        return checkoutService.findFeesByService(s.data.data[0].service_id, DistrictID, data.data[0].WardCode);
      });
      if (f.status === System.STATUS.SUCCESS) {
        yield put({
          type: Type.FIND_FEES,
          fee: f.data.data,
        });
        console.log("FEE SAGA", f.data);
      }
    }
  } catch (error) {
    console.log("Error", error);
  }
  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

function* findAllServiceAPI(action) {
  const { DistrictID } = action;
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(500);

  try {
    let { data, status } = yield call(() => {
      return checkoutService.findAllServicesByDistrict(DistrictID);
    });
    if (status === System.STATUS.SUCCESS) {
      yield put({
        type: Type.FIND_ALL_SERVICES_AVAILABLE,
        service: data.data,
      });
      console.log("Service", data.data);
      var w = yield call(()=> {return checkoutService.findAllWardByDistrict(DistrictID)});
      var f = yield call(() => {
        return checkoutService.findFeesByService(data.data[0].service_id, DistrictID, w.data.data[0].WardCode);
      });
      if (f.status === System.STATUS.SUCCESS) {
        yield put({
          type: Type.FIND_FEES,
          fee: f.data.data,
        });
        console.log("FEE SAGA", f.data);
      }
    }
  } catch (error) {
    console.log("Error", error);
  }
  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

function* findAllFeeAPI(action) {
  const { DistrictID, WardCode, service } = action;
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(500);

  try {
    let { data, status } = yield call(() => {
      return checkoutService.findFeesByService(service, DistrictID, WardCode);
    });
    if (status === System.STATUS.SUCCESS) {
      yield put({
        type: Type.FIND_FEES,
        fee: data.data,
      });
      console.log("FEE SAGA", data);
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

export function* ActionFindAllServiceAPI() {
  yield takeLatest(Action.FIND_ALL_SERVICE_AVAILABLE_ACTION, findAllServiceAPI);
}

export function* ActionFindFeeAPI() {
  yield takeLatest(Action.FIND_FEES_ACTION, findAllFeeAPI);
}
