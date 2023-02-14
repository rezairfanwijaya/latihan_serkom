import { Routes, Route } from "react-router-dom";
import MyChart from "./component/Chart/Chart";

import MyDashboard from './component/Dashboard/Dashboard';
import MyForm from "./component/Form/Form";
import FormEdit from "./component/Form/FormEdit";
import Home from "./component/Home/Home";
import Login from "./component/Login/Login";
import MySidebar from "./component/Sidebar/Sidebar";
import Try from "./component/Tyr";
import PesanWisata from "./component/Wisata/PesanWisata";
import Wisata from "./component/Wisata/Wisata";
import './style/style.css'

function App() {
  return (
    <>

      <Routes>

        <Route path={"/"} exact element={<Home />} />
        <Route path={"/chart"}  element={<Try />} />
        <Route path={"/admin"} element={<MyDashboard />}>
          <Route path={""} element={<MyChart/>}/>
          <Route path={"wisata"} element={<Wisata/>}/>
          <Route path={"kelola-wisata"} element={<MyForm/>}/>
          <Route path={"edit-wisata/:id"} element={<FormEdit/>}/>
          <Route path={"wisata/statistik"} element={<MyChart/>}/>
        </Route>
      <Route path={"/pesan-tiket"} element={<PesanWisata/>}/>

      </Routes>

    </>
  );
}

export default App;
