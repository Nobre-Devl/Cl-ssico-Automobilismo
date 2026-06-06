import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Catalog from "./components/Catalog";
import Details from "./components/Details";
import ForgotPassword from "./components/ForgotPassword";
import Profile from "./components/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Register />} />
        <Route path="/catalogo" element={<Catalog />} />
        <Route path="/detalhes/:id" element={<Details />} />
        <Route path="/redefinir-senha" element={<ForgotPassword />} />
        <Route path="/perfil" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
