import {Fragment} from "react";
import { Route } from "react-router";
import React from "react";
import Footers from "./Footers";
import Loading from "../Loading/Loading";
import Category from "./Category";
import ModalForm from "../Modal/ModalForm";
import {  useSelector } from "react-redux";
import CarouselHome from "../Tailwind/CarouselHome";
import HeaderComponent from "./HeaderComponent";
import PageNotFound from "../Error/PageNotFound";
import EditDrawer from "../Admin/Drawer/EditDrawer";
import HeaderCustomer from "./HeaderCustomer";

export const NewPasswordTemplate=(props) =>{// path, exact, Component
  const { Component,...restProps } = props;
 const verified = useSelector((state)=>state.AuthReducer);
  


  const renderContent = (propsRoute) =>{
    if(verified?.verified){
      return <><Component {...propsRoute} /></>
    }
    return <PageNotFound />
  }

  return <Route {...restProps} render={(propsRoute) => {
        return <Fragment>
            {/* <HeaderComponent /> */}
            <HeaderCustomer />
            <CarouselHome />
            <Loading />
            <EditDrawer />
            <ModalForm />
            <div className="container md:pt-10">
              <div className="flex mb-10">
                  
                  {renderContent(propsRoute)}
              </div>
            </div>
            <Footers />
          </Fragment>
      }} />
}
