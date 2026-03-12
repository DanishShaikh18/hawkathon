import React, { useState } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, ClipboardPlus, Pill, Menu, X } from 'lucide-react';

const navItems = [
  { path: '/pharmacy', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/pharmacy/register', icon: ClipboardPlus, label: 'Register' },
  { path: '/pharmacy/medicines', icon: Pill, label: 'Medicines' },
];

const PharmacyLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="flex h-screen w-full bg-slate-50 flex-col md:flex-row overflow-hidden">

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200">
        <div className="p-6 bg-primary text-primary-foreground">
          <h1 className="text-2xl font-bold">HealthConnect</h1>
          <p className="text-sm opacity-90 mt-1">Pharmacy Portal</p>
        </div>

        <nav className="flex-1 p-4 flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive =
              item.path === '/pharmacy'
                ? location.pathname === '/pharmacy'
                : location.pathname.startsWith(item.path);
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`flex items-center gap-4 p-4 rounded-xl text-lg font-medium transition-colors ${
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <item.icon size={24} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative overflow-hidden h-full">

        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between bg-primary text-primary-foreground p-4 shadow-sm z-50">
          <h1 className="text-xl font-bold">Pharmacy Portal</h1>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 -mr-2 text-white/90 focus:outline-none"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </header>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 shadow-lg z-40">
            {navItems.map((item) => {
              const isActive =
                item.path === '/pharmacy'
                  ? location.pathname === '/pharmacy'
                  : location.pathname.startsWith(item.path);
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-4 px-6 py-4 text-lg font-medium transition-colors ${
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <item.icon size={22} />
                  {item.label}
                </NavLink>
              );
            })}
          </div>
        )}

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 pb-32 md:pb-8">
          <div className="max-w-5xl mx-auto h-full">
            <Outlet />
          </div>
        </main>

        {/* Mobile Bottom Navigation */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around p-2 pb-safe shadow-[0_-4px_12px_rgba(0,0,0,0.05)] z-50">
          {navItems.map((item) => {
            const isActive =
              item.path === '/pharmacy'
                ? location.pathname === '/pharmacy'
                : location.pathname.startsWith(item.path);
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center gap-1 p-2 flex-1 rounded-lg ${
                  isActive ? 'text-primary' : 'text-slate-500'
                }`}
              >
                <item.icon size={24} className={isActive ? 'fill-primary/20' : ''} />
                <span className="text-xs font-semibold">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default PharmacyLayout;
