// src/app/records/[id]/edit/page.js
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import toast from 'react-hot-toast';

import { getTrademarkById, updateTrademark } from '@/services/trademarkService';
import Layout from '@/components/Layout';
import TrademarkWizard from '@/components/TrademarkWizard';
import Link from 'next/link';

/**
 * A page for editing an existing trademark record.
 * The record's ID is retrieved from the URL.
 */
export default function EditRecordPage() {
  const router = useRouter(); // Hook for programmatic navigation (e.g., redirecting).
  const params = useParams(); // Hook to access dynamic route parameters.
  const { id } = params; // Extract the 'id' from the URL.

  // State to store the trademark data being edited.
  const [trademark, setTrademark] = useState(null);
  // State to manage loading status while fetching the record.
  const [isLoading, setIsLoading] = useState(true);

  // useEffect to fetch the specific trademark data when the page loads or the ID changes.
  useEffect(() => {
    if (id) {
      getTrademarkById(id)
        .then(data => {
          setTrademark(data);
          setIsLoading(false);
        })
        .catch(error => {
          toast.error("Could not load trademark data.");
          setIsLoading(false);
          router.push('/'); // Redirect to home if the record can't be found.
        });
    }
  }, [id, router]);

  // Handler function passed to the wizard to perform the update.
  const handleUpdate = async (trademarkData) => {
    const promise = updateTrademark(id, trademarkData);
    toast.promise(promise, {
      loading: 'Saving changes...',
      success: 'Record updated successfully!',
      error: 'Failed to update record.',
    });

    try {
      await promise;
      // Redirect back to the main list after a short delay for the user to see the success toast.
      setTimeout(() => router.push('/'), 1000);
    } catch (error) {
      // Toast handles displaying the error.
    }
  };

  // Display a loading message while fetching data.
  if (isLoading) {
    return <Layout><p>Loading record...</p></Layout>;
  }

  return (
    <Layout>
      <div className="mb-6">
         <Link href="/" className="text-red-600 hover:underline">
           &larr; Back to list
         </Link>
         <h1 className="text-2xl font-semibold text-gray-800 mt-2">Edit Trademark Record #{id}</h1>
         <p className="text-gray-600">Update the details for this record.</p>
      </div>

      {/* Render the wizard only when the trademark data is available. */}
      {/* Pass the fetched data as 'initialData' to pre-fill the form. */}
      {trademark && <TrademarkWizard onSave={handleUpdate} initialData={trademark} />}
    </Layout>
  );
}