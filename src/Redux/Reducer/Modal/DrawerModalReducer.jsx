import * as Type from '../../../Common/Const/Admin/Drawer';
import { notify } from '../../../libs/Notify/Notify';
import * as MESSAGE from '../../../Common/Const/Notify/NotifyConst';
import _ from 'lodash';
import { TITLE_ADMIN_PRODUCT } from '../../../Common/Const/Admin/AdminConst';
const initialState = {
    visible: false,
    ComponentContentDrawer: <p>LOADING...</p>,
    callBackSubmit: (propsValue) =>{},
    title:'',
    edit: false,
    placement: 'right',
    width: null,
    renderFooter: null,
    nameButton: null,
    disabled: null,
}
export const DrawerModalReducer =(state = initialState, action) => {
    switch (action.type) {

    case Type.OPEN_DRAWER:
        return { ...state, visible: true }
    case Type.CLOSE_DRAWER:
        return {...state, visible: false,disabled:false}
    case Type.OPEN_FORM:{
        state.visible = true;
        state.edit = true;
        state.ComponentContentDrawer= action.Component;
        state.title = action.title;
        state.placement= action?.placement ? action.placement : 'right';
        state.renderFooter = action.footer ===false ? false : true;
        state.nameButton = action.nameButton;
        return {...state}
    }
    case Type.OPEN_FORM_CREATE:{
        return {...state, visible:true,edit:false,ComponentContentDrawer: action.Component, title: action.title, nameButton: action.nameButton,renderFooter:action.footer ? true  :false}
    }
    case Type.SET_SUBMIT_FORM:{
        state.callBackSubmit = action.submitFunction;
        return {...state};
    }
    case Type.DISABLED_BUTTON:{
        notify('warning', _.isEqual(action.manager,TITLE_ADMIN_PRODUCT) ? MESSAGE.ADD_PRODUCT_WARNING : MESSAGE.ADD_MEASURE_WARNING)
        return {...state, disabled:true};
    }
    case Type.ABLE_BUTTON:{
        return {...state,disabled:false};
    }
    default:
        return {...state};
    }
}
