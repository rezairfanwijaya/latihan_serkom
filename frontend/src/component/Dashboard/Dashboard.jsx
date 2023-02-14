import MyNavbar from "../Navbar/Navbar";
import MySidebar from "../Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import MyChart from "../Chart/Chart";
// import {
//     BrowserRouter as Router,
//     Switch,
//     Route,
// } from "react-router-dom";
// import MyForm from "../Form/Form";
// import Wisata from "../Wisata/Wisata";
// import FormEdit from "../Form/FormEdit";

const MyDashboard = () => {
    return (<>

        <div className="navbar ">
            <MyNavbar />
        </div>

        <div className="main flex">
            <div className="sidebar">
                <MySidebar />
            </div>

            <div className="content px-12 py-5 h-screen flex-1">
                <main>
                    <Outlet />
                </main>
            </div>
        </div>

    </>);
}

export default MyDashboard;