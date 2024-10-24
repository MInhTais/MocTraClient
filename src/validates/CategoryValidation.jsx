import * as yup from 'yup';

export const categorySchema = yup.object().shape({
    tennhom: yup.string().trim().required("Vui lòng nhập tên nhóm"),
    mota: yup.string().trim().required("Vui lòng nhập mô tả")
});
