import {Fragment } from "react";
import { Route } from "react-router";

import React from "react";
import Footers from "./Footers";
import ModalForm from "../Modal/ModalForm";
import Loading from "../Loading/Loading";
import EditDrawer from "../Admin/Drawer/EditDrawer";
import HeaderCustomer from "./HeaderCustomer";
import MetaDecorator from "../../libs/Helmet/MetaDecorator";
import { NOTFOUND_PAGE_TITLE,NOTFOUND_PAGE_DESCRIPTION } from "../../Common/Const/Page/PageConst";

export const ErrorTemplate=(props) =>{// path, exact, Component
  const { Component,...restProps } = props;
  return <Route {...restProps} render={(propsRoute) => {
        return <Fragment>
            <MetaDecorator title={NOTFOUND_PAGE_TITLE} description={NOTFOUND_PAGE_DESCRIPTION} />
            <HeaderCustomer />
            <Loading />
            <EditDrawer />
            <ModalForm />
            <div className="container pt-24">
              <div className="flex flex-row mb-10 justify-center">
                  <Component {...propsRoute} />
              </div>
            </div> 
            <Footers />
          </Fragment>
      }} />
}
