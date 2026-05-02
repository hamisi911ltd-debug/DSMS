import React from 'react';
import { ArrowLeft, Bell, Settings } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Layout = ({ 
  children, 
  title,
  showBack = false,
  rightIcon: RightIcon,
  onRightClick,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-40 glass border-b border-white/10">
        <div className="max-w-md mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center">
            {showBack ? (
              <button 
                onClick={() => navigate(-1)}
                className="p-2 -ml-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <ArrowLeft className="text-white" size={24} />
              </button>
            ) : (
              <div className="w-10" />
            )}
          </div>
          
          <h1 className="text-lg font-bold text-white truncate">
            {title || 'DSMS'}
          </h1>
          
          <div className="flex items-center">
            {RightIcon ? (
              <button 
                onClick={onRightClick}
                className="p-2 -mr-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <RightIcon className="text-white" size={24} />
              </button>
            ) : (
              <div className="w-10" />
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-md mx-auto px-4 py-4">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;