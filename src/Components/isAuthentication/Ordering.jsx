import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Action from "../../Common/Action/Authentication/AuthAction";
import Carousel from "react-multi-carousel";
import { responsiveDetail } from "../Home/ResponsiveCarousel";
import _ from "lodash";
import { Empty, Popconfirm, Popover, Steps, Tabs } from "antd";
import { history } from "../../libs/History/history";
import moment from "moment";
import { OPEN_FORM_MODAL } from "../../Common/Const/Modal/ModalConst";
import OrderdetailComponent from "./Modal/OrderdetailComponent";
import PageNotFound from "../Error/PageNotFound";
import {
  LoadingOutlined,
  SmileOutlined,
  RotateRightOutlined,
  RotateLeftOutlined,
  ShoppingCartOutlined,
  BookOutlined,
  AuditOutlined,
} from "@ant-design/icons";
import { RECEIVED_ORDER_ACTION } from "../../Common/Action/Order/OrderAction";
import { CUSTOMER } from "../../Common/Const/Auth/AuthConst";
import MetaDecorator from "../../libs/Helmet/MetaDecorator";
import {
  ORDERING_PAGE_DESCRIPTION,
  ORDERING_PAGE_TITLE,
} from "../../Common/Const/Page/PageConst";

const { Step } = Steps;
const { TabPane } = Tabs;
export default function Ordering(props) {
  const dispatch = useDispatch();
  const { ordering, orderconfirm, user } = useSelector(
    (state) => state.isAuthReducer
  );
  const { credentials } = useSelector((state) => state.AuthReducer);
  useEffect(() => {
    dispatch({
      type: Action.ORDER_WISHLIST_VOUCHER_ACTION,
    });
    window.scrollTo(0, 0);
  }, []);
  const { size } = props;
  return (
    <>
      <MetaDecorator
        title={ORDERING_PAGE_TITLE}
        description={ORDERING_PAGE_DESCRIPTION}
      />
      {_.isEmpty(user) ? (
        <div className="w-full flex flex-col bg-gray-100 h-140">
          <div className="flex flex-row justify-start gap-6 m-8">
            <div className="bg-gray-200 animate-pulse w-32 h-10"></div>
            <div className="bg-gray-200 animate-pulse w-32 h-10"></div>
          </div>
          <div className="w-full flex fold:flex-col lg:flex-row">
            <div className="flex flex-col m-8 rounded shadow-md w-full animate-pulse h-48">
              <div className="h-48 rounded-t bg-gray-300" />
            </div>
          </div>
        </div>
      ) : (
        <>
          {_?.find(credentials?.roles, (e) => e === CUSTOMER) ? (
            <div className="fold:w-full md:w-3/4 md:pl-5">
              <Tabs
                defaultActiveKey="1"
                centered={size?.width >= 768 ? false : true}
              >
                <TabPane
                  tab={
                    <div className="w-full flex flex-col justify-center p-2">
                      <BookOutlined />
                      Đơn hàng đang chờ
                    </div>
                  }
                  key="1"
                >
                  <em>
                    Bạn có thể hủy đơn hàng khi trạng thái là chưa giao, nếu đã
                    giao thì không thể hủy.
                  </em>
                  {ordering?.length > 0 ? (
                    <Carousel responsive={responsiveDetail}>
                      {_.map(ordering, (item) => {
                        return (
                          <section className="text-gray-600 body-font gap-4">
                            <div className="container px-5 py-24 mx-auto">
                              <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
                                <div className="p-4 w-full flex  shadow-xl">
                                  <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-green-100 text-green-500 mb-4 flex-shrink-0">
                                    <img
                                      className="rounded-full h-12 w-12"
                                      src={
                                        "http://localhost:8080/images/user/" +
                                        credentials?.hinhanh
                                      }
                                    />
                                  </div>
                                  <div className="flex-grow pl-6">
                                    <h2 className="text-gray-900 text-lg title-font font-medium mb-2">
                                      {item.hoten}
                                    </h2>
                                    <p>
                                      {moment(item.ngaylap).format(
                                        "DD/MM/YYYY HH:ss:mm"
                                      )}
                                    </p>
                                    <div className="flex flex-col w-full justify-start">
                                      <p className="text-left">
                                        SĐT: {item.sdt}
                                      </p>
                                      <p className="text-left">
                                        Địa chỉ: {item.diachi}
                                      </p>
                                      <p className="text-left">
                                        Tổng tiền:{" "}
                                        {item?.tongtien?.toLocaleString()}
                                      </p>
                                      <p className="text-left">
                                        Phí ship:{" "}
                                        {item?.phiship?.toLocaleString()}
                                      </p>{" "}
                                      <p className="text-left">
                                        Tổng cộng:{" "}
                                        {item?.tongcong?.toLocaleString()}
                                      </p>
                                      <p className="text-left">
                                        Điểm nhận được: {item.diem}
                                      </p>
                                      <Popover
                                        placement={"topRight"}
                                        content={
                                          <div className="flex flex-col justify-center bg-gradient-to-r from-green-50 to-white bg-opacity-50 p-5 ring-2 ring-green-100">
                                            <label className="flex flex-row justify-center">
                                              THEO DÕI ĐƠN HÀNG
                                            </label>
                                            <Steps
                                              className="w-full"
                                              direction="vertical"
                                            >
                                              <Step
                                                status="finish"
                                                title="Đặt hàng"
                                                description="Đặt hàng thành công."
                                                icon={
                                                  <ShoppingCartOutlined className="text-3xl text-green-700" />
                                                }
                                              />
                                              <Step
                                                status={
                                                  !item.trangthai
                                                    ? "wait"
                                                    : "finish"
                                                }
                                                title="Chuẩn bị hàng"
                                                icon={
                                                  !item.trangthai ? (
                                                    <LoadingOutlined />
                                                  ) : (
                                                    <RotateLeftOutlined className="text-3xl text-green-700" />
                                                  )
                                                }
                                                description={
                                                  !item?.trangthai
                                                    ? "Đang chuẩn bị hàng"
                                                    : "Giao hàng thành công"
                                                }
                                              />
                                              <Step
                                                status={
                                                  !item.trangthai
                                                    ? "wait"
                                                    : "finish"
                                                }
                                                title="Giao hàng"
                                                icon={
                                                  !item.trangthai ? (
                                                    <LoadingOutlined />
                                                  ) : (
                                                    <RotateRightOutlined className="text-3xl text-green-700" />
                                                  )
                                                }
                                                description={
                                                  !item.trangthai
                                                    ? "Đang giao hàng"
                                                    : "Giao hàng thành công"
                                                }
                                              />
                                              <Step
                                                status={
                                                  !item.danhanhang
                                                    ? "wait"
                                                    : "finish"
                                                }
                                                title="Nhận hàng"
                                                icon={
                                                  !item.danhanhang ? (
                                                    <LoadingOutlined />
                                                  ) : (
                                                    <SmileOutlined className="text-3xl text-green-700" />
                                                  )
                                                }
                                                description={
                                                  !item.danhanhang
                                                    ? "Đang chờ"
                                                    : "Khách hàng đã nhận được hàng"
                                                }
                                              />
                                            </Steps>
                                          </div>
                                        }
                                      >
                                        <p className="text-left">
                                          Trạng thái: Xem tại đây
                                        </p>
                                      </Popover>
                                    </div>
                                    <div className="flex flex-row justify-center gap-4">
                                      <a
                                        className="mt-3 text-green-500 inline-flex items-center"
                                        onClick={() => {
                                          dispatch({
                                            type: OPEN_FORM_MODAL,
                                            Component: (
                                              <OrderdetailComponent
                                                detail={item.chitietdh}
                                              />
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
                                      <Popconfirm
                                        placement="top"
                                        title={"Bạn có muốn hủy đơn hàng này?"}
                                        onConfirm={() => {
                                          dispatch({
                                            type: Action.DELETE_ORDERING_ACTION,
                                            madh: item.madh,
                                          });
                                        }}
                                        okText="Đồng ý"
                                        cancelText="Hủy bỏ"
                                      >
                                        <a className="mt-3 text-green-500 inline-flex items-center">
                                          HỦY ĐƠN
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
                                      </Popconfirm>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </section>
                        );
                      })}
                    </Carousel>
                  ) : (
                    <div className="h-full bg-gradient-to-r from-green-50 to-green-100 flex justify-center items-center">
                      <Empty
                        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                        imageStyle={{
                          height: 100,
                        }}
                        description={
                          <div className="flex flex-col gap-y-2">
                            <span className="text-left">
                              Bạn chưa có đơn hàng nào.
                            </span>
                            <button
                              className="button-3d-green"
                              onClick={() => {
                                history.push("/trang-chu");
                              }}
                            >
                              MUA SẮM NGAY
                            </button>
                          </div>
                        }
                      >
                        {" "}
                      </Empty>
                    </div>
                  )}
                </TabPane>
                <TabPane
                  tab={
                    <div className="w-full flex flex-col justify-center p-2">
                      <AuditOutlined />
                      Xác nhận đơn hàng
                    </div>
                  }
                  key="2"
                >
                  {orderconfirm?.length > 0 ? (
                    <Carousel responsive={responsiveDetail}>
                      {_.map(orderconfirm, (item) => {
                        return (
                          <section className="text-gray-600 body-font gap-4">
                            <div className="container px-5 py-24 mx-auto">
                              <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
                                <div className="p-4 w-full flex  shadow-xl">
                                  <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-green-100 text-green-500 mb-4 flex-shrink-0">
                                    <img
                                      className="rounded-full h-12 w-12"
                                      src={
                                        "http://localhost:8080/images/user/" +
                                        credentials?.hinhanh
                                      }
                                    />
                                  </div>
                                  <div className="flex-grow pl-6">
                                    <h2 className="text-gray-900 text-lg title-font font-medium mb-2">
                                      {item.hoten}
                                    </h2>
                                    <p>
                                      {moment(item.ngaylap).format(
                                        "DD/MM/YYYY HH:ss:mm"
                                      )}
                                    </p>
                                    <div className="flex flex-col w-full justify-start">
                                      <p className="text-left">
                                        SĐT: {item.sdt}
                                      </p>
                                      <p className="text-left">
                                        Địa chỉ: {item.diachi}
                                      </p>
                                      <p className="text-left">
                                        Tổng tiền:{" "}
                                        {item?.tongtien?.toLocaleString()}
                                      </p>
                                      <p className="text-left">
                                        Phí ship:{" "}
                                        {item?.phiship?.toLocaleString()}
                                      </p>{" "}
                                      <p className="text-left">
                                        Tổng cộng:{" "}
                                        {item?.tongcong?.toLocaleString()}
                                      </p>
                                      <p className="text-left">
                                        Điểm nhận được: {item.diem}
                                      </p>
                                      <Popover
                                        placement={"topRight"}
                                        content={
                                          <div className="flex flex-col justify-center bg-gradient-to-r from-green-50 to-white bg-opacity-50 p-5 ring-2 ring-green-100">
                                            <label className="flex flex-row justify-center">
                                              THEO DÕI ĐƠN HÀNG
                                            </label>
                                            <Steps
                                              className="w-full"
                                              direction="vertical"
                                            >
                                              <Step
                                                status="finish"
                                                title="Đặt hàng"
                                                description="Đặt hàng thành công."
                                                icon={
                                                  <ShoppingCartOutlined className="text-3xl text-green-700" />
                                                }
                                              />
                                              <Step
                                                status={
                                                  !item.trangthai
                                                    ? "process"
                                                    : "finish"
                                                }
                                                title="Chuẩn bị hàng"
                                                icon={
                                                  !item.trangthai ? (
                                                    <LoadingOutlined />
                                                  ) : (
                                                    <RotateLeftOutlined className="text-3xl text-green-700" />
                                                  )
                                                }
                                                description={!item.trangthai ? "Đang chuẩn bị hàng" : "Chuẩn bị xong hàng"}
                                              />
                                              <Step
                                                status={
                                                  _?.filter(item?.chitietdh,e=>e.ngaynhan)?.length ===item?.chitietdh?.length
                                                    ? "finish"
                                                    : "process"
                                                }
                                                title="Giao hàng"
                                                icon={
                                                  _.filter(item?.chitietdh,e=>e.ngaynhan)?.length ===item?.chitietdh?.length ? (
                                                    <RotateRightOutlined className="text-3xl text-green-700" />
                                                  ) : (
                                                    <LoadingOutlined />
                                                    
                                                  )
                                                }
                                                description={_.filter(item?.chitietdh,e=>e.ngaynhan)?.length === item?.chitietdh?.length ? "Giao hàng thành công": "Đang giao"}
                                              />
                                              <Step
                                                status={
                                                  !item.danhanhang
                                                    ? "wait"
                                                    : "finish"
                                                }
                                                title="Nhận hàng"
                                                icon={
                                                  !item.danhanhang ? (
                                                    <LoadingOutlined />
                                                  ) : (
                                                    <SmileOutlined className="text-3xl text-green-700" />
                                                  )
                                                }
                                                description={
                                                  !item.danhanhang
                                                    ? "Đang chờ"
                                                    : "Khách hàng đã nhận được hàng"
                                                }
                                              />
                                            </Steps>
                                          </div>
                                        }
                                      >
                                        <p className="text-left">
                                          Trạng thái: Xem tại đây
                                        </p>
                                      </Popover>
                                    </div>
                                    <div className="flex flex-row justify-start gap-2">
                                      <a
                                        className="mt-3 text-green-500 inline-flex items-center"
                                        onClick={() => {
                                          dispatch({
                                            type: OPEN_FORM_MODAL,
                                            Component: (
                                              <OrderdetailComponent
                                                detail={item.chitietdh}
                                              />
                                            ),
                                            title: "CHI TIẾT ĐƠN HÀNG",
                                            width: 1200,
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
                                          className="w-4 h-4"
                                          viewBox="0 0 24 24"
                                        >
                                          <path d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                      </a>
                                      {_.filter(item?.chitietdh,e=>e.ngaynhan)?.length === item?.chitietdh?.length ? <a
                                        className="mt-3 text-green-500 inline-flex items-center"
                                        onClick={() => {
                                          item.danhanhang = !item.danhanhang;
                                          dispatch({
                                            type: RECEIVED_ORDER_ACTION,
                                            detail: item,
                                          });
                                        }}
                                      >
                                        ĐÃ NHẬN HÀNG
                                        <svg
                                          fill="none"
                                          stroke="currentColor"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          className="w-4 h-4"
                                          viewBox="0 0 24 24"
                                        >
                                          <path d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                      </a> : null}
                                    </div>
                                    <div className="flex flex-row justify-start">
                                      <a
                                        className="mt-3 text-red-600 inline-flex items-center"
                                        onClick={() => {
                                          dispatch({
                                            type: OPEN_FORM_MODAL,
                                            Component: (
                                              <OrderdetailComponent
                                                detail={item.chitietdh}
                                              />
                                            ),
                                            title: "CHI TIẾT ĐƠN HÀNG",
                                            width: 1200,
                                          });
                                        }}
                                      >
                                        TRẢ HÀNG/ HOÀN TIỀN
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </section>
                        );
                      })}
                    </Carousel>
                  ) : (
                    <div className="h-full bg-gradient-to-r from-green-50 to-green-100 flex justify-center items-center">
                      <Empty
                        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                        imageStyle={{
                          height: 100,
                        }}
                        description={
                          <div className="flex flex-col gap-y-2">
                            <span className="text-left">
                              Bạn chưa có đơn hàng nào.
                            </span>
                            <button
                              className="button-3d-green"
                              onClick={() => {
                                history.push("/trang-chu");
                              }}
                            >
                              MUA SẮM NGAY
                            </button>
                          </div>
                        }
                      >
                        {" "}
                      </Empty>
                    </div>
                  )}
                </TabPane>
              </Tabs>
            </div>
          ) : (
            <PageNotFound />
          )}
        </>
      )}
    </>
  );
}
