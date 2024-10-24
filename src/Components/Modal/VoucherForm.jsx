import {
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { Popover } from "antd";
import _ from "lodash";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ORDER_WISHLIST_VOUCHER_ACTION } from "../../Common/Action/Authentication/AuthAction";
import NoneVoucher from "../isAuthentication/Voucher/NoneVoucher";
import { CANCEL_VOUCHER, GET_VOUCHER } from "../../Common/Const/Cart/CartConst";
import { CLOSE_MODAL } from "../../Common/Const/Modal/ModalConst";
import moment from 'moment';

export default function VoucherForm() {
  const dispatch = useDispatch();
  const { myvoucher } = useSelector((state) => state.isAuthReducer);
  const { carts,voucher} = useSelector((state) => state.CartReducer);
  useEffect(() => {
    dispatch({
      type: ORDER_WISHLIST_VOUCHER_ACTION,
    });
  }, []);

  let notSuitable = "voucher-responsive opacity-50";
  let suitable = "voucher-responsive";
  const renderVoucher = () => {
    return (
      <>
        <section className="text-gray-600 body-font w-full">
        <div className="container px-5 py-8 mx-auto">
          <span className="font-bold">MÃ GIẢM GIÁ</span>
          {_?.map(myvoucher, (mgg, i) => {
            return (
              <div key={i} className={mgg?.lgg?.giatritoithieu <=
                _.reduce(
                  carts,
                  (total, sp, i) => {
                    return (total += sp.dongia * sp.sl);
                  },
                  0
                ) ? suitable : notSuitable}>
                <div className="m-2 border-r-2 border-solid border-green-900 duo:w-24 duo:h-24 h-20 w-20 duo:mr-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
                  <img className="rounded-full" src={mgg.hinhanh ? "http://localhost:8080/images/voucher/" + mgg.hinhanh : 'http://localhost:8080/images/voucher/freeship.png'} alt="Bách Mộc" />
                </div>
                <div className="border-l-2 border-dotted border-green-900 border-opacity-25 flex-grow duo:text-left text-center mt-6 duo:mt-0">
                  <div className="flex flex-row flex-wrap justify-start ml-4">
                    <div className="w-2/4">
                      <h2 className="text-gray-900 text-md title-font font-bold mb-2">
                        Giảm{" "}
                        <span className="text-responsive">
                          {mgg?.lgg?.giagiam?.toLocaleString()}
                        </span>
                      </h2>
                    </div>
                    <div className="w-2/4">
                      <span className="text-gray-900 text-md title-font font-bold mb-2 float-right rounded-full">
                        <Popover
                        getPopupContainer={(node) => node.parentElement}
                          key={mgg.magg}
                          placement={"bottom"}
                          title={""}
                          className="rounded-md"
                          content={() => {
                            return (
                              <div className="container flex flex-col w-full max-w-lg p-6 mx-auto divide-y rounded-md divide-gray-300 bg-gray-50 text-gray-800">
                                <div className="flex justify-between p-4">
                                  <div className="flex space-x-4">
                                    <div>
                                      <img
                                        src="http://localhost:8080/images/voucher/freeship.png"
                                        alt
                                        className="object-cover w-12 h-12 rounded-full bg-gray-500"
                                      />
                                    </div>
                                    <div>
                                      <h4 className="text-responsive font-bold">
                                        {mgg?.magg}
                                      </h4>
                                      <small className="text-xs text-gray-600">
                                        HSD: {moment(mgg?.ngayhethan).format('DD/MM/YYYY HH:ss:mm')}
                                      </small>
                                    </div>
                                  </div>
                                </div>
                                <div className="p-4 space-y-2 text-md text-gray-600">
                                  <p>
                                    <ExclamationCircleFilled /> Giảm{" "}
                                    {mgg?.lgg?.giagiam?.toLocaleString()} cho
                                    đơn hàng từ{" "}
                                    {mgg?.lgg?.giatritoithieu?.toLocaleString()}
                                  </p>
                                  <p>
                                    <ExclamationCircleFilled /> Áp dụng cho tất
                                    cả danh mục sản phẩm.
                                  </p>
                                </div>
                              </div>
                            );
                          }}
                        >
                          <ExclamationCircleFilled className="cursor-pointer" />
                        </Popover>
                      </span>
                    </div>
                  </div>
                  <p className="leading-relaxed text-xs ml-4">
                    Cho đơn hàng từ {mgg?.lgg?.giatritoithieu?.toLocaleString()} {console.log("LGG MAP",mgg)}
                  </p>
                  <div className="flex fold:flex-col duo:flex-row flex-wrap m-2 justify-center ml-4">
                    <div className="fold:w-full duo:w-2/4">
                      <span className="mt-3 text-gray-800 inline-flex items-center">
                        HSD: {mgg?.ngayhethan}
                      </span>
                    </div>
                    <div className="fold:w-full duo:w-2/4">
                      {!_.isEqual(voucher?.magg,mgg?.magg) ? <>{mgg?.lgg?.giatritoithieu <=
                      _.reduce(
                        carts,
                        (total, sp, i) => {
                          return (total += sp.dongia * sp.sl);
                        },
                        0
                      ) ? (
                        <button className="fold:w-full duo:w-2/4 h-full float-right bg-green-800 bg-opacity-80 hover:bg-opacity-100 text-white rounded-md"
                        onClick={()=>{
                          dispatch({
                            type: GET_VOUCHER,
                            voucher: mgg
                          })
                          
                          dispatch({
                            type: CLOSE_MODAL
                          })
                        }}
                        >
                          ÁP DỤNG
                        </button>
                      ) : (
                        <button
                          className="w-2/4 h-full float-right bg-gray-800 bg-opacity-80 hover:bg-opacity-100 text-white rounded-md"
                          disabled
                        >
                          ÁP DỤNG
                        </button>
                      )}</> : <button
                      className="w-2/4 h-full float-right bg-gray-800 bg-opacity-80 hover:bg-opacity-100 text-white rounded-md"
                      onClick={()=>{
                        dispatch({
                          type: CANCEL_VOUCHER,
                          voucher: mgg
                        })
                      }}
                    >
                      Hủy bỏ
                    </button>}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      </>
    );
  };

  return (
    <div className="h-96 overflow-auto">
      <div>{!myvoucher || myvoucher?.length ===0 ? <NoneVoucher /> : renderVoucher()}</div>
    </div>
  );
}
