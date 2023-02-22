import { useContext } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login/Login";
import Home from "./pages/Home";
import AuthContext from "./context/AuthContext";
import UserRegistration from "./pages/UserRegistration";
import RecoverPassword from "./pages/RecoverPassword";

const AppRoutes = () => {

    const { user } = useContext(AuthContext);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={(user.auth == true) ? <Home /> : <UserRegistration />} />
                <Route path="/login" element={(user.auth == true) ? <Home /> : <Login />} />
                <Route path="/recuperaSenha" element={(user.auth == true) ? <Home /> : <RecoverPassword />} />
                <Route path="/home" element={(user.auth == true) ? <Home /> : <Login />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;