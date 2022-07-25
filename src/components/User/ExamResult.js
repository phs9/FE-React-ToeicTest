import React from "react";
import {useLocation, useNavigate} from "react-router-dom";

export default function ExamResult() {
    const location = useLocation();
    let navigate = useNavigate();
    let data = {}, exam = {};
    if (location.state != null) {
        data = location.state;
        exam = data.exam;
    }

    function ExamPoint() {
        if (data.totalQuestion === 200) return (
            <div style={{justifyContent: "space-around", display: "flex", fontSize: 28}}>
                <div>Listening: <div style={{color: "blue", display: "inline-block"}}>{data.point}/100</div></div>
                <div>Reading: <div style={{color: "blue", display: "inline-block"}}>{data.point1}/100</div></div>
            </div>
        )
        else return (
            <div style={{justifyContent: "space-around", display: "flex", fontSize: 28}}>
                <div style={{color: "blue"}}>{data.point}/{data.totalQuestion}</div>
            </div>
        )
    }

    return (
        <>
            <div className="container-fluid p-0" style={{zIndex: 1}}>
                <h1 className="h3 mb-3"></h1>
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            {/*<div className="card-header">*/}
                            {/*    /!*<h5 className="card-title mb-0">Card name</h5>*!/*/}
                            {/*</div>*/}
                            <div className="card-body">
                                <center><h1>Kết quả bài thi</h1></center>
                                <hr/>
                                <div style={{fontSize: 20}}>
                                    <div>Tên bài thi: {exam.name}</div>
                                    <div>Số câu hỏi: {data.totalQuestion}</div>
                                    <div>Ngày thi: {data.datetime}</div>
                                    <hr/>
                                    <div>Kết quả:</div>
                                </div>
                                <br/>
                                <ExamPoint/>
                                <hr/>
                                <div style={{justifyContent: "space-around", display: "flex"}}>
                                    <button className="btn btn-primary" onClick={()=>{navigate('/home')}}>Trang chủ</button>
                                    <button className="btn btn-primary" onClick={()=>{navigate('/exam')}}>Danh sách bài thi</button>
                                    <button className="btn btn-primary" onClick={()=>{navigate('/results')}}>Lịch sử thi</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}