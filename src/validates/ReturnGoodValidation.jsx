import * as yup from 'yup';
export const ReturnGoodSchema = yup.object().shape({
    noidung: yup.string().trim().required("Vui lòng nhập nội dung")
  });