import React from 'react';
import { Shield } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Shield className="h-8 w-8" />
          <div>
            <h1 className="text-xl font-bold tracking-tight">SecureGuard</h1>
            <p className="text-xs text-indigo-100">Vendor Risk Assessment</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="hidden md:block">
            <div className="bg-white/10 rounded-full px-3 py-1 text-sm">
              Last updated: {new Date().toLocaleDateString()}
            </div>
          </div>
          <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold">
            OT
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;