import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { ErrorMessage, Field, withFormik } from "formik";
import { brandSchema } from "../../../validates/BrandValidation";
import * as Action from "../../../Common/Const/Admin/Drawer";
import { forbiddenProductSchema } from "../../../validates/ProductValidation";
import _ from "lodash";
import { forbidden } from "../Column/ForbiddenPreferences";
import { ADD_PRODUCT_FORBIDDEN_ACTION } from "../../../Common/Action/Admin/AdminAction";

function EditProductForbidden(props) {
  const dispatch = useDispatch();
  const {
    values,
    touched,
    errors,
    handleChange,
    handleSubmit,
    setValues,
    setFieldValue,
    product,
  } = props;

  useEffect(() => {
    dispatch({
      type: Action.SET_SUBMIT_FORM,
      submitFunction: handleSubmit,
    });
  }, []);

  return (
    <div className="container w-full">
      <form onSubmit={handleSubmit}>
        <div className="flex fold:flex-col md:flex-row">
          <div className="w-full">
            <div className="flex flex-col mb-3 mr-4">
              <label>Lý do khóa: </label>
              <Field
                type="text"
                value={!values.lydo ? "" : values.lydo}
                name="lydo"
                className="input-nb"
                placeholder="Vinamit"
                autoFocus
                onChange={handleChange}
              />
              <ErrorMessage name="lydo">
                {(msg) => {
                  return <p className="text-error">{msg}</p>;
                }}
              </ErrorMessage>
            </div>
            <div className="flex flex-col w-full justify-center mt-5 bg-gray-50 bg-opacity-50">
            {_?.map(forbidden,(item, i)=>{
                  return (
                    <div className="flex flex-row justify-center w-full mb-3" key={i}>
                    <div className="w-1/2"><p >{item.title}</p></div>
                    <div className="w-1/2 flex justify-center"><label 
                    className="button-3d-green cursor-pointer"
                    onClick={()=>{
                        setFieldValue('lydo',item.title);
                    }}
                    >Áp dụng</label></div>
                  </div>
                  )
              })}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

const EditProductForbiddenForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    return {
      lydo: "",
    };
  },
  validationSchema: forbiddenProductSchema,
  handleSubmit: (values, { props, setSubmitting }) => {
    const {product, dispatch} = props;
    values.masp = product?.masp;
    dispatch({
        type: ADD_PRODUCT_FORBIDDEN_ACTION,
        product: values
    })
  },
  displayName: "EditProductForbiddenForm",
})(EditProductForbidden);

const mapStateToProps = (state) => ({
  brandEdit: state.EditReducer.brandEdit,
  edit: state.DrawerModalReducer.edit,
});

export default connect(mapStateToProps)(EditProductForbiddenForm);
