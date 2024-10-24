import * as URL from '../Common/API/AdminAPI';
import { commonService } from './commonService';
import instance from './TokenService';
class AdminService extends commonService{

    constructor(){
        super();
    }

    findAll=()=>{
        return instance.get(URL.FIND_ALL_API)
    }

    findAllByProvidername =(tenncc) =>{
        return instance.get(`${URL.FIND_ALL_PRODUCT_SELLER_BY_PROVIDERNAME_API}=${tenncc}`)
    }

    findAllReviewByProvidername=(tenncc) =>{
        return instance.get(`${URL.GET_ALL_REVIEW_OF_PRODUCT_BY_PROVIDERNAME_API}=${tenncc}`)
    }

    addProvider=(data)=>{
        return instance.post(URL.ADD_PROVIDER_API_URL, data);
    }

    updateProvider=(data)=>{
        return instance.put(`${URL.UPDATE_PROVIDER_API_URL}=${data.mancc}`, data);
    }

    updateStatusShop=(data)=>{
        return instance.put(`${URL.UPDATE_STATUS_SHOP_API}=${data.mancc}`, data);
    }

    deleteProvider=(data)=>{
        return instance.delete(`${URL.DELETE_PROVIDER_API_URL}/${data.mancc}`);
    }

    updatePartner=(data)=>{
        return instance.put(`${URL.UPDATE_PARTNER_API_URL}=${data.mancc}`, data);
    }

    addMeasure=(data)=>{
        return instance.post(URL.ADD_MEASURE_API_URL, data);
    }

    updateMeasure=(data)=>{
        return instance.put(`${URL.UPDATE_MEASURE_API_URL}=${data.madvd}`, data);
    }

    deleteMeasure=(data)=>{
        return instance.delete(`${URL.DELETE_MEASURE_API_URL}/${data.madvd}`);
    }

    addCategory=(data)=>{
        return instance.post(URL.ADD_CATEGORY_API_URL, data);
    }

    updateCategory=(data)=>{
        return instance.put(`${URL.UPDATE_CATEGORY_API_URL}=${data.manhom}`, data);
    }

    deleteCategory=(data)=>{
        return instance.delete(`${URL.DELETE_CATEGORY_API_URL}/${data.manhom}`);
    }

    addSubCategory=(data)=>{
        return instance.post(URL.ADD_SUBCATEGORY_API_URL, data);
    }

    updateSubCategory=(data)=>{
        return instance.put(`${URL.UPDATE_SUBCATEGORY_API_URL}=${data.maloai}`, data);
    }

    deleteSubCategory=(data)=>{
        return instance.delete(`${URL.DELETE_SUBCATEGORY_API_URL}/${data.maloai}`);
    }

    addBrand=(data)=>{
        return instance.post(URL.ADD_BRAND_API_URL,data);
    }

    updateBrand=(data)=>{
        return instance.put(`${URL.UPDATE_BRAND_API_URL}=${data.math}`, data);
    }

    deleteBrand=(data)=>{
        return instance.delete(`${URL.DELETE_BRAND_API_URL}/${data.math}`);
    }

    addProduct=(data)=>{
        return instance.post(URL.ADD_PRODUCT_API_URL, data);
    }

    addProductForbidden = (data)=>{
        return instance.post(URL.ADD_PRODUCT_FORBIDDEN_API,data);
    }

    deleteProductForbidden = (data)=>{
        return instance.delete(`${URL.DELETE_PRODUCT_FORBIDDEN_API}/${data.masp}`)
    }

    updateProduct=(data)=>{
        return instance.put(`${URL.UPDATE_PRODUCT_API_URL}=${data.masp}`, data);
    }

    updateProductViolation=(mavp,bcvp)=>{
        return instance.put(`${URL.UPDATE_PRODUCT_VIOLATION_API}=${mavp}`,bcvp)
    }

    deleteProduct=(data)=>{
        return instance.delete(`${URL.DELETE_PRODUCT_API_URL}/${data.masp}`);
    }

    deleteProductViolation=(data)=>{
        return instance.delete(`${URL.DELETE_PRODUCT_VIOLATION}/${data.mavp}`);
    }

    addUser=(data)=>{
        return instance.post(URL.ADD_USER_API_URL, data);
    }

    updateUser=(data)=>{
        return instance.put(`${URL.UPDATE_USER_API_URL}=${data.tendn}`, data);
    }

    deleteUser=(data)=>{
        return instance.delete(`${URL.DELETE_USER_API_URL}/${data.tendn}`);
    }

    findAllStatistical=()=>{
        return instance.get(`${URL.FIND_ALL_STATISTICAL_API_URL}`);
    }

    getChartByMonth = (month)=>{
        return instance.get(`${URL.CHART_PRODUCT_BY_MONTH_URL}/${month}`);
    }

    getChartPartnerByMonth = (month)=>{
        return instance.get(`${URL.CHART_PRODUCT_BY_MONTH_URL}?month=${month}`);
    }

    viewFastUser = (username)=>{
        return instance.get(`${URL.VIEW_FAST_ADMIN_API}/${username}`);
    }

    addUserRestricted = (user) =>{
        return instance.post(URL.ADD_USER_RESTRICTED_API,user);
    }

    addUserRestrictedAll = (user) =>{
        return instance.post(URL.ADD_USER_RESTRICTED_ALL_API,user);
    }

    updateUserRestricted = (user) =>{
        return instance.put(URL.UPDATE_USER_RESTRICTED_API,user);
    }

    deleteUserRestricted = (user) =>{
        return instance.delete(`${URL.DELETE_USER_RESTRICTED_API}/${user.tendn}`);
    }

    findAllByCategoryID = (tenloai) =>{
        return instance.get(`${URL.FIND_ALL_BY_CATEGORY_ID_API}=${tenloai}`)
    }

    findAllProductsBestView = (month) =>{
        return instance.get(`${URL.FIND_ALL_PRODUCT_BEST_VIEWS_ADMIN_API}=${month}`)
    }
    
    addEvent=(event)=>{
        return instance.post(URL.ADD_EVENT_API,event);
    }
    
    updateEvent=(event)=>{
        return instance.put(URL.UPDATE_EVENT_API,event);
    }

    deleteEvent=(event)=>{
        return instance.delete(`${URL.ADD_EVENT_API}/${event.mask}`);
    }

    addReward=(reward)=>{
        return instance.post(URL.ADD_REWARD_API,reward);
    } 

    updateReward=(Reward)=>{
        return instance.put(URL.UPDATE_REWARD_API,Reward);
    }

    deleteReward=(Reward)=>{
        return instance.delete(`${URL.DELETE_REWARD_API}/${Reward.mapt}`);
    }

    addRewardDetail=(detail)=>{
        return instance.post(URL.ADD_REWARD_DETAIL_API,detail);
    } 

    updateRewardDetail=(detail)=>{
        return instance.put(URL.UPDATE_REWARD_DETAIL_API,detail);
    }

    deleteRewardDetail=(detail)=>{
        return instance.delete(`${URL.DELETE_REWARD_DETAIL_API}/${detail.mact}`);
    }

    findAllRewardByEventID = (event) =>{
        return instance.get(`${URL.FIND_ALL_REWARD_BY_EVENT_ID_API}/${event.mask}`);
    }

    addVoucher = (voucher) =>{
        return instance.post(URL.ADD_VOUCHER_API, voucher);
    }

    addFastVoucher=(voucher)=>{
        return instance.post(URL.ADD_FAST_VOUCHER_API,voucher);
    }

    updateVoucher = (voucher) =>{
        return instance.put(URL.UPDATE_VOUCHER_API, voucher);
    }

    deleteVoucher= (voucher) =>{
        return instance.delete(`${URL.DELETE_VOUCHER_API}/${voucher.maloaigg}`);
    }

    updateStatusTrueProductListAPI = (listProduct)=>{
        return instance.put(URL.UPDATE_STATUS_TRUE_LIST_PRODUCT_API, listProduct);
    }
}
export const adminService = new AdminService();