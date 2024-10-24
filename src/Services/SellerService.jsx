import { ADD_LIST_PRODUCT_API } from '../Common/API/AdminAPI';
import {FIND_ALL_PRODUCT_BEST_VIEWS_SELLER_API, ADD_PRODUCT_SELLER_API, DELETE_PRODUCT_SELLER_API, FIND_ALL_STATISTICAL_SELLER_API, GET_ALL_PRODUCT_SELLER_API, SIGN_UP_SHOP_SELLER_API, UPDATE_PRODUCT_SELLER_API, GET_REFERENCES_PRODUCT_API, GET_MY_STORE_API, UPDATE_MY_STORE_API } from '../Common/API/SellerAPI';
import { commonService } from './commonService';
import instance from './TokenService';
class SellerService extends commonService{

    constructor(){
        super();
    }

    findAll=()=>{
        return instance.get(GET_ALL_PRODUCT_SELLER_API)
    }
 
    addProduct=(data)=>{
        return instance.post(ADD_PRODUCT_SELLER_API, data);
    }

    updateProduct=(data)=>{
        return instance.put(`${UPDATE_PRODUCT_SELLER_API}=${data.masp}`, data);
    }

    deleteProduct=(data)=>{
        return instance.delete(`${DELETE_PRODUCT_SELLER_API}/${data.masp}`);
    }

    signUpShop=(data)=>{
        return instance.post(SIGN_UP_SHOP_SELLER_API, data);
    }

    findAllStatisticalSeller=()=>{
        return instance.get(FIND_ALL_STATISTICAL_SELLER_API)
    }

    addListProduct=(listProduct) =>{
        return instance.post(ADD_LIST_PRODUCT_API,listProduct);
    }

    findAllProductsBestView = (month) =>{
        return instance.get(`${FIND_ALL_PRODUCT_BEST_VIEWS_SELLER_API}=${month}`)
    }

    getReferencesProduct = () =>{
        return instance.get(GET_REFERENCES_PRODUCT_API);
    }

    getMyStoreAPI=()=>{
        return instance.get(GET_MY_STORE_API);
    }

    updateMyStoreAPI = (cuahang)=>{
        return instance.put(UPDATE_MY_STORE_API,cuahang);
    }
}
export const sellerService = new SellerService();