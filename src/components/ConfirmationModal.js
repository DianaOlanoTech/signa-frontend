'use client';

import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import Modal from '@/components/Modal'; // Re-uses the base Modal component for styling and behavior.

/**
 * A specialized modal component to ask the user for confirmation before a critical action.
 * @param {object} props
 * @param {boolean} props.isOpen - Controls if the modal is visible.
 * @param {function} props.onClose - Function to call when the "Cancel" button is clicked or the modal is closed.
 * @param {function} props.onConfirm - Function to call when the "Confirm" button is clicked.
 * @param {string} props.title - The title text to display in the modal header.
 * @param {string} props.message - The confirmation message to display to the user.
 */
export default function ConfirmationModal({ isOpen, onClose, onConfirm, title, message }) {
  // Render nothing if the modal is not supposed to be open.
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      {/* Modal Body */}
      <div className="flex items-start">
        {/* Warning Icon */}
        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
          <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
        </div>
        {/* Confirmation Message */}
        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <p className="text-sm text-gray-500">
            {message}
          </p>
        </div>
      </div>

      {/* Modal Footer with Action Buttons */}
      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 sm:ml-3 sm:w-auto sm:text-sm"
          onClick={onConfirm}
        >
          Confirm Delete
        </button>
        <button
          type="button"
          className="mt-3 inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:w-auto sm:text-sm"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
}