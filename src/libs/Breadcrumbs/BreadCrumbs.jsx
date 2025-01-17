import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Breadcrumb } from "antd";

const BreadCrumbs = () => {
  const location = useLocation();
  const breadCrumbView = () => {
    const { pathname } = location;
    const pathnames = pathname.split("/").filter((item) => item);
    const capatilize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
    return (
      <div>
        <Breadcrumb separator=">" className='bg-gray-50 p-5 text-sm uppercase'>
          {pathnames.length > 0 ? (
            <Breadcrumb.Item>
              <Link to="/trang-chu">Trang chủ</Link>
            </Breadcrumb.Item>
          ) : (
            <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
          )}
          {pathnames.map((name, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
            const isLast = index === pathnames.length - 1;
            return isLast ? (
              <Breadcrumb.Item key={index}>{capatilize(name)}</Breadcrumb.Item>
            ) : (
              <Breadcrumb.Item key={index}>
                <Link to={`${routeTo}`}>{capatilize(name)}</Link>
              </Breadcrumb.Item>
            );
          })}
        </Breadcrumb>
      </div>
    );
  };

  return <>{breadCrumbView()}</>;
};

export default BreadCrumbs;