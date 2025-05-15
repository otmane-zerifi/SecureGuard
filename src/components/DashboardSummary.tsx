import React from 'react';
import { AlertTriangle, ShieldCheck, FileWarning, Calendar } from 'lucide-react';

interface DashboardSummaryProps {
  vendorCounts: {
    low: number;
    medium: number;
    high: number;
    total: number;
  };
}

const DashboardSummary: React.FC<DashboardSummaryProps> = ({ vendorCounts }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <SummaryCard 
        title="Total Vendors" 
        value={vendorCounts.total} 
        icon={<FileWarning className="h-6 w-6 text-blue-400" />}
        color="bg-blue-50 border-blue-200"
      />
      <SummaryCard 
        title="High Risk" 
        value={vendorCounts.high} 
        icon={<AlertTriangle className="h-6 w-6 text-red-400" />}
        color="bg-red-50 border-red-200"
      />
      <SummaryCard 
        title="Medium Risk" 
        value={vendorCounts.medium} 
        icon={<Calendar className="h-6 w-6 text-amber-400" />}
        color="bg-amber-50 border-amber-200"
      />
      <SummaryCard 
        title="Low Risk" 
        value={vendorCounts.low} 
        icon={<ShieldCheck className="h-6 w-6 text-green-400" />}
        color="bg-green-50 border-green-200"
      />
    </div>
  );
};

interface SummaryCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, icon, color }) => {
  return (
    <div className={`rounded-lg border p-4 shadow-sm ${color} transition-all duration-200 hover:shadow-md`}>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
        </div>
        <div className="rounded-full p-2 bg-white shadow-sm">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default DashboardSummary;