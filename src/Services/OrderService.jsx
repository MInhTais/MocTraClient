import instance from './TokenService';
import { commonService } from './commonService';
import { DELETE_ORDER_DETAIL_ADMIN_API,FIND_ALL_ORDERED_BY_MONTH_API, DELETE_ORDER_DETAIL_SELLER_API, FIND_ALL_BY_PROVIDERID_ORDER_FALSE_API, FIND_ALL_ORDER_FALSE_URL,FIND_ALL_ORDER_MY_STORE_API,RECEIVED_ORDER_API,UPDATE_ORDER_DETAIL_SELLER_API,UPDATE_ORDER_MY_STORE_API,UPDATE_ORDER_URL, ADD_RETURN_GOOD_API, UPDATE_ORDER_RECEIVED_DATE_TIME_API, UPDATE_RETURN_GOOD_API, DELETE_RETURN_GOOD_API, ACCEPT_LIST_ORDER_API } from '../Common/API/OrderAPI';

class OrderService extends commonService{
    constructor(){
        super();
    }

    findAllOrderFalse = () =>{
        return instance.get(FIND_ALL_ORDER_FALSE_URL);
    }

    updateOrder = (order) =>{
        return instance.put(UPDATE_ORDER_URL, order);
    }

    findAllProductByProviderID = ()=>{
        return instance.get(FIND_ALL_BY_PROVIDERID_ORDER_FALSE_API);
    }

    acceptOrderDetailSeller = (detail)=>{
        return instance.put(UPDATE_ORDER_DETAIL_SELLER_API,detail)
    }

    deleteOrderDetailSeller=(detail)=>{
        return instance.delete(`${DELETE_ORDER_DETAIL_SELLER_API}/${detail.mact}`);
    }

    deleteOrderDetailAdmin=(detail)=>{
        return instance.delete(`${DELETE_ORDER_DETAIL_ADMIN_API}/${detail.mact}`);
    }

    findAllOrderMyStoreAPI = () =>{
        return instance.get(FIND_ALL_ORDER_MY_STORE_API);
    }

    updateOrderDetailMyStoreAPI = (detail)=>{
        return instance.put(UPDATE_ORDER_MY_STORE_API,detail);
    }

    receivedOrderAPI = (detail) =>{
        return instance.put(RECEIVED_ORDER_API,detail);
    }

    findAllOrderByMonth=(month)=>{
        return instance.get(`${FIND_ALL_ORDERED_BY_MONTH_API}=${month}`);
    }

    addReturnGoodAPI = (dth)=>{
        return instance.post(ADD_RETURN_GOOD_API,dth);
    }

    updateOrderDatetime = (detail)=>{
        return instance.put(UPDATE_ORDER_RECEIVED_DATE_TIME_API,detail);
    }

    updateReturnGoods = (dth) =>{
        return instance.put(UPDATE_RETURN_GOOD_API,dth);
    }

    deleteReturnGoods = (dth)=>{
        return instance.delete(`${DELETE_RETURN_GOOD_API}/${dth.madt}`);
    }

    acceptOrderDetail = (ctdh)=>{
        return instance.put(ACCEPT_LIST_ORDER_API,ctdh);
    }
}

export const orderService = new OrderService();