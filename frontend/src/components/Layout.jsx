import React, { useState, useEffect } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import {
  Home,
  Stethoscope,
  FileText,
  Pill,
  PhoneCall,
  Menu,
  X,
  LogOut,
  User,
} from "lucide-react";
import ConnectionBanner from "./ui/ConnectionBanner";
import { useAuth } from "../context/AuthContext";

const navItems = [
  { path: "/", icon: Home, label: "Home" },
  { path: "/symptoms", icon: Stethoscope, label: "Symptoms" },
  { path: "/consult", icon: PhoneCall, label: "Consult" },
  { path: "/records", icon: FileText, label: "Records" },
  { path: "/medicine", icon: Pill, label: "Medicine" },
];

const Layout = () => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { patient, logout } = useAuth();

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const initials = patient?.name
    ? patient.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "??";

  return (
    <div className="flex h-screen w-full bg-slate-50 flex-col md:flex-row overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 shadow-sm">
        <div className="p-6 bg-gradient-to-br from-primary to-blue-700 text-white">
          <h1 className="text-2xl font-extrabold tracking-tight">
            HealthConnect
          </h1>
          <p className="text-sm opacity-80 mt-1">Rural Telemedicine</p>
        </div>

        {/* Patient Info */}
        <div className="px-4 py-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary font-bold text-sm">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-slate-800 truncate text-sm">
                {patient?.name || "Patient"}
              </p>
              <p className="text-xs text-slate-400 truncate">
                {patient?.phone || ""}
              </p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive =
              location.pathname === item.path ||
              (item.path !== "/" && location.pathname.startsWith(item.path));
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[15px] font-medium transition-all ${
                  isActive
                    ? "bg-primary/10 text-primary shadow-sm"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <item.icon size={20} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="p-3 border-t border-slate-100 space-y-2">
          <ConnectionBanner isOffline={isOffline} />
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative overflow-hidden h-full">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between bg-gradient-to-r from-primary to-blue-700 text-white p-4 shadow-md z-50">
          <h1 className="text-lg font-extrabold tracking-tight">
            HealthConnect
          </h1>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-white/20 px-2 py-1 rounded-full font-medium">
              {patient?.name?.split(" ")[0] || ""}
            </span>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 -mr-2 text-white/90 focus:outline-none"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </header>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-14 left-0 right-0 bg-white shadow-xl z-40 border-b border-slate-200 animate-slideDown">
            <div className="p-3 flex flex-col gap-1">
              <button
                onClick={() => {
                  logout();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 px-4 py-3 text-red-500 font-medium rounded-xl hover:bg-red-50"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        )}

        <div className="md:hidden">
          <ConnectionBanner isOffline={isOffline} />
        </div>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 pb-24 md:pb-8">
          <div className="max-w-5xl mx-auto h-full">{<Outlet />}</div>
        </main>

        {/* Mobile Bottom Nav */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-slate-200 flex justify-around px-1 py-1.5 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.08)] z-50">
          {navItems.map((item) => {
            const isActive =
              location.pathname === item.path ||
              (item.path !== "/" && location.pathname.startsWith(item.path));
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center gap-0.5 py-1.5 px-3 rounded-xl transition-all ${
                  isActive
                    ? "text-primary"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                <item.icon
                  size={22}
                  className={isActive ? "drop-shadow-sm" : ""}
                />
                <span className="text-[10px] font-semibold">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Layout;
