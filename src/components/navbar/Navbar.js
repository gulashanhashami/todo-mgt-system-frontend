import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const Navbar = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };
    console.log("user", user);

    return (
        <nav className="bg-slate-800 text-white p-4 flex justify-between items-center">
            <div className="flex gap-6 items-center">
                <Link to={"/"} className="font-semibold text-lg">
                    Dashboard
                </Link>

                {(user?.user.role === "admin" || user?.user.role === "manager") && (
                    <>
                        <Link to="/employees">Employees</Link>
                    </>
                )}
            </div>

            {user ? (
                <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-300">
                        👤 {user.user.name} ({user.user.role})
                    </span>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                    >
                        Logout
                    </button>
                </div>
            ) : (
                <Link
                    to="/login"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                >
                    Login
                </Link>
            )}
        </nav>
    );
}
