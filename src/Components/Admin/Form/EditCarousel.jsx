import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { ErrorMessage, withFormik } from "formik";
import * as Action from "../../../Common/Const/Admin/Drawer";
import { carouselSchema } from "../../../validates/CarouselVadidation";
import { UPLOAD_PICTURE_CAROUSEL_ACTION } from "../../../Common/Action/Picture/PictureAction";
import _ from "lodash";
import { UPLOAD_PICTURE_CAROUSEL } from "../../../Common/Const/Carousel/CarouselConst";

function EditCarousel(props) {
  const dispatch = useDispatch();
  const { carouselEdit } = useSelector((state) => state.EditReducer);
  const [image, setImage] = useState({
    name: "",
    size: 0,
  });
  const [preview, setPreview] = useState(
    !carouselEdit?.hinhanh
      ? "http://localhost:8080/images/product/default.png"
      : "http://localhost:8080/images/background/" + carouselEdit?.hinhanh
  );

  const {
    values,
    touched,
    errors,
    handleChange,
    handleSubmit,
    setValues,
    setFieldValue,
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
        <div className="flex flex-row">
          <div className="w-1/2">
            <div className="flex flex-wrap mb-3 mr-4">
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
                        type: UPLOAD_PICTURE_CAROUSEL,
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
                  return (
                    <span className="text-red-600 flex justify-start">
                      {msg}
                    </span>
                  );
                }}
              </ErrorMessage>
            </div>
          </div>
        </div>
        <div className="flex flex-row">
          <div className="w-full">
            <div className="flex flex-wrap mb-3 ml-4">
            <label>Mô tả</label>
            <textarea
              className="input-responsive"
              name="mota"
              placeholder="Vui lòng nhập mô tả"
              value={!values.mota ? "" : values.mota}
              rows="4"
              onChange={handleChange}
            ></textarea>
            <ErrorMessage name="mota">
              {(msg) => {
                return (
                  <span className="text-red-600 flex justify-start">{msg}</span>
                );
              }}
            </ErrorMessage>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

const EditCarouselForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const { carouselEdit } = props;
    return {
      id: carouselEdit?.id,
      hinhanh: carouselEdit?.hinhanh,
      mota: carouselEdit?.mota,
      nguoitao:carouselEdit?.nguoitao
    };
  },
  validationSchema: carouselSchema,
  handleSubmit: (values, { props, setSubmitting }) => {
    const { image, edit, preview,dispatch, carouselEdit} = props;
    const formData = new FormData();
    formData.append("file", image);
    const oldImage = image?.name ? _.isEqual(image?.name, preview) : true;
    values.id = carouselEdit?.id;
    dispatch({
      type: UPLOAD_PICTURE_CAROUSEL_ACTION,
      hinhanh: formData,
      values,
      oldImage,
      edit,
    });
  },
  displayName: "EditCarouselForm",
})(EditCarousel);

const mapStateToProps = (state) => ({
  carouselEdit: state.EditReducer.carouselEdit,
  edit: state.DrawerModalReducer.edit,
  image: state.CarouselReducer.image,
  preview: state.CarouselReducer.preview
});

export default connect(mapStateToProps)(EditCarouselForm);
