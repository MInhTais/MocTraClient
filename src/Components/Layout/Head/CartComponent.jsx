import _ from "lodash";
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { GET_ALL_PRODUCT_BY_KEYWORD_ACTION } from "../../../Common/Action/Product/Product";
import { ADD_SEARCH_KEY } from "../../../Common/Const/Product/ProductConst";
import moment from 'moment';
import { history } from "../../../libs/History/history";
import { REMOVE_PRODUCT_TO_CART } from "../../../Common/Const/Cart/CartConst";
import { CloseCircleOutlined } from "@ant-design/icons";

export default function CartComponent() {
  const { carts } = useSelector((state) => state.CartReducer);
  const dispatch = useDispatch();
  const { categories } = useSelector(
    (state) => state.CategoryReducer.categories
  );
  const renderTag = () => {
    let cat = _.sample(categories);
    return _?.map(cat?.loai, (item, i) => {
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
              datetime: moment(),
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
    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <tbody className="bg-white divide-y divide-gray-200">
              {_.map(carts, (cart, i) => (
                <tr key={i} className="hover:bg-green-50">
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
                            ? cart?.tensp?.slice(0, 14) + "..."
                            : cart?.tensp}{" "}
                          x {cart?.sl}
                        </div>
                        <div className="text-sm text-gray-500"></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {(
                        cart.dongia -
                        (cart.dongia * cart.giamgia) / 100
                      ).toLocaleString() + "đ"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a
                      onClick={() => {
                        dispatch({
                          type: REMOVE_PRODUCT_TO_CART,
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
                <div className="px-6 pt-4 pb-2">{renderTag()}</div>
              </div>
            )}
          </table>
        </div>
      </div>
    </div>
  );
}
