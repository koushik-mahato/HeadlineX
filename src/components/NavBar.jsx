//Navbar.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMenu, FiUser } from "react-icons/fi";
import Sidebar from "./Sidebar";
import UserMenu from "./UserMenu";
import SearchBar from "./SearchBar";

// 🔐 Replace this with your real auth context or logic
const user = { email: "koushik@example.com" }; // set to null if not logged in

const NavBar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // TODO: Connect to your auth logic (e.g. Firebase signOut)
    console.log("User signed out");
    navigate("/login");
  };

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 bg-slate-800 text-slate-100 shadow-md backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          {/* Left: Sidebar toggle + logo */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-2xl p-2 rounded hover:bg-slate-700 transition"
              aria-label="Open sidebar"
            >
              <FiMenu />
            </button>
            <h1
              onClick={() => navigate("/")}
              className="text-xl font-extrabold text-sky-400 tracking-tight cursor-pointer hover:opacity-90 transition"
            >
              HeadlineX
            </h1>
          </div>

          {/* Center: Search */}
          <div className="hidden md:block flex-1 max-w-lg mx-6">
            <SearchBar />
          </div>

          {/* Right: User icon + Logout */}
          <div className="flex items-center gap-2">
            <UserMenu>
              <button
                className="text-xl p-2 rounded hover:bg-slate-700 transition"
                title="Account"
              >
                <FiUser />
              </button>
            </UserMenu>
          </div>
        </div>
      </header>

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
};

export default NavBar;
