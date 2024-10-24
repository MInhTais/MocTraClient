import React, { useEffect } from "react";
import { Tabs } from "antd";
import { StickyContainer, Sticky } from "react-sticky";
import { useSelector, useDispatch } from "react-redux";
import ProductComponent from "./Statistical/ProductComponent";
import * as Action from "../../Common/Action/Admin/AdminAction";
import _ from "lodash";
import AccessDenied from "../Error/AccessDenied";
import StockProductComponent from "./Statistical/StockProductComponent";
import { FIND_ALL_STATISTICAL_SELLER_ACTION } from "../../Common/Action/Admin/SellerAction";
import { MANAGER, SELLER } from "../../Common/Const/Auth/AuthConst";
import FavoriteProductComponent from "./Statistical/FavoriteProductComponent";
import MetaDecorator from "../../libs/Helmet/MetaDecorator";
import { STATISTICAL_PRODUCT_PAGE_DESCRIPTION, STATISTICAL_PRODUCT_PAGE_TITLE } from "../../Common/Const/Page/PageConst";

const { TabPane } = Tabs;
export default function StatisticalByProduct(props) {
  const dispatch = useDispatch();
  const { sp,mtsp, spt,mtspt } = useSelector((state) => state.StatisticalReducer);
  const { credentials } = useSelector((state) => state.AuthReducer);
  const { spSeller, sptSeller} = useSelector(
    (state) => state.StatisticalSellerReducer
  );
  const { admin, seller,size } = props;
  useEffect(() => {
    if (admin) {
      dispatch({
        type: Action.FIND_ALL_STATISTICAL_ACTION,
      });
    } else if (seller) {
      dispatch({
        type: FIND_ALL_STATISTICAL_SELLER_ACTION
      })
    }
  }, []);

  const renderByRole = () => {
    const adminRoles = _.find(credentials?.roles, (e) => e === MANAGER);
    const sellerRoles = _.find(credentials?.roles, e=> e===SELLER);
    return adminRoles && admin ? (
      <StickyContainer>
        <Tabs defaultActiveKey="1" renderTabBar={renderTabBar}>
          <TabPane tab="Sản phẩm" key="1">
            <ProductComponent size={size} sp={sp} mtsp={mtsp} seller={seller} admin={admin} />
          </TabPane>
          <TabPane tab="Sản phẩm tồn" key="2">
            <StockProductComponent size={size} spt={spt} seller={seller} admin={admin} />
          </TabPane>
          <TabPane tab="Sản phẩm được quan tâm" key="3">
            <FavoriteProductComponent size={size} spqt={spt} seller={seller} admin={admin} />
          </TabPane>
        </Tabs>
      </StickyContainer>
    ) : seller && sellerRoles ? (
      <StickyContainer>
        <Tabs defaultActiveKey="1" renderTabBar={renderTabBar}>
          <TabPane tab="Sản phẩm" key="1">
            <ProductComponent size={size} seller={seller} sp={spSeller} mtsp={mtsp} seller={seller} admin={admin} />
          </TabPane>
          <TabPane tab="Sản phẩm tồn" key="2">
            <StockProductComponent size={size} spt={sptSeller} seller={seller} admin={admin} />
          </TabPane>
          <TabPane tab="Sản phẩm được quan tâm" key="3">
            <FavoriteProductComponent size={size} spqt={spt} seller={seller} admin={admin} />
          </TabPane>
        </Tabs>
      </StickyContainer>
    ) : (
      <AccessDenied />
    );
  };

  const renderTabBar = (props, DefaultTabBar) => (
    <Sticky bottomOffset={0}>
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
    <div className="container w-full">
      <MetaDecorator title={STATISTICAL_PRODUCT_PAGE_TITLE} description={STATISTICAL_PRODUCT_PAGE_DESCRIPTION} />
      {renderByRole()}
    </div>
  );
}
