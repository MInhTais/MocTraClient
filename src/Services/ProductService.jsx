import {commonService} from './commonService';
import {ADD_PRODUCT_VIOLATION_API, FIND_ALL_BY_BRAND_URL,FIND_ALL_BY_REVIEWS_URL, FIND_ALL_BY_CATEGORY_URL, GET_ALL_PRODUCT_BY_KEYWORD_URL, GET_ALL_SP_URL, UPDATE_VIEW_PRODUCT_URL, FIND_ALL_BY_PRICES_URL} from '../Common/API/ProductAPI';
import instance from './TokenService';

class ProductService extends commonService{

    constructor(){
        super();
    }

    findAllByMasp=(masp)=>{
        return instance.get(`${GET_ALL_SP_URL}?masp=${masp}`);
    }

    findAllByCategory = (tenloai)=>{
        return instance.get(`${GET_ALL_SP_URL}?tenloai=${tenloai}`);
    }

    findAllByCategoryId = (maloai)=>{
        return instance.get(`${GET_ALL_SP_URL}?maloai=${maloai}`);
    }

    findAllByTensp = (tensp) =>{
        return instance.get(`${GET_ALL_PRODUCT_BY_KEYWORD_URL}/${tensp}`)
    }

    findAllByMath = (math)=>{
        return instance.get(`${FIND_ALL_BY_BRAND_URL}=${math}`);
    }

    updateView = (sp) =>{
        return instance.put(UPDATE_VIEW_PRODUCT_URL, sp);
    }

    addProductViolation=(sp)=>{
        return instance.post(ADD_PRODUCT_VIOLATION_API,sp);
    }

    findAllByMainCategoryID = (manhom) =>{
        return instance.get(`${FIND_ALL_BY_CATEGORY_URL}=${manhom}`)
    }

    findAllByReviews = (danhgia) =>{
        return instance.get(`${FIND_ALL_BY_REVIEWS_URL}=${danhgia}`)
    }

    findAllByPrices = (min,range,max,ten)=>{
        return instance.get(`${FIND_ALL_BY_PRICES_URL}?min=${min}&range=${range}&max=${max}&ten=${ten}`)
    }
}
export const productService = new ProductService();