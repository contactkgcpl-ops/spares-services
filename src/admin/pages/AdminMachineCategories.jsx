import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import {
  fetchMachineCategories,
  createMachineCategory,
  updateMachineCategory,
  deleteMachineCategory,
} from '../services/machineService';

export default function AdminMachineCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteId, setDeleteId] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [name, setName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const loadCategories = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await fetchMachineCategories();
      setCategories(data);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const openAddModal = () => {
    setEditingCategory(null);
    setName('');
    setFormError('');
    setIsModalOpen(true);
  };

  const openEditModal = (cat) => {
    setEditingCategory(cat);
    setName(cat.name);
    setFormError('');
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    if (!name.trim()) {
      setFormError('Category name is required');
      return;
    }

    try {
      setSubmitting(true);
      if (editingCategory) {
        await updateMachineCategory(editingCategory.id, { name });
      } else {
        await createMachineCategory({ name });
      }
      setIsModalOpen(false);
      await loadCategories();
    } catch (err) {
      setFormError(err?.response?.data?.message || 'Failed to save category');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteMachineCategory(deleteId);
      setDeleteId('');
      await loadCategories();
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to delete category');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header title="Machine Categories Management" />
      <div className="p-6 py-10">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              to="/admin/dashboard"
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:border-[#f47c20] hover:text-[#f47c20]"
            >
              ← Back to Dashboard
            </Link>
            <h2 className="text-xl font-semibold tracking-tight text-slate-900">
              Machine Categories ({categories.length})
            </h2>
          </div>
          <button
            onClick={openAddModal}
            className="rounded-lg bg-[#f47c20] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#dc6e19]"
          >
            + Add Machine Category
          </button>
        </div>

        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm max-w-3xl">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-[#f8fafc]">
              <tr>
                <th className="px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">ID</th>
                <th className="px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Category Name</th>
                <th className="px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Slug</th>
                <th className="px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {loading ? (
                <tr>
                  <td colSpan="4" className="px-4 py-10 text-center text-sm text-slate-500">Loading categories...</td>
                </tr>
              ) : categories.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-4 py-10 text-center text-sm text-slate-500">No machine categories found.</td>
                </tr>
              ) : (
                categories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-[#f8fafc]">
                    <td className="px-4 py-3 text-sm text-slate-500">#{cat.id}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-slate-900">{cat.name}</td>
                    <td className="px-4 py-3 text-sm text-slate-500 font-mono text-xs">{cat.slug}</td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => openEditModal(cat)}
                          className="font-medium text-[#f47c20] hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setDeleteId(cat.id)}
                          className="font-medium text-red-500 hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="text-xl font-bold text-slate-900 mb-4">
              {editingCategory ? 'Edit Machine Category' : 'Add Machine Category'}
            </h3>

            {formError && (
              <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
                {formError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Category Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm focus:border-[#f47c20] focus:outline-none"
                  placeholder="e.g. Filling Machines"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-lg bg-[#f47c20] px-5 py-2 text-sm font-semibold text-white hover:bg-[#dc6e19] disabled:opacity-50"
                >
                  {submitting ? 'Saving...' : editingCategory ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <DeleteConfirmModal
        open={Boolean(deleteId)}
        onCancel={() => setDeleteId('')}
        onConfirm={handleDelete}
      />
    </div>
  );
}
