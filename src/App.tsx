import React, { useState, useEffect, Suspense, lazy } from 'react';
import Header from './components/Header';
import DashboardSummary from './components/DashboardSummary';
import FilterControls from './components/FilterControls';
import LoadingSkeleton from './components/LoadingSkeleton';
import mockVendors from './data/mockVendors';
import { PlusCircle } from 'lucide-react';
import { Analytics } from "@vercel/analytics/react";
import ThemeToggle from './components/ThemeToggle';

// Lazy load non-critical components
const VendorTable = lazy(() => import('./components/VendorTable'));
const RiskChart = lazy(() => import('./components/RiskChart'));
const AddVendorForm = lazy(() => import('./components/AddVendorForm'));

function App() {
  const [vendors, setVendors] = useState(mockVendors);
  const [filteredVendors, setFilteredVendors] = useState(vendors);
  const [activeFilter, setActiveFilter] = useState('All');
  const [isAddVendorOpen, setIsAddVendorOpen] = useState(false);
  
  const vendorCounts = {
    low: vendors.filter(v => v.risk === 'Low').length,
    medium: vendors.filter(v => v.risk === 'Medium').length,
    high: vendors.filter(v => v.risk === 'High').length,
    total: vendors.length
  };
  
  const chartData = [
    { name: 'Low', value: vendorCounts.low, color: '#10B981' },
    { name: 'Medium', value: vendorCounts.medium, color: '#F59E0B' },
    { name: 'High', value: vendorCounts.high, color: '#EF4444' }
  ];
  
  useEffect(() => {
    if (activeFilter === 'All') {
      setFilteredVendors(vendors);
    } else {
      setFilteredVendors(vendors.filter(vendor => vendor.risk === activeFilter));
    }
  }, [activeFilter, vendors]);
  
  const handleAddVendor = (newVendor: Omit<typeof vendors[0], 'id'>) => {
    const vendor = {
      ...newVendor,
      id: vendors.length + 1
    };
    setVendors(prev => [...prev, vendor]);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <Header />
      <ThemeToggle />
      
      <main className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Vendor Risk Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400">Monitor and manage third-party security risks</p>
          </div>
          
          <button
            className="mt-4 md:mt-0 flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200"
            onClick={() => setIsAddVendorOpen(true)}
          >
            <PlusCircle className="h-5 w-5 mr-2" />
            Add New Vendor
          </button>
        </div>
        
        <DashboardSummary vendorCounts={vendorCounts} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <FilterControls 
              activeFilter={activeFilter} 
              setActiveFilter={setActiveFilter} 
            />
            <Suspense fallback={<LoadingSkeleton />}>
              <VendorTable vendors={filteredVendors} />
            </Suspense>
          </div>
          
          <div className="lg:col-span-1">
            <Suspense fallback={<LoadingSkeleton />}>
              <RiskChart data={chartData} />
            </Suspense>
          </div>
        </div>
      </main>
      
      <Suspense fallback={null}>
        <AddVendorForm 
          isOpen={isAddVendorOpen}
          onClose={() => setIsAddVendorOpen(false)}
          onAddVendor={handleAddVendor}
        />
      </Suspense>
    </div>
  );
}

export default App;