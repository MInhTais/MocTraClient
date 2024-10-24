import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { forgetSchema } from "../../validates/ChangePassword";
import * as Action from "../../Common/Action/Authentication/ChangePasswordAction";
import MetaDecorator from "../../libs/Helmet/MetaDecorator";
import {
  CHANGEPWD_PAGE_DESCRIPTION,
  CHANGEPWD_PAGE_TITLE,
} from "../../Common/Const/Page/PageConst";
import _ from 'lodash';
import {useSelector} from 'react-redux';

export default function ChangePassword(prop) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.isAuthReducer);
  const handleSubmit = (values) => {
    user.matkhau = values?.matkhau;
    dispatch({
      type: Action.CHANGED_PASSWORD_ACTION,
      user,
    });
    window.scrollTo(0, 0);
  };

  return (
    <div className="container w-full">
      <MetaDecorator
        title={CHANGEPWD_PAGE_TITLE}
        description={CHANGEPWD_PAGE_DESCRIPTION}
      />
      {_.isEmpty(user) ? 
      <div className="w-full flex flex-col bg-gray-100 h-96">
        <div className="w-full flex flex-row gap-6 p-5">
          <div className="w-1/2 h-10 bg-gray-200 animate-pulse"></div>
          <div className="w-1/2 h-10 bg-gray-200 animate-pulse"></div>
        </div>
        <div className="w-full flex flex-row justify-center gap-6 p-5">
          <div className="w-32 p-5 h-10 bg-gray-200 rounded-sm"></div>
        </div>
      </div>
      : (
        <Formik
          initialValues={{
            matkhau: "",
            matkhauxn: "",
          }}
          validationSchema={forgetSchema}
          onSubmit={handleSubmit}
        >
          {(formikProps) => (
            <Form className="w-full">
              <div className="flex fold:flex-col fold:gap-y-4 md:flex-row md:gap-4">
                <div className="flex flex-col justify-center fold:w-full md:w-1/2">
                  <span className="text-left">Mật khẩu</span>
                  <Field
                    type="password"
                    className="input-responsive"
                    name="matkhau"
                    placeholder="*****"
                    onChange={formikProps.handleChange}
                  />
                  <ErrorMessage name="matkhau">
                    {(msg) => (
                      <div className="text-red-600 text-xs text-left">
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
                </div>
                <div className="flex flex-col justify-center fold:w-full md:w-1/2">
                  <span className="text-left">Mật khẩu xác nhận</span>
                  <Field
                    type="password"
                    className="input-responsive"
                    name="matkhauxn"
                    placeholder="*****"
                    onChange={formikProps.handleChange}
                  />
                  <ErrorMessage name="matkhauxn">
                    {(msg) => (
                      <div className="text-red-600 text-xs  text-left">
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
                </div>
              </div>
              <div className="flex flex-row mt-5 justify-center">
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded"
                >
                  Đổi Mật Khẩu
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
}
