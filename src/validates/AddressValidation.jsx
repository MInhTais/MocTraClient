import * as yup from 'yup';
const expressionPhone =/((09|03|07|08|05)+([0-9]{8})\b)/g;
export const addressSchema = yup.object().shape({
    hoten: yup.string().trim().required("Vui lòng nhập họ tên").min(4,'Họ tên tối thiểu là 4 kí tự'),
    sdt: yup.string().trim().required("Vui lòng nhập số điện thoại").matches(expressionPhone,'Số điện thoại không hợp lệ'),
    // tinh:yup.string().trim().required("Vui lòng chọn tỉnh"),
    // huyen:yup.string().trim().required("Vui lòng chọn huyện"),
    duong: yup.string().trim().required("Vui lòng nhập tên đường").min(5,'Tên đường tối thiểu 5 kí tự')
})