import React, {useState} from "react";
import {Modal} from "react-bootstrap";


export default function SubmitExamModal(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
    }

    window.SubmitModalShowFnc = handleShow;

    function submitModal(){
        if (window.submitState === 0) props.submitFunction();

        if (window.submitState === 1) {
            window.ShowAlert('primary', 'Chuyển sang phần thi còn lại');
            props.changeExam();
            window.submitState = 0;
            window.scrollTo(0,0);
        }
        handleClose();
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận nộp bài</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn không thể quay lại sau khi đã nộp bài. Hãy kiểm tra lại thật kỹ!
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-primary" onClick={submitModal}>
                        Nộp bài
                    </button>
                    <button className="btn btn-secondary" onClick={handleClose}>
                        Huỷ
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    )
}