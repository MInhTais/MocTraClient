import * as yup from 'yup';

export const productSchema = yup.object().shape({
    tensp: yup.string().trim().required("Vui lòng nhập tên sản phẩm"),
    gianhap: yup.string().trim().nullable().required("Vui lòng nhập đơn giá").min(1, "Số lượng phải lớn hơn bằng 1"),
    dongia: yup.string().trim().nullable().required("Vui lòng nhập đơn giá").min(1, "Số lượng phải lớn hơn bằng 1"),
    mota: yup.string().trim().required("Vui lòng nhập mô tả"),
    sanxuat: yup.string().trim().required("Vui lòng nhập nơi sản xuất"),
    sudung: yup.string().trim().required("Vui lòng nhập cách sử dụng"),
    baoquan: yup.string().trim().required("Vui lòng nhập cách bảo quản"),
    giamgia: yup.string().trim().required("Vui lòng nhập giảm giá"),
    hinhanh: yup.string().trim().required("Vui lòng chọn hình ảnh"),
    trongluong: yup.string().nullable().required("Vui lòng nhập trọng lượng")
    });

export const searchSchema = yup.object().shape({
  keyword: yup.string().trim().required("Vui lòng nhập từ khóa của bạn")
})

export const forbiddenProductSchema = yup.object().shape({
  lydo: yup.string().trim().required("Vui lòng nhập lý do khóa sản phẩm").min(10,"Lý do khóa sản phẩm tối thiểu là 10 ký tự")
})