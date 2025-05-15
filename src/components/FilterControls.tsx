import React from 'react';
import { Filter } from 'lucide-react';

interface FilterControlsProps {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({ 
  activeFilter, 
  setActiveFilter 
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between bg-white p-4 rounded-lg shadow-sm mb-6">
      <div className="flex items-center mb-4 sm:mb-0">
        <Filter className="h-5 w-5 text-gray-500 mr-2" />
        <h2 className="text-lg font-medium text-gray-700">Filter Vendors</h2>
      </div>
      
      <div className="flex space-x-2">
        <FilterButton 
          label="All" 
          active={activeFilter === 'All'}
          onClick={() => setActiveFilter('All')}
          className="bg-gray-100 text-gray-700 hover:bg-gray-200"
          activeClass="bg-gray-700 text-white"
        />
        <FilterButton 
          label="Low" 
          active={activeFilter === 'Low'}
          onClick={() => setActiveFilter('Low')}
          className="bg-green-100 text-green-700 hover:bg-green-200"
          activeClass="bg-green-600 text-white"
        />
        <FilterButton 
          label="Medium" 
          active={activeFilter === 'Medium'}
          onClick={() => setActiveFilter('Medium')}
          className="bg-amber-100 text-amber-700 hover:bg-amber-200"
          activeClass="bg-amber-500 text-white"
        />
        <FilterButton 
          label="High" 
          active={activeFilter === 'High'}
          onClick={() => setActiveFilter('High')}
          className="bg-red-100 text-red-700 hover:bg-red-200"
          activeClass="bg-red-600 text-white"
        />
      </div>
    </div>
  );
};

interface FilterButtonProps {
  label: string;
  active: boolean;
  onClick: () => void;
  className: string;
  activeClass: string;
}

const FilterButton: React.FC<FilterButtonProps> = ({ 
  label, 
  active, 
  onClick, 
  className,
  activeClass
}) => {
  return (
    <button
      className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${active ? activeClass : className}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default FilterControls;