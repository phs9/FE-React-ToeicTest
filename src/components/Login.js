import React, {useEffect} from "react";
import {HTTP} from "../http-common";
import {useNavigate} from "react-router-dom";
import logo from '../logo.png';
import bg from '../bg.jpg';

export default function Login() {
    let navigate = useNavigate();
    let uid = '';
    let pass = '';

    function loginNavigate() {
        if (sessionStorage.getItem('role') === 'ROLE_ADMIN') {
            //navigate('/admin/dashboards');
            window.location.href='/admin/dashboards';
        } else if (sessionStorage.getItem('role') === 'ROLE_USER') {
            //navigate('/home');
            window.location.href='/home';
        } else {
            window.ShowAlert('warning', 'Tài khoản chưa được cấp quyền');
        }
    }

    useEffect(() => {
        if (sessionStorage.getItem('token') != null) loginNavigate();
    }, []);


    const login = (e) => {
        e.preventDefault();
        if (uid === '' || pass === '') {
            window.ShowAlert('warning', 'Bạn chưa điền đủ tài khoản và mật khẩu');
            return
        }
        HTTP.post('login', {
            username: uid,
            password: pass
        }).then((res) => {
            sessionStorage.setItem('token', res.data.token);
            sessionStorage.setItem('role', res.data.roles);
            sessionStorage.setItem('email', res.data.email);
            sessionStorage.setItem('name', res.data.name);
            console.log(sessionStorage.getItem('role'));
            loginNavigate();
            //window.location.reload();

        }).catch((error) => {
            console.log(error);
            window.ShowAlert('danger', 'Sai tài khoản hoặc mật khẩu');
        })
        //navigate('/exam');
    }


    return (<>
            <div style={{
                background: `url(${bg})`,
                backgroundSize: "100vw 100vh",
                width: "100%",
                height: "100%",
                zIndex: -99999,
                position: "fixed"
            }}></div>
            <div>
                <main className="d-flex w-100">
                    <div className="container d-flex flex-column">
                        <div className="row vh-100">
                            <div className="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
                                <div className="d-table-cell align-middle">
                                    <div className="text-center mt-4">
                                        <h1 className="h2" style={{color: "white"}}>Welcome</h1>
                                        <p className="lead" style={{color: "white"}}>
                                            Đăng nhập để tiếp tục
                                        </p>
                                    </div>
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="m-sm-4">
                                                <div className="text-center">
                                                    <img src={logo} alt="Charles Hall"
                                                         className="img-fluid" width={180} height={180}/>
                                                </div>
                                                <form>
                                                    <div className="mb-3">
                                                        <label className="form-label">Email</label>
                                                        <input className="form-control form-control-lg" type="email"
                                                               name="email" placeholder="Nhập Email"
                                                               onChange={(e) => {
                                                                   uid = e.target.value
                                                               }}/>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label">Mật khẩu</label>
                                                        <input className="form-control form-control-lg" type="password"
                                                               name="password" placeholder="Nhập mật khẩu"
                                                               onChange={(e) => {
                                                                   pass = e.target.value
                                                               }}/>
                                                        {/*<small>*/}
                                                        {/*    <a href="">Forgot password?</a>*/}
                                                        {/*</small>*/}
                                                    </div>
                                                    <div className="text-center mt-3">
                                                        {/*<a href="index.html" className="btn btn-lg btn-primary">Sign in</a>*/}
                                                        <button type="submit" className="btn btn-lg btn-primary"
                                                                onClick={login}>Đăng nhập
                                                        </button>
                                                    </div>
                                                    <div>Chưa có tài khoản? <a
                                                        style={{color: "blue", textDecoration: "underline"}}
                                                        onClick={() => {
                                                            navigate('/register')
                                                        }}>Đăng ký</a></div>
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