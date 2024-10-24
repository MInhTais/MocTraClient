import { Button, Result } from "antd";
import React from "react";

export default function ServerInternal() {
  return (
    <div>
      <Result
        status="500"
        title="500"
        subTitle="Sorry, something went wrong."
        extra={<Button type="primary">Back Home</Button>}
      />
    </div>
  );
}
