import React, {useEffect, useState} from 'react';
import StarsReview from "./StarsReview";
import './houseDetail.scss';
import _ from 'lodash';
import Images from "./Images";
import {Button, Modal} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {getAllImagesByPostId} from "../../service/imageService";
import {getPostById} from "../../service/postService";
const PostDetail = () => {
    const [images, setImages] = useState([]);
    const [post, setPost] = useState({});
    const {postId} = useParams();

    useEffect(()=>{
        if (postId) {
            getAllImagesByPostId(postId).then(response => {
                setImages(response.data);
            }).catch(error => console.log(error))

            getPostById(postId).then(response => {
                setPost(response.data);
            }).catch(error => console.log(error))
        }
    },[])

    return (
            <div className="container-fluid py-5 container-house-detail">
                <div className="row px-xl-5">
                    <div className="col-lg-6 pb-5">
                        {!_.isEmpty(images) &&
                            <Images images={images}/>
                        }
                    </div>

                    <div className="col-lg-5 ms-5 pb-5">
                        <h3 className="fw-semibold">{post.title}</h3>
                        <p className="mb-2">
                            Status: {post.status}
                        </p>

                        <p className="mb-2">
                            Người đăng: {post.account?.username}
                        </p>

                        <p className="mb-2">Địa chỉ: {post.address}</p>
                        <p className="mb-2">
                            Description: {post.description}
                        </p>

                        <p className="mb-2">
                            Request: {post.requirement}
                        </p>

                        <div className="d-flex align-items-center mb-4 pt-2">
                            <button className="btn btn-primary px-3 py-2">
                                Start to chat
                            </button>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default PostDetail;