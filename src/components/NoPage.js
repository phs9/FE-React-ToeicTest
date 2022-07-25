import React from "react";
import {useNavigate} from "react-router-dom";

export default function NoPage(){
    let navigate = useNavigate();
    return(
        <main className="d-flex w-100 h-100">
            <div className="container d-flex flex-column">
                <div className="row vh-100">
                    <div className="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
                        <div className="d-table-cell align-middle">

                            <div className="text-center">
                                <h1 className="display-1 font-weight-bold">404</h1>
                                <p className="h1">Không tìm thấy trang.</p>
                                <p className="h2 font-weight-normal mt-3 mb-4">Trang mà bạn đang tìm có thể đã bị xoá.</p>
                                <a className="btn btn-primary btn-lg" onClick={()=>{
                                    if (sessionStorage.getItem('role') === 'ROLE_ADMIN') {
                                        navigate('/admin');
                                    } else if (sessionStorage.getItem('role') === 'ROLE_USER') {
                                        navigate('/home');
                                    } else {
                                        navigate('/');
                                    }
                                }}>Quay lại</a>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}