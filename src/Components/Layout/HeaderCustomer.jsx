import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import _ from "lodash";
import { Avatar, Popover, Tooltip, Badge } from "antd";
import { Formik } from "formik";
import {
  CloseCircleOutlined,
  HistoryOutlined,
  SearchOutlined,
  CommentOutlined,
} from "@ant-design/icons";
import {
  GET_ALL_PRODUCT_BY_KEYWORD_ACTION,
  GET_ALL_PRODUCT_BY_SEARCH_ACTION,
} from "../../Common/Action/Product/Product";
import { FIND_ALL_CATEGORIES_ACTION } from "../../Common/Action/Category/CategoryAction";
import {
  ADD_SEARCH_KEY,
  DELETE_SEARCH_KEY,
} from "../../Common/Const/Product/ProductConst";
import { history } from "../../libs/History/history";
import LoginForm from "../Modal/LoginForm";
import { OPEN_FORM_MODAL } from "../../Common/Const/Modal/ModalConst";
import SignupForm from "../Modal/SignupForm";
import {
  CUSTOMER,
  LOGOUT,
  MANAGER,
  SELLER,
  STAFF,
  TITLE_LOGIN,
} from "../../Common/Const/Auth/AuthConst";
import { OPEN_FORM } from "../../Common/Const/Admin/Drawer";
import MenuComponent from "../Layout/MenuComponent";
import { authLink } from "./AuthMenu/AuthLink";
import SignupShopForm from "../Modal/SignupShopForm";
import {
  TITLE_SIGNUP,
  TITLE_SIGNUP_SHOP,
} from "../../Common/Const/Signup/SignupConst";
import {
  FIND_ALL_NOTIFY_BY_USERNAME_ACTION,
  UPDATE_STATUS_VIEWED_BY_USERNAME_ACTION,
} from "../../Common/Action/Authentication/AuthAction";
import NotifyComponent from "./Notify/NotifyComponent";
import moment from "moment";
import CartComponent from "./Head/CartComponent";

export default function HeaderCustomer() {
  const dispatch = useDispatch();
  const { categories } = useSelector(
    (state) => state.CategoryReducer.categories
  );
  const { totalReview } = useSelector(
    (state) => state.CategoryReducer.categories
  );

  const { carts } = useSelector((state) => state.CartReducer);
  const { credentials, notify } = useSelector((state) => state.AuthReducer);
  const { listSearch, search } = useSelector((state) => state.ProductReducer);
  useEffect(() => {
    if (!categories) {
      dispatch({ type: FIND_ALL_CATEGORIES_ACTION });
    }

    if (credentials) {
      dispatch({
        type: FIND_ALL_NOTIFY_BY_USERNAME_ACTION,
        username: credentials?.tendn,
      });
    }
  }, []);
  const logo = "http://localhost:8080/images/background/logo.png";
  const [state, setState] = useState(false);
  const [canSearch, setSearch] = useState(false);
  const searchRef = useRef(null);
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

  const render = () => {
    let cat = _.first(categories);
    let subc = _.first(cat?.loai);
    return _.map(
      _?.filter(subc?.sanpham, (e) => e.conlai > 0),
      (item, i) => {
        return (
          <div
            className="cursor-pointer p-2 lg:w-1/2 md:w-1/2 w-full hover:bg-gray-50"
            key={i}
          >
            <div className="h-full flex items-center border-gray-200 border p-2 rounded-lg">
              <img
                alt="Bách Mộc"
                className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                src={"http://localhost:8080/images/product/" + item.hinhanh}
              />
              <div className="flex-grow">
                <Tooltip
                  getPopupContainer={(triggerNode) => triggerNode.parentNode}
                  title={item.tensp}
                >
                  <h2
                    className="cursor-pointer text-gray-900 title-font font-medium text-left"
                    onClick={() => {
                      dispatch({
                        type: GET_ALL_PRODUCT_BY_KEYWORD_ACTION,
                        tensp: item.tensp,
                      });
                      history.push(`/search/${item.tensp}`);
                    }}
                  >
                    {item.tensp?.length > 20
                      ? item?.tensp?.slice(0, 19) + "..."
                      : item.tensp}
                  </h2>
                </Tooltip>
                <p className="text-left text-gray-500">
                  {item?.loaisp?.tenloai}
                </p>
              </div>
            </div>
          </div>
        );
      }
    );
  };

  const renderCategory = () => {
    let cat = _?.first(categories);
    return _?.map(cat?.loai, (item, i) => {
      return (
        <div
          className="p-2 lg:w-1/2 md:w-1/2 w-full bg-white hover:bg-gray-100"
          key={i}
        >
          <div className="h-full flex items-center border-gray-200 border p-2 rounded-lg">
            <div className="flex-grow">
              <Tooltip
                getPopupContainer={(triggerNode) => triggerNode.parentNode}
                title={item.tenloai}
              >
                <h2
                  className="cursor-pointer text-gray-900 title-font font-medium"
                  onClick={() => {
                    dispatch({
                      type: GET_ALL_PRODUCT_BY_KEYWORD_ACTION,
                      tensp: item.tenloai,
                      loai: true,
                    });
                    history.push(`/search/${item.tenloai}`);
                  }}
                >
                  {item.tenloai?.length > 20
                    ? item?.tenloai?.slice(0, 19) + "..."
                    : item.tenloai}
                </h2>
              </Tooltip>
            </div>
          </div>
        </div>
      );
    });
  };

  const renderSearch = () => {
    return _?.map(
      _.orderBy(
        search,
        function (o) {
          return new moment(o.datetime);
        },
        ["desc"]
      ),
      (item, i) => {
        return (
          <div className="w-full hover:bg-gray-100" key={i}>
            <div className="h-full flex items-center p-1">
              <div className="flex-grow">
                <Tooltip title={item.title}>
                  <h2 className="text-gray-900 title-font font-medium text-left flex flex-row">
                    <div className="w-1/6 flex justify-center">
                      <HistoryOutlined />{" "}
                    </div>
                    <div className="w-4/6 cursor-pointer">
                      <span
                        onClick={() => {
                          dispatch({
                            type: GET_ALL_PRODUCT_BY_KEYWORD_ACTION,
                            tensp: item.title,
                          });
                          window.location.href = `/search/${item.title}`;
                        }}
                      >
                        {item.title?.length > 20
                          ? item?.title?.slice(0, 19) + "..."
                          : item.title}
                      </span>
                    </div>
                    <div className="w-1/6 flex justify-end z-9">
                      <span
                        className="cursor-pointer"
                        onClick={() => {
                          dispatch({
                            type: DELETE_SEARCH_KEY,
                            title: item.title,
                          });
                        }}
                      >
                        <CloseCircleOutlined />
                      </span>
                    </div>
                  </h2>
                </Tooltip>
              </div>
            </div>
          </div>
        );
      }
    );
  };

  const sumQuantity = () => {
    if (!carts) {
      return 0;
    } else {
      return _.map(carts, (item) => item.sl).reduce(
        (total, sl) => (total += sl),
        0
      );
    }
  };

  const handleClick = (e) => {
    setState(true);
  };

  return (
    <>
      <div>
        <div className="offcanvas-menu-overlay " />
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
              <img
                src="http://localhost:8080/images/background/logo.png"
                alt="Bách Mộc"
              />
            </NavLink>
          </div>
          <div id="mobile-menu-wrap" />
          <div className="offcanvas__auth">
            <a href="#">Đăng nhập</a>
            <a href="#">Đăng ký</a>
          </div>
        </div>
        <header className="header fixed top-0 w-full lg:h-auto xl:h-28 z-9">
          <div className="container-fluid">
            <div className="flex flex-row w-full">
              <div className="fold:w-1/3  lg:w-1/5">
                <div className="header__logo">
                  <NavLink to="/trang-chu">
                    <img className="w-20 h-12" src={`${logo}`} alt="Bách Mộc" />
                  </NavLink>
                </div>
              </div>
              <div className="fold:hidden lg:block lg:w-3/5">
                <nav className="header__menu">
                  <div className="flex flex-col">
                    <div className="flex flex-row">
                      <Formik
                        initialValues={{ keyword: "" }}
                        onSubmit={(values, actions) => {
                          let { keyword } = values;
                          if (keyword) {
                            dispatch({
                              type: GET_ALL_PRODUCT_BY_KEYWORD_ACTION,
                              tensp: keyword,
                            });
                            let search = {
                              title: keyword,
                              type: "keyword",
                              url: `/search/${keyword}`,
                              datetime: moment(),
                            };
                            dispatch({
                              type: ADD_SEARCH_KEY,
                              search,
                            });
                            history.push(`/search/${keyword}`);
                          }
                        }}
                      >
                        {({
                          setFieldValue,
                          handleSubmit,
                          handleBlur,
                          values,
                          isSubmitting,
                        }) => (
                          <form className="w-full" onSubmit={handleSubmit}>
                            <div>
                              <div className="flex flex-col">
                                <div>
                                  <div className="flex flex-row">
                                    <input
                                      name="keyword"
                                      placeholder={'Rau củ'}
                                      onChange={(e) => {
                                        let { value } = e.target;
                                        setFieldValue("keyword", value);
                                        _.isEmpty(value)
                                          ? setSearch(false)
                                          : setSearch(true);
                                        if (searchRef !== null) {
                                          clearTimeout(searchRef.current);
                                        }
                                        searchRef.current = setTimeout(() => {
                                          dispatch({
                                            type: GET_ALL_PRODUCT_BY_SEARCH_ACTION,
                                            tensp: value,
                                          });
                                        }, 300);
                                      }}
                                      onBlur={handleBlur}
                                      value={values.keyword}
                                      className="input-responsive w-3/4 h-9"
                                      autoComplete="off"
                                      onClick={handleClick}
                                    />
                                    <button
                                      className="p-2 bg-gradient-to-r from-green-300 to-green-500 rounded-lg w-1/4 hover:bg-gradient-to-r hover:from-green-700 hover:to-green-400"
                                      type="submit"
                                    >
                                      Tìm kiếm
                                    </button>
                                  </div>
                                  {!categories  ? <div className="h-8 w-full flex flex-row gap-1">
                                    <div className="h-4 bg-gray-200 animate-pulse w-1/12 mt-2 rounded-md"></div>
                                    <div className="h-4 bg-gray-200 animate-pulse w-1/12 mt-2 rounded-md"></div>
                                    <div className="h-4 bg-gray-200 animate-pulse w-1/12 mt-2 rounded-md"></div>
                                    <div className="h-4 bg-gray-200 animate-pulse w-1/12 mt-2 rounded-md"></div>
                                    <div className="h-4 bg-gray-200 animate-pulse w-1/12 mt-2 rounded-md"></div>
                                    <div className="h-4 bg-gray-200 animate-pulse w-1/12 mt-2 rounded-md"></div>
                                    <div className="h-4 bg-gray-200 animate-pulse w-1/12 mt-2 rounded-md"></div>
                                    <div className="h-4 bg-gray-200 animate-pulse w-1/12 mt-2 rounded-md"></div>
                                    <div className="h-4 bg-gray-200 animate-pulse w-1/12 mt-2 rounded-md"></div>
                                    <div className="h-4 bg-gray-200 animate-pulse w-1/12 mt-2 rounded-md"></div>
                                    <div className="h-4 bg-gray-200 animate-pulse w-1/12 mt-2 rounded-md"></div>
                                    <div className="h-4 bg-gray-200 animate-pulse w-1/12 mt-2 rounded-md"></div>
                                  </div> : <div className="w-full flex flex-row justify-start gap-2 mt-2">
                                    {_?.map(categories, (category) => {
                                      console.log("LENGTH",categories?.length)
                                      return _?.map(
                                        category?.loai,
                                        (sub, i) => {
                                          return (
                                            <a
                                              href={`/search/${sub.tenloai}`}
                                              className="text-xs cursor-pointer text-black hover:text-green-600 hover:animate-pulse"
                                              key={i}
                                            >
                                              {sub.tenloai}
                                            </a>
                                          );
                                        }
                                      );
                                    })}
                                  </div>}
                                </div>
                                {state ? (
                                  <div
                                    className="h-140 overflow-auto w-3/4"
                                    onMouseLeave={(e) => {
                                      e.preventDefault();
                                      setState(false);
                                    }}
                                  >
                                    {canSearch === false ? (
                                      <div
                                        className="bg-white flex flex-row z-50"
                                        className={state ? "block" : "hidden"}
                                      >
                                        {search?.length > 0 ? (
                                          <section
                                            className="text-gray-600 body-font overflow-auto bg-white w-full"
                                            style={{ height: "150px" }}
                                          >
                                            <div className="container px-5 py-2 mx-auto">
                                              <div className="text-lg mb-5">
                                                TÌM KIẾM
                                              </div>
                                              <div className="flex flex-row flex-wrap -m-2">
                                                {renderSearch()}
                                              </div>
                                            </div>
                                          </section>
                                        ) : null}
                                        <section
                                          className="text-gray-600 body-font overflow-auto bg-white w-full"
                                          style={{ height: "180px" }}
                                        >
                                          <div className="container  px-5 py-2 mx-auto">
                                            <div className="text-lg mb-5">
                                              SẢN PHẨM NỔI BẬT
                                            </div>
                                            <div className="flex flex-row flex-wrap -m-2">
                                              {render()}
                                            </div>
                                          </div>
                                        </section>
                                        <section
                                          className="text-gray-600 bg-white body-font overflow-auto w-full"
                                          style={{ height: "180px" }}
                                        >
                                          <div className="container  px-5 py-2 mx-auto">
                                            <div className="text-lg mb-5">
                                              DANH MỤC NỔI BẬT
                                            </div>
                                            <div className="flex flex-row flex-wrap -m-2">
                                              {renderCategory()}
                                            </div>
                                          </div>
                                        </section>
                                      </div>
                                    ) : (
                                      _?.map(listSearch, (item, i) => {
                                        return (
                                          <div
                                            className={`${
                                              canSearch === true
                                                ? "block w-full bg-white hover:bg-gray-100 overflow-auto h-8"
                                                : "hidden"
                                            }`}
                                            key={i}
                                          >
                                            <div className="flex items-center p-1">
                                              <div className="flex-grow">
                                                <Tooltip title={item.tensp}>
                                                  <div className="text-gray-900 title-font font-medium text-left flex flex-row">
                                                    <div className="w-1/6 flex justify-center">
                                                      <SearchOutlined />
                                                    </div>
                                                    <div className="w-5/6 cursor-pointer">
                                                      <div
                                                        className="flex flex-row"
                                                        onClick={() => {
                                                          let search = {
                                                            title: item.tensp,
                                                            type: "keyword",
                                                            url: `/search/${item.tensp}`,
                                                            datetime: moment(),
                                                          };
                                                          dispatch({
                                                            type: ADD_SEARCH_KEY,
                                                            search,
                                                          });

                                                          dispatch({
                                                            type: GET_ALL_PRODUCT_BY_KEYWORD_ACTION,
                                                            tensp: item.tensp,
                                                          });
                                                          // history.push(
                                                          //   `/search/${keyword}`
                                                          // );
                                                          window.location.href = `/search/${item.tensp}`;
                                                        }}
                                                      >
                                                        <img
                                                          alt="Bách Mộc"
                                                          className="w-5 h-5 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                                                          src={
                                                            "http://localhost:8080/images/product/" +
                                                            item.hinhanh
                                                          }
                                                        />
                                                        {item.tensp?.length > 70
                                                          ? item?.tensp?.slice(
                                                              0,
                                                              69
                                                            ) + "..."
                                                          : item.tensp}
                                                      </div>
                                                    </div>
                                                  </div>
                                                  {/* </NavLink> */}
                                                </Tooltip>
                                              </div>
                                            </div>
                                          </div>
                                        );
                                      })
                                    )}
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </form>
                        )}
                      </Formik>
                    </div>
                  </div>
                </nav>
              </div>
              <div className="fold:w-2/3 lg:w-1/5">
                <div className="header__right w-full flex flex-col">
                  <ul className="header__right__widget text-xs fold:hidden lg:block">
                    <li>
                      {!credentials ? (
                        <>
                          <a
                            className="text-xs"
                            onClick={() => {
                              dispatch({
                                type: OPEN_FORM_MODAL,
                                Component: <LoginForm />,
                                title: TITLE_LOGIN,
                                width: 500,
                              });
                            }}
                          >
                            Đăng nhập
                          </a>
                          /
                          <a
                            className="text-xs"
                            onClick={() => {
                              const action = {
                                type: OPEN_FORM_MODAL,
                                Component: <SignupForm />,
                                title: TITLE_SIGNUP,
                                width: 900,
                              };
                              dispatch(action);
                            }}
                          >
                            Đăng ký
                          </a>
                        </>
                      ) : (
                        <div className="flex flex-row justify-center w-full">
                          <Popover
                            placement="bottom"
                            getPopupContainer={(node) => node.parentElement}
                            content={
                              <div className="mt-2 py-2 w-48 bg-white rounded-md shadow-xl text-xs flex flex-col overflow-auto h-40">
                                {_.find(
                                  credentials?.roles,
                                  (e) => e === MANAGER
                                ) ? (
                                  <NavLink
                                    className="block text-xs px-4 py-2 text-gray-800 hover:text-white hover:bg-green-500"
                                    to={"/nha-cung-cap"}
                                  >
                                    Quản Trị
                                  </NavLink>
                                ) : null}
                                {_.find(
                                  credentials?.roles,
                                  (e) => e === STAFF
                                ) ? (
                                  <NavLink
                                    className="block text-xs px-4 py-2 text-gray-800 hover:text-white hover:bg-green-500"
                                    to={"/nha-cung-cap"}
                                  >
                                    Nhân viên
                                  </NavLink>
                                ) : null}

                                {_.find(
                                  credentials?.roles,
                                  (e) => e === SELLER
                                ) ? (
                                  <NavLink
                                    className="block text-xs px-4 py-2 text-gray-800 hover:text-white hover:bg-green-500"
                                    to={"/cua-hang"}
                                  >
                                    Cửa hàng
                                  </NavLink>
                                ) : null}

                                {_.filter(
                                  credentials?.roles,
                                  (e) => e === CUSTOMER
                                )?.length > 0 ? (
                                  <span
                                    className="cursor-pointer text-xs block px-4 py-2 text-gray-800 hover:text-white hover:bg-green-500"
                                    onClick={() => {
                                      dispatch({
                                        type: OPEN_FORM_MODAL,
                                        Component: <SignupShopForm />,
                                        width: 900,
                                        title: TITLE_SIGNUP_SHOP,
                                      });
                                    }}
                                  >
                                    Đăng ký bán hàng
                                  </span>
                                ) : null}

                                {_.map(
                                  _.find(
                                    credentials?.roles,
                                    (e) => e === CUSTOMER
                                  )
                                    ? authLink
                                    : _.filter(
                                        authLink,
                                        (e) =>
                                          e.name !== "Yêu thích" &&
                                          e.name !== "Đơn hàng đang chờ" &&
                                          e.name !== "Lịch sử mua hàng" &&
                                          e.name !== "Mã giảm giá" &&
                                          e.name !== "Sự kiện"
                                      ),
                                  (item, i) => {
                                    return (
                                      <NavLink
                                        className="block text-xs px-4 py-2 text-gray-800 hover:text-white hover:bg-green-500"
                                        to={item.url}
                                        key={i}
                                      >
                                        {item.name}
                                      </NavLink>
                                    );
                                  }
                                )}
                                <NavLink
                                className="block text-xs px-4 py-2 text-gray-800 hover:text-white hover:bg-green-500"
                                to={'/gioi-thieu'}
                                >
                                  Giới thiệu
                                </NavLink>
                                <NavLink
                                className="block text-xs px-4 py-2 text-gray-800 hover:text-white hover:bg-green-500"
                                to={'/lien-he'}
                                >
                                  Liên hệ
                                </NavLink>
                                <a
                                  className="block text-xs px-4 py-2 text-gray-800 hover:text-white hover:bg-green-500"
                                  onClick={() => {
                                    dispatch({
                                      type: LOGOUT,
                                    });
                                  }}
                                >
                                  Đăng xuất
                                </a>
                              </div>
                            }
                          >
                            <Avatar
                              className="top-1"
                              shape="circle"
                              src={
                                credentials?.hinhanh
                                  ? "http://localhost:8080/images/user/" +
                                    credentials?.hinhanh
                                  : "https://joeschmoe.io/api/v1/random"
                              }
                            />
                          </Popover>
                        </div>
                      )}
                    </li>
                    <li>
                      {!categories ? <div className="h-6 w-6 rounded-full bg-gray-200 animate-pulse"></div> : <a href="#">
                        <span className="icon_heart_alt" />
                        <div className="tip">{totalReview}</div>
                      </a>}
                    </li>
                    <li>
                      <Popover
                        placement="bottomLeft"
                        getPopupContainer={(node) => node.parentElement}
                        content={
                          <div className="flex flex-col h-80 bg-white">
                            <CartComponent />
                          </div>
                        }
                      >
                        <a href="#">
                          <span className="icon_bag_alt" />
                          <div className="tip">{sumQuantity()}</div>
                        </a>
                      </Popover>
                    </li>
                    <li>
                      <Popover
                        placement={"bottom"}
                        getPopupContainer={(node) => {
                          return node.parentElement;
                        }}
                        content={<NotifyComponent />}
                        onVisibleChange={(visible) => {
                          if (visible) {
                            if (credentials) {
                              dispatch({
                                type: UPDATE_STATUS_VIEWED_BY_USERNAME_ACTION,
                                username: credentials?.tendn,
                              });
                            }
                          }
                        }}
                        trigger="click"
                      >
                        <Badge
                          color={"black"}
                          count={_?.filter(notify, (e) => !e.daxem)?.length}
                          overflowCount={10}
                          className=" bottom-1"
                        >
                          <CommentOutlined className="edit-icon text-black text-lg hover:text-green-700" />
                        </Badge>
                      </Popover>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="block my-menu-collapse lg:hidden">
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
    </>
  );
}
