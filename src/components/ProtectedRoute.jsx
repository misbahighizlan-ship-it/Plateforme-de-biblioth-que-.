import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    return isAdmin ? <Outlet /> : <Navigate to="/login" replace />;
}
