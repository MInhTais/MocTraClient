import { Popover,Tooltip,Tag } from "antd";
import React, { useEffect, useState } from "react";
import ReactGa from 'react-ga';
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { TITLE_LOGIN } from "../../Common/Const/Auth/AuthConst";
import { ADD_CART } from "../../Common/Const/Cart/CartConst";
import { OPEN_FORM_MODAL } from "../../Common/Const/Modal/ModalConst";
import { FIND_BY_MASP, TITLE_MODAL_PRODUCT_DETAIL } from "../../Common/Const/Product/ProductConst";
import { history } from "../../libs/History/history";
import LoginForm from "../Modal/LoginForm";
import ProductDetailComponent from "../Product/ProductDetailComponent";

export default function ProductSingleComponent({ i,product,timeLeft }) {
    const dispatch = useDispatch();
    const {credentials} = useSelector((state)=>state.AuthReducer);
  const [visibleLabel, setVisibleLabel] = useState({
    masp: null,
    visible: false,
  });

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

  const buyFast = (product) => {
    product.sl = 1;
    product.stick = true;
    dispatch({
      type: ADD_CART,
      sanpham: product,
    });

    ReactGa.event({
      category: "Click",
      action: "add to cart",
    });
    history.push('/thanh-toan')
  };

  const addCart = (product) => {
    product.sl = 1;
    product.stick = false;
    dispatch({
      type: ADD_CART,
      sanpham: product,
    });
    console.log(product.sl)
    ReactGa.event({
      category: "Click",
      action: "add to cart",
    });
  };

  const renderLength = () =>{
    if(size?.width >= 1000){
      return product.mota?.length > 25 ? product?.mota?.slice(0,24)+'...' : product.mota;
    }else if(size?.width>=768){
      return product.mota?.length > 20 ? product?.mota?.slice(0,19)+'...' : product.mota
    }else {
      return product.mota?.length > 25 ? product?.mota?.slice(0,24)+'...' : product.mota
    }
    
  }

  return (
    <div
      className="p-2 w-full px-2 py-6 rounded-lg transform transition duration-500 hover:scale-110"
      key={i}
      onMouseOver={(e) => {
        setVisibleLabel({
          masp: product.masp,
          visible: true,
        });
      }}
      onMouseLeave={(e) => {
        setVisibleLabel({
          masp: null,
          visible: false,
        });
      }}
    >
      <Popover
        placement={"topRight"}
        content={
          <div className="w-full flex flex-row justify-center">
            <button
              className="button-3d-green"
              onClick={() => {
                if(credentials){
                  buyFast(product);
                history.push("/thanh-toan");
                }else{
                  dispatch({
                    type: OPEN_FORM_MODAL,
                    Component:<LoginForm />,
                    title:TITLE_LOGIN,
                    width:500
                  })
                }
              }}
            >
              MUA NGAY
            </button>
          </div>
        }
      >
        <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
          <label className="cursor-pointer">
            <img
              className="lg:h-56 fold:h-36 w-full object-cover object-center"
              src={"http://localhost:8080/images/product/" + product.hinhanh}
              alt="Bách Mộc"
              onClick={() => {
                dispatch({
                  type: OPEN_FORM_MODAL,
                  Component: (
                    <ProductDetailComponent
                      reviews={product.spdanhgia}
                      product={product}
                      seconds={0}
                      timeLeft={timeLeft}
                    />
                  ),
                  title: TITLE_MODAL_PRODUCT_DETAIL,
                  width: 1200,
                });

                dispatch({
                  type: FIND_BY_MASP,
                  product,
                });

                ReactGa.timing({
                  category: "OPEN_FORM_MODAL",
                  variable: product?.masp,
                  value: 5000, // in milliseconds
                  label: "Mã sản phẩm",
                });
                ReactGa.modalview(`/view/product/${product.masp}`);
              }}
            />
          </label>
          <div className="p-6">
            <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
              TÊN SẢN PHẨM
            </h2>
            <h1 className="truncate title-font text-md font-medium text-gray-900 mb-3">
              <Tooltip title={product.tensp}>
              <NavLink
                to={`/chi-tiet/${product.masp}`}
                className="text-green-600 hover:text-green-800"
              >
                {product.tensp}
              </NavLink>
              </Tooltip>
            </h1>
            <Tooltip title={product.mota}
            placement={'bottomRight'}
            >
            <p className="leading-relaxed mb-3 cursor-default text-xs">{renderLength()}</p>
            </Tooltip>
            <div className="flex flex-col items-start ">
              <div className="flex flex-row w-full">
                <div className="w-1/2">
                  <a
                    className="button-cart text-green-500 hover:text-green-800 w-full"
                    onClick={() => addCart(product)}
                  >
                    THÊM
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
                </div>
                <div className="w-1/2">
                  <p className="text-xs italic items-center">
                    Đã bán {product.daban}
                  </p>
                </div>
              </div>
              <div className="flex flex-row w-full">
                <div className="w-4/5 gap-2 text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                  <label className={product.giamgia >0 ? 'text-red-500 font-bold': 'text-gray-600 font-bold'}>
                    {product.giamgia >0 ? (product.dongia - (product.dongia*product.giamgia)/100)?.toLocaleString()+'đ' : product.dongia?.toLocaleString()+'đ'}
                  </label>
                  {product?.giamgia > 0 ? <Tag color={'red'}>{'-'+product.giamgia+'%'}</Tag> : null}
                </div>
                <div className="w-1/5 text-gray-400 inline-flex items-center leading-none text-sm">
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
                  {product.views}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Popover>
    </div>
  );
}
