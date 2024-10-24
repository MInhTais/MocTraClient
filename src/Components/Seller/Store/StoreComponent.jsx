import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SELLER } from "../../../Common/Const/Auth/AuthConst";
import PageNotFound from "../../Error/PageNotFound";
import {
  GET_MY_STORE_ACTION,
  UPDATE_MY_STORE_ACTION,
} from "../../../Common/Action/Admin/SellerAction";
import { ErrorMessage, Field, Form, Formik } from "formik";
import MetaDecorator from "../../../libs/Helmet/MetaDecorator";
import {
  SHOP_PAGE_DESCRIPTION,
  SHOP_PAGE_TITLE,
} from "../../../Common/Const/Page/PageConst";
import { storeSchema } from "../../../validates/EditShopValidation";

export default function StoreComponent(props) {
  const { credentials } = useSelector((state) => state.AuthReducer);
  const { cuahang } = useSelector((state) => state.SellerReducer);
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  useEffect(() => {
    dispatch({
      type: GET_MY_STORE_ACTION,
    });
  }, []);

  const handleSubmit = (values) => {
    const { diachi, sdt, tencuahang } = values;
    cuahang.nhacungcap.diachi = diachi;
    cuahang.nhacungcap.sdt = sdt;
    cuahang.tencuahang = values.tencuahang;
    dispatch({
      type: UPDATE_MY_STORE_ACTION,
      cuahang,
    });
  };

  return (
    <>
      <MetaDecorator
        title={SHOP_PAGE_TITLE}
        description={SHOP_PAGE_DESCRIPTION}
      />
      {_.find(credentials?.roles, (e) => e === SELLER) ? (
        <section className="py-6 bg-gray-100 text-gray-900">
          <div className="grid max-w-6xl grid-cols-1 px-6 mx-auto lg:px-8 md:grid-cols-2 md:divide-x">
            <div className="py-6 md:py-0 md:px-6">
              <h1 className="text-4xl font-bold">{cuahang?.tencuahang}</h1>
              <p className="pt-2 pb-4">{cuahang?.nhacungcap?.tenncc}</p>
              <div className="space-y-4">
                <p className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5 mr-2 sm:mr-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{cuahang?.nhacungcap?.diachi}</span>
                </p>
                <p className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5 mr-2 sm:mr-6"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span>{cuahang?.nhacungcap?.sdt}</span>
                </p>
                <p className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5 mr-2 sm:mr-6"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span>{cuahang?.tkchucuahang?.tendn}</span>
                </p>
                <p className="flex items-center cursor-pointer">
                  <span
                    onClick={() => {
                      setEdit(true);
                    }}
                  >
                    Chỉnh sửa
                  </span>
                </p>
              </div>
            </div>

            {edit ? (
              <Formik
                initialValues={{
                  tencuahang: cuahang?.tencuahang,
                  sdt: cuahang?.nhacungcap?.sdt,
                  diachi: cuahang?.nhacungcap?.diachi,
                }}
                validationSchema={storeSchema}
                onSubmit={handleSubmit}
              >
                {(formikProps) => (
                  <Form className="flex flex-col py-6 space-y-6 md:py-0 md:px-6 ng-untouched ng-pristine ng-valid">
                    <div className="w-full flex flex-col justify-start">
                      <label className="text-left">Tên cửa hàng</label>
                      <Field
                        autoFocus
                        name="tencuahang"
                        value={formikProps.values?.tencuahang}
                        onChange={formikProps.handleChange}
                        className="input-responsive focus:ring-1 focus:ring-green-500 focus:ring-opacity-50"
                      />
                      <ErrorMessage name="tencuahang">
                        {(msg)=>{
                          return <p className="text-error">{msg}</p>
                        }}
                      </ErrorMessage>
                    </div>
                    <div className="w-full flex flex-col justify-start">
                      <label className="text-left">Số điện thoại</label>
                      <Field
                        name="sdt"
                        value={formikProps.values?.sdt}
                        onChange={formikProps.handleChange}
                        className="input-responsive focus:ring-1 focus:ring-green-500 focus:ring-opacity-50"
                      />
                      <ErrorMessage name="sdt">
                        {(msg)=>{
                          return <p className="text-error">{msg}</p>
                        }}
                      </ErrorMessage>
                    </div>
                    <div className="w-full flex flex-col justify-start">
                      <label className="text-left">Địa chỉ</label>
                      <Field
                        name="diachi"
                        value={formikProps.values?.diachi}
                        onChange={formikProps.handleChange}
                        className="input-responsive focus:ring-1 focus:ring-green-500 focus:ring-opacity-50"
                      />
                      <ErrorMessage name="diachi">
                        {(msg)=>{
                          return <p className="text-error">{msg}</p>
                        }}
                      </ErrorMessage>
                    </div>
                    <button
                      type="submit"
                      className="self-center px-8 py-3 text-lg rounded focus:ring hover:ring focus:ring-opacity-75 bg-green-600 text-gray-50 focus:ring-green-600 hover:ring-green-600"
                    >
                      CẬP NHẬT
                    </button>
                  </Form>
                )}
              </Formik>
            ) : null}
          </div>
        </section>
      ) : (
        <PageNotFound />
      )}
    </>
  );
}
