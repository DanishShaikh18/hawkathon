import React from 'react';
import { Mic } from 'lucide-react';
import Button from './Button';

const VoiceInput = ({ 
  onSpeechResult, 
  isListening = false, 
  label = "Speak (Mock)" 
}) => {
  const handleVoiceCapture = () => {
    // In a real app, integrate with Web Speech API
    // For this mock, we just trigger the callback
    if (onSpeechResult) {
      onSpeechResult("Mock voice input triggered");
    }
  };

  return (
    <Button 
      variant="outline" 
      onClick={handleVoiceCapture} 
      style={{ 
        minHeight: '60px', 
        gap: '8px', 
        borderColor: isListening ? 'var(--warning-yellow)' : 'var(--primary-green)' 
      }}
    >
      <Mic 
        size={24} 
        color={isListening ? 'var(--warning-yellow)' : 'var(--primary-green)'}
        style={{ animation: isListening ? 'pulse 1.5s infinite' : 'none' }}
      /> 
      {isListening ? "Listening..." : label}
    </Button>
  );
};

export default VoiceInput;
