import * as yup from 'yup';

export const brandSchema = yup.object().shape({
    tenth: yup.string().required("Vui lòng nhập tên thương hiệu")
});
