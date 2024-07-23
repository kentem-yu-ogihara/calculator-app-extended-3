import React from 'react';
import CalculatorButton from './CalculatorButton';

interface CalculatorButtonsProps {
  handleClick: (label: string) => void;
}

// ボタンのラベルを管理しやすいようにコンポーネントの外に移動
const buttonLabels = [
  "7", "8", "9", "/", "MC", 
  "4", "5", "6", "*", "MR", 
  "1", "2", "3", "-", "M-", 
  "0", "CA", "=", "+", "M+"
];

const CalculatorButtons: React.FC<CalculatorButtonsProps> = ({ handleClick }) => (
  <div className="buttons">
    {buttonLabels.map((label) => (
      <CalculatorButton key={label} onClick={() => handleClick(label)} label={label} />
    ))}
  </div>
);

export default CalculatorButtons;