import React, {useState} from "react";
import {HTTP} from "../http-common";

export default function ChangePasword() {
    const [oldPass, setOldPass] = useState('');
    const [newPass, setNewPass] = useState('');
    let pass2 = '';

    function ChangePassword(e) {
        e.preventDefault();
        if (oldPass === '' || newPass === '') {
            window.ShowAlert('warning', 'Bạn chưa điền đủ thông tin');
            return;
        }
        if (newPass !== pass2) {
            window.ShowAlert('warning', 'Mật khẩu mới nhập lại không khớp');
            return;
        }
        HTTP.put('/changePassword', [oldPass,newPass]).then((res) => {
            console.log(res.data);
            window.ShowAlert('success', 'Đổi mật khẩu thành công');
            setNewPass('');
            setOldPass('');
        }).catch((error) => {
            console.log(error);
            window.ShowAlert('danger', 'Đổi mật khẩu không thành công');
        })
    }

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
                                            Đổi mật khẩu
                                        </p>
                                    </div>
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="m-sm-4">

                                                <form>
                                                    <div className="mb-3">
                                                        <label className="form-label">Mật khẩu cũ</label>
                                                        <input className="form-control form-control-lg" type="password"
                                                               name="oldPass" placeholder="Nhập mật khẩu cũ"
                                                               value={oldPass}
                                                               onChange={(e) => {
                                                                   setOldPass(e.target.value);
                                                               }}/>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label">Mật khẩu mới</label>
                                                        <input className="form-control form-control-lg" type="password"
                                                               name="newPass" placeholder="Nhập mật khẩu mới"
                                                               value={newPass}
                                                               onChange={(e) => {
                                                                   setNewPass(e.target.value)
                                                               }}/>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label">Nhập lại mật khẩu mới</label>
                                                        <input className="form-control form-control-lg" type="password"
                                                               name="pass2" placeholder="Nhập lại mật khẩu mới"
                                                               onChange={(e) => {
                                                                   pass2 = e.target.value;
                                                               }}/>
                                                    </div>


                                                    <div className="text-center mt-3">
                                                        {/*<a href="index.html" className="btn btn-lg btn-primary">Sign in</a>*/}
                                                        <button type="submit" className="btn btn-lg btn-primary"
                                                                onClick={ChangePassword}
                                                        >Đồng ý
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