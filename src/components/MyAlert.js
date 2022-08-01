import React, {useState} from "react";
import Alert from 'react-bootstrap/Alert';

window.alertObj = {
    message: '',
    type: ''
}

export default function MyAlert() {
    const [show, setShow] = useState(false);

    const showAlert = (type, message) => {
        if (show === true) setShow(false);
        window.alertObj = {
            message: message,
            type: type
        }
        setShow(true);
        window.setTimeout(() => {
            setShow(false);
        }, 3000)
    }

    window.ShowAlert = showAlert;

    return (
        <>
            <div style={{
                marginTop: "10px",
                position: "fixed",
                width: "100%",
                zIndex: 10000000000,
                justifyContent: "center",
                display: "flex"
            }}>

                <Alert show={show} variant={window.alertObj.type} dismissible onClose={() => setShow(false)} transition
                       style={{}}>
                    <p>
                        {window.alertObj.message}
                    </p>
                </Alert>
            </div>
        </>
    )
}