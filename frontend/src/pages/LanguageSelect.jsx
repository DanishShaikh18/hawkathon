import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { Card } from '../components/ui/ActionCard';

const LanguageSelect = () => {
  const navigate = useNavigate();

  const handleSelect = (lang) => {
    navigate('/');
  };

  return (
    <div className="app-container" style={{ justifyContent: 'center', padding: '24px' }}>
      <Card style={{ textAlign: 'center', gap: '32px' }}>
        <h2 style={{ fontSize: '28px', color: 'var(--primary-green)' }}>Select Language</h2>
        <h2>भाषा चुनें</h2>
        <h2>ਭਾਸ਼ਾ ਚੁਣੋ</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
          <Button onClick={() => handleSelect('en')}>English</Button>
          <Button variant="outline" onClick={() => handleSelect('hi')}>हिंदी</Button>
          <Button variant="outline" onClick={() => handleSelect('pa')}>ਪੰਜਾਬੀ</Button>
        </div>
      </Card>
    </div>
  );
};

export default LanguageSelect;
