import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Action from "../../Common/Const/Cart/CartConst";
import _ from "lodash";
import { IMAGE_PRODUCT_URL } from "../../Common/Const/Cart/CartConst";
import {
  FIND_FEES_GOSHIP_ACTION,
} from "../../Common/Action/Checkout/CheckoutAction";
import { history } from "../../libs/History/history";
import {
  FIRST_CURRENT,
  UPDATE_CURRENT,
} from "../../Common/Const/Checkout/CheckoutConst";
import { Switch } from "antd";
import { OPEN_FORM_MODAL } from "../../Common/Const/Modal/ModalConst";
import LoginForm from "../Modal/LoginForm";
import { notify } from "../../libs/Notify/Notify";
import * as MESSAGE from "../../Common/Const/Notify/NotifyConst";
import FormAddressComponent from "../Checkout/FormAddressComponent";
import {
  GET_ADDRESS_DETAIL,
  VISIBLE_SELECT_TAG,
} from "../../Common/Const/Order/OrderConst";
import { ADD_WISHLIST_ACTION } from "../../Common/Action/Authentication/AuthAction";
import { TITLE_LOGIN } from "../../Common/Const/Auth/AuthConst";

export default function TableCart({ checkout }) {
  const dispatch = useDispatch();
  const { carts, allStick } = useSelector(
    (state) => state.CartReducer
  );
  const { address } = useSelector((state) => state.AddressReducer);
  const { credentials } = useSelector((state) => state.AuthReducer);
  const { formOne } = useSelector((state) => state.StatusReducer);
  const { fee } = useSelector((state) => state.CheckoutReducer);
  const addressDefault = _.find(address, (e) => e.macdinh === true);

  const dispatchAddress = () => {
    dispatch({
      type: OPEN_FORM_MODAL,
      Component: <FormAddressComponent />,
      title: "CHỌN ĐỊA CHỈ GIAO HÀNG",
      width: 700,
    });

    dispatch({
      type: GET_ADDRESS_DETAIL,
      detail: null,
      edit: false,
    });

    dispatch({
      type: VISIBLE_SELECT_TAG,
    });
  };

  const handleSubmit = () => {
    if ((!credentials || credentials == "undefined") && formOne.point) {
      dispatch({
        type: OPEN_FORM_MODAL,
        Component: <LoginForm />,
        title: "Đăng nhập",
        width: 600,
      });
    } else if (!addressDefault) {
      dispatchAddress();
    } else if (!fee.total_fee) {
      notify("warning", "Vui lòng chọn hình thức vận chuyển");
    } else {
      // setCurrent(current + 1);
      dispatch({
        type: UPDATE_CURRENT,
        increase: true,
      });
      window.scrollTo(0, 0);
    }
  };

  const renderButton = () => {
    return carts?.length >0 ? _?.reduce(
      _.filter(carts,e=>e.stick),
      (total, sp) => {
        return (total += (sp.dongia - (sp.dongia * sp.giamgia) / 100) * sp.sl);
      },
      0
    ) > 0 ? (
      <>
        <div className="space-y-1 text-right">
          <p>
            Tổng tiền:
            <span className="font-semibold">
              {_.reduce(
                _.filter(carts,e=>e.stick),
                (total, sp) => {
                  return (total +=
                    (sp.dongia - (sp.dongia * sp.giamgia) / 100) * sp.sl);
                },
                0
              ).toLocaleString()}
              đ
            </span>
          </p>
          <p className="text-sm dark:text-coolGray-400">
            Chưa bao gồm phí vận chuyển
          </p>
        </div>
        {!checkout ? (
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="button-default rounded-md text-responsive"
              onClick={() => {
                history.push("/trang-chu");
              }}
            >
              Tiếp tục mua sắm
            </button>
            <button
              type="button"
              className="button-primary rounded-md text-responsive"
              onClick={() => {
                dispatch({
                  type: FIRST_CURRENT,
                });
                history.push("/thanh-toan");
              }}
            >
              Thanh toán
            </button>
          </div>
        ) : (
          <div className="flex justify-end space-x-4">
            <button
              className="button-default rounded-md text-responsive"
              onClick={() => {
                dispatch({
                  type: UPDATE_CURRENT,
                  increase: false,
                });
                window.scrollTo(0, 0);
              }}
            >
              Trở lại
            </button>
            {_?.filter(carts, (e) => e.stick)?.length === 0 ? (
              <button
                type="button"
                className="button-3d-gray  cursor-not-allowed"
                onClick={() => {
                  notify("warning", MESSAGE.EMPTY_SELECT_CART_WARNING);
                }}
              >
                Thanh toán
              </button>
            ) : (
              <button
                type="button"
                className="button-primary rounded-md text-responsive"
                onClick={() => handleSubmit()}
              >
                Xác Nhận
              </button>
            )}
          </div>
        )}
      </>
    ) : (
      null
    ) :<div className="flex flex-row flex-wrap justify-center text-black text-opacity-70">
    <span>Chưa có sản phẩm nào trong giỏ hàng</span>
  </div>
  };

  return (
    <>
      <div className="bg-gray-50 shadow-md flex flex-col p-6 space-y-4 fold:w-full sm:p-10">
        <div className="flex flex-row w-full">
          {checkout ? null : <div className="w-1/2 flex justify-start">
            <Switch
              checked={allStick}
              onChange={(e) => {
                if(carts?.length >0){
                  dispatch({
                    type: Action.SET_ALL_STICK,
                    stick: e,
                  });
                  if (checkout) {
                    if (addressDefault) {
                      dispatch({
                        type: FIND_FEES_GOSHIP_ACTION,
                        addressDefault,
                      });
                    }
                  }
                }
              }}
            />
          </div>}
          <div className="w-1/2 flex justify-start">
            <h2 className="text-xl text-responsive lg:text-xl font-semibold">
              GIỎ HÀNG
            </h2>
          </div>
        </div>
        <ul className="flex flex-col divide-y divide-gray-700">
          {_?.map(checkout ? _?.filter(carts,(item)=>item.stick) : carts, (item, i) => {
            return (
              <li className="flex flex-col py-6 sm:flex-row sm:justify-between" key={i}>
                <div className="flex w-full space-x-2 sm:space-x-4">
                  {checkout ? null : <Switch
                    size="small"
                    checked={item.stick}
                    onClick={(e) => {
                      dispatch({
                        type: Action.SET_STICK,
                        stick: !item.stick,
                        index: i,
                      });
                      if (checkout) {
                        if (addressDefault) {
                          dispatch({
                            type: FIND_FEES_GOSHIP_ACTION,
                            addressDefault,
                          });
                        }
                      }
                    }}
                  />}
                  <img
                    className="image-responsive flex-shrink-0 object-cover w-20 h-20 dark:border-transparent rounded outline-none sm:w-32 sm:h-32 dark:bg-coolGray-500"
                    src={`${IMAGE_PRODUCT_URL}/${item.hinhanh}`}
                    alt="Bách Mộc"
                  />
                  <div className="flex flex-col justify-between w-full pb-4">
                    <div className="flex justify-between w-full pb-2 space-x-2">
                      <div className="space-y-1">
                        <a href={"/chi-tiet/" + item.masp}>
                          <h3 className="text-xs text-left font-semibold leading-snug sm:pr-8 hover:text-green-700 scale-105">
                            {item.tensp}
                          </h3>
                        </a>
                        <p className="text-xs text-left text-gray-500">
                          {item?.loaisp?.tenloai}
                        </p>
                        <p className="text-xs text-left text-gray-500">
                          {item?.thuonghieu?.tenth}
                        </p>
                        <p className="text-xs text-left text-gray-500">
                          {item?.nhacungcap?.tenncc}
                        </p>
                        <p className="text-xs text-left text-gray-500 font-bold duo:hidden">
                          {item?.dongia?.toLocaleString()}
                        </p>
                        {checkout ? null : (
                          <p className="custom-number-input h-10 w-32">
                            <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                              <button
                                onClick={() => {
                                  dispatch({
                                    type: Action.UPDATE_QUANTITY_CART,
                                    increase: false,
                                    index: i,
                                  });
                                }}
                                className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
                              >
                                <span className="m-auto text-2xl font-thin">
                                  −
                                </span>
                              </button>
                              <input
                                type="number"
                                className="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700"
                                name="custom-input-number"
                                value={item.sl}
                              />
                              <button
                                onClick={() => {
                                  dispatch({
                                    type: Action.UPDATE_QUANTITY_CART,
                                    increase: true,
                                    index: i,
                                  });
                                }}
                                className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
                              >
                                <span className="m-auto text-2xl font-thin">
                                  +
                                </span>
                              </button>
                            </div>
                          </p>
                        )}
                      </div>
                      <div className="text-right fold:hidden duo:block">
                        <p className="text-lg font-semibold">
                          {item?.giamgia > 0
                            ? (
                                item.dongia -
                                (item.dongia * item.giamgia) / 100
                              ).toLocaleString() + "đ"
                            : item?.dongia?.toLocaleString() + "đ"}
                        </p>
                      </div>
                    </div>
                    {checkout ? null : (
                      <div className="flex text-sm divide-x">
                        <button
                          type="button"
                          className="flex items-center px-2 py-1 pl-0 space-x-1"
                          onClick={() => {
                            dispatch({
                              type: Action.REMOVE_PRODUCT_TO_CART,
                              masp: item.masp,
                            });
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            className="w-4 h-4 fill-current"
                          >
                            <path d="M96,472a23.82,23.82,0,0,0,23.579,24H392.421A23.82,23.82,0,0,0,416,472V152H96Zm32-288H384V464H128Z" />
                            <rect width={32} height={200} x={168} y={216} />
                            <rect width={32} height={200} x={240} y={216} />
                            <rect width={32} height={200} x={312} y={216} />
                            <path d="M328,88V40c0-13.458-9.488-24-21.6-24H205.6C193.488,16,184,26.542,184,40V88H64v32H448V88ZM216,48h80V88H216Z" />
                          </svg>
                          <span>Xóa</span>
                        </button>
                        <button
                          type="button"
                          className="flex items-center px-2 py-1 space-x-1"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            className="w-4 h-4 fill-current"
                          >
                            <path d="M453.122,79.012a128,128,0,0,0-181.087.068l-15.511,15.7L241.142,79.114l-.1-.1a128,128,0,0,0-181.02,0l-6.91,6.91a128,128,0,0,0,0,181.019L235.485,449.314l20.595,21.578.491-.492.533.533L276.4,450.574,460.032,266.94a128.147,128.147,0,0,0,0-181.019ZM437.4,244.313,256.571,425.146,75.738,244.313a96,96,0,0,1,0-135.764l6.911-6.91a96,96,0,0,1,135.713-.051l38.093,38.787,38.274-38.736a96,96,0,0,1,135.765,0l6.91,6.909A96.11,96.11,0,0,1,437.4,244.313Z" />
                          </svg>
                          <span
                          onClick={() => {
                            if (credentials) {
                              const wishlist = {
                                sanpham: item,
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
                          >Yêu thích</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        {renderButton()}
      </div>
    </>
  );
}
