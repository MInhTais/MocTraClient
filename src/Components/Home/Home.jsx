import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as Action from "../../Common/Action/Category/CategoryAction";
import { GlobalStyle } from "../../globalStyles";
import * as CartAction from "../../Common/Const/Cart/CartConst";
import _ from "lodash";
import ProductCarousel from "./ProductCarousel";
import ReactGa from "react-ga";
import { UPDATE_VIEW_PRODUCT_ACTION } from "../../Common/Action/Product/Product";
import { TITLE_MODAL_PRODUCT_DETAIL } from "../../Common/Const/Product/ProductConst";
import {
  responsive,
  responsiveCategory,
  responsiveProductHome,
} from "./ResponsiveCarousel";
import Carousel from "react-multi-carousel";
import { Tabs } from "antd";
import ProductSingleComponent from "./ProductSingleComponent";
import {
  CrownOutlined,
  FireOutlined,
  PercentageOutlined,
  ShakeOutlined,
  ShopOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import moment from "moment";
import FirstModal from "./FirstModal";
import Gallery from "./Gallery";
import MetaDecorator from "../../libs/Helmet/MetaDecorator";
import {
  HOME_PAGE_DESCRIPTION,
  HOME_PAGE_TITLE,
} from "../../Common/Const/Page/PageConst";

const { TabPane } = Tabs;
const banners = [
  "http://localhost:8080/images/banner/banner-1.jpg",
  "http://localhost:8080/images/banner/banner-2.jpg",
  "http://localhost:8080/images/banner/banner-3.jpg",
];
export default function Home(props) {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.CategoryReducer);
  const { visible, title } = useSelector((state) => state.ModalReducer);
  const [timeLeft, setTimeLeft] = useState(0);
  const { product } = useSelector((state) => state.ProductReducer);
  const { size } = props;
  useEffect(() => {
    if(!categories){
      dispatch({
        type: Action.FIND_ALL_CATEGORIES_ACTION,
      });
    }

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

  const addCart = (product) => {
    product.sl = 1;
    product.stick = false;
    dispatch({
      type: CartAction.ADD_CART,
      sanpham: product,
    });

    ReactGa.event({
      category: "Click",
      action: "add to cart",
    });
  };

  const renderHome = () => {
    return _.map(categories?.categories, (category, i) => {
      return (
        <div className="w-full sale-product float-right md:container" key={i}>
          {_?.map(category?.loai, (subcategory, index) => {
            return (
              <div
                className={
                  _?.filter(
                    subcategory?.sanpham,
                    (e) => e.conlai > 0 && e.trangthai
                  )?.length > 0
                    ? "w-full"
                    : "hidden"
                }
                key={index}
              >
                <h2>
                  <b className="text-xl uppercase">{subcategory.tenloai}</b>
                </h2>
                <ProductCarousel
                  timeLeft={timeLeft}
                  addCart={addCart}
                  products={subcategory?.sanpham}
                  i={index}
                />
              </div>
            );
          })}

          <GlobalStyle />
        </div>
      );
    });
  };

  return (
    <div className="w-full container">
      <MetaDecorator
        title={HOME_PAGE_TITLE}
        description={HOME_PAGE_DESCRIPTION}
      />
      {categories?.length === 0 ? null : <FirstModal />}
      <div className="row container">
        {categories?.length === 0 ? (
          <>
            <div className="flex fold:flex-col md:flex-row w-full justify-center mb-20">
              <div className="flex flex-col m-8 rounded shadow-md fold:w-full md:w-1/7 animate-pulse h-12">
                <div className="flex-1 px-4 py-8 space-y-4 sm:p-8 bg-gray-50">
                  <div className="w-full justify-center h-8 rounded-full bg-gray-300" />
                  <div className="w-full h-4 rounded bg-gray-300" />
                </div>
              </div>
              <div className="flex flex-col m-8 rounded shadow-md fold:w-full md:w-1/7 animate-pulse h-12">
                <div className="flex-1 px-4 py-8 space-y-4 sm:p-8 bg-gray-50">
                  <div className="w-full justify-center h-8 rounded-full bg-gray-300" />
                  <div className="w-full h-4 rounded bg-gray-300" />
                </div>
              </div>
              <div className="flex flex-col m-8 rounded shadow-md fold:w-full md:w-1/7 animate-pulse h-12">
                <div className="flex-1 px-4 py-8 space-y-4 sm:p-8 bg-gray-50">
                  <div className="w-full justify-center h-8 rounded-full bg-gray-300" />
                  <div className="w-full h-4 rounded bg-gray-300" />
                </div>
              </div>
              <div className="flex flex-col m-8 rounded shadow-md fold:w-full md:w-1/7 animate-pulse h-12">
                <div className="flex-1 px-4 py-8 space-y-4 sm:p-8 bg-gray-50">
                  <div className="w-full justify-center h-8 rounded-full bg-gray-300" />
                  <div className="w-full h-4 rounded bg-gray-300" />
                </div>
              </div>
              <div className="flex flex-col m-8 rounded shadow-md fold:w-full md:w-1/7 animate-pulse h-12">
                <div className="flex-1 px-4 py-8 space-y-4 sm:p-8 bg-gray-50">
                  <div className="w-full justify-center h-8 rounded-full bg-gray-300" />
                  <div className="w-full h-4 rounded bg-gray-300" />
                </div>
              </div>
              <div className="flex flex-col m-8 rounded shadow-md fold:w-full md:w-1/7 animate-pulse h-12">
                <div className="flex-1 px-4 py-8 space-y-4 sm:p-8 bg-gray-50">
                  <div className="w-full justify-center h-8 rounded-full bg-gray-300" />
                  <div className="w-full h-4 rounded bg-gray-300" />
                </div>
              </div>
              <div className="flex flex-col m-8 rounded shadow-md fold:w-full md:w-1/7 animate-pulse h-12">
                <div className="flex-1 px-4 py-8 space-y-4 sm:p-8 bg-gray-50">
                  <div className="w-full justify-center h-8 rounded-full bg-gray-300" />
                  <div className="w-full h-4 rounded bg-gray-300" />
                </div>
              </div>
            </div>
            <div className="flex fold:flex-col md:flex-row w-full justify-center">
              <div className="flex flex-col m-8 rounded shadow-md fold:w-full md:w-1/5 animate-pulse h-96">
                <div className="h-48 rounded-t bg-gray-300" />
                <div className="flex-1 px-4 py-8 space-y-4 sm:p-8 bg-gray-50">
                  <div className="w-full h-6 rounded bg-gray-300" />
                  <div className="w-full h-6 rounded bg-gray-300" />
                  <div className="w-3/4 h-6 rounded bg-gray-300" />
                </div>
              </div>
              <div className="flex flex-col m-8 rounded shadow-md fold:w-full md:w-1/5 animate-pulse h-96">
                <div className="h-48 rounded-t bg-gray-300" />
                <div className="flex-1 px-4 py-8 space-y-4 sm:p-8 bg-gray-50">
                  <div className="w-full h-6 rounded bg-gray-300" />
                  <div className="w-full h-6 rounded bg-gray-300" />
                  <div className="w-3/4 h-6 rounded bg-gray-300" />
                </div>
              </div>
              <div className="flex flex-col m-8 rounded shadow-md fold:w-full md:w-1/5 animate-pulse h-96">
                <div className="h-48 rounded-t bg-gray-300" />
                <div className="flex-1 px-4 py-8 space-y-4 sm:p-8 bg-gray-50">
                  <div className="w-full h-6 rounded bg-gray-300" />
                  <div className="w-full h-6 rounded bg-gray-300" />
                  <div className="w-3/4 h-6 rounded bg-gray-300" />
                </div>
              </div>
              <div className="flex flex-col m-8 rounded shadow-md fold:w-full md:w-1/5 animate-pulse h-96">
                <div className="h-48 rounded-t bg-gray-300" />
                <div className="flex-1 px-4 py-8 space-y-4 sm:p-8 bg-gray-50">
                  <div className="w-full h-6 rounded bg-gray-300" />
                  <div className="w-full h-6 rounded bg-gray-300" />
                  <div className="w-3/4 h-6 rounded bg-gray-300" />
                </div>
              </div>
              <div className="flex flex-col m-8 rounded shadow-md fold:w-full md:w-1/5 animate-pulse h-96">
                <div className="h-48 rounded-t bg-gray-300" />
                <div className="flex-1 px-4 py-8 space-y-4 sm:p-8 bg-gray-50">
                  <div className="w-full h-6 rounded bg-gray-300" />
                  <div className="w-full h-6 rounded bg-gray-300" />
                  <div className="w-3/4 h-6 rounded bg-gray-300" />
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="w-full container">
              <label className="font-bold text-xl">DANH MỤC</label>
              <Carousel responsive={responsiveCategory}>
                {_.map(categories?.categories, (category) => {
                  return _.map(category?.loai, (sub, i) => {
                    return (
                      <div className="w-full p-4" key={i}>
                        <div className="border border-gray-200 p-6 rounded-lg hover:border-green-400 hover:shadow-md">
                          <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                            <img
                              src={
                                "http://localhost:8080/images/category/" +
                                sub.hinhanh
                              }
                            />
                          </div>
                          <h2 className="text-smtext-gray-900 font-medium title-font mb-2">
                            <a
                              className="text-black hover:text-green-500"
                              href={`/search/${sub.tenloai}`}
                            >
                              {sub.tenloai}
                            </a>
                          </h2>
                        </div>
                      </div>
                    );
                  });
                })}
              </Carousel>
            </div>
            <div className="w-full container pt-10">
              <label className="font-bold text-xl uppercase">
                Xu hướng mua sắm
              </label>
              <Carousel responsive={responsiveProductHome}>
                {_.map(
                  _.filter(
                    categories?.products,
                    (e) => e.trangthai && e.conlai > 0
                  ),
                  (product, i) => {
                    return (
                      <div key={i}>
                        <ProductSingleComponent
                          product={product}
                          i={i}
                          timeLeft={timeLeft}
                        />
                      </div>
                    );
                  }
                )}
              </Carousel>
            </div>
            <div className="w-full container  flex flex-row gap-2 pt-10 pb-10">
              {size?.width <= 768 ? (
                <div className="w-full">
                  <Carousel responsive={responsive}>
                    {_.map(banners, (item, i) => {
                      return (
                        <div key={i}>
                          <img src={item} />
                        </div>
                      );
                    })}
                  </Carousel>
                </div>
              ) : (
                _.map(banners, (item, i) => {
                  return (
                    <div key={i} className="w-1/3">
                      <img src={item} />
                    </div>
                  );
                })
              )}
            </div>
            <div className="w-full container  flex flex-col gap-2 pt-10 pb-10">
              <div className="w-full flex flex-row justify-start">
                <label className="font-bold text-xl uppercase">
                  GỢI Ý HÔM NAY
                </label>
              </div>

              <Tabs defaultActiveKey="2" className="w-full">
                <TabPane
                  tab={
                    <div className="w-full flex flex-col justify-center gap-y-4">
                      <label>
                        <UserSwitchOutlined className="text-2xl text-blue-500" />
                      </label>
                      <label>DÀNH CHO BẠN</label>
                    </div>
                  }
                  key="1"
                >
                  <div className="w-full flex flex-row flex-wrap justify-start">
                    {_.map(
                      _.orderBy(
                        categories?.listProducts,
                        [(item) => item.daban],
                        "desc"
                      ),
                      (product, i) => {
                        return (
                          <div
                            className="fold:w-full duo:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
                            key={i}
                          >
                            <ProductSingleComponent
                              product={product}
                              i={i}
                              timeLeft={timeLeft}
                            />
                          </div>
                        );
                      }
                    )}
                  </div>
                </TabPane>
                <TabPane
                  tab={
                    <div className="w-full flex flex-col justify-center gap-y-4">
                      <label>
                        <PercentageOutlined className="text-2xl text-blue-500" />
                      </label>
                      <label>SIÊU ƯU ĐÃI</label>
                    </div>
                  }
                  key="2"
                >
                  <div className="w-full flex flex-row flex-wrap justify-start">
                    {_.map(
                      _.orderBy(
                        categories?.listProducts,
                        [(item) => item.giamgia],
                        "desc"
                      ),
                      (product, i) => {
                        return (
                          <div
                            className="fold:w-full duo:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
                            key={i}
                          >
                            <ProductSingleComponent
                              product={product}
                              i={i}
                              timeLeft={timeLeft}
                            />
                          </div>
                        );
                      }
                    )}
                  </div>
                </TabPane>
                <TabPane
                  tab={
                    <div className="w-full flex flex-col justify-center gap-y-4">
                      <label>
                        <FireOutlined className="text-2xl text-blue-500 " />
                      </label>
                      <label>CHỈ TỪ 9K</label>
                    </div>
                  }
                  key="3"
                >
                  <div className="w-full flex flex-row flex-wrap justify-start">
                    {_.map(
                      _.orderBy(
                        categories?.listProducts,
                        [(item) => item.dongia],
                        "asc"
                      ),
                      (product, i) => {
                        return (
                          <div
                            className="fold:w-full duo:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
                            key={i}
                          >
                            <ProductSingleComponent
                              product={product}
                              i={i}
                              timeLeft={timeLeft}
                            />
                          </div>
                        );
                      }
                    )}
                  </div>
                </TabPane>
                <TabPane
                  tab={
                    <div className="w-full flex flex-col justify-center gap-y-4">
                      <label>
                        <ShakeOutlined className="text-2xl text-blue-500" />
                      </label>
                      <label>RẺ VÔ ĐỐI</label>
                    </div>
                  }
                  key="4"
                >
                  <div className="w-full flex flex-row flex-wrap justify-start">
                    {_.map(
                      _.filter(
                        categories?.listProducts,
                        (item) => item.dongia >= 9000 && item.dongia <= 50000
                      ),
                      (product, i) => {
                        return (
                          <div
                            className="fold:w-full duo:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
                            key={i}
                          >
                            <ProductSingleComponent
                              product={product}
                              i={i}
                              timeLeft={timeLeft}
                            />
                          </div>
                        );
                      }
                    )}
                  </div>
                </TabPane>
                <TabPane
                  tab={
                    <div className="w-full flex flex-col justify-center gap-y-4">
                      <label>
                        <ShopOutlined className="text-2xl text-blue-500" />
                      </label>
                      <label>HÀNG MỚI</label>
                    </div>
                  }
                  key="5"
                >
                  <div className="w-full flex flex-row flex-wrap justify-start">
                    {_.map(
                      _.orderBy(
                        categories?.listProducts,
                        [(item) => moment(item.ngaytao).unix()],
                        "desc"
                      ),
                      (product, i) => {
                        return (
                          <div
                            className="fold:w-full duo:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
                            key={i}
                          >
                            <ProductSingleComponent
                              product={product}
                              i={i}
                              timeLeft={timeLeft}
                            />
                          </div>
                        );
                      }
                    )}
                  </div>
                </TabPane>
                <TabPane
                  tab={
                    <div className="w-full flex flex-col justify-center gap-y-4">
                      <label>
                        <CrownOutlined className="text-2xl text-blue-500" />
                      </label>
                      <label>TẤT CẢ SẢN PHẨM</label>
                    </div>
                  }
                  key="6"
                >
                  {renderHome()}
                </TabPane>
              </Tabs>
            </div>
            <div className="w-full container  flex flex-col gap-2">
              {/* <div className="w-1/4"> */}
              <Gallery />
              {/* </div> */}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
