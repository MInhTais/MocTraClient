import {all} from 'redux-saga/effects';
import * as CategorySaga from './Category/CategorySaga';
import * as AuthoritySaga from './Authority/AuthoritySaga';
import * as ProductSaga from './Product/ProductSaga';
import * as AuthSaga from './Auth/AuthSaga';
import * as ReviewSaga from './Review/ReviewSaga';
import * as CheckoutSaga from './Checkout/CheckoutSaga';
import * as SignupSaga from './Signup/SignupSaga';
import * as AdminSaga from './Admin/AdminSaga';
import * as PictureSaga from './Picture/PictureSaga';
import * as CarouselSaga from './Carousel/CarouselSaga';
import * as OrderSaga from './Order/OrderSaga';
import * as SellerSaga from './Admin/SellerSaga';
import * as VoucherSaga from './Admin/VoucherSaga';

export function * rootSaga(){
    yield all([
        CarouselSaga.ActionGetAllCarousel(),
        CarouselSaga.ActionSaveCarousel(),
        CarouselSaga.ActionUpdateCarousel(),
        CarouselSaga.ActionDeleteCarousel(),
        
        CategorySaga.ActionFindAllCategoryAPI(),

        AuthoritySaga.ActionFindAllAuthorities(),
        AuthoritySaga.ActionSaveAuthority(),
        AuthoritySaga.ActionDeleteAuthority(),
        AuthoritySaga.ActionSaveRoleAPI(),
        AuthoritySaga.ActionUpdateRoleAPI(),
        AuthoritySaga.ActionDeleteRoleAPI(),

        ProductSaga.ActionFindAllSanphamByMaspAPI(),
        ProductSaga.ActionFindAllSanphamByTenspAPI(),
        ProductSaga.ActionFindAllSanphamBySearchAPI(),
        ProductSaga.ActionUpdateViewAPI(),
        ProductSaga.ActionFindAllSanphamByMaloaiAPI(),
        ProductSaga.ActionAddProductViolationAPI(),
        ProductSaga.ActionFindAllByBrandIDAPI(),
        ProductSaga.ActionFindAllByMainCategoryIDAPI(),
        ProductSaga.ActionFindAllByReviewsAPI(),
        ProductSaga.ActionFindAllByPricesAPI(),

       AuthSaga.ActionLogin(),
       AuthSaga.ActionLoginOAuth2(),
       AuthSaga.ActionChangePwdAPI(),
       AuthSaga.ActionEditProfileAPI(),
       AuthSaga.ActionOrderWishlishVoucherAPI(),
       AuthSaga.ActionDeleteWishlistAPI(),
       AuthSaga.ActionAddWishlistAPI(),
       AuthSaga.ActionDeleteOrderingAPI(),
       AuthSaga.ActionAddVoucherAPI(),
       AuthSaga.ActionFindUserAPI(),
       AuthSaga.ActionFindVerifyCodeAPI(),
       AuthSaga.ActionNewPWDAPI(),
       AuthSaga.ActionUpdateTokenAction(),
       AuthSaga.ActionFindRestrictedUserAPI(),
       AuthSaga.ActionFindAllEventsAPI(),
       AuthSaga.ActionWheelLuckySpinAPI(),
       AuthSaga.ActionFindAllRewardJoinedAPI(),
       AuthSaga.ActionFindAllNotifyByUsernameAPI(),
       AuthSaga.ActionUpdateStatusViewedAPI(),
       AuthSaga.ActionUpdateStatusReadAPI(),
       AuthSaga.ActionGiveToVoucherAPI(),

       ReviewSaga.ActionFindAllSanphamByMaspAPI(),
       ReviewSaga.ActionSaveCommentAPI(),
       ReviewSaga.ActionSaveReplyAPI(),
       ReviewSaga.ActionUpdateCommentAPI(),
       ReviewSaga.ActionDeleteCommentAPI(),

       CheckoutSaga.ActionFindAllAddressAPI(),
       CheckoutSaga.ActionFindAllDistrictAPI(),
       CheckoutSaga.ActionFindAllAwardAPI(),
       CheckoutSaga.ActionSaveAPI(),
       CheckoutSaga.ActionUpdateVoucherAPI(),
       CheckoutSaga.ActionFindFeesByServiceGoShipAPI(),

       SignupSaga.ActionSignupAPI(),
       //Map data admin
       AdminSaga.ActionFindAllAPI(),
       //Nhà cung cấp
       AdminSaga.ActionSaveProviderAPI(),
       AdminSaga.ActionUpdateProviderAPI(),
       AdminSaga.ActionDeleteProviderAPI(),
       //Đối tác
       AdminSaga.ActionUpdatePartnerAPI(),
       //Shop
       AdminSaga.ActionUpdateStatusShopAPI(),
       //Đơn vị tính
       AdminSaga.ActionAddMeasureAPI(),
       AdminSaga.ActionUpdateMeasureAPI(),
       AdminSaga.ActionDeleteMeasureAPI(),
       //Nhóm loại
       AdminSaga.ActionAddCategoryAPI(),
       AdminSaga.ActionUpdateCategoryAPI(),
       AdminSaga.ActionDeleteCategoryAPI(),
       //Loại sản phẩm
       AdminSaga.ActionAddSubCategoryAPI(),
       AdminSaga.ActionUpdateSubCategoryAPI(),
       AdminSaga.ActionDeleteSubCategoryAPI(),
       //Thương hiệu
       AdminSaga.ActionAddBrandAPI(),
       AdminSaga.ActionUpdateBrandAPI(),
       AdminSaga.ActionDeleteBrandAPI(),
       AdminSaga.ActionFindAllBrandByCategoryIDAPI(),
       //Thống kê
       AdminSaga.ActionFindAllStatisticalAPI(),
       AdminSaga.ActionGetChartProductByMonthAPI(),
       //Sản phẩm
       AdminSaga.ActionAddProductAPI(),
       AdminSaga.ActionUpdateProductAPI(),
       AdminSaga.ActionDeleteProductAPI() ,
       AdminSaga.ActionAddProductForbiddenAPI(),
       AdminSaga.ActionDeleteProductForbiddenAPI(),
       AdminSaga.ActionDeleteProductViolatonAPI(),
       AdminSaga.ActionViewFastUserAPI(),
       AdminSaga.ActionUpdateProductViolationAPI(),
       AdminSaga.ActionUpdateStatusTrueProductListAPI(),
       //Người dùng
       AdminSaga.ActionAddUserAPI(),
       AdminSaga.ActionUpdateUserAPI(),
       AdminSaga.ActionDeleteUserAPI(),
       AdminSaga.ActionFindProductAPI(),
       AdminSaga.ActionFindReviewAPI(),
       AdminSaga.ActionAddUserRestrictedAPI(),
       AdminSaga.ActionUpdateUserRestrictedAPI(),
       AdminSaga.ActionDeleteUserRestrictedAPI(),
       AdminSaga.ActionAddUserRestrictedAllAPI(),
       AdminSaga.ActionFindAllProductBestViewAPI(),
       //Sự kiện
       AdminSaga.ActionAddEventAPI(),
       AdminSaga.ActionUpdateEventAPI(),
       AdminSaga.ActionDeleteEventAPI(),
       AdminSaga.ActionFindAllRewardByEventIDAPI(),
       //Phần thưởng
       AdminSaga.ActionAddRewardAPI(),
       AdminSaga.ActionUpdateRewardAPI(),
       AdminSaga.ActionDeleteRewardAPI(),
       //Chi tiết phần thưởng
       AdminSaga.ActionAddRewardDetailAPI(),
       AdminSaga.ActionUpdateRewardDetailAPI(),
       AdminSaga.ActionDeleteRewardDetailAPI(),
       //Seller
       SellerSaga.ActionFindAllProductAPI(),
       SellerSaga.ActionAddProductAPI(),
       SellerSaga.ActionUpdateProductAPI(),
       SellerSaga.ActionDeleteProductAPI(),
       SellerSaga.ActionSignUpShopAPI(),
       SellerSaga.ActionFindAllStatisticalSellerAPI(),
       SellerSaga.ActionAddListProductAPI(),
       SellerSaga.ActionFindAllProductBestViewAPI(),
       SellerSaga.ActionGetReferencesProductAPI(),
       SellerSaga.ActionGetMyStoreAPI(),
       SellerSaga.ActionUpdateMyStoreAPI(),
        //Hình ảnh
       PictureSaga.ActionUploadAPI(),
       PictureSaga.ActionUploadProductAPI(),
       PictureSaga.ActionUploadCarouselAPI(),
       PictureSaga.ActionUploadCategoryAPI(),
       PictureSaga.ActionUploadListReturnGoodAPI(),
        //Đơn hàng
       OrderSaga.ActionFindAllOrderFalseAPI(),
       OrderSaga.ActionUpdateOrderAPI(),
       OrderSaga.ActionFindAllOrderByProviderIDAndFalseAPI(),
       OrderSaga.ActionAcceptOrderSellerAPI(),
       OrderSaga.ActionDeleteOrderSellerAPI(),
       OrderSaga.ActionDeleteOrderAdminAPI(),
       OrderSaga.ActionUpdateOrderMyStoreAPI(),
       OrderSaga.ActionReceivedOrderAPI(),
       OrderSaga.ActionFindAllOrderedByMonthAPI(),
       OrderSaga.ActionUpdateOrderDatetimeAPI(),
       OrderSaga.ActionAddReturnGoodAPI(),
       OrderSaga.ActionUpdateReturnGoodAPI(),
       OrderSaga.ActionDeleteReturnGoodAPI(),
       OrderSaga.ActionAcceptListOrderDetailAPI(),

       VoucherSaga.ActionAddVoucherAPI(),
       VoucherSaga.ActionUpdateVoucherAPI(),
       VoucherSaga.ActionDeleteVoucherAPI(),
       VoucherSaga.ActionAddFastVoucherAPI()
    ])
}