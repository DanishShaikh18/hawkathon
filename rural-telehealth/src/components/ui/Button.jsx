import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', // 'primary', 'secondary', 'outline', 'danger'
  onClick, 
  disabled = false,
  fullWidth = true,
  className = '',
  style = {},
  ...rest 
}) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'secondary': return 'secondary';
      case 'outline': return 'outline';
      case 'danger': return 'danger';
      default: return '';
    }
  };

  return (
    <button
      className={`btn-large ${getVariantClass()} ${className}`}
      onClick={disabled ? null : onClick}
      disabled={disabled}
      style={{
        width: fullWidth ? '100%' : 'auto',
        opacity: disabled ? 0.6 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
        ...style
      }}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
