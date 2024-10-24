import * as yup from "yup";

export const eventSchema = yup.object().shape({
  tensk: yup.string().trim().required("Vui lòng nhập tên sự kiện"),
  gioihan: yup.string().trim().required("Vui lòng nhập số lần giới hạn"),
});

export const rewardSchema = yup.object().shape({
  phanthuong: yup.string().trim().required("Vui lòng nhập tên phần thưởng"),
});

export const rewardDetailSchema = yup.object().shape({
  tenchitiet: yup.string().trim().required("Vui lòng tên phần thưởng")
});

