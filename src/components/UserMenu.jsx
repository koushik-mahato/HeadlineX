import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const UserMenu = ({ children }) => {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div
      className="relative min-h-[40px]"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {children}

      {/* Animated dropdown */}
      <div
        className={`absolute top-full right-0 mt-0 w-48 transition-all duration-200 origin-top-right transform z-50
    bg-slate-800 text-slate-100 rounded shadow-lg border border-slate-700
    ${
      open
        ? "opacity-100 scale-100 pointer-events-auto"
        : "opacity-0 scale-95 pointer-events-none"
    }`}
      >
        <div className="p-3 border-b border-slate-700 font-semibold text-sky-400">
          {user ? `Hi, ${user.name || "User"}` : "Account"}
        </div>

        <div className="flex flex-col px-3 py-2 text-sm space-y-1">
          {!user ? (
            <>
              <NavLink to="/login" className="hover:text-sky-400 transition">
                🔐 Login
              </NavLink>
              <NavLink to="/signup" className="hover:text-sky-400 transition">
                📝 Signup
              </NavLink>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/profile")}
                className="text-left hover:text-sky-400 transition"
              >
                🙋 View Profile
              </button>
              <button
                onClick={logout}
                className="text-left hover:text-red-400 transition"
              >
                🚪 Logout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
