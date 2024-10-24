import * as yup from 'yup';

export const carouselSchema = yup.object().shape({
    hinhanh:yup.string().trim().required("Vui lòng chọn hình ảnh"),
    mota: yup.string().trim().required("Vui lòng nhập mô tả")
})