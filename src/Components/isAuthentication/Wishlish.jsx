import _ from "lodash";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Action from "../../Common/Action/Authentication/AuthAction";
import { CUSTOMER } from "../../Common/Const/Auth/AuthConst";
import { ADD_CART } from "../../Common/Const/Cart/CartConst";
import {
  WISHLIST_PAGE_DESCRIPTION,
  WISHLIST_PAGE_TITLE,
} from "../../Common/Const/Page/PageConst";
import MetaDecorator from "../../libs/Helmet/MetaDecorator";
import PageNotFound from "../Error/PageNotFound";
import ProductCarousel from "../Home/ProductCarousel";

export default function Wishlish(props) {
  const dispatch = useDispatch();
  const { wishlist,user } = useSelector((state) => state.isAuthReducer);
  const { credentials } = useSelector((state) => state.AuthReducer);

  useEffect(() => {
    if (_.find(credentials?.roles, (e) => e === CUSTOMER)) {
      dispatch({
        type: Action.ORDER_WISHLIST_VOUCHER_ACTION,
      });
    }
    window.scrollTo(0, 0);
  }, []);

  const addCart = (product) => {
    product.sl = 1;
    product.stick = false;
    dispatch({
      type: ADD_CART,
      sanpham: product,
    });
  };

  const renderWishlist = () => {
    if (_.isEmpty(user)) {
      return (
        <div className="w-full flex fold:flex-col lg:flex-row bg-gray-100 h-140">
          <div className="flex flex-col m-8 rounded shadow-md w-60 fold:w-3/4 sm:w-80 animate-pulse h-96">
            <div className="h-48 rounded-t bg-gray-300" />
            <div className="flex-1 px-4 py-8 space-y-4 sm:p-8 bg-gray-50">
              <div className="w-full h-6 rounded bg-gray-300" />
              <div className="w-full h-6 rounded bg-gray-300" />
              <div className="w-3/4 h-6 rounded bg-gray-300" />
            </div>
          </div>
          <div className="flex flex-col m-8 rounded shadow-md w-60 fold:hidden sm:w-80 md:block animate-pulse h-96">
            <div className="h-48 rounded-t bg-gray-300" />
            <div className="flex-1 px-4 py-8 space-y-4 sm:p-8 bg-gray-50">
              <div className="w-full h-6 rounded bg-gray-300" />
              <div className="w-full h-6 rounded bg-gray-300" />
              <div className="w-3/4 h-6 rounded bg-gray-300" />
            </div>
          </div>
          <div className="flex flex-col m-8 rounded shadow-md w-60 fold:hidden sm:w-80 xl:block animate-pulse h-96">
            <div className="h-48 rounded-t bg-gray-300" />
            <div className="flex-1 px-4 py-8 space-y-4 sm:p-8 bg-gray-50">
              <div className="w-full h-6 rounded bg-gray-300" />
              <div className="w-full h-6 rounded bg-gray-300" />
              <div className="w-3/4 h-6 rounded bg-gray-300" />
            </div>
          </div>
        </div>
      );
    } else {
      return <ProductCarousel addCart={addCart} wishlist={wishlist} />;
    }
  };

  return (
    <>
      <MetaDecorator
        title={WISHLIST_PAGE_TITLE}
        description={WISHLIST_PAGE_DESCRIPTION}
      />
      {_.find(credentials?.roles, (e) => e === CUSTOMER) ? (
        <div className="fold:w-full md:container duo:w-3/4">
          {renderWishlist()}
        </div>
      ) : (
        <PageNotFound />
      )}
    </>
  );
}
