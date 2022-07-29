import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import ListExamComponent from "./components/User/ListExamComponent";
import ExamTestComponent from "./components/User/ExamTestComponent";
import Login from "./components/Login";
import {Navigate, Outlet} from 'react-router-dom';
import User from "./components/User";
import Admin from "./components/Admin";
import NoPage from "./components/NoPage";
import ExamResult from "./components/User/ExamResult";
import ListResultComponent from "./components/User/ListResultComponent";
import DashBoardsComponent from "./components/Admin/DashBoardsComponent";
import AccountsManagementComponent from "./components/Admin/AccountsManagementComponent";
import ExamsManagementComponent from "./components/Admin/ExamsManagementComponent";
import EditExamComponent from "./components/Admin/EditExamComponent";
import QuestionsManagement from "./components/Admin/QuestionsManagement";

function App() {
    let checkLogin = sessionStorage.getItem('token') === null ? false : true;
    //checkLogin = true;
    // function PrivateRoute({children}) {
    //     return checkLogin ? children : <Navigate to="/"/>;
    // }

    function PrivateOutlet() {
        return checkLogin ? <Outlet/> : <Navigate to="/"/>;
    }


    return (
        <BrowserRouter>
            <Routes>
                <Route>
                    <Route path="/" element={<Login/>}/>
                </Route>
                <Route element={<PrivateOutlet/>}>
                    <Route element={<User/>}>
                        <Route path="/home"/>
                        <Route path="/exam" element={<ListExamComponent/>}/>
                        <Route path="/exam/:id" element={<ExamTestComponent/>}/>
                        <Route path="/result" element={<ExamResult/>}/>
                        <Route path="/results" element={<ListResultComponent/>}/>
                    </Route>
                    <Route path="/admin" element={<Admin/>}>
                        <Route path="dashboards" element={<DashBoardsComponent/>}/>
                        <Route path="accounts" element={<AccountsManagementComponent/>}/>
                        <Route path="examsManagement" element={<ExamsManagementComponent/>}/>
                        <Route path="examsManagement/:id" element={<EditExamComponent/>}/>
                        <Route path="questionsManagement" element={<QuestionsManagement/>}/>
                    </Route>
                    <Route path="*" element={<NoPage/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
