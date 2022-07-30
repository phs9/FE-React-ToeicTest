import React, {useState} from "react";
import {Modal} from "react-bootstrap";


export default function EditQuestionConfirmModal(props) {
    const [show, setShow] = useState(false);
    const [items, setItem] = useState([]);
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setItem(window.editQList);
        setShow(true);
    }

    window.ShowEditQModal = handleShow;
    //window.editQList = [];

    return (
        <>
            <Modal size="xl" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Xem lại các câu hỏi thay đổi trước khi lưu</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{height: "60vh",width:"unset", overflowY: "scroll", overflowX: "scroll"}}>
                        {items.map((item, index) =>
                            <div key={index} style={{display:"inline-block", whiteSpace:"nowrap"}}><b style={{color:"blue"}}>{index}: </b>{JSON.stringify(item)}</div>
                        )}
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-primary" onClick={()=>{
                        props.saveEditQ();
                        handleClose();
                    }}>
                        Lưu
                    </button>
                    <button className="btn btn-secondary" onClick={handleClose}>
                        Huỷ
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    )
}