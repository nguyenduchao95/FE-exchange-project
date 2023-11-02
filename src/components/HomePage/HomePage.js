import React, {useEffect, useState} from 'react';
import Post from "./Post";
import {getAllPosts} from "../../service/postService";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import _ from "lodash";

const HomePage = () => {
    const {account} = useSelector(state => state.myState)
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    function handleClick() {
        navigate("/createPost");
        window.scrollTo(0, 0);
    }

    const changePage = (e, value) => {
        setCurrentPage(value);
    }

    useEffect(() => {
        getAllPosts(currentPage - 1).then(response => {
            setPosts(response.data.content);
            setTotalPages(response.data.totalPages);
        }).catch(error => console.log(error))
    }, [currentPage])


    return (<>
            {_.isEmpty(account) ? <></> : account.role.id === 2 && (
                <div>
                    <button onClick={handleClick} className="flash-button">Đăng sản phẩm</button>
                </div>
            )}
            <div className="container-home">

                <div className="container">
                    <h2 className="text-center m-5">Danh sách sản phẩm trao đổi</h2>
                    <Post posts={posts} totalPages={totalPages} changePage={changePage}/>
                </div>
            </div>

        </>
    );
};

export default HomePage;