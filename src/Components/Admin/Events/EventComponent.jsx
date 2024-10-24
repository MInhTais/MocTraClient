import React, { useState } from "react";
import moment from "moment";
import LuckySpinComponent from "../../LuckySpin/LuckySpinComponent";
import { InputNumber, Popconfirm, Popover, Table, Tag } from "antd";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { rewardDetailSchema } from "../../../validates/EventValidation";
import { useDispatch } from "react-redux";
import { ADD_REWARD_DETAIL_ACTION, DELETE_REWARD_DETAIL_ACTION } from "../../../Common/Action/Admin/AdminAction";

const colors = ["green", "blue", "yellow", "pink", "purple", "red"];

export default function EventComponent({ values, size }) {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const handleSubmit = (detail) => {
    detail.ptsk =  values
    dispatch({
      type: ADD_REWARD_DETAIL_ACTION,
      detail,
    });
  };
  const columns = [
    {
      title: "Phần thưởng",
      key: "phanthuong",
      render: (text, record, index) => {
        return (
          <div className="w-full flex flex-row justify-center">
            <Tag color={colors[index]}>{record.tenchitiet}</Tag>
          </div>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text, record, index) => {
        return (
          <div className="w-full flex flex-row justify-center gap-4">
            <div className="w-1/2">
              <Popconfirm
                title="Bạn có muốn xóa phần thưởng này?"
                okText="Đồng ý"
                cancelText="Hủy bỏ"
                onConfirm={() => {
                  dispatch({
                    type: DELETE_REWARD_DETAIL_ACTION,
                    detail:record
                  })
                }}
              >
                <button className="button-3d-red">Xóa</button>
              </Popconfirm>
            </div>
          </div>
        );
      },
      responsive: ["sm"],
    },
  ];
  return (
    <div className="py-5">
      <div className="w-full flex flex-row justify-center gap-4">
        <Popover
          placement={"left"}
          content={
            <LuckySpinComponent
              reward={values?.ptsk?.ctpt ? values?.ptsk?.ctpt : values?.ctpt}
            />
          }
          trigger={"click"}
          getPopupContainer={(node) => node.parentElement}
        >
          <button className="button-3d-blue">Xem trước</button>
        </Popover>
        <button
          className="button-3d-yellow"
          onClick={(e) => {
            e.preventDefault();
            setVisible(true);
          }}
        >
          Tạo phần thưởng
        </button>
      </div>
      <div className="overflow-x-auto w-full">
        {visible ? (
          <Formik
            initialValues={{
              tenchitiet: "",
              soluong: 1,
              giatri: 1000,
              ptsk: values?.tensk ? values : values?.ptsk,
              mapt: values?.mapt,
            }}
            validationSchema={rewardDetailSchema}
            onSubmit={handleSubmit}
          >
            {({ handleChange, values, setFieldValue }) => (
              <Form className="flex flex-col w-full bg-gray-50 p-4">
                <div className="flex fold:flex-col md:flex-row gap-4">
                  <div className="w-full mb-3 flex flex-col">
                    <span className="text-left">Tên chi tiết</span>
                    <Field
                      type="text"
                      className="input-responsive"
                      name="tenchitiet"
                      placeholder="Bách Mộc"
                      onChange={handleChange}
                    />
                    <ErrorMessage name="tenchitiet">
                      {(msg) => <div className="text-error">{msg}</div>}
                    </ErrorMessage>
                  </div>
                </div>
                <div className="flex fold:flex-col md:flex-row gap-4">
                  <div className="w-1/2 mb-3 flex flex-col">
                    <span className="text-left">Số lượng</span>
                    <InputNumber
                      min={1}
                      value={values?.soluong}
                      onChange={(e) => {
                        setFieldValue('soluong',e);
                      }}
                      name="soluong"
                      className="w-full"
                    />
                    <ErrorMessage name="soluong">
                      {(msg) => {
                        return <p className="text-error">{msg}</p>;
                      }}
                    </ErrorMessage>
                  </div>
                  <div className="w-1/2 mb-3 flex flex-col">
                    <span className="text-left">Giá trị</span>
                    <InputNumber
                      min={1}
                      value={values?.giatri}
                      onChange={(e) => {
                        setFieldValue('giatri',e);
                      }}
                      name="giatri"
                      className="w-full"
                    />
                  </div>
                </div>
                <div className="flex flex-row w-full justify-center mb-3 gap-4">
                  <button className="button-3d-green" type="submit">
                    THÊM
                  </button>
                  <button
                    className="button-3d-gray"
                    onClick={() => {
                      setVisible(false);
                    }}
                  >
                    HỦY
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        ) : null}
        <Table
          columns={columns}
          rowKey={(record) => record.tenchitiet}
          expandable={{
            expandedRowRender: (record) => (
              <div className="w-full flex flex-col justify-center">
                <p>
                  Từ:
                  {moment(record?.sk?.ngaybatdau).format("DD/MM/YYYY HH:mm:ss")}
                </p>
                <p>
                  Đến:
                  {moment(record?.sk?.ngayketthuc).format(
                    "DD/MM/YYYY HH:mm:ss"
                  )}
                </p>
                <p>
                  Giới hạn:
                  {record.soluong}
                </p>
                <p className="duo:hidden">
                  <Popconfirm
                    title="Bạn có muốn xóa phần thưởng này?"
                    okText="Đồng ý"
                    cancelText="Hủy bỏ"
                    onConfirm={() => {
                      dispatch({
                        type: DELETE_REWARD_DETAIL_ACTION,
                        detail:record
                      })
                    }}
                  >
                    <label className="cursor-pointer text-indigo-500 hover:text-indigo-700 hover:animate-pulse">
                      Xóa
                    </label>
                  </Popconfirm>
                </p>
              </div>
            ),
          }}
          dataSource={values?.ptsk?.ctpt ? values?.ptsk?.ctpt : values?.ctpt}
        />
      </div>
    </div>
  );
}
