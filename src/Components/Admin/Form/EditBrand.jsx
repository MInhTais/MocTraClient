import React, { useEffect} from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { ErrorMessage, withFormik,Field } from "formik";
import { brandSchema } from "../../../validates/BrandValidation";
import * as Action from "../../../Common/Const/Admin/Drawer";
import * as actionAdmin from "../../../Common/Action/Admin/AdminAction";

function EditBrand(props) {
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
  const { l } = useSelector((state) => state.AdminReducer);
  useEffect(() => {
    dispatch({
      type: Action.SET_SUBMIT_FORM,
      submitFunction: handleSubmit,
    });

    dispatch({
      type: actionAdmin.FIND_ALL_ACTION,
    });
  }, []);

  return (
    <div className="container w-full">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <div className="w-full">
            <div className="flex flex-wrap mb-3 mr-4">
              <label>Tên thương hiệu: </label>
                <Field
                  type="text"
                  value={!values.tenth ? '' : values.tenth}
                  name="tenth"
                  className="input-nb"
                  placeholder="Vinamit"
                  onChange={handleChange}
                /> 
              <ErrorMessage name="tenth">
                {(msg) => {                 
                  return <p className="text-error">{msg}</p>;
                }}
              </ErrorMessage>
            </div>
          </div>
          <div className="w-full">
            <div className="flex flex-wrap mb-3">
              <label>Tên loại: </label>
              <select
                name="loai"
                value={values?.loai?.maloai}
                className="select-responsive"
                onChange={(e)=>{
                  let {value} = e.target;
                  let loai = l.find(e=> e.maloai === Number(value));
                  setFieldValue('loai', loai);
                }}
              >
                {l?.map((loai, i) => {
                  return (
                    <option key={i} value={loai.maloai}>
                      {loai.tenloai}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

const EditBrandForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const { brandEdit } = props;
    return {
      math: brandEdit?.math,
      tenth: brandEdit?.tenth,
      loai: brandEdit?.loai,
    };
  },
  validationSchema: brandSchema,
  handleSubmit: (values, { props, setSubmitting }) => {
    props.dispatch({
      type: props.edit ? actionAdmin.UPDATE_BRAND_ACTION : actionAdmin.ADD_BRAND_ACTION,
      brand: values
    })
  },
  displayName: "EditBrandForm",
})(EditBrand);

const mapStateToProps = (state) => ({
    brandEdit: state.EditReducer.brandEdit,
    edit: state.DrawerModalReducer.edit
});

export default connect(mapStateToProps)(EditBrandForm);
