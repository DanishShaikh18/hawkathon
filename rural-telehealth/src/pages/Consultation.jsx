import React, { useState } from 'react';
import { Phone, Video, Calendar, Clock, CheckCircle } from 'lucide-react';

const Consultation = () => {
  const [booked, setBooked] = useState(false);

  if (booked) {
    return (
      <div className="bg-softGreen text-white rounded-xl p-8 flex flex-col items-center justify-center text-center shadow-md animate-in zoom-in duration-300">
        <CheckCircle size={64} className="mb-4 text-white/90" />
        <h2 className="text-3xl font-bold mb-2">Consultation Booked</h2>
        <p className="text-lg opacity-90 max-w-md">
          Dr. Sharma will call you shortly on your registered phone number.
        </p>
        <button 
          className="mt-8 px-6 py-3 bg-white text-softGreen font-bold rounded-xl hover:bg-slate-50 transition-colors shadow-sm"
          onClick={() => setBooked(false)}
        >
          View Details
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8">
      <h2 className="text-2xl font-bold text-slate-800 mb-2">Book a Consultation</h2>
      <div className="bg-amber-50 border-l-4 border-warningAmber p-4 mb-6 rounded-r-lg">
        <p className="text-slate-700 font-medium flex items-center gap-2">
          <span>Voice call is recommended for poor network areas.</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        
        {/* Primary Option: Voice Call (Low Bandwidth) */}
        <button 
          onClick={() => setBooked(true)}
          className="bg-primary hover:bg-blue-700 text-white p-6 rounded-xl shadow-sm transition-all hover:shadow-md flex flex-col items-center justify-center text-center gap-3 border-2 border-transparent group"
        >
          <div className="bg-white/20 p-4 rounded-full group-hover:scale-110 transition-transform">
            <Phone size={32} />
          </div>
          <span className="text-xl font-bold">Book Voice Call</span>
          <span className="text-sm opacity-80">Best for 2G/3G networks</span>
        </button>
        
        {/* Secondary: Video Call */}
        <button 
          onClick={() => setBooked(true)}
          className="bg-slate-50 hover:bg-slate-100 text-slate-800 p-6 rounded-xl border-2 border-slate-200 hover:border-primary/40 transition-all flex flex-col items-center justify-center text-center gap-3 group"
        >
          <div className="bg-slate-200 text-slate-600 p-4 rounded-full group-hover:scale-110 group-hover:text-primary transition-all">
            <Video size={32} />
          </div>
          <span className="text-xl font-bold">Book Video Call</span>
          <span className="text-sm text-slate-500">Requires good internet</span>
        </button>

        {/* Tertiary: Schedule Later */}
        <button 
          onClick={() => setBooked(true)}
          className="bg-slate-50 hover:bg-slate-100 text-slate-800 p-6 rounded-xl border-2 border-slate-200 border-dashed transition-all flex flex-col items-center justify-center text-center gap-3 group"
        >
          <div className="bg-slate-200 text-slate-600 p-4 rounded-full group-hover:scale-110 transition-transform">
            <Calendar size={32} />
          </div>
          <span className="text-xl font-bold">Schedule for Later</span>
          <span className="text-sm text-slate-500 flex items-center gap-1"><Clock size={14}/> Pick advanced time</span>
        </button>

      </div>
    </div>
  );
};

export default Consultation;
