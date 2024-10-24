import React from "react";
import { responsiveProductHome, responsiveWishlist } from "./ResponsiveCarousel";
import _ from "lodash";
import { DELETE_WISHLIST_ACTION } from "../../Common/Action/Authentication/AuthAction";
import { useDispatch } from "react-redux";
import Carousel from "react-multi-carousel";
import ProductSingleComponent from "./ProductSingleComponent";
import {Tooltip} from 'antd'
export default function ProductCarousel({
  products,
  wishlist,
  timeLeft,
  i
}) {
  const dispatch = useDispatch();

  return (
    <Carousel responsive={products ? responsiveProductHome : responsiveWishlist}>
      {products
        ? _?.map(
            _?.filter(products, (e) => e.conlai > 0 && e.trangthai === true),
            (product, ind) => {
              return (
                <div key={ind}>
                  <ProductSingleComponent
                  product={product}
                  i={ind}
                  timeLeft={timeLeft}
                />
                </div>
              );
            }
          )
        : _?.map(wishlist, (w, ind) => {
            return (
              <div
                className=" w-full p-4 px-4 py-6 rounded-lg transform transition duration-500 hover:scale-110"
                key={ind}
              >
                <div className="h-full flex flex-col justify-center border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                  <div className="w-full cursor-pointer">
                    <div className="w-full flex justify-center">
                    <img
                      className="object-cover object-center fold:w-48 fold:h-64 lg:h-56"
                      src={
                        "http://localhost:8080/images/product/" +
                        w?.sanpham?.hinhanh
                      }
                      alt="Bách Mộc"
                    />
                    </div>
                  </div>
                  <div className="p-6">
                    <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                      TÊN SẢN PHẨM
                    </h2>
                    <h1 className="truncate title-font text-md font-medium text-gray-900 mb-3">
                      <span className="text-green-600 hover:text-green-800">
                        {w?.sanpham?.tensp}
                      </span>
                    </h1>
                    <Tooltip title={w?.sanpham?.mota}>
                    <p className="leading-relaxed mb-3 w-full">{w?.sanpham?.mota ? w?.sanpham?.mota?.length > 35 ? w?.sanpham?.mota?.slice(0,34)+'...':w?.sanpham?.mota : 'Chưa có mô tả cho sản phẩm này.'}</p>
                    </Tooltip>
                    <div className="flex items-center flex-wrap ">
                      <a
                        className="w-full text-green-500 inline-flex items-center md:mb-2 lg:mb-0 hover:text-green-800"
                        onClick={() => {
                          dispatch({
                            type: DELETE_WISHLIST_ACTION,
                            mayt: w.mayt,
                          });
                        }}
                      >
                        Xóa
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
                      <div className="flex flex-row">
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
                          {w.sanpham.dongia?.toLocaleString()} đ
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
                          {w.sanpham.views}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
    </Carousel>
  );
}
