import React, { useState, useEffect } from 'react';
import { CheckCircle, AlertTriangle, Info, ArrowRight, ShieldAlert } from 'lucide-react';
import VoiceInput from '../components/ui/VoiceInput';

const SymptomChecker = () => {
  const [step, setStep] = useState(1);
  const [symptoms, setSymptoms] = useState(() => {
    const saved = localStorage.getItem('healthconnect_symptoms');
    return saved ? JSON.parse(saved) : [];
  });
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    localStorage.setItem('healthconnect_symptoms', JSON.stringify(symptoms));
  }, [symptoms]);

  const handleSymptomToggle = (symptom) => {
    if (symptoms.includes(symptom)) {
      setSymptoms(symptoms.filter(s => s !== symptom));
    } else {
      setSymptoms([...symptoms, symptom]);
    }
  };

  const mockVoiceInput = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      const newSymptoms = ['Fever', 'Chest Pain']; // Mocked voice input adding a severe symptom
      setSymptoms(Array.from(new Set([...symptoms, ...newSymptoms])));
    }, 2000);
  };

  // Triage Logic based on Hawkathon Problem Statement
  const getTriageResult = () => {
    if (symptoms.includes('Chest Pain') || symptoms.includes('Breathing Issue')) {
      return {
        color: 'bg-emergencyRed text-white',
        icon: <ShieldAlert size={48} />,
        level: 'RED: EMERGENCY',
        advice: 'Visit hospital immediately. Do not wait.',
        actionText: 'Call Emergency Services',
        actionClass: 'bg-white text-emergencyRed border-2 border-white hover:bg-red-50'
      };
    } else if (symptoms.includes('Fever') && symptoms.includes('Cough')) {
      return {
        color: 'bg-warningAmber text-black',
        icon: <AlertTriangle size={48} />,
        level: 'YELLOW: CONSULT DOCTOR SOON',
        advice: 'You have moderate symptoms. Please schedule a teleconsultation to be safe.',
        actionText: 'Book Voice Consultation Now',
        actionClass: 'bg-black text-warningAmber hover:bg-slate-800'
      };
    } else {
      return {
        color: 'bg-softGreen text-white',
        icon: <CheckCircle size={48} />,
        level: 'GREEN: SELF CARE',
        advice: 'Minor issue detected. Rest and drink fluids. If symptoms worsen, consult a doctor.',
        actionText: 'Find Medicines Nearby',
        actionClass: 'bg-white text-softGreen border-2 border-white hover:bg-green-50'
      };
    }
  };

  const renderStep = () => {
    if (step === 1) {
      return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">How are you feeling?</h2>
          <p className="text-slate-600 mb-6">Select your symptoms or use voice input to describe them.</p>
          
          <VoiceInput 
            isListening={isListening} 
            onSpeechResult={mockVoiceInput} 
          />
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-6">
            {['Fever', 'Cough', 'Headache', 'Stomach Pain', 'Breathing Issue', 'Chest Pain', 'Fatigue'].map(s => (
              <button 
                key={s}
                onClick={() => handleSymptomToggle(s)}
                className={`p-4 rounded-xl text-lg transition-colors border-2 ${
                  symptoms.includes(s) 
                    ? 'bg-primary/10 border-primary text-primary font-bold' 
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-primary/50'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          
          <button 
            className="w-full mt-8 bg-primary text-primary-foreground p-4 rounded-xl text-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            onClick={() => setStep(2)}
            disabled={symptoms.length === 0}
          >
            Analyze Symptoms <ArrowRight />
          </button>
        </div>
      );
    }
    
    // Step 2: AI Triage Result
    const triage = getTriageResult();
    
    return (
      <div className={`rounded-xl shadow-md overflow-hidden ${triage.color}`}>
        <div className="p-8 text-center flex flex-col items-center">
          <div className="mb-4 animate-in zoom-in duration-500">
            {triage.icon}
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold mb-2 tracking-wide">
            {triage.level}
          </h2>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm p-6 md:p-8">
          <div className="mb-4">
            <h3 className="font-bold opacity-80 uppercase text-sm mb-1">Reported Symptoms</h3>
            <p className="text-lg font-medium">{symptoms.join(', ')}</p>
          </div>
          
          <div className="bg-black/10 rounded-lg p-4 mb-8">
            <h3 className="font-bold mb-1 flex items-center gap-2">
              <Info size={18} /> Advice
            </h3>
            <p className="text-lg leading-relaxed">{triage.advice}</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button className={`flex-1 p-4 rounded-xl font-bold text-lg text-center transition-colors shadow-sm ${triage.actionClass}`}>
              {triage.actionText}
            </button>
            <button 
              className="flex-1 p-4 rounded-xl font-bold text-lg text-center border-2 border-transparent bg-black/20 hover:bg-black/30 transition-colors"
              onClick={() => { setStep(1); setSymptoms([]); }}
            >
              Start Over
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="mb-2">
        <h1 className="text-3xl font-bold text-slate-900">AI Symptom Checker</h1>
        <p className="text-slate-500">Fast, offline-capable triage</p>
      </div>
      {renderStep()}
    </div>
  );
};

export default SymptomChecker;
