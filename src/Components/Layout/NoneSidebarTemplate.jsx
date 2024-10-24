import {Fragment, useEffect, useState} from "react";
import { Route } from "react-router";
import React from "react";
import Footers from "./Footers";
import Loading from "../Loading/Loading";
import ModalForm from "../Modal/ModalForm";
import CarouselHome from "../Tailwind/CarouselHome";
import HeaderCustomer from "./HeaderCustomer";
import EditDrawer from "../Admin/Drawer/EditDrawer";
import BreadCrumbs from "../../libs/Breadcrumbs/BreadCrumbs";

export const NoneSidebarTemplate=(props) =>{// path, exact, Component
  const { Component,...restProps } = props;
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

  return <Route {...restProps} render={(propsRoute) => {
        return <Fragment>
            {/* <HeaderComponent /> */}
            <HeaderCustomer />
            <div className="pt-20"><CarouselHome title="NoneSidebarTemplate" /></div>
            <div className="fold:w-full md:w-1/2 flex flex-row justify-center p-5"><BreadCrumbs /></div>
            <Loading />
            <EditDrawer />
            <ModalForm />
            <div className="container">
              <div className="flex mb-10">
              <Component size={size} {...propsRoute} />
              </div>
            </div>
            <Footers />
          </Fragment>
      }} />
}
