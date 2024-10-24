import * as yup from 'yup';
export const reviewSchema = yup.object().shape({
    noidung: yup.string().trim().required("Vui lòng nhập nội dung")
});

export const replySchema = yup.object().shape({
    noidung: yup.string().trim().required("Vui lòng nhập nội dung")
})

export const reportSchema = yup.object().shape({
    noidung:yup.string().trim().required("Vui lòng nhập lý do bạn báo cáo sản phẩm này")
})