import * as yup from "yup";
const expression = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
export const storeSchema = yup.object().shape({
  tencuahang: yup.string().trim().required("Vui lòng nhập tên cửa hàng"),
  sdt: yup.string().trim().required("Vui lòng nhập số điện thoại").matches(expression,'Số điện thoại không hợp lệ'),
  diachi: yup.string().trim().required("Vui lòng nhập địa chỉ").min(5,'Địa chỉ tối thiểu là 5 kí tự'),
});