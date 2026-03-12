import React, { useState } from 'react';
import { Search, User, Calendar, Activity, ChevronRight, FileText } from 'lucide-react';

const mockPatients = [
  {
    id: 1, name: 'Ramesh Kumar', age: 45, gender: 'Male', blood: 'O+',
    vitals: { weight: '72 kg', bp: '120/80', sugar: '95 mg/dL' },
    history: [
      { date: '05 Mar 2026', diagnosis: 'Viral Fever', prescription: 'Paracetamol 500mg, Rest' },
      { date: '22 Jan 2026', diagnosis: 'Hypertension review', prescription: 'Amlodipine 5mg continued' },
    ],
  },
  {
    id: 2, name: 'Sunita Devi', age: 32, gender: 'Female', blood: 'B+',
    vitals: { weight: '58 kg', bp: '110/70', sugar: '88 mg/dL' },
    history: [
      { date: '28 Feb 2026', diagnosis: 'Dermatitis', prescription: 'Cetirizine, Betamethasone cream' },
    ],
  },
  {
    id: 3, name: 'Harpal Singh', age: 60, gender: 'Male', blood: 'A+',
    vitals: { weight: '80 kg', bp: '140/90', sugar: '160 mg/dL' },
    history: [
      { date: '10 Mar 2026', diagnosis: 'Diabetes Type 2', prescription: 'Metformin 500mg twice daily' },
      { date: '15 Jan 2026', diagnosis: 'Knee Osteoarthritis', prescription: 'Diclofenac gel, Physiotherapy' },
    ],
  },
  {
    id: 4, name: 'Meena Kumari', age: 28, gender: 'Female', blood: 'AB-',
    vitals: { weight: '55 kg', bp: '118/76', sugar: '90 mg/dL' },
    history: [
      { date: '01 Mar 2026', diagnosis: 'Upper Respiratory Infection', prescription: 'Amoxicillin 500mg, Cough syrup' },
    ],
  },
];

const PatientRecords = () => {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  const filtered = mockPatients.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full">
      {/* Patient List */}
      <div className="w-full lg:w-2/5 flex flex-col gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Patient Records</h2>
          <p className="text-slate-500 mt-1">Search and view patient medical history.</p>
        </div>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Search patient by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 text-lg border-2 border-slate-200 rounded-xl focus:border-primary focus:outline-none transition-colors"
          />
        </div>

        <div className="flex flex-col gap-2 overflow-y-auto">
          {filtered.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelected(p)}
              className={`flex items-center gap-4 p-4 rounded-xl text-left transition-colors w-full ${
                selected?.id === p.id
                  ? 'bg-primary/10 border-2 border-primary/40'
                  : 'bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              <div className="bg-primary/10 p-3 rounded-full text-primary shrink-0">
                <User size={22} />
              </div>
              <div className="flex-1 min-w-0">
                <strong className="text-slate-900 block">{p.name}</strong>
                <span className="text-sm text-slate-500">{p.gender}, {p.age} yrs • {p.blood}</span>
              </div>
              <ChevronRight size={20} className="text-slate-400 shrink-0" />
            </button>
          ))}
          {filtered.length === 0 && (
            <p className="text-slate-500 text-center py-8">No patients found.</p>
          )}
        </div>
      </div>

      {/* Patient Detail */}
      <div className="w-full lg:w-3/5 flex flex-col gap-6">
        {selected ? (
          <>
            {/* Profile Header */}
            <div className="bg-primary text-primary-foreground rounded-xl shadow-md p-6 flex items-center gap-5">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                <span className="text-2xl font-bold">
                  {selected.name.split(' ').map((n) => n[0]).join('')}
                </span>
              </div>
              <div>
                <h3 className="text-2xl font-extrabold">{selected.name}</h3>
                <p className="opacity-90 font-medium">{selected.gender}, {selected.age} Years • Blood: {selected.blood}</p>
              </div>
            </div>

            {/* Vitals */}
            <div className="grid grid-cols-3 gap-4">
              {Object.entries(selected.vitals).map(([key, val]) => (
                <div key={key} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
                  <span className="text-sm text-slate-500 font-medium capitalize">{key}</span>
                  <span className="text-xl font-bold text-primary">{val}</span>
                </div>
              ))}
            </div>

            {/* Consultation History */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex-1">
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Activity className="text-primary" /> Consultation History
              </h3>
              <div className="flex flex-col gap-4">
                {selected.history.map((h, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50">
                    <div className="hidden sm:flex bg-white p-3 rounded-full shadow-sm text-primary shrink-0">
                      <Calendar size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 font-medium">{h.date}</p>
                      <strong className="text-slate-900 block">{h.diagnosis}</strong>
                      <p className="text-slate-600 text-sm mt-1 flex items-start gap-1">
                        <FileText size={14} className="mt-0.5 shrink-0 text-slate-400" />
                        {h.prescription}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-xl border border-slate-200 p-12 flex flex-col items-center justify-center text-center flex-1">
            <User size={48} className="text-slate-300 mb-4" />
            <h3 className="text-xl font-bold text-slate-800">Select a Patient</h3>
            <p className="text-slate-500 mt-1">Choose a patient from the list to view their records.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientRecords;
