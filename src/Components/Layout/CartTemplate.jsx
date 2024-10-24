import { Fragment, useEffect, useState } from "react";
import { Route } from "react-router";

import React from "react";
import Footers from "./Footers";
import Loading from "../Loading/Loading";
import EditDrawer from "../Admin/Drawer/EditDrawer";
import ModalForm from "../Modal/ModalForm";
import _ from "lodash";
import SidebarCart from "./SidebarCart";
import CarouselHome from "../Tailwind/CarouselHome";
import HeaderComponent from "./HeaderComponent";
import HeaderCustomer from "./HeaderCustomer";
import BreadCrumbs from "../../libs/Breadcrumbs/BreadCrumbs";

export const CartTemplate = (props) => {
  const { Component, ...restProps } = props;
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

  return (
    <Route
      {...restProps}
      render={(propsRoute) => {
        return (
          <Fragment>
            {/* <HeaderComponent /> */}
            <HeaderCustomer />
            <div className="pt-28"><CarouselHome /></div>
            <div className="w-full flex flex-row justify-start p-5 container"><BreadCrumbs /></div>
            <Loading />
            <EditDrawer />
            <ModalForm />
            <div className="container">
              <div className="flex mb-10 fold:flex-col md:flex-row gap-4">
                <div className=" w-3/4 fold:w-full md:w-3/5 lg:w-3/4">
                  <Component size={size} {...propsRoute} />
                </div>
                <div className="w-1/4 fold:flex fold:flex-col fold:w-full fold:mt-5 md:flex-none md:mt-0 md:w-2/5 lg:w-1/4">
                  <SidebarCart size={size} />
                </div>
              </div>
            </div>
            <Footers />
          </Fragment>
        );
      }}
    />
  );
};
