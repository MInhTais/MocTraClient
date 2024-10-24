import * as Type from "../../../Common/Const/Modal/ModalConst";

const initialState = {
  visible: false,
  subvisible: false,
  firstPopup:false,
  Component: <p>LOADING...</p>,
  functionSubmit: (propsValue) => {},
  title: "",
  width: 700
};

export const ModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case Type.OPEN_MODAL: {
      return { ...state, visible: true };
    }
    case Type.CLOSE_MODAL: {
      state.visible = false;
      return { ...state};
    }
    case Type.OPEN_FORM_MODAL: {
      console.log("OPEN MODAL", action)
      return {
        ...state,
        visible: true,
        Component: action.Component,
        title: action.title,
        width: action.width
      };
    }
    case Type.SET_SUBMIT_FORM_MODAL: {
      state.functionSubmit = action.functionSubmit;
      console.log("FUNCTION")
      return { ...state };
    }
    case Type.OPEN_SUB_MODAL:{
      state.subvisible = true;
      return {...state};
    }
    case Type.CLOSE_SUB_MODAL:{
      state.subvisible = false;
      return {...state};
    }
    case Type.OPEN_FIRST_POPUP_MODAL:{
      state.firstPopup = true;
      return {...state};
    }
    case Type.CLOSE_FIRST_POPUP_MODAL:{
      state.firstPopup = false;
      return {...state};
    }
    default: {
      return { ...state };
    }
  }
};
