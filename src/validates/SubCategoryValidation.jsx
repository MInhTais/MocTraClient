import * as yup from 'yup';

export const subCategorySchema = yup.object().shape({
    hinhanh:yup.string().trim().required("Vui lòng chọn hình ảnh"),
    tenloai: yup.string().trim().required("Vui lòng nhập tên loại"),
    mota: yup.string().trim().required("Vui lòng nhập mô tả")
});
