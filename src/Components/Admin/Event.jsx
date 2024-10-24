import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as Action from "../../Common/Action/Admin/AdminAction";
import {
  Button,
  Input,
  Popconfirm,
  Space,
  Table,
  Tabs,
  Tag,
  Tooltip,
} from "antd";
import {
  SearchOutlined,
  AppleOutlined,
  AndroidOutlined,
} from "@ant-design/icons";
import * as Type from "../../Common/Const/Admin/Drawer";
import * as type from "../../Common/Const/Admin/Edit";
import _ from "lodash";
import { MANAGER } from "../../Common/Const/Auth/AuthConst";
import Highlighter from "react-highlight-words";
import { FiEdit3, FiTrash } from "react-icons/fi";
import {
  BUTTON_ADD,
  BUTTON_EDIT,
  TITLE_ADMIN_EVENT,
  TITLE_ADMIN_REWARD,
} from "../../Common/Const/Admin/AdminConst";
import moment from "moment";
import EditEvent from "./Form/EditEvent";
import EditReward from "./Form/EditReward";
import MetaDecorator from "../../libs/Helmet/MetaDecorator";
import {
  EVENT_PAGE_DESCRIPTION,
  EVENT_PAGE_TITLE,
} from "../../Common/Const/Page/PageConst";

const { TabPane } = Tabs;

export default function Event(props) {
  const { sk, ptsk } = useSelector((state) => state.AdminReducer);
  const dispatch = useDispatch();
  const { size } = props;
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
  let { sorted } = state;
  sorted = sorted || {};
  const columns = [
    {
      title: "Mã sự kiện",
      key: "mask",
      dataIndex: "mask",
      width: 100,
      sorter: (a, b) => a.mask - b.mask,
      sortOrder: sorted.columnKey === "mask" && sorted.order,
      responsive: ["sm"],
      ...getColumnSearchProps("mask"),
    },
    {
      title: "Tên sự kiện",
      key: "tensk",
      dataIndex: "tensk",
      width: 200,
      sorter: (a, b) => a.tensk.length - b.tensk.length,
      sortOrder: sorted.columnKey === "tensk" && sorted.order,
      ...getColumnSearchProps("tensk"),
    },
    {
      title: "Ngày bắt đầu",
      key: "ngaybatdau",
      ...getColumnSearchProps("ngaybatdau"),
      render: (text, record, index) => {
        return (
          <div className="w-full flex justify-center">
            <Tag color="green" icon>
              {moment(record.ngaybatdau).format("DD/MM/YYYY HH:mm:ss")}
            </Tag>
          </div>
        );
      },
      sorter: (a, b) =>
        moment(a.ngaybatdau).unix() - moment(b.ngaybatdau).unix(),
      sortOrder: sorted.columnKey === "ngaybatdau" && sorted.order,
      width: 150,
      responsive: ["lg"],
    },
    {
      title: "Ngày kết thúc",
      key: "ngayketthuc",
      ...getColumnSearchProps("ngayketthuc"),
      render: (text, record, index) => {
        return (
          <div className="w-full flex justify-center">
            <Tag color="green">
              {moment(record.ngayketthuc).format("DD/MM/YYYY HH:mm:ss")}
            </Tag>
          </div>
        );
      },
      sorter: (a, b) =>
        moment(a.ngayketthuc).unix() - moment(b.ngayketthuc).unix(),
      sortOrder: sorted.columnKey === "ngaybatdau" && sorted.order,
      width: 150,
      responsive: ["lg"],
    },
    {
      title: "Action",
      key: "x",
      render: (text, record, index) => {
        return (
          <div className="flex flex-row gap-4">
            <Tooltip title="Chỉnh sửa sự kiện">
              <FiEdit3
                className="edit-icon"
                onClick={() => {
                  dispatch({
                    type: Type.OPEN_FORM,
                    Component: <EditEvent size={size} />,
                    title: TITLE_ADMIN_EVENT,
                    nameButton: BUTTON_EDIT,
                    footer: true,
                  });
                  dispatch({
                    type: type.EDIT_EVENT,
                    eventEditModal: record,
                  });
                }}
              />
            </Tooltip>
            {_?.find(credentials?.roles, (e) => e === MANAGER) ? (
              <Popconfirm
                placement="top"
                title={"Bạn có muốn xóa sự kiện này?"}
                onConfirm={() => {
                  dispatch({
                    type: Action.DELETE_EVENT_ACTION,
                    event: record,
                  });
                }}
                okText="Đồng ý"
                cancelText="Hủy bỏ"
              >
                <Tooltip title="Xóa sự kiện">
                  <FiTrash className="delete-icon" />
                </Tooltip>
              </Popconfirm>
            ) : (
              ""
            )}
          </div>
        );
      },
      width: 150,
    },
  ];

  const columnsReward = [
    {
      title: "Mã phần thưởng",
      dataIndex: "mapt",
      key: "mapt",
      sorter: (a, b) => a.mapt - b.mapt,
      sortOrder: sorted.columnKey === "mapt" && sorted.order,
      responsive: ["sm"],
    },
    {
      title: "Tên phần thưởng",
      key: "phanthuong",
      dataIndex: "phanthuong",
      sorter: (a, b) => a.phanthuong.length - b.phanthuong.length,
      sortOrder: sorted.columnKey === "phanthuong" && sorted.order,
    },
    {
      title: "Action",
      key: "action",
      render: (text, record, index) => {
        return (
          <div className="w-full flex flex-row justify-center gap-4">
            <Tooltip title="Chỉnh sửa phần thưởng">
              <FiEdit3
                className="edit-icon"
                onClick={() => {
                  dispatch({
                    type: Type.OPEN_FORM,
                    Component: <EditReward />,
                    title: TITLE_ADMIN_REWARD,
                    nameButton: BUTTON_EDIT,
                    footer: true,
                  });
                  let pt = _.find(ptsk, (e) => e.mapt === record.mapt);

                  record.mapt = pt.mapt;
                  dispatch({
                    type: type.EDIT_REWARD,
                    rewardEditModal: record,
                  });
                }}
              />
            </Tooltip>
            {_?.find(credentials?.roles, (e) => e === MANAGER) ? (
              <Popconfirm
                placement="top"
                title={"Bạn có muốn xóa phần thưởng này?"}
                onConfirm={() => {
                  dispatch({
                    type: Action.DELETE_REWARD_ACTION,
                    reward: record,
                  });
                }}
                okText="Đồng ý"
                cancelText="Hủy bỏ"
              >
                <Tooltip title="Xóa phần thưởng">
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
        title={EVENT_PAGE_TITLE}
        description={EVENT_PAGE_DESCRIPTION}
      />
      <Tabs defaultActiveKey="2">
        <TabPane
          tab={
            <span>
              <AppleOutlined />
              Sự kiện
            </span>
          }
          key="1"
        >
          <div className="flex flex-row justify-end mb-4 md:container">
            <button
              className="button-3d-green rounded-md"
              onClick={() => {
                dispatch({
                  type: Type.OPEN_FORM_CREATE,
                  Component: <EditEvent />,
                  title: TITLE_ADMIN_EVENT,
                  nameButton: BUTTON_ADD,
                  footer: true,
                });
                let eventEditModal = {
                  ngaybatdau: moment().add(5, "minutes"),
                  ngayketthuc: moment().add(35, "minutes"),
                  ptsk: ptsk[0],
                  gioihan: 1,
                };
                dispatch({
                  type: type.EDIT_EVENT,
                  eventEditModal,
                });
              }}
            >
              THÊM
            </button>
          </div>
          <Table
            columns={columns}
            dataSource={sk}
            rowKey={(record) => record.mask}
            expandable={{
              expandedRowRender: (record) => (
                <div className="flex flex-col">
                  <p className="mb-3 block duo:hidden">
                    Mã sự kiện: {record.mask}
                  </p>
                  <p className="mb-3 block lg:hidden">
                    Ngày bắt đầu:{" "}
                    <Tag color={"green"}>
                      {moment(record?.ngaybatdau).format("DD/MM/YYYY HH:ss:mm")}
                    </Tag>
                  </p>
                  <p className="mb-3 block lg:hidden">
                    Ngày kết thúc:{" "}
                    <Tag color={"red"}>
                      {moment(record?.ngayketthuc).format(
                        "DD/MM/YYYY HH:ss:mm"
                      )}
                    </Tag>
                  </p>
                </div>
              ),
              rowExpandable: (record) => {
                return size?.width >= 992 ? false : true;
              },
            }}
            onChange={handleChange}
          />
        </TabPane>
        <TabPane
          tab={
            <span>
              <AndroidOutlined />
              Phần thưởng
            </span>
          }
          key="2"
        >
          <div className="md:container w-full flex flex-col justify-center gap-y-5">
            <div className="w-full flex flex-row justify-end">
              <button
                className="button-3d-green"
                onClick={() => {
                  dispatch({
                    type: Type.OPEN_FORM_CREATE,
                    Component: <EditReward />,
                    title: TITLE_ADMIN_REWARD,
                    nameButton: BUTTON_ADD,
                    footer: true,
                  });
                  dispatch({
                    type: type.EDIT_REWARD,
                    rewardEditModal: null,
                  });
                }}
              >
                THÊM
              </button>
            </div>
            <div>
              <Table
                columns={columnsReward}
                dataSource={ptsk}
                rowKey={(record) => record.mapt}
                expandable={{
                  expandedRowRender: (record) => (
                    <div className="flex flex-col">
                      <p className="mb-3 block md:hidden">
                        Mã phần thưởng: {record.mapt}
                      </p>
                    </div>
                  ),
                  rowExpandable: (record) => {
                    return window.innerWidth >= 576 ? false : true;
                  },
                }}
                onChange={handleChange}
              />
            </div>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
}
