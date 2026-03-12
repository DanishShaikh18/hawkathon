import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipboardPlus, Pill, Package, Activity } from 'lucide-react';

const StatCard = ({ label, value, icon: Icon, color }) => (
  <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
    <div className={`p-3 rounded-full ${color}`}>
      <Icon size={24} />
    </div>
    <div>
      <span className="text-sm text-slate-500 font-medium">{label}</span>
      <p className="text-2xl font-bold text-slate-900">{value}</p>
    </div>
  </div>
);

const PharmacyDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold text-primary">Welcome, Pharmacist 👋</h2>
        <p className="text-lg text-slate-600 mt-2">Manage your pharmacy and medicine inventory.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Medicines" value="48" icon={Pill} color="bg-blue-100 text-blue-600" />
        <StatCard label="In Stock" value="42" icon={Package} color="bg-emerald-100 text-emerald-600" />
        <StatCard label="Out of Stock" value="6" icon={Activity} color="bg-red-100 text-red-600" />
        <StatCard label="Orders Today" value="15" icon={ClipboardPlus} color="bg-amber-100 text-amber-600" />
      </div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div
          onClick={() => navigate('/pharmacy/register')}
          className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-primary/50 cursor-pointer transition-all flex flex-col items-center text-center gap-3"
        >
          <div className="bg-primary/10 p-4 rounded-full text-primary">
            <ClipboardPlus size={32} />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Pharmacy Registration</h3>
          <p className="text-slate-500">Register or update pharmacy details</p>
        </div>

        <div
          onClick={() => navigate('/pharmacy/medicines')}
          className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-primary/50 cursor-pointer transition-all flex flex-col items-center text-center gap-3"
        >
          <div className="bg-primary/10 p-4 rounded-full text-primary">
            <Pill size={32} />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Medicine Inventory</h3>
          <p className="text-slate-500">Add, update or remove medicines</p>
        </div>
      </div>
    </div>
  );
};

export default PharmacyDashboard;
