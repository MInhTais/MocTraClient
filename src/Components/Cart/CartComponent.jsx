import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Action from "../../Common/Action/Checkout/CheckoutAction";
import VoucherComponent from "../Checkout/VoucherComponent";
export default function CartComponent({ checkout, current, setCurrent }) {
  const dispatch = useDispatch();
  const { carts } = useSelector((state) => state.CartReducer);
  const { fee } = useSelector((state) => state.CheckoutReducer);
  const { formTwo } = useSelector(
    (state) => state.StatusReducer
  );
  const [Total,setTotal] = useState(
    !carts ? 0 : carts.reduce((total, sp, i) => {
      return (total += sp.dongia * sp.sl);
    }, 0)
  )
  const [Fee, setFee] = useState(!fee ? 0 : fee.total);
  const credentials = JSON.parse(localStorage.getItem('credentials'));

  const renderButton = () => {
    if (carts.length === 0) {
      return (
        <button className="btn btn-primary pull-right" disabled>
          Confirm Order
        </button>
      );
    } else if (!checkout) {
      <a className="btn btn-primary pull-right" href="/thanh-toan">
        Checkout
      </a>;
    } else {
      return (
        <div className="float-right">
          <button
            className="button-primary mr-5"
            type="submit"
            onClick={() => handleSubmit()}
          >
            THANH TOÁN
          </button>
          <button
            className="button-default"
            type="submit"
            onClick={() => setCurrent(current-1)}
          >
            TRỞ LẠI
          </button>
        </div>
      );
    }
  };

  const handleSubmit = () => {
    if (!credentials) {
      formTwo.order.diem = 0;
    }
    dispatch({
      type: Action.ADD_ORDER_ACTION,
      order: formTwo.order,
    });
  };

  return (
    <>
      <div className="shopping-total">
        <VoucherComponent checkout={checkout} total={!carts ? 0 : carts.reduce((total, sp, i) => {
      return (total += sp.dongia * sp.sl);
    }, 0)} setTotal ={setTotal} Fee={fee.total} setFee={setFee} />
        <ul>
          <li>
            <em>Tổng tiền</em>
            <strong className="price">
              {Total?.toLocaleString()}
              <span>đ</span>
            </strong>
          </li>
          <li>
            <em>Phí vận chuyển</em>
            <strong className="price">
              {Fee?.toLocaleString()}
              <span>đ</span>
            </strong>
          </li>
          {credentials ? (
            <li>
              <em>Điểm nhận được</em>
              <strong className="price">{Total * 0.02}</strong>
            </li>
          ) : (
            ""
          )}
          <li className="shopping-total-price">
            <em>Tổng cộng</em>
            <strong className="price">
              {(
                Total +
                Fee
              ).toLocaleString()}
              <span>đ</span>
            </strong>
          </li>
        </ul>
      </div>
      <div className="clearfix"></div>
      {renderButton()}
    </>
  );
}
