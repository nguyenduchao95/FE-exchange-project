import * as Yup from "yup";
import {checkEmail} from "../service/accountService";

const account = JSON.parse(localStorage.getItem("account"));
const exchangeSchema = Yup.object().shape({
    content: Yup.string()
        .required('Vui lòng không được để trống'),
    product: Yup.string()
        .required('Vui lòng chọn sản phẩm'),
})

const editAccountInfoSchema = Yup.object().shape({
    name: Yup.string()
        .required('Vui lòng không được để trống'),
    phoneNumber: Yup.string()
        .matches(/^(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b$/, 'Đây không phải là số điện thoại')
        .required('Vui lòng không được để trống'),
    email: Yup.string()
        .email('Email không hợp lệ')
        .test('unique', 'Email đã tồn tại', async (value) => {
            const isExist = await checkEmail({email: value});
            if(isExist.data){
                return isExist.data.username === account.username;
            }
            return true;
        })
        .required('Vui lòng nhập email'),
    dateOfBirth: Yup.date()
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