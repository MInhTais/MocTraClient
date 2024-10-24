import React, { useEffect } from "react";
import * as Action from "../../../Common/Action/Authentication/AuthAction";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import {FiPlus} from "react-icons/fi";
import { Tag, Tooltip } from "antd";

export default function VoucherComponent(props) {
  const dispatch = useDispatch();
  const { vouchers,user } = useSelector((state) => state.isAuthReducer);
  useEffect(() => {
    dispatch({
      type: Action.ORDER_WISHLIST_VOUCHER_ACTION,
    });
  }, []);

  const addVoucher = (voucher) => {
    dispatch({
      type: Action.ADD_VOUCHER_ACTION,
      voucher,
    });
  };

  return (
    <>
      <label className="w-full flex flex-row justify-center text-2xl font-bold">Xu của tôi: {user.tichdiem}</label>
      <section>
        <div className="container">
          <div className="flex flex-row mt-3">
            <div className="w-full">
              <div className="shop__cart__table">
                <table>
                  <thead>
                    <tr>
                      <th>Mô tả</th>
                      <th>Giảm</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {_.map(vouchers, (mgg, i) => {
                      return (
                        <tr key={i}>
                          <td className="cart__product__item flex flex-row">
                            <div className=" w-1/4 flex justify-center"><img
                              src={"http://localhost:8080/images/voucher/" + mgg.hinhanh}
                              className="w-24 h-24"
                              alt="Mộc Trà"
                            /></div>
                            <div className="cart__product__item__title w-3/4">
                              <h6>{mgg.tenloaigg}</h6>
                              <p>
                                Áp dụng tối thiểu:
                                <strong>
                                  {mgg.giatritoithieu.toLocaleString()}
                                </strong>
                              </p>
                              <p>Xu tối thiểu: {mgg.giagiam}</p>
                              <small className="text-gray-700 italic">Mộc Trà</small>
                            </div>
                          </td>
                          <td className="cart__price">
                            {mgg.giagiam.toLocaleString()}
                          </td>
                          {user?.tichdiem >= mgg.giagiam ? <td className="cart__close">
                            <Tooltip title={'Đổi mã giảm giá'}><FiPlus className="cursor-pointer hover:text-green-400" onClick={() => addVoucher(mgg)} /></Tooltip>
                          </td> : <td className="cursor-not-allowed"><Tag color='gray'>Xu không đủ</Tag></td>}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
