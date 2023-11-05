import './App.scss';
import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import NavbarComponent from "./components/Navbar/NavbarComponent";
import Footer from "./components/Footer/Footer";
import HomePage from "./components/HomePage/HomePage";
import Component404 from "./components/404/Component404";
import Component403 from "./components/403/Component403";
import Profile from "./components/Profile/Profile";
import UserList from "./components/Profile/UserList/UserList";
import PostList from "./components/Profile/PostList/PostList";
import ChatBox from "./components/ChatBox/ChatBox";
import AccountInformation from "./components/Profile/AccountInfomation/AccountInformation";
import Login from "./components/Login-Register/Login";
import Register from "./components/Login-Register/Register";
import ChangePassword from "./components/Profile/ChangePassword/ChangePassword";
import PostListByAccount from "./components/Profile/PostListByAccount/PostListByAccount";
import ExchangeHistory from "./components/Profile/ExchangeHistory/ExchangeHistory";
import SavePost from "./components/Profile/PostListByAccount/CreateAndEditPost/SavePost";
import PostDetail from "./components/PostDetail/PostDetail";


function App() {
    return (
        <div className="App">
            <NavbarComponent/>
            <Routes>
                <Route path={"/"} element={<HomePage/>}/>
                <Route path={"/login"} element={<Login/>}/>
                <Route path={"/register"} element={<Register/>}/>
                <Route path={'*'} element={<Navigate to="/404" replace />}/>
                <Route path="/404" element={<Component404/>}></Route>
                <Route path={'/403'} element={<Component403/>}></Route>
                <Route path="/chat" element={<ChatBox/>}/>
                <Route path="/create-post" element={<SavePost/>}/>
                <Route path="/edit-post/:postId" element={<SavePost/>}/>
                <Route path="/posts/:postId" element={<PostDetail/>}/>
                <Route path={"/account/"} element={<Profile/>}>
                    <Route path="information" element={<AccountInformation/>}/>
                    <Route path="change-password" element={<ChangePassword/>}/>
                    <Route path="exchange-history" element={<ExchangeHistory/>}/>
                    <Route path="manage-posts-user" element={<PostListByAccount/>}/>
                    <Route path="manage-posts-admin" element={<PostList/>}/>
                    <Route path="manage-users" element={<UserList/>}/>
                </Route>
            </Routes>
            <Footer/>
        </div>
    );
}

export default App;
