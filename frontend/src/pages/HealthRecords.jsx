import React, { useState, useEffect } from "react";
import {
  Activity,
  Calendar,
  FileText,
  ChevronDown,
  ChevronUp,
  Loader2,
  Pill,
  User,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { getHealthRecords, getRecordDetails } from "../lib/api";

const HealthRecords = () => {
  const { patient } = useAuth();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);
  const [detail, setDetail] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

  useEffect(() => {
    if (patient?.id) {
      getHealthRecords(patient.id)
        .then(setRecords)
        .catch(() => setRecords([]))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [patient]);

  const handleExpand = async (recordId) => {
    if (expanded === recordId) {
      setExpanded(null);
      setDetail(null);
      return;
    }
    setExpanded(recordId);
    setDetailLoading(true);
    try {
      const d = await getRecordDetails(recordId);
      setDetail(d);
    } catch {
      setDetail(null);
    } finally {
      setDetailLoading(false);
    }
  };

  const initials = patient?.name
    ? patient.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "??";

  return (
    <div className="flex flex-col lg:flex-row gap-6 animate-fadeIn">
      {/* Patient Profile */}
      <div className="w-full lg:w-1/3 flex flex-col gap-5">
        {/* Profile Card */}
        <div className="bg-gradient-to-br from-primary to-indigo-700 text-white rounded-2xl shadow-xl shadow-primary/20 p-7 flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 shadow-inner">
            <span className="text-3xl font-extrabold">{initials}</span>
          </div>
          <h2 className="text-2xl font-extrabold">{patient?.name || "—"}</h2>
          <p className="text-blue-200 font-medium mt-1">{patient?.phone}</p>
          <div className="mt-4 flex gap-3">
            <span className="bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-bold">
              🩸 {patient?.blood_group || "—"}
            </span>
          </div>
        </div>

        {/* Quick Info */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-700 mb-3 flex items-center gap-2 text-sm">
            <User size={16} className="text-primary" /> Patient Information
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">Allergies</span>
              <span className="font-medium text-slate-800">
                {patient?.allergies || "None"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Total Records</span>
              <span className="font-medium text-slate-800">
                {records.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Records List */}
      <div className="w-full lg:w-2/3 flex flex-col gap-5">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 md:p-6">
          <h2 className="text-xl font-extrabold text-slate-800 mb-5 flex items-center gap-2">
            <Activity size={20} className="text-primary" />
            Medical Records
          </h2>

          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="animate-spin text-primary" size={32} />
            </div>
          ) : records.length === 0 ? (
            <div className="text-center py-16">
              <FileText
                size={48}
                className="text-slate-200 mx-auto mb-4"
              />
              <p className="text-slate-400 font-medium">No records yet</p>
              <p className="text-sm text-slate-300 mt-1">
                Your medical records will appear here after consultations
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {records.map((r) => (
                <div key={r.record_id}>
                  <button
                    onClick={() => handleExpand(r.record_id)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                      expanded === r.record_id
                        ? "border-primary bg-primary/5"
                        : "border-slate-100 bg-slate-50 hover:border-slate-200"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-start gap-3">
                        <div className="bg-white p-2.5 rounded-lg shadow-sm text-primary">
                          <Calendar size={18} />
                        </div>
                        <div>
                          <strong className="text-slate-800 block">
                            {r.diagnosis}
                          </strong>
                          <span className="text-sm text-slate-400 font-medium">
                            {r.date}
                          </span>
                        </div>
                      </div>
                      {expanded === r.record_id ? (
                        <ChevronUp size={20} className="text-primary" />
                      ) : (
                        <ChevronDown size={20} className="text-slate-400" />
                      )}
                    </div>
                  </button>

                  {/* Expanded Detail */}
                  {expanded === r.record_id && (
                    <div className="mt-2 ml-4 p-4 bg-white rounded-xl border border-slate-200 animate-slideDown">
                      {detailLoading ? (
                        <div className="flex items-center justify-center py-4">
                          <Loader2
                            className="animate-spin text-primary"
                            size={20}
                          />
                        </div>
                      ) : detail ? (
                        <div className="space-y-3">
                          <div>
                            <span className="text-xs text-slate-400 uppercase font-bold">
                              Diagnosis
                            </span>
                            <p className="text-slate-800 font-medium">
                              {detail.diagnosis}
                            </p>
                          </div>
                          {detail.notes && (
                            <div>
                              <span className="text-xs text-slate-400 uppercase font-bold">
                                Notes
                              </span>
                              <p className="text-slate-600 text-sm">
                                {detail.notes}
                              </p>
                            </div>
                          )}
                          {detail.prescriptions?.length > 0 && (
                            <div>
                              <span className="text-xs text-slate-400 uppercase font-bold flex items-center gap-1 mb-2">
                                <Pill size={12} /> Prescriptions
                              </span>
                              <div className="space-y-2">
                                {detail.prescriptions.map((p, i) => (
                                  <div
                                    key={i}
                                    className="bg-emerald-50 p-3 rounded-lg border border-emerald-100"
                                  >
                                    <p className="font-bold text-emerald-800 text-sm">
                                      {p.medicine}
                                    </p>
                                    <p className="text-emerald-600 text-xs">
                                      {p.dosage} — {p.instructions}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <p className="text-slate-400 text-sm">
                          Could not load details
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HealthRecords;
