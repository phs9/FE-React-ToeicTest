import React, {useEffect, useRef, useState} from "react";
import usePrompt from "../../prompt";
import {HTTP} from "../../http-common";
import {useParams, useNavigate, useLocation} from "react-router-dom";
import ReactAudioPlayer from "react-audio-player";
import RightBar from "./RightBar";
import {Flag as FlagIcon} from 'react-feather';
import SubmitExamModal from "../Modal/SubmitExamModal";

var questIndex = -1;
export var answer = [];
export var flag = [];
let examL = {};
let examR = {};
window.submitState = 0;


function PromptCheck() {
    const [checkPrompt, setPrompt] = useState(true);
    const DisablePrompt = () => setPrompt(false);
    window.DisablePrompt = DisablePrompt;
    usePrompt("Kết quả của bạn sẽ không được lưu lại. Bạn chắc chắn muốn chuyển hướng?", checkPrompt);
}

function Clear() {
    answer = [];
    flag = [];
    questIndex = -1;
    window.submitState = 0;
}

export default function ExamTestComponent() {
    PromptCheck();
    const location = useLocation();
    useEffect(() => {
        Clear();
    }, [location]);

    const [exam, getExam] = useState({
        id: '',
        name: '',
        time: 0,
        questions: []
    });


    const scrollRefs = useRef([]);

    const {id} = useParams();
    let navigate = useNavigate();
    const httpFile = HTTP.getUri() + 'user/file';
    useEffect(() => {
        console.log('useEffect call!');
        window.HideSideBar();
        HTTP.get('/user/exam/' + id).then((res) => {
            getExam(res.data);
        }).catch((error) => {
            console.log(error)
        })


    }, []);

    if (exam.questions.length === 200) {
        window.submitState = 1;
        examL = {
            id: exam.id,
            name: exam.name + ' - Listening',
            time: 47,
            questions: exam.questions.filter((item, index) => {
                return index < 100
            })
        }
        examR = {
            id: exam.id,
            name: exam.name + ' - Reading',
            time: 75,
            questions: exam.questions.filter((item, index) => {
                return index > 99
            })
        }
        if (window.sessionStorage.getItem('examState') === 'L') {
            getExam(examL);
            questIndex = -1;
        }
        if (window.sessionStorage.getItem('examState') === 'R') {
            getExam(examR);
            questIndex = 99;
        }
    }

    const changeExam = () => {
        if (window.sessionStorage.getItem('examState') === 'R') {
            window.sessionStorage.setItem('examState', 'L');
            getExam(examL);
            questIndex = -1;
        } else if (window.sessionStorage.getItem('examState') === 'L') {
            window.sessionStorage.setItem('examState', "R");
            getExam(examR);
            questIndex = 99;
        }
    }

    for (let i = 0; i < exam.questions.length; i++) {
        if (answer[i] == null) answer[i] = '';
    }

    const createAnser = (e) => {
        answer[e.target.name] = e.target.value;
        window.tickEvent();
    }

    const submitExam = () => {
        window.DisablePrompt();
        HTTP.post("/user/exam/" + id, answer).then((res) => {
            console.log(res.data);
            window.ShowAlert('success', 'Nộp bài thành công, xem kết quả trên giao diện');
            navigate('/result', {state: res.data});
            sessionStorage.removeItem('examState');
            window.submitState = 0;
            questIndex = -1;
        }).catch((error) => {

            console.log(error)
        })
    }

    let filteredData = [];
    exam.questions.forEach((r) => {
        if (!filteredData[r.part]) filteredData[r.part] = [];
        filteredData[r.part].push(r);
    });

    const questions = filteredData.filter(() => true);


    function PartIntro(props) {
        if (props.part === 1) return (<div>
            <b>Directions:</b> For each question in this part, you will hear four statements about a picture in your
            test book. When you hear the statements, you must select the one statement that best describes what you
            see in the picture. Then find the number of the question on your answer sheet and mark your answer. The
            statements will not be printed in your test book and will be spoken only one time.<br/><br/>
        </div>)
        if (props.part === 2) return (<div>
            <b>Directions:</b> You will hear a question or statement and three responses spoken in English. They
            will not be printed in your test book and will be spoken only one time. Select the best response to the
            question or statement and mark the letter (A), (B), or (C) on your answer sheet.<br/><br/>
        </div>)
        if (props.part === 3) return (<div>
            <b>Directions:</b> You will hear some conversations between two or more people. You will be asked to
            answer three questions about what the speakers say in each conversation. Select the best response to
            each question and mark the letter (A), (B), (C), or (D) on your answer sheet. The conversations will not
            be printed in your test book and will be spoken only one time.<br/><br/>
        </div>)
        if (props.part === 4) return (<div>
            <b>Directions:</b> You will hear some talks given by a single speaker. You will be asked to answer
            three questions about what the speaker says in each talk. Select the best response to each question and
            mark the letter (A), (B), (C), or (D) on your answer sheet. The talks will not be printed in your test
            book and will be spoken only one time.<br/><br/>
        </div>)
        if (props.part === 5) return (<div>
            <b>Directions:</b> A word or phrase is missing in each of the sentences below. Four answer choices are
            given below each sentence. Select the best answer to complete the sentence. Then mark the letter (A),
            (B), (C), or (D) on your answer sheet.<br/><br/>
        </div>)
        if (props.part === 6) return (<div>
            <b>Directions:</b> Read the texts that follow. A word, phrase or sentence is missing in parts of each
            text. Four answer choices for each question are given below the text. Select the best answer to complete
            the text. Then mark the letter (A), (B), (C), or (D) on your answer sheet.<br/><br/>
        </div>)
        if (props.part === 7) return (<div>
            <b>Directions:</b> In this part you will read a selection of texts, such as magazine and newspaper
            articles, e-mails, and instant messages. Each text or set of texts is followed by several questions.
            Select the best answer for each question and mark the letter (A), (B), (C), or (D) on your answer
            sheet.<br/><br/>
        </div>)
    }

    function TestIntro() {
        if (sessionStorage.getItem('examState') === 'L') return (
            <div>
                <h1>LISTENING TEST</h1>
                <p>In the Listening test, you will be asked to demonstrate how well you understand spoken English. The
                    entire Listening test will last approximately 45 minutes. There are four parts, and directions are
                    given for each part. You must mark your answers on the separate answer sheet. Do not write your
                    answers in your test book.</p>
            </div>
        )
        if (sessionStorage.getItem('examState') === 'R') return (
            <div>
                <h1>READING TEST</h1>
                <p>In the Reading test, you will read a variety of texts and answer several different types of reading
                    comprehension questions. The entire Reading test will last 75 minutes. There are three parts, and
                    directions are given for each part. You are encouraged to answer as many questions as possible
                    within the time allowed.</p>
                <p>You must mark your answers on the separate answer sheet. Do not write your answers in your test
                    book.</p>
            </div>
        )
    }

    function Audio(props) {
        if (props.fileName != null) return <ReactAudioPlayer src={httpFile + '/audio/' + props.fileName}
                                                             controls></ReactAudioPlayer>
    }

    function Picture(props) {
        if (props.fileName != null) return <img style={{maxWidth:"80%"}} src={httpFile + '/picture/' + props.fileName}
                                                alt={props.fileName}></img>
    }


    function ExamBody() {
        return (<div>
            <TestIntro/>
            {questions.map((part) => {
                return (
                    <div key={part[0].part}>
                        <div>
                            <h2>PART {part[0].part}</h2>
                            <PartIntro part={part[0].part}/>
                            <div style={{display: "flex", justifyContent: "center"}}>
                                <Audio fileName={part[0].audio}/>
                            </div>
                        </div>
                        <div>
                            {part.map((ques) => {
                                questIndex++;
                                let qI = questIndex;
                                flag[qI] = false;
                                return (
                                    <div key={ques.id}>
                                        <div hidden={ques.group == null}>
                                            <b>Questions {questIndex + 1}-{questIndex + ques.group}:</b>
                                            <div style={{display: "flex", justifyContent: "center"}}>
                                                <Picture fileName={ques.group_thread}/>
                                            </div>
                                        </div>
                                        <div ref={e => scrollRefs.current[qI] = e}>{questIndex + 1}. {ques.thread}
                                            <div style={{display: "flex", justifyContent: "center"}}>
                                                <Picture fileName={ques.picture}/>
                                            </div>
                                            <div onClick={() => {
                                                flag[qI] = !flag[qI];
                                                window.tickEvent()
                                            }}><QuesFlag/></div>
                                        </div>
                                        <div hidden={ques.picture === null}></div>
                                        <div>
                                            <div>
                                                <input type="radio" name={questIndex} value="A"
                                                       onChange={createAnser}/><b>(A)</b> {ques.answerA}
                                            </div>
                                            <div>
                                                <input type="radio" name={questIndex} value="B"
                                                       onChange={createAnser}/><b>(B)</b> {ques.answerB}
                                            </div>
                                            <div>
                                                <input type="radio" name={questIndex} value="C"
                                                       onChange={createAnser}/><b>(C)</b> {ques.answerC}
                                            </div>
                                            <div hidden={ques.answerD == null}>
                                                <input type="radio" name={questIndex} value="D"
                                                       onChange={createAnser}/><b>(D)</b> {ques.answerD}
                                            </div>
                                        </div>
                                        <br/>
                                    </div>);
                            })}
                        </div>
                    </div>)
            })}

        </div>)
    }

    const scrollSmoothHandler = (index) => () => {
        scrollRefs.current[index].scrollIntoView({behavior: "smooth", block: "center"});

    };

    window.questBookMarkFnc = scrollSmoothHandler;
    window.ExamTime = exam.time;
    console.log(answer);
    console.log(scrollRefs);
    return (
        <>
            <RightBar ExamTime={exam.time}/>
            <SubmitExamModal submitFunction={submitExam} changeExam={changeExam}/>
            <div className="container-fluid p-0" style={{zIndex: 1}}>
                <h1 className="h3 mb-3">{exam.name}</h1>
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            {/*<div className="card-header">*/}
                            {/*    /!*<h5 className="card-title mb-0">Card name</h5>*!/*/}
                            {/*</div>*/}
                            <div className="card-body">
                                <ExamBody/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

function QuesFlag() {
    const [onFlag, setFlag] = useState(false);
    const ToggleFlag = () => setFlag(!onFlag);
    return (
        <FlagIcon color={onFlag ? "orange" : "gray"} onClick={ToggleFlag} style={{float: "right", cursor: "pointer"}}/>)
}

