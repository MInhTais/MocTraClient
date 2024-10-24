import _ from "lodash";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Action from "../../../Common/Action/Authentication/AuthAction";
import moment from "moment";
import { Badge, Tag } from "antd";
export default function MyVoucherComponent(props) {
  const dispatch = useDispatch();
  const { myvoucher } = useSelector((state) => state.isAuthReducer);
  useEffect(() => {
    dispatch({
      type: Action.ORDER_WISHLIST_VOUCHER_ACTION,
    });
  }, []);

  return (
    <>
      <section>
        <div className="container">
          <div className="flex flex-row">
            <div className="w-full">
              <div className="shop__cart__table mt-3">
                <table>
                  <thead>
                    <tr className="flex flex-row w-full">
                      <th className="w-1/2 fold:text-base">Mã giảm giá</th>
                      <th className="w-1/3 fold:text-base">Giảm</th>
                    </tr>
                  </thead>
                  <tbody>
                    {_?.map(myvoucher, (mgg, i) => {
                      return (
                        <tr key={i} className="flex flex-row w-full">
                          <td className="cart__product__item flex flex-row w-1/2">
                            <div className=" w-1/4 flex justify-center">
                              <img
                                src={"http://localhost:8080/images/voucher/" + mgg.lgg.hinhanh}
                                alt="Bách Mộc"
                                className="w-24 h-24 fold:hidden md:block"
                              />
                            </div>
                            <div className="text-left w-3/4 flex flex-col">
                              <h6><Tag color={'green'}>{mgg.magg}</Tag></h6>
                              <p className="w-full flex flex-row gap-4">
                                Áp dụng tối thiểu:
                                <strong>
                                  <Badge text={mgg.lgg.giagiam.toLocaleString()} color={'lime'} />
                                </strong>
                              </p>
                              <p className="w-full flex flex-row gap-4">
                                <strong>Ngày đổi: </strong>
                                <Badge color='yellow' text={moment(mgg.ngaytao).format(
                                  "DD/MM/YYYY HH:ss:mm"
                                )} />
                              </p>
                              <p className="w-full flex flex-row gap-4">
                                <strong>Ngày hết hạn: </strong>
                                <Badge text={moment(mgg.ngayhethan).format(
                                  "DD/MM/YYYY HH:ss:mm"
                                )} color='red' />
                              </p>
                              <p className="w-full flex flex-row gap-4">
                                Đơn hàng tối thiểu:
                                <Badge text={mgg.lgg.giatritoithieu.toLocaleString()} color={'red'}  />
                              </p>
                            </div>
                          </td>
                          <td className="cart__price w-1/3">
                            {mgg.lgg.giagiam.toLocaleString()}
                          </td>
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
