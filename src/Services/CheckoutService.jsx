import Axios from "axios";
import * as URL from "../Common/API/CheckoutAPI";
import { commonService } from "./commonService";
import instance from "./TokenService";
import _ from "lodash";
import { TOKEN_GOSHIP } from "../Common/Const/Checkout/CheckoutConst";

class CheckoutService extends commonService {
  constructor() {
    super();
  }

  findAllProvince() {
    return Axios({
      url: URL.FIND_ALL_PROVINCE_URL,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: "f60a9e60-f511-11eb-af49-7e964e8ba58d",
      },
    });
  }

   findAllProvinceGoShip() {
    return Axios({
      url: URL.FIND_ALL_PROVINCE_GOSHIP_API,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': TOKEN_GOSHIP,
      },
    });
  }

  findAllDistrictByProvince(provinceid) {
    return Axios({
      url: `${URL.FIND_ALL_DISTRICT_BY_PROVINCE_URL}?province_id=${provinceid}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: "f60a9e60-f511-11eb-af49-7e964e8ba58d",
      },
    });
  }

  findAllDistrictByProvinceGoShip(code) {
    return Axios({
      url: `${URL.FIND_ALL_DISTRICT_BY_PROVINCE_GOSHIP_API}/${code}/districts`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': TOKEN_GOSHIP,
      },
    });
  }

  findAllWardByDistrict(districtid) {
    return Axios({
      url: `${URL.FIND_ALL_WARD_BY_DISTRICT_URL}?district_id=${districtid}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: "f60a9e60-f511-11eb-af49-7e964e8ba58d",
      },
    });
  }

  findAllWardByDistrictGoShip(code) {
    return Axios({
      url: `${URL.FIND_ALL_AWARD_BY_DISTRICT_GOSHIP_API}/${code}/wards`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': TOKEN_GOSHIP,
      },
    });
  }

  findAllServicesByDistrict(district) {
    return Axios({
      url: `${URL.FIND_ALL_SERVICES_AVAILABLE_URL}?shop_id=1889490&from_district=1572&to_district=${district}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: "f60a9e60-f511-11eb-af49-7e964e8ba58d",
      },
    });
  }

  findFeesByServiceGoShip(district,city) {
    console.log("DISTRICT", district,city)
    let data = _.filter(
      JSON.parse(localStorage.getItem("carts")),
      (e) => e.stick
    );
    let total = _?.reduce(
      data,
      (total, sp) => {
        return (total += sp.dongia * sp.sl);
      },
      0
    );
    let weight = _?.ceil(
      _?.reduce(
        data,
        (totalW, sp) => {
          return (totalW += sp.trongluong);
        },
        0
      )
    );
    console.log("RESULT",data,total,weight)
    if (data && total !==0 && weight) {
      let shipment = {
        "shipment": {
          "address_from": {
              "district": "700100",
              "city": "700000"
          },
          "address_to":{
              "district":district,
              "city":city
          },
          "parcel": {
              "cod": total,
              "width": 10,
              "height": 10,
              "length": 10,
              "weight": weight
          }
      }
      }
      console.log(shipment,"APIIIII")
      return Axios({
        url: URL.GET_FEES_GOSHIP_API,
        method: "POST",
        data: shipment,
        headers: {
          "Content-Type": "application/json",
          'Authorization': TOKEN_GOSHIP,
        },
      });
    }
  }

  findFeesGHTKByService(province, district, address) {
    let data = _.filter(
      JSON.parse(localStorage.getItem("carts")),
      (e) => e.stick
    );
    let total = _?.reduce(
      data,
      (total, sp) => {
        return (total += sp.dongia * sp.sl);
      },
      0
    );
    let weight = _?.ceil(
      _?.reduce(
        data,
        (totalW, sp) => {
          return (totalW += sp.trongluong);
        },
        0
      )
    );
    console.log("API ADDRESS", province, district, address);
    if (data && total && weight && address) {
      return Axios({
        url: URL.GET_FEES_GHTK,
        method: "POST",

        headers: {
          Token: "5c3196F102F6b6fccC5B123C9101ADc4B94ECF4e",
          'Content-Type':'application/json',
          'Access-Control-Allow-Origin':'https://moctra.surge.sh'
        },
      });
    }
  }

  save = (order) => {
    return instance.post(URL.ADD_ORDER_URL, order);
  };

  updateVoucher = (voucher) => {
    return instance.put(URL.UPDATE_VOUCHER_URL, voucher);
  };
}

export const checkoutService = new CheckoutService();
