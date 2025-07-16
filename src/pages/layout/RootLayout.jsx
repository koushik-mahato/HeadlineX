import { Outlet } from "react-router-dom";
import NavBar from "../../components/NavBar";
import Sidebar from "../../components/Sidebar";

const RootLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-slate-900 via-slate-800 to-slate-900 text-white">
      <NavBar />
      <Sidebar />
      <main className="pt-16 px-4">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
