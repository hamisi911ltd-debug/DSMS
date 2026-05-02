import React from 'react';

const Input = ({ 
  label, 
  type = 'text',
  value, 
  onChange, 
  placeholder,
  icon: Icon,
  error,
  required = false,
  className = '',
  autoComplete = '',
  ...props
}) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-2">
          {label}
          {required && <span className="text-neon-pink ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Icon size={20} />
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete || (type === 'password' ? 'new-password' : type === 'email' ? 'email' : 'off')}
          className={`
            w-full rounded-xl input-glass
            px-4 py-3 text-base
            ${Icon ? 'pl-12' : ''}
            ${error ? 'border-red-500 focus:border-red-500' : ''}
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-400">{error}</p>
      )}
    </div>
  );
};

export default Input;