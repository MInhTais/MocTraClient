import * as yup from 'yup';

export const measureSchema = yup.object().shape({
    madvd: yup.string().trim().required("Vui lòng nhập mã đơn vị tính"),
    tendvd: yup.string().trim().required("Vui lòng nhập tên đơn vị tính")
});
