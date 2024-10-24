import * as yup from "yup";

const expression = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
export const userSchema = yup.object().shape({
  tendn: yup
    .string().trim()
    .required("Vui lòng nhập tên đăng nhập")
    .email("Không đúng định dạng mail"),
  matkhau: yup.string().trim().required("Vui lòng nhập mật khẩu"),
  hoten: yup.string().trim().required("Vui lòng nhập họ tên"),
  ngaysinh: yup
    .date()
    .nullable()
    .required("Vui lòng nhập ngày sinh")
    .max(new Date(), "Ngày sinh không được sau ngày hôm nay"),
  tichdiem: yup.string().trim().required("Vui lòng nhập điểm").nullable(),
  sdt: yup
    .string().trim()
    .required("Vui lòng nhập số điện thoại")
    .matches(expression, "Số điện thoại không đúng quy định"),
});

export const userManagementSchema = yup.object().shape({
  tendn:yup.string().trim().required("Vui lòng nhập tên đăng nhập").email("Định dạng email không hợp lệ"),
  matkhau: yup.string().trim().required("Vui lòng nhập mật khẩu").min(5,"Mật khẩu tối thiểu là 5 ký tự"),
  hoten: yup.string().trim().required("Vui lòng nhập họ tên").min(5,"Họ tên tối thiểu 5 ký tự"),
  ngaysinh: yup
    .date()
    .nullable()
    .required("Vui lòng nhập ngày sinh")
    .max(new Date(), "Ngày sinh không được sau ngày hôm nay"),
  tichdiem: yup.string().nullable().required("Vui lòng nhập điểm"),
  sdt: yup
    .string().trim()
    .required("Vui lòng nhập số điện thoại")
    .matches(expression, "Số điện thoại không đúng quy định"),
});

export const userManagementSchemaEdit = yup.object().shape({
  hoten: yup.string().trim().required("Vui lòng nhập họ tên").min(5,"Họ tên tối thiểu 5 ký tự"),
  ngaysinh: yup
    .date()
    .nullable()
    .required("Vui lòng nhập ngày sinh")
    .max(new Date(), "Ngày sinh không được sau ngày hôm nay"),
  tichdiem: yup.string().nullable().required("Vui lòng nhập điểm"),
  sdt: yup
    .string().trim()
    .required("Vui lòng nhập số điện thoại")
    .matches(expression, "Số điện thoại không đúng quy định"),
});

export const roleSchema = yup.object().shape({
  mavt:yup.string().trim().required("Vui lòng nhập mã vai trò").min(2,"Mã vai trò tối thiểu 2 ký tự").max(10,"Tên vai trò tối thiểu 8 ký tự"),
  tenvt: yup.string().trim().required("Vui lòng nhập tên vai trò")
})

export const userFirstPopupSchema = yup.object().shape({
  tendn: yup.string().trim().required("Vui lòng nhập email").email("Địa chỉ email không hợp lệ")
})
