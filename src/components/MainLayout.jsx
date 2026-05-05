import React from 'react';
import Sidebar from './Sidebar';

const MainLayout = ({ children, role }) => {
  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Sidebar role={role} />
      <div className="flex-1 overflow-auto">
        <main className="p-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;