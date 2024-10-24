import React, { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { editprofileSchema } from "../../validates/EditProfile";
import { DatePicker, Radio, Tooltip } from "antd";
import * as Action from "../../Common/Action/Picture/PictureAction";
import _ from "lodash";
import { ORDER_WISHLIST_VOUCHER_ACTION } from "../../Common/Action/Authentication/AuthAction";
import {
  EditOutlined,
  ManOutlined,
  UserOutlined,
  WomanOutlined,
} from "@ant-design/icons";
import moment from "moment";
import MetaDecorator from "../../libs/Helmet/MetaDecorator";
import { EDITPROFILE_PAGE_DESCRIPTION, EDITPROFILE_PAGE_TITLE } from "../../Common/Const/Page/PageConst";

export default function EditProfile(props) {
  const { user } = useSelector((state) => state.isAuthReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: ORDER_WISHLIST_VOUCHER_ACTION,
    });
    window.scrollTo(0, 0)
  }, []);
  const [edit, setEdit] = useState(false);
  const [image, setImage] = useState({
    name: JSON.parse(localStorage.getItem("credentials"))?.hinhanh,
    size: 0,
  });
  const [preview, setPreview] = useState(
    !JSON.parse(localStorage.getItem("credentials")).hinhanh
      ? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAADSCAMAAABD772dAAAAS1BMVEX39/eampr7+/uUlJSXl5f8/Pz09PTT09OSkpKnp6fl5eWdnZ3v7++8vLzy8vLBwcHZ2dnHx8ff39+3t7epqamwsLDNzc3W1tbj4+OXfCaUAAAJ40lEQVR4nO1daZOqOhCVJIiAqIgy9///0sfiwkgCyeluZF5xPs2tWxX70EmvWXa7DRs2bNiwYcOGDf8PqBG+LZEQGmZxvNsds0uSJGXR4dz8mWRZ85/x/4l5S/WUXerqlh50D/PA45+HPC3KJDu1vL8tLREN2f21rnLTkYzcaMmb/F5eTn9X1Y1ij8m50eok00/ah7xKsj9IutVskTda8+U6YK11VCTHv8S5WbP13SBkB6TTMov/BOeW7Q1S7Yh0Xmar17NSV5puPzjf6t2K9dxYqTJiY9tTNodqrWpulcvL9sFZp8lufZSVSlIJuj1lU+7XRVntklzLsH1wNsVxPZQb7crS7Sjr4rQOyuLafVNexcSOr+kidDvKpv62xY6z+2J0W+j8Gn+RrlJnKcvsplx9z3rF13xputEX57XaV4vO5jd0+g0lx5foC+rtYXS9NGO1K76k3h5LKznOvrF6hzAmWdBcq/qr6u2hq6VSCrVf1ve6YPJsEcbq+O3p/ITRlwWmdfyzCvX2OJzFGcflivg2C/kmHYR8K9hwwYj6J7W70fm+uyzdH+ThBE2XOqY0+Vqa+a2o6iT5ybJrndRFlXZtGMqo+p8QY5p5bnjlRZLtx/3S47W8k4qdQozVCefbsK3a7oldMKXi/fWc45y1RNSljnCyYPT9R83U05uPcS3gqX2o2Rnj89no89Gre6DUqTagUWTXMcy3SdcDKm9qV4Pz6MCbMKJ8G+0G1lbVDqwasVoulK9Os/CZFh+xMigr4xvGt4Q6f0ph4atmi7liiK/J/6GGJP4HreSciXEMVXP0jdAZUSfkG5uUhy9U3tAV8WeRqN3cGJyTuh4QvgX1p6F5pen5sTpC+iXzRRn/kJcx4pA4+O4w30A11XGFGI87T5ynkI+d034yQSZ0zuQP1RH52hXha2ML2LAFAOqCLOOE4A6RCgeD3XghPiOMj4v+HGlKjaBSQIIU/OIqg0LaPSPfnfqHqLjEGKscoEtZQTZAbgLzTdCEjtDp5MQeWVaIFNiE5i8gqjOiYqD+AVlorpBjiBOUmwZbaqwFLFEhhlQMfHnIQrOv4BbIKo4O1zBR4gKZSNwm+iELYqijsGIA6IKNAN02I4dWV9DHj++QpeDJCseMkYAgMgEREPZNIx24brzFQcxWZALiLcglNRChCy8w/yAXVLCppDrTCuLrv8JiTMGceeEHYchOe+eJUNodMD5AGCq8RObspwGs0cBX2bEAqrz4GmrURJhCjjC2iD0NNeaDm9EFt/SiMnlNOqRU2EIL7nxUJSaUjx3FvHwkabMaodD9jqmHZ4K3rkjuiAPtise0g7+l18eEga6zeUuK+iTBOKvFHp53c54JnTveXh4DUp/uMJclwiZL1A230S4q1kyPHEs9u5FFT9bAhGecB1Tofwwsljp0gkElpxbT0RY+o1dLeLqwiM/o9RLW2cSw+IxeL+Ep44KGrOsmfJsgDNvCFROO9Mk5LJhnr52wUzKwkrJ2wu6gF+tpPAmLtFleooEVgJ6xU8OU0zQrDS1bOB0TnDh0hEWTBxJh45h8pCUsrOEdHhG5FzFY7n6OyrF11wk4H+7gqOVRvLB7VB6QVpsrYzrRDlLKNId7gN2uF+GLTRmUQLobdSJIJxNOSFPaniKqmnZ01P4ZmQiTzItjiwtx0KAGdDBhmnmx2xeSq4tky5bQRp6hbNbaJW1MSTNNtFmOejwlVepHlesPE82LNdCHuxnvUcWsFil1aGGzL7TAshtVLpqmXo1gi3vJ00Zo4+GOYQlbyzyUFPsBqUVMKB4/YdGFQrtoA8JCNQBC8fglmmVUohuOZHZLtyD7Dzth+meU2lxKKB6/CFsCfYZLdmQcEzUE7AmPJWMgLFIEoAcIkVUVHMNGxl3zxgnTbbTNnrJ8R5kmMYNcYoQFYg905+dviBHm3yNOjqM7jMNeJsLmzk2YwQlHtmCaiTB7eIkdrxlBjjDvaVrwXJpFLDHCzCpm8UmRKGFeFe95hJIkzKpijjC6gyRhThUTmyEDoUY1Hj7CnNc8Ma1gwcCjBV8KgW4aHsNSm+Bx8P3oTFkiT5DVi2QpxjBeOku7HuYJfK/6GLaT3IyXRhuWW5C5XFILSwGAoaY1GJ/Bbim+CW31layE4ctS3sAuanPBVsQjdks/foDaO2X0Gp08ll/gSUtev0Cc1HuGIuoAtkI8bVfBJwytecrokTppLL1rnlLK4DcoFwJw30RvbabxLhpS+EHvnn3AWlyk7f2y/Qq8jNlFsX78mNdMEHwTaVevFdaUldlORHCiSG/NjyWx/g5bLvYC1j/lDCkfsB4E5YzVn0C8MXNA0MKx05fbTEfYMmbMU19iODpA7D+EnIQQULDr2DTDpocxwgMuASG0/RCxgNUKvwqBO+Br4TqqxR7fdD8W2ECV+OrODWTULZzWHwvccsofDUwEuRybKT4RTJg73mtwcN0DIDKdAg+7SBB23j8hsYhDcyaBWTaxB1QgqHN4BCcE3PDEZZv8FiO4tiXhliZ+jTtP0eHHAtjDn0mzydat6wHwbdYV8WG2kRBTVgS+mMb6S9EPlA8zvxQ6uQGUcU7rqEQfU40TxqeNZwIBpjltDmlCeDtW7fneJp/xixx22mhTZNBLSwPKpzP9DchempkfIpc9jL4le4YHRdWpJjwM+BZnNtKj0q2oyn1TVtc7Wc2zV3yTIh0Teb7450s5PtUpTc3zNSa8smVMGfDiny9nlRWEdz490nE0ejeRAN2esrrcUMoed5diZktEuwPOWQVR9msFhGekRheCdDvK8bGMwjXhtSsw+MEDo++Srzy/5No3fipQMr+DVIGlLej5SghKJWGUPffnB1V6dH6VfrZ8KFoYZd++h7+KjUkWpNsihLJ3eclXxcacCRkCioayZzLl39jyy5kaW7XQ4v1Ak0wdPCgH1A99VKzzy3fodgKeqnmdhHQuZ1ex0XB6z4P4OvcoYtARqjlfrG9fms0DEdV58lHV0F3bU+GW0fXCttmKOJtScuDRi6nysE6XCKw8oFThVHLwfWbu+qU+r0G9PeKLq0Jg2U06A0debKLrt1fvEK7n3IFX4uxHhnRKeChbAmpnq2JPXc/qHspit3TBLzIVtoeZD8ibE5bmqS7XNJ2fUKOtt6Cco5OsOlkj37ZT8cEYPoDwe1IfVsp3tL0amtAtfl8LuFb9tlDDdUxYeMMvt871+8Sgq0w6UfN+LY775Dc33odCwp8tHeJ1Il3qriwuvHwK8Z6JZ0wN24HF8PApmnoKsF/GZtULuEe3BQkKsX6jPwLIIZEwuhw+Z3jBfJ8b2fvfudDEwizPmKnjn1Bwq+IDz0ltdRW8dZYTRy4515Pwz+CvyLlhw4YNGzZs2LBhw4Y/gP8ARIqLgY69A70AAAAASUVORK5CYII="
      : "http://localhost:8080/images/user/" +
          JSON.parse(localStorage.getItem("credentials")).hinhanh
  );

  const handleSubmit = (values) => {
    let formData = new FormData();
    formData.append("file", image);
    formData.append("name", "Bách Mộc");
    let oldImage = image?.name
      ? _.isEqual("http://localhost:8080/images/user/" + image.name, preview)
      : true;
    dispatch({
      type: Action.UPLOAD_PICTURE_ACTION,
      hinhanh: formData,
      editprofile: true,
      values,
      oldImage,
    });
  };
  const disabledDate = (current) => {
    return current && current.valueOf() >= Date.now();
  };
  return (
    <div className="container w-full">
      <MetaDecorator title={EDITPROFILE_PAGE_TITLE} description={EDITPROFILE_PAGE_DESCRIPTION} />
      {edit ? (
        <Formik
          initialValues={{
            hoten: user?.hoten,
            gioitinh: user?.gioitinh,
            ngaysinh: user?.ngaysinh,
            sdt: user?.sdt,
            hinhanh: "",
          }}
          validationSchema={editprofileSchema}
          onSubmit={handleSubmit}
        >
          {(formikProps) => (
            <Form className="flex flex-col w-full gap-y-4">
              <div className="flex fold:flex-col md:flex-row gap-4">
                <div className="flex flex-row w-full justify-center">
                  <label htmlFor="image">
                    <img
                      src={preview}
                      alt="Bách Mộc"
                      id="img"
                      className="img-responsive img-thumbnail w-60 h-60 shadow-lg image-responsive"
                    />
                  </label>
                  <input
                    type="file"
                    name="hinhanh"
                    id="image"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const reader = new FileReader();
                      reader.onload = () => {
                        if (reader.readyState === 2) {
                          setImage(e.target.files[0]);
                          setPreview(reader.result);
                          formikProps.setFieldValue(
                            "hinhanh",
                            e.target.files[0]?.name
                          );
                        }
                      };
                      reader.readAsDataURL(e.target.files[0]);
                    }}
                  />
                </div>
              </div>
              <div className="flex fold:flex-col md:flex-row gap-4">
                <div className="fold:w-full md:w-1/2 mb-3 flex flex-col">
                  <span className="text-left">Họ tên</span>
                  <Field
                    type="text"
                    className="input-responsive"
                    name="hoten"
                    placeholder="Bách Mộc"
                    onChange={formikProps.handleChange}
                  />
                  <ErrorMessage name="hoten">
                    {(msg) => (
                      <div className="text-error">{msg}</div>
                    )}
                  </ErrorMessage>
                </div>
                <div className="fold:w-full md:w-1/2 mb-3 flex flex-col">
                  <span className="text-left">Giới tính</span>
                  <Radio.Group
                    className="text-left"
                    defaultValue="true"
                    name="gioitinh"
                    buttonStyle="outline"
                    onChange={formikProps.handleChange}
                  >
                    <Radio.Button value="true">Nam</Radio.Button>
                    <Radio.Button value="false">Nữ</Radio.Button>
                  </Radio.Group>
                </div>
              </div>
              <div className="flex fold:flex-col md:flex-row gap-4">
                <div className="fold:w-full md:w-1/2 mb-3 flex flex-col">
                  <span className="text-left">Ngày sinh</span>
                  <DatePicker
                    name="ngaysinh"
                    defaultValue={moment(user?.ngaysinh)}
                    disabledDate={disabledDate}
                    className="input-responsive"
                    onChange={(date) => {
                      const { _d } = date;
                      formikProps.setFieldValue("ngaysinh", _d);
                    }}
                  />
                  <ErrorMessage name="ngaysinh">
                    {(msg) => (
                      <div className="text-error">{msg}</div>
                    )}
                  </ErrorMessage>
                </div>
                <div className="fold:w-full md:w-1/2 mb-3 flex flex-col">
                  <span className="text-left">Số điện thoại</span>
                  <Field
                    type="text"
                    className="input-responsive"
                    name="sdt"
                    placeholder="Bách Mộc"
                    onChange={formikProps.handleChange}
                  />
                  <ErrorMessage name="sdt">
                    {(msg) => (
                      <div className="text-error">{msg}</div>
                    )}
                  </ErrorMessage>
                </div>
              </div>
              <div className="flex flex-row w-full justify-center mb-3 gap-4">
                <button
                  className="button-3d-gray"
                  onClick={() => {
                    setEdit(false);
                  }}
                >
                  Hủy bỏ
                </button>
                <button className="button-3d-green" type="submit">
                  Cập nhật
                </button>
              </div>
            </Form>
          )}
        </Formik>
      ) : _.isEmpty(user) ? (
        <div className="py-4 rounded shadow-md w-60 sm:w-80 animate-pulse bg-gray-50">
          <div className="flex p-4 space-x-4 sm:px-8">
            <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gray-300" />
            <div className="flex-1 py-2 space-y-4">
              <div className="w-full h-3 rounded bg-gray-300" />
              <div className="w-5/6 h-3 rounded bg-gray-300" />
            </div>
          </div>
          <div className="p-4 space-y-4 sm:px-8">
            <div className="w-full h-4 rounded bg-gray-300" />
            <div className="w-full h-4 rounded bg-gray-300" />
            <div className="w-3/4 h-4 rounded bg-gray-300" />
          </div>
        </div>
      ) : (
        <div className="max-w-md p-8 sm:flex sm:space-x-6 bg-gray-50 text-gray-800">
          <div className="flex-shrink-0 w-full mb-6 h-44 sm:h-32 sm:w-32 sm:mb-0">
            <img
              src={preview}
              alt="Bách Mộc"
              className="object-cover object-center w-full h-full rounded bg-gray-500"
            />
          </div>
          <div className="flex flex-col space-y-4">
            <div>
              <h2 className="text-2xl font-semibold">{user?.hoten}</h2>
              <span className="text-sm text-gray-600">
                {_?.map(user?.roles, (e, i) => {
                  return <p key={i}>{e?.tenvt}</p>;
                })}
              </span>
            </div>
            <div className="space-y-1">
              <span className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  aria-label="Email address"
                  className="w-4 h-4"
                >
                  <path
                    fill="currentColor"
                    d="M274.6,25.623a32.006,32.006,0,0,0-37.2,0L16,183.766V496H496V183.766ZM464,402.693,339.97,322.96,464,226.492ZM256,51.662,454.429,193.4,311.434,304.615,256,268.979l-55.434,35.636L57.571,193.4ZM48,226.492,172.03,322.96,48,402.693ZM464,464H48V440.735L256,307.021,464,440.735Z"
                  />
                </svg>
                <span className="text-gray-600">{user?.tendn}</span>
              </span>
              <span className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  aria-label="Phonenumber"
                  className="w-4 h-4"
                >
                  <path
                    fill="currentColor"
                    d="M449.366,89.648l-.685-.428L362.088,46.559,268.625,171.176l43,57.337a88.529,88.529,0,0,1-83.115,83.114l-57.336-43L46.558,362.088l42.306,85.869.356.725.429.684a25.085,25.085,0,0,0,21.393,11.857h22.344A327.836,327.836,0,0,0,461.222,133.386V111.041A25.084,25.084,0,0,0,449.366,89.648Zm-20.144,43.738c0,163.125-132.712,295.837-295.836,295.837h-18.08L87,371.76l84.18-63.135,46.867,35.149h5.333a120.535,120.535,0,0,0,120.4-120.4v-5.333l-35.149-46.866L371.759,87l57.463,28.311Z"
                  />
                </svg>
                <span className="text-gray-600">{user?.sdt}</span>
              </span>
              <span className="flex items-center space-x-2 w-full flex-row justify-start gap-2 text-gray-600">
                <UserOutlined /> {user?.hoten}
              </span>
              <span className="flex items-center space-x-2 w-full flex-row justify-start gap-2 text-gray-600">
                {!user?.gioitinh ? <WomanOutlined /> : <ManOutlined />}{" "}
                {user?.gioitinh ? "Nam" : "Nữ"}
              </span>
              <span
                className="flex items-center space-x-2"
                onClick={() => setEdit(true)}
              >
                <Tooltip title={"Chỉnh sửa"}>
                  <EditOutlined className="edit-icon text-md" />
                </Tooltip>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
