import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Car, ArrowRight } from 'lucide-react';
import Button from '../../components/Button';

const Splash = () => {
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
    const timer = setTimeout(() => {
      navigate('/login');
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className={`
        flex flex-col items-center gap-8 text-center
        transition-all duration-1000
        ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
      `}>
        <div className="relative">
          <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center float-animation">
            <Car size={64} className="text-white" />
          </div>
          <div className="absolute -inset-4 rounded-3xl bg-neon-blue/20 blur-xl" />
        </div>

        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-2">
            DSMS
          </h1>
          <p className="text-gray-400 text-lg">
            Driving School Management
          </p>
        </div>

        <div className="flex items-center gap-2 text-neon-blue">
          <div className="w-2 h-2 rounded-full bg-neon-blue animate-pulse" />
          <div className="w-2 h-2 rounded-full bg-neon-blue animate-pulse delay-100" />
          <div className="w-2 h-2 rounded-full bg-neon-blue animate-pulse delay-200" />
        </div>
      </div>
    </div>
  );
};

export default Splash;