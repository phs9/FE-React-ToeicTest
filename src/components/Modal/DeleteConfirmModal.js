import React, {useEffect, useState} from "react";
import {Modal} from "react-bootstrap";

window.deleteObj={};

export default function DeleteConfirmModal(props) {
    const [show, setShow] = useState(false);
    const [deleteObj, getObj]= useState({});

    useEffect(()=>{
        getObj(window.deleteObj);
    },[window.deleteObj])

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
    }

    window.ShowDeleteConfirm = handleShow;

    return (
        <>
            <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter"
                   centered>
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận xoá</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có chắc chắn muốn xoá <strong>{deleteObj.name}</strong>?
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-danger" onClick={() => {
                        props.DeleteFunction(deleteObj.id, deleteObj.allQ);
                        handleClose()
                    }}>
                        Xoá
                    </button>
                    <button className="btn btn-secondary" onClick={handleClose}>
                        Huỷ
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    )
}