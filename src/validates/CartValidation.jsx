import * as yup from 'yup';

export const cartSchema = yup.object().shape({
    quantity:yup.number()
    .typeError('Số lượng phải là số')
    .min(1, 'Số lượng tối thiểu phải là 1')
})