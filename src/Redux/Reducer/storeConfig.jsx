import { applyMiddleware, combineReducers, createStore } from 'redux';
import createMiddleWareSaga from 'redux-saga';
import {rootSaga} from '../Saga/rootSaga';
import { CategoryReducer } from './Category/CategoryReducer';
import { LoadingReducer } from './Loading/LoadingReducer';
import {AuthorityReducer} from './Admin/AuthorityReducer';
import { CartReducer } from './Cart/CartReducer';
import { ProductReducer } from './Product/ProductReducer';
import {AuthReducer} from './Auth/AuthReducer';
import { ReviewReducer } from './Review/ReviewReducer';
import { CheckoutReducer } from './Checkout/CheckoutReducer';
import { StatusReducer } from './Checkout/StatusReducer';
import { isAuthReducer } from './Auth/isAuthReducer';
import { AdminReducer } from './Admin/AdminReducer';
import { DrawerModalReducer } from './Modal/DrawerModalReducer';
import {EditReducer} from './Admin/EditReducer';
import { StatisticalReducer } from './Admin/StatisticalReducer';
import { ModalReducer } from './Modal/ModalReducer';
import { CarouselReducer } from './Carousel/CarouselReducer';
import {OrderReducer} from './Order/OrderReducer';
import { AddressReducer } from './Checkout/AddressReducer';
import BreadcrumbReducer from './Admin/BreadcrumbReducer';
import { SellerReducer } from './Seller/SellerReducer';
import {StatisticalSellerReducer} from './Seller/StatisticalSellerReducer';

const saga = createMiddleWareSaga();
const storeConfig = combineReducers({
    LoadingReducer,
    CategoryReducer,
    AuthorityReducer,
    CartReducer,
    ProductReducer,
    AuthReducer,
    ReviewReducer,
    CheckoutReducer,
    StatusReducer,
    isAuthReducer,
    AdminReducer,
    DrawerModalReducer,
    EditReducer,
    StatisticalReducer,
    ModalReducer,
    CarouselReducer,
    OrderReducer,
    AddressReducer,
    BreadcrumbReducer,
    SellerReducer,
    StatisticalSellerReducer
})

const store = createStore(storeConfig,
    applyMiddleware(saga)
);
saga.run(rootSaga);

export default store;