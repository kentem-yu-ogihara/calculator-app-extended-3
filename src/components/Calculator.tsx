import React, { useState } from "react";
import CalculatorDisplay from "./CalculatorDisplay";
import CalculatorButtons from "./CalculatorButtons";
import { evaluate } from "mathjs"; // 安全な計算のためにmathjsを使用

const Calculator: React.FC = () => {
  const [result, setResult] = useState("");
  const [memory, setMemory] = useState(0);
  const [isResultShown, setIsResultShown] = useState(false);
  const [isMemorySet, setIsMemorySet] = useState(false);
  const [taxRate, setTaxRate] = useState(1.1); // 初期値は10%

  const handleClick = (button: string) => {
    if (isResultShown && button !== "=") {
      setResult("");
      setIsResultShown(false);
    }

    switch (button) {
      case "=":
        calculateResult();
        break;
      case "CA":
        reset();
        clearMemory();
        break;
      case "M+":
        addToMemory();
        break;
      case "M-":
        subtractFromMemory();
        break;
      case "MR":
        recallMemory();
        break;
      case "MC":
        clearMemory();
        break;
      case "税込金額":
        calculateTaxIncluded();
        break;
      case "税抜金額":
        calculateTaxExcluded();
        break;
      default:
        appendToResult(button);
        break;
    }
  };

  const calculateResult = () => {
    try {
      if (result === "") {
        return;
      }
      let evalResult = evaluate(result);
      if (String(evalResult) === "Infinity") {
        evalResult = "Error 0";
      }
      setResult(String(evalResult));
      setIsResultShown(true);
    } catch (error) {
      setResult("Error");
    }
  };

// 税込金額を計算して四捨五入する関数
const calculateTaxIncludedAmount = (amount: number): number => {
  return Math.round(amount * taxRate);
};

// 税抜金額を計算して整数に切り上げる関数
const calculateTaxExcludedAmount = (amount: number): number => {
  return Math.ceil(amount / taxRate);
};

// 税込金額を計算する関数
const calculateTaxIncluded = () => {
  try {
    const evaluatedResult = evaluate(result);
    const taxIncluded = calculateTaxIncludedAmount(evaluatedResult);
    setResult(taxIncluded.toString());
    setIsResultShown(true);
  } catch (error) {
    setResult("Error");
  }
};

// 税抜金額を計算する関数
const calculateTaxExcluded = () => {
  try {
    const evaluatedResult = evaluate(result);
    const taxExcluded = calculateTaxExcludedAmount(evaluatedResult);
    setResult(taxExcluded.toString());
    setIsResultShown(true);
  } catch (error) {
    setResult("Error");
  }
};
  const reset = () => {
    setResult("");
    setIsResultShown(false);
  };

  const clearMemory = () => {
    setMemory(0);
    setIsMemorySet(false);
  };

  const addToMemory = () => {
    calculateResult();
    setMemory((prev) => prev + parseFloat(result));
    setIsMemorySet(true);
    setIsResultShown(true);
  };

  const subtractFromMemory = () => {
    calculateResult();
    setMemory((prev) => prev - parseFloat(result));
    setIsMemorySet(true);
    setIsResultShown(true);
  };

  const recallMemory = () => {
    setResult(memory.toString());
    setIsResultShown(true);
    setIsResultShown(true);
  };

  const appendToResult = (button: string) => {
    setResult((prev) => prev + button);
  };

  return (
    <div>
      <CalculatorDisplay isMemorySet={isMemorySet} result={result} />
      <CalculatorButtons handleClick={handleClick} />
      <div className="tax-rate-group">
        <span className="title">税率を選択:</span>
        <label className="label">
          <input
            type="radio"
            name="taxRate"
            value="1.1"
            checked={taxRate === 1.1}
            onChange={(e) => setTaxRate(Number(e.target.value))}
          />
          10%
        </label>
        <label className="label">
          <input
            type="radio"
            name="taxRate"
            value="1.08"
            checked={taxRate === 1.08}
            onChange={(e) => setTaxRate(Number(e.target.value))}
          />
          8%
        </label>
        <label className="label">
          <input
            type="radio"
            name="taxRate"
            value="1.05"
            checked={taxRate === 1.05}
            onChange={(e) => setTaxRate(Number(e.target.value))}
          />
          5%
        </label>
      </div>
    </div>
  );
};

export default Calculator;
