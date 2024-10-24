import { Fragment, useEffect, useState } from "react";
import { Route } from "react-router";

import React from "react";
import Loading from "../Loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import AccessDenied from "../Error/AccessDenied";
import EditDrawer from "../Admin/Drawer/EditDrawer";
import ModalForm from "../Modal/ModalForm";
import _ from "lodash";
import { SELLER } from "../../Common/Const/Auth/AuthConst";
import { Layout, Breadcrumb } from "antd";

import { SELLER_URL } from "../../Common/Const/Admin/SellerConst";
import { SellerSidebar } from "./AuthMenu/SellerSidebar";
import SidebarSeller from "./SidebarSeller";
import { GET_ALL_PRODUCT_SELLER_ACTION } from "../../Common/Action/Admin/SellerAction";

const { Header, Content, Footer } = Layout;

export const SellerTemplate = (props) => {
  const { Component, ...restProps } = props;
  const { credentials } = useSelector((state) => state.AuthReducer);
  const { sellerURL } = useSelector((state) => state.BreadcrumbReducer);
  const dispatch = useDispatch();
  const { nhacungcap } = useSelector((state) => state.SellerReducer);
  useEffect(() => {
    _.map(SellerSidebar,(e)=>{
      dispatch({
        type: GET_ALL_PRODUCT_SELLER_ACTION,
      });
      let exist = _.find(e?.submenu, (value) => value.url == props.path);
      
      if(exist){
        const {name,key, url} = exist;
        dispatch({
          type: SELLER_URL,
          sellerURL: name
        })
        let path = {
          key,
          pathname: url,
          name
        }
        localStorage.setItem('pathSeller',JSON.stringify(path)) 
      }
    })
  }, [props?.path]);
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
  const renderBySeller = (propsRoute) => {
    if (!credentials || !nhacungcap?.pheduyet) {
      return <AccessDenied />;
    } else {
      let seller = _.find(
        credentials?.roles,
        (r) => r === SELLER
      );
      return !seller ? (
        <AccessDenied />
      ) : (
        <>
          <Component admin={false} seller={true} size={size} {...propsRoute} />
        </>
      );
    }
  };

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
             {_.find(credentials?.roles,e=> e===SELLER) ?  <SidebarSeller
                props={propsRoute}
                location={propsRoute?.location}
                size={size}
              />: null}
              <Layout className="site-layout">
                <Header
                  className="site-layout-background"
                  style={{ padding: 0 }}
                />
                <Content style={{ margin: "0 16px" }}>
                  {_.find(credentials?.roles,e=> e===SELLER) && nhacungcap?.pheduyet ? <Breadcrumb style={{ margin: "16px 0" }}>
                    <Breadcrumb.Item>Seller</Breadcrumb.Item>
                    <Breadcrumb.Item>{sellerURL}</Breadcrumb.Item>
                  </Breadcrumb>: null}
                  <div
                    className="site-layout-background"
                    style={{ padding: 24, minHeight: 360 }}
                  >
                    {renderBySeller(propsRoute)}
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
