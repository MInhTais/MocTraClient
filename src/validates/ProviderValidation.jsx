import * as yup from 'yup';

const express = /(84|0[2|3|5|7|8|9])+([0-9]{8})\b/g
export const providerSchema = yup.object().shape({
    tenncc: yup.string().trim().required("Vui lòng nhập tên nhà cung cấp"),
    sdt: yup.string().trim().required("Vui lòng nhập số điện thoại").matches(express, "Số điện thoại không hợp lệ"),
    diachi: yup.string().trim().required("Vui lòng nhập địa chỉ"),
  });

  export const partnerSchema = yup.object().shape({
    tencuahang: yup.string().trim().required("Vui lòng nhập tên cửa hàng"),
    chucuahang: yup.string().trim().required("Vui lòng nhập họ tên"),
  });

