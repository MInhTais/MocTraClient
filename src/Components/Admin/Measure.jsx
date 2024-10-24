import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Action from "../../Common/Action/Admin/AdminAction";
import { Button, Popconfirm, Table,  Input, Space, Tooltip } from "antd";
import {  SearchOutlined } from "@ant-design/icons";
import * as Type from "../../Common/Const/Admin/Drawer";
import * as type from "../../Common/Const/Admin/Edit";
import _ from 'lodash';
import { MANAGER } from "../../Common/Const/Auth/AuthConst";
import Highlighter from "react-highlight-words";
import { FiEdit3,FiTrash } from "react-icons/fi";
import { BUTTON_ADD, BUTTON_EDIT,  TITLE_ADMIN_MEASURE } from "../../Common/Const/Admin/AdminConst";
import EditMeasure from "./Form/EditMeasure";
import { DELETE_MEASURE_WARNING_MESSAGE } from "../../Common/Const/Notify/NotifyConst";
import MetaDecorator from "../../libs/Helmet/MetaDecorator";
import { MEASURE_PAGE_DESCRIPTION, MEASURE_PAGE_TITLE } from "../../Common/Const/Page/PageConst";
export default function Measure(props) {
  const dispatch = useDispatch();
  const { dvd } = useSelector((state) => state.AdminReducer);
  const credentials = JSON.parse(localStorage.getItem('credentials'));
  const [state, setState] = useState({
    sortedInfo: null,
    searchText: '',
    searchedColumn: '',
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

  let {sortedInfo } = state;
  sortedInfo = sortedInfo || {};

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
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
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
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
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => searchInput?.current?.select(), 100);
      }
    },
    render: text =>
      state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
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

  const handleReset = clearFilters => {
    clearFilters();
    setState({ searchText: '' });
  };

  const columns = [
    {
      title: "Mã",
      key: "madvd",
      dataIndex: "madvd",
      sorter: (a, b) => a.madvd.length - b.madvd.length,
      sortOrder: sortedInfo.columnKey === "madvd" && sortedInfo.order,
      ellipsis: true,
      ...getColumnSearchProps('madvd')
    },
    {
        title: "Tên",
        key: "tendvd",
        dataIndex: "tendvd",
        sorter: (a, b) => a.tendvd.length - b.tendvd.length,
        sortOrder: sortedInfo.columnKey === "tendvd" && sortedInfo.order,
        ellipsis: true,
        ...getColumnSearchProps('tendvd')
      },
    {
      title: "Action",
      key: "x",
      render: (text,record,index) => {
        return (
          <div className="flex flex-row">
              <Tooltip title={'Cập nhật đơn vị tính'}>
              <FiEdit3 className="edit-icon mr-2"
              onClick={() => {
                const action = {
                  type: Type.OPEN_FORM,
                  Component: <EditMeasure />,
                  title: TITLE_ADMIN_MEASURE,
                  nameButton: BUTTON_EDIT,
                  footer:true
                };
                dispatch(action);
                const actionEditMeasure = {
                  type: type.EDIT_MEASURE,
                  measureEditModal: record,
                };
                dispatch(actionEditMeasure);
              }}
              />
              </Tooltip>
            {_.find(credentials?.roles,e=>e === MANAGER) ? <Popconfirm
              placement="top"
              title={DELETE_MEASURE_WARNING_MESSAGE}
              onConfirm={()=>{
                dispatch({
                  type: Action.DELETE_MEASURE_ACTION,
                  measure: record
                })
              }}
              okText="Đồng ý"
              cancelText="Hủy bỏ"
            >
              <Tooltip title='Xóa đơn vị tính'>
              <FiTrash className="ml-2 delete-icon" />
              </Tooltip>
            </Popconfirm>: ''}
          </div>
        );
      },
    },
  ];

  return (
    <div className="md:container w-full">
      <MetaDecorator title={MEASURE_PAGE_TITLE} description={MEASURE_PAGE_DESCRIPTION} />
      <div className="flex flex-row mb-4 justify-end">
        <button className="button-3d-green rounded-md" onClick={()=>{
          const action = {
            type: Type.OPEN_FORM_CREATE,
            Component: <EditMeasure />,
            title: TITLE_ADMIN_MEASURE,
            nameButton: BUTTON_ADD,
            footer:true
          };
          dispatch(action);
          const actionEditMeasure = {
            type: type.EDIT_MEASURE,
            measureEditModal: null,
          };
          dispatch(actionEditMeasure);
        }}>THÊM</button>
      </div>
      <Table 
      columns={columns} 
      rowKey={(record)=> record.madvd}
      dataSource={dvd} 
      onChange={handleChange} />
    </div>
  );
}
