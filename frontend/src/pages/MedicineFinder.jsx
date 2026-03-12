import React, { useState } from "react";
import {
  Search,
  MapPin,
  CheckCircle,
  XCircle,
  Loader2,
  Pill,
  Store,
} from "lucide-react";
import { searchMedicines } from "../lib/api";

const MedicineFinder = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!search.trim()) return;
    setLoading(true);
    setError("");
    setSearched(false);
    try {
      const data = await searchMedicines(search.trim());
      setResults(data);
      setSearched(true);
    } catch (err) {
      setError(
        err.message === "offline"
          ? "Cannot search while offline."
          : "Search failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-5 animate-fadeIn">
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">
          Find Medicines
        </h1>
        <p className="text-slate-500">
          Search pharmacy stock near Nabha & surrounding villages
        </p>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 md:p-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={20}
            />
            <input
              id="medicine-search"
              type="text"
              placeholder="Medicine name (e.g. Paracetamol)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="w-full pl-12 pr-4 py-4 text-lg border-2 border-slate-200 rounded-xl focus:border-primary focus:outline-none transition-colors bg-slate-50/50"
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={loading || !search.trim()}
            className="bg-gradient-to-r from-primary to-blue-700 text-white font-bold px-8 py-4 rounded-xl hover:shadow-lg hover:shadow-primary/20 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>
                <Search size={18} /> Search
              </>
            )}
          </button>
        </div>

        {/* Common meds quick buttons */}
        <div className="flex flex-wrap gap-2 mt-4">
          {["Paracetamol", "Amoxicillin", "ORS", "Cetirizine", "Ibuprofen"].map(
            (med) => (
              <button
                key={med}
                onClick={() => {
                  setSearch(med);
                  setTimeout(() => handleSearch(), 0);
                }}
                className="text-sm px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 hover:bg-primary/10 hover:text-primary font-medium transition-colors"
              >
                {med}
              </button>
            )
          )}
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm font-medium px-4 py-3 rounded-xl">
          {error}
        </div>
      )}

      {/* Results */}
      {searched && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 md:p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Pill size={18} className="text-primary" />
            Results for "{search}"
            <span className="text-sm font-normal text-slate-400 ml-auto">
              {results.length} {results.length === 1 ? "pharmacy" : "pharmacies"}
            </span>
          </h3>

          {results.length === 0 ? (
            <div className="text-center py-12">
              <XCircle size={48} className="text-slate-200 mx-auto mb-4" />
              <p className="text-slate-400 font-medium">
                Medicine not found at any pharmacy
              </p>
              <p className="text-sm text-slate-300 mt-1">
                Try a different medicine name or check with local shops
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {results.map((r, i) => (
                <div
                  key={i}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    r.available_quantity > 0
                      ? "border-l-4 border-l-emerald-500 border-slate-100 bg-emerald-50/30"
                      : "border-l-4 border-l-slate-300 border-slate-100 bg-slate-50/50 opacity-70"
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-start gap-3">
                      <div className="bg-white p-2 rounded-lg shadow-sm">
                        <Store
                          size={18}
                          className={
                            r.available_quantity > 0
                              ? "text-emerald-600"
                              : "text-slate-400"
                          }
                        />
                      </div>
                      <div>
                        <strong className="text-slate-800 text-lg block">
                          {r.pharmacy}
                        </strong>
                        <p className="text-slate-500 text-sm flex items-center gap-1">
                          <MapPin size={12} />
                          {r.location}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    {r.available_quantity > 0 ? (
                      <span className="text-emerald-600 flex items-center gap-1.5 font-bold bg-emerald-100 px-3 py-1 rounded-full text-sm">
                        <CheckCircle size={14} />
                        In Stock — {r.available_quantity} units
                      </span>
                    ) : (
                      <span className="text-slate-500 flex items-center gap-1.5 font-bold bg-slate-200 px-3 py-1 rounded-full text-sm">
                        <XCircle size={14} />
                        Out of Stock
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MedicineFinder;
