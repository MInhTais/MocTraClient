import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { newpwdSchema } from "../../validates/Login";
import { FIND_VERIFICATION_CODE_ACTION, NEW_PASSWORD_ACTION } from "../../Common/Action/Authentication/AuthAction";

export default function Newpassword(props) {
  const dispatch = useDispatch();
  const verify = useSelector((state)=>state.AuthReducer);
  useEffect(() => {
    dispatch({
      type: FIND_VERIFICATION_CODE_ACTION,
      verifycode: verify?.verified
    })
  }, []);
  const handleSubmit = (values) => {
    const newpass = {
      tendn: null,
      matkhau: values?.matkhau,
      expired: new Date(verify?.verified?.expired),
      verifycode: verify?.verified?.verifycode
    };
    dispatch({
      type: NEW_PASSWORD_ACTION,
      newpass,
    });
  };
  return (
    <div className="w-full">
      <Formik
        initialValues={{
          matkhau: "",
          mkxn: "",
        }}
        validationSchema={newpwdSchema}
        onSubmit={handleSubmit}
        render={(formikProps) => (
          <Form className="container">
            <div className="flex fold:flex-col fold:gap-y-4 md:flex-row md:gap-4">
              <div className="fold:w-full md:w-1/2">
                <label className="flex justify-start">Mật khẩu: </label>
                <Field
                  placeholder="*******"
                  type="password"
                  className="input-responsive"
                  name="matkhau"
                  onChange={formikProps.handleChange}
                />
                <ErrorMessage name="matkhau">
                  {(msg) => {
                    return (
                      <p className="text-error">{msg}</p>
                    );
                  }}
                </ErrorMessage>
              </div>
              <div className="fold:w-full md:w-1/2">
                <label className="flex justify-start">Mật khẩu xác nhận: </label>
                <Field
                  placeholder="*******"
                  type="password"
                  className="input-responsive"
                  name="mkxn"
                  onChange={formikProps.handleChange}
                />
                <ErrorMessage name="mkxn">
                  {(msg) => {
                    return (
                      <p className="text-error">{msg}</p>
                    );
                  }}
                </ErrorMessage>
              </div>
            </div>
            <div className="rounded-lg flex flex-col items-center justify-end p-6 border-t border-solid border-blueGray-200">
              <button type="submit" className="button-primary">
                Phục hồi mật khẩu
              </button>
            </div>
          </Form>
        )}
      />
    </div>
  );
}
