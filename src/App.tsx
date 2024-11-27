import React, { useEffect, useState } from 'react';
import Calculator from './components/Calculator';
import './App.css';

const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
  <div className="App">
    <div className="theme-switcher">
      <button onClick={toggleTheme}>
        {theme === 'light' ? 'ダークテーマに切り替え' : 'ライトテーマに切り替え'}
      </button>
    </div>
    <Calculator />
  </div>
)};

export default App;