import _ from "lodash";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_ALL_PRODUCT_BY_KEYWORD_ACTION,
  UPDATE_VIEW_PRODUCT_ACTION,
} from "../../Common/Action/Product/Product";
import {
  GET_ALL_PRODUCT_BY_KEYWORD,
  GET_PRODUCT_PAGINATION,
  KEYWORD,
  TITLE_MODAL_PRODUCT_DETAIL,
} from "../../Common/Const/Product/ProductConst";
import { Skeleton, Slider } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import Category from "../Layout/Category";
import ProductSingleComponent from "../Home/ProductSingleComponent";
import MetaDecorator from "../../libs/Helmet/MetaDecorator";
import {
  SEARCH_PRODUCT_PAGE_DESCRIPTION,
  SEARCH_PRODUCT_PAGE_TITLE,
} from "../../Common/Const/Page/PageConst";
import { ArrowUpOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { OPEN_FORM } from "../../Common/Const/Admin/Drawer";

export default function SearchProductComponent(props) {
  const dispatch = useDispatch();
  const { keyword } = props.match.params;
  const { listProduct, productPagination, hasMore } = useSelector(
    (state) => state.ProductReducer
  );
  const minValue = _?.minBy(listProduct, (e) => e.dongia)?.dongia;
  const maxValue = _?.maxBy(listProduct, (e) => e.dongia)?.dongia;
  const { visible, title } = useSelector((state) => state.ModalReducer);
  const [timeLeft, setTimeLeft] = useState(0);
  const { product } = useSelector((state) => state.ProductReducer);
  const [state, setState] = useState({
    min: null,
    max: null,
  });
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch({
      type: GET_ALL_PRODUCT_BY_KEYWORD_ACTION,
      tensp: keyword,
    });

    dispatch({
      type: KEYWORD,
      keyword,
    });

    if (_.isEqual(title, TITLE_MODAL_PRODUCT_DETAIL)) {
      setTimeLeft(0);
      const intervalId = setInterval(() => {
        setTimeLeft((t) => {
          if (t === 4) {
            dispatch({
              type: UPDATE_VIEW_PRODUCT_ACTION,
              product,
            });
          }
          return (t = visible === false ? 0 : t + 1);
        });
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [visible]);

  const loadMoreData = () => {
    dispatch({
      type: GET_PRODUCT_PAGINATION,
      productPagination,
    });
  };
  console.log("PRODUCT PAGINATION COMPONENT",productPagination)

  return (
    <>
      <MetaDecorator
        title={SEARCH_PRODUCT_PAGE_TITLE + ` ${keyword}`}
        description={SEARCH_PRODUCT_PAGE_DESCRIPTION}
      />
      <div className="flex justify-start">
        <button
          className="w-10 h-10 block rounded-sm -ml-10 top-32 z-9 fixed p-2  bg-green-500 hover:bg-green-600 lg:hidden"
          onClick={() => {
            dispatch({
              type: OPEN_FORM,
              Component: <Category />,
              title: "DANH MỤC",
              placement: "left",
              footer: false,
            });
          }}
        >
          <MenuUnfoldOutlined className="text-white" />
        </button>
      </div>
      <section className="shop spad w-full lg:container">
        <div className="container">
          <div className="flex flex-row lg:container">
            <div className="fold:hidden duo:w-1/2 duo:block md:w-2/5 lg:w-1/4 lg:container">
              <div className="w-4/5 flex flex-col duo:justify-start md:justify-end duo:float-left md:float-right">
                <div className="sidebar__categories">
                  <div className="section-title">
                    <h4>DANH MỤC</h4>
                  </div>
                  <Category />
                </div>
                <div className="flex flex-col mb-10 gap-y-3">
                  <div className="section-title mb-0">
                    <h4 className="border-none text-md font-bold">GIÁ</h4>
                  </div>
                  <div>
                    <Slider
                      min={minValue}
                      max={maxValue}
                      step={1000}
                      range={{ draggableTrack: true }}
                      defaultValue={[minValue?.dongia, maxValue?.dongia]}
                      onAfterChange={(e) => {
                        setState({
                          min: _.first(e),
                          max: _.last(e),
                        });
                      }}
                    />
                  </div>
                  <div className="flex flex-row">
                    <div className="mr-3">
                      <button
                        className="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded cursor-pointer"
                        onClick={() => {
                          dispatch({
                            type: GET_ALL_PRODUCT_BY_KEYWORD,
                            listProduct: _?.filter(
                              listProduct,
                              (d) =>
                                d.dongia >= state?.min && d.dongia <= state?.max
                            ),
                          });
                          setState({
                            min: minValue,
                            max: maxValue,
                          });
                        }}
                      >
                        Áp dụng
                      </button>
                    </div>
                    <div className="ml-3">
                      <button
                        className="bg-gradient-to-r from-green-400 to-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                        onClick={() => {
                          dispatch({
                            type: GET_ALL_PRODUCT_BY_KEYWORD_ACTION,
                            tensp: keyword,
                          });
                        }}
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="fold:w-full duo:w-1/2 md:w-3/5 lg:w-3/4">
              <div className="flex flex-row justify-start ml-4">
                <h1>
                  Kết quả tìm kiếm cho <b>`{keyword}`</b>
                </h1>
              </div>
              <div className="flex flex-row justify-start gap-6 ml-4 pt-5 border-gray-50">
                <div className="w-20 flex justify-start border-b-4 border-white hover:text-green-700 hover:border-green-700 hover:font-bold">
                  <label
                    className="text-base cursor-pointer"
                    onClick={() => {
                      dispatch({
                        type: GET_ALL_PRODUCT_BY_KEYWORD,
                        listProduct: _.orderBy(productPagination, [
                          (item) => item.views,
                        ]),
                      });
                    }}
                  >
                    Phổ biến
                  </label>
                </div>
                <div className="w-20 flex justify-start border-b-4 border-white hover:text-green-700 hover:border-green-700 hover:font-bold">
                  <label
                    className="text-base cursor-pointer"
                    onClick={() => {
                      dispatch({
                        type: GET_ALL_PRODUCT_BY_KEYWORD,
                        listProduct: _.orderBy(listProduct, [
                          (item) => item.daban,
                        ]),
                      });
                    }}
                  >
                    Bán chạy
                  </label>
                </div>
                <div className="w-20 flex justify-start border-b-4 border-white hover:text-green-700 hover:border-green-700 hover:font-bold">
                  <label
                    className="text-base cursor-pointer "
                    onClick={() => {
                      dispatch({
                        type: GET_ALL_PRODUCT_BY_KEYWORD,
                        listProduct: _.orderBy(
                          listProduct,
                          [
                            function (object) {
                              return new Date(object.ngaytao);
                            },
                          ],
                          ["desc"]
                        ),
                      });
                    }}
                  >
                    Hàng mới
                  </label>
                </div>
                <div className="w-20 flex justify-start border-b-4 border-white hover:text-green-700 hover:border-green-700 hover:font-bold">
                  <label
                    className="text-base cursor-pointer"
                    onClick={() => {
                      dispatch({
                        type: GET_ALL_PRODUCT_BY_KEYWORD,
                        listProduct: _.orderBy(
                          listProduct,
                          [(item) => item.dongia],
                          "asc"
                        ),
                      });
                    }}
                  >
                    Giá thấp
                  </label>
                </div>
                <div className="w-20 flex justify-start border-b-4 border-white hover:text-green-700 hover:border-green-700 hover:font-bold">
                  <label
                    className="text-base cursor-pointer"
                    onClick={() => {
                      dispatch({
                        type: GET_ALL_PRODUCT_BY_KEYWORD,
                        listProduct: _.orderBy(
                          listProduct,
                          [(item) => item.dongia],
                          "desc"
                        ),
                      });
                    }}
                  >
                    Giá cao
                  </label>
                </div>
              </div>
              <div>
                <InfiniteScroll
                  dataLength={productPagination?.length}
                  next={loadMoreData}
                  hasMore={hasMore}
                  loader={
                    productPagination?.length > 0 ? (
                      <div className="flex fold:flex-col md:flex-row w-full justify-center">
                      <div className="flex flex-col m-8 rounded shadow-md fold:w-full md:w-1/3 animate-pulse h-96">
                        <div className="h-48 rounded-t bg-gray-300" />
                        <div className="flex-1 px-4 py-8 space-y-4 sm:p-8 bg-gray-50">
                          <div className="w-full h-6 rounded bg-gray-300" />
                          <div className="w-full h-6 rounded bg-gray-300" />
                          <div className="w-3/4 h-6 rounded bg-gray-300" />
                        </div>
                      </div>
                      <div className="flex flex-col m-8 rounded shadow-md fold:hidden md:block md:w-1/3 animate-pulse h-96">
                        <div className="h-48 rounded-t bg-gray-300" />
                        <div className="flex-1 px-4 py-8 space-y-4 sm:p-8 bg-gray-50">
                          <div className="w-full h-6 rounded bg-gray-300" />
                          <div className="w-full h-6 rounded bg-gray-300" />
                          <div className="w-3/4 h-6 rounded bg-gray-300" />
                        </div>
                      </div> 
                      <div className="flex flex-col m-8 rounded shadow-md fold:hidden md:block md:w-1/3 animate-pulse h-96">
                        <div className="h-48 rounded-t bg-gray-300" />
                        <div className="flex-1 px-4 py-8 space-y-4 sm:p-8 bg-gray-50">
                          <div className="w-full h-6 rounded bg-gray-300" />
                          <div className="w-full h-6 rounded bg-gray-300" />
                          <div className="w-3/4 h-6 rounded bg-gray-300" />
                        </div>
                      </div>
                      </div>
                    ) : (
                      <div className="w-full flex flex-row justify-center">
                        <img src="https://notebookstore.in/image/no-product-found.png" />
                      </div>
                    )
                  }
                  endMessage={
                    productPagination?.length > 0 ? (
                      <p style={{ textAlign: "center" }}>
                        <b>Bạn đã xem hết sản phẩm!</b>
                      </p>
                    ) : (
                      <div className="w-full flex flex-row justify-center">
                        <img src="https://notebookstore.in/image/no-product-found.png" />
                      </div>
                    )
                  }
                  scrollableTarget="scrollableDiv"
                >
                  <div className="flex flex-row flex-wrap">
                    {_?.map(productPagination, (product, i) => {
                      return (
                        <div className="fold:w-full lg:w-1/2 xl:w-1/3" key={i}>
                          <ProductSingleComponent
                            i={i}
                            product={product}
                            timeLeft={timeLeft}
                          />
                        </div>
                      );
                    })}
                  </div>
                </InfiniteScroll>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
