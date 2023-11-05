import React, {useEffect, useState} from 'react';
import './postDetail.scss';
import _ from 'lodash';
import Images from "./Images";
import {Button, Modal} from "react-bootstrap";
import {Link, useNavigate, useParams} from "react-router-dom";
import {getAllImagesByPostId} from "../../service/imageService";
import {getPostById} from "../../service/postService";
import {Pagination} from "@mui/material";
import {useSelector} from "react-redux";
import {getAllPostsByAccountId} from "../../service/accountService";
import Swal from "sweetalert2";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {exchangeSchema} from "../../validate/validate";
import {createExchange} from "../../service/exchangeService";
import {formatDate} from "../../service/format";

const PostDetail = () => {
    const [images, setImages] = useState([]);
    const [post, setPost] = useState({});
    const [posts, setPosts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [product, setProduct] = useState({});
    const {postId} = useParams();
    const account = useSelector(state => state.myState.account);
    const navigate = useNavigate();

    useEffect(() => {
        if (postId) {
            getPostById(postId).then(response => {
                setPost(response.data);
                getAllImagesByPostId(postId).then(res => {
                    const avatarImage = {
                        id: res.data.length + 1,
                        url: response.data.avatar
                    }
                    setImages([avatarImage, ...res.data]);
                }).catch(error => console.log(error))
            }).catch(error => console.log(error))
        }
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }, [])

    useEffect(() => {
        if (account.id) {
            getAllPostsByAccountId(account.id, currentPage - 1, 6, {status: "Chưa trao đổi"})
                .then(response => {
                    setPosts(response.data.content);
                    setTotalPages(response.data.totalPages);
                })
                .catch(error => console.log(error))
        }
    }, [currentPage])

    const changePage = (e, value) => {
        setCurrentPage(value);
    }

    const handleShowModal = (post) => {
        if (!account.id) {
            Swal.fire({
                title: 'Vui lòng đăng nhập để trao đổi!',
                icon: 'error',
                showConfirmButton: true
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login');
                }
            })
            return;
        }

        if (post.account.id === account.id) {
            Swal.fire({
                title: 'Bạn là chủ của bài đăng này !',
                text: 'Vui lòng chọn bài đăng khác để trao đổi !',
                icon: 'error',
                showConfirmButton: true
            }).then();
            return;
        }
        setShowModal(true);
        setProduct({});
    }

    const handleChangeProduct = (values) => {
        if (_.isEmpty(product)) {
            Swal.fire({
                title: 'Vui lòng chọn sản phẩm trao đổi?',
                icon: 'error',
                showConfirmButton: true
            }).then();
            return;
        }
        const data = {
            content: values.content,
            postSell: {id: post.id},
            postBuy: {id: product.id}
        };
        createExchange(data).then(response => {
            Swal.fire({
                title: 'Lưu trao đổi sản phẩm thành công !',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
            }).then();
        }).catch(error => {
            console.log(error);
            Swal.fire({
                title: 'Lưu trao đổi sản phẩm thất bại !',
                icon: 'error',
                showConfirmButton: false,
                timer: 1500
            }).then();
        })
        setShowModal(false);
    }

    return (
        <div className="container-fluid py-5 container-post-detail">
            <div className="row px-xl-5">
                <div className="col-lg-6 pb-5">
                    {!_.isEmpty(images) &&
                        <Images images={images}/>
                    }
                </div>

                {!_.isEmpty(post) &&
                    <div className="col-lg-5 ms-5 pb-5">
                        <h3 className="fw-semibold">{post.title}</h3>
                        <p className="mb-2">
                            <span className="fw-medium">Trạng thái:</span> {post.status}
                        </p>

                        <p className="mb-2">
                            <span className="fw-medium">Người đăng:</span> {post.account?.username}
                        </p>

                        <p className="mb-2">
                            <span className="fw-medium">Địa chỉ:</span> {post.address}</p>
                        <p className="mb-2">
                            <span className="fw-medium">Mô tả:</span> {post.description}
                        </p>

                        <p className="mb-2">
                            <span className="fw-medium">Yêu cầu:</span> {post.requirement}
                        </p>

                        <p className="mb-2">
                            <span className="fw-medium">Số lượt xem:</span> {post.countView}
                        </p>

                        <p className="mb-2">
                            <span className="fw-medium">Ngày đăng bài:</span> {formatDate(post.createdAt)}
                        </p>

                        {post.status === 'Chưa trao đổi' &&
                            <button className="btn btn-primary btn-lg mt-3"
                                    onClick={() => handleShowModal(post)}>
                                <i className="fa-solid fa-rotate me-2"></i>Trao đổi
                            </button>
                        }
                    </div>
                }
            </div>

            <Modal
                size="lg"
                show={showModal}
                onHide={() => setShowModal(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Trao đổi sản phẩm
                    </Modal.Title>
                </Modal.Header>
                <Formik
                    initialValues={{
                        content: '',
                        product: '',
                    }}
                    validationSchema={exchangeSchema}
                    onSubmit={values => {
                        handleChangeProduct(values);
                    }}>
                    {({values}) => (
                        <Form>
                            <Modal.Body>
                                <div className="row p-2 mb-3">
                                    <div className="col-3">
                                        <label htmlFor="content" className="col-form-label fs-5 fw-medium">
                                            Nội dung trao đổi
                                        </label>
                                    </div>
                                    <div className="col-9">
                                        <Field as="textarea" id="content" className="form-control"
                                               placeholder="Nhập nội dung" name="content"/>
                                        <ErrorMessage name="content" className="text-danger" component="small"/>
                                    </div>
                                </div>
                                <div className="px-2 d-flex justify-content-between align-items-center">
                                    <h5 className="m-0">Hãy chọn sản phẩm để trao đổi</h5>
                                    <Link to="/create-post" className="btn btn-success">
                                        Thêm bài viết
                                    </Link>
                                </div>
                                {!_.isEmpty(posts) ?
                                    <ErrorMessage name="product" className="text-danger ps-2" component="small"/>
                                    :
                                    null
                                }
                                <div className="row g-4 mt-2" style={{minHeight: '400px'}}>
                                    {!_.isEmpty(posts) ?
                                        posts.map(item => (
                                            <div className="col-4 position-relative" key={item.id}
                                                 onClick={() => setProduct(item)}>
                                                <label htmlFor={`product-${item.id}`} className="d-block">
                                                    <p className="text-center fw-medium text-truncate px-1 mb-2"
                                                       style={{marginLeft: '40px'}}>
                                                        {item.title}
                                                    </p>
                                                    <img className="img-thumbnail" src={item.avatar} alt=""
                                                         style={{aspectRatio: '1/1'}}/>
                                                </label>
                                                <Field className="form-check position-absolute top-0"
                                                       type="radio" name="product" id={`product-${item.id}`}
                                                       value={item.id}
                                                       checked={item.id === +values.product}
                                                       style={{left: '30px', width: '20px', height: '20px'}}/>
                                            </div>
                                        ))
                                        :
                                        <div className="text-danger text-center">
                                            Bạn chưa có sản phẩm nào để trao đổi
                                        </div>
                                    }
                                </div>
                                {totalPages > 0 ?
                                    <div className="col-12 mt-3 d-flex justify-content-center">
                                        <Pagination count={totalPages} size="large" variant="outlined"
                                                    shape="rounded"
                                                    onChange={changePage} color="primary"/>
                                    </div>
                                    :
                                    null
                                }
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="primary" className="py-2 px-3" type="submit">
                                    Trao đổi
                                </Button>

                                <Button variant="secondary" className="py-2 px-3"
                                        onClick={() => setShowModal(false)}>
                                    Đóng
                                </Button>
                            </Modal.Footer>
                        </Form>
                    )}
                </Formik>
            </Modal>
        </div>
    );
};

export default PostDetail;