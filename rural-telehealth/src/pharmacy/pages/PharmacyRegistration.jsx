import React, { useState } from 'react';
import { CheckCircle, MapPin, Phone, Store } from 'lucide-react';

const PharmacyRegistration = () => {
  const [form, setForm] = useState({ name: '', location: '', phone: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setForm({ name: '', location: '', phone: '' });
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="bg-softGreen text-white rounded-xl p-8 flex flex-col items-center justify-center text-center shadow-md animate-in zoom-in duration-300">
        <CheckCircle size={64} className="mb-4 text-white/90" />
        <h2 className="text-3xl font-bold mb-2">Pharmacy Registered!</h2>
        <p className="text-lg opacity-90 max-w-md">
          <strong>{form.name}</strong> has been registered successfully.
        </p>
        <div className="mt-4 bg-white/20 rounded-xl p-4 text-left w-full max-w-sm">
          <p className="flex items-center gap-2"><MapPin size={16} /> {form.location}</p>
          <p className="flex items-center gap-2 mt-2"><Phone size={16} /> {form.phone}</p>
        </div>
        <button
          className="mt-8 px-6 py-3 bg-white text-softGreen font-bold rounded-xl hover:bg-slate-50 transition-colors shadow-sm"
          onClick={handleReset}
        >
          Register Another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Pharmacy Registration</h2>
        <p className="text-slate-500 mt-1">Register your pharmacy to appear in patient searches.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col gap-5">
        {/* Pharmacy Name */}
        <div>
          <label className="text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
            <Store size={16} className="text-primary" /> Pharmacy Name
          </label>
          <input
            type="text"
            required
            placeholder="e.g. City Pharmacy"
            value={form.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-primary focus:outline-none transition-colors text-lg"
          />
        </div>

        {/* Location */}
        <div>
          <label className="text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
            <MapPin size={16} className="text-primary" /> Location / Address
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Near Bus Stand, Nabha, Punjab"
            value={form.location}
            onChange={(e) => handleChange('location', e.target.value)}
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-primary focus:outline-none transition-colors text-lg"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
            <Phone size={16} className="text-primary" /> Phone Number
          </label>
          <input
            type="tel"
            required
            placeholder="e.g. 9876543210"
            value={form.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            pattern="[0-9]{10}"
            title="Enter a valid 10-digit phone number"
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-primary focus:outline-none transition-colors text-lg"
          />
          <p className="text-xs text-slate-400 mt-1">10-digit mobile number</p>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-lg font-bold shadow-sm transition-colors bg-primary hover:bg-blue-700 text-white"
      >
        <CheckCircle size={22} /> Register Pharmacy
      </button>
    </form>
  );
};

export default PharmacyRegistration;
