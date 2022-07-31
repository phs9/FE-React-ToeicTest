import React, {useEffect, useState} from 'react';
import {ChevronRight} from "react-feather";
import '../../dist/css/style.css';
import {answer, flag} from "./ExamTestComponent";


export default function RightBar() {
    const [sideBarToggle, setToggle] = useState(true);
    const ShowRightBar = () => setToggle(true);
    const HideRigntBar = () => setToggle(false);
    return (
        <>
            <button hidden={sideBarToggle} className="btn btn-info" onClick={ShowRightBar}
                    style={{float: "right", position: "fixed", right: 10, zIndex: 2}}
            ><strong><TimeCount/></strong>
            </button>
            <nav id="sidebar" className={sideBarToggle ? 'sidebar js-sidebar' : 'sidebar js-sidebar collapsed1'}
                 style={{
                     top: 0,
                     marginTop: -10,
                     float: "right",
                 }}>
                <div className="sidebar-content js-simplebar" data-simplebar="init" style={{zIndex: 1}}>
                    <div className="container-fluid p-0"
                         style={{position: "fixed", maxWidth: 290, textAlign: "center"}}>

                        {/*<h1 className="h3 mb-3"></h1>*/}
                        <div className="row">
                            <div className="col" style={{}}>
                                <div className="card">
                                    {/*<div className="card-header">*/}
                                    {/*    <h5 className="card-title mb-0"><TimeCountDown/></h5>*/}
                                    {/*</div>*/}
                                    <div className="card-body" style={{}}>
                                        <button className="btn btn-info" onClick={HideRigntBar}
                                                style={{
                                                    maxWidth: "fit-content",
                                                    maxHeight: "fit-content",
                                                    float: "left",
                                                    marginLeft: -15,
                                                    marginTop: -15
                                                }}>
                                            <ChevronRight size={14}/></button>
                                        <div style={{fontSize: 24, marginRight: 28}}>
                                            <strong><TimeCount/></strong>
                                        </div>
                                        <button className="btn btn-primary" onClick={window.SubmitModalShowFnc}>Submit
                                        </button>
                                        <hr/>
                                        <QuestBookMark/>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}

function TimeCount() {

    const [minute, setM] = useState(0);
    const [second, setS] = useState(0);

    useEffect(() => {
        setM(window.ExamTime);
        setS(0);

    }, [window.ExamTime]);


    useEffect(() => {
        const intervalId = setInterval(() => {
            if (minute === 0 && second === 0) {
                window.ShowAlert('warning', 'Đã hết thời gian làm bài, hãy nộp bài');
            }
            if (second > 0) setS(second - 1);
            if (second === 0) {
                if (minute === 0) {
                    clearInterval();
                } else {
                    setM(minute - 1);
                    setS(59);
                }
            }
        }, 1000)
        return () => {
            clearInterval(intervalId);
        }
    }, [minute, second]);

    return (
        <>
            {minute.toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false
            })} : {second.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
        })}
        </>
    )
}


function QuestBookMark() {
    let quesIndex = -1;

    const [State, changeState] = useState();


    if (window.sessionStorage.getItem('examState') === 'L') quesIndex = -1;
    if (window.sessionStorage.getItem('examState') === 'R') quesIndex = 99;

    window.tickEvent = () => {
        changeState(Math.random())
    };

    return (
        <>
            <div className="QB" style={{
                overflowY: "auto",
                height: "60vh",
                alignContent: "start",
                maxWidth: "418",
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap"
            }}>
                {answer.filter((item, index) => {
                    if (window.sessionStorage.getItem('examState') === 'L') return index < 100
                    else if (window.sessionStorage.getItem('examState') === 'R') return index > 99
                    else return answer;
                }).map((bt, index) => {
                        ++quesIndex;
                        return (
                            <div key={index} style={{display: "inline-block", flex: "0 0 20%", paddingTop: 5}}>
                                <button onClick={window.questBookMarkFnc(quesIndex)}
                                        style={{
                                            minWidth: 40,
                                            backgroundColor: flag[quesIndex] === true ? "orange" : answer[quesIndex] === '' ? "unset" : "aqua"
                                        }}>{quesIndex + 1}
                                </button>
                            </div>
                        )
                    }
                )}
            </div>
        </>
    )
}


