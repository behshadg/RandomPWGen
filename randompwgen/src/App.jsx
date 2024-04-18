// App.jsx
import React from 'react';
import RandomPasswordGenerator from './components/RandomPasswordGenerator';
import './index.css';

const App = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex justify-center items-center">
      <RandomPasswordGenerator />
    </div>
  );
};

export default App;
