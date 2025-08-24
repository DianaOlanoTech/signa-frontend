'use client';

import Modal from '@/components/Modal';

/**
 * A modal component specifically for displaying the full details of a trademark record.
 * @param {object} props
 * @param {boolean} props.isOpen - Controls if the modal is visible.
 * @param {function} props.onClose - Function to call when the "Close" button is clicked.
 * @param {object|null} props.trademark - The trademark object containing the data to display.
 */
export default function ViewTrademarkModal({ isOpen, onClose, trademark }) {
  // Render nothing if the modal is not open or if there's no trademark data.
  if (!isOpen || !trademark) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Trademark Details">
      {/* The main content area for the details. */}
      <div className="space-y-4 text-gray-800">
        {/* ID Field */}
        <div>
          <label className="text-sm font-semibold text-gray-500">ID</label>
          <p className="mt-1 text-base">{trademark.id}</p>
        </div>

        {/* Name Field */}
        <div>
          <label className="text-sm font-semibold text-gray-500">Name</label>
          <p className="mt-1 text-base font-medium">{trademark.name}</p>
        </div>

        {/* Status Field - We use the same styled badge as in the table for consistency. */}
        <div>
          <label className="text-sm font-semibold text-gray-500">Status</label>
          <div className="mt-1">
            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                trademark.status.toLowerCase() === 'active' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {trademark.status}
            </span>
          </div>
        </div>

        {/* Description Field */}
        <div>
          <label className="text-sm font-semibold text-gray-500">Description</label>
          {/* We handle cases where the description might be empty or null. */}
          <p className="mt-1 text-base text-gray-700">
            {trademark.description || <span className="text-gray-400 italic">No description provided.</span>}
          </p>
        </div>
      </div>

      {/* Modal Footer with a single close button. */}
      <div className="mt-6 flex justify-end">
        <button
          type="button"
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </Modal>
  );
}