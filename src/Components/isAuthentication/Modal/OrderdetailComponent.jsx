import React, { useEffect } from "react";
import { Popconfirm, Popover, Tag } from "antd";
import _ from "lodash";
import { responsive } from "../../Home/ResponsiveCarousel";
import Carousel from "react-multi-carousel";
import { DELETE_ORDER_DETAIL_ADMIN_ACTION } from "../../../Common/Action/Order/OrderAction";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import ReviewForm from "./ReviewForm";
import {  OPEN_FORM_CREATE } from "../../../Common/Const/Admin/Drawer";
import { BUTTON_ADD } from "../../../Common/Const/Admin/AdminConst";
import ReturnGoodComponent from "./ReturnGoodComponent";
import { CUSTOMER } from "../../../Common/Const/Auth/AuthConst";

export default function OrderdetailComponent(props) {
  const { detail } = props;
  const dispatch = useDispatch();
  const {credentials} = useSelector((state)=>state.AuthReducer);

  return (
    <>
      <Carousel responsive={responsive}>
        {_?.map(detail, (ct) => {
          return (
            <div
              className="p-4 w-full px-4 py-6 rounded-lg transform transition duration-500 hover:scale-110"
              key={ct.hdspct.masp}
            >
              <h4>
                Trạng thái:{" "}
                <Tag color={ct?.pheduyet ? "green" : "red"}>
                  {ct?.pheduyet ? "Đã phê duyệt" : "Chưa phê duyệt"}
                </Tag>
              </h4>

              <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                <label className="cursor-pointer">
                  <img
                    className="lg:h-56 md:h-36 w-full object-cover object-center"
                    src={
                      "http://localhost:8080/images/product/" +
                      ct?.hdspct?.hinhanh
                    }
                    alt="Bách Mộc"
                  />
                </label>
                <div className="p-6">
                  <h2 className="tracking-widest text-xs text-center title-font font-medium text-gray-400 mb-1">
                    TÊN SẢN PHẨM
                  </h2>
                  <h1 className="truncate title-font text-sx font-medium text-gray-900 mb-3">
                    <a
                      href={`/chi-tiet/${ct?.hdspct?.masp}`}
                      className="text-green-600 hover:text-green-800"
                    >
                      {ct?.hdspct?.tensp}
                    </a>
                  </h1>
                  <p className="leading-relaxed mb-3 text-xs">
                    {ct?.hdspct?.mota?.length > 15
                      ? ct?.hdspct?.mota?.slice(0, 14) + "..."
                      : ct?.hdspct?.mota}
                  </p>
                  <div className="flex items-center flex-wrap ">
                    <div className="flex flex-row w-full gap-4">
                      <Popover
                        placement={"top"}
                        content={() => {
                          return (
                            <div className="flex flex-col w-full justify-center">
                              <div className="flex flex-row gap-3">
                                <span>Trạng thái: </span>
                                <p>
                                  {ct?.hdspct?.conlai > 0
                                    ? "Còn hàng"
                                    : "Hết hàng"}
                                </p>
                              </div>
                              <div className="flex flex-row gap-3">
                                <span>Loại: </span>
                                <p>{ct?.hdspct?.loaisp?.tenloai}</p>
                              </div>
                              <div className="flex flex-row gap-3">
                                <span>Thương hiệu: </span>
                                <p>{ct?.hdspct?.thuonghieu?.tenth}</p>
                              </div>
                              <div className="flex flex-row gap-3">
                                <span>Hạn sử dụng: </span>
                                <p>
                                  {moment(ct?.hdspct?.ngayhethan).format(
                                    "DD/MM/YYYY HH:ss:mm"
                                  )}
                                </p>
                              </div>
                              <div className="flex flex-row gap-3">
                                <span>Nhà cung cấp: </span>
                                <p>{ct?.hdspct?.nhacungcap?.tenncc}</p>
                              </div>
                              <div className="flex flex-row gap-3">
                                <span>Cửa hàng: </span>
                                <p>
                                  {ct?.hdspct?.nhacungcap?.cuahang?.tencuahang
                                    ? ct?.hdspct?.nhacungcap?.cuahang
                                        ?.tencuahang
                                    : "Mộc Trà"}
                                </p>
                              </div>
                            </div>
                          );
                        }}
                      >
                        <a className="text-green-500 inline-flex items-center md:mb-2 lg:mb-0 hover:text-green-800 w-1/2">
                          Chi tiết
                          <svg
                            className="w-4 h-4 ml-2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M5 12h14" />
                            <path d="M12 5l7 7-7 7" />
                          </svg>
                        </a>
                      </Popover>
                      {ct?.pheduyet && ct?.donhang?.danhanhang ? (
                        <a
                          className="text-indigo-500 hover:text-indigo-700 cursor-pointer flex justify-end w-1/2"
                          onClick={() => {
                            dispatch({
                              type: OPEN_FORM_CREATE,
                              Component: <ReviewForm product={ct?.hdspct} />,
                              title: `ĐÁNH GIÁ SẢN PHẨM ${ct?.hdspct?.masp}`,
                              width: 1000,
                              nameButton: BUTTON_ADD,
                            });
                          }}
                        >
                          ĐÁNH GIÁ
                        </a>
                      ) : null}
                      {ct?.pheduyet && ct?.donhang?.danhanhang || !_.find(credentials?.roles,e=>e==='MANAGER' || e==='STAFF') ? null : (
                        <Popconfirm
                          placement="top"
                          title={"Bạn có muốn xóa chi tiết đơn hàng này?"}
                          onConfirm={() => {
                            dispatch({
                              type: DELETE_ORDER_DETAIL_ADMIN_ACTION,
                              detail: ct,
                            });
                          }}
                          okText="Đồng ý"
                          cancelText="Hủy bỏ"
                        >
                          <a className="text-indigo-500 hover:text-indigo-700 cursor-pointer flex justify-end w-1/2">
                            Xóa
                          </a>
                        </Popconfirm>
                      )}
                    </div>

                    <div className="flex flex-row gap-2 pb-2">
                      <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                        <svg
                          className="w-4 h-4 mr-1"
                          stroke="currentColor"
                          strokeWidth={2}
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          viewBox="0 0 24 24"
                        >
                          <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                        </svg>
                        {ct?.hdspct?.dongia?.toLocaleString()} đ
                      </span>
                      <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                        <svg
                          className="w-4 h-4 mr-1"
                          stroke="currentColor"
                          strokeWidth={2}
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          viewBox="0 0 24 24"
                        >
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx={12} cy={12} r={3} />
                        </svg>
                        {ct?.hdspct?.views}
                      </span>
                    </div>
                    {_.find(credentials?.roles,e=>e===CUSTOMER) && ct?.donhang?.trangthai && !ct?.donhang?.danhanhang && ct?.ngaynhan ? <h4>
                      <Tag color="#f50"
                      className="cursor-pointer"
                      onClick={()=>{
                        dispatch({
                          type: OPEN_FORM_CREATE,
                          Component: <ReturnGoodComponent ctdh={ct} />,
                          title: "TRẢ HÀNG/ HOÀN TIỀN",
                          nameButton: BUTTON_ADD,
                          footer:true
                        })
                      }}
                      >Trả hàng/ Hoàn tiền</Tag>
                    </h4>: null}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Carousel>
    </>
  );
}
