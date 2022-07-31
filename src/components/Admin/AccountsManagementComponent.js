import React, {useEffect, useState} from "react";
import {HTTP} from "../../http-common";
import {Edit2, Delete as DeleteIcon} from 'react-feather';
import DeleteConfirmModal from "../Modal/DeleteConfirmModal";
import AdminCreateAccountModal from "../Modal/AdminCreateAccountModal";


export default function AccountsManagementComponent() {
    const [accounts, getAccounts] = useState([]);

    const getData = () => {
        HTTP.get('/admin/account').then((res) => {
            getAccounts(res.data);
        }).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        getData();
    }, [])
    console.log(accounts);

    function DeleteAccount(id) {
        HTTP.delete('/admin/account/' + id).then((res) => {
            console.log(res.data);
            window.ShowAlert('success', 'Xoá thành công');
            getData();
        }).catch((error) => {
            console.log(error);
            window.ShowAlert('danger', 'Xoá không thành công');
        })
    }


    return (
        <>
            <AdminCreateAccountModal Reload={getData}/>
            <DeleteConfirmModal DeleteFunction={DeleteAccount}/>
            <div className="container-fluid p-0">
                {/*<h1 className="h3 mb-3">Danh sách bài thi thử</h1>*/}
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            {/*<div className="card-header">*/}
                            {/*    /!*<h5 className="card-title mb-0">Empty card</h5>*!/*/}
                            {/*</div>*/}
                            <div className="card-body">
                                <h1>Quản lý tài khoản:</h1>
                                <hr/>
                                <button className="btn btn-primary" style={{float: "right"}}
                                        onClick={() => {
                                            window.editID = 0;
                                            window.ShowCreateAcc();
                                        }}>Thêm tài khoản
                                </button>
                                <table className="table table-bordered caption-top"
                                       style={{textAlign: "center", verticalAlign: "middle"}}>
                                    <caption>Danh sách tài khoản</caption>
                                    <thead style={{verticalAlign: "middle"}}>
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Họ và tên</th>
                                        <th scope="col">Số điện thoại</th>
                                        <th scope="col">Địa chỉ</th>
                                        <th scope="col">Phân quyền</th>
                                        <th scope="col">Tuỳ chọn</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {accounts.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{item.id}</td>
                                                <td>{item.email}</td>
                                                <td>{item.fullName}</td>
                                                <td>{item.phone}</td>
                                                <td>{item.address}</td>
                                                <td>
                                                    <div
                                                        className={item.role === 'ADMIN' ? "badge bg-primary" : (item.role === 'USER' ? "badge bg-success" : "badge bg-warning")}
                                                    >{item.role}</div>
                                                </td>
                                                <td style={{display: "flex", justifyContent: "space-between"}}>
                                                    <Edit2 style={{cursor: "pointer"}}
                                                           onClick={() => {
                                                               window.editID = item.id;
                                                               window.ShowCreateAcc();
                                                           }}/>
                                                    <DeleteIcon color="red" style={{cursor: "pointer"}}
                                                                onClick={() => {
                                                                    window.deleteObj = {
                                                                        name: item.email,
                                                                        id: item.id
                                                                    };
                                                                    window.ShowDeleteConfirm()
                                                                }}
                                                    />
                                                </td>
                                            </tr>
                                        )
                                    })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}