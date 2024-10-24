import * as Type from "../../../Common/Const/Admin/Edit";

const initialState = {
  roles: null,
  providerEdit: {
    mancc: "",
    tenncc: "NAME DEFAULT",
    diachi: "ADDRESS DEFAULT",
    sdt: "PHONE DEFAULT",
  },
  partnerEdit: {},
  userEdit: {
    tendn: "",
    matkhau: "",
    hoten: "LOADING...",
    gioitinh: true,
    kichhoat: true,
    tichdiem: 0,
    ngaysinh: new Date(),
    sdt: "LOADING...",
  },
  categoryEdit: {
    manhom: "",
    tennhom: "LOADING...",
    mota: "LOADING...",
  },
  subCategoryEdit: {
    maloai: "",
    tenloai: "LOADING...",
    mota: "...LOADING",
    nhom: {
      manhom: "1",
    },
  },
  brandEdit: {
    math: "",
    tenth: "LOADING...",
    loai: {
      maloai: "1",
    },
  },
  productEdit: {},
  carouselEdit: {},
  measureEdit: {},
  eventEdit: {},
  rewardEdit: {},
  voucherEdit:{},
  roleEdit:{}
};

export const EditReducer = (state = initialState, action) => {
  switch (action.type) {
    case Type.EDIT_PROVIDER: {
      state.providerEdit =
        action.providerEditModal !== "undefined"
          ? action.providerEditModal
          : state.providerEdit;
      return { ...state };
    }
    case Type.EDIT_PARTNER:{
        state.partnerEdit = action.partnerEditModal;
        return {...state};
    }
    case Type.EDIT_USER: {
      state.userEdit = action.userEditModal;
      return { ...state };
    }
    case Type.EDIT_CATEGORY: {
      state.categoryEdit = action.categoryEditModal;
      return { ...state };
    }
    case Type.EDIT_SUB_CATEGORY: {
      state.subCategoryEdit = action.subCategoryEditModal;
      return { ...state };
    }
    case Type.EDIT_BRAND: {
      state.brandEdit = action.brandEditModal;
      return { ...state };
    }
    case Type.EDIT_PRODUCT: {
      state.productEdit = action.productEditModal;
      return { ...state };
    }
    case Type.EDIT_CAROUSEL: {
      state.carouselEdit = action.carouselEditModal;
      return { ...state };
    }
    case Type.EDIT_MEASURE: {
      state.measureEdit = action.measureEditModal;
      return { ...state };
    }
    case Type.EDIT_EVENT: {
      state.eventEdit = action.eventEditModal;
      return { ...state };
    }
    case Type.EDIT_REWARD: {
      state.rewardEdit = action.rewardEditModal;
      return { ...state };
    }
    case Type.EDIT_VOUCHER:{
      state.voucherEdit = action.voucherEditModal;
      return {...state};
    }
    case Type.GET_ROLES: {
      state.roles = action.roles;
      return { ...state };
    }
    case Type.EDIT_ROLE:{
      state.roleEdit = action.roleEditModal;
      return {...state}; 
    }
    default:
      return { ...state };
  }
};
