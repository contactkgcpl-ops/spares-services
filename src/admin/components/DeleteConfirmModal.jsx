function DeleteConfirmModal({ open, onCancel, onConfirm }) {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-200 ${open ? 'pointer-events-auto bg-slate-900/40 opacity-100' : 'pointer-events-none bg-slate-900/0 opacity-0'
        }`}
      onClick={onCancel}
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-product-title"
    >
      <div
        className={`w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-xl transition-all duration-200 ${open ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-2 scale-95 opacity-0'
          }`}
        onClick={(event) => event.stopPropagation()}
      >
        <h3 id="delete-product-title" className="text-xl font-semibold tracking-tight text-slate-900">
          Delete Product
        </h3>
        <p className="mt-3 text-sm text-slate-600">Are you sure you want to delete this product?</p>
        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmModal;
