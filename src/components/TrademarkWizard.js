'use client';

import { useState, useEffect } from 'react';
import { ArrowLeftIcon, CheckIcon } from '@heroicons/react/24/solid';

/**
 * A multi-step wizard component for creating or editing a trademark record.
 * @param {object} props
 * @param {function} props.onSave - The function to call when the final form is submitted.
 * @param {object|null} props.initialData - If provided, the wizard enters "edit mode" and pre-fills the form with this data.
 */
export default function TrademarkWizard({ onSave, initialData = null }) {
  // Determine if the wizard is in "edit" or "create" mode based on initialData.
  const isEditMode = !!initialData;

  // State for tracking the current step of the wizard.
  const [step, setStep] = useState(1);
  // State for storing the form data across all steps.
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'Active',
  });
  // State to manage the submission status (e.g., to disable the submit button).
  const [isSubmitting, setIsSubmitting] = useState(false);

  // useEffect hook to pre-fill the form if in edit mode.
  // This runs when the component mounts or when initialData changes.
  useEffect(() => {
    if (isEditMode && initialData) {
      setFormData({
        name: initialData.name,
        description: initialData.description || '',
        status: initialData.status,
      });
    }
  }, [initialData, isEditMode]);

  // Navigation handlers
  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  // Generic handler to update form data state on input change.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handler for the final form submission.
  const handleSubmit = async () => {
    setIsSubmitting(true);
    await onSave(formData); // Call the onSave prop with the final data.
    setIsSubmitting(false);
  };

  // Sub-component for the progress bar UI.
  const ProgressBar = () => (
    <div className="flex items-center mb-8">
      <div className="flex items-center text-red-600 relative">
        <div className="rounded-full h-8 w-8 flex items-center justify-center bg-red-600 text-white">1</div>
        <div className="absolute top-0 -ml-10 text-center mt-10 w-32 text-xs font-medium uppercase text-red-600">Info</div>
      </div>
      <div className={`flex-auto border-t-2 transition duration-500 ease-in-out ${step >= 2 ? 'border-red-600' : 'border-gray-300'}`}></div>
      <div className="flex items-center text-gray-500 relative">
        <div className={`rounded-full h-8 w-8 flex items-center justify-center text-white ${step >= 2 ? 'bg-red-600' : 'bg-gray-300'}`}>
          {step > 2 ? <CheckIcon className="w-5 h-5"/> : 2}
        </div>
        <div className="absolute top-0 -ml-10 text-center mt-10 w-32 text-xs font-medium uppercase text-gray-500">Summary</div>
      </div>
    </div>
  );

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl mx-auto">
      <ProgressBar />

      {/* Step 1: Trademark Information */}
      {step === 1 && (
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Trademark Information</h3>
          {/* Form fields */}
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-800">Name</label>
              <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500" />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-800">Description</label>
              <textarea name="description" id="description" value={formData.description} onChange={handleChange} rows="3" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500" />
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <button onClick={handleNext} disabled={!formData.name} className="px-6 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 disabled:bg-red-300">
              Continue &rarr;
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Summary & Confirmation */}
      {step === 2 && (
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Summary & Confirmation</h3>
          <div className="space-y-3 p-4 border rounded-md bg-gray-50 text-gray-900">
            <div><span className="font-semibold">Name:</span> {formData.name}</div>
            <div><span className="font-semibold">Description:</span> {formData.description || <span className="text-gray-500">N/A</span>}</div>
          </div>
           <div className="mt-4">
              <label htmlFor="status" className="block text-sm font-medium text-gray-800">Status</label>
              <select name="status" id="status" value={formData.status} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500">
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          <div className="flex justify-between mt-6">
            <button onClick={handleBack} className="flex items-center gap-2 px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
               &larr; Back
            </button>
            <button onClick={handleSubmit} disabled={isSubmitting} className="px-6 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 disabled:bg-green-300">
              {/* Conditional button text based on mode and submission state. */}
              {isSubmitting ? (isEditMode ? 'Saving...' : 'Creating...') : (isEditMode ? 'Save Changes' : 'Create Record')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}