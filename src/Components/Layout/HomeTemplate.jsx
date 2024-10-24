import { Fragment, useEffect, useState } from "react";
import { Route } from "react-router";

import React from "react";
import Footers from "./Footers";
import Loading from "../Loading/Loading";
import ModalForm from "../Modal/ModalForm";
import CarouselHome from "../Tailwind/CarouselHome";
import EditDrawer from "../Admin/Drawer/EditDrawer";
import HeaderCustomer from "./HeaderCustomer";
import MessengerCustomerChat from "react-messenger-customer-chat";
import { APPID_FACEBOOK } from "../../Common/Const/Auth/AuthConst";
import Slider from '../../Components/Home/Slider';
import { MenuUnfoldOutlined } from "@ant-design/icons";
import { OPEN_FORM } from "../../Common/Const/Admin/Drawer";
import MenuComponent from "./MenuComponent";
import { useDispatch } from "react-redux";

export const HomeTemplate = (props) => {
  const dispatch = useDispatch();
  // path, exact, Component
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
            <button className="w-8 fixed top-32 z-9 flex justify-start p-2 bg-green-500 rounded-sm shadow-lg hover:bg-green-600 fold:block lg:hidden"
            onClick={()=>{
              dispatch({
                type: OPEN_FORM,
                Component: <MenuComponent />,
                title: "MENU",
                placement: "left",
                footer: false,
              });
            }}
            ><MenuUnfoldOutlined className="text-white mb-2" /></button>
            <div className="w-full flex flex-row gap-6 container fold:pt-24 lg:pt-32">
              <div className="fold:w-full md:w-1/2"><CarouselHome title="HomeTemplate" /></div>
              <div className="fold:hidden md:block md:w-1/2"><Slider size={size} /></div>
            </div>
            <Loading />
            <EditDrawer />
            <ModalForm />
            <div className="m-5">
              <div className="flex mb-10">
                <Component size={size} {...propsRoute} />
              </div>
            </div>
            <MessengerCustomerChat
              pageId="100074528842544"
              appId={APPID_FACEBOOK}
              
            />
            <Footers />
          </Fragment>
        );
      }}
    />
  );
};
