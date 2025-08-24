'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
// Import the new EyeIcon
import { PlusIcon, PencilIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

// Import services and components
import { getAllTrademarks, deleteTrademark } from '@/services/trademarkService';
import Layout from '@/components/Layout';
import ConfirmationModal from '@/components/ConfirmationModal';
import Pagination from '@/components/Pagination';
import ViewTrademarkModal from '@/components/ViewTrademarkModal'; // Import the new View Modal

const RECORDS_PER_PAGE = 10;

export default function HomePage() {
  // --- STATE MANAGEMENT ---
  const [trademarks, setTrademarks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // State for the delete confirmation modal
  const [trademarkToDelete, setTrademarkToDelete] = useState(null);
  // NEW state for the view details modal
  const [trademarkToView, setTrademarkToView] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // --- DATA FETCHING ---
  const fetchTrademarks = async (page) => {
    setIsLoading(true);
    try {
      const { data, total } = await getAllTrademarks(page, RECORDS_PER_PAGE);
      setTrademarks(data);
      setTotalPages(Math.ceil(total / RECORDS_PER_PAGE));
    } catch (error) {
      toast.error('Could not fetch trademarks.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTrademarks(currentPage);
  }, [currentPage]);

  // --- HANDLERS ---
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Handlers for the "View" modal
  const handleOpenViewModal = (trademark) => {
    setTrademarkToView(trademark);
  };
  const handleCloseViewModal = () => {
    setTrademarkToView(null);
  };

  // Handlers for the "Delete" modal
  const handleOpenDeleteModal = (trademark) => {
    setTrademarkToDelete(trademark);
  };
  const handleCloseDeleteModal = () => {
    setTrademarkToDelete(null);
  };
  const handleConfirmDelete = async () => {
    if (!trademarkToDelete) return;
    const promise = deleteTrademark(trademarkToDelete.id);
    toast.promise(promise, {
      loading: 'Deleting record...',
      success: `Record "${trademarkToDelete.name}" deleted successfully!`,
      error: 'Failed to delete record.',
    });
    try {
      await promise;
      handleCloseDeleteModal();
      fetchTrademarks(currentPage);
    } catch (error) { /* Toast handles error */ }
  };

  return (
    <Layout>
      {/* Page Header*/}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Services/Trademark Registration</h1>
          <p className="text-gray-600">Manage your trademark records here.</p>
        </div>
        <Link href="/records/new">
          <button className="flex items-center gap-2 px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors">
            <PlusIcon className="h-5 w-5" />
            New Record
          </button>
        </Link>
      </div>

      {/* Render both modals. They will only be visible when their respective state is set. */}
      <ConfirmationModal
        isOpen={!!trademarkToDelete}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        title="Delete Trademark Record"
        message={`Are you sure you want to delete the record "${trademarkToDelete?.name}"? This action cannot be undone.`}
      />
      <ViewTrademarkModal
        isOpen={!!trademarkToView}
        onClose={handleCloseViewModal}
        trademark={trademarkToView}
      />

      {/* Data Table*/}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              {/* Description column removed */}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              <tr><td colSpan="4" className="text-center py-4">Loading...</td></tr>
            ) : trademarks.length > 0 ? (
              trademarks.map((trademark) => (
                <tr key={trademark.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{trademark.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{trademark.name}</td>
                  {/* Description cell removed */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${trademark.status.toLowerCase() === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {trademark.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-4">
                      <button onClick={() => handleOpenViewModal(trademark)} className="text-gray-500 hover:text-gray-900">
                        <EyeIcon className="h-5 w-5"/>
                      </button>
                      <Link href={`/records/${trademark.id}/edit`} className="text-blue-600 hover:text-blue-900">
                        <PencilIcon className="h-5 w-5"/>
                      </Link>
                      <button onClick={() => handleOpenDeleteModal(trademark)} className="text-red-600 hover:text-red-900">
                        <TrashIcon className="h-5 w-5"/>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              // Adjusted colSpan from 5 to 4
              <tr><td colSpan="4" className="text-center py-4 text-gray-500">No records found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination component*/}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </Layout>
  );
}