import * as yup from 'yup';

export const checkoutSchema = yup.object().shape({
    hoten: yup
      .string().trim()
      .required("Vui lòng nhập họ tên"),
    sdt: yup.string().trim().required("Vui lòng nhập số điện thoại"),
    diachi: yup.string().trim().required("Vui lòng nhập địa chỉ")
  });