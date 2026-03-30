import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverable?: boolean;
}

const paddingClasses = {
  none: '',
  sm: 'p-3',
  md: 'p-5',
  lg: 'p-8',
};

export function Card({ children, className = '', padding = 'md', hoverable = false }: CardProps) {
  return (
    <div
      className={[
        'bg-white rounded-xl shadow-md overflow-hidden',
        hoverable ? 'hover:shadow-lg transition-shadow duration-200 cursor-pointer' : '',
        paddingClasses[padding],
        className,
      ].join(' ')}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`border-b border-gray-100 pb-3 mb-4 ${className}`}>{children}</div>;
}

export function CardFooter({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`border-t border-gray-100 pt-3 mt-4 ${className}`}>{children}</div>;
}
