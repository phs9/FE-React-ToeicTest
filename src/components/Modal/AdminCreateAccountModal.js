import React, {useEffect, useState} from "react";
import {Modal} from "react-bootstrap";
import {HTTP} from "../../http-common";

window.editID = 0;

export default function AdminCreateAccountModal(props) {
    const [show, setShow] = useState(false);
    const [account, setAccount] = useState({
        email: '',
        fullName: '',
        password: '',
        phone: '',
        address: '',
        role: ''
    })
    const handleClose = () => {setShow(false); window.editID=0;}
    const handleShow = () => {
        setShow(true);
    }

    useEffect(() => {
        if (window.editID != 0) {
            HTTP.get('/admin/account/' + window.editID).then((res) => {
                setAccount({
                    id: window.editID,
                    email: res.data.email,
                    fullName: res.data.fullName,
                    phone: res.data.phone,
                    address: res.data.address,
                    role: 'ROLE_' + res.data.role
                })
                //console.log(account);
            }).catch((error) => {
                console.log(error)
            })
        } else setAccount({
            email: '',
            fullName: '',
            password: '',
            phone: '',
            address: '',
            role: 'ROLE_USER'
        })
    },[window.editID])

    window.ShowCreateAcc = handleShow;

    function CreatAccount() {
        if (window.editID === 0) {
            HTTP.post('/admin/account', account).then((res) => {
                console.log(res.data);
                window.ShowAlert('success', 'Tạo tài khoản thành công');
                props.Reload();
            }).catch((error) => {
                console.log(error);
                window.ShowAlert('danger', 'Tạo tài khoản không thành công');
            })
        } else {
            HTTP.put('/admin/account/' +account.id, account).then((res) => {
                console.log(res.data);
                window.ShowAlert('success', 'Sửa thông tin tài khoản thành công');
                props.Reload();
            }).catch((error) => {
                console.log(error);
                window.ShowAlert('danger', 'Sửa thông tin tài khoản không thành công');
            })
        }
    }

    console.log(account)
    return (
        <>
            <Modal show={show} onHide={handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter"
                   centered>
                <Modal.Header closeButton>
                    <Modal.Title>Tạo tài khoản</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="row">
                            <div className="mb-3 col-6">
                                <label className="form-label">Email</label>
                                <input className="form-control form-control-lg" type="email"
                                       name="email" placeholder="Nhập địa chỉ email"
                                       value={account.email}
                                       onChange={(e) => {
                                           setAccount(prevState => {
                                               return {...prevState, email: e.target.value}
                                           })
                                       }}
                                />
                            </div>
                            <div className="mb-3 col-6">
                                <label className="form-label">Tên đầy đủ</label>
                                <input className="form-control form-control-lg" type="text"
                                       name="fullName" placeholder="Nhập họ tên đầy đủ"
                                       value={account.fullName}
                                       onChange={(e) => {
                                           setAccount(prevState => {
                                               return {...prevState, fullName: e.target.value}
                                           })
                                       }}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="mb-3 col-4">
                                <label className="form-label">Số điện thoại</label>
                                <input className="form-control form-control-lg" type="tẽt"
                                       name="phone" placeholder="Nhập số điện thoại"
                                       value={account.phone}
                                       onChange={(e) => {
                                           setAccount(prevState => {
                                               return {...prevState, phone: e.target.value}
                                           })
                                       }}
                                />
                            </div>
                            <div className="mb-3 col-8">
                                <label className="form-label">Địa chỉ</label>
                                <input className="form-control form-control-lg" type="text"
                                       name="address" placeholder="Nhập địa chỉ"
                                       value={account.address}
                                       onChange={(e) => {
                                           setAccount(prevState => {
                                               return {...prevState, address: e.target.value}
                                           })
                                       }}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6" hidden={window.editID != 0}>
                                <div className="mb-3">
                                    <label className="form-label">Password</label>
                                    <input className="form-control form-control-lg" type="password"
                                           name="password" placeholder="Nhập password"
                                           onChange={(e) => {
                                               setAccount(prevState => {
                                                   return {...prevState, password: e.target.value}
                                               })
                                           }}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Nhập lại Password</label>
                                    <input className="form-control form-control-lg" type="password"
                                           name="password" placeholder="Nhập lại password"
                                    />
                                </div>
                            </div>
                            <div className="col-6">
                                <label className="form-label">Quyền tài khoản</label>
                                <div className="input-group radio-form mb-3 pb-2 row justify-content-around" style={{
                                    border: "1px solid lightgray",
                                    borderRadius: "12px"
                                }}>
                                    <div className=" mt-2">
                                        <input
                                            type="radio"
                                            id="role1"
                                            name="role"
                                            value="ROLE_ADMIN"
                                            checked={account.role === 'ROLE_ADMIN'}
                                            onChange={(e) => {
                                                setAccount(prevState => {
                                                    return {...prevState, role: e.target.value}
                                                })
                                            }}
                                        />
                                        <label htmlFor="role1">ADMIN</label>
                                    </div>
                                    <div className=" mt-2">
                                        <input
                                            type="radio"
                                            id="role2"
                                            name="role"
                                            value="ROLE_USER"
                                            checked={account.role === 'ROLE_USER'}
                                            onChange={(e) => {
                                                setAccount(prevState => {
                                                    return {...prevState, role: e.target.value}
                                                })
                                            }}
                                        />
                                        <label htmlFor="role2">USER</label>
                                    </div>
                                    <div className=" mt-2">
                                        <input
                                            type="radio"
                                            id="role3"
                                            name="role"
                                            value="ROLE_NONE"
                                            checked={account.role === 'ROLE_NONE'}
                                            onChange={(e) => {
                                                setAccount(prevState => {
                                                    return {...prevState, role: e.target.value}
                                                })
                                            }}
                                        />
                                        <label htmlFor="role3">NONE</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-primary"
                            onClick={() => {
                                CreatAccount();
                                handleClose()
                            }}
                    >Lưu
                    </button>
                    <button className="btn btn-secondary" onClick={handleClose}>
                        Huỷ
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    )
}