import { useContext } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import AuthContext from "./context/AuthContext";
import UserRegistration from "./pages/UserRegistration";

const AppRoutes = () => {

    const { user } = useContext(AuthContext);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={(user.auth == true) ? <Home /> : <UserRegistration />} />
                <Route path="/login" element={(user.auth == true) ? <Home /> : <Login />} />
                <Route path="/home" element={(user.auth == true) ? <Home /> : <Login />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;