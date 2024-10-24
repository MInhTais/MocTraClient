import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { forgetSchema } from "../../validates/Login";
import { useDispatch, useSelector } from "react-redux";
import * as Action from "../../Common/Action/Authentication/AuthAction";
import { CLOSE_SUB_MODAL } from "../../Common/Const/Modal/ModalConst";
import { Tooltip } from "antd";
export default function ForgotForm(props) {
  const dispatch = useDispatch();
  const { subvisible } = useSelector((state) => state.ModalReducer);
  const handleSubmit = (values) => {
    dispatch({
      type: Action.FIND_BY_USERNAME_ACTION,
      username: values.tendn,
    });
  };

  return (
    <>
      {subvisible ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative my-6 mx-auto max-w-3xl w-3/4">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Quên mật khẩu</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black hover:text-opacity-20 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() =>
                      dispatch({
                        type: CLOSE_SUB_MODAL,
                      })
                    }
                  >
                    x
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <Formik
                    initialValues={{
                      tendn: "",
                    }}
                    validationSchema={forgetSchema}
                    onSubmit={handleSubmit}
                  >
                    {(formikProps) => (
                      <Form
                        autocomplete="off"
                        className="flex flex-col"
                      >
                        <div className="flex-1 ">
                          <label className="label-responsive">
                            Tên đăng nhập
                          </label>
                          
                            <Field
                              placeholder="bachmoc@gmail.com"
                              type="email"
                              className="input-responsive"
                              name="tendn"
                              onChange={formikProps.handleChange}
                            />
                          <ErrorMessage name="tendn">
                          {(msg)=>{
                            return <p className="text-error">{msg}</p>
                          }}
                          </ErrorMessage>
                        </div>
                        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                          <button type="submit" className="button-primary">
                            Gửi mail
                          </button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
