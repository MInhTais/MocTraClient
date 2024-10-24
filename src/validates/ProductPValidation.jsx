import * as yup from 'yup';

export const productPSchema = yup.object().shape({
    tensp: yup.string().trim().required("Vui lòng nhập tên sản phẩm"),
    dongia: yup.string().trim().nullable().required("Vui lòng nhập đơn giá").min(1, "Số lượng phải lớn hơn bằng 1"),
    soluong: yup.number().nullable().required("Vui lòng nhập số lượng").positive("Vui lòng nhập số dương").integer("Vui lòng nhập số nguyên"),
    trongluong: yup.string().trim().nullable().required("Vui lòng nhập trọng lượng"),
    ngayhethan: yup.date().nullable(false)
    .min(new Date(), 'Ngày hết hạn không được sau ngày hôm nay')
  });