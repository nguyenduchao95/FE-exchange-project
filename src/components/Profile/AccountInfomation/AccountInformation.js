import React, {useEffect, useState} from 'react';
import image_default from '../../../image/user-image.png';
import {getAccountById} from "../../../service/accountService";
import EditAccountInformation from "./EditAccountInformation";
import _ from "lodash";
import {formatDate} from "../../../service/format";
import {useSelector} from "react-redux";

const AccountInformation = () => {
    const [accountInfo, setAccountInfo] = useState({});
    const account = useSelector(state => state.account);

    useEffect(() => {
        getAccountById(account.id).then(response => {
            setAccountInfo(response.data);
        }).catch(error => {
            console.log(error)
        })
    }, [account])
    return (
        <div className="col-12 col-lg-9">
            <h3 className="text-center mb-4 text-uppercase mb-5">Thông tin cá nhân</h3>
            <div className="row">
                <div className="col-md-4">
                    <div className="d-flex flex-column align-items-center text-center px-3">
                        <span className="mb-2">Ảnh đại diện</span>
                        <img className="rounded-circle" width="300px" height="300px"
                             src={accountInfo.avatar ? accountInfo.avatar : image_default} alt="" id="image"
                             name="avatar"/>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="card">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item py-3">
                                Tên đăng nhập: {account.username}
                            </li>
                            <li className="list-group-item py-3">
                                Họ và tên: {accountInfo.name ? accountInfo.name : 'Chưa có thông tin'}
                            </li>
                            <li className="list-group-item py-3">
                                Ngày sinh: {accountInfo.dateOfBirth ? formatDate(accountInfo.dateOfBirth) : 'Chưa có thông tin'}
                            </li>
                            <li className="list-group-item py-3">
                                Địa chỉ: {accountInfo.address ? accountInfo.address : 'Chưa có thông tin'}
                            </li>
                            <li className="list-group-item py-3">
                                Email: {accountInfo.email}
                            </li>
                            <li className="list-group-item py-3">
                                Số điện thoại: {accountInfo.phoneNumber ? accountInfo.phoneNumber : 'Chưa có thông tin'}
                            </li>
                        </ul>
                    </div>
                </div>

                {!_.isEmpty(accountInfo) &&
                    <EditAccountInformation accountInfo={accountInfo}/>
                }
            </div>
        </div>
    );
};

export default AccountInformation;