import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {HTTP} from "../../http-common";
import ReadyTestModal from "../Modal/ReadyTestModal";

export default function ListExamComponent() {
    let navigate = useNavigate();
    const [exams, setData] = useState([]);
    const [data,setMData]=useState({});
    useEffect(() => {
        HTTP.get('/user/exam')
            .then((res) => {
                setData(res.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);
    console.log(exams);
    console.log(Array.isArray(exams));

    return (
        <>
            <div className="container-fluid p-0">
                <h1 className="h3 mb-3">Danh sách bài thi thử</h1>
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            {/*<div className="card-header">*/}
                            {/*    /!*<h5 className="card-title mb-0">Empty card</h5>*!/*/}
                            {/*</div>*/}
                            <div className="card-body">
                                <h4>Bài FULL TEST:</h4>
                                <div>
                                    {exams.filter((item) => {
                                        return item.numberOfQuestion === 200
                                    }).map((item) =>
                                        <div className="row" key={item.id}>
                                            <div className="col-md-12">
                                                <div className="card bg-light border">
                                                    <div className="card-body">
                                                        <ReadyTestModal
                                                            name={item.name}
                                                            id={item.id}
                                                        />
                                                        <ul>
                                                            <li>Thời gian: {item.examTime} phút</li>
                                                            <li>Số câu hỏi: {item.numberOfQuestion}</li>
                                                            <li>Ngày cập nhật: {item.date}</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <hr/>
                                <h4>Bài Mini Test:</h4>
                                <div>
                                    {exams.filter((item) => {
                                        return item.numberOfQuestion < 200
                                    }).map((item) =>
                                        <div className="row" key={item.id}>
                                            <div className="col-md-12">
                                                <div className="card bg-light border">
                                                    <div className="card-body">
                                                        <a onClick={() => {
                                                            window.sessionStorage.removeItem('examState');
                                                            navigate('/exam/' + item.id);
                                                        }}
                                                           style={{textDecoration: "underline", color: "blue"}}>
                                                            <h4 style={{color: "blue"}}>{item.name}</h4>
                                                        </a>
                                                        <ul>
                                                            <li>Thời gian: {item.examTime} phút</li>
                                                            <li>Số câu hỏi: {item.numberOfQuestion}</li>
                                                            <li>Ngày cập nhật: {item.date}</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

