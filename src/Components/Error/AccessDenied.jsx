import { Button, Result } from "antd";
import React from "react";
import { history } from "../../libs/History/history";

export default function AccessDenied() {
  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={<Button type="primary" onClick={()=>{
        history.push('/trang-chu')
      }}>Back Home</Button>}
    />
  );
}
