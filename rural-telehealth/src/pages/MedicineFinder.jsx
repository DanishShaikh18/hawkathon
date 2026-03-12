import React, { useState } from 'react';
import { Search, MapPin, CheckCircle, XCircle, Map as MapIcon } from 'lucide-react';

const MedicineFinder = () => {
  const [search, setSearch] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  // Mock results for meds
  const results = [
    { name: 'City Pharmacy', dist: '2 km', available: true, address: 'Near Bus Stand, Nabha' },
    { name: 'Nabha Medicos', dist: '5 km', available: true, address: 'Main Bazar, Patiala Road' },
    { name: 'Village Health Center', dist: '8 km', available: false, address: 'Gram Panchayat Govt Dispensary' },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full">
      {/* Search and Results Section */}
      <div className="flex flex-col gap-6 w-full lg:w-1/2">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Find Medicines</h2>
          <p className="text-slate-600 mb-6">Search pharmacies with live stock status.</p>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="text" 
                placeholder="Medicine Name (e.g. Paracetamol)"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-4 text-lg border-2 border-slate-200 rounded-xl focus:border-primary focus:outline-none transition-colors"
                onKeyDown={(e) => e.key === 'Enter' && setHasSearched(true)}
              />
            </div>
            <button 
              className="bg-primary text-primary-foreground font-bold px-8 py-4 rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
              onClick={() => setHasSearched(true)}
            >
              Search
            </button>
          </div>
        </div>

        {hasSearched && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex-1 overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">Results for "{search || 'Paracetamol'}"</h3>
            
            <div className="flex flex-col gap-4">
              {results.map((r, i) => (
                <div key={i} className={`border-l-4 p-4 rounded-r-xl border border-slate-100 shadow-sm ${r.available ? 'border-l-softGreen bg-green-50/30' : 'border-l-slate-300 bg-slate-50/50'}`}>
                  <div className="flex justify-between items-start mb-2">
                    <strong className="text-lg text-slate-800">{r.name}</strong>
                    <span className="text-slate-500 flex items-center gap-1 font-medium bg-white px-2 py-1 rounded shadow-sm text-sm">
                      <MapPin size={14}/> {r.dist}
                    </span>
                  </div>
                  
                  <p className="text-slate-600 text-sm mb-3">{r.address}</p>
                  
                  {r.available ? (
                    <div className="text-softGreen flex items-center gap-2 font-bold bg-green-100 w-fit px-3 py-1 rounded-full text-sm">
                      <CheckCircle size={16}/> In Stock
                    </div>
                  ) : (
                    <div className="text-slate-500 flex items-center gap-2 font-bold bg-slate-200 w-fit px-3 py-1 rounded-full text-sm">
                      <XCircle size={16}/> Out of Stock
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Map Visualizer Mock Section (Desktop gets full height, Mobile gets stacked) */}
      <div className="w-full lg:w-1/2 bg-slate-200 rounded-xl overflow-hidden shadow-inner border border-slate-300 min-h-[300px] lg:min-h-full flex flex-col relative">
        <div className="absolute top-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-md z-10 flex items-center gap-3">
           <MapIcon className="text-primary animate-pulse" />
           <p className="font-semibold text-slate-800 text-sm">Live Location Integration (Interactive Map Area)</p>
        </div>
        
        {/* Mock Map Background Grid */}
        <div 
          className="flex-1 w-full h-full opacity-30"
          style={{ 
            backgroundImage: 'repeating-linear-gradient(#ccc 0 1px, transparent 1px 100%), repeating-linear-gradient(90deg, #ccc 0 1px, transparent 1px 100%)',
            backgroundSize: '40px 40px'
          }}
        ></div>

        {/* Mock Map Pins */}
        {hasSearched && (
          <>
             <div className="absolute top-1/3 left-1/4 animate-bounce">
                <MapPin size={36} className="text-emergencyRed drop-shadow-md" fill="white" />
             </div>
             <div className="absolute top-1/2 right-1/4 animate-bounce" style={{animationDelay: '100ms'}}>
                <MapPin size={36} className="text-emergencyRed drop-shadow-md" fill="white" />
             </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MedicineFinder;
