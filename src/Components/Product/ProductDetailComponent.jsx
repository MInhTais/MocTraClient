import React, { useEffect, useState } from "react";
import { Rate, Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import * as Type from "../../Common/Const/Cart/CartConst";
import ReviewComponent from "./ReviewComponent";
import { ADD_WISHLIST_ACTION } from "../../Common/Action/Authentication/AuthAction";
import { OPEN_FORM_MODAL } from "../../Common/Const/Modal/ModalConst";
import LoginForm from "../Modal/LoginForm";
import _ from "lodash";
import { notify } from "../../libs/Notify/Notify";
import { UPDATE_VIEW_PRODUCT_ACTION } from "../../Common/Action/Product/Product";
import moment from "moment";
import ReactGa from "react-ga";
import { HeartOutlined } from "@ant-design/icons";
import { FIND_ALL_COMMENT_ACTION } from "../../Common/Action/Review/ReviewAction";
import { history } from "../../libs/History/history";
import { TITLE_LOGIN } from "../../Common/Const/Auth/AuthConst";

const { TabPane } = Tabs;

const contentStyle = {
  height: "350px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  backgroundPosition: "center",
  backgroundSize: "100%",
  backgroundRepeat: "no-repeat",
};
export default function ProductDetailComponent(props) {
  const dispatch = useDispatch();
  const { credentials } = useSelector((state) => state.AuthReducer);
  const [quantity, setQuantity] = useState(1);
  const { product, viewDetail, setViewDetail, size } = props;
  const { carts,waiting } = useSelector((state) => state.CartReducer);
  const [timeLeft, setTimeLeft] = useState(0);
  const { reviews } = useSelector((state) => state.ReviewReducer);
  useEffect(() => {
    if (viewDetail) {
      if (!_.isNull(product) || !_.isUndefined(product)) {
        setTimeLeft(0);
        const intervalId = setInterval(() => {
          setTimeLeft((t) => {
            if (t === 4) {
              dispatch({
                type: UPDATE_VIEW_PRODUCT_ACTION,
                product,
              });
              setViewDetail(false);
            }
            return (t = viewDetail === false ? 0 : t + 1);
          });
        }, 1000);
        return () => clearInterval(intervalId);
      }
    }

    dispatch({
      type: FIND_ALL_COMMENT_ACTION,
      masp: product?.masp,
    });
  }, [product]);

  const renderAddButton = (product) => {
    if (product?.conlai === 0 || !product?.trangthai) {
      return (
        <button
          className="text-md cursor-not-allowed flex ml-auto text-white bg-gray-500 border-0 py-2 px-6 
                  text-responsive
                  focus:outline-none hover:bg-gray-600 rounded"
          disabled
        >
          HẾT HÀNG
        </button>
      );
    } else {
      return (
        <button
        disabled={waiting}
          className="flex ml-auto text-white bg-green-500 border-0 py-2 px-4 
                  text-md
                  focus:outline-none hover:bg-green-600 rounded"
          onClick={() => {
            product.sl = quantity;
            product.stick = false;
            let sanpham = _.find(carts, (e) => e.masp === product?.masp);
            if (product.sl + (sanpham ? sanpham?.sl : 0) > product?.conlai) {
              notify("warning", "Đã quá số lượng, vui lòng thanh toán");
            } else {
              dispatch({
                type: Type.WAITING_ADD_CART
              })
              dispatch({
                type: Type.ADD_CART_QUANTITY_FREE,
                sanpham: product,
                sl: quantity,
              });
              setQuantity(1);
            }
          }}
        >
          THÊM SẢN PHẨM
        </button>
      );
    }
  };

  const renderAddFastButton = (product) => {
    if (product?.conlai === 0 || !product?.trangthai) {
      return (
        null
      );
    } else {
      return (
        <button
          className="button-3d-green"
          onClick={() => {
            product.sl = quantity;
            product.stick = false;
            let sanpham = _.find(carts, (e) => e.masp == product?.masp);
            if (product.sl + (sanpham ? sanpham?.sl : 0) > product?.conlai) {
              notify("warning", "Đã quá số lượng, vui lòng thanh toán");
            } else {
              dispatch({
                type: Type.ADD_CART,
                sanpham: product,
              });
              ReactGa.event({
                category: "Click",
                action: "add to cart",
              });
            }
            history.push("/thanh-toan");
          }}
        >
          MUA NGAY
        </button>
      );
    }
  };

  const updateQuantity = (increase) => {
    let sanpham = _.find(carts, (e) => e.masp == product?.masp);
    if (increase) {
      if (quantity + (sanpham ? sanpham.sl : 0) < product?.conlai) {
        setQuantity(quantity + 1);
      }
    } else {
      if (quantity - 1 > 0) {
        setQuantity(quantity - 1);
      }
    }
  };

  return (
    <>
      <section className="w-full text-gray-600 body-font overflow-hidden border-gray-500 bg-green-300 bg-opacity-5 shadow-xl rounded-md">
        <div className="md:containerTailwind px-5 py-16 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className={"lg:w-2/3 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0"}>
              <div className="w-full flex flex-col justify-start">
                <h2 className="text-sm text-left title-font text-gray-500 tracking-widest">
                  TÊN SẢN PHẨM
                </h2>
                <h1 className="text-gray-900 text-left text-2xl title-font font-medium">
                  {product.tensp}
                </h1>
                <h3 className="w-full flex flex-row justify-start gap-2">
                  <Rate
                    character={<HeartOutlined />}
                    defaultValue={5}
                    disabled
                  />
                  <label>({reviews?.length + " đánh giá"})</label>
                </h3>
                <div className="w-full justify-start bg-gradient-to-r from-green-400 to-green-600 p-2 rounded-md">
                  <label
                    className={"text-4xl font-bold w-full text-left text-white"}
                  >
                    {product?.giamgia > 0
                      ? (
                          product.dongia -
                          (product.dongia * product.giamgia) / 100
                        ).toLocaleString() + "đ"
                      : product.dongia?.toLocaleString()}
                  </label>
                  {product.giamgia > 0 ? (
                    <div className="w-full flex flex-row gap-2">
                      <div className="w-1/2 flex flex-row justify-start gap-2">
                        <label className="line-through text-gray-300">
                          {product.dongia?.toLocaleString() + "đ"}
                        </label>
                        <label className="text-white">
                          {"-" + product.giamgia + "%"}
                        </label>
                      </div>
                      <div className="w-1/2 flex flex-row justify-end">
                        <label className="text-white">
                          {"Đã bán " + product.daban}
                        </label>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
              <Tabs defaultActiveKey="1" centered className="flex mb-4">
                <TabPane
                  tab="Mô tả"
                  key="1"
                  className="flex-grow text-green-500 border-b-2 border-green-500 py-2 px-1"
                >
                  <p className="leading-relaxed mb-4">
                    {!product.mota
                      ? "Chưa có mô tả cho sản phẩm này"
                      : product.mota}
                  </p>
                </TabPane>
                <TabPane
                  tab="Đánh giá"
                  key="2"
                  className="flex-grow border-b-2 border-gray-300 py-2 px-1"
                >
                  <ReviewComponent reviews={reviews} detail={true} />
                </TabPane>
                <TabPane
                  tab="Chi tiết"
                  key="3"
                  className="flex-grow border-b-2 border-gray-300 py-2 px-1 h-72 overflow-auto"
                >
                  <div className="flex border-t border-gray-200 py-2 mr-2">
                    <span className="text-gray-500">Loại</span>
                    <span className="ml-auto text-gray-900">
                      {product?.loaisp?.tenloai}
                    </span>
                  </div>
                  <div className="flex md:flex-row border-t border-gray-200 py-2 mr-2">
                    <span className="text-gray-500">Thương hiệu</span>
                    <span className="ml-auto text-gray-900">
                      {product?.thuonghieu?.tenth}
                    </span>
                  </div>
                  <div className="flex border-t border-gray-200 py-2 mr-2">
                    <span className="text-gray-500">Trọng lượng</span>
                    <span className="ml-auto text-gray-900">
                      {product.trongluong}
                      {product.sanpham ? product.sanpham.dvd.tendvd : ""}
                    </span>
                  </div>
                  <div className="flex border-t border-gray-200 py-2 mr-2">
                    <span className="text-gray-500">Sử dụng</span>
                    <span className="ml-auto text-gray-900">
                      {!product.sudung
                        ? "Chưa có hướng dẫn sử dụng cho sản phẩm này"
                        : product.sudung}
                    </span>
                  </div>
                  <div className="flex border-t border-gray-200 py-2 mr-2">
                    <span className="text-gray-500">Bảo quản</span>
                    <span className="ml-auto text-gray-900">
                      {!product.baoquan
                        ? "Chưa có hướng dẫn bảo quản cho sản phẩm này"
                        : product.baoquan}
                    </span>
                  </div>
                  <div className="flex border-t border-b border-gray-200 py-2 mr-2">
                    <span className="text-gray-500">Hiện còn: </span>
                    <span className="ml-auto text-gray-900 truncate">
                      {product?.conlai}
                    </span>
                  </div>
                  <div className="flex border-t border-b border-gray-200 py-2 mr-2">
                    <span className="text-gray-500">Quan tâm: </span>
                    <span className="ml-auto text-gray-900 truncate">
                      {product?.views}
                    </span>
                  </div>
                  <div className="flex border-t border-b border-gray-200 py-2 mr-2">
                    <span className="text-gray-500">Ngày hết hạn: </span>
                    <span className="ml-auto text-gray-900 truncate">
                      {moment(product?.ngayhethan).format("DD/MM/YYYY")}
                    </span>
                  </div>
                  <div className="flex border-t border-b border-gray-200 py-2 mr-2">
                    <span className="text-gray-500">Cửa hàng: </span>
                    <span className="ml-auto text-gray-900 truncate">
                      {product?.nhacungcap?.cuahang
                        ? product?.nhacungcap?.cuahang?.tencuahang
                        : "Mộc Trà"}
                    </span>
                  </div>
                  <div className="flex border-t border-b mb-6 border-gray-200 py-2 mr-2">
                    <span className="text-gray-500">Nhà cung cấp</span>
                    <span
                      className="ml-auto text-gray-900 truncate"
                      title={product?.nhacungcap?.tenncc}
                    >
                      {product?.nhacungcap?.tenncc.length > 40
                        ? product?.nhacungcap?.tenncc.slice(0, 40) + "..."
                        : product?.nhacungcap?.tenncc}
                    </span>
                  </div>
                </TabPane>
              </Tabs>

              <div className="flex fold:flex-col duo:flex-row">
                <div className="w-2/4 fold:w-full flex flex-row">
                  <div className="w-2/4 flex justify-start">
                    {renderAddFastButton(product)}
                  </div>
                  <div className="w-2/4 flex justify-center ">
                    <div className="flex justify-center w-full">
                      <svg
                        className="fill-current text-gray-600 w-3 cursor-pointer transition duration-500 ease-in-out hover:text-green-400 transform hover:-translate-y-1 hover:scale-110"
                        viewBox="0 0 448 512"
                        onClick={() => updateQuantity(false)}
                      >
                        <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                      </svg>
                      <input
                        className="mx-2 border text-center w-8"
                        type="text"
                        value={quantity}
                        disabled
                        onChange={(e) => {
                          if (Number(e) <= 0) {
                            setQuantity(1);
                          } else {
                            setQuantity(e.target.value);
                          }
                        }}
                      />
                      <svg
                        className="fill-current text-gray-600 w-3 cursor-pointer transition duration-500 ease-in-out hover:text-green-400 transform hover:-translate-y-1 hover:scale-110"
                        viewBox="0 0 448 512"
                        onClick={() => updateQuantity(true)}
                      >
                        <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="w-2/4 fold:w-full fold:mt-4 flex flex-row">
                  <div className="w-3/4 fold:w-3/4 duo:w-3/4">
                    {renderAddButton(product)}
                  </div>
                  <div className="w-1/4 fold:w-1/4 duo:w-1/4 ">
                    <button
                      className="w-10 rounded-full h-10 bg-green-200 p-0 border-0 inline-flex items-center justify-center text-green-500 ml-4 hover:animate-bounce"
                      onClick={() => {
                        if (credentials) {
                          const wishlist = {
                            sanpham: product,
                          };
                          dispatch({
                            type: ADD_WISHLIST_ACTION,
                            wishlist,
                          });
                        } else {
                          dispatch({
                            type: OPEN_FORM_MODAL,
                            Component: <LoginForm />,
                            title: TITLE_LOGIN,
                            width: 600,
                          });
                        }
                      }}
                    >
                      <svg
                        fill="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={"fold:w-full lg:w-1/3 flex justify-center h-140"}
              style={{
                ...contentStyle,
                backgroundSize: size?.width > 780 ? "100%" : "80%",
                backgroundImage: `url(http://localhost:8080/images/product/${product.hinhanh})`,
              }}
            >
              <img
                alt="Bách Mộc"
                src={
                  !product.hinhanh
                    ? ""
                    : "http://localhost:8080/images/product/" + product.hinhanh
                }
                className="flex justify-center w-full opacity-0"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
