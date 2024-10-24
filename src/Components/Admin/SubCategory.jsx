import React, { useEffect, useRef, useState } from "react";
import * as Action from "../../Common/Action/Admin/AdminAction";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input, Popconfirm, Space, Table, Tag, Tooltip } from "antd";
import {
  SearchOutlined,
} from "@ant-design/icons";
import EditSubCategory from "./Form/EditSubCategory";
import * as Type from "../../Common/Const/Admin/Drawer";
import * as type from "../../Common/Const/Admin/Edit";
import Highlighter from "react-highlight-words";
import { FiEdit3, FiTrash } from "react-icons/fi";
import { BUTTON_ADD, BUTTON_EDIT, TITLE_ADMIN_SUB_CATEGORY } from "../../Common/Const/Admin/AdminConst";
import { DELETE_SUB_CATEGORY_WARNING_MESSAGE } from "../../Common/Const/Notify/NotifyConst";
import _ from 'lodash';
import { UPLOAD_PICTURE_CATEGORY } from "../../Common/Const/Category/CategoryConst";
import { MANAGER } from "../../Common/Const/Auth/AuthConst";
import MetaDecorator from "../../libs/Helmet/MetaDecorator";
import { SUB_CATEGORY_PAGE_DESCRIPTION, SUB_CATEGORY_PAGE_TITLE } from "../../Common/Const/Page/PageConst";


export default function SubCategory(props) {
  const dispatch = useDispatch();
  const { l,nl } = useSelector((state) => state.AdminReducer);
  const {credentials} = useSelector((state)=>state.AuthReducer);
  const [state, setState] = useState({
    sortedInfo: null,
    searchText: "",
    searchedColumn: "",
  });
  let searchInput = useRef(null);
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setState({
                searchText: selectedKeys[0],
                searchedColumn: dataIndex,
              });
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput?.current?.select(), 100);
      }
    },
    render: (text) =>
      state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setState({ searchText: "" });
  };
  useEffect(() => {
    dispatch({
      type: Action.FIND_ALL_ACTION,
    });
  }, []);

  const handleChange = (pagination, filters, sorter) => {
    setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };
  let { sortedInfo, filteredInfo } = state;
  sortedInfo = sortedInfo || {};
  const columns = [
    {
      title: "Tên loại",
      key: "tenloai",
      ...getColumnSearchProps("tenloai"),
      dataIndex: "tenloai",
      sorter: (a, b) => a.tenloai.length - b.tenloai.length,
      sortOrder: sortedInfo.columnKey === "tenloai" && sortedInfo.order,
      width:'25%'
    },
    {
      title: "Nhóm loại",
      key: "nhom",
      render: (text, record, index) => {
        return <Tag color="green">{record.nhom.tennhom}</Tag>;
      },
      sorter: (a, b) => a.nhom.tennhom.length - b.nhom.tennhom.length,
      sortOrder: sortedInfo.columnKey === "nhom" && sortedInfo.order,
      width:'25%',
      responsive: ["sm"],
    },
    {
      title:'Hình ảnh',
      key:'hinhanh',
      render:(text,record,index)=>{
        return <div className="w-full flex flex-row justify-start">
          <img className="w-8 h-8" src={"http://localhost:8080/images/category/"+record.hinhanh} />
        </div>
      },
      width:'25%',
      responsive:['sm']
    },
    {
      title: "Action",
      key: "x",
      render: (text, record, index) => {
        return (
          <div className="flex flex-row">
            <Tooltip title='Cập nhật loại sản phẩm'>
            <FiEdit3
              className="edit-icon mr-2"
              onClick={() => {
                const action = {
                  type: Type.OPEN_FORM,
                  Component: <EditSubCategory />,
                  title: TITLE_ADMIN_SUB_CATEGORY,
                  nameButton: BUTTON_EDIT,
                  footer:true
                };
                dispatch(action);
                const actionEditSubCategory = {
                  type: type.EDIT_SUB_CATEGORY,
                  subCategoryEditModal: record,
                };
                dispatch(actionEditSubCategory);

                dispatch({
                  type: UPLOAD_PICTURE_CATEGORY,
                  preview: record.hinhanh,
                  image: {
                    name: record.hinhanh,
                  },
                });
              }}
            />
            </Tooltip>
            {_.find(credentials?.roles,e=>e===MANAGER) ? <Popconfirm
              placement="top"
              title={DELETE_SUB_CATEGORY_WARNING_MESSAGE}
              onConfirm={() => {
                dispatch({
                  type: Action.DELETE_SUB_CATEGORY_ACTION,
                  category: record,
                });
              }}
              okText="Đồng ý"
              cancelText="Hủy bỏ"
            >
              <Tooltip title='Xóa loại sản phẩm'>
              <FiTrash className="delete-icon ml-2" />
              </Tooltip>
            </Popconfirm>: null}
          </div>
        );
      },
      width: 200,
    },
  ];

  return (
    <div className="md:container w-full">
      <MetaDecorator title={SUB_CATEGORY_PAGE_TITLE} description={SUB_CATEGORY_PAGE_DESCRIPTION} />
      <div
        className="flex flex-row justify-end"
        style={{ marginBottom: 15 }}
      >
        <button
          className="button-3d-green rounded-md"
          onClick={() => {
            dispatch({
              type: Type.OPEN_FORM_CREATE,
              Component: <EditSubCategory />,
              title: TITLE_ADMIN_SUB_CATEGORY,
              nameButton: BUTTON_ADD,
              footer:true
            });
            let subCategoryEditModal ={
              nhom: _.first(nl)
            }
            dispatch({
              type: type.EDIT_SUB_CATEGORY,
              subCategoryEditModal
            });
          }}
        >
          THÊM
        </button>
      </div>
      <Table
        columns={columns}
        dataSource={l}
        rowKey={(record) => record.maloai}
        expandable={{
          expandedRowRender: (record) => (
            <div className="flex flex-col">
              <p className="mb-3 block">Mô tả: {record.mota}</p>
            </div>
          ),
        }}
        onChange={handleChange}
      />
    </div>
  );
}
