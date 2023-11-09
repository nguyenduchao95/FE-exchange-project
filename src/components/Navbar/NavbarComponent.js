import './navbar.scss';
import icon_house from '../../image/icons8-product.gif';
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import _ from 'lodash';
import icon_user from '../../image/icons8-user-50.png';
import image_default from '../../image/user-image.png';
import {format} from "date-fns";
import {changeLocationAccount} from "../../service/accountService";
import {useEffect, useState} from "react";
import {countUnreadMessagesByReceiverId} from "../../service/messageService";
import {countUnreadMessage, editAccount, removeAccount} from "../../redux/reducer/accountSlice";
import Swal from "sweetalert2";

const Navbar = () => {
    const [keySearch, setKeySearch] = useState("");
    const {unreadMessage, unreadNotify, notifyList, account} = useSelector(state => state.myState);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (account.id) {
            countUnreadMessagesByReceiverId(account.id).then(response => {
                dispatch(countUnreadMessage(response.data));
            }).catch(error => {
                console.log(error);
            })
        }
    }, [account])
    const handleLogout = () => {
        dispatch(removeAccount());
        localStorage.removeItem('account');
    }

    const handleSearch = () => {
        if (keySearch) {
            navigate(`/search?key=${keySearch}`);
            setKeySearch("");
        }
    }

    const pressEnterToSearch = (event) => {
        if (event.key === 'Enter')
            handleSearch();
    }

    const handleSearchAroundHere = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const data = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    }
                    console.log(account)
                    if (account.id) {
                        changeLocationAccount(account.id, data).then(response => {
                            const newAccount = response.data;
                            newAccount.token = account.token;
                            if (JSON.stringify(account) !== JSON.stringify(newAccount)) {
                                dispatch(editAccount(newAccount));
                                localStorage.setItem("account", JSON.stringify(newAccount));
                            }
                            navigate("/search-around-here");
                        }).catch(error => console.log(error))
                    } else {
                        navigate("/search-around-here");
                    }
                },
                error => {
                    Swal.fire({
                        title: 'Vui lòng bật định vị để tìm kiếm!',
                        icon: 'warning',
                        showConfirmButton: true,
                    }).then();
                }
            );
        } else {
            Swal.fire({
                title: 'Trình duyệt không hỗ trợ lấy vị trí!',
                icon: 'error',
                showConfirmButton: true,
            }).then();
        }
    }

    return (
        <>
            <div className="container-fluid nav-bar py-2 mb-5 sticky-top">
                <nav className="navbar-light py-2 px-4 d-flex justify-content-between align-items-center">
                    <Link to={"/"} className="navbar-brand d-flex align-items-center text-center">
                        <div className="me-2">
                            <img className="img-fluid" src={icon_house} alt="Icon"/>
                        </div>
                        <h2 style={{color: "rgb(0,185,142)"}}>EXCHANGE</h2>
                    </Link>
                    <div style={{width: '30%'}}>
                        <div className="d-flex justify-content-center align-items-center">
                            <input type="text" className="form-control py-2"
                                   placeholder="Nhập từ khóa tìm kiếm" value={keySearch}
                                   onChange={event => setKeySearch(event.target.value)}
                                   onKeyDown={pressEnterToSearch}/>
                            <button className="btn border-secondary ms-2"
                                    onClick={handleSearch}>
                                <i className="fa-solid fa-search"></i>
                            </button>
                        </div>
                    </div>
                    <button className="btn border-secondary"
                            onClick={handleSearchAroundHere}>
                        <i className="fa-solid fa-location-crosshairs me-2"></i>
                        Tìm kiếm quanh đây
                    </button>
                    <div className="navbar-nav navbar-custom">
                        {_.isEmpty(account) ?
                            <Link to="/login" className="nav-item nav-link">
                                <i className="bi bi-box-arrow-in-right me-2"></i>Đăng nhập
                            </Link>
                            :
                            <div className="d-flex align-items-center">
                                <div className="nav-item dropdown">
                                    <button className="dropdown-toggle nav-link d-flex align-items-center"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false">
                                        <img className="img-thumbnail rounded-circle me-2"
                                             src={account.avatar ? account.avatar : icon_user} alt=""
                                             width={40} style={{height: '40px'}}/>
                                        {account.name ? account.name : ''}
                                    </button>

                                    <ul className="dropdown-menu">
                                        <li className="p-1 px-3">
                                            <Link to="/account/information" className="dropdown-item nav-link">
                                                <i className="fa-solid fa-address-card me-2"></i>Trang cá nhân
                                            </Link>
                                        </li>
                                        <li className="p-1 px-3">
                                            <Link to="/" className="dropdown-item nav-link" onClick={handleLogout}>
                                                <i className="fa-solid fa-power-off me-2"></i>Đăng xuất
                                            </Link>
                                        </li>
                                    </ul>
                                </div>

                                <div className="nav-item ms-3">
                                    <Link to="/chat" className="nav-link position-relative">
                                        <i className="bi bi-messenger"></i>
                                        {unreadMessage ?
                                            <sup
                                                className="badge text-white bg-danger position-absolute top-0 start-50"
                                                style={{fontSize: '10px'}}>
                                                {unreadMessage > 5 ? '5+' : unreadMessage}
                                            </sup>
                                            :
                                            null
                                        }
                                    </Link>
                                </div>


                                <div className="nav-item dropdown ms-2">
                                    <button className="nav-link dropdown-toggle" data-bs-toggle="dropdown"
                                    >
                                        <i className="bi bi-bell-fill"></i>
                                        {unreadNotify ?
                                            <sup
                                                className="badge text-white bg-danger position-absolute top-0 start-50"
                                                style={{fontSize: '10px'}}>
                                                {unreadNotify > 5 ? '5+' : unreadNotify}
                                            </sup>
                                            :
                                            null
                                        }
                                    </button>
                                    {!_.isEmpty(notifyList) ?
                                        <div className="dropdown-menu dropdown-notify">
                                            {notifyList.map(item => (
                                                <Link to={`/${item.navigate}`}
                                                      className="d-flex align-items-center py-2 px-3 dropdown-notify-item"
                                                      key={item.id}>
                                                    <img className="img-thumbnail rounded-circle"
                                                         src={item.sender.avatar ? item.sender.avatar : image_default}
                                                         alt="" width={50}
                                                         style={{height: '50px'}}/>
                                                    <div className="d-flex flex-column ms-3">
                                                        <p className="mb-2 message-title">
                                                            {item.message}
                                                        </p>
                                                        <small className="fst-italic" style={{fontSize: '12px'}}>
                                                            <i className="bi bi-clock me-1"></i>{format(new Date(item.createAt), "dd/MM/yyyy")}
                                                        </small>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                        :
                                        <div className="dropdown-menu d-none"></div>
                                    }
                                </div>
                            </div>
                        }
                    </div>
                </nav>
            </div>
        </>
    );
};

export default Navbar;
