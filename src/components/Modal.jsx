import React from 'react';
import { X } from 'lucide-react'; // Ensure this import is present

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-end">
          <button onClick={onClose} className="p-2 text-gray-500 hover:text-gray-700 transition">
            <X className="w-5 h-5" /> {/* Use the X icon here */}
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;