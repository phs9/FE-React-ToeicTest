import React from "react";
import toiec from '../../dist/Img/toeic_intro.jpg';
import point from '../../dist/Img/toeic_point.png';
import {useNavigate} from "react-router-dom";

export default function HomePage() {
    let navigate = useNavigate();
    return (
        <>
            <div className="container-fluid p-0">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <h1>CẤU TRÚC BÀI THI TOEIC MỚI NHẤT</h1>
                                <center>
                                    <img src={toiec} alt="Cấu trúc đề thi Toeic" width="586" height="1466"></img>
                                    <div>Nguồn: anhngumisshoa.com</div>
                                </center>
                                <h1>CẤU TRÚC ĐỀ THI TOEIC 2 KỸ NĂNG</h1>
                                <p>Cấu trúc bài thi Toeic 2 kỹ năng nghe nói gồm 200 câu hỏi và thời gian làm bài thi
                                    toeic là trong 120 phút. Trong đó phần nghe (listening) có thời gian làm bài thi là
                                    45 phút và phần nói (reading) là 75 phút.</p>
                                <h2>1. Phần nghe (Listening)</h2>
                                <b>Phần thi TOEIC listening gồm: </b>
                                <ul>
                                    <li>100 câu hỏi</li>
                                    <li>45 phút</li>
                                </ul>
                                <table className="table table-bordered">
                                    <thead>
                                    <tr>
                                        <th>Phần Listening</th>
                                        <th>Chi tiết</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td><b>Phần 1<br/>
                                            Mô tả tranh (6 câu)</b></td>
                                        <td>- Xem 1 bức tranh trong đề và nghe 4 đáp án. Chọn đáp án mô tả đúng về bức
                                            tranh.
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><b>Phần 2<br/>Hỏi đáp (25 câu)</b></td>
                                        <td>- Nghe một câu hỏi và 3 lựa chọn trả lời cho từng câu hỏi => chọn câu trả
                                            lời
                                            phù hợp với câu hỏi.<br/>- Bài nghe có thể xuất hiện các cách nói rút gọn
                                            như:
                                            going to => gonna, want to => wanna<br/>- Câu hỏi và câu trả lời không in
                                            trong đề thi.
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><b>Phần 3<br/>Hội thoại ngắn (39 câu)</b></td>
                                        <td>- Nghe 13 đoạn hội thoại ngắn không in trong đề thi. Mỗi đoạn có 03 câu hỏi,
                                            mỗi câu hỏi sẽ có 4 đáp án lựa chọn. => chọn đáp án đúng nhất.<br/>- Xuất
                                            hiện
                                            các đoạn hội thoại có 3 người nói thay vì 2 người: 1 man & 2 women hoặc 2
                                            men & 1 woman<br/>- Người thi phải kết hợp những gì nghe được với biểu đồ/
                                            bảng biểu cho sẵn để trả lời câu hỏi.
                                            <br/>- Có câu hỏi buộc người đọc phải dựa vào những gì nghe được để đoán ý
                                            người
                                            nói.
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><b>Phần 4<br/>Bài nói chuyện ngắn (30 câu)</b></td>
                                        <td>- Nghe 10 đoạn thông tin ngắn. Mỗi đoạn có 03 câu hỏi. => chọn đáp án đúng
                                            nhất
                                            <br/>- Lưu ý: Có dạng bài người thi phải kết hợp thông tin nghe với biểu đồ,
                                            hình ảnh được cho sẵn để trả lời.
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                                <h2>2. Phần đọc (Reading)</h2>
                                <p>Tương tự như Phần nghe, Phần đọc cũng vẫn giữ nguyên số câu là 100 câu và thời gian
                                    thi là 75 phút.</p>
                                <table className="table table-bordered">
                                    <thead>
                                    <tr>
                                        <th colSpan="2">Phần Reading</th>
                                        <th>Chi tiết</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td colSpan="2"><b>Phần 5<br/>Hoàn thành câu (30 câu)</b></td>
                                        <td>- Gồm các câu chưa hoàn thành + 4 từ hoặc cụm từ được đánh dấu tương ứng A,
                                            B,
                                            C, hoặc D => chọn từ đúng nhất để hoàn thành câu.
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="2"><b>Phần 6<br/>Hoàn thành đoạn văn (16 câu)</b></td>
                                        <td>- Gồm 4 bài đọc ngắn, mỗi bài đọc có 3 chỗ trống cần điền từ hoặc cụm từ,
                                            câu
                                            + 4 đáp án => chọn đáp án thích hợp
                                            <br/>
                                            - Có dạng bài tập bắt người thi điền một câu vào chỗ trống thay vì chỉ điền
                                            từ/ cụm từ.
                                        </td>
                                    </tr>
                                    <tr>
                                        <td rowSpan="2"><b>Phần 7</b></td>
                                        <td><b>Đoạn đơn (29 câu)</b></td>
                                        <td> - Gồm 10 đoạn đơn, có nội dung dựa trên các tài liệu đọc như thư từ, thông
                                            báo, biểu mẫu, báo. Hết mỗi đoạn văn sẽ có 2-5 câu hỏi và 4 lựa chọn => chọn
                                            ra câu trả lời chính xác nhất.
                                            <br/>- Xuất hiện bài đọc bao gồm 3 đoạn.
                                            <br/>- Có bài đọc dạng tin nhắn điện thoại, chat, …
                                            <br/>- Xuất hiện câu hỏi yêu cầu người thi điền câu vào chỗ trống.
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><b>Đoạn kép (25 câu)</b></td>
                                        <td>- Có 2 đoạn văn kép và 3 đoạn ba, 5 câu hỏi mỗi đoạn, mỗi câu hỏi có 4
                                            phương
                                            án trả lời A, B, C, hoặc D. Bạn cần xác định đáp án đúng cho từng câu hỏi.
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                                <div style={{float: "right"}}>Nguồn: anhngumisshoa.com</div>
                                <br/>
                                <center>
                                    <button className="btn btn-primary" onClick={() => {
                                        navigate('/exam')
                                    }}>Thi thử ngay
                                    </button>
                                </center>
                                <hr/>
                                <h1 id="TP">BẢNG QUY ĐỔI ĐIỂM TOEIC</h1>
                                <center>
                                    <img src={point} alt="Bảng quy đổi điểm toeic"></img>
                                    <div>Nguồn: cla.hust.edu.vn</div>
                                </center>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}