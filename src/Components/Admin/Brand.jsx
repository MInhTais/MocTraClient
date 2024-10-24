import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as Action from "../../Common/Action/Admin/AdminAction";
import {
  AutoComplete,
  Badge,
  Button,
  Card,
  Input,
  Popconfirm,
  Space,
  Table,
  Tooltip,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import EditBrand from "./Form/EditBrand";
import * as Type from "../../Common/Const/Admin/Drawer";
import * as type from "../../Common/Const/Admin/Edit";
import _ from "lodash";
import { MANAGER } from "../../Common/Const/Auth/AuthConst";
import Highlighter from "react-highlight-words";
import { FiEdit3, FiTrash } from "react-icons/fi";
import {
  BUTTON_ADD,
  BUTTON_EDIT,
  TITLE_ADMIN_BRAND,
} from "../../Common/Const/Admin/AdminConst";
import { DELETE_BRAND_WARNING_MESSAGE } from "../../Common/Const/Notify/NotifyConst";
import MetaDecorator from "../../libs/Helmet/MetaDecorator";
import {
  BRAND_PAGE_DESCRIPTION,
  BRAND_PAGE_TITLE,
} from "../../Common/Const/Page/PageConst";

export default function Brand(props) {
  const { size } = props;
  const { th, l } = useSelector((state) => state.AdminReducer);
  const { credentials } = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();
  const searchRef = useRef(null);
  const [state, setState] = useState({
    sortedInfo: null,
    searchText: "",
    searchedColumn: "",
  });
  let searchInput = useRef(null);
  const [catname, setCatname] = useState(l[0]?.tenloai);
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
      title: "Mã thương hiệu",
      key: "math",
      dataIndex: "math",
      width: 50,
      sorter: (a, b) => a.math - b.math,
      sortOrder: sorted.columnKey === "math" && sorted.order,
      responsive: ["sm"],
      ...getColumnSearchProps("math"),
    },
    {
      title: "Tên thương hiệu",
      key: "tenth",
      dataIndex: "tenth",
      width: 120,
      sorter: (a, b) => a.tenth.length - b.tenth.length,
      sortOrder: sorted.columnKey === "tenth" && sorted.order,
      ...getColumnSearchProps("tenth"),
    },
    {
      title: "Loại",
      key: "loai",
      render: (text, record, index) => {
        return (
          <div className="w-full flex justify-center">
            <Badge.Ribbon text={record.loai.tenloai} color="green">
              <Card title="Loại" size="small">
                <Tooltip title={record.loai.mota}>
                  {record.loai.mota?.length > 60
                    ? record.loai.mota?.slice(0, 59) + "..."
                    : record.loai.mota}
                </Tooltip>
              </Card>
            </Badge.Ribbon>
          </div>
        );
      },
      sorter: (a, b) => a.loai.tenloai.length - b.loai.tenloai.length,
      sortOrder: sorted.columnKey === "loai" && sorted.order,
      width: 250,
      responsive: ["lg"],
    },
    {
      title: "Action",
      key: "x",
      render: (text, record, index) => {
        return (
          <div className="flex flex-row">
            <Tooltip title="Cập nhật thương hiệu">
              <FiEdit3
                className="edit-icon mr-2"
                onClick={() => {
                  const action = {
                    type: Type.OPEN_FORM,
                    Component: <EditBrand />,
                    title: TITLE_ADMIN_BRAND,
                    nameButton: BUTTON_EDIT,
                    footer: true,
                  };
                  dispatch(action);
                  const actionEditBrand = {
                    type: type.EDIT_BRAND,
                    brandEditModal: record,
                  };
                  dispatch(actionEditBrand);
                }}
              />
            </Tooltip>
            {_.find(credentials?.roles, (e) => e === MANAGER) ? (
              <Popconfirm
                placement="top"
                title={DELETE_BRAND_WARNING_MESSAGE}
                onConfirm={() => {
                  dispatch({
                    type: Action.DELETE_BRAND_ACTION,
                    brand: record,
                  });
                }}
                okText="Đồng ý"
                cancelText="Hủy bỏ"
              >
                <Tooltip title="Xóa thương hiệu">
                  <FiTrash className="delete-icon ml-2" />
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

  return (
    <div className="md:container w-full">
      <MetaDecorator
        title={BRAND_PAGE_TITLE}
        description={BRAND_PAGE_DESCRIPTION}
      />
      <div className="flex flex-row justify-end mb-4">
        <button
          className="button-3d-green rounded-md"
          onClick={() => {
            const action = {
              type: Type.OPEN_FORM_CREATE,
              Component: <EditBrand />,
              title: TITLE_ADMIN_BRAND,
              nameButton: BUTTON_ADD,
              footer: true,
            };
            dispatch(action);

            let brandEditModal = {
              loai: _.first(l),
            };

            dispatch({
              type: type.EDIT_BRAND,
              brandEditModal,
            });
          }}
        >
          THÊM
        </button>
      </div>
      <div className="mt-5 mb-5">
        <AutoComplete
          className="fold:w-full sm:w-1/2 lg:w-1/4"
          value={catname}
          onChange={(value) => {
            setCatname(value);
          }}
          onSelect={(value, option) => {
            setCatname(option.label);
            if (searchRef !== null) {
              clearTimeout(searchRef.current);
            }
            searchRef.current = setTimeout(() => {
              dispatch({
                type: Action.FIND_ALL_BRAND_BY_CATEGORY_ID_ACTION,
                tenloai: option.label,
              });
            }, 300);
          }}
          options={_?.map(l, (loai) => {
            return { label: loai.tenloai, value: loai.maloai };
          })}
          onSearch={(value) => {
            if (searchRef !== null) {
              clearTimeout(searchRef.current);
            }
            searchRef.current = setTimeout(() => {
              dispatch({
                type: Action.FIND_ALL_BRAND_BY_CATEGORY_ID_ACTION,
                tenloai: value,
              });
            }, 300);
          }}
          filterOption={(inputValue, option) =>
            _.indexOf(_.upperCase(option.label), _.upperCase(inputValue)) !== -1
          }
        ></AutoComplete>
      </div>
      <Table
        columns={columns}
        dataSource={th}
        rowKey={(record) => record.math}
        expandable={{
          expandedRowRender: (record) => (
            <div className="flex flex-col">
              <p className="mb-3 block md:hidden">
                Mã thương hiệu: {record.math}
              </p>
              <p className="mb-3 block">Loại: {record?.loai?.tenloai}</p>
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
