import React, {useEffect, useState} from "react";
import {HTTP} from "../../http-common";
import {Users, Activity, File, List, Music, Image} from "react-feather";

export default function DashBoardsComponent() {

    const [dashboards, getDashboards] = useState({});

    useEffect(() => {
        HTTP.get('/admin/dashboards').then((res) => {
            getDashboards(res.data);
        }).catch((error) => {
            console.log(error);
        })
    }, []);

    return (
        <>
            <div className="container-fluid p-0">
                <div className="row mb-2 mb-xl-3">
                    <div className="col-auto d-none d-sm-block">
                        <h3><strong>Dashboard</strong></h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-12 col-xxl-12 d-flex">
                        <div className="w-100">
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col mt-0">
                                                    <h5 className="card-title">Tài khoản</h5>
                                                </div>
                                                <div className="col-auto">
                                                    <div className="stat text-primary">
                                                        <Users/>
                                                    </div>
                                                </div>
                                            </div>
                                            <h1 className="mt-1 mb-3">{dashboards.number_of_acc}</h1>

                                        </div>
                                    </div>
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col mt-0">
                                                    <h5 className="card-title">Số bài thi </h5>
                                                </div>
                                                <div className="col-auto">
                                                    <div className="stat text-primary">
                                                        <File/>
                                                    </div>
                                                </div>
                                            </div>
                                            <h1 className="mt-1 mb-3">{dashboards.number_of_exam}</h1>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col mt-0">
                                                    <h5 className="card-title">Số file nghe</h5>
                                                </div>
                                                <div className="col-auto">
                                                    <div className="stat text-primary">
                                                        <Music/>
                                                    </div>
                                                </div>
                                            </div>
                                            <h1 className="mt-1 mb-3">{dashboards.number_of_audio}</h1>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col mt-0">
                                                    <h5 className="card-title">Số lượt thi</h5>
                                                </div>
                                                <div className="col-auto">
                                                    <div className="stat text-primary">
                                                        <Activity/>
                                                    </div>
                                                </div>
                                            </div>
                                            <h1 className="mt-1 mb-3">{dashboards.number_of_result}</h1>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col mt-0">
                                                    <h5 className="card-title">Số câu hỏi</h5>
                                                </div>
                                                <div className="col-auto">
                                                    <div className="stat text-primary">
                                                        <List/>
                                                    </div>
                                                </div>
                                            </div>
                                            <h1 className="mt-1 mb-3">{dashboards.number_of_question}</h1>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col mt-0">
                                                    <h5 className="card-title">Số file ảnh </h5>
                                                </div>
                                                <div className="col-auto">
                                                    <div className="stat text-primary">
                                                        <Image/>
                                                    </div>
                                                </div>
                                            </div>
                                            <h1 className="mt-1 mb-3">{dashboards.number_of_picture}</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}