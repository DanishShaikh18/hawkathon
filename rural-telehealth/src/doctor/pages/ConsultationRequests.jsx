import React, { useState } from 'react';
import { Phone, Video, Calendar, Clock, CheckCircle, XCircle, User } from 'lucide-react';

const mockRequests = [
  { id: 1, name: 'Ramesh Kumar', age: 45, gender: 'Male', type: 'Voice Call', symptoms: 'Fever, headache for 3 days', date: '12 Mar 2026', time: '10:30 AM', urgent: true },
  { id: 2, name: 'Sunita Devi', age: 32, gender: 'Female', type: 'Video Call', symptoms: 'Skin rash on arms', date: '12 Mar 2026', time: '11:00 AM', urgent: false },
  { id: 3, name: 'Harpal Singh', age: 60, gender: 'Male', type: 'Scheduled', symptoms: 'Follow-up for diabetes management', date: '12 Mar 2026', time: '02:00 PM', urgent: false },
  { id: 4, name: 'Meena Kumari', age: 28, gender: 'Female', type: 'Voice Call', symptoms: 'Persistent cough, chest tightness', date: '12 Mar 2026', time: '03:15 PM', urgent: true },
  { id: 5, name: 'Baldev Raj', age: 55, gender: 'Male', type: 'Scheduled', symptoms: 'Knee pain, difficulty walking', date: '13 Mar 2026', time: '09:00 AM', urgent: false },
];

const typeIcon = { 'Voice Call': Phone, 'Video Call': Video, 'Scheduled': Calendar };

const ConsultationRequests = () => {
  const [requests, setRequests] = useState(mockRequests);
  const [filter, setFilter] = useState('all'); // all | urgent | scheduled

  const handleAccept = (id) => {
    setRequests((prev) => prev.filter((r) => r.id !== id));
  };

  const handleDecline = (id) => {
    setRequests((prev) => prev.filter((r) => r.id !== id));
  };

  const filtered = requests.filter((r) => {
    if (filter === 'urgent') return r.urgent;
    if (filter === 'scheduled') return r.type === 'Scheduled';
    return true;
  });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Consultation Requests</h2>
        <p className="text-slate-500 mt-1">Review and respond to incoming patient requests.</p>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {[
          { key: 'all', label: 'All Requests' },
          { key: 'urgent', label: 'Urgent' },
          { key: 'scheduled', label: 'Scheduled' },
        ].map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              filter === f.key
                ? 'bg-primary text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Request Cards */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <CheckCircle size={48} className="mx-auto text-softGreen mb-4" />
          <h3 className="text-xl font-bold text-slate-800">All Caught Up!</h3>
          <p className="text-slate-500 mt-1">No pending requests in this category.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filtered.map((req) => {
            const TypeIcon = typeIcon[req.type] || Phone;
            return (
              <div
                key={req.id}
                className={`bg-white rounded-xl border shadow-sm p-5 flex flex-col md:flex-row md:items-center gap-4 ${
                  req.urgent ? 'border-l-4 border-l-emergencyRed border-slate-200' : 'border-slate-200'
                }`}
              >
                {/* Patient Info */}
                <div className="flex items-start gap-4 flex-1">
                  <div className="bg-primary/10 p-3 rounded-full text-primary shrink-0">
                    <User size={24} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <strong className="text-lg text-slate-900">{req.name}</strong>
                      {req.urgent && (
                        <span className="text-xs font-bold bg-red-100 text-emergencyRed px-2 py-0.5 rounded-full">URGENT</span>
                      )}
                    </div>
                    <p className="text-sm text-slate-500 font-medium">{req.gender}, {req.age} yrs</p>
                    <p className="text-slate-700 mt-1">{req.symptoms}</p>
                    <div className="flex items-center gap-3 mt-2 text-sm text-slate-500">
                      <span className="flex items-center gap-1"><TypeIcon size={14} /> {req.type}</span>
                      <span className="flex items-center gap-1"><Clock size={14} /> {req.date} • {req.time}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => handleAccept(req.id)}
                    className="bg-softGreen hover:bg-green-600 text-white px-5 py-2.5 rounded-lg font-bold transition-colors flex items-center gap-2"
                  >
                    <CheckCircle size={18} /> Accept
                  </button>
                  <button
                    onClick={() => handleDecline(req.id)}
                    className="bg-white hover:bg-slate-100 text-slate-600 px-5 py-2.5 rounded-lg font-bold border border-slate-200 transition-colors flex items-center gap-2"
                  >
                    <XCircle size={18} /> Decline
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ConsultationRequests;
