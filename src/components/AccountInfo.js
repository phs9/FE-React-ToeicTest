import React, {useEffect, useState} from "react";
import logo from "../logo.svg";
import {useNavigate} from "react-router-dom";
import {HTTP} from "../http-common";

export default function AccountInfo() {

    let navigate = useNavigate();

    const [account, setAccount] = useState({
        email: '',
        fullName: '',
        //password: '',
        phone: '',
        address: '',
        role: 'ROLE_USER'
    })

    useEffect(() => {
        HTTP.get('/accInfo').then((res) => {
            setAccount(res.data);
            console.log(res.data);
        }).catch((error) => {
            console.log(error)
        })
    },[])

    return (
        <>
            <div style={{marginTop: -50}}>
                <main className="d-flex w-100">
                    <div className="container d-flex flex-column">
                        <div className="row vh-100">
                            <div className="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-25">
                                <div className="d-table-cell align-middle">
                                    <div className="text-center mt-4">
                                        <p className="lead">
                                            Thông tin tài khoản
                                        </p>
                                    </div>
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="m-sm-4">

                                                <form>
                                                    <div className="mb-3">
                                                        <label className="form-label">Email</label>
                                                        <input className="form-control form-control-lg" type="email" disabled
                                                               name="email" placeholder="Nhập Email"
                                                               value={account.email}
                                                               onChange={(e) => {
                                                                   setAccount(prevState => {
                                                                       return {...prevState, email: e.target.value}
                                                                   })
                                                               }}/>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label">Họ và tên</label>
                                                        <input className="form-control form-control-lg" type="text"
                                                               name="fullName" placeholder="Nhập họ tên đầy đủ"
                                                               value={account.fullName}
                                                               onChange={(e) => {
                                                                   setAccount(prevState => {
                                                                       return {...prevState, fullName: e.target.value}
                                                                   })
                                                               }}/>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label">Số điện thoại</label>
                                                        <input className="form-control form-control-lg" type="text"
                                                               name="phone" placeholder="Nhập số điện thoại"
                                                               value={account.phone}
                                                               onChange={(e) => {
                                                                   setAccount(prevState => {
                                                                       return {...prevState, phone: e.target.value}
                                                                   })
                                                               }}/>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label">Địa chỉ</label>
                                                        <input className="form-control form-control-lg" type="text"
                                                               name="address" placeholder="Nhập địa chỉ"
                                                               value={account.address}
                                                               onChange={(e) => {
                                                                   setAccount(prevState => {
                                                                       return {...prevState, address: e.target.value}
                                                                   })
                                                               }}/>
                                                    </div>
                                                    <div className="mb-3">
                                                        Phân quyền: <div
                                                        className={account.role === 'ROLE_ADMIN' ? "badge bg-primary" : (account.role === 'ROLE_USER' ? "badge bg-success" : "badge bg-warning")}
                                                    >{account.role.substring(5,account.role.length)}</div>
                                                    </div>
                                                    <div className="text-center mt-3">
                                                        {/*<a href="index.html" className="btn btn-lg btn-primary">Sign in</a>*/}
                                                        <button type="submit" className="btn btn-lg btn-primary"

                                                        >Lưu
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}