import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverable = false,
  ...props
}) => {
  return (
    <div
      className={`bg-white border border-[#E5E7EB] rounded-lg shadow-sm ${
        hoverable ? 'transition-all duration-150 hover:shadow-md hover:border-[#D1D5DB]' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

interface CardHeaderProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  title,
  subtitle,
  action,
  className = '',
}) => {
  return (
    <div className={`px-6 py-4 border-b border-[#E5E7EB] flex items-center justify-between gap-4 ${className}`}>
      <div>
        <h3 className="text-base font-semibold text-[#172B4D] tracking-tight">{title}</h3>
        {subtitle && <p className="text-xs text-[#718096] mt-0.5">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
};

export const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  return <div className={`p-6 ${className}`}>{children}</div>;
};

export const CardFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  return <div className={`px-6 py-3 bg-[#F7F8FA] border-t border-[#E5E7EB] rounded-b-lg text-xs text-[#718096] ${className}`}>{children}</div>;
};
