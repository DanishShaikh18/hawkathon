import React, { useState } from 'react';
import { Send, Plus, Trash2, CheckCircle, User, Search } from 'lucide-react';

const patientList = [
  { id: 1, name: 'Ramesh Kumar', age: 45, gender: 'Male' },
  { id: 2, name: 'Sunita Devi', age: 32, gender: 'Female' },
  { id: 3, name: 'Harpal Singh', age: 60, gender: 'Male' },
  { id: 4, name: 'Meena Kumari', age: 28, gender: 'Female' },
];

const PrescribeMedicine = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patientSearch, setPatientSearch] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [notes, setNotes] = useState('');
  const [medicines, setMedicines] = useState([{ name: '', dosage: '', duration: '', instructions: '' }]);
  const [submitted, setSubmitted] = useState(false);

  const addMedicine = () => {
    setMedicines([...medicines, { name: '', dosage: '', duration: '', instructions: '' }]);
  };

  const removeMedicine = (index) => {
    setMedicines(medicines.filter((_, i) => i !== index));
  };

  const updateMedicine = (index, field, value) => {
    setMedicines(medicines.map((m, i) => (i === index ? { ...m, [field]: value } : m)));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSelectedPatient(null);
    setPatientSearch('');
    setDiagnosis('');
    setNotes('');
    setMedicines([{ name: '', dosage: '', duration: '', instructions: '' }]);
    setSubmitted(false);
  };

  const filteredPatients = patientList.filter((p) =>
    p.name.toLowerCase().includes(patientSearch.toLowerCase())
  );

  if (submitted) {
    return (
      <div className="bg-softGreen text-white rounded-xl p-8 flex flex-col items-center justify-center text-center shadow-md animate-in zoom-in duration-300">
        <CheckCircle size={64} className="mb-4 text-white/90" />
        <h2 className="text-3xl font-bold mb-2">Prescription Sent</h2>
        <p className="text-lg opacity-90 max-w-md">
          The prescription for {selectedPatient?.name} has been saved and sent successfully.
        </p>
        <button
          className="mt-8 px-6 py-3 bg-white text-softGreen font-bold rounded-xl hover:bg-slate-50 transition-colors shadow-sm"
          onClick={handleReset}
        >
          Write Another Prescription
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Prescribe Medicine</h2>
        <p className="text-slate-500 mt-1">Select a patient, add diagnosis and medicines.</p>
      </div>

      {/* Patient Selection */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <User size={20} className="text-primary" /> Select Patient
        </h3>

        {selectedPatient ? (
          <div className="flex items-center justify-between p-4 bg-primary/10 rounded-xl border border-primary/30">
            <div className="flex items-center gap-3">
              <div className="bg-primary/20 p-2 rounded-full text-primary">
                <User size={20} />
              </div>
              <div>
                <strong className="text-slate-900">{selectedPatient.name}</strong>
                <p className="text-sm text-slate-500">{selectedPatient.gender}, {selectedPatient.age} yrs</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setSelectedPatient(null)}
              className="text-slate-500 hover:text-slate-700 text-sm font-medium"
            >
              Change
            </button>
          </div>
        ) : (
          <>
            <div className="relative mb-3">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search patient..."
                value={patientSearch}
                onChange={(e) => setPatientSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:border-primary focus:outline-none transition-colors"
              />
            </div>
            <div className="flex flex-col gap-2 max-h-48 overflow-y-auto">
              {filteredPatients.map((p) => (
                <button
                  type="button"
                  key={p.id}
                  onClick={() => { setSelectedPatient(p); setPatientSearch(''); }}
                  className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-100 hover:border-slate-300 transition-colors text-left w-full"
                >
                  <User size={18} className="text-primary" />
                  <span className="font-medium text-slate-800">{p.name}</span>
                  <span className="text-sm text-slate-500 ml-auto">{p.gender}, {p.age}</span>
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Diagnosis */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Diagnosis</h3>
        <input
          type="text"
          required
          placeholder="e.g. Viral Fever, Upper Respiratory Infection"
          value={diagnosis}
          onChange={(e) => setDiagnosis(e.target.value)}
          className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-primary focus:outline-none transition-colors text-lg"
        />
      </div>

      {/* Medicines */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-slate-800">Medicines</h3>
          <button
            type="button"
            onClick={addMedicine}
            className="flex items-center gap-1 text-primary font-bold text-sm hover:text-blue-700 transition-colors"
          >
            <Plus size={18} /> Add Medicine
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {medicines.map((med, i) => (
            <div key={i} className="bg-slate-50 p-4 rounded-xl border border-slate-200 relative">
              {medicines.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeMedicine(i)}
                  className="absolute top-3 right-3 text-slate-400 hover:text-emergencyRed transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Medicine name"
                  value={med.name}
                  onChange={(e) => updateMedicine(i, 'name', e.target.value)}
                  className="px-4 py-2.5 border-2 border-slate-200 rounded-lg focus:border-primary focus:outline-none transition-colors"
                />
                <input
                  type="text"
                  required
                  placeholder="Dosage (e.g. 500mg)"
                  value={med.dosage}
                  onChange={(e) => updateMedicine(i, 'dosage', e.target.value)}
                  className="px-4 py-2.5 border-2 border-slate-200 rounded-lg focus:border-primary focus:outline-none transition-colors"
                />
                <input
                  type="text"
                  required
                  placeholder="Duration (e.g. 5 days)"
                  value={med.duration}
                  onChange={(e) => updateMedicine(i, 'duration', e.target.value)}
                  className="px-4 py-2.5 border-2 border-slate-200 rounded-lg focus:border-primary focus:outline-none transition-colors"
                />
                <input
                  type="text"
                  placeholder="Instructions (e.g. After meals)"
                  value={med.instructions}
                  onChange={(e) => updateMedicine(i, 'instructions', e.target.value)}
                  className="px-4 py-2.5 border-2 border-slate-200 rounded-lg focus:border-primary focus:outline-none transition-colors"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Notes */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Additional Notes</h3>
        <textarea
          rows={3}
          placeholder="Any additional advice or notes for the patient..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-primary focus:outline-none transition-colors resize-none"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={!selectedPatient}
        className={`flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-lg font-bold shadow-sm transition-colors ${
          selectedPatient
            ? 'bg-primary hover:bg-blue-700 text-white'
            : 'bg-slate-200 text-slate-400 cursor-not-allowed'
        }`}
      >
        <Send size={22} /> Send Prescription
      </button>
    </form>
  );
};

export default PrescribeMedicine;
