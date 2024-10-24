import { Fragment } from "react";
import { Route } from "react-router";
import React,{useState,useEffect} from "react";
import Footers from "./Footers";
import Loading from "../Loading/Loading";
import Authentication from "./Authentication";
import { useSelector } from "react-redux";
import AccessDenied from "../Error/AccessDenied";
import ModalForm from "../Modal/ModalForm";
import HeaderCustomer from "./HeaderCustomer";
import EditDrawer from "../Admin/Drawer/EditDrawer";
import BreadCrumbs from "../../libs/Breadcrumbs/BreadCrumbs";
import { OPEN_FORM } from "../../Common/Const/Admin/Drawer";
import MenuComponent from "./MenuComponent";
import { useDispatch } from "react-redux";
import { MenuUnfoldOutlined } from "@ant-design/icons";


export const AuthenticationTemplate = (props) => {
  // path, exact, Component
  const { Component, ...restProps } = props;
  const { credentials } = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();

  let denied = "flex flex-row mb-10 justify-center"
  let notDenied = "flex mb-10";
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
            <HeaderCustomer />
            <Loading />
            <EditDrawer />
            <ModalForm />
            <button className="w-8 fixed top-32 z-9 flex justify-start p-2 bg-green-500 rounded-sm shadow-lg hover:bg-green-600 fold:block md:hidden"
            onClick={()=>{
              dispatch({
                type: OPEN_FORM,
                Component: <Authentication />,
                title: "CẬP NHẬT THÔNG TIN",
                placement: "left",
                footer: false,
              });
            }}
            ><MenuUnfoldOutlined className="text-white mb-2" /></button>
            <div className="fold:pt-28 duo:container lg:pt-28">
            <div className="w-full flex flex-row justify-start p-5"><BreadCrumbs /></div>
              <div className={credentials ? notDenied : denied}>
                {credentials ? (
                  <>
                    <div className="w-1/4 fold:hidden md:block md:w-1/3 lg:w-1/4 lg:container lg:pl-7"><Authentication /></div>  
                    <Component size={size} {...propsRoute} />
                  </>
                ) : (
                  <AccessDenied />
                )}
              </div>
            </div>
            <Footers />
          </Fragment>
        );
      }}
    />
  );
};
