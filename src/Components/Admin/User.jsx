import React, { useEffect, useState, useRef } from "react";
import * as Action from "../../Common/Action/Authorities/AuthoritiesAction";
import * as AdminAction from "../../Common/Action/Admin/AdminAction";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Badge,
  Table,
  Tag,
  Switch,
  Button,
  Popconfirm,
  Popover,
  AutoComplete,
  Tooltip,
  Input,
  Space,
  Tabs,
} from "antd";
import {
  AndroidOutlined,
  AppleOutlined,
  SearchOutlined,
  UserDeleteOutlined,
  UserOutlined,
} from "@ant-design/icons";
import EditUser from "./Form/EditUser";
import * as Type from "../../Common/Const/Admin/Drawer";
import * as type from "../../Common/Const/Admin/Edit";
import moment from "moment";
import _ from "lodash";
import { MANAGER } from "../../Common/Const/Auth/AuthConst";
import AccessDenied from "../Error/AccessDenied";
import Highlighter from "react-highlight-words";
import { FiEdit3, FiTrash } from "react-icons/fi";
import {
  BUTTON_ADD,
  BUTTON_EDIT,
  TITLE_ADMIN_ROLE,
  TITLE_ADMIN_USER,
} from "../../Common/Const/Admin/AdminConst";
import EditRole from "./Form/EditRole";
import { DELETE_ROLE_WARNING_MESSAGE } from "../../Common/Const/Notify/NotifyConst";
import MetaDecorator from "../../libs/Helmet/MetaDecorator";
import { ACCOUNT_PAGE_DESCRIPTION, ACCOUNT_PAGE_TITLE } from "../../Common/Const/Page/PageConst";
const { TabPane } = Tabs;

export default function User(props) {
  const dispatch = useDispatch();
  const { authorities } = useSelector((state) => state.AuthorityReducer);
  const { credentials } = useSelector((state) => state.AuthReducer);
  const [state, setState] = useState({
    sortedInfo: null,
    searchText: "",
    searchedColumn: "",
  });
  const { size } = props;
  let searchInput = useRef(null);
  const searchRef = useRef(null);
  const [role, setRole] = useState("");

  const handleChange = (pagination, filters, sorter) => {
    setState({
      sortedInfo: sorter,
      filteredInfo: filters,
    });
  };

  useEffect(() => {
    dispatch({
      type: Action.GET_ALL_AUTHORITIES_ACTION,
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

  let { sortedInfo } = state;
  sortedInfo = sortedInfo || {};
  const color = ["green", "gold"];
  const renderRoleOfUser = (record) => {
    return (
      <>
        <Avatar.Group maxCount={1} size="small">
          {_?.map(record?.vaitro, (vt, i) => {
            return (
              <Popover
                key={i}
                placement="top"
                title={"Quyền"}
                content={() => {
                  return (
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Mã vai trò</th>
                          <th>Tên vai trò</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {record?.vaitro?.map((r, i) => {
                          return (
                            <tr key={i}>
                              <td>{r.mavt}</td>
                              <td>{r.tenvt}</td>
                              <td>
                                <button
                                  className="button-danger rounded-md"
                                  style={{ borderRadius: "50%" }}
                                  onClick={() => {
                                    dispatch({
                                      type: Action.DELETE_AUTHORITIES_ACTION,
                                      authority: {
                                        mapq: authorities?.authority?.find(
                                          (e) =>
                                            e.taikhoan.tendn === record.tendn &&
                                            e.vaitro.mavt === r.mavt
                                        )?.mapq,
                                        taikhoan: record,
                                        vaitro: r,
                                      },
                                    });
                                  }}
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  );
                }}
              >
                <Tooltip title={vt?.tenvt} placement="top">
                  <Avatar
                    alt="Bách Mộc"
                    shape={"circle"}
                    style={{ backgroundColor: "#87d068" }}
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                    icon={<UserOutlined />}
                  ></Avatar>
                </Tooltip>
              </Popover>
            );
          })}
          <Popover
            placement="rightTop"
            title={"Thêm quyền"}
            content={() => {
              return (
                <AutoComplete
                  style={{ width: "100%" }}
                  value={role}
                  onChange={(value) => {
                    setRole(value);
                  }}
                  onSelect={(value, option) => {
                    setRole(option.label);
                    //dispatch action saga
                    let authority = {
                      taikhoan: record,
                      vaitro: _?.find(
                        authorities?.roles,
                        (e) => e.mavt === value
                      ),
                    };
                    dispatch({
                      type: Action.ADD_AUTHORITIES_ACTION,
                      authority,
                    });
                  }}
                  options={_?.map(authorities?.roles, (r, i) => {
                    return { label: r.tenvt, value: r.mavt };
                  })}
                  onSearch={(value) => {
                    if (searchRef !== null) {
                      clearTimeout(searchRef.current);
                    }
                    searchRef.current = setTimeout(() => {
                      dispatch({
                        type: "GET_....",
                        keyword: value,
                      });
                    }, 300);
                    console.log(value);
                  }}
                />
              );
            }}
            trigger="click"
          >
            <Tooltip title={"Thêm quyền"} placement="top">
              <button className="button-primary-rounded">+</button>
            </Tooltip>
          </Popover>
        </Avatar.Group>
      </>
    );
  };

  const columns = [
    {
      title: "Tên đăng nhập",
      key: "tendn",
      dataIndex: "tendn",
      ellipsis: true,
      fixed: "left",
      sorter: (a, b) => a.tendn.length - b.tendn.length,
      sortOrder: sortedInfo.columnKey === "tendn" && sortedInfo.order,
      ...getColumnSearchProps("tendn"),
    },
    {
      title: "",
      key: "hinhanh",
      render: (text, record, index) => {
        return (
          <Avatar
            src={
              !record.hinhanh
                ? "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
                : "http://localhost:8080/images/user/" + record.hinhanh
            }
            alt="Bách Mộc"
          />
        );
      },
      width: 90,
      responsive: ["md"],
    },
    {
      title: "Họ tên",
      key: "hoten",
      dataIndex: "hoten",
      sorter: (a, b) => a.hoten.length - b.hoten.length,
      sortOrder: sortedInfo.columnKey === "hoten" && sortedInfo.order,
      responsive: ["lg"],
      ...getColumnSearchProps("hoten"),
    },
    {
      title: "Giới tính",
      key: "gioitinh",
      render: (text, record, index) => {
        return (
          <Badge
            color={record.gioitinh ? color[0] : color[1]}
            text={record.gioitinh ? "Nam" : "Nữ"}
          />
        );
      },
      responsive: ["lg"],
    },
    {
      title: "Ngày sinh",
      key: "ngaysinh",
      ...getColumnSearchProps("ngaysinh"),
      dataIndex: "ngaysinh",
      sorter: (a, b) => moment(a.ngaysinh).unix() - moment(b.ngaysinh).unix(),
      sortOrder: sortedInfo.columnKey === "ngaysinh" && sortedInfo.order,
      responsive: ["lg"],
    },
    {
      title: "Số điện thoại",
      key: "sdt",
      dataIndex: "sdt",
      sorter: (a, b) => Number(a.sdt) - Number(b.sdt),
      sortOrder: sortedInfo.columnKey === "sdt" && sortedInfo.order,
      responsive: ["lg"],
      ...getColumnSearchProps("sdt"),
    },
    {
      title: "Kích hoạt",
      key: "kichhoat",
      ...getColumnSearchProps("kichhoat"),
      render: (text, record, index) => {
        return (
          <Tag color={record.kichhoat ? color[0] : color[1]}>
            {record.kichhoat ? "Kích hoạt" : "Khóa"}
          </Tag>
        );
      },
      responsive: ["lg"],
    },
    {
      title: "Ngày tạo",
      key: "ngaytao",
      render:(record)=>{
        return <div className="w-full flex flex-row justify-center">
          <Tag color="orange">{moment(record?.ngaytao).format('DD/MM/YYYY HH:ss:mm')}</Tag>
        </div>
      },
      sorter: (a, b) => moment(a.ngaytao).unix() - moment(b.ngaytao).unix(),
      sortOrder: sortedInfo.columnKey === "ngaytao" && sortedInfo.order,
      responsive: ["lg"],
      
    },
    {
      title: "Quyền",
      key: "vaitro",
      render: (text, record, index) => {
        return renderRoleOfUser(record);
      },
      responsive: ["sm"],
    },
    {
      title: "Action",
      key: "x",
      render: (text, record, index) => {
        return (
          <div className="flex flex-row">
            <Tooltip title="Chỉnh sửa">
              <FiEdit3
                className="edit-icon mr-2"
                onClick={() => {
                  const action = {
                    type: Type.OPEN_FORM,
                    Component: <EditUser />,
                    title: TITLE_ADMIN_USER,
                    nameButton: BUTTON_EDIT,
                  };
                  dispatch(action);
                  const actionEditUser = {
                    type: type.EDIT_USER,
                    userEditModal: record,
                  };
                  dispatch(actionEditUser);
                }}
              />
            </Tooltip>
            <Popconfirm
              placement="top"
              title={"Bạn có muốn xóa người dùng?"}
              onConfirm={() => {
                dispatch({
                  type: AdminAction.DELETE_USER_ACTION,
                  user: record,
                });
              }}
              okText="Đồng ý"
              cancelText="Hủy bỏ"
            >
              <Tooltip title="Xóa người dùng">
                <FiTrash className="delete-icon ml-2 mr-2" />
              </Tooltip>
            </Popconfirm>
            {record?.tkhc ? null : (
              <Popconfirm
                placement="top"
                title={"Bạn có muốn thêm người này vào danh sách hạn chế?"}
                onConfirm={() => {
                  dispatch({
                    type: AdminAction.ADD_USER_RESTRICTED_ALL_ACTION,
                    user: record,
                  });
                }}
                okText="Đồng ý"
                cancelText="Hủy bỏ"
              >
                <Tooltip title="Thêm vào danh sách hạn chế">
                  <UserDeleteOutlined className="delete-icon ml-2" />
                </Tooltip>
              </Popconfirm>
            )}
          </div>
        );
      },
      width: 120,
      fixed: "right",
    },
  ];

  const columnsBlock = [
    {
      title: "Tên đăng nhập",
      key: "tendn",
      dataIndex: "tendn",
      ellipsis: true,
      width: 250,
      fixed: "left",
      sorter: (a, b) => a.tendn.length - b.tendn.length,
      sortOrder: sortedInfo.columnKey === "tendn" && sortedInfo.order,
      ...getColumnSearchProps("tendn"),
    },
    {
      title: "Báo cáo sai lệch",
      key: "baocao",

      render: (text, record, index) => {
        return (
          <div className="w-full flex flex-row justify-center">
            <Tag color={"purple"}>{record.baocao}</Tag>
          </div>
        );
      },
      width:150,
      responsive: ["lg"],
    },
    {
      title: "Thời gian gỡ khóa",
      key: "ngayhethandg",
      render: (text, record, index) => {
        return (
          <div className="w-full flex flex-row justify-center">
            <Tag color={"volcano"}>
              {record.ngayhethandg
                ? moment(record.ngayhethandg).format("DD/MM/YYYY")
                : "Không"}
            </Tag>
          </div>
        );
      },
      width:150,
      responsive: ["lg"],
    },

    {
      title: "Hủy hàng",
      key: "huyhang",
      render: (text, record, index) => {
        return (
          <div className="w-full flex flex-row justify-center">
            <Tag color={"purple"}>{record.huyhang} {'lần'}</Tag>
          </div>
        );
      },
      responsive: ["lg"],
      width:100
    },
    {
      title: "Gỡ khóa",
      key: "ngayhethantt",
      render: (text, record, index) => {
        return (
          <div className="w-full flex flex-row justify-center">
            <Tag color={"volcano"}>
              {record?.ngayhethantt
                ? moment(record.ngayhethantt).format("DD/MM/YYYY HH:MM:SS")
                : "Không bị khóa"}
            </Tag>
          </div>
        );
      },
      width:150,
      responsive: ["lg"],
    },
    {
      title: "Action",
      key: "x",
      render: (text, record, index) => {
        return (
          <div className="flex flex-row">
            <Popconfirm
              placement="top"
              title={"Bạn có muốn xóa người này ra khỏi danh sách hạn chế?"}
              onConfirm={() => {
                dispatch({
                  type: AdminAction.DELETE_USER_RESTRICTED_ACTION,
                  user: record,
                });
              }}
              okText="Đồng ý"
              cancelText="Hủy bỏ"
            >
              <Tooltip title="Xóa khỏi danh sách hạn chế">
                <FiTrash className="delete-icon ml-2" />
              </Tooltip>
            </Popconfirm>
          </div>
        );
      },
      width: 120,
      fixed: "right",
    },
  ];

  const columnsRole = [
    {
      title: 'Mã vai trò',
      key:'mavt',
      dataIndex:'mavt'
    },
    {
      title:'Tên vai trò',
      key:'tenvt',
      dataIndex:'tenvt'
    },
    {
      title:'Action',
      key:'action',
      render:(text,record,index)=>{
        return (
          <div className="w-full flex flex-row gap-2">
            <Tooltip title="Chỉnh sửa">
              <FiEdit3
                className="edit-icon mr-2"
                onClick={() => {
                  const action = {
                    type: Type.OPEN_FORM,
                    Component: <EditRole />,
                    title: TITLE_ADMIN_ROLE,
                    nameButton: BUTTON_EDIT,
                  };
                  dispatch(action);
                  const actionEditUser = {
                    type: type.EDIT_ROLE,
                    roleEditModal: record,
                  };
                  dispatch(actionEditUser);
                }}
              />
            </Tooltip>
            <Popconfirm
              placement="top"
              title={DELETE_ROLE_WARNING_MESSAGE}
              onConfirm={() => {
                dispatch({
                  type: AdminAction.DELETE_ROLE_ADMIN_ACTION,
                  role: record,
                });
              }}
              okText="Đồng ý"
              cancelText="Hủy bỏ"
            >
              <Tooltip title="Xóa khỏi danh sách hạn chế">
                <FiTrash className="delete-icon ml-2" />
              </Tooltip>
            </Popconfirm>
          </div>
        )
      }
    }
  ]

  const renderByRole = () => {
    const admin = _.find(credentials?.roles, (e) => e === MANAGER);
    return admin ? (
      <div className="w-full md:container">
        <Tabs defaultActiveKey="1">
          <TabPane
            tab={
              <span>
                <AppleOutlined />
                Tài khoản
              </span>
            }
            key="1"
          >
            <div className="mb-5 flex flex-row justify-end">
              <button
                className="button-3d-green rounded-md"
                onClick={() => {
                  const action = {
                    type: Type.OPEN_FORM_CREATE,
                    Component: <EditUser />,
                    title: TITLE_ADMIN_USER,
                    nameButton: BUTTON_ADD,
                    footer:true
                  };
                  dispatch(action);
                  const actionEditUser = {
                    type: type.EDIT_USER,
                    userEditModal: null,
                  };
                  dispatch(actionEditUser);
                }}
              >
                THÊM
              </button>
            </div>
            <Table
              columns={columns}
              expandable={{
                expandedRowRender: (record) => (
                  <div className="flex flex-col">
                    <p className="mb-3 block">{record.tendn}</p>
                    <p className="mb-3 block">Họ tên: {record.hoten}</p>
                    <p className="mb-3 block">
                      Giới tính: {record.gioitinh ? "Nam" : "Nữ"}
                    </p>
                    <p className="mb-3 block">Ngày sinh: {record.ngaysinh}</p>
                    <p className="mb-3 block">SĐT: {record.sdt}</p>
                    <p className="mb-3 block">
                      Kích hoạt: {record.kichhoat ? "Kích hoạt" : "Khóa"}
                    </p>
                    <p className="mb-3 block">Ngày tạo: {moment(record.ngaytao).format('DD/MM/YYYY HH:ss:mm')}</p>
                    <p className="mb-3 block">
                      <div className="flex flex-row">
                        <div>Quyền: </div>
                        <div className="ml-4">{renderRoleOfUser(record)}</div>
                      </div>
                    </p>
                  </div>
                ),
                rowExpandable: (record) => {
                  return size?.width >= 1280 ? false : true;
                },
              }}
              rowKey={(record) => record.tendn}
              dataSource={_?.filter(
                authorities?.accounts,
                (e) =>
                  e.tendn !==
                  JSON.parse(localStorage.getItem("credentials"))?.tendn
              )}
              scroll={{ x: size?.width >= 1020 ? 1500 : 0, y: 450 }}
              onChange={handleChange}
              sticky
            />
          </TabPane>
          <TabPane
            tab={
              <span>
                <AndroidOutlined />
                Hạn chế
              </span>
            }
            key="2"
            disabled={authorities?.blocks?.length === 0 ? true : false}
          >
            <Table
              columns={columnsBlock}
              expandable={{
                expandedRowRender: (record) => (
                  <div className="flex flex-col">
                    <p className="mb-3 block">{record.tendn}</p>
                    <p className="mb-3 block">
                      Số lần hủy hàng: {record.huyhang}
                    </p>
                    <p className="mb-3 block">
                      Ngày mở khóa: {record.ngayhethantt ? moment(record.ngayhethantt).format('DD/MM/YYYY') : 'Không'}
                    </p>
                    <p className="mb-3 block">
                      Số lần báo cáo sai lệch: {record.baocao}
                    </p>
                    <p className="mb-3 block">
                      Ngày mở khóa: {record.ngayhethandg ? moment(record.ngayhethandg).format('DD/MM/YYYY') : 'Không'}
                    </p>
                  </div>
                ),
                rowExpandable: (record) => {
                  return size?.width >= 1280 ? false : true;
                },
              }}
              dataSource={authorities?.blocks}
              scroll={{ x: size?.width >= 1280 ? 1500 : 200, y: 450 }}
              onChange={handleChange}
              sticky
            />
          </TabPane>
          <TabPane
            tab={
              <span>
                <AndroidOutlined />
                Quyền
              </span>
            }
            key="3"
          >
            <div className="md:container">
            <div className="mb-5 flex flex-row justify-end">
              <button
                className="button-3d-blue rounded-md"
                onClick={() => {
                  const action = {
                    type: Type.OPEN_FORM_CREATE,
                    Component: <EditRole />,
                    title: TITLE_ADMIN_ROLE,
                    nameButton: BUTTON_ADD,
                    footer:true
                  };
                  dispatch(action);
                  const actionEditUser = {
                    type: type.EDIT_ROLE,
                    roleEditModal: null,
                  };
                  dispatch(actionEditUser);
                }}
              >
                THÊM
              </button>
            </div>
              <Table 
              rowKey={(record)=>record.mavt}
              columns={columnsRole}
              dataSource={authorities?.roles}
              />
            </div>
          </TabPane>
        </Tabs>
      </div>
    ) : (
      <AccessDenied />
    );
  };

  return <div className="md:container w-full">
    <MetaDecorator title={ACCOUNT_PAGE_TITLE} description={ACCOUNT_PAGE_DESCRIPTION} />
    {renderByRole()}</div>;
}
