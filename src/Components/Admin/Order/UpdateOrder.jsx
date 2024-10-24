import {
  Tabs,
  Tooltip,
  Table,
  Popconfirm,
  Tag,
  Avatar,
  Popover,
  Image,
  Badge,
  Button,
  Input,
  Space,
} from "antd";
import _ from "lodash";
import React, { useEffect, useRef, useState } from "react";
import Carousel from "react-multi-carousel";
import { useDispatch, useSelector } from "react-redux";
import {
  ACCEPT_LIST_ORDER_ACTION,
  DELETE_ORDER_DETAIL_ADMIN_ACTION,
  DELETE_RETURN_GOOD_ACTION,
  FIND_ALL_ORDER_FALSE_ACTION,
  UPDATE_ORDER_ACTION,
  UPDATE_ORDER_MY_STORE_ACTION,
  UPDATE_ORDER_RECEIVED_DATE_TIME_ACTION,
  UPDATE_RETURN_GOOD_ACTION,
} from "../../../Common/Action/Order/OrderAction";
import { OPEN_FORM_MODAL } from "../../../Common/Const/Modal/ModalConst";
import { notify } from "../../../libs/Notify/Notify";
import { responsive } from "../../Home/ResponsiveCarousel";
import OrderdetailComponent from "../../isAuthentication/Modal/OrderdetailComponent";
import {
  SwapOutlined,
  NodeExpandOutlined,
  NodeCollapseOutlined,
  CheckOutlined,
  AuditOutlined,
  CloseOutlined,
  SnippetsOutlined,
  SearchOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { DELETE_ORDER_DETAIL_WARNING } from "../../../Common/Const/Notify/NotifyConst";
import moment from "moment";
import Highlighter from "react-highlight-words";
import { MANAGER } from "../../../Common/Const/Auth/AuthConst";
import FastViewProduct from "./FastViewProduct";
import MetaDecorator from "../../../libs/Helmet/MetaDecorator";
import { ORDER_PAGE_DESCRIPTION, ORDER_PAGE_TITLE } from "../../../Common/Const/Page/PageConst";

const { TabPane } = Tabs;
export default function UpdateOrder() {
  const { order, returngoods, detail } = useSelector(
    (state) => state.OrderReducer
  );
    console.log("DATAAAAAA",returngoods)
  const dispatch = useDispatch();
  const { credentials } = useSelector((state) => state.AuthReducer);
  useEffect(() => {
    dispatch({
      type: FIND_ALL_ORDER_FALSE_ACTION,
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
  sortedInfo = sortedInfo || {};
  const columns = [
    {
      title: "Họ tên",
      key: "hoten",
      ...getColumnSearchProps("hoten"),
      render: (text, record, index) => {
        return <p>{record?.donhang?.hoten}</p>;
      },
      sorter: (a, b) =>
        a?.donhang?.hoten?.length - b?.donhang?.hoten?.length,
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
      sorter: (a, b) => a?.sl - b?.sl,
      sortOrder: sortedInfo.columnKey === "sl" && sortedInfo.order,
      responsive: ["lg"],
    },
    {
      title: "Đơn giá",
      key: "dongia",
      ...getColumnSearchProps("dongia"),
      dataIndex: "dongia",
      sorter: (a, b) => a?.dongia - b?.dongia,
      sortOrder: sortedInfo.columnKey === "dongia" && sortedInfo.order,
      responsive: ["lg"],
    },
    {
      title: "Action",
      key: "action",
      render: (text, record, index) => {
        return (
          <div className="w-full flex flex-row justify-center gap-4">
            {!record?.pheduyet ? (
              <>
                <Tooltip title="Phê duyệt đơn hàng">
                <EditOutlined
                    className="edit-icon text-green-700 fold:text-xs md:text-xl"
                    onClick={() => {
                      record.pheduyet = !record.pheduyet;
                      dispatch({
                        type: UPDATE_ORDER_MY_STORE_ACTION,
                        detail: record,
                        roles: MANAGER,
                      });
                    }}
                  />
                </Tooltip>
                <Popconfirm
                  placement={"topLeft"}
                  okText="Đồng ý"
                  cancelText="Hủy bỏ"
                  title={DELETE_ORDER_DETAIL_WARNING}
                  onConfirm={() => {
                    dispatch({
                      type: DELETE_ORDER_DETAIL_ADMIN_ACTION,
                      detail: record,
                    });
                  }}
                >
                  <Tooltip title="Hủy đơn">
                    <DeleteOutlined className="delete-icon text-red-600 fold:text-xs md:text-xl" />
                  </Tooltip>
                </Popconfirm>
              </>
            ) : (
              <Tag color="green">Đã xử lý</Tag>
            )}
          </div>
        );
      },
    },
  ];

  const columnsReceived = [
    {
      title: "Họ tên",
      key: "hoten",
      render: (text, record, index) => {
        return <p>{record?.donhang?.hoten}</p>;
      },
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
    },
    {
      title: "Tên sản phẩm",
      key: "tensp",
      render: (text, record, index) => {
        return <p>{record?.hdspct?.tensp}</p>;
      },
    },
    {
      title: "Số lượng",
      key: "sl",
      dataIndex: "sl",
    },
    {
      title: "Đơn giá",
      key: "dongia",
      dataIndex: "dongia",
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
                    roles: MANAGER,
                  });
                }}
              />
            </Tooltip>
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
      sortOrder: sortedInfo.columnKey === "noidung" && sortedInfo.order
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
                {moment().unix() - moment(record?.ctdh?.ngaynhan).unix() <
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
                          roles: MANAGER
                        });
                      }}
                    >
                      <CheckOutlined className="edit-icon text-green-600" />
                    </Popconfirm>
                  </Tooltip>
                ) : null}

                <Popconfirm
                  title="Bạn có muốn xóa yêu cầu hoàn trả này?"
                  okText="Đồng ý"
                  cancelText="Hủy bỏ"
                  onConfirm={() => {
                    dispatch({
                      type: DELETE_RETURN_GOOD_ACTION,
                      dth: record,
                      roles: MANAGER,
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
      <MetaDecorator title={ORDER_PAGE_TITLE} description={ORDER_PAGE_DESCRIPTION} />
      <Tabs defaultActiveKey="1"
      onTabClick={(e)=>{
        if(Number(e)===1){
          dispatch({
            type: FIND_ALL_ORDER_FALSE_ACTION,
          });
        }
      }}
      >
        <TabPane
          tab={
            <span>
              <Tooltip title="Đơn hàng">
                <Badge
                  count={_?.filter(order, (e) => !e.trangthai)?.length}
                  color="green"
                >
                  <SnippetsOutlined className="text-green-700 text-xl" />
                </Badge>
              </Tooltip>
            </span>
          }
          disabled={order?.length > 0 ? false : true}
          key="1"
          
        >
          <Carousel responsive={responsive}>
            {_?.map(
              _?.filter(order, (e) => !e.trangthai),
              (item, i) => {
                return (
                  <div className="flip-card" key={i}>
                    <div className="inner shadow-xl">
                      <div className="front rounded-lg transform transition duration-500 hover:scale-110">
                        <div className="p-6 w-full">
                          <div className="bg-gradient-to-r from-green-100 to-green-200 bg-opacity-50 shadow-md px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
                            <h2 className="tracking-widest text-xs title-font font-medium text-gray-400">
                              ĐƠN HÀNG
                            </h2>
                            <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900">
                              {item.madh}
                            </h1>

                            <div className="flex flex-col justify-center">
                              <p className="text-left leading-relaxed mb-2">
                                <small className="font-bold">Tổng tiền:</small>{" "}
                                {item.tongtien?.toLocaleString()}
                              </p>
                              <p className="text-left leading-relaxed mb-2">
                                <small className="font-bold">Phí ship:</small>{" "}
                                {item.phiship?.toLocaleString()}
                              </p>
                              <p className="text-left leading-relaxed mb-2">
                                <small className="font-bold">Tổng cộng:</small>{" "}
                                {item.tongcong?.toLocaleString()}
                              </p>
                              <p className="text-left leading-relaxed mb-2">
                                <small className="font-bold">Xu:</small>{" "}
                                {item.diem}
                              </p>
                              <p className="text-left leading-relaxed mb-2">
                                <small className="font-bold">Thanh toán:</small>{" "}
                                {item?.thanhtoan?.tentt}
                              </p>
                              <p className="text-left leading-relaxed mb-2">
                                <small className="font-bold">Ngày lập:</small>{" "}
                                {moment(item.ngaylap).format(
                                  "DD/MM/YYYY HH:mm:ss"
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="back">
                        <div className="p-4 w-full flex">
                          <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-green-100 text-green-500 mb-4 flex-shrink-0">
                            <img
                              className="w-10 h-10"
                              src={
                                credentials?.hinhanh
                                  ? "http://localhost:8080/images/user/" +
                                    credentials?.hinhanh
                                  : "https://joeschmoe.io/api/v1/random"
                              }
                            />
                          </div>
                          <div className="flex-grow pl-6 text-left">
                            <h3 className="text-gray-900 text-lg title-font font-medium">
                              {item.hoten}
                            </h3>
                            <div className="flex flex-col">
                              <p className="leading-relaxed text-xs">
                                <small className="font-bold">SĐT:</small>{" "}
                                {item.sdt}
                              </p>
                              <p className="leading-relaxed text-xs">
                                <small className="font-bold">Đia chỉ:</small>{" "}
                                {item.diachi}
                              </p>
                              <p className="leading-relaxed text-xs">
                                <small className="font-bold">Vận chuyển:</small>{" "}
                                {item.phuongthucvc}
                              </p>
                              <p className="leading-relaxed text-xs">
                                <small className="font-bold">
                                  Người dùng:{" "}
                                </small>
                                <Tooltip title={item.tkmh?.tendn}>
                                  {item?.tkmh?.tendn?.length > 15
                                    ? item?.tkmh?.tendn.slice(0, 14) + "..."
                                    : item?.tkmh?.tendn}
                                </Tooltip>
                              </p>
                              <p className="leading-relaxed text-xs">
                                <small className="font-bold">Trạng thái:</small>{" "}
                                {item.trangthai ? "Đã duyệt" : "Đang chờ"}
                              </p>
                            </div>
                            <div className="flex flex-row gap-4">
                              {item.pheduyet ? null : (
                                <Tooltip title="Duyệt đơn hàng">
                                  <a
                                    className="mt-3 text-green-700 inline-flex items-center animate-bounce"
                                    onClick={() => {
                                      if (
                                        _?.find(
                                          item?.chitietdh,
                                          (e) => !e.pheduyet
                                        )
                                      ) {
                                        notify(
                                          "warning",
                                          "Vẫn còn một số sản phẩm đối tác vẫn chưa phê duyệt, vui lòng chờ hoặc liên hệ đối tác"
                                        );
                                      } else {
                                        dispatch({
                                          type: UPDATE_ORDER_ACTION,
                                          order: item,
                                        });
                                      }
                                    }}
                                  >
                                    DUYỆT ĐƠN
                                  </a>
                                </Tooltip>
                              )}
                              <Tooltip title="Xem chi tiết">
                                <a
                                  className="mt-3 text-green-500 inline-flex items-center"
                                  onClick={() => {
                                    dispatch({
                                      type: OPEN_FORM_MODAL,
                                      Component: (
                                        <OrderdetailComponent
                                          detail={item.chitietdh}
                                        />
                                      ),
                                      title: "CHI TIẾT ĐƠN HÀNG",
                                      width: 1000,
                                    });
                                  }}
                                >
                                  CHI TIẾT
                                  <svg
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    className="w-4 h-4 ml-2 hover:animate-spin"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                  </svg>
                                </a>
                              </Tooltip>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </Carousel>
        </TabPane>
        <TabPane
          tab={
            <span>
              <Tooltip title="Chi tiết">
                <Badge
                  count={_.filter(detail, (e) => !e.pheduyet)?.length}
                  color="green"
                >
                  <AuditOutlined className="text-green-700 text-xl" />
                </Badge>
              </Tooltip>
            </span>
          }
          key="2"
          disabled={
            _.filter(detail, (e) => !e.pheduyet)?.length > 0 || _.filter(detail, (e) => !e.ngaynhan && e.donhang.trangthai)?.length >0 ? false : true
          }
        >
          <div className="md:container">
            <Tabs defaultActiveKey="2">
              <TabPane
                tab={
                  <div className="w-full flex flex-col">
                    <Tooltip title="Chuẩn bị hàng">
                      <Badge
                        count={_.filter(detail, (e) => !e.pheduyet)?.length}
                        color="green"
                      >
                        <NodeCollapseOutlined className="text-green-700 text-xl" />
                      </Badge>
                    </Tooltip>
                    Chuẩn bị hàng
                  </div>
                }
                key="1"
              >
                <div className="md:container">
                  <div className="w-full flex justify-start mb-4 gap-4">
                  <button
                      className="button-3d-green"
                      onClick={()=>{
                        let orderDetail = [];
                        _.map(selectedRowKeys,e=>{
                          orderDetail.push(_.find(detail,d=>d.mact === e))
                        })

                        dispatch({
                          type: ACCEPT_LIST_ORDER_ACTION,
                          detail: orderDetail,
                          roles: MANAGER
                        })
                      }}
                      disabled={selectedRowKeys?.length > 0 && _?.filter(detail, (e) => !e.pheduyet)?.length > 0 ? false : true}
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
                    columns={columns}
                    rowSelection={rowSelection}
                    dataSource={_?.filter(detail, (e) => !e.pheduyet)}
                    rowKey={(record) => record.mact}
                    onChange={handleChange}
                  />
                </div>
              </TabPane>
              <TabPane
                tab={
                  <div className="w-full flex flex-col">
                    <Tooltip title=" Giao hàng">
                      <Badge
                        count={_.filter(detail, (e) => !e.ngaynhan && e.donhang.trangthai)?.length}
                        color="green"
                      >
                        <NodeExpandOutlined className="text-green-700 text-xl" />
                      </Badge>
                    </Tooltip>
                    Giao hàng
                  </div>
                }
                key="2"
              >
                <div className="md:container">
                  <Table
                    columns={columnsReceived}
                    dataSource={_.filter(detail, (e) => !e.ngaynhan && e.donhang.trangthai)}
                    rowKey={(record) => record.madt}
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
                  count={_.filter(returngoods, (e) => !e.pheduyet)?.length}
                  color="green"
                >
                  <SwapOutlined className="text-green-700 text-xl" />
                </Badge>
              </Tooltip>
            </div>
          }
          key="3"
          // disabled={orderMyStore?.length > 0 ? false: true}
        >
          <Tabs defaultActiveKey="2">
            <TabPane
              tab={
                <div className="w-full flex flex-col">
                  <Tooltip title="Chuẩn bị hàng">
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
                  onChange={handleChange}

                />
              </div>
            </TabPane>
            <TabPane
              tab={
                <div className="w-full flex flex-col">
                  <Tooltip title=" Giao hàng">
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
