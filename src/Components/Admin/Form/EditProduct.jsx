import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { ErrorMessage, withFormik } from "formik";
import { productSchema } from "../../../validates/ProductValidation";
import { DatePicker, InputNumber } from "antd";
import * as Action from "../../../Common/Const/Admin/Drawer";
import * as AdminAction from "../../../Common/Action/Admin/AdminAction";
import * as TypeProduct from "../../../Common/Const/Product/ProductConst";
import * as PictureAction from "../../../Common/Action/Picture/PictureAction";
import _ from "lodash";
import { TITLE_ADMIN_PRODUCT } from "../../../Common/Const/Admin/AdminConst";
import { SELLER } from "../../../Common/Const/Auth/AuthConst";
import moment from 'moment';
import { GET_ALL_PRODUCT_SELLER_ACTION } from "../../../Common/Action/Admin/SellerAction";
const { RangePicker } = DatePicker;
function EditProduct(props) {
  const dispatch = useDispatch();
  const { productEdit } = useSelector((state) => state.EditReducer);
  const credentials = JSON.parse(localStorage.getItem("credentials"));
  const dateFormat = 'YYYY-MM-DD';
  const [image, setImage] = useState({
    name: "",
    size: 0,
  });
  const [preview, setPreview] = useState(
    !productEdit.hinhanh
      ? "http://localhost:8080/images/product/default.png"
      : "http://localhost:8080/images/product/" + productEdit.hinhanh
  );

  const [pd, setProduct] = useState({});

  const {
    values,
    touched,
    errors,
    handleChange,
    handleSubmit,
    setValues,
    setFieldValue,
  } = props;
  const { edit } = useSelector((state) => state.DrawerModalReducer);
  const { product, l, th,ncc,dvd } = useSelector((state) => state.AdminReducer);
  useEffect(() => {
    dispatch({
      type: Action.SET_SUBMIT_FORM,
      submitFunction: handleSubmit,
    });
    if(_.find(credentials?.roles,e=> e===SELLER)){
      dispatch({
        type: GET_ALL_PRODUCT_SELLER_ACTION,
      });
    }
    setProduct(product?.[0]);
    dispatch({
      type: AdminAction.FIND_ALL_ACTION,
    });
    if(product?.length === 0 && !edit){
      dispatch({
        type: Action.DISABLED_BUTTON,
        manager: TITLE_ADMIN_PRODUCT
      })
    }else{
      dispatch({
        type: Action.ABLE_BUTTON
      })
    }
  }, []);

  const renderBrandByCategory = (categoryid) => {
    let arrayBrand = th.filter((e) => e?.loai?.maloai === categoryid);
    return arrayBrand.map((b, i) => {
      return (
        <option key={i} value={b.math}>
          {b.tenth}
        </option>
      );
    });
  };

  const renderCategory = () => {
    return l?.map((loai, i) => {
      return (
        <option key={i} value={loai.maloai}>
          {loai.tenloai}
        </option>
      );
    });
  };

  const renderMeasure = () => {
    return _?.map(dvd,(dv, i) => {
      return (
        <option key={i} value={dv.madvd}>
          {dv.tendvd}
        </option>
      );
    });
  };

  const renderProvider = () => {
    return _?.map(_.filter(ncc,e=>!e?.cuahang),(pvd, i) => {
      return (
        <option key={i} value={pvd.mancc}>
          {pvd.tenncc}
        </option>
      );
    });
  };

  return (
    <div className="container w-full flex flex-col">
      <form onSubmit={handleSubmit}>
        <div className="flex fold:flex-col md:flex-row">
          <div className="fold:w-full md:w-1/2">
            <div className="flex flex-wrap flex-col mb-3 mr-4">
              <div className="flex fold:flex-col md:flex-row">
                <label>Hình ảnh: </label>
              </div>
              <label htmlFor="img-product">
                <img
                  width={150}
                  height={150}
                  src={preview}
                  className="img-responsive image-responsive"
                />
              </label>
              <input
                type="file"
                className="hidden"
                name="hinhanh"
                id="img-product"
                onChange={(e) => {
                  const reader = new FileReader();
                  reader.onload = () => {
                    if (reader.readyState === 2) {
                      setPreview(reader.result);
                      setImage(e.target.files[0]);
                      dispatch({
                        type: TypeProduct.UPLOAD_PICTURE_PRODUCT,
                        image: e.target.files[0],
                        preview: reader.result,
                      });
                    }
                  };
                  setFieldValue("hinhanh", e.target.files[0]?.name);
                  reader.readAsDataURL(e.target.files[0]);
                }}
              />
              <ErrorMessage name="hinhanh">
                {(msg)=>{
                  return <p className="text-error">{msg}</p>
                }}
              </ErrorMessage>
            </div>
          </div>
          <div className="fold:w-full md:w-1/2">
            <div className="flex flex-wrap mb-3 fold:m-0 md:ml-4">
              <label>Tên sản phẩm: </label>
                <textarea
                  type="text"
                  value={!values.tensp ? "" : values.tensp}
                  name="tensp"
                  className="input-responsive"
                  placeholder="Cải xà lách"
                  onChange={handleChange}
                />
              <ErrorMessage name="tensp">
                {(msg) => {
                  return <p className="text-error">{msg}</p>;
                }}
              </ErrorMessage>
            </div>
          </div>
        </div>
        <div className="flex fold:flex-col md:flex-row">
          <div className="fold:w-full md:w-1/2">
            <div className="flex flex-col mb-3 mr-4">
            <label>Giá nhập: </label>
                <InputNumber
                  style={{
                    width: 200,
                  }}
                  defaultValue={values?.gianhap}
                  min="1000"
                  max="10000000"
                  step="1000"
                  name="gianhap"
                  placeholder="1000"
                  onChange={(e) => {
                    setFieldValue("gianhap", e);
                  }}
                />
              <ErrorMessage name="gianhap">
                {(msg) => {
                  return <p className="text-red-600 text-left text-xs">{msg}</p>;
                }}
              </ErrorMessage>
            </div>
          </div>
          <div className="fold:w-full md:w-1/2">
            <div className="flex flex-wrap mb-3 fold:m-0 md:ml-4">
            <div className="flex flex-col mb-3 mr-4">
              <label>Đơn giá: </label>
                <InputNumber
                  style={{
                    width: 200,
                  }}
                  defaultValue={values?.dongia}
                  min="1000"
                  max="10000000"
                  step="1000"
                  name="dongia"
                  placeholder="1000"
                  onChange={(e) => {
                    setFieldValue("dongia", e);
                  }}
                />
              <ErrorMessage name="dongia">
                {(msg) => {
                  return <p className="text-red-600 text-left text-xs">{msg}</p>;
                }}
              </ErrorMessage>
            </div>
            </div>
          </div>
        </div>
        <div className="flex fold:flex-col md:flex-row">
          <div className="fold:w-full md:w-1/2">
            <div className="flex flex-wrap mb-3 mr-4">
              <label>Đơn vị tính: </label>
              <select
                className="select-responsive"
                name="dvd"
                value={values?.dvd?.madvd}
                onChange={(e) => {
                  let { value } = e.target;
                  let dvt = _?.find(dvd,(e) => e.madvd === value);
                  setFieldValue("dvd", dvt);
                }}
              >
                {renderMeasure()}
              </select>
            </div>
          </div>
          {_.find(credentials?.roles, e => e ==='SELLER') ? null : <div className="fold:w-full md:w-1/2">
            <div className="flex flex-wrap mb-3 fold:m-0 md:ml-4">
              <label>Nhà cung cấp: </label>
              <select
                className="select-responsive"
                name="nhacungcap"
                value={values?.nhacungcap?.mancc}
                onChange={(e) => {
                  let { value } = e.target;
                  let provider = _?.find(ncc,(e) => e.mancc === value);
                  setFieldValue("nhacungcap", provider);
                }}
              >
                {renderProvider()}
              </select>
            </div>
          </div>}
        </div>
        <div className="flex fold:flex-col md:flex-row">
          <div className="fold:w-full md:w-1/2">
            <div className="flex flex-wrap mb-3 mr-4">
              <label>Loại: </label>
              <select
                className="select-responsive"
                name="loaisp"
                value={values?.loaisp?.maloai}
                onChange={(e) => {
                  let { value } = e.target;
                  let loai = l.find((e) => e.maloai === Number(value));
                  setFieldValue("loaisp", loai);
                  renderBrandByCategory(value);
                  setFieldValue('thuonghieu',_.first(_.filter(th,d=>d?.loai?.maloai === Number(value))))
                  console.log(_.first(_.filter(th,d=>d?.loai?.maloai === Number(value))))
                }}
              >
                {renderCategory()}
              </select>
            </div>
          </div>
          <div className="fold:w-full md:w-1/2">
            <div className="flex flex-wrap mb-3 fold:m-0 md:ml-4">
              <label>Thương hiệu: </label>
              <select
                className="select-responsive"
                name="thuonghieu"
                value={values?.thuonghieu?.math}
                onChange={(e) => {
                  let { value } = e.target;
                  let brand = th.find((e) => e.math === Number(value));
                  setFieldValue("thuonghieu", brand);
                }}
              >
                {renderBrandByCategory(
                  !values?.loaisp?.maloai ? 1 : values?.loaisp?.maloai
                )}
              </select>
            </div>
          </div>
        </div>
        <div className="flex fold:flex-col md:flex-row">
          <div className="fold:w-full md:w-1/2">
            <div className="flex flex-wrap mb-3 mr-4">
              <label>Sản xuất: </label>
                <textarea
                  value={!values.sanxuat ? "" : values.sanxuat}
                  name="sanxuat"
                  className="input-responsive"
                  onChange={handleChange}
                />
              <ErrorMessage name="sanxuat">
                {(msg) => {
                  return <p className="text-red-600 text-left text-xs">{msg}</p>;
                }}
              </ErrorMessage>
            </div>
          </div>
          <div className="fold:w-full md:w-1/2">
            <div className="flex flex-wrap mb-3 fold:m-0 md:ml-4">
              <label>Bảo quản: </label>
                <textarea
                  value={!values.baoquan ? "" : values.baoquan}
                  name="baoquan"
                  className="input-responsive"
                  onChange={handleChange}
                />
              <ErrorMessage name="baoquan">
                {(msg) => {
                  return <p className="text-red-600 text-left text-xs">{msg}</p>;
                }}
              </ErrorMessage>
            </div>
          </div>
        </div>
        <div className="flex fold:flex-col md:flex-row">
          <div className="fold:w-full md:w-1/2">
            <div className="flex flex-wrap mb-3 mr-4">
              <label>Sử dụng: </label>
                <textarea
                  value={!values.sudung ? "" : values.sudung}
                  name="sudung"
                  className="input-responsive"
                  onChange={handleChange}
                />
              <ErrorMessage name="sudung">
                {(msg) => {
                  return <p className="text-red-600 text-left text-xs">{msg}</p>;
                }}
              </ErrorMessage>
            </div>
          </div>
          <div className="fold:w-full md:w-1/2">
            <div className="flex flex-wrap mb-3 fold:m-0 md:ml-4">
              <label>Mô tả: </label>
                <textarea
                  value={!values.mota ? "" : values.mota}
                  name="mota"
                  className="input-responsive"
                  onChange={handleChange}
                />
              <ErrorMessage name="mota">
                {(msg) => {
                  return <p className="text-red-600 text-left text-xs">{msg}</p>;
                }}
              </ErrorMessage>
            </div>
          </div>
        </div>
        <div className="flex fold:flex-col md:flex-row">
          <div className="fold:w-full md:w-1/2">
            <div className="flex flex-col mb-3 mr-4">
              <label>Tổng số lượng: </label>
                <InputNumber
                  style={{
                    width: 200,
                  }}
                  defaultValue={!values?.tongsl ? "" : values?.tongsl}
                  min="1"
                  max="1000"
                  step="1"
                  name="tongsl"
                  placeholder="1000"
                  onChange={(e) => {
                    setFieldValue("tongsl", e);
                  }}
                />
              <ErrorMessage name="tongsl">
                {(msg) => {
                  return <p className="text-red-600 text-left text-xs">{msg}</p>;
                }}
              </ErrorMessage>
            </div>
          </div>
          <div className="fold:w-full md:w-1/2">
            <div className="flex flex-col mb-3 fold:m-0 md:ml-4">
              <label>Giảm giá: </label>
                <InputNumber
                  style={{
                    width: 200,
                  }}
                  value={!values?.giamgia ? 0 : values?.giamgia}
                  min="0"
                  max="100"
                  step="1"
                  name="giamgia"
                  placeholder="1000"
                  onChange={(e) => {
                    setFieldValue("giamgia", e);
                  }}
                />
              <ErrorMessage name="giamgia">
                {(msg) => {
                  return <p className="text-red-600 text-left text-xs">{msg}</p>;
                }}
              </ErrorMessage>
            </div>
          </div>
        </div>
        <div className="flex fold:flex-col md:flex-row">
          <div className="fold:w-full md:w-1/2">
            <div className="flex flex-col mb-3 mr-4">
              <label>Ngày nhập và hết hạn: </label>
              <RangePicker
              defaultValue={[values?.ngaytao ? moment(values.ngaytao) : moment(),values?.ngayhethan ? moment(values.ngayhethan) : moment()]}
              bordered={false}
              onChange={(e)=>{
                setFieldValue('ngaytao',_.first(e)?._d);
                setFieldValue('ngayhethan',_.last(e)?._d);
              }}
              />
              <ErrorMessage name="tongsl">
                {(msg) => {
                  return <p className="text-red-600 text-left text-xs">{msg}</p>;
                }}
              </ErrorMessage>
            </div>
          </div>
          <div className="fold:w-full md:w-1/2">
            <div className="flex flex-wrap mb-3 fold:m-0 md:ml-4">
              <label>Trọng lượng: </label>
                <InputNumber
                  style={{
                    width: 270,
                  }}
                  value={values?.trongluong}
                  min="1"
                  step="1"
                  name="trongluong"
                  placeholder="1"
                  onChange={(e) => {
                    setFieldValue("trongluong", e);
                  }}
                />
              <ErrorMessage name="trongluong">
                {(msg) => {
                  return <p className="text-red-600 text-left text-xs">{msg}</p>;
                }}
              </ErrorMessage>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

const EditProductForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const { productEdit } = props;
    return {
      tensp: productEdit?.tensp,
      gianhap:productEdit?.gianhap ? productEdit?.gianhap : 1000,
      dongia: productEdit?.dongia ? productEdit?.dongia : 1000,
      sanxuat: productEdit?.sanxuat,
      baoquan: productEdit?.baoquan,
      sudung: productEdit?.sudung,
      mota: productEdit?.mota,
      hinhanh: productEdit?.hinhanh,
      giamgia: productEdit?.giamgia ? productEdit.giamgia : 0,
      tongsl: !productEdit?.tongsl ? 1 : productEdit?.tongsl,
      daban: !productEdit?.daban ? 0 : productEdit?.daban,
      conlai: !productEdit?.conlai
        ? !productEdit?.tongsl
          ? 1
          : productEdit?.tongsl - !productEdit?.daban
          ? 0
          : productEdit?.daban
        : productEdit?.daban,
      trongluong:productEdit?.trongluong ? productEdit?.trongluong : 1,
      ngaytao:productEdit?.ngaytao,
      ngayhethan:productEdit?.ngayhethan,
      dvd:productEdit?.dvd,
      nhacungcap:productEdit?.nhacungcap,
      loaisp: productEdit?.loaisp,
      thuonghieu: productEdit?.thuonghieu,
      trangthai: productEdit?.trangthai
      
    };
  },
  validationSchema: productSchema,
  handleSubmit: (values, { props, setSubmitting }) => {
    const { productEdit, image, edit, preview,roles,nhacungcap,dispatch } = props;
    const formData = new FormData();
    formData.append("file", image);
    const oldImage = _.isEqual(image.name, preview);
    const masp = !values.masp ? productEdit?.masp : values.masp;
    values.masp = masp;
    if(_?.isEqual(roles,SELLER)){
      values.nhacungcap = nhacungcap;
    }
    dispatch({
      type: PictureAction.UPLOAD_PICTURE_PRODUCT_ACTION,
      hinhanh: formData,
      values,
      oldImage,
      edit,
      roles
    });
  },
  displayName: "EditProductForm",
})(EditProduct);

const mapStateToProps = (state) => ({
  productEdit: state.EditReducer.productEdit,
  edit: state.DrawerModalReducer.edit,
  image: state.ProductReducer.image,
  preview: state.ProductReducer.preview,
  roles: state.EditReducer.roles,
  nhacungcap: state.SellerReducer.nhacungcap
});

export default connect(mapStateToProps)(EditProductForm);
