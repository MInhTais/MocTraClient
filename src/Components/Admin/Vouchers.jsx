import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Action from "../../Common/Action/Admin/AdminAction";
import { Button, Popconfirm, Table, Input, Space, Tag, Tooltip } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import * as Type from "../../Common/Const/Admin/Drawer";
import * as type from "../../Common/Const/Admin/Edit";
import _ from "lodash";
import { MANAGER } from "../../Common/Const/Auth/AuthConst";
import Highlighter from "react-highlight-words";
import { FiEdit3, FiFeather, FiTrash } from "react-icons/fi";
import {
  BUTTON_ADD,
  BUTTON_EDIT,
  TITLE_ADMIN_VOUCHER,
} from "../../Common/Const/Admin/AdminConst";
import { DELETE_VOUCHER_WARNING } from "../../Common/Const/Notify/NotifyConst";
import EditVoucher from "./Form/EditVoucher";
import MetaDecorator from "../../libs/Helmet/MetaDecorator";
import {
  VOUCHER_PAGE_DESCRIPTION,
  VOUCHER_PAGE_TITLE,
} from "../../Common/Const/Page/PageConst";
export default function Categories(props) {
  const { size } = props;
  const dispatch = useDispatch();
  const { mgg } = useSelector((state) => state.AdminReducer);
  const { credentials } = useSelector((state) => state.AuthReducer);
  const [state, setState] = useState({
    sortedInfo: null,
    searchText: "",
    searchedColumn: "",
  });
  let searchInput = useRef(null);

  useEffect(() => {
    dispatch({
      type: Action.FIND_ALL_ACTION,
    });
  }, []);

  const handleChange = (pagination, filters, sorter) => {
    setState({
      sortedInfo: sorter,
    });
  };

  let { sortedInfo } = state;
  sortedInfo = sortedInfo || {};

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

  const columns = [
    {
      title: "Tên mã",
      key: "tenloaigg",
      dataIndex: "tenloaigg",
      sorter: (a, b) => a.tenloaigg.length - b.tenloaigg.length,
      sortOrder: sortedInfo.columnKey === "tenloaigg" && sortedInfo.order,
      ellipsis: true,
      ...getColumnSearchProps("tenloaigg"),
    },
    {
      title: "Giảm",
      key: "giagiam",
      ...getColumnSearchProps("giagiam"),
      render: (text, record, index) => {
        return (
          <div className="w-full flex flex-row justify-start">
            <Tag color="green">{record?.giagiam?.toLocaleString()}</Tag>
          </div>
        );
      },
      sorter: (a, b) => a.giagiam - b.giagiam,
      sortOrder: sortedInfo.columnKey === "giagiam" && sortedInfo.order,
      responsive: ["md"],
    },
    {
      title: "Giá trị tối thiểu",
      key: "giatritoithieu",
      ...getColumnSearchProps("giatritoithieu"),
      render: (text, record, index) => {
        return (
          <div className="w-full flex flex-row justify-start">
            <Tag color="red">{record?.giatritoithieu?.toLocaleString()}</Tag>
          </div>
        );
      },
      sorter: (a, b) => a.giatritoithieu - b.giatritoithieu,
      sortOrder: sortedInfo.columnKey === "giatritoithieu" && sortedInfo.order,

      responsive: ["md"],
    },
    {
      title: "Action",
      key: "x",
      render: (text, record, index) => {
        return (
          <div className="flex flex-row gap-2">
            {_.find(credentials?.roles, (e) => e === MANAGER) ? (
              <Popconfirm
                okText="Đồng ý"
                cancelText="Hủy bỏ"
                title="Bạn có muốn tạo mã giảm giá cho tất cả khách hàng?"
                onConfirm={() => {
                  dispatch({
                    type: Action.ADD_FAST_VOUCHER_ADMIN_ACTION,
                    voucher: record,
                  });
                }}
              >
                <Tooltip title="Tạo voucher cho tất cả khách hàng">
                  <FiFeather className="delete-icon" />
                </Tooltip>
              </Popconfirm>
            ) : (
              ""
            )}
            <Tooltip title="Cập nhật voucher">
              <FiEdit3
                className="edit-icon"
                onClick={() => {
                  dispatch({
                    type: Type.OPEN_FORM,
                    Component: <EditVoucher />,
                    title: TITLE_ADMIN_VOUCHER,
                    nameButton: BUTTON_EDIT,
                    footer: true,
                  });
                  dispatch({
                    type: type.EDIT_VOUCHER,
                    voucherEditModal: record,
                  });
                }}
              />
            </Tooltip>
            {_.find(credentials?.roles, (e) => e === MANAGER) ? (
              <Popconfirm
                placement="top"
                title={DELETE_VOUCHER_WARNING}
                onConfirm={() => {
                  dispatch({
                    type: Action.DELETE_VOUCHER_ADMIN_ACTION,
                    voucher: record,
                  });
                }}
                okText="Đồng ý"
                cancelText="Hủy bỏ"
              >
                <Tooltip title="Xóa voucher">
                  <FiTrash className="delete-icon" />
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
        title={VOUCHER_PAGE_TITLE}
        description={VOUCHER_PAGE_DESCRIPTION}
      />
      <div className="flex flex-row mb-4 justify-end">
        <button
          className="button-3d-green rounded-md"
          onClick={() => {
            dispatch({
              type: Type.OPEN_FORM_CREATE,
              Component: <EditVoucher />,
              title: TITLE_ADMIN_VOUCHER,
              nameButton: BUTTON_ADD,
              footer: true,
            });

            dispatch({
              type: type.EDIT_VOUCHER,
              voucherEditModal: null,
            });
          }}
        >
          THÊM
        </button>
      </div>
      <Table
        columns={columns}
        rowKey={(record) => record.maloaigg}
        expandable={{
          expandedRowRender: (record) => (
            <div className="flex flex-col">
              <p className="mb-3 block">
                Giảm:{" "}
                <Tag color="green">
                  {record.giagiam?.toLocaleString() + "đ"}
                </Tag>
              </p>
              <p className="mb-3 block">
                Giá trị tối thiểu:{" "}
                <Tag color="red">
                  {record.giatritoithieu?.toLocaleString() + "đ"}
                </Tag>
              </p>
            </div>
          ),
          rowExpandable: (record) => {
            return size?.width > 768 ? false : true;
          },
        }}
        dataSource={mgg}
        onChange={handleChange}
      />
    </div>
  );
}