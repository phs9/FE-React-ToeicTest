import React, {useState} from "react";
import Alert from 'react-bootstrap/Alert';

export default function MyAlert() {
    const [show, setShow] = useState(false);

    return (
        <>
            <div style={{position: "fixed", zIndex: 1000, minWidth: "100vh"}}>

                <Alert show={show} variant="success" dismissible onClose={() => setShow(false)} transition>
                    <p>

                    </p>
                </Alert>
            </div>
        </>
    )
}