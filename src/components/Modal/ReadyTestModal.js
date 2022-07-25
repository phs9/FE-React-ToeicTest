import React, {useState} from "react";
import {Modal} from "react-bootstrap";
import {useNavigate} from "react-router-dom";


export default function ReadyTestModal(props) {
    const [show, setShow] = useState(props.show);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let navigate = useNavigate();

    return (
        <>
            <a onClick={handleShow}
               style={{textDecoration: "underline", color: "blue"}}>
                <h4 style={{color: "blue"}}>{props.name}</h4>
            </a>

            <Modal size="xl" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h3>Chuẩn bị:</h3>
                    <ul>
                        <li>Máy tính hoặc điện thoại có <strong>đường truyền Internet tốt</strong> để việc làm bài không
                            bị gián đoạn.
                        </li>
                        <li>Cài đặt <strong>trình duyệt mới nhất</strong> (Chrome, Cốc Cốc, Firefox, Safari...)</li>
                        <li><strong>Cắm tai nghe</strong> hoặc bật loa ngoài để kiểm tra trước âm thanh</li>
                    </ul>
                    <h3>Nội dung các phần thi:</h3>
                    <ul>
                        <li><strong>Phần thi Nghe hiểu</strong> (TOEIC Listening): gồm 100 câu, làm trong 45 phút. Bạn
                            cần làm tuần tự từng câu một.
                        </li>
                        <li><strong>Phần thi Đọc hiểu</strong> (TOEIC Reading): gồm 100 câu, làm trong 75 phút. Bạn có
                            thể chọn phần bất kỳ, câu bất kỳ để làm trước.
                        </li>
                    </ul>
                    <h3>Khi làm bài:</h3>
                    <ul>
                        <li>Chọn đáp án đúng bằng cách nhấp chuột vào các lựa chọn <strong>A</strong>, <strong>B</strong>, <strong>C</strong>, <strong>D</strong>.</li>
                        <li>Nhấn nút <strong>[Submit]</strong> để chuyển sang phần thi còn lại
                            (Listening/Reading) hoặc nộp bài.</li>
                    </ul>
                    <h3>Chú ý khác:</h3>
                    <ul>
                        <li>Khi làm bài thi: Bạn không được phép <strong>tải lại, chuyển hướng trang</strong>. Bài làm
                            của bạn sẽ không được lưu lại.
                        </li>
                        <li>Nếu kiểm tra trình độ, bạn đừng làm đi làm lại một đề vì kết quả sẽ không phản ánh đúng mức
                            độ hiện tại của bạn.
                        </li>
                    </ul>
                    <div className="row">
                        <div className="col-md-6 text-center">
                            <button className="btn btn-primary" onClick={() => {
                                navigate('/exam/' + props.id);
                                window.sessionStorage.setItem('examState', 'L');
                            }}>Phần Listening (45 phút)
                            </button>
                        </div>
                        <div className="col-md-6 text-center">
                            <button className="btn btn-primary" onClick={() => {
                                navigate('/exam/' + props.id);
                                window.sessionStorage.setItem('examState', 'R');
                            }}>Phần Reading (75 phút)
                            </button>
                        </div>
                    </div>

                </Modal.Body>


                {/*<Modal.Footer>*/}
                {/*    <button variant="secondary" onClick={handleClose}>*/}
                {/*        Close*/}
                {/*    </button>*/}
                {/*    <button variant="primary" onClick={props.submitFunc}>*/}
                {/*        Save Changes*/}
                {/*    </button>*/}
                {/*</Modal.Footer>*/}
            </Modal>
        </>
    );
}