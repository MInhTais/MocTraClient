import _ from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ACCEPT_ORDER_DETAIL_SELLER_ACTION,
  DELETE_ORDER_DETAIL_SELLER_ACTION,
  DELETE_RETURN_GOOD_ACTION,
  FIND_ALL_BY_PROVIDERID_ORDER_FALSE_ACTION,
  UPDATE_ORDER_RECEIVED_DATE_TIME_ACTION,
  UPDATE_RETURN_GOOD_ACTION,
} from "../../../Common/Action/Order/OrderAction";
import {
  Avatar,
  Badge,
  Button,
  Image,
  Input,
  Popconfirm,
  Popover,
  Space,
  Table,
  Tabs,
  Tag,
  Tooltip,
} from "antd";
import {
  AuditOutlined,
  CheckOutlined,
  CloseOutlined,
  ContainerOutlined,
  DeleteOutlined,
  LoadingOutlined,
  NodeCollapseOutlined,
  NodeExpandOutlined,
  SearchOutlined,
  SwapOutlined,
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import moment from "moment";
import { SELLER } from "../../../Common/Const/Auth/AuthConst";
import FastViewProduct from "../../Admin/Order/FastViewProduct";
import { ACCEPT_LIST_ORDER_ACTION } from "../../../Common/Action/Order/OrderAction";
import MetaDecorator from "../../../libs/Helmet/MetaDecorator";
import {
  ORDER_PAGE_DESCRIPTION,
  ORDER_PAGE_TITLE,
} from "../../../Common/Const/Page/PageConst";

const { TabPane } = Tabs;
export default function OrderSeller(props) {
  const { size } = props;
  const { orderSeller, order, returngoods } = useSelector(
    (state) => state.OrderReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: FIND_ALL_BY_PROVIDERID_ORDER_FALSE_ACTION,
    });
  }, []);

  const [state, setState] = useState({
    sortedInfo: null,
    searchText: "",
    searchedColumn: "",
    selectedRowKeys: [],
    loading: false,
  });
  let searchInput = useRef(null);
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
      title: "Mã đơn hàng",
      key: "mact",
      ...getColumnSearchProps("mact"),
      dataIndex: "mact",
      sorter: (a, b) => a?.mact - b?.mact,
      sortOrder: sortedInfo.columnKey === "mact" && sortedInfo.order,
    },
    {
      title: "Họ tên",
      key: "hoten",
      render: (text, record, index) => {
        return (
          <div className="w-full flex flex-row justify-center">
            <p>{record?.donhang?.hoten}</p>
          </div>
        );
      },
      sorter: (a, b) => a?.donhang?.hoten?.length - b?.donhang?.hoten?.length,
      sortOrder: sortedInfo.columnKey === "hoten" && sortedInfo.order,
      responsive: ["md"],
    },
    {
      title: "Địa chỉ",
      key: "diachi",
      render: (text, record, index) => {
        return (
          <div className="w-full flex flex-row justify-center">
            <p>{record?.donhang?.diachi}</p>
          </div>
        );
      },
      sorter: (a, b) => a?.donhang?.diachi?.length - b?.donhang?.diachi?.length,
      sortOrder: sortedInfo.columnKey === "diachi" && sortedInfo.order,
      responsive: ["xl"],
    },
    {
      title: "Mã sản phẩm",
      key: "masp",
      render: (text, record, index) => {
        return (
          <div className="w-full flex flex-row justify-center">
            <Popover
              placement={"bottom"}
              content={<FastViewProduct ctdh={record} />}
            >
              <Tag color="green">{record?.hdspct?.masp}</Tag>
            </Popover>
          </div>
        );
      },
      sorter: (a, b) => a?.hdspct?.masp.localeCompare(b?.hdspct?.masp),
      sortOrder: sortedInfo.columnKey === "masp" && sortedInfo.order,
      responsive: ["lg"],
    },
    {
      title: "Số lượng",
      key: "sl",
      ...getColumnSearchProps("sl"),
      dataIndex: "sl",
      sorter: (a, b) => a?.sl - b?.sl,
      sortOrder: sortedInfo.columnKey === "sl" && sortedInfo.order,
      responsive: ["sm"],
    },
    {
      title: "Đơn giá",
      key: "dongia",
      ...getColumnSearchProps("dongia"),
      dataIndex: "dongia",
      sorter: (a, b) => a?.dongia - b?.dongia,
      sortOrder: sortedInfo.columnKey === "dongia" && sortedInfo.order,
      responsive: ["sm"],
    },
    {
      title: "Action",
      key: "action",
      render: (text, record, index) => {
        return (
          <div className="w-full flex flex-row justify-center gap-4">
            {!record.pheduyet ? (
              <>
                <Popconfirm
                  placement="top"
                  title={"Bạn có phê duyệt đơn hàng này?"}
                  onConfirm={() => {
                    record.pheduyet = true;
                    dispatch({
                      type: ACCEPT_ORDER_DETAIL_SELLER_ACTION,
                      detail: record,
                    });
                  }}
                  okText="Đồng ý"
                  cancelText="Hủy bỏ"
                >
                  <Tooltip title={"Phê duyệt"}>
                    <CheckOutlined className="edit-icon text-indigo-500" />
                  </Tooltip>
                </Popconfirm>
                <Popconfirm
                  placement="top"
                  title={"Bạn có muốn xóa đơn hàng này?"}
                  onConfirm={() => {
                    dispatch({
                      type: DELETE_ORDER_DETAIL_SELLER_ACTION,
                      detail: record,
                    });
                  }}
                  okText="Đồng ý"
                  cancelText="Hủy bỏ"
                >
                  <Tooltip title="Xóa đơn hàng">
                    <DeleteOutlined className="delete-icon" />
                  </Tooltip>
                </Popconfirm>
              </>
            ) : (
              <div className="w-full flex flex-row justify-center">
                <Tag color="green">Đã xác nhận</Tag>
              </div>
            )}
          </div>
        );
      },
    },
  ];

  const columnsReturnGood = [
    {
      title: "Mã chi tiết",
      key: "mact",
      ...getColumnSearchProps("mact"),
      render: (record, text, index) => {
        return (
          <div className="w-full flex flex-row justify-start">
            <Badge color={"green"} text={record?.ctdh?.mact} />
          </div>
        );
      },
      sorter: (a, b) => a?.mact - b?.mact,
      sortOrder: sortedInfo.columnKey === "mact" && sortedInfo.order,
      responsive: ["lg"],
    },
    {
      title: "Yêu cầu",
      key: "noidung",
      ...getColumnSearchProps("noidung"),
      dataIndex: "noidung",
      sorter: (a, b) => a?.noidung?.length - b?.noidung?.length,
      sortOrder: sortedInfo.columnKey === "noidung" && sortedInfo.order,
      responsive: ["lg"],
    },
    {
      title: "Sản phẩm",
      key: "sanpham",
      render: (text, record, index) => {
        return (
          <div className="w-full flex flex-row justify-start">
            <Popover
              placement={"bottom"}
              content={<FastViewProduct ctdh={record?.ctdh} />}
            >
              <Tag color="green" className="cursor-pointer">
                {record?.ctdh?.hdspct?.masp}
              </Tag>
            </Popover>
          </div>
        );
      },
      sorter: (a, b) =>
        a?.ctdh?.hdspct?.masp?.length - b?.ctdh?.hdspct?.masp?.length,
      sortOrder: sortedInfo.columnKey === "sanpham" && sortedInfo.order,
      responsive: ["lg"],
    },
    {
      title: "Hình ảnh",
      key: "hinhanh",
      render: (text, record, index) => {
        return (
          <div className="w-full flex flex-row justify-start">
            <Avatar.Group
              maxCount={3}
              size="large"
              maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
            >
              <Avatar
                src={
                  <Image
                    src={
                      "http://localhost:8080/images/returngood/" +
                      record.hinhanh1
                    }
                  />
                }
              />
              {record?.hinhanh2 ? (
                <Avatar
                  src={
                    <Image
                      src={
                        "http://localhost:8080/images/returngood/" +
                        record.hinhanh2
                      }
                    />
                  }
                />
              ) : null}
              {record?.hinhanh3 ? (
                <Avatar
                  src={
                    <Image
                      src={
                        "http://localhost:8080/images/returngood/" +
                        record.hinhanh3
                      }
                    />
                  }
                />
              ) : null}
              {record?.hinhanh4 ? (
                <Avatar
                  src={
                    <Image
                      src={
                        "http://localhost:8080/images/returngood/" +
                        record.hinhanh4
                      }
                    />
                  }
                />
              ) : null}
              {record?.hinhanh5 ? (
                <Avatar
                  src={
                    <Image
                      src={
                        "http://localhost:8080/images/returngood/" +
                        record.hinhanh5
                      }
                    />
                  }
                />
              ) : null}
            </Avatar.Group>
          </div>
        );
      },
    },
    {
      title: "Hoàn trả",
      key: "hoantra",
      render: (record, text, index) => {
        return (
          <div className="w-full flex flex-row justify-start">
            {record?.pheduyet ? (
              <Badge color="orange" text="Có thể hoàn trả" />
            ) : !record?.ctdh?.ngaynhan ? (
              <Badge color="red" text="Chưa cập nhật ngày nhận" />
            ) : moment().unix() - moment(record?.ctdh?.ngaynhan).unix() <
              86400 ? (
              <Badge color="orange" text="Có thể hoàn trả" />
            ) : (
              <Badge color="yellow" text="Không thể hoàn trả" />
            )}
          </div>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (record, text, index) => {
        return (
          <div className="w-full flex flex-row justify-start gap-2">
            {!record?.pheduyet ? (
              <>
                {record?.ctdh?.ngaynhan ? (
                  moment().unix() - moment(record?.ctdh?.ngaynhan).unix() <
                  86400 ? (
                    <Tooltip title="Chấp nhận yêu cầu trả hàng">
                      <Popconfirm
                        okText="Đồng ý"
                        cancelText="Hủy bỏ"
                        title="Bạn có đồng ý chấp nhận hoàn trả cho khách hàng này?"
                        onConfirm={() => {
                          record.pheduyet = !record.pheduyet;
                          dispatch({
                            type: UPDATE_RETURN_GOOD_ACTION,
                            dth: record,
                            roles: SELLER,
                          });
                        }}
                      >
                        <CheckOutlined className="edit-icon text-green-600" />
                      </Popconfirm>
                    </Tooltip>
                  ) : null
                ) : null}

                <Popconfirm
                  title="Bạn có muốn xóa yêu cầu hoàn trả này?"
                  okText="Đồng ý"
                  cancelText="Hủy bỏ"
                  onConfirm={() => {
                    dispatch({
                      type: DELETE_RETURN_GOOD_ACTION,
                      dth: record,
                      roles: SELLER,
                    });
                  }}
                >
                  <CloseOutlined className="delete-icon text-red-600" />
                </Popconfirm>
              </>
            ) : (
              <Tag color="green">{"Đã xử lý"}</Tag>
            )}
          </div>
        );
      },
    },
  ];
  const columnsReceived = [
    {
      title: "Mã ĐH",
      key: "mact",
      render: (text, record, index) => {
        return <Tag color='yellow'>{record?.mact}</Tag>;
      },
      sorter: (a, b) => a?.mact - b?.mact,
      sortOrder: sortedInfo.columnKey === "mact" && sortedInfo.order,
      responsive: ["sm"],
    },
    {
      title: "Họ tên",
      key: "hoten",
      render: (text, record, index) => {
        return <p>{record.donhang.tkmh.hoten}</p>;
      },
      sorter: (a, b) =>
        a?.ctdh?.donhang?.tkmh?.hoten.length -
        b?.ctdh?.donhang?.tkmh?.hoten.length,
      sortOrder: sortedInfo.columnKey === "hoten" && sortedInfo.order,
      responsive: ["lg"],
    },
    {
      title: "Mã sản phẩm",
      key: "masp",
      render: (text, record, index) => {
        return (
          <div className="w-full flex flex-row justify-start">
            <Popover
              placement={"bottom"}
              content={<FastViewProduct ctdh={record} />}
            >
              <Tag color="green" className="cursor-pointer">
                {record?.hdspct?.masp}
              </Tag>
            </Popover>
          </div>
        );
      },
      sorter: (a, b) => a?.hdspct?.masp.localeCompare(b?.hdspct?.masp),
      sortOrder: sortedInfo.columnKey === "masp" && sortedInfo.order,
    },
    {
      title: "Tên sản phẩm",
      key: "tensp",
      render: (text, record, index) => {
        return <p>{record.hdspct.tensp}</p>;
      },
      sorter: (a, b) => a?.hdspct?.tensp?.length - b?.hdspct?.tensp?.length,
      sortOrder: sortedInfo.columnKey === "tensp" && sortedInfo.order,
      responsive: ["lg"],
    },
    {
      title: "Số lượng",
      key: "sl",
      ...getColumnSearchProps("sl"),
      dataIndex: "sl",
      sorter: (a, b) => a?.hdspct?.sl - b?.hdspct?.sl,
      sortOrder: sortedInfo.columnKey === "sl" && sortedInfo.order,
      responsive: ["xl"],
    },
    {
      title: "Đơn giá",
      key: "dongia",
      ...getColumnSearchProps("dongia"),
      dataIndex: "dongia",
      sorter: (a, b) => a?.hdspct?.dongia - b?.hdspct?.dongia,
      sortOrder: sortedInfo.columnKey === "dongia" && sortedInfo.order,
      responsive: ["xl"],
    },
    {
      title: "Action",
      key: "action",
      render: (text, record, index) => {
        return (
          <div className="w-full flex flex-row justify-center gap-2">
            <Tooltip title="Xác nhận giao hàng thành công">
              <CheckOutlined
                className="edit-icon text-green-700"
                onClick={() => {
                  dispatch({
                    type: UPDATE_ORDER_RECEIVED_DATE_TIME_ACTION,
                    detail: record,
                    roles: SELLER,
                  });
                }}
              />
            </Tooltip>
          </div>
        );
      },
    },
  ];
  const handleChange = (pagination, filters, sorter) => {
    setState({
      sortedInfo: sorter,
      filteredInfo: filters,
    });
  };
  const start = () => {
    setState({ loading: true });
    // ajax request after empty completing
    setTimeout(() => {
      setState({
        selectedRowKeys: [],
        loading: false,
      });
    }, 1000);
  };

  const onSelectChange = (selectedRowKeys) => {
    setState({ selectedRowKeys });
  };

  const { loading, selectedRowKeys } = state;
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys?.length > 0;
  return (
    <div className="w-full md:container">
      <MetaDecorator
        title={ORDER_PAGE_TITLE}
        description={ORDER_PAGE_DESCRIPTION}
      />
      <Tabs defaultActiveKey="1">
        <TabPane
          tab={
            <div className="w-full flex flex-row">
              <Tooltip title="Tất cả đơn hàng">
                <Badge count={orderSeller?.length} color="green">
                  <AuditOutlined className="text-green-700 text-xl" />
                </Badge>
              </Tooltip>
            </div>
          }
          key="1"
        >
          <div className="md:container">
            <Tabs defaultActiveKey="1">
              <TabPane
                tab={
                  <div className="w-full flex flex-col">
                    <Tooltip title="Tất cả">
                      <Badge count={orderSeller?.length} color="green">
                        <ContainerOutlined className="text-green-700 text-xl" />
                      </Badge>
                    </Tooltip>
                    Tất cả
                  </div>
                }
                key="1"
              >
                <div>
                  <Table
                    columns={columns}
                    dataSource={orderSeller}
                    rowKey={(record) => record.mact}
                    onChange={handleChange}
                    expandable={{
                      expandedRowRender: (record) => (
                        <div className="w-full flex flex-col justify-start gap-y-2">
                          <p className="block lg:hidden">
                            Họ tên: {record?.donhang?.hoten}
                          </p>
                          <p className="block lg:hidden">
                            Địa chỉ: {record?.donhang?.diachi}
                          </p>
                          <p className="block lg:hidden">
                            Mã sản phẩm: {record?.hdspct?.masp}
                          </p>
                          <p className="block sm:hidden">
                            Số lượng: {record?.sl}
                          </p>
                          <p className="block sm:hidden">
                            Đơn giá: {record?.dongia?.toLocaleString()}
                          </p>
                          <p className="block md:hidden">
                            Trạng thái:{" "}
                            <Tag color={record?.pheduyet ? "green" : "red"}>
                              {record?.pheduyet
                                ? "Đã xác nhận"
                                : "Chưa xác nhận"}
                            </Tag>
                          </p>
                        </div>
                      ),
                      rowExpandable: (record) => {
                        return size?.width > 1080 ? false : true;
                      },
                    }}
                  />
                </div>
              </TabPane>
              <TabPane
                tab={
                  <div className="w-full flex flex-col">
                    <Tooltip title="Chờ xác nhận">
                      <Badge count={order?.length} color="green">
                        <LoadingOutlined className="text-green-700 text-xl" />
                      </Badge>
                    </Tooltip>
                    Chờ xác nhận
                  </div>
                }
                key="2"
              >
                <div className="md:container">
                  <div className="w-full flex justify-start mb-4 gap-4">
                    <button
                      className="button-3d-green"
                      onClick={() => {
                        let orderDetail = [];
                        _.map(selectedRowKeys, (e) => {
                          orderDetail.push(_.find(order, (d) => d.mact === e));
                        });

                        dispatch({
                          type: ACCEPT_LIST_ORDER_ACTION,
                          detail: orderDetail,
                          roles: SELLER,
                        });
                      }}
                      disabled={
                        selectedRowKeys?.length > 0 && order?.length > 0
                          ? false
                          : true
                      }
                    >
                      Xử lý nhanh
                    </button>
                    <button
                      className="button-3d-gray"
                      onClick={start}
                      disabled={!hasSelected}
                      loading={loading}
                    >
                      Bỏ chọn
                    </button>
                    <span style={{ marginLeft: 8 }}>
                      {hasSelected
                        ? `Đã chọn ${selectedRowKeys.length} đơn hàng`
                        : ""}
                    </span>
                  </div>
                  <Table
                    onChange={handleChange}
                    rowKey={(record) => record.mact}
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={order}
                    expandable={{
                      expandedRowRender: (record) => (
                        <div className="flex flex-col">
                          <p className="mb-3 block">
                            {record?.donhang?.tkmh?.tendn}
                          </p>
                          <p className="mb-3 block md:hidden">
                            Họ tên: {record?.donhang?.hoten}
                          </p>
                          <p className="mb-3 block xl:hidden">
                            Địa chỉ: {record?.donhang?.diachi}
                          </p>
                          <p className="mb-3 block">
                            Số điện thoại: {record?.donhang?.sdt}
                          </p>
                          <p className="mb-3 block md:hidden">
                            Mã sản phẩm:
                            <Tag color="green">{record?.hdspct?.masp}</Tag>
                          </p>
                          <p className="mb-3 block">
                            SĐT: {record?.donhang?.sdt}
                          </p>
                          <p className="mb-3 block sm:hidden">
                            Số lượng: {record.sl}
                          </p>
                          <p className="mb-3 block sm:hidden">
                            Đơn giá:
                            {record?.dongia?.toLocaleString() + "đ"}
                          </p>
                        </div>
                      ),
                      rowExpandable: (record) => {
                        return size?.width >= 1280 ? false : true;
                      },
                    }}
                  />
                </div>
              </TabPane>
              <TabPane
                tab={
                  <div className="w-full flex flex-col">
                    <Tooltip title=" Giao hàng">
                      <Badge
                        count={
                          _.filter(
                            orderSeller,
                            (e) => !e.ngaynhan && e?.donhang?.trangthai
                          )?.length
                        }
                        color="green"
                      >
                        <NodeExpandOutlined className="text-green-700 text-xl" />
                      </Badge>
                    </Tooltip>
                    Giao hàng
                  </div>
                }
                key="4"
              >
                <div className="md:container">
                  <Table
                    columns={columnsReceived}
                    dataSource={_.filter(
                      orderSeller,
                      (e) => !e.ngaynhan && e?.donhang?.trangthai
                    )}
                    rowKey={(record) => record.mact}
                    onChange={handleChange}
                    expandable={{
                      expandedRowRender: (record) => (
                        <div className="flex flex-col">
                          <p className="mb-3 block sm:hidden">
                            Mã đơn hàng: <Tag color='yellow'>{record.mact}</Tag>
                          </p>
                          <p className="mb-3 block lg:hidden">
                            Tên sản phẩm: {record?.hdspct?.tensp}
                          </p>
                          <p className="mb-3 block lg:hidden">
                            Họ tên: {record?.donhang?.hoten}
                          </p>
                          <p className="mb-3 block xl:hidden">Số lượng: <Badge text={record?.sl} color='pink' /></p>
                          <p className="mb-3 block xl:hidden">
                            Đơn giá: <Tag color='green'>{record?.dongia?.toLocaleString() + "đ"}</Tag>
                          </p>
                        </div>
                      ),
                      rowExpandable: (record) => {
                        return size?.width >= 1280 ? false : true;
                      },
                    }}
                  />
                </div>
              </TabPane>
            </Tabs>
          </div>
        </TabPane>
        <TabPane
          tab={
            <div className="w-full flex flex-row">
              <Tooltip title="Đổi trả hàng">
                <Badge
                  count={_?.filter(returngoods, (e) => !e.pheduyet)?.length}
                  color="green"
                >
                  <SwapOutlined className="text-green-700 text-xl" />
                </Badge>
              </Tooltip>
            </div>
          }
          key="2"
          // disabled={orderMyStore?.length > 0 ? false: true}
        >
          <Tabs defaultActiveKey="2">
            <TabPane
              tab={
                <div className="w-full flex flex-col">
                  <Tooltip title="Yêu cầu đang chờ">
                    <Badge
                      count={_.filter(returngoods, (e) => !e.pheduyet)?.length}
                      color="green"
                    >
                      <NodeCollapseOutlined className="text-green-700 text-xl" />
                    </Badge>
                  </Tooltip>
                  Yêu cầu đang chờ
                </div>
              }
              key="1"
            >
              <div className="md:container">
                <Table
                  columns={columnsReturnGood}
                  dataSource={_.filter(returngoods, (e) => !e.pheduyet)}
                  rowKey={(record) => record.madt}
                />
              </div>
            </TabPane>
            <TabPane
              tab={
                <div className="w-full flex flex-col">
                  <Tooltip title="Tất cả yêu cầu">
                    <Badge
                      count={_.filter(returngoods, (e) => e.pheduyet)?.length}
                      color="green"
                    >
                      <NodeExpandOutlined className="text-green-700 text-xl" />
                    </Badge>
                  </Tooltip>
                  Tất cả yêu cầu
                </div>
              }
              key="2"
            >
              <div className="md:container">
                <Table
                  columns={columnsReturnGood}
                  dataSource={_.filter(returngoods, (e) => e.pheduyet)}
                  rowKey={(record) => record.madt}
                />
              </div>
            </TabPane>
          </Tabs>
        </TabPane>
      </Tabs>
    </div>
  );
}
