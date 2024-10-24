import { Result } from "antd";
import React from "react";
import { history } from "../../libs/History/history";

export default function PageNotFound(props) {
  return (
    <div className="flex flex-row flex-wrap w-full justify-center">
      <Result
        status="404"
        title="404"
        subTitle="Mộc Trà rất tiếc, dường như trang tìm không tồn tại. Vui lòng trở lại hoặc trang chủ hoặc liên hệ bộ phận CSKH để được trợ giúp."
        extra={<button className="button-3d-green" onClick={()=>{
          history.push('/trang-chu')
        }}>Trang chủ</button>}
      />
    </div>
  );
}
