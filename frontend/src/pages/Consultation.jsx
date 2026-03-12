import React, { useState, useEffect } from "react";
import {
  Phone,
  Video,
  Calendar,
  Clock,
  CheckCircle,
  Loader2,
  User,
  Stethoscope,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { listDoctors, bookAppointment } from "../lib/api";

const Consultation = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [consultType, setConsultType] = useState("");
  const [booking, setBooking] = useState(false);
  const [booked, setBooked] = useState(null);
  const [error, setError] = useState("");
  const { patient } = useAuth();

  useEffect(() => {
    listDoctors()
      .then((data) => {
        setDoctors(data);
        setLoading(false);
      })
      .catch(() => {
        setDoctors([]);
        setLoading(false);
        setError("Could not load doctors. Are you offline?");
      });
  }, []);

  const handleBook = async (doctor, type) => {
    setBooking(true);
    setError("");
    try {
      const now = new Date();
      const timeSlot = `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")} - ${type}`;
      const res = await bookAppointment({
        patient_id: patient?.id,
        doctor_id: doctor.id,
        symptoms: "Consultation requested",
        priority: "normal",
        time_slot: timeSlot,
      });
      setBooked({ doctor, type, appointmentId: res.appointment_id });
    } catch (err) {
      setError(
        err.message === "offline"
          ? "Cannot book while offline."
          : "Booking failed. Please try again."
      );
    } finally {
      setBooking(false);
    }
  };

  if (booked) {
    return (
      <div className="animate-fadeIn">
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 text-white rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-xl shadow-emerald-200">
          <CheckCircle size={64} className="mb-4 drop-shadow-md" />
          <h2 className="text-3xl font-extrabold mb-2">
            Consultation Booked! 🎉
          </h2>
          <p className="text-lg opacity-90 max-w-md">
            <strong>{booked.doctor.name}</strong> ({booked.doctor.specialization}
            ) will connect with you via{" "}
            <strong>{booked.type}</strong>.
          </p>
          <p className="text-emerald-100 mt-2 text-sm">
            Appointment #{booked.appointmentId}
          </p>
          <button
            className="mt-6 px-6 py-3 bg-white text-emerald-700 font-bold rounded-xl hover:bg-emerald-50 transition-colors shadow-md"
            onClick={() => {
              setBooked(null);
              setSelectedDoctor(null);
              setConsultType("");
            }}
          >
            Book Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 animate-fadeIn">
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">
          Book a Consultation
        </h1>
        <p className="text-slate-500">
          Choose a doctor and consultation type
        </p>
      </div>

      {/* Tip Banner */}
      <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-xl">
        <p className="text-slate-700 font-medium text-sm">
          💡 <strong>Voice call</strong> is recommended for poor network areas
          (2G/3G).
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm font-medium px-4 py-3 rounded-xl">
          {error}
        </div>
      )}

      {/* Consultation Type */}
      {!selectedDoctor && (
        <>
          <h2 className="text-lg font-bold text-slate-700">
            1. Select Consultation Type
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                type: "Voice Call",
                icon: Phone,
                desc: "Best for 2G/3G",
                gradient: "from-primary to-blue-700",
                shadow: "shadow-blue-200",
              },
              {
                type: "Video Call",
                icon: Video,
                desc: "Requires good internet",
                gradient: "from-violet-500 to-purple-700",
                shadow: "shadow-violet-200",
              },
              {
                type: "Schedule Later",
                icon: Calendar,
                desc: "Pick a convenient time",
                gradient: "from-slate-500 to-slate-700",
                shadow: "shadow-slate-200",
              },
            ].map((c) => (
              <button
                key={c.type}
                onClick={() => setConsultType(c.type)}
                className={`p-6 rounded-2xl transition-all flex flex-col items-center text-center gap-3 group border-2 ${
                  consultType === c.type
                    ? "border-primary bg-primary/5 shadow-md"
                    : "border-slate-200 bg-white hover:border-primary/40 shadow-sm"
                }`}
              >
                <div
                  className={`bg-gradient-to-br ${c.gradient} p-4 rounded-xl text-white shadow-md ${c.shadow} group-hover:scale-110 transition-transform`}
                >
                  <c.icon size={28} />
                </div>
                <span className="text-lg font-bold text-slate-800">
                  {c.type}
                </span>
                <span className="text-sm text-slate-500">{c.desc}</span>
              </button>
            ))}
          </div>
        </>
      )}

      {/* Doctor Selection */}
      {consultType && !selectedDoctor && (
        <>
          <h2 className="text-lg font-bold text-slate-700 mt-2">
            2. Choose a Doctor
          </h2>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="animate-spin text-primary" size={32} />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {doctors.map((doc) => (
                <button
                  key={doc.id}
                  onClick={() => setSelectedDoctor(doc)}
                  className="bg-white rounded-2xl p-5 border-2 border-slate-200 hover:border-primary/40 shadow-sm hover:shadow-md transition-all text-left group"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-br from-primary/20 to-primary/5 p-3 rounded-xl">
                      <User size={24} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                        {doc.name}
                        <ArrowRight
                          size={16}
                          className="text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all"
                        />
                      </h3>
                      <p className="text-primary font-medium text-sm flex items-center gap-1 mt-0.5">
                        <Stethoscope size={14} />
                        {doc.specialization}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </>
      )}

      {/* Confirm Booking */}
      {selectedDoctor && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <h2 className="text-lg font-bold text-slate-700 mb-4">
            3. Confirm Booking
          </h2>
          <div className="bg-slate-50 rounded-xl p-4 mb-4">
            <p className="text-slate-600">
              <strong>Doctor:</strong> {selectedDoctor.name} (
              {selectedDoctor.specialization})
            </p>
            <p className="text-slate-600">
              <strong>Type:</strong> {consultType}
            </p>
            <p className="text-slate-600">
              <strong>Patient:</strong> {patient?.name}
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => handleBook(selectedDoctor, consultType)}
              disabled={booking}
              className="flex-1 bg-gradient-to-r from-primary to-blue-700 text-white p-4 rounded-xl text-lg font-bold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary/20 disabled:opacity-50 transition-all"
            >
              {booking ? (
                <Loader2 className="animate-spin" size={22} />
              ) : (
                <>
                  Confirm Booking <CheckCircle size={20} />
                </>
              )}
            </button>
            <button
              onClick={() => {
                setSelectedDoctor(null);
                setConsultType("");
              }}
              className="px-6 py-4 rounded-xl border-2 border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-colors"
            >
              Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Consultation;
