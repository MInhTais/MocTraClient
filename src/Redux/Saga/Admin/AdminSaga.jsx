import * as Action from "../../../Common/Action/Admin/AdminAction";
import * as Type from "../../../Common/Const/Admin/AdminConst";
import * as LOADING from "../../../Common/Const/Loading/Loading";
import { adminService } from "../../../Services/AdminService";
import { call, put, delay, takeLatest } from "redux-saga/effects";
import * as System from "../../../Common/API/domain";
import * as DRAWER from "../../../Common/Const/Admin/Drawer";
import { notify } from "../../../libs/Notify/Notify";
import * as NotifyType from "../../../Common/Const/Notify/NotifyConst";
import _ from "lodash";
import { GET_ALL_AUTHORITIES_ACTION } from "../../../Common/Action/Authorities/AuthoritiesAction";
import * as MESSAGE from '../../../Common/Const/Notify/NotifyConst';

function* findAllAPI(action) {
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(500);

  try {
    let { data, status } = yield call(adminService.findAll);
    if (status === System.STATUS.SUCCESS) {
      yield put({
        type: Type.FIND_ALL,
        data,
      });
    } else {
      console.log(status);
    }
  } catch (error) {
    console.log(error);
  }

  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

function* addProviderAPI(action) {
  const { provider } = action;
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(500);

  try {
    let { status } = yield call(() => {
      return adminService.addProvider(provider);
    });
    if (status === System.STATUS.SUCCESS) {
      yield put({
        type: Action.FIND_ALL_ACTION,
      });

      yield put({
        type: DRAWER.CLOSE_DRAWER,
      });
      notify("success", NotifyType.ADD_SUCCESS_MESSAGE);
    } else {
      console.log(status);
      notify("error", NotifyType.ADD_ERROR_MESSAGE);
    }
  } catch (error) {
    console.log(error);
    notify("error", NotifyType.ADD_ERROR_MESSAGE);
  }

  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

function* updateProviderAPI(action) {
  const { provider } = action;
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(500);

  try {
    let { status } = yield call(() => {
      return adminService.updateProvider(provider);
    });
    if (status === System.STATUS.SUCCESS) {
      yield put({
        type: Action.FIND_ALL_ACTION,
      });

      yield put({
        type: DRAWER.CLOSE_DRAWER,
      });

      notify("success", NotifyType.UPDATE_SUCCESS_MESSAGE);
    } else {
      console.log(status);
      notify("error", NotifyType.UPDATE_ERROR_MESSAGE);
    }
  } catch (error) {
    console.log(error);
    notify("error", NotifyType.UPDATE_ERROR_MESSAGE);
  }

  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

function* updateStatusShopAPI(action) {
  const { shop } = action;
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(500);

  try {
    let { status } = yield call(() => {
      return adminService.updateStatusShop(shop);
    });
    if (status === System.STATUS.SUCCESS) {
      yield put({
        type: Action.FIND_ALL_ACTION,
      });

      yield put({
        type: DRAWER.CLOSE_DRAWER,
      });

      notify("success", NotifyType.UPDATE_SUCCESS_MESSAGE);
    } else {
      console.log(status);
      notify("error", NotifyType.UPDATE_ERROR_MESSAGE);
    }
  } catch (error) {
    console.log(error);
    notify("error", NotifyType.UPDATE_ERROR_MESSAGE);
  }

  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

function* deleteProviderAPI(action) {
  const { provider } = action;
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(500);

  try {
    let { status } = yield call(() => {
      return adminService.deleteProvider(provider);
    });
    if (status === System.STATUS.SUCCESS) {
      yield put({
        type: Action.FIND_ALL_ACTION,
      });
      notify("success", NotifyType.DELETE_SUCCESS_MESSAGE);
    } else {
      console.log(status);
      notify("error", NotifyType.DELETE_ERROR_MESSAGE);
    }
  } catch (error) {
    console.log(error);
    notify(
      "error",
      error.toString().includes("404")
        ? NotifyType.DELETE_PROVIDER_ERROR_CANNOT_DELETE_MESSAGE
        : NotifyType.DELETE_ERROR_MESSAGE
    );
  }

  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

function* addMeasurerAPI(action) {
  const { measure } = action;
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(500);

  try {
    let { status } = yield call(() => {
      return adminService.addMeasure(measure);
    });
    if (status === System.STATUS.SUCCESS) {
      yield put({
        type: Action.FIND_ALL_ACTION,
      });

      yield put({
        type: DRAWER.CLOSE_DRAWER,
      });
      notify("success", NotifyType.ADD_MEASURE_SUCCESS);
    } else {
      console.log(status);
      notify("error", NotifyType.ADD_MEASURE_FAILED);
    }
  } catch (error) {
    console.log(error);
    notify("error", NotifyType.ADD_MEASURE_FAILED);
  }

  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

function* updateMeasureAPI(action) {
  const { measure } = action;
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(500);

  try {
    let { status } = yield call(() => {
      return adminService.updateMeasure(measure);
    });
    if (status === System.STATUS.SUCCESS) {
      yield put({
        type: Action.FIND_ALL_ACTION,
      });

      yield put({
        type: DRAWER.CLOSE_DRAWER,
      });

      notify("success", NotifyType.UPDATE_MEASURE_SUCCESS);
    } else {
      console.log(status);
      notify("error", NotifyType.UPDATE_MEASURE_FAILED);
    }
  } catch (error) {
    console.log(error);
    notify("error", NotifyType.UPDATE_MEASURE_FAILED);
  }

  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

function* deleteMeasureAPI(action) {
  const { measure } = action;
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(500);

  try {
    let { status } = yield call(() => {
      return adminService.deleteMeasure(measure);
    });
    if (status === System.STATUS.SUCCESS) {
      yield put({
        type: Action.FIND_ALL_ACTION,
      });
      notify("success", NotifyType.DELETE_MEASURE_SUCCESS);
    } else {
      console.log(status);
      notify("error", NotifyType.DELETE_MEASURE_FAILED);
    }
  } catch (error) {
    console.log(error);
    notify("error", NotifyType.DELETE_MEASURE_FAILED);
  }

  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

function* addCategoryAPI(action) {
  const { category } = action;
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(500);

  try {
    let { status } = yield call(() => {
      return adminService.addCategory(category);
    });
    if (status === System.STATUS.SUCCESS) {
      yield put({
        type: Action.FIND_ALL_ACTION,
      });
      yield put({
        type: DRAWER.CLOSE_DRAWER,
      });
      notify("success", NotifyType.ADD_SUCCESS_MESSAGE);
    } else {
      console.log(status);
      notify("error", NotifyType.ADD_ERROR_MESSAGE);
    }
  } catch (error) {
    console.log(error);
    notify("error", NotifyType.ADD_ERROR_MESSAGE);
  }

  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

function* updateCategoryAPI(action) {
  const { category } = action;
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(500);

  try {
    let { status } = yield call(() => {
      return adminService.updateCategory(category);
    });
    if (status === System.STATUS.SUCCESS) {
      yield put({
        type: Action.FIND_ALL_ACTION,
      });
      yield put({
        type: DRAWER.CLOSE_DRAWER,
      });

      notify("success", NotifyType.UPDATE_SUCCESS_MESSAGE);
    } else {
      console.log(status);
      notify("error", NotifyType.UPDATE_ERROR_MESSAGE);
    }
  } catch (error) {
    console.log(error);
    notify("error", NotifyType.UPDATE_ERROR_MESSAGE);
  }

  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

function* deleteCategoryAPI(action) {
  const { category } = action;
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(500);

  try {
    let { status } = yield call(() => {
      return adminService.deleteCategory(category);
    });
    if (status === System.STATUS.SUCCESS) {
      yield put({
        type: Action.FIND_ALL_ACTION,
      });
      yield put({
        type: DRAWER.CLOSE_DRAWER,
      });
      notify("success", NotifyType.DELETE_SUCCESS_MESSAGE);
    } else {
      console.log(status);
      notify("error", NotifyType.DELETE_ERROR_MESSAGE);
    }
  } catch (error) {
    console.log(error);
    notify(
      "error",
      error.toString().includes("404")
        ? NotifyType.DELETE_CATEGORY_ERROR_CANNOT_DELETE_MESSAGE
        : NotifyType.DELETE_ERROR_MESSAGE
    );
  }

  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

function* addSubCategoryAPI(action) {
  const { category } = action;
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(500);

  try {
    let { status } = yield call(() => {
      return adminService.addSubCategory(category);
    });
    if (status === System.STATUS.SUCCESS) {
      yield put({
        type: Action.FIND_ALL_ACTION,
      });
      yield put({
        type: DRAWER.CLOSE_DRAWER,
      });
      notify("success", NotifyType.ADD_SUCCESS_MESSAGE);
    } else {
      console.log(status);
      notify("error", NotifyType.ADD_ERROR_MESSAGE);
    }
  } catch (error) {
    console.log(error);
    notify("error", NotifyType.ADD_ERROR_MESSAGE);
  }

  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

function* updateSubCategoryAPI(action) {
  const { category } = action;
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(500);

  try {
    let { status } = yield call(() => {
      return adminService.updateSubCategory(category);
    });
    if (status === System.STATUS.SUCCESS) {
      yield put({
        type: Action.FIND_ALL_ACTION,
      });
      yield put({
        type: DRAWER.CLOSE_DRAWER,
      });

      notify("success", NotifyType.UPDATE_SUCCESS_MESSAGE);
    } else {
      console.log(status);
      notify("error", NotifyType.UPDATE_ERROR_MESSAGE);
    }
  } catch (error) {
    console.log(error);
    notify("error", NotifyType.UPDATE_ERROR_MESSAGE);
  }

  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

function* deleteSubCategoryAPI(action) {
  const { category } = action;
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(500);

  try {
    let { status } = yield call(() => {
      return adminService.deleteSubCategory(category);
    });
    if (status === System.STATUS.SUCCESS) {
      yield put({
        type: Action.FIND_ALL_ACTION,
      });
      yield put({
        type: DRAWER.CLOSE_DRAWER,
      });
      notify("success", NotifyType.DELETE_SUCCESS_MESSAGE);
    } else {
      console.log(status);
      notify("error", NotifyType.DELETE_ERROR_MESSAGE);
    }
  } catch (error) {
    console.log(error);
    notify(
      "error",
      error.toString().includes("404")
        ? NotifyType.DELETE_SUB_CATEGORY_ERROR_CANNOT_DELETE_MESSAGE
        : NotifyType.DELETE_ERROR_MESSAGE
    );
  }

  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

function* findAllBrandByCategoryID(action) {
  const {tenloai} = action;
  yield delay(500);
  try {
    let { data, status } = yield call(()=>{return adminService.findAllByCategoryID(tenloai)});
    if (status === System.STATUS.SUCCESS) {
      yield put({
        type: Type.FIND_ALL_BRAND_BY_CATEGORYID,
        data,
      });
    } else {
      console.log(status);
    }
  } catch (error) {
    console.log(error);
  }
}

function* addBrandAPI(action) {
  const { brand } = action;
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(500);

  try {
    let { status } = yield call(() => {
      return adminService.addBrand(brand);
    });
    if (status === System.STATUS.SUCCESS) {
      yield put({
        type: Action.FIND_ALL_ACTION,
      });
      yield put({
        type: DRAWER.CLOSE_DRAWER,
      });
      notify("success", NotifyType.ADD_SUCCESS_MESSAGE);
    } else {
      console.log(status);
      notify("error", NotifyType.ADD_ERROR_MESSAGE);
    }
  } catch (error) {
    console.log(error);
    notify("error", NotifyType.ADD_ERROR_MESSAGE);
  }

  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

function* updateBrandAPI(action) {
  const { brand } = action;
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(500);

  try {
    let { status } = yield call(() => {
      return adminService.updateBrand(brand);
    });
    if (status === System.STATUS.SUCCESS) {
      yield put({
        type: Action.FIND_ALL_ACTION,
      });
      yield put({
        type: DRAWER.CLOSE_DRAWER,
      });

      notify("success", NotifyType.UPDATE_SUCCESS_MESSAGE);
    } else {
      console.log(status);
      notify("error", NotifyType.UPDATE_ERROR_MESSAGE);
    }
  } catch (error) {
    console.log(error);
    notify("error", NotifyType.UPDATE_ERROR_MESSAGE);
  }

  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

function* deleteBrandAPI(action) {
  const { brand } = action;
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(500);

  try {
    let { status } = yield call(() => {
      return adminService.deleteBrand(brand);
    });
    if (status === System.STATUS.SUCCESS) {
      yield put({
        type: Action.FIND_ALL_ACTION,
      });
      yield put({
        type: DRAWER.CLOSE_DRAWER,
      });
      notify("success", NotifyType.DELETE_SUCCESS_MESSAGE);
    } else {
      console.log(status);
      notify("error", NotifyType.DELETE_ERROR_MESSAGE);
    }
  } catch (error) {
    console.log(error);
    notify(
      "error",
      error.toString().includes("404")
        ? NotifyType.DELETE_BRAND_ERROR_CANNOT_DELETE_MESSAGE
        : NotifyType.DELETE_ERROR_MESSAGE
    );
  }
  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

function* findProductAPI(action) {
  const { tenncc } = action;
  try {
    let { status, data } = yield call(() => {
      return adminService.findAllByProvidername(tenncc);
    });
    if (status === System.STATUS.SUCCESS) {
      let sp = _?.filter(data, (e) => e.conlai > 0);
      yield put({
        type: Type.FIND_ALL_BY_PRODUCT,
        sp,
      });
      yield put({
        type: DRAWER.CLOSE_DRAWER,
      });
    } else {
      console.log(status);
    }
  } catch (error) {
    console.log(error);
  }
}

function* findReviewAPI(action) {
  const { tenncc } = action;
  try {
    let { status, data } = yield call(() => {
      return adminService.findAllReviewByProvidername(tenncc);
    });
    if (status === System.STATUS.SUCCESS) {
      yield put({
        type: Type.FIND_ALL_REVIEW_BY_PRODUCT,
        data,
      });
    } else {
      console.log(status);
    }
  } catch (error) {
    console.log(error);
  }
}

function* addProductAPI(action) {
  const { product } = action;
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(500);

  try {
    let { status } = yield call(() => {
      return adminService.addProduct(product);
    });
    if (status === System.STATUS.SUCCESS) {
      yield put({
        type: Action.FIND_ALL_ACTION,
      });
      yield put({
        type: DRAWER.CLOSE_DRAWER,
      });
      notify("success", NotifyType.ADD_SUCCESS_MESSAGE);
    } else {
      console.log(status);
      notify("error", NotifyType.ADD_ERROR_MESSAGE);
    }
  } catch (error) {
    console.log(error);
    notify("error", NotifyType.ADD_ERROR_MESSAGE);
  }

  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

function* updateProductAPI(action) {
  const { product } = action;
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(500);

  try {
    let { status } = yield call(() => {
      return adminService.updateProduct(product);
    });
    if (status === System.STATUS.SUCCESS) {
      yield put({
        type: Action.FIND_ALL_ACTION,
      });

      yield put({
        type: DRAWER.CLOSE_DRAWER,
      });
      notify("success", NotifyType.UPDATE_SUCCESS_MESSAGE);
    } else {
      console.log(status);
      notify("error", NotifyType.UPDATE_ERROR_MESSAGE);
    }
  } catch (error) {
    console.log(error);
    notify("error", NotifyType.UPDATE_ERROR_MESSAGE);
  }

  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

function* updateProductViolationAPI(action) {
  const { mavp, bcvp } = action;
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(500);

  try {
    let { status } = yield call(() => {
      return adminService.updateProductViolation(mavp, bcvp);
    });
    if (status === System.STATUS.SUCCESS) {
      yield put({
        type: Action.FIND_ALL_ACTION,
      });

      yield put({
        type: DRAWER.CLOSE_DRAWER,
      });
      notify("success", NotifyType.UPDATE_SUCCESS_MESSAGE);
    } else {
      console.log(status);
      notify("error", NotifyType.UPDATE_ERROR_MESSAGE);
    }
  } catch (error) {
    console.log(error);
    notify("error", NotifyType.UPDATE_ERROR_MESSAGE);
  }

  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

function* deleteProductAPI(action) {
  const { product } = action;
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(500);

  try {
    let { status } = yield call(() => {
      return adminService.deleteProduct(product);
    });
    if (status === System.STATUS.SUCCESS) {
      yield put({
        type: Action.FIND_ALL_ACTION,
      });
      yield put({
        type: DRAWER.CLOSE_DRAWER,
      });
      notify("success", NotifyType.DELETE_SUCCESS_MESSAGE);
    } else {
      console.log(status);
      notify("error", NotifyType.DELETE_ERROR_MESSAGE);
    }
  } catch (error) {
    console.log(error);
    notify(
      "error",
      error.toString().includes("404")
        ? NotifyType.DELETE_PRODUCT_ERROR_CANNOT_DELETE_MESSAGE
        : NotifyType.DELETE_ERROR_MESSAGE
    );
  }
  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

function* addProductForbiddenAPI(action) {
  const { product } = action;
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(500);

  try {
    let { status } = yield call(() => {
      return adminService.addProductForbidden(product);
    });
    if (status === System.STATUS.SUCCESS) {
      yield put({
        type: Action.FIND_ALL_ACTION,
      });
      yield put({
        type: DRAWER.CLOSE_DRAWER,
      });
      notify("success", NotifyType.ADD_SUCCESS_MESSAGE);
    } else {
      console.log(status);
      notify("error", NotifyType.ADD_ERROR_MESSAGE);
    }
  } catch (error) {
    console.log(error);
    notify("error", NotifyType.ADD_ERROR_MESSAGE);
  }

  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

function* deleteProductForbiddenAPI(action) {
  const { product } = action;
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(500);

  try {
    let { status } = yield call(() => {
      return adminService.deleteProductForbidden(product);
    });
    if (status === System.STATUS.SUCCESS) {
      yield put({
        type: Action.FIND_ALL_ACTION,
      });
      yield put({
        type: DRAWER.CLOSE_DRAWER,
      });
      notify("success", NotifyType.DELETE_SUCCESS_MESSAGE);
    } else {
      console.log(status);
      notify("error", NotifyType.DELETE_ERROR_MESSAGE);
    }
  } catch (error) {
    console.log(error);
    notify("error", NotifyType.DELETE_ERROR_MESSAGE);
  }
  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

function* deleteProductViolationAPI(action) {
  const { violation } = action;
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(500);

  try {
    let { status } = yield call(() => {
      return adminService.deleteProductViolation(violation);
    });
    if (status === System.STATUS.SUCCESS) {
      yield put({
        type: Action.FIND_ALL_ACTION,
      });
      yield put({
        type: DRAWER.CLOSE_DRAWER,
      });
      notify("success", NotifyType.DELETE_SUCCESS_MESSAGE);
    } else {
      console.log(status);
      notify("error", NotifyType.DELETE_ERROR_MESSAGE);
    }
  } catch (error) {
    console.log(error);
    notify("error", NotifyType.DELETE_ERROR_MESSAGE);
  }
  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

function* addUserAPI(action) {
  const { user } = action;
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(500);

  try {
    let { status } = yield call(() => {
      return adminService.addUser(user);
    });
    if (status === System.STATUS.SUCCESS) {
      yield put({
        type: GET_ALL_AUTHORITIES_ACTION,
      });
      yield put({
        type: DRAWER.CLOSE_DRAWER,
      });
      notify("success", NotifyType.ADD_SUCCESS_MESSAGE);
    } else {
      console.log(status);
      notify("error", NotifyType.ADD_ERROR_MESSAGE);
    }
  } catch (error) {
    console.log(error);
    notify("error", NotifyType.ADD_ERROR_MESSAGE);
  }

  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

function* updateUserAPI(action) {
  const { user } = action;
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(500);

  try {
    let { status } = yield call(() => {
      return adminService.updateUser(user);
    });
    if (status === System.STATUS.SUCCESS) {
      yield put({
        type: GET_ALL_AUTHORITIES_ACTION,
      });

      yield put({
        type: DRAWER.CLOSE_DRAWER,
      });
      notify("success", "Cập nhật thành công");
    } else {
      console.log(status);
      notify("error", NotifyType.UPDATE_ERROR_MESSAGE);
    }
  } catch (error) {
    console.log(error);
    notify("error", NotifyType.UPDATE_ERROR_MESSAGE);
  }

  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

function* deleteUserAPI(action) {
  const { user } = action;
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(500);

  try {
    let { status } = yield call(() => {
      return adminService.deleteUser(user);
    });
    if (status === System.STATUS.SUCCESS) {
      yield put({
        type: GET_ALL_AUTHORITIES_ACTION
      });
      notify("success", NotifyType.DELETE_SUCCESS_MESSAGE);
    } else {
      console.log(status);
      notify("error", NotifyType.DELETE_ERROR_MESSAGE);
    }
  } catch (error) {
    console.log(error);
    notify(
      "error",NotifyType.DELETE_ERROR_MESSAGE
    ); 
  }
  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

function* findAllStatisticalAPI(action) {
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(500);

  try {
    let { data, status } = yield call(adminService.findAllStatistical);
    if (status === System.STATUS.SUCCESS) {
      yield put({
        type: Type.FIND_ALL_STATISTICAL,
        data,
      });
    } else {
      console.log(status);
    }
  } catch (err) {
    console.log(err);
  }

  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

function* getChartProductByMonthAPI(action) {
  const { month, note } = action;
  try {
    let { data, status } = yield call(() => {
      return _.isEqual(note, "ALL")
        ? adminService.getChartByMonth(month)
        : adminService.getChartPartnerByMonth(month);
    });
    if (status === System.STATUS.SUCCESS) {
      if (_.isEqual(note, "ALL")) {
        yield put({
          type: Type.SET_CHART_PRODUCT_BY_MONTH,
          bdsp: data,
        });
      } else {
        yield put({
          type: Type.SET_CHART_PRODUCT_PARTNER_BY_MONTH,
          dtbdsp: data,
        });
      }
    } else {
      console.log(status);
    }
  } catch (err) {
    console.log(err);
  }
}

function* viewFastUserAPI(action) {
  const { username } = action;
  try {
    let { data, status } = yield call(() => {
      return adminService.viewFastUser(username);
    });
    if (status === System.STATUS.SUCCESS) {
      yield put({
        type: Type.VIEW_FAST_USER,
        data,
      });
    } else {
      console.log(status);
    }
  } catch (err) {
    console.log(err);
  }
}

function* addUserRestrictedAPI(action) {
  const { user } = action;
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(500);

  try {
    let { status } = yield call(() => {
      return adminService.addUserRestricted(user);
    });
    if (status === System.STATUS.SUCCESS) {
      yield put({
        type: GET_ALL_AUTHORITIES_ACTION,
      });
      yield put({
        type: DRAWER.CLOSE_DRAWER,
      });
      notify("success", NotifyType.ADD_SUCCESS_MESSAGE);
    } else {
      console.log(status);
      notify("error", NotifyType.ADD_ERROR_MESSAGE);
    }
  } catch (error) {
    console.log(error);
    notify("error", NotifyType.ADD_ERROR_MESSAGE);
  }

  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

function* addUserRestrictedAllAPI(action) {
  const { user } = action;
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(500);

  try {
    let { status } = yield call(() => {
      return adminService.addUserRestrictedAll(user);
    });
    if (status === System.STATUS.SUCCESS) {
      yield put({
        type: GET_ALL_AUTHORITIES_ACTION,
      });
      yield put({
        type: DRAWER.CLOSE_DRAWER,
      });
      notify("success", NotifyType.ADD_SUCCESS_MESSAGE);
    } else {
      console.log(status);
      notify("error", NotifyType.ADD_ERROR_MESSAGE);
    }
  } catch (error) {
    console.log(error);
    notify("error", NotifyType.ADD_ERROR_MESSAGE);
  }

  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

function* updateUserRestrictedAPI(action) {
  const { user } = action;
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(500);

  try {
    let { status } = yield call(() => {
      return adminService.updateUserRestricted(user);
    });
    if (status === System.STATUS.SUCCESS) {
      yield put({
        type: GET_ALL_AUTHORITIES_ACTION,
      });
      notify("success", NotifyType.UPDATE_SUCCESS_MESSAGE);
    } else {
      console.log(status);
      notify("error", NotifyType.UPDATE_ERROR_MESSAGE);
    }
  } catch (error) {
    console.log(error);
    notify(NotifyType.UPDATE_ERROR_MESSAGE);
  }
  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

function* deleteUserRestrictedAPI(action) {
  const { user } = action;
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(500);

  try {
    let { status } = yield call(() => {
      return adminService.deleteUserRestricted(user);
    });
    if (status === System.STATUS.SUCCESS) {
      yield put({
        type: GET_ALL_AUTHORITIES_ACTION,
      });
      notify("success", NotifyType.DELETE_SUCCESS_MESSAGE);
    } else {
      console.log(status);
      notify("error", NotifyType.DELETE_ERROR_MESSAGE);
    }
  } catch (error) {
    console.log(error);
    notify('error',NotifyType.DELETE_ERROR_MESSAGE);
  }
  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

function * findAllProductBestViewAPI(action){
  const { month } = action;
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(500);

  try {
    let { status,data } = yield call(() => {
      return adminService.findAllProductsBestView(month);
    });
    if (status === System.STATUS.SUCCESS) {
      yield put({
        type: Type.FIND_ALL_PRODUCT_BEST_VIEWS_ADMIN,
        data
      });
    } else {
      console.log(status);
    }
  } catch (error) {
    console.log(error);
  }
  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

function * addEventAPI(action){
  const { event } = action;
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(500);

  try {
    let { status } = yield call(() => {
      return adminService.addEvent(event);
    });
    if (status === System.STATUS.SUCCESS) {
      yield put({
        type: Action.FIND_ALL_ACTION
      });

      yield put({
        type: DRAWER.CLOSE_DRAWER
      })
      notify('success',MESSAGE.ADD_SUCCESS_MESSAGE)
    } else {
      console.log(status);
      notify('error',MESSAGE.ADD_ERROR_MESSAGE)
    }
  } catch (error) {
    notify('error',MESSAGE.ADD_ERROR_MESSAGE)
    console.log(error);
  }
  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

function * updateEventAPI(action){
  const { event } = action;
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(500);

  try {
    let { status } = yield call(() => {
      return adminService.updateEvent(event);
    });
    if (status === System.STATUS.SUCCESS) {
      yield put({
        type: Action.FIND_ALL_ACTION
      });

      yield put({
        type: DRAWER.CLOSE_DRAWER
      })
      notify('success',MESSAGE.UPDATE_SUCCESS_MESSAGE)
    } else {
      console.log(status);
      notify('error',MESSAGE.UPDATE_ERROR_MESSAGE)
    }
  } catch (error) {
    notify('error',MESSAGE.UPDATE_ERROR_MESSAGE)
    console.log(error);
  }
  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

function * deleteEventAPI(action){
  const { event } = action;
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(500);

  try {
    let { status } = yield call(() => {
      return adminService.deleteEvent(event);
    });
    if (status === System.STATUS.SUCCESS) {
      yield put({
        type: Action.FIND_ALL_ACTION
      });

      yield put({
        type: DRAWER.CLOSE_DRAWER
      })
      notify('success',MESSAGE.DELETE_SUCCESS_MESSAGE)
    } else {
      console.log(status);
      notify('error',MESSAGE.DELETE_ERROR_MESSAGE)
    }
  } catch (error) {
    notify('error',MESSAGE.DELETE_ERROR_MESSAGE)
    console.log(error);
  }
  yield put({
    type: LOADING.HIDE_LOADING,
  });
}


function * addRewardAPI(action){
  const { reward } = action;
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(500);

  try {
    let { status } = yield call(() => {
      return adminService.addReward(reward);
    });
    if (status === System.STATUS.SUCCESS) {
      yield put({
        type: Action.FIND_ALL_ACTION
      });
      yield put({
        type: DRAWER.CLOSE_DRAWER
      })
      notify('success',MESSAGE.ADD_SUCCESS_MESSAGE)
    } else {
      console.log(status);
      notify('error',MESSAGE.ADD_ERROR_MESSAGE)
    }
  } catch (error) {
    notify('error',MESSAGE.ADD_ERROR_MESSAGE)
    console.log(error);
  }
  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

function * updateRewardAPI(action){
  const { reward } = action;
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(500);

  try {
    let { status } = yield call(() => {
      return adminService.updateReward(reward);
    });
    if (status === System.STATUS.SUCCESS) {
      yield put({
        type: Action.FIND_ALL_ACTION
      });

      yield put({
        type: DRAWER.CLOSE_DRAWER
      })
      notify('success',MESSAGE.UPDATE_SUCCESS_MESSAGE)
    } else {
      console.log(status);
      notify('error',MESSAGE.UPDATE_ERROR_MESSAGE)
    }
  } catch (error) {
    notify('error',MESSAGE.UPDATE_ERROR_MESSAGE)
    console.log(error);
  }
  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

function * deleteRewardAPI(action){
  const { reward } = action;
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(500);

  try {
    let { status } = yield call(() => {
      return adminService.deleteReward(reward);
    });
    if (status === System.STATUS.SUCCESS) {
      yield put({
        type: Action.FIND_ALL_ACTION
      });

      yield put({
        type: DRAWER.CLOSE_DRAWER
      })
      notify('success',MESSAGE.DELETE_SUCCESS_MESSAGE)
    } else {
      console.log(status);
      notify('error',MESSAGE.DELETE_ERROR_MESSAGE)
    }
  } catch (error) {
    notify('error',MESSAGE.DELETE_ERROR_MESSAGE)
    console.log(error);
  }
  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

function * addRewardDetailAPI(action){
  const { detail } = action;
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(500);

  try {
    let { status } = yield call(() => {
      return adminService.addRewardDetail(detail);
    });
    if (status === System.STATUS.SUCCESS) {
      yield put({
        type: Action.FIND_ALL_ACTION
      });
      yield put({
        type: DRAWER.CLOSE_DRAWER
      })
      notify('success',MESSAGE.ADD_SUCCESS_MESSAGE)
    } else {
      console.log(status);
      notify('error',MESSAGE.ADD_ERROR_MESSAGE)
    }
  } catch (error) {
    notify('error',MESSAGE.ADD_ERROR_MESSAGE)
    console.log(error);
  }
  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

function * updateRewardDetailAPI(action){
  const { detail } = action;
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(500);

  try {
    let { status } = yield call(() => {
      return adminService.updateRewardDetail(detail);
    });
    if (status === System.STATUS.SUCCESS) {
      yield put({
        type: Action.FIND_ALL_ACTION
      });

      yield put({
        type: DRAWER.CLOSE_DRAWER
      })
      notify('success',MESSAGE.UPDATE_SUCCESS_MESSAGE)
    } else {
      console.log(status);
      notify('error',MESSAGE.UPDATE_ERROR_MESSAGE)
    }
  } catch (error) {
    notify('error',MESSAGE.UPDATE_ERROR_MESSAGE)
    console.log(error);
  }
  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

function * deleteRewardDetailAPI(action){
  const { detail } = action;
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(500);

  try {
    let { status } = yield call(() => {
      return adminService.deleteRewardDetail(detail);
    });
    if (status === System.STATUS.SUCCESS) {
      yield put({
        type: Action.FIND_ALL_ACTION
      });

      yield put({
        type: DRAWER.CLOSE_DRAWER
      })
      notify('success',MESSAGE.DELETE_SUCCESS_MESSAGE)
    } else {
      console.log(status);
      notify('error',MESSAGE.DELETE_ERROR_MESSAGE)
    }
  } catch (error) {
    notify('error',MESSAGE.DELETE_ERROR_MESSAGE)
    console.log(error);
  }
  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

function * updatePartnerAPI(action){
  const { partner } = action;
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(500);

  try {
    let { status } = yield call(() => {
      return adminService.updatePartner(partner);
    });
    if (status === System.STATUS.SUCCESS) {
      yield put({
        type: Action.FIND_ALL_ACTION
      });

      yield put({
        type: DRAWER.CLOSE_DRAWER
      })
      notify('success',MESSAGE.UPDATE_SUCCESS_MESSAGE)
    } else {
      console.log(status);
      notify('error',MESSAGE.UPDATE_ERROR_MESSAGE)
    }
  } catch (error) {
    notify('error',MESSAGE.UPDATE_ERROR_MESSAGE)
    console.log(error);
  }
  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

function * findAllRewardByEventIDAPI(action){
  const { event } = action;
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(500);

  try {
    let { status,data } = yield call(() => {
      return adminService.findAllRewardByEventID(event);
    });
    if (status === System.STATUS.SUCCESS) {
      yield put({
        type: Type.FIND_ALL_REWARD_BY_EVENT_ID,
        data
      });
    } else {
      console.log(status);
    }
  } catch (error) {
    console.log(error);
  }
  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

function * updateStatusTrueProductListAPI(action){
  const { listProduct } = action;
  yield put({
    type: LOADING.DISPLAY_LOADING,
  });
  yield delay(500);
  _.map(listProduct,e=>{
    e.trangthai = true
  })
  try {
    let { status } = yield call(() => {
      return adminService.updateStatusTrueProductListAPI(listProduct);
    });
    if (status === System.STATUS.SUCCESS) {
      yield put({
        type: Action.FIND_ALL_ACTION
      });
      notify('success',MESSAGE.UPDATE_SUCCESS_MESSAGE)
    } else {
      console.log(status);
      notify('error',MESSAGE.UPDATE_ERROR_MESSAGE)
    }
  } catch (error) {
    notify('error',MESSAGE.UPDATE_ERROR_MESSAGE)
    console.log(error);
  }
  yield put({
    type: LOADING.HIDE_LOADING,
  });
}

export function* ActionFindAllAPI() {
  yield takeLatest(Action.FIND_ALL_ACTION, findAllAPI);
}

export function* ActionGetChartProductByMonthAPI() {
  yield takeLatest(
    Action.CHART_PRODUCT_BY_MONTH_ACTION,
    getChartProductByMonthAPI
  );
}

export function* ActionFindProductAPI() {
  yield takeLatest(
    Action.GET_ALL_PRODUCT_SELLER_BY_PROVIDERNAME_ACTION,
    findProductAPI
  );
}

export function* ActionFindReviewAPI() {
  yield takeLatest(
    Action.GET_ALL_REVIEW_OF_PRODUCT_BY_PROVIDERNAME_ACTION,
    findReviewAPI
  );
}
export function* ActionSaveProviderAPI() {
  yield takeLatest(Action.ADD_PROVIDER_ACTION, addProviderAPI);
}

export function* ActionUpdateProviderAPI() {
  yield takeLatest(Action.UPDATE_PROVIDER_ACTION, updateProviderAPI);
}

export function* ActionDeleteProviderAPI() {
  yield takeLatest(Action.DELETE_PROVIDER_ACTION, deleteProviderAPI);
}

export function* ActionAddMeasureAPI() {
  yield takeLatest(Action.ADD_MEASURE_ACTION, addMeasurerAPI);
}

export function* ActionUpdateMeasureAPI() {
  yield takeLatest(Action.UPDATE_MEASURE_ACTION, updateMeasureAPI);
}

export function* ActionDeleteMeasureAPI() {
  yield takeLatest(Action.DELETE_MEASURE_ACTION, deleteMeasureAPI);
}

export function* ActionAddCategoryAPI() {
  yield takeLatest(Action.ADD_CATEGORY_ACTION, addCategoryAPI);
}

export function* ActionUpdateCategoryAPI() {
  yield takeLatest(Action.UPDATE_CATEGORY_ACTION, updateCategoryAPI);
}

export function* ActionDeleteCategoryAPI() {
  yield takeLatest(Action.DELETE_CATEGORY_ACTION, deleteCategoryAPI);
}

export function* ActionAddSubCategoryAPI() {
  yield takeLatest(Action.ADD_SUB_CATEGORY_ACTION, addSubCategoryAPI);
}

export function* ActionUpdateSubCategoryAPI() {
  yield takeLatest(Action.UPDATE_SUB_CATEGORY_ACTION, updateSubCategoryAPI);
}

export function* ActionDeleteSubCategoryAPI() {
  yield takeLatest(Action.DELETE_SUB_CATEGORY_ACTION, deleteSubCategoryAPI);
}

export function* ActionFindAllBrandByCategoryIDAPI() {
  yield takeLatest(Action.FIND_ALL_BRAND_BY_CATEGORY_ID_ACTION, findAllBrandByCategoryID);
}

export function* ActionAddBrandAPI() {
  yield takeLatest(Action.ADD_BRAND_ACTION, addBrandAPI);
}

export function* ActionUpdateBrandAPI() {
  yield takeLatest(Action.UPDATE_BRAND_ACTION, updateBrandAPI);
}

export function* ActionDeleteBrandAPI() {
  yield takeLatest(Action.DELETE_BRAND_ACTION, deleteBrandAPI);
}

export function* ActionAddProductAPI() {
  yield takeLatest(Action.ADD_PRODUCT_ACTION, addProductAPI);
}

export function* ActionUpdateProductAPI() {
  yield takeLatest(Action.UPDATE_PRODUCT_ACTION, updateProductAPI);
}

export function* ActionDeleteProductAPI() {
  yield takeLatest(Action.DELETE_PRODUCT_ACTION, deleteProductAPI);
}

export function* ActionAddProductForbiddenAPI() {
  yield takeLatest(Action.ADD_PRODUCT_FORBIDDEN_ACTION, addProductForbiddenAPI);
}

export function* ActionDeleteProductForbiddenAPI() {
  yield takeLatest(
    Action.DELETE_PRODUCT_FORBIDDEN_ACTION,
    deleteProductForbiddenAPI
  );
}

export function* ActionDeleteProductViolatonAPI() {
  yield takeLatest(
    Action.DELETE_PRODUCT_VIOLATION_ACTION,
    deleteProductViolationAPI()
  );
}

export function* ActionAddUserAPI() {
  yield takeLatest(Action.ADD_USER_ACTION, addUserAPI);
}

export function* ActionUpdateUserAPI() {
  yield takeLatest(Action.UPDATE_USER_ACTION, updateUserAPI);
}

export function* ActionDeleteUserAPI() {
  yield takeLatest(Action.DELETE_USER_ACTION, deleteUserAPI);
}

export function* ActionFindAllStatisticalAPI() {
  yield takeLatest(Action.FIND_ALL_STATISTICAL_ACTION, findAllStatisticalAPI);
}

export function* ActionViewFastUserAPI() {
  yield takeLatest(Action.VIEW_FAST_USER_ACTION, viewFastUserAPI);
}

export function* ActionUpdateProductViolationAPI() {
  yield takeLatest(
    Action.UPDATE_PRODUCT_VIOLATION_ACTION,
    updateProductViolationAPI
  );
}

export function* ActionAddUserRestrictedAPI() {
  yield takeLatest(Action.ADD_USER_RESTRICTED_ACTION, addUserRestrictedAPI);
}

export function * ActionAddUserRestrictedAllAPI(){
  yield takeLatest(Action.ADD_USER_RESTRICTED_ALL_ACTION, addUserRestrictedAllAPI);
}

export function* ActionUpdateUserRestrictedAPI() {
  yield takeLatest(Action.UPDATE_USER_RESTRICTED_ACTION, updateUserRestrictedAPI);
}

export function* ActionDeleteUserRestrictedAPI() {
  yield takeLatest(Action.DELETE_USER_RESTRICTED_ACTION, deleteUserRestrictedAPI);
}

export function * ActionUpdateStatusShopAPI(){
  yield takeLatest(Action.UPDATE_STATUS_SHOP_ACTION, updateStatusShopAPI);
}

export function * ActionFindAllProductBestViewAPI(){
  yield takeLatest(Action.FIND_ALL_PRODUCT_BEST_VIEWS_ADMIN_ACTION, findAllProductBestViewAPI)
} 

export function * ActionAddEventAPI(){
  yield takeLatest(Action.ADD_EVENT_ACTION, addEventAPI)
}

export function * ActionUpdateEventAPI(){
  yield takeLatest(Action.UPDATE_EVENT_ACTION, updateEventAPI)
}

export function * ActionDeleteEventAPI(){
  yield takeLatest(Action.DELETE_EVENT_ACTION, deleteEventAPI)
}

export function * ActionAddRewardAPI(){
  yield takeLatest(Action.ADD_REWARD_ACTION, addRewardAPI)
}

export function * ActionUpdateRewardAPI(){
  yield takeLatest(Action.UPDATE_REWARD_ACTION, updateRewardAPI)
}

export function * ActionDeleteRewardAPI(){
  yield takeLatest(Action.DELETE_REWARD_ACTION, deleteRewardAPI)
}

export function * ActionAddRewardDetailAPI(){
  yield takeLatest(Action.ADD_REWARD_DETAIL_ACTION, addRewardDetailAPI)
}

export function * ActionUpdateRewardDetailAPI(){
  yield takeLatest(Action.UPDATE_REWARD_DETAIL_ACTION, updateRewardDetailAPI)
}

export function * ActionDeleteRewardDetailAPI(){
  yield takeLatest(Action.DELETE_REWARD_DETAIL_ACTION, deleteRewardDetailAPI)
}

export function * ActionFindAllRewardByEventIDAPI(){
  yield takeLatest(Action.FIND_ALL_REWARD_BY_EVENT_ID_ACTION, findAllRewardByEventIDAPI)
}

export function * ActionUpdatePartnerAPI(){
  yield takeLatest(Action.UPDATE_PARTNER_ACTION, updatePartnerAPI)
}

export function * ActionUpdateStatusTrueProductListAPI(){
  yield takeLatest(Action.UPDATE_STATUS_TRUE_LIST_PRODUCT_ACTION, updateStatusTrueProductListAPI);
}
