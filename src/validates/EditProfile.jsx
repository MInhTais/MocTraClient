import * as yup from 'yup';

const express = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/
export const editprofileSchema = yup.object().shape({
    hoten: yup.string().trim().required("Vui lòng nhập họ tên"),
    ngaysinh: yup.date().nullable().required('Vui lòng nhập ngày sinh')
    .max(new Date(), 'Ngày sinh không được sau ngày hôm nay'),
    sdt: yup.string().trim().required("Vui lòng nhập số điện thoại").matches(express, "Số điện thoại không hợp lệ")
});
