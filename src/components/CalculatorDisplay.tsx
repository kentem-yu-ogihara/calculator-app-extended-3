import React from 'react';

interface CalculatorDisplayProps {
  isMemorySet: boolean;
  result: string;
}

const CalculatorDisplay: React.FC<CalculatorDisplayProps> = ({ isMemorySet, result }) => {
  return (
    <div className="display-container">
      <div className="memory">{isMemorySet && "M" }</div>
      <div className="display">{result}</div>
    </div>
  );
};

export default CalculatorDisplay;