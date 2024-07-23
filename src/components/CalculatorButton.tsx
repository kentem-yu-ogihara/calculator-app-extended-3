import React from 'react';

interface CalculatorButtonProps {
  onClick: () => void;
  label: string;
}

const CalculatorButton: React.FC<CalculatorButtonProps> = ({ onClick, label }) => (
  <button
    className="calculator-button"
    aria-label={`Button for ${label}`}
    onClick={onClick}
  >
    {label}
  </button>
);

export default CalculatorButton;