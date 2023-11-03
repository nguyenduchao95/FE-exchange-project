import React, {useEffect, useRef, useState} from 'react';
import _ from "lodash";
import {Table} from "reactstrap";
import {Pagination} from "@mui/material";
import {getAllPosts} from "../../../service/postService";
import {Link, useNavigate} from "react-router-dom";
import {formatDate} from "../../../service/format";
import {getAllPostsByAccountId} from "../../../service/accountService";
import {useSelector} from "react-redux";
import {Modal} from "react-bootstrap";
import {ErrorMessage, Field, Form, Formik} from "formik";
import axios from "axios";
import PostUpload from "../PostList/PostUpload";
import ImageItem from "../PostList/ImageItem";
import * as Yup from "yup";
import CircularProgressWithLabel from "../PostList/CircularProgressWithLabel";
import ImageItemEdit from "../PostList/ImageItemEdit";
import Swal from "sweetalert2";

const PostListByAccount = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [title, setTitle] = useState("");
    const [status, setStatus] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [render, setRender] = useState(false);
    const account = useSelector(state => state.myState.account);

    const [avatarURL, setAvatarURL] = useState("");
    const [imagesURL, setImagesURL] = useState([])
    const [show, setShow] = useState(false);
    const [imagesFile, setImagesFile] = useState([]);
    const [images, setImages] = useState([]);
    const [postEdit, setPostEdit] = useState({});
    const [avatar, setAvatar] = useState({});
    const avatarRef = useRef(null);
    const [imagesURLEdit, setImagesURLEdit] = useState([]);
    const [imagesURLDelete, setImagesURLDelete] = useState([]);
    useEffect(() => {
        const data = {status, title, startDate, endDate};
        getAllPostsByAccountId(account.id, currentPage - 1, 10, data).then(response => {
            setPosts(response.data.content);
            setTotalPages(response.data.totalPages);
        }).catch(error => console.log(error));
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }, [currentPage, status, title, startDate, endDate, render])

    const changePage = (e, value) => {
        setCurrentPage(value);
    }

    const handleChangeStatus = (event) => {
        setStatus(event.target.value);
        setCurrentPage(1);
    }

    const handleChangeTitle = (event) => {
        setTitle(event.target.value);
        setCurrentPage(1);
    }

    const handleChangeStartDate = (event) => {
        setStartDate(event.target.value);
        setCurrentPage(1);
    }

    const handleChangeEndDate = (event) => {
        setEndDate(event.target.value);
        setCurrentPage(1);
    }

    const handleCloseModal = () => setShow(false);
    const handleShowModal = (id, item) => {
        setPostEdit(item);
        setImagesFile([]);
        axios.get('http://localhost:8080/api/posts/getImages/' + id).then(res => {
            setImages(res.data)
            setImagesURLEdit(res.data)
        }).catch(err => {
            console.log(err)
        });
        setShow(true);
    }
    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Vui lòng nhập tên sản phẩm'),
        avatar: Yup.mixed().required('Vui lòng chọn ảnh hiển thị'),
    });
    const handleAvatarChange = (event, values) => {
        const file = event.target.files[0];
        setAvatar(file);
        values.avatar = file.name;
    };

    const handleImageChange = (event, values) => {
        values.images = 'is valid';
        setImagesFile([...imagesFile, ...event.target.files]);
    };
    const handleOnSubmit = (values) => {
        let postDTO = {
            id: postEdit.id,
            title: values.title,
            category: values.category,
            description: values.description,
            requirement: values.requirement,
            address: values.address,
            avatar: avatarURL,
            images: imagesURL.concat(imagesURLEdit),
        }
        axios.post("http://localhost:8080/api/posts/editPost", postDTO,
            {
                headers: {
                    'Authorization': localStorage.getItem('token')
                },
            }).then(() => {
                setRender(!render);
                Swal.fire(
                    'Thành công!',
                    'Bài post của bạn đã được cập nhật!',
                    'success'
                ).then()
            }
        ).catch(err => {
                console.log(err)
                Swal.fire({
                    icon: 'error',
                    title: 'Thất bại...',
                    text: 'Bài post của bạn cập nhật thất bại!',
                })
            }
        )
    }
    return (
        <>
            <div className="col-9">
                <h3 className="text-uppercase text-center mb-5">Danh sách bài đăng</h3>
                <div className="mb-3 py-4 px-3"
                     style={{backgroundColor: "rgb(220,219,219)"}}>
                    <div className='row g-2'>
                        <div className="col-md-4">
                            <label className="form-label fw-medium">Trạng thái</label>
                            <select className="form-select py-2 border-0"
                                    onChange={handleChangeStatus}>
                                <option value="">Tất cả</option>
                                <option value="Đang hoạt động">Đang hoạt động</option>
                                <option value="Bị khóa">Bị khóa</option>
                            </select>
                        </div>

                        <div className="col-md-4">
                            <label className="form-label fw-medium">Tìm kiếm theo tên bài đăng</label>
                            <input type="text" className="form-control border-0 py-2"
                                   placeholder="Nhập từ khóa tìm kiếm"
                                   value={title}
                                   onChange={handleChangeTitle}/>
                        </div>

                        <div className="col-2">
                            <div className="text-center mb-2 fw-medium">Ngày bắt đầu</div>
                            <input type="date" className="form-control border-0 py-2"
                                   onChange={handleChangeStartDate}/>
                        </div>

                        <div className="col-2">
                            <div className="text-center mb-2 fw-medium">Ngày kết thúc</div>
                            <input type="date" className="form-control border-0 py-2"
                                   onChange={handleChangeEndDate}/>
                        </div>
                    </div>
                </div>

                <button className="btn btn-lg btn-primary mb-3 btn-add-product">
                    Thêm bài đăng
                </button>

                <Table hover>
                    <thead>
                    <tr align="center">
                        <th>STT</th>
                        <th>Tên bài đăng</th>
                        <th>Ngày đăng</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                    </tr>
                    </thead>
                    <tbody style={{verticalAlign: 'middle'}}>
                    {!_.isEmpty(posts) ?
                        posts.map((item, index) => (

                            <tr key={item.id} align="center">
                                <td>{index + 1}</td>
                                <td>
                                    <Link to={`/posts/${item.id}`} className="nav-link fw-medium text-start">
                                        <img className="img-thumbnail me-3" src={item.avatar} alt="" width={80}
                                             style={{height: 80}}/>
                                        {item.title}
                                    </Link>
                                </td>
                                <td>{formatDate(item.createdAt)}</td>
                                <td>{item.status}</td>
                                <td>
                                    <button
                                        className="btn border border-danger text-danger"
                                        style={{minWidth: '100px'}} onClick={() => handleShowModal(item.id, item)}>
                                        Sửa bài đăng
                                    </button>
                                </td>
                            </tr>
                        ))
                        :
                        <tr align="center">
                            <td colSpan="5" className="pt-3 fs-5 text-danger">Danh sách trống</td>
                        </tr>
                    }
                    </tbody>
                </Table>
                {totalPages > 0 ?
                    <div className="col-12 mt-5 d-flex justify-content-center">
                        <Pagination count={totalPages} size="large" variant="outlined" shape="rounded"
                                    onChange={changePage} color="primary"/>
                    </div>
                    :
                    null
                }
            </div>
            <Modal show={show} size="lg">
                <Formik
                    initialValues={{
                        title: postEdit ? postEdit.title : '',
                        category: postEdit ? postEdit.category : '',
                        description: postEdit ? postEdit.description : '',
                        requirement: postEdit ? postEdit.requirement : '',
                        address: postEdit ? postEdit.address : '',
                        avatar: postEdit ? postEdit.avatar : '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={values => {
                        handleOnSubmit(values);
                    }}
                >
                    {({values}) => (
                        <Form className="px-3 py-2">
                            <h3 className="m-0 text-uppercase text-primary">Thay đổi thông tin</h3>
                            <Modal.Body>
                                <div className="row">

                                    <div className="mb-3 col-5">
                                        <label htmlFor="name" className="form-label">Tên sản phẩm (<span
                                            className="text-danger">*</span>)</label>
                                        <Field type="text" className="form-control" id="name"
                                               placeholder="Nhập sản phẩm"
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
                                               name="address"
                                               placeholder="Nhập rõ địa chỉ thuận tiện cho việc trao đổi"/>
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
                                        <input type="file" className="form-control" id="avatar" name="avatar"
                                               ref={avatarRef}
                                               hidden={true}
                                               onChange={event => handleAvatarChange(event, values)}/>
                                        <label className={"btn btn-outline-danger"} htmlFor={"avatar"}>Chọn ảnh </label>
                                        <ErrorMessage name="avatar" className="text-danger" component="div"/>
                                        <div>
                                            <PostUpload file={avatar} avatarURL={postEdit.avatar}
                                                        setAvatarURL={setAvatarURL}
                                                        setAvatarFile={setAvatar} values={values}/>
                                        </div>
                                    </div>
                                    <div className="col-md-7 form-group mb-3">
                                        <label htmlFor="images" className="form-label">Ảnh sản phẩm</label>
                                        <input type="file" className="form-control" id="images" name="images"
                                               multiple={true}
                                               ref={avatarRef}
                                               hidden={true}
                                               onChange={event => handleImageChange(event, values)}/>
                                        <label className="btn btn-outline-danger" htmlFor="images">Chọn ảnh</label>

                                        <div>
                                            {!_.isEmpty(imagesURLEdit) && imagesURLEdit.map((item, index) => (
                                                <ImageItemEdit key={item.id} index={index} url={item.url}
                                                               setImageURLEdit={setImagesURLEdit} values={values}
                                                               imagesFile={imagesFile}
                                                               setImagesURLDelete={setImagesURLDelete}/>
                                            ))}
                                            <div>
                                                {!_.isEmpty(imagesFile) && imagesFile.map(file => (
                                                    <ImageItem file={file} setImagesFile={setImagesFile}
                                                               setImagesURL={setImagesURL} key={file}
                                                               imagesFile={imagesFile} values={values} houseId={1}/>
                                                ))}
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                                    Đóng
                                </button>
                                <button type="submit" className="btn btn-primary" >
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

export default PostListByAccount;