import { ADMIN_URL } from "../../../Common/Const/Admin/AdminConst"
import { SELLER_URL } from "../../../Common/Const/Admin/SellerConst"

const initialState = {
    adminURL: JSON.parse(localStorage.getItem('path')) ? JSON.parse(localStorage.getItem('path'))?.name : 'Nhà cung cấp',
    sellerURL: JSON.parse(localStorage.getItem('pathSeller')) ? JSON.parse(localStorage.getItem('pathSeller'))?.name : 'Sản phẩm'

}

export default (state = initialState, action) => {
    switch (action.type) {

    case ADMIN_URL:{
        state.adminURL = action.adminURL;
        return {...state};
    }
    case SELLER_URL:{
        state.sellerURL = action.sellerURL;
        return {...state};
    }
    default:
        return state
    }
}
