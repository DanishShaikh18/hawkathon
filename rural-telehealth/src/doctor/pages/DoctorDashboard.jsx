import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipboardList, Users, Pill, Activity } from 'lucide-react';

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

const DoctorDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold text-primary">Welcome, Dr. Sharma 👋</h2>
        <p className="text-lg text-slate-600 mt-2">Here's your overview for today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Pending Requests" value="5" icon={ClipboardList} color="bg-amber-100 text-amber-600" />
        <StatCard label="Today's Patients" value="8" icon={Users} color="bg-blue-100 text-blue-600" />
        <StatCard label="Prescriptions" value="12" icon={Pill} color="bg-emerald-100 text-emerald-600" />
        <StatCard label="Completed" value="3" icon={Activity} color="bg-violet-100 text-violet-600" />
      </div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <div
          onClick={() => navigate('/doctor/requests')}
          className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-primary/50 cursor-pointer transition-all flex flex-col items-center text-center gap-3"
        >
          <div className="bg-primary/10 p-4 rounded-full text-primary">
            <ClipboardList size={32} />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Consultation Requests</h3>
          <p className="text-slate-500">View &amp; accept patient requests</p>
        </div>

        <div
          onClick={() => navigate('/doctor/patients')}
          className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-primary/50 cursor-pointer transition-all flex flex-col items-center text-center gap-3"
        >
          <div className="bg-primary/10 p-4 rounded-full text-primary">
            <Users size={32} />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Patient Records</h3>
          <p className="text-slate-500">Search &amp; view patient history</p>
        </div>

        <div
          onClick={() => navigate('/doctor/prescribe')}
          className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-primary/50 cursor-pointer transition-all flex flex-col items-center text-center gap-3"
        >
          <div className="bg-primary/10 p-4 rounded-full text-primary">
            <Pill size={32} />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Prescribe Medicine</h3>
          <p className="text-slate-500">Write &amp; send prescriptions</p>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
