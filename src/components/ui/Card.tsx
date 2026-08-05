import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        className={`bg-white border border-slate-200 rounded-lg shadow-sm ${className}`} 
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = 'Card';

export const CardHeader = ({ className = '', children }: CardProps) => (
  <div className={`px-6 py-4 border-b border-slate-100 ${className}`}>
    {children}
  </div>
);

export const CardBody = ({ className = '', children }: CardProps) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

export const CardFooter = ({ className = '', children }: CardProps) => (
  <div className={`px-6 py-4 border-t border-slate-100 bg-slate-50 rounded-b-lg ${className}`}>
    {children}
  </div>
);
