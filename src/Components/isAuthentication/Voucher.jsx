import React from "react";
import { Tabs } from "antd";
import { StickyContainer, Sticky } from "react-sticky";
import VoucherComponent from "./Voucher/VoucherComponent";
import MyVoucherComponent from "./Voucher/MyVoucherComponent";
import { CUSTOMER } from "../../Common/Const/Auth/AuthConst";
import PageNotFound from '../Error/PageNotFound';
import _ from "lodash";
import {useDispatch, useSelector} from 'react-redux';
import { useEffect } from "react";
import MetaDecorator from "../../libs/Helmet/MetaDecorator";
import { DISCOUNT_PAGE_DESCRIPTION, DISCOUNT_PAGE_TITLE } from "../../Common/Const/Page/PageConst";
import { ORDER_WISHLIST_VOUCHER_ACTION } from "../../Common/Action/Authentication/AuthAction";

const { TabPane } = Tabs;
export default function Voucher(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0,0);
    if(_.isEmpty(user)){
      dispatch({
        type: ORDER_WISHLIST_VOUCHER_ACTION,
      });
    }
  }, [])
  const {credentials} = useSelector(state => state.AuthReducer);
  const {user} = useSelector((state)=>state.isAuthReducer);

  const renderTabBar = (props, DefaultTabBar) => (
    <Sticky bottomOffset={80}>
      {({ style }) => (
        <DefaultTabBar
          {...props}
          className="site-custom-tab-bar"
          style={{ ...style }}
        />
      )}
    </Sticky>
  );
 
  return (
    <>
      <MetaDecorator title={DISCOUNT_PAGE_TITLE} description={DISCOUNT_PAGE_DESCRIPTION} />
      {_.isEmpty(user) ? <div className="w-full flex flex-col bg-gray-100 h-140">
          <div className="flex flex-row justify-start gap-6 m-8">
            <div className="bg-gray-200 animate-pulse w-32 h-10"></div>
            <div className="bg-gray-200 animate-pulse w-32 h-10"></div>
          </div>
          <div className="w-full flex fold:flex-col lg:flex-row">
            <div className="flex flex-col m-8 rounded shadow-md w-full animate-pulse h-48">
              <div className="h-48 rounded-t bg-gray-200" />
            </div>
          </div>
        </div>  : <>{_.find(credentials?.roles,e=>e===CUSTOMER) ? <StickyContainer className="w-full container">
        <Tabs defaultActiveKey="1" renderTabBar={renderTabBar}>
          <TabPane tab="Mã giảm giá" key="1">
            <VoucherComponent />
          </TabPane>
          <TabPane tab="Mã của tôi" key="2">
            <MyVoucherComponent />
          </TabPane>
        </Tabs>
      </StickyContainer> : <PageNotFound />}</>}
    </>
  );
}
