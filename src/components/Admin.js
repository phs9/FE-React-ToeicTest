import React, {useState, useEffect} from "react";
import {Outlet, useLocation, useNavigate, useParams} from "react-router-dom";
import {
    HelpCircle,
    Home as IconHome,
    Lock,
    LogOut as IconLogOut,
    User as IconUser,
    Users as IconUsers,
    Briefcase
} from "react-feather";

export default function Admin() {
    const [sideBarToggle, setSideBar] = useState(true);
    window.HideSideBar = () => {
        setSideBar(false)
    };
    const [accountMenuToggle, setAccMenu] = useState(false);
    const [url, setUrl] = useState();
    const {id} = useParams();
    let navigate = useNavigate();

    const location = useLocation();
    useEffect(() => {
        setUrl(location.pathname);
        console.log(url);
    });


    function LogOut() {
        // sessionStorage.removeItem("token");
        // sessionStorage.removeItem("email");
        // sessionStorage.removeItem("role");
        // sessionStorage.removeItem("userid");
        // sessionStorage.removeItem("name");
        // sessionStorage.removeItem("examState");
        sessionStorage.clear();
        //window.location.reload();
        navigate('/');
    }


    console.log('User render');
    return (
        <>
            <div className="wrapper">
                <nav className="navbar navbar-expand navbar-light navbar-bg"
                     style={{position: "fixed", zIndex: 999, width: "100%"}}>
                    <div className="sidebar-toggle js-sidebar-toggle" onClick={() => {
                        setSideBar(!sideBarToggle)
                    }}>
                        <i className="hamburger align-self-center"/>
                    </div>
                    <a className="sidebar-brand" href="/admin">
                        <span className="align-middle">Online Toeic Test</span>
                    </a>
                    <div className="navbar-collapse collapse">
                        <ul className="navbar-nav navbar-align">
                            <li className="nav-item dropdown" onClick={() => {
                                setAccMenu(!accountMenuToggle)
                            }}>
                                <a className="nav-icon dropdown-toggle d-inline-block d-sm-none"
                                   data-bs-toggle="dropdown">
                                    <IconUser></IconUser>
                                </a>
                                <a className="nav-link dropdown-toggle d-none d-sm-inline-block"
                                   data-bs-toggle="dropdown">
                                    <IconUser></IconUser>
                                    <span className="text-dark">{sessionStorage.getItem('name')}</span>
                                </a>
                                <div
                                    className={'dropdown-menu dropdown-menu-end ' + (accountMenuToggle ? 'show' : '')}
                                    style={{left: "auto", right: 0}}>
                                    <a className="dropdown-item" onClick={() => {
                                        navigate('/admin/accInfo')
                                    }}>
                                        <IconUser height="18" width="18" strokeWidth="2"
                                                  style={{marginRight: 5}}></IconUser>
                                        Thông tin tài khoản</a>
                                    <div className="dropdown-divider"/>
                                    <a className="dropdown-item" href="index.html">
                                        <Lock height="18" width="18" strokeWidth="2"
                                              style={{marginRight: 5}}></Lock>
                                        Đổi mật khẩu</a>
                                    <a className="dropdown-item">
                                        <HelpCircle height="18" width="18" strokeWidth="2"
                                                    style={{marginRight: 5}}></HelpCircle>
                                        Trợ giúp</a>
                                    <div className="dropdown-divider"/>
                                    <a className="dropdown-item" onClick={LogOut}>
                                        <IconLogOut height="18" width="18" strokeWidth="2"
                                                    style={{marginRight: 5}}></IconLogOut>
                                        Đăng xuất</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
                <nav id="sidebar" className={'sidebar js-sidebar ' + (sideBarToggle ? '' : 'collapsed')}>
                    <div className="sidebar-content js-simplebar" data-simplebar="init">
                        <div className="simplebar-wrapper" style={{"margin": "0px"}}>
                            <div className="simplebar-height-auto-observer-wrapper">
                                <div className="simplebar-height-auto-observer"/>
                            </div>
                            <div className="simplebar-mask">
                                <div className="simplebar-offset" style={{"right": "0px", "bottom": "0px"}}>
                                    <div className="simplebar-content-wrapper" tabIndex={0} role="region"
                                         aria-label="scrollable content"
                                         style={{"height": "100%", "overflow": "hidden scroll"}}>
                                        <div className="simplebar-content" style={{"padding": "0px", marginTop: 50}}>
                                            <ul className="sidebar-nav">
                                                <li className="sidebar-header">
                                                    Pages
                                                </li>
                                                <li className={"sidebar-item " + (url === '/admin/dashboards' ? "active" : "")}>
                                                    <a className="sidebar-link"
                                                       onClick={() => navigate('/admin/dashboards')}>
                                                        <IconHome/>
                                                        <span className="align-middle">Dashboards</span>
                                                    </a>
                                                </li>
                                                <li className={"sidebar-item " + (url === '/admin/accounts' ? "active" : "")}>
                                                    <a className="sidebar-link" onClick={() => {
                                                        navigate('/admin/accounts')
                                                    }}>
                                                        <IconUsers/>
                                                        <span className="align-middle">Quản lý tài khoản</span>
                                                    </a>
                                                </li>
                                                <li className={"sidebar-item " + (url === (id === undefined ? '/admin/examsManagement' : '/admin/examsManagement/' + id) ? "active" : "")}>
                                                    <a className="sidebar-link"
                                                       onClick={() => navigate('/admin/examsManagement')}>
                                                        <Briefcase/>
                                                        <span className="align-middle">Quản lý đề thi</span>
                                                    </a>
                                                </li>
                                                <li className={"sidebar-item " + (url === (id === undefined ? '/admin/questionsManagement' : '/admin/questionsManagement/' + id) ? "active" : "")}>
                                                    <a className="sidebar-link"
                                                       onClick={() => navigate('/admin/questionsManagement')}>
                                                        <Briefcase/>
                                                        <span className="align-middle">Quản lý câu hỏi</span>
                                                    </a>
                                                </li>
                                                <li className={"sidebar-item " + (url === (id === undefined ? '/admin/filesManagement' : '/admin/filesManagement/' + id) ? "active" : "")}>
                                                    <a className="sidebar-link"
                                                       onClick={() => navigate('/admin/filesManagement')}>
                                                        <Briefcase/>
                                                        <span className="align-middle">Quản lý file</span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="simplebar-placeholder" style={{"width": "auto", "height": "949px"}}/>
                        </div>
                    </div>
                </nav>
                <div className="main">
                    <main className="content" style={{marginTop: 50, overflowY:"scroll"}}>

                        <Outlet/>
                    </main>
                    <footer className="footer">
                        <div className="container-fluid">
                            <div className="row text-muted">
                                <div className="col-6 text-start">
                                    <p className="mb-0">
                                        <a className="text-muted" href="/admin"
                                        ><strong>Online Toeic Test</strong></a> ©
                                    </p>
                                </div>
                                <div className="col-6 text-end">
                                    <ul className="list-inline">
                                        <li className="list-inline-item">
                                            <a className="text-muted">Trợ
                                                giúp
                                            </a>
                                        </li>
                                        <li className="list-inline-item">
                                            <a className="text-muted"
                                            >Quyền riêng tư</a>
                                        </li>
                                        <li className="list-inline-item">
                                            <a className="text-muted"
                                            >Điều khoản sử dụng</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>


        </>


    )
}