import _ from "lodash";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Action from "../../Common/Action/Authentication/AuthAction";
import OrderdetailComponent from "./Modal/OrderdetailComponent";
import { OPEN_FORM_MODAL } from "../../Common/Const/Modal/ModalConst";
import moment from "moment";
import Carousel from "react-multi-carousel";
import { responsiveOrdered} from "../Home/ResponsiveCarousel";
import { Popover, Steps, Tag, Tooltip } from "antd";
import { FIND_ALL_ORDERED_BY_MONTH_ACTION } from "../../Common/Action/Order/OrderAction";
import { CUSTOMER, VIEW_ALL_ORDER_DETAIL } from "../../Common/Const/Auth/AuthConst";
import PageNotFound from "../Error/PageNotFound";
import {
  LoadingOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  ShoppingCartOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import MetaDecorator from "../../libs/Helmet/MetaDecorator";
import { ORDERED_PAGE_TITLE, ORDER_PAGE_DESCRIPTION } from "../../Common/Const/Page/PageConst";

const { Step } = Steps;
const month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
export default function Ordered(props) {
  const dispatch = useDispatch();
  const { ordered,user } = useSelector((state) => state.isAuthReducer);
  const { credentials } = useSelector((state) => state.AuthReducer);
  useEffect(() => {
    dispatch({
      type: Action.ORDER_WISHLIST_VOUCHER_ACTION,
    });
    window.scrollTo(0, 0);
  }, []);
  console.log("MAP",ordered)
  return (
    <>
      <MetaDecorator title={ORDERED_PAGE_TITLE} description={ORDER_PAGE_DESCRIPTION} />
      {_.isEmpty(user) ? 
      <div className="w-full flex fold:flex-col lg:flex-row bg-gray-100 h-140">
      <div className="flex flex-col m-8 rounded shadow-md w-60 fold:w-3/4 sm:w-80 animate-pulse h-96">
        <div className="h-48 rounded-t bg-gray-300" />
        <div className="flex-1 px-4 py-8 space-y-4 sm:p-8 bg-gray-50">
          <div className="w-full h-6 rounded bg-gray-300" />
          <div className="w-full h-6 rounded bg-gray-300" />
          <div className="w-3/4 h-6 rounded bg-gray-300" />
        </div>
      </div>
      <div className="flex flex-col m-8 rounded shadow-md w-60 fold:hidden sm:w-80 md:block animate-pulse h-96">
        <div className="h-48 rounded-t bg-gray-300" />
        <div className="flex-1 px-4 py-8 space-y-4 sm:p-8 bg-gray-50">
          <div className="w-full h-6 rounded bg-gray-300" />
          <div className="w-full h-6 rounded bg-gray-300" />
          <div className="w-3/4 h-6 rounded bg-gray-300" />
        </div>
      </div>
      <div className="flex flex-col m-8 rounded shadow-md w-60 fold:hidden sm:w-80 xl:block animate-pulse h-96">
        <div className="h-48 rounded-t bg-gray-300" />
        <div className="flex-1 px-4 py-8 space-y-4 sm:p-8 bg-gray-50">
          <div className="w-full h-6 rounded bg-gray-300" />
          <div className="w-full h-6 rounded bg-gray-300" />
          <div className="w-3/4 h-6 rounded bg-gray-300" />
        </div>
      </div>
    </div>
      : <>{_.find(credentials?.roles, (e) => e === CUSTOMER) ? (
        <div className="w-2/3 container">
          <div className="w-full flex flex-col gap-y-4 pb-5">
            <label className="font-bold text-xl">ĐƠN HÀNG ĐÃ ĐẶT</label>
            <div className="w-full flex flex-row justify-center">
              <select
                className="input-nb w-28 pb-2"
                onChange={(e) => {
                  dispatch({
                    type: FIND_ALL_ORDERED_BY_MONTH_ACTION,
                    month: e.target.value,
                  });
                }}
              > 
                <option value={0} key={0}>Chọn tháng</option>
                {_.map(month, (m) => {
                  return <option value={m} key={m}>{"Tháng " + m}</option>;
                })}
              </select>
            </div>
          </div>
          {ordered?.length > 0 ? (
            <Carousel responsive={responsiveOrdered}>
              {_.map(ordered, (dh, i) => {
                return (
                  <div
                    className="w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60 hover:bg-green-50 hover:shadow-md"
                    key={i}
                  >
                    <div className="w-full flex flex-col">
                      <span className="text-lg sm:text-xl text-gray-900 font-medium title-font">
                        {dh.madh}
                      </span>
                      <small className=" mb-2">
                        {moment(dh.ngaylap).format("DD/MM/YYYY HH:mm:ss")}
                      </small>
                    </div>
                    <div className="w-full flex flex-col">
                      <label className="text-left text-md leading-relaxed">
                        Họ tên: <Tag color="lime">{dh.hoten}</Tag>
                      </label>
                      <label className="text-left text-md leading-relaxed">
                        Địa chỉ:
                        <Tooltip title={dh.diachi}>
                          <Tag color="orange">
                            {dh.diachi?.length > 45
                              ? dh.diachi.slice(0, 44) + "..."
                              : dh.diachi}
                          </Tag>
                        </Tooltip>
                      </label>
                      <label className="text-left text-md leading-relaxed">
                        Tổng tiền:{" "}
                        <Tag color="processing">
                          {dh.tongtien?.toLocaleString()}
                        </Tag>
                      </label>
                      <label className="text-left text-md leading-relaxed">
                        Phí ship:{" "}
                        <Tag color="volcano">
                          {dh.phiship?.toLocaleString()}
                        </Tag>
                      </label>
                      <label className="text-left text-md leading-relaxed">
                        Tổng cộng:{" "}
                        <Tag color="yellow">
                          {dh.tongcong?.toLocaleString()}
                        </Tag>
                      </label>
                      <label className="text-left text-md leading-relaxed">
                        Trạng thái:
                        <Popover
                          placement={"bottom"}
                          content={
                            <Steps className="w-full" direction="vertical">
                              <Step
                                status="finish"
                                title="Đặt hàng"
                                description="Đặt hàng thành công."
                                icon={<ShoppingCartOutlined className="text-3xl text-green-700" />}
                              />
                              <Step
                                status={!dh.trangthai ? "process" : "finish"}
                                title="Chuẩn bị hàng"
                                icon={
                                  !dh.trangthai ? (
                                    <LoadingOutlined />
                                  ) : (
                                    <RotateLeftOutlined className="text-3xl text-green-700" />
                                  )
                                }
                                description="Chuẩn bị xong hàng"
                              />
                              <Step
                                status={!dh.trangthai ? "process" : "finish"}
                                title="Giao hàng"
                                icon={
                                  !dh.trangthai ? (
                                    <LoadingOutlined />
                                  ) : (
                                    <RotateRightOutlined className="text-3xl text-green-700" />
                                  )
                                }
                                description="Giao hàng thành công"
                              />
                              <Step
                                status={!dh.danhanhang ? "wait" : "finish"}
                                title="Nhận hàng"
                                icon={<SmileOutlined className="text-3xl text-green-700"  />}
                                description="Khách hàng đã nhận được hàng"
                              />
                            </Steps>
                          }
                        >
                          <label>Xem tại đây</label>
                        </Popover>
                      </label>
                    </div>
                    <a
                      className="text-indigo-500 inline-flex items-center"
                      onClick={() => {
                        dispatch({
                          type: VIEW_ALL_ORDER_DETAIL,
                          orderDetail: dh?.chitietdh
                        })

                        dispatch({
                          type: OPEN_FORM_MODAL,
                          Component: (
                            <OrderdetailComponent detail={dh.chitietdh} />
                          ),
                          title: "CHI TIẾT ĐƠN HÀNG",
                          width: 1000,
                        });
                      }}
                    >
                      CHI TIẾT
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        className="w-4 h-4 ml-2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                );
              })}
            </Carousel>
          ) : (
            <p>Không có đơn hàng nào trong tháng này! :((</p>
          )}
        </div>
      ) : (
        <PageNotFound />
      )}</>}
    </>
  );
}
