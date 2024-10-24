import { ErrorMessage, withFormik, Field } from "formik";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  FIND_ALL_AWARD_BY_DISTRICT_ACTION,
  FIND_ALL_DISTRICT_BY_PROVINCE_ACTION,
  FIND_ALL_PROVINCE_ACTION,
  FIND_FEES_GOSHIP_ACTION,
} from "../../Common/Action/Checkout/CheckoutAction";
import {
  CLOSE_MODAL,
  SET_SUBMIT_FORM_MODAL,
} from "../../Common/Const/Modal/ModalConst";
import {
  ADD_ADDRESS,
  DELETE_ADDRESS,
  GET_ADDRESS_DETAIL,
  UPDATE_ADDRESS,
  UPDATE_ADDRESS_DEFAULT,
  VISIBLE_SELECT_TAG,
} from "../../Common/Const/Order/OrderConst";
import { addressSchema } from "../../validates/AddressValidation";
import Carousel from "react-multi-carousel";
import { responsiveAddress } from "../Home/ResponsiveCarousel";
import { Popconfirm } from "antd";
import { UPDATE_CURRENT } from "../../Common/Const/Checkout/CheckoutConst";
import { notify } from "../../libs/Notify/Notify";
import * as MESSAGE from "../../Common/Const/Notify/NotifyConst";

function FormAddressComponent(props) {
  const dispatch = useDispatch();
  const {
    values,
    touched,
    errors,
    handleChange,
    handleSubmit,
    setValues,
    setFieldValue,
  } = props;
  const { province, district, award, service, fee } = useSelector(
    (state) => state.CheckoutReducer
  );
  const { address, edit, detail, visibleCbo, checkout } = useSelector(
    (state) => state.AddressReducer
  );

  const [state, setState] = useState({
    province: null,
    district: null,
    award: null,
  });
  useEffect(() => {
    dispatch({
      type: SET_SUBMIT_FORM_MODAL,
      functionSubmit: handleSubmit,
    });
    dispatch({
      type: FIND_ALL_PROVINCE_ACTION,
    });
    if (edit) {
      renderAddress();
    }
  }, []);

  const renderAddress = () => {
    if (edit) {
      dispatch({
        type: FIND_ALL_DISTRICT_BY_PROVINCE_ACTION,
        ProvinceID: detail?.tinh?.id,
      });

      dispatch({
        type: FIND_ALL_AWARD_BY_DISTRICT_ACTION,
        DistrictID: detail?.huyen?.id,
      });
    }
  };

  const renderDistrict = () => {
    return _?.map(district, (item) => {
      return (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      );
    });
  };

  const CustomInputComponent = (props) => (
    <textarea
      className="input-responsive rounded-md fold:w-full lg:w-full"
      {...props}
    />
  );

  return (
    <div className="container overflow-auto h-96">
      <Carousel responsive={responsiveAddress}>
        {_?.map(address, (item, index) => {
          return (
            <div className="flex flex-wrap bg-gray-50" key={index}>
              <div className="w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
                <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">
                  {item?.hoten}
                </h2>
                <p className="leading-relaxed text-base mb-4">
                  {item?.duong}
                  {item?.thitran?.name
                    ? ` - ${item?.thitran?.name}`
                    : null}
                  {item?.huyen?.name
                    ? ` - ${item?.huyen?.name}`
                    : null}
                  {item?.tinh?.name
                    ? ` - ${item?.tinh?.name}`
                    : null}
                </p>
                <div className="flex flex-row">
                  <a
                    className="text-indigo-500 inline-flex items-center w-1/3 fold:w-full lg:w-1/3"
                    onClick={() => {
                      dispatch({
                        type: UPDATE_ADDRESS_DEFAULT,
                        index,
                      });

                      setTimeout(() => {
                        dispatch({
                          type: CLOSE_MODAL,
                        });
                      }, 1000);

                      if (checkout) {
                        dispatch({
                          type: UPDATE_CURRENT,
                          increase: false,
                        });
                      }
                    }}
                  >
                    Giao đến địa chỉ này
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      className="w-4 h-4 ml-2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>
                  <div className="flex flex-row">
                    <button
                      className="button-primary bg-indigo-400 rounded-md mr-2"
                      onClick={() => {
                        if (edit) {
                          dispatch({
                            type: GET_ADDRESS_DETAIL,
                            detail: item,
                            edit: true,
                            index,
                          });
                          renderAddress();
                        }
                      }}
                    >
                      Sửa
                    </button>

                    {item?.macdinh ? null : (
                      <Popconfirm
                        placement="topRight"
                        title={"Bạn có muốn xóa địa chỉ này?"}
                        onConfirm={() => {
                          dispatch({
                            type: DELETE_ADDRESS,
                            index,
                          });
                        }}
                        okText="Đồng ý"
                        cancelText="Hủy bỏ"
                      >
                        <button className="button-primary bg-red-400 rounded-md ml-2">
                          Xóa
                        </button>
                      </Popconfirm>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Carousel>

      <div className="flex flex-row mt-3">
        <a
          className="text-indigo-500 hover:text-indigo-700"
          onClick={() => {
            dispatch({
              type: GET_ADDRESS_DETAIL,
              detail: null,
              edit: false,
            });
            dispatch({
              type: VISIBLE_SELECT_TAG,
            });
          }}
        >
          Thêm địa chỉ giao hàng mới?
        </a>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center m-5"
      >
        <div className="flex justify-center">
          <div className="flex fold:flex-col lg:flex-row w-full fold:w-full lg:w-full">
            <label className="flex justify-start fold:w-full lg:w-1/3">
              Họ tên:
            </label>
            <div className="w-full flex flex-col justify-start">
              <Field
                name="hoten"
                className="input-nb fold:w-full lg:w-full"
                value={values?.hoten ? values?.hoten : ""}
                onChange={handleChange}
              />
              <ErrorMessage name="hoten">
                {(msg) => {
                  return <p className="text-error">{msg}</p>;
                }}
              </ErrorMessage>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-3">
          <div className="flex fold:flex-col lg:flex-row w-full fold:w-full lg:w-full">
            <label className="flex justify-start fold:w-full lg:w-1/3">
              Số điện thoại:
            </label>
            <div className="w-full flex flex-col justify-start">
              <Field
                name="sdt"
                value={values?.sdt ? values?.sdt : ""}
                className="input-nb fold:w-full lg:w-full"
                onChange={handleChange}
              />
              <ErrorMessage name="sdt">
                {(msg) => {
                  return <p className="text-error">{msg}</p>;
                }}
              </ErrorMessage>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-3">
          <div className="flex fold:flex-col lg:flex-row w-full fold:w-full lg:w-full">
            <label className="flex justify-start fold:w-full lg:w-1/3">
              Tỉnh/Thành Phố:
            </label>
            {!visibleCbo ? (
              <div className="flex flex-row w-full">
                <div className="flex justify-start w-1/2">
                  <span className="font-bold">
                    {detail?.tinh?.name}
                  </span>
                </div>
                <div className="flex justify-end w-1/2">
                  <span
                    className="font-bold cursor-pointer text-indigo-500 hover:text-indigo-800 fold:w-1/2 lg:w-1/2"
                    onClick={() => {
                      dispatch({
                        type: VISIBLE_SELECT_TAG,
                      });
                      renderAddress();
                    }}
                  >
                    Chỉnh sửa
                  </span>
                </div>
              </div>
            ) : (
              <select
                className="select-responsive fold:w-full lg:w-full"
                name="tinh"
                // value={values?.tinh?.id}
                onChange={(e) => {
                  const {value } = e.target;
                  var p = _.find(province, (e) =>e?.id === value);
                  setFieldValue("tinh", p);
                  setState({
                    ...state,
                    province: p,
                  });
                  if (!_.isEqual(value, "default")) {
                    dispatch({
                      type: FIND_ALL_DISTRICT_BY_PROVINCE_ACTION,
                      ProvinceID: p?.id,
                    });
                  }
                }}
              >
                <option value="default" key={0}>
                  Vui lòng chọn tỉnh
                </option>
                {_?.map(province, (item) => {
                  return (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            )}
          </div>
        </div>
        <div className="flex justify-center mt-3">
          <div className="flex fold:flex-col lg:flex-row w-full fold:w-full lg:w-full">
            <label className="flex justify-start fold:w-full lg:w-1/3">
              Quận/Huyện:{" "}
            </label>
            {!visibleCbo ? (
              <span className="font-bold fold:w-full lg:w-full">
                {detail?.huyen?.name}
              </span>
            ) : (
              <select
                className="select-responsive fold:w-full lg:w-full"
                name="huyen"
                onChange={(e) => {
                  const { value } = e.target;
                  var d = district.find((e) => e.id === value);
                  setFieldValue("huyen", d);
                  setState({
                    ...state,
                    district: d,
                  });
                  if (!_.isEqual(value, "default")) {
                    dispatch({
                      type: FIND_ALL_AWARD_BY_DISTRICT_ACTION,
                      DistrictID: d?.id,
                    });
                    setFieldValue("thitran", award[0]);
                  }
                }}
              >
                <option value="default" key={0}>
                  Vui lòng chọn huyện
                </option>
                {renderDistrict()}
              </select>
            )}
          </div>
        </div>
        <div className="flex justify-center mt-3">
          <div className="flex fold:flex-col lg:flex-row w-full fold:w-full lg:w-full">
            <label className="flex justify-start fold:w-full lg:w-1/3">
              Phường/Xã:{" "}
            </label>
            {!visibleCbo ? (
              <span className="font-bold fold:w-full lg:w-full">
                {detail?.thitran?.name}
              </span>
            ) : (
              <select
                className="select-responsive fold:w-full lg:w-full"
                name="thitran"
                onChange={(e) => {
                  const { value } = e.target;
                  const w = _.find(award, (e) => Number(e.id) === Number(value));
                  setFieldValue("thitran", w);
                }}
              >
                <option value="0" key={0}>
                  Vui lòng chọn xã
                </option>
                {_?.map(award, (item) => {
                  return (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            )}
          </div>
        </div>
        <div className="flex justify-center mt-3">
          <div className="flex fold:flex-col lg:flex-row w-full fold:w-full lg:w-full">
            <label className="flex justify-start fold:w-full lg:w-1/3">
              Địa chỉ:{" "}
            </label>
            <div className="w-full flex flex-col justify-start">
              <textarea
                name="duong"
                value={values?.duong ? values?.duong : ""}
                className="input-responsive rounded-md fold:w-full lg:w-full"
                onChange={handleChange}
              />
              <ErrorMessage name="duong">
                {(msg) => {
                  return <p className="text-error">{msg}</p>;
                }}
              </ErrorMessage>
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-3">
          <div className="fold:flex-col lg:flex-row w-full fold:w-full lg:w-3/4">
            <div className="max-w-sm p-2 flex justify-start">
              {edit === true ? null : (
                <label className="inline-flex items-start">
                  <Field
                    className="text-indigo-500 w-4 h-4 mr-2 focus:ring-indigo-400 focus:ring-opacity-25 border border-gray-300 rounded"
                    type="checkbox"
                    value={values?.macdinh === true ? values?.macdinh : false}
                    checked={values?.macdinh ? true : false}
                    onChange={handleChange}
                    name="macdinh"
                  />
                  <p className="font-bold">Đặt làm địa chỉ mặc định</p>
                </label>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="flex justify-center fold:flex-col lg:flex-row w-full fold:w-full lg:w-full">
            {edit ? (
              <button
                type="submit"
                className="button-primary rounded-md fold:mb-2 fold:w-full lg:w-1/3 lg:h-12 bg-green-500 lg:mr-3"
              >
                Cập nhật
              </button>
            ) : (
              <button
                type="submit"
                className="button-primary rounded-md fold:mb-2 fold:w-full lg:w-1/3 lg:h-12 bg-green-500 lg:mr-3"
              >
                Chọn địa chỉ
              </button>
            )}
            <button
              className="button-default bg-yellow-300 rounded-md fold:w-full lg:w-1/3 lg:h-12 lg:ml-3"
              onClick={(e) => {
                e.preventDefault();
                dispatch({
                  type: CLOSE_MODAL,
                });
              }}
            >
              Hủy bỏ
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

const addressForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const { detail } = props;
    return {
      hoten: detail?.hoten ? detail?.hoten : "",
      sdt: detail?.sdt ? detail?.sdt : "",
      tinh: detail?.tinh ? detail?.tinh : "default",
      huyen: detail?.huyen ? detail?.huyen : "default",
      thitran: detail?.thitran ? detail?.thitran : "default",
      duong: detail?.duong ? detail?.duong : "",
      macdinh: detail?.macdinh ? detail?.macdinh : false,
    };
  },
  validationSchema: addressSchema,
  handleSubmit: (values, { props, setSubmitting }) => {
    const { edit, dispatch, index,checkout } = props;
    if (!_.isEqual(values?.tinh?.ProvinceID, values?.huyen?.ProvinceID)) {
      notify("warning", MESSAGE.NOT_SELECT_DISTRICT_MESSAGE);
    } else if (
      !_.isEqual(values?.huyen?.DistrictID, values?.thitran?.DistrictID)
    ) {
      notify("warning", MESSAGE.NOT_SELECT_AWARD_MESSAGE);
    } else {
      dispatch({
        type: edit ? UPDATE_ADDRESS : ADD_ADDRESS,
        address: values,
        index,
      });

      if(checkout){
        if(values?.macdinh){
          dispatch({
            type: FIND_FEES_GOSHIP_ACTION,
            addressDefault: values,
          });
        }
      }

      setTimeout(() => {
        dispatch({
          type: CLOSE_MODAL,
        });
      }, 1500);
    }
  },
  displayName: "AddressForm",
})(FormAddressComponent);

const mapStateToProps = (state) => ({
  detail: state.AddressReducer.detail,
  edit: state.AddressReducer.edit,
  index: state.AddressReducer.index,
  checkout: state.AddressReducer.checkout
});
export default connect(mapStateToProps)(addressForm);
