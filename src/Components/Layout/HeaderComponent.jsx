import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { Redirect } from "react-router";
import * as Action from "../../Common/Action/Category/CategoryAction";
import * as CartAction from "../../Common/Const/Cart/CartConst";
import * as AuthType from "../../Common/Const/Auth/AuthConst";
import * as TypeModal from "../../Common/Const/Modal/ModalConst";
import LoginForm from "../Modal/LoginForm";
import SignupForm from "../Modal/SignupForm";
import _ from "lodash";
import MenuComponent from "./MenuComponent";
import { CLOSE_DRAWER, OPEN_FORM } from "../../Common/Const/Admin/Drawer";
import { Avatar, Popover } from "antd";
import { Field, Form, Formik } from "formik";
import { searchSchema } from "../../validates/ProductValidation";
import { history } from "../../libs/History/history";
import {
  CloseCircleOutlined,
  MenuOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import TableCart from "../Cart/TableCart";
import { authLink } from "./AuthMenu/AuthLink";
import { GET_ALL_PRODUCT_BY_KEYWORD_ACTION } from "../../Common/Action/Product/Product";
import { ADD_SEARCH_KEY } from "../../Common/Const/Product/ProductConst";

export default function HeaderComponent() {
  const dispatch = useDispatch();
  const { categories } = useSelector(
    (state) => state.CategoryReducer.categories
  );
  const { carts } = useSelector((state) => state.CartReducer);
  const { credentials } = useSelector((state) => state.AuthReducer);

  useEffect(() => {
    dispatch({ type: Action.FIND_ALL_CATEGORIES_ACTION });
    if (size.width >= 780) {
      dispatch({
        type: CLOSE_DRAWER,
      });
    }
  }, []);
  const logo = "http://localhost:8080/images/background/logo.png";

  const size = useWindowSize();
  function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined,
    });

    useEffect(() => {
      function handleResize() {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowSize;
  }

  const handleSubmit = (values) => {
    const { keyword } = values;
    window.location.href = `/search/${keyword}`;
  };

  const sumQuantity = () => {
    if (!carts) {
      return 0;
    } else {
      return carts
        .map((item) => item.sl)
        .reduce((total, sl) => (total += sl), 0);
    }
  };

  const amount = () => {
    if (!carts) {
      return 0;
    } else {
      return carts
        .reduce((sum, sp, i) => {
          return (sum += sp.dongia * sp.sl);
        }, 0)
        .toLocaleString();
    }
  };

  const logout = () => {
    dispatch({
      type: AuthType.LOGOUT,
    });
  };
  const contentStyle = {
    height: "50px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    backgroundPosition: "center",
    backgroundSize: "100%",
    backgroundRepeat: "no-repeat",
  };
  const renderTag = () => {
    let cat = _.sample(categories);
    return _.map(cat?.loai, (item, i) => {
      return (
        <span
          key={i}
          className="cursor-pointer inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
          onClick={() => {
            dispatch({
              type: GET_ALL_PRODUCT_BY_KEYWORD_ACTION,
              tensp: item.tenloai,
              loai: true,
            });
            let search = {
              title: item.tenloai,
              type: "keyword",
              url: `/search/${item.tenloai}`,
            };
            dispatch({
              type: ADD_SEARCH_KEY,
              search,
            });
            history.push(`/search/${item.tenloai}`);
          }}
        >
          #{item.tenloai}
        </span>
      );
    });
  };

  return (
    <>
      <div>
        <div className="offcanvas-menu-overlay" />
        <div className="offcanvas-menu-wrapper">
          <div className="offcanvas__close">+</div>
          <ul className="offcanvas__widget">
            <li>
              <span className="icon_search search-switch" />
            </li>
            <li>
              <a href="#">
                <span className="icon_heart_alt" />
                <div className="tip">2</div>
              </a>
            </li>
            <li>
              <a href="#">
                <span className="icon_bag_alt" />
                <div className="tip">2</div>
              </a>
            </li>
          </ul>
          <div className="offcanvas__logo">
            <NavLink to="/trang-chu">
              <img src="http://localhost:8080/images/background/logo.png" alt />
            </NavLink>
          </div>
          <div id="mobile-menu-wrap" />
          <div className="offcanvas__auth">
            <a href="#">Đăng nhập</a>
            <a href="#">Đăng ký</a>
          </div>
        </div>
        <header className="header fixed top-0 w-full z-9">
          <div className="container-fluid">
            <div className="flex flex-row">
              <div className="fold:w-1/3 lg:w-1/5">
                <div className="flex flex-col">
                  <div className="header__logo">                  
                      <NavLink to="/trang-chu">
                        <img className="w-20 h-12" src={`${logo}`} alt />
                      </NavLink>
                  </div>
                </div>
              </div>
              <div className="fold:hidden lg:block lg:w-3/5">
                <nav className="header__menu">
                  <ul>
                    <li className="active">
                      <a href="/trang-chu">Trang chủ</a>
                    </li>
                    {credentials ? (
                      _.find(credentials?.roles, (e) => e === "MANAGER") ? (
                        <li>
                          <a href="#">QUẢN TRỊ</a>
                          <ul className="dropdown">
                            <li>
                              <NavLink to="/nha-cung-cap">Nhà cung cấp</NavLink>
                            </li>
                            <li>
                              <NavLink to="/nhom-loai">Nhóm Loại</NavLink>
                            </li>
                            <li>
                              <NavLink to="/loai-san-pham">
                                Loại Sản Phẩm
                              </NavLink>
                            </li>
                            <li>
                              <NavLink to="/san-pham">Sản Phẩm</NavLink>
                            </li>
                            <li>
                              <NavLink to="/phan-quyen">Phân Quyền</NavLink>
                            </li>
                            <li>
                              <NavLink to="/thong-ke-doanh-thu">
                                Thống Kê
                              </NavLink>
                            </li>
                          </ul>
                        </li>
                      ) : null
                    ) : null}
                    {credentials ? (
                      _.find(credentials?.roles, (e) => e === "STAFF") ? (
                        <li>
                          <a href="#">NHÂN VIÊN</a>
                          <ul className="dropdown">
                            <li>
                              <NavLink to="/nha-cung-cap">Nhà cung cấp</NavLink>
                            </li>
                            <li>
                              <NavLink to="/nhom-loai">Nhóm Loại</NavLink>
                            </li>
                            <li>
                              <NavLink to="/loai-san-pham">
                                Loại Sản Phẩm
                              </NavLink>
                            </li>
                            <li>
                              <NavLink to="/san-pham">Sản Phẩm</NavLink>
                            </li>
                            <li>
                              <NavLink to="/carousel">Carousel</NavLink>
                            </li>
                          </ul>
                        </li>
                      ) : null
                    ) : null}
                    <li>
                      <a href="#">Bách Mộc</a>
                      <ul className="dropdown">
                        <li>
                          <NavLink to="/gio-hang">Giỏ hàng</NavLink>
                        </li>
                        <li>
                          <NavLink to="/thanh-toan">Thanh toán</NavLink>
                        </li>
                        <li>
                          <NavLink to="/gioi-thieu">Giới thiệu</NavLink>
                        </li>
                        <li>
                          <NavLink to="/lien-he">Liên hệ</NavLink>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="fold:w-2/3 lg:w-1/5">
                <div className="header__right">
                  <ul className="header__right__widget">
                    <li>
                      <span className="icon_search search-switch" />
                    </li>
                    <li>
                      <a href="#">
                        <span className="icon_heart_alt" />
                        <div className="tip">2</div>
                      </a>
                    </li>
                    <li>
                      <Popover
                        placement="bottomLeft"
                        getPopupContainer={(node) => node.parentElement}
                        content={
                          <div className="flex flex-col h-80">
                            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                  <table className="min-w-full divide-y divide-gray-200">
                                    <tbody className="bg-white divide-y divide-gray-200">
                                      {_.map(carts, (cart, i) => (
                                        <tr
                                          key={i}
                                          className="hover:bg-green-50"
                                        >
                                          <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                              <div className="flex-shrink-0 h-10 w-10">
                                                <img
                                                  className="h-10 w-10 rounded-full"
                                                  src={
                                                    "http://localhost:8080/images/product/" +
                                                    cart.hinhanh
                                                  }
                                                  alt="Bách Mộc"
                                                />
                                              </div>
                                              <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">
                                                  {cart?.tensp?.length > 15
                                                    ? cart?.tensp?.slice(
                                                        0,
                                                        14
                                                      ) + "..."
                                                    : cart?.tensp}{" "}
                                                  x {cart?.sl}
                                                </div>
                                                <div className="text-sm text-gray-500"></div>
                                              </div>
                                            </div>
                                          </td>
                                          <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                              {cart?.dongia?.toLocaleString()}{" "}
                                              {cart?.dongia ? "đ" : null}
                                            </div>
                                          </td>
                                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <a
                                              onClick={() => {
                                                dispatch({
                                                  type: CartAction.REMOVE_PRODUCT_TO_CART,
                                                  masp: cart?.masp,
                                                });
                                              }}
                                              className="text-indigo-600 hover:text-indigo-900"
                                            >
                                              <CloseCircleOutlined />
                                            </a>
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                    {carts?.length > 0 ? (
                                      <tfoot>
                                        <tr className="flex justify-center gap-2 m-3 ">
                                          <td>
                                            <button
                                              onClick={() => {
                                                history.push("/gio-hang");
                                              }}
                                              className="p-2 text-blue-50 text-xs rounded-md  bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700"
                                            >
                                              Giỏ hàng
                                            </button>
                                          </td>
                                          <td>
                                            <button
                                              onClick={() => {
                                                history.push("/thanh-toan");
                                              }}
                                              className="p-2 text-blue-50 text-xs rounded-md  bg-red-500 hover:bg-red-600"
                                            >
                                              Thanh toán
                                            </button>
                                          </td>
                                        </tr>
                                      </tfoot>
                                    ) : (
                                      <div className="max-w-sm rounded overflow-hidden shadow-lg">
                                        <img
                                          className="w-full"
                                          src="https://prorisestore.com/assets/icons/empty.png"
                                          alt="Bách Mộc"
                                        />
                                        <div className="px-6 py-4">
                                          <div className="font-bold text-xl mb-2">
                                            Chưa có sản phẩm nào
                                          </div>
                                        </div>
                                        <div className="px-6 pt-4 pb-2">
                                          {renderTag()}
                                        </div>
                                      </div>
                                    )}
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>
                        }
                      >
                        <a href="#">
                          <span className="icon_bag_alt" />
                          <div className="tip">{sumQuantity()}</div>
                        </a>
                      </Popover>
                    </li>
                  </ul>

                  <div className="header__right__auth ml-10">
                    {!credentials ? (
                      <>
                        <a
                          onClick={() => {
                            dispatch({
                              type: TypeModal.OPEN_FORM_MODAL,
                              Component: <LoginForm />,
                              title: "Đăng nhập",
                              width: 500,
                            });
                          }}
                        >
                          Đăng nhập
                        </a>
                        <a
                          onClick={() => {
                            const action = {
                              type: TypeModal.OPEN_FORM_MODAL,
                              Component: <SignupForm />,
                              title: "Đăng ký",
                              width: 900,
                            };
                            dispatch(action);
                          }}
                        >
                          Đăng ký
                        </a>
                      </>
                    ) : (
                      <>
                        <Popover
                          placement="bottom"
                          getPopupContainer={(node) => node.parentElement}
                          content={
                            <div className="mt-2 py-2 w-48 bg-white rounded-md shadow-xl flex flex-col overflow-auto h-40">
                              {_.find(
                                credentials?.roles,
                                (e) => e === "MANAGER"
                              ) ? (
                                <NavLink
                                  className="block px-4 py-2 text-gray-800 hover:text-white hover:bg-green-500"
                                  to={"/nha-cung-cap"}
                                >
                                  Quản Trị
                                </NavLink>
                              ) : null}
                              {_.find(
                                credentials?.roles,
                                (e) => e === "STAFF"
                              ) ? (
                                <NavLink
                                  className="block px-4 py-2 text-gray-800 hover:text-white hover:bg-green-500"
                                  to={"/nha-cung-cap"}
                                >
                                  Nhân viên
                                </NavLink>
                              ) : null}
                              {_.map(authLink, (item, i) => {
                                return (
                                  <NavLink
                                    className="block px-4 py-2 text-gray-800 hover:text-white hover:bg-green-500"
                                    to={item.url}
                                    key={i}
                                  >
                                    {item.name}
                                  </NavLink>
                                );
                              })}

                              <a
                                className="block px-4 py-2 text-gray-800 hover:text-white hover:bg-green-500"
                                onClick={() => {
                                  dispatch({
                                    type: AuthType.LOGOUT,
                                  });
                                }}
                              >
                                Đăng xuất
                              </a>
                            </div>
                          }
                        >
                          <Avatar
                            className="bottom-2"
                            shape="circle"
                            src={
                              credentials?.hinhanh
                                ? "http://localhost:8080/images/user/" +
                                  credentials?.hinhanh
                                : "https://joeschmoe.io/api/v1/random"
                            }
                          />
                        </Popover>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="canvas__open">
              <i
                className="fa fa-bars"
                onClick={() => {
                  dispatch({
                    type: OPEN_FORM,
                    Component: <MenuComponent />,
                    title: "MENU",
                    placement: "left",
                    footer: false,
                  });
                }}
              />
            </div>
          </div>
        </header>
      </div>

      {/* <div className="pre-header">
        <div className="container p-4">
          <div className="flex flex-row">
            <div className="w-1/2 flex justify-start additional-shop-info">
              <ul className="list-unstyled list-inline">
                <li>
                  <i className="fa fa-phone text-base sm:text-xs md:text-lg lg:text-lg xl:text-xl" />
                  <span className="text-base sm:text-xs md:text-lg lg:text-lg xl:text-xl">
                    +84 7023 62681
                  </span>
                </li>
                <li className="langs-block">
                  <a
                    href=""
                    className="current"
                    className="text-base sm:text-xs md:text-lg lg:text-lg xl:text-xl"
                  >
                    Việt Nam
                  </a>
                </li>
              </ul>
            </div>
            <div className="w-1/2 flex justify-end additional-nav mr-5">
              <ul className="list-unstyled list-inline pull-right">
                <li>
                  <NavLink
                    to="/thanh-toan"
                    className="text-base sm:text-xs md:text-lg lg:text-lg xl:text-xl"
                  >
                    Thanh toán
                  </NavLink>
                </li>
                {!credentials || credentials === "undefined" ? (
                  <>
                    <li>
                      <a
                        className="text-base cursor-pointer sm:text-xs md:text-lg lg:text-lg xl:text-xl"
                        onClick={() => {
                          dispatch({
                            type: TypeModal.OPEN_FORM_MODAL,
                            Component: <LoginForm />,
                            title: "Đăng nhập",
                            width: 500,
                          });
                        }}
                      >
                        Đăng nhập
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-base sm:text-xs md:text-lg lg:text-lg xl:text-xl"
                        onClick={() => {
                          const action = {
                            type: TypeModal.OPEN_FORM_MODAL,
                            Component: <SignupForm />,
                            title: "Đăng ký",
                            width: 900,
                          };
                          dispatch(action);
                        }}
                      >
                        Đăng kí
                      </a>
                    </li>
                  </>
                ) : (
                  <li>
                    <a className="text-responsive" onClick={() => logout()}>
                      <Avatar
                        className="bg-green-200 rounded-full"
                        shape={"circle"}
                        src="https://joeschmoe.io/api/v1/random"
                      />
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="header">
        <div className="container">
          <NavLink className="site-logo" to="/trang-chu">
            <div style={{ ...contentStyle, backgroundImage: `url(${logo})` }}>
              <img
                src="/assets/corporate/img/logos/logo-shop-red.png"
                alt="Bách Mộc"
                className="img-responsive opacity-0"
              />
            </div>
          </NavLink>
          <span
            className="mobile-toggler"
            onClick={() => {
              dispatch({
                type: OPEN_FORM,
                Component: <MenuComponent />,
                title: "MENU",
                placement: "left",
                footer: false,
              });
            }}
          >
            <i className="fa fa-bars" />
          </span>
          <div className="top-cart-block">
            <div className="top-cart-info">
              <a className="top-cart-info-count" style={{ cursor: "pointer" }}>
                {sumQuantity()}
              </a>
              <a className="top-cart-info-value" style={{ cursor: "pointer" }}>
                {amount()}
              </a>
            </div>
            <i className="fa fa-shopping-cart" />
            <div className="top-cart-content-wrapper">
              <div className="top-cart-content">
                <ul className="scroller" style={{ height: 250 }}>
                  {_.map(carts, (cart, i) => {
                    return (
                      <li li={i}>
                        <a href={"/images/product/" + cart.hinhanh}>
                          <img
                            src={"/images/product/" + cart.hinhanh}
                            alt="Bách Mộc"
                            width={37}
                            height={34}
                          />
                        </a>

                        <span className="cart-content-count">x {cart.sl}</span>
                        <strong>
                          <NavLink
                            className=" cursor-pointer truncate text-base fold:text-md lg:text-xl"
                            to={`/chi-tiet/${cart.masp}`}
                          >
                            {cart.tensp}
                          </NavLink>
                        </strong>
                        <em>{cart?.dongia?.toLocaleString()}</em>
                        <a
                          className="del-goods cursor-pointer"
                          onClick={() => {
                            dispatch({
                              type: CartAction.REMOVE_PRODUCT_TO_CART,
                              masp: cart.masp,
                            });
                          }}
                        >
                          &nbsp;
                        </a>
                      </li>
                    );
                  })}
                </ul>
                <div className="text-right flex flex-row flex-wrap justify-end mb-5">
                  <div>
                    <NavLink
                      to="/gio-hang"
                      className="button-primary text-white mr-2 rounded-md fold:p-4"
                    >
                      GIỎ HÀNG
                    </NavLink>
                  </div>
                  <div>
                    <NavLink
                      to="thanh-toan"
                      className="button-default ml-2 rounded-md fold:p-4"
                    >
                      THANH TOÁN
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="header-navigation">
            <ul>
              <li className="dropdown">
                <a
                  className="dropdown-toggle"
                  data-toggle="dropdown"
                  data-target="#"
                  style={{ cursor: "pointer" }}
                >
                  DANH MỤC
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <div className="header-navigation-content">
                      <div className="row">{renderCategory()}</div>
                    </div>
                  </li>
                </ul>
              </li>
              <li className="dropdown active">
                <a
                  className="dropdown-toggle"
                  data-toggle="dropdown"
                  data-target="#"
                  style={{ cursor: "pointer" }}
                >
                  Khác
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a>Cập nhật hồ sơ</a>
                  </li>
                  <li>
                    <NavLink to="/thanh-toan">Thanh toán</NavLink>
                  </li>
                  <li>
                    <a>Giới thiệu</a>
                  </li>
                  <li>
                    <NavLink to="/lien-he">Liên hệ</NavLink>
                  </li>
                </ul>
              </li>
              {renderAdmin()}
              {renderStaff()}
              {renderIsAuthenication()}
              <li className="flex flex-row justify-center">
                <Popover
                  placement="bottom"
                  trigger="click"
                  className="w-32"
                  content={() => {
                   return <div>
                      <Formik
                        initialValues={{
                          keyword: "",
                        }}
                        validationSchema={searchSchema}
                        onSubmit={handleSubmit}
                        render={(formikProps) => (
                          <Form className="flex flex-row flex-wrap justify-center w-full">
                            <div className="w-3/4">
                              <Field
                                type="text"
                                placeholder="Vui lòng nhập từ khóa"
                                name="keyword"
                                className="input-responsive h-16 mr-2"
                              />
                            </div>
                            <div className="w-1/4 h-full">
                              <button className="button-primary ml-2">TÌM</button>
                            </div>
                          </Form>
                        )}
                      />
                    </div>;
                  }}
                >
                  <a><SearchOutlined /></a>
                </Popover>
              </li>
            </ul>
          </div>
        </div>
      </div> */}
    </>
  );
}
