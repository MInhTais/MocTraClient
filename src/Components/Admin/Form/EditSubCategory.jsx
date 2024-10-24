import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { ErrorMessage, withFormik } from "formik";
import { subCategorySchema } from "../../../validates/SubCategoryValidation";
import * as Action from "../../../Common/Const/Admin/Drawer";
import * as actionAdmin from "../../../Common/Action/Admin/AdminAction";
import {UPLOAD_PICTURE_SUB_CATEGORY_ACTION } from "../../../Common/Action/Picture/PictureAction";
import _ from "lodash";
import { UPLOAD_PICTURE_CATEGORY } from "../../../Common/Const/Category/CategoryConst";

function EditSubCategory(props) {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    subname: "",
    description: "",
  });
  const {
    values,
    touched,
    errors,
    handleChange,
    handleSubmit,
    setValues,
    setFieldValue,
  } = props;
  const { nl } = useSelector((state) => state.AdminReducer);
  const [preview, setPreview] = useState(values?.hinhanh ? 'http://localhost:8080/images/category/'+values?.hinhanh : "http://localhost:8080/images/product/default.png");
  const [image, setImage] = useState({
    name: "",
    size: 0,
  });

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
            <div className="mb-3 flex flex-col">
              <label>Hình ảnh: </label>
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
                        type: UPLOAD_PICTURE_CATEGORY,
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
                {(msg) => {
                  return <p className="text-error">{msg}</p>;
                }}
              </ErrorMessage>
            </div>
          </div>
          <div className="w-full">
            <div className="mb-3">
              <label>Tên loại: </label>
                <input
                  type="text"
                  value={!values.tenloai ? '' : values.tenloai}
                  name="tenloai"
                  className="input-nb"
                  placeholder="Rau củ"
                  onChange={handleChange}
                />
              <ErrorMessage name="tenloai">
                {(msg) => {
                  return <p className="text-error">{msg}</p>;
                }}
              </ErrorMessage>
            </div>
          </div>
          <div className="w-full">
            <div className="mb-3">
              <label>Tên nhóm: </label>
              <select name="nhom" value={values?.nhom?.manhom} className="select-responsive" onChange={(e)=>{
                let {value} = e.target;
                let nhomloai = nl.find(e=> e.manhom === Number(value));
                setFieldValue('nhom', nhomloai);
                
              }}>
                {nl?.map((nhomloai, i) => {
                  return <option key={i} value={nhomloai.manhom}>
                    {nhomloai.tennhom}
                  </option>;
                })}
              </select>

            </div>
          </div>
        </div>
        <div className="flex fold:flex-col md:flex-row">
          <div className="w-full">
            <label>Mô tả</label>
              <textarea
                className="input-responsive"
                name="mota"
                placeholder="Ngon, rẻ, tốt cho sức khỏe."
                value={!values.mota ? '' : values.mota}
                rows="4"
                onChange={handleChange}
              ></textarea>
            <ErrorMessage name="mota">
              {(msg) => {       
                return <p className="text-error">{msg}</p>;
              }}
            </ErrorMessage>
          </div>
        </div>
      </form>
    </div>
  );
}

const EditSubCategoryForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const { subCategoryEdit } = props;
    console.log("VIEW",subCategoryEdit)
    return {
      maloai: subCategoryEdit?.maloai,
      hinhanh:subCategoryEdit?.hinhanh,
      tenloai: subCategoryEdit?.tenloai,
      mota: subCategoryEdit?.mota,
      nhom: subCategoryEdit?.nhom
    };
  },
  validationSchema: subCategorySchema,
  handleSubmit: (values, { props, setSubmitting }) => {
    const {dispatch,edit,image,preview} = props;
    // dispatch({
    //   type: edit ? actionAdmin.UPDATE_SUB_CATEGORY_ACTION : actionAdmin.ADD_SUB_CATEGORY_ACTION,
    //   category: values
    // })

    const formData = new FormData();
    formData.append("file", image);
    const oldImage = _.isEqual(image.name, preview);
    dispatch({
      type: UPLOAD_PICTURE_SUB_CATEGORY_ACTION,
      hinhanh: formData,
      values,
      oldImage,
      edit
    });
  },
  displayName: "EditSubCategoryForm",
})(EditSubCategory);

const mapStateToProps = (state) => ({
  subCategoryEdit: state.EditReducer.subCategoryEdit,
  edit: state.DrawerModalReducer.edit,
  image: state.CategoryReducer.image,
  preview: state.CategoryReducer.preview,
});

export default connect(mapStateToProps)(EditSubCategoryForm);
