import React, {useEffect, useState} from "react";
import {HTTP} from "../../http-common";
import {Delete as DeleteIcon} from 'react-feather';
import '../../dist/css/questionTable.css';
import DeleteConfirmModal from "../Modal/DeleteConfirmModal";
import EditQuestionConfirmModal from "../Modal/EditQuestionConfirmModal";

export default function QuestionsManagement() {
    const [questions, getQuestions] = useState([]);

    const getData = () => {
        HTTP.get('/admin/question').then((res) => {
            getQuestions(res.data)
            //console.log(res.data);
        }).catch((error) => {
            console.log(error)
        });
        setChangeID([]);
    }

    useEffect(() => {
        getData()
    }, []);

    console.log(questions);

    const [changedListID, setChangeID] = useState([]);
    console.log(changedListID);

    //let changedListID = [];

    function SaveEditedQuestion() {
        //let tmp = questions.filter((ques) => changedListID.includes(ques.id) === true);
        HTTP.post('/admin/question', window.editQList).then((res) => {
            console.log(res.data);
            window.ShowAlert('success', 'Cập nhật câu hỏi thành công');
            window.editQList = [];
            getData();
        }).catch((error) => {
            console.log(error);
            window.ShowAlert('danger', 'Cập nhật câu hỏi không thành công');
        })
    }

    function DeleteQuestion(id) {
        HTTP.delete('/admin/question/' + id).then((res) => {
            console.log(res.data);
            window.ShowAlert('success', 'Xoá câu hỏi thành công');
            getData();
        }).catch((error) => {
            console.log(error);
            window.ShowAlert('danger', 'Xoá câu hỏi không thành công');
        })
    }

    let addQnum = null;

    function CreateQTable() {
        console.log(addQnum);
        let objArr = [
            {
                thread: null,
                answerA: null,
                answerB: null,
                answerC: null,
                answerD: null,
                corectAnswer: null,
                part: 0,
                group: null,
                audio: null,
                picture: null,
                group_thread: null
            }]
        let tmpArr = [];
        for (let i = 0; i < addQnum; i++) tmpArr = [...tmpArr, ...objArr];
        getQuestions(tmpArr);
        console.log(questions);
    }

    return (
        <>
            <EditQuestionConfirmModal saveEditQ={SaveEditedQuestion}/>
            <DeleteConfirmModal DeleteFunction={DeleteQuestion}/>
            <div className="container-fluid p-0">
                <h1 className="h3 mb-3">Ngân hàng câu hỏi</h1>
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            {/*<div className="card-header">*/}
                            {/*    /!*<h5 className="card-title mb-0">Empty card</h5>*!/*/}
                            {/*</div>*/}
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-4" style={{
                                        display: "flex",
                                        justifyContent: "space-evenly",
                                        flexDirection: "column",
                                        alignItems: "center"
                                    }}>
                                        <h4>Số câu hỏi: {questions.length}</h4>
                                        <input className="form-control form-control-lg" type="number"
                                               name={'addQnum'}
                                               value={addQnum} placeholder="Nhập số câu muốn thêm"
                                               onChange={(e) => {
                                                   addQnum = e.target.value
                                               }}
                                        />
                                        <button className="btn btn-primary" onClick={CreateQTable}>Tạo bảng</button>

                                    </div>
                                    <div className="col-4"></div>
                                    <div className="col-4" style={{
                                        display: "flex",
                                        justifyContent: "space-evenly",
                                        flexDirection: "column",
                                        alignItems: "center"
                                    }}>
                                        <button className="btn btn-primary" onClick={() => {
                                            window.editQList = questions.filter((ques,index) => changedListID.includes(index) === true);
                                            window.ShowEditQModal();
                                        }}>Lưu
                                        </button>

                                        <button className="btn btn-secondary" onClick={() => {
                                            getData();
                                        }}>Đặt lại
                                        </button>
                                    </div>
                                </div>
                                <hr/>
                                <div className="tableFixHead">
                                    <table className="table Qtable table-bordered"
                                           style={{textAlign: "center", verticalAlign: "middle"}}>
                                        <thead style={{verticalAlign: "middle"}}>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">ID</th>
                                            <th scope="col">Part</th>
                                            <th scope="col">Group</th>
                                            <th scope="col">Audio</th>
                                            <th scope="col">Picture</th>
                                            <th scope="col">Group thread</th>
                                            <th scope="col">Thread</th>
                                            <th scope="col">Answer A</th>
                                            <th scope="col">Answer B</th>
                                            <th scope="col">Answer C</th>
                                            <th scope="col">Answer D</th>
                                            <th scope="col">Correct answer</th>
                                            <th scope="col"></th>

                                        </tr>
                                        </thead>

                                        <tbody>
                                        {questions.map((item, index) =>
                                            <tr key={index}>

                                                <td>{index + 1}</td>
                                                <td>{item.id}</td>
                                                <td>
                                                    <input className="form-control1 form-control-lg1" type="number"
                                                           name={item.id + '.part'}
                                                           value={item.part} placeholder="NULL"
                                                           onChange={(e) => {
                                                               if (e.target.value === '') e.target.value = 0;
                                                               getQuestions(current => current.map((obj,idx) => {
                                                                   if (idx === index) {
                                                                       return {
                                                                           ...obj,
                                                                           part: parseInt(e.target.value, 10)
                                                                       };
                                                                   }
                                                                   return obj;
                                                               }))
                                                               let tmp = [index];
                                                               if (!changedListID.includes(index))
                                                                   setChangeID([...changedListID, ...tmp])
                                                           }}

                                                    />
                                                </td>
                                                <td>
                                                    <input className="form-control1 form-control-lg1" type="number"
                                                           name={item.id + '.group'}
                                                           value={item.group === null ? '' : item.group}
                                                           placeholder="NULL"
                                                           onChange={(e) => {
                                                               if (e.target.value === '') {
                                                                   getQuestions(current => current.map((obj,idx) => {
                                                                       if (idx === index) {
                                                                           return {
                                                                               ...obj,
                                                                               group: null
                                                                           };
                                                                       }
                                                                       return obj;
                                                                   }));
                                                               } else
                                                                   getQuestions(current => current.map((obj,idx) => {
                                                                       if (idx === index) {
                                                                           return {
                                                                               ...obj,
                                                                               group: parseInt(e.target.value, 10)
                                                                           };
                                                                       }
                                                                       return obj;
                                                                   }))
                                                               let tmp = [index];
                                                               if (!changedListID.includes(index))
                                                                   setChangeID([...changedListID, ...tmp])
                                                           }}
                                                    />
                                                </td>
                                                <td>
                                                    <input className="form-control1 form-control-lg1" type="text"
                                                           name={item.id + '.audio'}
                                                           value={item.audio === null ? '' : item.audio}
                                                           placeholder="NULL"
                                                           onChange={(e) => {
                                                               if (e.target.value === '') {
                                                                   getQuestions(current => current.map((obj,idx) => {
                                                                       if (idx === index) {
                                                                           return {
                                                                               ...obj,
                                                                               audio: null
                                                                           };
                                                                       }
                                                                       return obj;
                                                                   }))
                                                               } else
                                                                   getQuestions(current => current.map(obj => {
                                                                       if (obj.id === item.id) {
                                                                           return {
                                                                               ...obj,
                                                                               audio: e.target.value
                                                                           };
                                                                       }
                                                                       return obj;
                                                                   }))
                                                               let tmp = [index];
                                                               if (!changedListID.includes(index))
                                                                   setChangeID([...changedListID, ...tmp])
                                                           }}
                                                    />
                                                </td>
                                                <td>
                                                    <input className="form-control1 form-control-lg1" type="text"
                                                           name={item.id + '.picture'}
                                                           value={item.picture === null ? '' : item.picture}
                                                           placeholder="NULL"
                                                           onChange={(e) => {
                                                               if (e.target.value === '') {
                                                                   getQuestions(current => current.map((obj,idx) => {
                                                                       if (idx === index) {
                                                                           return {
                                                                               ...obj,
                                                                               picture: null
                                                                           };
                                                                       }
                                                                       return obj;
                                                                   }))
                                                               } else
                                                                   getQuestions(current => current.map((obj,idx) => {
                                                                       if (idx === index) {
                                                                           return {
                                                                               ...obj,
                                                                               picture: e.target.value
                                                                           };
                                                                       }
                                                                       return obj;
                                                                   }))
                                                               let tmp = [index];
                                                               if (!changedListID.includes(index))
                                                                   setChangeID([...changedListID, ...tmp])
                                                           }}
                                                    />
                                                </td>
                                                <td>
                                                    <input className="form-control1 form-control-lg1" type="text"
                                                           name={item.id + '.group_thread'}
                                                           value={item.group_thread === null ? '' : item.group_thread}
                                                           placeholder="NULL"
                                                           onChange={(e) => {
                                                               if (e.target.value === '') {
                                                                   getQuestions(current => current.map((obj,idx) => {
                                                                       if (idx === index) {
                                                                           return {
                                                                               ...obj,
                                                                               group_thread: null
                                                                           };
                                                                       }
                                                                       return obj;
                                                                   }))
                                                               } else
                                                                   getQuestions(current => current.map((obj,idx) => {
                                                                       if (idx === index) {
                                                                           return {
                                                                               ...obj,
                                                                               group_thread: e.target.value
                                                                           };
                                                                       }
                                                                       return obj;
                                                                   }))
                                                               let tmp = [index];
                                                               if (!changedListID.includes(index))
                                                                   setChangeID([...changedListID, ...tmp])
                                                           }}
                                                    />
                                                </td>
                                                <td>
                                                    <input className="form-control1 form-control-lg1" type="text"
                                                           name={item.id + '.thread'}
                                                           value={item.thread === null ? '' : item.thread}
                                                           placeholder="NULL"
                                                           onChange={(e) => {
                                                               if (e.target.value === '') {
                                                                   getQuestions(current => current.map((obj,idx) => {
                                                                       if (idx === index) {
                                                                           return {
                                                                               ...obj,
                                                                               thread: null
                                                                           };
                                                                       }
                                                                       return obj;
                                                                   }))
                                                               } else
                                                                   getQuestions(current => current.map((obj,idx) => {
                                                                       if (idx === index) {
                                                                           return {
                                                                               ...obj,
                                                                               thread: e.target.value
                                                                           };
                                                                       }
                                                                       return obj;
                                                                   }))
                                                               let tmp = [index];
                                                               if (!changedListID.includes(index))
                                                                   setChangeID([...changedListID, ...tmp])
                                                           }}
                                                    />
                                                </td>
                                                <td>
                                                    <input className="form-control1 form-control-lg1" type="text"
                                                           name={item.id + '.answerA'}
                                                           value={item.answerA === null ? '' : item.answerA}
                                                           placeholder="NULL"
                                                           onChange={(e) => {
                                                               if (e.target.value === '') {
                                                                   getQuestions(current => current.map((obj,idx) => {
                                                                       if (idx === index) {
                                                                           return {
                                                                               ...obj,
                                                                               answerA: null
                                                                           };
                                                                       }
                                                                       return obj;
                                                                   }))
                                                               } else
                                                                   getQuestions(current => current.map((obj,idx) => {
                                                                       if (idx === index) {
                                                                           return {
                                                                               ...obj,
                                                                               answerA: e.target.value
                                                                           };
                                                                       }
                                                                       return obj;
                                                                   }))
                                                               let tmp = [index];
                                                               if (!changedListID.includes(index))
                                                                   setChangeID([...changedListID, ...tmp])
                                                           }}
                                                    />
                                                </td>
                                                <td>
                                                    <input className="form-control1 form-control-lg1" type="text"
                                                           name={item.id + '.answerB'}
                                                           value={item.answerB === null ? '' : item.answerB}
                                                           placeholder="NULL"
                                                           onChange={(e) => {
                                                               if (e.target.value === '') {
                                                                   getQuestions(current => current.map((obj,idx) => {
                                                                       if (idx === index) {
                                                                           return {
                                                                               ...obj,
                                                                               answerB: null
                                                                           };
                                                                       }
                                                                       return obj;
                                                                   }))
                                                               } else
                                                                   getQuestions(current => current.map((obj,idx) => {
                                                                       if (idx === index) {
                                                                           return {
                                                                               ...obj,
                                                                               answerB: e.target.value
                                                                           };
                                                                       }
                                                                       return obj;
                                                                   }))
                                                               let tmp = [index];
                                                               if (!changedListID.includes(index))
                                                                   setChangeID([...changedListID, ...tmp])
                                                           }}
                                                    />
                                                </td>
                                                <td>
                                                    <input className="form-control1 form-control-lg1" type="text"
                                                           name={item.id + '.answerC'}
                                                           value={item.answerC === null ? '' : item.answerC}
                                                           placeholder="NULL"
                                                           onChange={(e) => {
                                                               if (e.target.value === '') {
                                                                   getQuestions(current => current.map((obj,idx) => {
                                                                       if (idx === index) {
                                                                           return {
                                                                               ...obj,
                                                                               answerC: null
                                                                           };
                                                                       }
                                                                       return obj;
                                                                   }))
                                                               } else
                                                                   getQuestions(current => current.map((obj,idx) => {
                                                                       if (idx === index) {
                                                                           return {
                                                                               ...obj,
                                                                               answerC: e.target.value
                                                                           };
                                                                       }
                                                                       return obj;
                                                                   }))
                                                               let tmp = [index];
                                                               if (!changedListID.includes(index))
                                                                   setChangeID([...changedListID, ...tmp])
                                                           }}
                                                    />
                                                </td>
                                                <td>
                                                    <input className="form-control1 form-control-lg1" type="text"
                                                           name={item.id + '.answerD'}
                                                           value={item.answerD === null ? '' : item.answerD}
                                                           placeholder="NULL"
                                                           onChange={(e) => {
                                                               if (e.target.value === '') {
                                                                   getQuestions(current => current.map((obj,idx) => {
                                                                       if (idx === index) {
                                                                           return {
                                                                               ...obj,
                                                                               answerD: null
                                                                           };
                                                                       }
                                                                       return obj;
                                                                   }))
                                                               } else
                                                                   getQuestions(current => current.map((obj,idx) => {
                                                                       if (idx === index) {
                                                                           return {
                                                                               ...obj,
                                                                               answerD: e.target.value
                                                                           };
                                                                       }
                                                                       return obj;
                                                                   }))
                                                               let tmp = [index];
                                                               if (!changedListID.includes(index))
                                                                   setChangeID([...changedListID, ...tmp])
                                                           }}
                                                    />
                                                </td>
                                                <td>
                                                    <input className="form-control1 form-control-lg1" type="text"
                                                           name={item.id + '.corectAnswer'}
                                                           value={item.corectAnswer === null ? '' : item.corectAnswer}
                                                           placeholder="NULL"
                                                           onChange={(e) => {
                                                               if (e.target.value === '') {
                                                                   getQuestions(current => current.map((obj,idx) => {
                                                                       if (idx === index) {
                                                                           return {
                                                                               ...obj,
                                                                               corectAnswer: null
                                                                           };
                                                                       }
                                                                       return obj;
                                                                   }))
                                                               } else
                                                                   getQuestions(current => current.map((obj,idx) => {
                                                                       if (idx === index) {
                                                                           return {
                                                                               ...obj,
                                                                               corectAnswer: e.target.value
                                                                           };
                                                                       }
                                                                       return obj;
                                                                   }))
                                                               let tmp = [index];
                                                               if (!changedListID.includes(index))
                                                                   setChangeID([...changedListID, ...tmp])
                                                           }}
                                                    />
                                                </td>
                                                <td>
                                                    <DeleteIcon color="red" style={{cursor: "pointer"}}
                                                                onClick={() => {
                                                                    window.deleteObj = {
                                                                        name: 'câu hỏi id:' + item.id,
                                                                        id: item.id
                                                                    };
                                                                    window.ShowDeleteConfirm()
                                                                }}/>
                                                </td>
                                            </tr>
                                        )}
                                        </tbody>

                                    </table>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}