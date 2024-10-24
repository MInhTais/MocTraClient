import React, { useEffect } from "react";
import { Tabs } from "antd";
import { StickyContainer, Sticky } from "react-sticky";
import RevenueComponent from "./Statistical/RevenueComponent";
import FeesComponent from "./Statistical/FeesComponent";
import TotalRevenueComponent from "./Statistical/TotalRevenueComponent";
import { useSelector, useDispatch } from "react-redux";
import * as Action from "../../Common/Action/Admin/AdminAction";
import _ from "lodash";
import AccessDenied from "../Error/AccessDenied";
import { MANAGER, SELLER } from "../../Common/Const/Auth/AuthConst";
import { FIND_ALL_STATISTICAL_SELLER_ACTION } from "../../Common/Action/Admin/SellerAction";
import MetaDecorator from "../../libs/Helmet/MetaDecorator";
import { STATISTICAL_REVENUE_PAGE_DESCRIPTION, STATISTICAL_REVENUE_PAGE_TITLE } from "../../Common/Const/Page/PageConst";

const { TabPane } = Tabs;
export default function StatisticalByRevenue(props) {
  const dispatch = useDispatch();
  const { dtbh, cp, dt, mtdtbh, mtcp, mtdt } = useSelector(
    (state) => state.StatisticalReducer
  );
  const { dtbhSeller, cpSeller, dtSeller } = useSelector(
    (state) => state.StatisticalSellerReducer
  );
  const { credentials } = useSelector((state) => state.AuthReducer);
  useEffect(() => {
    if (_.find(credentials?.roles,e=>e===MANAGER) && admin) {
      dispatch({
        type: Action.FIND_ALL_STATISTICAL_ACTION,
      });
    } else if (seller && _.find(credentials?.roles,e=>e===SELLER)) {
      dispatch({
        type: FIND_ALL_STATISTICAL_SELLER_ACTION,
      });
    }
  }, []);
  const { seller, admin,size } = props;
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
  const renderByRole = () => {
    const adminRoles = _.find(credentials?.roles, (e) => e === MANAGER);
    const sellerRoles = _.find(credentials?.roles, (e) => e === SELLER);
    return adminRoles && admin ? (
      <StickyContainer>
        <Tabs defaultActiveKey="1" renderTabBar={renderTabBar}>
          <TabPane tab="Doanh thu bán hàng" key="1">
            <RevenueComponent size={size} seller={seller} admin={admin} dtbh={dtbh} mtdtbh={mtdtbh} />
          </TabPane>
          <TabPane tab="Chi phí" key="2">
            <FeesComponent size={size} seller={seller} admin={admin} cp={cp} mtcp={mtcp} />
          </TabPane>
          <TabPane tab="Doanh thu" key="3">
            <TotalRevenueComponent size={size} seller={seller} admin={admin} dt={dt} mtdt={mtdt} />
          </TabPane>
        </Tabs>
      </StickyContainer>
    ) : seller && sellerRoles ? (
      <StickyContainer>
        <Tabs defaultActiveKey="1" renderTabBar={renderTabBar}>
          <TabPane tab="Doanh thu bán hàng" key="1">
            <RevenueComponent size={size} dtbh={dtbhSeller} mtdtbh={mtdtbh} seller={seller} admin={admin} />
          </TabPane>
          <TabPane tab="Chi phí" key="2">
            <FeesComponent cp={cpSeller} mtcp={mtcp} seller={seller} admin={admin} size={size} />
          </TabPane>
          <TabPane tab="Doanh thu" key="3">
            <TotalRevenueComponent dt={dtSeller} mtdt={mtdt} seller={seller} admin={admin} size={size} />
          </TabPane>
        </Tabs>
      </StickyContainer>
    ) : (
      <AccessDenied />
    );
  };

  return <div className="container w-full">
    <MetaDecorator title={STATISTICAL_REVENUE_PAGE_TITLE} description={STATISTICAL_REVENUE_PAGE_DESCRIPTION} />
    {renderByRole()}
  </div>;
}
