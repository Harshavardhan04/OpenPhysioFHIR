
import { Route, Routes } from "react-router-dom";
import PastData from "../containers/PastData/PastData";
import Dashboard from "../containers/Dashboard/Dashboard";
import ViewCharts from "../containers/ViewCharts/ViewCharts";
import LandingPage from "../containers/LandingPage/LandingPage";


function AppRoutes(){
    return(<Routes>
        <Route path = '/' element = {<LandingPage/>}/>
        <Route path = '/update-patient' element = {<Dashboard/>}/>
        <Route path = '/PastData' element = {<PastData/>}/>
        <Route path = '/ViewCharts' element = {<ViewCharts/>}/>
    </Routes>)
}

export default AppRoutes;