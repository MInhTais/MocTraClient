import React, { useEffect, useState } from "react";
import * as Action from "../../Common/Action/Category/CategoryAction";
import { useSelector, useDispatch } from "react-redux";
import { Menu, Rate, Tag, Tooltip } from "antd";
import {
  PieChartOutlined,
  ContainerOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import _ from "lodash";
import {
  FIND_ALL_BY_PRODUCT_BY_CATEGORY_ACTION,
  FIND_ALL_PRODUCTS_BY_CATEGORY_ACTION,
  FIND_ALL_PRODUCTS_BY_PRICES_ACTION,
  FIND_ALL_PRODUCTS_BY_REVIEWS_ACTION,
  FIND_ALL_PRODUCT_BY_BRAND_ACTION,
} from "../../Common/Action/Product/Product";
import { history } from "../../libs/History/history";
import { ADD_SEARCH_KEY, GET_ALL_PRODUCT_BY_KEYWORD,FILTER_BY_PRICE, KEYWORD_LESSTHAN_40000, KEYWORD_LESSTHAN_120000_AND_GREATER_THAN_40000, KEYWORD_LESSTHAN_380000_AND_GREATER_THAN_120000, KEYWORD_GREATER_THAN_380000 } from "../../Common/Const/Product/ProductConst";
import moment from "moment";
const { SubMenu } = Menu;

const icon = [<ContainerOutlined />, <TrophyOutlined />, <PieChartOutlined />];
export default function Category(props) {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.CategoryReducer);
  const [count, setCount] = useState(5);
  const [countCategory, setCountCategory] = useState(1);
  const { keyword,listProduct } = useSelector((state) => state.ProductReducer);
  useEffect(() => {
    if (_.isEmpty(categories)) {
      dispatch({ type: Action.FIND_ALL_CATEGORIES_ACTION });
    }
  }, []);

  const filterByStart = (start) => {
    dispatch({
      type: FIND_ALL_PRODUCTS_BY_REVIEWS_ACTION,
      danhgia: start,
    });

    let title = `Từ ${start} sao`;
    let search = {
      title,
      type: "keyword",
      url: `/search/${title}`,
      datetime: moment(),
    };
    dispatch({
      type: ADD_SEARCH_KEY,
      search,
    });

    history.push(`/search/${title}`);
  };

  return (
    <div className="w-full">
      {categories?.length === 0 ? (
        <div className="w-full h-96 animate-pulse">
          <div>
            <div className="flex flex-col px-4 py-8 space-y-4 sm:p-8 bg-gray-50">
              <div className="w-full h-6 rounded bg-gray-300 flex flex-col"></div>
              <div className="w-full h-6 rounded bg-gray-300 flex flex-col"></div>
              <div className="w-full h-6 rounded bg-gray-300 flex flex-col"></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full flex flex-col">
          <h1>BỘ LỌC TÌM KIẾM</h1>
          <div className="border-b-1 border-gray-300 w-full flex flex-col p-2">
            <p className="w-full flex flex-row">Theo danh mục</p>
            {_?.map(categories?.categories, (item, i) => {
              return (
                <div
                  className="flex flex-row w-full justify-start gap-2"
                  key={i}
                >
                  <Tooltip title={item.tennhom}>
                    <label
                      className="border-b-animation border-green-700 cursor-pointer"
                      key={i}
                      onClick={() => {
                        dispatch({
                          type: FIND_ALL_PRODUCTS_BY_CATEGORY_ACTION,
                          manhom: item.manhom,
                        });
                        history.push(`/search/${item.tennhom}`);
                      }}
                    >
                      {item.tennhom} (
                      {_.reduce(
                        item?.loai,
                        (total, loai) => {
                          return (total += loai?.sanpham?.length);
                        },
                        0
                      )}
                      )
                    </label>
                  </Tooltip>
                </div>
              );
            })}
          </div>
          <div className="border-b-1 border-gray-300 w-full flex flex-col p-2">
            <p className="w-full flex flex-row justify-start">
              Theo loại sản phẩm
            </p>
            {_?.map(categories?.categories, (item) => {
              return _.map(item?.loai?.slice(0, countCategory), (l, i) => {
                return (
                  <div
                    className="flex flex-row w-full justify-start gap-2"
                    key={i}
                  >
                    <Tooltip title={l.tenloai}>
                      <label
                        className="border-b-animation border-green-700 cursor-pointer"
                        onClick={() => {
                          dispatch({
                            type: FIND_ALL_BY_PRODUCT_BY_CATEGORY_ACTION,
                            maloai: l.maloai,
                          });
                          let search = {
                            title: l.tenloai,
                            type: "keyword",
                            url: `/search/${l.tenloai}`,
                            datetime: moment(),
                          };
                          dispatch({
                            type: ADD_SEARCH_KEY,
                            search,
                          });
                          history.push(`/search/${l.tenloai}`);
                        }}
                      >
                        {l.tenloai} ({l?.sanpham?.length})
                      </label>
                    </Tooltip>
                  </div>
                );
              });
            })}
            <div>
              {countCategory * 3 >=
              _.reduce(
                categories?.categories,
                (total, category) => {
                  return (total += category?.loai?.length);
                },
                0
              ) ? (
                <label
                  className="cursor-pointer hover:text-green-500"
                  onClick={() => {
                    setCountCategory(1);
                  }}
                >
                  Thu gọn
                </label>
              ) : (
                <label
                  className="cursor-pointer hover:text-green-500"
                  onClick={() => {
                    setCountCategory(countCategory + 1);
                  }}
                >
                  Xem thêm
                </label>
              )}
            </div>
          </div>
          <div className="border-b-1 border-gray-300 w-full flex flex-col p-2">
            <p className="w-full flex flex-row justify-start">
              Theo thương hiệu
            </p>
            {_?.map(categories?.brands.slice(0, count), (item, i) => {
              return (
                <div
                  className="flex flex-row w-full justify-start gap-2"
                  key={i}
                >
                  <Tooltip title={item.tenth}>
                    <label
                      className="border-b-animation border-green-700 cursor-pointer uppercase"
                      onClick={() => {
                        dispatch({
                          type: FIND_ALL_PRODUCT_BY_BRAND_ACTION,
                          math: item.math,
                        });
                        let search = {
                          title: item.tenth,
                          type: "keyword",
                          url: `/search/${item.tenth}`,
                          datetime: moment(),
                        };
                        dispatch({
                          type: ADD_SEARCH_KEY,
                          search,
                        });
                        history.push(`/search/${item.tenth}`);
                      }}
                    >
                      {item.tenth}
                    </label>
                  </Tooltip>
                </div>
              );
            })}
            <div>
              {count >= categories?.brands?.length ? (
                <label
                  className="cursor-pointer hover:text-green-500"
                  onClick={() => {
                    setCount(5);
                  }}
                >
                  Thu gọn
                </label>
              ) : (
                <label
                  className="cursor-pointer hover:text-green-500"
                  onClick={() => {
                    setCount(count + 5);
                  }}
                >
                  Xem thêm
                </label>
              )}
            </div>
          </div>

          <div className="border-b-1 border-gray-300 w-full flex flex-col p-2">
            <p className="w-full flex flex-row justify-start">Theo đánh giá</p>
            <div
              className="w-full flex flex-row gap-2 cursor-pointer"
              onClick={() => filterByStart(5)}
            >
              <Rate
                disabled
                defaultValue={5}
                className="text-xs cursor-pointer hover:animate-bounce"
              />
              <label className="cursor-pointer">từ 5 sao</label>
            </div>
            <div
              className="w-full flex flex-row gap-2 cursor-pointer"
              onClick={() => filterByStart(4)}
            >
              <Rate
                disabled
                defaultValue={4}
                className="text-xs cursor-pointer hover:animate-bounce"
              />
              <label className="cursor-pointer">từ 4 sao</label>
            </div>
            <div
              className="w-full flex flex-row gap-2 cursor-pointer"
              onClick={() => filterByStart(3)}
            >
              <Rate
                disabled
                defaultValue={3}
                className="text-xs cursor-pointer hover:animate-bounce"
              />
              <label className="cursor-pointer">từ 3 sao</label>
            </div>
          </div>
          <div className="border-b-1 border-gray-300 w-2/3 flex flex-col p-2">
            <p className="w-full flex flex-row justify-start">Theo giá</p>
            <div className="w-full flex flex-row flex-wrap gap-y-2">
              <Tag
                color={"lime"}
                onClick={() => {
                  // dispatch({
                  //   type: FIND_ALL_PRODUCTS_BY_PRICES_ACTION,
                  //   min: 40000,
                  //   max: 40000,
                  //   range: false,
                  //   ten: keyword,
                  // });
                  dispatch({
                    type: FILTER_BY_PRICE,
                    max:40000,
                    keyword: KEYWORD_LESSTHAN_40000
                  })
                }}
                className="cursor-pointer"
              >
                {"Dưới 40.000"}
              </Tag>
              <Tag
                color={"green"}
                onClick={() => {
                  // dispatch({
                  //   type: FIND_ALL_PRODUCTS_BY_PRICES_ACTION,
                  //   min: 40000,
                  //   range: true,
                  //   max: 119999,
                  //   ten: keyword,
                  // });
                  dispatch({
                    type: FILTER_BY_PRICE,
                    min: 40000,
                    max:120000,
                    keyword:KEYWORD_LESSTHAN_120000_AND_GREATER_THAN_40000
                  })
                }}
                className="cursor-pointer"
              >
                {"Từ 40.000 - dưới 120.000"}
              </Tag>
              <Tag
                color={"magenta"}
                onClick={() => {
                  // dispatch({
                  //   type: FIND_ALL_PRODUCTS_BY_PRICES_ACTION,
                  //   min: 120000,
                  //   range: true,
                  //   max: 379999,
                  //   ten: keyword,
                  // });
                  dispatch({
                    type: FILTER_BY_PRICE,
                    min: 120000,
                    max:380000,
                    keyword:KEYWORD_LESSTHAN_380000_AND_GREATER_THAN_120000
                  })
                }}
                className="cursor-pointer"
              >
                {"Từ 120.000 - dưới 380.000"}
              </Tag>
              <Tag
                color={"cyan"}
                onClick={() => {
                  // dispatch({
                  //   type: FIND_ALL_PRODUCTS_BY_PRICES_ACTION,
                  //   min: 380000,
                  //   range: false,
                  //   max: 380000,
                  //   ten: keyword,
                  // });
                  dispatch({
                    type: FILTER_BY_PRICE,
                    min: 380000,
                    keyword:KEYWORD_GREATER_THAN_380000
                  })
                }}
                className="cursor-pointer"
              >
                {"Trên 380.000"}
              </Tag>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
