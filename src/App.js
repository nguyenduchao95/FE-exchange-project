import './App.scss';
import 'react-toastify/dist/ReactToastify.css';
import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import NavbarComponent from "./components/Navbar/NavbarComponent";
import Footer from "./components/Footer/Footer";
import HomePage from "./components/HomePage/HomePage";
import Component404 from "./components/404/Component404";
import Component403 from "./components/403/Component403";
import PostDetail from "./components/PostDetail/PostDetail";
import Profile from "./components/Profile/Profile";
import UserList from "./components/Profile/UserList/UserList";
import PostList from "./components/Profile/PostList/PostList";
import ChatBox from "./components/ChatBox/ChatBox";
import AccountInformation from "./components/Profile/AccountInfomation/AccountInformation";
import Login from "./components/Login-Register/Login";
import Register from "./components/Login-Register/Register";
import CreatePost from "./components/Profile/PostList/CreatePost";


function App() {
    return (
        <div className="App">
            <NavbarComponent/>
            <Routes>
                <Route path={"/"} element={<HomePage/>}/>
                <Route path={"/login"} element={<Login/>}/>
                <Route path={"/register"} element={<Register/>}/>
                <Route path={"/createPost"} element={<CreatePost/>}/>
                <Route path={"/posts/:postId"} element={<PostDetail/>}/>
                <Route path={'*'} element={<Navigate to="/404" replace />}/>
                <Route path="/404" element={<Component404/>}></Route>
                <Route path={'/403'} element={<Component403/>}></Route>
                <Route path="/chat" element={<ChatBox/>}/>
                <Route path={"/account/"} element={<Profile/>}>
                    <Route path="information" element={<AccountInformation/>}/>
                    <Route path={"manage-posts"} element={<PostList/>}/>
                    <Route path={"manage-users"} element={<UserList/>}/>
                </Route>
            </Routes>
            <Footer/>
        </div>
    );
}

export default App;
