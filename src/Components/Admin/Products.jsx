import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Action from "../../Common/Action/Admin/AdminAction";
import {
  Image,
  Button,
  Tag,
  Badge,
  Card,
  Popconfirm,
  Input,
  Space,
  Popover,
  AutoComplete,
  Tooltip,
  Table,
} from "antd";
import {
  AppleOutlined,
  BugOutlined,
  PushpinOutlined,
  SearchOutlined,
  StopOutlined,
  SwapOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import EditProduct from "./Form/EditProduct";
import * as Type from "../../Common/Const/Admin/Drawer";
import * as type from "../../Common/Const/Admin/Edit";
import * as ProductType from "../../Common/Const/Product/ProductConst";
import _ from "lodash";
import { MANAGER } from "../../Common/Const/Auth/AuthConst";
import Highlighter from "react-highlight-words";
import { FiEdit3, FiTrash, FiRotateCw } from "react-icons/fi";
import {
  BUTTON_ADD,
  BUTTON_EDIT,
  SET_TABS_KEY,
  TITLE_ADMIN_PRODUCT,
  TITLE_ADMIN_PRODUCT_FORBIDDEN,
} from "../../Common/Const/Admin/AdminConst";
import DetailShopComponent from "./Product/DetailShopComponent";
import { Tabs } from "antd";
import TableProductComponent from "./Product/TableProductComponent";
import EditProductForbidden from "./Form/EditProductForbidden";
import ProductViolationComponent from "./Product/ProductViolationComponent";
import { DELETE_PRODUCT_WARNING_MESSAGE } from "../../Common/Const/Notify/NotifyConst";
import MetaDecorator from "../../libs/Helmet/MetaDecorator";
import {
  PRODUCT_PAGE_DESCRIPTION,
  PRODUCT_PAGE_TITLE,
} from "../../Common/Const/Page/PageConst";

const { TabPane } = Tabs;

export default function Products(props) {
  const dispatch = useDispatch();
  const { sp, l, th, dvd, ncc, tabsKey, bcspvp } = useSelector(
    (state) => state.AdminReducer
  );
  const credentials = JSON.parse(localStorage.getItem("credentials"));
  const [productName, setProviderName] = useState("");
  const [state, setState] = useState({
    sortedInfo: null,
    searchText: "",
    searchedColumn: "",
    selectedRowKeys: [],
    loading: false,
  });
  useEffect(() => {
    dispatch({
      type: Action.FIND_ALL_ACTION,
    });
  }, []);
  const { size } = props;
  let searchInput = useRef(null);
  const searchRef = useRef(null);
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
      title: "Hình ảnh",
      key: "hinhanh",
      render: (text, record, index) => {
        return (
          <Image.PreviewGroup>
            <Image
              width={70}
              height={50}
              src={"http://localhost:8080/images/product/" + record.hinhanh}
            />
          </Image.PreviewGroup>
        );
      },
      fixed: "left",
      width: 90,
    },
    {
      title: "Tên sản phẩm",
      key: "tensp",
      ...getColumnSearchProps("tensp"),
      render: (text, record, index) => {
        return (
          <div className="w-full flex flex-row justify-start">
            <Tooltip title={record.tensp}>
              {record?.tensp?.length > 10
                ? record.tensp?.slice(0, 9) + "..."
                : record?.tensp}
            </Tooltip>
          </div>
        );
      },
      ellipsis: true,
      sorter: (a, b) => a.tensp.length - b.tensp.length,
      sortOrder: sortedInfo.columnKey === "tensp" && sortedInfo.order,
      responsive: ["lg"],
    },
    {
      title: "Cửa hàng",
      key: "cuahang",
      render: (text, record, index) => {
        return (
          <div className="w-full flex flex-row justify-center">
            <p>
              {record?.nhacungcap?.cuahang?.tencuahang
                ? record.nhacungcap?.cuahang?.tencuahang
                : "Không"}
            </p>
          </div>
        );
      },
      sorter: (a, b) =>
        a?.nhacungcap?.cuahang?.tencuahang.length -
        b?.nhacungcap?.cuahang?.tencuahang.length,
      sortOrder: sortedInfo.columnKey === "cuahang" && sortedInfo.order,
      width: "auto",
      responsive: ["lg"],
    },
    {
      title: "Thương hiệu",
      key: "thuonghieu",
      render: (text, record, index) => {
        return (
          <div className="w-full flex flex-row justify-center">
            <Tag icon={<AppleOutlined />} color="success">
              {record.thuonghieu.tenth}
            </Tag>
          </div>
        );
      },
      sorter: (a, b) => a.thuonghieu.tenth.length - b.thuonghieu.tenth.length,
      sortOrder: sortedInfo.columnKey === "thuonghieu" && sortedInfo.order,
      width: "auto",
      responsive: ["xl"],
    },
    {
      title: "Đơn giá",
      key: "dongia",
      ...getColumnSearchProps("dongia"),
      render: (text, record, index) => {
        return (
          <p className="flex flex-row justify-center w-full">
            {record.dongia.toLocaleString()} <span>đ</span>
          </p>
        );
      },
      sorter: (a, b) => a.dongia - b.dongia,
      sortOrder: sortedInfo.columnKey === "dongia" && sortedInfo.order,
      responsive: ["xl"],
    },
    {
      title: "Loại",
      key: "loaisp",
      render: (text, record, index) => {
        return (
          <div className="w-full flex flex-row justify-center">
            <Tag color="#87d068">{record.loaisp.tenloai}</Tag>
          </div>
        );
      },
      sorter: (a, b) => a.loaisp.tenloai.length - b.loaisp.tenloai.length,
      sortOrder: sortedInfo.columnKey === "loaisp" && sortedInfo.order,
      responsive: ["xl"],
      width: "auto",
    },
    {
      title: "Tổng số lượng",
      key: "tongsl",
      ...getColumnSearchProps("tongsl"),
      render: (text, record, index) => {
        return <Badge color={"#87d068"} text={record.tongsl} />;
      },
      sorter: (a, b) => a.tongsl - b.tongsl,
      sortOrder: sortedInfo.columnKey === "tongsl" && sortedInfo.order,
      responsive: ["xl"],
    },
    {
      title: "Đã bán",
      key: "daban",
      ...getColumnSearchProps("daban"),
      render: (text, record, index) => {
        return <Badge color={"purple"} text={record.daban} />;
      },
      sorter: (a, b) => a.daban - b.daban,
      sortOrder: sortedInfo.columnKey === "daban" && sortedInfo.order,
      responsive: ["xl"],
    },
    {
      title: "Còn lại",
      key: "conlai",
      ...getColumnSearchProps("conlai"),
      render: (text, record, index) => {
        return <Badge color={"cyan"} text={record.conlai} />;
      },
      sorter: (a, b) => a.conlai - b.conlai,
      sortOrder: sortedInfo.columnKey === "conlai" && sortedInfo.order,
      responsive: ["xl"],
    },
    {
      title: "Trọng lượng",
      key: "trongluong",
      render: (text, record, index) => {
        return (
          <div className="w-full flex flex-row justify-center">
            <Badge.Ribbon text={`${record.trongluong}g`} color="green">
              <Card size="small" title="  ">
                {record.dvd.tendvd}
              </Card>
            </Badge.Ribbon>
          </div>
        );
      },
      sorter: (a, b) => a.trongluong - b.trongluong,
      sortOrder: sortedInfo.columnKey === "trongluong" && sortedInfo.order,
      responsive: ["xl"],
    },
    {
      title: "Trạng thái",
      key: "trangthai",
      render: (text, record, index) => {
        return (
          <Badge.Ribbon
            text={
              record.trangthai
                ? "Hoạt động"
                : record.spvp
                ? "Khóa"
                : "Đang xem xét"
            }
            color={record.trangthai ? "lime" : "red"}
          >
            <Card size="small" title="   ">
              {record.conlai}
            </Card>
          </Badge.Ribbon>
        );
      },
      responsive: ["lg"],
    },
    {
      title: "Nhà cung cấp",
      key: "nhacungcap",
      render: (text, record, index) => {
        return (
          <div key={index} className="w-full flex flex-row justify-center">
            <Popover
              getPopupContainer={(node) => node.parentElement}
              placement={"top"}
              trigger="click"
              content={
                <DetailShopComponent
                  product={sp}
                  nhacungcap={record?.nhacungcap}
                />
              }
            >
              <Badge color={"volcano"} text={record?.nhacungcap?.mancc} />
            </Popover>
          </div>
        );
      },
      responsive: ["sm"],
    },
    {
      title: "Action",
      key: "action",
      render: (text, record, index) => {
        return (
          <>
            {tabsKey == 1 ? (
              <div className="flex flex-col w-full">
                <div className="w-full flex flex-row justify-center mb-2">
                  <Tooltip title="Chỉnh sửa sản phẩm">
                    <FiEdit3
                      className="edit-icon mr-2 fold:text-xs"
                      onClick={() => {
                        dispatch({
                          type: Type.OPEN_FORM,
                          Component: <EditProduct />,
                          title: TITLE_ADMIN_PRODUCT,
                          nameButton: BUTTON_EDIT,
                          footer: true,
                        });
                        dispatch({
                          type: type.EDIT_PRODUCT,
                          productEditModal: record,
                        });
                        dispatch({
                          type: ProductType.UPLOAD_PICTURE_PRODUCT,
                          preview: record.hinhanh,
                          image: {
                            name: record.hinhanh,
                          },
                        });

                        dispatch({
                          type: type.GET_ROLES,
                          roles: MANAGER,
                        });
                      }}
                    />
                  </Tooltip>
                  {_.find(credentials?.roles, (e) => e === MANAGER) ? (
                    <Popconfirm
                      placement="top"
                      title={DELETE_PRODUCT_WARNING_MESSAGE}
                      onConfirm={() => {
                        dispatch({
                          type: Action.DELETE_PRODUCT_ACTION,
                          product: record,
                        });
                      }}
                      okText="Đồng ý"
                      cancelText="Hủy bỏ"
                    >
                      <Tooltip title="Xóa sản phẩm">
                        <FiTrash className="delete-icon ml-2 mr-2 fold:text-xs" />
                      </Tooltip>
                    </Popconfirm>
                  ) : (
                    ""
                  )}
                </div>
                <div className="w-full flex flex-row justify-center mb-2">
                  {_.find(credentials?.roles, (e) => e === MANAGER) ? (
                    record?.trangthai ? (
                      <Popconfirm
                        placement="top"
                        title={
                          "Bạn có muốn đổi trạng thái sản phẩm, điều này sẽ ảnh hưởng đến hiệu suất bán hàng, bạn vẫn muốn tiếp tục?"
                        }
                        onConfirm={() => {
                          record.trangthai = !record.trangthai;
                          dispatch({
                            type: Action.UPDATE_PRODUCT_ACTION,
                            product: record,
                          });
                        }}
                        okText="Đồng ý"
                        cancelText="Hủy bỏ"
                      >
                        <Tooltip title="Tạm khóa sản phẩm">
                          <WarningOutlined className="edit-icon mr-2 fold:text-xs" />
                        </Tooltip>
                      </Popconfirm>
                    ) : null
                  ) : (
                    ""
                  )}
                  {_.find(credentials?.roles, (e) => e === MANAGER) &&
                  !record?.spvp ? (
                    <Tooltip title="Thêm vào sản phẩm vi phạm">
                      <StopOutlined
                        className="delete-icon ml-2 mr-2 fold:text-xs"
                        onClick={() => {
                          dispatch({
                            type: Type.OPEN_FORM_CREATE,
                            Component: (
                              <EditProductForbidden product={record} />
                            ),
                            title: TITLE_ADMIN_PRODUCT_FORBIDDEN,
                            nameButton: BUTTON_ADD,
                            footer: true,
                          });
                        }}
                      />
                    </Tooltip>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            ) : tabsKey == 2 ? (
              <div className="w-full flex flex-row gap-2">
              
                  {_.find(credentials?.roles, (e) => e === MANAGER) ? (
                    <Popconfirm
                      placement="top"
                      title={"Bạn có muốn xóa sản phẩm này?"}
                      onConfirm={() => {
                        dispatch({
                          type: Action.DELETE_PRODUCT_ACTION,
                          product: record,
                        });
                      }}
                      okText="Đồng ý"
                      cancelText="Hủy bỏ"
                    >
                      <Tooltip title="Xóa sản phẩm">
                        <FiTrash className="delete-icon fold:text-xs md:text-xl" />
                      </Tooltip>
                    </Popconfirm>
                  ) : (
                    ""
                  )}
                
              
                  {_.find(credentials?.roles, (e) => e === MANAGER) &&
                  !record.spvp ? (
                    <Popconfirm
                      placement="top"
                      title={
                        "Bạn có muốn đổi trạng thái sản phẩm, điều này sẽ ảnh hưởng đến hiệu suất bán hàng, bạn vẫn muốn tiếp tục?"
                      }
                      onConfirm={() => {
                        record.trangthai = !record.trangthai;
                        dispatch({
                          type: Action.UPDATE_PRODUCT_ACTION,
                          product: record,
                        });
                      }}
                      okText="Đồng ý"
                      cancelText="Hủy bỏ"
                    >
                      <Tooltip title="Phê duyệt sản phẩm">
                        <SwapOutlined className="stick-icon bottom-2 fold:text-xs md:text-xl" />
                      </Tooltip>
                    </Popconfirm>
                  ) : (
                    ""
                  )}
                
              </div>
            ) : tabsKey == 3 ? (
              <div className="flex flex-row w-full justify-center">
                <Popconfirm
                  placement="left"
                  title={"Bạn có muốn xóa vi phạm cho sản phẩm này?"}
                  onConfirm={() => {
                    dispatch({
                      type: Action.DELETE_PRODUCT_FORBIDDEN_ACTION,
                      product: record,
                    });
                  }}
                  okText="Đồng ý"
                  cancelText="Hủy bỏ"
                >
                  <Tooltip title="Xóa khỏi danh sách vi phạm">
                    <FiRotateCw className="edit-icon mr-2 text-lg" />
                  </Tooltip>
                </Popconfirm>
              </div>
            ) : null}
          </>
        );
      },
      fixed: "right",
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
    <>
      <MetaDecorator
        title={PRODUCT_PAGE_TITLE}
        description={PRODUCT_PAGE_DESCRIPTION}
      />
      <Tabs
        defaultActiveKey="1"
        onTabClick={(e) => {
          dispatch({
            type: SET_TABS_KEY,
            tabsKey: e,
          });
        }}
      >
        <TabPane
          tab={
            <span>
              <AppleOutlined />
              TẤT CẢ SẢN PHẨM
            </span>
          }
          key="1"
        >
          <div className="md:container w-full">
            <div className="flex flex-row mb-4 justify-end">
              <div className="w-1/2 flex flex-col">
                <label className="text-left font-sans text-indigo-400">
                  Tìm nhà cung cấp:{" "}
                </label>
                <AutoComplete
                  className="w-full"
                  value={productName}
                  onChange={(value) => {
                    setProviderName(value);
                  }}
                  onSelect={(value, option) => {
                    setProviderName(option.label);
                    dispatch({
                      type: Action.GET_ALL_PRODUCT_SELLER_BY_PROVIDERNAME_ACTION,
                      tenncc: option.label,
                    });
                  }}
                  options={_?.map(ncc, (nhacungcap) => {
                    return {
                      label: nhacungcap.tenncc,
                      value: nhacungcap.mancc,
                    };
                  })}
                  onSearch={(value) => {
                    if (searchRef !== null) {
                      clearTimeout(searchRef.current);
                    }
                    searchRef.current = setTimeout(() => {
                      dispatch({
                        type: Action.GET_ALL_PRODUCT_SELLER_BY_PROVIDERNAME_ACTION,
                        tenncc: value,
                      });
                    }, 300);
                  }}
                >
                  <input className="input-responsive" />
                </AutoComplete>
              </div>
              <div className="w-1/2 flex justify-end h-1/2">
                <button
                  className="button-3d-green rounded-md"
                  onClick={() => {
                    const action = {
                      type: Type.OPEN_FORM_CREATE,
                      Component: <EditProduct />,
                      title: TITLE_ADMIN_PRODUCT,
                      nameButton: BUTTON_ADD,
                      footer: true,
                    };
                    dispatch(action);
                    const actionProduct = {
                      type: type.EDIT_PRODUCT,
                      productEditModal: {
                        loaisp: l?.[0],
                        thuonghieu: th.find(
                          (e) => e.loai.maloai === l?.[0].maloai
                        ),
                        dvd: dvd?.[0],
                        nhacungcap: _?.first(_.filter(ncc, (e) => !e?.cuahang)),
                      },
                    };
                    dispatch(actionProduct);
                    dispatch({
                      type: type.GET_ROLES,
                      roles: MANAGER,
                    });
                  }}
                >
                  THÊM
                </button>
              </div>
            </div>
            <TableProductComponent
              columns={columns}
              handleChange={handleChange}
              sp={sp}
              size={size}
            />
          </div>
        </TabPane>
        {_?.find(credentials?.roles, (e) => e === MANAGER) ? (
          <>
            {" "}
            <TabPane
              tab={
                <span>
                  <PushpinOutlined />
                  SẢN PHẨM XÉT DUYỆT
                </span>
              }
              disabled={
                _?.filter(sp, (e) => e.trangthai === false && !e.spvp)?.length >
                0
                  ? false
                  : true
              }
              key="2"
            >
              <div className="md:container w-full">
                <div className="flex fold:flex-col fold:gap-y-4 md:flex-row mb-4 justify-end">
                  <div className="fold:w-full md:w-1/2 flex flex-col">
                    <button
                      className="button-3d-green w-32"
                      onClick={() => {
                        let listProduct = [];
                        _.map(selectedRowKeys, (e) => {
                          listProduct.push(_.find(sp, (pd) => pd.masp === e));
                        });

                        dispatch({
                          type: Action.UPDATE_STATUS_TRUE_LIST_PRODUCT_ACTION,
                          listProduct,
                        });
                      }}
                      disabled={selectedRowKeys?.length > 0 ? false : true}
                    >
                      Xử lý nhanh
                    </button>
                  </div>
                  <div className="fold:w-full md:w-1/2 flex flex-col">
                    <label className="text-left font-sans text-indigo-400">
                      Tìm nhà cung cấp:{" "}
                    </label>
                    <AutoComplete
                      className="w-full"
                      value={productName}
                      onChange={(value) => {
                        setProviderName(value);
                      }}
                      onSelect={(value, option) => {
                        setProviderName(option.label);
                        dispatch({
                          type: Action.GET_ALL_PRODUCT_SELLER_BY_PROVIDERNAME_ACTION,
                          tenncc: option.label,
                        });
                      }}
                      options={_?.map(ncc, (nhacungcap) => {
                        return {
                          label: nhacungcap.tenncc,
                          value: nhacungcap.mancc,
                        };
                      })}
                      onSearch={(value) => {
                        if (searchRef !== null) {
                          clearTimeout(searchRef.current);
                        }
                        searchRef.current = setTimeout(() => {
                          dispatch({
                            type: Action.GET_ALL_PRODUCT_SELLER_BY_PROVIDERNAME_ACTION,
                            tenncc: value,
                          });
                        }, 300);
                      }}
                    >
                      <input className="input-responsive" />
                    </AutoComplete>
                  </div>
                </div>
                <Table
                  columns={columns}
                  rowSelection={rowSelection}
                  handleChange={handleChange}
                  dataSource={_?.filter(sp, (e) => e.trangthai === false)}
                  scroll={{ x: size?.width >= 1280 ? 1500 : 0, y: 450 }}
                  rowKey={(record) => record.masp}
                  expandable={{
                    expandedRowRender: (record) => (
                      <div className="flex flex-col">
                        <p className="mb-3 block">{record.tensp}</p>
                        <p className="mb-3 block">
                          Thương hiệu: {record.thuonghieu.tenth}
                        </p>
                        <p className="mb-3 block md:hidden">
                          Đơn giá: {record?.dongia?.toLocaleString()}
                        </p>
                        <p className="mb-3 block">
                          Loại: {record?.loaisp?.tenloai}
                        </p>
                        <p className="mb-3 block">Tổng SL: {record.tongsl}</p>
                        <p className="mb-3 block md:hidden">
                          Đã bán: {record?.daban}
                        </p>
                        <p className="mb-3 block">Còn lại: {record?.conlai}</p>
                        <p className="mb-3 block">
                          Trọng lượng: {record?.trongluong}{" "}
                          {record?.trongluong ? " g" : null}
                        </p>
                      </div>
                    ),
                    rowExpandable: (record) => {
                      return window.innerWidth >= 1280 ? false : true;
                    },
                  }}
                  onChange={handleChange}
                  sticky
                />
              </div>
            </TabPane>
            <TabPane
              tab={
                <span>
                  <StopOutlined className="text-red-600" />
                  SẢN PHẨM VI PHẠM
                </span>
              }
              key="3"
              disabled={_?.filter(sp, (e) => e.spvp)?.length > 0 ? false : true}
            >
              <div className="md:container w-full mt-8">
                <TableProductComponent
                  columns={columns}
                  handleChange={handleChange}
                  sp={_?.filter(sp, (e) => e.spvp)}
                />
              </div>
            </TabPane>
            <TabPane
              tab={
                <span>
                  <BugOutlined className="text-red-600" />
                  SẢN PHẨM BỊ BÁO CÁO
                </span>
              }
              key="4"
              disabled={bcspvp?.length > 0 ? false : true}
            >
              <div className="container w-full mt-8">
                <ProductViolationComponent
                  size={size}
                  sortedInfo={sortedInfo}
                  handleChange={handleChange}
                />
              </div>
            </TabPane>
          </>
        ) : null}
      </Tabs>
    </>
  );
}
