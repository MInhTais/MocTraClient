import { Input, Select} from "antd";
import React, { useState, useEffect, useRef } from "react";
import { PhoneOutlined, UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import * as Action from "../../Common/Action/Checkout/CheckoutAction";
import { Formik, Form, ErrorMessage } from "formik";
import { checkoutSchema } from "../../validates/Checkout";
import * as Type from "../../Common/Const/Checkout/StatusConst";
import _ from 'lodash';
const { Option } = Select;
export default function DetailComponent({current,setCurrent}) {
  const dispatch = useDispatch();
  const { province, district, award, service, fee } = useSelector(
    (state) => state.CheckoutReducer
  );
  const { formOne } = useSelector((state) => state.StatusReducer);
  const { carts } = useSelector((state) => state.CartReducer);
  const [provinces, setProvince] = useState("");
  const [districts, setDistrict] = useState("");
  const [awards, setAward] = useState("");
  const [services, setService] = useState("");
  const ref = useRef();
  useEffect(() => {
    dispatch({
      type: Action.FIND_ALL_PROVINCE_ACTION,
    });
  }, []);

  const handleProvinceChange = (value) => {
    dispatch({
      type: Action.FIND_ALL_DISTRICT_BY_PROVINCE_ACTION,
      ProvinceID: value,
    });
    let p = _.find(province,(p) => p.ProvinceID == value);
    setProvince(p.ProvinceName);
    renderDistrict();
  };

  const handleDistrict = (value) => {
    dispatch({
      type: Action.FIND_ALL_AWARD_BY_DISTRICT_ACTION,
      DistrictID: value,
    });

    let d = _.find(district,(d) => d.DistrictID == value);
    setDistrict(d.DistrictName);
  };

  const handleAward = (value) => {
    if (value) {
      let a = _.find(award,(a) => a.WardCode == value);
      setAward(a.WardName);
      dispatch({
        type: Action.FIND_ALL_SERVICE_AVAILABLE_ACTION,
        DistrictID: a.DistrictID,
      });
    }
  };

  const handleService = (value) => {
    let a = _.find(award,(a) => a.WardName == awards);
    if (a) {
      dispatch({
        type: Action.FIND_FEES_ACTION,
        service: value,
        WardCode: a.WardCode,
        DistrictID: a.DistrictID,
      });
    }
    let ser = _.find(service,(s) => s.service_id == value);
    setService(ser.short_name);
  };

  const total = () => {
    if (carts === undefined) {
      return 0;
    } else {
      return _.reduce(carts,(total, sp, i) => {
        return (total += sp.dongia * sp.sl);
      }, 0);
    }
  };

  const handleSubmit = (values) => {
    values.diachi =
      values.diachi +
      "- " +
      (awards ? awards : "") +
      "- " +
      districts +
      "- " +
      provinces;
    let chitietdh = _.map(carts,(c) => {
      return { sl: c.sl, dongia: c.dongia, hdspct: c };
    });

    values.phiship = fee.total;
    values.diem = total() * 0.02;
    values.phuongthucvc = services;
    values.chitietdh = chitietdh;
    values.tongtien = total();
    values.tongcong = total() + fee.total;
    values.tentt = formOne.tentt;
    dispatch({
      type: Type.STATUS_FORMTWO,
      order: values,
    });
    setCurrent(current+1)
  };

  const renderDistrict = () => {
    if (provinces === "" || district === "undefined") {
      return "";
    } else {
      if (district[0] === "" || district[0] === undefined) {
        return "";
      } else {
        return (
          <div className="form-group w-full">
            <span className="float-left">Huyện</span>
            <br />
            <Select
              defaultValue={[district[0].DistrictName]}
              placeholder="Vui lòng chọn huyện"
              className="float-left text-left fold:w-60 moto:w-full duo:w-3/4 md:w-4/5 lg:w-48"
              onChange={handleDistrict}
            >
              {_.map(district,(district) => (
                <Option key={district.DistrictID} value={district.DistrictID}>
                  {district.DistrictName}
                </Option>
              ))}
            </Select>
          </div>
        );
      }
    }
  };

  const renderAward = () => {
    if (districts === "" || award === "undefined" || award === undefined) {
      return "";
    } else {
      if (award[0] === "" || award[0] === undefined) {
        return "";
      } else {
        return (
          <div className="form-group w-full">
            <span className="float-left">Thị trấn</span>
            <br />
            <Select
              className="float-left text-left fold:w-60 moto:w-full duo:w-3/4 md:w-4/5 lg:w-48"
              placeholder="Vui lòng chọn thị trấn"
              defaultValue={[award[0].WardName]}
              onChange={handleAward}
            >
              {_.map(award,(a) => (
                <Option key={a.WardCode} value={a.WardCode}>
                  {a.WardName}
                </Option>
              ))}
            </Select>
          </div>
        );
      }
    }
  };

  const renderService = () => {
    if (service === "undefined" || service === undefined || districts === "") {
      return "";
    } else {
      if (service[0] === "" || service[0] === undefined) {
        return "";
      } else {
        return (
          <>
            <span className="float-left truncate fold:text-md moto:text-base duo:text-sm">
              Phương thức vận chuyển
            </span>
            <br />
            {setService(service[0].short_name)}
            <Select
              defaultValue={[service[0].short_name]}
              className="float-left text-left fold:w-60 moto:w-full duo:w-3/4 md:w-4/5 lg:w-48"
              onChange={handleService}
            >
              {service.map((s) => (
                <Option key={s.service_id}>{s.short_name}</Option>
              ))}
            </Select>
          </>
        );
      }
    }
  };

  return (
    <div ref={ref}>
      <Formik
        initialValues={{
          hoten: "",
          sdt: "",
          diachi: "",
        }}
        validationSchema={checkoutSchema}
        onSubmit={handleSubmit}
        render={(formikProps) => (
          <Form className="panel-body flex-row container" role="form" name="formThongTin">
            <h3 className="text-responsive font-bold">THÔNG TIN KHÁCH HÀNG</h3>
            <div className="flex fold:flex-col moto:flex-col duo:flex-row gap-4">
              <div className="w-full duo:w-1/2">
                <div className="form-group">
                  <span className="float-left">
                    Họ tên <span className="require text-red-600">*</span>
                  </span>
                  <input
                    name="hoten"
                    onChange={formikProps.handleChange}
                    placeholder="Bách Mộc"
                    className="input-nb"
                  />
                  <ErrorMessage name="hoten">
                    {(msg) => <div className="text-red-700 float-left">{msg}</div>}
                  </ErrorMessage>
                </div>
              </div>
              <div className="w-full duo:w-1/2">
                <div className="form-group">
                  <span className="float-left">
                    Số điện thoại <span className="require text-red-600">*</span>
                  </span>
                  <input
                    name="sdt"
                    onChange={formikProps.handleChange}
                    placeholder="0291231231"
                    className="input-nb"
                  />
                  <ErrorMessage name="sdt">
                    {(msg) => <div className="text-red-700 text-left">{msg}</div>}
                  </ErrorMessage>
                </div>
              </div>
            </div>
            <div className="flex fold:flex-col moto:flex-col duo:flex-row gap-4">
              <div className="w-full duo:w-1/4">
                <div className="form-group">
                  <span className="float-left">Tỉnh</span>
                  <br />
                  {!province || province === "undefined" ? (
                    null
                  ) : (
                    <Select
                      className="float-left text-left fold:w-60 moto:w-full duo:w-3/4 md:h-4/5 lg:w-48"
                      placeholder="Vui lòng chọn tỉnh"
                      onChange={handleProvinceChange}
                    >
                      {_.map(province,(province, i) => (
                        <Option
                          key={province.ProvinceID}
                          value={province.ProvinceID}
                        >
                          {province.ProvinceName}
                        </Option>
                      ))}
                    </Select>
                  )}
                </div>
              </div>
              <div className="w-full duo:w-1/4">{renderDistrict()}</div>
              <div className="w-full duo:w-1/4">{renderAward()}</div>
              <div className="w-full duo:w-1/4">{renderService()}</div>
            </div>
            <div className="w-full">
              <div className="form-group">
                <span className="float-left">Đường</span>
                <Input
                  type="text"
                  name="diachi"
                  className="input-responsive"
                  placeholder="23 đường Lê Hồng Phong"
                  onChange={formikProps.handleChange}
                />
                <ErrorMessage name="diachi">
                  {(msg) => <div className="text-red-700 float-left">{msg}</div>}
                </ErrorMessage>
              </div>
            </div>
            <hr />
            <div className="flex flex-row justify-center mt-5">
              <button type="submit" className="button-primary mr-5 rounded-md">
                Xác Nhận
              </button>
              <button className="button-default rounded-md" onClick={()=>{setCurrent(current-1)}}>
                Trở lại
              </button>
              <div className="checkbox pull-right"></div>
            </div>
          </Form>
        )}
      />
    </div>
  );
}
