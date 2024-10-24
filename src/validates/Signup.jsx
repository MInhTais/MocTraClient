import * as yup from 'yup';

const expression = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
const expressionPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
export const signupSchema = yup.object().shape({
    tendn: yup
      .string()
      .required("Vui lòng nhập tên đăng nhập")
      .email("Không đúng định dạng mail"),
      matkhau: yup.string().trim().required("Vui lòng nhập mật khẩu").matches(expressionPassword,'Mật khẩu phải ít nhất 8 ký tự trong đó có 1 ký tự thường và 1 ký tự in hoa và ít nhất một số'),
    matkhauxn: yup.string().trim().required("Vui lòng nhập mật khẩu xác nhận").
    when("matkhau", {
      is: val => (val && val.length > 0 ? true : false),
      then: yup.string().oneOf(
        [yup.ref("matkhau")],
        "Mật khẩu xác nhận không khớp"
      )
    }),
    hoten: yup.string().required("Vui lòng nhập họ tên")
});

export const signupShopSchema = yup.object().shape({
  tenncc: yup.string().trim().required("Vui lòng nhập tên doanh nghiệp/cửa hàng").min(2, "Tên doanh nghiệp tối thiểu là 2 ký tự").max(50,"Tên doanh nghiệp tối đa 50 ký tự"),
  sdt: yup.string().trim().required("Vui lòng nhập số điện thoại").matches(expression,"Số điện thoại không hợp lệ"),
  diachi: yup.string().trim().required("Vui lòng nhập địa chỉ").min(15,"Vui lòng nhập đầy đủ địa chỉ").max(50,"Địa chỉ tối đa là 50 ký tự"),
  tencuahang: yup.string().trim().required("Vui lòng nhập tên cửa hàng").min(2,"Tên cửa hàng tối thiểu 2 kí tự").max(20, "Tên cửa hàng tối đa 20 ký tự"),
  chucuahang: yup.string().trim().required("Vui lòng nhập họ tên").min(4, "Họ tên tối thiểu 4 ký tự").max(30, "Họ tên tối đa 30 ký tự")
})