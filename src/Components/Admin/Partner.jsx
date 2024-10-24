import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as Action from "../../Common/Action/Admin/AdminAction";
import {
  Badge,
  Button,
  Card,
  Input,
  Popconfirm,
  Space,
  Table,
  Tag,
  Tooltip,
} from "antd";
import {
  EyeInvisibleOutlined,
  EyeOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import * as Type from "../../Common/Const/Admin/Drawer";
import * as type from "../../Common/Const/Admin/Edit";
import _ from "lodash";
import { MANAGER } from "../../Common/Const/Auth/AuthConst";
import Highlighter from "react-highlight-words";
import { FiEdit3 } from "react-icons/fi";
import {
  BUTTON_EDIT,
  TITLE_ADMIN_PARTNER,
} from "../../Common/Const/Admin/AdminConst";
import EditPartner from "./Form/EditPartner";
import MetaDecorator from "../../libs/Helmet/MetaDecorator";
import { PARTNER_PAGE_DESCRIPTION, PARTNER_PAGE_TITLE } from "../../Common/Const/Page/PageConst";

export default function Partner(props) {
  const { size } = props;
  const { doitac } = useSelector((state) => state.AdminReducer);
  const dispatch = useDispatch();
  const credentials = JSON.parse(localStorage.getItem("credentials"));
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

  const handleChange = (pagination, filters, sorter) => {
    setState({
      sorted: sorter,
      filtered: filters,
    });
  };
  let { sorted, filtered } = state;
  sorted = sorted || {};
  const columns = [
    {
      title: "Mã",
      key: "mancc",
      dataIndex: "mancc",
      sorter: (a, b) => a.mancc - b.mancc,
      sortOrder: sorted.columnKey === "mancc" && sorted.order,
      responsive: ["sm"],
      ...getColumnSearchProps("mancc"),
    },
    {
      title: "Tên cửa hàng",
      key: "tencuahang",
      ...getColumnSearchProps("tencuahang"),
      render: (text, record, index) => {
        return (
          <div className="w-full flex flex-row justify-start">
            <Tooltip title={record.tencuahang}>{record.tencuahang}</Tooltip>
          </div>
        );
      },
      sorter: (a, b) => a.tencuahang.length - b.tencuahang.length,
      sortOrder: sorted.columnKey === "tencuahang" && sorted.order,
      
      width: size?.width >= 1280 ? 200 : 150,
    },
    {
      title: "Chủ cửa hàng",
      key: "chucuahang",
      ...getColumnSearchProps("chucuahang"),
      render: (text, record, index) => {
        return (
          <div className="w-full flex justify-center shadow-md">
            <Badge.Ribbon
              text={record.chucuahang}
              color={record?.pheduyet ? "green" : "red"}
            >
              <Card title="Partner" size="small">
                <Tooltip title={record.chucuahang}>
                  {record?.pheduyet ? "Đã kích hoạt" : "Khóa"}
                </Tooltip>
              </Card>
            </Badge.Ribbon>
          </div>
        );
      },
      sorter: (a, b) => a.chucuahang.length - b.chucuahang.length,
      sortOrder: sorted.columnKey === "chucuahang" && sorted.order,
      responsive: ["lg"],
    },
    {
      title: "Phê duyệt",
      key: "pheduyet",
      render: (text, record, index) => {
        return (
          <div className="flex flex-row w-full justify-center">
            <Tag color={record.pheduyet ? "green" : "red"}>
              {record.pheduyet ? "Đã phê duyệt" : "Khóa"}
            </Tag>
          </div>
        );
      },
      responsive: ["lg"],
    },
    {
      title: "Action",
      key: "x",
      render: (text, record, index) => {
        return (
          <div className="flex flex-row">
            {_.find(credentials?.roles,e=> e===MANAGER) ? <><Tooltip title="Chỉnh sửa">
              <FiEdit3
                className="edit-icon mr-2"
                onClick={() => {
                  dispatch({
                    type: Type.OPEN_FORM,
                    Component: <EditPartner />,
                    title: TITLE_ADMIN_PARTNER,
                    nameButton: BUTTON_EDIT,
                    footer: true,
                  });

                  dispatch({
                    type: type.EDIT_PARTNER,
                    partnerEditModal: record,
                  });
                }}
              />
            </Tooltip>

            <Popconfirm
              placement="top"
              title={
                "Bạn có muốn khóa đối tác? Điều này sẽ khóa toàn bộ sản phẩm của đối tác này, bạn vẫn muốn tiếp tục"
              }
              onConfirm={() => {
                record.pheduyet = !record.pheduyet;
                dispatch({
                  type: Action.UPDATE_STATUS_SHOP_ACTION,
                  shop: record,
                });
              }}
              okText="Đồng ý"
              cancelText="Hủy bỏ"
            >
              <Tooltip
                title={record?.pheduyet ? "Khóa cửa hàng" : "Mở cửa hàng"}
              >
                {record?.pheduyet ? (
                  <EyeInvisibleOutlined className="edit-icon ml-2 mr-2 text-indigo-500" />
                ) : (
                  <EyeOutlined className="edit-icon ml-2 mr-2 text-indigo-500" />
                )}
              </Tooltip>
            </Popconfirm></> : <p>...</p>}
          </div>
        );
      },
      width: 150,
    },
  ];

  return (
    <div className="container w-full">
      <MetaDecorator title={PARTNER_PAGE_TITLE} description={PARTNER_PAGE_DESCRIPTION} />
      <Table
        columns={columns}
        dataSource={doitac}
        rowKey={(record) => record.mancc}
        expandable={{
          expandedRowRender: (record) => (
            <div className="flex flex-col">
              <p className="mb-3 block md:hidden">
                Tên cửa hàng: {record.tencuahang}
              </p>
              <p className="mb-3 block md:hidden">
                Tên chủ cửa hàng: {record.chucuahang}
              </p>
              <p className="mb-3 block">
                Phê duyệt {record.pheduyet ? "Đã phê duyệt" : "Khóa"}
              </p>
            </div>
          ),
          rowExpandable: (record) => {
            return size?.width >= 1280 ? false : true;
          },
        }}
        onChange={handleChange}
      />
    </div>
  );
}
