import React from 'react';
import { Link } from 'react-router-dom';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  description?: string;
  link?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, description, link }) => {
  const CardWrapper = link ? Link : 'div';
  
  return (
    <CardWrapper
      to={link || ''}
      className={`bg-white rounded-lg shadow-sm p-6 transform transition-all duration-300 hover:shadow-lg ${
        link ? 'hover:scale-105 cursor-pointer' : ''
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {description && (
            <p className="text-xs font-medium text-gray-500 mt-1">{description}</p>
          )}
        </div>
        <div className="bg-gray-50 p-3 rounded-full transition-colors duration-300 group-hover:bg-gray-100">
          {icon}
        </div>
      </div>
    </CardWrapper>
  );
};

export default StatCard;