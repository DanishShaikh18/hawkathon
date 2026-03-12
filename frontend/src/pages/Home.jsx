import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Stethoscope,
  FileText,
  Pill,
  PhoneCall,
  HeartPulse,
  Activity,
  Users,
  Clock,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { getPatientAppointments } from "../lib/api";

const Home = () => {
  const navigate = useNavigate();
  const { patient } = useAuth();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    if (patient?.id) {
      getPatientAppointments(patient.id)
        .then(setAppointments)
        .catch(() => {});
    }
  }, [patient]);

  const firstName = patient?.name?.split(" ")[0] || "Patient";

  const features = [
    {
      title: "Check Symptoms",
      subtitle: "AI-powered triage system",
      icon: Stethoscope,
      path: "/symptoms",
      gradient: "from-violet-500 to-purple-700",
      shadow: "shadow-violet-200",
    },
    {
      title: "Talk to Doctor",
      subtitle: "Voice or video consultation",
      icon: PhoneCall,
      path: "/consult",
      gradient: "from-primary to-blue-700",
      shadow: "shadow-blue-200",
    },
    {
      title: "Health Records",
      subtitle: "View prescriptions & history",
      icon: FileText,
      path: "/records",
      gradient: "from-emerald-500 to-emerald-700",
      shadow: "shadow-emerald-200",
    },
    {
      title: "Find Medicines",
      subtitle: "Locate nearby pharmacies",
      icon: Pill,
      path: "/medicine",
      gradient: "from-amber-500 to-orange-600",
      shadow: "shadow-amber-200",
    },
  ];

  return (
    <div className="flex flex-col gap-6 animate-fadeIn">
      {/* Hero Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary via-blue-600 to-indigo-700 rounded-2xl p-6 md:p-8 text-white shadow-xl shadow-primary/20">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4" />
        <div className="relative z-10">
          <p className="text-blue-200 text-sm font-medium mb-1">
            Welcome back,
          </p>
          <h2 className="text-2xl md:text-3xl font-extrabold">{firstName} 👋</h2>
          <p className="text-blue-100 mt-2 text-base max-w-md">
            What do you need help with today? Access doctors, medicines, and
            health records — all from home.
          </p>
        </div>
      </div>

      {/* Emergency Button */}
      <button
        className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white p-4 rounded-xl shadow-lg shadow-red-200 flex items-center justify-center gap-3 text-lg font-bold hover:from-red-600 hover:to-red-700 transition-all active:scale-[0.98]"
        onClick={() => alert("Emergency Services: Call 108 or visit nearest hospital")}
      >
        <HeartPulse size={26} className="animate-pulse" />
        EMERGENCY — GET HELP NOW
      </button>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-3">
        {[
          {
            label: "Appointments",
            value: appointments.length,
            icon: Clock,
            color: "text-primary",
          },
          {
            label: "Blood Group",
            value: patient?.blood_group || "—",
            icon: Activity,
            color: "text-rose-500",
          },
          {
            label: "Doctors Avail.",
            value: "11",
            icon: Users,
            color: "text-emerald-500",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex flex-col items-center text-center"
          >
            <stat.icon size={20} className={`${stat.color} mb-1`} />
            <span className={`text-xl font-bold ${stat.color}`}>
              {stat.value}
            </span>
            <span className="text-xs text-slate-400 font-medium mt-0.5">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.map((f, i) => (
          <button
            key={i}
            onClick={() => navigate(f.path)}
            className={`group relative overflow-hidden bg-white rounded-2xl p-5 shadow-sm ${f.shadow} border border-slate-100 hover:shadow-md transition-all text-left active:scale-[0.98]`}
          >
            <div className="flex items-start gap-4">
              <div
                className={`bg-gradient-to-br ${f.gradient} p-3.5 rounded-xl text-white shadow-md group-hover:scale-110 transition-transform`}
              >
                <f.icon size={24} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  {f.title}
                  <ArrowRight
                    size={16}
                    className="text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all"
                  />
                </h3>
                <p className="text-sm text-slate-500 mt-0.5">{f.subtitle}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Upcoming Appointments */}
      {appointments.length > 0 && (
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
            <Clock size={18} className="text-primary" />
            Upcoming Appointments
          </h3>
          <div className="flex flex-col gap-2">
            {appointments.slice(0, 3).map((a, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100"
              >
                <div>
                  <p className="font-semibold text-slate-800 text-sm">
                    {a.doctor_name}
                  </p>
                  <p className="text-xs text-slate-400">
                    {a.specialization} • {a.status}
                  </p>
                </div>
                <span
                  className={`text-xs font-bold px-2 py-1 rounded-full ${
                    a.priority === "emergency"
                      ? "bg-red-100 text-red-600"
                      : "bg-blue-50 text-primary"
                  }`}
                >
                  {a.priority}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
