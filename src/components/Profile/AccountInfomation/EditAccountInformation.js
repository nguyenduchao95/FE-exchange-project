import React, {useContext, useEffect, useRef, useState} from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";
import _ from "lodash";
import {editAccountInfoSchema} from "../../../validate/validate";
import AvatarUpload from "./Avatar/AvatarUpload";
import {editAccountInformation} from "../../../service/accountService";
import Swal from "sweetalert2";
import {Modal} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {editAccount} from "../../../redux/actions";

const EditAccountInformation = ({accountInfo}) => {
    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarURL, setAvatarURL] = useState(accountInfo.avatar ? accountInfo.avatar : "");
    const [show, setShow] = useState(false);

    const account = useSelector(state => state.account);
    const dispatch = useDispatch();

    const avatarRef = useRef(null);

    const handleChangeAvatar = (event, values) => {
        const file = event.target.files[0];
        setAvatarFile(file);
        values.avatar = file.name;
        if (avatarRef) avatarRef.current.value = null;
    }

    const handleEditAccountInfo = (values) => {
        const data = {...accountInfo, ...values};
        data.avatar = avatarURL;
        editAccountInformation(accountInfo.id, data).then(response => {
            account.avatar = avatarURL;
            dispatch(editAccount(account))
            Swal.fire({
                icon: 'success',
                title: 'Cập nhật thông tin thành công!',
                showConfirmButton: false,
                timer: 1500
            }).then();
        }).catch(error => {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Cập nhật thông tin thất bại!',
                showConfirmButton: false,
                timer: 1500
            }).then();
        })
        handleCloseModal();
    }

    const handleCloseModal = () => setShow(false);
    const handleShowModal = () => setShow(true);
    return (
        <>
            <div className="mt-3 text-center">
                <button className="btn btn-primary" onClick={handleShowModal}>
                    Sửa thông tin
                </button>
            </div>

            <Modal show={show} onHide={handleCloseModal} size="lg">
                <Formik
                    initialValues={{
                        name: accountInfo.name ? accountInfo.name : "",
                        phoneNumber: accountInfo.phoneNumber ? accountInfo.phoneNumber : "",
                        email: accountInfo.email ? accountInfo.email : "",
                        dateOfBirth: accountInfo.dateOfBirth ? accountInfo.dateOfBirth : "",
                        avatar: accountInfo.avatar ? accountInfo.avatar : "",
                        address: accountInfo.address ? accountInfo.address : "",
                    }}
                    validationSchema={editAccountInfoSchema}
                    onSubmit={values => {
                        handleEditAccountInfo(values);
                    }}
                >
                    {({values}) => (
                        <Form className="px-3 py-2">
                            <Modal.Header closeButton>
                                <h3 className="m-0 text-uppercase text-primary">Thay đổi thông tin</h3>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="row">
                                    <div className="mb-3 col-6 col-sm-4">
                                        <label htmlFor="name" className="form-label">Họ và tên</label>
                                        <Field type="text" className="form-control" id="name"
                                               placeholder="Nhập họ và tên" name="name"/>
                                        <ErrorMessage name="name" className="text-danger"
                                                      component="small"/>
                                    </div>

                                    <div className="mb-3 col-6 col-sm-4">
                                        <label htmlFor="dateOfBirth" className="form-label">Ngày sinh</label>
                                        <Field type="date" className="form-control" id="dateOfBirth"
                                               placeholder="Chọn ngày tháng năm" name="dateOfBirth"/>
                                        <ErrorMessage name="dateOfBirth" className="text-danger"
                                                      component="small"/>
                                    </div>

                                    <div className="mb-3 col-6">
                                        <label htmlFor="phoneNumber" className="form-label">
                                            Số điện thoại
                                        </label>
                                        <Field type="text" className="form-control" id="phoneNumber"
                                               placeholder="Nhập số điện thoại" name="phoneNumber"/>
                                        <ErrorMessage name="phoneNumber" className="text-danger"
                                                      component="small"/>
                                    </div>

                                    <div className="mb-3 col-12 col-sm-6">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <Field type="email" className="form-control" id="email"
                                               placeholder="Nhập email" name="email"/>
                                        <ErrorMessage name="email" className="text-danger" component="small"/>
                                    </div>

                                    <div className="col-12 col-sm-6 form-group mb-3">
                                        <label className="form-label" htmlFor="address">
                                            Địa chỉ
                                        </label>
                                        <Field className="form-control" id="address" type="text"
                                               placeholder="Nhập địa chỉ" name="address"/>
                                        <ErrorMessage name="address" className="text-danger"
                                                      component="small"/>
                                    </div>

                                    <div className="col-12 col-sm-6 mb-3">
                                        <label htmlFor="avatar" className="form-label">Ảnh đại diện</label>
                                        <input type="file" className="form-control" id="avatar" name="avatar"
                                               ref={avatarRef}
                                               onChange={event => handleChangeAvatar(event, values)}/>
                                        <ErrorMessage name="avatar" className="text-danger" component="small"/>
                                        <AvatarUpload file={avatarFile} avatarURL={avatarURL}
                                                      setAvatarURL={setAvatarURL}
                                                      setAvatarFile={setAvatarFile} values={values}/>
                                    </div>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                                    Đóng
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    Cập nhật
                                </button>
                            </Modal.Footer>
                        </Form>
                    )}
                </Formik>
            </Modal>
        </>
    );
};

export default EditAccountInformation;