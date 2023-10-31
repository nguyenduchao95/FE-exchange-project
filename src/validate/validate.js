import * as Yup from "yup";
const exchangeSchema = Yup.object().shape({
    content: Yup.string()
        .required('Vui lòng không được để trống'),
    product: Yup.string()
        .required('Vui lòng chọn sản phẩm'),
})

const editAccountInfoSchema = Yup.object().shape({
    name: Yup.string()
        .required('Vui lòng không được để trống'),
    phone: Yup.string()
        .matches(/^(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b$/, 'Đây không phải là số điện thoại')
        .required('Vui lòng không được để trống'),
    avatar: Yup.string()
        .required('Vui lòng không được để trống'),
    address: Yup.string()
        .required('Vui lòng không được để trống'),
})

export {
    exchangeSchema,
    editAccountInfoSchema
};