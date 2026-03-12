import React from 'react';
import { QrCode, Download, Calendar, Activity } from 'lucide-react';

const HealthRecords = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      
      {/* Patient Profile Card & QR */}
      <div className="w-full lg:w-1/3 flex flex-col gap-6">
        <div className="bg-primary text-primary-foreground rounded-xl shadow-md p-8 flex flex-col items-center text-center border-b-4 border-blue-800">
          <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-4">
            <span className="text-4xl font-bold">RK</span>
          </div>
          <h2 className="text-3xl font-extrabold mb-1">Ramesh Kumar</h2>
          <p className="opacity-90 font-medium">Male, 45 Years</p>
          <div className="mt-4 bg-white/10 px-4 py-2 rounded-full font-bold tracking-wide">
            Blood Group: O+
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col items-center text-center">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <QrCode className="text-primary"/> Digital Health Card
          </h3>
          <div className="bg-slate-50 p-4 rounded-xl border-2 border-slate-200 mb-4 inline-block">
             <QrCode size={160} className="text-slate-900" />
          </div>
          <p className="text-sm text-slate-500 font-medium">Scan to view history.<br/>Works offline.</p>
        </div>
      </div>

      {/* History and Prescriptions */}
      <div className="w-full lg:w-2/3 flex flex-col gap-6">
        
        {/* Vitals Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Weight', value: '72 kg', color: 'text-blue-600' },
            { label: 'Height', value: '175 cm', color: 'text-emerald-600' },
            { label: 'BP', value: '120/80', color: 'text-rose-600' },
            { label: 'Sugar', value: '95', color: 'text-amber-600' }
          ].map((v, i) => (
            <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center">
              <span className="text-sm text-slate-500 font-medium">{v.label}</span>
              <span className={`text-xl font-bold ${v.color}`}>{v.value}</span>
            </div>
          ))}
        </div>

        {/* Prescriptions List */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 h-full">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Activity className="text-primary"/> Recent Consultations
          </h2>
          
          <div className="flex flex-col gap-4">
            {[
              { doc: 'Dr. Sharma', spec: 'General Physician', date: '12 Oct 2026', time: '10:30 AM' },
              { doc: 'Dr. Kaur', spec: 'Cardiologist', date: '05 Sep 2026', time: '02:15 PM' },
              { doc: 'Dr. Singh', spec: 'Orthopedics', date: '22 Jul 2026', time: '11:00 AM' }
            ].map((p, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-slate-100 hover:border-slate-300 transition-colors group">
                <div className="flex items-start gap-4">
                  <div className="hidden sm:flex bg-white p-3 rounded-full shadow-sm text-primary">
                    <Calendar size={24} />
                  </div>
                  <div>
                    <strong className="text-lg text-slate-900 block">{p.doc}</strong>
                    <span className="text-primary font-medium text-sm block mb-1">{p.spec}</span>
                    <p className="text-slate-500 text-sm font-medium">{p.date} • {p.time}</p>
                  </div>
                </div>
                
                <button className="bg-white hover:bg-primary hover:text-white text-slate-600 p-3 rounded-lg shadow-sm border border-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50">
                  <Download size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>
        
      </div>

    </div>
  );
};

export default HealthRecords;
