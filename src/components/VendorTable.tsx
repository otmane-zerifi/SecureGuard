import React, { useState } from 'react';
import { ChevronUp, ChevronDown, MoreHorizontal, AlertTriangle, AlertCircle, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';

interface Vendor {
  id: number;
  name: string;
  category: string;
  risk: string;
  lastAssessment: string;
  complianceScore: number;
}

interface VendorTableProps {
  vendors: Vendor[];
}

const VendorTable: React.FC<VendorTableProps> = ({ vendors }) => {
  const [sortField, setSortField] = useState<keyof Vendor>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  const handleSort = (field: keyof Vendor) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  const sortedVendors = [...vendors].sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <SortableHeader 
                field="name"
                label="Vendor Name" 
                sortField={sortField} 
                sortDirection={sortDirection} 
                onSort={handleSort} 
              />
              <SortableHeader 
                field="category"
                label="Category" 
                sortField={sortField} 
                sortDirection={sortDirection} 
                onSort={handleSort} 
              />
              <SortableHeader 
                field="risk"
                label="Risk Level" 
                sortField={sortField} 
                sortDirection={sortDirection} 
                onSort={handleSort} 
              />
              <SortableHeader 
                field="lastAssessment"
                label="Last Assessment" 
                sortField={sortField} 
                sortDirection={sortDirection} 
                onSort={handleSort} 
              />
              <SortableHeader 
                field="complianceScore"
                label="Compliance Score" 
                sortField={sortField} 
                sortDirection={sortDirection} 
                onSort={handleSort} 
              />
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedVendors.map((vendor) => (
              <tr key={vendor.id} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{vendor.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-600">{vendor.category}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <RiskBadge risk={vendor.risk} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-600">
                    {format(new Date(vendor.lastAssessment), 'MMM d, yyyy')}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${getScoreColorClass(vendor.complianceScore)}`}
                      style={{ width: `${vendor.complianceScore}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-600 mt-1">{vendor.complianceScore}%</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900 focus:outline-none">
                    <MoreHorizontal className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

interface SortableHeaderProps {
  field: keyof Vendor;
  label: string;
  sortField: keyof Vendor;
  sortDirection: 'asc' | 'desc';
  onSort: (field: keyof Vendor) => void;
}

const SortableHeader: React.FC<SortableHeaderProps> = ({ 
  field, 
  label, 
  sortField, 
  sortDirection, 
  onSort 
}) => {
  return (
    <th 
      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
      onClick={() => onSort(field)}
    >
      <div className="flex items-center space-x-1">
        <span>{label}</span>
        <span className="inline-flex flex-col">
          <ChevronUp 
            className={`h-3 w-3 -mb-1 ${
              sortField === field && sortDirection === 'asc' 
                ? 'text-indigo-600' 
                : 'text-gray-400'
            }`} 
          />
          <ChevronDown 
            className={`h-3 w-3 ${
              sortField === field && sortDirection === 'desc' 
                ? 'text-indigo-600' 
                : 'text-gray-400'
            }`} 
          />
        </span>
      </div>
    </th>
  );
};

interface RiskBadgeProps {
  risk: string;
}

const RiskBadge: React.FC<RiskBadgeProps> = ({ risk }) => {
  switch (risk) {
    case 'Low':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <CheckCircle className="h-3 w-3 mr-1" />
          Low
        </span>
      );
    case 'Medium':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
          <AlertCircle className="h-3 w-3 mr-1" />
          Medium
        </span>
      );
    case 'High':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          <AlertTriangle className="h-3 w-3 mr-1" />
          High
        </span>
      );
    default:
      return null;
  }
};

const getScoreColorClass = (score: number) => {
  if (score >= 90) return 'bg-green-500';
  if (score >= 70) return 'bg-amber-400';
  return 'bg-red-500';
};

export default VendorTable;