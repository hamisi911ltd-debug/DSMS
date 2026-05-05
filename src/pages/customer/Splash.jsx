import React from 'react';
import { useNavigate } from 'react-router-dom';

const Splash = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-xl mb-8 mx-auto">
          <span className="text-white font-bold text-3xl">D</span>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-4">
          DSMS
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8">Driving School Management System</p>
        <button
          onClick={() => navigate('/login')}
          className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg transition-all shadow-md font-medium"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Splash;