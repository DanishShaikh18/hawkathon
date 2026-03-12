import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle,
  AlertTriangle,
  Info,
  ArrowRight,
  ShieldAlert,
  Mic,
  MicOff,
  Loader2,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { checkSymptoms as apiCheckSymptoms } from "../lib/api";

const symptomList = [
  "Fever",
  "Cough",
  "Headache",
  "Stomach Pain",
  "Breathing Issue",
  "Chest Pain",
  "Fatigue",
  "Body Ache",
  "Sore Throat",
  "Diarrhea",
  "Joint Pain",
  "Back Pain",
];

const SymptomChecker = () => {
  const [step, setStep] = useState(1);
  const [symptoms, setSymptoms] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isListening, setIsListening] = useState(false);
  const { patient } = useAuth();
  const navigate = useNavigate();

  const handleToggle = (s) => {
    setSymptoms((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  };

  const handleVoice = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert("Voice input not supported in this browser.");
      return;
    }
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognition.onresult = (e) => {
      const text = e.results[0][0].transcript;
      // Match spoken words to symptom list
      const found = symptomList.filter((s) =>
        text.toLowerCase().includes(s.toLowerCase())
      );
      if (found.length > 0) {
        setSymptoms((prev) => Array.from(new Set([...prev, ...found])));
      }
    };

    recognition.start();
  };

  const handleAnalyze = async () => {
    if (symptoms.length === 0) return;
    setLoading(true);
    setError("");

    try {
      const data = await apiCheckSymptoms(
        patient?.id || 0,
        symptoms.join(", ")
      );
      setResult(data);
      setStep(2);
    } catch (err) {
      if (err.message === "offline") {
        // Offline fallback — client-side triage
        const s = symptoms.join(", ").toLowerCase();
        let fallback;
        if (s.includes("chest pain") || s.includes("breathing issue")) {
          fallback = {
            possible_issue: "Possible emergency",
            urgency: "emergency",
            advice: "Seek immediate medical help.",
          };
        } else if (s.includes("fever") && s.includes("cough")) {
          fallback = {
            possible_issue: "Possible viral infection",
            urgency: "moderate",
            advice: "Consult a doctor within 24 hours.",
          };
        } else {
          fallback = {
            possible_issue: "Minor symptoms",
            urgency: "low",
            advice: "Rest and hydrate. Consult doctor if symptoms persist.",
          };
        }
        setResult(fallback);
        setStep(2);
      } else {
        setError("Failed to analyze symptoms. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const getTriageStyle = () => {
    if (!result) return {};
    switch (result.urgency) {
      case "emergency":
        return {
          bg: "bg-gradient-to-br from-red-500 to-red-700",
          icon: <ShieldAlert size={48} />,
          level: "🔴 EMERGENCY",
          actionText: "Call Emergency Services",
          actionPath: null,
          actionClass: "bg-white text-red-600 hover:bg-red-50",
        };
      case "moderate":
        return {
          bg: "bg-gradient-to-br from-amber-400 to-orange-500",
          icon: <AlertTriangle size={48} />,
          level: "🟡 CONSULT DOCTOR SOON",
          actionText: "Book Consultation Now",
          actionPath: "/consult",
          actionClass: "bg-white text-amber-700 hover:bg-amber-50",
        };
      default:
        return {
          bg: "bg-gradient-to-br from-emerald-500 to-emerald-700",
          icon: <CheckCircle size={48} />,
          level: "🟢 SELF CARE",
          actionText: "Find Medicines Nearby",
          actionPath: "/medicine",
          actionClass: "bg-white text-emerald-700 hover:bg-emerald-50",
        };
    }
  };

  if (step === 2 && result) {
    const t = getTriageStyle();
    return (
      <div className="flex flex-col gap-4 animate-fadeIn">
        <div
          className={`rounded-2xl shadow-xl overflow-hidden text-white ${t.bg}`}
        >
          <div className="p-8 text-center flex flex-col items-center">
            <div className="mb-4 animate-bounce">{t.icon}</div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-wide">
              {t.level}
            </h2>
          </div>

          <div className="bg-black/10 backdrop-blur-sm p-6 md:p-8">
            <div className="mb-4">
              <h3 className="font-bold opacity-80 uppercase text-xs tracking-wider mb-1">
                Possible Issue
              </h3>
              <p className="text-xl font-semibold">{result.possible_issue}</p>
            </div>

            <div className="mb-4">
              <h3 className="font-bold opacity-80 uppercase text-xs tracking-wider mb-1">
                Reported Symptoms
              </h3>
              <p className="text-lg font-medium">{symptoms.join(", ")}</p>
            </div>

            <div className="bg-black/10 rounded-xl p-4 mb-6">
              <h3 className="font-bold mb-1 flex items-center gap-2">
                <Info size={16} /> Advice
              </h3>
              <p className="text-lg leading-relaxed">{result.advice}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                className={`flex-1 p-4 rounded-xl font-bold text-lg text-center transition-all shadow-md ${t.actionClass}`}
                onClick={() =>
                  t.actionPath ? navigate(t.actionPath) : alert("Dial 108 for emergency")
                }
              >
                {t.actionText}
              </button>
              <button
                className="flex-1 p-4 rounded-xl font-bold text-lg text-center bg-white/20 hover:bg-white/30 transition-colors"
                onClick={() => {
                  setStep(1);
                  setSymptoms([]);
                  setResult(null);
                }}
              >
                Start Over
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 animate-fadeIn">
      <div className="mb-1">
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">
          AI Symptom Checker
        </h1>
        <p className="text-slate-500">
          Offline-capable AI triage • Select or speak your symptoms
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 md:p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-1">
          How are you feeling?
        </h2>
        <p className="text-slate-500 text-sm mb-5">
          Select all symptoms that apply, or use voice input.
        </p>

        {/* Voice Button */}
        <button
          onClick={handleVoice}
          className={`w-full mb-5 p-4 rounded-xl border-2 font-bold text-lg flex items-center justify-center gap-3 transition-all ${
            isListening
              ? "border-amber-400 bg-amber-50 text-amber-700 animate-pulse"
              : "border-primary/30 bg-primary/5 text-primary hover:bg-primary/10"
          }`}
        >
          {isListening ? (
            <>
              <MicOff size={22} /> Listening...
            </>
          ) : (
            <>
              <Mic size={22} /> Speak Your Symptoms
            </>
          )}
        </button>

        {/* Symptom Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {symptomList.map((s) => (
            <button
              key={s}
              onClick={() => handleToggle(s)}
              className={`p-3.5 rounded-xl text-base font-medium transition-all border-2 ${
                symptoms.includes(s)
                  ? "bg-primary/10 border-primary text-primary font-bold shadow-sm"
                  : "bg-slate-50 border-slate-200 text-slate-700 hover:border-primary/40"
              }`}
            >
              {symptoms.includes(s) ? "✓ " : ""}
              {s}
            </button>
          ))}
        </div>

        {error && (
          <div className="mt-4 bg-red-50 border border-red-200 text-red-700 text-sm font-medium px-4 py-3 rounded-xl">
            {error}
          </div>
        )}

        <button
          className="w-full mt-6 bg-gradient-to-r from-primary to-blue-700 text-white p-4 rounded-xl text-lg font-bold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          onClick={handleAnalyze}
          disabled={symptoms.length === 0 || loading}
        >
          {loading ? (
            <Loader2 className="animate-spin" size={22} />
          ) : (
            <>
              Analyze Symptoms <ArrowRight size={20} />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default SymptomChecker;
