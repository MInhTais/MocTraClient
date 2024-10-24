import _ from "lodash";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ADD_ORDER_ACTION } from "../../Common/Action/Checkout/CheckoutAction";
import { CUSTOMER, TITLE_LOGIN } from "../../Common/Const/Auth/AuthConst";
import { UPDATE_CURRENT } from "../../Common/Const/Checkout/CheckoutConst";
import { SET_METHOD } from "../../Common/Const/Checkout/StatusConst";
import { OPEN_FORM_MODAL } from "../../Common/Const/Modal/ModalConst";
import * as MESSAGE from "../../Common/Const/Notify/NotifyConst";
import { notify } from "../../libs/Notify/Notify";
import LoginForm from "../Modal/LoginForm";
import Paypal from "./Paypal/Paypal";
import {history} from '../../libs/History/history';

export default function PaymentMethodComponent() {
  const dispatch = useDispatch();
  const { credentials } = useSelector((state) => state.AuthReducer);
  const { address } = useSelector((state) => state.AddressReducer);
  const addressDefault = _?.find(address, (e) => e.macdinh === true);
  const { fee } = useSelector((state) => state.CheckoutReducer);
  const { carts, voucher } = useSelector((state) => state.CartReducer);
  const {formOne} = useSelector((state)=>state.StatusReducer);

  const handleSubmit = () => {
    if (credentials) {
      let orderdetail = _?.filter(carts, (e) => e.stick);
      if (_.find(credentials?.roles, (e) => e === CUSTOMER)) {
        if (orderdetail?.length >0) {
          let diachi = addressDefault?.duong;
          diachi += addressDefault?.thitran?.name
            ? ` - ${addressDefault?.thitran?.name}`
            : "";
          diachi += addressDefault?.huyen?.name
            ? ` - ${addressDefault?.huyen?.name}`
            : "";
          diachi += addressDefault?.tinh?.name
            ? ` - ${addressDefault?.tinh?.name}`
            : "";

          let chitietdh = _?.map(orderdetail, (c) => {
            return {
              sl: c.sl,
              dongia: c.dongia - (c.dongia * c.giamgia) / 100,
              hdspct: c,
            };
          });
          let phiship = fee.total_fee;
          let diem = credentials
            ? _?.reduce(
                orderdetail,
                (total, sp) => {
                  return (total +=
                    (sp.dongia - (sp.dongia * sp.giamgia) / 100) * sp.sl);
                },
                0
              ) * 0.02
            : 0;
          let phuongthucvc = fee?.carrier_name;
          let tongtien = _?.reduce(
            orderdetail,
            (total, sp) => {
              return (total +=
                (sp.dongia - (sp.dongia * sp.giamgia) / 100) * sp.sl);
            },
            0
          );
          let totalAfterCost = phiship - (!_.isEmpty(voucher) ? voucher?.lgg?.giagiam : 0);
          let tongcong = totalAfterCost > 0 ? (tongtien+ totalAfterCost) : tongtien;
        
          let tentt = formOne.tentt;
          let hoten = addressDefault?.hoten;
          let sdt = addressDefault?.sdt;
          const order = {
            diachi,
            hoten,
            sdt,
            tongtien,
            tongcong,
            phuongthucvc,
            tentt,
            diem,
            phiship,
            chitietdh,
          };
          dispatch({
            type: ADD_ORDER_ACTION,
            order,
            voucher,
            credentials,
          });
        }else if(orderdetail?.length >0){
          history.push('/gio-hang');
          notify("warning", MESSAGE.EMPTY_CART_WARNING);
        }
         else {
          notify("warning", MESSAGE.EMPTY_SELECT_CART_WARNING);
        }
      } else {
        notify("warning", MESSAGE.ROLE_NOT_SUITABLE_FOR_CHECKOUT_WARNING);
      }
    } else {
      dispatch({
        type: OPEN_FORM_MODAL,
        Component: <LoginForm />,
        title: TITLE_LOGIN,
        width: 550,
      });
    }
  };
  return (
    <div className="flex flex-col w-full justify-center">
      <p className="text-center text-md font-bold">
        Chọn phương thức thanh toán
      </p>
      <div className="flex flex-row justify-center">
        <div className="mr-5">
          <label className="inline-flex items-center font-normal">
            <input
              type="radio"
              className="form-radio radio-responsive"
              name="pttt"
              value={"ATM"}
              onClick={() => {
                if (credentials) {
                  if(carts?.length >0){
                    dispatch({
                      type: OPEN_FORM_MODAL,
                      Component: <Paypal handleSubmit={handleSubmit} />,
                      title: "PHƯƠNG THỨC THANH TOÁN ONLINE",
                      width: 500,
                    });
                  }else{
                    notify("warning", MESSAGE.EMPTY_SELECT_CART_WARNING);
                  }
                } else {
                  dispatch({
                    type: OPEN_FORM_MODAL,
                    Component: <LoginForm />,
                    title: TITLE_LOGIN,
                    width: 550,
                  });
                }
                dispatch({
                  type: SET_METHOD,
                  tentt: "ATM",
                });
              }}
            />
            <span className="ml-2">ATM</span>
          </label>
        </div>
        <div>
          <label className="inline-flex items-center  font-normal">
            <input
              type="radio"
              className="form-radio radio-responsive"
              value={"COD"}
              name="pttt"
              defaultChecked
              onClick={() => {
                if (credentials) {
                  dispatch({
                    type: SET_METHOD,
                    tentt: "COD",
                  });
                } else {
                  dispatch({
                    type: OPEN_FORM_MODAL,
                    Component: <LoginForm />,
                    title: TITLE_LOGIN,
                    width: 550,
                  });
                }
              }}
            />
            <span className="ml-2">COD</span>
          </label>
        </div>
      </div>
      <div className="w-full flex flex-row justify-center gap-4">
        <button
          className="button-3d-gray rounded-md text-responsive"
          onClick={() => {
            dispatch({
              type: UPDATE_CURRENT,
              increase: false,
            });
          }}
        >
          Trở lại
        </button>
        {_.isEqual(formOne?.tentt, "COD") ? (
          <button
            className="button-3d-green rounded-md text-responsive"
            onClick={() => handleSubmit()}
          >
            Đặt hàng
          </button>
        ) : null}
      </div>
    </div>
  );
}
