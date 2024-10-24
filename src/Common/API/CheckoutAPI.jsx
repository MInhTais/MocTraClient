//PAYMENT WITH GHN
export const FIND_ALL_PROVINCE_URL = 'https://online-gateway.ghn.vn/shiip/public-api/master-data/province';
export const FIND_ALL_DISTRICT_BY_PROVINCE_URL = 'https://online-gateway.ghn.vn/shiip/public-api/master-data/district';
export const FIND_ALL_WARD_BY_DISTRICT_URL = 'https://online-gateway.ghn.vn/shiip/public-api/master-data/ward';
export const FIND_ALL_SERVICES_AVAILABLE_URL= 'https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services';
export const GET_FEES = 'https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee';

export const FIND_ALL_PROVINCE_GOSHIP_API = 'https://api.goship.io/api/v2/cities';
export const FIND_ALL_DISTRICT_BY_PROVINCE_GOSHIP_API = 'https://api.goship.io/api/v2/cities';
export const FIND_ALL_AWARD_BY_DISTRICT_GOSHIP_API = 'https://api.goship.io/api/v2/districts';
export const GET_FEES_GOSHIP_API = 'https://api.goship.io/api/v2/rates';

//PAYMENT WITH GHTK
export const GET_FEES_GHTK = 'https://services.giaohangtietkiem.vn/services/shipment/fee?address=P.503%20t%C3%B2a%20nh%C3%A0%20Auu%20Vi%E1%BB%87t,%20s%E1%BB%91%201%20L%C3%AA%20%C4%90%E1%BB%A9c%20Th%E1%BB%8D&province=H%C3%A0%20n%E1%BB%99i&district=Qu%E1%BA%ADn%20C%E1%BA%A7u%20Gi%E1%BA%A5y&pick_province=H%C3%A0%20N%E1%BB%99i&pick_district=Qu%E1%BA%ADn%20Hai%20B%C3%A0%20Tr%C6%B0ng&weight=1000&value=3000000&deliver_option=xteam&tags%5B%5D=1';
export const ADD_ORDER_URL = '/bachmoc/customer/checkout';
export const UPDATE_VOUCHER_URL = `/bachmoc/customer/checkout/update-voucher`;