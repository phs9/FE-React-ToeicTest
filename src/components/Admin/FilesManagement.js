import React, {useEffect, useState} from "react";
import {Delete as DeleteIcon, Edit2, Eye} from "react-feather";
import '../../dist/css/questionTable.css';
import {HTTP} from "../../http-common";
import DeleteConfirmModal from "../Modal/DeleteConfirmModal";
import {OverlayTrigger, Popover} from "react-bootstrap";
import ReactAudioPlayer from "react-audio-player";

export default function FilesManagement() {

    const [audio, setAudio] = useState([]);
    const [picture, setPicture] = useState([]);
    const httpFile = HTTP.getUri() + 'user/file';

    const getDataAudio = () => {
        HTTP.get('/admin/file/audio').then((res) => {
            setAudio(res.data);
        }).catch((error) => {
            console.log(error)
        })
    }
    const getDataPicture = () => {
        HTTP.get('/admin/file/picture').then((res) => {
            setPicture(res.data);
        }).catch((error) => {
            console.log(error)
        })
    }
    useEffect(() => {
        getDataAudio();
        getDataPicture();
    }, [])

    function Audio(props) {
        if (props.fileName != null) return <ReactAudioPlayer src={httpFile + '/audio/' + props.fileName}
                                                             controls></ReactAudioPlayer>
    }

    function Picture(props) {
        if (props.fileName != null) return <img width="400" height="400" style={{maxWidth: "80%"}}
                                                src={httpFile + '/picture/' + props.fileName}
                                                alt={props.fileName}></img>
    }

    const [file, setFile] = useState();
    const formData = new FormData();

    function uploadAudio(e) {
        e.preventDefault();
        for (let i = 0; i < file.length; i++) {
            //formData[i] = new FormData();
            formData.append('files', file[i])
        }
        console.log(formData);

        HTTP.post('/admin/upload/audio', formData).then((res) => {
            console.log(res.data);
            window.ShowAlert('success', 'Upload file nghe thành công');
            getDataAudio();
        }).catch((error) => {
            console.log(error);
            window.ShowAlert('danger', 'Upload file nghe không thành công');
        })
    }

    const [file2, setFile2] = useState();
    const formData2 = new FormData();

    function uploadPicture(e) {
        e.preventDefault();
        for (let i = 0; i < file2.length; i++) {
            //formData[i] = new FormData();
            formData2.append('files', file2[i])
        }
        console.log(formData);

        HTTP.post('/admin/upload/picture', formData2).then((res) => {
            console.log(res.data);
            window.ShowAlert('success', 'Upload file ảnh thành công');
            getDataPicture();
        }).catch((error) => {
            console.log(error);
            window.ShowAlert('success', 'Upload file ảnh không thành công');
        })
    }

    function DeleteFile(filePathName) {
        HTTP.delete('/admin/file/' + filePathName).then((res) => {
            console.log(res.data);
            window.ShowAlert('success', 'Xoá file thành công');
            getDataAudio();
            getDataPicture();
        }).catch((error) => {
            console.log(error);
            window.ShowAlert('danger', 'Xoá file không thành công');
        })
    }

    const popoverA = (filename) => {
        return (
            <Popover id="popover-basic" style={{maxWidth: "100%"}}>
                <Popover.Header as="h3">Xem trước</Popover.Header>
                <Popover.Body>
                    <Audio fileName={filename}/>
                </Popover.Body>
            </Popover>
        )
    }

    const popoverP = (filename) => {
        return (
            <Popover id="popover-basic" style={{maxWidth: "100%"}}>
                <Popover.Header as="h3">Xem trước</Popover.Header>
                <Popover.Body>
                    <Picture fileName={filename}/>
                </Popover.Body>
            </Popover>
        )
    }

    const popoverEdit = (folder, filename) => {
        let newName = filename;

        function ChangeName(e) {
            e.preventDefault();
            console.log(newName);
            HTTP.post('/admin/renameFile/' + folder + '/' + filename, newName).then((res) => {
                console.log(res.data);
                window.ShowAlert('success', 'Đổi tên file thành công');
                getDataAudio();
                getDataPicture();
            }).catch((error) => {
                console.log(error);
                window.ShowAlert('danger', 'Đổi tên file không thành công');
            })
        }

        return (
            <Popover id="popover-basic" style={{width: "100%"}}>
                <Popover.Header as="h3">Đổi tên</Popover.Header>
                <Popover.Body>
                    <form onSubmit={ChangeName}>
                        <div className="input-group mb-3">
                            <input className="form-control" type="text"
                                   placeholder="Nhập tên mới"
                                   defaultValue={filename}
                                   onChange={(e) => {
                                       newName = e.target.value
                                   }}
                            />
                            <button className="btn btn-success" type="submit">Lưu</button>
                        </div>
                    </form>
                </Popover.Body>
            </Popover>
        )
    }

    return (
        <>
            <DeleteConfirmModal DeleteFunction={DeleteFile}/>
            <div className="container-fluid p-0">
                {/*<h1 className="h3 mb-3">Danh sách bài thi thử</h1>*/}
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            {/*<div className="card-header">*/}
                            {/*    /!*<h5 className="card-title mb-0">Empty card</h5>*!/*/}
                            {/*</div>*/}
                            <div className="card-body">
                                <h1>File âm thanh:</h1>
                                <div className="row">
                                    <div className="col-4">
                                        <h4>Số file nghe: {audio.length}</h4>
                                    </div>
                                    <div className="col-8">
                                        <form encType="multipart/form-data" onSubmit={uploadAudio}>
                                            <label>Upload file âm thanh:</label><br/>
                                            <input type="file" accept="audio/*" multiple="multiple" name="file"
                                                   onChange={(e) => {
                                                       setFile(e.target.files)
                                                   }}
                                            />
                                            <button type="submit" className="btn btn-primary">Upload
                                            </button>
                                        </form>
                                    </div>
                                </div>
                                <div className="tableFixHead">
                                    <table className="table table-bordered caption-top"
                                           style={{width: "100$"}}>
                                        <thead style={{verticalAlign: "middle"}}>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Tên file</th>
                                            <th scope="col">Kích cỡ</th>
                                            <th scope="col" style={{width: "20%"}}>Tuỳ chọn</th>
                                        </tr>
                                        </thead>
                                        <tbody style={{}}>
                                        {audio.map((item, index) =>
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.filename}</td>
                                                <td>{(item.size / 1048576).toFixed(2)} MB</td>
                                                <td style={{display: "flex", justifyContent: "space-between"}}>
                                                    <OverlayTrigger trigger="click" placement="left"
                                                                    overlay={popoverA(item.filename)}>
                                                        <Eye style={{cursor: "pointer"}}/>
                                                    </OverlayTrigger>
                                                    <OverlayTrigger trigger="click" placement="left"
                                                                    overlay={popoverEdit('audio', item.filename)}>
                                                        <Edit2 style={{cursor: "pointer"}}/>
                                                    </OverlayTrigger>
                                                    <DeleteIcon style={{cursor: "pointer"}} color="red"
                                                                onClick={() => {
                                                                    window.deleteObj = {
                                                                        id: 'audio/' + item.filename,
                                                                        name: item.filename
                                                                    }
                                                                    window.ShowDeleteConfirm();
                                                                }}
                                                    />
                                                </td>
                                            </tr>
                                        )}
                                        </tbody>
                                    </table>
                                </div>
                                <hr/>
                                <h1>File hình ảnh:</h1>
                                <div className="row">
                                    <div className="col-4">
                                        <h4>Số file ảnh: {picture.length}</h4>
                                    </div>
                                    <div className="col-8">
                                        <form encType="multipart/form-data" onSubmit={uploadPicture}>
                                            <label>Upload file hình ảnh:</label><br/>
                                            <input type="file" accept="image/*" multiple="multiple" name="file"
                                                   onChange={(e) => {
                                                       setFile2(e.target.files)
                                                   }}
                                            />
                                            <button type="submit" className="btn btn-primary">Upload
                                            </button>
                                        </form>
                                    </div>
                                </div>
                                <div className="tableFixHead">
                                    <table className="table table-bordered caption-top"
                                           style={{width: "100%"}}>
                                        <thead style={{verticalAlign: "middle"}}>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Tên file</th>
                                            <th scope="col">Kích cỡ</th>
                                            <th scope="col" style={{width: "20%"}}>Tuỳ chọn</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {picture.map((item, index) =>
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.filename}</td>
                                                <td>{(item.size / 1024).toFixed(2)} KB</td>
                                                <td style={{display: "flex", justifyContent: "space-between"}}>
                                                    <OverlayTrigger trigger="click" placement="left"
                                                                    overlay={popoverP(item.filename)}>
                                                        <Eye style={{cursor: "pointer"}}/>
                                                    </OverlayTrigger>
                                                    <OverlayTrigger trigger="click" placement="left"
                                                                    overlay={popoverEdit('picture', item.filename)}>
                                                        <Edit2 style={{cursor: "pointer"}}/>
                                                    </OverlayTrigger>
                                                    <DeleteIcon style={{cursor: "pointer"}} color="red"
                                                                onClick={() => {
                                                                    window.deleteObj = {
                                                                        id: 'picture/' + item.filename,
                                                                        name: item.filename
                                                                    }
                                                                    window.ShowDeleteConfirm();
                                                                }}
                                                    />
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