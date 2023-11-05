import React, {useEffect, useState} from 'react';
import Post from "./Post";
import {getAllPosts} from "../../service/postService";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import _ from "lodash";
import banner from '../../image/banner.jpg';

const HomePage = () => {
    const {account} = useSelector(state => state.myState)
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllPosts(currentPage - 1, 12, 'Chưa trao đổi').then(response => {
            setPosts(response.data.content);
            setTotalPages(response.data.totalPages);
        }).catch(error => console.log(error))
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }, [currentPage])

    const handleClick = () => {
        navigate("/create-post");
        window.scrollTo(0, 0);
    }

    const changePage = (e, value) => {
        setCurrentPage(value);
    }


    return (
        <>
            {!_.isEmpty(account) && account.role.name === "ROLE_USER" &&
                <button onClick={handleClick} className="flash-button">
                    Thêm bài viết
                </button>
            }
            <div className="image-container">
                <img className="img-fluid w-100" src={banner} style={{height: '350px'}} alt=""/>
            </div>
            <div className="container">
                <h2 className="text-center m-5">Danh sách sản phẩm trao đổi</h2>
                <Post posts={posts} totalPages={totalPages} changePage={changePage}/>
            </div>
        </>
    );
};

export default HomePage;