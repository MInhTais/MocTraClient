import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  Image,
  Button,
  Tag,
  Badge,
  Card,
  Popconfirm,
  Input,
  Space,
} from "antd";
import {
  AppleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import * as Type from "../../../Common/Const/Admin/Drawer";
import * as type from "../../../Common/Const/Admin/Edit";
import * as ProductType from "../../../Common/Const/Product/ProductConst";
import _ from "lodash";
import { MANAGER, SELLER } from "../../../Common/Const/Auth/AuthConst";
import Highlighter from "react-highlight-words";
import { FiEdit3, FiTrash } from "react-icons/fi";
import { BUTTON_ADD, BUTTON_EDIT, TITLE_ADMIN_PRODUCT } from "../../../Common/Const/Admin/AdminConst";
import { DELETE_PRODUCT_SELLER_ACTION,  GET_ALL_PRODUCT_SELLER_ACTION } from "../../../Common/Action/Admin/SellerAction";
import EditProduct from '../../Admin/Form/EditProduct';
import { FIND_ALL_ACTION } from "../../../Common/Action/Admin/AdminAction";
import { notify } from "../../../libs/Notify/Notify";
import AddFastProductComponent from "../../Admin/Form/AddFastProductComponent";
import MetaDecorator from "../../../libs/Helmet/MetaDecorator";
import { PRODUCT_PAGE_DESCRIPTION, PRODUCT_PAGE_TITLE } from "../../../Common/Const/Page/PageConst";
export default function ProductSeller(props) {
  const dispatch = useDispatch();
  const {dsSP,nhacungcap} = useSelector((state) => state.SellerReducer);
  const { l, th,dvd } = useSelector((state) => state.AdminReducer);
  const {size} = props;
  const [state, setState] = useState({
    sortedInfo: null,
    filteredInfo: null,
    searchText: "",
    searchedColumn: "",
  });
  let searchInput = useRef(null);
  useEffect(() => {
    dispatch({
      type: GET_ALL_PRODUCT_SELLER_ACTION,
    });
    dispatch({
        type: FIND_ALL_ACTION
    })
  }, []);

  let { sortedInfo,filteredInfo } = state;
  sortedInfo = sortedInfo || {};
  filteredInfo = filteredInfo || {};

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
      dataIndex: "tensp",
      ...getColumnSearchProps("tensp"),
      ellipsis: true,
      sorter: (a, b) => a.tensp.length - b.tensp.length,
      sortOrder: sortedInfo.columnKey === "tensp" && sortedInfo.order,
      responsive: ["sm"],
    },
    {
      title: "Thương hiệu",
      key: "thuonghieu",
      render: (text, record, index) => {
        return (
          <Tag icon={<AppleOutlined />} color="success">
            {record.thuonghieu.tenth}
          </Tag>
        );
      },
      sorter: (a, b) => a.thuonghieu.tenth.length - b.thuonghieu.tenth.length,
      sortOrder: sortedInfo.columnKey === "thuonghieu" && sortedInfo.order,
      responsive: ["xl"],
    },
    {
      title: "Đơn giá",
      key: "dongia",
      ...getColumnSearchProps("dongia"),
      render: (text, record, index) => {
        return (
          <div className="flex flex-row justify-center full">
            <label>{record.dongia.toLocaleString()+'đ'}</label>
          </div>
        );
      },
      sorter: (a, b) => a.dongia - b.dongia,
      sortOrder: sortedInfo.columnKey === "dongia" && sortedInfo.order,
      responsive: ["md"],
    },
    {
      title: "Loại",
      key: "loaisp",
      render: (text, record, index) => {
        return <Tag color="#87d068">{record.loaisp.tenloai}</Tag>;
      },
      sorter: (a, b) => a.loaisp.tenloai.length - b.loaisp.tenloai.length,
      sortOrder: sortedInfo.columnKey === "loaisp" && sortedInfo.order,
      responsive: ["lg"],
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
      responsive: ["md"],
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
          <Badge.Ribbon text={`${record.trongluong}g`} color="green">
          <Card  size="small">
            {record.dvd.tendvd}
          </Card>
        </Badge.Ribbon>
        );
      },
      sorter: (a, b) => a.trongluong - b.trongluong,
      sortOrder: sortedInfo.columnKey === "trongluong" && sortedInfo.order,
      responsive: ["xl"],
    },
    {
      title: "Trạng thái",
      key: "trangthai",
      filters: [
        { text: 'Đang chờ', value: false },
        { text: 'Hoạt động', value: true },
      ],
      filteredValue: filteredInfo.trangthai || null,
      onFilter: (value, record) => {
        return _.includes(record?.trangthai,e=> e===value)
      },
      render: (text, record, index) => {
        return (
          <Badge.Ribbon text={record.trangthai ? 'Hoạt động' : 'Đang chờ'} color={record.trangthai ? 'green' :'purple'}>
          <Card  size="small">
            
          </Card>
        </Badge.Ribbon>
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
            <FiEdit3
              className="edit-icon mr-2"
              onClick={() => {
                dispatch({
                  type: Type.OPEN_FORM,
                  Component: <EditProduct />,
                  title: TITLE_ADMIN_PRODUCT,
                  nameButton: BUTTON_EDIT
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
                    roles: SELLER
                })
              }}
            />
            
              <Popconfirm
                placement="top"
                title={"Bạn có muốn xóa sản phẩm này?"}
                onConfirm={() => {
                  dispatch({
                    type: DELETE_PRODUCT_SELLER_ACTION,
                    product: record,
                  });
                }}
                okText="Đồng ý"
                cancelText="Hủy bỏ"
              >
                <FiTrash className="delete-icon ml-2" />
              </Popconfirm>
            
          </div>
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
  return (
    <div className="md:container w-full">
      <MetaDecorator title={PRODUCT_PAGE_TITLE} description={PRODUCT_PAGE_DESCRIPTION} />
      <div className="flex flex-row mb-4 justify-end">
        {nhacungcap?.pheduyet ?<div className="w-full flex flex-row gap-4 justify-end">
        <button
          className="button-3d-green rounded-md"
          onClick={() => {
            const action = {
              type: Type.OPEN_FORM_CREATE,
              Component: <EditProduct />,
              title: TITLE_ADMIN_PRODUCT,
              nameButton: BUTTON_ADD,
              footer: true
            };
            dispatch(action);
            const actionProduct = {
              type: type.EDIT_PRODUCT,
              productEditModal: {
                loaisp: l?.[0],
                thuonghieu: th.find((e) => e.loai.maloai === l?.[0].maloai),
                dvd: dvd?.[0]
              },
            };
            dispatch(actionProduct);
            dispatch({
                type: type.GET_ROLES,
                roles: SELLER
            })
          }}
        >
          THÊM
        </button>
        <button className="button-3d-gray"
        onClick={()=>{
          dispatch({
            type: Type.OPEN_FORM_CREATE,
            Component: <AddFastProductComponent nhacungcap={nhacungcap} />,
            title: TITLE_ADMIN_PRODUCT,
            nameButton: BUTTON_ADD,
            footer:false
          })
        }}
        >THÊM NHANH</button>
        </div> : <button
          className="button-3d-green rounded-md cursor-not-allowed bg-opacity-40"
          onClick={() => {
            notify('warning', "Cửa hàng của bạn đang đợi xét duyệt. Vui lòng chờ")
          }}
        >
          THÊM
        </button>}
      </div>
      <Table
        columns={columns}
        dataSource={dsSP}
        scroll={{ x: size?.width >= 982 ? 1500 : 0, y: 450 }}
        rowKey={(record) => record.masp}
        expandable={{
          expandedRowRender: (record) => (
            <div className="flex flex-col">
              <p className="mb-3 block duo:hidden">{record.tensp}</p>
              <p className="mb-3 block">
                Thương hiệu: {record.thuonghieu.tenth}
              </p>
              <p className="mb-3 block md:hidden">
                Đơn giá: {record?.dongia?.toLocaleString()}
              </p>
              <p className="mb-3 block lg:hidden">Loại: {record?.loaisp?.tenloai}</p>
              <p className="mb-3 block">Tổng SL: {record.tongsl}</p>
              <p className="mb-3 block md:hidden">Đã bán: {record?.daban}</p>
              <p className="mb-3 block">Còn lại: {record?.conlai}</p>
              <p className="mb-3 block">
                Trọng lượng: {record?.trongluong}{" "}
                {record?.trongluong ? " g" : null}
              </p>
            </div>
          ),
          rowExpandable: (record) => {
            return size?.width >= 1200 ? false : true;
          },
        }}
        onChange={handleChange}
        sticky
      />
    </div>
  );
}
