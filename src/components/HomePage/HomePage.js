import React, {useEffect, useState} from 'react';
import Post from "./Post";
import {getAllPosts} from "../../service/postService";

const HomePage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [posts, setPosts] = useState([]);

    const changePage = (e, value) => {
        setCurrentPage(value);
    }

    useEffect(() => {
        getAllPosts(currentPage - 1).then(response => {
            setPosts(response.data.content);
            setTotalPages(response.data.totalPages);
        }).catch(error => console.log(error))
    }, [currentPage])


    return (
        <div className="container-home">

            <div className="container">
                <h2 className="text-center m-5">Danh sách sản phẩm trao đổi</h2>
                <Post posts={posts} totalPages={totalPages} changePage={changePage}/>
            </div>
        </div>
    );
};

export default HomePage;