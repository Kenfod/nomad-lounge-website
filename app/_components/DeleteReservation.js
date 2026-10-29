"use client";

import { TrashIcon, ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { useState, useTransition } from "react";
import SpinnerMini from "./SpinnerMini";

function DeleteReservation({ bookingId, onDelete }) {
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  function handleDelete() {
    startTransition(async () => {
      try {
        await onDelete(bookingId);
        setIsOpen(false);
      } catch (err) {
        console.error(err);
      }
    });
  }

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        disabled={isPending}
        className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900 disabled:cursor-not-allowed"
      >
        {!isPending ? (
          <>
            <TrashIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
            <span className="mt-1">Delete</span>
          </>
        ) : (
          <span className="mx-auto">
            <SpinnerMini />
          </span>
        )}
      </button>

      {/* Custom Tailwind Palette Confirmation Modal Overlap */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-primary-900 border border-primary-800 rounded-sm max-w-md w-full p-6 shadow-2xl scale-in">
            {/* Header Section */}
            <div className="flex items-start gap-4">
              <div className="bg-secondary-600/20 p-2 rounded-full text-secondary-600">
                <ExclamationTriangleIcon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary-50">
                  Delete Reservation
                </h3>
                <p className="text-sm text-primary-300 mt-2 leading-relaxed">
                  Are you sure you want to delete this reservation? This action
                  cannot be undone and will permanently remove your booking.
                </p>
              </div>
            </div>

            {/* Actions Panel Footer */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setIsOpen(false)}
                disabled={isPending}
                className="px-4 py-2 border bg-secondary-200 text-primary-700 font-semibold text-sm rounded-sm hover:bg-secondary-300 transition-colors disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isPending}
                className="px-4 py-2 bg-secondary-600 text-primary-50 font-semibold text-sm rounded-sm hover:bg-secondary-900 hover:text-secondary-700 transition-all flex items-center gap-2 disabled:cursor-not-allowed disabled:bg-primary-700"
              >
                {isPending ? (
                  <>
                    <SpinnerMini />
                    <span>Deleting...</span>
                  </>
                ) : (
                  "Confirm Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DeleteReservation;
