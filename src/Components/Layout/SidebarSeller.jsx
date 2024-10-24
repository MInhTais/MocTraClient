import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Badge, Layout, Menu, Popover } from "antd";
import {
  LogoutOutlined,
} from "@ant-design/icons";
import SubMenu from "antd/lib/menu/SubMenu";
import { NavLink } from "react-router-dom";
import _ from "lodash";
import { LOGOUT } from "../../Common/Const/Auth/AuthConst";
import { ADMIN_URL } from "../../Common/Const/Admin/AdminConst";
import { SellerSidebar } from "./AuthMenu/SellerSidebar";
import { GET_ALL_PRODUCT_SELLER_ACTION } from "../../Common/Action/Admin/SellerAction";
import { history } from "../../libs/History/history";
import NotifyComponent from "./Notify/NotifyComponent";
import { UPDATE_STATUS_VIEWED_BY_USERNAME_ACTION } from "../../Common/Action/Authentication/AuthAction";

const { Sider } = Layout;

export default function SidebarSeller(props) {
  const dispatch = useDispatch();
  const { notify } = useSelector((state) => state.AuthReducer);
  const [state, setState] = useState({
    collapsed: false,
  });
  const { nhacungcap } = useSelector((state) => state.SellerReducer);
  useEffect(() => {
    dispatch({
      type: GET_ALL_PRODUCT_SELLER_ACTION,
    });
  }, []);
  const onCollapse = (collapsed) => {
    setState({ collapsed });
  };
  const { size } = props;
  const { credentials } = useSelector((state) => state.AuthReducer);
  return (
    <Sider
      collapsible
      collapsed={size.width >= 768 ? state.collapsed : true}
      onCollapse={onCollapse}
    >
      <div className="flex flex-col justify-center gap-y-2 mt-5">
        <div className="flex flex-col justify-center w-full">
          <div className="w-full flex justify-center">
          <Popover
            placement={"bottom"}
            getPopupContainer={(node) => {
              return node.parentElement;
            }}
            content={<NotifyComponent />}
            onVisibleChange={(visible) => {
              if (visible) {
                if (credentials) {
                  dispatch({
                    type: UPDATE_STATUS_VIEWED_BY_USERNAME_ACTION,
                    username: credentials?.tendn,
                  });
                }
              }
            }}
            trigger="click"
          >
            <Badge count={_?.filter(notify, (e) => !e.daxem)?.length} color="green">
              <img
                className="w-8 h-8 rounded-full"
                src={
                  credentials?.hinhanh
                    ? "http://localhost:8080/images/user/" +
                      credentials?.hinhanh
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQi71bX5Zc4q07uE08t1RvUodmEKdqUGtZYvpjZHRBo0sLZn3Jr4wACr42pDUSVbu4mb7Y&usqp=CAU"
                }
              />
            </Badge>
          </Popover>
          </div>
          <div>
            {" "}
            <small className="text-xs">
              <Badge
                color={nhacungcap?.pheduyet ? 'green' : 'red'}
                text={nhacungcap?.pheduyet ? "Hoạt động" : "Khóa"}
                style={{color: nhacungcap?.pheduyet ? 'white' : 'red'}}
              />
            </small>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <small className="text-white">{credentials?.hoten}</small>
          <small className="text-white cursor-pointer"
          onClick={()=>{
            history.push('/cap-nhat-ho-so')
          }}
          >View Profile</small>
        </div>
      </div>
      <Menu
        theme="dark"
        defaultSelectedKeys={["1"]}
        mode="inline"
        className="mt-4"
      >
        {_.map(SellerSidebar, (item) => {
          return (
            <SubMenu key={item.subkey} icon={item.icon} title={item.title}>
              {_.map(item?.submenu, (sub) => {
                return (
                  <Menu.Item key={sub.key}>
                    <NavLink
                      to={sub.url}
                      onClick={() => {
                        dispatch({
                          type: ADMIN_URL,
                          adminURL: sub.name,
                        });
                        const { key, pathname } = props.location;
                        let path = {
                          key,
                          pathname,
                          name: sub.name,
                        };
                        localStorage.setItem("path", JSON.stringify(path));
                      }}
                    >
                      {sub.name}
                    </NavLink>
                  </Menu.Item>
                );
              })}
            </SubMenu>
          );
        })}
        <SubMenu
          key={SellerSidebar?.length + 1}
          icon={<LogoutOutlined />}
          title={"Đăng xuất"}
        >
          <Menu.Item key={"sub5"}>
            <NavLink
              to={"/trang-chu"}
              onClick={() => {
                dispatch({
                  type: LOGOUT,
                });
              }}
            >
              {"Đăng xuất"}
            </NavLink>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  );
}
