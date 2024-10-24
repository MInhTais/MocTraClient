import * as yup from 'yup';

export const voucherSchema = yup.object().shape({
    tenloaigg: yup.string().trim().required("Vui lòng nhập tên loại giảm giá"),
    giagiam: yup.string().trim().nullable().required("Vui lòng nhập giá giảm của mã"),
    giatritoithieu: yup.string().trim().nullable().required("Vui lòng nhập giá trị tối thiểu sử dụng mã giảm giá"),
    
})