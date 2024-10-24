import { ErrorMessage, Field, withFormik } from "formik";
import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { SET_SUBMIT_FORM } from "../../../Common/Const/Admin/Drawer";
import { Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { ADD_LIST_PICTURE_RETURN_GOOD } from "../../../Common/Const/Order/OrderConst";
import { UPLOAD_LIST_PICTURE_RETURN_GOOD_ACTION } from "../../../Common/Action/Picture/PictureAction";
import _ from "lodash";
import { ReturnGoodSchema } from "../../../validates/ReturnGoodValidation";
import { useSelector } from "react-redux";
function ReturnGoodComponent(props) {
  const {credentials} = useSelector((state)=>state.AuthReducer);
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
  const [fileList, setFileList] = useState([]);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    dispatch({
      type: ADD_LIST_PICTURE_RETURN_GOOD,
      listImage: newFileList,
    });
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  useEffect(() => {
    dispatch({
      type: SET_SUBMIT_FORM,
      submitFunction: handleSubmit,
    });
  }, []);

  return (
    <div>
      <form
        className="w-full flex flex-col justify-start gap-y-2"
        onSubmit={handleSubmit}
      >
        <ImgCrop rotate>
          <Upload
            accept="image/*"
            multiple
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-card"
            fileList={fileList}
            onChange={onChange}
            onPreview={onPreview}
          >
            {fileList.length < 5 && "+ Upload"}
          </Upload>
        </ImgCrop>
        <div className="w-full flex flex-col p-5">
          <label className="text-left">Nội dung</label>
          <Field
            name="noidung"
            onChange={handleChange}
            className="input-responsive"
            value={values?.noidung}
          />
          <ErrorMessage name="noidung">
            {(msg)=>{
              return <p className="text-error">{msg}</p>
            }}
          </ErrorMessage>
        </div>
        <div className="w-full flex flex-col p-5 bg-gray-100">
          <label className="text-left">Email của bạn</label>
          <label>{credentials?.tendn}</label>
        </div>
      </form>
    </div>
  );
}

const ReturnGoodForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const { editReturnGood } = props;
    return {
      noidung: editReturnGood?.noidung,
    };
  },
  validationSchema: ReturnGoodSchema,
  handleSubmit: (values, { props, setSubmitting }) => {
    const { listImage, dispatch,ctdh } = props;
    const formData = new FormData();
    _?.map(listImage,(item,i)=>{
      formData.append("file", item?.originFileObj)
    })
    values.ctdh = ctdh;
    dispatch({
      type: UPLOAD_LIST_PICTURE_RETURN_GOOD_ACTION,
      list: formData,
      dth: values
    });
  },
  displayName: "EditReturnGoodForm",
})(ReturnGoodComponent);

const mapStateToProps = (state) => ({
  //   editReturnGood: state.EditReducer.editReturnGood,
  edit: state.DrawerModalReducer.edit,
  listImage: state.OrderReducer.listImage,
});

export default connect(mapStateToProps)(ReturnGoodForm);
