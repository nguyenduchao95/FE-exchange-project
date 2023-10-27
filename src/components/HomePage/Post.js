import React from 'react';
import _ from 'lodash';
import {Pagination} from "@mui/material";
import {Link} from "react-router-dom";

const Post = ({posts, totalPages, changePage}) => {

    return (
        <div className="container">
            <div className="row g-4">
                {
                    !_.isEmpty(posts) && posts.map(post => {
                        return (
                            <div className="col-3" key={post.id}>
                                <div className="border rounded overflow-hidden">
                                    <Link to={`/posts/${post.id}`} className="nav-link">
                                        <div className="position-relative overflow-hidden">
                                            <div>
                                                <img height={273} width={406} src={post.avatar} alt=""/>
                                            </div>
                                        </div>
                                        <div className="p-4 pb-0">
                                            <h5 className="mb-2 text-center text-truncate">{post.title}</h5>
                                            <p className="text-truncate">
                                                <i className="fa fa-map-marker-alt me-2 color-primary"></i>
                                                {post.address}
                                            </p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        )
                    })
                }

                <div className="col-12 mt-5 d-flex justify-content-center">
                    <Pagination count={totalPages} size="large" variant="outlined" shape="rounded"
                                onChange={changePage} color="primary"/>
                </div>
            </div>
        </div>
    )
};

export default Post;