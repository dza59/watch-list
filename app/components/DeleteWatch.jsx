'use client';

import React, { useState } from 'react';
import { deleteWatch } from '../apis/deleteWatch';

function DeleteWatch({ watchId }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this watch?')) {
      setIsDeleting(true);
      try {
        await deleteWatch(watchId);
        // alert('Watch deleted successfully.');
      } catch (error) {
        console.error('Failed to delete watch:', error);
        alert('Failed to delete watch.');
      }
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className={`bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ${
        isDeleting ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {isDeleting ? 'Deleting...' : 'Delete'}
    </button>
  );
}

export default DeleteWatch;
