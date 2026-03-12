import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Stethoscope, FileText, Pill, PhoneCall, HeartPulse } from 'lucide-react';

const ActionCard = ({ title, subtitle, icon: Icon, onClick }) => (
  <div 
    onClick={onClick}
    className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-primary/50 cursor-pointer transition-all flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-4 h-full"
  >
    <div className="bg-primary/10 p-4 rounded-full text-primary shrink-0">
      <Icon size={32} />
    </div>
    <div>
      <h3 className="text-xl font-bold text-slate-900">{title}</h3>
      {subtitle && <p className="text-slate-500 mt-1">{subtitle}</p>}
    </div>
  </div>
);

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-6 md:p-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-primary">Hello, Ramesh 👋</h2>
          <p className="text-lg text-slate-600 mt-2">What do you need help with today?</p>
        </div>
      </div>

      {/* Emergency Quick Button */}
      <button 
        className="w-full bg-emergencyRed text-white p-4 rounded-xl shadow-lg flex items-center justify-center gap-3 text-lg font-bold hover:bg-red-600 transition-colors animate-in fade-in zoom-in duration-300"
        onClick={() => alert("Emergency Services Dialing... (Mock)")}
      >
        <HeartPulse size={28} className="animate-pulse" />
        EMERGENCY - GET HELP NOW
      </button>

      {/* Responsive Grid for Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-2">
        <ActionCard
          title="Check Symptoms"
          subtitle="Use our AI to check your symptoms"
          icon={Stethoscope}
          onClick={() => navigate('/symptoms')}
        />

        <ActionCard
          title="Talk to Doctor"
          subtitle="Voice or video consultation"
          icon={PhoneCall}
          onClick={() => navigate('/consult')}
        />

        <ActionCard
          title="My Health Records"
          subtitle="View prescriptions and history"
          icon={FileText}
          onClick={() => navigate('/records')}
        />

        <ActionCard
          title="Find Medicines"
          subtitle="Locate nearby pharmacies"
          icon={Pill}
          onClick={() => navigate('/medicine')}
        />
      </div>
    </div>
  );
};

export default Home;
