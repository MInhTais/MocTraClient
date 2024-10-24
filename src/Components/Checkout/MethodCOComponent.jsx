import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Type from "../../Common/Const/Checkout/StatusConst";
import LoginForm from "../Modal/LoginForm";
import * as TypeModal from "../../Common/Const/Modal/ModalConst";
import _ from "lodash";
import {
  FIND_ALL_SERVICE_AVAILABLE_ACTION,
  FIND_FEES_ACTION,
} from "../../Common/Action/Checkout/CheckoutAction";
import FormAddressComponent from "./FormAddressComponent";
import {
  GET_ADDRESS_DETAIL,
  VISIBLE_SELECT_TAG,
} from "../../Common/Const/Order/OrderConst";
import { notify } from "../../libs/Notify/Notify";
import {
  FIND_FEES,
  GIAO_HANG_NHANH,
  GIAO_HANG_TIET_KIEM,
  UPDATE_CURRENT,
} from "../../Common/Const/Checkout/CheckoutConst";
import { PayPalButton } from "react-paypal-button-v2";
import { Switch } from "antd";

export default function MethodCOComponent({ current, setCurrent }) {
  const dispatch = useDispatch();
  const { credentials } = useSelector((state) => state.AuthReducer);
  const { formOne } = useSelector((state) => state.StatusReducer);
  const { address } = useSelector((state) => state.AddressReducer);
  const { service, fee, deliveries } = useSelector(
    (state) => state.CheckoutReducer
  );
  const addressDefault = _.find(address, (e) => e.macdinh === true);
  const [transport, setTransport] = useState("");
  useEffect(() => {
    dispatch({
      type: FIND_FEES,
      fee:null
    })
  }, []);

  const handleSubmit = () => {
    if (!credentials) {
      dispatch({
        type: TypeModal.OPEN_FORM_MODAL,
        Component: <LoginForm />,
        title: "Đăng nhập",
        width: 600,
      });
    } else if (!addressDefault) {
      dispatchAddress();
    } else if (!fee) {
      notify("warning", "Vui lòng chọn hình thức vận chuyển");
    } else {
      dispatch({
        type: UPDATE_CURRENT,
        increase: true,
      });
    }
  };

  const dispatchAddress = () => {
    dispatch({
      type: TypeModal.OPEN_FORM_MODAL,
      Component: <FormAddressComponent />,
      title: "CHỌN ĐỊA CHỈ GIAO HÀNG",
      width: 700,
    });

    dispatch({
      type: GET_ADDRESS_DETAIL,
      detail: null,
      edit: false,
    });

    dispatch({
      type: VISIBLE_SELECT_TAG,
    });
  };

  return (
    <>
      <div className="container flex flex-col m-10 bg-opacity-10 bg-gray-300 justify-center">
        <p className="text-md font-bold mt-5">
          Đăng nhập giúp bạn xem lịch sử mua hàng bạn có thể tích điểm, số điểm
          tích được đủ điều kiện sẽ quy đổi thành mã giảm giá cho lần mua hàng
          tiếp theo.
        </p>
        <div className="w-full flex flex-col container gap-y-2">
          {deliveries?.length > 0 ? _?.map(deliveries, (item, i) => {
            return (
              <div className="bg-gray-100 p-2 w-full flex flex-row justify-start gap-4 gap-y-2" key={i}>
                <Switch
                  className="mt-2"
                  name="transport"
                  checked={_.isEqual(item?.id, transport) ? true : false}
                  value={item?.id}
                  onChange={(e,event) => {
                    setTransport(event.target.value);
                    if(event.target.value){
                      dispatch({
                        type: FIND_FEES,
                        fee: item
                      })
                    }else{
                      dispatch({
                        type: FIND_FEES,
                        fee: null
                      })
                    }
                  }}
                />
                <img className="w-12 h-12" src={item?.carrier_logo} />
                <div className="w-full flex flex-col justify-start">
                  <label className="flex justify-start text-2xl">{item?.carrier_name} - {item?.service}</label>
                  <label className="flex justify-start text-xs">Thời gian giao hàng: {item?.expected}</label>
                </div>
              </div>
            );
          }): <div className="bg-gray-100 p-2 w-full flex flex-row justify-center gap-4">Chưa tìm được phương thức vận chuyển phù hợp. Vui lòng liên hệ 0702362681 để được hỗ trợ.</div>}
        </div>
        <div>
          <button
            className="button-primary"
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            Xác Nhận
          </button>
        </div>
      </div>
    </>
  );
}
