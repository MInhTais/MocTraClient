import React, { useEffect } from "react";
import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import {Formik,Field } from "formik";
import { userFirstPopupSchema } from "../../validates/UserValidation";
import {Tooltip} from 'antd';
import _ from "lodash";
import { GIVE_TO_VOUCHER_ACTION } from "../../Common/Action/Authentication/AuthAction";
import { CLOSE_FIRST_POPUP_MODAL, OPEN_FIRST_POPUP_MODAL } from "../../Common/Const/Modal/ModalConst";

export default function FirstModal() {
  const { credentials } = useSelector((state) => state.AuthReducer);
  const cancelButtonRef = useRef(null);
  const dispatch = useDispatch();
  const {firstPopup} = useSelector((state)=>state.ModalReducer);
  useEffect(() => {
    if(!credentials?.tendn){
      if(!JSON.parse(localStorage.getItem('firstVisit'))){
        dispatch({
          type: OPEN_FIRST_POPUP_MODAL
        })
      }
    }
  }, [ ])
  return (
    <>
      {credentials?.length === 0 ? null : (
        <Transition.Root show={firstPopup} as={Fragment}>
          <Dialog
            as="div"
            className="fixed z-10 inset-0 overflow-y-auto"
            initialFocus={cancelButtonRef}
            onClose={()=>{
              dispatch({
                type: CLOSE_FIRST_POPUP_MODAL
              })
            }}
          >
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
              </Transition.Child>

              {/* This element is to trick the browser into centering the modal contents. */}
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-1000"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-1000"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <div className="inline-block align-bottom bg-black bg-opacity-80 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                  <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="leading-6 font-medium text-white text-3xl flex justify-center"
                        >
                          MỘC TRÀ
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-2xl text-green-400 flex justify-center">
                            NHẬN NGAY MÃ GIẢM GIÁ 10%
                          </p>
                          <p className="text-xs text-white pl-10 pr-10">
                            Nhân dịp Noel, Mộc Trà tri ân đến quý khách hàng mã
                            giảm giá 10% cho mỗi đơn hàng. Vui lòng điền email
                            để nhận quà.
                          </p>
                          <Formik
                            initialValues={{ tendn: ""}}
                            validationSchema={userFirstPopupSchema}
                            onSubmit={(values, { setSubmitting }) => {
                              setTimeout(() => {
                                dispatch({
                                  type: GIVE_TO_VOUCHER_ACTION,
                                  tendn: values?.tendn
                                })
                                setSubmitting(false);
                              }, 400);
                            }}
                          >
                            {({
                              values,
                              handleChange,                              
                              handleSubmit,
                              isSubmitting,
                              errors
                            }) => (
                              <form
                              autocomplete="off"
                                onSubmit={handleSubmit}
                                className="w-full flex flex-row justify-center"
                              >
                                <Tooltip
                                visible={errors?.tendn ? true : false}
                                autoAdjustOverflow
                                placement={'topLeft'}
                                getPopupContainer={(node)=>node.parentElement}
                                color={'red'}
                                title={errors?.tendn}
                                >
                                <Field
                                  name="tendn"
                                  onChange={handleChange}
                                  value={values.tendn}
                                  className="input-responsive bg-green-100 focus:bg-opacity-0 w-3/4 focus:text-white"
                                />
                                </Tooltip>
                                <button
                                  disabled={isSubmitting}
                                  className="w-1/4 bg-green-500 text-white hover:bg-green-600"
                                  type="submit"
                                >
                                  NHẬN
                                </button>
                              </form>
                            )}
                          </Formik>
                          <div className="pt-2 w-full flex flex-row justify-center">
                            <label className="text-xs text-white cursor-pointer hover:text-green-300"
                            onClick={()=>{
                              localStorage.setItem('firstVisit',true);
                              dispatch({
                                type: CLOSE_FIRST_POPUP_MODAL
                              })
                            }}
                            >Cám ơn.</label>
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
      )}
    </>
  );
}
