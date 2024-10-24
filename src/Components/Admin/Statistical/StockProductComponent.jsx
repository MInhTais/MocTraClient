import React from "react";
import _ from "lodash";
import { NavLink } from "react-router-dom";
import { responsiveProductInStock } from "../../Home/ResponsiveCarousel";
import { Badge, Popover, Tag, Tooltip } from "antd";
import Carousel from "react-multi-carousel";
import { useSelector } from "react-redux";
import moment from "moment";
export default function StockProductComponent(props) {
  const { spt } = useSelector((state) => state.StatisticalReducer);

  return (
    <>
      {spt?.length > 0 ? (
        <div className='w-full'>
          <span className="cursor-default text-responsive uppercase text-green-600 font-bold hover:text-green-900">
            Tổng sản phẩm tồn {spt.length}
          </span>
          <Carousel responsive={responsiveProductInStock}>
            {_?.map(spt, (product, ind) => {
              return (
                <div
                  className="p-4 w-full px-4 py-6 rounded-lg transform transition duration-500 hover:scale-110"
                  key={ind}
                >
                  <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                    <label className="cursor-pointer">
                      <img
                        className="lg:h-56 fold:h-36 w-full object-cover object-center"
                        src={
                          "http://localhost:8080/images/product/" +
                          product.hinhanh
                        }
                        alt="Bách Mộc"
                      />
                    </label>
                    <div className="p-6">
                      <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                        TÊN SẢN PHẨM
                      </h2>
                      <h1 className="truncate title-font text-sm font-medium text-gray-900 mb-3">
                        <NavLink
                          to={`/chi-tiet/${product.masp}`}
                          className="text-green-600 hover:text-green-800"
                        >
                          {product.tensp}
                        </NavLink>
                      </h1>
                      <p className="leading-relaxed mb-3">{product.mota}</p>
                      <div className="flex items-center flex-wrap ">
                        <Popover
                          placement="rightTop"
                          trigger="click"
                          className="rounded-xl"
                          content={() => {
                            return (
                              <div>
                                <ul className="bg-gray-50 p-5 shadow-md rounded-sm">
                                  <li>
                                    Trọng lượng: {product?.trongluong + "g"}
                                  </li>
                                  <li>
                                    Tên loại:{" "}
                                    <Tag color="green">
                                      {product?.loaisp?.tenloai}
                                    </Tag>
                                  </li>
                                  <li>
                                    Tên thương hiệu:{" "}
                                    {product?.thuonghieu?.tenth}
                                  </li>
                                  <li>
                                    Nhà cung cấp:{" "}
                                    <Tooltip
                                      title={product?.nhacungcap?.tenncc}
                                    >
                                      {product?.nhacungcap?.tenncc?.length > 30
                                        ? product?.nhacungcap?.tenncc.slice(
                                            0,
                                            29
                                          ) + "..."
                                        : product?.sanpham?.nhacungcap?.tenncc}
                                    </Tooltip>
                                  </li>
                                  <li>
                                    Ngày nhập:{" "}
                                    {moment(product?.ngaynhap).format(
                                      "DD/MM/YYYY"
                                    )}
                                  </li>
                                  <li>
                                    Ngày hết hạn:{" "}
                                    {moment(product?.ngayhethan).format(
                                      "DD/MM/YYYY"
                                    )}
                                  </li>
                                  <li>
                                    Số lượng tồn:{" "}
                                    <Badge text={product?.conlai} color="red" />
                                  </li>
                                  <li>
                                    Trạng thái:{" "}
                                    <Tag
                                      color={
                                        moment(product?.ngayhethan).unix() -
                                          moment().unix() >
                                        0
                                          ? "green"
                                          : "red"
                                      }
                                    >
                                      {moment(product?.ngayhethan).unix() -
                                        moment().unix() >
                                      0
                                        ? "Có thể sử dụng"
                                        : "Hết hạn sử dụng"}
                                    </Tag>
                                  </li>
                                </ul>
                              </div>
                            );
                          }}
                        >
                          <a className="text-green-500 text-xs inline-flex items-center md:mb-2 lg:mb-0 hover:text-green-800">
                            CHI TIẾT
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
                        <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-xs pr-3 py-1 border-r-2 border-gray-200">
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
                          {product.dongia?.toLocaleString()} đ
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </Carousel>
        </div>
      ) : null}
    </>
  );
}
