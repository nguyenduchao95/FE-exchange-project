import React, {useEffect, useState} from 'react';
import _ from "lodash";
import {Table} from "reactstrap";
import {Pagination} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import {formatDate} from "../../../service/format";
import {getAllPostsByAccountId} from "../../../service/accountService";
import {useSelector} from "react-redux";
import {Modal} from "react-bootstrap";
import {ErrorMessage, Field, Form, Formik} from "formik";
import axios from "axios";
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

    return (
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
                            <option value="Chưa trao đổi">Chưa trao đổi</option>
                            <option value="Chờ trao đổi">Chờ trao đổi</option>
                            <option value="Đã trao đổi">Đã trao đổi</option>
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

            <Link to="/create-post" className="btn btn-lg btn-primary mb-3">
                Thêm bài đăng
            </Link>

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
                                <Link to={`/edit-post/${item.id}`}
                                    className="btn border border-danger text-danger"
                                    style={{minWidth: '100px'}}>
                                    Sửa bài đăng
                                </Link>
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
    );
};

export default PostListByAccount;