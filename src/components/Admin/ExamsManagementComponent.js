import React, {useEffect, useState} from "react";
import {Delete as DeleteIcon, Edit2} from "react-feather";
import {HTTP} from "../../http-common";
import DeleteConfirmModal from "../Modal/DeleteConfirmModal";
import {useNavigate} from "react-router-dom";

export default function ExamsManagementComponent() {
    const [exams, getExam] = useState([]);
    let navigate = useNavigate();
    const getData = () => {
        HTTP.get('/user/exam')
            .then((res) => {
                getExam(res.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        getData();
    }, []);

    function DeleteExam(id, allQ) {
        if (allQ === false) {
            HTTP.delete('/admin/exam/' + id).then((res) => {
                console.log(res.data);
                getData();
            }).catch((error) => {
                console.log(error)
            })
        } else {
            HTTP.delete('/admin/examQ/' + id).then((res) => {
                console.log(res.data);
                getData();
            }).catch((error) => {
                console.log(error)
            })
        }
    }

    return (
        <>
            <DeleteConfirmModal DeleteFunction={DeleteExam}/>
            <div className="container-fluid p-0">
                {/*<h1 className="h3 mb-3">Danh sách bài thi thử</h1>*/}
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            {/*<div className="card-header">*/}
                            {/*    /!*<h5 className="card-title mb-0">Empty card</h5>*!/*/}
                            {/*</div>*/}
                            <div className="card-body">
                                <h1>Quản lý bài thi:</h1>
                                <hr/>
                                <button className="btn btn-primary" style={{float: "right"}}
                                        onClick={() => {
                                            //window.editID = 0;
                                            //window.ShowCreateAcc();
                                            navigate('/admin/examsManagement/_add');
                                        }}>Thêm bài thi
                                </button>
                                <table className="table table-bordered caption-top"
                                       style={{textAlign: "center", verticalAlign: "middle"}}>
                                    <caption>Danh sách bài thi</caption>
                                    <thead style={{verticalAlign: "middle"}}>
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">Tên bài thi</th>
                                        <th scope="col">Số câu hỏi</th>
                                        <th scope="col">Thời gian</th>
                                        <th scope="col">Ngày cập nhật</th>
                                        <th scope="col">Tuỳ chọn</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {exams.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{item.id}</td>
                                                <td>{item.name}</td>
                                                <td>{item.numberOfQuestion}</td>
                                                <td>{item.examTime}</td>
                                                <td>{item.date}</td>
                                                <td style={{display: "flex", justifyContent: "space-between"}}>
                                                    <Edit2 style={{cursor: "pointer"}}
                                                           onClick={() => {
                                                               //window.editID = item.id;
                                                               //window.ShowCreateAcc();
                                                               navigate('/admin/examsManagement/' + item.id);
                                                           }}/>
                                                    <DeleteIcon color="yellow" style={{cursor: "pointer"}}
                                                                onClick={() => {
                                                                    window.deleteObj = {
                                                                        name: item.name,
                                                                        id: item.id,
                                                                        allQ: false
                                                                    };
                                                                    window.ShowDeleteConfirm()
                                                                }}
                                                    />
                                                    <DeleteIcon color="red" style={{cursor: "pointer"}}
                                                                onClick={() => {
                                                                    window.deleteObj = {
                                                                        name: item.name + ', bao gồm cả bộ câu hỏi',
                                                                        id: item.id,
                                                                        allQ: true
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