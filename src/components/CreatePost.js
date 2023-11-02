import React, {useEffect, useState, useRef} from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from 'yup';


import {Link, useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";


const CreatePost = () => {
    const {account} = useSelector(state => state.myState);
    const [avatar, setAvatar] = useState('');
    const [selectedImages, setSelectedImages] = useState([]);

    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            setAvatar(e.target.result);
        };

        reader.readAsDataURL(file);
    };
    const handleImageChange = (event) => {
        const files = event.target.files;
        const images = [];

        for (let i = 0; i < files.length; i++) {
            const reader = new FileReader();
            reader.onload = (e) => {
                images.push(e.target.result);
                if (images.length === files.length) {
                    setSelectedImages(images);
                }
            };
            reader.readAsDataURL(files[i]);
        }
    };
    return (
        <>
            <div className="container " style={{marginTop: "50px"}}>
                <h2 className="text-center text-uppercase mb-5">Đăng bài Post trao đổi đồ</h2>
                <Formik
                    initialValues={{
                        title: '',
                        category: '',
                        description: '',
                        requirement: '',
                        address: account ? account.address : '',
                        avatar: avatar,
                    }}
                    validationSchema={
                        Yup.object().shape({
                            title: Yup.string().required('Vui lòng nhập tên sản phẩm'),
                            avatar: Yup.mixed().required('Vui lòng chọn ảnh hiển thị'),
                            images: Yup.array()
                                .max(3, 'Tối đa 3 ảnh được chọn')
                                .min(1,'Vui lòng chọn tối thiểu 1 ảnh')
                        })
                    }

                    onSubmit={values => {

                    }}>
                    {({values}) => (

                        <Form>
                            <div className="row" style={{marginLeft: "20%"}}>

                                <div className="mb-3 col-5">
                                    <label htmlFor="name" className="form-label">Tên sản phẩm (<span
                                        className="text-danger">*</span>)</label>
                                    <Field type="text" className="form-control" id="name" placeholder="Nhập sản phẩm"
                                           name="title"/>
                                    <ErrorMessage name="title" className="text-danger" component="div"/>
                                </div>

                                <div className="mb-3 col-5">
                                    <label htmlFor="name" className="form-label">Loại sản phẩm</label>
                                    <Field type="text" className="form-control" placeholder="Nhập thể loại"
                                           name="category"/>
                                </div>

                                <div className="col-md-5 mb-3">
                                    <label htmlFor="description" className="form-label">Địa chỉ muốn trao
                                        đổi</label>
                                    <Field as="textarea" type="text" className="form-control"
                                           name="address"/>
                                </div>
                                <div className="col-md-5 form-group mb-3">
                                    <label htmlFor="description" className="form-label">Yêu cầu/ Mong muốn </label>
                                    <Field as="textarea" type="text" className="form-control"
                                           name="description" placeholder="Nhập yêu cầu/ mong muốn của bạn"
                                    />
                                </div>
                                <div className="col-md-5 form-group mb-3">
                                    <label htmlFor="thumbnail" className="form-label">Ảnh hiển thị (<span
                                        className="text-danger">*</span>)</label>
                                    <Field type="file" className="form-control" id="avatar" name="avatar"
                                           hidden={true} onChange={handleAvatarChange}
                                    />
                                    <label className={"btn btn-outline-danger"} htmlFor={"avatar"}>Chọn ảnh </label>
                                    <ErrorMessage name="avatar" className="text-danger" component="div"/>

                                    {avatar && <div><img src={avatar}  style={{width:"100px"}}/></div>}
                                </div>
                                <div className="col-md-5 form-group mb-3">
                                    <label htmlFor="images" className="form-label">Ảnh sản phẩm (Tối đa 3 ảnh) (<span
                                        className="text-danger">*</span>)</label>
                                    <Field type="file" className="form-control" id="images" name="images" multiple hidden={true} onChange={handleImageChange} />
                                    <label className="btn btn-outline-danger" htmlFor="images">Chọn ảnh</label>
                                    <ErrorMessage name="images" className="text-danger" component="div"/>

                                    {selectedImages.length > 0 && (
                                        <div>
                                            {selectedImages.map((image, index) => (
                                                <img key={index} src={image} alt={`Selected Image ${index}`}
                                                style={{width:"100px"}}/>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className="col-md-3"></div>
                                <div className= "my-3 col-md-5" >
                                    <button type="submit" className="btn btn-lg btn-primary me-3"
                                            style={{minWidth: '120px'}}>
                                        Thêm bài post
                                    </button>
                                    <Link to="/" className="btn btn-lg btn-secondary"
                                          style={{minWidth: '120px'}}>
                                        Hủy
                                    </Link>
                                </div>
                            </div>

                        </Form>
                    )}
                </Formik>

            </div>

        </>
    )
        ;
};

export default CreatePost;