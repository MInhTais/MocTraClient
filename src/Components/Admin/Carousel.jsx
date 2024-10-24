import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Action from "../../Common/Action/Admin/AdminAction";
import { Popconfirm, Table, Tooltip } from "antd";

import * as Type from "../../Common/Const/Admin/Drawer";
import * as type from "../../Common/Const/Admin/Edit";
import _ from "lodash";
import { MANAGER } from "../../Common/Const/Auth/AuthConst";
import { FIND_ALL_CAROUSEL_ACTION } from "../../Common/Action/Carousel/CarouselAction";
import EditCarousel from "./Form/EditCarousel";
import { FiEdit3, FiTrash } from "react-icons/fi";
import {
  BUTTON_ADD,
  TITLE_ADMIN_CAROUSEL,
} from "../../Common/Const/Admin/AdminConst";
import MetaDecorator from "../../libs/Helmet/MetaDecorator";
import {
  CAROUSEL_PAGE_DESCRIPTION,
  CAROUSEL_PAGE_TITLE,
} from "../../Common/Const/Page/PageConst";

export default function Carousel(props) {
  const dispatch = useDispatch();
  const { carousel } = useSelector((state) => state.CarouselReducer);
  const credentials = JSON.parse(localStorage.getItem("credentials"));
  const [state, setState] = useState({
    filteredInfo: null,
    sortedInfo: null,
  });

  useEffect(() => {
    dispatch({
      type: FIND_ALL_CAROUSEL_ACTION,
    });
  }, []);

  const handleChange = (pagination, filters, sorter) => {
    setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  let { filteredInfo, sortedInfo } = state;
  filteredInfo = filteredInfo || {};
  sortedInfo = sortedInfo || {};

  const columns = [
    {
      title: "Mã",
      key: "id",
      render: (text, record, index) => {
        return (
          <span>
            {record.id} - {record.hinhanh}
          </span>
        );
      },
      filteredValue: filteredInfo.id || null,
      onFilter: (value, record) => record.id.includes(value),
      sorter: (a, b) => a.id.length - b.id.length,
      sortOrder: sortedInfo.columnKey === "id" && sortedInfo.order,
      ellipsis: true,
      width: "150px",
      responsive: ["md"],
    },
    {
      title: "Hình ảnh",
      key: "hinhanh",
      render: (text, record, index) => {
        return (
          <div className="w-full flex flex-row justify-start">
            <img
              src={"http://localhost:8080/images/background/" + record.hinhanh}
              className="fold:w-full lg:w-1/2 h-32 img-responsive"
            />
          </div>
        );
      },
      filteredValue: filteredInfo.hinhanh || null,
      onFilter: (value, record) => record.hinhanh.includes(value),
      sorter: (a, b) => a.hinhanh.length - b.hinhanh.length,
      sortOrder: sortedInfo.columnKey === "hinhanh" && sortedInfo.order,
    },
    {
      title: "Action",
      key: "x",
      render: (text, record, index) => {
        return (
          <div className="flex flex-row">
            <Tooltip title="Cập nhật Carousel">
              <FiEdit3
                className="edit-icon mr-2"
                onClick={() => {
                  dispatch({
                    type: Type.OPEN_FORM,
                    Component: <EditCarousel />,
                    title: TITLE_ADMIN_CAROUSEL,
                    footer: true,
                  });
                  dispatch({
                    type: type.EDIT_CAROUSEL,
                    carouselEditModal: record,
                  });
                }}
              />
            </Tooltip>
            {_.find(credentials?.roles, (e) => e === MANAGER) ? (
              <Popconfirm
                placement="top"
                title={"Bạn có muốn xóa carousel này?"}
                onConfirm={() => {
                  dispatch({
                    type: Action.DELETE_CAROUSEL_ACTION,
                    carousel: record,
                  });
                }}
                okText="Đồng ý"
                cancelText="Hủy bỏ"
              >
                <Tooltip title="Xóa Carousel">
                  <FiTrash className="delete-icon ml-2" />
                </Tooltip>
              </Popconfirm>
            ) : (
              ""
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div className="md:container w-full">
      <MetaDecorator
        title={CAROUSEL_PAGE_TITLE}
        description={CAROUSEL_PAGE_DESCRIPTION}
      />
      <div className="flex flex-row justify-end mb-4">
        <button
          className="button-3d-green rounded-md"
          onClick={() => {
            dispatch({
              type: Type.OPEN_FORM_CREATE,
              Component: <EditCarousel />,
              title: TITLE_ADMIN_CAROUSEL,
              nameButton: BUTTON_ADD,
              footer: true,
            });
            dispatch({
              type: type.EDIT_CAROUSEL,
              carouselEditModal: null,
            });
          }}
        >
          THÊM
        </button>
      </div>
      <Table
        columns={columns}
        rowKey={(record) => record.id}
        expandable={{
          expandedRowRender: (record) => (
            <div className="flex flex-col">
              <p className="mb-3 block md:hidden">Id: {record.id}</p>
              <p className="mb-3 block">Hình ảnh: {record.hinhanh}</p>
              <p className="mb-3 block">Người tạo: {record?.nguoitao?.hoten}</p>
              <p className="mb-3 block">
                Mô tả: {record.mota ? record.mota : "Chưa có mô tả"}
              </p>
            </div>
          ),
          rowExpandable: (record) => {
            return true;
          },
        }}
        dataSource={carousel}
        onChange={handleChange}
      />
    </div>
  );
}
