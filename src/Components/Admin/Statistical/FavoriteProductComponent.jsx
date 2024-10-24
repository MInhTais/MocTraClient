import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  FIND_ALL_PRODUCT_BEST_VIEWS_ADMIN_ACTION
} from "../../../Common/Action/Admin/AdminAction";
import moment from "moment";
import { Button, Table, Image, Input, Space, Tag, Popover, Badge } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";

import ViewFastProductComponent from "../Product/ViewFastProductComponent";
import _ from "lodash";
import { FIND_ALL_PRODUCT_BEST_VIEWS_SELLER_ACTION } from "../../../Common/Action/Admin/SellerAction";
import ExportCSV from "../../../libs/Excel/ExportCSV";
import { NAME_EXCEL_FAVORITE_PRODUCT_STATISTICAL } from "../../../libs/Excel/Data";
export default function FavoriteProductComponent(props) {
  const { admin, seller, size } = props;
  let searchInput = useRef(null);
  const searchRef = useRef(null);
  const { spqtmt } = useSelector((state) => state.AdminReducer);
  const {spqtSeller} = useSelector((state)=>state.StatisticalSellerReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    if (admin) {
      dispatch({
        type: FIND_ALL_PRODUCT_BEST_VIEWS_ADMIN_ACTION,
        month: moment().month() + 1,
      });
    } else if (seller) {
      dispatch({
        type: FIND_ALL_PRODUCT_BEST_VIEWS_SELLER_ACTION,
        month: moment().month() + 1,
      });
    }
  }, []);

  const [state, setState] = useState({
    sortedInfo: null,
    searchText: "",
    searchedColumn: "",
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
      sortedInfo: sorter,
      filtered: filters,
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

  const columns = [
    {
      title: "Hình ảnh",
      key: "hinhanh",
      render: (text, record, index) => {
        return (
          <div className="w-full flex flex-row justify-center">
            <Image.PreviewGroup>
              <Image
                width={70}
                height={50}
                src={"http://localhost:8080/images/product/" + record.hinhanh}
              />
            </Image.PreviewGroup>
          </div>
        );
      },
    },
    {
      title: "Mã sản phẩm",
      key: "masp",
      ...getColumnSearchProps('masp'),
      render: (text, record, index) => {
        return (
          <div className="w-full flex flex-row justify-center">
            <Popover
            content={
                <ViewFastProductComponent />
            }
            >
            <Tag color={"green"}>{record?.masp}</Tag>
            </Popover>
          </div>
        );
      },
      sorter: (a, b) => a?.masp?.localeCompare(b?.masp),
      sortOrder: sortedInfo.columnKey === "masp" && sortedInfo.order,
      responsive: ["sm"],
    },
    {
      title: "Tên sản phẩm",
      key: "tensp",
      ...getColumnSearchProps('tensp'),
      render: (text, record, index) => {
        return (
          <div className="w-full flex flex-row justify-center">
            <p>{record.tensp}</p>
          </div>
        );
      },
      sorter: (a, b) => a.tensp.length - b.tensp.length,
      sortOrder: sortedInfo.columnKey === "tensp" && sortedInfo.order,
      responsive: ["md"],
    },
    {
      title: "Lượt xem",
      key: "luotxem",
      ...getColumnSearchProps('luotxem'),
      dataIndex: "luotxem",
      sorter: (a, b) => a.luotxem - b.luotxem,
      sortOrder: sortedInfo.columnKey === "luotxem" && sortedInfo.order,
      responsive: ["xl"],
    },
    {
      title: "Lượt mua",
      key: "luotmua",
      ...getColumnSearchProps('luotmua'),
      dataIndex: "luotmua",
      responsive: ["xl"],
      sorter: (a, b) => a.luotmua - b.luotmua,
      sortOrder: sortedInfo.columnKey === "luotmua" && sortedInfo.order,
    },
    {
      title: "Lượt yêu thích",
      key: "luotyt",
      ...getColumnSearchProps('luotyt'),
      dataIndex: "luotyt",
      sorter: (a, b) => a.luotyt - b.luotyt,
      sortOrder: sortedInfo.columnKey === "luotyt" && sortedInfo.order,
      responsive: ["xl"],
    },
    {
      title: "Lượt đánh giá",
      key: "luotdanhgia",
      ...getColumnSearchProps('luotdanhgia'),
      dataIndex: "luotdanhgia",
      sorter: (a, b) => a.luotdanhgia - b.luotdanhgia,
      sortOrder: sortedInfo.columnKey === "luotdanhgia" && sortedInfo.order,
      responsive: ["xl"],
    },
  ];
  const month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  return (
    <div className="w-full md:container flex flex-col">
      <div className="mb-5">
        <select
          className="select-responsive w-32"
          onChange={(e) => {
            if (admin) {
              dispatch({
                type: FIND_ALL_PRODUCT_BEST_VIEWS_ADMIN_ACTION,
                month: e.target.value,
              });
            } else if (seller) {
              dispatch({
                type: FIND_ALL_PRODUCT_BEST_VIEWS_SELLER_ACTION,
                month: e.target.value,
              });
            }
          }}
        >
          {_?.map(month, (e, i) => {
            return <option value={e} key={i}>{`Tháng ${e}`}</option>;
          })}
        </select>
      </div>
      <div>
      <div className="p-5"><ExportCSV fileName={NAME_EXCEL_FAVORITE_PRODUCT_STATISTICAL} csvData={admin ? spqtmt : spqtSeller} /></div>
        <Table
          columns={columns}
          dataSource={admin ? spqtmt : spqtSeller}
          rowKey={(record) => record.masp}
          onChange={handleChange}
          expandable={{
            expandedRowRender: (record) => (
              <div className="flex flex-col">
                <p className="mb-3 block duo:hidden">
                  Mã sản phẩm: <Tag color='green'>{record.masp}</Tag>
                </p>
                <p className="mb-3 block md:hidden">
                  Tên sản phẩm: {record.tensp}
                </p>
                <p className="mb-3 block">Lượt xem: <Badge text={record.luotxem} color='orange' /></p>
                <p className="mb-3 block">Lượt mua: <Badge text={record.luotmua} color='green' /></p>
                <p className="mb-3 block">
                  Lượt đánh giá: <Badge text={record.luotdanhgia} color='geekblue' />
                </p>
                <p className="mb-3 block">Lượt yêu thích: <Badge text={record.luotyt} color='red' /></p>
              </div>
            ),
            rowExpandable: (record) => {
              return size?.width >= 1280 ? false : true;
            },
          }}
        />
      </div>
    </div>
  );
}
