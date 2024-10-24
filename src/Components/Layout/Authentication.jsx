import React, { useEffect, useState } from "react";
import { Menu } from "antd";
import {
  SkinOutlined,
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import SubMenu from "antd/lib/menu/SubMenu";
import { SidebarMenu } from "./AuthMenu/Sidebar";
import { NavLink } from "react-router-dom";
import { CUSTOMER, LOGOUT } from "../../Common/Const/Auth/AuthConst";
import _ from "lodash";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const icon = [<AppstoreOutlined />, <SkinOutlined />];
export default function Authentication(props) {
  useEffect(() => {}, []);
  const dispatch = useDispatch();
  const [state, setState] = useState({
    collapsed: false,
  });
  const { credentials } = useSelector((state) => state.AuthReducer);
  const { user } = useSelector((state) => state.isAuthReducer);

  const sidebar = _.find(credentials?.roles, (e) => e === CUSTOMER)
    ? SidebarMenu
    : _.filter(SidebarMenu, (e) => e.title !== "Đơn hàng");
  const renderMenu = () => {
    return _?.map(sidebar, (s, i) => {
      return (
        <SubMenu
          icon={icon[i]}
          title={s.title}
          key={s.key}
          className="w-full uppercase text-xs text-green-700 hover:text-green-900"
        >
          {s.submenu.map((m, index) => {
            return (
              <Menu.Item key={m.key} className="text-xs">
                <NavLink to={m.url}>{m.name}</NavLink>
              </Menu.Item>
            );
          })}
        </SubMenu>
      );
    });
  };

  return (
    <div>
      {_.isEmpty(user) ? (
        <div className="w-full flex flex-col h-96 bg-gray-100">
          <div className="w-full flex justify-center">
            <div className="mt-5 p-5 w-3/4 flex justify-center bg-gray-200 animate-pulse h-15 rounded-md"></div>
          </div>
          <div className="w-full flex justify-center">
            <div className="mt-5 p-5 w-3/4 flex justify-center bg-gray-200 animate-pulse h-15 rounded-md"></div>
          </div>
          <div className="w-full flex justify-center">
            <div className="mt-5 p-5 w-3/4 flex justify-center bg-gray-200 animate-pulse h-15 rounded-md"></div>
          </div>
          <div className="w-full flex justify-center">
            <div className="mt-5 p-5 w-3/4 flex justify-center bg-gray-200 animate-pulse h-15 rounded-md"></div>
          </div>
          <div className="w-full flex justify-center">
            <div className="mt-5 p-5 w-3/4 flex justify-center bg-gray-200 animate-pulse h-15 rounded-md"></div>
          </div>
          <div className="w-full flex justify-center">
            <div className="mt-5 p-5 w-3/4 flex justify-center bg-gray-200 animate-pulse h-15 rounded-md"></div>
          </div>
        </div>
      ) : (
        <>
          <Menu
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1", "sub2", "sub3"]}
            mode="inline"
            theme="light"
            inlineCollapsed={state.collapsed}
            className="bg-white rounded-md"
          >
            {renderMenu()}
            <SubMenu
              icon={<LogoutOutlined />}
              title={"Đăng xuất"}
              key={"sub4"}
              className="w-full uppercase text-xs text-green-700 hover:text-green-900"
            >
              <Menu.Item key={7} className="text-xs">
                <NavLink to={'/trang-chu'} onClick={()=>{
                  dispatch({
                    type: LOGOUT
                  })
                }}>{'Đăng xuất'}</NavLink>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </>
      )}
    </div>
  );
}
