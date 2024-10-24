import * as yup from 'yup';

const expressionPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
export const loginSchema = yup.object().shape({
    tendn: yup.string().trim()
      .required("Vui lòng nhập tên đăng nhập")
      .email("Không đúng định dạng mail"),
    matkhau: yup.string().trim().required("Vui lòng nhập mật khẩu"),
  });

export const forgetSchema = yup.object().shape({
  tendn:yup.string().trim().required("Vui lòng nhập email").email("Email không đúng định dạng")
})

export const newpwdSchema = yup.object().shape({
  matkhau: yup.string().trim().required("Vui lòng nhập mật khẩu").matches(expressionPassword,'Mật khẩu phải ít nhất 8 ký tự trong đó có 1 ký tự thường và 1 ký tự in hoa và ít nhất một số'),
  mkxn: yup.string().trim().required("Vui lòng nhập mật khẩu xác nhận").
  when("matkhau", {
    is: val => (val && val.length > 0 ? true : false),
    then: yup.string().trim().oneOf(
      [yup.ref("matkhau")],
      "Mật khẩu xác nhận không khớp"
    )
  })
});
