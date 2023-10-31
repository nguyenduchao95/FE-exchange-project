import React from 'react';
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";

const Sidebar = () => {
    const account = useSelector(state => state.account);

    return (
        <div
            className="col-3 border-end py-3 bg-light">
            <aside className="left-sidebar" style={{height: '80vh'}}>
                <div>
                    <nav className="list-group row">
                        <ul id="sidebarnav">
                            <li className="px-3 py-2">
                                <NavLink to="/account/information"
                                         className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
                                    <i className="fa-solid fa-user me-3"></i>
                                    Thông tin cá nhân
                                </NavLink>
                            </li>
                            <li className="px-3 py-2">
                                <NavLink to="/account/change-password"
                                         className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
                                    <i className="fa-solid fa-rotate me-3"></i>
                                    <span className="hide-menu">Đổi mật khẩu</span>
                                </NavLink>
                            </li>

                            <li className="px-3 py-2">
                                <NavLink to="/account/manage-posts"
                                         className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
                                    <i className="fa-solid fa-rectangle-list me-3"></i>
                                    <span className="hide-menu">Quản lý các bài đăng</span>
                                </NavLink>
                            </li>

                            <li className="px-3 py-2">
                                <NavLink to="/account/manage-users"
                                         className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
                                    <i className="fa-solid fa-address-card me-3"></i>
                                    <span className="hide-menu">Quản lý các người dùng</span>
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>
        </div>
    );
};

export default Sidebar;