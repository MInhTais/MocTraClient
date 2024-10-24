import React from "react";
import styleLoading from "./LoadingComponent.module.css";
import logo from "../../images/loading.gif";
import { useSelector } from "react-redux";

export default function Loading() {
  const { isLoading } = useSelector((state) => state.LoadingReducer);
  if (isLoading) {
    return (
      <div className={styleLoading.bgLoading}>
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-green-600"></div>
      </div>
    );
  } else {
    return "";
  }
}
