import React, {useEffect, useState} from "react";
import {Delete as DeleteIcon, Edit2} from "react-feather";
import {useNavigate, useParams} from "react-router-dom";
import {HTTP} from "../../http-common";
import '../../dist/css/questionTable.css';

export default function EditExamComponent() {
    const {id} = useParams();
    let navigate = useNavigate();
    const [exam, getExam] = useState({
        id: '',
        name: '',
        time: 0,
        date: '',
        numberOfQuestion: 0,
        questionIDs: []
    });
    const [questionIDs, setQIDs] = useState([]);

    const getData=()=>{
        if (id === '_add') return;
        console.log('useEffect call!');
        HTTP.get('/admin/exam/' + id).then((res) => {
            getExam(res.data);
        }).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        setQIDs(exam.questionIDs);
    }, [exam])

    console.log(exam);
    // let b = questionIDs.map((x)=>{return parseInt(x,10)});
    // console.log(b);
    //console.log(Array.isArray(questionIDs));

    function createOrUpdateExam(e) {
        e.preventDefault();
        if (id === '_add') {
            HTTP.post('/admin/createExam', exam).then((res) => {
                console.log(res.data);
                navigate('/admin/examsManagement/' + res.data);
            }).catch((error) => {
                console.log(error)
            })
        } else {
            HTTP.put('/admin/updateExam/' + id, exam).then((res) => {
                console.log(res.data);
            }).catch((error) => {
                console.log(error)
            })
        }
    }

    function updateExamRefQ() {
        let questionIDsFinal = questionIDs.map((x) => {
            return parseInt(x, 10)
        });
        if (isNaN(questionIDsFinal[0])) questionIDsFinal = [];
        console.log(questionIDsFinal);
        HTTP.post('/admin/updateExamRefQ/' + exam.id, questionIDsFinal).then((res) => {
            console.log(res);
            getData();
        }).catch((error) => {
            console.log(error)
        })

    }

    let startID = 0, endID = 0;

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
                                <h1>Đề thi:</h1>
                                <form>
                                    <div className="row">
                                        <div className='col-10'>
                                            <div className="row">
                                                <div className="mb-3 col-sm-2">
                                                    <label className="form-label">ID</label>
                                                    <input className="form-control form-control-lg" type="number"
                                                           name="id"
                                                           disabled={true}
                                                           value={exam.id}
                                                    />
                                                </div>
                                                <div className="mb-3 col-6">
                                                    <label className="form-label">Tên bài thi</label>
                                                    <input className="form-control form-control-lg" type="text"
                                                           name="examName"
                                                           value={exam.name}
                                                           onChange={(e) => getExam(prevState => {
                                                               return {...prevState, name: e.target.value}
                                                           })}
                                                    />
                                                </div>
                                                <div className="mb-3 col-4">
                                                    <label className="form-label">Ngày cập nhật</label>
                                                    <input className="form-control form-control-lg" type="text"
                                                           name="date" disabled={true}
                                                           value={exam.date}
                                                    />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="mb-3 col-2">
                                                    <label className="form-label">Số câu hỏi</label>
                                                    <input className="form-control form-control-lg" type="number"
                                                           name="numberOfQuestion"
                                                           value={exam.numberOfQuestion}
                                                           onChange={(e) => getExam(prevState => {
                                                               return {...prevState, numberOfQuestion: e.target.value}
                                                           })}
                                                    />
                                                </div>
                                                <div className="mb-3 col-4">
                                                    <label className="form-label">Thời gian làm bài</label>
                                                    <input className="form-control form-control-lg" type="number"
                                                           name="time"
                                                           value={exam.time}
                                                           onChange={(e) => getExam(prevState => {
                                                               return {...prevState, time: e.target.value}
                                                           })}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-2" style={{
                                            display: "flex",
                                            justifyContent: "space-evenly",
                                            flexDirection: "column",
                                            alignItems: "center"
                                        }}>
                                            <button className="btn btn-primary" onClick={createOrUpdateExam}>Lưu
                                            </button>
                                            <button className="btn btn-secondary"
                                                    onClick={() => navigate('/admin/examsManagement')}>Huỷ
                                            </button>
                                        </div>
                                    </div>
                                </form>
                                <hr/>
                                <h4>Danh sách ID câu hỏi:</h4>
                                <div className="row">
                                    <div className="col-11">
                                    <textarea className="form-control" rows="7" placeholder="Nhập ID của các câu hỏi"
                                              value={questionIDs}
                                              onChange={(e) => {
                                                  // setQIDs(e.target.value.split(',').map((x) => {
                                                  //     return parseInt(x, 10)
                                                  // }));
                                                  setQIDs(e.target.value.split(','));

                                              }}
                                    /></div>
                                    <div className="col-1" style={{
                                        display: "flex",
                                        justifyContent: "space-evenly",
                                        flexDirection: "column",
                                        alignItems: "center"
                                    }}>
                                        <button className="btn btn-primary" onClick={updateExamRefQ}>Lưu</button>
                                    </div>
                                </div>
                                <div>
                                    <label className="form-label">Nhập nhiều ID:</label>
                                    <div className="row">
                                        <div className="col-2">
                                            <input className="form-control form-control-lg" type="number"
                                                   name="startID"
                                                   onChange={(e) => {
                                                       startID = parseInt(e.target.value, 10)
                                                   }}
                                            />
                                        </div>
                                        -
                                        <div className="col-2">
                                            <input className="form-control form-control-lg" type="number"
                                                   name="endID"
                                                   onChange={(e) => {
                                                       endID = parseInt(e.target.value, 10)
                                                   }}
                                            />
                                        </div>
                                        <div className="col-1">
                                            <button className="btn btn-primary"
                                                    onClick={() => {
                                                        let arr = [];
                                                        let j = 0;
                                                        for (let i = startID; i <= endID; i++) {
                                                            arr[j] = i;
                                                            j++;
                                                        }
                                                        setQIDs(prevState => {
                                                            return [...prevState, ...arr]
                                                        })
                                                    }}
                                            >Nhập
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                {/*<div className="tableFixHead">*/}
                                {/*    <table className="table Qtable table-bordered caption-top"*/}
                                {/*           style={{textAlign: "center", verticalAlign: "middle"}}>*/}
                                {/*        <caption>Danh sách câu hỏi</caption>*/}
                                {/*        <thead style={{verticalAlign: "middle"}}>*/}
                                {/*        <tr>*/}
                                {/*            <th scope="col">Chọn</th>*/}
                                {/*            <th scope="col">#</th>*/}
                                {/*            <th scope="col">ID</th>*/}
                                {/*            <th scope="col">Part</th>*/}
                                {/*            <th scope="col">Group</th>*/}
                                {/*            <th scope="col">Audio</th>*/}
                                {/*            <th scope="col">Picture</th>*/}
                                {/*            <th scope="col">Group thread</th>*/}
                                {/*            <th scope="col">Thread</th>*/}
                                {/*            <th scope="col">Answer A</th>*/}
                                {/*            <th scope="col">Answer B</th>*/}
                                {/*            <th scope="col">Answer C</th>*/}
                                {/*            <th scope="col">Answer D</th>*/}
                                {/*            <th scope="col">Correct answer</th>*/}

                                {/*        </tr>*/}
                                {/*        </thead>*/}

                                {/*        /!*<tbody>*!/*/}
                                {/*        /!*{exam.questionsFull.map((item, index) =>*!/*/}
                                {/*        /!*    <tr key={index}>*!/*/}
                                {/*        /!*        <td>*!/*/}

                                {/*        /!*        </td>*!/*/}
                                {/*        /!*        <td>{index + 1}</td>*!/*/}
                                {/*        /!*        <td>{item.id}</td>*!/*/}
                                {/*        /!*        <td>*!/*/}
                                {/*        /!*            <input className="form-control1 form-control-lg1" type="number"*!/*/}
                                {/*        /!*                   name={item.id + '.part'}*!/*/}
                                {/*        /!*                   value={item.part}*!/*/}
                                {/*        /!*            />*!/*/}
                                {/*        /!*        </td>*!/*/}
                                {/*        /!*        <td>*!/*/}
                                {/*        /!*            <input className="form-control1 form-control-lg1" type="number"*!/*/}
                                {/*        /!*                   name={item.id + '.group'}*!/*/}
                                {/*        /!*                   value={item.group}*!/*/}
                                {/*        /!*            />*!/*/}
                                {/*        /!*        </td>*!/*/}
                                {/*        /!*        <td>*!/*/}
                                {/*        /!*            <input className="form-control1 form-control-lg1" type="text"*!/*/}
                                {/*        /!*                   name={item.id + '.audio'}*!/*/}
                                {/*        /!*                   value={item.audio}*!/*/}
                                {/*        /!*            />*!/*/}
                                {/*        /!*        </td>*!/*/}
                                {/*        /!*        <td>*!/*/}
                                {/*        /!*            <input className="form-control1 form-control-lg1" type="text"*!/*/}
                                {/*        /!*                   name={item.id + '.picture'}*!/*/}
                                {/*        /!*                   value={item.picture}*!/*/}
                                {/*        /!*            />*!/*/}
                                {/*        /!*        </td>*!/*/}
                                {/*        /!*        <td>*!/*/}
                                {/*        /!*            <input className="form-control1 form-control-lg1" type="text"*!/*/}
                                {/*        /!*                   name={item.id + '.group_thread'}*!/*/}
                                {/*        /!*                   value={item.group_thread}*!/*/}
                                {/*        /!*            />*!/*/}
                                {/*        /!*        </td>*!/*/}
                                {/*        /!*        <td>*!/*/}
                                {/*        /!*            <input className="form-control1 form-control-lg1" type="text"*!/*/}
                                {/*        /!*                   name={item.id + '.thread'}*!/*/}
                                {/*        /!*                   value={item.thread}*!/*/}
                                {/*        /!*            />*!/*/}
                                {/*        /!*        </td>*!/*/}
                                {/*        /!*        <td>*!/*/}
                                {/*        /!*            <input className="form-control1 form-control-lg1" type="text"*!/*/}
                                {/*        /!*                   name={item.id + '.answerA'}*!/*/}
                                {/*        /!*                   value={item.answerA}*!/*/}
                                {/*        /!*            />*!/*/}
                                {/*        /!*        </td>*!/*/}
                                {/*        /!*        <td>*!/*/}
                                {/*        /!*            <input className="form-control1 form-control-lg1" type="text"*!/*/}
                                {/*        /!*                   name={item.id + '.answerB'}*!/*/}
                                {/*        /!*                   value={item.answerB}*!/*/}
                                {/*        /!*            />*!/*/}
                                {/*        /!*        </td>*!/*/}
                                {/*        /!*        <td>*!/*/}
                                {/*        /!*            <input className="form-control1 form-control-lg1" type="text"*!/*/}
                                {/*        /!*                   name={item.id + '.answerC'}*!/*/}
                                {/*        /!*                   value={item.answerC}*!/*/}
                                {/*        /!*            />*!/*/}
                                {/*        /!*        </td>*!/*/}
                                {/*        /!*        <td>*!/*/}
                                {/*        /!*            <input className="form-control1 form-control-lg1" type="text"*!/*/}
                                {/*        /!*                   name={item.id + '.answerD'}*!/*/}
                                {/*        /!*                   value={item.answerD}*!/*/}
                                {/*        /!*            />*!/*/}
                                {/*        /!*        </td>*!/*/}
                                {/*        /!*        <td>*!/*/}
                                {/*        /!*            <input className="form-control1 form-control-lg1" type="text"*!/*/}
                                {/*        /!*                   name={item.id + '.corectAnswer'}*!/*/}
                                {/*        /!*                   value={item.corectAnswer}*!/*/}
                                {/*        /!*            />*!/*/}
                                {/*        /!*        </td>*!/*/}

                                {/*        /!*    </tr>*!/*/}
                                {/*        /!*)}*!/*/}
                                {/*        /!*</tbody>*!/*/}

                                {/*    </table>*/}
                                {/*</div>*/}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}