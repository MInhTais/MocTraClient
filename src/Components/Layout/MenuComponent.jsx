import {
  HomeOutlined,
  MenuUnfoldOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { AutoComplete, Input, Popover, Badge } from "antd";
import { Formik } from "formik";
import _ from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  GET_ALL_PRODUCT_BY_KEYWORD_ACTION,
  GET_ALL_PRODUCT_BY_SEARCH_ACTION,
} from "../../Common/Action/Product/Product";
import { CLOSE_DRAWER } from "../../Common/Const/Admin/Drawer";
import { LOGOUT, SELLER, STAFF } from "../../Common/Const/Auth/AuthConst";
import { OPEN_FORM_MODAL } from "../../Common/Const/Modal/ModalConst";
import { ADD_SEARCH_KEY } from "../../Common/Const/Product/ProductConst";
import { history } from "../../libs/History/history";
import LoginForm from "../Modal/LoginForm";
import SignupForm from "../Modal/SignupForm";
import CartComponent from "./Head/CartComponent";
import NotifyComponent from './Notify/NotifyComponent';
import {notify} from '../../libs/Notify/Notify';
import {UPDATE_STATUS_VIEWED_BY_USERNAME_ACTION} from '../../Common/Action/Authentication/AuthAction';

export default function MenuComponent() {
  const { listSearch } = useSelector((state) => state.ProductReducer);
  const { credentials } = useSelector((state) => state.AuthReducer);
  const { categories, totalReview } = useSelector(
    (state) => state.CategoryReducer.categories
  );
  const [productName, setProductName] = useState(listSearch[0]?.tenloai);
  const searchRef = useRef(null);
  const { carts } = useSelector((state) => state.CartReducer);
  const dispatch = useDispatch();
  const logout = () => {
    dispatch({
      type: LOGOUT,
    });
  };

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

  const isLogin = "w-12 h-12 rounded-full bg-ray-500";
  const notLogin = "flex justify-center w-40 h-20 bg-ray-500";
  const background = "flex flex-col h-80";
  const backgroundMobile = "flex flex-col h-80 w-60";

  return (
    <div className="h-full p-3 space-y-2 bg-gray-50 bg-opacity-40 text-gray-800 w-full">
      <ul className="header__right__widget">
        <li>
          <a href="#">
            <span className="icon_heart_alt" />
            <div className="tip">{totalReview}</div>
          </a>
        </li>
        <li>
          <Popover
            placement="bottomLeft"
            content={
              <div className={size.width < 360 ? backgroundMobile : background}>
                <CartComponent />
              </div>
            }
          >
            <a href="#">
              <span className="icon_bag_alt" />
              <div className="tip">{carts?.length ? carts?.length : 0}</div>
            </a>
          </Popover>
        </li>
      </ul>
      <Formik
        className="w-full space-y-1 text-coolGray-800"
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
          <form onSubmit={handleSubmit}>
            <label htmlFor="Search" className="hidden">
              Search
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <button
                  type="button"
                  title="search"
                  className="p-1 focus:outline-none focus:ring"
                >
                  <svg
                    fill="currentColor"
                    viewBox="0 0 512 512"
                    className="w-4 h-4 text-gray-800"
                  >
                    <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z" />
                  </svg>
                </button>
              </span>
              <AutoComplete
                className="w-full"
                value={productName}
                name="keyword"
                onChange={(value) => {
                  setFieldValue("keyword", value);
                  setProductName(value);
                }}
                onSelect={(value, option) => {
                  setProductName(option.label);
                  let keyword = option.label;
                  if (keyword) {
                    dispatch({
                      type: GET_ALL_PRODUCT_BY_KEYWORD_ACTION,
                      tensp: keyword,
                    });

                    let search = {
                      title: keyword,
                      type: "keyword",
                      url: `/search/${keyword}`,
                    };
                    dispatch({
                      type: ADD_SEARCH_KEY,
                      search,
                    });
                    history.push(`/search/${keyword}`);
                  }
                }}
                options={_?.map(listSearch, (sp) => {
                  return { label: sp.tensp, value: sp.masp };
                })}
                onSearch={(value) => {
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
                getPopupContainer={(triggerNode) => triggerNode.parentNode}
              >
                <Input.Search
                  size="large"
                  placeholder="Nhập tên sản phẩm"
                  enterButton
                  type="submit"
                />
              </AutoComplete>
            </div>
          </form>
        )}
      </Formik>

      <div className="flex items-center p-2 space-x-4">
        <Popover        
          placement="bottomRight"  
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
            count={_?.filter(notify, (e) => !e.daxem)?.length}
            color="green"
          >
            <img
              src={
                credentials
                  ? credentials?.hinhanh
                    ? "http://localhost:8080/images/user/" +
                      credentials?.hinhanh
                    : "https://source.unsplash.com/100x100/?portrait"
                  : "http://localhost:8080/images/background/logo.png"
              }
              alt
              className={credentials ? isLogin : notLogin}
            />
          </Badge>
        </Popover>
        <div>
          <h2 className="text-lg font-semibold">
            {credentials ? credentials?.hoten : ""}
          </h2>
          {credentials ? (
            <span className="flex items-center space-x-1 ">
              <label
                className="text-xs hover:underline text-gray-600 cursor-pointer"
                onClick={() => {
                  history.push("/cap-nhat-ho-so");
                  dispatch({
                    type: CLOSE_DRAWER,
                  });
                }}
              >
                View profile
              </label>
            </span>
          ) : null}
        </div>
      </div>
      <div className="divide-y divide-gray-300">
        <ul className="pt-2 pb-4 space-y-1 text-sm">
          {credentials ? (
            <li className="bg-gray-100 text-gray-900">
              <a
                href="#"
                className="flex items-center p-2 space-x-3 rounded-md"
              >
                <UserOutlined className="w-5 h-5 text-gray-800" />
                <Popover
                  placement="rightTop"
                  content={
                    <div className="mt-2 py-2 w-48 bg-white rounded-md shadow-xl flex flex-col overflow-auto h-40">
                      <NavLink
                        className="block px-4 py-2 text-gray-800 hover:text-white hover:bg-green-500"
                        to="/cap-nhat-ho-so"
                      >
                        Cập nhật thông tin
                      </NavLink>
                      <NavLink
                        className="block px-4 py-2 text-gray-800 hover:text-white hover:bg-green-500"
                        to="/doi-mat-khau"
                      >
                        Đổi mật khẩu
                      </NavLink>
                      <NavLink
                        className="block px-4 py-2 text-gray-800 hover:text-white hover:bg-green-500"
                        to="/yeu-thich"
                      >
                        Yêu thích
                      </NavLink>
                      <NavLink
                        className="block px-4 py-2 text-gray-800 hover:text-white hover:bg-green-500"
                        to="/don-hang-dang-cho"
                      >
                        Đơn hàng đang chờ
                      </NavLink>
                      <NavLink
                        className="block px-4 py-2 text-gray-800 hover:text-white hover:bg-green-500"
                        to="/lich-su-mua-hang"
                      >
                        Lịch sử mua hàng
                      </NavLink>
                      <NavLink
                        className="block px-4 py-2 text-gray-800 hover:text-white hover:bg-green-500"
                        to="/ma-giam-gia"
                      >
                        Mã giảm giá
                      </NavLink>
                    </div>
                  }
                >
                  <span className="text-md text-green-700">Hồ sơ</span>
                </Popover>
              </a>
            </li>
          ) : null}
          {credentials ? (
            _.find(credentials?.roles, (e) => e === "MANAGER") ? (
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="w-5 h-5 fill-current text-gray-600"
                  >
                    <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z" />
                  </svg>
                  <Popover
                    placement="rightTop"
                    content={
                      <div className="mt-2 py-2 w-48 bg-white rounded-md shadow-xl flex flex-col overflow-auto h-52">
                        <NavLink
                          to="/nha-cung-cap"
                          className="block px-4 py-2 text-gray-800 hover:text-white hover:bg-green-500"
                        >
                          Nhà cung cấp
                        </NavLink>
                        <NavLink
                          to="/san-pham-cung-cap"
                          className="block px-4 py-2 text-gray-800 hover:text-white hover:bg-green-500"
                        >
                          Sản phẩm cung cấp
                        </NavLink>
                        <NavLink
                          to="/nhom-loai"
                          className="block px-4 py-2 text-gray-800 hover:text-white hover:bg-green-500"
                        >
                          Nhóm loại
                        </NavLink>
                        <NavLink
                          to="/loai-san-pham"
                          className="block px-4 py-2 text-gray-800 hover:text-white hover:bg-green-500"
                        >
                          Loại sản phẩm
                        </NavLink>
                        <NavLink
                          to="/thuong-hieu"
                          className="block px-4 py-2 text-gray-800 hover:text-white hover:bg-green-500"
                        >
                          Thương hiệu
                        </NavLink>
                        <NavLink
                          to="/san-pham"
                          className="block px-4 py-2 text-gray-800 hover:text-white hover:bg-green-500"
                        >
                          Sản phẩm
                        </NavLink>
                        <NavLink
                          to="/tai-khoan"
                          className="block px-4 py-2 text-gray-800 hover:text-white hover:bg-green-500"
                        >
                          Tài khoản
                        </NavLink>
                        <NavLink
                          to="/thong-ke-doanh-thu"
                          className="block px-4 py-2 text-gray-800 hover:text-white hover:bg-green-500"
                        >
                          Thống kê doanh thu
                        </NavLink>
                        <NavLink
                          to="/thong-ke-san-pham"
                          className="block px-4 py-2 text-gray-800 hover:text-white hover:bg-green-500"
                        >
                          Thống kê sản phẩm
                        </NavLink>
                      </div>
                    }
                  >
                    <span className="text-md text-green-700">Quản trị</span>
                  </Popover>
                </a>
              </li>
            ) : null
          ) : null}
          {credentials ? (
            _.find(credentials?.roles, (e) => e === STAFF) ? (
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="w-5 h-5 fill-current text-gray-600"
                  >
                    <path d="M448.205,392.507c30.519-27.2,47.8-63.455,47.8-101.078,0-39.984-18.718-77.378-52.707-105.3C410.218,158.963,366.432,144,320,144s-90.218,14.963-123.293,42.131C162.718,214.051,144,251.445,144,291.429s18.718,77.378,52.707,105.3c33.075,27.168,76.861,42.13,123.293,42.13,6.187,0,12.412-.273,18.585-.816l10.546,9.141A199.849,199.849,0,0,0,480,496h16V461.943l-4.686-4.685A199.17,199.17,0,0,1,448.205,392.507ZM370.089,423l-21.161-18.341-7.056.865A180.275,180.275,0,0,1,320,406.857c-79.4,0-144-51.781-144-115.428S240.6,176,320,176s144,51.781,144,115.429c0,31.71-15.82,61.314-44.546,83.358l-9.215,7.071,4.252,12.035a231.287,231.287,0,0,0,37.882,67.817A167.839,167.839,0,0,1,370.089,423Z" />
                    <path d="M60.185,317.476a220.491,220.491,0,0,0,34.808-63.023l4.22-11.975-9.207-7.066C62.918,214.626,48,186.728,48,156.857,48,96.833,109.009,48,184,48c55.168,0,102.767,26.43,124.077,64.3,3.957-.192,7.931-.3,11.923-.3q12.027,0,23.834,1.167c-8.235-21.335-22.537-40.811-42.2-56.961C270.072,30.279,228.3,16,184,16S97.928,30.279,66.364,56.206C33.886,82.885,16,118.63,16,156.857c0,35.8,16.352,70.295,45.25,96.243a188.4,188.4,0,0,1-40.563,60.729L16,318.515V352H32a190.643,190.643,0,0,0,85.231-20.125,157.3,157.3,0,0,1-5.071-33.645A158.729,158.729,0,0,1,60.185,317.476Z" />
                  </svg>
                  <Popover
                    placement="rightTop"
                    content={
                      <div className="mt-2 py-2 w-48 bg-white rounded-md shadow-xl flex flex-col overflow-auto h-44">
                        <NavLink
                          to="/nha-cung-cap"
                          className="block px-4 py-2 text-gray-800 hover:text-white hover:bg-green-500"
                        >
                          Nhà cung cấp
                        </NavLink>
                        <NavLink
                          to="/nhom-loai"
                          className="block px-4 py-2 text-gray-800 hover:text-white hover:bg-green-500"
                        >
                          Nhóm loại
                        </NavLink>
                        <NavLink
                          to="/loai-san-pham"
                          className="block px-4 py-2 text-gray-800 hover:text-white hover:bg-green-500"
                        >
                          Loại sản phẩm
                        </NavLink>
                        <NavLink
                          to="/san-pham"
                          className="block px-4 py-2 text-gray-800 hover:text-white hover:bg-green-500"
                        >
                          Sản phẩm
                        </NavLink>
                        <NavLink
                          to="/carousel"
                          className="block px-4 py-2 text-gray-800 hover:text-white hover:bg-green-500"
                        >
                          Carousel
                        </NavLink>
                      </div>
                    }
                  >
                    <span className="text-md text-green-700">Nhân viên</span>
                  </Popover>
                </a>
              </li>
            ) : null
          ) : null}

          {_.find(credentials?.roles, (e) => e === SELLER) ? (
            <li>
              <a
                href="#"
                className="flex items-center p-2 space-x-3 rounded-md"
              >
                <ShoppingOutlined className="w-5 h-5 text-gray-700" />
                <Popover
                  placement="rightTop"
                  content={
                    <div className="mt-2 py-2 w-48 bg-white rounded-md shadow-xl flex flex-col overflow-auto h-44">
                      <NavLink
                        to="/cua-hang"
                        className="block px-4 py-2 text-gray-800 hover:text-white hover:bg-green-500"
                      >
                        Cửa hàng
                      </NavLink>
                      <NavLink
                        to="/quan-ly-don-hang"
                        className="block px-4 py-2 text-gray-800 hover:text-white hover:bg-green-500"
                      >
                        Đơn hàng
                      </NavLink>
                      <NavLink
                        to="/quan-ly-san-pham"
                        className="block px-4 py-2 text-gray-800 hover:text-white hover:bg-green-500"
                      >
                        Sản phẩm
                      </NavLink>
                      <NavLink
                        to="/san-pham"
                        className="block px-4 py-2 text-gray-800 hover:text-white hover:bg-green-500"
                      >
                        Sản phẩm
                      </NavLink>
                      <NavLink
                        to="/quan-ly-thuong-hieu"
                        className="block px-4 py-2 text-gray-800 hover:text-white hover:bg-green-500"
                      >
                        Thương hiệu
                      </NavLink>
                      <NavLink
                        to="/quan-ly-doanh-thu"
                        className="block px-4 py-2 text-gray-800 hover:text-white hover:bg-green-500"
                      >
                        Doanh thu
                      </NavLink>
                      <NavLink
                        to="/doanh-thu-san-pham"
                        className="block px-4 py-2 text-gray-800 hover:text-white hover:bg-green-500"
                      >
                        Doanh thu sản phẩm
                      </NavLink>
                    </div>
                  }
                >
                  <span className="text-md text-green-700">Người bán</span>
                </Popover>
              </a>
            </li>
          ) : null}
          <li>
            <a href="#" className="flex items-center p-2 space-x-3 rounded-md">
              <HomeOutlined className="w-5 h-5 text-gray-800" />
              <Popover
                placement="rightTop"
                content={
                  <div className="mt-2 py-2 w-48 bg-white rounded-md shadow-xl flex flex-col overflow-auto h-40">
                    <NavLink
                      to="/trang-chu"
                      className="block px-4 py-2 text-gray-800 hover:text-white hover:bg-green-500"
                    >
                      Trang chủ
                    </NavLink>
                    <NavLink
                      to="/gio-hang"
                      className="block px-4 py-2 text-gray-800 hover:text-white hover:bg-green-500"
                    >
                      Giỏ hàng
                    </NavLink>
                    <NavLink
                      to="/thanh-toan"
                      className="block px-4 py-2 text-gray-800 hover:text-white hover:bg-green-500"
                    >
                      Thanh toán
                    </NavLink>
                    <NavLink
                      to="/gioi-thieu"
                      className="block px-4 py-2 text-gray-800 hover:text-white hover:bg-green-500"
                    >
                      Giới thiệu
                    </NavLink>
                    <NavLink
                      to="/lien-he"
                      className="block px-4 py-2 text-gray-800 hover:text-white hover:bg-green-500"
                    >
                      Liên hệ
                    </NavLink>
                  </div>
                }
              >
                <span className="text-md text-green-700">Mộc Trà</span>
              </Popover>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center p-2 space-x-3 rounded-md">
              <MenuUnfoldOutlined className="h-5 w-5 text-gray-800" />
              <Popover
                placement="rightTop"
                content={
                  <div className="mt-2 py-2 w-48 bg-white rounded-md shadow-xl flex flex-col overflow-auto h-40">
                    {_.map(categories, (category, i) => {
                      return (
                        <p
                          key={i}
                          className="cursor-pointer block px-4 py-2 text-gray-800 hover:text-white hover:bg-green-500"
                        >
                          <Popover
                            placement="right"
                            content={
                              <div className="mt-2 py-2 w-48 bg-white rounded-md shadow-xl flex flex-col overflow-auto h-40">
                                {_.map(category?.loai, (subcategory, i) => {
                                  return (
                                    <p
                                      key={i}
                                      onClick={() => {
                                        dispatch({
                                          type: GET_ALL_PRODUCT_BY_KEYWORD_ACTION,
                                          tensp: subcategory.tenloai,
                                          loai: true,
                                        });
                                        let search = {
                                          title: subcategory.tenloai,
                                          type: "keyword",
                                          url: `/search/${subcategory.tenloai}`,
                                        };
                                        dispatch({
                                          type: ADD_SEARCH_KEY,
                                          search,
                                        });
                                        history.push(
                                          `/search/${subcategory.tenloai}`
                                        );

                                        dispatch({
                                          type: CLOSE_DRAWER,
                                        });
                                      }}
                                      className="cursor-pointer block px-4 py-2 text-gray-800 hover:text-white hover:bg-green-500"
                                    >
                                      {subcategory.tenloai}
                                    </p>
                                  );
                                })}
                              </div>
                            }
                          >
                            {category.tennhom}
                          </Popover>
                        </p>
                      );
                    })}
                  </div>
                }
              >
                <span className="text-md text-green-700">Danh mục</span>
              </Popover>
            </a>
          </li>
        </ul>
        <ul className="pt-4 pb-2 space-y-1 text-sm">
          {credentials ? (
            <li>
              <a
                onClick={() => logout()}
                className="flex items-center p-2 space-x-3 rounded-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-5 h-5 fill-current text-gray-600"
                >
                  <path d="M440,424V88H352V13.005L88,58.522V424H16v32h86.9L352,490.358V120h56V456h88V424ZM320,453.642,120,426.056V85.478L320,51Z" />
                  <rect width={32} height={64} x={256} y={232} />
                </svg>
                <span className="text-md text-green-700">Đăng xuất</span>
              </a>
            </li>
          ) : (
            <>
              <li>
                <a
                  onClick={() => {
                    dispatch({
                      type: OPEN_FORM_MODAL,
                      Component: <LoginForm />,
                      title: "Đăng nhập",
                      width: 500,
                    });
                  }}
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="w-5 h-5 fill-current text-gray-600"
                  >
                    <path d="M440,424V88H352V13.005L88,58.522V424H16v32h86.9L352,490.358V120h56V456h88V424ZM320,453.642,120,426.056V85.478L320,51Z" />
                    <rect width={32} height={64} x={256} y={232} />
                  </svg>
                  <span className="text-md text-green-700">Đăng nhập</span>
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    const action = {
                      type: OPEN_FORM_MODAL,
                      Component: <SignupForm />,
                      title: "Đăng ký",
                      width: 900,
                    };
                    dispatch(action);
                  }}
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="w-5 h-5 fill-current text-gray-600"
                  >
                    <path d="M440,424V88H352V13.005L88,58.522V424H16v32h86.9L352,490.358V120h56V456h88V424ZM320,453.642,120,426.056V85.478L320,51Z" />
                    <rect width={32} height={64} x={256} y={232} />
                  </svg>
                  <span className="text-md text-green-700">Đăng ký</span>
                </a>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
