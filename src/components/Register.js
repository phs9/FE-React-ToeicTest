import React, {useState} from "react";
import logo from "../logo.png";
import {useNavigate} from "react-router-dom";
import {HTTP} from "../http-common";
import bg from '../bg.jpg';


export default function Register() {
    let navigate = useNavigate();

    const [account, setAccount] = useState({
        email: '',
        fullName: '',
        password: '',
        phone: '',
        address: '',
        role: 'ROLE_USER'
    })

    let pass2 = ''

    function Register(e) {
        e.preventDefault();
        if (account.email === '' || account.fullName === '' || account.password === '' || account.phone === '' || account.address === '') {
            window.ShowAlert('warning', 'Bạn chưa nhập đủ thông tin');
            return
        }
        if (account.password !== pass2) {
            window.ShowAlert('warning', 'Mật khẩu nhập lại không khớp');
            return
        }
        HTTP.post('/register', account).then((res) => {
            console.log(res.data);
            window.ShowAlert('success', 'Đăng ký tài khoản thành công');
            navigate('/login');
        }).catch((error) => {
            console.log(error);
            window.ShowAlert('danger', 'Đăng ký tài khoản không thành công');
        })
    }


    return (
        <>
            <div style={{
                background: `url(${bg})`,
                backgroundSize: "100vw 100vh",
                width: "100%",
                height: "100%",
                zIndex: -99999,
                position: "fixed"
            }}></div>
            <div style={{}}>
                <main className="d-flex w-100">
                    <div className="container d-flex flex-column">
                        <div className="row vh-100">
                            <div className="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
                                <div className="d-table-cell align-middle">
                                    <div className="text-center mt-4">
                                        <h1 className="h2" style={{color: "white"}}>Online Toeic Test</h1>
                                        <p className="lead" style={{color: "white"}}>
                                            Đăng ký tài khoản
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
                                                                   setAccount(prevState => {
                                                                       return {...prevState, email: e.target.value}
                                                                   })
                                                               }}/>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label">Họ và tên</label>
                                                        <input className="form-control form-control-lg" type="text"
                                                               name="fullName" placeholder="Nhập họ tên đầy đủ"
                                                               onChange={(e) => {
                                                                   setAccount(prevState => {
                                                                       return {...prevState, fullName: e.target.value}
                                                                   })
                                                               }}/>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label">Mật khẩu</label>
                                                        <input className="form-control form-control-lg" type="password"
                                                               name="password" placeholder="Nhập mật khẩu"
                                                               onChange={(e) => {
                                                                   setAccount(prevState => {
                                                                       return {...prevState, password: e.target.value}
                                                                   })
                                                               }}/>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label">Nhập lại mật khẩu</label>
                                                        <input className="form-control form-control-lg" type="password"
                                                               name="password2" placeholder="Nhập lại mật khẩu"
                                                               onChange={(e) => {
                                                                   pass2 = e.target.value;
                                                               }}/>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label">Số điện thoại</label>
                                                        <input className="form-control form-control-lg" type="text"
                                                               name="phone" placeholder="Nhập số điện thoại"
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
                                                               onChange={(e) => {
                                                                   setAccount(prevState => {
                                                                       return {...prevState, address: e.target.value}
                                                                   })
                                                               }}/>
                                                    </div>
                                                    <div>Bằng việc nhấn nút đăng ký, bạn đồng ý với <b style={{
                                                        color: "blue",
                                                        textDecoration: "underline",
                                                        cursor: "pointer"
                                                    }}>điều khoản sử dụng</b> của chúng tôi
                                                    </div>
                                                    <div className="text-center mt-3">
                                                        {/*<a href="index.html" className="btn btn-lg btn-primary">Sign in</a>*/}
                                                        <button type="submit" className="btn btn-lg btn-primary"
                                                                onClick={Register}
                                                        >Đăng ký
                                                        </button>
                                                    </div>
                                                    <div>Đã có tài khoản? <a
                                                        style={{color: "blue", textDecoration: "underline"}}
                                                        onClick={() => {
                                                            navigate('/')
                                                        }}>Đăng nhập</a></div>
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