import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', label, error, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && <label className="block text-sm font-bold text-slate-700 mb-1">{label}</label>}
        <input 
          ref={ref}
          className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none transition-colors ${error ? 'border-red-500 bg-red-50' : 'border-slate-300'} ${className}`}
          {...props}
        />
        {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
      </div>
    );
  }
);
Input.displayName = 'Input';
