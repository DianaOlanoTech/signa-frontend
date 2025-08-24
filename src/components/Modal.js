import { XMarkIcon } from '@heroicons/react/24/solid';

/**
 * A generic, reusable modal component. This version uses a custom inline style
 * to create a backdrop blur effect, providing a modern UI feel.
 *
 * @param {object} props
 * @param {string} props.title - The title to display in the modal header.
 * @param {boolean} props.isOpen - Controls if the modal is visible. If false, the component renders nothing.
 * @param {function} props.onClose - The function to call when the 'X' button is clicked.
 * @param {React.ReactNode} props.children - The content to be rendered inside the modal body.
 */
export default function Modal({ title, isOpen, onClose, children }) {
  // If the modal is not set to be open, render nothing.
  // This is more efficient than hiding it with CSS (e.g., display: none).
  if (!isOpen) return null;

  return (
    // --- BACKDROP OVERLAY ---
    // This div covers the entire screen and provides the backdrop effect.
    // It uses inline styles for the custom blur and background color.
    <div
      className="fixed inset-0 z-40 flex justify-center items-center p-4 animate-fade-in"
      style={{
        // Applies the primary CSS blur effect to whatever is behind this element.
        backdropFilter: 'blur(4px)',
        // Adds a vendor prefix for Safari to ensure cross-browser compatibility for the blur.
        WebkitBackdropFilter: 'blur(4px)',
        // A semi-transparent white background. The low alpha value (0.1) is crucial
        // because it allows the blurred content from behind to be visible, creating the desired effect.
        backgroundColor: 'rgba(255, 255, 255, 0.1)'
      }}
    >
      {/* --- MODAL PANEL --- */}
      {/* This is the main container for the modal's content. */}
      {/* It has its own background, shadow, and an entrance animation. */}
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg relative transform transition-all animate-slide-up">

        {/* Modal Header: Contains the title and the close button. */}
        <div className="flex justify-between items-center p-5 border-b">
          <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Modal Content: Renders the child components passed into the modal. */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}