import React, { useState } from 'react';
import { X } from 'lucide-react';

interface Vendor {
  id: number;
  name: string;
  category: string;
  risk: string;
  lastAssessment: string;
  complianceScore: number;
}

interface AddVendorFormProps {
  isOpen: boolean;
  onClose: () => void;
  onAddVendor: (vendor: Omit<Vendor, 'id'>) => void;
}

const AddVendorForm: React.FC<AddVendorFormProps> = ({ 
  isOpen, 
  onClose,
  onAddVendor
}) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    risk: 'Low',
    lastAssessment: new Date().toISOString().split('T')[0],
    complianceScore: 85
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Vendor name is required';
    }
    
    if (!formData.category.trim()) {
      newErrors.category = 'Category is required';
    }
    
    if (!formData.lastAssessment) {
      newErrors.lastAssessment = 'Assessment date is required';
    }
    
    if (formData.complianceScore < 0 || formData.complianceScore > 100) {
      newErrors.complianceScore = 'Score must be between 0 and 100';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onAddVendor(formData);
      setFormData({
        name: '',
        category: '',
        risk: 'Low',
        lastAssessment: new Date().toISOString().split('T')[0],
        complianceScore: 85
      });
      onClose();
    }
  };

  return (
    <div 
      className={`fixed inset-0 z-50 ${isOpen ? 'block' : 'hidden'}`}
    >
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      ></div>
      
      <div 
        className={`absolute right-0 top-0 bottom-0 bg-white w-full max-w-md shadow-xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Add New Vendor</h2>
          <button 
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 5rem)' }}>
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Vendor Name*
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                    errors.name ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter vendor name"
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>
              
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category*
                </label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                    errors.category ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="e.g. Cloud Services, Software, Security"
                />
                {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
              </div>
              
              <div>
                <label htmlFor="risk" className="block text-sm font-medium text-gray-700 mb-1">
                  Risk Level*
                </label>
                <select
                  id="risk"
                  name="risk"
                  value={formData.risk}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="lastAssessment" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Assessment Date*
                </label>
                <input
                  type="date"
                  id="lastAssessment"
                  name="lastAssessment"
                  value={formData.lastAssessment}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                    errors.lastAssessment ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.lastAssessment && <p className="mt-1 text-sm text-red-600">{errors.lastAssessment}</p>}
              </div>
              
              <div>
                <label htmlFor="complianceScore" className="block text-sm font-medium text-gray-700 mb-1">
                  Compliance Score* (0-100)
                </label>
                <input
                  type="number"
                  id="complianceScore"
                  name="complianceScore"
                  min="0"
                  max="100"
                  value={formData.complianceScore}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                    errors.complianceScore ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.complianceScore && <p className="mt-1 text-sm text-red-600">{errors.complianceScore}</p>}
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Add Vendor
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddVendorForm;