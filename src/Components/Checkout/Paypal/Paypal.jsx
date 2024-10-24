import _ from "lodash";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { PayPalButton } from "react-paypal-button-v2";
import { notify } from "../../../libs/Notify/Notify";
import { ADD_ORDER_ACTION } from "../../../Common/Action/Checkout/CheckoutAction";
import { OPEN_FORM_MODAL } from "../../../Common/Const/Modal/ModalConst";
import LoginForm from "../../Modal/LoginForm";
import { CUSTOMER, TITLE_LOGIN } from "../../../Common/Const/Auth/AuthConst";
import * as MESSAGE from "../../../Common/Const/Notify/NotifyConst";
import { history } from "../../../libs/History/history";

export default function Paypal() {
  const { credentials } = useSelector((state) => state.AuthReducer);
  const { address } = useSelector((state) => state.AddressReducer);
  const addressDefault = _?.find(address, (e) => e.macdinh === true);
  const { formOne } = useSelector((state) => state.StatusReducer);
  const { fee } = useSelector((state) => state.CheckoutReducer);
  const { carts, voucher, allStick } = useSelector(
    (state) => state.CartReducer
  );
  const dispatch = useDispatch();
  const handleSubmit = () => {
    if (credentials) {
      let orderdetail = _?.filter(carts, (e) => e.stick);
      if (_.find(credentials?.roles, (e) => e === CUSTOMER)) {
        if (orderdetail?.length > 0) {
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
          let totalAfterCost =
            phiship - (!_.isEmpty(voucher) ? voucher?.lgg?.giagiam : 0);
          let tongcong =
            totalAfterCost > 0 ? tongtien + totalAfterCost : tongtien;

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
        } else if (orderdetail?.length > 0) {
          history.push("/gio-hang");
          notify("warning", MESSAGE.EMPTY_CART_WARNING);
        } else {
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
    <div>
      <PayPalButton
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: "USD",
                  value: _?.filter(carts, (e) => e.stick)?.length > 0
                    ? Math.ceil(
                        _.reduce(
                          carts,
                          (total, sp) => {
                            return (total += sp.dongia * sp.sl);
                          },
                          0
                        ) / 23000
                      )
                    : 0,
                },
              },
            ],
            // application_context: {
            //   shipping_preference: "NO_SHIPPING" // default is "GET_FROM_FILE"
            // }
          });
        }}
        onApprove={(data, actions) => {
          // Capture the funds from the transaction
          return actions.order.capture().then(function (details) {
            // Show a success message to your buyer
            notify('success',`Cám ơn ${details.payer.name.given_name}. Giao dịch của bạn đã hoàn thành.`)

            // OPTIONAL: Call your server to save the transaction
            return handleSubmit();
          });
        }}
      />
    </div>
  );
}
