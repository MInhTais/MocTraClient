import React from "react";
import { useState } from "react";

export default function DemoHook() {
  const [state, setstate] = useState(1);

  return (
    <div>
      <button className="button-primary" onClick={() => {
        setstate((state+1) <= 10 ? state+1 : state);
      }}>
        Click Tăng
      </button>

      <button className="button-primary" onClick={() => {
        setstate((state-1)>=1 ? state-1 : state);
      }}>
        Click Giảm
      </button>

      <div className="mt-5 text-3xl font-bold">
        {state}
      </div>

    </div>
  );
}
