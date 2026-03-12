import React from 'react';

export const Card = ({ children, style = {}, className = '' }) => (
  <div className={`card ${className}`} style={style}>
    {children}
  </div>
);

export const ActionCard = ({ title, subtitle, icon: Icon, onClick, style = {} }) => (
  <Card 
    style={{ 
      cursor: 'pointer', 
      transition: 'transform 0.1s ease', 
      border: '1px solid #eee',
      ...style 
    }}
    onClick={onClick}
    className="action-card"
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      {Icon && (
        <div style={{ padding: '12px', backgroundColor: 'var(--primary-green-light)', borderRadius: '12px' }}>
          <Icon size={32} color="var(--primary-green)" />
        </div>
      )}
      <div>
        <h3 style={{ fontSize: '20px', color: 'var(--text-primary)', margin: 0 }}>{title}</h3>
        {subtitle && <p style={{ fontSize: '15px', color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>{subtitle}</p>}
      </div>
    </div>
  </Card>
);
