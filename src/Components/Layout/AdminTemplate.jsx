import { Fragment, useEffect, useState } from "react";
import { Route } from "react-router";

import React from "react";
import Loading from "../Loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import AccessDenied from "../Error/AccessDenied";
import SidebarAdmin from "./SidebarAdmin";
import EditDrawer from "../Admin/Drawer/EditDrawer";
import ModalForm from "../Modal/ModalForm";
import _ from "lodash";
import { MANAGER, STAFF } from "../../Common/Const/Auth/AuthConst";
import { Layout, Breadcrumb } from "antd";
import { AdminSidebar } from "./AuthMenu/AdminSidebar";
import { ADMIN_URL } from "../../Common/Const/Admin/AdminConst";
import Chart from "../Admin/Header/Chart";
import ProviderHeader from "../Admin/Header/ProviderHeader";
import PartnerHeader from "../Admin/Header/PartnerHeader";
import MeasureHeader from "../Admin/Header/MeasureHeader";
import CategoryHeader from '../Admin/Header/CategoryHeader';
import SubCategoryHeader from "../Admin/Header/SubCategoryHeader";
import BrandHeader from "../Admin/Header/BrandHeader";
import ProductHeader from "../Admin/Header/ProductHeader";
import OrderHeader from "../Admin/Header/OrderHeader";
import CarouselHeader from "../Admin/Header/CarouselHeader";
import EventHeader from '../Admin/Header/EventHeader';
import VoucherHeader from "../Admin/Header/VoucherHeader";
import AccountHeader from "../Admin/Header/AccountHeader";

const { Header, Content, Footer } = Layout;
export const AdminTemplate = (props) => {
  const { Component, ...restProps } = props;
  const { credentials } = useSelector((state) => state.AuthReducer);
  const { adminURL } = useSelector((state) => state.BreadcrumbReducer);
  const {tabsKey} = useSelector((state)=>state.StatisticalReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    _.map(AdminSidebar, (e) => {
      let exist = _.find(e?.submenu, (value) => value.url === props.path);
      if (exist) {
        const { name, key, url } = exist;
        dispatch({
          type: ADMIN_URL,
          adminURL: name,
        });
        let path = {
          key,
          pathname: url,
          name,
        };
        localStorage.setItem("path", JSON.stringify(path));
      }
    });
  }, []);
  
  const size = useWindowSize();
  function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined,
    });

    useEffect(() => {
      function handleResize() {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowSize;
  }
  const renderByAdmin = (propsRoute) => {
    if (!credentials) {
      return <AccessDenied />;
    } else {
      let admin = _.find(
        credentials?.roles,
        (r) => r === MANAGER || r === STAFF
      );
      return !admin ? (
        <AccessDenied />
      ) : (
        <>
          <Component size={size} {...propsRoute} admin={true} seller={false} />
        </>
      );
    }
  };

  const renderHeader = () =>{
    switch (adminURL) {
      case 'Doanh thu' :{
        return <Chart url={adminURL} tabsKey={tabsKey} />
      }
      case 'Thống kê sản phẩm':{
        return <Chart url={adminURL} tabsKey={tabsKey} />
      }
      case 'Nhà cung cấp':{
        return <ProviderHeader size={size} url={adminURL} tabsKey={tabsKey} />
      }
      case 'Đối tác':{
        return <PartnerHeader size={size} url={adminURL} tabsKey={tabsKey} />
      }
      case 'Đơn vị tính':{
        return <MeasureHeader size={size} url={adminURL} tabsKey={tabsKey} />
      }
      case 'Nhóm loại':{
        return <CategoryHeader size={size} url={adminURL} tabsKey={tabsKey} />
      }
      case 'Loại sản phẩm':{
        return <SubCategoryHeader size={size} url={adminURL} tabsKey={tabsKey} />
      }
      case 'Thương hiệu':{
        return <BrandHeader size={size} url={adminURL} tabsKey={tabsKey} />
      }
      case 'Sản phẩm':{
        return <ProductHeader size={size} url={adminURL} tabsKey={tabsKey} />
      }
      case 'Đơn hàng':{
        return <OrderHeader size={size} url={adminURL} tabsKey={tabsKey} />
      }
      case 'Carousel':{
        return <CarouselHeader size={size} url={adminURL} tabsKey={tabsKey} />
      }
      case 'Sự kiện':{
        return <EventHeader size={size} url={adminURL} tabsKey={tabsKey}  />
      }
      case 'Mã giảm giá':{
        return <VoucherHeader size={size} url={adminURL} tabsKey={tabsKey}  /> 
      }
      case 'Tài khoản':{
        return <AccountHeader size={size} url={adminURL} tabsKey={tabsKey}  /> 
      }
      default:
        return 'NONE STATISTIC....';
        break;
    }
    return;
  }

  return (
    <Route
      {...restProps}
      render={(propsRoute) => {
        return (
          <Fragment>
            <Layout style={{ minHeight: "100vh" }}>
              <Loading />
              <EditDrawer />
              <ModalForm />
              {_.find(
                credentials?.roles,
                (e) => e === MANAGER || e === STAFF
              ) ? (
                <SidebarAdmin
                  props={propsRoute}
                  location={propsRoute?.location}
                  size={size}
                />
              ) : null}
              <Layout className="site-layout">
                <Header
                  className={(_.isEqual(adminURL,'Doanh thu') || _.isEqual(adminURL,'Thống kê sản phẩm')) ? 'site-layout-background h-64' : 'site-layout-background h-40'}
                  style={{ padding: 0 }}
                >
                  {renderHeader()}
                </Header>
                <Content style={{ margin: "0 16px" }}>
                  {_.find(
                    credentials?.roles,
                    (e) => e === MANAGER || e === STAFF
                  ) ? (
                    <Breadcrumb style={{ margin: "16px 0" }}>
                      <Breadcrumb.Item>Admin</Breadcrumb.Item>
                      <Breadcrumb.Item>{adminURL}</Breadcrumb.Item>
                    </Breadcrumb>
                  ) : null}
                  <div
                    className="site-layout-background"
                    style={{ padding: 24, minHeight: 360 }}
                  >
                    {renderByAdmin(propsRoute)}
                  </div>
                </Content>
                <Footer style={{ textAlign: "center" }}>
                  Bách Mộc ©2021 Created by Lohataquy
                </Footer>
              </Layout>
            </Layout>
          </Fragment>
        );
      }}
    />
  );
};
