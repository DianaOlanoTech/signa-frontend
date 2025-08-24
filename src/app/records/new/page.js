'use client';

import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import { createTrademark } from '@/services/trademarkService';
import Layout from '@/components/Layout';
import TrademarkWizard from '@/components/TrademarkWizard';
import Link from 'next/link';

/**
 * A page containing the wizard to create a new trademark record.
 */
export default function NewRecordPage() {
  const router = useRouter(); // Hook for programmatic navigation.

  // Handler function passed to the wizard to perform the save action.
  const handleSave = async (trademarkData) => {
    const promise = createTrademark(trademarkData);

    // Use toast.promise for a better UX during the API call.
    toast.promise(promise, {
      loading: 'Creating new record...',
      success: 'Record created successfully!',
      error: 'Failed to create record.',
    });

    try {
      await promise;
      // On success, redirect back to the main list after a short delay.
      setTimeout(() => router.push('/'), 1000);
    } catch (error) {
      // Toast will automatically handle displaying the error message.
    }
  };

  return (
    <Layout>
      <div className="mb-6">
         <Link href="/" className="text-red-600 hover:underline">
           &larr; Back to list
         </Link>
         <h1 className="text-2xl font-semibold text-gray-800 mt-2">Create New Trademark Record</h1>
         <p className="text-gray-600">Follow the steps to add a new record.</p>
      </div>

      {/* Render the wizard in "create" mode (no initialData is passed). */}
      <TrademarkWizard onSave={handleSave} />
    </Layout>
  );
}