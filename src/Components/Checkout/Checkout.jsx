import React from "react";
import { Steps } from "antd";
import MethodCOComponent from "../Checkout/MethodCOComponent";
import TableCart from "../Cart/TableCart";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../../libs/History/history";
import _ from "lodash";
import { IS_CHECKOUT } from "../../Common/Const/Order/OrderConst";
import PaymentMethodComponent from "./PaymentMethodComponent";
import { CUSTOMER } from "../../Common/Const/Auth/AuthConst";
import { notify } from "../../libs/Notify/Notify";
import { FIRST_CURRENT } from "../../Common/Const/Checkout/CheckoutConst";
import { FIND_FEES_GOSHIP_ACTION } from "../../Common/Action/Checkout/CheckoutAction";
import MetaDecorator from "../../libs/Helmet/MetaDecorator";
import {
  CHECKOUT_PAGE_DESCRIPTION,
  CHECKOUT_PAGE_TITLE,
} from "../../Common/Const/Page/PageConst";
import { NOT_PRODUCT_IS_SELECTED_WARNING, NOT_SUITABLE_ACCESS_PAGE_WARNING } from "../../Common/Const/Notify/NotifyConst";

const { Step } = Steps;
export default function Checkout(props) {
  const dispatch = useDispatch();
  const { carts } = useSelector((state) => state.CartReducer);
  const { current } = useSelector((state) => state.CheckoutReducer);
  const { checkout, address } = useSelector((state) => state.AddressReducer);
  const { credentials } = useSelector((state) => state.AuthReducer);
  useEffect(() => {
    if (!carts || !_.find(credentials?.roles, (e) => e === CUSTOMER)) {
      notify("warning", NOT_SUITABLE_ACCESS_PAGE_WARNING);
      history.goBack();
    } else if (_.filter(carts, (e) => e.stick)?.length === 0) {
      notify('warning',NOT_PRODUCT_IS_SELECTED_WARNING)

      history.replace("/gio-hang");
    }
    dispatch({
      type: IS_CHECKOUT,
    });
    dispatch({
      type: FIRST_CURRENT,
    });
    let addressDefault = _.find(address, (e) => e.macdinh);
    if (addressDefault) {
      dispatch({
        type: FIND_FEES_GOSHIP_ACTION,
        addressDefault,
      });
    }

    window.scrollTo(0, 0);
  }, []);

  const steps = [
    {
      title: "Chọn phương thức vận chuyển",
      content: <MethodCOComponent current={current} />,
    },
    {
      title: "Kiểm tra đơn hàng & Thanh toán",
      content: <TableCart checkout={checkout} current={current} />,
    },
    {
      title: "Chọn phương thức thanh toán",
      content: <PaymentMethodComponent checkout={checkout} current={current} />,
    },
  ];

  return (
    <div className="mt-10 w-full">
      <MetaDecorator
        title={CHECKOUT_PAGE_TITLE}
        description={CHECKOUT_PAGE_DESCRIPTION}
      />
      <Steps
        current={current}
        className="flex fold:flex-col justify-center duo:flex-row"
        responsive={true}
        progressDot={true}
      >
        {_.map(steps, (item, i) => (
          <Step key={i} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content">{steps[current].content}</div>
    </div>
  );
}
