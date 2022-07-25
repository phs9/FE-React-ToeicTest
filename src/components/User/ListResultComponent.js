import React, {useEffect, useState} from "react";
import {HTTP} from "../../http-common";


export default function ListResultComponent() {
    const [results, getResults] = useState([]);

    useEffect(() => {
        HTTP.get('/user/history')
            .then((res) => {
                getResults(res.data);
                console.log(results);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    return (
        <>
            <div className="container-fluid p-0">
                {/*<h1 className="h3 mb-3">Danh sách bài thi thử</h1>*/}
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            {/*<div className="card-header">*/}
                            {/*    /!*<h5 className="card-title mb-0">Empty card</h5>*!/*/}
                            {/*</div>*/}
                            <div className="card-body">
                                <h1>Lịch sử làm bài thi thử:</h1>
                                <hr/>
                                <table className="table table-bordered caption-top"
                                       style={{textAlign: "center", verticalAlign: "middle"}}>
                                    <caption>Bài FULL TEST</caption>
                                    <thead style={{verticalAlign: "middle"}}>
                                    <tr>
                                        <th scope="col" rowSpan="2"></th>
                                        <th scope="col" rowSpan="2">Tên bài thi</th>
                                        <th scope="col" rowSpan="2">Ngày giờ thi</th>
                                        <th scope="col" rowSpan="2">Tổng số câu hỏi</th>
                                        <th scope="col" colSpan="2">Kết quả</th>
                                    </tr>
                                    <tr>
                                        <th scope="col">Listening</th>
                                        <th scope="col">Reading</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {results.filter((item) => {
                                        return item.totalQuestion === 200
                                    }).map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.exam.name}</td>
                                                <td>{item.datetime}</td>
                                                <td>{item.totalQuestion}</td>
                                                <td>{item.point}</td>
                                                <td>{item.point1}</td>
                                            </tr>
                                        )
                                    })}
                                    </tbody>
                                </table>
                                <div>Xem bảng quy đổi điểm TOEIC <a
                                    style={{color: "blue", textDecoration: "underline"}}>tại đây</a></div>
                                <table className="table table-bordered caption-top"
                                       style={{textAlign: "center", verticalAlign: "middle"}}>
                                    <caption>Bài MINI TEST</caption>
                                    <thead style={{verticalAlign: "middle"}}>
                                    <tr>
                                        <th scope="col" ></th>
                                        <th scope="col" >Tên bài thi</th>
                                        <th scope="col" >Ngày giờ thi</th>
                                        <th scope="col" >Tổng số câu hỏi</th>
                                        <th scope="col" >Kết quả</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {results.filter((item) => {
                                        return item.totalQuestion < 200
                                    }).map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.exam.name}</td>
                                                <td>{item.datetime}</td>
                                                <td>{item.totalQuestion}</td>
                                                <td>{item.point}</td>
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