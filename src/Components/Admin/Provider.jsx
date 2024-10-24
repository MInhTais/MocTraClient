import { Table, Button,  Tag, Popconfirm, Input, Space, Tooltip, Badge } from "antd";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as Action from "../../Common/Action/Admin/AdminAction";
import {  SearchOutlined, LockOutlined } from "@ant-design/icons";
import EditProvider from "./Form/EditProvider";
import * as Type from '../../Common/Const/Admin/Drawer';
import * as type from '../../Common/Const/Admin/Edit';
import _ from "lodash";
import { MANAGER } from "../../Common/Const/Auth/AuthConst";
import Highlighter from "react-highlight-words";
import './config.css'
import { FiEdit3,FiTrash } from "react-icons/fi";
import { BUTTON_ADD, BUTTON_EDIT, TITLE_ADMIN_PROVIDER } from "../../Common/Const/Admin/AdminConst";
import { DELETE_PROVIDER_WARNING_MESSAGE } from "../../Common/Const/Notify/NotifyConst";
import MetaDecorator from "../../libs/Helmet/MetaDecorator";
import { PROVIDER_PAGE_DESCRIPTION, PROVIDER_PAGE_TITLE } from "../../Common/Const/Page/PageConst";

const color = [
  "magenta",
  "red",
  "volcano",
  "gold",
  "orange",
  "lime",
  "green",
  "cyan",
  "blue",
  "geekblue",
  "purple",
];
export default function Provider(props) {
  const [state, setState] = useState({
    sortedInfo: null,
    searchText: '',
    searchedColumn: '',
  });
  let searchInput = useRef(null);
  const credentials = JSON.parse(localStorage.getItem('credentials'));
  
  const dispatch = useDispatch();
  const { ncc } = useSelector((state) => state.AdminReducer);

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

  let { sortedInfo } = state;
  sortedInfo = sortedInfo || {};

  const columns = [
    {
      title: "Mã nhà cung cấp",
      key: "mancc",
      sorter: (a, b) => a.mancc.length - b.mancc.length,
      sortOrder: sortedInfo.columnKey === "mancc" && sortedInfo.order,
      ellipsis: true,
      ...getColumnSearchProps('mancc'),
      render: (text, record, index) => {
        return <div className="w-full flex flex-row justify-center"><Tag className="text-center" color={color[index]}>{record.mancc}</Tag></div>;
      },
      width:'auto'
    },
    {
      title: "Tên nhà cung cấp",
      key: "tenncc",
      sorter: (a, b) => a.tenncc.length - b.tenncc.length,
      sortOrder: sortedInfo.columnKey === "tenncc" && sortedInfo.order,
      ellipsis: true,
      ...getColumnSearchProps('tenncc'),
      render:(text,record,index)=>{
        return (
          <Tooltip title={record.tenncc}>
            <span className="text-sm">{record.tenncc}</span>
          </Tooltip>
        )
      },
      responsive: ['md']
    },
    {
      title: "Số điện thoại",
      dataIndex: "sdt",
      key: "sdt",
      sorter: (a, b) => a.sdt.length - b.sdt.length,
      sortOrder: sortedInfo.columnKey === "sdt" && sortedInfo.order,
      ellipsis: true,
      ...getColumnSearchProps('sdt'),
      responsive: ['lg']
    },
    {
      title: "Trạng thái",
      key: "trangthai",
      render:(text,record,index)=>{
        return (
          <div className="flex flex-row justify-center w-full">
            <Badge color={record.trangthai ? 'green' :'red'} text={record.trangthai ? 'Hoạt động' : 'Khóa'} />
          </div>
        )
      },
      responsive: ['lg']
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (text, record, index) => {
        return (
          <div className="flex flex-row flex-wrap gap-2">
            <Tooltip title={'Chỉnh sửa nhà cung cấp'}>
            <FiEdit3
            onClick={() => {
              const action = {
                type: Type.OPEN_FORM,
                Component: <EditProvider />,
                title: TITLE_ADMIN_PROVIDER,
                nameButton: BUTTON_EDIT,
                footer:true
              };
              dispatch(action);
              const actionEditProvider = {
                type: type.EDIT_PROVIDER,
                providerEditModal: record,
              };
              dispatch(actionEditProvider);
            }}
            className="duo:mr-2 edit-icon" 
            />
            </Tooltip>

            {_.find(credentials?.roles,e=> e===MANAGER) ? <Popconfirm
              placement="top"
              title={DELETE_PROVIDER_WARNING_MESSAGE}
              onConfirm={()=>{
                dispatch({
                  type: Action.DELETE_PROVIDER_ACTION,
                  provider: record
                })
              }}
              okText="Đồng ý"
              cancelText="Hủy bỏ"
            >              
               <Tooltip title='Xóa nhà cung cấp'>
               <FiTrash className="duo:ml-2 duo:mr-2 delete-icon" />
               </Tooltip>
            </Popconfirm>: null}

            {_.find(credentials?.roles,e=>e===MANAGER) ? 
            <Popconfirm
                placement="top"
                title={
                  "Bạn có muốn đổi trạng thái nhà cung cấp này, điều này sẽ ảnh hưởng đến sản phẩm do nơi này cung cấp, bạn vẫn muốn tiếp tục?"
                }
                onConfirm={() => {
                  record.trangthai = !record.trangthai;
                  dispatch({
                    type: Action.UPDATE_PROVIDER_ACTION,
                    provider: record,
                  });
                }}
                okText="Đồng ý"
                cancelText="Hủy bỏ"
              >
                <Tooltip title={'Khóa nhà cung cấp'}>
                <LockOutlined className="stick-icon text-indigo-600 duo:ml-2" />
                </Tooltip>
              </Popconfirm>: null}
          </div>
        );
      },
    },
  ];
  
  return (
    <div className="container w-full">
      <MetaDecorator title={PROVIDER_PAGE_TITLE} description={PROVIDER_PAGE_DESCRIPTION} />
      <div className="flex flex-row justify-end mb-4">
          <button className="button-3d-green" onClick={()=>{       
            const action = {
              type: Type.OPEN_FORM_CREATE,
              Component: <EditProvider />,
              title: TITLE_ADMIN_PROVIDER,
              nameButton: BUTTON_ADD,
              footer:true
            };
            dispatch(action);
            const actionEditProvider = {
              type: type.EDIT_PROVIDER,
              providerEditModal: null
            };
            dispatch(actionEditProvider);
          }}>THÊM</button>
      </div>
      <Table 
      columns={columns} 
      rowKey={(record) => record.mancc}
      expandable={{
        expandedRowRender: record => (
          <div className="flex flex-col">
            <p className="mb-3 block lg:hidden">{record.tenncc}</p>
            <p className="mb-3 block">Địa chỉ: {record.diachi}</p>
            <p className="mb-3 block lg:hidden">SĐT: {record.sdt}</p>
          </div>
        ),
      }}
      
      dataSource={ncc} 
      onChange={handleChange}e />
    </div>
  );
}
