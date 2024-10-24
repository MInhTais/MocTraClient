import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ISNT_CHECKOUT, SELECT_ALL_TOGGLE } from "../../Common/Const/Order/OrderConst";
import { CART_PAGE_DESCRIPTION, CART_PAGE_TITLE } from "../../Common/Const/Page/PageConst";
import MetaDecorator from "../../libs/Helmet/MetaDecorator";
import TableCart from "./TableCart";

export default function Cart() {
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0,0);
    dispatch({
      type: ISNT_CHECKOUT,
    });
    dispatch({
      type: SELECT_ALL_TOGGLE
    })
  }, [])

  return (
    <>
      <MetaDecorator title={CART_PAGE_TITLE} description={CART_PAGE_DESCRIPTION} />
      <div className="w-full">
        <TableCart checkout={false} />
      </div>
    </>
  );
}
