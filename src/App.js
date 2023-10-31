import './App.scss';
import 'react-toastify/dist/ReactToastify.css';
import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import NavbarComponent from "./components/Navbar/NavbarComponent";
import Footer from "./components/Footer/Footer";
import HomePage from "./components/HomePage/HomePage";
import Component404 from "./errorClient/Component404";
import Component403 from "./errorClient/Component403";
import PostDetail from "./components/PostDetail/PostDetail";
import Login from "./components/Login-Register/Login";
import Register from "./components/Login-Register/Register";


function App() {
    return (
        <div className="App">
            <NavbarComponent/>
            <Routes>
                <Route path={"/"} element={<HomePage/>}/>
                <Route path={"/login"} element={<Login/>}/>
                <Route path={"/register"} element={<Register/>}/>
                <Route path={"/posts/:postId"} element={<PostDetail/>}/>
                <Route path={'*'} element={<Navigate to="/404" replace />}/>
                <Route path="/404" element={<Component404/>}></Route>
                <Route path={'/403'} element={<Component403/>}></Route>
            </Routes>
            <Footer/>
        </div>
    );
}

export default App;
