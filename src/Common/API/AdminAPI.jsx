//Thống kê
export const FIND_ALL_API = `/bachmoc/authenticated/getall`;
export const FIND_ALL_STATISTICAL_API_URL = `/bachmoc/admin/statistical`;
export const CHART_PRODUCT_BY_MONTH_URL = '/bachmoc/admin/statistical';
export const FIND_ALL_PRODUCT_BEST_VIEWS_ADMIN_API ='/bachmoc/admin/product-popular?month';

//Nhà cung cấp
export const ADD_PROVIDER_API_URL = `/bachmoc/admin/provider`;
export const UPDATE_PROVIDER_API_URL = `/bachmoc/admin/provider?mancc`;
export const DELETE_PROVIDER_API_URL = `/bachmoc/admin/provider`;
//Đối tác
export const UPDATE_PARTNER_API_URL = `/bachmoc/admin/partner?mancc`;
//Shop
export const UPDATE_STATUS_SHOP_API  = `/bachmoc/admin/shop?mancc`;
//Nhóm loại
export const ADD_CATEGORY_API_URL = `/bachmoc/admin/category`;
export const UPDATE_CATEGORY_API_URL = `/bachmoc/admin/category?manhom`;
export const DELETE_CATEGORY_API_URL = `/bachmoc/admin/category`;
//Loại sản phẩm
export const ADD_SUBCATEGORY_API_URL = `/bachmoc/admin/subcategory`;
export const UPDATE_SUBCATEGORY_API_URL = `/bachmoc/admin/subcategory?maloai`;
export const DELETE_SUBCATEGORY_API_URL = `/bachmoc/admin/subcategory`;
//Thương hiệu
export const ADD_BRAND_API_URL = `/bachmoc/admin-seller-staff/brand`;
export const UPDATE_BRAND_API_URL = `/bachmoc/admin-seller-staff/brand?math`;
export const DELETE_BRAND_API_URL = `/bachmoc/admin/brand`;
export const FIND_ALL_BY_CATEGORY_ID_API ='/bachmoc/admin-seller-staff/brand?tenloai';
//Sản phẩm
export const ADD_PRODUCT_API_URL = `/bachmoc/admin/product`;
export const UPDATE_PRODUCT_API_URL = `/bachmoc/admin/product?masp`;
export const UPDATE_PRODUCT_VIOLATION_API = `/bachmoc/admin/productviolation?mavp`;
export const DELETE_PRODUCT_API_URL = `/bachmoc/admin/product`;
export const FIND_ALL_PRODUCT_SELLER_BY_PROVIDERNAME_API = '/bachmoc/admin/product?tenncc';
export const GET_ALL_REVIEW_OF_PRODUCT_BY_PROVIDERNAME_API = '/bachmoc/admin/review?tenncc';
export const ADD_PRODUCT_FORBIDDEN_API = '/bachmoc/admin/forbidden';
export const DELETE_PRODUCT_FORBIDDEN_API = '/bachmoc/admin/forbidden';
export const DELETE_PRODUCT_VIOLATION ='/bachmoc/admin/product/violation';
export const FIND_ALL_PRODUCT_VIOLATION_API = '/bachmoc/admin/product/violation';
export const VIEW_FAST_ADMIN_API = '/bachmoc/admin/view-user';
export const ADD_LIST_PRODUCT_API = '/bachmoc/admin-seller/product-add-list';
export const UPDATE_STATUS_TRUE_LIST_PRODUCT_API = '/bachmoc/admin/update-product-list';
//Người dùng
export const ADD_USER_API_URL = `/bachmoc/admin/user`;
export const UPDATE_USER_API_URL = `/bachmoc/admin/user?tendn`;
export const DELETE_USER_API_URL = `/bachmoc/admin/user`;
export const DELETE_USER_RESTRICTED_API = '/bachmoc/admin/restricted';
export const ADD_USER_RESTRICTED_API = '/bachmoc/admin/restricted';
export const ADD_USER_RESTRICTED_ALL_API = '/bachmoc/admin/restricted-all';
export const UPDATE_USER_RESTRICTED_API = '/bachmoc/admin/restricted';
//Đơn vị tính
export const ADD_MEASURE_API_URL = '/bachmoc/admin/measure';
export const UPDATE_MEASURE_API_URL = '/bachmoc/admin/measure?madvd';
export const DELETE_MEASURE_API_URL = '/bachmoc/admin/measure';
//Sự kiện
export const ADD_EVENT_API = '/bachmoc/admin/event';
export const UPDATE_EVENT_API = '/bachmoc/admin/event';
export const DELETE_EVENT_API = '/bachmoc/admin/event';
export const ADD_REWARD_API ='/bachmoc/admin/reward';
export const UPDATE_REWARD_API = '/bachmoc/admin/reward';
export const DELETE_REWARD_API = '/bachmoc/admin/reward';
export const ADD_REWARD_DETAIL_API ='/bachmoc/admin/reward-detail';
export const UPDATE_REWARD_DETAIL_API = '/bachmoc/admin/reward-detail';
export const DELETE_REWARD_DETAIL_API = '/bachmoc/admin/reward-detail';
export const FIND_ALL_REWARD_BY_EVENT_ID_API = '/bachmoc/admin/reward';
//Mã giảm giá
export const ADD_VOUCHER_API = '/bachmoc/admin/voucher';
export const UPDATE_VOUCHER_API = '/bachmoc/admin/voucher';
export const DELETE_VOUCHER_API = '/bachmoc/admin/voucher';
export const ADD_FAST_VOUCHER_API ='/bachmoc/admin/add-fast-voucher';
//Vai trò
export const ADD_ROLE_ADMIN_API ='/bachmoc/admin/role';
export const UPDATE_ROLE_ADMIN_API ='/bachmoc/admin/role';
export const DELETE_ROLE_ADMIN_API ='/bachmoc/admin/role';